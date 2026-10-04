/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * HORIZONTAL PRODUCT CAROUSEL (OPTIMIZED PERFORMANCE V4)
 * - Single-family horizontal product rail with touch swipe & arrow navigation
 * - Grouped by capacitance for clean visual layout without reducing the 490-variant database
 * - Mobile peek effect: ~1.15 to 1.35 cards visible for clear swipe affordance
 * - Progressive rendering: Loads initial lightweight slice, expands seamlessly on scroll
 * - Zero expensive continuous animation loops
 * - Color System: Ice White, Deep Navy #071426, Steel Blue #173A5E, Electric Cyan #35C6E8
 */

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { CapacitorVariant, ProductFamilyId } from '../../types';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight, ArrowRight, Zap, Waves, Activity, Cpu } from 'lucide-react';

export interface HorizontalProductCarouselProps {
  familyId: ProductFamilyId;
  familyIndex: string; // e.g. "FAMILY 01"
  familyName: string;
  familyTagline: string;
  variantCount: number;
  products: CapacitorVariant[];
  allProducts?: CapacitorVariant[];
  onQuickView: (product: CapacitorVariant) => void;
  onEnquire: (product: CapacitorVariant) => void;
  onRequestQuote: (product: CapacitorVariant) => void;
  onAddToCart?: (product: CapacitorVariant) => void;
  onViewAllInFamily?: (familyId: ProductFamilyId) => void;
}

