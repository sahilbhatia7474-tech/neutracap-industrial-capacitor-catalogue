/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ENQUIRY CART DRAWER COMPONENT (PREMIUM INDUSTRIAL COMMERCE PASS)
 * - Visual System: Deep Navy #071426, Midnight Blue #0B1F36, Steel Blue #173A5E, Electric Cyan #35C6E8
 * - Typography: Space Grotesk (Drawer Heading), Inter (UI, Body, Controls, Stepper), IBM Plex Mono (SKU, Specs only)
 * - Direct Actions:
 *   1. Request Formal Quotation (Modal Transmission)
 *   2. WhatsApp Direct Enquiry (Formatted itemized list to +91 9953239674)
 */

import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  FileText, 
  ShoppingBag,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { EnquiryCartItem, CapacitorVariant } from '../../types';
import { CANONICAL_WHATSAPP_NUMBER } from '../../data/siteFacts';
import { WhatsAppIcon } from '../common/WhatsAppIcon';

export interface EnquiryCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items?: EnquiryCartItem[];
  cartItems?: EnquiryCartItem[];
  onUpdateQuantity?: (id: string, newQuantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onClearCart?: () => void;
  onRequestQuote?: (items: EnquiryCartItem[]) => void;
  onCheckoutFormalQuote?: (items: EnquiryCartItem[]) => void;
  onCheckoutWhatsApp?: (items: EnquiryCartItem[]) => void;
  onSelectProduct?: (product: CapacitorVariant) => void;
  onExploreCatalogue?: () => void;
}

