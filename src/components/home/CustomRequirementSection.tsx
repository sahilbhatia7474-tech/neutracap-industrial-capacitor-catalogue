/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * OEM CUSTOM ENGINEERING DESK (PREMIUM FACTORY SPECIFICATION PORTAL)
 * - Color System: Ice White #FFFFFF / #F4F7FA, Deep Navy #071426, Steel Blue #173A5E, Electric Cyan #35C6E8
 * - Typography: Space Grotesk display headings, Inter body & controls, IBM Plex Mono technical metrics
 * - Comprehensive OEM custom capacitor engineering requests
 * - Dual CTAs: Submit Specification to Factory & Send via WhatsApp
 */

import React, { useState } from 'react';
import { CustomSpecificationRequest, ProductFamilyId } from '../../types';
import { ArrowRight, Send, CheckCircle2, X, Cpu, ShieldCheck } from 'lucide-react';
import { SITE_FACTS, CANONICAL_WHATSAPP_NUMBER } from '../../data/siteFacts';
import { WhatsAppIcon } from '../common/WhatsAppIcon';

export interface CustomRequirementSectionProps {
  onSubmitSuccess?: (data: CustomSpecificationRequest) => void;
}

export const CustomRequirementSection: React.FC<CustomRequirementSectionProps> = ({
  onSubmitSuccess,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form State with Application / Duty
  const [formData, setFormData] = useState<CustomSpecificationRequest>({
    familyId: 'starting',
    capacitance: '',
    voltage: '',
    application: 'Motor Starting',
    quantity: 100,
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    targetTimeline: 'Within 2-4 Weeks',
    notes: '',
  });

  const handleInputChange = (field: keyof CustomSpecificationRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getFamilyTitle = (id: ProductFamilyId) => {
    switch (id) {
      case 'starting': return 'Starting Capacitors';
      case 'green_filter': return 'Green Filter Capacitors';
      case 'running': return 'Running Capacitors';
      case 'dc_electrolytic': return 'DC Aluminium Electrolytic';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitSuccess) {
      onSubmitSuccess(formData);
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        familyId: 'starting',
        capacitance: '',
        voltage: '',
        application: 'Motor Starting',
        quantity: 100,
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        targetTimeline: 'Within 2-4 Weeks',
        notes: '',
      });
    }, 2000);
  };

  // WhatsApp formatted specification submission
  const handleSendWhatsApp = () => {
    const lines = [
      `*NEUTRACAP — OEM CUSTOM SPECIFICATION REQUEST*`,
      ``,
      `*Architecture:* ${getFamilyTitle(formData.familyId)}`,
      `*Application / Duty:* ${formData.application || 'Not specified'}`,
      `*Capacitance:* ${formData.capacitance || 'Custom'}`,
      `*Rated Voltage:* ${formData.voltage || 'Custom'}`,
      `*Estimated Quantity:* ${formData.quantity} Units`,
      formData.fullName ? `*Client Name:* ${formData.fullName}` : '',
      formData.companyName ? `*Company:* ${formData.companyName}` : '',
      formData.email ? `*Email:* ${formData.email}` : '',
      formData.phone ? `*Phone:* ${formData.phone}` : '',
      formData.notes ? `*Custom Notes:* ${formData.notes}` : '',
      ``,
      `Please connect with factory engineering for technical review and quotation.`
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/${CANONICAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Compact Homepage Conversion Block */}
      <section 
        id="custom" 
        className="py-14 md:py-22 bg-catalogue-depth border-b border-[#CBD5E1] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-industrial-grid opacity-35 pointer-events-none"></div>

        <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-8 sm:p-10 md:p-14 lg:p-16 text-white border border-[#173A5E]/80 bg-gradient-to-br from-[#0B1F36] via-[#071426] to-[#040C18] hover:border-[#35C6E8]/70 transition-all duration-300 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden group stagger-item stagger-item-1">
            {/* Top Specular Hairline & Atmospheric Lighting */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#35C6E8]/60 to-transparent"></div>
            <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-[#35C6E8]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 left-1/4 w-[400px] h-[400px] bg-[#10B981]/8 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-4 text-center lg:text-left flex-1 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071426] border border-[#35C6E8]/40 text-xs font-mono font-bold tracking-widest text-[#35C6E8] uppercase shadow-sm">
                <Cpu className="w-4 h-4 text-[#35C6E8]" />
                <span>OEM CUSTOM ENGINEERING DESK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-[1.15]">
                Tell Us Your Requirement.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#35C6E8]">
                  We Engineer The Specification.
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl font-sans font-normal leading-relaxed">
                Custom capacitance values, tailored voltage thresholds, non-standard dimensional envelopes, and specialized terminal configurations manufactured to exact OEM duty cycles.
              </p>

              {/* Clean Telemetry Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-[11px] font-mono">
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-medium">
                  RAPID OEM PROTOTYPING
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-medium">
                  CUSTOM DIELECTRIC TUNING
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 text-emerald-400 font-bold">
                  DIRECT FACTORY DESK
                </span>
              </div>
            </div>

            {/* Dominant High-Intent Conversion CTA */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto justify-center">
              <button
                id="open-custom-spec-modal-btn"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] hover:from-[#34D399] hover:to-[#059669] text-white text-xs sm:text-sm font-sans font-extrabold tracking-wider uppercase shadow-[0_8px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_35px_rgba(16,185,129,0.5)] border border-emerald-300/40 hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer"
              >
                <span>OPEN SPECIFICATION DESK</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Detailed Technical Requirement Modal — Premium Dark Engineering Console */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#020713]/85 backdrop-blur-md animate-in fade-in duration-200 select-none overflow-y-auto">
          <div className="bg-gradient-to-b from-[#0B2038] via-[#071629] to-[#030B17] rounded-3xl border border-[#35C6E8]/40 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(53,198,232,0.18),inset_0_1px_2px_rgba(255,255,255,0.25)] max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative text-white my-auto">
            
            {/* Top 3D Specular Laser Hairline */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#35C6E8] to-transparent shadow-[0_0_15px_#35C6E8] pointer-events-none"></div>

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/15 hover:border-[#35C6E8]/60 shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all cursor-pointer active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#35C6E8] uppercase mb-1.5">
                <ShieldCheck className="w-4 h-4 text-[#35C6E8]" />
                <span>OEM CUSTOM ENGINEERING CONSOLE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                BUILD A SPECIFICATION AROUND YOUR APPLICATION.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 font-sans leading-relaxed">
                Tell our engineering desk what you need. We’ll translate your requirement into a manufacturable capacitor specification.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-b from-[#062618] via-[#03180F] to-[#010B07] text-[#10B981] border border-emerald-400/60 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.4),inset_0_1px_2px_rgba(255,255,255,0.3)]">
                  <CheckCircle2 className="w-9 h-9 text-emerald-400 filter drop-shadow-[0_0_8px_#10B981]" />
                </div>
                <h4 className="text-xl font-black text-white font-display">Specification Received</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-sans">
                  Our engineering team has received your custom requirements and will review feasibility and pricing within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                {/* 1. Category & Application/Duty */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                      Capacitor Architecture *
                    </label>
                    <select
                      required
                      value={formData.familyId}
                      onChange={(e) => handleInputChange('familyId', e.target.value as ProductFamilyId)}
                      className="w-full h-11 px-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs sm:text-sm font-mono text-white shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] cursor-pointer"
                    >
                      <option value="starting" className="bg-[#071629] text-white">Starting Capacitors</option>
                      <option value="green_filter" className="bg-[#071629] text-white">Green Filter Capacitors</option>
                      <option value="running" className="bg-[#071629] text-white">Running Capacitors</option>
                      <option value="dc_electrolytic" className="bg-[#071629] text-white">DC Aluminium Electrolytic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                      Application / Duty *
                    </label>
                    <select
                      required
                      value={formData.application}
                      onChange={(e) => handleInputChange('application', e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs sm:text-sm font-mono text-white shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] cursor-pointer"
                    >
                      <option value="Motor Starting" className="bg-[#071629] text-white">Motor Starting</option>
                      <option value="Motor Running" className="bg-[#071629] text-white">Motor Running</option>
                      <option value="APFC / Harmonic Filtering" className="bg-[#071629] text-white">APFC / Harmonic Filtering</option>
                      <option value="Inverter / DC Link" className="bg-[#071629] text-white">Inverter / DC Link</option>
                      <option value="Pump / Compressor" className="bg-[#071629] text-white">Pump / Compressor</option>
                      <option value="Industrial Power Supply" className="bg-[#071629] text-white">Industrial Power Supply</option>
                      <option value="OEM Custom Requirement" className="bg-[#071629] text-white">OEM Custom Requirement</option>
                      <option value="Other" className="bg-[#071629] text-white">Other</option>
                    </select>
                  </div>
                </div>

                {/* 2. Capacitance & Voltage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                      Required Capacitance *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 150/200 µF, 50 MFD, 4700 µF"
                      value={formData.capacitance}
                      onChange={(e) => handleInputChange('capacitance', e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs sm:text-sm font-mono text-white placeholder:text-slate-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                      Rated Voltage (V AC / DC) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 275V AC, 440V AC, 500V DC"
                      value={formData.voltage}
                      onChange={(e) => handleInputChange('voltage', e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs sm:text-sm font-mono text-white placeholder:text-slate-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                </div>

                {/* 3. Quantity & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                      Estimated Production Quantity *
                    </label>
                    <input
                      type="number"
                      required
                      min={10}
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 10)}
                      className="w-full h-11 px-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs sm:text-sm font-mono text-white placeholder:text-slate-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                      Target Delivery Schedule
                    </label>
                    <select
                      value={formData.targetTimeline}
                      onChange={(e) => handleInputChange('targetTimeline', e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs sm:text-sm font-mono text-white shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] cursor-pointer"
                    >
                      <option value="Urgent Prototype (1-2 Weeks)" className="bg-[#071629] text-white">Urgent Prototype (1-2 Weeks)</option>
                      <option value="Within 2-4 Weeks" className="bg-[#071629] text-white">Standard Batch (Within 2-4 Weeks)</option>
                      <option value="Scheduled OEM Production Contract" className="bg-[#071629] text-white">Scheduled OEM Production Contract</option>
                    </select>
                  </div>
                </div>

                {/* 4. Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
                  <div>
                    <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs sm:text-sm font-mono text-white placeholder:text-slate-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                      Company / OEM Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Industrial Drives"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs sm:text-sm font-mono text-white placeholder:text-slate-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                      Official Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs sm:text-sm font-mono text-white placeholder:text-slate-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                      Direct Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 99532 39674"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs sm:text-sm font-mono text-white placeholder:text-slate-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                </div>

                {/* 5. Notes / Details */}
                <div>
                  <label className="block text-xs font-mono font-bold tracking-[0.12em] text-slate-200 uppercase mb-1.5">
                    Specific Dimensional / Terminal Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details such as max diameter (mm), terminal type (stud/faston/wires), temperature rating, or duty cycle..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-gradient-to-b from-[#061426] to-[#020914] border border-[#173A5E] hover:border-[#35C6E8]/60 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs sm:text-sm font-mono text-white placeholder:text-slate-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* CTAs Cluster: Primary Submit + Secondary WhatsApp */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#173A5E] via-[#0E7490] to-[#173A5E] hover:from-[#0E7490] hover:to-[#35C6E8] text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 border border-[#35C6E8]/70 shadow-[0_8px_25px_rgba(14,116,144,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(53,198,232,0.6)] cursor-pointer active:scale-98 transition-all"
                  >
                    <Send className="w-4 h-4 text-[#35C6E8]" />
                    <span>SUBMIT SPECIFICATION TO FACTORY</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] hover:from-[#34D399] hover:to-[#059669] text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 border border-emerald-300/50 shadow-[0_8px_25px_rgba(16,185,129,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)] cursor-pointer active:scale-98 transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>SEND VIA WHATSAPP</span>
                  </button>
                </div>

                {/* Desk Contact Context */}
                <div className="text-[11px] font-mono text-slate-400 text-center pt-2">
                  Direct Engineering Desk: <strong className="text-[#35C6E8]">{SITE_FACTS.founderEmail}</strong> · WhatsApp: <strong className="text-emerald-400">{SITE_FACTS.canonicalWhatsApp}</strong>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
};
