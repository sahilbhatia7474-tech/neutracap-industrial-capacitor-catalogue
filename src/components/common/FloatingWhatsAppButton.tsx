/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GLOBAL FLOATING WHATSAPP BUTTON
 * - Official WhatsApp visual identity glyph
 * - Canonical Destination: +91 9953239674
 * - Dynamically positioned above the mobile navigation dock & safe-area:
 *   Mobile: bottom-[calc(env(safe-area-inset-bottom,0px)+4.75rem)]
 *   Desktop: bottom-6
 * - Never overlaps the 5 navigation tabs, CTA buttons, or content
 */

import React, { useState } from 'react';
import { CANONICAL_WHATSAPP_NUMBER, CANONICAL_WHATSAPP_DISPLAY } from '../../data/siteFacts';
import { CapacitorVariant } from '../../types';
import { WhatsAppIcon } from './WhatsAppIcon';

export interface FloatingWhatsAppButtonProps {
  currentProduct?: CapacitorVariant | null;
  productQuantity?: number;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  currentProduct,
  productQuantity = 10,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    let message = '';

    if (currentProduct) {
      // PRODUCT CONTEXT per Spec:
      message = `Hello NeutraCap Factory Desk,\n\nI am interested in:\n\n${currentProduct.productName}\n\nSKU: ${currentProduct.sku}\nCapacitance: ${currentProduct.capacitanceDisplay}\nVoltage: ${currentProduct.voltageDisplay}\nQuantity: ${productQuantity} units\n\nPlease share availability, commercial terms and dispatch details.`;
    } else {
      // GENERAL FLOATING WHATSAPP per Spec:
      message = `Hello NeutraCap Factory Desk,\n\nI would like assistance in selecting an industrial capacitor for my application.\n\nPlease connect me with the factory sales desk.`;
    }

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${CANONICAL_WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  return (
    <div 
      id="floating-whatsapp-container"
      className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+4.75rem)] md:bottom-7 right-4 sm:right-7 z-40 flex items-center gap-3.5 select-none pointer-events-auto"
    >
      {/* Luxury Tooltip on Hover (Desktop) — Oscar-Grade Typographic Pill */}
      <div 
        className={`hidden sm:flex items-center gap-3 bg-gradient-to-r from-[#071626]/95 via-[#0B223D]/95 to-[#051120]/95 backdrop-blur-xl text-white px-4 py-2.5 rounded-2xl border border-[#35C6E8]/40 shadow-[0_12px_35px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25)] text-xs font-sans transition-all duration-200 pointer-events-none ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
        }`}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
        </span>
        <div className="text-left font-mono">
          <div className="text-[9.5px] uppercase tracking-wider text-slate-400 font-semibold">DIRECT FACTORY DESK</div>
          <div className="text-xs font-bold text-white tracking-tight">
            WhatsApp: <strong className="text-[#35C6E8] drop-shadow-[0_0_6px_rgba(53,198,232,0.6)]">{CANONICAL_WHATSAPP_DISPLAY}</strong>
          </div>
        </div>
      </div>

      {/* Floating Action Button with Official WhatsApp Icon — Oscar-Grade Iconic Jewel */}
      <button
        id="global-floating-whatsapp-btn"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Direct WhatsApp Factory Sales Desk (+91 9953239674)"
        title="Direct WhatsApp Factory Sales Desk (+91 9953239674)"
        className="group relative w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-gradient-to-br from-[#22C55E] via-[#16A34A] to-[#14532D] hover:from-[#4ADE80] hover:to-[#16A34A] active:scale-95 text-white flex items-center justify-center shadow-[0_10px_35px_rgba(22,163,74,0.5),inset_0_2px_3px_rgba(255,255,255,0.6)] hover:shadow-[0_0_40px_rgba(34,197,94,0.75)] border-2 border-emerald-200/80 transition-all duration-200 cursor-pointer overflow-hidden"
      >
        {/* Subtle Specular Sheen Sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"></div>

        {/* Ambient Ring Wave */}
        <div className="absolute -inset-1 rounded-2xl bg-emerald-400/20 group-hover:bg-emerald-400/40 blur-xs transition-all pointer-events-none"></div>

        {/* Official WhatsApp Glyph */}
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white transform group-hover:scale-110 transition-transform duration-200 relative z-10 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />

        {/* Live Factory Desk Online Indicator */}
        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-200 border border-white shadow-[0_0_6px_#A7F3D0] z-20 animate-pulse"></span>
      </button>
    </div>
  );
};
