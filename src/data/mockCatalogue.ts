/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP MASTER CATALOGUE & SINGLE SOURCE OF TRUTH
 * 490 Verified Baseline Variants Matrix (Locked Canonical Dataset)
 * 
 * Canonical Family Breakdown:
 * 1. Starting Capacitors: 40 variants (10 capacitance steps × 4 voltages: 200V, 250V, 400V, 450V AC)
 * 2. Green Filter Capacitors: 40 variants (10 capacitance steps × 4 voltages: 200V, 250V, 400V, 450V AC)
 * 3. Running Capacitors: 62 variants (23 single-value + 8 dual-value across 400V & 450V AC)
 * 4. DC Aluminium Electrolytic: 348 variants (29 capacitance steps × 12 voltages: 35V to 500V DC)
 * 
 * Total: Exactly 490 Authoritative Variants
 */

import { 
  ProductFamily, 
  CapacitorVariant, 
  MarketBenchmark, 
  TrustMetricItem, 
  FounderAuditLog 
} from '../types';
import { SITE_FACTS } from './siteFacts';

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    id: 'starting',
    name: 'Starting Capacitors',
    shortName: 'Starting',
    tagline: 'High starting torque for heavy AC motor initiation',
    description: 'Engineered for high instantaneous peak starting torque in single-phase induction motors, compressors, and heavy refrigeration equipment.',
    fullOverview: 'NeutraCap Starting Capacitors are manufactured using high-purity etched aluminium dielectric encapsulated in flame-retardant phenolic or heavy-duty thermoplastic cans. Designed for high cycle reliability and short-time intermittent duty cycle (1.67%).',
    badge: 'High Torque AC Initiation',
    variantCountEstimate: 40,
    image: '/assets/products/starting/starting_hero.png',
    accentColor: '#0066FF',
    keySpecs: [
      { label: 'Voltage Range', value: '200V – 450V AC' },
      { label: 'Duty Cycle', value: 'Intermittent 1.67%' },
      { label: 'Dielectric', value: 'Electrolytic Foil & Paper' },
      { label: 'Housing', value: 'Phenolic / UL94 V-0' }
    ],
    applications: [
      'Single Phase Electric Motors',
      'Air Compressors & Blowers',
      'Refrigeration Units',
      'High-Load Submersible Pumps',
      'Heavy Workshop Machinery'
    ],
    operatingRange: {
      capacitanceRange: '40/60 µF to 400/500 µF',
      voltageRange: '200V – 250V – 400V – 450V AC',
      operatingTemp: '-25°C to +65°C'
    }
  },
  {
    id: 'green_filter',
    name: 'Green Filter Capacitors',
    shortName: 'Green Filter',
    tagline: 'Surge suppression & harmonic power factor filtering',
    description: 'Low-loss metallized polypropylene capacitors for active harmonic suppression, clean power filtering, and dynamic power factor correction.',
    fullOverview: 'Built with segmented safety film technology and vacuum-impregnated resin, NeutraCap Green Filter Capacitors optimize electrical energy efficiency, suppress transient line harmonics, and protect sensitive industrial motor controllers from switching surges.',
    badge: 'Harmonic Clean Power',
    variantCountEstimate: 40,
    image: '/assets/products/green-filter/green_filter_hero.png',
    accentColor: '#00B140',
    keySpecs: [
      { label: 'Voltage Range', value: '200V – 450V AC' },
      { label: 'Dielectric', value: 'Self-Healing MKP' },
      { label: 'Loss Factor (tan δ)', value: '≤ 0.0005 at 50Hz' },
      { label: 'Safety System', value: 'Overpressure Disconnector' }
    ],
    applications: [
      'Automatic Power Factor Panels (APFC)',
      'Solar Grid Inverters',
      'Industrial Filter Banks',
      'HVAC Variable Speed Drives',
      'Harmonic Mitigation Systems'
    ],
    operatingRange: {
      capacitanceRange: '40/60 µF to 400/500 µF',
      voltageRange: '200V – 250V – 400V – 450V AC',
      operatingTemp: '-40°C to +85°C'
    }
  },
  {
    id: 'running',
    name: 'Running Capacitors',
    shortName: 'Running',
    tagline: 'Continuous-duty motor run with low dielectric loss',
    description: 'Self-healing metallized film capacitors engineered for 10,000+ continuous operating hours in fans, air conditioning, and continuous-run motors.',
    fullOverview: 'NeutraCap Running Capacitors deliver exceptionally stable capacitance over 35+ years of real-world operational testing. Incorporating zinc-aluminium alloy metallization and hermetically sealed aluminium or fire-resistant plastic shells.',
    badge: '10,000h Continuous Duty',
    variantCountEstimate: 62,
    image: '/assets/products/running/running_hero.png',
    accentColor: '#0A2A5E',
    keySpecs: [
      { label: 'Voltage Range', value: '400V – 450V AC' },
      { label: 'Duty Cycle', value: 'Continuous 100%' },
      { label: 'Expected Life', value: '10,000 hrs Class B' },
      { label: 'Tolerance', value: '±5% Standard' }
    ],
    applications: [
      'Ceiling & Exhaust Industrial Fans',
      'Air Conditioner Compressors',
      'Domestic & Agricultural Pumps',
      'Washing Machine Motors',
      'Ventilation & Exhaust Blowers'
    ],
    operatingRange: {
      capacitanceRange: '2 µF to 80 µF (Single & Dual)',
      voltageRange: '400V – 450V AC',
      operatingTemp: '-25°C to +85°C'
    }
  },
  {
    id: 'dc_electrolytic',
    name: 'DC Aluminium Electrolytic Capacitors',
    shortName: 'DC Electrolytic',
    tagline: 'High ripple current & energy storage for industrial power electronics',
    description: 'Heavy-duty screw terminal and snap-in electrolytic capacitors for DC bus links, frequency converters, switch-mode power supplies, and inverters.',
    fullOverview: 'Featuring etched high-capacitance foils, ultra-low ESR, and high ripple current capability. NeutraCap DC Aluminium Electrolytic Capacitors provide robust energy storage under demanding thermal and electrical stresses.',
    badge: 'High Ripple & DC Energy Link',
    variantCountEstimate: 348,
    image: '/assets/products/dc/dc_hero.png',
    accentColor: '#0066FF',
    keySpecs: [
      { label: 'Voltage Range', value: '35V – 500V DC' },
      { label: 'Terminal Style', value: 'Heavy Screw M5/M6 / Snap-in / Radial' },
      { label: 'Useful Life', value: '≥ 5,000 hrs at 105°C' },
      { label: 'ESR', value: 'Ultra-Low Impedance' }
    ],
    applications: [
      'Industrial VFD Motor Drives',
      'Uninterruptible Power Supplies (UPS)',
      'Solar & Wind Power Converters',
      'Welding Inverter Equipment',
      'Electric Vehicle Charging Stations'
    ],
    operatingRange: {
      capacitanceRange: '47 µF to 22000+ µF',
      voltageRange: '35V – 500V DC',
      operatingTemp: '-40°C to +105°C'
    }
  }
];

