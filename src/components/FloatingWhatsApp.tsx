'use client';

import { useState } from 'react';

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phone = '905526340919';

  const messages = {
    en: "Hi, I'd like to learn more about dental treatment at Dr. Mat Clinic",
    fr: "Bonjour, je souhaiterais en savoir plus sur les traitements dentaires à la clinique Dr. Mat",
    ar: "مرحبا، أنا مهتم بالعلاج السني في عيادة دكتور مات",
  };

  // Function to track WhatsApp click
  const trackWhatsAppClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-18093103815/eXJgCOT3yJwcEMe1u7ND',
        'value': 1.0,
        'currency': 'TRY'
      });
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] hover:bg-[#128C7E] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
        aria-label="Contact on WhatsApp"
      >
        <span className="text-4xl">💬</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-5 w-72">
          <div className="flex items-center justify-between mb-4 border-b pb-3">
            <p className="text-base font-semibold text-gray-800">Choose your language</p>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">✕</button>
          </div>

          <div className="space-y-1">
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent(messages.en)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-green-50 rounded-xl transition text-gray-700 hover:text-green-700"
              onClick={trackWhatsAppClick}
            >
              🇬🇧 <span className="font-medium">English</span>
            </a>

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent(messages.fr)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-green-50 rounded-xl transition text-gray-700 hover:text-green-700"
              onClick={trackWhatsAppClick}
            >
              🇫🇷 <span className="font-medium">Français</span>
            </a>

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent(messages.ar)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-green-50 rounded-xl transition text-gray-700 hover:text-green-700"
              onClick={trackWhatsAppClick}
            >
              🇸🇦 <span className="font-medium">العربية</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingWhatsApp;
