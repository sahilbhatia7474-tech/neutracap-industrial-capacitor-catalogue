/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP CATALOGUE COMMAND (PREMIUM COMMAND SEARCH INTERFACE)
 * - Visual Metaphor: Precision Engineering Command Console
 * - Search across 490 canonical baseline variants with zero hallucination
 * - Instant technical filtering by Capacitance, Voltage, Application, SKU & Dimensions
 * - Typography: Space Grotesk (Titles), Plus Jakarta Sans (UI/Body/Presets), IBM Plex Mono (SKU/Technical Specs)
 * - Tactile quick filter triggers and live matching results with micro-elevation
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CapacitorVariant } from '../../types';
import { 
  Search, 
  X, 
  Layers, 
  ArrowRight, 
  CornerDownLeft, 
  Sliders,
  Terminal,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react';

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: CapacitorVariant[];
  onSelectProduct: (product: CapacitorVariant) => void;
  onSelectCategory: (category: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Quick Command Search Presets as requested in specification
  const quickFilters = [
    { label: '100/120 µF', query: '100/120' },
    { label: '450V DC', query: '450V' },
    { label: '25 MFD', query: '25 MFD' },
    { label: '330 µF', query: '330' },
    { label: 'Starting Line', query: 'Starting' },
    { label: 'Running Line', query: 'Running' },
    { label: 'Harmonic Filter', query: 'Filter' },
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setActiveCategoryFilter('all');
    }
  }, [isOpen]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Robust Search filtering logic across all 490 canonical variants
  const searchResults = useMemo(() => {
    if (!query.trim() && activeCategoryFilter === 'all') return [];
    
    const q = query.toLowerCase().trim();
    const normalizedQuery = q.replace('uf', 'µf').replace('mfd', 'mfd');

    return products.filter((p) => {
      // Category filter check
      if (activeCategoryFilter !== 'all' && p.familyId !== activeCategoryFilter) {
        return false;
      }

      if (!q) return true;

      const matchName = p.productName.toLowerCase().includes(q);
      const matchCap = p.capacitanceDisplay.toLowerCase().includes(q) || p.capacitanceDisplay.toLowerCase().includes(normalizedQuery);
      const matchVolt = p.voltageDisplay.toLowerCase().includes(q);
      const matchFamily = p.familyId.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchTags = p.applicationTags.some(t => t.toLowerCase().includes(q));

      return matchName || matchCap || matchVolt || matchFamily || matchSku || matchTags;
    });
  }, [query, activeCategoryFilter, products]);

  if (!isOpen) return null;

  return (
    <div 
      id="global-command-search-backdrop"
      className="fixed inset-0 z-50 bg-[#020713]/85 backdrop-blur-md flex items-start justify-center pt-8 sm:pt-14 px-3 sm:px-4 animate-in fade-in duration-200 font-sans select-none overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="global-command-search-dialog"
        className="w-full max-w-3xl bg-gradient-to-b from-[#091D34] via-[#051324] to-[#020A16] rounded-3xl border border-[#35C6E8]/40 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(53,198,232,0.18),inset_0_1px_2px_rgba(255,255,255,0.25)] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top 3D Specular Laser Hairline */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#35C6E8] to-transparent shadow-[0_0_15px_#35C6E8] shrink-0 z-30 pointer-events-none"></div>

        {/* Ambient 3D Volumetric Lighting Flares & Atmospheric Glow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#35C6E8]/12 rounded-full blur-3xl pointer-events-none z-0"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none z-0"></div>

        {/* Micro Technical Grid Watermark Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(53,198,232,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(53,198,232,0.025)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

        {/* 1. Top Command Bar — 3D Aerospace Command Header */}
        <div className="shrink-0 px-5 sm:px-6 py-4 bg-gradient-to-r from-[#071626]/98 via-[#0B223D]/95 to-[#061424]/98 border-b border-[#35C6E8]/30 flex items-center justify-between relative z-10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            {/* 3D Tactile Terminal Medallion */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-b from-[#173A5E] via-[#0E2A4A] to-[#07172C] border border-[#35C6E8]/60 flex items-center justify-center text-[#35C6E8] shadow-[0_0_15px_rgba(53,198,232,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)] shrink-0">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-[#35C6E8] filter drop-shadow-[0_0_4px_#35C6E8]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399] animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                  NEUTRACAP CATALOGUE COMMAND
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-[#35C6E8] bg-[#040D18] px-2.5 py-0.5 rounded-full border border-[#1E4369] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35C6E8]"></span>
                  <span>490 Baseline Specifications</span>
                </span>
              </div>
              <p className="text-[11px] text-[#A8B4C2] font-sans mt-0.5">
                REAL-TIME PARAMETRIC INDEX · FACTORY VERIFIED TOLERANCES
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#040D18] border border-[#1E4369] text-[10.5px] font-mono text-[#35C6E8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
              ESC to exit
            </kbd>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gradient-to-b from-[#0F2847] to-[#081729] hover:from-[#173A5E] hover:to-[#0B2038] border border-[#35C6E8]/40 hover:border-[#35C6E8] text-[#A8B4C2] hover:text-white shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(53,198,232,0.4)] active:scale-95 transition-all cursor-pointer"
              aria-label="Close Command Palette"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Hero Command Search Input Surface & Presets */}
        <div className="shrink-0 p-4 sm:p-5 bg-gradient-to-r from-[#061424] via-[#091E36] to-[#051222] border-b border-[#35C6E8]/30 relative z-10 shadow-[0_8px_25px_rgba(0,0,0,0.6)]">
          {/* Deep 3D Inset Input Chassis */}
          <div className="relative flex items-center rounded-2xl bg-[#030914] border border-[#1E4369] focus-within:border-[#35C6E8] focus-within:ring-2 focus-within:ring-[#35C6E8]/40 shadow-[inset_0_2px_8px_rgba(0,0,0,0.85),0_0_20px_rgba(53,198,232,0.12)] p-1.5 sm:p-2 transition-all">
            <div className="pl-3 pr-2.5 text-[#35C6E8]">
              <Search className="w-5 h-5 text-[#35C6E8] filter drop-shadow-[0_0_4px_#35C6E8]" />
            </div>
            <input
              ref={inputRef}
              id="catalogue-command-input"
              type="text"
              placeholder="Search ratings, capacitance, voltage, SKU (e.g. 100/120, 450V, 25 MFD)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-11 bg-transparent text-sm sm:text-base font-medium text-white placeholder:text-[#A8B4C2]/50 focus:outline-none font-sans"
            />
            {query && (
              <button 
                id="clear-command-search-btn"
                onClick={() => setQuery('')}
                className="p-1.5 rounded-lg text-[#A8B4C2] hover:text-white hover:bg-white/10 mr-1 transition-colors cursor-pointer"
                aria-label="Clear Search Input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="hidden sm:flex items-center pr-3">
              <span className="text-[10px] font-mono font-bold text-[#35C6E8] bg-gradient-to-r from-[#0B1F36] to-[#071629] px-2.5 py-1 rounded-md border border-[#35C6E8]/40 shadow-[0_0_8px_rgba(53,198,232,0.2)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>LIVE INDEX</span>
              </span>
            </div>
          </div>

          {/* Tactical Quick Preset Chips — 3D Tactile Pills */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            <span className="text-[10.5px] font-mono font-bold text-[#35C6E8] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#35C6E8]" />
              <span>PRESETS:</span>
            </span>
            {quickFilters.map((filter) => {
              const isActive = query === filter.query;
              return (
                <button
                  key={filter.label}
                  id={`command-filter-${filter.query.replace(/[^a-zA-Z0-9]/g, '')}`}
                  onClick={() => setQuery(filter.query)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#173A5E] to-[#0F2F50] text-[#35C6E8] font-bold border border-[#35C6E8] shadow-[0_0_15px_rgba(53,198,232,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]'
                      : 'bg-gradient-to-b from-[#081627] to-[#040C16] hover:from-[#102B4B] hover:to-[#07192C] text-[#A8B4C2] hover:text-white border border-[#173A5E] hover:border-[#35C6E8]/50 shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] active:scale-95'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Results Container with Depth & 3D Spatial Canvas */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 bg-gradient-to-b from-[#030914]/90 via-[#051120]/80 to-[#020710]/95 space-y-3 relative z-10 custom-scrollbar">
          {query.trim() === '' && activeCategoryFilter === 'all' ? (
            /* Idle Command Prompt — 3D Holographic Launcher */
            <div className="py-10 px-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#173A5E] via-[#0E2A4A] to-[#07172C] border border-[#35C6E8]/50 flex items-center justify-center mx-auto mb-3.5 text-[#35C6E8] shadow-[0_0_25px_rgba(53,198,232,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)]">
                <Layers className="w-7 h-7 text-[#35C6E8] filter drop-shadow-[0_0_6px_#35C6E8]" />
              </div>
              <h4 className="text-base sm:text-lg font-black font-display text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Catalogue Command Active
              </h4>
              <p className="text-xs text-[#A8B4C2] max-w-md mx-auto mt-1.5 font-sans leading-relaxed">
                Search all 490 canonical industrial specifications by capacitance rating, voltage, application tags, or SKU number.
              </p>
              
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto text-left">
                <button
                  onClick={() => setQuery('Starting')}
                  className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#091D33] to-[#040E1B] hover:from-[#113256] hover:to-[#07192E] border border-[#1E4369] hover:border-[#35C6E8] shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(53,198,232,0.35)] active:scale-95 transition-all cursor-pointer group"
                >
                  <div className="font-sans font-bold text-white text-xs group-hover:text-[#35C6E8] transition-colors">STARTING</div>
                  <div className="text-[10px] text-[#35C6E8] font-mono mt-0.5">40 Variants</div>
                </button>
                <button
                  onClick={() => setQuery('Running')}
                  className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#091D33] to-[#040E1B] hover:from-[#113256] hover:to-[#07192E] border border-[#1E4369] hover:border-[#35C6E8] shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(53,198,232,0.35)] active:scale-95 transition-all cursor-pointer group"
                >
                  <div className="font-sans font-bold text-white text-xs group-hover:text-[#35C6E8] transition-colors">RUNNING</div>
                  <div className="text-[10px] text-[#35C6E8] font-mono mt-0.5">62 Variants</div>
                </button>
                <button
                  onClick={() => setQuery('Filter')}
                  className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#091D33] to-[#040E1B] hover:from-[#113256] hover:to-[#07192E] border border-[#1E4369] hover:border-[#35C6E8] shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(53,198,232,0.35)] active:scale-95 transition-all cursor-pointer group"
                >
                  <div className="font-sans font-bold text-white text-xs group-hover:text-[#35C6E8] transition-colors">GREEN FILTER</div>
                  <div className="text-[10px] text-[#35C6E8] font-mono mt-0.5">40 Variants</div>
                </button>
                <button
                  onClick={() => setQuery('450V')}
                  className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#091D33] to-[#040E1B] hover:from-[#113256] hover:to-[#07192E] border border-[#1E4369] hover:border-[#35C6E8] shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(53,198,232,0.35)] active:scale-95 transition-all cursor-pointer group"
                >
                  <div className="font-sans font-bold text-white text-xs group-hover:text-[#35C6E8] transition-colors">DC ALU 450V</div>
                  <div className="text-[10px] text-[#35C6E8] font-mono mt-0.5">348 Variants</div>
                </button>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            /* Matching Results — 3D Hardware Cards */
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-1 pb-1">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#35C6E8]" />
                  <span>FOUND {searchResults.length} VERIFIED SPECIFICATIONS:</span>
                </span>
                <span className="text-[10px] font-mono text-[#35C6E8] bg-[#040D18] px-2.5 py-0.5 rounded-full border border-[#1E4369]">
                  MATCHED IN 490 CANONICAL CATALOGUE
                </span>
              </div>

              {searchResults.map((product) => (
                <div
                  key={product.id}
                  id={`command-result-${product.id}`}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#08182B] via-[#051221] to-[#030A14] hover:from-[#0E2744] hover:to-[#071829] border border-[#1E4369]/80 hover:border-[#35C6E8] shadow-[0_10px_25px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_35px_rgba(53,198,232,0.25)] transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3.5">
                    {/* 3D Capacitance Badge */}
                    <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-b from-[#0F2B48] to-[#05111E] border border-[#35C6E8]/40 group-hover:border-[#35C6E8] flex flex-col items-center justify-center text-center p-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8),0_0_12px_rgba(53,198,232,0.2)] shrink-0 transition-all">
                      <span className="text-xs font-mono font-bold text-white">
                        {product.capacitanceDisplay.split(' ')[0]}
                      </span>
                      <span className="text-[8.5px] font-mono text-[#35C6E8] uppercase font-bold">
                        {product.capacitanceDisplay.split(' ')[1] || 'µF'}
                      </span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-white font-display group-hover:text-[#35C6E8] transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                          {product.productName}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#030914] text-[#35C6E8] border border-[#1E4369] font-bold">
                          {product.sku}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-[#A8B4C2] flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-1">
                        <span className="text-[#35C6E8] font-bold">{product.voltageDisplay}</span>
                        <span className="text-slate-600">·</span>
                        <span>Ø{product.dimensions.diameterMm}×{product.dimensions.heightMm}mm</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-white font-bold bg-[#030914] px-2 py-0.5 rounded border border-[#1E4369]">₹{product.pricing.launchPrice || 'POA'}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 font-sans">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Factory Verified</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 sm:self-center">
                    <button
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-b from-[#1C4E7E] to-[#0D2D50] group-hover:from-[#25639E] group-hover:to-[#123862] border border-[#35C6E8]/60 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_4px_12px_rgba(53,198,232,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_20px_rgba(53,198,232,0.5)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#35C6E8]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Zero Result State with Direct Custom Requirement Fallback */
            <div className="py-12 px-4 text-center">
              <div className="text-base sm:text-lg font-bold text-white font-display">
                No baseline catalogue variant matches &ldquo;{query}&rdquo;
              </div>
              <p className="text-xs text-[#A8B4C2] max-w-md mx-auto mt-2 font-sans leading-relaxed">
                Non-standard ratings, customized terminals, or high-volume OEM specifications can be routed directly to our factory design desk.
              </p>
              <button
                id="search-custom-desk-cta"
                onClick={() => {
                  onClose();
                  onSelectCategory('custom');
                }}
                className="mt-5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#173A5E] via-[#0E7490] to-[#173A5E] hover:from-[#0E7490] hover:to-[#35C6E8] text-white text-xs font-sans font-bold uppercase tracking-wider border border-[#35C6E8]/70 shadow-[0_8px_25px_rgba(53,198,232,0.35)] hover:shadow-[0_0_30px_rgba(53,198,232,0.6)] inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>Transmit Custom Specification</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#35C6E8]" />
              </button>
            </div>
          )}
        </div>

        {/* 4. Command Footer — 3D Metallic Status Pedestal */}
        <div className="shrink-0 px-5 sm:px-6 py-3.5 bg-gradient-to-r from-[#040C18] via-[#071628] to-[#030A14] border-t border-[#1E3B5C]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-[#A8B4C2] font-sans relative z-10 shadow-[0_-4px_15px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-slate-400">SHORTCUTS:</span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-2 py-0.5 rounded-md bg-gradient-to-b from-[#0E243D] to-[#061220] border border-[#1E4369] text-white font-mono text-[10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.5)]">ESC</kbd> 
              <span>Close</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-2 py-0.5 rounded-md bg-gradient-to-b from-[#0E243D] to-[#061220] border border-[#1E4369] text-white font-mono text-[10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.5)]">↵</kbd> 
              <span>Select</span>
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-[#35C6E8] font-bold bg-[#030914] px-2.5 py-1 rounded-full border border-[#1E4369]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>35+ YEARS PRECISION ENGINEERING</span>
          </span>
        </div>
      </div>
    </div>
  );
};
