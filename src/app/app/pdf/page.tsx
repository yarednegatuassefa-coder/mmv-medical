"use client";

import { useState } from "react";

const CURRENCIES: Record<string, string> = {
  "United Kingdom": "GBP",
  "Ireland": "EUR",
  "Netherlands": "EUR",
  "Belgium": "EUR",
  "Denmark": "DKK",
  "Norway": "NOK",
  "Sweden": "SEK",
  "Albania": "EUR",
  "Romania": "EUR",
  "Germany": "EUR",
  "France": "EUR",
  "Somalia diaspora (UK)": "GBP",
};

const BRANDS = [
  "Macros", "Implant Swiss", "Medigma", "Neodent",
  "Medentika", "Nobel Biocare", "Straumann", ""
];

const COUNTRIES = Object.keys(CURRENCIES);

type Treatment = {
  name: string;
  brand: string;
  units: number;
  unit_price: number;
};

const emptyTreatment = (): Treatment => ({
  name: "", brand: "Straumann", units: 1, unit_price: 0,
});

export default function PDFGeneratorPage() {
  const [name,       setName]       = useState("");
  const [refId,      setRefId]      = useState(`MMV-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-001`);
  const [country,    setCountry]    = useState("Netherlands");
  const [depositPct, setDepositPct] = useState(60);
  const [notes,      setNotes]      = useState("");
  const [treatments, setTreatments] = useState<Treatment[]>([emptyTreatment()]);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");

  const currency = CURRENCIES[country] || "EUR";

  function addRow() {
    setTreatments(t => [...t, emptyTreatment()]);
  }

  function removeRow(i: number) {
    setTreatments(t => t.filter((_, idx) => idx !== i));
  }

  function updateRow(i: number, field: keyof Treatment, value: any) {
    setTreatments(t => t.map((row, idx) => idx === i ? { ...row, [field]: value } : row));
  }

  const grandTotal = treatments.reduce((s, t) => s + t.units * t.unit_price, 0);
  const deposit    = grandTotal * depositPct / 100;
  const balance    = grandTotal - deposit;

  async function generate() {
    if (!name || treatments.every(t => !t.name)) {
      setError("Patient name and at least one treatment are required.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, ref_id: refId, country, currency,
          deposit_pct: depositPct, notes,
          treatments: treatments.filter(t => t.name),
        }),
      });

      if (!res.ok) throw new Error("Failed to generate PDF");

      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `MMV_TreatmentPlan_${name.replace(/\s+/g, "_")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inp = "bg-[#1e2b1e] border border-white/[0.08] rounded px-3 py-2 text-sm text-[#d4e4d4] outline-none focus:border-[#3dd68c]/40 w-full";
  const lbl = "block text-[10px] font-mono uppercase tracking-wider text-[#6b8f6b] mb-1.5";

  return (
    <div className="p-6 max-w-3xl space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white mb-1">Treatment Plan Generator</h1>
        <p className="text-sm text-[#6b8f6b]">Fill in patient details and download a branded PDF instantly.</p>
      </div>

      {/* Patient Info */}
      <div className="bg-[#111a14] border border-white/[0.06] rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-white/[0.06]">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b]">Patient Details</div>
        </div>
        <div className="p-4 grid grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Patient Name</label>
            <input className={inp} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Niels van der Berg" />
          </div>
          <div>
            <label className={lbl}>Reference ID</label>
            <input className={inp} value={refId} onChange={e => setRefId(e.target.value)} />
          </div>
          <div>
            <label className={lbl}>Country</label>
            <select className={inp} value={country} onChange={e => setCountry(e.target.value)}>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Currency</label>
            <input className={`${inp} opacity-50 cursor-not-allowed`} value={currency} readOnly />
          </div>
          <div>
            <label className={lbl}>Deposit % (Visit 1)</label>
            <select className={inp} value={depositPct} onChange={e => setDepositPct(Number(e.target.value))}>
              <option value={50}>50%</option>
              <option value={60}>60%</option>
              <option value={70}>70%</option>
            </select>
          </div>
        </div>
      </div>

      {/* Treatments */}
      <div className="bg-[#111a14] border border-white/[0.06] rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b]">Treatments</div>
          <button onClick={addRow} className="text-xs text-[#3dd68c] hover:underline">+ Add row</button>
        </div>
        <div className="p-4 space-y-3">
          {treatments.map((t, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-4">
                {i === 0 && <label className={lbl}>Treatment</label>}
                <input className={inp} value={t.name} onChange={e => updateRow(i, "name", e.target.value)} placeholder="e.g. Dental Implant" />
              </div>
              <div className="col-span-3">
                {i === 0 && <label className={lbl}>Brand</label>}
                <select className={inp} value={t.brand} onChange={e => updateRow(i, "brand", e.target.value)}>
                  {BRANDS.map(b => <option key={b} value={b}>{b || "—"}</option>)}
                </select>
              </div>
              <div className="col-span-1">
                {i === 0 && <label className={lbl}>Units</label>}
                <input className={inp} type="number" min={1} value={t.units} onChange={e => updateRow(i, "units", Number(e.target.value))} />
              </div>
              <div className="col-span-2">
                {i === 0 && <label className={lbl}>Unit Price</label>}
                <input className={inp} type="number" min={0} value={t.unit_price} onChange={e => updateRow(i, "unit_price", Number(e.target.value))} placeholder="0" />
              </div>
              <div className="col-span-1">
                {i === 0 && <label className={lbl}>Total</label>}
                <div className="text-sm text-[#d4a84b] font-mono py-2">{currency} {(t.units * t.unit_price).toLocaleString()}</div>
              </div>
              <div className="col-span-1 flex justify-center">
                {i === 0 && <label className={lbl}>&nbsp;</label>}
                {treatments.length > 1 && (
                  <button onClick={() => removeRow(i)} className="text-[#e05252] text-xs hover:opacity-70">✕</button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="px-4 pb-4 border-t border-white/[0.06] pt-3 space-y-1 text-right">
          <div className="text-sm font-bold text-white">Total: <span className="text-[#d4a84b] font-mono">{currency} {grandTotal.toLocaleString()}</span></div>
          <div className="text-xs text-[#6b8f6b]">Deposit Visit 1 ({depositPct}%): <span className="text-[#d4e4d4] font-mono">{currency} {deposit.toLocaleString()}</span></div>
          <div className="text-xs text-[#6b8f6b]">Balance Visit 2 ({100 - depositPct}%): <span className="text-[#d4e4d4] font-mono">{currency} {balance.toLocaleString()}</span></div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-[#111a14] border border-white/[0.06] rounded-lg p-4">
        <label className={lbl}>Notes (optional)</label>
        <textarea className={inp} rows={3} value={notes} onChange={e => setNotes(e.target.value)}
          placeholder="e.g. Patient prefers Straumann. Visit 1 scheduled for July 2026. Hotel: Ramada Encore." />
      </div>

      {error && <div className="text-xs text-[#e05252] bg-[#e05252]/10 border border-[#e05252]/20 rounded px-4 py-3">{error}</div>}

      <button onClick={generate} disabled={loading}
        className="w-full bg-[#3dd68c] text-[#0d1117] font-semibold text-sm py-3 rounded-lg hover:bg-[#52e09e] transition-colors disabled:opacity-40">
        {loading ? "Generating PDF..." : "Download Treatment Plan PDF"}
      </button>
    </div>
  );
}