// ==========================================
// 1. STARTING CAPACITORS (EXACTLY 40 VARIANTS)
// 10 Capacitance Combinations × 4 Voltages (200V, 230V, 400V, 450V AC)
// ==========================================
const startingSteps = [
  { min: 40, max: 60, display: '40/60 µF', d: 36, h: 70, base230: 102, mrp230: 135 },
  { min: 60, max: 80, display: '60/80 µF', d: 40, h: 75, base230: 118, mrp230: 155 },
  { min: 80, max: 100, display: '80/100 µF', d: 45, h: 85, base230: 134, mrp230: 175 },
  { min: 100, max: 120, display: '100/120 µF', d: 45, h: 85, base230: 152, mrp230: 195 },
  { min: 120, max: 150, display: '120/150 µF', d: 45, h: 105, base230: 171, mrp230: 222 },
  { min: 150, max: 200, display: '150/200 µF', d: 45, h: 105, base230: 186, mrp230: 242 },
  { min: 200, max: 250, display: '200/250 µF', d: 52, h: 105, base230: 203, mrp230: 260 },
  { min: 250, max: 350, display: '250/350 µF', d: 52, h: 120, base230: 229, mrp230: 298 },
  { min: 300, max: 400, display: '300/400 µF', d: 52, h: 120, base230: 265, mrp230: 345 },
  { min: 400, max: 500, display: '400/500 µF', d: 55, h: 125, base230: 312, mrp230: 405 },
];

const startingVoltages = [
  { v: 200, label: '200V AC', factor: 0.90 },
  { v: 230, label: '230V AC', factor: 1.0 },
  { v: 400, label: '400V AC', factor: 1.35 },
  { v: 450, label: '450V AC', factor: 1.48 },
];

