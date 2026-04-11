import type { Metadata } from 'next'
import { PublicNav } from '@/components/layout/public-nav'
import { PublicFooter } from '@/components/layout/public-footer'
import { LeadFormSection } from '@/components/public/lead-form-section'
import { WA_NUMBER } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact MMV Medical',
  description: 'Get in touch with MMV Medical for a free dental consultation. WhatsApp, email, or consultation form — we respond within 24 hours.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <PublicNav />
      <main className="min-h-screen bg-cream pt-24 pb-20">

        {/* Hero */}
        <section className="bg-navy py-14 px-6 md:px-[5%] mb-14">
          <div className="max-w-3xl mx-auto">
            <div className="text-gold text-xs font-mono tracking-widest uppercase mb-3">Contact</div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-cream leading-tight mb-4">
              Get in touch
            </h1>
            <p className="text-cream/55 text-lg font-light max-w-lg">
              We respond within 24 hours — usually much faster. WhatsApp is the quickest way to reach us.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-[5%]">
          <div className="max-w-5xl mx-auto">

            {/* Direct contact options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hi MMV Medical — I\'d like a free dental consultation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25d366]/10 border border-[#25d366]/25 rounded-lg p-5 hover:bg-[#25d366]/15 transition-colors group"
              >
                <div className="text-2xl mb-3">💬</div>
                <div className="font-semibold text-navy mb-1">WhatsApp</div>
                <div className="text-sm text-navy/55">+{WA_NUMBER}</div>
                <div className="text-xs text-[#25d366] mt-2 font-medium group-hover:underline">Chat now →</div>
              </a>

              <div className="bg-white border border-cream-dark rounded-lg p-5">
                <div className="text-2xl mb-3">📍</div>
                <div className="font-semibold text-navy mb-1">Clinic Address</div>
                <div className="text-sm text-navy/55 leading-relaxed">
                  Merkez Mah. Halaskargazi Cad.<br />
                  No:145 D:2, Şişli<br />
                  Istanbul, Turkey
                </div>
              </div>

              <div className="bg-white border border-cream-dark rounded-lg p-5">
                <div className="text-2xl mb-3">⏱</div>
                <div className="font-semibold text-navy mb-1">Response Time</div>
                <div className="text-sm text-navy/55 leading-relaxed">
                  WhatsApp: usually within 1 hour<br />
                  Form / Email: within 24 hours<br />
                  Available 7 days a week
                </div>
              </div>
            </div>

            {/* Consultation form */}
            <div className="mb-4">
              <div className="text-teal text-xs font-mono tracking-widest uppercase mb-2">Or Fill the Form</div>
              <h2 className="font-display text-3xl font-semibold text-navy mb-8">Request a free consultation</h2>
            </div>
            <LeadFormSection />
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  )
}
