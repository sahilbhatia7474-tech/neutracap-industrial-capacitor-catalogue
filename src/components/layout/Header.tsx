/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP PRIMARY WEBSITE HEADER (PREMIUM INDUSTRIAL TRANSFORMATION V3)
 * - Typography: Space Grotesk display, Plus Jakarta Sans nav & buttons, IBM Plex Mono technical status
 * - Color System: Deep Navy #071426, Midnight Blue #0B1F36, Steel Blue #173A5E, Electric Cyan #35C6E8
 * - Actions: Search · VECTOR Intelligence · Enquiry Cart (with live badge) · Factory Desk Enquiry
 */

import React, { useState } from 'react';
import { NeutraCapLogo } from '../common/NeutraCapLogo';
import { Search, Menu, X, MessageSquare, ChevronRight, Sparkles, ShoppingBag } from 'lucide-react';
import { ProductFamilyId } from '../../types';

export interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string, familyId?: ProductFamilyId) => void;
  onOpenSearch: () => void;
  onOpenEnquiry: () => void;
  onOpenAssist?: () => void;
  onOpenFounderVault?: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenSearch,
  onOpenEnquiry,
  onOpenAssist,
  cartCount = 0,
  onOpenCart,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Overview' },
    { id: 'products', label: 'Catalogue Lines' },
    { id: 'finder', label: 'Find Your Capacitor' },
    { id: 'custom', label: 'OEM Custom Desk' },
  ];

  const handleNav = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header 
      id="main-site-header"
      className="sticky top-0 z-40 w-full bg-[#060D1A]/90 backdrop-blur-2xl border-b border-[#35C6E8]/25 text-white transition-all shadow-[0_10px_35px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(255,255,255,0.06)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* LEFT: Brand Logo & Engineered Wordmark */}
          <div className="flex items-center gap-4">
            <button
              id="header-brand-logo-btn"
              onClick={() => handleNav('home')}
              className="focus:outline-none text-left group transition-transform duration-150 active:scale-98 cursor-pointer"
              aria-label="NeutraCap Homepage"
            >
              {/* Desktop Lockup */}
              <div className="hidden sm:block">
                <NeutraCapLogo variant="header" theme="dark" showTagline={true} />
              </div>
              {/* Mobile Compact Lockup */}
              <div className="block sm:hidden">
                <NeutraCapLogo variant="mobile" theme="dark" />
              </div>
            </button>
          </div>

          {/* CENTER: Clean Industrial Navigation (Desktop Only) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 font-sans">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`text-xs font-semibold tracking-wide transition-all px-3.5 py-2 rounded-xl cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-b from-[#173A5E] to-[#0B1F36] text-white font-bold shadow-xs border border-[#35C6E8]/50'
                      : 'text-[#A8B4C2] hover:text-white hover:bg-[#0B1F36]/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Search, AI Assist, Enquiry Cart, Enquire Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Assistant Quick Trigger (Desktop/Tablet) — Award-Level Medallion */}
            {onOpenAssist && (
              <button
                id="header-open-assist-btn"
                onClick={onOpenAssist}
                title="Open NEUTRACAP VECTOR"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-b from-[#143252] via-[#0A1D33] to-[#040C17] hover:border-[#35C6E8] text-[#A8B4C2] hover:text-white border border-[#35C6E8]/40 text-xs font-mono font-bold transition-all shadow-[0_2px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(53,198,232,0.4)] cursor-pointer group"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#35C6E8] filter drop-shadow-[0_0_5px_#35C6E8] group-hover:rotate-12 transition-transform" />
                <span className="hidden lg:inline tracking-wider">VECTOR AI</span>
              </button>
            )}

            {/* Search Icon Trigger — Award-Level Medallion */}
            <button
              id="header-search-icon-btn"
              onClick={onOpenSearch}
              aria-label="Search capacitors catalogue"
              title="Search catalogue (⌘K)"
              className="relative flex items-center justify-center p-2.5 sm:p-2.5 rounded-xl bg-gradient-to-b from-[#143252] via-[#0A1D33] to-[#040C17] border border-[#35C6E8]/40 hover:border-[#35C6E8] text-[#A8B4C2] hover:text-white shadow-[0_2px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(53,198,232,0.45)] transition-all group cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#A8B4C2] group-hover:text-[#35C6E8] filter group-hover:drop-shadow-[0_0_6px_#35C6E8] transition-all transform group-hover:scale-110" />
            </button>

            {/* Enquiry Cart Trigger Button with Dynamic Item Badge — Award-Level Medallion */}
            {onOpenCart && (
              <button
                id="header-open-cart-btn"
                onClick={onOpenCart}
                aria-label={`Enquiry Cart (${cartCount} items)`}
                title="Open Enquiry Cart"
                className="relative flex items-center justify-center p-2.5 sm:p-2.5 rounded-xl bg-gradient-to-b from-[#143252] via-[#0A1D33] to-[#040C17] border border-[#35C6E8]/40 hover:border-[#35C6E8] text-white shadow-[0_2px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(53,198,232,0.45)] transition-all group cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#35C6E8] filter drop-shadow-[0_0_5px_rgba(53,198,232,0.8)] group-hover:scale-110 transition-transform" />
                {cartCount > 0 ? (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-gradient-to-b from-[#10B981] to-[#059669] text-white text-[10px] font-mono font-bold flex items-center justify-center border-2 border-[#071426] shadow-[0_0_10px_#10B981] animate-scale-in">
                    {cartCount}
                  </span>
                ) : (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#35C6E8]/40 group-hover:bg-[#35C6E8] group-hover:shadow-[0_0_6px_#35C6E8] transition-all"></span>
                )}
              </button>
            )}

            {/* Enquire CTA Button (Desktop) — Tactile Luxury */}
            <button
              id="header-enquire-primary-btn"
              onClick={onOpenEnquiry}
              className="hidden sm:inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-[#173A5E] via-[#0E7490] to-[#173A5E] hover:from-[#0E7490] hover:to-[#35C6E8] text-white text-xs font-mono font-bold tracking-wider uppercase border border-[#35C6E8]/50 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(53,198,232,0.45)] transition-all group cursor-pointer active:scale-98"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981] animate-pulse"></span>
              <span className="group-hover:text-slate-950 transition-colors">Talk to Factory Desk</span>
            </button>

            {/* Mobile Enquire Icon Trigger — Award-Level Touch Medallion */}
            <button
              id="header-mobile-enquire-btn"
              onClick={onOpenEnquiry}
              className="sm:hidden relative flex items-center justify-center p-2.5 rounded-xl bg-gradient-to-b from-[#1E4D7B] via-[#173A5E] to-[#0B223D] border border-[#35C6E8]/70 text-white shadow-[0_4px_15px_rgba(53,198,232,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] active:scale-95 transition-all"
              aria-label="Enquire with factory"
            >
              <MessageSquare className="w-4 h-4 text-[#35C6E8] filter drop-shadow-[0_0_5px_#35C6E8]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981] animate-pulse"></span>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="header-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#A8B4C2] hover:bg-[#0B1F36] hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Clean Mobile Drawer */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="md:hidden bg-[#0B1F36] border-t border-[#173A5E] px-4 py-5 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200 font-sans"
        >
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`drawer-nav-${item.id}`}
                onClick={() => handleNav(item.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg text-left text-xs font-bold text-[#A8B4C2] hover:text-white hover:bg-[#173A5E] transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-[#A8B4C2]" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#173A5E] space-y-2">
            {onOpenCart && (
              <button
                id="drawer-open-cart-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-[#071426] text-white border border-[#173A5E] text-xs font-bold"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#35C6E8]" />
                  <span>Enquiry Cart</span>
                </div>
                <span className="font-mono text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded border border-[#16A34A]/30">
                  {cartCount} Items
                </span>
              </button>
            )}

            {onOpenAssist && (
              <button
                id="drawer-open-assist-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAssist();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#071426] text-[#A8B4C2] hover:text-white border border-[#173A5E] text-xs font-bold"
              >
                <Sparkles className="w-4 h-4 text-[#35C6E8]" />
                <span>Open VECTOR Intelligence</span>
              </button>
            )}

            <button
              id="drawer-enquire-full-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg btn-tactile-primary text-white text-xs font-bold uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Talk to Factory Desk</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
