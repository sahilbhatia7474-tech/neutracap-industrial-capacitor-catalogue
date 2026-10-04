/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP FIXED TACTILE NAVIGATION DOCK (MOBILE) — OSCAR PREMIER EDITION
 * - Multi-layered frosted obsidian chassis with 1px top specular hairline highlight
 * - Concentric metallic icon medallions with live status illumination
 * - 5 Equal-width columns with aerospace tactile haptics & safe-area padding
 * - High-craft typographic tracking: font-mono text-[9px] font-bold tracking-[0.16em]
 */

import React from 'react';
import { Home, Layers, Search, SlidersHorizontal, MessageSquare } from 'lucide-react';
import { ProductFamilyId } from '../../types';

export interface MobileNavProps {
  activeSection: string;
  onNavigate: (sectionId: string, familyId?: ProductFamilyId) => void;
  onOpenEnquiry: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeSection,
  onNavigate,
  onOpenEnquiry,
}) => {
  const items = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'products', label: 'PORTFOLIO', icon: Layers },
    { id: 'finder', label: 'FINDER', icon: Search },
    { id: 'custom', label: 'OEM DESK', icon: SlidersHorizontal },
    { id: 'enquire', label: 'ENQUIRE', icon: MessageSquare, isAction: true },
  ];

  return (
    <nav 
      id="mobile-fixed-nav-dock"
      aria-label="Mobile Navigation Dock"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-gradient-to-t from-[#020610] via-[#061224]/98 to-[#040D1A]/95 backdrop-blur-2xl border-t border-white/15 shadow-[0_-12px_40px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.18)] px-2.5 pt-2 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] select-none"
    >
      {/* Top Specular Micro-Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#35C6E8]/60 to-transparent pointer-events-none"></div>

      <div className="grid grid-cols-5 w-full max-w-lg mx-auto items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          if (item.isAction) {
            return (
              <button
                key={item.id}
                id="mobile-nav-action-enquire"
                onClick={onOpenEnquiry}
                className="w-full flex flex-col items-center justify-center py-1 active:scale-92 transition-all cursor-pointer group"
                aria-label="Enquire Factory Desk"
              >
                {/* Oscar-Grade Emerald Action Medallion */}
                <div className="relative w-11 h-9 rounded-xl bg-gradient-to-b from-[#10B981] via-[#059669] to-[#047857] text-white flex items-center justify-center shadow-[0_0_18px_rgba(16,185,129,0.5),inset_0_1px_2px_rgba(255,255,255,0.5)] border border-emerald-300/60 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4 text-white filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_6px_#6EE7B7] animate-ping"></span>
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-200"></span>
                </div>
                <span className="text-[9px] font-mono font-black mt-1 tracking-[0.16em] text-emerald-400 uppercase truncate max-w-full drop-shadow-[0_0_4px_rgba(16,185,129,0.4)]">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex flex-col items-center justify-center py-1 transition-all duration-150 active:scale-95 cursor-pointer group ${
                isActive ? '-translate-y-0.5' : ''
              }`}
              aria-label={item.label}
            >
              {/* Oscar-Grade Tactile Navigation Medallion */}
              <div 
                className={`relative w-10 h-8 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-gradient-to-b from-[#173A5E] via-[#0D2440] to-[#061224] text-[#35C6E8] border border-[#35C6E8]/80 shadow-[0_0_14px_rgba(53,198,232,0.45),inset_0_1px_2px_rgba(255,255,255,0.35)]'
                    : 'text-[#94A3B8] hover:text-white bg-transparent hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon 
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-[#35C6E8] filter drop-shadow-[0_0_5px_#35C6E8]' : 'text-slate-400'
                  }`} 
                  strokeWidth={isActive ? 2.5 : 1.8} 
                />
                {isActive && (
                  <span className="absolute -bottom-1 w-3 h-0.5 rounded-full bg-[#35C6E8] shadow-[0_0_6px_#35C6E8]"></span>
                )}
              </div>
              <span 
                className={`text-[8.5px] font-mono tracking-[0.16em] uppercase mt-1 transition-colors truncate max-w-full ${
                  isActive 
                    ? 'font-black text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]' 
                    : 'font-semibold text-slate-400 group-hover:text-slate-200'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
