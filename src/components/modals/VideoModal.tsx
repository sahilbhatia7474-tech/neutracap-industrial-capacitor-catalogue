/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CANONICAL VIDEO MODAL COMPONENT (STORY & FACTORY TOUR)
 * - Single canonical video modal rendered via createPortal into document.body
 * - Full responsive fidelity across 320px, 360px, 390px, 430px, tablet and desktop
 * - Complete body scroll lock with clean cleanup
 * - Accessible keyboard (Escape key) and backdrop dismiss handlers
 * - Minimum 44px touch targets for mobile accessibility
 */

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Play, Pause, Film, Volume2, VolumeX, CheckCircle2 } from 'lucide-react';
import { resolveSiteMedia, SiteMediaPlacement, SITE_MEDIA_PLACEMENTS } from '../../services/siteMediaRegistry';

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: SiteMediaPlacement;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  placement = 'homepage.hero.video',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);

  // Dynamic Site Media Asset Resolution by exact placement
  const activeMedia = resolveSiteMedia(placement);
  const hasCustomVideoUrl = !!(activeMedia && activeMedia.url);
  const placementMeta = SITE_MEDIA_PLACEMENTS.find(p => p.id === placement);

  // Reset state whenever modal opens or placement changes
  useEffect(() => {
    if (isOpen) {
      setIsPlaying(false);
      setPlaybackSeconds(0);
    }
  }, [isOpen, placement]);

  // Lock body & html scroll when modal is open and restore on close/unmount
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Handle ESC key to dismiss
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Simulated video stream playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setPlaybackSeconds((prev) => (prev >= 180 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const modalContent = (
    <div 
      id="video-modal-backdrop"
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div 
        id="video-modal-dialog"
        className="w-full max-w-4xl bg-[#071426] border border-[#173A5E] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-200 select-none max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 sm:p-4 px-4 sm:px-6 bg-[#0B1F36] text-white flex items-center justify-between border-b border-[#173A5E] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#173A5E] text-[#35C6E8] flex items-center justify-center border border-[#35C6E8]/30 shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 id="video-modal-title" className="text-xs sm:text-base font-bold text-white font-display truncate">
                {activeMedia?.name || 'NeutraCap · Precision Engineering'}
              </h3>
              <p className="text-[9px] sm:text-[11px] text-[#A8B4C2] font-mono truncate uppercase">
                {placementMeta?.label || placement} · 100% SCREENED
              </p>
            </div>
          </div>

          <button
            id="video-modal-close-btn"
            type="button"
            onClick={onClose}
            aria-label="Close video modal"
            className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Stage / Cinematic Visual Showcase */}
        <div className="relative aspect-video w-full bg-gradient-to-tr from-[#071426] via-[#0B1F36] to-[#173A5E] flex flex-col items-center justify-center text-center overflow-hidden shrink-0">
          {hasCustomVideoUrl ? (
            <video
              src={activeMedia?.url}
              poster={activeMedia?.posterUrl}
              controls
              autoPlay
              muted={isMuted}
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <>
              {/* Custom Poster Image as Standby Backdrop if available */}
              {activeMedia?.posterUrl && (
                <img
                  src={activeMedia.posterUrl}
                  alt={activeMedia.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    isPlaying ? 'opacity-30' : 'opacity-75'
                  }`}
                />
              )}

              {/* Animated Background Grid Pattern */}
              <div className="absolute inset-0 bg-industrial-grid-dark opacity-35 pointer-events-none"></div>
              <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-[#35C6E8]/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

              {isPlaying ? (
                /* Active Industrial Playback Mode */
                <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xl px-4 py-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#16A34A]/20 border border-[#16A34A]/60 flex items-center justify-center text-[#16A34A] mb-3 sm:mb-4 animate-pulse">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/40 text-[10px] sm:text-xs font-mono mb-2">
                    HD STREAM TRANSMITTING · {formatTime(playbackSeconds)} / 03:00
                  </div>
                  <h4 className="text-sm sm:text-2xl font-bold text-white font-display max-w-lg leading-tight">
                    {activeMedia?.name || 'NeutraCap Industrial Manufacturing & Reliability'}
                  </h4>
                  <p className="text-[11px] sm:text-sm text-[#A8B4C2] font-sans max-w-md mt-1.5 sm:mt-2 line-clamp-2 sm:line-clamp-none">
                    {activeMedia?.description || 'A cinematic overview of NeutraCap industrial capacitor manufacturing, precision engineering, dielectric testing, quality control and reliable capacitor solutions.'}
                  </p>

                  <div className="flex items-center gap-3 mt-4 sm:mt-6">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(false)}
                      className="btn-tactile-dark px-4 py-2.5 rounded-xl text-white text-xs font-bold font-sans flex items-center gap-2 border border-[#173A5E] min-h-[44px] cursor-pointer"
                    >
                      <Pause className="w-4 h-4 text-[#35C6E8]" />
                      <span>Pause Feed</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-xs border border-white/20 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#35C6E8]" />}
                    </button>
                  </div>
                </div>
              ) : (
                /* Standby State with Custom Thumbnail and Prominent Play Button */
                <div className="relative z-10 flex flex-col items-center justify-center px-4 py-6">
                  <button
                    id="video-stage-play-btn"
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    aria-label={`Start playback for ${activeMedia?.name || 'video'}`}
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#173A5E] hover:bg-[#1f4a75] text-white flex items-center justify-center shadow-2xl shadow-[#35C6E8]/30 border-2 border-[#35C6E8]/50 transform hover:scale-105 active:scale-95 transition-all mb-3 sm:mb-4 focus:ring-4 focus:ring-[#35C6E8]/40 cursor-pointer min-w-[44px] min-h-[44px]"
                  >
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-[#35C6E8] text-[#35C6E8] ml-1" />
                  </button>

                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/15 backdrop-blur-xs text-white border border-white/20 text-[10px] sm:text-xs font-mono mb-1.5 sm:mb-2 uppercase">
                    {placementMeta?.label || 'INDUSTRIAL VIDEO TOUR'}
                  </span>

                  <h4 className="text-sm sm:text-2xl font-bold text-white font-display max-w-lg leading-tight">
                    {activeMedia?.name || 'NeutraCap Industrial Manufacturing & Reliability'}
                  </h4>

                  <p className="text-[11px] sm:text-sm text-[#E2E8F0] font-sans max-w-md mt-1.5 sm:mt-2 line-clamp-2 sm:line-clamp-none drop-shadow-xs">
                    {activeMedia?.description || 'A cinematic overview of NeutraCap industrial capacitor manufacturing, precision engineering, dielectric testing, and quality control.'}
                  </p>
                </div>
              )}

              {/* Bottom Bar inside Video */}
              <div className="absolute bottom-2.5 sm:bottom-3 left-3 right-3 sm:left-6 sm:right-6 flex items-center justify-between text-[9px] sm:text-xs text-[#A8B4C2] font-mono">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
                  <span>100% FACTORY SCREENED</span>
                </div>
                <span>EST. 1989 · DELHI NCR FACILITY</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Render via portal into document.body to prevent parent container clipping
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
};

