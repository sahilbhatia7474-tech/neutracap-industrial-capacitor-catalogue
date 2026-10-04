/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP PRODUCT REGISTRY & MEDIA RESOLUTION SERVICE
 * Authoritative Single Source of Truth for Product Data & Media Assignment
 * 
 * Resolution Concept:
 * SKU -> Product Registry -> Primary Image / Gallery / Video -> Catalogue / Product Card / Detail / Lightbox
 * Fallback: If no Vault-managed media exists for a SKU, seamlessly falls back to static web assets.
 */

import { CapacitorVariant, ProductFamilyId } from '../types';

export interface ProductMediaRecord {
  primaryImage?: string;
  thumbnail?: string;
  gallery?: string[];
  video?: string;
  updatedAt?: string;
}

export interface ProductRegistryState {
  mediaBySku: Record<string, ProductMediaRecord>;
  customProducts: CapacitorVariant[];
  modifiedProducts: Record<string, Partial<CapacitorVariant>>;
}

const REGISTRY_STORAGE_KEY = 'neutracap_product_registry_v1';

const INITIAL_REGISTRY_STATE: ProductRegistryState = {
  mediaBySku: {},
  customProducts: [],
  modifiedProducts: {},
};

/**
 * Loads the current Product Registry state from persistent storage.
 */
export function loadProductRegistry(): ProductRegistryState {
  try {
    const raw = localStorage.getItem(REGISTRY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        mediaBySku: parsed.mediaBySku || {},
        customProducts: Array.isArray(parsed.customProducts) ? parsed.customProducts : [],
        modifiedProducts: parsed.modifiedProducts || {},
      };
    }
  } catch (err) {
    console.warn('[NeutraCap ProductRegistry] Failed to load registry from storage:', err);
  }
  return INITIAL_REGISTRY_STATE;
}

/**
 * Saves the Product Registry state to persistent storage.
 */
export function saveProductRegistry(state: ProductRegistryState): void {
  try {
    localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('[NeutraCap ProductRegistry] Failed to save registry to storage:', err);
  }
}

/**
 * Merges baseline variants with custom products, applies overrides, and resolves media by SKU.
 * @param baseVariants Baseline variants from catalogue
 * @param includeDrafts When true (e.g. inside Founder Vault), all items are returned with their status. When false (public catalogue), draft items are omitted.
 */
export function resolveCatalogueProducts(
  baseVariants: CapacitorVariant[],
  includeDrafts: boolean = false
): CapacitorVariant[] {
  const registry = loadProductRegistry();

  // Combine baseline variants and custom Founder-created variants
  const combinedMap = new Map<string, CapacitorVariant>();

  // 1. Load baseline variants
  baseVariants.forEach((v) => {
    combinedMap.set(v.sku || v.id, { ...v, status: v.status || 'active' });
  });

  // 2. Load custom products added by Founder
  registry.customProducts.forEach((customProd) => {
    combinedMap.set(customProd.sku || customProd.id, { ...customProd });
  });

  // 3. Apply field modifications and Media Registry overrides
  const resolvedList: CapacitorVariant[] = [];

  combinedMap.forEach((product, key) => {
    let merged: CapacitorVariant = { ...product };

    // Apply any field modifications
    const mod = registry.modifiedProducts[merged.sku] || registry.modifiedProducts[merged.id];
    if (mod) {
      merged = {
        ...merged,
        ...mod,
        pricing: {
          ...merged.pricing,
          ...(mod.pricing || {}),
        },
        dimensions: {
          ...merged.dimensions,
          ...(mod.dimensions || {}),
        },
      };
    }

    // Apply SKU Media Overrides from Product Vault
    const media = registry.mediaBySku[merged.sku] || (merged.id ? registry.mediaBySku[merged.id] : undefined);
    if (media) {
      if (media.primaryImage) {
        merged.primaryImage = media.primaryImage;
        merged.image = media.primaryImage;
      }
      if (media.thumbnail) {
        merged.thumbnail = media.thumbnail;
      }
      if (media.gallery && media.gallery.length > 0) {
        merged.gallery = media.gallery;
        merged.galleryImages = media.gallery;
      }
      if (media.video) {
        merged.video = media.video;
      }
    }

    // Filter by draft status if public
    if (!includeDrafts && merged.status === 'draft') {
      return;
    }

    resolvedList.push(merged);
  });

  return resolvedList;
}

/**
 * Assigns or updates primary image, gallery, and optional video for a specific SKU.
 */
export function saveProductMedia(
  sku: string,
  media: { primaryImage?: string; thumbnail?: string; gallery?: string[]; video?: string }
): ProductRegistryState {
  const current = loadProductRegistry();
  const existing = current.mediaBySku[sku] || {};

  current.mediaBySku[sku] = {
    ...existing,
    ...media,
    updatedAt: new Date().toISOString(),
  };

  saveProductRegistry(current);
  return current;
}

/**
 * Resets media for a SKU to default static fallback.
 */
export function resetProductMedia(sku: string): ProductRegistryState {
  const current = loadProductRegistry();
  delete current.mediaBySku[sku];
  saveProductRegistry(current);
  return current;
}

/**
 * Creates or updates a product in the registry.
 */
export function upsertProduct(product: CapacitorVariant): ProductRegistryState {
  const current = loadProductRegistry();
  const now = new Date().toISOString();

  // Check if it is an existing custom product
  const customIdx = current.customProducts.findIndex(
    (p) => (p.sku && p.sku === product.sku) || p.id === product.id
  );

  const enrichedProduct: CapacitorVariant = {
    ...product,
    updatedAt: now,
    status: product.status || 'active',
  };

  if (customIdx >= 0) {
    current.customProducts[customIdx] = enrichedProduct;
  } else {
    // Check if it's a baseline modification
    current.modifiedProducts[product.sku || product.id] = enrichedProduct;
    // If it is explicitly marked as custom
    if (!current.modifiedProducts[product.sku]) {
      current.customProducts.unshift({
        ...enrichedProduct,
        createdAt: enrichedProduct.createdAt || now,
      });
    }
  }

  // Also bind any media attached to this product to mediaBySku
  if (product.primaryImage || product.gallery || product.video) {
    current.mediaBySku[product.sku] = {
      primaryImage: product.primaryImage,
      thumbnail: product.thumbnail || product.primaryImage,
      gallery: product.gallery,
      video: product.video,
      updatedAt: now,
    };
  }

  saveProductRegistry(current);
  return current;
}

/**
 * Deletes a custom product or resets modifications.
 */
export function deleteProductFromRegistry(idOrSku: string): ProductRegistryState {
  const current = loadProductRegistry();
  current.customProducts = current.customProducts.filter(
    (p) => p.id !== idOrSku && p.sku !== idOrSku
  );
  delete current.modifiedProducts[idOrSku];
  delete current.mediaBySku[idOrSku];
  saveProductRegistry(current);
  return current;
}
