"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, MicOff, MessageSquare, X, Loader2, ShieldCheck, Headphones, Sparkles } from "lucide-react";
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
      if (update.transcript) {
        const transcripts = update.transcript;
        if (transcripts.length > 0) {
          const lastTranscript = transcripts[transcripts.length - 1];

          setCurrentTranscript({
            role: lastTranscript.role,
            text: lastTranscript.content,
          });

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
      {/* Floating Trigger - Premium Cosmos AI Style */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999]">
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-4 px-8 py-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 20, 40, 0.95) 100%)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            boxShadow: "0 0 60px rgba(139, 92, 246, 0.15), 0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
          }}
        >
          {/* Animated glow ring */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
            }}
          />

          {/* Animated outer ring on active call */}
          {isCallActive && (
            <motion.div
              className="absolute -inset-1 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.3)",
                  "0 0 40px rgba(139, 92, 246, 0.5)",
                  "0 0 20px rgba(139, 92, 246, 0.3)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}

          <div className="relative flex items-center justify-center">
            {isCallActive ? (
              <div className="flex gap-[3px] items-end h-5 w-6">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["25%", "100%", "25%"] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                    className="w-1 rounded-full"
                    style={{ background: "linear-gradient(to top, #8b5cf6, #a78bfa)" }}
                  />
                ))}
              </div>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 blur-lg bg-violet-500/30 rounded-full" />
                <Mic className="w-5 h-5 text-violet-400 relative z-10 group-hover:text-violet-300 transition-colors" />
              </div>
            )}
          </div>

          <div className="flex flex-col items-start">
            <span className="text-[10px] font-medium tracking-[0.2em] text-violet-400/60 uppercase">Cosmos AI</span>
            <span className="text-sm font-semibold tracking-wide text-white/90">
              {isOpen ? "Close Session" : "Talk to Sheetal"}
            </span>
          </div>

          {isCallActive && (
            <div className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"
                style={{ boxShadow: "0 0 10px rgba(52, 211, 153, 0.5)" }}
              />
            </div>
          )}
        </motion.button>
      </div>

      {/* Widget Panel - Premium Cosmos AI Design */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md overflow-hidden flex flex-col h-[680px] max-h-[85vh]"
              style={{
                background: "linear-gradient(180deg, rgba(15, 12, 25, 0.98) 0%, rgba(10, 8, 18, 0.99) 100%)",
                borderRadius: "32px",
                border: "1px solid rgba(139, 92, 246, 0.15)",
                boxShadow: "0 0 100px rgba(139, 92, 246, 0.1), 0 50px 100px -20px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.03)"
              }}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)"
                }}
              />

              {/* Header */}
              <div className="relative p-6 flex items-center justify-between"
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.03)"
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {/* Avatar glow */}
                    <div className={cn(
                      "absolute -inset-1 rounded-2xl blur-xl transition-all duration-700",
                      isCallActive ? "bg-violet-500/40" : "bg-violet-500/20"
                    )} />
                    {/* Avatar */}
                    <div className="relative h-14 w-14 rounded-2xl flex items-center justify-center overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #6366f1 100%)",
                        boxShadow: "inset 0 2px 0 rgba(255, 255, 255, 0.15), 0 4px 20px rgba(124, 58, 237, 0.3)"
                      }}
                    >
                      {isCallActive ? (
                        <Headphones className="w-7 h-7 text-white" />
                      ) : (
                        <Sparkles className="w-7 h-7 text-white" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Sheetal AI</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className={cn(
                        "w-2 h-2 rounded-full transition-all duration-500",
                        isCallActive ? "bg-emerald-400" : isConnecting ? "bg-amber-400" : retellReady ? "bg-violet-400" : "bg-red-400"
                      )}
                        style={{
                          boxShadow: isCallActive
                            ? "0 0 8px rgba(52, 211, 153, 0.6)"
                            : isConnecting
                              ? "0 0 8px rgba(251, 191, 36, 0.6)"
                              : "0 0 8px rgba(139, 92, 246, 0.4)"
                        }}
                      />
                      <span className="text-xs font-medium text-white/40 tracking-wide">
                        {isCallActive
                          ? `Live · ${selectedLanguage === "hindi" ? "हिंदी" : "English"}`
                          : isConnecting
                            ? "Connecting..."
                            : retellReady
                              ? "Ready"
                              : "Initializing..."
                        }
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-xl transition-all duration-300 hover:bg-white/5 group"
                  style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
                >
                  <X className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
                </button>
              </div>

              {/* Premium Language Selection */}
              <AnimatePresence>
                {showLanguageSelector && !isCallActive && !isConnecting && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden relative"
                  >
                    <div className="px-6 py-6">
                      <div className="text-center mb-5">
                        <p className="text-sm font-medium text-white/50 tracking-wide">Choose your language</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* English Button - Premium */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleLanguageSelect("english")}
                          disabled={!retellReady}
                          className="group relative p-5 rounded-2xl transition-all duration-500 disabled:opacity-40 overflow-hidden"
                          style={{
                            background: "linear-gradient(145deg, rgba(30, 27, 45, 0.8) 0%, rgba(20, 18, 35, 0.9) 100%)",
                            border: "1px solid rgba(139, 92, 246, 0.15)",
                            boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03)"
                          }}
                        >
                          {/* Hover gradient overlay */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: "linear-gradient(145deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.08) 100%)"
                            }}
                          />
                          {/* Content */}
                          <div className="relative z-10 flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                              style={{
                                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)",
                                border: "1px solid rgba(59, 130, 246, 0.2)"
                              }}
                            >
                              <span className="text-2xl font-bold bg-gradient-to-br from-blue-400 to-indigo-400 bg-clip-text text-transparent">A</span>
                            </div>
                            <div className="text-center">
                              <p className="text-white font-semibold tracking-wide">English</p>
                              <p className="text-[10px] text-white/30 mt-0.5 tracking-wider uppercase">International</p>
                            </div>
                          </div>
                          {/* Bottom accent */}
                          <div className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)"
                            }}
                          />
                        </motion.button>

                        {/* Hindi Button - Premium */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleLanguageSelect("hindi")}
                          disabled={!retellReady}
                          className="group relative p-5 rounded-2xl transition-all duration-500 disabled:opacity-40 overflow-hidden"
                          style={{
                            background: "linear-gradient(145deg, rgba(30, 27, 45, 0.8) 0%, rgba(20, 18, 35, 0.9) 100%)",
                            border: "1px solid rgba(139, 92, 246, 0.15)",
                            boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03)"
                          }}
                        >
                          {/* Hover gradient overlay */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: "linear-gradient(145deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.08) 100%)"
                            }}
                          />
                          {/* Content */}
                          <div className="relative z-10 flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                              style={{
                                background: "linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(234, 88, 12, 0.2) 100%)",
                                border: "1px solid rgba(249, 115, 22, 0.2)"
                              }}
                            >
                              <span className="text-2xl font-bold bg-gradient-to-br from-orange-400 to-amber-500 bg-clip-text text-transparent">अ</span>
                            </div>
                            <div className="text-center">
                              <p className="text-white font-semibold tracking-wide">हिंदी</p>
                              <p className="text-[10px] text-white/30 mt-0.5 tracking-wider uppercase">Hindi</p>
                            </div>
                          </div>
                          {/* Bottom accent */}
                          <div className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: "linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.5), transparent)"
                            }}
                          />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Connecting State */}
              <AnimatePresence>
                {isConnecting && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-8 flex flex-col items-center justify-center">
                      <motion.div
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(139, 92, 246, 0.4)",
                            "0 0 0 20px rgba(139, 92, 246, 0)",
                          ]
                        }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        style={{
                          background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)"
                        }}
                      >
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                      </motion.div>
                      <p className="text-white/60 text-sm font-medium">Establishing secure connection...</p>
                      <p className="text-white/30 text-xs mt-1">
                        {selectedLanguage === "hindi" ? "हिंदी एजेंट से कनेक्ट हो रहे हैं" : "Connecting to English agent"}
                      </p>
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
                    className="overflow-hidden"
                    style={{
                      background: "linear-gradient(180deg, rgba(139, 92, 246, 0.08) 0%, transparent 100%)",
                      borderBottom: "1px solid rgba(139, 92, 246, 0.1)"
                    }}
                  >
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-[3px] items-end h-4">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ height: isSpeaking ? ["20%", "100%", "20%"] : "30%" }}
                              transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                              className="w-1 rounded-full"
                              style={{ background: "linear-gradient(to top, #8b5cf6, #a78bfa)" }}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-semibold tracking-wider uppercase"
                          style={{ color: isSpeaking ? "#a78bfa" : "#6b7280" }}
                        >
                          {isSpeaking ? "Speaking" : "Listening"}
                        </span>
                      </div>
                      <button
                        onClick={stopCall}
                        className="text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                        style={{
                          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.1) 100%)",
                          color: "#f87171",
                          border: "1px solid rgba(239, 68, 68, 0.2)"
                        }}
                      >
                        End Call
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages */}
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-none">
                {messages.length === 0 && !currentTranscript && !isConnecting && (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                      style={{
                        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)",
                        border: "1px solid rgba(139, 92, 246, 0.1)"
                      }}
                    >
                      <MessageSquare className="w-7 h-7 text-violet-400/50" />
                    </div>
                    <p className="text-sm text-white/30 max-w-xs leading-relaxed">
                      Select a language above to start your conversation with Sheetal AI
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
                      <span className="text-[10px] font-medium text-white/20 uppercase tracking-[0.15em] py-2">
                        {msg.content}
                      </span>
                    ) : (
                      <>
                        <div className={cn(
                          "max-w-[85%] px-5 py-3.5 text-sm leading-relaxed",
                          msg.role === "user" ? "rounded-2xl rounded-tr-md" : "rounded-2xl rounded-tl-md"
                        )}
                          style={msg.role === "user" ? {
                            background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
                            color: "white",
                            boxShadow: "0 4px 20px rgba(124, 58, 237, 0.25)"
                          } : {
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            color: "rgba(255, 255, 255, 0.85)"
                          }}>
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-white/25 mt-2 px-1 uppercase tracking-wider font-medium">
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
                    <div className="max-w-[85%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed italic"
                      style={{
                        background: "rgba(139, 92, 246, 0.05)",
                        border: "1px solid rgba(139, 92, 246, 0.1)",
                        color: "rgba(255, 255, 255, 0.5)"
                      }}
                    >
                      {currentTranscript.text}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-0.5 h-4 bg-violet-400 ml-1 align-middle"
                      />
                    </div>
                    <span className="text-[10px] text-violet-400/50 mt-2 px-1 uppercase tracking-widest font-medium">
                      {currentTranscript.role === "user" ? "Listening..." : "Speaking..."}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="p-5 pt-3">
                <div className="flex gap-3 mb-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder={isCallActive ? "Voice conversation active..." : "Select language to begin"}
                      disabled={true}
                      className="w-full rounded-xl pl-5 pr-5 py-3.5 text-sm transition-all placeholder:text-white/20 disabled:cursor-not-allowed"
                      style={{
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        color: "white",
                        opacity: 0.5
                      }}
                    />
                  </div>

                  <button
                    onClick={handleMicClick}
                    disabled={isConnecting || !retellReady || (!isCallActive && !selectedLanguage && showLanguageSelector)}
                    className={cn(
                      "p-3.5 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-30",
                      isCallActive ? "hover:scale-105" : "hover:scale-105"
                    )}
                    style={isCallActive ? {
                      background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                      boxShadow: "0 4px 20px rgba(239, 68, 68, 0.3)"
                    } : {
                      background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
                      boxShadow: "0 4px 20px rgba(124, 58, 237, 0.3)"
                    }}
                  >
                    {isConnecting ? (
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : isCallActive ? (
                      <MicOff className="w-5 h-5 text-white" />
                    ) : (
                      <Mic className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-emerald-500/40" />
                  <span className="text-[10px] font-medium text-white/15 tracking-[0.2em] uppercase">
                    Secured by Cosmos AI
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
