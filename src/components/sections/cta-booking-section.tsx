"use client";

import { Button } from "@/components/ui/button";
import { useBooking } from "@/hooks/use-booking";
import {
  Calendar,
  Check,
  Clock,
  Phone,
  ArrowRight,
  MessageCircle } from
"lucide-react";

export default function CtaBookingSection() {
  const { openBooking } = useBooking();
  const whatToExpect = [
  "Understand your current challenges and goals",
  "Identify automation opportunities in your workflow",
  "Discuss MVP validation strategies for your market",
  "Outline potential solutions and realistic timelines",
  "Define success metrics and ROI expectations"];


  return (
    <section id="book-your-call" className="relative bg-black py-32 sm:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950"></div>
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="container relative z-10 mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">
            Ready to Start
          </p>
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Ready to turn{" "}
              <span className="text-gray-400">
                "we should automate this"
              </span>{" "}
              into{" "}
              <span className="text-gray-400">
                "it's already handled"
              </span>
              ?
            </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
                Book a 30-minute discovery call or start with a $250 Deep-Dive with <span className="text-white font-medium !whitespace-pre-line">founder</span>
              </p>
            <p className="text-base sm:text-lg text-gray-500 italic">
              Worst case: clarity. Best case: compound advantage.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-3 space-y-12">
            <div>
              <h3 className="text-3xl font-semibold text-white mb-8">
                What to Expect in Your Call
              </h3>
              <ul className="space-y-5">
                {whatToExpect.map((item, index) =>
                <li key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-400 text-lg pt-0.5">
                      {item}
                    </span>
                  </li>
                )}
              </ul>
            </div>
            <div className="bg-white/5 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                Direct Contact
              </h3>
              <p className="text-gray-400 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm !whitespace-pre-line">Prefer to call directly? Reach <span className="text-white font-medium">founder.</span> at:</span>
                </div>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+919328828231"
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-gray-300 hover:text-white transition-colors">

                  <span className="!whitespace-pre-line !whitespace-pre-line">+91 9328828231</span>
                </a>
                <a
                  href="https://wa.me/919328828231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-gray-300 hover:text-white transition-colors">

                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white/5 border border-white/20 rounded-2xl p-8 shadow-2xl relative">
            <div className="relative z-10">
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 inline-flex mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-3xl font-semibold text-white">
                Discovery Call
              </h3>
              <p className="text-gray-400 mt-2 mb-8">
                30 minutes • Free consultation
              </p>

                <Button
                onClick={openBooking}
                className="w-full bg-white hover:bg-gray-100 text-black font-semibold rounded-full py-6 text-lg group transition-all duration-300">

                  Book Discovery Call
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>


              <div className="text-center my-6">
                <p className="text-sm text-gray-400 mb-2">
                  Prefer a founder session?
                </p>
                <Button className="w-full rounded-full bg-white/10 hover:bg-white/20 text-gray-300 border border-white/30 hover:border-white/50 transition-all duration-300">
                  $250 Deep-Dive with founder
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Usually responds within 2 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}