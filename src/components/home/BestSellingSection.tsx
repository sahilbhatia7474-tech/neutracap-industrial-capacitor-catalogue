/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FEATURED / BEST-SELLING PRODUCTS SECTION (PREMIUM INDUSTRIAL TRANSFORMATION)
 * - Color System: Ice White #F4F7FA, Deep Navy #071426, Steel Blue #173A5E, Electric Cyan #35C6E8
 * - Typography: Manrope headings, IBM Plex Mono technical badges, Inter body
 * - Standardized Product Family Naming & Variant Counts on Tabs:
 *   - All Catalogues (490)
 *   - Starting Capacitors (40)
 *   - Green Filter Capacitors (40)
 *   - Running Capacitors (62)
 *   - DC Aluminium Electrolytic (348)
 * - Data Integrity: Canonical counts from CATALOGUE_SUMMARY
 */

import React from 'react';
import { ProductCard } from '../products/ProductCard';
import { CapacitorVariant, ProductFamilyId } from '../../types';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { CATALOGUE_SUMMARY } from '../../data/catalogueSummary';

export interface BestSellingSectionProps {
  products: CapacitorVariant[];
  selectedCategory: ProductFamilyId | 'all';
  onCategoryChange: (cat: ProductFamilyId | 'all') => void;
  onQuickView: (product: CapacitorVariant) => void;
  onEnquire: (product: CapacitorVariant) => void;
  onRequestQuote: (product: CapacitorVariant) => void;
  onViewAllProducts: () => void;
}

export const BestSellingSection: React.FC<BestSellingSectionProps> = ({
  products,
  selectedCategory,
  onCategoryChange,
  onQuickView,
  onEnquire,
  onRequestQuote,
  onViewAllProducts,
}) => {
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.familyId === selectedCategory);

  const tabs: { id: ProductFamilyId | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'All Catalogues', count: CATALOGUE_SUMMARY.total },
    { id: 'starting', label: 'Starting Capacitors', count: CATALOGUE_SUMMARY.starting },
    { id: 'green_filter', label: 'Green Filter Capacitors', count: CATALOGUE_SUMMARY.greenFilter },
    { id: 'running', label: 'Running Capacitors', count: CATALOGUE_SUMMARY.running },
    { id: 'dc_electrolytic', label: 'DC Aluminium Electrolytic', count: CATALOGUE_SUMMARY.dcAluminium },
  ];

  return (
    <section 
      id="best-selling-section" 
      className="py-14 md:py-20 bg-white border-b border-[#E2E8F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E2E8F0] gap-4">
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-[#173A5E] uppercase mb-1">
              COMMERCIAL CORE RANGE
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#071426] font-display tracking-tight">
              Featured Industrial Capacitors
            </h2>
            <p className="text-sm text-[#475569] mt-1 font-normal max-w-xl">
              High-demand variants manufactured to strict electrical tolerances and ready for immediate factory dispatch.
            </p>
          </div>

          <button
            id="view-full-catalogue-btn"
            onClick={onViewAllProducts}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#173A5E] hover:text-[#071426] transition-colors self-start md:self-auto"
          >
            <span>View All {CATALOGUE_SUMMARY.total} Variants</span>
            <ArrowRight className="w-4 h-4 text-[#35C6E8]" />
          </button>
        </div>

        {/* Category Tabs with Canonical Variant Counts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar mb-6">
          {tabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                id={`bestseller-tab-${tab.id}`}
                onClick={() => onCategoryChange(tab.id)}
                className={`shrink-0 px-3.5 py-2 rounded-md text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#071426] text-white shadow-xs border border-[#173A5E]'
                    : 'bg-[#F4F7FA] text-[#071426] border border-[#CBD5E1] hover:bg-[#E2E8F0]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded font-mono ${
                  isActive ? 'bg-[#173A5E] text-[#35C6E8]' : 'bg-white text-[#64748B] border border-[#E2E8F0]'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onEnquire={onEnquire}
              onRequestQuote={onRequestQuote}
            />
          ))}
        </div>

        {/* Empty State when filter yields 0 */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center bg-[#F4F7FA] rounded-lg border border-[#CBD5E1] p-8">
            <Layers className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#071426] font-display">No variants found in this category</h3>
            <p className="text-xs text-[#475569] mt-1 max-w-sm mx-auto">
              Use the OEM Custom Desk to request non-standard voltage or capacitance values.
            </p>
            <button
              onClick={() => onCategoryChange('all')}
              className="mt-4 px-4 py-2 rounded-md bg-[#071426] text-white text-xs font-mono font-bold"
            >
              Reset Category Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
