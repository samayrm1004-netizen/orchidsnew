"use client";

import { Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lightning } from "@/components/ui/lightning";
import { useBooking } from "@/hooks/use-booking";

export default function HeroSection() {
  const { openBooking } = useBooking();
  const handleTalkToAI = () => {
    // Find and click the Vapi widget button to open it
    const vapiWidget = document.querySelector('vapi-widget') as any;
    if (vapiWidget) {
      // Try to open the widget via its public API
      if (typeof vapiWidget.open === 'function') {
        vapiWidget.open();
      } else {
        // Fallback: find and click the widget's trigger button
        const widgetButton = vapiWidget.shadowRoot?.querySelector('button') ||
        document.querySelector('[data-vapi-button]');
        if (widgetButton) {
          (widgetButton as HTMLElement).click();
        }
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Animated WebGL Lightning */}
      <div className="absolute inset-0 z-10 opacity-30">
        <Lightning
          hue={0}
          xOffset={0}
          speed={0.5}
          intensity={1.5}
          size={1.2} />

      </div>
      
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="space-y-8 mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <div className="mb-2">Build Faster.</div>
            <div className="mb-2 text-gray-300">Sell Smarter.</div>
            <div className="text-gray-400">Sleep Better.</div>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed !whitespace-pre-line">AI systems that handle the grind 24/7
            <span className="text-white font-semibold !whitespace-pre-line !whitespace-pre-line"></span>
          </p>
        </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button
              size="lg"
              className="group rounded-full px-8 py-6 text-lg font-semibold bg-white hover:bg-gray-100 text-black shadow-2xl shadow-white/20 hover:shadow-white/40 transition-all duration-300"
              onClick={openBooking}
            >
              <Bot className="w-6 h-6 mr-3" />
              <span>Book Discovery Call</span>
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button

            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-lg font-semibold text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            onClick={handleTalkToAI}>

            Talk to AI
          </Button>
        </div>

        {/* Feature badges - simplified and cleaner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
          { title: "AI Voice", subtitle: "24/7 agents" },
          { title: "MVP/SaaS", subtitle: "weeks not quarters" },
          { title: "Production", subtitle: "ready systems" },
          { title: "ROI-focused", subtitle: "custom quotes" }].
          map((badge, i) =>
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="font-semibold text-white text-sm">{badge.title}</div>
              <div className="text-gray-400 text-xs">{badge.subtitle}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}