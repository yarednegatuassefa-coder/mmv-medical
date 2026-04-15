'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';   // You can use any icon, or replace with emoji

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phone = '905526340919';

  const messages = {
    en: "Hi, I'd like to learn more about dental treatment at Dr. Mat Clinic",
    fr: "Bonjour, je souhaiterais en savoir plus sur les traitements dentaires à la clinique Dr. Mat",
    ar: "مرحبا، أنا مهتم بالعلاج السني في معية دكتور مات"
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={toggleMenu}
        onMouseEnter={() => setIsOpen(true)}   // Hover opens on desktop
        className="bg-[#25D366] hover:bg-[#128C7E] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle size={32} />
        {/* Or use emoji: <span className="text-3xl">💬</span> */}
      </button>

      {/* Language Options Menu */}
      {isOpen && (
        <div 
          className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-xl p-4 w-72"
          onMouseLeave={() => setIsOpen(false)}
        >
          <p className="text-sm font-semibold text-gray-700 mb-3 text-center">
            Choose your language
          </p>

          <div className="space-y-2">
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent(messages.en)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-xl transition"
              onClick={() => setIsOpen(false)}
            >
              🇬🇧 <span>English</span>
            </a>

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent(messages.fr)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-xl transition"
              onClick={() => setIsOpen(false)}
            >
              🇫🇷 <span>Français</span>
            </a>

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent(messages.ar)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-xl transition"
              onClick={() => setIsOpen(false)}
            >
              🇸🇦 <span>العربية</span>
            </a>
          </div>

          <p className="text-[10px] text-gray-400 text-center mt-4">
            Message will open in WhatsApp with pre-filled text
          </p>
        </div>
      )}
    </div>
  );
};

export default FloatingWhatsApp;
