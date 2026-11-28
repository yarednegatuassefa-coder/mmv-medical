'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { capturePublicLead } from '@/actions/leads'
import { COUNTRIES, ENQUIRY_TOPICS, WA_NUMBER } from '@/lib/constants'

type Locale = 'en' | 'fr' | 'ar'
const topicLabels: Record<Locale, Record<string,string>> = {
  en: {understand_process:'Understand the coordination process',provider_information:'Learn how to evaluate provider information',travel_planning:'Understand practical travel planning',coordination_support:'Ask about non-clinical coordination support',not_sure:'I am not sure yet'},
  fr: {understand_process:'Comprendre le processus de coordination',provider_information:'Évaluer les informations sur les prestataires',travel_planning:'Comprendre l’organisation pratique du voyage',coordination_support:'Demander un accompagnement non médical',not_sure:'Je ne sais pas encore'},
  ar: {understand_process:'فهم عملية التنسيق',provider_information:'معرفة كيفية تقييم معلومات مقدمي الخدمات',travel_planning:'فهم ترتيبات السفر العملية',coordination_support:'طلب دعم تنسيقي غير طبي',not_sure:'لست متأكداً بعد'},
}
const countryLabels: Record<Locale, Record<string,string>> = {
  en: {UK:'United Kingdom',Ireland:'Ireland',Netherlands:'Netherlands',Belgium:'Belgium',Romania:'Romania',Other:'Other'},
  fr: {UK:'Royaume-Uni',Ireland:'Irlande',Netherlands:'Pays-Bas',Belgium:'Belgique',Romania:'Roumanie',Other:'Autre'},
  ar: {UK:'المملكة المتحدة',Ireland:'أيرلندا',Netherlands:'هولندا',Belgium:'بلجيكا',Romania:'رومانيا',Other:'أخرى'},
}
const copy = {
  en: {
    name:'Full name', country:'Country', email:'Email', phone:'WhatsApp number',
    topic:'What would you like help with?', choose:'Choose a topic',
    response:'I agree that MMV Medical may use these contact details and my selected topic to respond to this enquiry. I have read the Privacy Notice.',
    marketing:'I would also like to receive occasional updates. This is optional.',
    send:'Send enquiry', sending:'Sending…', success:'Enquiry received',
    successText:'Thank you. A coordinator can review your enquiry. MMV is still building its provider network and cannot promise clinic availability or a treatment booking.',
    error:'We could not submit your enquiry. Please try again.',
    privacy:'Privacy Notice', noHealth:'Do not include medical records, diagnoses, symptoms, passport details or payment information.',
    continue:'Continue on WhatsApp',
  },
  fr: {
    name:'Nom complet', country:'Pays', email:'E-mail', phone:'Numéro WhatsApp',
    topic:'Que souhaitez-vous comprendre ?', choose:'Choisissez un sujet',
    response:'J’accepte que MMV Medical utilise ces coordonnées et le sujet choisi pour répondre à cette demande. J’ai lu la notice de confidentialité.',
    marketing:'Je souhaite également recevoir occasionnellement des actualités. Cette option est facultative.',
    send:'Envoyer la demande', sending:'Envoi…', success:'Demande reçue',
    successText:'Merci. Un coordinateur pourra examiner votre demande. MMV développe encore son réseau de prestataires et ne peut garantir la disponibilité d’une clinique ni une réservation de soins.',
    error:'Votre demande n’a pas pu être envoyée. Veuillez réessayer.',
    privacy:'Notice de confidentialité', noHealth:'N’envoyez pas de dossier médical, diagnostic, symptôme, passeport ni information de paiement.',
    continue:'Continuer sur WhatsApp',
  },
  ar: {
    name:'الاسم الكامل', country:'البلد', email:'البريد الإلكتروني', phone:'رقم واتساب',
    topic:'ما المعلومات التي تحتاج إليها؟', choose:'اختر موضوعاً',
    response:'أوافق على استخدام MMV Medical لبيانات الاتصال والموضوع المحدد للرد على هذا الاستفسار. وقد قرأت إشعار الخصوصية.',
    marketing:'أرغب أيضاً في تلقي تحديثات من حين لآخر. هذا الخيار اختياري.',
    send:'إرسال الاستفسار', sending:'جارٍ الإرسال…', success:'تم استلام الاستفسار',
    successText:'شكراً لك. يمكن لمنسق مراجعة استفسارك. لا تزال MMV تعمل على بناء شبكة مقدمي الخدمات، ولا يمكنها ضمان توفر عيادة أو حجز علاج.',
    error:'تعذر إرسال الاستفسار. يرجى المحاولة مرة أخرى.',
    privacy:'إشعار الخصوصية', noHealth:'يرجى عدم إرسال السجلات الطبية أو التشخيصات أو الأعراض أو بيانات جواز السفر أو الدفع.',
    continue:'المتابعة عبر واتساب',
  },
} satisfies Record<Locale, Record<string,string>>

