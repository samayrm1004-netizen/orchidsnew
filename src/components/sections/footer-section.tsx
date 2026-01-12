"use client";

import { Phone, MessageCircle, Mail } from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/hooks/use-booking";

export default function FooterSection() {
  const { openBooking } = useBooking();
  return (
    <footer className="relative bg-black text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10">
                  <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8/generated_images/ultra-hd-professional-minimalist-logo-de-71f413a5-20251018055722.jpg?"
                  alt="Cosmos Logo"
                  fill
                  className="object-contain" />

                </div>
                <span className="text-2xl font-bold tracking-tighter">COSMOS</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                AI-powered solutions that accelerate growth and redefine business efficiency.
              </p>
              <p className="text-gray-500 italic text-sm">
                "We build what moves numbers"
              </p>
            </div>

            {/* Links Column */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-6">Quick Links</h3>
              <nav className="flex flex-col space-y-3">
                {["Services", "Methodology", "Case Studies", "FAQ"].map((link) =>
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium">

                    {link}
                  </a>
              )}
              </nav>
            </div>

            {/* Support & Contact Column */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-6">Support & Contact</h3>
              <div className="flex flex-col space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Any Queries?</p>
                  <a href="mailto:SUPPORT@COSMOSAI.ONLINE" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group">
                    <Mail className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                    SUPPORT@COSMOSAI.ONLINE
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Reach out to us</p>
                  <a href="mailto:TEAM@COSMOSAI.ONLINE" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group">
                    <Mail className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                    TEAM@COSMOSAI.ONLINE
                  </a>
                </div>
                <div className="pt-2 flex gap-3">
                  <a
                  href="mailto:SUPPORT@COSMOSAI.ONLINE"
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-bold uppercase tracking-wider text-white transition-all">

                    Support
                  </a>
                  <a
                  href="mailto:TEAM@COSMOSAI.ONLINE"
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-bold uppercase tracking-wider text-white transition-all">

                    Contact
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Column */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-6">Get Started</h3>
              <div className="flex flex-col gap-3">
                <button
                onClick={openBooking}
                className="w-full text-center px-6 py-3 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-white/5">

                  Book Discovery Call
                </button>
                <a
                href="#"
                className="w-full text-center px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-xs uppercase tracking-widest transition-all duration-300">

                  $250 Deep-Dive
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 text-[11px] font-medium uppercase tracking-widest text-gray-500">
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a
                href="tel:+919328828231"
                className="flex items-center gap-2 hover:text-white transition-colors !whitespace-pre-line">

                  <Phone className="w-3.5 h-3.5" />+91 9328828231

              </a>
                <a
                href="https://wa.me/919328828231"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors">

                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
                © 2025 Cosmos. Developed by Cosmos AI Team.
              </p>
            </div>
          </div>
        </div>
    </footer>);

}