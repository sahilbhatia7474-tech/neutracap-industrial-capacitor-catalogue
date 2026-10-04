/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * REUSABLE HERO VIDEO SYSTEM & CINEMATIC PLACEHOLDER
 * Supports states: video available, loading, unavailable, poster fallback, 
 * mobile fallback, reduced-motion fallback.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Film, Sparkles, RefreshCw, AlertCircle, Maximize2 } from 'lucide-react';

export interface HeroVideoProps {
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
  caption?: string;
  autoPlay?: boolean;
  isHeroBackground?: boolean;
  className?: string;
  onOpenModal?: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  videoUrl,
  posterUrl = '/assets/hero/neutracap_engineering_poster.jpg',
  title = '35+ Years of Engineering Excellence',
  caption = 'Inside NeutraCap High-Precision Capacitor Manufacturing',
  autoPlay = false,
  isHeroBackground = false,
  className = '',
  onOpenModal,
}) => {
  const [videoState, setVideoState] = useState<'available' | 'loading' | 'unavailable' | 'poster_fallback'>('poster_fallback');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (videoUrl && !prefersReducedMotion) {
      setVideoState('loading');
    } else {
      setVideoState('poster_fallback');
    }
  }, [videoUrl, prefersReducedMotion]);

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenModal) {
      onOpenModal();
      return;
    }
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setVideoState('unavailable');
        });
      }
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      id="hero-video-container"
      className={`relative overflow-hidden rounded-2xl border border-slate-200/80 bg-[#071C3F] shadow-xl group ${className}`}
    >
      {/* Visual Canvas / Background Graphic */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2A5E] via-[#071C3F] to-[#0E3B7D] opacity-95">
        {/* Precision Dielectric Blueprint Overlay */}
        <div className="absolute inset-0 bg-industrial-grid-dark opacity-30"></div>
        
        {/* Animated ambient capacitor voltage pulse */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0066FF]/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#00B140]/15 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Actual HTML5 Video Tag when URL is present */}
      {videoUrl && videoState !== 'unavailable' && !prefersReducedMotion ? (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          autoPlay={autoPlay}
          muted={isMuted}
          loop
          playsInline
          onCanPlay={() => setVideoState('available')}
          onError={() => setVideoState('unavailable')}
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40 transition-opacity duration-700"
        />
      ) : null}

      {/* Cinematic Industrial Graphic Mockup Canvas */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full min-h-[280px] md:min-h-[340px]">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white font-medium">
            <Film className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>NeutraCap Heritage Film</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B140] animate-pulse"></span>
          </div>

          <div className="px-2.5 py-1 rounded bg-[#0066FF]/20 border border-[#0066FF]/40 text-[11px] font-mono text-blue-200">
            CINEMATIC PLACEHOLDER · 4K
          </div>
        </div>

        {/* Center Play Button & Interactive Reel */}
        <div className="my-auto py-6 flex flex-col items-center justify-center text-center">
          <button
            id="hero-video-play-btn"
            onClick={handlePlayToggle}
            aria-label="Play NeutraCap manufacturing story"
            className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white flex items-center justify-center shadow-2xl shadow-blue-500/50 transition-all duration-300 transform group-hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            <span className="absolute inset-0 rounded-full bg-[#0066FF] animate-ping opacity-25"></span>
            {isPlaying ? (
              <Pause className="w-7 h-7 md:w-8 md:h-8" />
            ) : (
              <Play className="w-7 h-7 md:w-8 md:h-8 ml-1 fill-white" />
            )}
          </button>

          <div className="mt-4">
            <h4 className="text-lg md:text-xl font-bold text-white font-display tracking-tight">
              {title}
            </h4>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-md mx-auto">
              {caption}
            </p>
          </div>
        </div>

        {/* Bottom Technical Status Bar */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-[#00B140]"></span>
              REUSABLE COMPONENT READY
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline">AUTOPLAY / POSTER FALLBACK SUPPORTED</span>
          </div>

          <div className="flex items-center gap-2">
            {videoUrl && (
              <button 
                id="hero-video-mute-toggle"
                onClick={handleMuteToggle}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}
            <button
              id="hero-video-expand-btn"
              onClick={onOpenModal || handlePlayToggle}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Expand Video"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
