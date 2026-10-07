/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * REUSABLE LEGAL PAGE LAYOUT (NEUTRACAP COMPLIANCE & LEGAL CENTRE)
 * - Visual System: Deep Obsidian #020612, Midnight Navy #07172B, Electric Cyan #35C6E8
 * - Typography: Space Grotesk (Headlines), Inter / Plus Jakarta Sans (Body), IBM Plex Mono (Badges & Sections)
 * - Sticky desktop Table of Contents + Mobile Quick Section selector
 * - Clean breadcrumbs, prominent dates, readable text width, contact block, "Back to NeutraCap" CTAs
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ChevronRight, Shield, Clock, Calendar, FileText, Mail, Phone, MapPin, Building, Share2, Check, ArrowUpRight } from 'lucide-react';
import { NeutraCapLogo } from '../common/NeutraCapLogo';

export interface LegalSectionItem {
  id: string;
  title: string;
}

export interface LegalPageLayoutProps {
  title: string;
  documentNumber?: string;
  effectiveDate: string;
  lastUpdatedDate: string;
  sections: LegalSectionItem[];
  activeLegalPath: '/terms-and-conditions' | '/privacy-policy' | '/refund-and-cancellation';
  onNavigateHome: () => void;
  onNavigateLegal: (path: '/terms-and-conditions' | '/privacy-policy' | '/refund-and-cancellation') => void;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  documentNumber = 'NC-LEG-2026',
  effectiveDate,
  lastUpdatedDate,
  sections,
  activeLegalPath,
  onNavigateHome,
  onNavigateLegal,
  children,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(sections[0]?.id || '');
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [activeLegalPath]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSectionId(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // ignore
    }
  };

  const legalNavTabs = [
    { label: 'Terms & Conditions', path: '/terms-and-conditions' as const },
    { label: 'Privacy Policy', path: '/privacy-policy' as const },
    { label: 'Refund & Cancellation', path: '/refund-and-cancellation' as const },
  ];

  return (
    <div className="min-h-screen bg-[#020612] text-slate-100 flex flex-col font-sans relative selection:bg-[#35C6E8]/30 selection:text-white">
      {/* Background Precision Luxury Grid & Subtle Cyan Volumetric Lighting */}
      <div className="fixed inset-0 bg-luxury-grid opacity-35 pointer-events-none"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#35C6E8]/8 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[400px] bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Bar for Legal Pages */}
      <header 
        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
        className="sticky top-0 z-40 w-full bg-[#060D1A]/95 backdrop-blur-2xl border-b border-[rgba(255,255,255,0.05)] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
      >
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="group flex items-center gap-2 text-xs font-mono font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/15 hover:border-[#35C6E8]/60 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#35C6E8] group-hover:-translate-x-1 transition-transform" />
              <span>Back to NeutraCap</span>
            </button>

            <div className="hidden sm:block h-5 w-px bg-white/15"></div>

            <button
              onClick={onNavigateHome}
              className="hidden sm:block cursor-pointer focus:outline-none"
            >
              <NeutraCapLogo variant="mobile" theme="dark" />
            </button>
          </div>

          {/* Legal Document Switcher Tabs (Desktop Header) */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-[#07172B] border border-white/10">
            {legalNavTabs.map((tab) => {
              const isActive = activeLegalPath === tab.path;
              return (
                <button
                  key={tab.path}
                  onClick={() => onNavigateLegal(tab.path)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#173A5E] text-[#35C6E8] font-bold shadow-sm border border-[#35C6E8]/50'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Share / Copy Document Link */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Copy link to document"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#35C6E8]" />}
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner for Document */}
      <section className="relative pt-10 pb-8 sm:pt-14 sm:pb-12 border-b border-white/10 bg-gradient-to-b from-[#07172B]/80 via-[#030B17] to-transparent">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
            <button 
              onClick={onNavigateHome} 
              className="hover:text-[#35C6E8] transition-colors cursor-pointer"
            >
              NeutraCap
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-400">Legal Centre</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#35C6E8] font-bold">{title}</span>
          </nav>

          {/* Document Header Lockup */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173A5E]/60 border border-[#35C6E8]/40 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#35C6E8] uppercase mb-3">
                <FileText className="w-3.5 h-3.5" />
                <span>OFFICIAL LEGAL COMPLIANCE REPOSITORY</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-tight">
                {title}
              </h1>
            </div>

            {/* Document Dates Card */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 text-xs font-mono">
              <div className="px-4 py-2.5 rounded-xl bg-[#071629] border border-white/10 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#35C6E8]" />
                <span className="text-slate-400">Effective: <strong className="text-white">{effectiveDate}</strong></span>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-[#071629] border border-white/10 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-400">Last Updated: <strong className="text-white">{lastUpdatedDate}</strong></span>
              </div>
            </div>
          </div>

          {/* Mobile Document Selector Pill Rail */}
          <div className="flex lg:hidden items-center gap-2 overflow-x-auto pt-6 no-scrollbar">
            {legalNavTabs.map((tab) => {
              const isActive = activeLegalPath === tab.path;
              return (
                <button
                  key={tab.path}
                  onClick={() => onNavigateLegal(tab.path)}
                  className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#173A5E] text-[#35C6E8] font-bold border border-[#35C6E8]'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Main Document Content Body with Sidebar Table of Contents */}
      <main className="flex-1 max-w-7xl 2xl:max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 bg-luxury-grid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Sticky Desktop Table of Contents (4 Columns) */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-28 p-5 rounded-2xl bg-gradient-to-b from-[#071629]/95 to-[#040C18] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-luxury-grid">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-[#35C6E8]">
                <span>Table of Contents</span>
                <span className="text-slate-500 font-normal">{sections.length} Sections</span>
              </div>
              
              <nav className="space-y-1 max-h-[calc(70vh-80px)] overflow-y-auto pr-1 custom-scrollbar text-xs">
                {sections.map((section, idx) => {
                  const isActive = activeSectionId === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-all flex items-start gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-[#173A5E]/80 text-[#35C6E8] font-bold border-l-2 border-[#35C6E8]'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="font-mono text-[10px] text-slate-500 shrink-0 mt-0.5">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <span className="line-clamp-2 leading-relaxed">
                        {section.title}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Jump to Contact Block */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <button
                  onClick={() => scrollToSection('legal-contact-block')}
                  className="w-full py-2 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>Official Inquiries</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#35C6E8]" />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Legal Content Column (8 Columns) */}
          <article className="lg:col-span-8 xl:col-span-9 max-w-3xl">
            <div className="space-y-10 sm:space-y-12 text-slate-300 text-sm sm:text-base leading-relaxed bg-luxury-grid p-6 sm:p-10 rounded-3xl bg-[#061224]/60 border border-white/10 shadow-[0_15px_45px_rgba(0,0,0,0.5)] backdrop-blur-xs">
              {children}
            </div>

            {/* Official Contact & Business Details Block */}
            <div id="legal-contact-block" className="mt-16 pt-10 border-t border-white/15">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B2038] via-[#071629] to-[#030B17] border border-[#35C6E8]/35 shadow-[0_15px_45px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest text-[#35C6E8] uppercase mb-2">
                  <Shield className="w-4 h-4 text-[#35C6E8]" />
                  <span>OFFICIAL LEGAL &amp; REGULATORY CONTACT DESK</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight mb-2">
                  Have a question regarding this document?
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mb-6">
                  For official inquiries, compliance correspondence, contractual clarifications, or formal notices regarding NeutraCap operations:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
                  <div className="p-3.5 rounded-xl bg-[#040C18] border border-white/10">
                    <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1">Official Email</span>
                    <span className="text-white font-bold select-all">[INSERT OFFICIAL BUSINESS EMAIL]</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#040C18] border border-white/10">
                    <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1">Official Phone</span>
                    <span className="text-white font-bold select-all">[INSERT OFFICIAL BUSINESS PHONE]</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#040C18] border border-white/10 sm:col-span-2">
                    <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1">Registered Business Address</span>
                    <span className="text-white font-bold select-all">[INSERT FULL BUSINESS ADDRESS]</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-400 font-mono">
                    Brand: <strong className="text-white">NeutraCap</strong> · Heritage Since 1989
                  </span>
                  
                  <button
                    onClick={onNavigateHome}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#173A5E] hover:bg-[#0E7490] text-white text-xs font-mono font-bold uppercase tracking-wider border border-[#35C6E8]/60 transition-all cursor-pointer active:scale-95"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to NeutraCap Catalogue</span>
                  </button>
                </div>
              </div>
            </div>

          </article>

        </div>
      </main>

      {/* Footer Strip */}
      <footer className="border-t border-white/10 bg-[#01040A] py-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} NeutraCap Electricals. All Rights Reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <button onClick={() => onNavigateLegal('/terms-and-conditions')} className="hover:text-[#35C6E8] transition-colors cursor-pointer">
              Terms &amp; Conditions
            </button>
            <span>·</span>
            <button onClick={() => onNavigateLegal('/privacy-policy')} className="hover:text-[#35C6E8] transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => onNavigateLegal('/refund-and-cancellation')} className="hover:text-[#35C6E8] transition-colors cursor-pointer">
              Refund &amp; Cancellation Policy
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
