/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FOOTER COMPONENT (ULTRA MODERN 3D INTERACTIVE PREMIER)
 * - True 3D Depth Architecture with multi-layer obsidian pedestals & volumetric lighting
 * - Color System: Deep Obsidian #020612, Midnight Blue #07172B, Electric Cyan #35C6E8, Laser Emerald #10B981
 * - Typography: Space Grotesk (Headlines), Plus Jakarta Sans (Body), IBM Plex Mono (Technical Metrics)
 * - 4 Interactive 3D Column Pods with sculpted bevels & specular edge highlights
 * - 3D Cyber Vault Jewel Trigger with real-time SCADA telemetry affordance
 * - Canonical WhatsApp: +91 9953239674
 */

import React from 'react';
import { NeutraCapLogo } from '../common/NeutraCapLogo';
import { Lock, ShieldCheck, ArrowUpRight, Phone, Sparkles, Layers, Cpu, Award, Download, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { ProductFamilyId } from '../../types';
import { SITE_FACTS, CANONICAL_WHATSAPP_NUMBER } from '../../data/siteFacts';
import { CATALOGUE_SUMMARY } from '../../data/catalogueSummary';

export interface FooterProps {
  onNavigate: (sectionId: string, familyId?: ProductFamilyId) => void;
  onOpenFounderVault: () => void;
  onNavigateLegal?: (path: '/terms-and-conditions' | '/privacy-policy' | '/refund-and-cancellation') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenFounderVault,
  onNavigateLegal,
}) => {
  return (
    <footer 
      id="main-site-footer"
      className="relative bg-gradient-to-b from-[#030814] via-[#050E1F] to-[#01040A] text-[#A8B4C2] pt-20 pb-16 border-t border-[#35C6E8]/30 overflow-hidden select-none"
    >
      {/* 3D Top Specular Laser Edge Hairline */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#35C6E8] to-transparent shadow-[0_0_20px_#35C6E8] pointer-events-none"></div>

      {/* Rich Multi-Stage Volumetric Atmospheric Glows */}
      <div className="absolute inset-0 bg-luxury-grid opacity-35 pointer-events-none"></div>
      <div className="absolute -top-32 left-1/4 w-[600px] h-[350px] bg-[#35C6E8]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-12 right-1/4 w-[500px] h-[300px] bg-[#10B981]/8 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 3D Brand Showcase Pedestal */}
        <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-r from-[#07172B]/85 via-[#0B2038]/70 to-[#040E1B]/85 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.18)] backdrop-blur-xl mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-[#35C6E8]/40 transition-all duration-300">
          <div className="space-y-2">
            <NeutraCapLogo variant="header" theme="dark" showTagline={true} />
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399] animate-pulse"></span>
              <span className="text-[11px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
                DIRECT INDUSTRIAL MANUFACTURING · 100% EX-FACTORY
              </span>
            </div>
          </div>
          
          <div className="text-xs sm:text-sm text-slate-300 font-sans max-w-md md:text-right leading-relaxed">
            High-performance industrial capacitor engineering for AC induction motors, clean APFC power conversion, and DC bus links. <span className="font-mono font-bold text-white">{SITE_FACTS.establishedExperienceYears} years of manufacturing reliability</span> across <strong className="font-mono text-[#35C6E8]">{CATALOGUE_SUMMARY.total} verified baseline models</strong>.
          </div>
        </div>

        {/* 4 Interactive 3D Column Pods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 py-6 border-b border-white/10 font-sans">
          
          {/* Column Pod 1: Product Lines */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#071629]/90 via-[#051120]/80 to-[#020813] border border-white/10 hover:border-[#35C6E8]/45 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_40px_rgba(53,198,232,0.15)] transition-all duration-300 group">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
              <Layers className="w-4 h-4 text-[#35C6E8]" />
              <h4 className="text-sm font-display font-black text-white tracking-tight">
                Catalogue Lines
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('products', 'starting')}
                  className="w-full flex items-center justify-between text-slate-300 hover:text-white transition-colors text-left font-sans group/item py-1"
                >
                  <span className="group-hover/item:translate-x-1 transition-transform">Starting Capacitors</span>
                  <span className="font-mono text-[11px] font-bold text-[#35C6E8] px-2 py-0.5 rounded bg-[#35C6E8]/10 border border-[#35C6E8]/30">
                    {CATALOGUE_SUMMARY.starting}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'green_filter')}
                  className="w-full flex items-center justify-between text-slate-300 hover:text-white transition-colors text-left font-sans group/item py-1"
                >
                  <span className="group-hover/item:translate-x-1 transition-transform">Green Filter Line</span>
                  <span className="font-mono text-[11px] font-bold text-[#35C6E8] px-2 py-0.5 rounded bg-[#35C6E8]/10 border border-[#35C6E8]/30">
                    {CATALOGUE_SUMMARY.greenFilter}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'running')}
                  className="w-full flex items-center justify-between text-slate-300 hover:text-white transition-colors text-left font-sans group/item py-1"
                >
                  <span className="group-hover/item:translate-x-1 transition-transform">Running Capacitors</span>
                  <span className="font-mono text-[11px] font-bold text-[#35C6E8] px-2 py-0.5 rounded bg-[#35C6E8]/10 border border-[#35C6E8]/30">
                    {CATALOGUE_SUMMARY.running}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'dc_electrolytic')}
                  className="w-full flex items-center justify-between text-slate-300 hover:text-white transition-colors text-left font-sans group/item py-1"
                >
                  <span className="group-hover/item:translate-x-1 transition-transform">DC Aluminium Bus</span>
                  <span className="font-mono text-[11px] font-bold text-[#35C6E8] px-2 py-0.5 rounded bg-[#35C6E8]/10 border border-[#35C6E8]/30">
                    {CATALOGUE_SUMMARY.dcAluminium}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column Pod 2: Engineering Tools */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#071629]/90 via-[#051120]/80 to-[#020813] border border-white/10 hover:border-[#35C6E8]/45 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_40px_rgba(53,198,232,0.15)] transition-all duration-300 group">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
              <Cpu className="w-4 h-4 text-[#35C6E8]" />
              <h4 className="text-sm font-display font-black text-white tracking-tight">
                Engineering Tools
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('finder')}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-left font-sans group/item py-1"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#35C6E8] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform" />
                  <span>Capacitor Finder Selector</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('custom')}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-left font-sans group/item py-1"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#35C6E8] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform" />
                  <span>OEM Specification Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-left font-sans group/item py-1"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#35C6E8] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform" />
                  <span>Technical Data Sheets</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-pwa-install-btn"
                  onClick={() => window.dispatchEvent(new CustomEvent('neutracap:open-pwa-install'))}
                  className="flex items-center gap-2 text-[#35C6E8] hover:text-white transition-colors text-left font-sans py-1 font-semibold"
                >
                  <Download className="w-3.5 h-3.5 text-[#35C6E8]" />
                  <span>Install Offline PWA App</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column Pod 3: Factory Desk */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#071629]/90 via-[#051120]/80 to-[#020813] border border-white/10 hover:border-emerald-400/45 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.15)] transition-all duration-300 group">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
              <Phone className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-display font-black text-white tracking-tight">
                Factory Dispatch
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={`https://wa.me/${CANONICAL_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello NeutraCap Factory Desk,\n\nI would like assistance in selecting an industrial capacitor for my application.\n\nPlease connect me with the factory sales desk.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-mono font-bold py-1 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  <span>WA: +91 9953239674</span>
                </a>
              </li>
              <li>
                <div className="text-slate-300 font-sans py-0.5">
                  Hotline: <strong className="text-white font-mono">+91 99532 39674</strong>
                </div>
              </li>
              <li>
                <div className="text-slate-300 font-sans py-0.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#35C6E8]" />
                  <span>100% Screened &amp; Tested</span>
                </div>
              </li>
              <li>
                <div className="text-slate-400 text-[11px] font-mono">
                  Dispatch: Ex-Factory Across India
                </div>
              </li>
            </ul>
          </div>

          {/* Column Pod 4: Founder & Management Command */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#071629]/90 via-[#051120]/80 to-[#020813] border border-white/10 hover:border-[#35C6E8]/45 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_40px_rgba(53,198,232,0.15)] transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                <Award className="w-4 h-4 text-[#35C6E8]" />
                <h4 className="text-sm font-display font-black text-white tracking-tight">
                  Executive Desk
                </h4>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300 font-sans">
                <div>
                  Founder: <a href={`mailto:${SITE_FACTS.founderEmail}`} className="text-[#35C6E8] hover:underline font-mono font-bold transition-colors">{SITE_FACTS.founderEmail}</a>
                </div>
                <p className="text-[11.5px] leading-relaxed text-slate-400">
                  Direct executive channel for high-volume OEM contracts and strategic industrial partnerships.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-2">
              <button
                id="footer-founder-vault-btn"
                onClick={onOpenFounderVault}
                className="w-full inline-flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#0C1F36] via-[#143252] to-[#0A1A2E] hover:from-[#173A5E] hover:to-[#0E7490] text-white text-xs font-mono font-black border border-[#35C6E8]/50 hover:border-[#35C6E8] shadow-[0_8px_25px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(53,198,232,0.5)] cursor-pointer group/btn active:scale-98 transition-all"
              >
                {/* 3D Cyber Vault Jewel Medallion */}
                <div className="flex items-center gap-2.5">
                  <span className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-b from-[#143252] via-[#0A1D33] to-[#040C17] border border-[#35C6E8]/70 shadow-[0_0_12px_rgba(53,198,232,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] group-hover/btn:scale-105 transition-transform shrink-0">
                    <Lock className="w-3.5 h-3.5 text-[#35C6E8] filter drop-shadow-[0_0_4px_#35C6E8]" />
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34D399] animate-pulse"></span>
                  </span>
                  <span className="tracking-wider">Founder Vault</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#35C6E8]/20 border border-[#35C6E8]/40 text-[9px] font-mono text-[#35C6E8] uppercase tracking-widest font-black shadow-[0_0_8px_rgba(53,198,232,0.4)]">
                  SCADA
                </span>
              </button>
            </div>
          </div>

        </div>

        {/* Legal Centre Links Bar */}
        <div className="pt-8 pb-6 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35C6E8] animate-pulse"></span>
            <span className="text-white font-bold uppercase tracking-wider text-[11px]">Legal Centre &amp; Compliance:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs">
            <a
              id="footer-link-terms"
              href="/terms-and-conditions"
              onClick={(e) => {
                e.preventDefault();
                onNavigateLegal ? onNavigateLegal('/terms-and-conditions') : (window.location.pathname = '/terms-and-conditions');
              }}
              className="text-slate-300 hover:text-[#35C6E8] transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </a>
            <span className="text-slate-600">·</span>
            <a
              id="footer-link-privacy"
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                onNavigateLegal ? onNavigateLegal('/privacy-policy') : (window.location.pathname = '/privacy-policy');
              }}
              className="text-slate-300 hover:text-[#35C6E8] transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <span className="text-slate-600">·</span>
            <a
              id="footer-link-refund"
              href="/refund-and-cancellation"
              onClick={(e) => {
                e.preventDefault();
                onNavigateLegal ? onNavigateLegal('/refund-and-cancellation') : (window.location.pathname = '/refund-and-cancellation');
              }}
              className="text-slate-300 hover:text-[#35C6E8] transition-colors cursor-pointer"
            >
              Refund &amp; Cancellation Policy
            </a>
          </div>
        </div>

        {/* Bottom 3D Trust Credentials Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 font-sans">
          <div className="font-mono text-[11px]">
            © {new Date().getFullYear()} NeutraCap Electricals. All Rights Reserved.
          </div>
          <div className="flex items-center gap-5 font-mono text-[11px]">
            <span>PRECISION · POWER · PERFORMANCE</span>
            <span className="text-[#35C6E8] font-bold px-2.5 py-0.5 rounded bg-white/5 border border-white/10 shadow-sm">
              MADE IN INDIA
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