const startingVariants: CapacitorVariant[] = startingSteps.flatMap((step) => {
  return startingVoltages.map((volt) => {
    const launchPrice = Math.round(step.base230 * volt.factor);
    const mrp = Math.round(step.mrp230 * volt.factor);
    const skuCap = `${step.min}-${step.max}`;
    const id = `nc-start-${step.min}${step.max}-${volt.v}`;
    const sku = `NC-SC-${skuCap}-${volt.v}V`;

    // Map approved production image assets for 40/60 µF and 60/80 µF 230V Starting Capacitors
    let productImage: string | undefined;
    let productImageThumb: string | undefined;
    let productImageFull: string | undefined;
    if (step.min === 40 && step.max === 60 && volt.v === 230) {
      productImage = '/assets/products/starting/NeutraCap_Starting_40-60uF_230V.webp';
      productImageThumb = '/assets/products/starting/NeutraCap_Starting_40-60uF_230V_thumb.webp';
      productImageFull = '/assets/products/starting/NeutraCap_Starting_40-60uF_230V_full.webp';
    } else if (step.min === 60 && step.max === 80 && volt.v === 230) {
      productImage = '/assets/products/starting/NeutraCap_Starting_60-80uF_230V.webp';
      productImageThumb = '/assets/products/starting/NeutraCap_Starting_60-80uF_230V_thumb.webp';
      productImageFull = '/assets/products/starting/NeutraCap_Starting_60-80uF_230V_full.webp';
    }

    return {
      id,
      sku,
      familyId: 'starting',
      productName: `Starting Capacitor ${step.display} ${volt.label}`,
      capacitanceDisplay: step.display,
      capacitanceMin: step.min,
      capacitanceMax: step.max,
      capacitanceUnit: 'µF',
      voltageDisplay: volt.label,
      voltageRating: volt.v,
      voltageType: 'AC',
      frequencyRating: '50/60 Hz',
      tolerance: '±15%',
      dimensions: {
        diameterMm: step.d,
        heightMm: step.h,
        totalHeightWithTerminalsMm: step.h + 12,
        mountingType: 'Plain Bottom',
        caseCode: `C${step.d}x${step.h}`
      },
      bodyMaterial: 'Flame Retardant Plastic (UL94 V-0)',
      construction: 'Electrolytic Etched Foil & High Purity Paper',
      terminalType: 'Double Faston 6.3mm',
      temperatureRating: '-30°C / +70°C',
      dutyCycle: '1.7%',
      applicationTags: ['Single Phase Motors', 'Compressors', 'Submersible Pumps', 'Air Blowers'],
      availability: 'in_stock',
      pricing: {
        currency: 'INR',
        basePrice: Math.round(launchPrice * 1.08),
        mrp,
        launchPrice,
        discountPercentage: 7.5,
        effectiveLaunchReduction: 7.5,
        minOrderQuantity: 10
      },
      isFeatured: volt.v === 230 && (step.min === 40 || step.min === 60 || step.min === 200),
      isBestSeller: volt.v === 230 && (step.min === 40 || step.min === 60),
      image: productImage,
      primaryImage: productImage,
      thumbnail: productImageThumb,
      gallery: productImageFull ? [productImageFull, productImage] : undefined,
      galleryImages: productImageFull ? [productImageFull] : undefined,
      seoDescription: `NeutraCap ${step.display} ${volt.label} AC Motor Starting Capacitor.`
    };
  });
});

// ==========================================
// 2. GREEN FILTER CAPACITORS (EXACTLY 40 VARIANTS)
// 10 Capacitance Combinations × 4 Voltages (200V, 250V, 400V, 450V AC)
// ==========================================
const greenFilterSteps = [
  { min: 40, max: 60, display: '40/60 µF', d: 45, h: 95, base250: 165, mrp250: 215 },
  { min: 60, max: 80, display: '60/80 µF', d: 50, h: 100, base250: 190, mrp250: 245 },
  { min: 80, max: 100, display: '80/100 µF', d: 50, h: 105, base250: 215, mrp250: 280 },
  { min: 100, max: 120, display: '100/120 µF', d: 55, h: 120, base250: 240, mrp250: 310 },
  { min: 120, max: 150, display: '120/150 µF', d: 55, h: 125, base250: 265, mrp250: 340 },
  { min: 150, max: 200, display: '150/200 µF', d: 60, h: 130, base250: 295, mrp250: 380 },
  { min: 200, max: 250, display: '200/250 µF', d: 60, h: 135, base250: 325, mrp250: 410 },
  { min: 250, max: 350, display: '250/350 µF', d: 65, h: 140, base250: 351, mrp250: 440 },
  { min: 300, max: 400, display: '300/400 µF', d: 65, h: 145, base250: 380, mrp250: 480 },
  { min: 400, max: 500, display: '400/500 µF', d: 70, h: 150, base250: 430, mrp250: 550 },
];

