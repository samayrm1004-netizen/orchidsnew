"use client";

import React, { useRef, MouseEvent } from "react";
import { Target, Star, Code, Rocket, ArrowRight } from "lucide-react";
import { useBooking } from "@/hooks/use-booking";

const useParallax = (ref: React.RefObject<HTMLElement>) => {
  const onMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 40;
    const y = (clientY - top - height / 2) / 40;
    ref.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const onMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
    }
  };

  return { onMouseMove, onMouseLeave };
};

interface MethodologyCardProps {
  step: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const MethodologyCard: React.FC<MethodologyCardProps> = ({ step, title, description, icon: Icon }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { onMouseMove, onMouseLeave } = useParallax(cardRef);

  return (
    <div
      ref={cardRef}
      className="relative group h-full p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-200"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.2s ease-out' }}>

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

      <div className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-white rounded-full text-black font-bold text-sm shadow-md z-10">
        {step}
      </div>

      <div className="flex flex-col items-start h-full">
        <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg transition-all duration-300 group-hover:scale-105">
          <Icon className="w-10 h-10 text-black" />
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>);

};

const methodologySteps = [
{
  step: "01",
  title: "Discover",
  description: "Goals, users, jobs-to-be-done. We define success and economics, not just features.",
  icon: Target
},
{
  step: "02",
  title: "Design",
  description: "Conversation maps or product flows that remove friction. Scripts that sell. Metrics that matter.",
  icon: Star
},
{
  step: "03",
  title: "Build",
  description: "Tight sprints. Early demos. Your stack, your rules. No \"integration theater.\"",
  icon: Code
},
{
  step: "04",
  title: "Deploy & Learn",
  description: "Ship, instrument, review weekly, iterate. Keep what converts, cut what doesn't.",
  icon: Rocket
}];


const MethodologySection = () => {
  const { openBooking } = useBooking();

  return (
    <section className="relative bg-black py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-gray-300">
              OUR METHODOLOGY
            </span>
          </div>

          <h2 className="font-bold text-4xl tracking-tight text-white sm:text-6xl">
            How We Work
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            We operate like a product team: ship fast, measure honestly, iterate to traction.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {methodologySteps.map((item) =>
          <MethodologyCard key={item.step} {...item} />
          )}
        </div>

        <div className="mt-20 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <button
            onClick={openBooking}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-gray-100 px-8 py-3 font-semibold text-black transition-all duration-300">

            Book Your Discovery Call
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <a
            href="#"
            className="rounded-full px-8 py-3 text-base font-semibold bg-white/10 hover:bg-white/20 text-gray-300 border-2 border-white/30 hover:border-white/50 transition-all duration-300 !whitespace-pre-line">
            $250 Deep-Dive with Founder

          </a>
        </div>
      </div>
    </section>);

};

export default MethodologySection;