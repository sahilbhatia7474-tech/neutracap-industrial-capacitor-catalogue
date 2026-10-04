/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEUTRACAP — PREMIUM INDUSTRIAL COMMERCE & CATALOGUE SYSTEM (V7)
 * Architecture:
 * - HEADER (Engineered Wordmark & Monogram Logo, Nav, Assist, Search, Enquiry Cart, Factory Desk CTA)
 * - HERO (ENGINEERED CAPACITORS FOR DEMANDING POWER APPLICATIONS.)
 * - PRODUCT FAMILY GATEWAYS (2×2 Precision Tactile Gateways / 490 Canonical Baseline Variants)
 * - WHY NEUTRACAP (3 concise engineering proof points)
 * - HORIZONTAL PRODUCT SYSTEM (4 Dedicated Carousels with Add-to-Cart & Details actions)
 * - FIND YOUR CAPACITOR (Intelligent specification selector with zero fake data)
 * - CUSTOM REQUIREMENT (Factory OEM desk conversion block)
 * - FOOTER (Calm 4-column layout with brand signature & Founder Vault link)
 * - ENQUIRY CART DRAWER (Multi-item quantity stepper, dual CTA: Formal Quote & WhatsApp)
 * - GLOBAL FLOATING WHATSAPP BUTTON (Fixed bottom-right thumb-friendly desk access: +91 9953239674)
 * - NEUTRACAP VECTOR (Proprietary AI Engineering Intelligence Grounded in 490 variants)
 * - FOUNDER VAULT 2.0 (Undo/Reverse, Change History, Diff View, Price Staging)
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { ProductFamilyStrip } from './components/home/ProductFamilyStrip';
import { WhyNeutraCapSection } from './components/home/WhyNeutraCapSection';
import { ProductCatalogueCarousels } from './components/home/ProductCatalogueCarousels';
import { FindYourCapacitorSection } from './components/home/FindYourCapacitorSection';
import { CustomRequirementSection } from './components/home/CustomRequirementSection';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { QuickViewModal } from './components/modals/QuickViewModal';
import { EnquiryModal } from './components/modals/EnquiryModal';
import { EnquiryCartDrawer } from './components/modals/EnquiryCartDrawer';
import { VideoModal } from './components/modals/VideoModal';
import { FounderVault, ExtendedAuditLog } from './components/founder/FounderVault';
import { NeutraCapAssist } from './components/ai/NeutraCapAssist';
import { FloatingWhatsAppButton } from './components/common/FloatingWhatsAppButton';
import { PublicScrollControl } from './components/common/PublicScrollControl';
import { PWAInstallBanner } from './components/common/PWAInstallBanner';
import { ViewportRevealSection } from './components/common/ViewportRevealSection';
import { SiteMediaPlacement } from './services/siteMediaRegistry';

import { 
  PRODUCT_FAMILIES, 
  INITIAL_VARIANTS, 
  INITIAL_AUDIT_LOGS 
} from './data/mockCatalogue';
import { 
  CapacitorVariant, 
  ProductFamilyId, 
  FounderAuditLog,
  EnquiryCartItem
} from './types';
import { CANONICAL_WHATSAPP_NUMBER } from './data/siteFacts';
import { resolveCatalogueProducts } from './services/productRegistry';

const CART_STORAGE_KEY = 'neutracap_enquiry_cart_v1';

