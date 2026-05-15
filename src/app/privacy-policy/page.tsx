import type { Metadata } from 'next'
import Link from 'next/link'
import ManageCookiesButton from '@/components/ManageCookiesButton'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How MMV Medical collects, uses and protects your personal data.',
  robots: { index: false, follow: false },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#12243a] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-gray-400 text-sm hover:text-white mb-6 block">
            ← Back to MMV Medical
          </Link>
          <h1 className="text-4xl font-semibold text-white">Privacy Policy</h1>
          <p className="text-gray-400 mt-2 text-sm">Last updated: May 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-12 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Who We Are</h2>
          <p>
            MMV Medical is a dental tourism facilitation service connecting European patients
            with specialist dental clinics in Istanbul, Turkey.
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm space-y-1">
            <p><strong>Data Controller:</strong> MMV Medical</p>
            <p><strong>Legal entity:</strong> [To be updated upon company registration]</p>
            <p><strong>Email:</strong> hello@mmvmedical.org</p>
            <p><strong>WhatsApp:</strong> +90 552 782 7698</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">2. What Data We Collect</h2>
          <p>When you submit a consultation request or contact us, we collect:</p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li><strong>Identity data:</strong> Full name</li>
            <li><strong>Contact data:</strong> Email address, WhatsApp number</li>
            <li><strong>Health data:</strong> Details about your dental condition, treatment history, and X-rays you choose to share</li>
            <li><strong>Financial data:</strong> Budget range (broad range only — no card or bank details)</li>
            <li><strong>Travel data:</strong> Preferred travel month and country of residence</li>
            <li><strong>Usage data:</strong> Pages visited, time on site (via analytics — see Section 7)</li>
          </ul>
          <p className="mt-3">
            We do <strong>not</strong> collect payment card details. All treatment payments are made
            directly to the clinic.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Your Data</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold">Purpose</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold">Legal Basis</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Preparing and sending your personalised treatment plan', 'Contract (pre-contractual steps)'],
                  ['Coordinating your trip, flights, and clinic appointments', 'Contract'],
                  ['Sending your treatment plan to Dr. Mat Dental Clinic for clinical review', 'Contract / Legitimate Interest'],
                  ['Responding to enquiries and follow-up communication', 'Legitimate Interest'],
                  ['Improving our website and services', 'Legitimate Interest'],
                  ['Complying with legal obligations', 'Legal Obligation'],
                ].map(([purpose, basis], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 border border-gray-200">{purpose}</td>
                    <td className="p-3 border border-gray-200">{basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            We will <strong>never</strong> use your health data for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Health Data</h2>
          <p>
            Dental records, X-rays, and treatment history constitute <strong>special category data</strong> under
            GDPR. We process this data only to facilitate your requested treatment consultation, to share
            with Dr. Mat Dental Clinic for clinical assessment, and with your explicit consent where required.
          </p>
          <p className="mt-3">
            By submitting health information through our consultation form, you consent to us processing
            it for the above purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Who We Share Your Data With</h2>
          <p>We share your data only where necessary:</p>
          <div className="mt-4 space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="font-semibold text-gray-900">Dr. Mat Dental Clinic (Istanbul, Turkey)</p>
              <p className="text-sm mt-1">
                Your consultation details and health information are shared with the treating clinic to
                prepare your treatment plan. Turkey is not an EU/EEA country; data transfers are made
                under appropriate safeguards (Standard Contractual Clauses or equivalent).
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="font-semibold text-gray-900">Service Providers</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li><strong>Supabase</strong> — secure cloud database (EU region)</li>
                <li><strong>Vercel</strong> — website hosting</li>
                <li><strong>Google Analytics</strong> — anonymised website analytics</li>
                <li><strong>HubSpot</strong> — CRM and enquiry management</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            We do <strong>not</strong> sell, rent, or share your personal data with third parties for marketing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">6. How Long We Keep Your Data</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold">Data type</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold">Retention period</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Consultation requests (no treatment)', '12 months'],
                  ['Patient coordination records', '5 years'],
                  ['Financial records', '7 years (legal requirement)'],
                  ['Website analytics', '26 months (anonymised)'],
                ].map(([type, period], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 border border-gray-200">{type}</td>
                    <td className="p-3 border border-gray-200">{period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Cookies and Analytics</h2>
          <p>
            Our website uses cookies to understand how visitors use the site. You can manage your
            cookie preferences at any time using the cookie banner or by clicking{' '}
            <ManageCookiesButton />.
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside text-sm">
            <li><strong>Essential cookies</strong> — required for the site to function. No consent needed.</li>
            <li><strong>Analytics cookies</strong> — Google Analytics (anonymised IP). Requires your consent.</li>
            <li><strong>Marketing cookies</strong> — Google Ads, HubSpot. Requires your consent.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Your Rights</h2>
          <p>Depending on your country of residence, you have the following rights:</p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li><strong>Access</strong> — request a copy of the data we hold about you</li>
            <li><strong>Rectification</strong> — ask us to correct inaccurate data</li>
            <li><strong>Erasure</strong> — ask us to delete your data ("right to be forgotten")</li>
            <li><strong>Restriction</strong> — ask us to limit how we use your data</li>
            <li><strong>Portability</strong> — receive your data in a machine-readable format</li>
            <li><strong>Objection</strong> — object to processing based on legitimate interest</li>
            <li><strong>Withdraw consent</strong> — where processing is based on consent, you may withdraw at any time</li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, contact us at:{' '}
            <a href="mailto:hello@mmvmedical.org" className="text-[#12243a] underline">
              hello@mmvmedical.org
            </a>. We will respond within <strong>30 days</strong>.
          </p>
          <div className="mt-4 text-sm space-y-1 text-gray-500">
            <p><strong>UK:</strong> Information Commissioner's Office — <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="underline">ico.org.uk</a></p>
            <p><strong>Netherlands:</strong> Autoriteit Persoonsgegevens — <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="underline">autoriteitpersoonsgegevens.nl</a></p>
            <p><strong>Belgium:</strong> Data Protection Authority — <a href="https://dataprotectionauthority.be" target="_blank" rel="noopener noreferrer" className="underline">dataprotectionauthority.be</a></p>
            <p><strong>Ireland:</strong> Data Protection Commission — <a href="https://dataprotectioncommission.ie" target="_blank" rel="noopener noreferrer" className="underline">dataprotectioncommission.ie</a></p>
            <p><strong>Romania:</strong> ANSPDCP — <a href="https://dataprotection.ro" target="_blank" rel="noopener noreferrer" className="underline">dataprotection.ro</a></p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Data Security</h2>
          <p>
            We implement appropriate technical and organisational measures to protect your data,
            including encrypted data transmission (HTTPS), access controls limiting who can view
            patient data, and secure cloud storage with row-level security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Children</h2>
          <p>
            Our services are intended for adults aged 18 and over. We do not knowingly collect data
            from children under 16. If you believe we have inadvertently collected data from a minor,
            please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material
            changes by updating the "Last updated" date at the top of this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Contact</h2>
          <div className="p-4 bg-gray-50 rounded-lg text-sm space-y-1">
            <p><strong>Email:</strong> <a href="mailto:hello@mmvmedical.org" className="text-[#12243a] underline">hello@mmvmedical.org</a></p>
            <p><strong>WhatsApp:</strong> +90 552 782 7698</p>
            <p><strong>Address:</strong> [To be updated upon company registration]</p>
          </div>
        </section>

      </div>

      {/* Footer link */}
      <div className="border-t border-gray-100 py-8 px-6 text-center">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-700">
          ← Back to MMV Medical
        </Link>
      </div>
    </main>
  )
}
