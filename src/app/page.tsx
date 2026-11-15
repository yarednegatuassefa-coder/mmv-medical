import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Clock3, Globe2, HeartHandshake, MessageCircle, Plane, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react'
import { PublicNav } from '@/components/layout/public-nav'
import { PublicFooter } from '@/components/layout/public-footer'
import { LeadFormSection } from '@/components/public/lead-form-section'

export const metadata: Metadata = {
  title: 'Dental Care Coordination in Istanbul',
  description: 'Explore dental treatment options in Istanbul with personal coordination for international patients. Start with a no-obligation conversation with MMV Medical.',
  alternates: { canonical: '/' },
}

const TREATMENTS = [
  {
    number: '01',
    title: 'Dental implants',
    description: 'Explore options for replacing one or more missing teeth, with clinical assessment by the treating dental team.',
    image: 'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(3).jpeg',
    alt: 'Dental implant treatment reference',
    tags: ['Single tooth', 'Multiple teeth'],
  },
  {
    number: '02',
    title: 'Veneers & smile design',
    description: 'Understand aesthetic options, materials and the questions to discuss with a qualified dental professional.',
    image: 'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.39.jpeg',
    alt: 'Dental veneer treatment reference',
    tags: ['Emax', 'Zirconia'],
  },
  {
    number: '03',
    title: 'Full-arch restoration',
    description: 'Learn about full-arch approaches such as All-on-4 and All-on-6, subject to individual clinical suitability.',
    image: 'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(8).jpeg',
    alt: 'Full arch dental restoration reference',
    tags: ['All-on-4', 'All-on-6'],
  },
]

const SUPPORT = [
  { icon: MessageCircle, title: 'One point of contact', text: 'A coordinator helps organise questions, information and communication with the clinic.' },
  { icon: Stethoscope, title: 'Clinical review stays clinical', text: 'Treatment suitability and final recommendations are assessed by the treating healthcare professionals.' },
  { icon: Plane, title: 'Travel planning', text: 'Get help understanding the practical steps around appointments and a visit to Istanbul.' },
]

const STEPS = [
  { n: '01', title: 'Tell us what you are looking for', text: 'Share your goals and the best way to contact you. You do not need to know the name of a procedure.' },
  { n: '02', title: 'Discuss your options', text: 'We help organise the information needed for the partner clinic to review your enquiry.' },
  { n: '03', title: 'Plan the next steps', text: 'If you decide to proceed, your coordinator can help organise communication and travel logistics.' },
]