export const HorizontalProductCarousel: React.FC<HorizontalProductCarouselProps> = ({
  familyId,
  familyIndex,
  familyName,
  familyTagline,
  variantCount,
  products,
  onQuickView,
  onEnquire,
  onRequestQuote,
  onAddToCart,
  onViewAllInFamily,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Progressive rendering limit: renders first 10 cards initially for instant first paint
  const [renderLimit, setRenderLimit] = useState(10);

  // Group products by capacitanceDisplay for clean visual presentation in the rail
  const displayProducts = useMemo(() => {
    const groupedMap = new Map<string, CapacitorVariant>();

    for (const p of products) {
      if (!groupedMap.has(p.capacitanceDisplay)) {
        groupedMap.set(p.capacitanceDisplay, p);
      } else {
        // Prefer standard baseline voltage as representative card (250V for Starting/Green, 400V/450V for Run, 450V for DC)
        const current = groupedMap.get(p.capacitanceDisplay)!;
        if (
          (p.familyId === 'starting' && (p.voltageRating === 230 || p.voltageRating === 250)) ||
          (p.familyId === 'green_filter' && (p.voltageRating === 250 || p.voltageRating === 450)) ||
          (p.familyId === 'running' && (p.voltageRating === 400 || p.voltageRating === 450)) ||
          (p.familyId === 'dc_electrolytic' && p.voltageRating === 450)
        ) {
          groupedMap.set(p.capacitanceDisplay, p);
        }
      }
    }

    return Array.from(groupedMap.values());
  }, [products]);

  // Check scroll position to enable/disable arrow buttons
  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Expand render limit when scrolled near the visible edge
    if (renderLimit < displayProducts.length && scrollLeft > 100) {
      setRenderLimit(displayProducts.length);
    }
  }, [displayProducts.length, renderLimit]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  // Manual arrow navigation
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    // Ensure all cards are mounted before scrolling further
    if (renderLimit < displayProducts.length) {
      setRenderLimit(displayProducts.length);
    }

    const { clientWidth } = scrollRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Mouse drag scrolling handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
    if (renderLimit < displayProducts.length) {
      setRenderLimit(displayProducts.length);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const renderedCards = displayProducts.slice(0, renderLimit);

  const renderFamilyMedallion = () => {
    switch (familyId) {
      case 'starting':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-b from-[#2E1805] via-[#1B0E03] to-[#0A0501] border border-[#F59E0B]/60 shadow-[0_0_18px_rgba(245,158,11,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)] shrink-0">
            <Zap className="w-6 h-6 text-[#F59E0B] fill-[#F59E0B]/20 filter drop-shadow-[0_0_6px_#F59E0B]" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_5px_#F59E0B] animate-pulse"></span>
          </div>
        );
      case 'green_filter':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-b from-[#062618] via-[#03150D] to-[#010805] border border-emerald-400/60 shadow-[0_0_18px_rgba(16,185,129,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)] shrink-0">
            <Waves className="w-6 h-6 text-emerald-400 filter drop-shadow-[0_0_6px_#10B981]" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_#10B981] animate-pulse"></span>
          </div>
        );
      case 'running':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-b from-[#082236] via-[#051624] to-[#020A10] border border-[#35C6E8]/60 shadow-[0_0_18px_rgba(53,198,232,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)] shrink-0">
            <Activity className="w-6 h-6 text-[#35C6E8] filter drop-shadow-[0_0_6px_#35C6E8]" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#35C6E8] shadow-[0_0_5px_#35C6E8] animate-pulse"></span>
          </div>
        );
      case 'dc_electrolytic':
      default:
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-b from-[#143252] via-[#0A1D33] to-[#040C17] border border-[#35C6E8]/70 shadow-[0_0_18px_rgba(53,198,232,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)] shrink-0">
            <Cpu className="w-6 h-6 text-[#35C6E8] filter drop-shadow-[0_0_6px_#35C6E8]" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#35C6E8] shadow-[0_0_5px_#35C6E8] animate-pulse"></span>
          </div>
        );
    }
  };

  return (
    <div 
      id={`product-rail-${familyId}`}
      className="rounded-3xl p-6 sm:p-8 md:p-9 relative bg-gradient-to-b from-[#0B1F36]/90 via-[#071426] to-[#040C18] border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.12)] overflow-hidden"
    >
      {/* Top Specular Rail Hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#35C6E8]/50 to-transparent pointer-events-none"></div>

      {/* Rail Header with Title, Index, Award Medallion & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-7 pb-5 border-b border-white/10 gap-5">
        <div className="flex items-start sm:items-center gap-4">
          {renderFamilyMedallion()}
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-[#35C6E8] uppercase mb-1">
              {familyIndex}
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-display tracking-tight">
              {familyName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans max-w-2xl leading-relaxed">
              {familyTagline}
            </p>
          </div>
        </div>

        {/* Action Controls & Navigation Arrows */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
          {onViewAllInFamily && (
            <button
              onClick={() => onViewAllInFamily(familyId)}
              className="hidden md:inline-flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-[#35C6E8] px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#35C6E8]/40 transition-all mr-2 cursor-pointer shadow-sm active:scale-98"
            >
              <span>View All ({variantCount})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            id={`carousel-prev-${familyId}`}
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label={`Scroll ${familyName} left`}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border flex items-center justify-center transition-all cursor-pointer ${
              canScrollLeft
                ? 'bg-gradient-to-b from-[#143252] via-[#0A1D33] to-[#040C17] border-[#35C6E8]/50 text-white hover:border-[#35C6E8] hover:text-[#35C6E8] shadow-[0_2px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(53,198,232,0.45)] active:scale-95'
                : 'bg-white/[0.02] border-white/5 text-slate-600 cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            id={`carousel-next-${familyId}`}
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label={`Scroll ${familyName} right`}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border flex items-center justify-center transition-all cursor-pointer ${
              canScrollRight
                ? 'bg-gradient-to-b from-[#143252] via-[#0A1D33] to-[#040C17] border-[#35C6E8]/50 text-white hover:border-[#35C6E8] hover:text-[#35C6E8] shadow-[0_2px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(53,198,232,0.45)] active:scale-95'
                : 'bg-white/[0.02] border-white/5 text-slate-600 cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Rail Container - 1.15 to 1.35 Peek on Mobile, Spacious on Tablet/Desktop */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`w-full flex items-stretch gap-3.5 sm:gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar overscroll-x-contain select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {renderedCards.map((product) => (
            <div
              key={product.id}
              className="w-[76vw] max-w-[280px] sm:w-[270px] md:w-[290px] lg:w-[310px] shrink-0 flex flex-col"
            >
              <ProductCard
                product={product}
                onQuickView={onQuickView}
                onEnquire={onEnquire}
                onRequestQuote={onRequestQuote}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}

          {/* End-of-Rail Technical Card */}
          <div className="w-[72vw] max-w-[260px] sm:w-[250px] shrink-0 flex flex-col justify-between p-6 rounded-2xl bg-[#0B1F36] border border-[#173A5E] text-center text-white shadow-md">
            <div className="my-auto space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#071426] border border-[#173A5E] text-[#35C6E8] flex items-center justify-center mx-auto font-mono text-xs font-bold">
                {variantCount}
              </div>
              <h4 className="text-sm font-bold text-white font-display">
                {variantCount} Baseline Variants
              </h4>
              <p className="text-xs text-[#A8B4C2] font-sans max-w-xs mx-auto leading-relaxed">
                Need a non-standard capacitance, custom voltage rating, or bespoke terminal configuration?
              </p>
            </div>

            <button
              onClick={() => onEnquire(displayProducts[0] || products[0])}
              className="mt-4 w-full py-2.5 px-3 rounded-xl bg-[#173A5E] hover:bg-[#1f4a75] text-white text-xs font-sans font-bold tracking-wider uppercase border border-[#35C6E8]/30 transition-colors shadow-xs cursor-pointer"
            >
              Request Custom Variant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