export default function App() {
  // Navigation & State Management
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductFamilyId | 'all'>('all');
  
  // Data-Driven Products & Extended Audit Logs
  const [products, setProducts] = useState<CapacitorVariant[]>(() =>
    resolveCatalogueProducts(INITIAL_VARIANTS, true)
  );
  const [auditLogs, setAuditLogs] = useState<ExtendedAuditLog[]>(() => {
    return INITIAL_AUDIT_LOGS.map(log => ({
      ...log,
      status: 'CONFIRMED' as const,
    }));
  });
  
  // Editable Hero Headline per Founder Vault hooks
  const [heroHeadline, setHeroHeadline] = useState<string>(
    'ENGINEERED CAPACITORS FOR DEMANDING POWER APPLICATIONS.'
  );

  // Enquiry Cart State with local persistence
  const [cartItems, setCartItems] = useState<EnquiryCartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load enquiry cart from storage', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save enquiry cart to storage', e);
    }
  }, [cartItems]);

  // Modal Control States
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [videoModalPlacement, setVideoModalPlacement] = useState<SiteMediaPlacement | null>(null);
  const [isFounderVaultOpen, setIsFounderVaultOpen] = useState<boolean>(false);
  const [isAssistOpen, setIsAssistOpen] = useState<boolean>(false);
  const [assistInitialQuery, setAssistInitialQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<CapacitorVariant | null>(null);

  const handleOpenVideoModal = (placement: SiteMediaPlacement = 'homepage.hero.video') => {
    setVideoModalPlacement(placement);
  };

  const handleCloseVideoModal = () => {
    setVideoModalPlacement(null);
  };
  
  // Enquiry Modal State (Single Item or Direct Desk)
  const [enquiryModalState, setEnquiryModalState] = useState<{
    isOpen: boolean;
    product?: CapacitorVariant | null;
    mode: 'enquiry' | 'quote';
  }>({
    isOpen: false,
    product: null,
    mode: 'enquiry',
  });

  // Global Keyboard Shortcut for Search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll & navigation helper
  const handleNavigate = (sectionId: string, familyId?: ProductFamilyId) => {
    setActiveSection(sectionId);
    if (familyId) {
      setSelectedCategory(familyId);
    }
    
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetElement = document.getElementById(
      sectionId === 'products' ? 'product-catalogue-carousels' :
      sectionId === 'finder' ? 'finder' :
      sectionId === 'custom' ? 'custom' :
      sectionId === 'about' ? 'why-neutracap' :
      sectionId === 'contact' ? 'main-site-footer' : sectionId
    );

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart Management Handlers
  const handleAddToCart = (product: CapacitorVariant, quantity: number = 10) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => {
      if (quantity <= 0) {
        return prev.filter(item => item.product.id !== productId);
      }
      return prev.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCheckoutFormalQuote = (items: EnquiryCartItem[]) => {
    setIsCartOpen(false);
    setEnquiryModalState({
      isOpen: true,
      product: items[0]?.product || null,
      mode: 'quote',
    });
  };

  const handleCheckoutWhatsApp = (items: EnquiryCartItem[]) => {
    let generatedCartItems = '';
    items.forEach((item, idx) => {
      generatedCartItems += `${idx + 1}. ${item.product.productName}\n   - SKU: ${item.product.sku}\n   - Capacitance: ${item.product.capacitanceDisplay}\n   - Voltage: ${item.product.voltageDisplay}\n   - Quantity: ${item.quantity} units\n\n`;
    });

    const message = `Hello NeutraCap Factory Desk,\n\nI would like to enquire about the following products:\n\n${generatedCartItems}Please share availability and commercial details.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${CANONICAL_WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  // Handlers for Products & Founder Vault
  const handleUpdateProductPrice = (variantId: string, newPrice: number) => {
    setProducts(prev => prev.map(item => {
      if (item.id === variantId) {
        return {
          ...item,
          pricing: {
            ...item.pricing,
            launchPrice: newPrice,
          }
        };
      }
      return item;
    }));
  };

  const handleAddAuditLog = (log: Omit<FounderAuditLog, 'id' | 'timestamp'> & { status?: 'CONFIRMED' | 'REVERSED' | 'DRAFT'; targetId?: string; targetType?: 'PRICE' | 'HERO' | 'CATALOGUE' }) => {
    const newLog: ExtendedAuditLog = {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      status: log.status || 'CONFIRMED',
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const totalCartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#071426] text-[#172033] overflow-x-hidden font-sans">
      
      {/* 1. Primary Unified Website Header (Desktop & Mobile) */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenEnquiry={() => setEnquiryModalState({ isOpen: true, mode: 'enquiry' })}
        onOpenAssist={() => {
          setAssistInitialQuery('');
          setIsAssistOpen(true);
        }}
        onOpenFounderVault={() => setIsFounderVaultOpen(true)}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Page Flow per V7 Architecture with Staggered Viewport Entrance Reveals */}
      <main className="flex-1 pb-28 md:pb-0">
        
        {/* Section 1: Hero Section */}
        <ViewportRevealSection id="reveal-hero" delayMs={0}>
          <HeroSection
            onExploreProducts={() => {
              setSelectedCategory('all');
              handleNavigate('products');
            }}
            onFindCapacitor={() => handleNavigate('finder')}
            onOpenVideoModal={handleOpenVideoModal}
            onOpenAssist={() => {
              setAssistInitialQuery('');
              setIsAssistOpen(true);
            }}
          />
        </ViewportRevealSection>

        {/* Section 2: Why NeutraCap (Large Monumental Proof Sequence) */}
        <ViewportRevealSection id="reveal-why" delayMs={60}>
          <WhyNeutraCapSection onOpenVideoModal={handleOpenVideoModal} />
        </ViewportRevealSection>

        {/* Section 3: Product Family System (Asymmetric Architectural Composition) */}
        <ViewportRevealSection id="reveal-gateways" delayMs={80}>
          <ProductFamilyStrip
            families={PRODUCT_FAMILIES}
            onSelectFamily={(familyId) => {
              setSelectedCategory(familyId);
              handleNavigate('products', familyId);
            }}
          />
        </ViewportRevealSection>

        {/* Section 4: Horizontal Product System (4 Dedicated Rails) */}
        <ViewportRevealSection id="reveal-catalogue" delayMs={100}>
          <ProductCatalogueCarousels
            products={products}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onQuickView={(product) => setQuickViewProduct(product)}
            onEnquire={(product) => setEnquiryModalState({ isOpen: true, product, mode: 'enquiry' })}
            onRequestQuote={(product) => setEnquiryModalState({ isOpen: true, product, mode: 'quote' })}
            onAddToCart={handleAddToCart}
            onCustomRequirementClick={() => handleNavigate('custom')}
          />
        </ViewportRevealSection>

        {/* Section 5: Find Your Capacitor (Intelligent Specification Selector) */}
        <ViewportRevealSection id="reveal-finder" delayMs={100}>
          <FindYourCapacitorSection
            products={products}
            onQuickView={(product) => setQuickViewProduct(product)}
            onEnquire={(product) => setEnquiryModalState({ isOpen: true, product, mode: 'enquiry' })}
            onRequestQuote={(product) => setEnquiryModalState({ isOpen: true, product, mode: 'quote' })}
            onAddToCart={handleAddToCart}
            onCustomRequirementClick={() => handleNavigate('custom')}
          />
        </ViewportRevealSection>

        {/* Section 6: Custom Requirement Conversion Section */}
        <ViewportRevealSection id="reveal-custom" delayMs={100}>
          <CustomRequirementSection
            onSubmitSuccess={(data) => {
              handleAddAuditLog({
                actor: 'Client Desk',
                role: 'PUBLIC',
                actionType: 'VARIANT_ADD',
                summary: `New custom specification submitted for ${data.capacitance || 'custom'} / ${data.voltage || 'custom'}`,
                status: 'CONFIRMED'
              });
            }}
          />
        </ViewportRevealSection>

      </main>

      {/* Section 7: Visually Calm 4-Column Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenFounderVault={() => setIsFounderVaultOpen(true)}
      />

      {/* Section 8: Mobile Sticky Bottom Navigation */}
      <MobileNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenEnquiry={() => setEnquiryModalState({ isOpen: true, mode: 'enquiry' })}
      />

      {/* Global Fixed Floating WhatsApp Button (+91 9953239674) */}
      <FloatingWhatsAppButton currentProduct={quickViewProduct} />

      {/* Global Public Right-Side Quick Scroll Control (0% → 33% → 66% → 100%) */}
      <PublicScrollControl 
        isHidden={
          isFounderVaultOpen || 
          isSearchOpen || 
          !!videoModalPlacement || 
          isAssistOpen || 
          !!quickViewProduct || 
          enquiryModalState.isOpen || 
          isCartOpen
        } 
      />

      {/* Enquiry Cart Drawer Component */}
      <EnquiryCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onCheckoutFormalQuote={handleCheckoutFormalQuote}
        onCheckoutWhatsApp={handleCheckoutWhatsApp}
      />

      {/* Modals & Overlays */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(product) => setQuickViewProduct(product)}
        onSelectCategory={(catId) => {
          if (catId === 'custom') {
            handleNavigate('custom');
          } else {
            handleNavigate('products', catId as ProductFamilyId);
          }
        }}
      />

      {/* Reusable Quick View Modal with 4-Angle Image Architecture */}
      <QuickViewModal
        isOpen={!!quickViewProduct}
        product={quickViewProduct}
        allProducts={products}
        onClose={() => setQuickViewProduct(null)}
        onEnquire={(prod) => setEnquiryModalState({ isOpen: true, product: prod, mode: 'enquiry' })}
        onRequestQuote={(prod) => setEnquiryModalState({ isOpen: true, product: prod, mode: 'quote' })}
        onAddToCart={(prod, qty) => {
          handleAddToCart(prod, qty);
        }}
      />

      {/* Reusable Factory Enquiry & B2B Quote Modal */}
      <EnquiryModal
        isOpen={enquiryModalState.isOpen}
        product={enquiryModalState.product}
        mode={enquiryModalState.mode}
        onClose={() => setEnquiryModalState({ isOpen: false, product: null, mode: 'enquiry' })}
      />

      {/* Reusable Story & Placement-Aware Video Modal */}
      <VideoModal
        isOpen={!!videoModalPlacement}
        onClose={handleCloseVideoModal}
        placement={videoModalPlacement || 'homepage.hero.video'}
      />

      {/* NeutraCap Assist — Technical & Product Assistant */}
      <NeutraCapAssist
        isOpen={isAssistOpen}
        onClose={() => setIsAssistOpen(false)}
        products={products}
        initialQuery={assistInitialQuery}
        onSelectProduct={(product) => {
          setQuickViewProduct(product);
        }}
        onOpenFinder={() => {
          setIsAssistOpen(false);
          handleNavigate('finder');
        }}
        onOpenEnquiry={(prod) => {
          setIsAssistOpen(false);
          setEnquiryModalState({ isOpen: true, product: prod, mode: 'enquiry' });
        }}
      />

      {/* Private Founder Vault & AI Command Center */}
      <FounderVault
        isOpen={isFounderVaultOpen}
        onClose={() => setIsFounderVaultOpen(false)}
        products={products}
        families={PRODUCT_FAMILIES}
        onUpdateProductPrice={handleUpdateProductPrice}
        onAddAuditLog={handleAddAuditLog}
        auditLogs={auditLogs}
        heroHeadline={heroHeadline}
        onUpdateHeroHeadline={setHeroHeadline}
        onProductsUpdated={setProducts}
      />

      {/* Progressive Web App (PWA) Install Trigger & Banner */}
      <PWAInstallBanner />

    </div>
  );
}
