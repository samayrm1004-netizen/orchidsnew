"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/hooks/use-booking";

const faqItems = [
  {
    question: "Is this custom?",
    answer:
      "Absolutely. Every solution is tailored to your specific business needs, existing workflows, and tech stack. We don't do 'one-size-fits-all' because your business challenges aren't generic.",
  },
  {
    question: "Voice agent or human?",
    answer:
      "Our AI voice agents are designed to handle the majority of interactions with human-like intelligence and empathy. However, we build in seamless, intelligent handoff protocols to transfer complex or sensitive conversations to your human team members at the perfect moment.",
  },
  {
    question: "How fast can we go live?",
    answer:
      "Our streamlined process and modular architecture mean we move quickly. For voice agents, a typical deployment is between 7 to 14 days. For MVP & Micro-SaaS projects, we often deliver the first version within 4-6 weeks.",
  },
  {
    question: "Security & data?",
    answer:
      "Security is non-negotiable. We follow SOC2-ready processes, implement end-to-end encryption, and ensure data is handled with the strictest privacy and compliance standards. Your data's integrity and safety are paramount.",
  },
  {
    question: "Do you disclose pricing?",
    answer:
      "We provide custom quotes after our initial discovery call because every project is unique. This ensures you only pay for what you need. For a detailed discussion, book a call. We also offer a fixed-price $250 Deep-Dive for an in-depth strategy session.",
  },
  {
    question: "What tech stacks do you support?",
    answer:
      "We are stack-agnostic and work with what you already have. Whether you're on a modern stack like Next.js, a traditional backend like Django/Ruby on Rails, or use specific CRMs like HubSpot and Salesforce, we integrate seamlessly.",
  },
];

const FaqSection = () => {
  const { openBooking } = useBooking();

  return (
    <section className="relative overflow-hidden bg-background-primary py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-background-secondary to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(167,139,250,0.1)_0%,_transparent_50%)]" />
      
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-5xl font-bold tracking-tight text-text-primary sm:text-6xl">
            FAQs
          </h2>
          <p className="mt-4 font-body text-xl text-text-tertiary">
            (straight talk)
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-16 w-full space-y-4"
        >
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="group rounded-xl border border-border/50 bg-background-tertiary transition-all duration-300 hover:border-accent-primary/50 data-[state=open]:border-accent-primary/70 hover:shadow-2xl hover:shadow-primary/10"
            >
              <AccordionTrigger className="w-full p-6 text-left font-medium text-text-secondary transition-colors hover:text-text-primary [&>svg]:text-accent-primary">
                <span className="text-lg">{item.question}</span>
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0 text-base text-text-tertiary">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 text-center">
          <Button
            onClick={openBooking}
            variant="outline"
            className="group h-14 rounded-full border-2 border-primary bg-transparent px-8 text-base font-semibold text-text-primary shadow-[0_0_20px_rgba(167,139,250,0.3)] transition-all duration-300 hover:bg-primary/10 hover:text-white hover:shadow-[0_0_30px_rgba(167,139,250,0.5)] hover:border-primary"
          >
            <Bot className="mr-3 h-5 w-5" />
            Book Your Discovery Call
            <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
