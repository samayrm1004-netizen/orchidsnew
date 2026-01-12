"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "RapidXAI's voice agents transformed our lead qualification process. We're booking 3x more meetings without hiring more staff.",
    name: "Sarah Chen",
    title: "CEO at TechScale",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1507003211169-0a1dd7228f2d-1.webp?",
  },
  {
    quote: "The MVP they built for us validated our market in just 3 weeks. Now we have paying customers and clear product-market fit.",
    name: "Mike Rodriguez",
    title: "Founder at DataFlow",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1472099645785-5658abf4ff4e-2.webp?",
  },
  {
    quote: "Samay and his team delivered exactly what we needed. Our AI voice system handles 80% of inbound calls flawlessly.",
    name: "Priya Sharma",
    title: "CEO, HealthTech Solutions",
    image: "",
  },
  {
    quote: "From concept to production MVP in 4 weeks. The code quality and architecture are enterprise-grade.",
    name: "David Kim",
    title: "Head of Product at StartupLab",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1519085360753-af0119f7cbe7-4.webp?",
  },
  {
    quote: "The voice AI integration with our CRM is seamless. Our sales team loves the automatic lead scoring and notes.",
    name: "Lisa Thompson",
    title: "Sales Director at GrowthCo",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1438761681033-6461ffad8d80-5.webp?",
  },
  {
    quote: "ROI was immediate. Our voice agents work 24/7 and never miss a lead. Best investment we've made this year!",
    name: "Alex Johnson",
    title: "Operations Manager at LeadGen Pro",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1500648767791-00dcc994a43e-6.webp?",
  },
  {
    quote: "The micro-SaaS they built is generating $5K MRR after just 2 months. Clean code, great UX, perfect execution.",
    name: "Emma Wilson",
    title: "Founder at AutoTools",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1544005313-94ddf0286df2-7.webp?",
  },
  {
    quote: "Finally, a team that understands both AI automation AND product development. They delivered exactly what we envisioned.",
    name: "Ryan Martinez",
    title: "CTO at InnovateAI",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1507591064344-4c6ce005b128-8.webp?",
  },
  {
    quote: "The voice agent handles complex qualification scenarios better than our junior SDRs. Incredible natural language processing.",
    name: "Maria Garcia",
    title: "Head of Sales at B2B Solutions",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1487412720507-e7ab37603c6f-9.webp?",
  },
];

const TestimonialCard = ({
  quote,
  name,
  title,
  image,
}: {
  quote: string;
  name: string;
  title: string;
  image: string;
}) => (
  <div className="group relative flex h-full flex-shrink-0 flex-col justify-between w-[380px] sm:w-[420px]">
    <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-white/20 to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    <div className="relative flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
      <svg
        className="absolute right-8 top-8 h-16 w-16 text-white/10"
        fill="currentColor"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path d="M9.981 21.902c-1.312 0-2.435-.487-3.37-1.463-.935-.975-1.402-2.16-1.402-3.556 0-1.42.46-2.61 1.38-3.571.92-.96 2.05-1.44 3.39-1.44.39 0 .76.05 1.11.15.35.1.68.25.99.45l-.75 2.85c-.3-.15-.6-.25-.9-.3-.3-.05-.6-.075-.9-.075-1.021 0-1.8.385-2.339 1.155-.54.77-.81 1.785-.81 3.045 0 1.23.27 2.25.81 3.06.54.81 1.32 1.215 2.34 1.215.45 0 .875-.105 1.275-.315.4-.21.75-.495 1.05-.855l.825 2.7c-.525.6-1.163 1.05-1.913 1.35-.75.3-1.575.45-2.475.45zm12 0c-1.313 0-2.436-.487-3.37-1.463-.936-.975-1.403-2.16-1.403-3.556 0-1.42.46-2.61 1.38-3.571.92-.96 2.05-1.44 3.39-1.44.39 0 .76.05 1.11.15.35.1.68.25.99.45l-.75 2.85c-.3-.15-.6-.25-.9-.3-.3-.05-.6-.075-.9-.075-1.021 0-1.8.385-2.34 1.155-.539.77-.809 1.785-.809 3.045 0 1.23.27 2.25.81 3.06.54.81 1.32 1.215 2.34 1.215.45 0 .875-.105 1.275-.315.4-.21.75-.495 1.05-.855l.825 2.7c-.525.6-1.162 1.05-1.912 1.35-.75.3-1.575.45-2.475.45z"></path>
      </svg>
      <p className="relative z-10 text-lg font-light text-gray-300">{quote}</p>
        <div className="relative z-10 mt-auto flex items-center gap-4">
          {image && (
            <div className="relative">
              <Image
                src={image}
                alt={name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="absolute -inset-1 rounded-full bg-white/30 opacity-50 blur-md"></div>
            </div>
          )}
          <div>
            <div className="font-semibold text-white">{name}</div>
            <div className="text-sm text-gray-400">{title}</div>
          </div>
        </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  return (
    <>
      <style>
        {`
          @keyframes scroll {
            to {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 180s linear infinite;
          }
          .pause-on-hover:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <section
        id="testimonials"
        className="relative w-full overflow-hidden bg-black px-4 py-24 sm:py-32"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-16 text-center md:mb-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold tracking-wider text-gray-300 backdrop-blur-sm">
              <Star className="h-4 w-4 text-white" />
              <span>CLIENT TESTIMONIALS</span>
            </div>

            <h2 className="mt-6 font-bold text-4xl tracking-tight text-white md:text-5xl lg:text-6xl">
              What Our Clients Say
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl">
              Don't take our word for it—hear from founders and teams who've
              transformed their businesses with Cosmos.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-black to-transparent" />
            <div className="absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-black to-transparent" />

            <div className="overflow-hidden">
              <div className="flex gap-8 pause-on-hover animate-scroll pr-8">
                {[...testimonials, ...testimonials].map((testimonial, i) => (
                  <TestimonialCard
                    key={i}
                    quote={testimonial.quote}
                    name={testimonial.name}
                    title={testimonial.title}
                    image={testimonial.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;