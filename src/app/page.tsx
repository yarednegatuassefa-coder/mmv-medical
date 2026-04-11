import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicNav } from '@/components/layout/public-nav'
import { PublicFooter } from '@/components/layout/public-footer'
import { LeadFormSection } from '@/components/public/lead-form-section'
import { COUNTRIES, TREATMENTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'MMV Medical — World-Class Dental Care in Istanbul',
  alternates: { canonical: '/' },
}

const SAVINGS = [
  { country: '🇬🇧 UK',          treatment: 'Dental Implant',  home: '£2,500', istanbul: '£420',  save: '£2,080' },
  { country: '🇮🇪 Ireland',     treatment: 'Full Veneers',    home: '€9,200', istanbul: '€1,800', save: '€7,400' },
  { country: '🇳🇱 Netherlands', treatment: 'All-on-4',        home: '€20,000', istanbul: '€6,500', save: '€13,500' },
]

const STEPS = [
  { n: '01', title: 'Free Consultation', desc: 'Share your dental history and X-rays. We prepare a personalised treatment plan with full pricing — no surprises.' },
  { n: '02', title: 'Plan Your Trip',    desc: 'We coordinate your flights, hotel, and clinic appointments. VIP transfers included.' },
  { n: '03', title: 'Treatment in Istanbul', desc: 'Treated by specialist surgeons in a MOH-licensed facility. Your coordinator is with you every appointment.' },
  { n: '04', title: 'Aftercare',         desc: 'Full aftercare package and ongoing WhatsApp support after you return home.' },
]

export default function HomePage() {
  return (
    <>
      <PublicNav />

      {/* HERO */}
      <section className="min-h-screen bg-navy flex items-center pt-20 pb-16 px-6 md:px-[5%] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#c8a45a 0,#c8a45a 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px' }} />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 text-gold/90 text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded mb-8">
            🇬🇧 🇮🇪 🇳🇱 🇧🇪 🇷🇴 Trusted by European Patients
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-semibold text-cream leading-[1.05] mb-6">
            World-Class Dental Care at a{' '}
            <em className="text-gold not-italic">Fraction</em> of the Price
          </h1>
          <p className="text-cream/60 text-lg font-light leading-relaxed max-w-xl mb-8">
            European patients save thousands on implants, veneers, and full-arch restorations in Istanbul — with a dedicated English-speaking coordinator from first enquiry to final smile.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#consultation" className="bg-gold text-navy font-semibold text-sm tracking-wide uppercase px-7 py-3.5 rounded-sm hover:bg-gold-light transition-colors">
              Get Free Treatment Plan
            </Link>
            <Link href="/calculator" className="border border-cream/25 text-cream text-sm tracking-wide uppercase px-7 py-3.5 rounded-sm hover:border-gold hover:text-gold transition-colors">
              Calculate Savings
            </Link>
          </div>

          {/* Hero savings cards */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SAVINGS.map(s => (
              <div key={s.country} className="bg-white/5 border border-gold/15 rounded p-4">
                <div className="text-gold/80 text-xs font-mono tracking-wider uppercase mb-2">{s.country}</div>
                <div className="text-cream text-sm mb-1">{s.treatment}</div>
                <div className="text-cream/40 text-xs">{s.home} → {s.istanbul}</div>
                <div className="text-teal-light font-display text-xl font-bold mt-1">Save {s.save}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-cream-dark py-12 px-6 md:px-[5%]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: '70%', l: 'Average Saving' },
            { n: '50+', l: 'Countries Served' },
            { n: '3–7', l: 'Days Treatment' },
            { n: '24h', l: 'Response Time' },
          ].map(s => (
            <div key={s.l}>
              <div className="font-display text-4xl font-bold text-navy">{s.n}</div>
              <div className="text-xs font-mono tracking-widest uppercase text-navy/50 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20 px-6 md:px-[5%]">
        <div className="max-w-5xl mx-auto">
          <div className="text-teal text-xs font-mono tracking-widest uppercase mb-3">Process</div>
          <h2 className="font-display text-4xl font-semibold text-navy mb-12">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {STEPS.map(s => (
              <div key={s.n}>
                <div className="w-12 h-12 rounded-full bg-navy border border-gold/30 flex items-center justify-center font-display text-gold text-lg font-bold mb-4">{s.n}</div>
                <h3 className="font-semibold text-navy mb-2">{s.title}</h3>
                <p className="text-navy/55 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD FORM */}
      <section id="consultation" className="bg-cream-dark py-20 px-6 md:px-[5%]">
        <div className="max-w-5xl mx-auto">
          <div className="text-teal text-xs font-mono tracking-widest uppercase mb-3">Get Started</div>
          <h2 className="font-display text-4xl font-semibold text-navy mb-2">Your free treatment plan</h2>
          <p className="text-navy/55 mb-10 max-w-lg">Tell us your situation. We'll send a personalised plan with exact pricing within 24 hours — no commitment required.</p>
          <LeadFormSection />
        </div>
      </section>

      <PublicFooter />
    </>
  )
}
