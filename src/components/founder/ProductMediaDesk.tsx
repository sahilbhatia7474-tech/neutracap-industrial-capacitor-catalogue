/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP FOUNDER VAULT — PRODUCT MEDIA DESK (HARDENED)
 * Dedicated SKU-Level Media Management & High-Resolution Asset Upload
 * 
 * Features:
 * - Direct SKU Media Binding (Primary Image, Gallery, Video)
 * - Instant SKU Search & 20-per-page Pagination across all 490 Variants
 * - Real State-Changing Operations with Local Persistence in ProductRegistry
 * - Explicit First-Class Action Buttons (Upload, Replace, Remove, Save, Reset)
 * - Unsaved Changes Confirmation & Contextual Back Navigation
 * - Accessible Touch Targets & No Horizontal Overflow
 * - Clean Modern UI Typography (Inter/Sans for UI, Mono for Technical SKU/Specs)
 */

import React, { useState, useRef, useMemo } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Film, 
  Trash2, 
  Check, 
  Search, 
  Layers, 
  CheckCircle2, 
  RefreshCw, 
  AlertCircle,
  Plus,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { CapacitorVariant, ProductFamilyId } from '../../types';
import { loadProductRegistry, saveProductMedia, resetProductMedia } from '../../services/productRegistry';

interface ProductMediaDeskProps {
  products: CapacitorVariant[];
  onMediaSaved: (sku: string, updatedProducts: CapacitorVariant[]) => void;
  onAddAuditLog: (summary: string, sku: string) => void;
  onBackToVault?: () => void;
}

const ITEMS_PER_PAGE = 20;