export default function HomePage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-[#f7f5f0] pt-0">
        <section className="relative isolate">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_15%,rgba(200,164,90,0.16),transparent_42%),linear-gradient(135deg,#f7f5f0_0%,#f1eee7_100%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 md:min-h-[680px] md:grid-cols-[1.02fr_0.98fr] md:gap-10 md:px-12 md:py-20">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#12243a]/10 bg-white/70 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#526273] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1e8f7a]" />
                International patient coordination · Istanbul
              </div>
              <h1 className="font-display text-[clamp(3.2rem,7vw,6.4rem)] font-medium leading-[0.94] tracking-[-0.045em] text-[#12243a]">
                A more considered way to explore <span className="italic text-[#a47d37]">dental care</span> in Istanbul.
              </h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-[#536170] sm:text-lg">
                Clear information, a dedicated point of contact and practical coordination — from your first enquiry to planning a visit. Clinical decisions remain with qualified healthcare professionals.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#consultation" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-sm bg-[#12243a] px-7 text-sm font-semibold tracking-wide text-white shadow-[0_12px_30px_rgba(18,36,58,0.16)] transition hover:-translate-y-0.5 hover:bg-[#1e3554]">
                  Start a conversation <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </a>
                <Link href="/treatments" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-sm border border-[#12243a]/15 bg-white/60 px-7 text-sm font-semibold text-[#12243a] transition hover:border-[#a47d37]/60 hover:bg-white">
                  Explore treatment areas
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#12243a]/10 pt-6 text-xs font-medium text-[#6b7783]">
                <span className="inline-flex items-center gap-2"><Globe2 size={15} className="text-[#a47d37]" /> Support for international enquiries</span>
                <span className="inline-flex items-center gap-2"><HeartHandshake size={15} className="text-[#a47d37]" /> Human-led coordination</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[590px] md:ml-auto">
              <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full border border-[#c8a45a]/30" />
              <div className="absolute -bottom-8 -left-8 h-52 w-52 rounded-full bg-[#c8a45a]/10 blur-2xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#d9d4c9] shadow-[0_30px_80px_rgba(18,36,58,0.18)] sm:aspect-[5/4] md:aspect-[4/5]">
                <img
                  src="/images/istanbul-bosphorus-editorial.svg"
                  alt="Original illustration of Istanbul across the Bosphorus at golden hour"
                  className="h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c2d]/70 via-transparent to-[#0b1c2d]/5" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65">Your journey, clearly coordinated</p>
                  <p className="mt-2 max-w-sm font-display text-3xl leading-tight sm:text-4xl">Good decisions begin with the right information.</p>
                </div>
              </div>
              <div className="absolute -bottom-5 left-4 flex max-w-[290px] items-center gap-3 border border-[#12243a]/5 bg-white p-4 shadow-[0_14px_38px_rgba(18,36,58,0.13)] sm:-left-8 sm:bottom-10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9f1ed] text-[#1e8f7a]"><MessageCircle size={18} /></div>
                <div>
                  <p className="text-xs font-semibold text-[#12243a]">A real person to speak with</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-[#6b7783]">Ask questions before making a decision.</p>
                </div>
              </div>
            </div>
          </div>
          <a href="#approach" className="mx-auto hidden w-fit items-center gap-2 pb-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#87919a] md:flex">
            Discover our approach <ArrowDown size={13} />
          </a>
        </section>

        <section id="approach" className="border-y border-[#12243a]/8 bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-3 md:gap-10 md:px-12 md:py-14">
            {SUPPORT.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3efe6] text-[#9c783c]"><Icon size={19} strokeWidth={1.7} /></div>
                <div>
                  <p className="font-display text-xl font-semibold text-[#12243a]">{title}</p>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-[#687582]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="treatments" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:px-12 md:py-28">
          <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b783d]">Explore treatment areas</p>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-[-0.025em] text-[#12243a] sm:text-5xl">Start with what matters to <span className="italic text-[#a47d37]">you.</span></h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#687582]">Every case is different. These are areas we can help you explore — not a diagnosis or a promise that a particular treatment is suitable.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {TREATMENTS.map((t) => (
              <article key={t.number} className="group overflow-hidden border border-[#12243a]/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(18,36,58,0.11)]">
                <div className="relative aspect-[5/4] overflow-hidden bg-[#e8e5dd]">
                  <img src={t.image} alt={t.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
                  <span className="absolute left-4 top-4 bg-white/90 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#12243a]">{t.number} / MMV</span>
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="font-display text-2xl font-semibold text-[#12243a]">{t.title}</h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#687582]">{t.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {t.tags.map(tag => <span key={tag} className="border border-[#12243a]/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#66727d]">{tag}</span>)}
                  </div>
                  <Link href="/treatments" className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#9b783d] transition group-hover:gap-3">
                    Explore options <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#12243a] px-5 py-20 text-white sm:px-8 md:px-12 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d5b879]">A clear process</p>
                <h2 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl">From first question to a <span className="italic text-[#d5b879]">well-planned visit.</span></h2>
                <p className="mt-6 max-w-md text-sm leading-7 text-white/55">You stay in control at every stage. There is no obligation to travel or proceed with treatment after making an enquiry.</p>
                <a href="#consultation" className="mt-8 inline-flex items-center gap-3 border-b border-[#d5b879]/60 pb-2 text-sm font-semibold text-[#e6d2a8] transition hover:text-white">Talk to a coordinator <ArrowRight size={16} /></a>
              </div>
              <div className="divide-y divide-white/12 border-y border-white/12">
                {STEPS.map(step => (
                  <div key={step.n} className="grid gap-3 py-7 sm:grid-cols-[70px_1fr] sm:gap-6">
                    <span className="font-mono text-xs tracking-widest text-[#d5b879]">{step.n}</span>
                    <div>
                      <h3 className="font-display text-2xl font-semibold">{step.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-7 text-white/55">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:px-12 md:py-28">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b783d]">The MMV difference</p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-[#12243a] sm:text-5xl">Coordination without the <span className="italic text-[#a47d37]">pressure.</span></h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#687582]">We help international patients navigate the practical side of exploring care in Türkiye. Our role is to make communication and planning easier — not to replace independent clinical advice.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, title: 'Clear responsibilities', text: 'The treating clinic is responsible for diagnosis, clinical recommendations, consent and care.' },
              { icon: MessageCircle, title: 'Straight answers', text: 'Ask about process, timing, documents and the practical details before you decide.' },
              { icon: Clock3, title: 'Your pace', text: 'Take the time you need. An enquiry does not commit you to treatment or travel.' },
              { icon: Sparkles, title: 'Personal coordination', text: 'A dedicated contact helps keep the moving parts of your enquiry organised.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="border border-[#12243a]/10 bg-white p-6">
                <Icon size={20} className="text-[#a47d37]" strokeWidth={1.6} />
                <h3 className="mt-5 font-display text-xl font-semibold text-[#12243a]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#687582]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="consultation" className="scroll-mt-20 bg-[#ebe7de] px-5 py-20 sm:px-8 md:px-12 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-end">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b783d]">Start here</p>
                <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-[#12243a] sm:text-5xl">Tell us what you would like to <span className="italic text-[#a47d37]">understand.</span></h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#687582]">Send an enquiry and a coordinator can help you understand the next steps. Please do not include sensitive medical records or identity documents in this initial form.</p>
            </div>
            <LeadFormSection />
            <p className="mt-8 max-w-3xl text-[11px] leading-6 text-[#77818a]">MMV Medical provides coordination and facilitation services, not medical diagnosis or treatment. Any treatment recommendation, suitability assessment, clinical estimate and final price must be confirmed by the treating healthcare provider after appropriate review. Images are illustrative and do not guarantee an outcome.</p>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  )
}
