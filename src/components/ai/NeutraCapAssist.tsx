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
  Activity
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
      className="fixed inset-0 z-50 bg-[#071426]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        id="neutracap-assist-dialog"
        className="w-full max-w-2xl bg-[#0B1F36] rounded-2xl shadow-2xl border border-[#173A5E] overflow-hidden flex flex-col h-[88vh] max-h-[740px] animate-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Cyan Technical Edge */}
        <div className="h-0.5 w-full bg-gradient-to-r from-[#173A5E] via-[#35C6E8] to-[#173A5E]"></div>

        {/* Engineering Intelligence Console Header */}
        <div className="p-4 sm:p-5 bg-[#071426] text-white flex items-center justify-between border-b border-[#173A5E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#173A5E] to-[#0B1F36] flex items-center justify-center border border-[#35C6E8]/40 text-[#35C6E8] shadow-md">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-base font-bold font-display text-white tracking-wide">
                  NEUTRACAP VECTOR
                </h3>
                {/* Dynamic State Indicator */}
                <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 border ${
                  systemState === 'ANALYZING'
                    ? 'bg-[#EAB308]/15 text-[#FACC15] border-[#EAB308]/40 animate-pulse'
                    : systemState === 'CATALOGUE MATCH'
                    ? 'bg-[#16A34A]/15 text-[#4ADE80] border-[#16A34A]/40'
                    : 'bg-[#173A5E] text-[#35C6E8] border-[#35C6E8]/40'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    systemState === 'ANALYZING' ? 'bg-[#FACC15]' : systemState === 'CATALOGUE MATCH' ? 'bg-[#4ADE80]' : 'bg-[#35C6E8]'
                  }`}></span>
                  <span>{systemState}</span>
                </div>
              </div>
              <p className="text-xs text-[#A8B4C2] font-sans mt-0.5">
                ENGINEERING INTELLIGENCE · <span className="font-mono text-[#35C6E8]">{CATALOGUE_SUMMARY.total}</span> Baseline Variants Indexed
              </p>
            </div>
          </div>

          <button
            id="close-neutracap-assist-btn"
            onClick={onClose}
            className="p-2 rounded-lg bg-[#0B1F36] hover:bg-[#173A5E] text-[#A8B4C2] hover:text-white border border-[#173A5E] transition-colors"
            aria-label="Close Assistant Console"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Message Stream */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#071426]/70 font-sans">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {/* Message Surface */}
              <div 
                className={`max-w-[90%] sm:max-w-[84%] rounded-xl p-4 text-xs sm:text-sm leading-relaxed transition-all ${
                  msg.sender === 'user'
                    ? 'bg-[#173A5E] text-white border border-[#35C6E8]/40 shadow-md'
                    : 'bg-[#0B1F36] text-[#F4F7FA] border border-[#173A5E] shadow-md'
                }`}
              >
                {/* Message Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10 text-[10px] font-mono">
                  <span className={msg.sender === 'user' ? 'text-[#35C6E8] font-bold' : 'text-[#35C6E8] font-bold'}>
                    {msg.sender === 'user' ? 'ENGINEERING CLIENT' : 'NEUTRACAP VECTOR ENGINE'}
                  </span>
                  <span className="text-[#A8B4C2]">
                    {msg.timestamp}
                  </span>
                </div>

                <div className="whitespace-pre-line font-sans">
                  {msg.text.split('\n').map((line, idx) => {
                    const boldParsed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
                    return (
                      <div 
                        key={idx} 
                        dangerouslySetInnerHTML={{ __html: boldParsed }} 
                        className={idx > 0 ? 'mt-1.5' : ''}
                      />
                    );
                  })}
                </div>

                {/* Render Matched Products if Assistant recommended them */}
                {msg.matchedProducts && msg.matchedProducts.length > 0 && (
                  <div className="mt-4 pt-3.5 border-t border-[#173A5E] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-bold text-white uppercase tracking-wider font-sans flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#35C6E8]" />
                        <span>MATCHED CATALOGUE SPECIFICATIONS:</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#16A34A] font-bold bg-[#071426] px-2 py-0.5 rounded border border-[#16A34A]/40">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>VERIFIED SPEC</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.matchedProducts.map((p) => (
                        <div 
                          key={p.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-[#071426] hover:bg-[#091C30] border border-[#173A5E] hover:border-[#35C6E8]/50 transition-colors gap-2"
                        >
                          <div>
                            <div className="text-xs font-bold text-white font-display">{p.productName}</div>
                            <div className="text-[11px] font-mono text-[#A8B4C2] mt-0.5">
                              SKU: <strong className="text-[#35C6E8]">{p.sku}</strong> · {p.capacitanceDisplay} · {p.voltageDisplay}
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                            <span className="text-xs font-mono font-bold text-white">₹{p.pricing.launchPrice}</span>
                            <button
                              onClick={() => {
                                onClose();
                                onSelectProduct(p);
                              }}
                              className="px-3 py-1.5 rounded-lg btn-tactile-primary text-white text-[10px] font-sans font-bold uppercase"
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
                  <div className="mt-3.5 pt-3.5 border-t border-[#173A5E]">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenEnquiry();
                      }}
                      className="w-full py-2.5 px-3 rounded-lg btn-tactile-primary text-white text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <span>Request Custom Engineering Specification</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#35C6E8]" />
                    </button>
                  </div>
                )}

                {/* Suggested Quick Question Chips */}
                {msg.suggestedActions && (
                  <div className="mt-3.5 pt-3.5 border-t border-[#173A5E] flex flex-wrap gap-2">
                    {msg.suggestedActions.map((s, i) => (
                      <button
                        key={i}
                        onClick={s.action}
                        className="px-3 py-1.5 rounded-lg bg-[#071426] hover:bg-[#173A5E] border border-[#173A5E] hover:border-[#35C6E8]/50 text-xs font-sans text-[#A8B4C2] hover:text-white transition-all shadow-xs"
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
            <div className="flex items-center gap-2.5 p-3 bg-[#0B1F36] rounded-xl border border-[#173A5E] max-w-[200px] shadow-sm">
              <RefreshCw className="w-4 h-4 animate-spin text-[#35C6E8]" />
              <span className="text-xs font-mono text-[#A8B4C2]">Querying dataset...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Engineering Grounding Bar */}
        <div className="px-4 py-2 bg-[#071426] border-t border-[#173A5E] text-[10.5px] text-[#A8B4C2] font-sans flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#35C6E8]" />
            <span>Grounded in NeutraCap's 490 canonical baseline dataset.</span>
          </div>
          <span className="hidden sm:inline text-[10px] font-mono text-[#35C6E8]">VECTOR v5.2</span>
        </div>

        {/* Tactile Input Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuery();
          }}
          className="p-3 sm:p-4 bg-[#0B1F36] border-t border-[#173A5E] flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              id="neutracap-assist-input"
              type="text"
              placeholder="Ask about capacitor ratings, HP sizing, or technical specs..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#071426] border border-[#173A5E] text-xs sm:text-sm text-white placeholder:text-[#A8B4C2]/60 focus:outline-none focus:border-[#35C6E8] font-sans shadow-inner"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="h-11 px-5 rounded-xl btn-tactile-primary text-white text-xs font-bold font-sans uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5 text-[#35C6E8]" />
            <span>Transmit</span>
          </button>
        </form>
      </div>
    </div>
  );
};
