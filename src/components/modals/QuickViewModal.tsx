/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * QUICK VIEW SPECIFICATION MODAL — ENGINEERING INSPECTOR V4
 * - Visual System: Deep Navy #071426, Midnight Blue #0B1F36, Steel Blue #173A5E, Electric Cyan #35C6E8
 * - Dynamic data-driven voltage selector: Reads all verified voltage variants for the capacitance
 * - Product Inspection Architecture (4 Interactive Modes: Front View, Terminal, Spec Label, Dimension Schematic)
 * - Layered dark surfaces, subtle glass highlights, high-contrast editorial hierarchy
 * - Direct Actions: Add to Enquiry Cart, Request Formal Quote, WhatsApp Direct (+91 9953239674)
 */

import React, { useState, useEffect, useMemo } from 'react';
import { CapacitorVariant } from '../../types';
import { 
  X, 
  Layers, 
  Zap, 
  ShieldCheck, 
  CheckCircle2,
  FileText,
  Activity,
  Maximize2,
  Cpu,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Eye,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { CANONICAL_WHATSAPP_NUMBER } from '../../data/siteFacts';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { FullScreenImageViewer } from './FullScreenImageViewer';

export interface QuickViewModalProps {
  product: CapacitorVariant | null;
  allProducts?: CapacitorVariant[];
  isOpen: boolean;
  onClose: () => void;
  onEnquire: (product: CapacitorVariant) => void;
  onRequestQuote: (product: CapacitorVariant) => void;
  onAddToCart?: (product: CapacitorVariant, quantity: number) => void;
}

type ViewAngle = 'front' | 'terminal' | 'label' | 'dimension';

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  allProducts = [],
  isOpen,
  onClose,
  onEnquire,
  onRequestQuote,
  onAddToCart,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<CapacitorVariant | null>(product);
  const [activeAngle, setActiveAngle] = useState<ViewAngle>('front');
  const [quantity, setQuantity] = useState<number>(10);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);
  const [isFullScreenViewerOpen, setIsFullScreenViewerOpen] = useState<boolean>(false);

  // Sync state whenever active product prop changes
  useEffect(() => {
    setSelectedVariant(product);
    setActiveAngle('front');
    setImgError(false);
    setIsFullScreenViewerOpen(false);
    if (product?.pricing.minOrderQuantity) {
      setQuantity(product.pricing.minOrderQuantity);
    } else {
      setQuantity(10);
    }
  }, [product]);

  const currentProduct = selectedVariant || product;

  // Resolve all available verified voltage variants for this specific capacitance and family
  const availableVoltages = useMemo(() => {
    if (!currentProduct || allProducts.length === 0) {
      return currentProduct ? [currentProduct] : [];
    }
    const matched = allProducts.filter(
      (p) =>
        p.familyId === currentProduct.familyId &&
        p.capacitanceDisplay === currentProduct.capacitanceDisplay
    );
    return matched.length > 0 ? matched : [currentProduct];
  }, [currentProduct, allProducts]);

  const getFamilyLabel = (familyId: string) => {
    switch (familyId) {
      case 'starting':
        return 'MOTOR STARTING LINE';
      case 'running':
        return 'CONTINUOUS RUNNING LINE';
      case 'green_filter':
        return 'HARMONIC GREEN FILTER LINE';
      case 'dc_electrolytic':
        return 'DC ALUMINIUM ELECTROLYTIC LINE';
      default:
        return 'INDUSTRIAL CAPACITOR LINE';
    }
  };

  if (!isOpen || !currentProduct) return null;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(currentProduct, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1600);
    }
  };

  const handleWhatsAppDirect = () => {
    const message = `Hello NeutraCap Factory Desk,\n\nI am interested in:\n\n${currentProduct.productName}\n\nSKU: ${currentProduct.sku}\nCapacitance: ${currentProduct.capacitanceDisplay}\nVoltage: ${currentProduct.voltageDisplay}\nQuantity: ${quantity} units\n\nPlease share availability, commercial terms and dispatch details.`;
    const text = encodeURIComponent(message);
    window.open(`https://wa.me/${CANONICAL_WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div 
      id="quick-view-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#071426]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        id="quick-view-dialog"
        className="w-full max-w-4xl bg-[#08101E] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-[#173A5E]/80 overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150 relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Cyan Highlight Hairline */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#35C6E8] to-transparent"></div>

        {/* 1. Engineering Inspector Header */}
        <div className="p-4 sm:p-5 px-5 sm:px-7 bg-[#071426] flex items-center justify-between border-b border-[#173A5E]/80 shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#173A5E] to-[#0B1F36] flex items-center justify-center font-bold text-[#35C6E8] border border-[#35C6E8]/40 shadow-md shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-slate-400">
                <span className="text-[#35C6E8] font-bold uppercase">{getFamilyLabel(currentProduct.familyId)}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>SKU: <strong className="text-white">{currentProduct.sku}</strong></span>
              </div>
              <h3 className="text-base sm:text-xl font-bold font-display text-white mt-0.5 truncate">
                {currentProduct.productName}
              </h3>
            </div>
          </div>

          <button
            id="close-quick-view-btn"
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-xl bg-[#0B1F36] hover:bg-[#173A5E] text-slate-400 hover:text-white border border-[#173A5E] transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer shrink-0 ml-3"
            aria-label="Close Specification Inspector"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body with Layered Depth */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 bg-gradient-to-b from-[#08101E] to-[#040C18] font-sans">
          
          {/* Top Stage: Product Image Architecture & Inspection Angle Switcher */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#0B192C]/90 rounded-2xl border border-white/10 p-4 sm:p-6 shadow-xl">
            {/* View Stage (7 cols) */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-3">
              {/* Active Angle Display Canvas */}
              <div className="relative w-full aspect-16/10 rounded-xl bg-[#060A14] border border-[#173A5E]/80 p-4 sm:p-6 flex flex-col items-center justify-center overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-industrial-grid-dark opacity-30 pointer-events-none"></div>

                {/* View 1: FRONT ELEVATION */}
                {activeAngle === 'front' && (
                  (currentProduct.primaryImage || currentProduct.image) && !imgError ? (
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center animate-in fade-in duration-200 p-2">
                      <img
                        src={currentProduct.primaryImage || currentProduct.image}
                        alt={`${currentProduct.productName} - Front Elevation`}
                        onClick={() => setIsFullScreenViewerOpen(true)}
                        loading="lazy"
                        decoding="async"
                        className="max-h-[190px] sm:max-h-[220px] w-auto max-w-full object-contain rounded-lg shadow-xl cursor-pointer hover:scale-103 transition-transform"
                        referrerPolicy="no-referrer"
                        onError={() => setImgError(true)}
                      />
                      <span className="text-[10px] font-mono text-[#35C6E8] mt-2 tracking-wider">FRONT ELEVATION SPECIMEN (CLICK TO EXPAND)</span>
                    </div>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center animate-in fade-in duration-200">
                      <div className="flex gap-2 -mb-1 z-20">
                        <div className="w-2.5 h-4 bg-[#CBD5E1] rounded-t-xs shadow-xs"></div>
                        <div className="w-2.5 h-4 bg-[#CBD5E1] rounded-t-xs shadow-xs"></div>
                      </div>
                      <div className="w-22 sm:w-24 h-34 sm:h-38 rounded-t-md rounded-b-xl bg-gradient-to-r from-[#071426] via-[#173A5E] to-[#071426] border-2 border-[#35C6E8]/60 shadow-2xl flex flex-col items-center justify-between py-3.5 sm:py-4 text-white px-2">
                        <span className="text-[10px] font-bold tracking-widest text-[#A8B4C2] font-mono">NEUTRACAP</span>
                        <div className="text-center font-mono">
                          <div className="text-xs sm:text-sm font-bold text-white">{currentProduct.capacitanceDisplay}</div>
                          <div className="text-[11px] sm:text-xs text-[#35C6E8] font-bold mt-0.5">{currentProduct.voltageDisplay}</div>
                          <div className="text-[7.5px] text-[#A8B4C2] mt-1 uppercase">{currentProduct.dutyCycle}</div>
                        </div>
                        <div className="w-full flex justify-between px-1 text-[7px] text-[#16A34A] font-mono border-t border-[#173A5E] pt-1">
                          <span>100% TESTED</span>
                          <span>{currentProduct.tolerance}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#A8B4C2] mt-2 tracking-wider">FRONT ELEVATION VIEW</span>
                    </div>
                  )
                )}

                {/* View 2: TERMINAL / LEAD VIEW */}
                {activeAngle === 'terminal' && (
                  <div className="relative z-10 flex flex-col items-center text-center space-y-2 animate-in fade-in duration-200">
                    <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-full bg-[#0B1F36] border-2 border-[#35C6E8] flex items-center justify-center p-3 shadow-xl relative">
                      <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono font-bold text-[#35C6E8]">
                        TOP
                      </div>
                      <div className="absolute top-4 left-5 sm:left-6 w-3 h-5 bg-[#CBD5E1] border border-slate-600 rounded-xs shadow-xs"></div>
                      <div className="absolute top-4 right-5 sm:right-6 w-3 h-5 bg-[#CBD5E1] border border-slate-600 rounded-xs shadow-xs"></div>
                    </div>
                    <div className="text-xs font-mono font-bold text-white">{currentProduct.terminalType}</div>
                    <span className="text-[10px] font-sans text-slate-400">Precision Industrial Connection Configuration</span>
                  </div>
                )}

                {/* View 3: SPECIFICATION LABEL */}
                {activeAngle === 'label' && (
                  <div className="relative z-10 w-full max-w-sm bg-[#071426] border border-[#35C6E8]/40 rounded-lg p-3 text-left font-mono text-xs space-y-1 text-white shadow-xl animate-in fade-in duration-200">
                    <div className="flex justify-between border-b border-white/10 pb-1 text-[#35C6E8] font-bold">
                      <span>NEUTRACAP INDUSTRIAL</span>
                      <span>MADE IN INDIA</span>
                    </div>
                    <div className="pt-1 text-[10px] sm:text-[11px] grid grid-cols-2 gap-1 text-[#A8B4C2]">
                      <div>SKU: <strong className="text-white">{currentProduct.sku}</strong></div>
                      <div>RATING: <strong className="text-white">{currentProduct.capacitanceDisplay}</strong></div>
                      <div>VOLTAGE: <strong className="text-white">{currentProduct.voltageDisplay}</strong></div>
                      <div>TOLERANCE: <strong className="text-white">{currentProduct.tolerance}</strong></div>
                      <div>TEMP: <strong className="text-white">{currentProduct.temperatureRating}</strong></div>
                      <div>FREQ: <strong className="text-white">{currentProduct.frequencyRating || '50/60 Hz'}</strong></div>
                    </div>
                    <div className="border-t border-white/10 pt-1 text-[9px] text-[#16A34A] flex justify-between">
                      <span>ROUTINE DIELECTRIC TESTED</span>
                      <span>IEC 60252 COMPLIANT</span>
                    </div>
                  </div>
                )}

                {/* View 4: DIMENSION SCHEMATIC */}
                {activeAngle === 'dimension' && (
                  <div className="relative z-10 flex flex-col items-center text-center space-y-2 animate-in fade-in duration-200">
                    <div className="relative border-2 border-dashed border-[#35C6E8]/60 rounded-md p-3 sm:p-4 bg-[#0B1F36]/80 flex flex-col items-center">
                      <div className="text-[10px] font-mono text-[#35C6E8] mb-1">
                        ← Diameter: Ø {currentProduct.dimensions.diameterMm} mm →
                      </div>
                      <div className="w-16 sm:w-18 h-22 sm:h-26 bg-[#173A5E] rounded-sm flex items-center justify-center text-xs font-mono font-bold text-white">
                        CANISTER
                      </div>
                      <div className="text-[10px] font-mono text-[#35C6E8] mt-1">
                        Height: {currentProduct.dimensions.heightMm} mm
                      </div>
                    </div>
                    <span className="text-[10px] font-sans text-slate-400">Mounting: {currentProduct.dimensions.mountingType || 'Standard Base'}</span>
                  </div>
                )}
              </div>

              {/* 4 Interactive View Switcher Tabs */}
              <div className="grid grid-cols-4 gap-2 pt-1 font-sans">
                {[
                  { id: 'front', label: 'Front View' },
                  { id: 'terminal', label: 'Terminal' },
                  { id: 'label', label: 'Spec Label' },
                  { id: 'dimension', label: 'Dimensions' },
                ].map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setActiveAngle(v.id as ViewAngle)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center truncate cursor-pointer ${
                      activeAngle === v.id
                        ? 'bg-[#173A5E] text-white border border-[#35C6E8] shadow-sm'
                        : 'bg-[#060A14] text-slate-400 hover:text-white border border-[#173A5E]/80'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ratings & Procurement Desk (5 cols) */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs uppercase font-mono font-bold text-[#35C6E8] tracking-wider mb-2.5">
                  Verified Ratings
                </div>
                <div className="space-y-2 text-xs font-sans">
                  <div className="p-2.5 rounded-xl bg-[#060A14] border border-white/10 flex justify-between items-center">
                    <span className="text-slate-400">Capacitance</span>
                    <span className="font-mono font-bold text-white text-sm">{currentProduct.capacitanceDisplay}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#060A14] border border-white/10 flex justify-between items-center">
                    <span className="text-slate-400">Operating Voltage</span>
                    <span className="font-mono font-bold text-[#35C6E8] text-sm">{currentProduct.voltageDisplay}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#060A14] border border-white/10 flex justify-between items-center">
                    <span className="text-slate-400">Tolerance</span>
                    <span className="font-mono font-bold text-white">{currentProduct.tolerance}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#060A14] border border-white/10 flex justify-between items-center">
                    <span className="text-slate-400">Dielectric Film</span>
                    <span className="font-sans font-semibold text-white truncate max-w-[140px]" title={currentProduct.construction}>
                      {currentProduct.construction.split(' ')[0]} {currentProduct.construction.split(' ')[1] || ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing & Stepper Unit */}
              <div className="p-4 rounded-2xl bg-[#060A14] border border-white/10 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-sans">Verified Factory Launch Price:</span>
                    {currentProduct.pricing.launchPrice ? (
                      <span className="text-2xl font-mono font-bold text-white">
                        ₹{currentProduct.pricing.launchPrice}
                      </span>
                    ) : (
                      <span className="text-sm font-sans font-bold text-white">Price on Request</span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-md border border-[#10B981]/30 font-bold">
                    100% SCREENED
                  </span>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-400 font-sans">Order Quantity:</span>
                  <div className="flex items-center gap-2 bg-[#0B1F36] rounded-xl border border-white/10 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 5))}
                      className="w-7 h-7 rounded-lg bg-[#071426] hover:bg-[#173A5E] text-white flex items-center justify-center transition-colors cursor-pointer"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => {
                        const v = parseInt(e.target.value, 10);
                        if (!isNaN(v) && v > 0) setQuantity(v);
                      }}
                      className="w-12 text-center text-xs font-mono font-bold text-white bg-transparent focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 5)}
                      className="w-7 h-7 rounded-lg bg-[#071426] hover:bg-[#173A5E] text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Add to Enquiry Cart Action */}
                <button
                  id="modal-add-cart-primary-btn"
                  onClick={handleAddToCart}
                  className={`w-full py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                    isAdded
                      ? 'bg-[#10B981] text-white'
                      : 'btn-tactile-primary text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added ({quantity} Units)</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-white" />
                      <span>Add to Enquiry Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Verified Voltage Variations (If multiple) */}
          {availableVoltages.length > 1 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0B192C]/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase font-sans font-bold text-white tracking-wider flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#35C6E8]" />
                  <span>Verified Voltage Variants ({availableVoltages.length} Options)</span>
                </div>
                <span className="text-[11px] font-mono text-[#35C6E8]">
                  Active: {currentProduct.voltageDisplay}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-0.5">
                {availableVoltages.map((variant) => {
                  const isSelected = variant.id === currentProduct.id;
                  return (
                    <button
                      key={variant.id}
                      id={`voltage-btn-${variant.id}`}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#173A5E] text-white border border-[#35C6E8] shadow-md ring-1 ring-[#35C6E8]/40'
                          : 'bg-[#060A14] text-slate-300 hover:text-white border border-white/10 hover:bg-[#0B1F36]'
                      }`}
                    >
                      <span>{variant.voltageDisplay}</span>
                      <span className={`text-[11px] font-mono ${isSelected ? 'text-[#35C6E8]' : 'text-slate-500'}`}>
                        ₹{variant.pricing.launchPrice}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Structured Electrical & Mechanical Specifications */}
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#0B192C]/80 shadow-md">
            <div className="px-5 py-3 bg-[#071426] border-b border-white/10 text-xs font-sans font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#35C6E8]" />
                <span>Electrical &amp; Mechanical Specifications</span>
              </div>
              <span className="text-[11px] font-mono text-[#35C6E8]">{currentProduct.sku}</span>
            </div>
            <div className="divide-y divide-white/5 text-xs font-sans">
              <div className="px-5 py-3 flex justify-between bg-[#0B192C]/40">
                <span className="text-slate-400">Dimensions (Ø × H)</span>
                <span className="font-mono font-semibold text-white">Ø {currentProduct.dimensions.diameterMm} mm × {currentProduct.dimensions.heightMm} mm</span>
              </div>
              <div className="px-5 py-3 flex justify-between bg-[#071426]/40">
                <span className="text-slate-400">Mounting Style</span>
                <span className="font-semibold text-white">{currentProduct.dimensions.mountingType || 'Standard Plain Bottom'}</span>
              </div>
              <div className="px-5 py-3 flex justify-between bg-[#0B192C]/40">
                <span className="text-slate-400">Canister &amp; Body Material</span>
                <span className="font-semibold text-white">{currentProduct.bodyMaterial}</span>
              </div>
              <div className="px-5 py-3 flex justify-between bg-[#071426]/40">
                <span className="text-slate-400">Dielectric Construction</span>
                <span className="font-semibold text-white">{currentProduct.construction}</span>
              </div>
              <div className="px-5 py-3 flex justify-between bg-[#0B192C]/40">
                <span className="text-slate-400">Terminal Termination</span>
                <span className="font-semibold text-white">{currentProduct.terminalType}</span>
              </div>
              <div className="px-5 py-3 flex justify-between bg-[#071426]/40">
                <span className="text-slate-400">Temperature Rating</span>
                <span className="font-mono font-semibold text-white">{currentProduct.temperatureRating}</span>
              </div>
            </div>
          </div>

          {/* Sticky / Dedicated Commercial Action Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#060A14] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="text-xs font-sans text-slate-400 font-medium">Commercial Terms:</div>
              <div className="text-xs font-sans text-slate-300 mt-0.5">
                MOQ: <strong className="text-white font-mono">{currentProduct.pricing.minOrderQuantity || 10} Units</strong> · Ex-Factory Dispatch Across India
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                id="modal-request-quote-btn"
                onClick={() => {
                  onClose();
                  onRequestQuote(currentProduct);
                }}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl btn-tactile-dark text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer"
              >
                Request Formal Quote
              </button>

              <button
                id="modal-whatsapp-direct-btn"
                onClick={handleWhatsAppDirect}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-sans font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                <WhatsAppIcon className="w-4.5 h-4.5 text-white" />
                <span>WhatsApp Desk</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Full-Screen Lightbox Image Viewer */}
      <FullScreenImageViewer
        isOpen={isFullScreenViewerOpen}
        product={currentProduct}
        onClose={() => setIsFullScreenViewerOpen(false)}
      />
    </div>
  );
};
