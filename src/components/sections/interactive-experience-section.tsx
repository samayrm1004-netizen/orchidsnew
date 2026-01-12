"use client";

import React from 'react';
import { Store, ArrowRight } from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';

const InteractiveExperienceSection: React.FC = () => {
  return (
    <section className="w-full relative py-32 lg:py-48 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-950 to-black"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-white/5 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
        <div className="text-center md:text-left">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
            Interactive AI <br />
            Experience
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
            Experience the future of AI-powered automation. Our voice agents and MVP solutions create immersive experiences that capture attention and drive conversions.
          </p>
          <div className="mt-12">
            <button 
              onClick={() => {
                document.getElementById('book-your-call')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="group px-8 py-4 bg-white hover:bg-gray-100 text-black rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 mx-auto md:mx-0"
            >
              <Store className="w-6 h-6" />
              <span>Explore Our Solutions</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        <div className="relative h-[500px] w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 w-full h-full">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveExperienceSection;