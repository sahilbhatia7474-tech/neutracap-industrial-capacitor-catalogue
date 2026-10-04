/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VIEWPORT REVEAL SECTION
 * Implements staggered viewport entrance animations using CSS transforms,
 * revealing primary sections with smooth opacity and translateY transitions
 * as they enter the user's viewport.
 */

import React, { useEffect, useRef, useState } from 'react';

export interface ViewportRevealSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delayMs?: number;
  threshold?: number;
  rootMargin?: string;
  staggerIndex?: number;
}

export const ViewportRevealSection: React.FC<ViewportRevealSectionProps> = ({
  children,
  id,
  className = '',
  delayMs,
  threshold = 0.08,
  rootMargin = '0px 0px -50px 0px',
  staggerIndex = 0,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Calculate effective delay: explicit delayMs or staggered by index
  const computedDelayMs = typeof delayMs === 'number' ? delayMs : Math.min(staggerIndex * 60, 300);

  useEffect(() => {
    // If user prefers reduced motion, reveal immediately with zero transition delay
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Fallback if IntersectionObserver is not supported
    if (typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div
      ref={elementRef}
      id={id}
      style={{
        transitionDelay: isRevealed && computedDelayMs > 0 ? `${computedDelayMs}ms` : '0ms',
      }}
      className={`section-reveal ${isRevealed ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
