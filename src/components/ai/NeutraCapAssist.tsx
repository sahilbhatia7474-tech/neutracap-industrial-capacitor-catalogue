/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP VECTOR — ENGINEERING INTELLIGENCE CONSOLE
 * - Aesthetic: Proprietary Industrial Engineering Knowledge System
 * - Visual System: Deep Navy #071426, Midnight Blue #0B1F36, Steel Blue #173A5E, Electric Cyan #35C6E8
 * - Typography System: Space Grotesk (Headlines), Plus Jakarta Sans (UI/Body), IBM Plex Mono (Specs/SKUs only)
 * - Intelligence States: READY | ANALYZING | CATALOGUE MATCH
 * - Grounded in NeutraCap's 490 canonical baseline dataset
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw,
  Terminal,
  ShieldCheck,
  Cpu,
  Zap,
  Activity,
  Sparkles
} from 'lucide-react';
import { CapacitorVariant } from '../../types';
import { CATALOGUE_SUMMARY } from '../../data/catalogueSummary';

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  matchedProducts?: CapacitorVariant[];
  suggestedActions?: { label: string; action: () => void }[];
}

export interface NeutraCapAssistProps {
  isOpen: boolean;
  onClose: () => void;
  products: CapacitorVariant[];
  onSelectProduct: (product: CapacitorVariant) => void;
  onOpenFinder: (query?: string) => void;
  onOpenEnquiry: (product?: CapacitorVariant) => void;
  initialQuery?: string;
}

