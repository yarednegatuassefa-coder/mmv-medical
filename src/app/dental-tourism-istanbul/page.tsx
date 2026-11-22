import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, CircleHelp, ShieldCheck } from 'lucide-react'

import { PublicFooter } from '@/components/layout/public-footer'
import { PublicNav } from '@/components/layout/public-nav'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Dental Tourism in Istanbul: A Practical Planning Guide',
  description: 'A neutral guide to exploring dental care in Istanbul: provider questions, clinical responsibility, travel planning, costs and follow-up.',
  path: '/dental-tourism-istanbul',
})

const questions = [
  'Who is responsible for examining me, explaining alternatives and confirming suitability?',
  'What treatment stages, visits, risks, limitations and follow-up arrangements should I understand?',
  'Will I receive a written estimate that clearly explains what is and is not included?',
  'Who should I contact if a problem develops after I return home?',
]

const steps = [
  ['01', 'Start with information', 'Describe what you want to understand without trying to self-diagnose or choose a procedure before an individual assessment.'],
  ['02', 'Ask the provider the right questions', 'Request clear information about the proposed approach, alternatives, risks, limitations, visit sequence and aftercare.'],
  ['03', 'Review the written details', 'Take time to compare the provider’s explanation, written estimate, travel requirements and arrangements for follow-up.'],
  ['04', 'Decide without pressure', 'You can pause, ask for an independent opinion or decide not to travel. An enquiry is not a commitment.'],
]

export default function DentalTourismIstanbulPage() {
  return (
    <>
      <PublicNav />
      <main className="site-main">
        <section className="site-hero site-hero--compact">
          <div className="site-shell grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <p className="eyebrow">Dental tourism in Istanbul</p>
              <h1 className="display-heading max-w-4xl">Plan the journey before you <em>choose the treatment.</em></h1>
              <p className="hero-copy max-w-2xl">A practical starting point for people exploring dental care abroad. Learn what to ask, what to review and where clinical responsibility belongs.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/#consultation" className="button button--gold">Ask a coordinator <ArrowRight size={16} /></Link>
                <Link href="/treatments" className="button button--outline-light">Explore treatment areas</Link>
              </div>
            </div>
            <Image src="/images/istanbul-bosphorus-hero.jpg" alt="Editorial view of Istanbul across the Bosphorus" width={1824} height={2280} sizes="(max-width: 1024px) 100vw, 38vw" className="hidden max-h-[460px] w-full object-cover object-center opacity-90 lg:block" priority />
          </div>
        </section>

        <section className="site-section">
          <div className="site-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow eyebrow--dark">Start with the role</p>
              <h2 className="section-heading">Dental tourism is more than a flight and a treatment name.</h2>
            </div>
            <div className="prose-column">
              <p>Exploring dental care in another country can involve provider communication, clinical questions, written estimates, travel arrangements and planning for what happens after the visit. Those decisions should be made with enough information and time to review it.</p>
              <p>MMV Medical provides coordination and facilitation support. MMV is not a dental clinic or healthcare provider. The treating provider is responsible for examination, diagnosis, clinical recommendations, consent, treatment and aftercare.</p>
              <p>This guide is general information, not a diagnosis, treatment recommendation, price quote or promise of suitability.</p>
            </div>
          </div>
        </section>

        <section className="site-section site-section--soft">
          <div className="site-shell grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="eyebrow eyebrow--dark">A safer sequence</p>
              <h2 className="section-heading">Four steps for a more informed enquiry.</h2>
            </div>
            <ol className="process-list">
              {steps.map(([number, title, text]) => (
                <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="site-section">
          <div className="site-shell">
            <div className="section-intro">
              <p className="eyebrow eyebrow--dark">Questions to ask</p>
              <h2 className="section-heading">Look for clear answers, not pressure.</h2>
              <p className="section-copy">Before making travel arrangements, ask the provider to explain the details that matter to your own situation.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {questions.map((question, index) => <article key={question} className="principle-card"><div className="principle-card__top"><span>0{index + 1}</span><CircleHelp size={21} /></div><p className="mt-5 text-base leading-8 text-[#34495c]">{question}</p></article>)}
            </div>
          </div>
        </section>

        <section className="site-section site-section--soft">
          <div className="site-shell grid gap-8 md:grid-cols-3">
            <article className="principle-card"><div className="principle-card__top"><span>CLINICAL</span><ShieldCheck size={21} /></div><h3>Clinical decisions stay clinical.</h3><p>Ask the treating provider to explain suitability, alternatives, risks, limitations and follow-up.</p></article>
            <article className="principle-card"><div className="principle-card__top"><span>PRACTICAL</span><CheckCircle2 size={21} /></div><h3>Review the whole journey.</h3><p>Consider visits, travel, accommodation, recovery time, written costs and what happens if plans change.</p></article>
            <article className="principle-card"><div className="principle-card__top"><span>CHOICE</span><CircleHelp size={21} /></div><h3>Keep the decision yours.</h3><p>There should be time to ask questions, seek another opinion, pause or decide not to proceed.</p></article>
          </div>
        </section>

        <section className="site-section">
          <div className="site-shell grid gap-6 md:grid-cols-3">
            <Link href="/treatments" className="contact-panel block"><p className="eyebrow eyebrow--dark">Learn</p><h2>Dental treatment areas</h2><p>Read general questions about implants, crowns, bridges, veneers and full-arch options.</p><span className="text-link mt-6">Open the guide <ArrowRight size={15} /></span></Link>
            <Link href="/calculator" className="contact-panel block"><p className="eyebrow eyebrow--dark">Plan</p><h2>Travel cost planner</h2><p>Compare your own written estimate with travel and accommodation costs. It is not a clinic quote.</p><span className="text-link mt-6">Open the planner <ArrowRight size={15} /></span></Link>
            <Link href="/about" className="contact-panel block"><p className="eyebrow eyebrow--dark">Understand</p><h2>MMV’s role</h2><p>See how coordination works and where responsibility remains with the treating provider.</p><span className="text-link mt-6">Read our role <ArrowRight size={15} /></span></Link>
          </div>
        </section>

        <section className="site-cta"><div className="site-shell site-cta__inner"><div><p className="eyebrow">Have a question?</p><h2>Begin with what you want to understand.</h2><p>Contacting MMV does not commit you to treatment or travel.</p></div><Link href="/#consultation" className="button button--gold">Start an enquiry <ArrowRight size={16} /></Link></div></section>
      </main>
      <PublicFooter />
    </>
  )
}