const greenFilterVoltages = [
  { v: 200, label: '200V AC', factor: 0.90 },
  { v: 250, label: '250V AC', factor: 1.0 },
  { v: 400, label: '400V AC', factor: 1.35 },
  { v: 450, label: '450V AC', factor: 1.48 },
];

const greenFilterVariants: CapacitorVariant[] = greenFilterSteps.flatMap((step) => {
  return greenFilterVoltages.map((volt) => {
    const launchPrice = Math.round(step.base250 * volt.factor);
    const mrp = Math.round(step.mrp250 * volt.factor);
    const skuCap = `${step.min}-${step.max}`;
    const id = `nc-gf-${step.min}${step.max}-${volt.v}`;
    const sku = `NC-GF-${skuCap}-${volt.v}V`;

    return {
      id,
      sku,
      familyId: 'green_filter',
      productName: `Green Filter Capacitor ${step.display} ${volt.label}`,
      capacitanceDisplay: step.display,
      capacitanceMin: step.min,
      capacitanceMax: step.max,
      capacitanceUnit: 'µF',
      voltageDisplay: volt.label,
      voltageRating: volt.v,
      voltageType: 'AC',
      frequencyRating: '50/60 Hz',
      tolerance: '±5%',
      dimensions: {
        diameterMm: step.d,
        heightMm: step.h,
        totalHeightWithTerminalsMm: step.h + 15,
        mountingType: 'Bottom Stud M8',
        caseCode: `GF${step.d}x${step.h}`
      },
      bodyMaterial: 'Extruded Aluminium Can',
      construction: 'Segmented Safety Film Metallization',
      terminalType: 'Double Faston 6.3mm',
      temperatureRating: '-40°C to +85°C',
      dutyCycle: 'Continuous 100%',
      applicationTags: ['APFC Panels', 'Solar Grid Inverters', 'Harmonic Filter Banks', 'VFD Drives'],
      availability: 'in_stock',
      pricing: {
        currency: 'INR',
        basePrice: Math.round(launchPrice * 1.08),
        mrp,
        launchPrice,
        discountPercentage: 7.5,
        effectiveLaunchReduction: 7.5,
        minOrderQuantity: 5
      },
      isFeatured: volt.v === 450 && (step.min === 40 || step.min === 100),
      isBestSeller: volt.v === 450 && step.min === 40,
      image: `/assets/products/green-filter/gf_${step.min}${step.max}.png`,
      seoDescription: `NeutraCap ${step.display} ${volt.label} Harmonic Filter Capacitor.`
    };
  });
});

// ==========================================
// 3. RUNNING CAPACITORS (EXACTLY 62 VARIANTS)
// Group A: 23 Single-Value × 2 Voltages (400V, 450V AC) = 46 variants
// Group B: 8 Dual-Value × 2 Voltages (400V, 450V AC) = 16 variants
// Total = 46 + 16 = 62 variants
// ==========================================
const singleRunningSteps = [
  { val: 2, display: '2 µF', d: 25, h: 55, base400: 25.0, mrp400: 36 },
  { val: 2.5, display: '2.5 µF', d: 25, h: 55, base400: 27.5, mrp400: 40 },
  { val: 3, display: '3 µF', d: 28, h: 55, base400: 30.0, mrp400: 43 },
  { val: 3.15, display: '3.15 µF', d: 28, h: 55, base400: 31.6, mrp400: 45 },
  { val: 3.5, display: '3.5 µF', d: 28, h: 60, base400: 33.0, mrp400: 47 },
  { val: 4, display: '4 µF', d: 30, h: 60, base400: 35.3, mrp400: 50 },
  { val: 5, display: '5 µF', d: 30, h: 60, base400: 39.0, mrp400: 55 },
  { val: 6, display: '6 µF', d: 30, h: 65, base400: 42.8, mrp400: 60 },
  { val: 8, display: '8 µF', d: 35, h: 70, base400: 51.2, mrp400: 72 },
  { val: 10, display: '10 µF', d: 35, h: 75, base400: 59.5, mrp400: 84 },
  { val: 12.5, display: '12.5 µF', d: 40, h: 75, base400: 69.8, mrp400: 98 },
  { val: 15, display: '15 µF', d: 40, h: 80, base400: 80.0, mrp400: 112 },
  { val: 20, display: '20 µF', d: 40, h: 95, base400: 102.3, mrp400: 140 },
  { val: 25, display: '25 µF', d: 45, h: 95, base400: 122.8, mrp400: 165 },
  { val: 30, display: '30 µF', d: 45, h: 105, base400: 144.2, mrp400: 190 },
  { val: 36, display: '36 µF', d: 50, h: 105, base400: 167.4, mrp400: 220 },
  { val: 40, display: '40 µF', d: 50, h: 105, base400: 181.4, mrp400: 240 },
  { val: 45, display: '45 µF', d: 50, h: 115, base400: 195.3, mrp400: 260 },
  { val: 50, display: '50 µF', d: 50, h: 115, base400: 210.2, mrp400: 275 },
  { val: 60, display: '60 µF', d: 55, h: 125, base400: 240.8, mrp400: 315 },
  { val: 70, display: '70 µF', d: 55, h: 130, base400: 274.4, mrp400: 355 },
  { val: 72, display: '72 µF', d: 55, h: 130, base400: 280.0, mrp400: 365 },
  { val: 80, display: '80 µF', d: 60, h: 140, base400: 311.6, mrp400: 405 },
];