export const NeutraCapAssist: React.FC<NeutraCapAssistProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onOpenFinder,
  onOpenEnquiry,
  initialQuery = '',
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Welcome to **NEUTRACAP VECTOR: ENGINEERING INTELLIGENCE**. Indexed across all **${CATALOGUE_SUMMARY.total} canonical baseline variants** across our 4 industrial product architectures.\n\nQuery motor HP sizing, capacitance ratings, harmonic filtering tolerances, ripple current capability, or factory commercial policies.`,
      timestamp: 'SYSTEM ONLINE',
      suggestedActions: [
        { label: '1.5 HP Submersible Specification', action: () => handleSendQuery('What capacitor do I need for a 1.5 HP submersible motor?') },
        { label: 'APFC Panel Harmonics 440V', action: () => handleSendQuery('Show 440V Green Filter capacitors for APFC harmonic mitigation') },
        { label: 'DC Electrolytic 450V Inverter Duty', action: () => handleSendQuery('Show me 450V DC Aluminium Electrolytic capacitors for inverter duty') },
        { label: 'Direct Factory MOQ & Dispatch', action: () => handleSendQuery('What is the direct factory MOQ and dispatch timeline?') },
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [systemState, setSystemState] = useState<'READY' | 'ANALYZING' | 'CATALOGUE MATCH'>('READY');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSendQuery(initialQuery);
    }
  }, [initialQuery, isOpen]);

  if (!isOpen) return null;

  // Local Industrial Technical Query Engine
  const processQuery = (userQuery: string): { responseText: string; matched: CapacitorVariant[] } => {
    const q = userQuery.toLowerCase();
    let matched: CapacitorVariant[] = [];

    // 1. Motor HP sizing lookup
    if (q.includes('1.5 hp') || q.includes('1.5hp') || q.includes('submersible')) {
      matched = products.filter(p => p.sku === 'NC-SC-80-100-250V' || p.capacitanceDisplay.includes('80/100') || p.capacitanceDisplay.includes('36'));
      return {
        responseText: `For a **1.5 HP Submersible / Single-Phase Induction Motor**, recommended factory configurations are:\n- **Starting Duty**: 80/100 µF or 100/120 µF (250V AC Start Duty, phenolic cylindrical housing)\n- **Continuous Run**: 36 µF to 40 µF (440V / 450V AC metallized polypropylene)\n\nVerified catalogue specifications matching this duty:`,
        matched
      };
    }

    if (q.includes('1 hp') || q.includes('1hp') || q.includes('0.5 hp') || q.includes('2 hp') || q.includes('3 hp') || q.includes('motor')) {
      matched = products.filter(p => p.familyId === 'starting' || p.familyId === 'running').slice(0, 3);
      return {
        responseText: `Standard single-phase motor duties utilize dual-capacitor topologies:\n- **0.5 – 1.0 HP**: 40/60 µF or 60/80 µF Starting; 15–25 MFD Running\n- **1.5 – 2.0 HP**: 80/100 µF or 100/120 µF Starting; 36–50 MFD Running\n- **3.0 HP+**: 150/200 µF Starting; 60–72 MFD Running\n\nVerified catalogue variants matching motor duty:`,
        matched
      };
    }

    // 2. Specific Capacitance lookup (e.g. 100/120, 40/60, 25 MFD, 3300)
    if (q.includes('100/120') || q.includes('100-120')) {
      matched = products.filter(p => p.capacitanceDisplay.includes('100/120'));
      return {
        responseText: `Found **${matched.length} verified baseline variants** with **100/120 µF** rating. Engineered in heavy-duty cylindrical phenolic housing for 250V AC starting duty with routine dielectric qualification.`,
        matched
      };
    }

    if (q.includes('40/60') || q.includes('40-60')) {
      matched = products.filter(p => p.capacitanceDisplay.includes('40/60'));
      return {
        responseText: `Found **${matched.length} verified variants** for **40/60 µF** starting capacitors at 250V AC rated operating voltage.`,
        matched
      };
    }

    if (q.includes('3300') || q.includes('4700') || q.includes('dc') || q.includes('electrolytic') || q.includes('inverter')) {
      matched = products.filter(p => p.familyId === 'dc_electrolytic').slice(0, 3);
      return {
        responseText: `NeutraCap manufactures **${CATALOGUE_SUMMARY.dcAluminium} DC Aluminium Electrolytic variants** engineered for 400V / 450V DC applications, heavy ripple current handling, solar inverters, and industrial variable speed drives.`,
        matched
      };
    }

    // 3. Green filter & harmonic queries
    if (q.includes('filter') || q.includes('green') || q.includes('harmonic') || q.includes('apfc')) {
      matched = products.filter(p => p.familyId === 'green_filter').slice(0, 3);
      return {
        responseText: `Our **Green Filter Capacitors (${CATALOGUE_SUMMARY.greenFilter} variants)** are designed for non-linear load environments, APFC panels, and active harmonic suppression, featuring self-healing metalized film construction and low dissipation factor (tan δ ≤ 0.002).`,
        matched
      };
    }

    // 4. Running capacitors
    if (q.includes('running') || q.includes('run') || q.includes('mfd')) {
      matched = products.filter(p => p.familyId === 'running').slice(0, 3);
      return {
        responseText: `We offer **${CATALOGUE_SUMMARY.running} Running Capacitor baseline variants** rated at 400V / 450V AC for 10,000-hour continuous service life with SH dielectric film.`,
        matched
      };
    }

    // 5. Commercial, MOQ & Pricing questions
    if (q.includes('moq') || q.includes('minimum order') || q.includes('delivery') || q.includes('price') || q.includes('dispatch') || q.includes('discount')) {
      return {
        responseText: `**Direct Factory Commercial Policy:**\n- **Minimum Order Quantity (MOQ)**: 10 units for baseline catalogue inventory; custom OEM specifications require 100+ units.\n- **Commercial Pricing**: Direct factory launch pricing reflects an approved **7.5% reduction** from standard industrial list prices.\n- **Quality Assurance**: 100% routine dielectric withstand testing prior to factory dispatch.`,
        matched: []
      };
    }

    // Direct search in authoritative catalogue dataset
    matched = products.filter(p => {
      const matchName = p.productName.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchCap = p.capacitanceDisplay.toLowerCase().includes(q) || q.includes(p.capacitanceDisplay.toLowerCase().split(' ')[0]);
      const matchVolt = p.voltageDisplay.toLowerCase().includes(q);
      const matchTags = p.applicationTags.some(t => t.toLowerCase().includes(q));
      return matchName || matchSku || matchCap || matchVolt || matchTags;
    });

    if (matched.length > 0) {
      return {
        responseText: `Found **${matched.length} matching variant${matched.length > 1 ? 's' : ''}** in our authoritative database:`,
        matched
      };
    }

    // Explicit transparent empty state for non-baseline specifications
    return {
      responseText: `This specification is not currently listed as an active baseline catalogue item in standard inventory.\n\nFor non-standard capacitance, elevated DC voltages, or specialized OEM terminal dimensions, our factory design desk can fabricate custom engineering batches.`,
      matched: []
    };
  };

  const handleSendQuery = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);
    setSystemState('ANALYZING');

    setTimeout(() => {
      setIsTyping(false);
      const result = processQuery(query);
      if (result.matched && result.matched.length > 0) {
        setSystemState('CATALOGUE MATCH');
      } else {
        setSystemState('READY');
      }
      const botMessage: Message = {
        id: `vector-${Date.now()}`,
        sender: 'assistant',
        text: result.responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        matchedProducts: result.matched
      };
      setMessages(prev => [...prev, botMessage]);
    }, 450);
  };

  return (
    <div 
      id="neutracap-assist-modal"
      className="fixed inset-0 z-50 bg-[#020713]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="neutracap-assist-dialog"
        className="w-full max-w-2xl bg-gradient-to-b from-[#0B2038] via-[#071629] to-[#030B17] rounded-2xl sm:rounded-3xl border border-[#35C6E8]/40 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[85vh] max-h-[720px] animate-in zoom-in-95 duration-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top 3D Specular Laser Hairline */}
        <div className="h-0.5 w-full bg-gradient-to-r from-[#173A5E] via-[#35C6E8] to-[#173A5E] shadow-[0_0_12px_#35C6E8] shrink-0 z-30"></div>

        {/* Ambient 3D Volumetric Lighting Flares & Atmospheric Glow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#35C6E8]/14 rounded-full blur-3xl pointer-events-none z-0"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none z-0"></div>

        {/* Micro Technical Grid Watermark Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(53,198,232,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(53,198,232,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

        {/* Engineering Intelligence Console Header — 3D Sculpted Aerospace Console */}
        <div className="shrink-0 p-4 sm:p-5 bg-gradient-to-r from-[#071626]/98 via-[#0B223D]/95 to-[#061424]/98 text-white flex items-center justify-between border-b border-[#35C6E8]/30 relative z-10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3 sm:gap-3.5">
            {/* 3D Tactile Icon Medallion */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#173A5E] via-[#0E2A4A] to-[#07172C] flex items-center justify-center text-[#35C6E8] border border-[#35C6E8]/60 shadow-[0_0_18px_rgba(53,198,232,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)] shrink-0">
              <Cpu className="w-5 h-5 text-[#35C6E8] filter drop-shadow-[0_0_6px_#35C6E8]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399] animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-2 sm:gap-2.5">
                <h3 className="text-base sm:text-lg font-black font-display text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  NEUTRACAP VECTOR
                </h3>
                {/* 3D Dynamic State Capsule */}
                <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 border shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] ${
                  systemState === 'ANALYZING'
                    ? 'bg-[#EAB308]/20 text-[#FACC15] border-[#EAB308]/50 animate-pulse'
                    : systemState === 'CATALOGUE MATCH'
                    ? 'bg-[#16A34A]/20 text-[#4ADE80] border-[#16A34A]/50 shadow-[0_0_10px_rgba(74,222,128,0.2)]'
                    : 'bg-[#173A5E]/80 text-[#35C6E8] border-[#35C6E8]/50 shadow-[0_0_10px_rgba(53,198,232,0.2)]'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    systemState === 'ANALYZING' 
                      ? 'bg-[#FACC15] shadow-[0_0_6px_#FACC15]' 
                      : systemState === 'CATALOGUE MATCH' 
                      ? 'bg-[#4ADE80] shadow-[0_0_6px_#4ADE80]' 
                      : 'bg-[#35C6E8] shadow-[0_0_6px_#35C6E8]'
                  }`}></span>
                  <span>{systemState}</span>
                </div>
              </div>
              <p className="text-[11.5px] sm:text-xs text-[#A8B4C2] font-sans mt-0.5">
                ENGINEERING INTELLIGENCE · <span className="font-mono text-[#35C6E8] font-bold">{CATALOGUE_SUMMARY.total}</span> Baseline Variants Indexed
              </p>
            </div>
          </div>

          <button
            id="close-neutracap-assist-btn"
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-b from-[#0F2847] to-[#081729] hover:from-[#173A5E] hover:to-[#0B2038] border border-[#35C6E8]/40 hover:border-[#35C6E8] shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(53,198,232,0.4)] text-[#A8B4C2] hover:text-white transition-all active:scale-95 shrink-0"
            aria-label="Close Assistant Console"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Console Message Stream — Rich 3D Deep Space */}
        <div className="flex-1 min-h-0 p-4 sm:p-5 overflow-y-auto space-y-4 bg-gradient-to-b from-[#030914]/90 via-[#051120]/80 to-[#020710]/95 font-sans relative z-10">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {/* Message Surface with 3D Depth Architecture */}
              <div 
                className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed transition-all ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#11375C] to-[#0B2642] text-white border border-[#35C6E8]/50 shadow-[0_10px_25px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)]'
                    : 'bg-gradient-to-b from-[#0B1E34] via-[#071526] to-[#040C17] text-[#F4F7FA] border border-[#1E4369]/80 shadow-[0_12px_35px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.12)]'
                }`}
              >
                {/* Message Header Tag with Technical Glow */}
                <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-white/10 text-[10.5px] font-mono">
                  <span className="text-[#35C6E8] font-bold flex items-center gap-1.5 tracking-wider">
                    {msg.sender === 'user' ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#35C6E8]"></span>
                        <span>ENGINEERING CLIENT</span>
                      </>
                    ) : (
                      <>
                        <Activity className="w-3 h-3 text-[#35C6E8]" />
                        <span>NEUTRACAP VECTOR ENGINE</span>
                      </>
                    )}
                  </span>
                  <span className="text-[#A8B4C2] font-mono text-[10px]">
                    {msg.timestamp}
                  </span>
                </div>

                <div className="whitespace-pre-line font-sans text-slate-200">
                  {msg.text.split('\n').map((line, idx) => {
                    const boldParsed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">$1</strong>');
                    return (
                      <div 
                        key={idx} 
                        dangerouslySetInnerHTML={{ __html: boldParsed }} 
                        className={idx > 0 ? 'mt-1.5' : ''}
                      />
                    );
                  })}
                </div>

                {/* Render Matched Products if Assistant recommended them — 3D Hardware Cards */}
                {msg.matchedProducts && msg.matchedProducts.length > 0 && (
                  <div className="mt-4 pt-3.5 border-t border-[#1E4369]/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-bold text-white uppercase tracking-wider font-sans flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#35C6E8] filter drop-shadow-[0_0_4px_#35C6E8]" />
                        <span>MATCHED CATALOGUE SPECIFICATIONS:</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold bg-[#04111E] px-2.5 py-0.5 rounded-full border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>VERIFIED SPEC</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {msg.matchedProducts.map((p) => (
                        <div 
                          key={p.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-gradient-to-b from-[#081628] to-[#040D18] hover:from-[#0C223E] hover:to-[#061426] border border-[#1E4369] hover:border-[#35C6E8]/70 shadow-[0_6px_18px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_10px_25px_rgba(53,198,232,0.25)] transition-all duration-200 gap-2.5 group"
                        >
                          <div>
                            <div className="text-xs font-bold text-white font-display group-hover:text-[#35C6E8] transition-colors">{p.productName}</div>
                            <div className="text-[11px] font-mono text-[#A8B4C2] mt-0.5">
                              SKU: <strong className="text-[#35C6E8]">{p.sku}</strong> · {p.capacitanceDisplay} · {p.voltageDisplay}
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                            <span className="text-xs font-mono font-bold text-white bg-[#030914] px-2.5 py-1 rounded border border-[#1E4369] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">₹{p.pricing.launchPrice}</span>
                            <button
                              onClick={() => {
                                onClose();
                                onSelectProduct(p);
                              }}
                              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-b from-[#1C4E7E] to-[#0D2D50] hover:from-[#25639E] hover:to-[#123862] border border-[#35C6E8]/60 hover:border-[#35C6E8] text-white font-mono text-[10.5px] font-bold uppercase tracking-wider shadow-[0_4px_12px_rgba(53,198,232,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_0_15px_rgba(53,198,232,0.5)] active:scale-95 transition-all"
                            >
                              Inspect Spec
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Specification CTA if Assistant could not find an exact baseline match */}
                {msg.sender === 'assistant' && msg.id !== 'welcome-msg' && (!msg.matchedProducts || msg.matchedProducts.length === 0) && msg.text.includes('custom') && (
                  <div className="mt-3.5 pt-3.5 border-t border-[#1E4369]/80">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenEnquiry();
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#173A5E] via-[#103254] to-[#0A223B] hover:from-[#1E4B7A] hover:to-[#0F2D4C] border border-[#35C6E8]/60 hover:border-[#35C6E8] text-white text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(53,198,232,0.4)] active:scale-[0.98] transition-all"
                    >
                      <span>Request Custom Engineering Specification</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#35C6E8]" />
                    </button>
                  </div>
                )}

                {/* Suggested Quick Question Chips — 3D Tactile Pills */}
                {msg.suggestedActions && (
                  <div className="mt-3.5 pt-3.5 border-t border-[#1E4369]/80 flex flex-wrap gap-2">
                    {msg.suggestedActions.map((s, i) => (
                      <button
                        key={i}
                        onClick={s.action}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-b from-[#091A2E] to-[#05111F] hover:from-[#122E4E] hover:to-[#081C30] border border-[#1E4369] hover:border-[#35C6E8]/70 text-xs font-sans text-slate-300 hover:text-white transition-all shadow-[0_3px_10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(53,198,232,0.3)] active:scale-95"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2.5 p-3 px-4 bg-gradient-to-r from-[#0B1E34] to-[#071526] rounded-xl border border-[#35C6E8]/40 max-w-[220px] shadow-[0_6px_20px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)]">
              <RefreshCw className="w-4 h-4 animate-spin text-[#35C6E8]" />
              <span className="text-xs font-mono text-[#35C6E8]">Querying dataset...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Engineering Grounding Bar — Deep Obsidian Pedestal */}
        <div className="shrink-0 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#040C18] via-[#071628] to-[#030A14] border-t border-[#1E3B5C]/80 text-[11px] text-[#A8B4C2] font-sans flex items-center justify-between relative z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#35C6E8] filter drop-shadow-[0_0_4px_#35C6E8]" />
            <span>Grounded in NeutraCap's 490 canonical baseline dataset.</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-[#35C6E8] font-bold bg-[#030914] px-2.5 py-0.5 rounded-full border border-[#1E4369]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35C6E8] animate-pulse"></span>
            <span>VECTOR v5.2</span>
          </span>
        </div>

        {/* Tactile Input Bar — 3D Metallic Command Dock */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuery();
          }}
          className="shrink-0 p-3.5 sm:p-4 bg-gradient-to-r from-[#061424] via-[#091E36] to-[#051222] border-t border-[#35C6E8]/30 flex items-center gap-2.5 relative z-10 shadow-[0_-8px_25px_rgba(0,0,0,0.6)]"
        >
          <div className="relative flex-1">
            <input
              id="neutracap-assist-input"
              type="text"
              placeholder="Ask about capacitor ratings, HP sizing, or technical specs..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-[#030914] border border-[#1E4369] focus:border-[#35C6E8] text-xs sm:text-sm text-white placeholder:text-[#A8B4C2]/50 focus:outline-none focus:ring-1 focus:ring-[#35C6E8]/50 font-sans shadow-[inset_0_2px_6px_rgba(0,0,0,0.85)] transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="h-12 px-5 sm:px-6 rounded-xl bg-gradient-to-b from-[#1C4E7E] via-[#10365C] to-[#08203B] hover:from-[#23609B] hover:to-[#0D2D50] border border-[#35C6E8]/80 text-white text-xs font-bold font-sans uppercase tracking-wider flex items-center gap-2 shadow-[0_6px_20px_rgba(53,198,232,0.35),inset_0_1px_1px_rgba(255,255,255,0.35)] hover:shadow-[0_0_25px_rgba(53,198,232,0.6)] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all shrink-0"
          >
            <Send className="w-3.5 h-3.5 text-[#35C6E8] filter drop-shadow-[0_0_4px_#35C6E8]" />
            <span>Transmit</span>
          </button>
        </form>
      </div>
    </div>
  );
};