export const ProductMediaDesk: React.FC<ProductMediaDeskProps> = ({
  products,
  onMediaSaved,
  onAddAuditLog,
  onBackToVault,
}) => {
  // Selected product state
  const [selectedSku, setSelectedSku] = useState<string>(products[0]?.sku || 'NC-SC-40-60-230V');
  const [familyFilter, setFamilyFilter] = useState<ProductFamilyId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Selected product object
  const selectedProduct = products.find((p) => p.sku === selectedSku) || products[0];

  // Temporary staging state for current editing product
  const [primaryImagePreview, setPrimaryImagePreview] = useState<string>(
    selectedProduct?.primaryImage || selectedProduct?.image || ''
  );
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(
    selectedProduct?.gallery || []
  );
  const [videoPreview, setVideoPreview] = useState<string>(
    selectedProduct?.video || ''
  );
  const [videoUrlInput, setVideoUrlInput] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [actionErrorMsg, setActionErrorMsg] = useState<string | null>(null);
  const [isDraggingImage, setIsDraggingImage] = useState<boolean>(false);

  // Unsaved changes tracking
  const hasUnsavedChanges = useMemo(() => {
    if (!selectedProduct) return false;
    const origPrimary = selectedProduct.primaryImage || selectedProduct.image || '';
    const origGallery = selectedProduct.gallery || [];
    const origVideo = selectedProduct.video || '';

    const primaryChanged = primaryImagePreview !== origPrimary;
    const videoChanged = videoPreview !== origVideo;
    const galleryChanged = JSON.stringify(galleryPreviews) !== JSON.stringify(origGallery);

    return primaryChanged || videoChanged || galleryChanged;
  }, [selectedProduct, primaryImagePreview, galleryPreviews, videoPreview]);

  // Unsaved confirmation modal state
  const [pendingSkuSwitch, setPendingSkuSwitch] = useState<string | null>(null);
  const [isLeavingToVault, setIsLeavingToVault] = useState<boolean>(false);

  // File Input Refs
  const primaryFileInputRef = useRef<HTMLInputElement | null>(null);
  const galleryFileInputRef = useRef<HTMLInputElement | null>(null);
  const videoFileInputRef = useRef<HTMLInputElement | null>(null);

  // When selected SKU changes, sync staging state
  const applySelectProduct = (product: CapacitorVariant) => {
    setSelectedSku(product.sku);
    setPrimaryImagePreview(product.primaryImage || product.image || '');
    setGalleryPreviews(product.gallery || []);
    setVideoPreview(product.video || '');
    setVideoUrlInput(product.video || '');
    setSaveSuccessMsg(null);
    setActionErrorMsg(null);
  };

  const handleSelectProduct = (product: CapacitorVariant) => {
    if (product.sku === selectedSku) return;
    if (hasUnsavedChanges) {
      setPendingSkuSwitch(product.sku);
    } else {
      applySelectProduct(product);
    }
  };

  const handleConfirmLeaveUnsaved = () => {
    if (isLeavingToVault) {
      setIsLeavingToVault(false);
      if (onBackToVault) onBackToVault();
    } else if (pendingSkuSwitch) {
      const p = products.find((prod) => prod.sku === pendingSkuSwitch);
      if (p) applySelectProduct(p);
      setPendingSkuSwitch(null);
    }
  };

  const handleCancelLeaveUnsaved = () => {
    setPendingSkuSwitch(null);
    setIsLeavingToVault(false);
  };

  // Filter product list with search prioritization
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchesFamily = familyFilter === 'all' || p.familyId === familyFilter;
      if (!matchesFamily) return false;
      if (!q) return true;
      return (
        p.sku.toLowerCase().includes(q) ||
        p.productName.toLowerCase().includes(q) ||
        p.capacitanceDisplay.toLowerCase().includes(q) ||
        p.voltageDisplay.toLowerCase().includes(q)
      );
    });
  }, [products, familyFilter, searchQuery]);

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

  // Handle Primary Image File Selection
  const handlePrimaryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setActionErrorMsg('⚠ Upload failed: Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPrimaryImagePreview(reader.result);
        setSaveSuccessMsg('✓ Image uploaded to staging. Click "Save Media" to persist.');
        setActionErrorMsg(null);
      }
    };
    reader.onerror = () => {
      setActionErrorMsg('⚠ Upload failed: Could not read image file.');
    };
    reader.readAsDataURL(file);
  };

  // Handle Drag & Drop Primary Image
  const handleDropPrimaryImage = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingImage(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setActionErrorMsg('⚠ Upload failed: Please drop an image file (JPG, PNG, or WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPrimaryImagePreview(reader.result);
        setSaveSuccessMsg('✓ Image dropped to staging. Click "Save Media" to persist.');
        setActionErrorMsg(null);
      }
    };
    reader.onerror = () => {
      setActionErrorMsg('⚠ Upload failed: Could not read dropped image.');
    };
    reader.readAsDataURL(file);
  };

  // Handle Gallery Files Selection
  const handleGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setGalleryPreviews((prev) => [...prev, reader.result as string]);
          setSaveSuccessMsg('✓ Gallery image staged. Click "Save Media" to persist.');
          setActionErrorMsg(null);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle Video File Selection
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setActionErrorMsg('⚠ Upload failed: Please select a valid video file (MP4, WebM, MOV).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setVideoPreview(reader.result);
        setSaveSuccessMsg('✓ Video staged. Click "Save Media" to persist.');
        setActionErrorMsg(null);
      }
    };
    reader.onerror = () => {
      setActionErrorMsg('⚠ Upload failed: Could not read video file.');
    };
    reader.readAsDataURL(file);
  };

  // Save Media to Product Registry
  const handleSaveMedia = () => {
    if (!selectedProduct) return;
    setIsSaving(true);
    setActionErrorMsg(null);

    try {
      saveProductMedia(selectedProduct.sku, {
        primaryImage: primaryImagePreview,
        thumbnail: primaryImagePreview,
        gallery: galleryPreviews,
        video: videoPreview,
      });

      // Update local product instances
      const updatedProducts = products.map((p) => {
        if (p.sku === selectedProduct.sku) {
          return {
            ...p,
            primaryImage: primaryImagePreview,
            image: primaryImagePreview,
            thumbnail: primaryImagePreview,
            gallery: galleryPreviews,
            galleryImages: galleryPreviews,
            video: videoPreview,
          };
        }
        return p;
      });

      onMediaSaved(selectedProduct.sku, updatedProducts);
      onAddAuditLog(`Saved product media for SKU ${selectedProduct.sku}`, selectedProduct.sku);

      setIsSaving(false);
      setSaveSuccessMsg(`✓ Saved & active on catalogue for SKU: ${selectedProduct.sku}`);
      setTimeout(() => setSaveSuccessMsg(null), 5000);
    } catch (err) {
      console.error('Failed to save media:', err);
      setIsSaving(false);
      setActionErrorMsg('⚠ Save failed: Could not write asset to local storage.');
    }
  };

  // Reset to Factory Default Asset
  const handleResetMedia = () => {
    if (!selectedProduct) return;
    if (confirm(`Reset media for SKU ${selectedProduct.sku} to default factory static asset?`)) {
      resetProductMedia(selectedProduct.sku);
      
      const defaultImg = selectedProduct.sku.includes('40-60-230V')
        ? '/assets/products/starting/NeutraCap_Starting_40-60uF_230V.webp'
        : selectedProduct.sku.includes('60-80-230V')
        ? '/assets/products/starting/NeutraCap_Starting_60-80uF_230V.webp'
        : '';

      setPrimaryImagePreview(defaultImg);
      setGalleryPreviews([]);
      setVideoPreview('');
      setVideoUrlInput('');

      const updatedProducts = products.map((p) => {
        if (p.sku === selectedProduct.sku) {
          return {
            ...p,
            primaryImage: defaultImg,
            image: defaultImg,
            gallery: [],
            galleryImages: [],
            video: undefined,
          };
        }
        return p;
      });

      onMediaSaved(selectedProduct.sku, updatedProducts);
      onAddAuditLog(`Reset media to factory default for SKU ${selectedProduct.sku}`, selectedProduct.sku);
      setSaveSuccessMsg(`✓ Reset to static fallback for SKU: ${selectedProduct.sku}`);
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    }
  };

  // Check if currently using custom media
  const registry = loadProductRegistry();
  const hasCustomMedia = !!registry.mediaBySku[selectedProduct?.sku];

  return (
    <div className="space-y-6 animate-in fade-in duration-150 font-sans text-slate-200">
      
      {/* Top Contextual Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
        <div className="flex items-center gap-3">
          {onBackToVault && (
            <button
              onClick={() => {
                if (hasUnsavedChanges) {
                  setIsLeavingToVault(true);
                } else {
                  onBackToVault();
                }
              }}
              className="px-3 py-2 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span>Back to Founder Vault</span>
            </button>
          )}

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#35C6E8]" />
              Product Media Vault
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Assign authentic photographs and media directly by SKU. Persists and resolves seamlessly across all public views.
            </p>
          </div>
        </div>

        {/* Quick SKU Test Selectors */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 mr-1">Test SKUs:</span>
          {['NC-SC-40-60-230V', 'NC-SC-60-80-230V'].map((sku) => (
            <button
              key={sku}
              onClick={() => {
                const p = products.find((prod) => prod.sku === sku);
                if (p) handleSelectProduct(p);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                selectedSku === sku
                  ? 'bg-[#35C6E8] text-[#071426] shadow-sm'
                  : 'bg-[#1E293B] text-slate-300 hover:bg-[#334155]'
              }`}
            >
              {sku}
            </button>
          ))}
        </div>
      </div>

      {/* Global Action Feedback Banners */}
      {saveSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {actionErrorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{actionErrorMsg}</span>
        </div>
      )}

      {/* Main 2-Column Interface: Left Selector + Right Media Staging */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Product Selector with Search & Pagination (4 cols) */}
        <div className="lg:col-span-4 space-y-3 bg-[#0F172A] border border-[#1E293B] rounded-xl p-4 flex flex-col h-[680px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">
              Select Product SKU
            </span>
            <span className="text-xs font-mono bg-[#1E293B] text-[#35C6E8] px-2 py-0.5 rounded">
              {filteredProducts.length} Variants
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search SKU (e.g. NC-SC-40-60-230V)..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#35C6E8]"
            />
          </div>

          {/* Family Filter Pills */}
          <div className="flex gap-1 overflow-x-auto pb-1 text-xs no-scrollbar">
            {[
              { id: 'all', label: 'All Families' },
              { id: 'starting', label: 'Starting' },
              { id: 'running', label: 'Running' },
              { id: 'green_filter', label: 'Green Filter' },
              { id: 'dc_electrolytic', label: 'DC Electro' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFamilyChange(cat.id as any)}
                className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-colors ${
                  familyFilter === cat.id
                    ? 'bg-[#0066FF] text-white font-medium'
                    : 'bg-[#1E293B] text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Items Scrollable List */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 divide-y divide-[#1E293B]/60">
            {paginatedProducts.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                No variants match "{searchQuery}".
              </div>
            ) : (
              paginatedProducts.map((p) => {
                const isSelected = p.sku === selectedSku;
                const hasMedia = !!(p.primaryImage || p.image);
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProduct(p)}
                    className={`w-full text-left p-2.5 rounded-lg transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1E293B] border border-[#35C6E8]/70 text-white shadow-xs'
                        : 'hover:bg-[#1E293B]/40 text-slate-300'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-mono font-bold text-blue-300 truncate">
                        {p.sku}
                      </div>
                      <div className="text-xs text-slate-200 truncate">
                        {p.productName}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {p.capacitanceDisplay} · {p.voltageDisplay}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {hasMedia ? (
                        <span className="text-[10px] font-medium bg-emerald-500/20 text-[#16A34A] border border-emerald-500/40 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3" /> Custom
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                          Fallback
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Pagination Controls */}
          <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing {filteredProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length}
            </span>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded bg-[#1E293B] hover:bg-[#334155] disabled:opacity-30 disabled:pointer-events-none text-white transition-colors"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono text-xs text-slate-300">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded bg-[#1E293B] hover:bg-[#334155] disabled:opacity-30 disabled:pointer-events-none text-white transition-colors"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Media Management Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-5 bg-[#0F172A] border border-[#1E293B] rounded-xl p-5">
          
          {/* Active Product Meta Header */}
          <div className="p-4 rounded-xl bg-[#080D1A] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-mono font-bold text-[#35C6E8]">{selectedProduct?.sku}</span>
                <span className="text-xs bg-[#1E293B] text-slate-300 px-2 py-0.5 rounded font-medium">
                  {selectedProduct?.familyId.replace('_', ' ').toUpperCase()}
                </span>
                {hasCustomMedia ? (
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Custom Vault Asset
                  </span>
                ) : (
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-medium">
                    Static Factory Fallback
                  </span>
                )}
              </div>
              <h4 className="text-base font-bold text-white mt-1">
                {selectedProduct?.productName}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Rating: <strong className="text-white font-mono">{selectedProduct?.capacitanceDisplay}</strong> · Voltage: <strong className="text-white font-mono">{selectedProduct?.voltageDisplay}</strong> · Price: <strong className="text-emerald-400 font-mono">₹{selectedProduct?.pricing.launchPrice}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {hasCustomMedia && (
                <button
                  type="button"
                  onClick={handleResetMedia}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-medium transition-colors cursor-pointer min-h-[40px]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Static Fallback</span>
                </button>
              )}
            </div>
          </div>

          {/* 1. PRIMARY PRODUCT IMAGE SECTION */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#35C6E8]" />
                Primary Product Photograph (Card &amp; Detail Lightbox)
              </label>
              <span className="text-xs text-slate-400">
                JPG, PNG, WEBP
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Preview Box (5 cols) */}
              <div className="sm:col-span-5 h-52 rounded-xl bg-[#080D1A] border border-[#1E293B] p-3 flex flex-col items-center justify-center relative overflow-hidden shadow-inner group">
                <div className="absolute inset-0 bg-industrial-grid-dark opacity-30 pointer-events-none"></div>
                {primaryImagePreview ? (
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                    <img
                      src={primaryImagePreview}
                      alt="Primary Preview"
                      className="max-h-40 max-w-full object-contain rounded-md shadow-lg"
                    />
                    <span className="text-[11px] font-mono text-emerald-400 mt-1">ACTIVE PRIMARY STAGE</span>
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center text-slate-500 text-center p-3">
                    <ImageIcon className="w-8 h-8 mb-1 opacity-50 text-slate-400" />
                    <span className="text-xs font-medium text-slate-300">No Custom Image Staged</span>
                    <span className="text-[11px] text-slate-500 mt-0.5">Catalogue will render 2D blueprint fallback</span>
                  </div>
                )}
              </div>

              {/* Upload Dropzone & Action Buttons (7 cols) */}
              <div className="sm:col-span-7 flex flex-col justify-between h-52 space-y-2">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingImage(true);
                  }}
                  onDragLeave={() => setIsDraggingImage(false)}
                  onDrop={handleDropPrimaryImage}
                  onClick={() => primaryFileInputRef.current?.click()}
                  className={`flex-1 rounded-xl border-2 border-dashed p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    isDraggingImage
                      ? 'border-[#35C6E8] bg-[#35C6E8]/10'
                      : 'border-[#1E293B] hover:border-[#35C6E8]/60 bg-[#080D1A]/60 hover:bg-[#080D1A]'
                  }`}
                >
                  <input
                    ref={primaryFileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handlePrimaryFileChange}
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center text-[#35C6E8] mb-1.5 shadow-sm">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-white">
                    {primaryImagePreview ? 'Replace Image' : 'Upload Image'}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 max-w-xs">
                    Click to browse or drag &amp; drop authentic photograph.
                  </p>
                </div>

                {/* Explicit Button Action Controls */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => primaryFileInputRef.current?.click()}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-white text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <Upload className="w-4 h-4 text-[#35C6E8]" />
                    <span>{primaryImagePreview ? 'Replace Image' : 'Upload Image'}</span>
                  </button>

                  {primaryImagePreview && (
                    <button
                      type="button"
                      onClick={() => setPrimaryImagePreview('')}
                      className="px-3 py-2.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove Image</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 2. GALLERY IMAGES SECTION */}
          <div className="space-y-2 pt-3 border-t border-[#1E293B]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#0066FF]" />
                Additional Gallery Angles ({galleryPreviews.length})
              </label>
              <button
                type="button"
                onClick={() => galleryFileInputRef.current?.click()}
                className="flex items-center gap-1 text-xs text-[#35C6E8] hover:underline cursor-pointer font-medium"
              >
                <Plus className="w-3.5 h-3.5" /> Add Gallery Images
              </button>
            </div>

            <input
              ref={galleryFileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleGalleryFilesChange}
              className="hidden"
            />

            {galleryPreviews.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {galleryPreviews.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-4/3 rounded-lg bg-[#080D1A] border border-[#1E293B] p-1.5 flex items-center justify-center group overflow-hidden"
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                    <button
                      type="button"
                      onClick={() => setGalleryPreviews(prev => prev.filter((_, i) => i !== idx))}
                      className="absolute top-1.5 right-1.5 p-1 rounded-md bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove Angle"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-center text-xs text-slate-500">
                No additional gallery angles staged. (Optional)
              </div>
            )}
          </div>

          {/* 3. PRODUCT VIDEO SECTION */}
          <div className="space-y-2 pt-3 border-t border-[#1E293B]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Film className="w-4 h-4 text-amber-400" />
                Product Engineering Video (Optional)
              </label>
              <span className="text-xs text-slate-400">
                MP4, WEBM, MOV
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-8 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Paste video URL (e.g. https://cdn.../clip.mp4)..."
                  value={videoUrlInput}
                  onChange={(e) => {
                    setVideoUrlInput(e.target.value);
                    setVideoPreview(e.target.value);
                  }}
                  className="flex-1 h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white placeholder:text-slate-500 font-mono focus:outline-none focus:ring-1 focus:ring-[#35C6E8]"
                />
                <button
                  type="button"
                  onClick={() => videoFileInputRef.current?.click()}
                  className="h-10 px-3.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-medium flex items-center gap-1.5 shrink-0 min-h-[44px]"
                >
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Upload Video</span>
                </button>
                <input
                  ref={videoFileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  onChange={handleVideoFileChange}
                  className="hidden"
                />
              </div>

              <div className="sm:col-span-4 flex items-center justify-end">
                {videoPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setVideoPreview('');
                      setVideoUrlInput('');
                    }}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 p-2 font-medium"
                  >
                    <Trash2 className="w-4 h-4" /> Remove Video
                  </button>
                )}
              </div>
            </div>

            {videoPreview && (
              <div className="mt-2 rounded-lg bg-[#080D1A] border border-[#1E293B] p-2 flex justify-center">
                <video src={videoPreview} controls className="max-h-48 rounded-md max-w-full" />
              </div>
            )}
          </div>

          {/* Sticky Primary Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#1E293B]">
            <div className="text-xs text-slate-400">
              Target SKU: <strong className="text-white font-mono">{selectedProduct?.sku}</strong>
              {hasUnsavedChanges && (
                <span className="ml-2 text-amber-400 font-medium">● Unsaved changes in staging</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveMedia}
                disabled={isSaving}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Save Media</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Unsaved Changes Confirmation Modal */}
      {(pendingSkuSwitch || isLeavingToVault) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h4 className="text-base font-bold text-white">Unsaved Changes</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              You have staged media changes that have not been saved yet. If you leave now, these changes will be lost.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1E293B]">
              <button
                onClick={handleCancelLeaveUnsaved}
                className="px-4 py-2.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-medium transition-colors cursor-pointer min-h-[40px]"
              >
                Stay on SKU
              </button>
              <button
                onClick={handleConfirmLeaveUnsaved}
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
