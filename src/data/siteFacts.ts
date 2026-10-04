/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP SITE FACTS & VERIFIABLE BASELINE DATA
 * Centralized source of truth for all brand metrics, verifiable claims,
 * and founder-editable company facts.
 */

import { CATALOGUE_SUMMARY } from './catalogueSummary';

export interface SiteFactItem {
  id: string;
  key: string;
  value: string;
  label: string;
  sublabel: string;
  isVerifiable: boolean;
}

export interface CompanyProfile {
  brandName: string;
  legalEntity: string;
  tagline: string;
  establishedExperienceYears: string; // "35+"
  heritageYear: string; // "1989"
  natureOfBusiness: string;
  primaryCataloguesCount: number; // 4
  totalBaselineVariants: number; // 490
  familyVariantCounts: {
    starting: number; // 40
    greenFilter: number; // 40
    running: number; // 62
    dcElectrolytic: number; // 348
  };
  qaStandards: string[];
  manufacturingCapabilities: string[];
  headquarters: string;
  dispatchCoverage: string;
  canonicalWhatsApp?: string;
  canonicalWhatsAppRaw?: string;
  canonicalPhone?: string;
  founderEmail?: string;
  founderName?: string;
}

export const SITE_FACTS: CompanyProfile = {
  brandName: 'NEUTRACAP',
  legalEntity: 'NeutraCap Industrial Technologies',
  tagline: 'PRECISION · POWER · PERFORMANCE',
  establishedExperienceYears: '35+',
  heritageYear: '1989',
  natureOfBusiness: 'Precision Industrial Capacitor Manufacturing & OEM Supply',
  primaryCataloguesCount: 4,
  totalBaselineVariants: CATALOGUE_SUMMARY.total,
  familyVariantCounts: {
    starting: CATALOGUE_SUMMARY.starting,
    greenFilter: CATALOGUE_SUMMARY.greenFilter,
    running: CATALOGUE_SUMMARY.running,
    dcElectrolytic: CATALOGUE_SUMMARY.dcAluminium,
  },
  qaStandards: [
    '100% Individual Batch Dielectric Breakdown Testing',
    'Automated Capacitance & Dissipation Factor (tan δ) Verification',
    'High Temperature Endurance & Thermal Stress Screening',
    'Precision Automated Element Winding & Vacuum Resin Impregnation'
  ],
  manufacturingCapabilities: [
    'Custom Case Dimensions (Diameter & Height Options)',
    'Dual Faston, M8/M12 Studs, Insulated Wire & Heavy Screw Terminals',
    'Specialized AC & DC Operating Voltage Ratings',
    'Direct Factory OEM Production & Rapid Prototype Batch Turnaround'
  ],
  headquarters: 'India',
  dispatchCoverage: 'Pan-India Direct Factory Dispatch & Global Export Readiness',
  canonicalWhatsApp: '+91 9953239674',
  canonicalWhatsAppRaw: '919953239674',
  canonicalPhone: '+91 99532 39674',
  founderEmail: 'sahilbhatia7474@gmail.com',
  founderName: 'Sahil Bhatia',
};

export const CANONICAL_WHATSAPP_NUMBER = '919953239674';
export const CANONICAL_WHATSAPP_DISPLAY = '+91 9953239674';
export const CANONICAL_PHONE_DISPLAY = '+91 99532 39674';
export const FOUNDER_EMAIL = 'sahilbhatia7474@gmail.com';
export const FOUNDER_NAME = 'Sahil Bhatia';
