/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * REFUND & CANCELLATION POLICY PAGE (STANDALONE LEGAL DOCUMENT)
 * Content source: Exact text from user brief.
 * Placeholders preserved verbatim.
 */

import React from 'react';
import { LegalPageLayout, LegalSectionItem } from './LegalPageLayout';

export interface RefundCancellationPageProps {
  onBack: () => void;
  onNavigateLegal: (path: '/terms-and-conditions' | '/privacy-policy' | '/refund-and-cancellation') => void;
}

export const RefundCancellationPage: React.FC<RefundCancellationPageProps> = ({
  onBack,
  onNavigateLegal,
}) => {
  const sections: LegalSectionItem[] = [
    { id: 'section-cancellation', title: '1. Order Cancellation' },
    { id: 'section-custom-oem', title: '2. Custom / OEM Orders' },
    { id: 'section-refunds', title: '3. Refunds' },
    { id: 'section-damaged', title: '4. Damaged Products' },
    { id: 'section-wrong-product', title: '5. Wrong Product / Specification Mismatch' },
    { id: 'section-defective', title: '6. Defective Product' },
    { id: 'section-change-of-mind', title: '7. Change of Mind' },
    { id: 'section-customer-damage', title: '8. Products Damaged by Customer' },
    { id: 'section-shipping-freight', title: '9. Shipping / Freight' },
    { id: 'section-taxes', title: '10. Taxes' },
    { id: 'section-processing-time', title: '11. Refund Processing Time' },
    { id: 'section-how-to-request', title: '12. How to Request a Cancellation / Refund' },
    { id: 'section-contact', title: '13. Contact' },
  ];

  return (
    <LegalPageLayout
      title="Refund & Cancellation Policy"
      effectiveDate="October 6, 2026"
      lastUpdatedDate="October 6, 2026"
      sections={sections}
      activeLegalPath="/refund-and-cancellation"
      onNavigateHome={onBack}
      onNavigateLegal={onNavigateLegal}
    >
      {/* Introduction */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight border-b border-white/10 pb-3">
          Introduction
        </h2>
        <p>
          Because NeutraCap supplies industrial/electrical capacitor products, refunds and cancellations depend on the product type, order status, product condition and applicable commercial terms.
        </p>
      </section>

      {/* 1. ORDER CANCELLATION */}
      <section id="section-cancellation" className="space-y-3 pt-6">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">01.</span>
          <span>Order Cancellation</span>
        </h2>
        <p>
          A customer may request cancellation before the order enters processing/production.
        </p>
        <p>
          Cancellation requests must be submitted through the official contact channel.
        </p>
        <p>
          Once an order has been manufactured, customised, packed for dispatch or shipped, cancellation may not be possible.
        </p>
      </section>

      {/* 2. CUSTOM / OEM ORDERS */}
      <section id="section-custom-oem" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">02.</span>
          <span>Custom / OEM Orders</span>
        </h2>
        <p>
          Custom or OEM-configured products may be non-cancellable and non-refundable once production has started, because they may have been manufactured specifically against the customer's approved requirements.
        </p>
        <p>
          Any exception will be considered case-by-case and must be confirmed in writing.
        </p>
      </section>

      {/* 3. REFUNDS */}
      <section id="section-refunds" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">03.</span>
          <span>Refunds</span>
        </h2>
        <p>Where a refund is approved, the amount and method of refund will depend on:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
          <li>reason for refund;</li>
          <li>order status;</li>
          <li>applicable commercial terms;</li>
          <li>product condition;</li>
          <li>payment method;</li>
          <li>applicable taxes and charges.</li>
        </ul>
        <p>
          Approved refunds will generally be processed through the original payment method or another mutually agreed method, subject to applicable payment-provider timelines.
        </p>
      </section>

      {/* 4. DAMAGED PRODUCTS */}
      <section id="section-damaged" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">04.</span>
          <span>Damaged Products</span>
        </h2>
        <p>If a product is received visibly damaged, the customer should:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
          <li>photograph the package before opening where possible;</li>
          <li>photograph the damaged product;</li>
          <li>retain the packaging;</li>
          <li>provide the invoice/order details;</li>
          <li>notify NeutraCap promptly.</li>
        </ul>
        <p>
          The claim will be reviewed based on the available evidence and applicable delivery/insurance terms.
        </p>
      </section>

      {/* 5. WRONG PRODUCT / SPECIFICATION MISMATCH */}
      <section id="section-wrong-product" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">05.</span>
          <span>Wrong Product / Specification Mismatch</span>
        </h2>
        <p>
          If the product supplied materially differs from the product/specification confirmed in the applicable order documentation, the customer should contact NeutraCap promptly.
        </p>
        <p>After verification, NeutraCap may, where appropriate:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
          <li>replace the product;</li>
          <li>correct the issue;</li>
          <li>provide another appropriate resolution;</li>
          <li>or process a refund where applicable.</li>
        </ul>
      </section>

      {/* 6. DEFECTIVE PRODUCT */}
      <section id="section-defective" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">06.</span>
          <span>Defective Product</span>
        </h2>
        <p>
          Where a manufacturing defect is alleged, the product may be subject to inspection/testing.
        </p>
        <p>
          If the product is confirmed to be defective and covered by the applicable warranty/commercial terms, an appropriate remedy may be provided in accordance with those terms.
        </p>
      </section>

      {/* 7. CHANGE OF MIND */}
      <section id="section-change-of-mind" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">07.</span>
          <span>Change of Mind</span>
        </h2>
        <p>
          Returns or refunds for a change of mind are not automatically guaranteed for industrial products, especially products purchased against confirmed technical specifications or custom/OEM requirements.
        </p>
        <p>
          Any such request will be evaluated case-by-case and subject to applicable law.
        </p>
      </section>

      {/* 8. PRODUCTS DAMAGED BY CUSTOMER */}
      <section id="section-customer-damage" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">08.</span>
          <span>Products Damaged by Customer</span>
        </h2>
        <p>Refund/replacement may not be available where damage results from:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
          <li>incorrect installation;</li>
          <li>incorrect voltage;</li>
          <li>electrical overload;</li>
          <li>incorrect application;</li>
          <li>physical damage;</li>
          <li>improper storage;</li>
          <li>modification;</li>
          <li>misuse;</li>
          <li>failure to follow applicable technical requirements.</li>
        </ul>
      </section>

      {/* 9. SHIPPING / FREIGHT */}
      <section id="section-shipping-freight" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">09.</span>
          <span>Shipping / Freight</span>
        </h2>
        <p>
          Shipping, freight, handling and other charges may be non-refundable where they have already been incurred, subject to applicable law and the circumstances of the claim.
        </p>
      </section>

      {/* 10. TAXES */}
      <section id="section-taxes" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">10.</span>
          <span>Taxes</span>
        </h2>
        <p>
          Where a refund is approved, applicable tax treatment will be handled in accordance with applicable tax laws and invoicing requirements.
        </p>
      </section>

      {/* 11. REFUND PROCESSING TIME */}
      <section id="section-processing-time" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">11.</span>
          <span>Refund Processing Time</span>
        </h2>
        <p>
          Approved refunds will be initiated within a reasonable business period after the refund decision and required verification are completed.
        </p>
        <p>
          Actual credit timing may depend on the payment provider or banking system.
        </p>
      </section>

      {/* 12. HOW TO REQUEST A CANCELLATION / REFUND */}
      <section id="section-how-to-request" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">12.</span>
          <span>How to Request a Cancellation / Refund</span>
        </h2>
        <p>Send the request to:</p>
        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono select-all">
          Email: [OFFICIAL EMAIL]
        </div>
        <p>Include:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
          <li>customer name;</li>
          <li>company name;</li>
          <li>invoice/order number;</li>
          <li>product details;</li>
          <li>quantity;</li>
          <li>reason for request;</li>
          <li>photographs/documents where relevant;</li>
          <li>payment details where required.</li>
        </ul>
      </section>

      {/* 13. CONTACT */}
      <section id="section-contact" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">13.</span>
          <span>Contact</span>
        </h2>
        <p>For cancellation/refund assistance:</p>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs font-mono">
          <div>Email: <strong className="text-white select-all">[OFFICIAL EMAIL]</strong></div>
          <div>Phone/WhatsApp: <strong className="text-white select-all">[OFFICIAL NUMBER]</strong></div>
          <div>Address: <strong className="text-white select-all">[BUSINESS ADDRESS]</strong></div>
        </div>
      </section>
    </LegalPageLayout>
  );
};
