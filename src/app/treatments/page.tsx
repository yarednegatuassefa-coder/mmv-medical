import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicNav } from '@/components/layout/public-nav'
import { PublicFooter } from '@/components/layout/public-footer'

export const metadata: Metadata = {
  title: 'Treatments — MMV Medical',
  description: 'Dental implants, veneers, full-arch All-on-4 and All-on-6 in Istanbul. Specialist-led treatment with up to 70% savings vs UK, Ireland and European prices.',
  alternates: { canonical: '/treatments' },
}

const TREATMENTS = [
  {
    slug: 'dental-implants',
    name: 'Dental Implants',
    icon: '🦷',
    tagline: 'Permanent, natural-looking tooth replacement',
    desc: 'Titanium implants fused with your jawbone, topped with a zirconia or Emax crown. The gold standard for missing teeth — performed by specialist implantologists using Straumann, Nobel Biocare, and Neodent systems.',
    priceIstanbul: 'from £380',
    priceHome: 'vs £2,500 in the UK',
    saving: 'Save up to 85%',
    details: [
      'Single implant: £380–£550 depending on brand tier',
      'Multiple implants priced per unit with volume discount',
      'Includes crown — no hidden extras',
      'Treatment in 5–7 days (implant + temporary crown)',
      'Final crown fitted on return visit or remotely by your local dentist',
    ],
  },
  {
    slug: 'veneers',
    name: 'Veneers',
    icon: '✨',
    tagline: 'Emax & Zirconia smile design',
    desc: 'Ultra-thin porcelain shells bonded to the front of your teeth for a flawless appearance. Full smile makeovers completed in 5–7 days using Emax or Zirconia — the same materials used in top European clinics.',
    priceIstanbul: 'from £190 per tooth',
    priceHome: 'vs £900–1,000 in the UK',
    saving: 'Save up to 80%',
    details: [
      'Emax veneers: natural translucency, ideal for front teeth',
      'Zirconia veneers: maximum strength and whiteness',
      'Full 10-tooth makeover: from £1,800',
      'Shade selection and mock-up before final fitting',
      'Minimal tooth preparation with modern techniques',
    ],
  },
  {
    slug: 'all-on-4',
    name: 'All-on-4',
    icon: '🔄',
    tagline: 'Full arch reconstruction — 4 implants',
    desc: 'A complete set of fixed teeth on just 4 implants per arch. Life-changing for patients who have lost most or all of their teeth. Walk in, walk out with a full smile in one visit.',
    priceIstanbul: 'from £6,500 per arch',
    priceHome: 'vs £20,000+ in the UK',
    saving: 'Save up to 70%',
    details: [
      'Titanium implants + full zirconia bridge per arch',
      'Temporary teeth same day in most cases',
      'Final bridge typically fitted on second visit',
      'Both arches from £13,000',
      'Includes all consultations and imaging',
    ],
  },
  {
    slug: 'all-on-6',
    name: 'All-on-6',
    icon: '💎',
    tagline: 'Full arch reconstruction — 6 implants',
    desc: 'Greater stability and bite force than All-on-4, using 6 implants per arch. Recommended for patients requiring maximum support or where bone density allows. Our most popular full-arch solution.',
    priceIstanbul: 'from £8,500 per arch',
    priceHome: 'vs £26,000+ in the UK',
    saving: 'Save up to 68%',
    details: [
      '6 implants per arch for superior distribution of force',
      'Wider bridge supported across more anchors',
      'Both arches from £17,000',
      'Ideal for patients with sufficient bone volume',
      'Can be combined with bone grafting if needed',
    ],
  },
  {
    slug: 'crowns-bridges',
    name: 'Crowns & Bridges',
    icon: '👑',
    tagline: 'Cap damaged teeth, replace missing teeth',
    desc: 'Zirconia and Emax crowns to restore damaged, cracked or heavily filled teeth. Bridges replace missing teeth without implants using adjacent teeth as anchors.',
    priceIstanbul: 'from £280 per unit',
    priceHome: 'vs £1,200+ in the UK',
    saving: 'Save up to 77%',
    details: [
      'Zirconia crowns: strongest available material',
      'Emax crowns: superior aesthetics for front teeth',
      'Bridge (3 units): from £780',
      'Fitted and adjusted within 5–7 days',
      'Colour matched to your natural teeth',
    ],
  },
  {
    slug: 'smile-makeover',
    name: 'Full Smile Makeover',
    icon: '🌟',
    tagline: 'Complete aesthetic transformation',
    desc: 'Combining implants, veneers, crowns and whitening into a single coordinated treatment plan — designed around your face, your smile goals and your budget. Most comprehensive option.',
    priceIstanbul: 'from £4,500',
    priceHome: 'vs £15,000+ in the UK',
    saving: 'Save up to 70%',
    details: [
      'Full assessment and digital smile design',
      'Combination of treatments tailored to your case',
      'One coordinated visit — no back and forth',
      'Treatment timeline: 5–10 days depending on scope',
      'Dedicated coordinator throughout',
    ],
  },
]

export default function TreatmentsPage() {
  return (
    <>
      <PublicNav />
      <main className="min-h-screen bg-cream pt-24 pb-20">
        {/* Hero */}
        <section className="bg-navy py-16 px-6 md:px-[5%] mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-gold text-xs font-mono tracking-widest uppercase mb-3">Treatments</div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-cream leading-tight mb-4">
              What we help you with
            </h1>
            <p className="text-cream/55 text-lg font-light max-w-xl">
              From a single implant to a complete smile makeover — all treatments are performed by specialist-trained surgeons in a MOH-licensed facility in Istanbul.
            </p>
          </div>
        </section>

        {/* Treatment cards */}
        <section className="px-6 md:px-[5%]">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {TREATMENTS.map(t => (
              <div key={t.slug} className="bg-white border border-cream-dark rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-navy p-5 relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-20 h-20 rounded-full bg-gold/5 translate-x-4 translate-y-4" />
                  <div className="text-3xl mb-3">{t.icon}</div>
                  <h2 className="font-display text-2xl font-semibold text-cream mb-1">{t.name}</h2>
                  <p className="text-cream/45 text-sm">{t.tagline}</p>
                </div>
                <div className="p-5">
                  <p className="text-navy/60 text-sm leading-relaxed mb-4">{t.desc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {t.details.map((d, i) => (
                      <li key={i} className="flex gap-2 text-sm text-navy/60">
                        <span className="text-teal flex-shrink-0 mt-0.5">✓</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-navy/40">Istanbul</span>
                    <span className="font-display text-xl font-bold text-teal">{t.priceIstanbul}</span>
                    <span className="text-navy/30 text-xs">{t.priceHome}</span>
                  </div>
                  <div className="inline-block bg-teal/10 text-teal text-xs font-semibold tracking-wide uppercase px-2 py-0.5 rounded mb-4">
                    {t.saving}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 px-6 md:px-[5%] text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="font-display text-3xl font-semibold text-navy mb-3">Not sure which treatment you need?</h2>
            <p className="text-navy/55 mb-6">Send us your situation and we'll prepare a personalised recommendation with exact pricing. Free, no obligation.</p>
            <Link href="/#consultation"
              className="inline-block bg-navy text-gold font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-sm hover:bg-navy-mid transition-colors">
              Get Free Treatment Plan →
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  )
}
