'use client';
import { useState } from 'react';

type Language = 'en' | 'fr' | 'ar';

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleLanguageClick = (lang: Language) => {
    setSelectedLang(lang);
    setIsOpen(false);
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
          source: 'whatsapp_button',
          language: selectedLang,
        }),
      });
    } catch (e) {
      console.error('Lead capture failed:', e);
    }

    setDone(true);
    setLoading(false);

    setTimeout(() => {
      setShowModal(false);
      setDone(false);
      setName('');
      setPhone('');
      setSelectedLang(null);
    }, 2000);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Floating Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
          aria-label="Contact on WhatsApp"
        >
          <span className="text-4xl">💬</span>
        </button>

        {/* Language Menu */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-5 w-72">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <p className="text-base font-semibold text-gray-800">
                Choose your language
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >✕</button>
            </div>
            <div className="space-y-1">
              {([
                { lang: 'en', flag: '🇬🇧', label: 'English' },
                { lang: 'fr', flag: '🇫🇷', label: 'Français' },
                { lang: 'ar', flag: '🇸🇦', label: 'العربية' },
              ] as { lang: Language; flag: string; label: string }[]).map(({ lang, flag, label }) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageClick(lang)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-green-50 rounded-xl transition text-gray-700 hover:text-green-700"
                >
                  {flag} <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center mt-5">
              Leave your details and we'll reach out to you
            </p>
          </div>
        )}
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
              {done ? '✅ Received! We\'ll be in touch soon.' : loading ? 'Saving...' : 'Send Request →'}
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

export default FloatingWhatsApp;
