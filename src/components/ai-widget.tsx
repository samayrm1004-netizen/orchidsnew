"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, MicOff, MessageSquare, X, Send, Loader2, ShieldCheck, Headphones, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { RetellWebClient } from "retell-client-js-sdk";

type Language = "english" | "hindi";

type MessageRole = "user" | "assistant" | "system";
interface Message {
  role: MessageRole;
  content: string;
  id: string;
}

export default function AIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentTranscript, setCurrentTranscript] = useState<{ role: string; text: string } | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [retellReady, setRetellReady] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);

  const retellClientRef = useRef<RetellWebClient | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isStartingRef = useRef(false);

  const generateId = () => Math.random().toString(36).substring(2, 11);

  const addMessage = useCallback((role: MessageRole, content: string) => {
    setMessages(prev => [...prev, { role, content, id: generateId() }]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, currentTranscript]);

  // Page load delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Retell Web Client once
  useEffect(() => {
    if (!isLoaded || retellClientRef.current) return;

    const retellClient = new RetellWebClient();

    retellClient.on("call_started", () => {
      console.log("[RETELL] call_started event");
      isStartingRef.current = false;
      setIsCallActive(true);
      setIsConnecting(false);
      addMessage("system", "Connected. You can speak now.");
    });

    retellClient.on("call_ended", () => {
      console.log("[RETELL] call_ended event");
      isStartingRef.current = false;
      setIsCallActive(false);
      setIsConnecting(false);
      setCurrentTranscript(null);
      addMessage("system", "Session ended.");
    });

    retellClient.on("agent_start_talking", () => {
      setIsSpeaking(true);
    });

    retellClient.on("agent_stop_talking", () => {
      setIsSpeaking(false);
    });

    retellClient.on("update", (update) => {
      // Handle transcript updates
      if (update.transcript) {
        const transcripts = update.transcript;
        if (transcripts.length > 0) {
          const lastTranscript = transcripts[transcripts.length - 1];

          // Update current transcript for partial updates
          setCurrentTranscript({
            role: lastTranscript.role,
            text: lastTranscript.content,
          });

          // Add finalized messages to chat
          setMessages(prev => {
            const newMessages: Message[] = [];
            transcripts.forEach((t: any) => {
              const role: MessageRole = t.role === "agent" ? "assistant" : "user";
              const exists = prev.some(m => m.content === t.content && m.role === role);
              if (!exists && t.content) {
                newMessages.push({ role, content: t.content, id: generateId() });
              }
            });
            return newMessages.length > 0 ? [...prev, ...newMessages] : prev;
          });
        }
      }
    });

    retellClient.on("error", (error) => {
      console.error("[RETELL] error event:", error);
      isStartingRef.current = false;
      setIsCallActive(false);
      setIsConnecting(false);
      addMessage("system", `Error: ${error.message || "Connection Error"}`);
    });

    retellClientRef.current = retellClient;
    setRetellReady(true);
    console.log("[RETELL] Client initialized successfully");

    return () => {
      if (retellClientRef.current) {
        console.log("[RETELL] Cleaning up client...");
        try {
          retellClientRef.current.stopCall();
        } catch (e) { }
        retellClientRef.current = null;
        setRetellReady(false);
      }
    };
  }, [isLoaded, addMessage]);

  const getAccessToken = async (language: Language): Promise<string | null> => {
    try {
      const response = await fetch("/api/retell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to get access token");
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("[RETELL] Failed to get access token:", error);
      return null;
    }
  };

  const startCall = useCallback(async (language: Language) => {
    const retellClient = retellClientRef.current;

    if (!retellClient || isStartingRef.current || isCallActive || isConnecting) {
      console.log("[RETELL] startCall blocked:", {
        ready: !!retellClient,
        starting: isStartingRef.current,
        active: isCallActive,
        connecting: isConnecting
      });
      return;
    }

    isStartingRef.current = true;
    setIsConnecting(true);
    setSelectedLanguage(language);
    setShowLanguageSelector(false);
    console.log("[RETELL] Attempting to start call with language:", language);

    try {
      const accessToken = await getAccessToken(language);

      if (!accessToken) {
        throw new Error("Could not obtain access token");
      }

      // Double check state after async operation
      if (isCallActive) {
        isStartingRef.current = false;
        setIsConnecting(false);
        return;
      }

      await retellClient.startCall({
        accessToken,
        sampleRate: 24000,
      });
    } catch (err: any) {
      console.error("[RETELL] startCall failed:", err);
      isStartingRef.current = false;
      setIsConnecting(false);
      setShowLanguageSelector(true);
      const errMsg = err?.message || "Could not establish connection";
      addMessage("system", `Connection failed: ${errMsg}`);
    }
  }, [isCallActive, isConnecting, addMessage]);

  const stopCall = useCallback(() => {
    const retellClient = retellClientRef.current;
    if (retellClient && (isCallActive || isConnecting || isStartingRef.current)) {
      console.log("[RETELL] Manual stop requested");
      try {
        retellClient.stopCall();
      } catch (e) {
        console.error("[RETELL] stopCall failed:", e);
      }
      setIsCallActive(false);
      setIsConnecting(false);
      isStartingRef.current = false;
      setShowLanguageSelector(true);
    }
  }, [isCallActive, isConnecting]);

  const handleLanguageSelect = (language: Language) => {
    startCall(language);
  };

  const handleMicClick = useCallback(() => {
    if (isCallActive) {
      stopCall();
    } else if (selectedLanguage) {
      startCall(selectedLanguage);
    } else {
      setShowLanguageSelector(true);
    }
  }, [isCallActive, selectedLanguage, startCall, stopCall]);

  if (!isLoaded) return null;

  return (
    <>
      {/* Floating Trigger */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999]">
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-3 bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center justify-center">
            {isCallActive ? (
              <div className="flex gap-1 items-end h-4 w-5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                    className="w-1 bg-purple-500 rounded-full"
                  />
                ))}
              </div>
            ) : (
              <Mic className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
            )}
          </div>
          <span className="text-sm font-bold tracking-tight text-white/90">
            {isOpen ? "CLOSE SESSION" : "TALK TO SHEETAL (AI HR)"}
          </span>
          {isCallActive && (
            <div className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border border-black" />
            </div>
          )}
        </motion.button>
      </div>

      {/* Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-black/90 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-blur-2xl flex flex-col h-[700px] max-h-[85vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-b from-white/5 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className={cn(
                      "absolute inset-0 rounded-2xl blur-xl transition-all duration-500",
                      isCallActive ? "bg-purple-500/40" : "bg-blue-500/20"
                    )} />
                    <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-inner">
                      {isCallActive ? <Headphones className="w-7 h-7 text-white animate-pulse" /> : <Mic className="w-7 h-7 text-white" />}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">SHEETAL AI</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        isCallActive ? "bg-green-500 animate-pulse" : isConnecting ? "bg-yellow-500 animate-pulse" : retellReady ? "bg-gray-500" : "bg-red-500"
                      )} />
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                        {isCallActive ? `Live (${selectedLanguage === "hindi" ? "हिंदी" : "English"})` : isConnecting ? "Connecting..." : retellReady ? "Ready" : "Loading..."}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group"
                >
                  <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </button>
              </div>

              {/* Language Selection */}
              <AnimatePresence>
                {showLanguageSelector && !isCallActive && !isConnecting && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-gradient-to-b from-purple-600/10 to-transparent border-b border-purple-500/20 overflow-hidden"
                  >
                    <div className="px-6 py-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Globe className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-bold text-white/80 uppercase tracking-wider">Select Your Language</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleLanguageSelect("english")}
                          disabled={!retellReady}
                          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all disabled:opacity-50 group"
                        >
                          <span className="text-2xl">🇬🇧</span>
                          <span className="text-sm font-bold text-white group-hover:text-purple-300">English</span>
                        </button>
                        <button
                          onClick={() => handleLanguageSelect("hindi")}
                          disabled={!retellReady}
                          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all disabled:opacity-50 group"
                        >
                          <span className="text-2xl">🇮🇳</span>
                          <span className="text-sm font-bold text-white group-hover:text-purple-300">हिंदी (Hindi)</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active Call Bar */}
              <AnimatePresence>
                {isCallActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-purple-600/10 border-b border-purple-500/20 overflow-hidden"
                  >
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1 items-end h-4">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ height: isSpeaking ? ["20%", "100%", "20%"] : "30%" }}
                              transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                              className="w-1 bg-purple-500 rounded-full"
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-purple-400 tracking-wider">
                          {isSpeaking ? "SPEAKING" : "LISTENING"}
                        </span>
                      </div>
                      <button
                        onClick={stopCall}
                        className="text-[10px] font-bold bg-red-500/20 text-red-400 px-3 py-1.5 rounded-full border border-red-500/20 hover:bg-red-500/30 transition-all"
                      >
                        END CALL
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages */}
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none">
                {messages.length === 0 && !currentTranscript && (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                      <MessageSquare className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-300 max-w-xs">
                      Select a language above to start talking to Sheetal.
                    </p>
                  </div>
                )}

                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex flex-col",
                      msg.role === "user" ? "items-end" : msg.role === "assistant" ? "items-start" : "items-center"
                    )}
                  >
                    {msg.role === "system" ? (
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] py-2">
                        {msg.content}
                      </span>
                    ) : (
                      <>
                        <div className={cn(
                          "max-w-[85%] px-5 py-3 rounded-[1.5rem] text-sm leading-relaxed shadow-lg",
                          msg.role === "user"
                            ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-tr-none"
                            : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-none"
                        )}>
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-gray-500 mt-2 px-1 uppercase tracking-wider font-bold">
                          {msg.role === "user" ? "You" : "Sheetal"}
                        </span>
                      </>
                    )}
                  </motion.div>
                ))}

                {currentTranscript && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(
                      "flex flex-col",
                      currentTranscript.role === "user" ? "items-end" : "items-start"
                    )}
                  >
                    <div className="max-w-[85%] px-5 py-3 rounded-[1.5rem] text-sm leading-relaxed bg-white/5 border border-white/5 text-gray-400 italic">
                      {currentTranscript.text}
                      <span className="inline-block w-1.5 h-4 bg-purple-500 ml-1 animate-pulse align-middle" />
                    </div>
                    <span className="text-[10px] text-purple-500/60 mt-2 px-1 uppercase tracking-widest font-bold">
                      {currentTranscript.role === "user" ? "Listening..." : "Thinking..."}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="p-6 pt-2 space-y-4">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={isCallActive ? "Voice call in progress..." : "Select a language to start"}
                      disabled={true}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-5 pr-14 py-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all placeholder:text-gray-600 disabled:opacity-50"
                    />
                  </div>

                  <button
                    onClick={handleMicClick}
                    disabled={isConnecting || !retellReady || (!isCallActive && !selectedLanguage && showLanguageSelector)}
                    className={cn(
                      "p-4 rounded-2xl flex items-center justify-center transition-all shadow-xl",
                      isCallActive
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-white text-black hover:bg-gray-200 disabled:opacity-50"
                    )}
                  >
                    {isConnecting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isCallActive ? (
                      <MicOff className="w-5 h-5" />
                    ) : (
                      <Mic className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-500/50" />
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">End-to-End Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/5" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/5" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
