/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * RAPID FACTORY ENQUIRY & B2B QUOTE MODAL (ULTRA MODERN 3D INTERACTIVE PREMIER)
 * - True 3D depth architecture with multi-layer obsidian surfaces & chamfered bezels
 * - Color System: Deep Obsidian #020713, Steel Navy #071629, Electric Cyan #35C6E8, Laser Emerald #10B981
 * - Typography: Editorial display headings, IBM Plex Mono technical badges & parameters
 * - Interactive 3D input fields with inset shadow cavities & specular edge highlights
 * - Dual 3D tactile actions: Transmit to Factory Desk & Direct WhatsApp Factory Connect
 */

import React, { useState } from 'react';
import { CapacitorVariant } from '../../types';
import { 
  X, 
  Send, 
  MessageSquare, 
  CheckCircle2,
  Building2,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SITE_FACTS, CANONICAL_WHATSAPP_NUMBER, CANONICAL_WHATSAPP_DISPLAY } from '../../data/siteFacts';
import { WhatsAppIcon } from '../common/WhatsAppIcon';

export interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: CapacitorVariant | null;
  mode?: 'enquiry' | 'quote';
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  product,
  mode = 'enquiry',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    quantity: '50',
    notes: product ? `Inquiring about ${product.productName} (${product.sku})` : 'General catalogue enquiry',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello NeutraCap Factory Desk,\n\nI would like to enquire about:\nProduct: ${product?.productName || 'Industrial Capacitors'}\nQty: ${formData.quantity}\nName: ${formData.name || 'Client'}\nCompany: ${formData.company || 'N/A'}`
    );
    window.open(`https://wa.me/${CANONICAL_WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div 
      id="enquiry-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#020713]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="enquiry-dialog"
        className="w-full max-w-xl bg-gradient-to-b from-[#0B2038] via-[#071629] to-[#030B17] rounded-3xl border border-[#35C6E8]/40 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(53,198,232,0.18),inset_0_1px_2px_rgba(255,255,255,0.25)] overflow-hidden relative transform animate-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top 3D Specular Laser Hairline */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#35C6E8] to-transparent shadow-[0_0_15px_#35C6E8] z-20 pointer-events-none"></div>

        {/* Ambient 3D Volumetric Mesh & Glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#35C6E8]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#10B981]/12 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header — 3D Sculpted Aerospace Console Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#071626]/98 via-[#0B223D]/95 to-[#061424]/98 text-white flex items-center justify-between border-b border-[#35C6E8]/30 relative z-10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3.5">
            {/* 3D Tactile Icon Medallion */}
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-b from-[#173A5E] via-[#0E2A4A] to-[#07172C] flex items-center justify-center text-[#35C6E8] border border-[#35C6E8]/60 shadow-[0_0_15px_rgba(53,198,232,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)] shrink-0">
              <MessageSquare className="w-5 h-5 text-[#35C6E8] filter drop-shadow-[0_0_6px_#35C6E8]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399] animate-pulse"></span>
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold tracking-[0.18em] text-[#35C6E8] uppercase flex items-center gap-1.5 mb-0.5">
                <Sparkles className="w-3 h-3 text-[#35C6E8]" />
                <span>DIRECT FACTORY DISPATCH DESK</span>
              </div>
              <h3 className="text-base sm:text-lg font-black font-display text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {mode === 'quote' ? 'Request Formal B2B Quotation' : 'Direct Factory Enquiry'}
              </h3>
              <p className="text-[11.5px] text-slate-300 font-sans">
                {product ? product.productName : `NeutraCap ${SITE_FACTS.establishedExperienceYears} Years Verified Engineering Heritage`}
              </p>
            </div>
          </div>

          {/* 3D Sculpted Close Pill */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/15 hover:border-[#35C6E8]/60 shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all cursor-pointer active:scale-95"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body — 3D Sculpted Dark Console Surface */}
        <div className="p-6 sm:p-8 bg-[#040D1C]/92 relative z-10 max-h-[calc(88vh-80px)] overflow-y-auto">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              {/* 3D Success Medallion */}
              <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-b from-[#062618] via-[#03180F] to-[#010B07] text-[#10B981] border border-emerald-400/60 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.4),inset_0_1px_2px_rgba(255,255,255,0.3)]">
                <CheckCircle2 className="w-9 h-9 text-emerald-400 filter drop-shadow-[0_0_8px_#10B981]" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-300 shadow-[0_0_8px_#6EE7B7] animate-ping"></span>
              </div>
              <h4 className="text-xl font-black text-white font-display tracking-tight">
                Enquiry Transmitted to Factory Desk
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto font-sans leading-relaxed">
                Our sales engineering desk will connect directly with verified factory pricing, MOQ tiers, and dispatch schedules.
              </p>
              <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] hover:from-[#34D399] hover:to-[#059669] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-emerald-300/50 shadow-[0_8px_25px_rgba(16,185,129,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)] cursor-pointer active:scale-95 transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Open WhatsApp Directly</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/15 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer active:scale-95 transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              {/* Product Context 3D Card (if present) */}
              {product && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0B2038] via-[#0D2644] to-[#07172C] border border-[#35C6E8]/35 shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white font-sans text-sm block">{product.productName}</span>
                    <span className="text-[#35C6E8] block text-[11px] font-mono mt-0.5">
                      SKU: {product.sku} · {product.capacitanceDisplay} · {product.voltageDisplay}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-lg bg-[#35C6E8]/15 border border-[#35C6E8]/40 font-mono font-bold text-[#35C6E8] text-xs shadow-[0_0_8px_rgba(53,198,232,0.3)]">
                      {product.pricing.launchPrice ? `₹${product.pricing.launchPrice}` : 'FACTORY QUOTE'}
                    </span>
                  </div>
                </div>
              )}

              {/* Row 1: Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Full name or Purchaser"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs font-mono text-white placeholder:text-slate-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 99532 39674"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs font-mono text-white placeholder:text-slate-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Company & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                    Company / Firm Name
                  </label>
                  <input
                    type="text"
                    placeholder="OEM, Trader, or Workshop"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs font-mono text-white placeholder:text-slate-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="purchasing@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs font-mono text-white placeholder:text-slate-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Required Quantity */}
              <div>
                <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                  Estimated Quantity *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 50 pcs, 500 units, 1 Master Carton"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs font-mono text-white placeholder:text-slate-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] transition-all"
                />
              </div>

              {/* Row 4: Application Notes */}
              <div>
                <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                  Application Notes / Technical Requirement
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mention duty cycle, ambient temperature, terminal type, or custom dimensional envelop..."
                  className="w-full p-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs font-mono text-white placeholder:text-slate-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] transition-all"
                ></textarea>
              </div>

              {/* Dual 3D Tactile Actions */}
              <div className="pt-2 flex flex-col gap-3">
                {/* Primary Action Button */}
                <button
                  type="submit"
                  id="submit-enquiry-form-btn"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#173A5E] via-[#0E7490] to-[#173A5E] hover:from-[#0E7490] hover:to-[#35C6E8] text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2.5 border border-[#35C6E8]/70 shadow-[0_8px_25px_rgba(14,116,144,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(53,198,232,0.6)] cursor-pointer active:scale-98 transition-all"
                >
                  <Send className="w-4 h-4 text-[#35C6E8] filter drop-shadow-[0_0_5px_#35C6E8]" />
                  <span>Transmit Specification to Factory Desk</span>
                </button>

                {/* Direct WhatsApp Action Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] hover:from-[#34D399] hover:to-[#059669] text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2.5 border border-emerald-300/50 shadow-[0_8px_25px_rgba(16,185,129,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] cursor-pointer active:scale-98 transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Direct WhatsApp Connect ({CANONICAL_WHATSAPP_DISPLAY})</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
