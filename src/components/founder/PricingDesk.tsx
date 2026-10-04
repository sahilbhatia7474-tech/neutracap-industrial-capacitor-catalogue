/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP FOUNDER VAULT — COMMERCIAL PRICING DESK
 * Direct Canonical SKU Price Editing, Voltage-Safe Single SKU Mutation, and Instant Public Sync
 * 
 * Requirements Implemented:
 * - Direct Pricing CRUD based on Canonical Product Registry
 * - Editable Fields: Launch Price, Base Price, MRP, MOQ, Effective Date, Reason / Change Note
 * - Price Safety: Single SKU mutation by default (voltage cross-variant bulk update disabled & confirmation protected)
 * - Table Columns: Product, SKU, Capacitance, Voltage, Launch Price, Status, Edit
 * - 20-per-page Pagination with Fast Family & Text Filtering across all variants
 * - Automatic Public Catalogue Sync & Immutable Audit Log Registration with Before/After Diff
 * - Verified Market Benchmark Reference Points
 * - Contextual Back Navigation (← Back to Overview)
 */

import React, { useState, useMemo } from 'react';
import { 
  DollarSign, 
  Search, 
  Edit3, 
  Check, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { 
  CapacitorVariant, 
  ProductFamilyId, 
  FounderRole 
} from '../../types';
import { MARKET_BENCHMARKS, INITIAL_VARIANTS } from '../../data/mockCatalogue';
import { upsertProduct, resolveCatalogueProducts } from '../../services/productRegistry';

interface PricingDeskProps {
  products: CapacitorVariant[];
  onProductsUpdated: (updatedProducts: CapacitorVariant[]) => void;
  onAddAuditLog: (log: {
    actor: string;
    role: FounderRole;
    actionType: 'PRICE_UPDATE';
    summary: string;
    targetId?: string;
    targetType?: 'PRICE';
    status?: 'CONFIRMED' | 'REVERSED' | 'DRAFT';
    diff?: { before: any; after: any };
    details?: string;
  }) => void;
  onBackToOverview?: () => void;
}

const ITEMS_PER_PAGE = 20;

export const PricingDesk: React.FC<PricingDeskProps> = ({
  products,
  onProductsUpdated,
  onAddAuditLog,
  onBackToOverview,
}) => {
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFamily, setSelectedFamily] = useState<ProductFamilyId | 'all'>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Feedback Messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Edit Modal State
  const [editingProduct, setEditingProduct] = useState<CapacitorVariant | null>(null);
  const [formLaunchPrice, setFormLaunchPrice] = useState<number>(0);
  const [formBasePrice, setFormBasePrice] = useState<number>(0);
  const [formMrp, setFormMrp] = useState<number>(0);
  const [formMoq, setFormMoq] = useState<number>(10);
  const [formEffectiveDate, setFormEffectiveDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [formReason, setFormReason] = useState<string>('Commercial rate adjustment');
  const [applyBulkVoltage, setApplyBulkVoltage] = useState<boolean>(false);
  const [showBulkConfirm, setShowBulkConfirm] = useState<boolean>(false);

  // Filtered and Paginated Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesFamily = selectedFamily === 'all' || p.familyId === selectedFamily;
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = 
        !searchLower ||
        p.sku.toLowerCase().includes(searchLower) ||
        p.productName.toLowerCase().includes(searchLower) ||
        p.capacitanceDisplay.toLowerCase().includes(searchLower) ||
        p.voltageDisplay.toLowerCase().includes(searchLower);
      return matchesFamily && matchesSearch;
    });
  }, [products, selectedFamily, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleOpenEdit = (product: CapacitorVariant) => {
    setEditingProduct(product);
    setFormLaunchPrice(product.pricing?.launchPrice || 0);
    setFormBasePrice(product.pricing?.basePrice || Math.round((product.pricing?.launchPrice || 100) * 1.1));
    setFormMrp(product.pricing?.mrp || Math.round((product.pricing?.launchPrice || 100) * 1.35));
    setFormMoq(product.pricing?.minOrderQuantity || 10);
    setFormEffectiveDate(new Date().toISOString().split('T')[0]);
    setFormReason('Commercial rate adjustment');
    setApplyBulkVoltage(false);
    setShowBulkConfirm(false);
    setErrorMessage(null);
  };

  const handleCloseEdit = () => {
    setEditingProduct(null);
    setApplyBulkVoltage(false);
    setShowBulkConfirm(false);
  };

  const handleSavePrice = () => {
    if (!editingProduct) return;

    if (formLaunchPrice <= 0) {
      setErrorMessage('Launch Price must be a valid positive amount.');
      return;
    }

    if (applyBulkVoltage && !showBulkConfirm) {
      setShowBulkConfirm(true);
      return;
    }

    const oldLaunchPrice = editingProduct.pricing?.launchPrice || 0;
    const oldBasePrice = editingProduct.pricing?.basePrice || 0;
    const oldMrp = editingProduct.pricing?.mrp || 0;
    const oldMoq = editingProduct.pricing?.minOrderQuantity || 10;

    if (applyBulkVoltage) {
      // Cross-variant bulk update for the same capacitance and family
      const matchingVariants = products.filter(
        (p) => p.familyId === editingProduct.familyId && p.capacitanceDisplay === editingProduct.capacitanceDisplay
      );

      matchingVariants.forEach((variant) => {
        const updated: CapacitorVariant = {
          ...variant,
          pricing: {
            ...variant.pricing,
            launchPrice: formLaunchPrice,
            basePrice: formBasePrice,
            mrp: formMrp,
            minOrderQuantity: formMoq,
          },
          updatedAt: new Date().toISOString(),
        };
        upsertProduct(updated);
      });

      const allUpdated = resolveCatalogueProducts(INITIAL_VARIANTS, true);
      onProductsUpdated(allUpdated);

      onAddAuditLog({
        actor: 'Founder',
        role: 'FOUNDER',
        actionType: 'PRICE_UPDATE',
        summary: `BULK_PRICE_UPDATE: Set Launch Price to ₹${formLaunchPrice} for all ${editingProduct.capacitanceDisplay} variants (${matchingVariants.length} SKUs)`,
        targetId: editingProduct.sku,
        targetType: 'PRICE',
        status: 'CONFIRMED',
        diff: {
          before: `₹${oldLaunchPrice} (Single SKU: ${editingProduct.sku})`,
          after: `₹${formLaunchPrice} (${matchingVariants.length} voltage variants)`,
        },
        details: `Reason: ${formReason} | Effective: ${formEffectiveDate} | Base: ₹${formBasePrice} | MRP: ₹${formMrp} | MOQ: ${formMoq}`,
      });

      setSuccessMessage(`✓ Updated launch price to ₹${formLaunchPrice} across ${matchingVariants.length} voltage variants.`);
    } else {
      // Voltage-Safe SINGLE SKU Update (Default and Enforced)
      const updatedProduct: CapacitorVariant = {
        ...editingProduct,
        pricing: {
          ...editingProduct.pricing,
          launchPrice: formLaunchPrice,
          basePrice: formBasePrice,
          mrp: formMrp,
          minOrderQuantity: formMoq,
        },
        updatedAt: new Date().toISOString(),
      };

      upsertProduct(updatedProduct);
      const allUpdated = resolveCatalogueProducts(INITIAL_VARIANTS, true);
      onProductsUpdated(allUpdated);

      onAddAuditLog({
        actor: 'Founder',
        role: 'FOUNDER',
        actionType: 'PRICE_UPDATE',
        summary: `PRICE_UPDATE: SKU ${editingProduct.sku} (${editingProduct.voltageDisplay}) Launch Price ₹${oldLaunchPrice} → ₹${formLaunchPrice}`,
        targetId: editingProduct.sku,
        targetType: 'PRICE',
        status: 'CONFIRMED',
        diff: {
          before: oldLaunchPrice,
          after: formLaunchPrice,
        },
        details: `Previous: ₹${oldLaunchPrice} | New: ₹${formLaunchPrice} | Base: ₹${formBasePrice} | MRP: ₹${formMrp} | MOQ: ${formMoq} | Effective: ${formEffectiveDate} | Reason: ${formReason}`,
      });

      setSuccessMessage(`✓ Price for SKU ${editingProduct.sku} updated to ₹${formLaunchPrice}. Catalogue synchronized.`);
    }

    setTimeout(() => setSuccessMessage(null), 5000);
    handleCloseEdit();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 font-sans">
      
      {/* Top Header & Contextual Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1E293B]">
        <div className="flex items-center gap-3">
          {onBackToOverview && (
            <button
              onClick={onBackToOverview}
              className="px-3 py-1.5 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer min-h-[38px]"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span>Back to Overview</span>
            </button>
          )}
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              Commercial Pricing Desk
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Authoritative commercial rate registry with single-SKU safety enforcement and audit logging.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-[#0066FF]/20 text-[#35C6E8] border border-[#0066FF]/40 text-xs font-mono font-bold">
            Total Rated Variants: {products.length}
          </span>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center gap-2 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Search & Family Filter Bar */}
      <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B] space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by SKU, Product Name, Capacitance, or Voltage (e.g. 40/60, 230V, NC-SC)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-10 pl-9 pr-3.5 rounded-lg bg-[#080D1A] border border-[#334155] text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
            />
          </div>

          {/* Family Filter Dropdown */}
          <div>
            <select
              value={selectedFamily}
              onChange={(e) => {
                setSelectedFamily(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#334155] text-xs font-mono text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
            >
              <option value="all">All Product Families ({products.length})</option>
              <option value="starting">Motor Starting (Plastic / Phenolic)</option>
              <option value="green_filter">Green Power Filter (Aluminium Can)</option>
              <option value="running">Motor Running (MKP)</option>
              <option value="dc_electrolytic">High-Voltage DC Electrolytic</option>
            </select>
          </div>
        </div>

        {/* Quick Result Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
          <span>Showing {paginatedProducts.length} of {filteredProducts.length} matching variants</span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>

      {/* Commercial Pricing Table */}
      <div className="p-5 rounded-xl bg-[#0F172A] border border-[#1E293B] space-y-4">
        <div className="border border-[#1E293B] rounded-lg overflow-x-auto text-xs font-mono">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-[#080D1A] text-slate-400 border-b border-[#1E293B]">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Capacitance</th>
                <th className="p-3">Voltage</th>
                <th className="p-3">Launch Price</th>
                <th className="p-3">Base / MRP</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B] text-slate-200">
              {paginatedProducts.map((p) => {
                const launchPrice = p.pricing?.launchPrice || 0;
                const basePrice = p.pricing?.basePrice;
                const mrp = p.pricing?.mrp;
                return (
                  <tr key={p.id || p.sku} className="hover:bg-[#1E293B]/40 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-white font-sans truncate max-w-[200px]" title={p.productName}>
                        {p.productName}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">{p.familyId}</div>
                    </td>
                    <td className="p-3 font-bold text-blue-300 select-all">{p.sku}</td>
                    <td className="p-3 font-bold text-white">{p.capacitanceDisplay}</td>
                    <td className="p-3 text-[#35C6E8]">{p.voltageDisplay}</td>
                    <td className="p-3">
                      <span className="font-bold text-emerald-400 text-sm">₹{launchPrice}</span>
                    </td>
                    <td className="p-3 text-slate-400 text-[11px]">
                      {basePrice ? `Base: ₹${basePrice}` : ''} {mrp ? `· MRP: ₹${mrp}` : ''}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] border ${
                        p.status === 'draft'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      }`}>
                        {p.status === 'draft' ? 'Draft' : p.availability === 'in_stock' ? 'In Stock' : 'Made to Order'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="px-3 py-1.5 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-mono font-bold transition-all shadow-xs flex items-center gap-1.5 ml-auto cursor-pointer min-h-[34px]"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Price</span>
                      </button>
                    </td>
                  </tr>
                );
              })}

              {paginatedProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400 font-mono text-xs">
                    No matching capacitor variants found for "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Stepper */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2 border-t border-[#1E293B] text-xs font-mono">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1.5 rounded-lg bg-[#080D1A] hover:bg-[#1E293B] disabled:opacity-30 disabled:pointer-events-none text-slate-300 border border-[#1E293B] flex items-center gap-1.5 cursor-pointer min-h-[36px]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous 20</span>
            </button>

            <span className="text-slate-400">
              Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
            </span>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-3 py-1.5 rounded-lg bg-[#080D1A] hover:bg-[#1E293B] disabled:opacity-30 disabled:pointer-events-none text-slate-300 border border-[#1E293B] flex items-center gap-1.5 cursor-pointer min-h-[36px]"
            >
              <span>Next 20</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Market Benchmarks Reference Desk */}
      <div className="p-5 rounded-xl bg-[#0F172A] border border-[#1E293B] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold font-mono text-amber-300 uppercase tracking-wider">
            Verified Market Benchmarks (Contextual Reference Only)
          </h4>
          <span className="text-[11px] font-mono text-slate-400">4 Reference Points</span>
        </div>

        <div className="border border-[#1E293B] rounded-lg overflow-hidden text-xs font-mono">
          <table className="w-full text-left">
            <thead className="bg-[#080D1A] text-slate-400 border-b border-[#1E293B]">
              <tr>
                <th className="p-2.5">Specification</th>
                <th className="p-2.5">Reference Brand</th>
                <th className="p-2.5">Benchmark Rate</th>
                <th className="p-2.5">NeutraCap Target Variant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B] text-slate-200">
              {MARKET_BENCHMARKS.map((bm) => (
                <tr key={bm.id}>
                  <td className="p-2.5 font-bold text-white">{bm.spec}</td>
                  <td className="p-2.5 text-slate-400">{bm.brand}</td>
                  <td className="p-2.5 font-bold text-amber-300">₹{bm.marketPriceINR}</td>
                  <td className="p-2.5 font-mono text-blue-300">{bm.neutraCapProposedRef}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT PRICE MODAL / DRAWER */}
      {editingProduct && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleCloseEdit}
        >
          <div 
            className="w-full max-w-lg bg-[#0F172A] rounded-2xl border-2 border-[#0066FF] p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
              <div>
                <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span>Edit Commercial Price</span>
                </h3>
                <p className="text-xs text-blue-300 font-mono mt-0.5">
                  SKU: {editingProduct.sku} ({editingProduct.capacitanceDisplay} · {editingProduct.voltageDisplay})
                </p>
              </div>
              <button
                onClick={handleCloseEdit}
                className="p-2 rounded-lg bg-[#1E293B] text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error Display */}
            {errorMessage && (
              <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-mono flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4 text-xs font-mono">
              
              {/* Launch Price Field (Primary) */}
              <div className="p-3.5 rounded-xl bg-[#080D1A] border border-[#0066FF]/40 space-y-1.5">
                <label className="block font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                  Launch Price (₹ INR) * [Public Active Price]
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={formLaunchPrice || ''}
                  onChange={(e) => setFormLaunchPrice(Number(e.target.value))}
                  className="w-full h-11 px-3.5 rounded-lg bg-[#0F172A] border border-emerald-500/60 text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <p className="text-[10px] text-slate-400">
                  Current value: ₹{editingProduct.pricing?.launchPrice || 0}. Public catalogue reflects this rate immediately upon save.
                </p>
              </div>

              {/* Base Price & MRP Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">
                    Base / List Price (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formBasePrice || ''}
                    onChange={(e) => setFormBasePrice(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">
                    Maximum Retail Price / MRP (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formMrp || ''}
                    onChange={(e) => setFormMrp(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>
              </div>

              {/* MOQ & Effective Date Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">
                    Minimum Order Quantity (MOQ Units)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formMoq || ''}
                    onChange={(e) => setFormMoq(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">
                    Effective Date
                  </label>
                  <input
                    type="date"
                    value={formEffectiveDate}
                    onChange={(e) => setFormEffectiveDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>
              </div>

              {/* Reason / Change Note */}
              <div>
                <label className="block text-slate-300 mb-1">
                  Reason / Change Note (Recorded in Audit Log)
                </label>
                <input
                  type="text"
                  value={formReason}
                  onChange={(e) => setFormReason(e.target.value)}
                  placeholder="e.g. Raw material cost adjustment, OEM promotional rate"
                  className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                />
              </div>

              {/* PRICE SAFETY: Single SKU vs Optional Bulk Voltage Update */}
              <div className="p-3.5 rounded-xl bg-[#080D1A] border border-amber-500/40 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={applyBulkVoltage}
                    onChange={(e) => {
                      setApplyBulkVoltage(e.target.checked);
                      if (!e.target.checked) setShowBulkConfirm(false);
                    }}
                    className="mt-0.5 rounded bg-[#0F172A] border-[#334155] text-[#0066FF] focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="text-amber-300 font-bold">
                      Update all voltage variants for this capacitance ({editingProduct.capacitanceDisplay})
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      ⚠️ Safe Default is UNCHECKED (modifies only {editingProduct.sku} {editingProduct.voltageDisplay}). Checking this will apply the same rate across 200V, 230V, 400V, 450V variants.
                    </p>
                  </div>
                </label>

                {applyBulkVoltage && showBulkConfirm && (
                  <div className="p-2.5 rounded bg-amber-950/90 border border-amber-500 text-amber-200 text-[11px] animate-in fade-in">
                    <strong>Confirmation Required:</strong> You are about to mutate multiple voltage variants. Click "Save Price Update" again to proceed.
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1E293B]">
              <button
                type="button"
                onClick={handleCloseEdit}
                className="px-4 py-2.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 text-xs font-mono font-medium transition-colors cursor-pointer min-h-[40px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePrice}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center gap-1.5 cursor-pointer min-h-[40px]"
              >
                <Check className="w-4 h-4" />
                <span>{showBulkConfirm ? 'Confirm Bulk Price Save' : 'Save Price Update'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