const dualRunningSteps = [
  { val1: 25, val2: 5, display: '25/5 µF', d: 50, h: 105, base400: 145.0, mrp400: 195 },
  { val1: 30, val2: 5, display: '30/5 µF', d: 50, h: 105, base400: 168.0, mrp400: 225 },
  { val1: 35, val2: 5, display: '35/5 µF', d: 50, h: 115, base400: 188.0, mrp400: 250 },
  { val1: 35, val2: 6, display: '35/6 µF', d: 50, h: 115, base400: 192.0, mrp400: 255 },
  { val1: 40, val2: 5, display: '40/5 µF', d: 50, h: 115, base400: 205.0, mrp400: 270 },
  { val1: 45, val2: 5, display: '45/5 µF', d: 55, h: 125, base400: 222.0, mrp400: 295 },
  { val1: 50, val2: 5, display: '50/5 µF', d: 55, h: 125, base400: 240.0, mrp400: 320 },
  { val1: 60, val2: 5, display: '60/5 µF', d: 60, h: 135, base400: 275.0, mrp400: 365 },
];

const runningVoltages = [
  { v: 400, label: '400V AC', factor: 1.0 },
  { v: 450, label: '450V AC', factor: 1.06 },
];

const singleRunningVariants: CapacitorVariant[] = singleRunningSteps.flatMap((step) => {
  return runningVoltages.map((volt) => {
    const launchPrice = Math.round((step.base400 * volt.factor) * 10) / 10;
    const mrp = Math.round(step.mrp400 * volt.factor);
    const skuVal = step.val.toString().replace('.', '_');
    const id = `nc-run-${skuVal}uf-${volt.v}`;
    const sku = `NC-RC-${step.val}UF-${volt.v}V`;

    return {
      id,
      sku,
      familyId: 'running',
      productName: `Running Capacitor ${step.display} ${volt.label}`,
      capacitanceDisplay: step.display,
      capacitanceMin: step.val,
      capacitanceMax: step.val,
      capacitanceUnit: 'µF',
      voltageDisplay: volt.label,
      voltageRating: volt.v,
      voltageType: 'AC',
      frequencyRating: '50/60 Hz',
      tolerance: '±5%',
      dimensions: {
        diameterMm: step.d,
        heightMm: step.h,
        totalHeightWithTerminalsMm: step.h + 13,
        mountingType: step.val <= 4.0 ? 'Plain Bottom' : 'Bottom Stud M8',
        caseCode: `R${step.d}x${step.h}`
      },
      bodyMaterial: step.val <= 4.0 ? 'Flame Retardant Plastic (UL94 V-0)' : 'Extruded Aluminium Can',
      construction: 'Metallized Polypropylene Film (MKP)',
      terminalType: step.val <= 4.0 ? 'Flexible Insulated Wires' : 'Double Faston 6.3mm',
      temperatureRating: '-25°C to +85°C',
      dutyCycle: 'Continuous 100%',
      applicationTags: ['Ceiling Fans', 'HVAC Air Conditioning', 'Water Pumps', 'Industrial Machinery'],
      availability: 'in_stock',
      pricing: {
        currency: 'INR',
        basePrice: Math.round(launchPrice * 1.08),
        mrp,
        launchPrice,
        discountPercentage: 7.5,
        effectiveLaunchReduction: 7.5,
        minOrderQuantity: step.val <= 4.0 ? 50 : 10
      },
      isFeatured: volt.v === 450 && (step.val === 2.5 || step.val === 36 || step.val === 50),
      isBestSeller: volt.v === 450 && (step.val === 2.5 || step.val === 50),
      image: `/assets/products/running/rc_${skuVal}.png`,
      seoDescription: `NeutraCap ${step.display} ${volt.label} Continuous Motor Run Capacitor.`
    };
  });
});

