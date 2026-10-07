/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * PRIVACY POLICY PAGE (STANDALONE LEGAL DOCUMENT)
 * Content source: Exact text from user brief.
 * Placeholders preserved verbatim.
 */

import React from 'react';
import { LegalPageLayout, LegalSectionItem } from './LegalPageLayout';

export interface PrivacyPolicyPageProps {
  onBack: () => void;
  onNavigateLegal: (path: '/terms-and-conditions' | '/privacy-policy' | '/refund-and-cancellation') => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onBack,
  onNavigateLegal,
}) => {
  const sections: LegalSectionItem[] = [
    { id: 'section-collect', title: '1. Information We May Collect' },
    { id: 'section-use', title: '2. How We Use Information' },
    { id: 'section-whatsapp', title: '3. WhatsApp and Communication Services' },
    { id: 'section-sharing', title: '4. Sharing of Information' },
    { id: 'section-security', title: '5. Data Security' },
    { id: 'section-retention', title: '6. Data Retention' },
    { id: 'section-rights', title: '7. User Rights' },
    { id: 'section-consent', title: '8. Consent' },
    { id: 'section-children', title: '9. Children' },
    { id: 'section-cookies', title: '10. Cookies and Technical Data' },
    { id: 'section-links', title: '11. Third-Party Links' },
    { id: 'section-updates', title: '12. Policy Updates' },
    { id: 'section-contact', title: '13. Contact' },
  ];

  return (
    <LegalPageLayout
      title="Privacy Policy"
      effectiveDate="October 6, 2026"
      lastUpdatedDate="October 6, 2026"
      sections={sections}
      activeLegalPath="/privacy-policy"
      onNavigateHome={onBack}
      onNavigateLegal={onNavigateLegal}
    >
      {/* Introduction */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight border-b border-white/10 pb-3">
          Introduction
        </h2>
        <p>
          NeutraCap respects the privacy of visitors, customers and business enquiries.
        </p>
        <p>
          This Privacy Policy explains what information may be collected, why it is collected, how it may be used and how users may contact us regarding their information.
        </p>
      </section>

      {/* 1. INFORMATION WE MAY COLLECT */}
      <section id="section-collect" className="space-y-3 pt-6">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">01.</span>
          <span>Information We May Collect</span>
        </h2>
        <p>Depending on the interaction, we may collect:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
          <li>name;</li>
          <li>company/organisation name;</li>
          <li>email address;</li>
          <li>phone/WhatsApp number;</li>
          <li>billing or delivery information;</li>
          <li>product requirements;</li>
          <li>technical specifications provided by the customer;</li>
          <li>enquiry information;</li>
          <li>order information;</li>
          <li>payment-related confirmation information;</li>
          <li>communications with NeutraCap;</li>
          <li>website usage information;</li>
          <li>device/browser information;</li>
          <li>IP address and technical logs where collected by hosting/security systems.</li>
        </ul>
        <p>
          We only request information reasonably necessary for the relevant purpose.
        </p>
      </section>

      {/* 2. HOW WE USE INFORMATION */}
      <section id="section-use" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">02.</span>
          <span>How We Use Information</span>
        </h2>
        <p>Information may be used to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
          <li>respond to enquiries;</li>
          <li>prepare quotations;</li>
          <li>process orders;</li>
          <li>communicate about products;</li>
          <li>arrange delivery;</li>
          <li>provide customer support;</li>
          <li>process payments through applicable providers;</li>
          <li>respond to technical/product requests;</li>
          <li>maintain business records;</li>
          <li>prevent fraud, misuse or security incidents;</li>
          <li>improve website performance and user experience;</li>
          <li>comply with applicable legal obligations.</li>
        </ul>
      </section>

      {/* 3. WHATSAPP AND COMMUNICATION SERVICES */}
      <section id="section-whatsapp" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">03.</span>
          <span>WhatsApp and Communication Services</span>
        </h2>
        <p>
          If you contact NeutraCap through WhatsApp, email, phone or another third-party communication platform, your interaction may also be subject to that provider's own privacy policy and terms.
        </p>
      </section>

      {/* 4. SHARING OF INFORMATION */}
      <section id="section-sharing" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">04.</span>
          <span>Sharing of Information</span>
        </h2>
        <p>
          We do not sell personal information as a commercial product.
        </p>
        <p>Information may be shared where reasonably necessary with:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
          <li>employees or authorised personnel;</li>
          <li>logistics/shipping providers;</li>
          <li>payment service providers;</li>
          <li>hosting/IT/security providers;</li>
          <li>professional advisers;</li>
          <li>government or regulatory authorities where legally required.</li>
        </ul>
        <p>
          Third parties receiving information should use it only for the relevant business, legal or service purpose.
        </p>
      </section>

      {/* 5. DATA SECURITY */}
      <section id="section-security" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">05.</span>
          <span>Data Security</span>
        </h2>
        <p>
          We use reasonable technical and organisational safeguards intended to protect personal information from unauthorised access, loss, misuse, alteration or disclosure.
        </p>
        <p>
          However, no internet transmission or electronic storage system can be guaranteed to be completely secure.
        </p>
      </section>

      {/* 6. DATA RETENTION */}
      <section id="section-retention" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">06.</span>
          <span>Data Retention</span>
        </h2>
        <p>
          We retain information only for as long as reasonably necessary for the purpose for which it was collected, legitimate business requirements, contractual obligations, dispute resolution, security purposes and applicable legal/accounting requirements.
        </p>
      </section>

      {/* 7. USER RIGHTS */}
      <section id="section-rights" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">07.</span>
          <span>User Rights</span>
        </h2>
        <p>
          Subject to applicable law, individuals may have rights relating to their personal data, including requesting access to or correction of certain information and withdrawing consent where processing is based on consent.
        </p>
        <p>Requests may be sent to:</p>
        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono select-all">
          [OFFICIAL PRIVACY CONTACT EMAIL]
        </div>
      </section>

      {/* 8. CONSENT */}
      <section id="section-consent" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">08.</span>
          <span>Consent</span>
        </h2>
        <p>
          Where consent is required, it will be requested in a clear and appropriate manner.
        </p>
        <p>
          Where processing is based on consent, withdrawal of consent may be requested, subject to applicable law and any processing that is otherwise legally permitted or required.
        </p>
      </section>

      {/* 9. CHILDREN */}
      <section id="section-children" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">09.</span>
          <span>Children</span>
        </h2>
        <p>
          The website is intended for business and general commercial use and is not directed specifically at children.
        </p>
      </section>

      {/* 10. COOKIES AND TECHNICAL DATA */}
      <section id="section-cookies" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">10.</span>
          <span>Cookies and Technical Data</span>
        </h2>
        <p>
          The website or its hosting/analytics/security services may use cookies or similar technologies for functionality, security, analytics or performance.
        </p>
        <p>
          Where applicable, users may control cookies through their browser settings.
        </p>
      </section>

      {/* 11. THIRD-PARTY LINKS */}
      <section id="section-links" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">11.</span>
          <span>Third-Party Links</span>
        </h2>
        <p>
          NeutraCap may link to third-party websites or services.
        </p>
        <p>
          Their privacy practices are governed by their own policies.
        </p>
      </section>

      {/* 12. POLICY UPDATES */}
      <section id="section-updates" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">12.</span>
          <span>Policy Updates</span>
        </h2>
        <p>
          This Privacy Policy may be updated periodically to reflect changes in our practices, technology or applicable law.
        </p>
      </section>

      {/* 13. CONTACT */}
      <section id="section-contact" className="space-y-3 pt-6 border-t border-white/10">
        <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
          <span className="font-mono text-[#35C6E8] text-base">13.</span>
          <span>Contact</span>
        </h2>
        <p>Privacy-related requests:</p>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs font-mono">
          <div>Email: <strong className="text-white select-all">[OFFICIAL PRIVACY EMAIL]</strong></div>
          <div>Phone: <strong className="text-white select-all">[OFFICIAL NUMBER]</strong></div>
          <div>Address: <strong className="text-white select-all">[BUSINESS ADDRESS]</strong></div>
        </div>
      </section>
    </LegalPageLayout>
  );
};
