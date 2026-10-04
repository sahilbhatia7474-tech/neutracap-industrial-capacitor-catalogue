/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP FOUNDER VAULT — SITE MEDIA & VIDEO CONTROL DESK (FINAL SURGICAL UPGRADE)
 * Dedicated Site-Level Media Management for Homepage Hero, About, Facility, and Catalogue Videos
 * 
 * Requirements Implemented:
 * - 7 Canonical Placements (homepage.hero.video, homepage.hero.image, about.video, about.image, etc.)
 * - Video Library per Placement with multiple assets (Active, Draft, Archived)
 * - Single-Active Rule: Activating a video automatically archives the previous active asset
 * - + ADD VIDEO with Direct Video File Upload (MP4, WEBM, MOV) or Video URL
 * - Optional Custom Video Thumbnail / Poster Image (Upload, Preview, Replace, Remove)
 * - Video Actions: Preview, Make Active (with Confirmation), Replace, Edit, Archive, Delete
 * - Active Video Preview Banner with metadata, status, and direct quick controls
 * - Zero Broken Fallback Guarantee (Active Custom -> Default Video -> Static Simulation)
 * - Mobile Touch-Friendly (44px+ touch targets), Clean SCADA & Professional Sans Typography
 * - Contextual Back Navigation (← Back to Founder Vault)
 */