const dualRunningVariants: CapacitorVariant[] = dualRunningSteps.flatMap((step) => {
  return runningVoltages.map((volt) => {
    const launchPrice = Math.round((step.base400 * volt.factor) * 10) / 10;
    const mrp = Math.round(step.mrp400 * volt.factor);
    const skuVal = `${step.val1}_${step.val2}`;
    const id = `nc-rundual-${skuVal}uf-${volt.v}`;
    const sku = `NC-RC-${step.val1}-${step.val2}UF-${volt.v}V`;

    return {
      id,
      sku,
      familyId: 'running',
      productName: `Dual Running Capacitor ${step.display} ${volt.label}`,
      capacitanceDisplay: step.display,
      capacitanceMin: step.val2,
      capacitanceMax: step.val1,
      capacitanceUnit: 'µF',
      voltageDisplay: volt.label,
      voltageRating: volt.v,
      voltageType: 'AC',
      frequencyRating: '50/60 Hz',
      tolerance: '±5%',
      dimensions: {
        diameterMm: step.d,
        heightMm: step.h,
        totalHeightWithTerminalsMm: step.h + 15,
        mountingType: 'Bottom Stud M8',
        caseCode: `RD${step.d}x${step.h}`
      },
      bodyMaterial: 'Extruded Aluminium Can',
      construction: 'Metallized Polypropylene Dual Section (MKP)',
      terminalType: 'Triple Blade Quick Connect (Herm/Fan/C)',
      temperatureRating: '-25°C to +85°C',
      dutyCycle: 'Continuous 100%',
      applicationTags: ['Dual Run HVAC Compressors', 'Condenser Fan & Compressor Combo', 'Central Air Systems'],
      availability: 'in_stock',
      pricing: {
        currency: 'INR',
        basePrice: Math.round(launchPrice * 1.08),
        mrp,
        launchPrice,
        discountPercentage: 7.5,
        effectiveLaunchReduction: 7.5,
        minOrderQuantity: 10
      },
      isFeatured: volt.v === 450 && step.val1 === 35,
      isBestSeller: volt.v === 450 && step.val1 === 45,
      image: `/assets/products/running/rc_dual_${skuVal}.png`,
      seoDescription: `NeutraCap Dual ${step.display} ${volt.label} HVAC Motor Run Capacitor.`
    };
  });
});

const runningVariants: CapacitorVariant[] = [
  ...singleRunningVariants, // 23 * 2 = 46
  ...dualRunningVariants,   // 8 * 2 = 16
];

// ==========================================
// 4. DC ALUMINIUM ELECTROLYTIC (EXACTLY 348 VARIANTS)
// EXACT 29 Capacitance Steps × EXACT 12 Voltages (35V to 500V DC)
// 29 × 12 = 348 variants
// ==========================================
const dcCapSteps = [
  47, 68, 100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820,
  1000, 1200, 1500, 1800, 2200, 2700, 3300, 3900, 4700, 5600, 6800, 8200,
  10000, 15000, 22000
];

const dcVoltages = [
  35, 50, 63, 100, 150, 200, 250, 300, 350, 400, 450, 500
];

// Specific known benchmark overrides:
const dcOverrides: Record<string, { launch: number; mrp: number; base: number }> = {
  '47-450': { launch: 44, mrp: 58, base: 47 },
  '100-400': { launch: 86, mrp: 110, base: 93 },
  '100-450': { launch: 88, mrp: 115, base: 95 },
  '220-400': { launch: 97, mrp: 125, base: 95 },
  '220-450': { launch: 109, mrp: 140, base: 105 },
  '470-400': { launch: 127, mrp: 165, base: 118 },
  '470-450': { launch: 138, mrp: 180, base: 138 },
  '2200-450': { launch: 1157, mrp: 1480, base: 1251 },
  '3300-450': { launch: 1479, mrp: 1880, base: 1599 },
};

