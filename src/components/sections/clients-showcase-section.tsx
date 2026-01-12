import React from 'react';
import Image from 'next/image';

const clients = [
  {
    name: 'Algo Vision',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/Algo-Vision-Logo-1-2.png?',
  },
  {
    name: 'Uplload',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/download-7-3.png?',
  },
  {
    name: 'Renvale',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/logo-ce6bde16-0254-4627-980d-0d0cea0103d9-4.jpg?',
  },
  {
    name: 'Jivam',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/Logo-2-5.png?',
  },
  {
    name: 'Aanitechnology',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/logo-black-6.png?',
  },
  {
    name: 'Moko',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/Moko-White-transparent-background-10.webp?',
  },
  {
    name: 'Varhity Ventures',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/Varhity-Ventures-100-copy-Transparent-2-7.png?',
  },
  {
    name: 'Beliger Shore',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/Whats-App-Image-2025-08-26-at-06-36-04-8.jpg?',
  },
];

const ClientsShowcaseSection = () => {
    const logos = [...clients, ...clients, ...clients];

    return (
        <section className="relative bg-background-primary py-24 sm:py-32 overflow-hidden border-y border-white/5">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
                <div className="text-center mb-16">
                    <div className="inline-block bg-white/5 text-gray-400 text-[10px] font-medium px-4 py-1.5 rounded-full mb-4 uppercase tracking-[0.2em] border border-white/10">
                        TRUSTED BY
                    </div>
                    <h2 className="font-bold text-4xl md:text-5xl text-white tracking-tight">
                        Who We've Worked With
                    </h2>
                    <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        Founders and teams who chose automation over hiring
                    </p>
                </div>

                <div
                    className="relative w-full overflow-hidden"
                    style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}
                >
                    <div className="flex animate-scroll">
                        {logos.map((client, index) => (
                            <div key={index} className="group relative flex-shrink-0 mx-4">
                                <div className="relative w-48 h-24 bg-zinc-800/40 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:bg-zinc-800/60 hover:border-white/20 group">
                                    <Image
                                        src={client.logo}
                                        alt={client.name}
                                        width={160}
                                        height={64}
                                        className={`relative max-h-12 w-auto object-contain transition-all duration-300 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 ${client.logo.includes('black') ? 'invert brightness-200' : ''}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="mt-16 text-center text-gray-500 italic text-sm font-medium">
                    From startups to enterprises, we've helped teams automate their way to growth
                </p>
            </div>
        </section>
    );
};

export default ClientsShowcaseSection;