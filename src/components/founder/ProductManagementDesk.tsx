/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP FOUNDER VAULT — PRODUCT MANAGEMENT DESK (HARDENED)
 * Comprehensive Product CRUD, Specification Editor, and Catalogue Assignment
 * 
 * Features:
 * - Direct Variant CRUD (Add, Edit, Delete, Toggle Active/Draft)
 * - 20-per-page Pagination across all 490 Variants with Instant Filter & Search
 * - Unsaved Changes Protection on Modal Close
 * - Contextual Back Navigation (Back to Founder Vault)
 * - Accessible Touch Targets & Responsive Layout
 * - Modern Professional UI Typography
 */

import React, { useState, useRef, useMemo } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Search, 
  Upload, 
  Image as ImageIcon, 
  Film, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Box,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Layers
} from 'lucide-react';
import { 
  CapacitorVariant, 
  ProductFamilyId, 
  BodyMaterial, 
  DielectricConstruction, 
  TerminalType,
  AvailabilityStatus
} from '../../types';
import { upsertProduct, deleteProductFromRegistry } from '../../services/productRegistry';

interface ProductManagementDeskProps {
  products: CapacitorVariant[];
  onProductsUpdated: (updatedProducts: CapacitorVariant[]) => void;
  onAddAuditLog: (summary: string, targetId?: string) => void;
  onOpenMediaDesk?: (sku: string) => void;
  onBackToVault?: () => void;
}

const ITEMS_PER_PAGE = 20;

const DEFAULT_NEW_PRODUCT: Partial<CapacitorVariant> = {
  id: '',
  sku: '',
  familyId: 'starting',
  productName: '',
  capacitanceDisplay: '',
  capacitanceUnit: 'µF',
  voltageDisplay: '230V AC',
  voltageRating: 230,
  voltageType: 'AC',
  frequencyRating: '50/60 Hz',
  tolerance: '±5%',
  dimensions: {
    diameterMm: 45,
    heightMm: 85,
    mountingType: 'Plain Bottom',
  },
  bodyMaterial: 'Flame Retardant Plastic (UL94 V-0)',
  construction: 'Metallized Polypropylene Film (MKP)',
  terminalType: 'Double Faston 6.3mm',
  temperatureRating: '-40°C to +85°C',
  dutyCycle: 'Intermittent 1.67%',
  applicationTags: ['Single Phase Motors'],
  availability: 'in_stock',
  status: 'active',
  pricing: {
    currency: 'INR',
    launchPrice: 120,
    basePrice: 130,
    mrp: 140,
    minOrderQuantity: 50,
  },
  notes: '',
};

