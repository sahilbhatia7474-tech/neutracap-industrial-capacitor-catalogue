/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TRUST / CAPABILITY STRIP COMPONENT
 * 4 Reusable Capability Cards:
 * 1. Precision Manufacturing
 * 2. Reliable Performance
 * 3. Tested for Excellence
 * 4. Customer Support
 */

import React from 'react';
import { Cpu, Zap, CheckCircle2, Headphones, Shield, ArrowRight } from 'lucide-react';
import { TRUST_CAPABILITIES } from '../../data/mockCatalogue';

export interface TrustCapabilityStripProps {
  onLearnMore?: () => void;
}

export const TrustCapabilityStrip: React.FC<TrustCapabilityStripProps> = ({
  onLearnMore,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#0066FF]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#0066FF]" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-[#00B140]" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-[#0A2A5E]" />;
      default:
        return <Shield className="w-6 h-6 text-[#0066FF]" />;
    }
  };

  return (
    <section 
      id="trust-capability-strip" 
      className="py-14 md:py-18 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold font-mono text-[#0066FF] uppercase tracking-widest mb-1.5">
            Engineering Rigour · Verified Standards
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A2A5E] font-display tracking-tight">
            Built For Uncompromising Reliability
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2.5">
            Every capacitor is engineered with high-purity dielectric materials, automated winding precision, and strict batch testing.
          </p>
        </div>

        {/* 4 Capability Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_CAPABILITIES.map((cap) => (
            <div
              key={cap.id}
              id={`capability-${cap.id}`}
              className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200 hover:border-[#0066FF]/40 hover:bg-blue-50/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center mb-5">
                  {getIcon(cap.iconName)}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0A2A5E] font-display mb-2">
                  {cap.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {cap.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-[#0066FF] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B140]"></span>
                <span>NEUTRACAP QUALITY STANDARD</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
