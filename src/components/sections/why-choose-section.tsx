import { Shield, Zap, Target, TrendingUp } from 'lucide-react';
import { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className = '' }) => (
  <div
    className={`group relative overflow-hidden rounded-2xl bg-background-tertiary/50 border border-border/50 hover:border-white/30 transition-all duration-300 backdrop-blur-sm ${className}`}
  >
    <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/10 via-transparent to-gray-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    {children}
  </div>
);

const WhyChooseSection = () => {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background-primary via-gray-900/10 to-background-primary"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-text-primary tracking-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Cosmos</span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary font-light max-w-4xl mx-auto leading-relaxed">
            Enterprise-grade solutions built for speed, security, and scalability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <Card className="md:col-span-6 lg:col-span-2 p-8 flex flex-col items-center justify-center text-center">
            <div className="relative flex h-28 w-56 items-center justify-center mb-4">
              <div className="absolute inset-0 rounded-[50%] border-2 border-white/5"></div>
              <div className="absolute inset-2 rounded-[50%] border border-white/10"></div>
              <span className="relative text-5xl font-semibold text-text-primary">24/7</span>
            </div>
            <h3 className="text-2xl font-semibold text-text-primary font-subheading">
              Always Available
            </h3>
          </Card>

          <Card className="md:col-span-3 lg:col-span-2 p-8 text-center">
            <div className="relative mx-auto flex aspect-square size-32 rounded-full border border-border/50 before:absolute before:-inset-2 before:rounded-full before:border before:border-border/30">
              <Shield className="m-auto size-16 text-white" strokeWidth={1.5} />
            </div>
            <div className="relative z-10 mt-6 space-y-2">
              <h3 className="text-xl font-medium text-text-primary">Enterprise Security</h3>
              <p className="text-text-tertiary text-sm leading-relaxed">
                SOC2-ready processes with end-to-end encryption and compliance-first architecture.
              </p>
            </div>
          </Card>

          <Card className="md:col-span-3 lg:col-span-2 p-8 text-center">
            <div className="w-full flex items-center justify-center mb-6">
              <Zap className="size-16 text-gray-300" strokeWidth={1.5} />
            </div>
            <div className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-lg p-4 border border-gray-600/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-tertiary">Build Speed</span>
                <span className="text-sm text-gray-300">Weeks, not quarters</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-white to-gray-300 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
            <div className="relative z-10 mt-6 space-y-2">
              <h3 className="text-xl font-medium text-text-primary">Lightning Fast</h3>
              <p className="text-text-tertiary text-sm leading-relaxed">
                Rapid deployment with our proven framework and battle-tested components.
              </p>
            </div>
          </Card>

          <Card className="md:col-span-6 lg:col-span-3 p-8">
            <div className="grid h-full sm:grid-cols-2 gap-8">
              <div className="relative z-10 flex flex-col justify-center space-y-6">
                <div className="relative flex aspect-square size-12 rounded-full border border-border/50 before:absolute before:-inset-2 before:rounded-full before:border before:border-border/30">
                  <Target className="m-auto size-6 text-white" strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-text-primary">AI Voice Intelligence</h3>
                  <p className="text-text-tertiary text-sm leading-relaxed">
                    Advanced conversational AI that understands context and delivers human-grade interactions.
                  </p>
                </div>
              </div>
              <div className="relative mt-6 sm:mt-0 h-fit rounded-xl border border-border/50 p-6 bg-background-secondary">
                <div className="absolute left-3 top-3 flex gap-1.5">
                  <span className="block size-2.5 rounded-full bg-border"></span>
                  <span className="block size-2.5 rounded-full bg-border"></span>
                  <span className="block size-2.5 rounded-full bg-border"></span>
                </div>
                <div className="space-y-3 mt-8">
                  <div className="bg-background-accent/50 rounded-lg p-3 border-l-2 border-white">
                    <div className="text-xs text-gray-300 mb-1">Incoming Call</div>
                    <p className="text-sm text-text-primary">"Hi, I'm calling about pricing..."</p>
                  </div>
                  <div className="bg-background-accent/50 rounded-lg p-3 border-l-2 border-gray-400">
                    <div className="text-xs text-gray-400 mb-1">AI Response</div>
                    <p className="text-sm text-text-primary">"I'd be happy to help! Let me get you..."</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="md:col-span-6 lg:col-span-3 p-8">
            <div className="grid h-full sm:grid-cols-2 gap-8">
              <div className="relative z-10 flex flex-col justify-center space-y-6">
                <div className="relative flex aspect-square size-12 rounded-full border border-border/50 before:absolute before:-inset-2 before:rounded-full before:border before:border-border/30">
                  <TrendingUp className="m-auto size-6 text-gray-300" strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-text-primary">MVP Excellence</h3>
                  <p className="text-text-tertiary text-sm leading-relaxed">
                    Production-ready MVPs with scalable architecture, modern UI, and conversion optimization.
                  </p>
                </div>
              </div>
              <div className="relative mt-6 sm:mt-0 min-h-[150px]">
                <svg className="absolute inset-0 size-full overflow-visible" fill="none">
                  <path d="M 1,94 C 40.6667,54.3333 93.8,1.8 112,1" stroke="var(--color-border)" strokeOpacity="0.5" />
                  <circle cx="112" cy="1" r="1.5" fill="white" />
                  <path d="M 1,94 C 33.6667,112.333 49.3879,139.633 51,146" stroke="var(--color-border)" strokeOpacity="0.5" />
                  <circle cx="51" cy="146" r="1.5" fill="white" />
                  <path d="M 1,94 C 20,94 48.4,94 57,94" stroke="var(--color-border)" strokeOpacity="0.5" />
                  <circle cx="57" cy="94" r="1.5" fill="white" />
                </svg>
                <div className="relative h-full w-full">
                  <div className="absolute -top-1 right-0 rounded-lg border border-border/50 bg-background-accent/80 px-2 py-1 text-xs text-text-secondary shadow-md">Auth</div>
                  <div className="absolute top-1/2 -translate-y-[80%] right-[30%] rounded-lg border border-border/50 bg-background-accent/80 px-2 py-1 text-xs text-text-secondary shadow-md">Billing</div>
                  <div className="absolute -bottom-2 right-1/2 rounded-lg border border-border/50 bg-background-accent/80 px-2 py-1 text-xs text-text-secondary shadow-md">Analytics</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;