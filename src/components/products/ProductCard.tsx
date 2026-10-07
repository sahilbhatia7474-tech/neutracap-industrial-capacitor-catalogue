/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * REUSABLE PRODUCT CARD COMPONENT (ULTRA MODERN 3D INTERACTIVE PREMIER)
 * - 3D Hardware Chamfered Chassis with Multi-Stage Physical Drop Shadows
 * - Visual System: Deep Obsidian #020713, Midnight Blue #07172B, Electric Cyan #35C6E8, Laser Emerald #10B981
 * - Typography: Space Grotesk / Sora names, IBM Plex Mono technical metrics, MOQ & SKU
 * - 3D Recessed Hardware Stage with dynamic specular rim lighting & contact shadow
 * - Tactile 3D Inset Metric Cavity (Capacitance & Voltage)
 * - 3D Action Cluster: Details | Add to Cart | Enquire with active haptic depression
 */

import React, { useState } from 'react';
import { CapacitorVariant } from '../../types';
import { Eye, MessageSquare, Plus, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { OptimizedImage } from '../common/OptimizedImage';

export interface ProductCardProps {
  product: CapacitorVariant;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
  onQuickView?: (product: CapacitorVariant) => void;
  onEnquire?: (product: CapacitorVariant) => void;
  onRequestQuote?: (product: CapacitorVariant) => void;
  onAddToCart?: (product: CapacitorVariant) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onEnquire,
  onAddToCart,
}) => {
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const getCategoryLabel = () => {
    switch (product.familyId) {
      case 'starting':
        return 'Starting Capacitor';
      case 'green_filter':
        return 'Green Filter Capacitor';
      case 'running':
        return 'Running Capacitor';
      case 'dc_electrolytic':
        return 'DC Aluminium Electrolytic';
    }
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1400);
    }
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="card-tactile group flex flex-col justify-between rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-[#0C1E36] via-[#071629] to-[#030B17] border border-[#173A5E] hover:border-[#35C6E8]/80 shadow-[0_16px_40px_rgba(0,0,0,0.7),0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.18)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(53,198,232,0.3),inset_0_1px_2px_rgba(255,255,255,0.35)] hover:-translate-y-1.5 hover:scale-[1.01] transition-transform transition-shadow duration-200 text-white relative overflow-hidden"
    >
      {/* 3D Top Specular Laser Edge Hairline */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#35C6E8]/50 to-transparent group-hover:via-[#35C6E8] shadow-[0_0_10px_#35C6E8] transition-all"></div>

      {/* Internal Volumetric Atmosphere Light Flare */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#35C6E8]/10 rounded-full blur-2xl group-hover:bg-[#35C6E8]/20 transition-all pointer-events-none"></div>

      <div>
        {/* 1. 3D Product Photography Studio Stage / Hardware Chamber */}
        <div 
          onClick={() => onQuickView && onQuickView(product)}
          className="product-studio-stage relative w-full aspect-4/3 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-gradient-to-b from-[#051122] to-[#020712] border border-[#173A5E]/80 group-hover:border-[#35C6E8]/60 shadow-[inset_0_3px_10px_rgba(0,0,0,0.85),0_4px_15px_rgba(0,0,0,0.5)] transition-all duration-300 group/stage"
        >
          {/* Studio Grid & Radial Glow Spotlight */}
          <div className="absolute inset-0 bg-industrial-grid-dark opacity-40 pointer-events-none"></div>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-24 bg-gradient-to-b from-[#35C6E8]/25 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>

          {/* Physical Contact Shadow Grounding the Component */}
          <div className="product-contact-shadow"></div>

          {/* Viewport-Prioritized 3D Optimized Catalogue Image Asset */}
          <OptimizedImage
            src={product.primaryImage || product.image}
            alt={`${product.productName} - NeutraCap`}
            containerClassName="relative z-10 w-full h-full flex items-center justify-center p-0.5"
            className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover/stage:scale-105 group-hover/stage:-translate-y-1 drop-shadow-[0_12px_18px_rgba(0,0,0,0.85)]"
            fallback={
              <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-200 group-hover/stage:scale-105 group-hover/stage:-translate-y-1 drop-shadow-[0_12px_18px_rgba(0,0,0,0.85)]">
                {product.familyId === 'starting' && (
                  <div className="w-14 h-22 rounded-t-xs rounded-b-sm bg-[#071426] border border-[#173A5E] shadow-2xl flex flex-col items-center justify-between py-2 text-white px-1 relative">
                    <div className="absolute -top-1.5 w-6 h-1.5 bg-[#CBD5E1] rounded-t-xs"></div>
                    <span className="text-[7.5px] font-bold tracking-wider text-[#A8B4C2] font-mono">NEUTRACAP</span>
                    <div className="text-[7.5px] font-mono text-center font-bold">
                      {product.capacitanceDisplay}<br />
                      <span className="text-[#35C6E8]">{product.voltageDisplay}</span>
                    </div>
                    <span className="text-[6px] text-[#A8B4C2] font-mono uppercase">START DUTY</span>
                  </div>
                )}

                {product.familyId === 'running' && (
                  <div className="w-14 h-22 rounded-t-xs rounded-b-sm bg-[#0F2848] border border-[#173A5E] shadow-2xl flex flex-col items-center justify-between py-2 text-white px-1 relative">
                    <div className="absolute -top-1.5 w-6 h-1.5 bg-[#CBD5E1] rounded-t-xs"></div>
                    <span className="text-[7.5px] font-bold tracking-wider text-[#A8B4C2] font-mono">NEUTRACAP</span>
                    <div className="text-[7.5px] font-mono text-center font-bold">
                      {product.capacitanceDisplay}<br />
                      <span className="text-[#35C6E8]">{product.voltageDisplay}</span>
                    </div>
                    <span className="text-[6px] text-[#A8B4C2] font-mono uppercase">10,000h RUN</span>
                  </div>
                )}

                {product.familyId === 'green_filter' && (
                  <div className="w-14 h-22 rounded-t-xs rounded-b-sm bg-[#071426] border border-[#173A5E] shadow-2xl flex flex-col items-center justify-between py-2 text-white px-1 relative">
                    <div className="absolute -top-1.5 w-6 h-1.5 bg-[#CBD5E1] rounded-t-xs"></div>
                    <span className="text-[7.5px] font-bold tracking-wider text-[#A8B4C2] font-mono">NEUTRACAP</span>
                    <div className="text-[7.5px] font-mono text-center font-bold">
                      {product.capacitanceDisplay}<br />
                      <span className="text-[#35C6E8]">{product.voltageDisplay}</span>
                    </div>
                    <span className="text-[6px] text-[#A8B4C2] font-mono uppercase">HARMONIC</span>
                  </div>
                )}

                {product.familyId === 'dc_electrolytic' && (
                  <div className="w-16 h-24 rounded-t-xs rounded-b-sm bg-[#071426] border-2 border-[#35C6E8]/40 shadow-2xl flex flex-col items-center justify-between py-2 text-white px-1 relative">
                    <div className="absolute -top-1.5 w-8 h-1.5 bg-[#CBD5E1] rounded-t-xs"></div>
                    <span className="text-[8px] font-bold tracking-widest text-[#A8B4C2] font-mono">NEUTRACAP</span>
                    <div className="text-[7.5px] font-mono text-center font-bold">
                      {product.capacitanceDisplay}<br />
                      <span className="text-[#35C6E8]">{product.voltageDisplay}</span>
                    </div>
                    <span className="text-[6px] text-[#A8B4C2] font-mono uppercase">DC-ALU</span>
                  </div>
                )}
              </div>
            }
          />

          {/* 3D Factory Stock Verification Indicator */}
          <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#020712] border border-emerald-500/40 text-[10px] font-mono font-bold text-white shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block animate-pulse shadow-[0_0_6px_#10B981]"></span>
            <span className="text-emerald-400 font-bold">{product.availability === 'in_stock' ? 'In Stock' : 'Built to Order'}</span>
          </div>

          {/* Quick SKU tag with IBM Plex Mono High-Contrast 3D Technical Badge */}
          <div className="absolute top-2.5 right-2.5 z-10 text-[10px] font-mono font-bold tracking-wider text-slate-100 bg-[#020712] px-2.5 py-1 rounded-xl border border-white/15 group-hover:border-[#35C6E8]/70 shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]">
            <span className="text-slate-400 font-normal mr-1">SKU</span>
            <span className="text-white font-bold">{product.sku}</span>
          </div>
        </div>

        {/* 2. Standardized Category & Voltage Eyebrow */}
        <div className="mt-4 flex items-center justify-between text-[10.5px] font-mono font-bold uppercase tracking-[0.16em]">
          <span className="text-[#35C6E8]">{getCategoryLabel()}</span>
          <span className="text-slate-400 text-[10px] tracking-widest">{product.voltageDisplay}</span>
        </div>

        {/* 3. Product Name - Dominating, High Readability font-display */}
        <h4 
          onClick={() => onQuickView && onQuickView(product)}
          className="mt-1 text-base sm:text-lg font-black text-white font-display leading-snug line-clamp-1 group-hover:text-[#35C6E8] transition-colors cursor-pointer tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          {product.productName}
        </h4>

        {/* 4. High-Contrast 3D Inset Technical Metric Cavity (IBM Plex Mono) */}
        <div className="mt-4 grid grid-cols-2 gap-3 py-3 px-4 rounded-2xl bg-gradient-to-b from-[#040D1A] to-[#020610] border border-white/10 group-hover:border-[#35C6E8]/40 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9),0_2px_6px_rgba(0,0,0,0.4)] transition-all">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-[0.15em] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35C6E8] shadow-[0_0_4px_#35C6E8]"></span>
              <span>Capacitance</span>
            </div>
            <div className="font-mono font-black text-white text-base sm:text-lg mt-1 tabular-nums tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
              {product.capacitanceDisplay}
            </div>
          </div>
          <div className="border-l border-white/10 pl-3">
            <div className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-[0.15em] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35C6E8] shadow-[0_0_4px_#35C6E8]"></span>
              <span>Voltage Rating</span>
            </div>
            <div className="font-mono font-black text-[#35C6E8] text-sm sm:text-base mt-1 tabular-nums tracking-tight drop-shadow-[0_0_8px_rgba(53,198,232,0.4)]">
              {product.voltageDisplay}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Pricing & 3D Tactile Actions */}
      <div className="mt-4 space-y-3.5">
        {/* Price & Commercial Label */}
        <div className="flex items-baseline justify-between">
          <div>
            {product.pricing.launchPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black font-display text-white tabular-nums tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  ₹{product.pricing.launchPrice}
                </span>
                {product.pricing.mrp && (
                  <span className="text-xs text-slate-400 font-mono line-through tabular-nums">
                    ₹{product.pricing.mrp}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Price on Request
              </span>
            )}
            <div className="text-[11px] text-slate-400 font-mono mt-0.5 tracking-tight">
              MOQ: <span className="text-white font-bold">{product.pricing.minOrderQuantity || 10} Units</span> · Ex-Factory
            </div>
          </div>

          {product.pricing.effectiveLaunchReduction ? (
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-emerald-300 bg-gradient-to-r from-emerald-950/80 to-[#062417] px-2.5 py-1 rounded-lg border border-emerald-400/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
              Launch Tier
            </span>
          ) : null}
        </div>

        {/* 6. Tactile 3D Actions Cluster (Details -> Cart -> Enquire) */}
        <div className="flex items-center gap-2 pt-1">
          {/* Secondary Action: Quick Details */}
          <button
            id={`details-btn-${product.id}`}
            onClick={() => onQuickView && onQuickView(product)}
            className="flex-1 py-3 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-mono font-bold hover:text-white border border-white/15 hover:border-[#35C6E8]/70 shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-[0_0_15px_rgba(53,198,232,0.3)] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            title="Inspect full technical specification"
          >
            <Eye className="w-3.5 h-3.5 text-[#35C6E8]" />
            <span>Details</span>
          </button>

          {/* Tertiary Action: Add to Enquiry Cart */}
          {onAddToCart && (
            <button
              id={`add-cart-btn-${product.id}`}
              onClick={handleAdd}
              className={`p-3 rounded-xl border transition-all cursor-pointer active:scale-95 ${
                justAdded 
                  ? 'bg-[#10B981] text-white border-emerald-300 shadow-[0_0_15px_#10B981]' 
                  : 'bg-white/5 hover:bg-white/10 text-white border-white/15 hover:border-[#35C6E8]/70 shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)]'
              }`}
              title={justAdded ? 'Added to Cart' : 'Add to Enquiry Cart'}
              aria-label="Add to Enquiry Cart"
            >
              {justAdded ? (
                <Check className="w-4 h-4 text-white animate-scale-in" />
              ) : (
                <ShoppingBag className="w-4 h-4 text-[#35C6E8]" />
              )}
            </button>
          )}

          {/* Primary Action: Direct Enquire */}
          <button
            id={`enquire-btn-${product.id}`}
            onClick={() => onEnquire && onEnquire(product)}
            className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-[#173A5E] via-[#0E7490] to-[#173A5E] hover:from-[#0E7490] hover:to-[#35C6E8] text-white text-xs font-mono font-black uppercase tracking-wider border border-[#35C6E8]/70 shadow-[0_6px_20px_rgba(14,116,144,0.4),inset_0_1px_2px_rgba(255,255,255,0.35)] hover:shadow-[0_0_25px_rgba(53,198,232,0.6)] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#35C6E8] filter drop-shadow-[0_0_4px_#35C6E8]" />
            <span>Enquire</span>
          </button>
        </div>
      </div>
    </div>
  );
};
