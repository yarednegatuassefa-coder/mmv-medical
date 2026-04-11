import type { Metadata } from 'next'
import Image from 'next/image'
import { PublicNav } from '@/components/layout/public-nav'
import { PublicFooter } from '@/components/layout/public-footer'
import { LeadFormSection } from '@/components/public/lead-form-section'
import { CalculatorWidget } from '@/components/public/calculator-widget'

export const metadata: Metadata = {
  title: 'MMV Medical — World-Class Dental Care in Istanbul',
  alternates: { canonical: '/' },
}

const TREATMENTS = [
  { tag: 'Most Popular',        title: 'Single Dental Implant',  homePrice: '£2,800 UK', istPrice: '£420',   save: 'Save up to £2,380', img: 'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(3).jpeg' },
  { tag: 'Smile Transformation', title: 'Porcelain Veneers',     homePrice: '£900 each UK', istPrice: '£180', save: 'Full smile from £1,800', img: 'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.39.jpeg' },
  { tag: 'Full Arch Restoration', title: 'All-on-4 / All-on-6', homePrice: '£20,000 UK', istPrice: '£6,500', save: 'Save over £13,500', img: 'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(8).jpeg' },
  { tag: 'Restoration',          title: 'Zirconia Crowns',       homePrice: '£1,200 UK', istPrice: '£220',   save: 'Save up to £980', img: 'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.42%20(3).jpeg' },
  { tag: 'Full Makeover',        title: 'Complete Smile Design',  homePrice: '£18,000 UK', istPrice: '£4,500', save: 'Comprehensive redesign', img: 'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.40.jpeg' },
  { tag: 'Real Results',         title: 'Before & After',         homePrice: '£9,000 UK', istPrice: '£1,800', save: 'Full veneers from £1,800', img: 'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.41%20(3).jpeg' },
]

const RESULTS = [
  'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.39.jpeg',
  'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.40.jpeg',
  'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.41%20(3).jpeg',
  'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.42%20(3).jpeg',
  'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(3).jpeg',
  'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(6).jpeg',
  'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(8).jpeg',
  'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.45%20(5).jpeg',
]

const TESTIMONIALS = [
  { initial: 'S', name: 'Sarah M.', location: '🇬🇧 Manchester, UK', saved: 'Saved £4,200 on 2 implants', quote: 'My coordinator was available on WhatsApp at all hours. The whole trip felt completely seamless — transfers, hotel, clinic. The implants are perfect and I saved over £4,000.' },
  { initial: 'D', name: 'Declan O.', location: '🇮🇪 Dublin, Ireland', saved: 'Saved €7,400 on full veneers', quote: 'I was nervous about travelling for dental work but the team made every step easy. The clinic is modern and spotless. My veneers look completely natural. Would recommend to anyone.' },
  { initial: 'M', name: 'Mieke V.', location: '🇳🇱 Amsterdam, Netherlands', saved: 'Saved €13,500 on All-on-4', quote: 'The pricing was exactly as quoted — not a cent more. The surgeon was clearly a specialist and explained every step. I got my All-on-4 done in 4 days and flew home smiling.' },
]

const STEPS = [
  { n: '01', title: 'Free Consultation', desc: 'Share your dental history and X-rays. We prepare a personalised treatment plan with full transparent pricing — no hidden fees.' },
  { n: '02', title: 'Plan Your Trip', desc: 'We coordinate flights, hotel accommodation, and all clinic appointments. VIP airport transfers are included in your package.' },
  { n: '03', title: 'Treatment', desc: 'Treated by specialist surgeons at Dr. Mat Dental Clinic — a MOH-licensed facility. Your coordinator is with you every appointment.' },
  { n: '04', title: 'Aftercare', desc: 'Full aftercare package and ongoing WhatsApp support after you return home. We remain your point of contact for any follow-up.' },
]

