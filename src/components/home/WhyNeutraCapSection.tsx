/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * WHY NEUTRACAP SECTION (3D INTERACTIVE PROOF ARCHITECTURE)
 * - 3D Perspective Tilt on Mouse Movement with dynamic specular reflections & depth planes
 * - Card 1 (Heritage): Interactive 3D Milestone Timeline (1989 → 2005 → 2018 → Present)
 * - Card 2 (Testing Rigour): Interactive Dielectric Hi-Pot Tester Simulator with real-time waveform & pass telemetry
 * - Card 3 (Catalogue Scale): Interactive 4-Architecture Line Filter that updates live variant counts and specs
 * - Fully accessible, touch-friendly, and respects prefers-reduced-motion
 */

import React, { useState, useRef } from 'react';
import { SITE_FACTS } from '../../data/siteFacts';
import { CATALOGUE_SUMMARY } from '../../data/catalogueSummary';
import { ShieldCheck, CheckCircle2, Factory, Play, ArrowRight, Activity, Zap, Sparkles, RefreshCw } from 'lucide-react';
import { SiteMediaPlacement } from '../../services/siteMediaRegistry';

export interface WhyNeutraCapSectionProps {
  onOpenVideoModal?: (placement?: SiteMediaPlacement) => void;
}

// Interactive Milestone Data for Card 1
const HERITAGE_MILESTONES = [
  { year: '1989', label: 'Founded in New Delhi', detail: 'Precision motor capacitor manufacturing commenced.' },
  { year: '2005', label: '100% Routine Screening', detail: 'Zero-batch-sampling policy instituted across all lines.' },
  { year: '2018', label: 'Automated Dielectric Bays', detail: 'High-voltage hi-pot automated breakdown screening.' },
  { year: 'Present', label: '490 Baseline Variants', detail: 'Comprehensive OEM catalogue dispatch across India.' },
];

// Interactive Screening Metrics for Card 2
type TestMetricKey = 'dielectric' | 'loss' | 'tolerance';

interface TestMetricInfo {
  title: string;
  nominal: string;
  result: string;
  detail: string;
  status: 'PASS' | 'VERIFIED' | 'SCREENED';
}

const TEST_METRICS: Record<TestMetricKey, TestMetricInfo> = {
  dielectric: {
    title: 'High-Voltage Dielectric Screen',
    nominal: '2.5 kV AC applied for 2 seconds',
    result: 'HI-POT PASS',
    detail: 'Zero puncture or arc breakdown under 2.5 kV dielectric withstand stress.',
    status: 'PASS',
  },
  loss: {
    title: 'Dissipation Factor (tan δ)',
    nominal: 'Target: < 0.0020 at 50Hz',
    result: 'tan δ: 0.0014',
    detail: 'Ultra-low internal dielectric dissipation ensures cool operating run temperature.',
    status: 'VERIFIED',
  },
  tolerance: {
    title: 'Capacitance Window Screen',
    nominal: 'Target: Nominal ± 5.0%',
    result: '± 5% SCREENED',
    detail: 'Actual batch tolerance verified within ±1.8% of specified capacitance rating.',
    status: 'SCREENED',
  },
};

// Architecture Data for Card 3
type ArchKey = 'all' | 'starting' | 'running' | 'greenFilter' | 'dcAluminium';

