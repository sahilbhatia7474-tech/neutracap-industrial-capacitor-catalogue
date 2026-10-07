/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * PRODUCT FAMILY SECTION — ULTRA-PREMIUM 3D INDUSTRIAL HARDWARE SHOWCASE
 * - 4 Handcrafted 3D Industrial Capacitor Specimen Vectors (DC Bus, Starting, Running, Green Filter)
 * - Individual 3D Perspective Tilt on Mouse Movement with Specular Cursor Glare on ALL 4 Cards
 * - Aerospace-Grade Anodized Metallic Inset Highlights & Chamfered Border Styling
 * - Real-Time Interactive Application Profile Switcher on Flagship DC Bus Line
 * - Laboratory-Grade Monospace Telemetry Matrix with Precision Luminescence
 */

import React, { useState } from 'react';
import { ProductFamily, ProductFamilyId } from '../../types';
import { ArrowRight, Layers, Zap, Activity, Waves, Cpu, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { CATALOGUE_SUMMARY } from '../../data/catalogueSummary';

export interface ProductFamilyStripProps {
  families?: ProductFamily[];
  onSelectFamily: (familyId: ProductFamilyId) => void;
}

interface DcFeature {
  id: string;
  label: string;
  spec: string;
  voltage: string;
  detail: string;
}

const DC_FEATURES: DcFeature[] = [
  { id: 'vfd', label: 'VFD Inverter Bus', spec: 'High Ripple Current', voltage: '350V ~ 500V DC', detail: 'Handles high-frequency switching ripples in heavy variable frequency motor drives.' },
  { id: 'solar', label: 'Solar Power Storage', spec: 'Long-Life Buffer', voltage: '400V ~ 450V DC', detail: 'Continuous DC link voltage smoothing in industrial solar PV central inverters.' },
  { id: 'screw', label: 'Screw Terminal', spec: 'Low ESR Bolt-On', voltage: '200V ~ 450V DC', detail: 'Heavy-gauge ring lug connections with insulated mounting collar hardware.' },
  { id: 'snapin', label: 'Snap-In PCB Pins', spec: 'High-Density Mounting', voltage: '16V ~ 450V DC', detail: 'Printed circuit board wave-solder pins for industrial power conversion units.' },
];

export const ProductFamilyStrip: React.FC<ProductFamilyStripProps> = ({
  onSelectFamily,
}) => {
  // 3D Tilt states for all 4 cards
  const [tiltDC, setTiltDC] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });
  const [tiltStart, setTiltStart] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });
  const [tiltRun, setTiltRun] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });
  const [tiltFilter, setTiltFilter] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });

  const [activeDcFeature, setActiveDcFeature] = useState<string>('vfd');

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rafTiltRef = React.useRef<number | null>(null);

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    setTilt: React.Dispatch<React.SetStateAction<{ x: number; y: number; glareX: number; glareY: number; active: boolean }>>
  ) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;

    const rotateY = ((xPos / rect.width) - 0.5) * 8;
    const rotateX = -((yPos / rect.height) - 0.5) * 8;
    const glareX = (xPos / rect.width) * 100;
    const glareY = (yPos / rect.height) * 100;

    if (rafTiltRef.current !== null) return;
    rafTiltRef.current = requestAnimationFrame(() => {
      setTilt({ x: rotateX, y: rotateY, glareX, glareY, active: true });
      rafTiltRef.current = null;
    });
  };

  const handleCardMouseLeave = (
    setTilt: React.Dispatch<React.SetStateAction<{ x: number; y: number; glareX: number; glareY: number; active: boolean }>>
  ) => {
    if (rafTiltRef.current !== null) {
      cancelAnimationFrame(rafTiltRef.current);
      rafTiltRef.current = null;
    }
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });
  };

  React.useEffect(() => {
    return () => {
      if (rafTiltRef.current !== null) {
        cancelAnimationFrame(rafTiltRef.current);
      }
    };
  }, []);

  const activeFeatureData = DC_FEATURES.find((f) => f.id === activeDcFeature) || DC_FEATURES[0];

  return (
    <section 
      id="product-families" 
      className="py-20 md:py-32 bg-[#030712] border-b border-white/10 relative overflow-hidden text-white"
    >
      {/* Precision Micro-Grid & Multi-Point Volumetric Illumination */}
      <div className="absolute inset-0 bg-luxury-grid opacity-35 pointer-events-none"></div>
      
      {/* Deep Atmospheric Lighting Halos */}
      <div className="absolute -top-32 left-1/3 w-[700px] h-[700px] bg-radial from-[#173A5E]/35 via-[#0E7490]/15 to-transparent blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-radial from-[#35C6E8]/12 via-[#10B981]/6 to-transparent blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -left-20 w-[450px] h-[450px] bg-radial from-[#D98A4A]/12 to-transparent blur-3xl pointer-events-none"></div>

      {/* Top Specular Edge Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#35C6E8]/50 to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Elevated Chrome & Cyan Typography */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 pb-8 border-b border-white/10 gap-6 stagger-item stagger-item-1">
          <div className="max-w-3xl">
            {/* Rich Eyebrow with Glass Backdrop */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-mono font-bold tracking-widest text-[#35C6E8] uppercase shadow-md backdrop-blur-md mb-3">
              <Layers className="w-3.5 h-3.5 text-[#35C6E8] animate-pulse" />
              <span>PRODUCT ARCHITECTURE · 4 SPECIALIZED INDUSTRIAL FAMILIES</span>
            </div>

            {/* High-Contrast Editorial Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-editorial tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#35C6E8] drop-shadow-[0_4px_24px_rgba(53,198,232,0.3)]">
              Capacitor Product System
            </h2>

            {/* Clear Industrial Supporting Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 mt-3 font-sans leading-relaxed">
              Structured engineering navigation across all <strong className="text-white font-mono font-semibold">{CATALOGUE_SUMMARY.total} verified baseline variants</strong>. Engineered for momentary motor starting bursts, continuous 10,000-hour run duty, active harmonic mitigation, and extreme ripple DC power storage.
            </p>
          </div>

          {/* Rich Metallic Live Variant Counter Badge */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#0B1F36]/90 via-[#071426] to-[#040C18] px-5 py-3.5 rounded-2xl border border-[#35C6E8]/40 shadow-[0_8px_25px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] self-start lg:self-auto font-mono text-xs backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
            </span>
            <div className="text-left">
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Active Baseline</span>
              <span className="text-sm font-bold text-white tracking-tight">
                <strong className="text-[#35C6E8] font-mono">{CATALOGUE_SUMMARY.total}</strong> Verified Variants
              </span>
            </div>
          </div>
        </div>

        {/* 3D Asymmetrical System Grid: 7 Cols (Featured DC Line) + 5 Cols (3 AC Motor & Filter Lines) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch [perspective:1400px]">
          
          {/* ========================================================
              CARD 1: 3D DC ALUMINIUM ELECTROLYTIC LINE (7 COLS)
             ======================================================== */}
          <div 
            id="family-gateway-card-dc_electrolytic"
            onClick={() => onSelectFamily('dc_electrolytic')}
            className="lg:col-span-7 rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#0B1F36]/95 via-[#071426] to-[#030914] border border-white/15 hover:border-[#35C6E8]/80 transition-all duration-200 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(53,198,232,0.25)] relative overflow-hidden group cursor-pointer"
            style={{
              transform: `perspective(1000px) rotateX(${tiltDC.x}deg) rotateY(${tiltDC.y}deg) scale(${tiltDC.active ? 1.015 : 1})`,
              transformStyle: 'preserve-3d',
              transition: tiltDC.active ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseMove={(e) => handleCardMouseMove(e, setTiltDC)}
            onMouseLeave={() => handleCardMouseLeave(setTiltDC)}
          >
            {/* Dynamic Specular 3D Reflection Glare */}
            <div 
              className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 420px at ${tiltDC.glareX}% ${tiltDC.glareY}%, rgba(53,198,232,0.2), transparent 70%)`,
              }}
            ></div>

            {/* Top specular chamfer & background glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#35C6E8]/70 to-transparent"></div>
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#35C6E8]/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-6 relative z-10 [transform:translateZ(20px)]">
              {/* Card Header Telemetry */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3.5">
                  {/* Award-Level Iconic Medallion: DC Power */}
                  <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-b from-[#143252] via-[#0A1D33] to-[#040C17] border border-[#35C6E8]/70 shadow-[0_0_25px_rgba(53,198,232,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)] group-hover:scale-110 group-hover:border-[#35C6E8] group-hover:shadow-[0_0_35px_rgba(53,198,232,0.6)] transition-all shrink-0">
                    <div className="absolute inset-1 rounded-xl bg-radial from-[#35C6E8]/25 to-transparent pointer-events-none"></div>
                    <Cpu className="w-7 h-7 text-[#35C6E8] filter drop-shadow-[0_0_8px_rgba(53,198,232,0.9)] relative z-10" />
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#35C6E8] shadow-[0_0_6px_#35C6E8] animate-pulse"></span>
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest block flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#35C6E8]"></span>
                      LINE 04 · INDUSTRIAL POWER CONVERSION
                    </span>
                    <span className="text-xs font-sans font-bold text-[#35C6E8]">
                      DC Bus Links &amp; Inverter Power Storage
                    </span>
                  </div>
                </div>

                <div className="font-mono text-xs font-bold text-white bg-black/60 px-3.5 py-1.5 rounded-xl border border-white/20 shadow-inner">
                  <strong className="text-[#35C6E8] text-sm">{CATALOGUE_SUMMARY.dcAluminium}</strong> VARIANTS
                </div>
              </div>

              {/* Title & 3D Specimen Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-8">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight group-hover:text-[#35C6E8] transition-colors leading-tight">
                    DC Aluminium Electrolytic Capacitors
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 mt-2.5 font-sans leading-relaxed">
                    Heavy-duty screw terminal and snap-in cylindrical canisters engineered for extreme ripple current endurance, variable frequency drives (VFDs), solar power inverters, and industrial energy buffers.
                  </p>
                </div>

                {/* Handcrafted 3D Aluminium Canister Specimen Graphic */}
                <div className="sm:col-span-4 flex items-center justify-center">
                  <div className="relative flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
                    {/* Dual Heavy Bolt Terminals */}
                    <div className="flex gap-4 -mb-2 z-20">
                      <div className="w-4 h-4 bg-gradient-to-b from-slate-200 to-slate-400 border border-slate-600 rounded-sm shadow-md flex items-center justify-center text-[8px] text-slate-950 font-bold">+</div>
                      <div className="w-4 h-4 bg-gradient-to-b from-slate-200 to-slate-400 border border-slate-600 rounded-sm shadow-md flex items-center justify-center text-[8px] text-slate-950 font-bold">-</div>
                    </div>
                    {/* Canister Body */}
                    <div className="w-24 h-36 rounded-t-lg rounded-b-2xl bg-gradient-to-r from-[#0B1E38] via-[#1E4D7B] to-[#071324] border-2 border-[#35C6E8]/80 shadow-[0_15px_35px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.3)] flex flex-col items-center justify-between py-3 text-white px-2 relative overflow-hidden">
                      {/* Metallic Sheen */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"></div>
                      <span className="text-[9px] font-bold tracking-widest text-[#35C6E8] font-mono">NEUTRACAP</span>
                      <div className="text-center font-mono">
                        <div className="text-xs font-bold text-white">3300 µF</div>
                        <div className="text-[10px] text-[#35C6E8] font-bold">450V DC</div>
                        <div className="text-[8px] text-slate-400">HIGH RIPPLE</div>
                      </div>
                      <div className="w-full flex justify-between px-1 text-[7px] text-slate-400 font-mono border-t border-[#173A5E] pt-1">
                        <span>ALU-CAN</span>
                        <span className="text-emerald-400 font-bold">100% QC</span>
                      </div>
                    </div>
                    {/* Contact Ground Shadow */}
                    <div className="w-20 h-2 bg-[#35C6E8]/30 rounded-full blur-[3px] mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Interactive 3D Sub-Application Selector Chips */}
              <div className="pt-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Interactive Application Profiles:</span>
                  <span className="text-[#35C6E8] font-bold">Click Profile to Inspect</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DC_FEATURES.map((feat) => (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDcFeature(feat.id);
                      }}
                      className={`p-2.5 rounded-xl text-left font-mono transition-all cursor-pointer ${
                        activeDcFeature === feat.id
                          ? 'bg-[#173A5E] text-white border border-[#35C6E8] shadow-[0_4px_15px_rgba(53,198,232,0.3)] ring-1 ring-[#35C6E8]/50 scale-102'
                          : 'bg-black/50 text-slate-300 hover:text-white border border-white/10 hover:border-[#35C6E8]/40'
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider truncate">{feat.label}</div>
                      <div className="text-xs font-bold text-[#35C6E8] mt-0.5 truncate">{feat.voltage}</div>
                    </button>
                  ))}
                </div>

                {/* Feature Detail Inspector Card */}
                <div className="mt-3 p-3.5 rounded-2xl bg-black/70 border border-[#35C6E8]/40 font-sans text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-inner animate-in fade-in duration-150">
                  <div className="min-w-0">
                    <span className="text-white font-bold block sm:inline">{activeFeatureData.spec}: </span>
                    <span className="text-slate-300">{activeFeatureData.detail}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 rounded-md shrink-0 self-start sm:self-auto shadow-sm">
                    HEAVY DUTY
                  </span>
                </div>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 font-mono">
                <div className="p-3 rounded-2xl bg-black/50 border border-white/15 shadow-inner">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Voltage Span</div>
                  <div className="text-xs sm:text-sm font-bold text-[#35C6E8] mt-0.5">16V ~ 500V DC</div>
                </div>
                <div className="p-3 rounded-2xl bg-black/50 border border-white/15 shadow-inner">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Capacitance</div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5">47 ~ 22,000 µF</div>
                </div>
                <div className="p-3 rounded-2xl bg-black/50 border border-white/15 shadow-inner col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Termination</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">Screw &amp; Snap-in</div>
                </div>
              </div>
            </div>

            {/* Bottom Direct Exploration Action */}
            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-sans font-bold text-white group-hover:text-[#35C6E8] transition-colors [transform:translateZ(15px)]">
              <span className="flex items-center gap-2">
                <span>Explore All {CATALOGUE_SUMMARY.dcAluminium} DC Electrolytic Variants</span>
                <span className="text-[10px] font-mono text-slate-400 font-normal">(Immediate Dispatch)</span>
              </span>
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/15 group-hover:bg-[#35C6E8] group-hover:text-slate-950 flex items-center justify-center transition-all group-hover:translate-x-1 shadow-md">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: 3 AC MOTOR & POWER QUALITY LINES (5 COLS)
             ======================================================== */}
          <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
            
            {/* ========================================================
                CARD 2: STARTING CAPACITORS (3D TACTILE CARD)
               ======================================================== */}
            <div 
              id="family-gateway-card-starting"
              onClick={() => onSelectFamily('starting')}
              className="rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-[#0B1F36]/95 via-[#071426] to-[#040C18] border border-white/15 hover:border-[#D98A4A]/80 transition-all duration-200 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(217,138,74,0.25)] cursor-pointer group flex-1 relative overflow-hidden"
              style={{
                transform: `perspective(1000px) rotateX(${tiltStart.x}deg) rotateY(${tiltStart.y}deg) scale(${tiltStart.active ? 1.015 : 1})`,
                transformStyle: 'preserve-3d',
                transition: tiltStart.active ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out, border-color 0.3s ease',
              }}
              onMouseMove={(e) => handleCardMouseMove(e, setTiltStart)}
              onMouseLeave={() => handleCardMouseLeave(setTiltStart)}
            >
              {/* Dynamic Specular Glare */}
              <div 
                className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 300px at ${tiltStart.glareX}% ${tiltStart.glareY}%, rgba(217,138,74,0.18), transparent 70%)`,
                }}
              ></div>

              <div className="relative z-10 [transform:translateZ(15px)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    {/* Award-Level Iconic Medallion: Motor Starting */}
                    <div className="relative flex items-center justify-center w-13 h-13 rounded-2xl bg-gradient-to-b from-[#2E1805] via-[#1B0E03] to-[#0A0501] border border-[#F59E0B]/60 shadow-[0_0_20px_rgba(245,158,11,0.3),inset_0_1px_2px_rgba(255,255,255,0.35)] shrink-0 group-hover:scale-110 group-hover:border-[#F59E0B] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all">
                      <div className="absolute inset-1 rounded-xl bg-radial from-[#F59E0B]/30 to-transparent pointer-events-none"></div>
                      <Zap className="w-6 h-6 text-[#F59E0B] fill-[#F59E0B]/20 filter drop-shadow-[0_0_7px_rgba(245,158,11,0.9)] relative z-10 transform group-hover:-rotate-6 transition-transform" />
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_6px_#F59E0B] animate-pulse"></span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D98A4A]"></span>
                        LINE 01 · MOTOR STARTING
                      </span>
                      <h4 className="text-lg font-bold text-white font-display group-hover:text-[#D98A4A] transition-colors">
                        Starting Capacitors
                      </h4>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-[#D98A4A] bg-black/60 px-3 py-1.5 rounded-xl border border-[#D98A4A]/30 shrink-0 shadow-inner">
                    {CATALOGUE_SUMMARY.starting} SKUs
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 mt-3">
                  <p className="text-xs text-slate-300 font-sans leading-relaxed flex-1">
                    High momentary torque burst capacitors with phenolic cylindrical casing for AC induction &amp; submersible motors.
                  </p>

                  {/* 3D Phenolic Starting Capacitor Specimen Graphic */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="flex gap-1.5 -mb-1 z-10">
                      <div className="w-1.5 h-3 bg-gradient-to-b from-amber-300 to-[#D98A4A] rounded-t-xs shadow-xs"></div>
                      <div className="w-1.5 h-3 bg-gradient-to-b from-amber-300 to-[#D98A4A] rounded-t-xs shadow-xs"></div>
                    </div>
                    <div className="w-12 h-16 rounded-t-md rounded-b-lg bg-[#071426] border border-[#D98A4A]/60 shadow-lg flex flex-col items-center justify-between py-1 px-0.5 text-white">
                      <span className="text-[6px] font-bold text-[#D98A4A] font-mono">START</span>
                      <div className="text-[6px] text-center font-mono leading-tight">
                        <div className="font-bold">100 µF</div>
                        <div className="text-slate-400">250V</div>
                      </div>
                      <span className="text-[5px] text-[#10B981]">QC PASS</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono relative z-10">
                <span className="text-slate-400">250V ~ 450V AC · 40/60 ~ 400/500 µF</span>
                <span className="text-white group-hover:text-[#D98A4A] font-bold flex items-center gap-1 transition-colors">
                  <span>View Line</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

            {/* ========================================================
                CARD 3: RUNNING CAPACITORS (3D TACTILE CARD)
               ======================================================== */}
            <div 
              id="family-gateway-card-running"
              onClick={() => onSelectFamily('running')}
              className="rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-[#0B1F36]/95 via-[#071426] to-[#040C18] border border-white/15 hover:border-[#35C6E8]/80 transition-all duration-200 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(53,198,232,0.25)] cursor-pointer group flex-1 relative overflow-hidden"
              style={{
                transform: `perspective(1000px) rotateX(${tiltRun.x}deg) rotateY(${tiltRun.y}deg) scale(${tiltRun.active ? 1.015 : 1})`,
                transformStyle: 'preserve-3d',
                transition: tiltRun.active ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out, border-color 0.3s ease',
              }}
              onMouseMove={(e) => handleCardMouseMove(e, setTiltRun)}
              onMouseLeave={() => handleCardMouseLeave(setTiltRun)}
            >
              {/* Dynamic Specular Glare */}
              <div 
                className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 300px at ${tiltRun.glareX}% ${tiltRun.glareY}%, rgba(53,198,232,0.18), transparent 70%)`,
                }}
              ></div>

              <div className="relative z-10 [transform:translateZ(15px)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    {/* Award-Level Iconic Medallion: Continuous Running */}
                    <div className="relative flex items-center justify-center w-13 h-13 rounded-2xl bg-gradient-to-b from-[#082236] via-[#051624] to-[#020A10] border border-[#35C6E8]/60 shadow-[0_0_20px_rgba(53,198,232,0.3),inset_0_1px_2px_rgba(255,255,255,0.4)] shrink-0 group-hover:scale-110 group-hover:border-[#35C6E8] group-hover:shadow-[0_0_30px_rgba(53,198,232,0.6)] transition-all">
                      <div className="absolute inset-1 rounded-xl bg-radial from-[#35C6E8]/30 to-transparent pointer-events-none"></div>
                      <Activity className="w-6 h-6 text-[#35C6E8] filter drop-shadow-[0_0_7px_rgba(53,198,232,0.9)] relative z-10 transform group-hover:scale-105 transition-transform" />
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#35C6E8] shadow-[0_0_6px_#35C6E8] animate-pulse"></span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#35C6E8]"></span>
                        LINE 02 · CONTINUOUS DUTY
                      </span>
                      <h4 className="text-lg font-bold text-white font-display group-hover:text-[#35C6E8] transition-colors">
                        Running Capacitors
                      </h4>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-[#35C6E8] bg-black/60 px-3 py-1.5 rounded-xl border border-[#35C6E8]/30 shrink-0 shadow-inner">
                    {CATALOGUE_SUMMARY.running} SKUs
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 mt-3">
                  <p className="text-xs text-slate-300 font-sans leading-relaxed flex-1">
                    Self-healing metallized film engineered for 10,000+ continuous operating hours across HVAC, refrigeration &amp; blowers.
                  </p>

                  {/* 3D Round Aluminium Run Capacitor Specimen Graphic */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="flex gap-1.5 -mb-1 z-10">
                      <div className="w-2 h-2.5 bg-gradient-to-b from-slate-200 to-slate-400 rounded-t-xs shadow-xs"></div>
                      <div className="w-2 h-2.5 bg-gradient-to-b from-slate-200 to-slate-400 rounded-t-xs shadow-xs"></div>
                    </div>
                    <div className="w-12 h-16 rounded-t-md rounded-b-lg bg-[#0F2848] border border-[#35C6E8]/60 shadow-lg flex flex-col items-center justify-between py-1 px-0.5 text-white">
                      <span className="text-[6px] font-bold text-[#35C6E8] font-mono">SH FILM</span>
                      <div className="text-[6px] text-center font-mono leading-tight">
                        <div className="font-bold">36 MFD</div>
                        <div className="text-slate-400">440V</div>
                      </div>
                      <span className="text-[5px] text-slate-300">10,000h</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono relative z-10">
                <span className="text-slate-400">400V ~ 450V AC · 2.0 ~ 72 MFD</span>
                <span className="text-white group-hover:text-[#35C6E8] font-bold flex items-center gap-1 transition-colors">
                  <span>View Line</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

            {/* ========================================================
                CARD 4: GREEN FILTER CAPACITORS (3D TACTILE CARD)
               ======================================================== */}
            <div 
              id="family-gateway-card-green_filter"
              onClick={() => onSelectFamily('green_filter')}
              className="rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-[#0B1F36]/95 via-[#071426] to-[#040C18] border border-white/15 hover:border-emerald-400/80 transition-all duration-200 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(16,185,129,0.25)] cursor-pointer group flex-1 relative overflow-hidden"
              style={{
                transform: `perspective(1000px) rotateX(${tiltFilter.x}deg) rotateY(${tiltFilter.y}deg) scale(${tiltFilter.active ? 1.015 : 1})`,
                transformStyle: 'preserve-3d',
                transition: tiltFilter.active ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out, border-color 0.3s ease',
              }}
              onMouseMove={(e) => handleCardMouseMove(e, setTiltFilter)}
              onMouseLeave={() => handleCardMouseLeave(setTiltFilter)}
            >
              {/* Dynamic Specular Glare */}
              <div 
                className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 300px at ${tiltFilter.glareX}% ${tiltFilter.glareY}%, rgba(16,185,129,0.18), transparent 70%)`,
                }}
              ></div>

              <div className="relative z-10 [transform:translateZ(15px)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    {/* Award-Level Iconic Medallion: Power Quality & Filter */}
                    <div className="relative flex items-center justify-center w-13 h-13 rounded-2xl bg-gradient-to-b from-[#062618] via-[#03150D] to-[#010805] border border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.3),inset_0_1px_2px_rgba(255,255,255,0.4)] shrink-0 group-hover:scale-110 group-hover:border-emerald-400 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all">
                      <div className="absolute inset-1 rounded-xl bg-radial from-emerald-500/30 to-transparent pointer-events-none"></div>
                      <Waves className="w-6 h-6 text-emerald-400 filter drop-shadow-[0_0_7px_rgba(16,185,129,0.9)] relative z-10 transform group-hover:scale-105 transition-transform" />
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981] animate-pulse"></span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        LINE 03 · POWER QUALITY &amp; APFC
                      </span>
                      <h4 className="text-lg font-bold text-white font-display group-hover:text-emerald-400 transition-colors">
                        Green Filter Capacitors
                      </h4>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-emerald-400 bg-black/60 px-3 py-1.5 rounded-xl border border-emerald-400/30 shrink-0 shadow-inner">
                    {CATALOGUE_SUMMARY.greenFilter} SKUs
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 mt-3">
                  <p className="text-xs text-slate-300 font-sans leading-relaxed flex-1">
                    Low-loss non-inductive construction for active harmonic suppression &amp; tuned APFC industrial capacitor banks.
                  </p>

                  {/* 3D Green Filter Specimen Graphic */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-2.5 h-2 bg-gradient-to-b from-amber-300 to-[#D98A4A] rounded-t-xs -mb-0.5 z-10 shadow-xs"></div>
                    <div className="w-12 h-16 rounded-t-md rounded-b-lg bg-[#062618] border border-emerald-400/70 shadow-lg flex flex-col items-center justify-between py-1 px-0.5 text-white">
                      <span className="text-[6px] font-bold text-emerald-400 font-mono">HARMONIC</span>
                      <div className="text-[6px] text-center font-mono leading-tight">
                        <div className="font-bold text-emerald-200">LOW tan δ</div>
                        <div className="text-slate-400">440V</div>
                      </div>
                      <span className="text-[5px] text-emerald-300">APFC BANK</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono relative z-10">
                <span className="text-slate-400">250V ~ 440V AC · LOW LOSS tan δ</span>
                <span className="text-white group-hover:text-emerald-400 font-bold flex items-center gap-1 transition-colors">
                  <span>View Line</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
