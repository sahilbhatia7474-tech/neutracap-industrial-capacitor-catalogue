/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CAPACITOR PRODUCT LINES — HORIZONTAL RAILS SYSTEM (OSCAR PREMIER EDITION)
 * - 4 Dedicated Horizontal Product Rails with Award-Level Family Medallions
 * - Editorial Luxury Typography with Space Grotesk, Editorial Serif & IBM Plex Mono
 * - Concentric Metallic Category Tabs with Inset Highlights & Illuminated SKU Counters
 * - Total Authoritative Database: 490 Verified Variants
 */

import React from 'react';
import { HorizontalProductCarousel } from '../products/HorizontalProductCarousel';
import { CapacitorVariant, ProductFamilyId } from '../../types';
import { ArrowUpRight, Sparkles, Layers } from 'lucide-react';

export interface ProductCatalogueCarouselsProps {
  products: CapacitorVariant[];
  selectedCategory: ProductFamilyId | 'all';
  onCategoryChange: (cat: ProductFamilyId | 'all') => void;
  onQuickView: (product: CapacitorVariant) => void;
  onEnquire: (product: CapacitorVariant) => void;
  onRequestQuote: (product: CapacitorVariant) => void;
  onAddToCart?: (product: CapacitorVariant) => void;
  onCustomRequirementClick?: () => void;
}

export const ProductCatalogueCarousels: React.FC<ProductCatalogueCarouselsProps> = ({
  products,
  selectedCategory,
  onCategoryChange,
  onQuickView,
  onEnquire,
  onRequestQuote,
  onAddToCart,
  onCustomRequirementClick,
}) => {
  const startingList = products.filter(p => p.familyId === 'starting' && (p.status || 'active') === 'active');
  const greenFilterList = products.filter(p => p.familyId === 'green_filter' && (p.status || 'active') === 'active');
  const runningList = products.filter(p => p.familyId === 'running' && (p.status || 'active') === 'active');
  const dcList = products.filter(p => p.familyId === 'dc_electrolytic' && (p.status || 'active') === 'active');

  const tabs: { id: ProductFamilyId | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'All Catalogues', count: startingList.length + greenFilterList.length + runningList.length + dcList.length },
    { id: 'starting', label: 'Starting Line', count: startingList.length },
    { id: 'green_filter', label: 'Green Filter Line', count: greenFilterList.length },
    { id: 'running', label: 'Running Line', count: runningList.length },
    { id: 'dc_electrolytic', label: 'DC Aluminium Line', count: dcList.length },
  ];

  const familiesConfig = [
    {
      id: 'starting' as ProductFamilyId,
      index: 'FAMILY 01 · MOTOR STARTING',
      name: 'Starting Capacitors',
      tagline: 'High instantaneous peak starting torque for single-phase AC induction motors, compressors, and refrigeration.',
      count: startingList.length,
      products: startingList,
    },
    {
      id: 'green_filter' as ProductFamilyId,
      index: 'FAMILY 02 · POWER QUALITY & APFC',
      name: 'Green Filter Capacitors',
      tagline: 'Low-loss metallized polypropylene capacitors for active harmonic suppression, clean power filtering, and APFC panels.',
      count: greenFilterList.length,
      products: greenFilterList,
    },
    {
      id: 'running' as ProductFamilyId,
      index: 'FAMILY 03 · CONTINUOUS 10,000H DUTY',
      name: 'Running Capacitors',
      tagline: 'Self-healing metallized film capacitors engineered for 10,000+ continuous operating hours in HVAC, fans, and pumps.',
      count: runningList.length,
      products: runningList,
    },
    {
      id: 'dc_electrolytic' as ProductFamilyId,
      index: 'FAMILY 04 · INDUSTRIAL DC BUS POWER',
      name: 'DC Aluminium Electrolytic Capacitors',
      tagline: 'Heavy-duty screw terminal and snap-in electrolytic capacitors for DC bus links, VFD inverters, and solar energy storage.',
      count: dcList.length,
      products: dcList,
    },
  ];

  const visibleFamilies = selectedCategory === 'all' 
    ? familiesConfig 
    : familiesConfig.filter(f => f.id === selectedCategory);

  return (
    <section 
      id="product-catalogue-carousels" 
      className="py-18 md:py-28 bg-[#030712] border-b border-white/10 overflow-hidden relative text-white"
    >
      {/* Precision background luxury grid & lighting */}
      <div className="absolute inset-0 bg-luxury-grid opacity-35 pointer-events-none"></div>
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#35C6E8]/12 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#10B981]/8 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Oscar-Grade Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6 stagger-item stagger-item-1">
          <div className="max-w-3xl">
            {/* Rich Eyebrow with Glass Backdrop */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-mono font-bold tracking-widest text-[#35C6E8] uppercase shadow-md backdrop-blur-md mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#35C6E8] animate-pulse" />
              <span>AUTHORITATIVE CAPACITOR DATABASE · 490 BASELINE VARIANTS</span>
            </div>

            {/* High-Contrast Editorial Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-editorial tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#35C6E8] drop-shadow-[0_4px_24px_rgba(53,198,232,0.3)]">
              Capacitor Product System &amp; Rails
            </h2>

            {/* Clear Industrial Supporting Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 mt-3 font-sans leading-relaxed">
              Explore our four specialized industrial capacitor families across verified baseline capacitances, dielectric technologies, and duty-cycle ratings.
            </p>
          </div>

          {onCustomRequirementClick && (
            <button
              onClick={onCustomRequirementClick}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0B1F36] via-[#173A5E] to-[#0B1F36] hover:from-[#173A5E] hover:to-[#0E7490] text-white text-xs font-mono font-bold tracking-wider uppercase border border-[#35C6E8]/40 hover:border-[#35C6E8] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(53,198,232,0.4)] cursor-pointer self-start md:self-auto group active:scale-98"
            >
              <span>Custom Specification Request</span>
              <ArrowUpRight className="w-4 h-4 text-[#35C6E8] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* Category Navigation Tabs — Oscar-Grade Concentric Metallic Medallions */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar stagger-item stagger-item-2">
          {tabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                id={`catalogue-tab-${tab.id}`}
                onClick={() => onCategoryChange(tab.id)}
                className={`shrink-0 px-4.5 py-3 rounded-2xl text-xs font-mono font-bold tracking-wide transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#173A5E] via-[#0E7490] to-[#173A5E] border border-[#35C6E8] text-white shadow-[0_0_20px_rgba(53,198,232,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] scale-102'
                    : 'bg-[#0B1F36]/60 text-slate-300 border border-white/10 hover:border-white/20 hover:text-white hover:bg-[#173A5E]/40'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-lg font-mono font-black tabular-nums transition-colors ${
                  isActive 
                    ? 'bg-[#35C6E8] text-slate-950 shadow-[0_0_8px_#35C6E8]' 
                    : 'bg-black/40 text-slate-400 border border-white/10'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 4 Dedicated Horizontal Rails */}
        <div className="space-y-8 stagger-item stagger-item-3">
          {visibleFamilies.map((fam) => (
            <HorizontalProductCarousel
              key={fam.id}
              familyId={fam.id}
              familyIndex={fam.index}
              familyName={fam.name}
              familyTagline={fam.tagline}
              variantCount={fam.count}
              products={fam.products}
              allProducts={products}
              onQuickView={onQuickView}
              onEnquire={onEnquire}
              onRequestQuote={onRequestQuote}
              onAddToCart={onAddToCart}
              onViewAllInFamily={(id) => onCategoryChange(id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
