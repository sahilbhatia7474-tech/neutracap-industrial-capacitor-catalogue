/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP BRAND IDENTITY & LOGO SYSTEM
 * Engineered typographic wordmark + geometric precision monogram.
 * Locations: Header, Mobile Header, Footer, Founder Vault, AI Assistant, Modals.
 * Includes replaceable official logo asset slot architecture.
 */

import React from 'react';

export interface NeutraCapLogoProps {
  variant?: 'header' | 'mobile' | 'footer' | 'monogram' | 'card' | 'badge' | 'vault' | 'assist';
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  showTagline?: boolean;
  officialLogoUrl?: string | null;
}

export const NeutraCapLogo: React.FC<NeutraCapLogoProps> = ({
  variant = 'header',
  theme = 'light',
  className = '',
  showTagline = true,
  officialLogoUrl = null,
}) => {
  const isDark = theme === 'dark' || variant === 'vault' || variant === 'footer';

  // If official uploaded logo asset is provided, render the asset directly
  if (officialLogoUrl) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img 
          src={officialLogoUrl} 
          alt="NEUTRACAP" 
          className="h-9 md:h-10 w-auto object-contain"
        />
      </div>
    );
  }

  // 1. Monogram Only (SCADA, Favicon, Technical Badges, Avatar)
  if (variant === 'monogram' || variant === 'assist') {
    return (
      <div 
        id="neutracap-monogram-logo" 
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        aria-label="NeutraCap Monogram"
      >
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Precision Industrial Frame with Chamfered Corners */}
          <rect 
            x="2" 
            y="2" 
            width="44" 
            height="44" 
            rx="9" 
            className={isDark ? "fill-[#0A2A5E] stroke-[#0066FF]/60" : "fill-[#0A2A5E] stroke-[#0A2A5E]"}
            strokeWidth="2.5" 
          />
          
          {/* Dual Parallel Capacitor Plates Geometry */}
          <line x1="21" y1="12" x2="21" y2="36" stroke="#0066FF" strokeWidth="2.75" strokeLinecap="round" />
          <line x1="27" y1="12" x2="27" y2="36" stroke="#16A34A" strokeWidth="2.75" strokeLinecap="round" />
          
          {/* Engineered 'N' Geometry on Left Plate */}
          <path 
            d="M12 34V14L21 27V34" 
            stroke="#FFFFFF" 
            strokeWidth="2.75" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          
          {/* Engineered 'C' Geometry on Right Plate */}
          <path 
            d="M36 17H29C27.8954 17 27 17.8954 27 19V29C27 30.1046 27.8954 31 29 31H36" 
            stroke="#FFFFFF" 
            strokeWidth="2.75" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Precision Micro Electrical Terminals */}
          <circle cx="21" cy="8.5" r="1.75" fill="#0066FF" />
          <circle cx="27" cy="39.5" r="1.75" fill="#16A34A" />
        </svg>
      </div>
    );
  }

  // 2. Mobile Header Lockup (Award-Level Iconic Medallion)
  if (variant === 'mobile') {
    return (
      <div 
        id="neutracap-mobile-logo" 
        className={`flex items-center gap-2.5 select-none ${className}`}
      >
        <div className="w-8 h-8 shrink-0 relative flex items-center justify-center rounded-xl bg-gradient-to-b from-[#143252] via-[#0A1D33] to-[#040C17] border border-[#35C6E8]/70 shadow-[0_0_15px_rgba(53,198,232,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)]">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
            <line x1="21" y1="12" x2="21" y2="36" stroke="#35C6E8" strokeWidth="2.75" strokeLinecap="round" />
            <line x1="27" y1="12" x2="27" y2="36" stroke="#10B981" strokeWidth="2.75" strokeLinecap="round" />
            <path d="M12 34V14L21 26V34" stroke="#FFFFFF" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M36 17H29C27.8954 17 27 17.8954 27 19V29C27 30.1046 27.8954 31 29 31H36" stroke="#FFFFFF" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="21" cy="9" r="1.5" fill="#35C6E8" />
            <circle cx="27" cy="39" r="1.5" fill="#10B981" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#35C6E8] shadow-[0_0_5px_#35C6E8] animate-pulse"></span>
        </div>
        <span className={`text-[17px] font-black tracking-tight font-display leading-none ${isDark ? 'text-white' : 'text-[#071426]'}`}>
          NEUTRACAP
        </span>
      </div>
    );
  }

  // 3. Founder Vault Lockup
  if (variant === 'vault') {
    return (
      <div 
        id="neutracap-vault-logo" 
        className={`flex items-center gap-3 select-none ${className}`}
      >
        <div className="w-8 h-8 shrink-0 rounded-lg bg-[#0066FF] text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
          NC
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-base font-black tracking-tight text-white font-display">
              NEUTRACAP
            </span>
            <span className="px-1.5 py-0.2 rounded bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/40 text-[9px] font-mono font-bold">
              VAULT 2.0
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
            PRIVATE CONTROL CENTRE
          </span>
        </div>
      </div>
    );
  }

  // 4. Primary Master Lockup (Header, Footer, Document Header)
  return (
    <div 
      id="neutracap-main-logo" 
      className={`flex items-center gap-3.5 select-none ${className}`}
    >
      {/* Precision Monogram Frame — Award-Level Medallion */}
      <div className="w-10 h-10 md:w-11 md:h-11 shrink-0 relative flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#143252] via-[#0A1D33] to-[#040C17] border border-[#35C6E8]/70 shadow-[0_0_20px_rgba(53,198,232,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)] transition-transform duration-200 group-hover:scale-105 group-hover:shadow-[0_0_28px_rgba(53,198,232,0.6)]">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
          {/* Dielectric Gap / Parallel Plates */}
          <line x1="21" y1="11" x2="21" y2="37" stroke="#35C6E8" strokeWidth="2.75" strokeLinecap="round" />
          <line x1="27" y1="11" x2="27" y2="37" stroke="#10B981" strokeWidth="2.75" strokeLinecap="round" />
          {/* NC Monogram Letters */}
          <path d="M12 34V14L21 27V34" stroke="#FFFFFF" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M36 17H29C27.8954 17 27 17.8954 27 19V29C27 30.1046 27.8954 31 29 31H36" stroke="#FFFFFF" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
          {/* Micro Terminals with ambient glow */}
          <circle cx="21" cy="7.5" r="1.75" fill="#35C6E8" />
          <circle cx="27" cy="40.5" r="1.75" fill="#10B981" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#35C6E8] shadow-[0_0_6px_#35C6E8] animate-pulse"></span>
      </div>

      {/* High-Craft Engineered Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className={`text-xl md:text-[22px] font-black tracking-[-0.035em] font-display leading-none ${isDark ? 'text-white' : 'text-[#0A2A5E]'}`}>
            NEUTRACAP
          </span>
        </div>

        {showTagline && (
          <span className={`text-[8.5px] md:text-[9px] font-bold tracking-[0.22em] uppercase mt-1 font-mono ${isDark ? 'text-slate-400' : 'text-[#0066FF]'}`}>
            PRECISION CAPACITORS · EST. 1989
          </span>
        )}
      </div>
    </div>
  );
};
