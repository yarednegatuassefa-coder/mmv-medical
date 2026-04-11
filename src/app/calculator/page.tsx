import type { Metadata } from 'next'
import { PublicNav } from '@/components/layout/public-nav'
import { PublicFooter } from '@/components/layout/public-footer'
import { CalculatorWidget } from '@/components/public/calculator-widget'

export const metadata: Metadata = {
  title: 'Dental Savings Calculator — MMV Medical',
  description: 'Calculate exactly how much you save on dental implants, veneers, and full-arch treatment in Istanbul vs the UK, Ireland, Netherlands, Belgium, or Romania.',
  alternates: { canonical: '/calculator' },
}

export default function CalculatorPage() {
  return (
    <>
      <PublicNav />
      <main className="min-h-screen bg-navy pt-24 pb-20 px-6 md:px-[5%]">
        <div className="max-w-4xl mx-auto">
          <div className="text-gold text-xs font-mono tracking-widest uppercase mb-3">Savings Calculator</div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-cream leading-tight mb-4">
            How much will <em className="text-gold not-italic">you</em> save?
          </h1>
          <p className="text-cream/55 text-lg font-light mb-12 max-w-xl">
            Real cost comparisons between your country and Istanbul — including flights and hotel so you see your true net saving.
          </p>
          <CalculatorWidget />
        </div>
      </main>
      <PublicFooter />
    </>
  )
}
