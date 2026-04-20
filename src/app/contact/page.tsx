'use client';
import { useState } from 'react';

type Language = 'en' | 'fr' | 'ar';

const ContactPageWhatsApp = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const clinicPhone = '905526340919';

  const messages: Record<Language, string> = {
    en: "Hi, I saw your Google ad and I'm interested in dental treatment in Istanbul (implants, veneers or smile makeover). Can you send me more information?",
    fr: "Bonjour, j'ai vu votre annonce Google et je suis intéressé par un traitement dentaire à Istanbul (implants, facettes ou sourire complet). Pouvez-vous m'envoyer plus d'informations ?",
    ar: "مرحبا، رأيت إعلانكم على جوجل وأنا مهتم بعلاج أسنان في إسطنبول (زراعة أسنان، فينير أو ابتسامة كاملة). هل يمكنكم إرسال المزيد من المعلومات؟"
  };

  const handleLanguageClick = (lang: Language) => {
    setSelectedLang(lang);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          source: 'contact_page_whatsapp',
          language: selectedLang,
          message: messages[selectedLang!],
        }),
      });
    } catch (e) {
      console.error('Lead capture failed:', e);
    }

    // Google Ads tracking
    if (typeof window !== 'undefined') {
      const gtag = (window as any).gtag;
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          send_to: 'AW-18093103815/eXJgCOT3yJwcEMe1u7ND',
          value: 1.0,
          currency: 'TRY',
        });
      }
      if ((window as any)._hsq) {
        (window as any)._hsq.push(['trackEvent', { id: 'whatsapp_click' }]);
      }
    }

    setDone(true);
    setLoading(false);

    setTimeout(() => {
      window.open(
        `https://wa.me/${clinicPhone}?text=${encodeURIComponent(messages[selectedLang!])}`,
        '_blank'
      );
      setShowModal(false);
      setDone(false);
      setName('');
      setPhone('');
      setSelectedLang(null);
    }, 800);
  };

  return (
    <>
      <div className="my-12 bg-green-50 border border-green-200 rounded-3xl p-8 md:p-10 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-white px-5 py-2 rounded-full shadow-sm mb-6">
            <span className="text-3xl">💬</span>
            <span className="font-semibold text-green-700">Instant Response on WhatsApp</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Message us directly on WhatsApp
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            Get fast answers about dental implants, veneers, full arch, or smile makeovers in Istanbul.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {([
              { lang: 'en', flag: '🇬🇧', label: 'English' },
              { lang: 'fr', flag: '🇫🇷', label: 'Français' },
              { lang: 'ar', flag: '🇸🇦', label: 'العربية' },
            ] as { lang: Language; flag: string; label: string }[]).map(({ lang, flag, label }) => (
              <button
                key={lang}
                onClick={() => handleLanguageClick(lang)}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white font-medium px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all text-lg shadow-lg hover:shadow-xl"
              >
                {flag} {label}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-6">
            💬 Average reply time: within a few hours
          </p>
        </div>
      </div>

      {/* Lead Capture Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >✕</button>

            <div className="flex items-center gap-3 mb-5">
              <div className="bg-[#25D366] rounded-full w-10 h-10 flex items-center justify-center text-xl">
                💬
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">One quick step</h3>
                <p className="text-xs text-gray-500">So we can follow up on your treatment</p>
              </div>
            </div>

            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="tel"
              placeholder="Your phone number (with country code)"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              onClick={handleSubmit}
              disabled={loading || done || !name.trim() || !phone.trim()}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-all"
            >
              {done ? '✅ Opening WhatsApp...' : loading ? 'Saving...' : 'Continue to WhatsApp →'}
            </button>

            <p className="text-xs text-gray-400 text-center mt-3">
              We'll never spam you. This helps us prepare your treatment plan.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactPageWhatsApp;
