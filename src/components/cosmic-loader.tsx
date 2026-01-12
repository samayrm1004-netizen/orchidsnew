"use client";

import { useEffect, useState } from "react";

export default function CosmicLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0E1A] overflow-hidden">
      {/* Animated cosmic background */}
      <div className="absolute inset-0">
        {/* Galaxy swirl effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 animate-[spin-slow_20s_linear_infinite]">
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.2)_0%,_rgba(156,163,175,0.1)_50%,_transparent_100%)] rounded-full blur-3xl"></div>
        </div>
        
        {/* Particle field */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.7 + 0.3,
              animation: `float ${Math.random() * 10 + 10}s linear infinite ${Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Nebula clouds */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-500/10 rounded-full blur-[100px] animate-[pulse-slow_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-[80px] animate-[pulse-slow_4s_ease-in-out_infinite_1s]"></div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Cosmic logo/symbol */}
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-ping"></div>
          <div className="absolute inset-4 border-2 border-white/40 rounded-full animate-ping [animation-delay:0.3s]"></div>
          <div className="absolute inset-8 bg-gradient-to-br from-white to-gray-400 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.5)] animate-pulse"></div>
          
          {/* Orbiting particles */}
          <div className="absolute inset-0 animate-[spin-slow_6s_linear_infinite]">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
          </div>
          <div className="absolute inset-0 animate-[spin-reverse_4s_linear_infinite]">
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-gray-300 rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(200,200,200,0.8)]"></div>
          </div>
        </div>

        {/* Cosmos text */}
        <div className="text-center">
          <h1 className="text-5xl font-display font-bold text-white mb-2 tracking-wider opacity-0 animate-[fade-in_1s_ease-out_forwards]">
            COSMOS
          </h1>
          <p className="text-gray-400 text-sm tracking-[0.3em] opacity-0 animate-[fade-in_1s_ease-out_0.2s_forwards]">
            INITIALIZING
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-white via-gray-300 to-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress percentage */}
        <div className="text-white/60 text-sm font-mono animate-pulse">
          {progress}%
        </div>
      </div>
    </div>
  );
}