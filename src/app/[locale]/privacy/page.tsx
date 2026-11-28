import Link from 'next/link'
import { notFound } from 'next/navigation'

const notices = {
  en: {
    title:'Privacy information for your enquiry',
    intro:'This short notice explains the information used when you contact MMV Medical. It is an operational summary and must be read with the full privacy notice.',
    sections:[['What we collect','Your name, email address, WhatsApp number, country and the non-clinical topic you select. The public form does not ask for diagnoses, symptoms, medical records, identity documents or payment details.'],['Why we use it','To receive and respond to the enquiry you submit. A separate optional checkbox records whether you want occasional marketing updates. It is not required to receive a response.'],['Where it is stored','Enquiry records are stored in MMV’s configured Supabase database. HubSpot contact synchronisation and third-party advertising/visitor tracking are currently disabled while data flows and consent controls are reviewed.'],['Your choices','You can contact hello@mmvmedical.org to ask about information associated with your enquiry or request correction or deletion where applicable. Do not send sensitive documents through an initial email or WhatsApp message.'],['Important limitation','MMV is still developing its provider network. Submitting an enquiry does not mean MMV represents a clinic, can arrange a referral, or can guarantee treatment availability.']],
    full:'Read the full privacy notice', note:'MMV must confirm its legal entity, controller identity, lawful bases, retention schedule, processor agreements and international-transfer safeguards before relying on this notice as final legal advice.',
  },
  fr: {
    title:'Informations sur la confidentialité de votre demande',
    intro:'Cette notice résume l’utilisation des informations lorsque vous contactez MMV Medical. Il s’agit d’un résumé opérationnel à lire avec la notice complète.',
    sections:[['Informations collectées','Votre nom, votre adresse e-mail, votre numéro WhatsApp, votre pays et le sujet non médical sélectionné. Le formulaire public ne demande ni diagnostic, ni symptôme, ni dossier médical, ni document d’identité, ni donnée de paiement.'],['Finalité','Recevoir et traiter la demande que vous envoyez. Une case facultative distincte indique si vous souhaitez recevoir occasionnellement des actualités. Elle n’est pas nécessaire pour obtenir une réponse.'],['Stockage et prestataires','Les demandes sont stockées dans la base Supabase configurée par MMV. La synchronisation des contacts avec HubSpot et les outils tiers de publicité/suivi des visiteurs sont désactivés pendant la vérification des flux de données et des mécanismes de consentement.'],['Vos choix','Vous pouvez écrire à hello@mmvmedical.org pour demander des informations sur votre demande ou solliciter une rectification ou suppression lorsque cela s’applique. N’envoyez pas de documents sensibles dans un premier message par e-mail ou WhatsApp.'],['Limite importante','MMV développe encore son réseau de prestataires. Une demande ne signifie pas que MMV représente une clinique, peut organiser une orientation ou garantit la disponibilité d’un traitement.']],
    full:'Lire la notice complète', note:'MMV doit confirmer son entité juridique, l’identité du responsable du traitement, les bases légales, les durées de conservation, les contrats avec les sous-traitants et les garanties de transfert international avant de considérer cette notice comme définitive.',
  },
  ar: {
    title:'معلومات الخصوصية الخاصة باستفسارك',
    intro:'يوضح هذا الإشعار المختصر كيفية استخدام المعلومات عند التواصل مع MMV Medical. وهو ملخص تشغيلي يُقرأ مع إشعار الخصوصية الكامل.',
    sections:[['المعلومات التي نجمعها','اسمك وبريدك الإلكتروني ورقم واتساب والبلد وموضوع التنسيق غير الطبي الذي تختاره. لا يطلب النموذج العام تشخيصات أو أعراضاً أو سجلات طبية أو وثائق هوية أو بيانات دفع.'],['سبب الاستخدام','استلام الاستفسار الذي ترسله والرد عليه. يوجد خيار منفصل واختياري لتلقي تحديثات تسويقية من حين لآخر، ولا يلزم اختياره للحصول على رد.'],['مكان التخزين','تُخزّن الاستفسارات في قاعدة بيانات Supabase التي تستخدمها MMV. تم إيقاف مزامنة جهات الاتصال مع HubSpot وأدوات الإعلانات وتتبع الزوار التابعة لجهات خارجية أثناء مراجعة تدفقات البيانات وإعدادات الموافقة.'],['خياراتك','يمكنك مراسلة hello@mmvmedical.org للاستفسار عن المعلومات المرتبطة بطلبك أو طلب تصحيحها أو حذفها حيثما ينطبق ذلك. لا ترسل مستندات حساسة في رسالة أولية عبر البريد أو واتساب.'],['حدود الخدمة','لا تزال MMV تعمل على تطوير شبكة مقدمي الخدمات. إرسال استفسار لا يعني أن MMV تمثل عيادة أو تستطيع ترتيب إحالة أو ضمان توفر علاج.']],
    full:'اقرأ إشعار الخصوصية الكامل', note:'يجب على MMV تأكيد الكيان القانوني وهوية مسؤول البيانات والأسس القانونية وفترات الاحتفاظ واتفاقيات معالجة البيانات وضمانات النقل الدولي قبل اعتماد هذا الإشعار بصيغته النهائية.',
  },
} as const

type Locale=keyof typeof notices
export function generateStaticParams(){return [{locale:'en'},{locale:'fr'},{locale:'ar'}]}
export default function LocalizedPrivacyPage({params}:{params:{locale:string}}){
 if(!['en','fr','ar'].includes(params.locale)) notFound()
 const locale=params.locale as Locale
 const t=notices[locale]
 return <main lang={locale} dir={locale==='ar'?'rtl':'ltr'} className="min-h-screen bg-[#f7f5f0] px-5 py-12 text-[#12243a]">
  <div className="mx-auto max-w-3xl">
   <Link href={'/'+locale} className="text-sm font-semibold text-[#a47d37]">MMV Medical</Link>
   <h1 className="mt-8 font-display text-4xl font-semibold">{t.title}</h1>
   <p className="mt-4 text-sm leading-7 text-[#536170]">{t.intro}</p>
   <div className="mt-8 space-y-7">{t.sections.map(([heading,body])=><section key={heading} className="border-t border-[#c8a66a] pt-5"><h2 className="font-display text-2xl font-semibold">{heading}</h2><p className="mt-3 text-sm leading-7 text-[#536170]">{body}</p></section>)}</div>
   <p className="mt-8 rounded bg-white p-4 text-xs leading-6 text-[#687582]">{t.note}</p>
   <Link href="/privacy-policy" className="mt-6 inline-flex text-sm font-semibold text-[#a47d37] underline">{t.full}</Link>
  </div>
 </main>
}
