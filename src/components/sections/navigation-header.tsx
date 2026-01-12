"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/hooks/use-booking";

export default function NavigationHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8/generated_images/ultra-hd-professional-minimalist-logo-de-71f413a5-20251018055722.jpg?"
                alt="Cosmos Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-white">COSMOS</span>
          </Link>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <button
              onClick={openBooking}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white hover:bg-gray-100 text-black font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Book Discovery Call
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-6 space-y-4">
            <button
              onClick={() => {
                openBooking();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-center px-8 py-3 rounded-full bg-white hover:bg-gray-100 text-black font-semibold transition-all duration-300"
            >
              Book Discovery Call
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
