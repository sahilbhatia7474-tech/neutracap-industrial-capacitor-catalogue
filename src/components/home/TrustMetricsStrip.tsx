/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TRUST / EXPERIENCE METRICS STRIP COMPONENT (PREMIUM INDUSTRIAL)
 * - Color System: Deep Navy #071426, Midnight Blue #0B1F36, Steel Blue #173A5E, Electric Cyan #35C6E8, Warm Copper #D98A4A
 * - Content per Approved Baseline:
 *   - 35+ Years Experience (Heritage since 1989)
 *   - 490+ Engineered Variants Baseline
 *   - 10,000+ Satisfied Industrial Partners & OEMs
 *   - 28+ States Market Presence & Global Readiness
 */

import React from 'react';
import { ShieldCheck, Layers, Users, Globe2 } from 'lucide-react';
import { TRUST_METRICS } from '../../data/mockCatalogue';

export const TrustMetricsStrip: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#D98A4A]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#35C6E8]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#16A34A]" />;
      case 'Globe2':
        return <Globe2 className="w-5 h-5 text-[#35C6E8]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#35C6E8]" />;
    }
  };

  return (
    <section 
      id="trust-metrics-strip" 
      className="py-10 bg-[#0B1F36] text-white border-b border-[#173A5E] relative overflow-hidden"
    >
      {/* Background Subtle Industrial Grid */}
      <div className="absolute inset-0 bg-industrial-grid-dark opacity-20 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TRUST_METRICS.map((metric) => (
            <div 
              key={metric.id}
              id={`metric-item-${metric.id}`}
              className="flex flex-col items-center text-center p-5 rounded-lg bg-[#071426]/70 border border-[#173A5E] shadow-sm transition-all hover:border-[#35C6E8]/40"
            >
              <div className="w-10 h-10 rounded-md bg-[#0B1F36] border border-[#173A5E] flex items-center justify-center mb-3">
                {getIcon(metric.iconName)}
              </div>

              {/* Big Metric Number */}
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white">
                {metric.value}
              </div>

              {/* Metric Title */}
              <div className="text-xs font-bold text-[#35C6E8] mt-1 uppercase tracking-wider font-mono">
                {metric.label}
              </div>

              {/* Sublabel */}
              <div className="text-[11px] text-[#A8B4C2] mt-1 max-w-[200px] leading-relaxed font-sans">
                {metric.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
