// app/terms/page.tsx
import React from "react";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 pt-20">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-cyan-700 mb-6">
          Terms of Service
        </h1>
        <p className="text-gray-600 mb-12">Last updated: November 11, 2024</p>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              1. Introduction
            </h2>
            <p>
              Welcome to OmniCargo (“OmniCargo,” “we,” “our,” or “us”). These
              Terms of Service (“Terms”) govern your access to and use of our
              website, digital platforms, mobile applications, and all logistics
              services (collectively, the “Services”). By accessing or using our
              Services, you agree to be bound by these Terms and our{" "}
              <a
                href="/privacy"
                className="text-cyan-700 hover:underline font-medium"
              >
                Privacy Policy
              </a>
              . If you do not agree, please discontinue use of our Services.
            </p>
            <p className="mt-3">
              OmniCargo is a global logistics and supply chain management
              company providing freight forwarding, warehousing, and
              transportation solutions. These Terms are designed to protect both
              our customers and our business operations, ensuring transparency,
              trust, and compliance in every engagement.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              2. Eligibility
            </h2>
            <p>
              To use OmniCargo’s Services, you must be at least 18 years of age
              or the legal age of majority in your jurisdiction. By registering
              or using our Services, you represent and warrant that you have the
              authority to enter into legally binding contracts on behalf of
              yourself or your organization, and that all information you
              provide is truthful and up-to-date.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              3. Modifications to These Terms
            </h2>
            <p>
              OmniCargo reserves the right to modify, update, or replace any
              part of these Terms at any time without prior notice. Any changes
              will take effect immediately upon posting on this page. The “Last
              updated” date above reflects the latest revision. Continued use of
              our Services after such changes constitutes your acceptance of the
              revised Terms.
            </p>
          </section>

          {/* Description of Services */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              4. Description of Services
            </h2>
            <p>
              OmniCargo provides a comprehensive suite of logistics and supply
              chain services, including freight forwarding, customs clearance,
              warehousing, route optimization, digital shipment tracking,
              cross-border logistics, and last-mile delivery. Service
              availability and terms may vary depending on region, partner
              agreements, and client requirements.
            </p>
            <p className="mt-3">
              While we strive to provide uninterrupted, secure, and
              high-performance digital platforms, OmniCargo does not guarantee
              that the Services will be error-free, continuously available, or
              completely secure at all times. Scheduled maintenance, network
              failures, or unforeseen circumstances may temporarily limit
              access.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              5. User Responsibilities
            </h2>
            <p>
              You agree to use OmniCargo’s Services only for lawful and ethical
              purposes in accordance with these Terms and all applicable laws
              and regulations. You must not:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>
                Upload or transmit harmful, fraudulent, or misleading content.
              </li>
              <li>
                Attempt to hack, disrupt, or gain unauthorized access to our
                systems, networks, or data.
              </li>
              <li>
                Use the Services to send spam, malware, or any form of
                unauthorized communications.
              </li>
              <li>
                Misuse or infringe on OmniCargo’s intellectual property rights.
              </li>
            </ul>
            <p className="mt-3">
              You are responsible for maintaining the confidentiality of your
              account credentials. If you believe your account has been
              compromised, you must notify us immediately.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              6. Intellectual Property Rights
            </h2>
            <p>
              All trademarks, content, graphics, designs, software, and
              intellectual property appearing on OmniCargo’s websites and
              applications are the exclusive property of OmniCargo or its
              licensors. You are granted a limited, revocable, non-transferable
              license to access and use the Services for personal or commercial
              logistics purposes.
            </p>
            <p className="mt-3">
              You may not copy, reproduce, distribute, or modify any content
              without prior written consent from OmniCargo.
            </p>
          </section>

          {/* Privacy Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              7. Privacy and Data Protection
            </h2>
            <p>
              OmniCargo values your privacy. Your use of our Services is also
              governed by our{" "}
              <a
                href="/privacy"
                className="text-cyan-700 hover:underline font-medium"
              >
                Privacy Policy
              </a>
              , which explains how we collect, use, and protect your personal
              information. By using our Services, you consent to the collection
              and processing of your data as outlined in our Privacy Policy and
              in compliance with applicable laws such as GDPR and CCPA.
            </p>
          </section>

          {/* Payments */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              8. Payment and Billing Terms
            </h2>
            <p>
              Some of OmniCargo’s Services may require payment. All fees and
              charges are due according to the terms specified in your service
              contract or invoice. Unless otherwise stated, payments are
              non-refundable once processed. Failure to make timely payments may
              result in account suspension or termination of Services.
            </p>
            <p className="mt-3">
              You agree to provide accurate billing information and authorize
              OmniCargo to charge your chosen payment method for any fees due.
              All prices are listed in U.S. dollars unless otherwise stated.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              9. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, OmniCargo, its affiliates,
              directors, and employees are not liable for any indirect,
              incidental, special, or consequential damages resulting from your
              use of or inability to use the Services, including but not limited
              to loss of profits, data, or business opportunities.
            </p>
            <p className="mt-3">
              OmniCargo does not guarantee the completeness or accuracy of
              third-party content and is not responsible for delays caused by
              external carriers, customs processes, or force majeure events such
              as natural disasters, strikes, or governmental actions.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              10. Indemnification
            </h2>
            <p>
              You agree to indemnify, defend, and hold harmless OmniCargo, its
              officers, employees, and partners from and against all claims,
              damages, liabilities, costs, and expenses (including legal fees)
              arising from your use of the Services, violation of these Terms,
              or infringement of any third-party rights.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              11. Suspension and Termination
            </h2>
            <p>
              OmniCargo reserves the right to suspend or terminate your access
              to our Services at any time without prior notice if you violate
              these Terms, engage in fraudulent activity, or pose a risk to our
              systems or reputation.
            </p>
            <p className="mt-3">
              Upon termination, your right to use the Services ceases
              immediately. Any obligations or liabilities incurred prior to
              termination shall survive, including payment obligations and
              indemnity clauses.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              12. Governing Law and Dispute Resolution
            </h2>
            <p>
              These Terms are governed by the laws of the United States and the
              State of New York, without regard to its conflict of law
              principles. Any dispute shall first be attempted to be resolved
              through good-faith negotiation. If unresolved, disputes shall be
              subject to the exclusive jurisdiction of the state and federal
              courts located in New York, NY.
            </p>
          </section>

          {/* Miscellaneous */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              13. Miscellaneous Provisions
            </h2>
            <p>
              If any provision of these Terms is found invalid or unenforceable,
              the remaining provisions shall continue in full effect. Our
              failure to enforce any right or clause shall not constitute a
              waiver of such right or clause.
            </p>
            <p className="mt-3">
              These Terms, together with our Privacy Policy, constitute the
              entire agreement between you and OmniCargo regarding your use of
              the Services and supersede all prior agreements or understandings.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              14. Contact Us
            </h2>
            <p>
              For any questions, concerns, or legal inquiries regarding these
              Terms of Service, please contact:
            </p>
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-800">OmniCargo Logistics</p>
              <p>123 Global Commerce Blvd, Suite 400</p>
              <p>New York, NY, USA</p>
              <p>Email: carelineomincargo@gmail.com</p>
              {/* <p>Phone: +1 (800) 555-0123</p> */}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
