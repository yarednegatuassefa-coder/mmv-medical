"use client";

import { useState } from "react";

const LANGUAGES: Record<string, string> = {
  "Netherlands": "Dutch",
  "Belgium (Dutch)": "Dutch (Belgian)",
  "Belgium (French)": "French",
  "United Kingdom": "English",
  "Ireland": "English",
  "Denmark": "Danish",
  "Norway": "Norwegian",
  "Sweden": "Swedish",
  "Albania": "Albanian",
  "Romania": "Romanian",
  "Germany": "German",
  "France": "French",
  "Somalia diaspora (UK)": "English",
};

const STAGES = [
  { id: "first_contact",    label: "First contact" },
  { id: "photos_received",  label: "Photos received" },
  { id: "plan_sent",        label: "Plan sent" },
  { id: "follow_up",        label: "Follow-up" },
  { id: "booking",          label: "Booking / deposit" },
  { id: "pre_arrival",      label: "Pre-arrival" },
  { id: "post_treatment",   label: "Post-treatment" },
];

export default function CommsGenerator() {
  const [name,      setName]      = useState("");
  const [country,   setCountry]   = useState("Netherlands");
  const [treatment, setTreatment] = useState("");
  const [price,     setPrice]     = useState("");
  const [stage,     setStage]     = useState("first_contact");
  const [context,   setContext]   = useState("");
  const [message,   setMessage]   = useState("");
  const [loading,   setLoading]   = useState(false);
  const [copied,    setCopied]    = useState(false);
  const [error,     setError]     = useState("");

  async function generate() {
    if (!name || !country || !stage) return;
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, country, treatment, price, stage, context }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setMessage(data.message);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!message) return;
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const lang = LANGUAGES[country] || "English";

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">WhatsApp message generator</h1>
          <p className="text-sm text-gray-500 mt-0.5">AI-drafted — you review, edit, send</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
          {lang}
        </span>
      </div>

      {/* Patient details */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Patient details</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">First name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Niels"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Country / market</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(LANGUAGES).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Treatment</label>
            <input
              type="text"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              placeholder="e.g. 4 implants + zirconia crowns"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Quote / price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. EUR 3,600 total"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Pipeline stage */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Pipeline stage</p>
        <div className="flex flex-wrap gap-2">
          {STAGES.map((s) => (
            <button
              key={s.id}
              onClick={() => setStage(s.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                stage === s.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Context */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Extra context
        </label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g. patient expressed cost concerns, asked about hotel, mentioned fear of dentists..."
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-400 mt-1">Any nuance helps the AI match tone perfectly.</p>
      </div>

      {/* Generate button */}
      <button
        onClick={generate}
        disabled={loading || !name}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm py-3 rounded-xl transition-colors"
      >
        {loading ? "Generating..." : "Generate message"}
      </button>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* Output */}
      {message && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Generated message</p>
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-900 whitespace-pre-wrap leading-relaxed font-mono">
            {message}
          </div>
          <div className="flex gap-3">
            <button
              onClick={copy}
              className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2 rounded-lg transition-colors"
            >
              {copied ? "Copied!" : "Copy message"}
            </button>
            <button
              onClick={generate}
              className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium py-2 rounded-lg transition-colors"
            >
              Regenerate
            </button>
          </div>
          <p className="text-xs text-gray-400">{message.length} characters</p>
        </div>
      )}
    </div>
  );
}
