/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * HERO SECTION COMPONENT (ULTRA MODERN 3D INTERACTIVE PREMIER)
 * - True 3D Depth Architecture with interactive mouse perspective tracking
 * - High-Contrast Editorial Headline in Sora / Space Grotesk / Editorial Serif
 * - Color System: Deep Obsidian #02050E, Midnight Blue #07172B, Electric Cyan #35C6E8, Laser Emerald #10B981
 * - Multi-Stage Volumetric Atmospheric Cones & Specular Laser Hairlines
 * - Tactile 3D Buttons with Inset Highlights, Chamfered Bezels & Cyan Glow Fields
 * - 3D Gyroscopic Aerospace Stage with 4K Reel Video Medallion
 * - Data Integrity: Canonical 490 variants across 4 families (Starting 40, Green Filter 40, Running 62, DC 348)
 */

import React from 'react';
import { ArrowRight, Search, Play, Sparkles, ShieldCheck, Activity, Layers, Award } from 'lucide-react';
import { SITE_FACTS } from '../../data/siteFacts';
import { CATALOGUE_SUMMARY } from '../../data/catalogueSummary';
import { resolveSiteMedia, SiteMediaPlacement } from '../../services/siteMediaRegistry';

export interface HeroSectionProps {
  onExploreProducts: () => void;
  onFindCapacitor: () => void;
  onOpenVideoModal: (placement?: SiteMediaPlacement) => void;
  onOpenAssist?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onFindCapacitor,
  onOpenVideoModal,
  onOpenAssist,
}) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const rafRef = React.useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // Throttled normalized mouse tracking (-1 to 1) via requestAnimationFrame for silky 60fps
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      setMousePos({ x, y });
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setMousePos({ x: 0, y: 0 });
  };

  React.useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const customHeroImage = resolveSiteMedia('homepage.hero.image');
  const facilityTourAsset = resolveSiteMedia('facility.tour.video');
  const facilityTourPoster = facilityTourAsset?.posterUrl || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80';

  return (
    <section 
      id="hero-section" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full pt-14 pb-22 md:pt-24 md:pb-30 bg-gradient-to-b from-[#02050E] via-[#050E1F] to-[#020612] border-b border-[#35C6E8]/30 text-white overflow-hidden select-none"
    >
      {/* 3D Specular Laser Hairline at Top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#35C6E8] to-transparent shadow-[0_0_20px_#35C6E8] pointer-events-none"></div>

      {/* Multi-Stage Volumetric Atmospheric Glows & Precision Grid */}
      <div className="absolute inset-0 bg-luxury-grid opacity-40 pointer-events-none"></div>
      <div className="absolute inset-0 bg-circuit-subtle opacity-30 pointer-events-none"></div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-[#35C6E8]/12 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 left-10 w-[450px] h-[450px] bg-[#173A5E]/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Hero Copy & 3D Interactive CTAs (7 Columns) */}
          <div className="lg:col-span-7 space-y-7 sm:space-y-9 text-left">
            
            {/* 3D Interactive Eyebrow Medallion */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#173A5E]/60 via-[#0B223D]/80 to-[#173A5E]/60 border border-[#35C6E8]/40 shadow-[0_0_20px_rgba(53,198,232,0.3)] backdrop-blur-md text-xs font-mono font-bold tracking-[0.2em] text-[#35C6E8] uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399] animate-pulse"></span>
              <span className="text-slate-200">EST. {SITE_FACTS.heritageYear} · INDUSTRIAL CAPACITOR ENGINEERING</span>
            </div>

            {/* High-Contrast Haute Editorial Headline */}
            <h1 
              id="hero-headline"
              style={{ lineHeight: '1.1', letterSpacing: '-0.02em' }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-[56px] font-black text-white font-editorial max-w-2xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
            >
              Engineered Capacitors For <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#35C6E8] drop-shadow-[0_4px_30px_rgba(53,198,232,0.4)]">
                Demanding Power Systems.
              </span>
            </h1>

            {/* Supporting Industrial Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal font-sans">
              Starting, running, green filter and DC aluminium electrolytic solutions built around real industrial duty cycles with heavy-duty dielectric integrity.
            </p>

            {/* 3D Tactile Action Cluster */}
            <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              {/* Primary 3D Conversion Action */}
              <button
                id="hero-primary-cta"
                onClick={onExploreProducts}
                className="group relative flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#173A5E] via-[#0E7490] to-[#173A5E] hover:from-[#0E7490] hover:to-[#35C6E8] text-white text-xs sm:text-sm font-mono font-black tracking-wider uppercase border border-[#35C6E8]/70 shadow-[0_8px_30px_rgba(14,116,144,0.45),inset_0_1px_2px_rgba(255,255,255,0.4)] hover:shadow-[0_0_35px_rgba(53,198,232,0.65)] cursor-pointer w-full sm:w-auto active:scale-98 transition-all overflow-hidden"
              >
                <span className="relative z-10">Explore 490 Variants</span>
                <ArrowRight className="w-4 h-4 text-[#35C6E8] group-hover:text-white shrink-0 group-hover:translate-x-1 transition-all relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
              </button>

              {/* Secondary 3D Dark Alloy Action */}
              <button
                id="hero-secondary-cta"
                onClick={onFindCapacitor}
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-b from-[#0A1A2E] to-[#040C18] hover:bg-[#0E2644] text-white text-xs sm:text-sm font-mono font-bold tracking-wider uppercase border border-white/15 hover:border-[#35C6E8]/70 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(53,198,232,0.3)] cursor-pointer w-full sm:w-auto active:scale-98 transition-all"
              >
                <Search className="w-4 h-4 text-[#35C6E8] shrink-0" />
                <span>Parametric Finder</span>
              </button>

              {/* 3D Factory Tour Reel Button */}
              <button
                id="hero-video-cta-btn"
                type="button"
                onClick={() => onOpenVideoModal('facility.tour.video')}
                className="inline-flex items-center justify-center gap-2.5 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-mono font-bold tracking-wider uppercase border border-white/10 hover:border-[#35C6E8]/60 shadow-[0_4px_15px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(53,198,232,0.25)] min-h-[44px] cursor-pointer active:scale-95 transition-all"
                aria-label="Watch NeutraCap Industrial Manufacturing & Reliability Facility Tour Video"
              >
                <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-[#35C6E8] to-[#0E7490] flex items-center justify-center text-slate-950 shrink-0 shadow-[0_0_10px_rgba(53,198,232,0.5)]">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Factory 4K Reel</span>
              </button>

              {/* Vector AI Assistant Pill */}
              {onOpenAssist && (
                <button
                  id="hero-assist-quick-btn"
                  onClick={onOpenAssist}
                  className="inline-flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-[#071629]/80 hover:bg-[#0B2038] text-slate-300 hover:text-white text-xs font-mono font-bold border border-white/10 hover:border-[#35C6E8]/40 shadow-sm cursor-pointer active:scale-95 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#35C6E8] shrink-0 animate-pulse" />
                  <span>VECTOR</span>
                </button>
              )}
            </div>

            {/* 3D Physical Trust Pods Strip */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-sans">
              <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#08182B]/80 to-[#040E1B]/80 border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D98A4A] shadow-[0_0_6px_#D98A4A] shrink-0"></span>
                <div>
                  <div className="text-white font-mono font-bold text-xs"><strong className="text-white tabular-nums">{SITE_FACTS.establishedExperienceYears} Yrs</strong> Heritage</div>
                  <div className="text-[10px] text-slate-400 font-mono">Precision Manufacturing</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#08182B]/80 to-[#040E1B]/80 border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#35C6E8] shadow-[0_0_6px_#35C6E8] shrink-0"></span>
                <div>
                  <div className="text-white font-mono font-bold text-xs"><strong className="text-[#35C6E8] tabular-nums">{CATALOGUE_SUMMARY.total}</strong> Verified SKUs</div>
                  <div className="text-[10px] text-slate-400 font-mono">Baseline Database</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#062417]/80 to-[#02130C]/80 border border-emerald-500/30 shadow-[0_4px_15px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center gap-3 col-span-2 sm:col-span-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] shrink-0 animate-pulse"></span>
                <div>
                  <div className="text-emerald-300 font-mono font-bold text-xs">100% Screened</div>
                  <div className="text-[10px] text-slate-400 font-mono">High-Surge Dielectric</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Gyroscopic Aerospace Stage (5 Columns) */}
          <div className="lg:col-span-5 w-full">
            <div 
              id="hero-product-stage"
              style={{
                transform: `perspective(1100px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg)`,
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="relative w-full rounded-3xl bg-gradient-to-b from-[#0C1E38]/95 via-[#071629]/95 to-[#030B17] border-2 border-[#35C6E8]/40 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_45px_rgba(53,198,232,0.25),inset_0_2px_4px_rgba(255,255,255,0.3)] p-5 sm:p-7 flex flex-col items-center justify-between overflow-hidden group backdrop-blur-2xl"
            >
              {/* Studio Volumetric Lighting */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#35C6E8]/15 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-[#071426]/80 rounded-full blur-md pointer-events-none"></div>

              {/* Top Stage SCADA Telemetry Strip */}
              <div className="w-full flex items-center justify-between z-10 text-[10px] sm:text-[11px] font-mono pb-3 border-b border-white/10">
                <span className="text-[#35C6E8] font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#35C6E8] shadow-[0_0_6px_#35C6E8] animate-pulse"></span>
                  SCADA RELIABILITY LAB · 4K STAGE
                </span>
                <span className="text-slate-400 font-mono tracking-wider">EST. {SITE_FACTS.heritageYear}</span>
              </div>

              {/* Dedicated 3D Cinematic Video Stage Card */}
              <div className="w-full mt-4 z-10">
                <div 
                  id="hero-facility-tour-card"
                  onClick={() => onOpenVideoModal('facility.tour.video')}
                  className="group/video relative w-full rounded-2xl bg-gradient-to-b from-[#08172B] to-[#040C16] border border-[#35C6E8]/50 hover:border-[#35C6E8] p-4 sm:p-5 transition-all duration-300 cursor-pointer shadow-[0_15px_45px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_60px_rgba(53,198,232,0.35)] select-none overflow-hidden"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenVideoModal('facility.tour.video');
                    }
                  }}
                  aria-label="Play Facility Tour Video: High-Voltage Screening & Manufacturing"
                >
                  {/* Video Stage Header */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="px-2.5 py-0.5 rounded-lg bg-[#35C6E8]/20 border border-[#35C6E8]/50 text-[10px] font-mono font-bold text-[#35C6E8] tracking-widest uppercase shadow-[0_0_8px_rgba(53,198,232,0.3)]">
                        FACILITY LAB
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white font-sans truncate group-hover/video:text-[#35C6E8] transition-colors">
                        High-Voltage Screening &amp; Manufacturing
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 shrink-0 flex items-center gap-1.5 font-bold px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/40">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]"></span>
                      4K REEL
                    </span>
                  </div>

                  {/* 16:9 Cinematic Video Frame with 3D Play Jewel */}
                  <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-black border border-white/10 group-hover/video:border-[#35C6E8]/70 transition-colors shadow-2xl">
                    <img
                      src={facilityTourPoster}
                      alt={facilityTourAsset?.name || 'NeutraCap High-Voltage Screening Facility Walkthrough'}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover group-hover/video:scale-104 transition-transform duration-700"
                    />

                    {/* Film Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none"></div>

                    {/* 3D Focal Play Button Medallion */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        <span className="absolute w-16 h-16 rounded-3xl bg-[#35C6E8]/35 animate-ping pointer-events-none"></span>
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#35C6E8] via-[#22B8DC] to-[#0E7490] text-slate-950 flex items-center justify-center shadow-[0_0_35px_rgba(53,198,232,0.8),inset_0_2px_3px_rgba(255,255,255,0.7)] group-hover/video:scale-110 active:scale-95 transition-all border border-white/60">
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-slate-300 font-mono">
                      <span className="truncate bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">Clean-Room Screening Bay</span>
                      <span className="text-[#35C6E8] font-bold shrink-0 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#35C6E8]/40">Click to Play 4K Reel</span>
                    </div>
                  </div>

                  {/* Supporting Status Bar */}
                  <div className="mt-3.5 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono border-t border-white/10 pt-2.5">
                    <span className="truncate text-slate-300">100% Factory Screened • Heavy-Duty Dielectric</span>
                    <span className="text-[#35C6E8] font-bold group-hover/video:underline transition-colors shrink-0 ml-2">
                      Watch Reel (3:00) →
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
