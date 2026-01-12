"use client";

import { useState } from 'react';
import {
  Phone,
  Rocket,
  Target,
  Zap,
  RefreshCw,
  MessageSquare,
  Mic,
  BarChart,
  Webhook,
  Calendar,
  GitBranch
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AIFeatures = [
  {
    icon: Target,
    text: 'Inbound that never misses: greet → qualify → route → schedule',
  },
  {
    icon: Phone,
    text: 'Outbound that performs: targeted campaigns, callbacks, re-engagement',
  },
  {
    icon: Zap,
    text: 'Follow-ups on rails: multistep cadences across phone/SMS/WhatsApp/email',
  },
  {
    icon: RefreshCw,
    text: 'CRM-native: notes, statuses, tasks—no data dead-ends',
  },
  {
    icon: MessageSquare,
    text: 'Human-grade: natural dialogue, context memory, graceful handoff to your team',
  },
];

const DashboardIcons = [
    { icon: Mic, label: 'Voice AI' },
    { icon: RefreshCw, label: 'CRM Sync' },
    { icon: BarChart, label: 'Analytics' },
    { icon: Webhook, label: 'Webhooks' },
    { icon: Calendar, label: 'Calendar' },
    { icon: GitBranch, label: 'Flows' },
];

const PerformanceDashboard = () => {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const progress = 25;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-gray-300/20 rounded-3xl blur opacity-20 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
            <div className="relative bg-background-tertiary/80 border border-border/70 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl shadow-gray-900/50 group-hover:border-white/30 transition-all duration-500 group-hover:scale-[1.02]">
                <div className="flex items-center gap-2 mb-6">
                    <div className="relative flex items-center">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-300 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                    </div>
                    <p className="text-sm font-medium text-gray-300">AI Voice Performance</p>
                    <p className="text-xs text-muted-foreground ml-auto">Real-time analytics dashboard</p>
                </div>

                <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-6">
                    <svg className="w-full h-full" viewBox="0 0 120 120">
                        <defs>
                            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFFFFF" />
                                <stop offset="100%" stopColor="#D1D5DB" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="60"
                            cy="60"
                            r={radius}
                            fill="none"
                            stroke="var(--color-background-accent)"
                            strokeWidth="8"
                        />
                        <circle
                            cx="60"
                            cy="60"
                            r={radius}
                            fill="none"
                            stroke="url(#gaugeGradient)"
                            strokeWidth="10"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            transform="rotate(-90 60 60)"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">25%</span>
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h4 className="text-2xl font-semibold text-white mb-2 font-subheading">AI Voice Performance</h4>
                    <p className="text-muted-foreground">Real-time analytics and conversation intelligence</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                    {DashboardIcons.map((item, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-white transition-colors duration-300">
                             <div className="bg-background-secondary/50 p-3 rounded-xl border border-border/50 group-hover:border-white/20 transition-colors">
                                <item.icon className="w-5 h-5 sm:w-6 sm:h-6"/>
                            </div>
                            <span className="text-xs font-medium">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default function CoreServicesSection() {
  const [activeTab, setActiveTab] = useState('ai');

  return (
    <section className="py-24 sm:py-32 bg-background-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary via-gray-900/10 to-background-primary"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-3xl opacity-50"></div>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white tracking-tight">Our Core Services</h2>
          <p className="text-xl md:text-2xl text-text-secondary font-light max-w-3xl mx-auto leading-relaxed">Two pillars. One goal: revenue momentum.</p>
        </div>

        <div className="flex justify-center mb-20">
          <div className="relative flex p-1 bg-background-tertiary/50 border border-border rounded-full backdrop-blur-sm shadow-lg">
            <button
              onClick={() => setActiveTab('ai')}
              className={cn(
                "relative px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm sm:text-base flex items-center gap-2",
                activeTab === 'ai'
                  ? 'text-gray-900 bg-gradient-to-r from-white to-gray-300 shadow-lg shadow-white/20 border border-white/50'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'
              )}
            >
              <Phone className="w-4 h-4" />
              <span>AI Voice Agents</span>
            </button>
            <button
              onClick={() => setActiveTab('mvp')}
              className={cn(
                "relative px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm sm:text-base flex items-center gap-2",
                activeTab === 'mvp'
                  ? 'text-gray-900 bg-gradient-to-r from-white to-gray-300 shadow-lg shadow-white/20 border border-white/50'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'
              )}
            >
              <Rocket className="w-4 h-4" />
              <span>MVP & Micro-SaaS</span>
            </button>
          </div>
        </div>

        {activeTab === 'ai' && (
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
            <div className="space-y-8 animate-in fade-in duration-700">
                <div className="flex items-start gap-6">
                    <div className="relative group flex-shrink-0">
                        <div className="bg-white/10 border border-white/20 rounded-2xl p-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-white/40">
                            <Phone className="w-8 h-8 text-gray-300" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 text-white !leading-tight">AI Voice Agents (Inbound + Outbound)</h3>
                        <p className="text-lg text-text-secondary">Your always-on receptionist + SDR—polite, persistent, and impossible to "forget to follow up."</p>
                    </div>
                </div>

              <ul className="space-y-6 pt-4">
                {AIFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="bg-white/10 border border-white/20 rounded-lg p-2.5 flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-gray-300" />
                    </div>
                    <p className="text-text-secondary pt-1.5">{feature.text}</p>
                  </li>
                ))}
              </ul>
              <div className="border border-border/50 rounded-xl p-4 text-center text-text-tertiary bg-background-secondary mt-12">
                <p><strong>Go-live speed:</strong> typically 7–14 days • See it in action on your discovery call</p>
              </div>
            </div>
            <div className="relative mt-12 lg:mt-0 animate-in fade-in zoom-in-95 duration-700 delay-200">
                <PerformanceDashboard />
            </div>
          </div>
        )}
        {activeTab === 'mvp' && (
          <div className="text-center py-20 text-text-secondary animate-in fade-in duration-500">
            <h3 className="text-3xl font-display text-white mb-4">MVP & Micro-SaaS</h3>
            <p>Content for this section is being crafted and will launch soon.</p>
          </div>
        )}
      </div>
       <style jsx global>{`
          /* Starfield background effect */
          #stars {
            width: 1px; height: 1px;
            background: transparent;
            box-shadow: 779px 1336px #FFF, 324px 42px #FFF, 303px 586px #FFF, 1312px 276px #FFF, 451px 625px #FFF, 521px 1931px #FFF, 1087px 1871px #FFF, 36px 1546px #FFF, 132px 934px #FFF, 1698px 901px #FFF;
            animation: animStar 50s linear infinite;
          }
          #stars2 {
            width: 2px; height: 2px;
            background: transparent;
            box-shadow: 779px 1336px #FFF, 1312px 276px #FFF, 1698px 901px #FFF, 1087px 1871px #FFF, 1698px 1819px #FFF;
            animation: animStar 100s linear infinite;
          }
          #stars3 {
            width: 3px; height: 3px;
            background: transparent;
            box-shadow: 779px 1336px #FFF, 1312px 276px #FFF, 1698px 901px #FFF;
            animation: animStar 150s linear infinite;
          }
          #stars, #stars2, #stars3 {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 0;
          }

          @keyframes animStar {
            from { transform: translateY(0px); }
            to { transform: translateY(-2000px); }
          }
        `}</style>
    </section>
  );
}