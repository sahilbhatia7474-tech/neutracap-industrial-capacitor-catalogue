/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP DATA MODEL & TYPE DEFINITIONS
 * Precision · Power · Performance
 * Version: V4 Freeze / Lyra Approved Foundation
 */

export type ProductFamilyId = 
  | 'starting'
  | 'green_filter'
  | 'running'
  | 'dc_electrolytic';

export type AvailabilityStatus = 
  | 'in_stock' 
  | 'made_to_order' 
  | 'low_stock' 
  | 'custom_only';

export type TerminalType = 
  | 'Double Faston 6.3mm' 
  | 'Single Faston 6.3mm' 
  | 'Flexible Insulated Wires' 
  | 'Screw Terminals M6/M8' 
  | 'Solder Lugs' 
  | 'PCB Snap-in Pins' 
  | 'Triple Blade Quick Connect (Herm/Fan/C)'
  | 'Axial Leads';

export type BodyMaterial = 
  | 'Flame Retardant Plastic (UL94 V-0)' 
  | 'Extruded Aluminium Can' 
  | 'Phenolic Resin Encapsulation' 
  | 'Cylindrical Aluminium Housing';

export type DielectricConstruction = 
  | 'Metallized Polypropylene Film (MKP)' 
  | 'Metallized Polypropylene Dual Section (MKP)'
  | 'Electrolytic Etched Foil & High Purity Paper' 
  | 'Segmented Safety Film Metallization' 
  | 'Self-Healing Non-Inductive Film';

export interface CapacitorDimensions {
  diameterMm: number;
  heightMm: number;
  leadLengthMm?: number;
  totalHeightWithTerminalsMm?: number;
  mountingType?: 'Plain Bottom' | 'Bottom Stud M8' | 'Bottom Stud M12' | 'Bracket Mount' | 'PCB Snap-in';
  caseCode?: string;
}

export interface PricingData {
  currency: 'INR' | 'USD';
  basePrice?: number;
  mrp?: number;
  launchPrice?: number;
  discountPercentage?: number;
  isPriceOnRequest?: boolean;
  minOrderQuantity?: number;
  bulkTiers?: { minQty: number; unitPrice: number }[];
  effectiveLaunchReduction?: number; // e.g. 7.5% midpoint
}

export interface TechnicalDocument {
  id: string;
  title: string;
  type: 'datasheet' | 'drawing' | 'test_report' | 'manual';
  fileSize: string;
  url: string;
  updatedAt: string;
}

export interface CapacitorVariant {
  id: string;
  sku: string;
  familyId: ProductFamilyId;
  productName: string;
  capacitanceDisplay: string; // e.g. "40/60 µF", "25 MFD", "3300 µF"
  capacitanceMin?: number;
  capacitanceMax?: number;
  capacitanceUnit: 'µF' | 'MFD' | 'nF' | 'pF';
  voltageDisplay: string; // e.g. "250V AC", "440V AC", "450V DC"
  voltageRating: number;
  voltageType: 'AC' | 'DC';
  frequencyRating?: '50/60 Hz' | 'DC Only' | 'High Frequency';
  tolerance: '±5%' | '±10%' | '±15%' | '-10%/+20%';
  dimensions: CapacitorDimensions;
  bodyMaterial: BodyMaterial;
  construction: DielectricConstruction;
  terminalType: TerminalType;
  temperatureRating: string; // e.g. "-40°C to +85°C", "-25°C to +70°C"
  dutyCycle: string; // e.g. "Intermittent 1.67%", "Continuous 100%", "Heavy Duty"
  applicationTags: string[]; // e.g. ["Single Phase Motors", "Air Conditioners", "Submersible Pumps"]
  availability: AvailabilityStatus;
  pricing: PricingData;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  status?: 'active' | 'draft';
  image?: string;
  primaryImage?: string;
  secondaryImage?: string;
  gallery?: string[];
  galleryImages?: string[];
  video?: string;
  compareAtPrice?: number;
  catalogueOrder?: number;
  createdAt?: string;
  updatedAt?: string;
  technicalDrawing?: string;
  thumbnail?: string;
  documents?: TechnicalDocument[];
  seoDescription?: string;
  notes?: string;
}

export interface ProductFamily {
  id: ProductFamilyId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  fullOverview: string;
  badge: string;
  variantCountEstimate: number; // e.g. 140, 95, 160, 95
  image: string;
  accentColor: string;
  keySpecs: { label: string; value: string }[];
  applications: string[];
  operatingRange: {
    capacitanceRange: string;
    voltageRange: string;
    operatingTemp: string;
  };
}

export interface MarketBenchmark {
  id: string;
  spec: string;
  brand: string;
  marketPriceINR: number;
  sourceContext: string;
  neutraCapProposedRef?: string;
}

export interface CustomRequirementSubmission {
  id: string;
  capacitance: string;
  voltage: string;
  dimensions: {
    diameter?: string;
    height?: string;
  };
  terminalType: string;
  quantity: string;
  application: string;
  photoUrl?: string;
  message: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    city?: string;
  };
  status: 'new' | 'in_review' | 'quoted' | 'closed';
  createdAt: string;
}

export interface QuickEnquiry {
  id: string;
  variantId?: string;
  variantName?: string;
  specsSummary?: string;
  name: string;
  phone: string;
  email: string;
  quantity: string;
  deliveryPincode?: string;
  notes?: string;
  status: 'pending' | 'contacted' | 'resolved';
  createdAt: string;
}

export type FounderRole = 'FOUNDER' | 'ADMIN' | 'PUBLIC';

export interface FounderAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: FounderRole;
  actionType: 'PRICE_UPDATE' | 'VARIANT_ADD' | 'IMAGE_CHANGE' | 'HERO_UPDATE' | 'CATEGORY_REORDER' | 'FEATURED_TOGGLE';
  summary: string;
  details?: string;
  diff?: {
    before: any;
    after: any;
  };
}

export interface AICommandProposal {
  id: string;
  rawPrompt: string;
  parsedIntent: string;
  targetCategory?: string;
  targetSku?: string;
  proposedChanges: {
    field: string;
    oldValue?: any;
    newValue: any;
  }[];
  impactLevel: 'low' | 'medium' | 'high_destructive';
  requiresConfirmation: boolean;
  createdAt: string;
  status: 'pending_review' | 'approved_applied' | 'rejected';
}

export interface TrustMetricItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  iconName: string;
}

export interface CustomSpecificationRequest {
  familyId: ProductFamilyId;
  capacitance: string;
  voltage: string;
  application: string;
  quantity: number;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  targetTimeline?: string;
  notes?: string;
}

export interface EnquiryCartItem {
  id: string;
  product: CapacitorVariant;
  quantity: number;
}