export default function HomePage() {
  return (
    <>
      <PublicNav />

      {/* HERO */}
      <section className="min-h-screen bg-navy flex items-center pt-20 pb-16 px-6 md:px-[5%] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#c8a45a 0,#c8a45a 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px' }} />
        <div className="relative z-10 max-w-3xl">
          <p className="text-cream/50 text-xs font-mono tracking-widest uppercase mb-4">Istanbul · Turkey · Est. 2024</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold text-cream leading-[1.05] mb-6">
            World-Class Dental Care, <em className="text-gold not-italic">Honest Pricing</em>
          </h1>
          <p className="text-cream/60 text-lg font-light leading-relaxed max-w-xl mb-8">
            MMV Medical connects European patients with Dr. Mat Dental Clinic in Istanbul — one of Turkey's most trusted specialist dental practices. Your dedicated coordinator handles everything from consultation to aftercare.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <a href="#contact" className="bg-gold text-navy font-semibold text-sm tracking-wide uppercase px-7 py-3.5 rounded-sm hover:bg-gold-light transition-colors">
              Get Your Free Plan
            </a>
            <a href="#calculator" className="border border-cream/25 text-cream text-sm tracking-wide uppercase px-7 py-3.5 rounded-sm hover:border-gold hover:text-gold transition-colors">
              Calculate Savings
            </a>
          </div>
          <div className="flex flex-wrap gap-2 text-cream/50 text-sm mb-10">
            {['🇬🇧 UK','🇮🇪 Ireland','🇳🇱 Netherlands','🇧🇪 Belgium','🇩🇪 Germany','🇫🇷 France','🇸🇪 Sweden','🇳🇴 Norway','🇨🇭 Switzerland','🇷🇴 Romania'].map(c => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              { n: '70%', l: 'Average cost saving vs. home country' },
              { n: '3–5', l: 'Days for most complete treatments' },
              { n: '24h', l: 'Response time on all enquiries' },
            ].map(s => (
              <div key={s.n}>
                <div className="font-display text-4xl font-bold text-gold">{s.n}</div>
                <div className="text-cream/50 text-xs mt-1">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1 text-cream/60 text-sm">
            {['MOH Licensed Facility','Straumann & Nobel Biocare Implants','English-Speaking Coordinator','VIP Airport Transfers Included','Full Aftercare Support'].map(b => (
              <div key={b}>✦ {b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* TREATMENTS */}
      <section id="treatments" className="bg-white py-20 px-6 md:px-[5%]">
        <div className="max-w-6xl mx-auto">
          <div className="text-teal text-xs font-mono tracking-widest uppercase mb-3">Treatments</div>
          <h2 className="font-display text-4xl font-semibold text-navy mb-12">
            Specialist Care Across <em className="not-italic text-gold">All Dental Disciplines</em>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {TREATMENTS.map(t => (
              <div key={t.title} className="border border-navy/10 rounded overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-52 bg-navy/5">
                  <img src={t.img} alt={t.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="text-teal text-xs font-mono tracking-widest uppercase mb-2">{t.tag}</div>
                  <h3 className="font-semibold text-navy text-lg mb-1">{t.title}</h3>
                  <div className="text-navy/40 text-sm line-through">{t.homePrice}</div>
                  <div className="text-navy font-bold text-xl">{t.istPrice}</div>
                  <div className="text-teal-600 text-sm mt-1">{t.save}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="bg-cream-dark py-20 px-6 md:px-[5%]">
        <div className="max-w-4xl mx-auto">
          <div className="text-teal text-xs font-mono tracking-widest uppercase mb-3">Savings Calculator</div>
          <h2 className="font-display text-4xl font-semibold text-navy mb-12">
            See Exactly How Much <em className="not-italic text-gold">You Will Save</em>
          </h2>
          <CalculatorWidget />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20 px-6 md:px-[5%]">
        <div className="max-w-5xl mx-auto">
          <div className="text-teal text-xs font-mono tracking-widest uppercase mb-3">How It Works</div>
          <h2 className="font-display text-4xl font-semibold text-navy mb-12">
            From First Enquiry to <em className="not-italic text-gold">Perfect Smile</em>
          </h2>
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

      {/* RESULTS */}
      <section id="results" className="bg-navy py-20 px-6 md:px-[5%]">
        <div className="max-w-6xl mx-auto">
          <div className="text-gold/70 text-xs font-mono tracking-widest uppercase mb-3">Real Results</div>
          <h2 className="font-display text-4xl font-semibold text-cream mb-4">
            Before & After <em className="not-italic text-gold">Dr. Mat Dental Clinic</em>
          </h2>
          <p className="text-cream/50 mb-10">Every result shown is a real patient treated at Dr. Mat Dental Clinic in Istanbul. No filters, no stock photos — just real transformations.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {RESULTS.map((src, i) => (
              <div key={i} className="rounded overflow-hidden aspect-square bg-navy/30">
                <img src={src} alt={`Patient result ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="#contact" className="bg-gold text-navy font-semibold text-sm tracking-wide uppercase px-7 py-3.5 rounded-sm hover:bg-gold-light transition-colors inline-block">
              Book Your Free Consultation →
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-white py-20 px-6 md:px-[5%]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-teal text-xs font-mono tracking-widest uppercase mb-3">About MMV Medical</div>
            <h2 className="font-display text-4xl font-semibold text-navy mb-6">
              Specialist Care, <em className="not-italic text-gold">Personal Service</em>
            </h2>
            <p className="text-navy/60 leading-relaxed mb-8">
              MMV Medical was founded to give European patients direct access to world-class dental care in Istanbul — with the same level of trust, transparency, and personalised attention they would expect at home, at a fraction of the price. We work exclusively with Dr. Mat Dental Clinic, a specialist practice with a dedicated international patient team.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { title: 'Dr. Mat Dental Clinic, Istanbul', desc: 'MOH-licensed specialist dental facility. Straumann & Nobel Biocare implant systems.' },
                { title: 'Personal Coordinator Service', desc: 'English-speaking coordinator from first WhatsApp to post-treatment follow-up.' },
                { title: 'Transparent Pricing', desc: 'Full treatment cost confirmed before you book — no surprises on arrival.' },
                { title: 'European Patient Specialists', desc: 'Serving patients from UK, Ireland, Netherlands, Belgium, Germany, France and beyond.' },
              ].map(item => (
                <div key={item.title}>
                  <div className="text-navy font-semibold text-sm">✦ {item.title}</div>
                  <div className="text-navy/55 text-sm mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded overflow-hidden">
            <img
              src="https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(6).jpeg"
              alt="Dr. Mat Dental Clinic Istanbul"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-cream-dark py-20 px-6 md:px-[5%]">
        <div className="max-w-5xl mx-auto">
          <div className="text-teal text-xs font-mono tracking-widest uppercase mb-3">Patient Stories</div>
          <h2 className="font-display text-4xl font-semibold text-navy mb-12">
            What Our Patients <em className="not-italic text-gold">Say About Us</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-white rounded p-6 shadow-sm">
                <div className="text-gold text-lg mb-3">★★★★★</div>
                <p className="text-navy/70 text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-navy text-cream flex items-center justify-center font-bold text-sm">{t.initial}</div>
                  <div>
                    <div className="font-semibold text-navy text-sm">{t.name}</div>
                    <div className="text-navy/50 text-xs">{t.location}</div>
                    <div className="text-teal-600 text-xs">{t.saved}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="bg-navy py-20 px-6 md:px-[5%]">
        <div className="max-w-3xl mx-auto">
          <div className="text-gold/70 text-xs font-mono tracking-widest uppercase mb-3">Free Consultation</div>
          <h2 className="font-display text-4xl font-semibold text-cream mb-2">
            Your Treatment Plan, Within 24 Hours
          </h2>
          <p className="text-cream/50 mb-4">Share your situation and we will send a personalised treatment plan with exact pricing — no commitment required, no pushy follow-up calls.</p>
          <div className="flex flex-col gap-2 text-cream/60 text-sm mb-10">
            {[
              'Response within 24 hours, usually much faster',
              'Exact pricing with no hidden costs',
              'No obligation — information only until you decide',
              'English-speaking coordinator assigned from day one',
              'WhatsApp or email — whichever you prefer',
            ].map(b => <div key={b}>✦ {b}</div>)}
          </div>
          <LeadFormSection />
        </div>
      </section>

      <PublicFooter />
    </>
  )
}
