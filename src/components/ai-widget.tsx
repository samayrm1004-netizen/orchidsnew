"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, MicOff, MessageSquare, X, Send, Loader2, ShieldCheck, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const VAPI_PUBLIC_KEY = "57d7e4cc-11bd-47f9-adcf-77e014b4b564";
const VAPI_ASSISTANT_ID = "b7cac471-0f5f-43a5-b02c-78da131a5307";

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
  const [vapiReady, setVapiReady] = useState(false);

  const vapiRef = useRef<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const pendingMessageRef = useRef<string | null>(null);
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

  // Initialize Vapi SDK once
  useEffect(() => {
    if (!isLoaded || vapiRef.current) return;

    let mounted = true;

    const init = async () => {
      try {
        const { default: Vapi } = await import("@vapi-ai/web");
        if (!mounted) return;

        // Ensure we don't have an existing instance
        if (vapiRef.current) return;

        const vapi = new Vapi(VAPI_PUBLIC_KEY);

        vapi.on("call-start", () => {
          console.log("[VAPI] call-start event");
          isStartingRef.current = false;
          setIsCallActive(true);
          setIsConnecting(false);
          addMessage("system", "Connected. You can speak now.");

          if (pendingMessageRef.current) {
            vapi.send({
              type: "add-message",
              message: { role: "user", content: pendingMessageRef.current },
            });
            pendingMessageRef.current = null;
          }
        });

        vapi.on("call-end", () => {
          console.log("[VAPI] call-end event");
          isStartingRef.current = false;
          setIsCallActive(false);
          setIsConnecting(false);
          setCurrentTranscript(null);
          addMessage("system", "Session ended.");
        });

        vapi.on("speech-start", () => setIsSpeaking(true));
        vapi.on("speech-end", () => setIsSpeaking(false));

        vapi.on("message", (msg: any) => {
          if (msg.type === "transcript") {
            if (msg.transcriptType === "partial") {
              setCurrentTranscript({ role: msg.role, text: msg.transcript });
            } else if (msg.transcriptType === "final") {
              setCurrentTranscript(null);
              const role: MessageRole = msg.role === "assistant" ? "assistant" : "user";
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last && last.role === role && last.content === msg.transcript) return prev;
                return [...prev, { role, content: msg.transcript, id: generateId() }];
              });
            }
          }
        });

        vapi.on("error", (err: any) => {
          console.error("[VAPI] error event:", err);
          isStartingRef.current = false;
          setIsCallActive(false);
          setIsConnecting(false);
          const errMsg = err?.message || err?.error?.message || "Connection Error";
          addMessage("system", `Error: ${errMsg}`);
        });

        vapiRef.current = vapi;
        setVapiReady(true);
        console.log("[VAPI] SDK initialized successfully");
      } catch (e) {
        console.error("[VAPI] SDK initialization failed:", e);
      }
    };

    init();

    return () => {
      mounted = false;
      if (vapiRef.current) {
        console.log("[VAPI] Cleaning up SDK instance...");
        try {
          vapiRef.current.stop();
        } catch (e) {}
        vapiRef.current = null;
        setVapiReady(false);
      }
    };
  }, [isLoaded, addMessage]);

  const startCall = useCallback(async () => {
    const vapi = vapiRef.current;
    
    // Strict block: if vapi not ready, or already starting, or already active
    if (!vapi || isStartingRef.current || isCallActive || isConnecting) {
      console.log("[VAPI] startCall blocked:", { 
        ready: !!vapi, 
        starting: isStartingRef.current, 
        active: isCallActive, 
        connecting: isConnecting 
      });
      return;
    }

    isStartingRef.current = true;
    setIsConnecting(true);
    console.log("[VAPI] Attempting to start call...");

    try {
      // Small safety delay to ensure any previous cleanup is finished
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Double check state after delay
      if (isCallActive) {
        isStartingRef.current = false;
        setIsConnecting(false);
        return;
      }

      await vapi.start(VAPI_ASSISTANT_ID);
    } catch (err: any) {
      console.error("[VAPI] vapi.start() failed:", err);
      isStartingRef.current = false;
      setIsConnecting(false);
      const errMsg = err?.message || "Could not establish connection";
      addMessage("system", `Connection failed: ${errMsg}`);
    }
  }, [isCallActive, isConnecting, addMessage]);

  const stopCall = useCallback(() => {
    const vapi = vapiRef.current;
    if (vapi && (isCallActive || isConnecting || isStartingRef.current)) {
      console.log("[VAPI] Manual stop requested");
      try {
        vapi.stop();
      } catch (e) {
        console.error("[VAPI] stop() failed:", e);
      }
      setIsCallActive(false);
      setIsConnecting(false);
      isStartingRef.current = false;
    }
  }, [isCallActive, isConnecting]);

  const handleSend = useCallback(() => {
    const text = inputMessage.trim();
    if (!text || !vapiRef.current) return;

    setInputMessage("");
    addMessage("user", text);

    if (isCallActive) {
      vapiRef.current.send({
        type: "add-message",
        message: { role: "user", content: text },
      });
    } else {
      pendingMessageRef.current = text;
      startCall();
    }
  }, [inputMessage, isCallActive, addMessage, startCall]);

  const handleMicClick = useCallback(() => {
    if (isCallActive) {
      stopCall();
    } else {
      startCall();
    }
  }, [isCallActive, startCall, stopCall]);

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
                        isCallActive ? "bg-green-500 animate-pulse" : isConnecting ? "bg-yellow-500 animate-pulse" : vapiReady ? "bg-gray-500" : "bg-red-500"
                      )} />
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                        {isCallActive ? "Live" : isConnecting ? "Connecting..." : vapiReady ? "Ready" : "Loading..."}
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
                      Click the mic button or type below to talk to Sheetal.
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
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                      placeholder="Type a message..."
                      disabled={!vapiReady}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-5 pr-14 py-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all placeholder:text-gray-600 disabled:opacity-50"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputMessage.trim() || !vapiReady}
                      className="absolute right-2 top-2 bottom-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-20 text-white rounded-xl px-3 transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleMicClick}
                    disabled={isConnecting || !vapiReady}
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