import React, { useState, useRef } from 'react';
import { 
  Film, 
  Upload, 
  Check, 
  Trash2, 
  Play, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Image as ImageIcon,
  Plus,
  FileVideo,
  ArrowLeft,
  X,
  Archive,
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { 
  SiteMediaAsset, 
  SiteMediaPlacement, 
  SiteMediaStatus,
  SITE_MEDIA_PLACEMENTS, 
  loadSiteMediaRegistry, 
  saveSiteMediaAsset, 
  deleteSiteMediaAsset, 
  makeSiteMediaActive,
  archiveSiteMediaAsset,
  updateSiteMediaThumbnail,
  resolveSiteMedia 
} from '../../services/siteMediaRegistry';

interface SiteMediaDeskProps {
  onAddAuditLog: (summary: string, targetId?: string) => void;
  onSiteMediaChanged?: () => void;
  onBackToVault?: () => void;
}

export const SiteMediaDesk: React.FC<SiteMediaDeskProps> = ({
  onAddAuditLog,
  onSiteMediaChanged,
  onBackToVault,
}) => {
  const [registryState, setRegistryState] = useState(() => loadSiteMediaRegistry());
  const [selectedPlacement, setSelectedPlacement] = useState<SiteMediaPlacement>('homepage.hero.video');
  const [libraryFilter, setLibraryFilter] = useState<'all' | 'active' | 'draft' | 'archived'>('all');
  
  // Modals & Dialogs
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [actionErrorMsg, setActionErrorMsg] = useState<string | null>(null);
  
  // Dedicated Preview Modal State
  const [previewingAsset, setPreviewingAsset] = useState<SiteMediaAsset | null>(null);
  
  // Dedicated Activation Confirmation Modal
  const [activationTarget, setActivationTarget] = useState<SiteMediaAsset | null>(null);

  // Dedicated Thumbnail Change Modal
  const [thumbnailTarget, setThumbnailTarget] = useState<SiteMediaAsset | null>(null);
  const [quickThumbnailUrl, setQuickThumbnailUrl] = useState<string>('');

  // Main Asset Form State
  const [formName, setFormName] = useState<string>('');
  const [formPlacement, setFormPlacement] = useState<SiteMediaPlacement>('homepage.hero.video');
  const [formType, setFormType] = useState<'video' | 'image'>('video');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formMediaUrl, setFormMediaUrl] = useState<string>('');
  const [formPosterUrl, setFormPosterUrl] = useState<string>('');
  const [formStatus, setFormStatus] = useState<SiteMediaStatus>('active');
  const [formError, setFormError] = useState<string | null>(null);

  // Unsaved modal guard
  const [showUnsavedPrompt, setShowUnsavedPrompt] = useState<boolean>(false);

  // File Input References
  const videoFileInputRef = useRef<HTMLInputElement | null>(null);
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);
  const posterFileInputRef = useRef<HTMLInputElement | null>(null);
  const quickPosterFileInputRef = useRef<HTMLInputElement | null>(null);

  // Active Placement Info
  const placementMeta = SITE_MEDIA_PLACEMENTS.find(p => p.id === selectedPlacement) || SITE_MEDIA_PLACEMENTS[0];
  const allAssetsForPlacement = registryState.assets[selectedPlacement] || [];
  
  // Filtered Assets for Library
  const filteredAssets = allAssetsForPlacement.filter(a => {
    if (libraryFilter === 'all') return true;
    return a.status === libraryFilter;
  });

  const activeAsset = resolveSiteMedia(selectedPlacement);
  const hasCustomActive = activeAsset && !activeAsset.id.startsWith('default-') && activeAsset.status === 'active';

  const refreshState = () => {
    const updated = loadSiteMediaRegistry();
    setRegistryState(updated);
    if (onSiteMediaChanged) {
      onSiteMediaChanged();
    }
  };

  // Open "Add Video / Asset" Modal
  const handleOpenAdd = (type: 'video' | 'image' = 'video', placement?: SiteMediaPlacement) => {
    const targetPlacement = placement || selectedPlacement;
    const meta = SITE_MEDIA_PLACEMENTS.find(p => p.id === targetPlacement);
    
    setEditingAssetId(null);
    setFormName(type === 'video' ? 'NeutraCap Industrial Reel' : (meta?.defaultName || 'Site Asset'));
    setFormPlacement(targetPlacement);
    setFormType(type);
    setFormDescription(meta?.description || '');
    setFormMediaUrl('');
    setFormPosterUrl('');
    setFormStatus('active');
    setFormError(null);
    setIsEditing(true);
  };

  // Open "Edit Asset" Modal
  const handleOpenEdit = (asset: SiteMediaAsset) => {
    setEditingAssetId(asset.id);
    setFormName(asset.name);
    setFormPlacement(asset.placement);
    setFormType(asset.type);
    setFormDescription(asset.description || '');
    setFormMediaUrl(asset.url);
    setFormPosterUrl(asset.posterUrl || '');
    setFormStatus(asset.status);
    setFormError(null);
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    if (formMediaUrl.trim() || formPosterUrl.trim() || formDescription.trim()) {
      setShowUnsavedPrompt(true);
    } else {
      setIsEditing(false);
    }
  };

  // File Upload Handlers
  const handleVideoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      setFormError('Please select a valid video file (MP4, WebM, MOV).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormMediaUrl(reader.result);
        setFormError(null);
      }
    };
    reader.onerror = () => {
      setFormError('Could not read video file.');
    };
    reader.readAsDataURL(file);
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormMediaUrl(reader.result);
        setFormError(null);
      }
    };
    reader.onerror = () => {
      setFormError('Could not read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handlePosterFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file for thumbnail poster.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormPosterUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleQuickPosterFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setQuickThumbnailUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Asset Form
  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setFormError('Please enter a Video / Asset Title.');
      return;
    }
    if (!formMediaUrl.trim()) {
      setFormError(`Please upload or provide a ${formType === 'video' ? 'video' : 'image'} source.`);
      return;
    }

    try {
      const assetToSave: SiteMediaAsset = {
        id: editingAssetId || `site-asset-${Date.now()}`,
        placement: formPlacement,
        name: formName.trim(),
        type: formType,
        url: formMediaUrl,
        posterUrl: formPosterUrl.trim() || undefined,
        description: formDescription.trim() || undefined,
        status: formStatus,
        updatedAt: new Date().toISOString(),
      };

      saveSiteMediaAsset(assetToSave);
      refreshState();
      setIsEditing(false);

      const statusLabel = assetToSave.status === 'active' ? 'ACTIVE ON SITE' : assetToSave.status.toUpperCase();
      onAddAuditLog(
        `Saved Site Media "${assetToSave.name}" for [${assetToSave.placement}] (${statusLabel})`,
        assetToSave.placement
      );

      setSaveSuccessMsg(`✓ Saved "${assetToSave.name}" as ${statusLabel}.`);
      setActionErrorMsg(null);
      setTimeout(() => setSaveSuccessMsg(null), 5000);
    } catch (err) {
      console.error(err);
      setFormError('Could not save media asset to storage.');
    }
  };

  // Make Active Action (with confirmation)
  const handleConfirmMakeActive = () => {
    if (!activationTarget) return;
    try {
      makeSiteMediaActive(activationTarget.placement, activationTarget.id);
      refreshState();
      onAddAuditLog(
        `Activated site media "${activationTarget.name}" for [${activationTarget.placement}]. Previous active asset archived.`,
        activationTarget.placement
      );
      setSaveSuccessMsg(`✓ Set "${activationTarget.name}" as ACTIVE ON SITE. Previous active video moved to Archived.`);
      setActivationTarget(null);
      setTimeout(() => setSaveSuccessMsg(null), 5000);
    } catch (err) {
      setActionErrorMsg('Failed to activate video asset.');
      setActivationTarget(null);
    }
  };

  // Archive Action
  const handleArchiveAsset = (asset: SiteMediaAsset) => {
    try {
      archiveSiteMediaAsset(asset.placement, asset.id);
      refreshState();
      onAddAuditLog(`Archived site media "${asset.name}" in [${asset.placement}]`, asset.placement);
      setSaveSuccessMsg(`✓ Moved "${asset.name}" to Archived.`);
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err) {
      setActionErrorMsg('Failed to archive asset.');
    }
  };

  // Delete Action
  const handleDelete = (asset: SiteMediaAsset) => {
    if (confirm(`Are you sure you want to delete video asset "${asset.name}" from ${asset.placement}? This cannot be undone.`)) {
      try {
        deleteSiteMediaAsset(asset.placement, asset.id);
        refreshState();
        onAddAuditLog(`Deleted site media asset "${asset.name}" from [${asset.placement}]`, asset.placement);
        setSaveSuccessMsg(`✓ Deleted asset "${asset.name}". Fallback intact.`);
        setTimeout(() => setSaveSuccessMsg(null), 4000);
      } catch (err) {
        setActionErrorMsg('Failed to delete asset.');
      }
    }
  };

  // Save Quick Thumbnail Poster
  const handleSaveQuickThumbnail = () => {
    if (!thumbnailTarget) return;
    try {
      updateSiteMediaThumbnail(thumbnailTarget.placement, thumbnailTarget.id, quickThumbnailUrl);
      refreshState();
      onAddAuditLog(`Updated thumbnail poster for "${thumbnailTarget.name}"`, thumbnailTarget.placement);
      setSaveSuccessMsg(`✓ Updated custom poster for "${thumbnailTarget.name}".`);
      setThumbnailTarget(null);
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err) {
      setActionErrorMsg('Failed to update thumbnail.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 font-sans text-slate-200">
      
      {/* Top Header & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
        <div className="flex items-center gap-3">
          {onBackToVault && (
            <button
              onClick={onBackToVault}
              className="px-3 py-2 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span>Back to Founder Vault</span>
            </button>
          )}

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Film className="w-5 h-5 text-[#35C6E8]" />
              Site Media &amp; Video Control Desk
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage website hero videos, background photographs, and factory tour media with instant live public synchronization.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleOpenAdd('video', selectedPlacement)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0066FF] hover:bg-blue-500 active:bg-blue-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>+ ADD VIDEO</span>
          </button>
        </div>
      </div>

      {/* Action Notification Banners */}
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

      {/* Placement Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SITE_MEDIA_PLACEMENTS.map((p) => {
          const isSelected = selectedPlacement === p.id;
          const currentActive = resolveSiteMedia(p.id);
          const hasCustom = currentActive && !currentActive.id.startsWith('default-') && currentActive.status === 'active';
          const assetCount = (registryState.assets[p.id] || []).length;

          return (
            <div
              key={p.id}
              onClick={() => {
                setSelectedPlacement(p.id);
                setLibraryFilter('all');
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#0F172A] border-[#0066FF] ring-1 ring-[#0066FF]'
                  : 'bg-[#0F172A]/70 border-[#1E293B] hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {p.type === 'video' ? (
                    <FileVideo className="w-4 h-4 text-[#35C6E8] shrink-0" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  <span className="text-xs font-bold text-white truncate">{p.label}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-medium border shrink-0 ${
                  hasCustom
                    ? 'bg-emerald-500/20 text-[#16A34A] border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {hasCustom ? 'ACTIVE CUSTOM' : 'STATIC FALLBACK'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                {p.description}
              </p>
              <div className="mt-3 pt-2 border-t border-[#1E293B] flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-blue-300 text-[11px] truncate max-w-[180px]">{p.id}</span>
                <span className="text-white font-medium shrink-0">{assetCount} in library</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Placement Management Console */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E293B]">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[#35C6E8] uppercase tracking-wider font-semibold">Active Placement</span>
              <span className="text-xs text-slate-400">·</span>
              <code className="text-xs font-mono bg-[#080D1A] px-2 py-0.5 rounded text-blue-300 border border-[#1E293B]">
                {placementMeta.id}
              </code>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white mt-1">
              {placementMeta.label}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenAdd(placementMeta.type, selectedPlacement)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0066FF] hover:bg-blue-500 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Video to Library</span>
            </button>
          </div>
        </div>

        {/* 1. ACTIVE VIDEO PREVIEW BANNER */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-2">
              <span>Live Public Site Resolution</span>
              <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                Single Active Asset Architecture
              </span>
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded border ${
              hasCustomActive 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}>
              {hasCustomActive ? 'ACTIVE CUSTOM ASSET' : 'STATIC FACTORY FALLBACK'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Player Preview Box (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-video w-full rounded-xl bg-[#080D1A] border border-[#1E293B] overflow-hidden flex flex-col items-center justify-center">
                {activeAsset?.type === 'video' ? (
                  activeAsset.url ? (
                    <video
                      src={activeAsset.url}
                      poster={activeAsset.posterUrl}
                      controls
                      className="w-full h-full object-contain bg-black"
                    />
                  ) : activeAsset.posterUrl ? (
                    <div className="relative w-full h-full">
                      <img
                        src={activeAsset.posterUrl}
                        alt={activeAsset.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
                        <div className="w-12 h-12 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-lg mb-2">
                          <Play className="w-5 h-5 ml-0.5 fill-white" />
                        </div>
                        <div className="text-xs text-white font-bold">{activeAsset.name}</div>
                        <div className="text-[10px] text-emerald-300 font-mono mt-0.5">Custom Thumbnail Active · Ready on Public Site</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6 space-y-2">
                      <Film className="w-10 h-10 text-slate-600 mx-auto" />
                      <div className="text-xs text-slate-300 font-medium">Default Factory Simulation Video Active</div>
                      <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                        High-voltage screening &amp; automated winding reel displays on the public website.
                      </p>
                    </div>
                  )
                ) : activeAsset?.url ? (
                  <img
                    src={activeAsset.url}
                    alt={activeAsset.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <ImageIcon className="w-10 h-10 text-slate-600 mx-auto" />
                    <div className="text-xs text-slate-400">Default Industrial Blueprint Stage Active</div>
                  </div>
                )}

                {/* Status Badge Overlay */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-xs text-xs font-medium text-emerald-400 border border-emerald-500/30">
                  ACTIVE ON SITE
                </div>
              </div>

              {/* Active Asset Info & Quick Controls */}
              {activeAsset && (
                <div className="p-4 rounded-xl bg-[#080D1A] border border-[#1E293B] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-white font-bold text-sm block">{activeAsset.name}</span>
                      {activeAsset.description && (
                        <p className="text-xs text-slate-400 mt-0.5">{activeAsset.description}</p>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 shrink-0">
                      Updated: {new Date(activeAsset.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Quick Active Controls */}
                  <div className="flex items-center gap-2 pt-2 border-t border-[#1E293B] flex-wrap">
                    {hasCustomActive && (
                      <>
                        <button
                          onClick={() => {
                            setThumbnailTarget(activeAsset);
                            setQuickThumbnailUrl(activeAsset.posterUrl || '');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-medium transition-colors cursor-pointer min-h-[36px] flex items-center gap-1.5"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Change Thumbnail</span>
                        </button>
                        <button
                          onClick={() => handleOpenEdit(activeAsset)}
                          className="px-3 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-medium transition-colors cursor-pointer min-h-[36px] flex items-center gap-1.5"
                        >
                          <FileVideo className="w-3.5 h-3.5 text-[#35C6E8]" />
                          <span>Replace Video</span>
                        </button>
                      </>
                    )}
                    {activeAsset.url && (
                      <button
                        onClick={() => setPreviewingAsset(activeAsset)}
                        className="px-3 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-cyan-300 text-xs font-medium transition-colors cursor-pointer min-h-[36px] flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Preview Fullscreen</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 2. VIDEO LIBRARY & VERSION STACK (5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Video Library ({allAssetsForPlacement.length})
                </div>

                {/* Library Filter Pills */}
                <div className="flex items-center gap-1 bg-[#080D1A] p-0.5 rounded-lg border border-[#1E293B]">
                  {(['all', 'active', 'draft', 'archived'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setLibraryFilter(tab)}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase transition-colors cursor-pointer ${
                        libraryFilter === tab
                          ? 'bg-[#0066FF] text-white font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {filteredAssets.length === 0 ? (
                  <div className="p-6 rounded-xl bg-[#080D1A] border border-[#1E293B] text-center space-y-2">
                    <Film className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-400">
                      {libraryFilter === 'all'
                        ? 'No custom videos stored in library yet. Static factory fallback is active.'
                        : `No ${libraryFilter} videos found.`}
                    </p>
                    <button
                      onClick={() => handleOpenAdd(placementMeta.type, selectedPlacement)}
                      className="px-3 py-1.5 rounded-lg bg-[#0066FF] hover:bg-blue-500 text-white text-xs font-medium cursor-pointer"
                    >
                      + Add Video
                    </button>
                  </div>
                ) : (
                  filteredAssets.map((asset) => {
                    const isActive = asset.status === 'active';
                    const isDraft = asset.status === 'draft';
                    const isArchived = asset.status === 'archived';

                    return (
                      <div
                        key={asset.id}
                        className={`p-3.5 rounded-xl border transition-all ${
                          isActive
                            ? 'bg-[#080D1A] border-emerald-500/40 ring-1 ring-emerald-500/20'
                            : 'bg-[#080D1A]/60 border-[#1E293B]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5 min-w-0">
                            {/* Thumbnail Box */}
                            <div className="w-12 h-12 rounded-lg bg-[#0F172A] border border-[#1E293B] overflow-hidden shrink-0 flex items-center justify-center relative">
                              {asset.posterUrl ? (
                                <img src={asset.posterUrl} alt={asset.name} className="w-full h-full object-cover" />
                              ) : asset.type === 'video' ? (
                                <Film className="w-5 h-5 text-slate-500" />
                              ) : (
                                <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-bold text-white truncate">
                                  {asset.name}
                                </span>
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">
                                  {SITE_MEDIA_PLACEMENTS.find(p => p.id === asset.placement)?.label || asset.placement}
                                </span>
                                <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase border ${
                                  isActive
                                    ? 'bg-emerald-500/20 text-[#16A34A] border-emerald-500/40'
                                    : isDraft
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : 'bg-slate-800 text-slate-400 border-slate-700'
                                }`}>
                                  {isActive ? 'Active on Site' : asset.status}
                                </span>
                              </div>

                              <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
                                <span>{new Date(asset.updatedAt).toLocaleDateString()}</span>
                                <span className="font-mono text-[9px] text-slate-400">({asset.placement})</span>
                                {asset.posterUrl && <span className="text-emerald-400 font-medium">✓ Custom Poster</span>}
                              </div>
                            </div>
                          </div>
                        </div>

                        {asset.description && (
                          <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                            {asset.description}
                          </p>
                        )}

                        {/* Action Buttons Row */}
                        <div className="mt-3 pt-2.5 border-t border-[#1E293B] flex items-center justify-between gap-1.5 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setPreviewingAsset(asset)}
                              className="px-2.5 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-cyan-300 text-xs font-medium transition-colors cursor-pointer min-h-[36px] flex items-center gap-1"
                              title="Preview Video"
                            >
                              <Play className="w-3 h-3" />
                              <span>Preview</span>
                            </button>

                            {!isActive ? (
                              <button
                                onClick={() => setActivationTarget(asset)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-colors cursor-pointer min-h-[36px] flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                <span>Make Active</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleArchiveAsset(asset)}
                                className="px-2.5 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 text-xs font-medium transition-colors cursor-pointer min-h-[36px] flex items-center gap-1"
                              >
                                <Archive className="w-3 h-3" />
                                <span>Archive</span>
                              </button>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setThumbnailTarget(asset);
                                setQuickThumbnailUrl(asset.posterUrl || '');
                              }}
                              className="p-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                              title="Set/Change Thumbnail Poster"
                            >
                              <ImageIcon className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleOpenEdit(asset)}
                              className="p-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                              title="Edit / Replace Asset"
                            >
                              <FileVideo className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDelete(asset)}
                              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                              title="Delete Asset"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 1. ADD / EDIT VIDEO MODAL WITH CUSTOM POSTER SUPPORT */}
      {/* ========================================================================= */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0F172A] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 bg-[#080D1A] border-b border-[#1E293B] flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#35C6E8]" />
                  {editingAssetId ? 'Edit Video Asset' : 'Add Video to Library'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Target Placement: <strong className="text-blue-300 font-mono">{formPlacement}</strong>
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl bg-[#1E293B] text-slate-400 hover:text-white transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAsset} className="p-6 space-y-5 flex-1 overflow-y-auto">
              {formError && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Placement Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  Target Site Placement
                </label>
                <select
                  value={formPlacement}
                  onChange={(e) => {
                    const p = e.target.value as SiteMediaPlacement;
                    setFormPlacement(p);
                    const meta = SITE_MEDIA_PLACEMENTS.find(m => m.id === p);
                    if (meta) {
                      setFormType(meta.type);
                    }
                  }}
                  className="w-full h-11 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                >
                  {SITE_MEDIA_PLACEMENTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.label} ({p.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* Asset Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. 4K High-Voltage Facility Tour Reel"
                  className="w-full h-11 px-3.5 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  Description / Context Notes (Optional)
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={2}
                  placeholder="e.g. High-definition recording of automated slitting, winding, and QA screening."
                  className="w-full p-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                />
              </div>

              {/* Video File / URL Source */}
              <div className="space-y-2 pt-2 border-t border-[#1E293B]">
                <label className="text-xs font-bold text-slate-200">
                  {formType === 'video' ? 'Video Source (MP4, WEBM, MOV)' : 'Image Source'} *
                </label>

                <div className="flex flex-wrap items-center gap-2">
                  {formType === 'video' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => videoFileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-medium transition-colors cursor-pointer min-h-[44px]"
                      >
                        <Upload className="w-4 h-4 text-[#35C6E8]" />
                        <span>Select Video File</span>
                      </button>
                      <input
                        ref={videoFileInputRef}
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        onChange={handleVideoFile}
                        className="hidden"
                      />
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => imageFileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-medium transition-colors cursor-pointer min-h-[44px]"
                      >
                        <Upload className="w-4 h-4 text-emerald-400" />
                        <span>Select Image File</span>
                      </button>
                      <input
                        ref={imageFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageFile}
                        className="hidden"
                      />
                    </>
                  )}

                  <span className="text-xs text-slate-500">or enter direct URL:</span>
                </div>

                <input
                  type="text"
                  value={formMediaUrl}
                  onChange={(e) => setFormMediaUrl(e.target.value)}
                  placeholder="e.g. https://cdn.neutracap.com/media/hero-facility-2026.mp4"
                  className="w-full h-10 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                />
              </div>

              {/* Custom Video Thumbnail / Poster (Optional) */}
              {formType === 'video' && (
                <div className="space-y-3 pt-2 border-t border-[#1E293B]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-emerald-400" />
                      <span>Custom Thumbnail / Poster Image (Optional)</span>
                    </label>
                    {formPosterUrl && (
                      <button
                        type="button"
                        onClick={() => setFormPosterUrl('')}
                        className="text-xs text-rose-400 hover:underline cursor-pointer"
                      >
                        Remove Thumbnail
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 h-14 rounded-lg bg-[#080D1A] border border-[#1E293B] flex items-center justify-center overflow-hidden shrink-0">
                      {formPosterUrl ? (
                        <img src={formPosterUrl} alt="Poster" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-slate-600" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => posterFileInputRef.current?.click()}
                          className="px-3 py-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer min-h-[40px]"
                        >
                          <Upload className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{formPosterUrl ? 'Replace Thumbnail' : 'Upload Thumbnail'}</span>
                        </button>
                        <input
                          ref={posterFileInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          onChange={handlePosterFile}
                          className="hidden"
                        />
                        <span className="text-[11px] text-slate-500">or URL:</span>
                      </div>
                      <input
                        type="text"
                        value={formPosterUrl}
                        onChange={(e) => setFormPosterUrl(e.target.value)}
                        placeholder="https://cdn.neutracap.com/posters/hero-poster.jpg"
                        className="w-full h-8 px-2.5 rounded-lg bg-[#080D1A] border border-[#1E293B] text-[11px] text-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    If no custom thumbnail is attached, the video native poster will display automatically.
                  </p>
                </div>
              )}

              {/* Status Select */}
              <div className="space-y-1.5 pt-2 border-t border-[#1E293B]">
                <label className="text-xs font-bold text-slate-200">
                  Initial Status
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs">
                  <label className="flex items-center gap-2 text-white cursor-pointer min-h-[36px]">
                    <input
                      type="radio"
                      name="assetStatus"
                      value="active"
                      checked={formStatus === 'active'}
                      onChange={() => setFormStatus('active')}
                    />
                    <span className="text-emerald-400 font-bold">Active (Set as Live Public Asset)</span>
                  </label>
                  <label className="flex items-center gap-2 text-white cursor-pointer min-h-[36px]">
                    <input
                      type="radio"
                      name="assetStatus"
                      value="draft"
                      checked={formStatus === 'draft'}
                      onChange={() => setFormStatus('draft')}
                    />
                    <span className="text-amber-300">Draft (Store in Library)</span>
                  </label>
                  <label className="flex items-center gap-2 text-white cursor-pointer min-h-[36px]">
                    <input
                      type="radio"
                      name="assetStatus"
                      value="archived"
                      checked={formStatus === 'archived'}
                      onChange={() => setFormStatus('archived')}
                    />
                    <span className="text-slate-400">Archived</span>
                  </label>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-4 border-t border-[#1E293B] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 text-xs sm:text-sm font-medium transition-colors cursor-pointer min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#0066FF] hover:bg-blue-500 active:bg-blue-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer min-h-[44px]"
                >
                  Save to Video Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DEDICATED PREVIEW VIDEO MODAL */}
      {/* ========================================================================= */}
      {previewingAsset && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-3xl bg-[#071426] border border-[#173A5E] rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto">
            <div className="p-4 bg-[#0B1F36] border-b border-[#173A5E] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Film className="w-5 h-5 text-[#35C6E8]" />
                <div>
                  <h4 className="text-sm font-bold text-white">{previewingAsset.name}</h4>
                  <p className="text-[11px] text-[#A8B4C2] font-mono">{previewingAsset.placement} · Status: {previewingAsset.status.toUpperCase()}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewingAsset(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {previewingAsset.type === 'video' ? (
                <video
                  src={previewingAsset.url}
                  poster={previewingAsset.posterUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <img src={previewingAsset.url} alt={previewingAsset.name} className="w-full h-full object-contain" />
              )}
            </div>

            <div className="p-4 bg-[#0B1F36] border-t border-[#173A5E] flex items-center justify-between flex-wrap gap-2">
              <div className="text-xs text-[#A8B4C2]">
                {previewingAsset.description || 'No description provided.'}
              </div>
              <button
                onClick={() => setPreviewingAsset(null)}
                className="px-4 py-2 rounded-lg bg-[#173A5E] hover:bg-[#1f4a75] text-white text-xs font-bold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. ACTIVATION CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {activationTarget && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <h4 className="text-base font-bold text-white">Set as Active Public Video?</h4>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to set <strong className="text-white font-bold">"{activationTarget.name}"</strong> as the active asset for <code className="text-blue-300 font-mono">[{activationTarget.placement}]</code>?
            </p>
            
            <div className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-[11px] text-slate-400 space-y-1">
              <div>✓ This video will immediately stream on the live public site.</div>
              <div>✓ Any previously active video will be automatically moved to <span className="text-slate-300 font-bold">Archived</span> without deletion.</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1E293B]">
              <button
                onClick={() => setActivationTarget(null)}
                className="px-4 py-2.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-medium transition-colors cursor-pointer min-h-[40px]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmMakeActive}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer min-h-[40px] flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Confirm &amp; Make Active</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. QUICK THUMBNAIL CHANGE MODAL */}
      {/* ========================================================================= */}
      {thumbnailTarget && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-emerald-400" />
                <h4 className="text-base font-bold text-white">Custom Thumbnail Poster</h4>
              </div>
              <button
                onClick={() => setThumbnailTarget(null)}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Set or replace the custom video poster for <strong className="text-white">"{thumbnailTarget.name}"</strong>:
            </p>

            <div className="flex items-center gap-4">
              <div className="w-24 h-16 rounded-lg bg-[#080D1A] border border-[#1E293B] flex items-center justify-center overflow-hidden shrink-0">
                {quickThumbnailUrl ? (
                  <img src={quickThumbnailUrl} alt="Poster" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-600" />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <button
                  type="button"
                  onClick={() => quickPosterFileInputRef.current?.click()}
                  className="w-full px-3 py-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Select Image File</span>
                </button>
                <input
                  ref={quickPosterFileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleQuickPosterFile}
                  className="hidden"
                />
                {quickThumbnailUrl && (
                  <button
                    type="button"
                    onClick={() => setQuickThumbnailUrl('')}
                    className="text-xs text-rose-400 hover:underline block mx-auto text-center"
                  >
                    Clear Thumbnail
                  </button>
                )}
              </div>
            </div>

            <input
              type="text"
              value={quickThumbnailUrl}
              onChange={(e) => setQuickThumbnailUrl(e.target.value)}
              placeholder="https://... image URL"
              className="w-full h-9 px-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs text-white font-mono focus:outline-none"
            />

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1E293B]">
              <button
                onClick={() => setThumbnailTarget(null)}
                className="px-4 py-2.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-medium cursor-pointer min-h-[40px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveQuickThumbnail}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer min-h-[40px]"
              >
                Save Thumbnail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. UNSAVED PROMPT MODAL */}
      {/* ========================================================================= */}
      {showUnsavedPrompt && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h4 className="text-base font-bold text-white">Unsaved Changes</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              You have entered media changes that have not been saved yet. Leave without saving?
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
                  setIsEditing(false);
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