export function LocalizedLeadForm({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const [state, setState] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [error, setError] = useState('')
  const [waUrl, setWaUrl] = useState('')
  const startedAt = useRef(Date.now())
  const rtl = locale === 'ar'

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    const fd = new FormData(e.currentTarget)
    const payload = {
      full_name: String(fd.get('full_name') ?? ''),
      email: String(fd.get('email') ?? ''),
      whatsapp: String(fd.get('whatsapp') ?? ''),
      country: String(fd.get('country') ?? ''),
      treatment_interest: String(fd.get('coordination_topic') ?? ''),
      response_consent: fd.get('response_consent') === 'on',
      marketing_consent: fd.get('marketing_consent') === 'on',
      website: String(fd.get('website') ?? ''),
      _ts: startedAt.current,
    }
    try {
      const result = await capturePublicLead(payload as any)
      if (!result.success) {
        setError(result.error ?? t.error)
        setState('error')
        return
      }
      setWaUrl('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('Hello MMV Medical. I submitted an enquiry and would like to understand the coordination process.'))
      setState('success')
    } catch {
      setError(t.error)
      setState('error')
    }
  }

  if (state === 'success') return <div className="rounded border border-[#d9d4c9] bg-white p-7 text-center" dir={rtl?'rtl':'ltr'}>
    <h2 className="font-display text-2xl font-semibold text-[#12243a]">{t.success}</h2>
    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#536170]">{t.successText}</p>
    <a href={waUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex bg-[#1e8f70] px-5 py-3 text-sm font-semibold text-white">{t.continue}</a>
  </div>

  return <form onSubmit={submit} dir={rtl?'rtl':'ltr'} className="grid gap-4 rounded border border-[#e0dbd0] bg-white p-5 sm:grid-cols-2">
    <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
    <label className="grid gap-1 text-xs font-semibold text-[#536170]">{t.name}<input name="full_name" required minLength={2} maxLength={100} autoComplete="name" className="rounded border border-[#ddd7cb] px-3 py-3 text-sm text-[#12243a]" /></label>
    <label className="grid gap-1 text-xs font-semibold text-[#536170]">{t.country}<select name="country" required defaultValue="" className="rounded border border-[#ddd7cb] bg-white px-3 py-3 text-sm text-[#12243a]"><option value="" disabled>{t.choose}</option>{COUNTRIES.map(c=><option key={c.value} value={c.value}>{countryLabels[locale][c.value]}</option>)}</select></label>
    <label className="grid gap-1 text-xs font-semibold text-[#536170]">{t.email}<input name="email" type="email" required maxLength={254} autoComplete="email" className="rounded border border-[#ddd7cb] px-3 py-3 text-sm text-[#12243a]" /></label>
    <label className="grid gap-1 text-xs font-semibold text-[#536170]">{t.phone}<input name="whatsapp" type="tel" required maxLength={20} autoComplete="tel" className="rounded border border-[#ddd7cb] px-3 py-3 text-sm text-[#12243a]" /></label>
    <label className="grid gap-1 text-xs font-semibold text-[#536170] sm:col-span-2">{t.topic}<select name="coordination_topic" required defaultValue="" className="rounded border border-[#ddd7cb] bg-white px-3 py-3 text-sm text-[#12243a]"><option value="" disabled>{t.choose}</option>{ENQUIRY_TOPICS.map(topic=><option key={topic.value} value={topic.value}>{topicLabels[locale][topic.value]}</option>)}</select></label>
    <div className="space-y-3 rounded bg-[#f7f5f0] p-4 text-xs leading-6 text-[#536170] sm:col-span-2">
      <label className="flex items-start gap-2"><input type="checkbox" name="response_consent" required className="mt-1" /><span>{t.response} <Link href="/privacy-policy" className="underline">{t.privacy}</Link></span></label>
      <label className="flex items-start gap-2"><input type="checkbox" name="marketing_consent" className="mt-1" /><span>{t.marketing}</span></label>
    </div>
    {state==='error'&&<p role="alert" className="text-sm text-red-700 sm:col-span-2">{error}</p>}
    <p className="text-xs leading-5 text-[#7a8289] sm:col-span-2">{t.noHealth}</p>
    <button disabled={state==='loading'} className="bg-[#12243a] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60 sm:col-span-2">{state==='loading'?t.sending:t.send}</button>
  </form>
}