const dcVariants: CapacitorVariant[] = dcCapSteps.flatMap((cap) => {
  return dcVoltages.map((volt) => {
    const overrideKey = `${cap}-${volt}`;
    const isOverridden = !!dcOverrides[overrideKey];
    
    // Physical energy storage scaling (0.5 * C * V^2)
    const energyFactor = Math.sqrt((cap * volt * volt) / 10000);
    const calculatedLaunch = isOverridden 
      ? dcOverrides[overrideKey].launch 
      : Math.max(18, Math.round(energyFactor * 1.65));
    const calculatedMrp = isOverridden 
      ? dcOverrides[overrideKey].mrp 
      : Math.round(calculatedLaunch * 1.30);
    const calculatedBase = isOverridden 
      ? dcOverrides[overrideKey].base 
      : Math.round(calculatedLaunch * 1.08);

    const isScrew = (cap >= 2200 && volt >= 350) || cap >= 10000;
    const isSnapIn = (cap >= 100 && volt >= 150) || cap >= 1000;
    const terminalType = isScrew 
      ? 'Screw Terminals M6/M8' 
      : isSnapIn 
        ? 'PCB Snap-in Pins' 
        : 'Axial Leads';
    const mountingType = isScrew 
      ? 'Bracket Mount' 
      : isSnapIn 
        ? 'PCB Snap-in' 
        : 'Plain Bottom';

    const diameterMm = isScrew 
      ? (cap >= 3300 ? 76 : 65) 
      : isSnapIn 
        ? (cap >= 470 ? 35 : 25) 
        : (cap >= 100 ? 16 : 10);
    const heightMm = isScrew 
      ? 105 
      : isSnapIn 
        ? (cap >= 470 ? 50 : 35) 
        : 25;

    const capDisplay = cap === 22000 ? '22000+ µF' : `${cap} µF`;

    return {
      id: `nc-dc-${cap}uf-${volt}`,
      sku: `NC-DC-${cap}UF-${volt}V`,
      familyId: 'dc_electrolytic',
      productName: `DC Aluminium Electrolytic ${capDisplay} ${volt}V DC`,
      capacitanceDisplay: capDisplay,
      capacitanceMin: cap,
      capacitanceMax: cap,
      capacitanceUnit: 'µF',
      voltageDisplay: `${volt}V DC`,
      voltageRating: volt,
      voltageType: 'DC',
      frequencyRating: 'DC Only',
      tolerance: '-10%/+20%',
      dimensions: {
        diameterMm,
        heightMm,
        mountingType,
        caseCode: `DC${diameterMm}x${heightMm}`
      },
      bodyMaterial: 'Cylindrical Aluminium Housing',
      construction: 'Electrolytic Etched Foil & High Purity Paper',
      terminalType,
      temperatureRating: '-40°C to +105°C',
      dutyCycle: 'Continuous 100%',
      applicationTags: ['Industrial VFD Drives', 'UPS Bus Links', 'Solar Inverters', 'SMPS Supplies'],
      availability: 'in_stock',
      pricing: {
        currency: 'INR',
        basePrice: calculatedBase,
        mrp: calculatedMrp,
        launchPrice: calculatedLaunch,
        discountPercentage: 7.5,
        effectiveLaunchReduction: 7.5,
        minOrderQuantity: isScrew ? 2 : isSnapIn ? 10 : 25
      },
      isFeatured: isOverridden,
      isBestSeller: overrideKey === '470-450' || overrideKey === '3300-450' || overrideKey === '220-450',
      image: `/assets/products/dc/dc_${cap}.png`,
      seoDescription: `NeutraCap ${capDisplay} ${volt}V DC Heavy Duty Electrolytic Capacitor.`
    };
  });
});

// COMBINED MASTER 490 DATASET (LOCKED SINGLE SOURCE OF TRUTH)
export const INITIAL_VARIANTS: CapacitorVariant[] = [
  ...startingVariants,     // exactly 40
  ...greenFilterVariants, // exactly 40
  ...runningVariants,     // exactly 62 (46 + 16)
  ...dcVariants,          // exactly 348 (29 * 12)
];