export const ProductManagementDesk: React.FC<ProductManagementDeskProps> = ({
  products,
  onProductsUpdated,
  onAddAuditLog,
  onOpenMediaDesk,
  onBackToVault,
}) => {
  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [familyFilter, setFamilyFilter] = useState<ProductFamilyId | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'draft'>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<CapacitorVariant>>(DEFAULT_NEW_PRODUCT);
  
  // Media Upload Previews inside Form
  const [formPrimaryImage, setFormPrimaryImage] = useState<string>('');
  const [formGallery, setFormGallery] = useState<string[]>([]);
  const [formVideo, setFormVideo] = useState<string>('');
  const formImageInputRef = useRef<HTMLInputElement | null>(null);
  const formVideoInputRef = useRef<HTMLInputElement | null>(null);

  // Form Validation & Notification
  const [formError, setFormError] = useState<string | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [showUnsavedPrompt, setShowUnsavedPrompt] = useState<boolean>(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchesFamily = familyFilter === 'all' || p.familyId === familyFilter;
      const matchesStatus = statusFilter === 'all' || (p.status || 'active') === statusFilter;
      if (!matchesFamily || !matchesStatus) return false;
      if (!q) return true;
      return (
        p.sku.toLowerCase().includes(q) ||
        p.productName.toLowerCase().includes(q) ||
        p.capacitanceDisplay.toLowerCase().includes(q) ||
        p.voltageDisplay.toLowerCase().includes(q)
      );
    });
  }, [products, familyFilter, statusFilter, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleFamilyChange = (fam: ProductFamilyId | 'all') => {
    setFamilyFilter(fam);
    setCurrentPage(1);
  };

  const handleStatusChange = (st: 'all' | 'active' | 'draft') => {
    setStatusFilter(st);
    setCurrentPage(1);
  };

  // Open "Add Product" Modal
  const handleOpenAdd = () => {
    setIsEditing(false);
    const newSku = `NC-NEW-${Date.now().toString().slice(-4)}`;
    setFormData({
      ...DEFAULT_NEW_PRODUCT,
      id: `custom-${Date.now()}`,
      sku: newSku,
      productName: 'NeutraCap Industrial Capacitor',
    });
    setFormPrimaryImage('');
    setFormGallery([]);
    setFormVideo('');
    setFormError(null);
    setIsFormOpen(true);
  };

  // Open "Edit Product" Modal
  const handleOpenEdit = (product: CapacitorVariant) => {
    setIsEditing(true);
    setFormData({
      ...product,
      pricing: { ...product.pricing },
      dimensions: { ...product.dimensions },
      applicationTags: [...(product.applicationTags || [])],
    });
    setFormPrimaryImage(product.primaryImage || product.image || '');
    setFormGallery(product.gallery || []);
    setFormVideo(product.video || '');
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    if (formData.sku !== DEFAULT_NEW_PRODUCT.sku || formPrimaryImage) {
      setShowUnsavedPrompt(true);
    } else {
      setIsFormOpen(false);
    }
  };

  // Handle Primary Image in Form
  const handleFormPrimaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormPrimaryImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Video Upload in Form
  const handleFormVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormVideo(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Save Product Form
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sku || !formData.productName || !formData.capacitanceDisplay) {
      setFormError('Please enter SKU, Product Name, and Capacitance.');
      return;
    }

    const completeProduct: CapacitorVariant = {
      id: formData.id || `custom-${Date.now()}`,
      sku: formData.sku.trim(),
      familyId: formData.familyId || 'starting',
      productName: formData.productName.trim(),
      capacitanceDisplay: formData.capacitanceDisplay.trim(),
      capacitanceUnit: formData.capacitanceUnit || 'µF',
      voltageDisplay: formData.voltageDisplay || '230V AC',
      voltageRating: Number(formData.voltageRating) || 230,
      voltageType: formData.voltageType || 'AC',
      frequencyRating: formData.frequencyRating || '50/60 Hz',
      tolerance: formData.tolerance || '±5%',
      dimensions: {
        diameterMm: Number(formData.dimensions?.diameterMm) || 45,
        heightMm: Number(formData.dimensions?.heightMm) || 85,
        mountingType: formData.dimensions?.mountingType || 'Plain Bottom',
      },
      bodyMaterial: formData.bodyMaterial || 'Flame Retardant Plastic (UL94 V-0)',
      construction: formData.construction || 'Metallized Polypropylene Film (MKP)',
      terminalType: formData.terminalType || 'Double Faston 6.3mm',
      temperatureRating: formData.temperatureRating || '-40°C to +85°C',
      dutyCycle: formData.dutyCycle || 'Intermittent 1.67%',
      applicationTags: formData.applicationTags || ['Industrial Power'],
      availability: formData.availability || 'in_stock',
      status: formData.status || 'active',
      pricing: {
        currency: 'INR',
        launchPrice: Number(formData.pricing?.launchPrice) || 95,
        basePrice: Number(formData.pricing?.basePrice) || 105,
        mrp: Number(formData.pricing?.mrp) || 120,
        minOrderQuantity: Number(formData.pricing?.minOrderQuantity) || 50,
      },
      compareAtPrice: formData.compareAtPrice,
      catalogueOrder: formData.catalogueOrder,
      notes: formData.notes,
      primaryImage: formPrimaryImage || undefined,
      image: formPrimaryImage || undefined,
      thumbnail: formPrimaryImage || undefined,
      gallery: formGallery.length > 0 ? formGallery : undefined,
      galleryImages: formGallery.length > 0 ? formGallery : undefined,
      video: formVideo || undefined,
      updatedAt: new Date().toISOString(),
    };

    // Save to persistent registry
    upsertProduct(completeProduct);

    // Update local products
    let nextProducts: CapacitorVariant[];
    const exists = products.some((p) => p.sku === completeProduct.sku || p.id === completeProduct.id);
    if (exists) {
      nextProducts = products.map((p) =>
        p.sku === completeProduct.sku || p.id === completeProduct.id ? completeProduct : p
      );
      onAddAuditLog(`Updated product specs & details for ${completeProduct.sku}`, completeProduct.sku);
    } else {
      nextProducts = [completeProduct, ...products];
      onAddAuditLog(`Added new catalogue product ${completeProduct.sku} (${completeProduct.productName})`, completeProduct.sku);
    }

    onProductsUpdated(nextProducts);
    setIsFormOpen(false);
    setSaveSuccessMsg(`✓ Saved product ${completeProduct.sku} to catalogue successfully.`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // Toggle Active/Draft Status
  const handleToggleStatus = (product: CapacitorVariant) => {
    const newStatus = product.status === 'draft' ? 'active' : 'draft';
    const updated: CapacitorVariant = { ...product, status: newStatus };
    upsertProduct(updated);

    const nextProducts = products.map((p) => (p.sku === product.sku ? updated : p));
    onProductsUpdated(nextProducts);
    onAddAuditLog(`Changed status of ${product.sku} to ${newStatus.toUpperCase()}`, product.sku);
    setSaveSuccessMsg(`✓ Product ${product.sku} set to ${newStatus.toUpperCase()}`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Delete Custom Product
  const handleDelete = (product: CapacitorVariant) => {
    if (confirm(`Are you sure you want to remove product ${product.sku}?`)) {
      deleteProductFromRegistry(product.sku || product.id);
      const nextProducts = products.filter((p) => p.sku !== product.sku && p.id !== product.id);
      onProductsUpdated(nextProducts);
      onAddAuditLog(`Deleted product ${product.sku} from catalogue`, product.sku);
      setSaveSuccessMsg(`✓ Removed product ${product.sku}`);
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 font-sans text-slate-200">
      
      {/* Top Banner & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
        <div className="flex items-center gap-3">
          {onBackToVault && (
            <button
              onClick={onBackToVault}
              className="px-3 py-2 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span>Back to Founder Vault</span>
            </button>
          )}

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Box className="w-5 h-5 text-[#0066FF]" />
              Product Management &amp; Catalogue Director
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Add new product variants, edit specifications, configure status (Active/Draft), and manage catalogue availability.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0066FF] hover:bg-blue-500 active:bg-blue-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Action Notification Banner */}
      {saveSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search SKU, name, capacitance..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          <select
            value={familyFilter}
            onChange={(e) => handleFamilyChange(e.target.value as any)}
            className="h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white focus:outline-none"
          >
            <option value="all">All Families</option>
            <option value="starting">Starting Capacitors</option>
            <option value="green_filter">Green Filter Capacitors</option>
            <option value="running">Running Capacitors</option>
            <option value="dc_electrolytic">DC Electrolytic</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value as any)}
            className="h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="draft">Draft (Hidden)</option>
          </select>
        </div>
      </div>

      {/* Product Management Table */}
      <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B] overflow-x-auto space-y-3">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#080D1A] text-slate-400 border-b border-[#1E293B]">
            <tr>
              <th className="p-3">Media</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Family</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Voltage</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B] text-slate-200">
            {paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-xs text-slate-400">
                  No products found matching your search.
                </td>
              </tr>
            ) : (
              paginatedProducts.map((p) => {
                const hasMedia = !!(p.primaryImage || p.image);
                const isActive = (p.status || 'active') === 'active';
                return (
                  <tr key={p.id} className="hover:bg-[#1E293B]/40 transition-colors">
                    <td className="p-3">
                      <div className="w-10 h-10 rounded-md bg-[#080D1A] border border-[#1E293B] flex items-center justify-center overflow-hidden">
                        {hasMedia ? (
                          <img
                            src={p.primaryImage || p.image}
                            alt={p.sku}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-slate-600" />
                        )}
                      </div>
                    </td>
                    <td className="p-3 font-bold font-mono text-blue-300">{p.sku}</td>
                    <td className="p-3 text-white font-medium">{p.productName}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">
                        {p.familyId.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3 font-bold font-mono text-white">{p.capacitanceDisplay}</td>
                    <td className="p-3 font-mono text-[#35C6E8]">{p.voltageDisplay}</td>
                    <td className="p-3 font-bold font-mono text-emerald-400">₹{p.pricing.launchPrice}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleToggleStatus(p)}
                        title="Click to toggle Active / Draft status"
                        className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors flex items-center gap-1 cursor-pointer min-h-[32px] ${
                          isActive
                            ? 'bg-emerald-500/20 text-[#16A34A] border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        {isActive ? (
                          <>
                            <Eye className="w-3.5 h-3.5" /> Active
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5" /> Draft
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {onOpenMediaDesk && (
                          <button
                            onClick={() => onOpenMediaDesk(p.sku)}
                            title="Manage Media & Photos"
                            className="p-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-cyan-300 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                          >
                            <ImageIcon className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenEdit(p)}
                          title="Edit Product"
                          className="p-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-200 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          title="Delete Product"
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination Bar */}
        <div className="pt-3 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div>
            Showing {filteredProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} variants
          </div>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] disabled:opacity-30 disabled:pointer-events-none text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <span className="px-3 py-1 font-mono text-xs text-white bg-[#080D1A] rounded-md border border-[#1E293B]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] disabled:opacity-30 disabled:pointer-events-none text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ADD / EDIT PRODUCT MODAL FORM */}
      {/* ========================================================================= */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-4xl bg-[#0F172A] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 bg-[#080D1A] border-b border-[#1E293B] flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Box className="w-4 h-4 text-[#0066FF]" />
                  {isEditing ? `Edit Product: ${formData.sku}` : 'Add New Product Variant'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Full specification definition with direct catalogue &amp; media binding.
                </p>
              </div>

              <button
                onClick={handleCloseForm}
                className="p-2 rounded-xl bg-[#1E293B] text-slate-400 hover:text-white transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {formError && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. PRODUCT INFORMATION */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-[#35C6E8] uppercase tracking-wider">
                  1. Product Information
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-200 block mb-1">SKU *</label>
                    <input
                      type="text"
                      required
                      value={formData.sku || ''}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="e.g. NC-SC-40-60-230V"
                      className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-slate-200 block mb-1">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.productName || ''}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      placeholder="e.g. NeutraCap Motor Starting Capacitor 40/60 µF"
                      className="w-full h-10 px-3.5 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-200 block mb-1">Product Family *</label>
                    <select
                      value={formData.familyId || 'starting'}
                      onChange={(e) => setFormData({ ...formData, familyId: e.target.value as any })}
                      className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white focus:outline-none"
                    >
                      <option value="starting">Starting Capacitors</option>
                      <option value="green_filter">Green Filter Capacitors</option>
                      <option value="running">Running Capacitors</option>
                      <option value="dc_electrolytic">DC Electrolytic Capacitors</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-200 block mb-1">Status</label>
                    <select
                      value={formData.status || 'active'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white focus:outline-none"
                    >
                      <option value="active">Active (Visible in Public Catalogue)</option>
                      <option value="draft">Draft (Private Vault Only)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-200 block mb-1">Availability</label>
                    <select
                      value={formData.availability || 'in_stock'}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
                      className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white focus:outline-none"
                    >
                      <option value="in_stock">In Factory Stock</option>
                      <option value="made_to_order">Made to Order</option>
                      <option value="low_stock">Low Stock</option>
                      <option value="custom_only">Custom Only</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. ELECTRICAL SPECIFICATIONS */}
              <div className="space-y-3 pt-3 border-t border-[#1E293B]">
                <div className="text-xs font-bold text-[#35C6E8] uppercase tracking-wider">
                  2. Electrical Specifications
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-200 block mb-1">Capacitance Display *</label>
                    <input
                      type="text"
                      required
                      value={formData.capacitanceDisplay || ''}
                      onChange={(e) => setFormData({ ...formData, capacitanceDisplay: e.target.value })}
                      placeholder="e.g. 40/60 µF"
                      className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-200 block mb-1">Voltage Display *</label>
                    <input
                      type="text"
                      required
                      value={formData.voltageDisplay || '230V AC'}
                      onChange={(e) => setFormData({ ...formData, voltageDisplay: e.target.value })}
                      placeholder="e.g. 230V AC"
                      className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-200 block mb-1">Voltage Rating (V)</label>
                    <input
                      type="number"
                      value={formData.voltageRating || 230}
                      onChange={(e) => setFormData({ ...formData, voltageRating: Number(e.target.value) })}
                      className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-200 block mb-1">Tolerance</label>
                    <select
                      value={formData.tolerance || '±5%'}
                      onChange={(e) => setFormData({ ...formData, tolerance: e.target.value as any })}
                      className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white font-mono focus:outline-none"
                    >
                      <option value="±5%">±5%</option>
                      <option value="±10%">±10%</option>
                      <option value="±15%">±15%</option>
                      <option value="-10%/+20%">-10%/+20%</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. COMMERCIAL & PRICING */}
              <div className="space-y-3 pt-3 border-t border-[#1E293B]">
                <div className="text-xs font-bold text-[#35C6E8] uppercase tracking-wider">
                  3. Commercial &amp; Pricing
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-200 block mb-1">Launch Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={formData.pricing?.launchPrice || 95}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricing: {
                            ...(formData.pricing || { currency: 'INR' }),
                            launchPrice: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-200 block mb-1">Base Price (₹)</label>
                    <input
                      type="number"
                      value={formData.pricing?.basePrice || 105}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricing: {
                            ...(formData.pricing || { currency: 'INR' }),
                            basePrice: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-200 block mb-1">MRP (₹)</label>
                    <input
                      type="number"
                      value={formData.pricing?.mrp || 120}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricing: {
                            ...(formData.pricing || { currency: 'INR' }),
                            mrp: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-200 block mb-1">MOQ (Units)</label>
                    <input
                      type="number"
                      value={formData.pricing?.minOrderQuantity || 50}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricing: {
                            ...(formData.pricing || { currency: 'INR' }),
                            minOrderQuantity: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 4. MEDIA ASSETS (UPLOAD/ATTACH) */}
              <div className="space-y-3 pt-3 border-t border-[#1E293B]">
                <div className="text-xs font-bold text-[#35C6E8] uppercase tracking-wider">
                  4. Media Assets (Primary Photograph &amp; Video)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Primary Image */}
                  <div className="p-3.5 rounded-xl bg-[#080D1A] border border-[#1E293B] space-y-2">
                    <label className="text-xs font-bold text-white block">Primary Image</label>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-lg bg-[#0F172A] border border-[#1E293B] flex items-center justify-center overflow-hidden shrink-0">
                        {formPrimaryImage ? (
                          <img src={formPrimaryImage} alt="Primary" className="max-h-full max-w-full object-contain" />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-slate-600" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <button
                          type="button"
                          onClick={() => formImageInputRef.current?.click()}
                          className="px-3 py-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer min-h-[40px]"
                        >
                          <Upload className="w-3.5 h-3.5" /> Upload Image
                        </button>
                        <input
                          ref={formImageInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          onChange={handleFormPrimaryImageChange}
                          className="hidden"
                        />
                        {formPrimaryImage && (
                          <button
                            type="button"
                            onClick={() => setFormPrimaryImage('')}
                            className="text-xs text-rose-400 hover:underline block"
                          >
                            Remove Image
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Video */}
                  <div className="p-3.5 rounded-xl bg-[#080D1A] border border-[#1E293B] space-y-2">
                    <label className="text-xs font-bold text-white block">Product Video (Optional)</label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Video URL (e.g. https://...)"
                        value={formVideo}
                        onChange={(e) => setFormVideo(e.target.value)}
                        className="w-full h-9 px-2.5 rounded-lg bg-[#0F172A] border border-[#1E293B] text-xs text-white font-mono focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => formVideoInputRef.current?.click()}
                        className="px-3 py-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer min-h-[40px]"
                      >
                        <Upload className="w-3.5 h-3.5" /> Upload Video File
                      </button>
                      <input
                        ref={formVideoInputRef}
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        onChange={handleFormVideoChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E293B]">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 text-xs sm:text-sm font-medium transition-colors cursor-pointer min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Product to Catalogue</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Unsaved Prompt Modal */}
      {showUnsavedPrompt && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h4 className="text-base font-bold text-white">Unsaved Changes</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              You have entered product details that have not been saved yet. Leave without saving?
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1E293B]">
              <button
                onClick={() => setShowUnsavedPrompt(false)}
                className="px-4 py-2.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-medium transition-colors cursor-pointer min-h-[40px]"
              >
                Stay
              </button>
              <button
                onClick={() => {
                  setShowUnsavedPrompt(false);
                  setIsFormOpen(false);
                }}
                className="px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer min-h-[40px]"
              >
                Leave Without Saving
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
