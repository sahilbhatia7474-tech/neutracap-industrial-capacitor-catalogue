/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * HERO SECTION COMPONENT (PREMIUM INDUSTRIAL TRANSFORMATION V2)
 * - Brand Signature: POWERING EVERY START. ENGINEERED FOR EVERY RUN.
 * - Headline: ENGINEERED CAPACITORS FOR DEMANDING POWER APPLICATIONS.
 * - Supporting Copy: Starting, running, green filter and DC aluminium electrolytic solutions built around real industrial requirements with heavy-duty dielectric integrity.
 * - Color System: Deep Navy #071426, Midnight Blue #0B1F36, Steel Blue #173A5E, Electric Cyan #35C6E8, Warm Copper #D98A4A
 * - Data Integrity: Canonical 490 variants across 4 families (Starting 40, Green Filter 40, Running 62, DC 348)
 * - Tactile buttons with subtle elevation & Space Grotesk display typography
 */

import React from 'react';
import { ArrowRight, Search, Play, Sparkles, ShieldCheck, Activity } from 'lucide-react';
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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // Elegant normalized mouse tracking (-1 to 1) for desktop tilt
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const customHeroImage = resolveSiteMedia('homepage.hero.image');
  const hasCustomHeroImage = !!(customHeroImage && customHeroImage.url && customHeroImage.status === 'active');
  const facilityTourAsset = resolveSiteMedia('facility.tour.video');
  const facilityTourPoster = facilityTourAsset?.posterUrl || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80';

  return (
    <section 
      id="hero-section" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full pt-12 pb-18 md:pt-20 md:pb-26 bg-obsidian-depth border-b border-white/10 text-white overflow-hidden"
    >
      {/* Background Precision Luxury Grid & Atmospheric Steel Blue Cones */}
      <div className="absolute inset-0 bg-luxury-grid opacity-60 pointer-events-none"></div>
      <div className="absolute inset-0 bg-circuit-subtle opacity-40 pointer-events-none"></div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#173A5E]/30 via-[#0B1F36]/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-[#35C6E8]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 left-10 w-[400px] h-[400px] bg-[#10B981]/8 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Hero Copy & CTA (7 Columns) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Unboxed Editorial Eyebrow (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-[#35C6E8] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="text-slate-300 font-semibold">EST. {SITE_FACTS.heritageYear} · INDUSTRIAL CAPACITOR ENGINEERING</span>
            </div>

            {/* High-Contrast Editorial Headline in Sora / Space Grotesk */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight leading-[1.08] font-editorial max-w-2xl">
              Engineered Capacitors For <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#35C6E8]">Demanding Power Applications.</span>
            </h1>

            {/* Supporting Industrial Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal font-sans">
              Starting, running, green filter and DC aluminium electrolytic solutions built around real industrial duty cycles with heavy-duty dielectric integrity.
            </p>

            {/* Action Cluster with High-Conversion Structure */}
            <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
              {/* Primary Conversion CTA */}
              <button
                id="hero-primary-cta"
                onClick={onExploreProducts}
                className="btn-tactile-primary flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl text-white text-xs sm:text-sm font-bold tracking-wider uppercase font-sans shadow-lg cursor-pointer w-full sm:w-auto"
              >
                <span>Explore 490 Variants</span>
                <ArrowRight className="w-4 h-4 text-white shrink-0 group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA */}
              <button
                id="hero-secondary-cta"
                onClick={onFindCapacitor}
                className="btn-tactile-dark flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 rounded-xl text-white text-xs sm:text-sm font-semibold tracking-wider uppercase font-sans border border-white/10 hover:border-[#35C6E8] cursor-pointer w-full sm:w-auto"
              >
                <Search className="w-4 h-4 text-[#35C6E8] shrink-0" />
                <span>Find Your Capacitor</span>
              </button>

              {/* Factory Tour Video CTA */}
              <button
                id="hero-video-cta-btn"
                type="button"
                onClick={() => onOpenVideoModal('facility.tour.video')}
                className="btn-tactile-dark inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-4 rounded-xl text-white text-xs sm:text-sm font-semibold tracking-wider uppercase font-sans border border-white/10 hover:border-[#35C6E8] min-h-[44px] cursor-pointer active:scale-95"
                aria-label="Watch NeutraCap Industrial Manufacturing & Reliability Facility Tour Video"
              >
                <div className="w-5 h-5 rounded-full bg-[#35C6E8]/20 flex items-center justify-center text-[#35C6E8] shrink-0">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Factory Tour</span>
              </button>

              {/* AI Assist Quick Entry */}
              {onOpenAssist && (
                <button
                  id="hero-assist-quick-btn"
                  onClick={onOpenAssist}
                  className="btn-tactile-dark inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-4 rounded-xl text-slate-300 hover:text-white text-xs font-sans font-medium border border-white/10 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#35C6E8] shrink-0" />
                  <span>VECTOR</span>
                </button>
              )}
            </div>

            {/* Concise Verified Proof Points with Emerald Conversion Indicators */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-400 font-sans">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#D98A4A] shrink-0"></span>
                <span><strong className="text-white font-bold font-mono tabular-nums">{SITE_FACTS.establishedExperienceYears} Yrs</strong> Manufacturing</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#35C6E8] shrink-0"></span>
                <span><strong className="text-white font-bold font-mono tabular-nums">{CATALOGUE_SUMMARY.total}</strong> Baseline Variants</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0 shadow-[0_0_8px_#10B981]"></span>
                <span className="text-emerald-400 font-semibold">100% Dielectric Tested</span>
              </div>
            </div>

          </div>

          {/* Right Column: Industrial Product Photography / Visual Stage (5 Columns) */}
          <div className="lg:col-span-5 w-full">
            <div 
              id="hero-product-stage"
              style={{
                transform: `perspective(900px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`,
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="glass-panel-luxury relative w-full min-h-[300px] sm:min-h-0 sm:aspect-16/11 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-between shadow-2xl overflow-hidden group"
            >
              {/* Dedicated Studio Lighting (No blurry decorative backdrop images) */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F36]/90 via-[#071426] to-[#040C18] pointer-events-none rounded-xl"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 bg-[#35C6E8]/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-[#071426]/70 rounded-full blur-md pointer-events-none"></div>

              {/* Top Stage Telemetry Badge */}
              <div className="w-full flex items-center justify-between z-10 text-[10px] sm:text-[11px] font-mono text-[#A8B4C2] pb-2 border-b border-[#173A5E]/70">
                <span className="text-[#35C6E8] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C6E8] animate-pulse"></span>
                  HEAVY-DUTY SPECIFICATIONS
                </span>
                <span className="text-[#A8B4C2]">EST. {SITE_FACTS.heritageYear}</span>
              </div>

              {/* Dedicated Clean Cinematic Video Stage (Focal Visual Moment) */}
              <div className="w-full mt-3 sm:mt-4 z-10">
                <div 
                  id="hero-facility-tour-card"
                  onClick={() => onOpenVideoModal('facility.tour.video')}
                  className="group/video relative w-full rounded-2xl bg-[#071426]/90 hover:bg-[#0B1F36] border border-[#173A5E] hover:border-[#35C6E8]/70 p-3 sm:p-4 transition-all duration-300 cursor-pointer shadow-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(53,198,232,0.2)] select-none overflow-hidden"
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
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#35C6E8]/15 border border-[#35C6E8]/40 text-[9px] sm:text-[10px] font-mono font-bold text-[#35C6E8] tracking-wider uppercase">
                        FACILITY VIDEO
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white font-sans truncate group-hover/video:text-[#35C6E8] transition-colors">
                        High-Voltage Screening &amp; Manufacturing
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 shrink-0 flex items-center gap-1.5 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]"></span>
                      4K REEL
                    </span>
                  </div>

                  {/* Dedicated 16:9 Cinematic Video Frame (Crisp focal point, zero decorative blur) */}
                  <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-black border border-white/10 group-hover/video:border-[#35C6E8]/60 transition-colors shadow-inner">
                    {/* Crisp Video Poster */}
                    <img
                      src={facilityTourPoster}
                      alt={facilityTourAsset?.name || 'NeutraCap High-Voltage Screening Facility Walkthrough'}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover/video:scale-103 transition-transform duration-500"
                    />

                    {/* Subtle Vignette for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

                    {/* Focal Play Interaction Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        <span className="absolute w-14 h-14 rounded-full bg-[#35C6E8]/30 animate-ping pointer-events-none"></span>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#35C6E8] text-[#071426] flex items-center justify-center shadow-[0_4px_25px_rgba(53,198,232,0.6)] group-hover/video:scale-110 group-hover/video:bg-white active:scale-95 transition-all">
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Telemetry Overlay */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-slate-300 font-mono">
                      <span className="truncate bg-black/70 px-2 py-0.5 rounded border border-white/10">Clean-Room Screening Bay</span>
                      <span className="text-[#35C6E8] font-bold shrink-0 bg-black/70 px-2 py-0.5 rounded border border-[#35C6E8]/30">Click to Play 4K Reel</span>
                    </div>
                  </div>

                  {/* Supporting Status Bar */}
                  <div className="mt-3 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono border-t border-white/10 pt-2">
                    <span className="truncate">100% Factory Screened • Precision Manufacturing</span>
                    <span className="text-[#35C6E8] font-bold group-hover/video:underline transition-colors shrink-0 ml-1">
                      Watch Video (3:00) →
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