export const MARKET_BENCHMARKS: MarketBenchmark[] = [
  {
    id: 'bm-1',
    spec: '47 µF / 450V DC',
    brand: 'Kendeil Market Reference',
    marketPriceINR: 47,
    sourceContext: 'Industrial Distributor Baseline Rate',
    neutraCapProposedRef: 'NC-DC-47UF-450V'
  },
  {
    id: 'bm-2',
    spec: '100 µF / 400V DC',
    brand: 'Kendeil Market Reference',
    marketPriceINR: 93,
    sourceContext: 'Industrial Distributor Baseline Rate',
    neutraCapProposedRef: 'NC-DC-100UF-400V'
  },
  {
    id: 'bm-3',
    spec: '100 µF / 450V DC',
    brand: 'Kendeil Market Reference',
    marketPriceINR: 95,
    sourceContext: 'Industrial Distributor Baseline Rate',
    neutraCapProposedRef: 'NC-DC-100UF-450V'
  },
  {
    id: 'bm-4',
    spec: '220 µF / 400V DC',
    brand: 'Kendeil Market Reference',
    marketPriceINR: 95,
    sourceContext: 'Industrial Distributor Baseline Rate',
    neutraCapProposedRef: 'NC-DC-220UF-400V'
  },
  {
    id: 'bm-5',
    spec: '220 µF / 450V DC',
    brand: 'Kendeil Market Reference',
    marketPriceINR: 105,
    sourceContext: 'Industrial Distributor Baseline Rate',
    neutraCapProposedRef: 'NC-DC-220UF-450V'
  },
  {
    id: 'bm-6',
    spec: '470 µF / 400V DC',
    brand: 'Kendeil Market Reference',
    marketPriceINR: 125,
    sourceContext: 'Industrial Distributor Baseline Rate',
    neutraCapProposedRef: 'NC-DC-470UF-400V'
  },
  {
    id: 'bm-7',
    spec: '470 µF / 450V DC',
    brand: 'Kendeil Market Reference',
    marketPriceINR: 138,
    sourceContext: 'Industrial Distributor Baseline Rate',
    neutraCapProposedRef: 'NC-DC-470UF-450V'
  },
  {
    id: 'bm-8',
    spec: '2200 µF / 450V DC',
    brand: 'Kendeil Market Reference',
    marketPriceINR: 1251,
    sourceContext: 'Industrial Distributor Baseline Rate',
    neutraCapProposedRef: 'NC-DC-2200UF-450V'
  },
  {
    id: 'bm-9',
    spec: '3300 µF / 450V DC',
    brand: 'Kendeil Market Reference',
    marketPriceINR: 1599,
    sourceContext: 'Industrial Distributor Baseline Rate',
    neutraCapProposedRef: 'NC-DC-3300UF-450V'
  }
];

export const TRUST_CAPABILITIES = [
  {
    id: 'cap-1',
    title: 'Precision Manufacturing',
    description: 'Automated winding tension control and high-purity dielectric materials guarantee ultra-consistent capacitance values and thermal resilience.',
    iconName: 'Cpu'
  },
  {
    id: 'cap-2',
    title: 'Reliable Performance',
    description: 'Engineered for high dV/dt withstand, heavy surge endurance, and long-term capacitance stability under tough industrial environments.',
    iconName: 'Zap'
  },
  {
    id: 'cap-3',
    title: 'Tested for Excellence',
    description: '100% routine dielectric breakdown and insulation resistance validation on every batch before factory dispatch.',
    iconName: 'CheckCircle2'
  },
  {
    id: 'cap-4',
    title: 'Factory OEM Support',
    description: 'Direct access to senior application engineers for custom case sizing, terminal configurations, and batch volume quotes.',
    iconName: 'Headphones'
  }
];

export const TRUST_METRICS: TrustMetricItem[] = [
  {
    id: 'tm-1',
    value: '35+',
    label: 'Years of Experience',
    sublabel: 'Engineering heritage established since 1989',
    iconName: 'ShieldCheck'
  },
  {
    id: 'tm-2',
    value: '490',
    label: 'Engineered Variants',
    sublabel: 'Standardized baseline specifications across 4 families',
    iconName: 'Layers'
  },
  {
    id: 'tm-3',
    value: '10,000+',
    label: 'Industrial Partners & OEMs',
    sublabel: 'Trusted across heavy motor, HVAC, and power sectors',
    iconName: 'Users'
  },
  {
    id: 'tm-4',
    value: '28+',
    label: 'States Market Presence',
    sublabel: 'Direct pan-India dispatch and global export readiness',
    iconName: 'Globe2'
  }
];

export const TRUST_METRIC_ITEMS: TrustMetricItem[] = TRUST_METRICS;

export const INITIAL_AUDIT_LOGS: FounderAuditLog[] = [
  {
    id: 'audit-01',
    timestamp: '2026-08-25T10:00:00Z',
    actor: 'System Administrator',
    role: 'FOUNDER',
    actionType: 'VARIANT_ADD',
    summary: 'Locked canonical 490 variant baseline matrix across 4 families',
    details: 'Verified exactly 40 Starting, 40 Green Filter, 62 Running, and 348 DC Electrolytic variants.'
  },
  {
    id: 'audit-02',
    timestamp: '2026-08-25T09:00:00Z',
    actor: 'Quality Assurance Desk',
    role: 'ADMIN',
    actionType: 'PRICE_UPDATE',
    summary: 'Standardized direct manufacturer 7.5% baseline launch reduction',
    details: 'Applied 100% dielectric routine tested factory baseline pricing.'
  }
];

export const FOUNDER_AUDIT_LOGS: FounderAuditLog[] = INITIAL_AUDIT_LOGS;
