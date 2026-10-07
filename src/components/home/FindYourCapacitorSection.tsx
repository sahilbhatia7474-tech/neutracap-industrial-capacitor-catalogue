/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FIND YOUR CAPACITOR — INTELLIGENT FINDER FOUNDATION (OSCAR PREMIER EDITION)
 * - Ultra-Luxury Aerospace Instrument Configurator Console
 * - Color System: Ice White #F4F7FA, Deep Obsidian #020713, Midnight Blue #071629, Electric Cyan #35C6E8
 * - Typography: Editorial display headings, IBM Plex Mono technical badges & steps, Inter body
 * - Standardized Product Family Naming & Real-Time Dynamic Parameter Narrowing
 * - Data Integrity: Canonical values from CATALOGUE_SUMMARY (490 baseline variants)
 * - Strict Representative Limit: 8 preview cards when idle; full filtered results on active query
 */

import React, { useState, useMemo } from 'react';
import { CapacitorVariant, ProductFamilyId } from '../../types';
import { ProductCard } from '../products/ProductCard';
import { Search, RotateCcw, ArrowRight, Sparkles, Filter, Sliders, CheckCircle2 } from 'lucide-react';
import { CATALOGUE_SUMMARY } from '../../data/catalogueSummary';

// Approved Representative SKUs strictly matching canonical variants (2 per family = 8 total)
const APPROVED_REPRESENTATIVE_CONFIG: { familyId: ProductFamilyId; skus: string[] }[] = [
  {
    familyId: 'starting',
    skus: ['NC-SC-40-60-230V', 'NC-SC-400-500-450V'],
  },
  {
    familyId: 'green_filter',
    skus: ['NC-GF-40-60-250V', 'NC-GF-400-500-450V'],
  },
  {
    familyId: 'running',
    skus: ['NC-RC-2UF-400V', 'NC-RC-60UF-450V'],
  },
  {
    familyId: 'dc_electrolytic',
    skus: ['NC-DC-47UF-35V', 'NC-DC-22000UF-500V'],
  },
];

export interface FindYourCapacitorSectionProps {
  products: CapacitorVariant[];
  onQuickView: (product: CapacitorVariant) => void;
  onEnquire: (product: CapacitorVariant) => void;
  onRequestQuote: (product: CapacitorVariant) => void;
  onCustomRequirementClick: () => void;
  onAddToCart?: (product: CapacitorVariant) => void;
}

