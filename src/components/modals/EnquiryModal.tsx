/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * RAPID FACTORY ENQUIRY & B2B QUOTE MODAL (PREMIUM INDUSTRIAL TRANSFORMATION)
 * - Color System: Deep Navy #071426, Steel Blue #173A5E, Electric Cyan #35C6E8, Ice White #F4F7FA
 * - Typography: Manrope headings, IBM Plex Mono technical details, Inter body
 * - Direct factory dispatch enquiry with WhatsApp instant action trigger
 */

import React, { useState } from 'react';
import { CapacitorVariant } from '../../types';
import { 
  X, 
  Send, 
  MessageSquare, 
  CheckCircle2,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { SITE_FACTS, CANONICAL_WHATSAPP_NUMBER } from '../../data/siteFacts';

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
      className="fixed inset-0 z-50 bg-[#071426]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        id="enquiry-dialog"
        className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-[#CBD5E1] overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#071426] text-white flex items-center justify-between border-b border-[#173A5E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#0B1F36] flex items-center justify-center text-[#35C6E8] border border-[#173A5E]">
              <MessageSquare className="w-4 h-4 text-[#35C6E8]" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                {mode === 'quote' ? 'Request Formal B2B Quotation' : 'Direct Factory Enquiry'}
              </h3>
              <p className="text-[12px] text-[#A8B4C2] font-sans">
                {product ? product.productName : `NeutraCap ${SITE_FACTS.establishedExperienceYears} Years Engineering Heritage`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md bg-[#0B1F36] hover:bg-[#173A5E] text-[#A8B4C2] hover:text-white border border-[#173A5E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#16A34A] border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#071426] font-display">Enquiry Transmitted to Factory</h4>
              <p className="text-xs text-[#64748B] max-w-xs mx-auto font-sans">
                Our sales engineering desk will connect with verified technical pricing and dispatch schedules.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full py-2.5 rounded-md btn-tactile-dark text-white text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#35C6E8]" />
                  <span>Open Direct in WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2 rounded-md btn-tactile-light text-[#071426] text-xs font-sans font-semibold"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              {product && (
                <div className="p-3 rounded-md bg-[#F4F7FA] border border-[#CBD5E1] text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#071426] font-sans">{product.productName}</span>
                    <span className="text-[#64748B] block text-[11px] font-mono">{product.capacitanceDisplay} · {product.voltageDisplay}</span>
                  </div>
                  <span className="font-mono font-bold text-[#173A5E]">₹{product.pricing.launchPrice || 'POA'}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-sans font-semibold text-[#071426] mb-1">Your Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-md bg-white border border-[#CBD5E1] text-xs text-[#071426] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#173A5E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-[#071426] mb-1">Mobile / WhatsApp *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 99532 39674"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-10 px-3 rounded-md bg-white border border-[#CBD5E1] text-xs font-mono text-[#071426] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#173A5E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-sans font-semibold text-[#071426] mb-1">Company / Firm</label>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full h-10 px-3 rounded-md bg-white border border-[#CBD5E1] text-xs text-[#071426] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#173A5E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-[#071426] mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="client@firm.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-10 px-3 rounded-md bg-white border border-[#CBD5E1] text-xs text-[#071426] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#173A5E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold text-[#071426] mb-1">Required Quantity</label>
                <input
                  type="text"
                  placeholder="e.g. 50 pcs"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full h-10 px-3 rounded-md bg-white border border-[#CBD5E1] text-xs font-mono text-[#071426] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#173A5E]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold text-[#071426] mb-1">Application Notes / Custom Requirements</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2.5 rounded-md bg-white border border-[#CBD5E1] text-xs text-[#071426] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#173A5E]"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  id="submit-enquiry-form-btn"
                  className="w-full py-3 rounded-md btn-tactile-primary text-white text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#35C6E8]" />
                  <span>Transmit to Factory Desk</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full py-2.5 rounded-md btn-tactile-light text-[#071426] text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#16A34A]" />
                  <span>Direct WhatsApp Connect (+91 9953239674)</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
