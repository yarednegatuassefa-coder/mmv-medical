'use client';

const ContactPageWhatsApp = () => {
  const phone = '905526340919';

  const messages = {
    en: "Hi, I saw your Google ad and I'm interested in dental treatment in Istanbul (implants, veneers or smile makeover). Can you send me more information?",
    fr: "Bonjour, j'ai vu votre annonce Google et je suis intéressé par un traitement dentaire à Istanbul (implants, facettes ou sourire complet). Pouvez-vous m'envoyer plus d'informations ?",
    ar: "مرحبا، رأيت إعلانكم على جوجل وأنا مهتم بعلاج أسنان في إسطنبول (زراعة أسنان، فينير أو ابتسامة كاملة). هل يمكنكم إرسال المزيد من المعلومات؟"
  };

  return (
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
          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent(messages.en)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-medium px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all text-lg shadow-lg hover:shadow-xl"
          >
            🇬🇧 English
          </a>

          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent(messages.fr)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-medium px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all text-lg shadow-lg hover:shadow-xl"
          >
            🇫🇷 Français
          </a>

          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent(messages.ar)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-medium px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all text-lg shadow-lg hover:shadow-xl"
          >
            🇸🇦 العربية
          </a>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          💬 Average reply time: within a few hours
        </p>
      </div>
    </div>
  );
};

export default ContactPageWhatsApp;
