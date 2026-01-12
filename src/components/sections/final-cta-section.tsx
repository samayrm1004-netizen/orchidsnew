"use client";

import React from 'react';
import { Bot } from 'lucide-react';
import { useBooking } from "@/hooks/use-booking";

const FinalCtaSection = () => {
  const { openBooking } = useBooking();

  return (
    <section className="relative bg-black py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-950 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-white tracking-tight leading-tight">
          Ready to turn <span className="text-gray-400">"we should automate this"</span> into <span className="text-gray-400">"it's already handled"</span>?
        </h1>
        <p className="text-lg md:text-xl text-gray-500 italic mb-12 max-w-2xl mx-auto">
          Worst case: clarity. Best case: compound advantage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={openBooking}
            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-white hover:bg-gray-100 rounded-full transition-all duration-300 shadow-2xl shadow-white/20 hover:shadow-white/40"
          >
            <Bot className="h-5 w-5 mr-2" />
            Book Your Discovery Call
          </button>

          <a
            href="#"
            className="rounded-full px-8 py-4 text-base md:text-lg font-semibold bg-white/10 hover:bg-white/20 text-gray-300 border-2 border-white/30 hover:border-white/50 transition-all duration-300"
          >
            $250 Deep-Dive with founder
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
