"use client";

import NavigationHeader from "@/components/sections/navigation-header";
import HeroSection from "@/components/sections/hero-section";
import WhyChooseSection from "@/components/sections/why-choose-section";
import CoreServicesSection from "@/components/sections/core-services-section";
import MethodologySection from "@/components/sections/methodology-section";
import InteractiveExperienceSection from "@/components/sections/interactive-experience-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import CtaBookingSection from "@/components/sections/cta-booking-section";
import ClientsShowcaseSection from "@/components/sections/clients-showcase-section";
import FaqSection from "@/components/sections/faq-section";
import FinalCtaSection from "@/components/sections/final-cta-section";
import FooterSection from "@/components/sections/footer-section";
import { BookingProvider } from "@/hooks/use-booking";
import BookingDialog from "@/components/ui/booking-dialog";

export default function Page() {
  return (
    <BookingProvider>
      <main className="relative min-h-screen bg-background-primary">
        <NavigationHeader />
        
        <HeroSection />

        {/* Support Banner */}
        <div className="w-full bg-zinc-900 border-b border-white/5 py-3">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-[10px] md:text-xs font-medium tracking-widest text-gray-500 uppercase">
            <div className="flex items-center gap-2">
              <span>ANY QUERIES =</span>
              <a href="mailto:SUPPORT@COSMOSAI.ONLINE" className="text-white hover:text-gray-300 transition-colors">SUPPORT@COSMOSAI.ONLINE</a>
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              <span>REACH OUT TO US AT</span>
              <a href="mailto:TEAM@COSMOSAI.ONLINE" className="text-white hover:text-gray-300 transition-colors">TEAM@COSMOSAI.ONLINE</a>
            </div>
          </div>
        </div>

        <WhyChooseSection />
        <CoreServicesSection />
        <MethodologySection />
        <InteractiveExperienceSection />
        <TestimonialsSection />
        <CtaBookingSection />
        <ClientsShowcaseSection />
        <FaqSection />
        <FinalCtaSection />
        <FooterSection />
        
        <BookingDialog />
      </main>
    </BookingProvider>
  );
}
