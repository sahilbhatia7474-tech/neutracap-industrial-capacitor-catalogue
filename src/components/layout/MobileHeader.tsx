/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * DELIBERATE MOBILE HEADER & QUICK CATEGORY RAIL
 * Features: NC Monogram logo, dedicated search input, horizontal category pill rail,
 * and expandable menu drawer.
 */

import React, { useState } from 'react';
import { NeutraCapLogo } from '../common/NeutraCapLogo';
import { 
  Menu, 
  X, 
  Search, 
  MessageSquare, 
  Lock,
  ChevronRight 
} from 'lucide-react';
import { ProductFamilyId } from '../../types';
import { SITE_FACTS } from '../../data/siteFacts';

export interface MobileHeaderProps {
  selectedCategory: ProductFamilyId | 'all';
  onSelectCategory: (familyId: ProductFamilyId | 'all') => void;
  onOpenSearch: () => void;
  onOpenEnquiry: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenFounderVault: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenEnquiry,
  onNavigate,
  onOpenFounderVault,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const categories: { id: ProductFamilyId | 'all'; label: string; badge: string }[] = [
    { id: 'all', label: 'All Catalogues', badge: String(SITE_FACTS.totalBaselineVariants) },
    { id: 'starting', label: 'Starting', badge: String(SITE_FACTS.familyVariantCounts.starting) },
    { id: 'green_filter', label: 'Green Filter', badge: String(SITE_FACTS.familyVariantCounts.greenFilter) },
    { id: 'running', label: 'Running', badge: String(SITE_FACTS.familyVariantCounts.running) },
    { id: 'dc_electrolytic', label: 'DC Aluminium', badge: String(SITE_FACTS.familyVariantCounts.dcElectrolytic) },
  ];

  const handleNavClick = (sectionId: string) => {
    setIsDrawerOpen(false);
    onNavigate(sectionId);
  };

  return (
    <div id="mobile-header-root" className="xl:hidden w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Brand Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <button 
          id="mobile-logo-btn"
          onClick={() => handleNavClick('home')}
          className="focus:outline-none text-left"
        >
          <NeutraCapLogo variant="mobile" theme="light" />
        </button>

        <div className="flex items-center gap-2">
          <button
            id="mobile-call-whatsapp-top-btn"
            onClick={onOpenEnquiry}
            className="p-2 rounded-lg bg-blue-50 text-[#0A2A5E] border border-blue-100 hover:bg-blue-100"
            aria-label="Direct Factory Call or WhatsApp"
          >
            <MessageSquare className="w-4 h-4 text-[#00B140]" />
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
            aria-label="Toggle navigation drawer"
          >
            {isDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Dedicated Mobile Search Input Bar */}
      <div className="px-4 pb-2.5">
        <button
          id="mobile-search-bar"
          onClick={onOpenSearch}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-500 text-xs font-medium text-left shadow-2xs active:bg-slate-200 transition-colors"
        >
          <Search className="w-4 h-4 text-[#0066FF] shrink-0" />
          <span className="truncate">Search capacitor, µF, voltage (e.g. 450V, 25 MFD)...</span>
        </button>
      </div>

      {/* Quick Category Rail */}
      <div className="px-4 pb-2.5 overflow-x-auto no-scrollbar flex items-center gap-2 scroll-smooth">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`mobile-cat-pill-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#0A2A5E] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1 py-0.2 rounded-full font-mono ${
                isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-500 border border-slate-200'
              }`}>
                {cat.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Expandable Mobile Drawer Navigation */}
      {isDrawerOpen && (
        <div 
          id="mobile-nav-drawer" 
          className="bg-white border-t border-slate-200 px-5 py-6 space-y-4 animate-in slide-in-from-top duration-200"
        >
          <div className="space-y-2">
            {[
              { id: 'home', label: 'Home Page' },
              { id: 'products', label: `4 Primary Catalogues (${SITE_FACTS.totalBaselineVariants} Variants)` },
              { id: 'finder', label: 'Find Your Capacitor' },
              { id: 'custom', label: 'Custom Requirement Portal' },
              { id: 'about', label: `${SITE_FACTS.establishedExperienceYears} Years Heritage & Factory` },
              { id: 'contact', label: 'Direct Factory Contact' },
            ].map((link) => (
              <button
                key={link.id}
                id={`drawer-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-left text-sm font-bold text-[#0A2A5E] transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          {/* Quick Actions in Drawer */}
          <div className="pt-3 border-t border-slate-200 space-y-2.5">
            <button
              id="drawer-enquiry-action-btn"
              onClick={() => {
                setIsDrawerOpen(false);
                onOpenEnquiry();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0A2A5E] text-white text-xs font-bold uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4 text-[#00B140]" />
              <span>Request Fast Factory Quote</span>
            </button>

            <button
              id="drawer-founder-vault-btn"
              onClick={() => {
                setIsDrawerOpen(false);
                onOpenFounderVault();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono border border-slate-700 hover:text-white"
            >
              <Lock className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Open Founder Command Vault</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
