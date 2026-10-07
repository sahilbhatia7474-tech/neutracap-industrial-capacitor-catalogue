/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP OPTIMIZED CATALOGUE IMAGE COMPONENT
 * High-performance viewport-prioritizing image loader for the 490 product variants.
 * 
 * Performance Architecture:
 * - Native 'loading="lazy"' + 'decoding="async"'
 * - Viewport-Aware Prioritization via IntersectionObserver with prefetch buffer (200px rootMargin)
 * - Zero Off-Screen Network Saturation: Off-viewport images defer HTTP requests until approached
 * - Smooth Hardware-Accelerated Fade-In on decode completion (prevents visual pop-in)
 * - Automatic Fallback handling for network failures or offline mode
 * - Fixed Aspect Ratio container to prevent Cumulative Layout Shift (CLS = 0)
 */

import React, { useState, useEffect, useRef } from 'react';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  fallback?: React.ReactNode;
  aspectRatio?: string;
  rootMargin?: string;
  threshold?: number;
  onImageLoad?: () => void;
  onImageError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  fallback,
  aspectRatio,
  rootMargin = '200px 0px 200px 0px',
  threshold = 0.01,
  onImageLoad,
  onImageError,
  style,
  ...rest
}) => {
  const [isInView, setIsInView] = useState<boolean>(priority);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Viewport Observer: Defers image download until nearing user viewport
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    if (!containerRef.current) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [priority, rootMargin, threshold]);

  // Reset state if src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onImageLoad) onImageLoad();
  };

  const handleError = () => {
    setHasError(true);
    if (onImageError) onImageError();
  };

  if (!src || hasError) {
    if (fallback) {
      return (
        <div ref={containerRef} className={`relative flex items-center justify-center ${containerClassName}`}>
          {fallback}
        </div>
      );
    }
    return (
      <div 
        ref={containerRef} 
        className={`relative flex items-center justify-center bg-[#071426] text-slate-500 text-xs font-mono p-4 ${containerClassName}`}
      >
        <span className="opacity-60">{alt || 'Asset Unavailable'}</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden flex items-center justify-center ${containerClassName}`}
      style={{
        aspectRatio,
        ...style,
      }}
    >
      {/* Subtle Specular Shimmer Placeholder while loading in viewport */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-white/[0.06] to-white/[0.02] animate-pulse pointer-events-none rounded-inherit"
          aria-hidden="true"
        />
      )}

      {/* Viewport-Prioritized Lazy & Async Image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          referrerPolicy="no-referrer"
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...rest}
        />
      )}
    </div>
  );
};
