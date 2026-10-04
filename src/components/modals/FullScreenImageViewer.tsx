/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP FULL-SCREEN IMAGE VIEWER
 * Minimalist Fullscreen Image Viewer
 * Contains ONLY:
 * - Dark overlay/background
 * - Original high-quality product image centered
 * - Close / X control
 * - ESC & backdrop click to close
 * - Scroll lock
 */

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { CapacitorVariant } from '../../types';

interface FullScreenImageViewerProps {
  isOpen: boolean;
  product: CapacitorVariant | null;
  onClose: () => void;
  initialImageUrl?: string;
}

export const FullScreenImageViewer: React.FC<FullScreenImageViewerProps> = ({
  isOpen,
  product,
  onClose,
  initialImageUrl,
}) => {
  // Derive high-resolution image URL
  const getHighResImageUrl = (): string => {
    if (initialImageUrl) {
      if (initialImageUrl.includes('_thumb.webp')) {
        return initialImageUrl.replace('_thumb.webp', '_full.webp');
      }
      if (initialImageUrl.endsWith('.webp') && !initialImageUrl.includes('_full.webp')) {
        return initialImageUrl.replace('.webp', '_full.webp');
      }
      return initialImageUrl;
    }

    if (product?.gallery && product.gallery.length > 0) {
      return product.gallery[0];
    }

    const baseImage = product?.primaryImage || product?.image;
    if (baseImage) {
      if (baseImage.includes('_thumb.webp')) {
        return baseImage.replace('_thumb.webp', '_full.webp');
      }
      if (baseImage.endsWith('.webp') && !baseImage.includes('_full.webp')) {
        return baseImage.replace('.webp', '_full.webp');
      }
      return baseImage;
    }

    return '';
  };

  const imageUrl = getHighResImageUrl();

  // Prevent underlying page scrolling while open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div
      id="fullscreen-image-viewer"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-150 p-4 sm:p-8 select-none"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        id="close-fullscreen-viewer-btn"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        title="Close Viewer (ESC)"
        aria-label="Close Viewer"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20 shadow-lg"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Centered High-Resolution Product Image */}
      <img
        src={imageUrl}
        alt={product?.productName || 'NeutraCap Capacitor Photograph'}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-md shadow-2xl pointer-events-auto"
        referrerPolicy="no-referrer"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
