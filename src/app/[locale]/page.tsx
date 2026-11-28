import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LocalizedLeadForm } from '@/components/public/localized-lead-form'

const content = {
  en: {
    title:'Explore care in Istanbul with clearer information.',
    intro:'MMV Medical helps international enquiries start with practical, human-led coordination information. We are currently developing our provider network and do not yet claim clinic partnerships or referral access.',
    eyebrow:'International patient coordination · Istanbul',
    how:'A more informed first step',
    steps:[['01','Start with a question','Tell us what you want to understand. You do not need to choose a procedure or share health information.'],['02','Prepare for provider conversations','We can help you organise non-clinical questions and identify what to verify directly with a provider.'],['03','Decide at your own pace','There is no obligation to travel or proceed. Clinical decisions belong to a qualified treating professional.']],
    form:'Send a non-clinical enquiry',
    disclaimer:'MMV is a coordination information service, not a clinic or medical practice. No provider partnership, treatment availability, clinical outcome or booking is represented or guaranteed.',
    switch:'Français · العربية',
  },
  fr: {
    title:'Explorez les possibilités de soins à Istanbul en toute clarté.',
    intro:'MMV Medical aide les patients internationaux à commencer par des informations pratiques et un accompagnement humain. Nous développons actuellement notre réseau de prestataires et ne revendiquons aucun partenariat clinique ni accès à des recommandations.',
    eyebrow:'Coordination des patients internationaux · Istanbul',
    how:'Un premier pas mieux informé',
    steps:[['01','Commencez par une question','Expliquez ce que vous souhaitez comprendre. Vous n’avez pas besoin de choisir une intervention ni de partager des informations médicales.'],['02','Préparez vos échanges avec les prestataires','Nous pouvons vous aider à organiser des questions pratiques et à identifier les points à vérifier directement auprès d’un prestataire.'],['03','Décidez à votre rythme','Vous n’avez aucune obligation de voyager ou de poursuivre. Les décisions cliniques relèvent d’un professionnel de santé qualifié.']],
    form:'Envoyer une demande non médicale',
    disclaimer:'MMV fournit des informations de coordination et n’est ni une clinique ni un cabinet médical. Aucun partenariat, disponibilité de soins, résultat clinique ou réservation n’est garanti.',
    switch:'English · العربية',
  },
  ar: {
    title:'استكشف خيارات الرعاية في إسطنبول بمعلومات أوضح.',
    intro:'تساعد MMV Medical الاستفسارات الدولية على البدء بمعلومات عملية وتنسيق بشري. نعمل حالياً على تطوير شبكة مقدمي الخدمات، ولا ندّعي وجود شراكات مع عيادات أو إمكانية إحالة المرضى إليها.',
    eyebrow:'تنسيق المرضى الدوليين · إسطنبول',
    how:'خطوة أولى مبنية على المعلومات',
    steps:[['01','ابدأ بسؤال','أخبرنا بما تريد فهمه. لا تحتاج إلى اختيار إجراء طبي أو مشاركة معلومات صحية.'],['02','استعد للتواصل مع مقدمي الخدمات','يمكننا مساعدتك في تنظيم الأسئلة غير الطبية وتحديد ما ينبغي التحقق منه مباشرة مع مقدم الخدمة.'],['03','اتخذ قرارك في الوقت المناسب لك','لا يوجد أي التزام بالسفر أو متابعة العلاج. القرارات السريرية من اختصاص مهني صحي مؤهل.']],
    form:'إرسال استفسار غير طبي',
    disclaimer:'تقدم MMV معلومات وخدمات تنسيق فقط، وليست عيادة أو مؤسسة طبية. لا نضمن شراكة مع مقدم خدمة أو توفر علاج أو نتيجة سريرية أو حجز.',
    switch:'English · Français',
  },
} as const

type Locale = keyof typeof content

export function generateStaticParams() {
  return [{locale:'en'},{locale:'fr'},{locale:'ar'}]
}

export async function generateMetadata({params}:{params:{locale:string}}):Promise<Metadata>{
  if (!['en','fr','ar'].includes(params.locale)) return {}
  const locale=params.locale as Locale
  return {title:`MMV Medical | ${locale.toUpperCase()}`,description:content[locale].intro}
}

export default function LocalizedJourneyPage({params}:{params:{locale:string}}) {
  if (!['en','fr','ar'].includes(params.locale)) notFound()
  const locale=params.locale as Locale
  const t=content[locale]
  const rtl=locale==='ar'
  return <main dir={rtl?'rtl':'ltr'} className="min-h-screen bg-[#f7f5f0] text-[#12243a]">
    <header className="border-b border-[#12243a]/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Link href="/" className="font-display text-2xl font-semibold tracking-tight">MMV <span className="text-[#a47d37]">Medical</span></Link>
        <nav className="flex gap-3 text-xs font-semibold"><Link href="/en">EN</Link><Link href="/fr">FR</Link><Link href="/ar">العربية</Link><Link href="/privacy-policy">{locale==='fr'?'Confidentialité':locale==='ar'?'الخصوصية':'Privacy'}</Link></nav>
      </div>
    </header>
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pt-24">
      <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#a47d37]">{t.eyebrow}</p>
      <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-tight sm:text-6xl">{t.title}</h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-[#536170]">{t.intro}</p>
      <a href="#enquiry" className="mt-8 inline-flex bg-[#12243a] px-6 py-4 text-sm font-semibold text-white">{t.form}</a>
    </section>
    <section className="border-y border-[#12243a]/10 bg-white py-16">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-3xl font-semibold">{t.how}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">{t.steps.map(([n,title,body])=><article key={n} className="border-t border-[#c8a66a] pt-5"><span className="font-mono text-xs text-[#a47d37]">{n}</span><h3 className="mt-3 font-display text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#64717d]">{body}</p></article>)}</div>
      </div>
    </section>
    <section id="enquiry" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-16">
      <h2 className="mb-7 font-display text-3xl font-semibold">{t.form}</h2>
      <LocalizedLeadForm locale={locale}/>
      <p className="mt-6 max-w-4xl text-xs leading-6 text-[#77818a]">{t.disclaimer}</p>
    </section>
    <footer className="border-t border-[#12243a]/10 bg-white px-5 py-7 text-center text-xs text-[#77818a]">© {new Date().getFullYear()} MMV Medical · Istanbul, Türkiye</footer>
  </main>
}
