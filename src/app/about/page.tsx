import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicNav } from '@/components/layout/public-nav'
import { PublicFooter } from '@/components/layout/public-footer'

export const metadata: Metadata = {
  title: 'About MMV Medical',
  description: 'MMV Medical connects European patients with specialist dental surgeons in Istanbul — with transparent pricing, dedicated English-speaking coordination, and full aftercare support.',
  alternates: { canonical: '/about' },
}

const CREDENTIALS = [
  { label: 'MOH Operating License', value: '20250340032100010003164 44' },
  { label: 'Health Tourism Authorization', value: '2026034015610080000435518' },
  { label: 'Issued by', value: 'Turkish Ministry of Health' },
  { label: 'Verifiable at', value: 'turkiye.gov.tr' },
]

const VALUES = [
  { icon: '◎', title: 'Transparency first', desc: 'Exact pricing before you commit. No hidden fees, no surprises on arrival. What we quote is what you pay.' },
  { icon: '◈', title: 'Specialist-led care', desc: 'Your treatment is performed by dentists who specialise exclusively in implantology and aesthetic dentistry — not generalists.' },
  { icon: '◆', title: 'One coordinator, whole journey', desc: 'From your first question to your final follow-up, one dedicated English-speaking coordinator manages every detail.' },
  { icon: '◇', title: 'European market focus', desc: 'We work exclusively with patients from UK, Ireland, Netherlands, Belgium and Romania. We understand your expectations.' },
]

export default function AboutPage() {
  return (
    <>
      <PublicNav />
      <main className="min-h-screen bg-cream pt-24 pb-20">

        {/* Hero */}
        <section className="bg-navy py-16 px-6 md:px-[5%] mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-gold text-xs font-mono tracking-widest uppercase mb-3">About</div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-cream leading-tight mb-5">
              Built for European patients who deserve better
            </h1>
            <p className="text-cream/55 text-lg font-light leading-relaxed">
              MMV Medical was created because too many European patients were navigating Istanbul's dental market alone — comparing clinics with no guidance, paying prices that didn't match expectations, and receiving zero aftercare once they flew home.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 md:px-[5%] mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-teal text-xs font-mono tracking-widest uppercase mb-3">What We Stand For</div>
            <h2 className="font-display text-3xl font-semibold text-navy mb-10">How we're different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VALUES.map(v => (
                <div key={v.title} className="bg-white border border-cream-dark rounded-lg p-6">
                  <div className="text-gold text-xl mb-3">{v.icon}</div>
                  <h3 className="font-semibold text-navy mb-2">{v.title}</h3>
                  <p className="text-navy/55 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="bg-navy-mid/5 border-y border-navy/10 py-12 px-6 md:px-[5%] mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-teal text-xs font-mono tracking-widest uppercase mb-3">Credentials</div>
            <h2 className="font-display text-3xl font-semibold text-navy mb-8">Licensed & Authorised</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CREDENTIALS.map(c => (
                <div key={c.label} className="bg-white border border-cream-dark rounded p-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-navy/40 mb-1">{c.label}</div>
                  <div className="text-sm font-mono text-navy">{c.value}</div>
                </div>
              ))}
            </div>
            <p className="text-navy/40 text-xs mt-4">
              International Health Tourism Authorization Certificate issued 24 February 2026, verifiable at turkiye.gov.tr
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-[5%] text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="font-display text-3xl font-semibold text-navy mb-3">Ready to find out how much you'd save?</h2>
            <p className="text-navy/55 mb-6 text-sm">Free consultation, exact pricing, no commitment.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/#consultation" className="bg-navy text-gold font-semibold text-sm tracking-wide uppercase px-7 py-3 rounded-sm hover:bg-navy-mid transition-colors">
                Free Consultation
              </Link>
              <Link href="/calculator" className="border border-navy/20 text-navy text-sm tracking-wide uppercase px-7 py-3 rounded-sm hover:border-navy/40 transition-colors">
                Calculate Savings
              </Link>
            </div>
          </div>
        </section>

      </main>
      <PublicFooter />
    </>
  )
}