export const EnquiryCartDrawer: React.FC<EnquiryCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onRequestQuote,
  onCheckoutFormalQuote,
  onCheckoutWhatsApp,
  onSelectProduct,
  onExploreCatalogue,
}) => {
  if (!isOpen) return null;

  const currentItems = items || cartItems || [];
  const totalQuantity = currentItems.reduce((acc, item) => acc + (item?.quantity || 0), 0);
  const totalEstimatedAmount = currentItems.reduce((acc, item) => {
    const price = item?.product?.pricing?.launchPrice || item?.product?.pricing?.basePrice || 0;
    return acc + (price * (item?.quantity || 0));
  }, 0);

  const handleRequestQuoteAction = () => {
    onClose();
    if (onCheckoutFormalQuote) {
      onCheckoutFormalQuote(currentItems);
    } else if (onRequestQuote) {
      onRequestQuote(currentItems);
    }
  };

  const handleWhatsAppAction = () => {
    if (currentItems.length === 0) return;

    if (onCheckoutWhatsApp) {
      onCheckoutWhatsApp(currentItems);
      return;
    }

    // Contextual Cart Message Format per Spec:
    let message = `Hello NeutraCap Factory Desk,\n\nI would like to enquire about the following products:\n\n`;
    
    currentItems.forEach((item, index) => {
      message += `${index + 1}. ${item.product.productName}\n   - SKU: ${item.product.sku}\n   - Capacitance: ${item.product.capacitanceDisplay}\n   - Voltage: ${item.product.voltageDisplay}\n   - Quantity: ${item.quantity} units\n\n`;
    });

    message += `Please share availability and commercial details.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${CANONICAL_WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  return (
    <div 
      id="enquiry-cart-backdrop"
      className="fixed inset-0 z-50 bg-[#071426]/80 backdrop-blur-xs flex justify-end animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        id="enquiry-cart-drawer"
        className="w-full max-w-md md:max-w-lg bg-[#0B1F36] text-white h-full flex flex-col shadow-2xl border-l border-[#173A5E] animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Stripe */}
        <div className="h-0.5 w-full bg-gradient-to-r from-[#173A5E] via-[#35C6E8] to-[#173A5E]"></div>

        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#071426] border-b border-[#173A5E] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B1F36] text-[#35C6E8] flex items-center justify-center border border-[#173A5E] shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-display text-white tracking-tight">
                  ENQUIRY CART
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#173A5E] text-[#35C6E8] border border-[#35C6E8]/30">
                  {currentItems.length} {currentItems.length === 1 ? 'Product' : 'Products'}
                </span>
              </div>
              <p className="text-xs text-[#A8B4C2] font-sans mt-0.5">
                B2B Factory Dispatch &amp; Specification Sourcing
              </p>
            </div>
          </div>

          <button
            id="close-enquiry-cart-btn"
            onClick={onClose}
            className="p-2 rounded-lg bg-[#0B1F36] hover:bg-[#173A5E] text-[#A8B4C2] hover:text-white border border-[#173A5E] transition-colors"
            aria-label="Close enquiry cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 font-sans">
          {currentItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#071426] text-[#A8B4C2] flex items-center justify-center border border-[#173A5E]">
                <ShoppingBag className="w-8 h-8 text-[#35C6E8]/60" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-white font-sans">Your Enquiry Cart is Empty</h4>
                <p className="text-xs text-[#A8B4C2] mt-1 max-w-xs leading-relaxed font-sans">
                  Browse our 490 canonical baseline variants and add items to request multi-product quotations.
                </p>
              </div>
              {onExploreCatalogue && (
                <button
                  onClick={() => {
                    onClose();
                    onExploreCatalogue();
                  }}
                  className="px-5 py-2.5 rounded-xl btn-tactile-primary text-white text-xs font-semibold uppercase tracking-wider font-sans"
                >
                  Explore Catalogue
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-[#173A5E]/60 text-xs font-sans text-[#A8B4C2]">
                <span className="font-semibold">SELECTED SPECIFICATIONS</span>
                {onClearCart && (
                  <button
                    onClick={onClearCart}
                    className="text-[#D98A4A] hover:underline flex items-center gap-1 text-[11px] font-sans"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {currentItems.map((item) => {
                const itemId = item.id || item.product?.id;
                return (
                  <div
                    key={itemId}
                    className="p-4 rounded-xl bg-[#071426] border border-[#173A5E] hover:border-[#35C6E8]/40 transition-colors space-y-3 shadow-xs"
                  >
                    {/* Top Item Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div 
                          onClick={() => {
                            if (onSelectProduct && item.product) {
                              onClose();
                              onSelectProduct(item.product);
                            }
                          }}
                          className="text-sm font-semibold text-white hover:text-[#35C6E8] cursor-pointer transition-colors font-sans"
                        >
                          {item.product.productName}
                        </div>
                        <div className="text-[11px] font-mono text-[#A8B4C2] mt-1 flex flex-wrap items-center gap-2">
                          <span>SKU: <strong className="text-[#35C6E8]">{item.product.sku}</strong></span>
                          <span>·</span>
                          <span>{item.product.capacitanceDisplay}</span>
                          <span>·</span>
                          <span>{item.product.voltageDisplay}</span>
                        </div>
                      </div>

                      {onRemoveItem && (
                        <button
                          onClick={() => onRemoveItem(itemId)}
                          className="p-1.5 rounded-lg text-[#A8B4C2] hover:text-red-400 hover:bg-[#0B1F36] transition-colors"
                          title="Remove variant"
                          aria-label="Remove variant"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Pricing & Stepper Row */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#173A5E]/60">
                      <div>
                        {item.product.pricing.launchPrice ? (
                          <div className="font-sans">
                            <span className="text-sm font-bold text-white">₹{item.product.pricing.launchPrice}</span>
                            <span className="text-[10px] text-[#A8B4C2] ml-1">/ unit</span>
                          </div>
                        ) : (
                          <span className="text-xs font-sans text-[#35C6E8] font-semibold">Price on Request</span>
                        )}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-[#0B1F36] rounded-lg border border-[#173A5E] p-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity && onUpdateQuantity(itemId, Math.max(1, item.quantity - 5))}
                          className="w-7 h-7 rounded bg-[#071426] hover:bg-[#173A5E] text-white flex items-center justify-center transition-colors disabled:opacity-40"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val) && val > 0 && onUpdateQuantity) {
                              onUpdateQuantity(itemId, val);
                            }
                          }}
                          className="w-12 text-center text-xs font-mono font-bold text-white bg-transparent focus:outline-none"
                        />

                        <button
                          type="button"
                          onClick={() => onUpdateQuantity && onUpdateQuantity(itemId, item.quantity + 5)}
                          className="w-7 h-7 rounded bg-[#071426] hover:bg-[#173A5E] text-white flex items-center justify-center transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Footer Summary & CTAs */}
        {currentItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#071426] border-t border-[#173A5E] space-y-3 font-sans">
            {/* Totals Breakdown */}
            <div className="space-y-1.5 text-xs font-sans pb-2 border-b border-[#173A5E]">
              <div className="flex items-center justify-between text-[#A8B4C2]">
                <span>Total Line Items:</span>
                <span className="font-mono font-bold text-white">{currentItems.length} Products</span>
              </div>
              <div className="flex items-center justify-between text-[#A8B4C2]">
                <span>Total Requested Units:</span>
                <span className="font-mono font-bold text-white">{totalQuantity} Units</span>
              </div>
              {totalEstimatedAmount > 0 && (
                <div className="flex items-center justify-between text-white pt-1">
                  <span className="font-medium">Indicative Catalogue Total:</span>
                  <span className="font-sans font-bold text-[#35C6E8] text-sm">₹{totalEstimatedAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Quality & Factory Assurance Note */}
            <div className="flex items-center gap-2 text-[11px] text-[#A8B4C2] bg-[#0B1F36] p-2.5 rounded-lg border border-[#173A5E]">
              <ShieldCheck className="w-4 h-4 text-[#35C6E8] shrink-0" />
              <span>Standard Factory MOQ: 10 units. 100% dielectric routine qualified.</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                id="drawer-request-quote-btn"
                onClick={handleRequestQuoteAction}
                className="w-full py-3 rounded-xl btn-tactile-primary text-white text-xs font-bold uppercase tracking-wider font-sans flex items-center justify-center gap-2 shadow-md"
              >
                <FileText className="w-4 h-4 text-[#35C6E8]" />
                <span>Request Formal Quotation ({currentItems.length} Items)</span>
              </button>

              <button
                id="drawer-whatsapp-enquiry-btn"
                onClick={handleWhatsAppAction}
                className="w-full py-3 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:translate-y-0.5 text-white text-xs font-bold uppercase tracking-wider font-sans flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <WhatsAppIcon className="w-4.5 h-4.5 text-white" />
                <span>WhatsApp Enquiry (+91 9953239674)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
