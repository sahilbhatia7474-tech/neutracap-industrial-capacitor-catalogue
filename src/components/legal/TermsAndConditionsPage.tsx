/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TERMS & CONDITIONS PAGE (STANDALONE LEGAL DOCUMENT)
 * Content source: Exact text from user brief.
 * Placeholders preserved verbatim.
 */

import React from 'react';
import { LegalPageLayout, LegalSectionItem } from './LegalPageLayout';

export interface TermsAndConditionsPageProps {
  onBack: () => void;
  onNavigateLegal: (path: '/terms-and-conditions' | '/privacy-policy' | '/refund-and-cancellation') => void;
}

export const TermsAndConditionsPage: React.FC<TermsAndConditionsPageProps> = ({
  onBack,
  onNavigateLegal,
}) => {
  const sections: LegalSectionItem[] = [
    { id: 'section-about', title: '1. About NeutraCap' },
    { id: 'section-product-info', title: '2. Product Information' },
    { id: 'section-technical-responsibility', title: '3. Technical Responsibility' },
    { id: 'section-enquiries-quotations', title: '4. Enquiries and Quotations' },
    { id: 'section-pricing-taxes', title: '5. Pricing and Taxes' },
    { id: 'section-payment', title: '6. Payment' },
    { id: 'section-moq', title: '7. Minimum Order Quantity' },
    { id: 'section-delivery', title: '8. Delivery' },
    { id: 'section-inspection', title: '9. Inspection on Delivery' },
    { id: 'section-warranty', title: '10. Warranty' },
    { id: 'section-exclusions', title: '11. Exclusions' },
    { id: 'section-custom-oem', title: '12. Custom / OEM Requirements' },
    { id: 'section-ip', title: '13. Intellectual Property' },
    { id: 'section-availability', title: '14. Website Availability' },
    { id: 'section-third-party', title: '15. Third-Party Services' },
    { id: 'section-liability', title: '16. Limitation of Liability' },
    { id: 'section-force-majeure', title: '17. Force Majeure' },
    { id: 'section-changes', title: '18. Changes to These Terms' },
    { id: 'section-governing-law', title: '19. Governing Law' },
    { id: 'section-contact', title: '20. Contact' },
  ];

  return (
    <LegalPageLayout
      title="Terms & Conditions"
      effectiveDate="October 6, 2026"
      lastUpdatedDate="October 6, 2026"
      sections={sections}
      activeLegalPath="/terms-and-conditions"
      onNavigateHome={onBack}
      onNavigateLegal={onNavigateLegal}
    >
      {/* Introduction */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight border-b border-white/10 pb-3">
          Introduction
        </h2>
        <p>
          These Terms &amp; Conditions govern access to and use of the NeutraCap website, product catalogue, enquiry services and any purchase or supply of products made through or in connection with this website.
        </p>
        <p>
          By accessing this website, submitting an enquiry, requesting a quotation, placing an order or purchasing products from NeutraCap, you acknowledge that you have read and understood these Terms &amp; Conditions and agree to be bound by them.
        </p>
      </section>

      {/* Business Information Card */}
      <section className="p-6 rounded-2xl bg-gradient-to-br from-[#07172B] to-[#040E1B] border border-white/10 space-y-3">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#35C6E8]">
          Business Information
        </h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div>
            <dt className="text-slate-400">Legal Business Name:</dt>
            <dd className="text-white font-bold">[INSERT LEGAL ENTITY NAME]</dd>
          </div>
          <div>
            <dt className="text-slate-400">Brand:</dt>
            <dd className="text-white font-bold">NeutraCap</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-slate-400">Registered/Business Address:</dt>
            <dd className="text-white font-bold">[INSERT FULL BUSINESS ADDRESS]</dd>
          </div>
          <div>
            <dt className="text-slate-400">Email:</dt>
            <dd className="text-white font-bold">[INSERT OFFICIAL BUSINESS EMAIL]</dd>
          </div>
          <div>
            <dt className="text-slate-400">Phone:</dt>
            <dd className="text-white font-bold">[INSERT OFFICIAL BUSINESS PHONE]</dd>
          </div>
          <div>
            <dt className="text-slate-400">GSTIN:</dt>
            <dd className="text-white font-bold">[INSERT GSTIN IF APPLICABLE]</dd>
          </div>
        </dl>
      </section>

      {/* 1. ABOUT NEUTRACAP */}
      <section id="section-about" className="space-y-3 pt-6">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">01.</span>
          <span>About NeutraCap</span>
        </h2>
        <p>
          NeutraCap provides industrial and electrical capacitors and related products for applications including motor starting, motor running, power-quality/harmonic filtering and DC/electrolytic applications.
        </p>
        <p>
          Product availability, specifications, pricing and minimum order quantities may vary by product, voltage, capacitance, quantity, application and commercial terms.
        </p>
      </section>

      {/* 2. PRODUCT INFORMATION */}
      <section id="section-product-info" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">02.</span>
          <span>Product Information</span>
        </h2>
        <p>
          We make reasonable efforts to keep product descriptions, technical specifications, images, ratings and catalogue information accurate.
        </p>
        <p>However:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
          <li>product images may be representative;</li>
          <li>technical specifications may be updated from time to time;</li>
          <li>availability may change;</li>
          <li>prices may change without prior notice;</li>
          <li>final specifications shall be confirmed through the applicable quotation/order documentation.</li>
        </ul>
        <p>
          Customers are responsible for confirming that the selected capacitor is suitable for their intended application, electrical system and operating conditions.
        </p>
      </section>

      {/* 3. TECHNICAL RESPONSIBILITY */}
      <section id="section-technical-responsibility" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">03.</span>
          <span>Technical Responsibility</span>
        </h2>
        <p>
          NeutraCap provides product information and technical assistance based on the information supplied by the customer.
        </p>
        <p>
          Unless expressly agreed in writing, NeutraCap does not provide a guarantee that a particular product will be suitable for an application where the complete system conditions, operating environment, installation method or electrical parameters are unknown.
        </p>
        <p>
          Customers should consult a qualified engineer/electrician where required.
        </p>
      </section>

      {/* 4. ENQUIRIES AND QUOTATIONS */}
      <section id="section-enquiries-quotations" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">04.</span>
          <span>Enquiries and Quotations</span>
        </h2>
        <p>
          Submitting an enquiry does not automatically constitute an order.
        </p>
        <p>A quotation may specify:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
          <li>product specification;</li>
          <li>quantity;</li>
          <li>MOQ;</li>
          <li>price;</li>
          <li>taxes;</li>
          <li>freight/shipping;</li>
          <li>delivery estimate;</li>
          <li>payment terms;</li>
          <li>validity period;</li>
          <li>other applicable commercial terms.</li>
        </ul>
        <p>
          A quotation becomes binding only after acceptance by NeutraCap and completion of the applicable order/payment requirements.
        </p>
      </section>

      {/* 5. PRICING AND TAXES */}
      <section id="section-pricing-taxes" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">05.</span>
          <span>Pricing and Taxes</span>
        </h2>
        <p>
          Prices displayed on the website may be indicative unless expressly stated otherwise.
        </p>
        <p>
          Applicable GST, shipping, freight, handling or other charges may be added where applicable.
        </p>
        <p>
          The final payable amount shall be the amount stated in the accepted quotation, invoice or order confirmation.
        </p>
      </section>

      {/* 6. PAYMENT */}
      <section id="section-payment" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">06.</span>
          <span>Payment</span>
        </h2>
        <p>
          Orders may require advance payment or other payment terms agreed in writing.
        </p>
        <p>
          An order shall not be treated as confirmed until the required payment and/or commercial approval has been completed.
        </p>
      </section>

      {/* 7. MINIMUM ORDER QUANTITY */}
      <section id="section-moq" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">07.</span>
          <span>Minimum Order Quantity</span>
        </h2>
        <p>
          Certain products may have a minimum order quantity.
        </p>
        <p>
          The applicable MOQ will be communicated through the product information, quotation or order confirmation.
        </p>
      </section>

      {/* 8. DELIVERY */}
      <section id="section-delivery" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">08.</span>
          <span>Delivery</span>
        </h2>
        <p>
          Estimated delivery timelines are indicative unless a specific delivery commitment has been expressly confirmed in writing.
        </p>
        <p>Delivery may be affected by:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
          <li>production schedules;</li>
          <li>material availability;</li>
          <li>transportation;</li>
          <li>public holidays;</li>
          <li>force majeure events;</li>
          <li>customer-provided information;</li>
          <li>payment delays;</li>
          <li>changes requested by the customer.</li>
        </ul>
      </section>

      {/* 9. INSPECTION ON DELIVERY */}
      <section id="section-inspection" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">09.</span>
          <span>Inspection on Delivery</span>
        </h2>
        <p>
          Customers should inspect delivered products as soon as reasonably possible.
        </p>
        <p>
          Any visible damage, shortage or mismatch should be reported promptly with supporting photographs, invoice/order details and other relevant evidence.
        </p>
      </section>

      {/* 10. WARRANTY */}
      <section id="section-warranty" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">10.</span>
          <span>Warranty</span>
        </h2>
        <p>
          Any product warranty shall apply only where expressly provided in the applicable quotation, invoice, warranty document or written commercial agreement.
        </p>
        <p>Warranty coverage, where applicable, may be subject to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
          <li>correct installation;</li>
          <li>correct electrical operating conditions;</li>
          <li>specified voltage and capacitance limits;</li>
          <li>proper storage;</li>
          <li>proper handling;</li>
          <li>absence of physical damage;</li>
          <li>absence of unauthorised modification.</li>
        </ul>
      </section>

      {/* 11. EXCLUSIONS */}
      <section id="section-exclusions" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">11.</span>
          <span>Exclusions</span>
        </h2>
        <p>Unless expressly agreed otherwise, NeutraCap shall not be responsible for damage caused by:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
          <li>incorrect installation;</li>
          <li>incorrect voltage;</li>
          <li>incorrect application;</li>
          <li>overheating;</li>
          <li>overcurrent;</li>
          <li>abnormal electrical conditions;</li>
          <li>improper storage;</li>
          <li>physical damage;</li>
          <li>unauthorised modification;</li>
          <li>misuse;</li>
          <li>normal wear and tear;</li>
          <li>failure to follow applicable technical instructions.</li>
        </ul>
      </section>

      {/* 12. CUSTOM / OEM REQUIREMENTS */}
      <section id="section-custom-oem" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">12.</span>
          <span>Custom / OEM Requirements</span>
        </h2>
        <p>
          Where a customer requests custom specifications, dimensions, terminals, voltage, capacitance, packaging or other OEM requirements, the customer is responsible for verifying the final approved specification before production or dispatch.
        </p>
        <p>
          Once a custom/OEM order has entered production, cancellation or modification may not be possible except where expressly agreed in writing.
        </p>
      </section>

      {/* 13. INTELLECTUAL PROPERTY */}
      <section id="section-ip" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">13.</span>
          <span>Intellectual Property</span>
        </h2>
        <p>
          The NeutraCap name, logo, website design, text, graphics, photographs, catalogue presentation and other original website materials are protected by applicable intellectual property laws.
        </p>
        <p>
          They may not be copied, reproduced, republished or commercially reused without prior written permission.
        </p>
      </section>

      {/* 14. WEBSITE AVAILABILITY */}
      <section id="section-availability" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">14.</span>
          <span>Website Availability</span>
        </h2>
        <p>
          We attempt to keep the website available and accurate, but do not guarantee uninterrupted or error-free availability.
        </p>
        <p>
          Temporary interruptions may occur because of maintenance, hosting, technical failures, security incidents or circumstances beyond our reasonable control.
        </p>
      </section>

      {/* 15. THIRD-PARTY SERVICES */}
      <section id="section-third-party" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">15.</span>
          <span>Third-Party Services</span>
        </h2>
        <p>
          The website may contain links or integrations to third-party services such as WhatsApp, payment providers, hosting providers or external resources.
        </p>
        <p>
          NeutraCap is not responsible for the independent policies, availability or practices of third-party services.
        </p>
      </section>

      {/* 16. LIMITATION OF LIABILITY */}
      <section id="section-liability" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">16.</span>
          <span>Limitation of Liability</span>
        </h2>
        <p>
          To the extent permitted by applicable law, NeutraCap shall not be liable for indirect, incidental, special or consequential losses arising from the use of the website or products.
        </p>
        <p>
          Nothing in these Terms excludes liability that cannot lawfully be excluded under applicable law.
        </p>
      </section>

      {/* 17. FORCE MAJEURE */}
      <section id="section-force-majeure" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">17.</span>
          <span>Force Majeure</span>
        </h2>
        <p>
          NeutraCap shall not be responsible for delays or failure caused by circumstances beyond reasonable control, including natural disasters, fire, flood, war, government restrictions, strikes, transportation disruption, supply-chain disruption, epidemic/pandemic events, power failures or major technical failures.
        </p>
      </section>

      {/* 18. CHANGES TO THESE TERMS */}
      <section id="section-changes" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">18.</span>
          <span>Changes to These Terms</span>
        </h2>
        <p>
          NeutraCap may update these Terms from time to time.
        </p>
        <p>
          The latest version published on the website shall apply to future use and transactions, subject to applicable law and any contractual terms already agreed.
        </p>
      </section>

      {/* 19. GOVERNING LAW */}
      <section id="section-governing-law" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">19.</span>
          <span>Governing Law</span>
        </h2>
        <p>
          These Terms shall be governed by the laws applicable in India.
        </p>
        <p>
          Subject to applicable law, disputes shall be subject to the jurisdiction of the competent courts having jurisdiction over the applicable business location.
        </p>
      </section>

      {/* 20. CONTACT */}
      <section id="section-contact" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">20.</span>
          <span>Contact</span>
        </h2>
        <p>For questions regarding these Terms:</p>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs font-mono">
          <div>Email: <strong className="text-white select-all">[OFFICIAL EMAIL]</strong></div>
          <div>Phone/WhatsApp: <strong className="text-white select-all">[OFFICIAL NUMBER]</strong></div>
          <div>Address: <strong className="text-white select-all">[BUSINESS ADDRESS]</strong></div>
        </div>
      </section>
    </LegalPageLayout>
  );
};
