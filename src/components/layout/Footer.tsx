/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FOOTER COMPONENT (PREMIUM INDUSTRIAL TRANSFORMATION)
 * - Color System: Deep Navy #071426, Midnight Blue #0B1F36, Steel Blue #173A5E, Electric Cyan #35C6E8, Muted Silver #A8B4C2
 * - Typography: Space Grotesk (Headlines), Plus Jakarta Sans (Body & Links), IBM Plex Mono (Technical Variant Counts & Metrics)
 * - Canonical WhatsApp: +91 9953239674
 * - Standardized Product Family Naming & Authoritative Counts
 */

import React from 'react';
import { NeutraCapLogo } from '../common/NeutraCapLogo';
import { Lock, ShieldCheck, ArrowUpRight, Phone } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { ProductFamilyId } from '../../types';
import { SITE_FACTS, CANONICAL_WHATSAPP_NUMBER } from '../../data/siteFacts';
import { CATALOGUE_SUMMARY } from '../../data/catalogueSummary';

export interface FooterProps {
  onNavigate: (sectionId: string, familyId?: ProductFamilyId) => void;
  onOpenFounderVault: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenFounderVault,
}) => {
  return (
    <footer 
      id="main-site-footer"
      className="relative bg-engineering-depth text-[#A8B4C2] pt-16 pb-12 border-t border-[#173A5E] overflow-hidden"
    >
      {/* Precision background engineering grid & circuit pattern */}
      <div className="absolute inset-0 bg-industrial-grid-dark opacity-35 pointer-events-none"></div>
      <div className="absolute inset-0 bg-circuit-pattern opacity-20 pointer-events-none"></div>

      <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Lockup & Industrial Statement */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-10 border-b border-[#173A5E]/60 gap-6">
          <NeutraCapLogo variant="header" theme="dark" showTagline={true} />
          
          <div className="text-xs text-[#A8B4C2] font-sans max-w-md md:text-right leading-relaxed">
            Precision capacitor engineering for industrial motors, power conversion systems, and harmonic mitigation. {SITE_FACTS.establishedExperienceYears} years of manufacturing reliability across {CATALOGUE_SUMMARY.total} baseline variants.
          </div>
        </div>

        {/* 4 Clean Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 py-12 border-b border-[#173A5E]/60 font-sans">
          
          {/* Column 1: Products */}
          <div className="space-y-3">
            <h4 className="text-sm font-display font-bold text-white tracking-tight">
              Catalogue Lines
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('products', 'starting')}
                  className="text-[#A8B4C2] hover:text-white transition-colors text-left font-sans"
                >
                  Starting Capacitors <span className="font-mono text-[#35C6E8]">({CATALOGUE_SUMMARY.starting})</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'green_filter')}
                  className="text-[#A8B4C2] hover:text-white transition-colors text-left font-sans"
                >
                  Green Filter Capacitors <span className="font-mono text-[#35C6E8]">({CATALOGUE_SUMMARY.greenFilter})</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'running')}
                  className="text-[#A8B4C2] hover:text-white transition-colors text-left font-sans"
                >
                  Running Capacitors <span className="font-mono text-[#35C6E8]">({CATALOGUE_SUMMARY.running})</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'dc_electrolytic')}
                  className="text-[#A8B4C2] hover:text-white transition-colors text-left font-sans"
                >
                  DC Aluminium Electrolytic <span className="font-mono text-[#35C6E8]">({CATALOGUE_SUMMARY.dcAluminium})</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Engineering */}
          <div className="space-y-3">
            <h4 className="text-sm font-display font-bold text-white tracking-tight">
              Engineering Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('finder')}
                  className="text-[#A8B4C2] hover:text-white transition-colors text-left font-sans"
                >
                  Find Your Capacitor Selector
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('custom')}
                  className="text-[#A8B4C2] hover:text-white transition-colors text-left font-sans"
                >
                  OEM Custom Requirement Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="text-[#A8B4C2] hover:text-white transition-colors text-left font-sans"
                >
                  Technical Specification Sheets
                </button>
              </li>
              <li>
                <button
                  id="footer-pwa-install-btn"
                  onClick={() => window.dispatchEvent(new CustomEvent('neutracap:open-pwa-install'))}
                  className="text-[#35C6E8] hover:text-white transition-colors text-left font-sans flex items-center gap-1.5"
                >
                  <span>Install App / Offline Catalogue</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Factory Desk */}
          <div className="space-y-3">
            <h4 className="text-sm font-display font-bold text-white tracking-tight">
              Factory Desk
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={`https://wa.me/${CANONICAL_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello NeutraCap Factory Desk,\n\nI would like assistance in selecting an industrial capacitor for my application.\n\nPlease connect me with the factory sales desk.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#35C6E8] hover:underline font-sans"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>WhatsApp: +91 9953239674</span>
                </a>
              </li>
              <li>
                <span className="text-[#A8B4C2] font-sans">
                  Direct Factory Phone: <strong className="text-white font-mono">+91 9953239674</strong>
                </span>
              </li>
              <li>
                <span className="text-[#A8B4C2] font-sans">
                  Quality Standard: 100% Screened &amp; Tested
                </span>
              </li>
              <li>
                <span className="text-[#A8B4C2] font-sans">
                  Dispatch: Ex-Factory Across India
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Founder & Management */}
          <div className="space-y-3">
            <h4 className="text-sm font-display font-bold text-white tracking-tight">
              Founder &amp; Management
            </h4>
            <div className="space-y-1.5 text-xs text-[#A8B4C2] font-sans">
              <div>
                Founder Desk: <a href={`mailto:${SITE_FACTS.founderEmail}`} className="text-white hover:text-[#35C6E8] underline font-sans transition-colors">{SITE_FACTS.founderEmail}</a>
              </div>
              <p className="leading-relaxed">
                Direct executive communication for strategic industrial partnerships and OEM supply contracts.
              </p>
            </div>
            <div className="pt-1.5">
              <button
                id="footer-founder-vault-btn"
                onClick={onOpenFounderVault}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#07172B] via-[#0B223D] to-[#051120] hover:from-[#0B223D] hover:to-[#0E2C52] text-white text-xs font-mono font-bold border border-[#35C6E8]/40 hover:border-[#35C6E8] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(53,198,232,0.35)] cursor-pointer group"
              >
                {/* Award-Level Iconic Cyber Vault Medallion */}
                <span className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-b from-[#143252] via-[#0A1D33] to-[#040C17] border border-[#35C6E8]/70 shadow-[0_0_12px_rgba(53,198,232,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] group-hover:scale-105 group-hover:border-[#35C6E8] group-hover:shadow-[0_0_20px_rgba(53,198,232,0.7)] transition-all shrink-0">
                  <Lock className="w-3.5 h-3.5 text-[#35C6E8] filter drop-shadow-[0_0_4px_#35C6E8] transform group-hover:rotate-6 transition-transform" />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_4px_#10B981] animate-pulse"></span>
                </span>
                <span className="tracking-wide">Founder Command Vault</span>
                <span className="px-1.5 py-0.5 rounded bg-[#35C6E8]/15 border border-[#35C6E8]/30 text-[9px] font-mono text-[#35C6E8] uppercase tracking-wider font-bold">AUTH</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Restrained Copyright & Credentials Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8B4C2] gap-4 font-sans">
          <div>
            © {new Date().getFullYear()} NeutraCap Electricals. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Precision · Power · Performance</span>
            <span className="text-[#35C6E8] font-bold">Made in India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
