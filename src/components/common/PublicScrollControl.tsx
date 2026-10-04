/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GLOBAL PUBLIC SITE FLOATING SCROLL CONTROL
 * - Fixed on the RIGHT side of the viewport
 * - Checkpoints: 0% → 33% → 66% → 100%
 * - Reversal at bottom: ↓ switches to ↑ (100% → 66% → 33% → 0%)
 * - Smooth native document scrolling
 * - Never overlaps WhatsApp button or mobile bottom navigation
 * - Suppressed inside modal overlays
 */

import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

export interface PublicScrollControlProps {
  /** If any full-screen modal or drawer is active, suppress rendering */
  isHidden?: boolean;
}

export const PublicScrollControl: React.FC<PublicScrollControlProps> = ({ isHidden = false }) => {
  const [isNearBottom, setIsNearBottom] = useState<boolean>(false);
  const [hasScrollableContent, setHasScrollableContent] = useState<boolean>(false);

  useEffect(() => {
    const checkScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 100) {
        setHasScrollableContent(false);
        setIsNearBottom(false);
        return;
      }
      setHasScrollableContent(true);
      const current = window.scrollY;
      const ratio = current / docHeight;
      setIsNearBottom(ratio >= 0.85);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });
    checkScroll();

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  if (isHidden || !hasScrollableContent) {
    return null;
  }

  const handleQuickScroll = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const current = window.scrollY;
    const ratio = current / docHeight;

    if (isNearBottom) {
      // Upward sequence: 100% -> 66% -> 33% -> 0%
      if (ratio > 0.70) {
        window.scrollTo({ top: Math.round(docHeight * 0.66), behavior: 'smooth' });
      } else if (ratio > 0.35) {
        window.scrollTo({ top: Math.round(docHeight * 0.33), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Downward sequence: 0% -> 33% -> 66% -> 100%
      if (ratio < 0.28) {
        window.scrollTo({ top: Math.round(docHeight * 0.33), behavior: 'smooth' });
      } else if (ratio < 0.60) {
        window.scrollTo({ top: Math.round(docHeight * 0.66), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: docHeight, behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      id="public-floating-scroll-container"
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center select-none pointer-events-auto"
    >
      <button
        id="public-quick-scroll-btn"
        type="button"
        onClick={handleQuickScroll}
        aria-label={isNearBottom ? "Scroll Up to Top" : "Quick Scroll Down (33% → 66% → Bottom)"}
        title={isNearBottom ? "Scroll to Top" : "Quick Scroll Down (0% → 33% → 66% → 100%)"}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#071426]/90 hover:bg-[#0E2338] active:bg-[#0066FF] border-2 border-[#1E3A5F] hover:border-[#35C6E8] text-white shadow-2xl shadow-black/60 flex items-center justify-center backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer group min-h-[44px] min-w-[44px]"
      >
        {isNearBottom ? (
          <ArrowUp className="w-5 h-5 text-[#35C6E8] group-hover:text-white transition-colors" />
        ) : (
          <ArrowDown className="w-5 h-5 text-[#35C6E8] group-hover:text-white transition-colors" />
        )}
      </button>
    </div>
  );
};
