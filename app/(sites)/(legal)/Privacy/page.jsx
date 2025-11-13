// app/privacy/page.tsx
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 pt-20">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-cyan-700 mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-12">Last updated: November 11, 2025</p>

        <div className="space-y-10">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              1. Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              OmniCargo (“we”, “our”, or “us”) respects your privacy and is
              fully committed to safeguarding your personal information. This
              Privacy Policy explains how we collect, use, and protect your data
              when you interact with our website, mobile applications, and
              logistics services. By using our services, you agree to the
              collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              2. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              OmniCargo collects both personal and non-personal data to provide
              efficient logistics services and enhance user experience. This
              includes, but is not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Full name, company name, email address, and contact details
              </li>
              <li>Shipping, billing, and operational information</li>
              <li>Website usage analytics, browser data, and cookies</li>
              <li>Device and location information (when applicable)</li>
              <li>Feedback, messages, or inquiries sent to our support team</li>
            </ul>
          </section>

          {/* Usage */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use your data to deliver world-class logistics and freight
              solutions. Specifically, OmniCargo uses collected information to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Process and track shipments efficiently</li>
              <li>Communicate important updates and service notifications</li>
              <li>Improve our website, software, and customer experience</li>
              <li>Ensure security, fraud prevention, and compliance</li>
              <li>Personalize your experience based on your preferences</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We never sell or rent your personal data to third parties.
            </p>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              4. Data Security and Protection
            </h2>
            <p className="text-gray-700 leading-relaxed">
              OmniCargo employs strict security protocols and encryption
              standards to protect your information from unauthorized access,
              alteration, or loss. Our systems are regularly updated and audited
              to comply with global data protection standards such as GDPR and
              CCPA.
            </p>
          </section>

          {/* Third Parties */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              5. Third-Party Services
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Our website and platform may integrate with third-party tools such
              as analytics providers, payment gateways, and logistics partners.
              These third parties may collect and process your data according to
              their own privacy policies.
            </p>
            <p className="text-gray-700 leading-relaxed">
              OmniCargo carefully selects partners that uphold strong privacy
              and security standards but is not responsible for their
              independent data handling practices.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              6. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your
              browsing experience, analyze site traffic, and deliver relevant
              content. You can manage or disable cookies through your browser
              settings at any time.
            </p>
          </section>

          {/* Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              7. Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, update, correct, or request deletion
              of your personal information. If you reside in the EU, UK, or
              California, you may also have additional rights under applicable
              data protection laws. To exercise these rights, please contact us
              at{" "}
              <a
                href="mailto:privacy@omnicargo.com"
                className="text-cyan-700 hover:underline font-medium"
              >
                privacy@omnicargo.com
              </a>
              .
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              8. Updates to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              OmniCargo may update this Privacy Policy periodically to reflect
              changes in our practices or legal obligations. Updates will be
              posted on this page with a revised effective date. We encourage
              you to review this page regularly to stay informed.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              9. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions, concerns, or complaints regarding this
              Privacy Policy or how your information is handled, please contact
              our Data Protection team:
            </p>
            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-800">OmniCargo Logistics</p>
              <p>123 Global Commerce Blvd, Suite 400</p>
              <p>New York, NY, USA</p>
              <p>Email: privacy@omnicargo.com</p>
              <p>Phone: +1 (800) 555-0123</p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