export const FindYourCapacitorSection: React.FC<FindYourCapacitorSectionProps> = ({
  products,
  onQuickView,
  onEnquire,
  onRequestQuote,
  onCustomRequirementClick,
  onAddToCart,
}) => {
  // Filter states
  const [selectedType, setSelectedType] = useState<ProductFamilyId | 'all'>('all');
  const [selectedVoltage, setSelectedVoltage] = useState<string>('all');
  const [capacitanceQuery, setCapacitanceQuery] = useState<string>('');
  const [selectedApplication, setSelectedApplication] = useState<string>('all');

  // Dynamic data-driven voltage options based on active family filter
  const voltageOptions = useMemo(() => {
    const relevantProducts = selectedType === 'all' 
      ? products 
      : products.filter(p => p.familyId === selectedType);
    const uniqueVoltages = Array.from(new Set(relevantProducts.map(p => p.voltageDisplay)));
    return ['all', ...uniqueVoltages];
  }, [products, selectedType]);

  const applicationOptions = [
    'all',
    'Single Phase Motors',
    'Air Compressors & Blowers',
    'Domestic & Agricultural Pumps',
    'Air Conditioners',
    'Harmonic Filtering & APFC',
    'Solar & Inverter Drives'
  ];

  const handleReset = () => {
    setSelectedType('all');
    setSelectedVoltage('all');
    setCapacitanceQuery('');
    setSelectedApplication('all');
  };

  // Determine if specific search or narrowing filters are active
  const hasActiveFilters = useMemo(() => {
    return selectedVoltage !== 'all' || selectedApplication !== 'all' || capacitanceQuery.trim().length > 0;
  }, [selectedVoltage, selectedApplication, capacitanceQuery]);

  // Representative preview products (Exactly 2 per family, maximum 8 total)
  const representativeProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    const targetConfigs = selectedType === 'all'
      ? APPROVED_REPRESENTATIVE_CONFIG
      : APPROVED_REPRESENTATIVE_CONFIG.filter(c => c.familyId === selectedType);

    const result: CapacitorVariant[] = [];

    targetConfigs.forEach(({ familyId, skus }) => {
      const familyProducts = products.filter(p => p.familyId === familyId);
      skus.forEach(sku => {
        const found = familyProducts.find(p => p.sku === sku);
        if (found) {
          result.push(found);
        }
      });
      // Safety guarantee: Ensure exactly up to 2 items per family
      if (result.filter(p => p.familyId === familyId).length < 2 && familyProducts.length >= 2) {
        if (!result.some(p => p.id === familyProducts[0].id)) result.push(familyProducts[0]);
        if (result.filter(p => p.familyId === familyId).length < 2 && !result.some(p => p.id === familyProducts[familyProducts.length - 1].id)) {
          result.push(familyProducts[familyProducts.length - 1]);
        }
      }
    });

    return result;
  }, [products, selectedType]);

  // Filter logic for active user searches across all 490 canonical variants
  const { exactMatches, relatedMatches } = useMemo(() => {
    if (!products || products.length === 0 || !hasActiveFilters) {
      return { exactMatches: [], relatedMatches: [] };
    }

    const query = capacitanceQuery.toLowerCase().trim();
    const exact: CapacitorVariant[] = [];
    const related: CapacitorVariant[] = [];

    products.forEach((item) => {
      if ((item.status || 'active') !== 'active') return;
      // Direct filters
      const matchType = selectedType === 'all' || item.familyId === selectedType;
      const matchVolt = selectedVoltage === 'all' || item.voltageDisplay.includes(selectedVoltage.replace(' AC', '').replace(' DC', ''));
      const matchApp = selectedApplication === 'all' || item.applicationTags.some(tag => 
        tag.toLowerCase().includes(selectedApplication.toLowerCase().split(' ')[0])
      );

      // Capacitance / SKU / Text Matching
      let matchQueryExact = true;
      let matchQueryPartial = false;

      if (query) {
        const cap = item.capacitanceDisplay.toLowerCase();
        const name = item.productName.toLowerCase();
        const sku = item.sku.toLowerCase();

        const isExactCap = cap.includes(query) || query.includes(cap.split(' ')[0]);
        const isExactSku = sku.includes(query);
        const isExactName = name.includes(query);

        if (isExactCap || isExactSku || isExactName) {
          matchQueryExact = true;
        } else {
          matchQueryExact = false;
          if (item.applicationTags.some(t => t.toLowerCase().includes(query)) || item.voltageDisplay.toLowerCase().includes(query)) {
            matchQueryPartial = true;
          }
        }
      }

      if (matchType && matchVolt && matchApp && matchQueryExact) {
        exact.push(item);
      } else if ((matchType || matchVolt) && (matchQueryExact || matchQueryPartial)) {
        related.push(item);
      }
    });

    return { exactMatches: exact, relatedMatches: related.filter(r => !exact.some(e => e.id === r.id)) };
  }, [products, selectedType, selectedVoltage, capacitanceQuery, selectedApplication, hasActiveFilters]);

  // Final cards to render: either 8 representative preview cards (default) or active search results
  const displayedProducts = hasActiveFilters ? exactMatches : representativeProducts;
  const isDefaultPreview = !hasActiveFilters;

  const activeFamilyCount = selectedType === 'all' 
    ? CATALOGUE_SUMMARY.total 
    : selectedType === 'starting' 
      ? CATALOGUE_SUMMARY.starting 
      : selectedType === 'green_filter' 
        ? CATALOGUE_SUMMARY.greenFilter 
        : selectedType === 'running' 
          ? CATALOGUE_SUMMARY.running 
          : CATALOGUE_SUMMARY.dcAluminium;

  return (
    <section 
      id="finder" 
      className="py-20 md:py-32 bg-gradient-to-b from-[#020612] via-[#050E1F] to-[#020713] border-b border-white/10 relative overflow-hidden text-white"
    >
      {/* Precision background engineering grid & atmospheric lighting */}
      <div className="absolute inset-0 bg-luxury-grid opacity-35 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#35C6E8]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[500px] bg-[#10B981]/8 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header — Oscar-Grade Typographic Lockup */}
        <div className="max-w-3xl mb-12 pb-6 border-b border-white/10 stagger-item stagger-item-1">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#173A5E]/60 via-[#0B223D]/80 to-[#173A5E]/60 border border-[#35C6E8]/40 shadow-[0_0_15px_rgba(53,198,232,0.25)] text-xs font-mono font-bold tracking-[0.2em] text-[#35C6E8] uppercase mb-4 backdrop-blur-md">
            <Filter className="w-3.5 h-3.5 text-[#35C6E8] animate-pulse" />
            <span>PRECISION PARAMETRIC CONSOLE · 490 BASELINE VARIANTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-editorial tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#35C6E8] drop-shadow-[0_4px_25px_rgba(53,198,232,0.35)]">
            Find Your Capacitor
          </h2>

          <p className="text-base sm:text-lg text-slate-300 mt-3 font-sans font-normal leading-relaxed">
            Configure target capacitance, operating voltage, and application duty cycle across our <span className="font-mono font-black text-white px-1.5 py-0.5 rounded bg-white/10 border border-white/15">{CATALOGUE_SUMMARY.total} verified baseline models</span>.
          </p>
        </div>

        {/* Filter Panel (Aerospace Industrial Instrument Console Surface) */}
        <div className="rounded-3xl bg-gradient-to-b from-[#0B2038]/95 via-[#071629]/95 to-[#040D1C]/98 backdrop-blur-2xl border border-[#35C6E8]/35 p-6 sm:p-9 md:p-11 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.2)] relative overflow-hidden group stagger-item stagger-item-2">
          {/* Luminous top specular laser hairline */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#35C6E8] to-transparent shadow-[0_0_15px_#35C6E8]"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            
            {/* Step 1: Family / Type */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.14em] text-slate-200">
                <span className="font-mono text-[#35C6E8] text-[11px] font-black px-1.5 py-0.5 rounded-md bg-[#35C6E8]/10 border border-[#35C6E8]/40 shadow-[0_0_8px_rgba(53,198,232,0.3)]">[01]</span>
                <span>Product Family</span>
              </label>
              <div className="relative">
                <select
                  id="finder-type-select"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="w-full h-13 px-4 rounded-xl bg-gradient-to-b from-[#061426] to-[#030B17] border border-[#173A5E] hover:border-[#35C6E8]/70 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs font-mono font-medium text-white transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)] cursor-pointer"
                >
                  <option value="all" className="bg-[#0B1F36] text-white">All Families ({CATALOGUE_SUMMARY.total} variants)</option>
                  <option value="starting" className="bg-[#0B1F36] text-white">Starting Capacitors ({CATALOGUE_SUMMARY.starting})</option>
                  <option value="green_filter" className="bg-[#0B1F36] text-white">Green Filter Capacitors ({CATALOGUE_SUMMARY.greenFilter})</option>
                  <option value="running" className="bg-[#0B1F36] text-white">Running Capacitors ({CATALOGUE_SUMMARY.running})</option>
                  <option value="dc_electrolytic" className="bg-[#0B1F36] text-white">DC Aluminium Electrolytic ({CATALOGUE_SUMMARY.dcAluminium})</option>
                </select>
              </div>
            </div>

            {/* Step 2: Capacitance (µF / MFD) */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.14em] text-slate-200">
                <span className="font-mono text-[#35C6E8] text-[11px] font-black px-1.5 py-0.5 rounded-md bg-[#35C6E8]/10 border border-[#35C6E8]/40 shadow-[0_0_8px_rgba(53,198,232,0.3)]">[02]</span>
                <span>Capacitance Value</span>
              </label>
              <div className="relative">
                <input
                  id="finder-capacitance-input"
                  type="text"
                  placeholder="e.g. 40/60, 25 MFD, 3300"
                  value={capacitanceQuery}
                  onChange={(e) => setCapacitanceQuery(e.target.value)}
                  className="w-full h-13 pl-4 pr-12 rounded-xl bg-gradient-to-b from-[#061426] to-[#030B17] border border-[#173A5E] hover:border-[#35C6E8]/70 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs font-mono text-white placeholder:text-slate-500 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)]"
                />
                <span className="absolute right-3.5 top-3.5 px-2 py-0.5 rounded bg-[#35C6E8]/15 border border-[#35C6E8]/40 text-xs font-mono font-bold text-[#35C6E8] shadow-[0_0_8px_rgba(53,198,232,0.4)]">
                  µF
                </span>
              </div>
            </div>

            {/* Step 3: Voltage Rating */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.14em] text-slate-200">
                <span className="font-mono text-[#35C6E8] text-[11px] font-black px-1.5 py-0.5 rounded-md bg-[#35C6E8]/10 border border-[#35C6E8]/40 shadow-[0_0_8px_rgba(53,198,232,0.3)]">[03]</span>
                <span>Operating Voltage</span>
              </label>
              <div className="relative">
                <select
                  id="finder-voltage-select"
                  value={selectedVoltage}
                  onChange={(e) => setSelectedVoltage(e.target.value)}
                  className="w-full h-13 px-4 rounded-xl bg-gradient-to-b from-[#061426] to-[#030B17] border border-[#173A5E] hover:border-[#35C6E8]/70 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs font-mono text-white transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)] cursor-pointer"
                >
                  <option value="all" className="bg-[#0B1F36] text-white">All Verified Voltages</option>
                  {voltageOptions.filter(v => v !== 'all').map((volt) => (
                    <option key={volt} value={volt} className="bg-[#0B1F36] text-white">{volt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 4: Application Duty */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.14em] text-slate-200">
                <span className="font-mono text-[#35C6E8] text-[11px] font-black px-1.5 py-0.5 rounded-md bg-[#35C6E8]/10 border border-[#35C6E8]/40 shadow-[0_0_8px_rgba(53,198,232,0.3)]">[04]</span>
                <span>Application Duty</span>
              </label>
              <div className="relative">
                <select
                  id="finder-application-select"
                  value={selectedApplication}
                  onChange={(e) => setSelectedApplication(e.target.value)}
                  className="w-full h-13 px-4 rounded-xl bg-gradient-to-b from-[#061426] to-[#030B17] border border-[#173A5E] hover:border-[#35C6E8]/70 focus:border-[#35C6E8] focus:ring-2 focus:ring-[#35C6E8]/30 text-xs font-mono font-medium text-white transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)] cursor-pointer"
                >
                  {applicationOptions.map((app) => (
                    <option key={app} value={app} className="bg-[#0B1F36] text-white">
                      {app === 'all' ? 'All Verified Applications' : app}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Results Summary & Action Bar */}
          <div className="mt-9 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-xs font-sans">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDefaultPreview || exactMatches.length > 0 ? 'bg-[#10B981]' : 'bg-[#D98A4A]'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isDefaultPreview || exactMatches.length > 0 ? 'bg-[#10B981]' : 'bg-[#D98A4A]'}`}></span>
              </span>

              {isDefaultPreview ? (
                <div>
                  <span className="font-mono font-black text-white text-base px-2 py-0.5 rounded-lg bg-[#35C6E8]/20 border border-[#35C6E8]/50 text-[#35C6E8] shadow-[0_0_10px_rgba(53,198,232,0.4)] mr-2">
                    {activeFamilyCount}
                  </span>
                  <span className="text-slate-300 font-mono text-xs">
                    VARIANTS IN PORTFOLIO · <span className="text-[#35C6E8] font-bold">SHOWING {displayedProducts.length} REPRESENTATIVE PREVIEWS</span>
                  </span>
                </div>
              ) : (
                <div>
                  <span className="font-mono font-black text-white text-base px-2 py-0.5 rounded-lg bg-[#10B981]/20 border border-[#10B981]/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.4)] mr-2">
                    {exactMatches.length}
                  </span>
                  <span className="text-slate-300 font-mono text-xs">
                    {exactMatches.length === 1 ? 'EXACT SPECIFICATION MATCH' : 'EXACT SPECIFICATION MATCHES'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {(hasActiveFilters || selectedType !== 'all') && (
                <button
                  id="finder-reset-btn"
                  onClick={handleReset}
                  className="text-xs font-mono font-bold text-slate-300 hover:text-white flex items-center gap-2 transition-all px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 cursor-pointer shadow-sm active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#35C6E8]" />
                  <span>RESET PARAMETERS</span>
                </button>
              )}

              <button
                id="finder-search-action-btn"
                onClick={() => {
                  const el = document.getElementById('finder-results-stage');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#173A5E] via-[#0E7490] to-[#173A5E] hover:from-[#0E7490] hover:to-[#35C6E8] text-white text-xs font-mono font-bold tracking-wider uppercase border border-[#35C6E8]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(53,198,232,0.5)] transition-all cursor-pointer active:scale-98"
              >
                <Search className="w-4 h-4 text-[#35C6E8] filter drop-shadow-[0_0_4px_#35C6E8]" />
                <span className="group-hover:text-slate-950 transition-colors">QUERY SPECIFICATIONS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid Preview */}
        {/* Results Grid Preview — Ultra Modern 3D Interactive Podium */}
        <div id="finder-results-stage" className="mt-14">
          {displayedProducts.length > 0 ? (
            <div className="rounded-3xl bg-gradient-to-b from-[#08182E]/90 via-[#051122]/95 to-[#020713]/98 border border-[#35C6E8]/35 p-6 sm:p-8 md:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(53,198,232,0.18),inset_0_1px_2px_rgba(255,255,255,0.25)] relative overflow-hidden backdrop-blur-2xl group">
              {/* Top 3D Specular Laser Hairline */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#35C6E8] to-transparent shadow-[0_0_15px_#35C6E8] pointer-events-none"></div>

              {/* Internal 3D Volumetric Atmosphere Glows */}
              <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#35C6E8]/12 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* 3D Hardware Telemetry Stage Header */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-5 border-b border-white/10 gap-4">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2.5">
                    {isDefaultPreview ? (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#173A5E]/80 to-[#0B223D] border border-[#35C6E8]/50 shadow-[0_0_15px_rgba(53,198,232,0.3)]">
                        <Sparkles className="w-3.5 h-3.5 text-[#35C6E8] filter drop-shadow-[0_0_5px_#35C6E8]" />
                        <span className="tracking-[0.16em] text-[#35C6E8]">REPRESENTATIVE PREVIEW · 2 MODELS PER FAMILY ({displayedProducts.length} OF {activeFamilyCount})</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#062618] to-[#03150D] border border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 filter drop-shadow-[0_0_5px_#10B981]" />
                        <span className="tracking-[0.16em] text-emerald-400">EXACT VERIFIED CATALOGUE MATCHES ({exactMatches.length})</span>
                      </div>
                    )}
                  </div>
                  {isDefaultPreview && (
                    <p className="text-xs text-slate-300 mt-2.5 font-sans leading-relaxed max-w-2xl">
                      Showing baseline representative cards. All {CATALOGUE_SUMMARY.total} variants remain interactive through parametric filters, horizontal rails, and technical search.
                    </p>
                  )}
                </div>

                <span className="text-[11px] font-mono text-emerald-300 font-bold self-start sm:self-auto bg-gradient-to-r from-emerald-950/80 via-[#062417] to-emerald-950/80 px-4 py-2 rounded-xl border border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34D399]"></span>
                  <span>{isDefaultPreview ? 'Representative Baseline' : '100% Verified Specification'}</span>
                </span>
              </div>

              {/* Strict Max 8 Cards Default Grid (or Exact Filter Matches) with Elevated 3D Spacing */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-1">
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={onQuickView}
                    onEnquire={onEnquire}
                    onRequestQuote={onRequestQuote}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>

              {/* Bottom Telemetry Verification Strip */}
              <div className="relative z-10 mt-9 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C6E8]"></span>
                  <span>SCADA PARAMETRIC TELEMETRY · CANONICAL 490 DATABASE INTEGRITY</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <span className="text-emerald-400 font-bold">100% HI-POT TESTED</span>
                  <span>·</span>
                  <span>DIRECT EX-FACTORY DISPATCH</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-14 bg-gradient-to-b from-[#0B2038]/95 via-[#071629]/95 to-[#040D1C]/98 rounded-3xl border border-amber-500/40 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-amber-500/20 to-amber-900/30 border border-amber-500/50 text-amber-400 flex items-center justify-center mx-auto mb-4 font-mono font-bold text-lg shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                !
              </div>
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-amber-400 uppercase mb-2">
                CUSTOM INDUSTRIAL SPECIFICATION REQUIRED
              </div>
              <p className="text-xl font-extrabold text-white font-display">
                No standard baseline variant matches this exact parameter combination.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-2.5 max-w-md mx-auto leading-relaxed font-sans">
                NeutraCap manufactures non-standard capacitance ratings, specialized voltages, high surge dielectric envelopes, and custom form-factors for OEM applications.
              </p>
              <button
                id="finder-no-match-custom-spec-btn"
                onClick={onCustomRequirementClick}
                className="mt-6 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#173A5E] via-[#0E7490] to-[#173A5E] hover:from-[#0E7490] hover:to-[#35C6E8] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(53,198,232,0.5)] cursor-pointer"
              >
                <span>Request Custom Specification</span>
                <ArrowRight className="w-4 h-4 text-[#35C6E8]" />
              </button>
            </div>
          )}

          {/* Related / Partial Matches if exact match was narrow */}
          {!isDefaultPreview && exactMatches.length === 0 && relatedMatches.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="mb-5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-[#35C6E8]" />
                  <span>CLOSEST ALTERNATIVE CATALOGUE VARIANTS ({relatedMatches.length})</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Closest standard catalogue variants in related product families or voltage categories:
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedMatches.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={onQuickView}
                    onEnquire={onEnquire}
                    onRequestQuote={onRequestQuote}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