export const WhyNeutraCapSection: React.FC<WhyNeutraCapSectionProps> = ({
  onOpenVideoModal,
}) => {
  // 3D Tilt states for Cards
  const [card1Tilt, setCard1Tilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });
  const [card2Tilt, setCard2Tilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });
  const [card3Tilt, setCard3Tilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });

  // Interactive States
  const [selectedMilestone, setSelectedMilestone] = useState(0);
  const [activeTestMetric, setActiveTestMetric] = useState<TestMetricKey>('dielectric');
  const [isTestPulsing, setIsTestPulsing] = useState(false);
  const [selectedArch, setSelectedArch] = useState<ArchKey>('all');

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rafWhyTiltRef = React.useRef<number | null>(null);

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    setTilt: React.Dispatch<React.SetStateAction<{ x: number; y: number; glareX: number; glareY: number; active: boolean }>>
  ) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    
    // Normalized tilt values (-6deg to +6deg)
    const rotateY = ((xPos / rect.width) - 0.5) * 10;
    const rotateX = -((yPos / rect.height) - 0.5) * 10;
    
    // Glare position percentage
    const glareX = (xPos / rect.width) * 100;
    const glareY = (yPos / rect.height) * 100;

    if (rafWhyTiltRef.current !== null) return;
    rafWhyTiltRef.current = requestAnimationFrame(() => {
      setTilt({ x: rotateX, y: rotateY, glareX, glareY, active: true });
      rafWhyTiltRef.current = null;
    });
  };

  const handleCardMouseLeave = (
    setTilt: React.Dispatch<React.SetStateAction<{ x: number; y: number; glareX: number; glareY: number; active: boolean }>>
  ) => {
    if (rafWhyTiltRef.current !== null) {
      cancelAnimationFrame(rafWhyTiltRef.current);
      rafWhyTiltRef.current = null;
    }
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });
  };

  React.useEffect(() => {
    return () => {
      if (rafWhyTiltRef.current !== null) {
        cancelAnimationFrame(rafWhyTiltRef.current);
      }
    };
  }, []);

  const triggerTestSimulation = (key: TestMetricKey) => {
    setActiveTestMetric(key);
    setIsTestPulsing(true);
    setTimeout(() => setIsTestPulsing(false), 900);
  };

  // Compute active count for Card 3
  const getArchDisplay = () => {
    switch (selectedArch) {
      case 'starting':
        return { count: CATALOGUE_SUMMARY.starting, title: 'Motor Starting SKUs', range: '250V ~ 450V AC · 40/60 ~ 400/500 µF', tag: 'High-Torque Start' };
      case 'running':
        return { count: CATALOGUE_SUMMARY.running, title: 'Continuous Running SKUs', range: '400V ~ 450V AC · 2.0 ~ 72 MFD', tag: '10,000h Self-Healing' };
      case 'greenFilter':
        return { count: CATALOGUE_SUMMARY.greenFilter, title: 'Green Filter SKUs', range: '250V ~ 440V AC · Low Loss tan δ', tag: 'Harmonic Suppression' };
      case 'dcAluminium':
        return { count: CATALOGUE_SUMMARY.dcAluminium, title: 'DC Aluminium Electrolytic SKUs', range: '16V ~ 500V DC · 47 ~ 22,000 µF', tag: 'High-Ripple VFD Bus' };
      default:
        return { count: CATALOGUE_SUMMARY.total, title: 'Engineered Baseline Variants', range: 'Starting · Running · Green Filter · DC Bus', tag: 'Immediate Ex-Factory' };
    }
  };

  const archDisplay = getArchDisplay();

  return (
    <section 
      id="why-neutracap" 
      className="py-18 md:py-28 bg-obsidian-depth border-b border-white/10 relative overflow-hidden text-white"
    >
      {/* Precision background engineering grid & atmospheric lighting */}
      <div className="absolute inset-0 bg-luxury-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#173A5E]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18 stagger-item stagger-item-1">
          <div className="text-xs font-mono font-bold tracking-widest text-[#35C6E8] uppercase mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35C6E8] animate-pulse"></span>
            <span>EMPIRICAL VERIFICATION · ESTABLISHED 1989 · INTERACTIVE 3D PROOF</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-editorial tracking-tight leading-[1.1]">
            Engineering Built For Extreme Industrial Duty Cycles.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-3 font-sans max-w-2xl leading-relaxed">
            From single-phase motor starting torque bursts to 10,000-hour continuous harmonic filtration and high-ripple DC bus power conversion. Hover and interact with the empirical evidence below.
          </p>
        </div>

        {/* 3D Interactive Proof Sequence: 3 Responsive Dimensional Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch [perspective:1400px]">
          
          {/* ========================================================
              PROOF 01: 3D HERITAGE ANCHOR (5 COLUMNS)
             ======================================================== */}
          <div 
            className="lg:col-span-5 rounded-3xl p-7 sm:p-10 bg-gradient-to-b from-[#0B1F36]/95 via-[#071426] to-[#040C18] border border-white/10 hover:border-[#D98A4A]/60 transition-all duration-200 flex flex-col justify-between shadow-2xl relative overflow-hidden group cursor-default"
            style={{
              transform: `perspective(1000px) rotateX(${card1Tilt.x}deg) rotateY(${card1Tilt.y}deg) scale(${card1Tilt.active ? 1.015 : 1})`,
              transformStyle: 'preserve-3d',
              transition: card1Tilt.active ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out, border-color 0.3s ease',
            }}
            onMouseMove={(e) => handleCardMouseMove(e, setCard1Tilt)}
            onMouseLeave={() => handleCardMouseLeave(setCard1Tilt)}
          >
            {/* Dynamic Specular 3D Reflection Glare */}
            <div 
              className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 350px at ${card1Tilt.glareX}% ${card1Tilt.glareY}%, rgba(217,138,74,0.18), transparent 70%)`,
              }}
            ></div>

            <div className="space-y-6 relative z-10 [transform:translateZ(20px)]">
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D98A4A]"></span>
                  PROOF 01 · 35+ YEARS HERITAGE
                </span>
                {/* Award-Level Iconic Medallion: 35+ Years Heritage */}
                <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-b from-[#2E1805] via-[#1B0E03] to-[#0A0501] border border-[#D98A4A]/60 shadow-[0_0_20px_rgba(217,138,74,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)] group-hover:scale-110 group-hover:border-[#D98A4A] group-hover:shadow-[0_0_30px_rgba(217,138,74,0.6)] transition-all shrink-0">
                  <div className="absolute inset-1 rounded-xl bg-radial from-[#D98A4A]/30 to-transparent pointer-events-none"></div>
                  <Factory className="w-6 h-6 text-[#D98A4A] filter drop-shadow-[0_0_6px_rgba(217,138,74,0.9)] relative z-10" />
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#D98A4A] shadow-[0_0_6px_#D98A4A] animate-pulse"></span>
                </div>
              </div>

              {/* Monumental 3D Numerical Statement */}
              <div className="pt-2 relative">
                <div className="absolute -top-4 -left-4 w-40 h-32 bg-[#D98A4A]/15 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative flex flex-wrap items-baseline gap-3">
                  <span className="text-6xl sm:text-7xl md:text-8xl font-black font-display tracking-tighter leading-none bg-gradient-to-br from-white via-amber-100 to-[#D98A4A] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(217,138,74,0.35)]">
                    {SITE_FACTS.establishedExperienceYears}
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#D98A4A] tracking-wider font-display bg-[#D98A4A]/15 border border-[#D98A4A]/30 px-3 py-1 rounded-xl shadow-inner">
                    + YEARS
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-3 leading-snug">
                  Precision Manufacturing Since {SITE_FACTS.heritageYear}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Supplying precision motor and power conversion capacitors to industrial equipment OEMs, switchgear panel builders, and submersible pump manufacturers across India since 1989.
              </p>

              {/* Interactive 3D Milestone Timeline */}
              <div className="pt-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Interactive Historical Timeline:</span>
                  <span className="text-[#D98A4A] font-bold">Click Milestone</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10">
                  {HERITAGE_MILESTONES.map((m, idx) => (
                    <button
                      key={m.year}
                      type="button"
                      onClick={() => setSelectedMilestone(idx)}
                      className={`py-1.5 px-1 rounded-lg text-xs font-mono font-bold transition-all text-center cursor-pointer ${
                        selectedMilestone === idx
                          ? 'bg-[#D98A4A] text-slate-950 shadow-md scale-102'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {m.year}
                    </button>
                  ))}
                </div>

                {/* Milestone Detail Card */}
                <div className="mt-2.5 p-3 rounded-xl bg-black/50 border border-[#D98A4A]/30 text-xs font-sans animate-in fade-in duration-200">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D98A4A]"></span>
                    <span>{HERITAGE_MILESTONES[selectedMilestone].label}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 font-mono">
                    {HERITAGE_MILESTONES[selectedMilestone].detail}
                  </p>
                </div>
              </div>
            </div>

            {onOpenVideoModal && (
              <button
                type="button"
                onClick={() => onOpenVideoModal('facility.tour.video')}
                className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white hover:text-[#35C6E8] active:text-[#00B4D8] w-full text-left font-sans cursor-pointer transition-colors group/btn relative z-10 [transform:translateZ(15px)]"
                aria-label="Watch NeutraCap 35+ Years Manufacturing Heritage Factory Tour Video"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#35C6E8]/20 flex items-center justify-center text-[#35C6E8] group-hover/btn:bg-[#35C6E8] group-hover/btn:text-[#071426] transition-colors shrink-0 shadow-sm">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold font-sans">Watch Factory Tour Video</span>
                    <span className="block text-[11px] text-slate-400 font-normal">Step inside our screening &amp; production facility</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover/btn:text-[#35C6E8] group-hover/btn:translate-x-1 transition-all" />
              </button>
            )}
          </div>

          {/* ========================================================
              RIGHT COLUMN: PROOF 02 & PROOF 03 (7 COLUMNS)
             ======================================================== */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
            
            {/* PROOF 02: 3D SCREENING RIGOUR & INTERACTIVE TESTER */}
            <div 
              className="rounded-3xl p-7 sm:p-9 bg-gradient-to-r from-[#0B1F36]/95 via-[#071426] to-[#040C18] border border-white/10 hover:border-emerald-400/60 transition-all duration-200 relative overflow-hidden group shadow-2xl flex-1 flex flex-col justify-between cursor-default"
              style={{
                transform: `perspective(1000px) rotateX(${card2Tilt.x}deg) rotateY(${card2Tilt.y}deg) scale(${card2Tilt.active ? 1.015 : 1})`,
                transformStyle: 'preserve-3d',
                transition: card2Tilt.active ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out, border-color 0.3s ease',
              }}
              onMouseMove={(e) => handleCardMouseMove(e, setCard2Tilt)}
              onMouseLeave={() => handleCardMouseLeave(setCard2Tilt)}
            >
              {/* Dynamic Specular 3D Reflection Glare */}
              <div 
                className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 350px at ${card2Tilt.glareX}% ${card2Tilt.glareY}%, rgba(16,185,129,0.18), transparent 70%)`,
                }}
              ></div>

              <div className="space-y-4 relative z-10 [transform:translateZ(20px)]">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    PROOF 02 · 100% SCREENING RIGOUR
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 text-emerald-400 text-xs font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                    <span>100% TESTED</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-4 pt-1">
                  <div className="relative shrink-0 flex items-baseline">
                    <div className="absolute -top-3 -left-3 w-28 h-20 bg-emerald-500/20 rounded-full blur-xl pointer-events-none"></div>

                    <span className="text-6xl sm:text-7xl lg:text-8xl font-black font-display tracking-tighter leading-none bg-gradient-to-br from-white via-emerald-200 to-[#10B981] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(16,185,129,0.35)]">
                      100
                    </span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-display ml-1">
                      %
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                      Individual Dielectric Batch Testing
                    </h3>
                    <p className="text-sm text-slate-300 mt-1 leading-relaxed font-sans">
                      Every single capacitor is screened for dielectric breakdown voltage, dissipation factor (tan δ), and capacitance tolerance. Zero batch sampling compromises.
                    </p>
                  </div>
                </div>

                {/* Interactive Dielectric Test Simulator Buttons */}
                <div className="pt-2">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Interactive Test Telemetry:</span>
                    <span className="text-emerald-400 font-bold">Click To Test Spec</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-center font-mono">
                    {[
                      { key: 'dielectric' as TestMetricKey, label: 'Dielectric Screen', code: '2.5kV HI-POT' },
                      { key: 'loss' as TestMetricKey, label: 'Loss Factor', code: 'LOW tan δ' },
                      { key: 'tolerance' as TestMetricKey, label: 'Tolerance Window', code: '±5% SCREEN' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => triggerTestSimulation(item.key)}
                        className={`p-2.5 rounded-xl border transition-all text-center cursor-pointer ${
                          activeTestMetric === item.key
                            ? 'bg-emerald-950/60 border-emerald-400 shadow-md ring-1 ring-emerald-400/40 scale-102'
                            : 'bg-black/40 border-white/10 hover:border-emerald-400/40 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">{item.label}</div>
                        <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">{item.code}</div>
                      </button>
                    ))}
                  </div>

                  {/* Active Simulation Result Card with Animated Status Pulse */}
                  <div className="mt-3 p-3 rounded-xl bg-black/60 border border-emerald-500/30 text-xs font-mono flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full bg-emerald-400 ${isTestPulsing ? 'animate-ping' : ''}`}></span>
                      <div className="truncate">
                        <span className="text-white font-bold">{TEST_METRICS[activeTestMetric].title}: </span>
                        <span className="text-emerald-400 font-bold">{TEST_METRICS[activeTestMetric].result} </span>
                        <span className="text-slate-400 hidden sm:inline">({TEST_METRICS[activeTestMetric].nominal})</span>
                      </div>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold shrink-0 border border-emerald-500/40">
                      {TEST_METRICS[activeTestMetric].status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* PROOF 03: 3D CATALOGUE SCALE & ARCHITECTURE EXPLORER */}
            <div 
              className="rounded-3xl p-7 sm:p-9 bg-gradient-to-r from-[#0B1F36]/95 via-[#071426] to-[#040C18] border border-white/10 hover:border-[#35C6E8]/60 transition-all duration-200 relative overflow-hidden group shadow-2xl flex-1 flex flex-col justify-between cursor-default"
              style={{
                transform: `perspective(1000px) rotateX(${card3Tilt.x}deg) rotateY(${card3Tilt.y}deg) scale(${card3Tilt.active ? 1.015 : 1})`,
                transformStyle: 'preserve-3d',
                transition: card3Tilt.active ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out, border-color 0.3s ease',
              }}
              onMouseMove={(e) => handleCardMouseMove(e, setCard3Tilt)}
              onMouseLeave={() => handleCardMouseLeave(setCard3Tilt)}
            >
              {/* Dynamic Specular 3D Reflection Glare */}
              <div 
                className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 350px at ${card3Tilt.glareX}% ${card3Tilt.glareY}%, rgba(53,198,232,0.18), transparent 70%)`,
                }}
              ></div>

              <div className="space-y-4 relative z-10 [transform:translateZ(20px)]">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#35C6E8]"></span>
                    PROOF 03 · 490 VARIANT ARCHITECTURE
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#35C6E8]/15 border border-[#35C6E8]/30 text-[#35C6E8] text-xs font-mono font-bold">
                    <span>4 ARCHITECTURES</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-4 pt-1">
                  <div className="relative shrink-0 flex items-baseline">
                    <div className="absolute -top-3 -left-3 w-28 h-20 bg-[#35C6E8]/20 rounded-full blur-xl pointer-events-none"></div>

                    <span className="text-6xl sm:text-7xl lg:text-8xl font-black font-display tracking-tighter leading-none bg-gradient-to-br from-white via-cyan-100 to-[#35C6E8] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(53,198,232,0.35)]">
                      {archDisplay.count}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-[#35C6E8] font-bold uppercase tracking-wider ml-1.5 bg-[#35C6E8]/10 border border-[#35C6E8]/30 px-2 py-0.5 rounded-md">
                      {selectedArch === 'all' ? 'TOTAL SKUs' : 'LINE SKUs'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                      {archDisplay.title}
                    </h3>
                    <p className="text-sm text-slate-300 mt-1 leading-relaxed font-sans">
                      {archDisplay.range}. Immediate ex-factory dispatch across India with full OEM certification.
                    </p>
                  </div>
                </div>

                {/* Interactive 4-Architecture Switcher Grid */}
                <div className="pt-2">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Interactive Line Selector:</span>
                    <span className="text-[#35C6E8] font-bold">Click Line To Filter Count</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                    {[
                      { key: 'starting' as ArchKey, name: 'Starting', count: CATALOGUE_SUMMARY.starting, color: 'text-[#F59E0B]' },
                      { key: 'running' as ArchKey, name: 'Running', count: CATALOGUE_SUMMARY.running, color: 'text-[#35C6E8]' },
                      { key: 'greenFilter' as ArchKey, name: 'Green Filter', count: CATALOGUE_SUMMARY.greenFilter, color: 'text-emerald-400' },
                      { key: 'dcAluminium' as ArchKey, name: 'DC Aluminium', count: CATALOGUE_SUMMARY.dcAluminium, color: 'text-white' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setSelectedArch(selectedArch === item.key ? 'all' : item.key)}
                        className={`p-2.5 rounded-xl border transition-all text-center cursor-pointer ${
                          selectedArch === item.key
                            ? 'bg-[#173A5E]/80 border-[#35C6E8] shadow-md ring-1 ring-[#35C6E8]/40 scale-102'
                            : 'bg-black/40 border-white/10 hover:border-[#35C6E8]/40'
                        }`}
                      >
                        <div className="text-[10px] text-slate-400">{item.name}</div>
                        <div className={`text-xs sm:text-sm font-bold mt-0.5 ${item.color}`}>{item.count} SKUs</div>
                      </button>
                    ))}
                  </div>

                  {selectedArch !== 'all' && (
                    <div className="mt-2 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedArch('all')}
                        className="text-[11px] font-mono text-[#35C6E8] hover:underline cursor-pointer inline-flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Reset to All 490 Variants</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
