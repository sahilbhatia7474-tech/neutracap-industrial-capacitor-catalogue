/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * REUSABLE PRODUCT CARD COMPONENT (PREMIUM CATALOGUE V3)
 * - Visual System: Ice White #F4F7FA, Deep Navy #071426, Steel Blue #173A5E, Electric Cyan #35C6E8
 * - Typography: Space Grotesk names, IBM Plex Mono specifications & pricing, Plus Jakarta Sans body/buttons
 * - Tactile Actions: Details | Add to Cart | Enquire
 * - Status Green (#16A34A) reserved strictly for verified factory stock state
 */

import React, { useState } from 'react';
import { CapacitorVariant } from '../../types';
import { Eye, MessageSquare, Plus, Check, ShoppingBag } from 'lucide-react';

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
      className="card-tactile group flex flex-col justify-between rounded-2xl p-5 bg-[#0B1F36]/90 border border-[#173A5E] hover:border-[#35C6E8]/70 hover:shadow-[0_12px_32px_rgba(7,20,38,0.7),0_0_20px_rgba(53,198,232,0.18)] hover:-translate-y-1.5 transition-all duration-300 text-white relative overflow-hidden backdrop-blur-md"
    >
      {/* Subtle top specular hairline */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#35C6E8]/40 to-transparent group-hover:via-[#35C6E8] transition-all"></div>

      <div>
        {/* 1. Image Slot / Elevated 3D Product Photography Studio Stage */}
        <div 
          onClick={() => onQuickView && onQuickView(product)}
          className="product-studio-stage relative w-full aspect-4/3 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-[#071426] border border-[#173A5E] group-hover:border-[#35C6E8]/50 transition-all duration-300 shadow-inner"
        >
          {/* Subtle Stage Background Grid & Studio Spotlight */}
          <div className="absolute inset-0 bg-industrial-grid-dark opacity-35 pointer-events-none"></div>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-20 bg-[#35C6E8]/15 rounded-full blur-xl pointer-events-none"></div>

          {/* Physical Contact Shadow Grounding the Component */}
          <div className="product-contact-shadow"></div>

          {/* Realistic Render / Anodized Capacitor Silhouette or Approved Product Photography */}
          {(product.primaryImage || product.image) && !imgError ? (
            <div className="relative z-10 w-full h-full flex items-center justify-center p-0.5">
              <img
                src={product.primaryImage || product.image}
                alt={`${product.productName} - NeutraCap`}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-108 product-3d-shadow"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-108 product-3d-shadow">
              {product.familyId === 'starting' && (
                <div className="w-14 h-22 rounded-t-xs rounded-b-sm bg-[#071426] border border-[#173A5E] shadow-xl flex flex-col items-center justify-between py-2 text-white px-1 relative">
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
                <div className="w-14 h-22 rounded-t-xs rounded-b-sm bg-[#0F2848] border border-[#173A5E] shadow-xl flex flex-col items-center justify-between py-2 text-white px-1 relative">
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
                <div className="w-14 h-22 rounded-t-xs rounded-b-sm bg-[#071426] border border-[#173A5E] shadow-xl flex flex-col items-center justify-between py-2 text-white px-1 relative">
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
          )}

          {/* Factory Stock Verification Indicator */}
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#071426]/95 border border-[#173A5E] text-[10px] font-mono text-white shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block animate-pulse shadow-[0_0_6px_#10B981]"></span>
            <span className="text-emerald-400 font-semibold">{product.availability === 'in_stock' ? 'In Stock' : 'Built to Order'}</span>
          </div>

          {/* Quick SKU tag */}
          <div className="absolute top-2 right-2 z-10 text-[9px] font-mono text-slate-300 bg-[#071426]/90 px-1.5 py-0.5 rounded border border-[#173A5E] shadow-xs">
            {product.sku}
          </div>
        </div>

        {/* 2. Standardized Category Label */}
        <div className="mt-4 text-[11px] font-mono font-bold uppercase tracking-wider text-[#35C6E8]">
          {getCategoryLabel()}
        </div>

        {/* 3. Product Name - Dominating, High Readability font-display */}
        <h4 
          onClick={() => onQuickView && onQuickView(product)}
          className="mt-1 text-base sm:text-lg font-bold text-white font-display leading-snug line-clamp-1 group-hover:text-[#35C6E8] transition-colors cursor-pointer"
        >
          {product.productName}
        </h4>

        {/* 4. Technical Metric Row with Tabular Figures */}
        <div className="mt-3.5 grid grid-cols-2 gap-2 py-2.5 border-y border-white/10 text-xs">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold font-mono">Capacitance</div>
            <div className="font-mono font-bold text-white text-sm sm:text-base mt-0.5 tabular-nums">
              {product.capacitanceDisplay}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold font-mono">Voltage</div>
            <div className="font-mono font-bold text-[#35C6E8] text-sm sm:text-base mt-0.5 tabular-nums">
              {product.voltageDisplay}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Pricing & Tactile Actions */}
      <div className="mt-4 space-y-3">
        {/* Price & Commercial Label */}
        <div className="flex items-baseline justify-between">
          <div>
            {product.pricing.launchPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-lg sm:text-xl font-bold font-display text-white tabular-nums tracking-tight">
                  ₹{product.pricing.launchPrice}
                </span>
                {product.pricing.mrp && (
                  <span className="text-xs text-slate-400 font-sans line-through tabular-nums">
                    ₹{product.pricing.mrp}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-sm font-sans font-semibold text-slate-400">
                Price on Request
              </span>
            )}
            <div className="text-xs text-slate-400 font-sans mt-0.5">
              MOQ: {product.pricing.minOrderQuantity || 10} Units · Ex-Factory
            </div>
          </div>

          {product.pricing.effectiveLaunchReduction ? (
            <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-[#10B981]/15 px-2 py-0.5 rounded border border-[#10B981]/30">
              Launch Tier
            </span>
          ) : null}
        </div>

        {/* 6. Tactile Actions Cluster (Clear Priority: Details -> Cart -> Enquire) */}
        <div className="flex items-center gap-2 pt-1">
          {/* Secondary Action: Quick Details */}
          <button
            id={`details-btn-${product.id}`}
            onClick={() => onQuickView && onQuickView(product)}
            className="flex-1 btn-tactile-dark flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-slate-200 text-xs font-sans font-semibold hover:text-white border border-white/10 hover:border-[#35C6E8]/60 cursor-pointer"
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
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                justAdded 
                  ? 'bg-[#10B981] text-white border-[#10B981] shadow-[0_0_12px_#10B981]' 
                  : 'bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-[#35C6E8]/50'
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
            className="flex-1 btn-tactile-primary flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#35C6E8]" />
            <span>Enquire</span>
          </button>
        </div>
      </div>
    </div>
  );
};
