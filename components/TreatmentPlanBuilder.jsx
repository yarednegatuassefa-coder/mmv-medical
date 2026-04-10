'use client';

/**
 * MMV Medical CRM — Treatment Plan Builder
 * No external PDF library needed.
 *
 * Usage:
 *   /app/crm/patients/[id]/treatment-plan/page.jsx
 *   <TreatmentPlanBuilder patientId={params.id} />
 */

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client'; // adjust if your path differs
import { generateTreatmentPlanPDF } from '@/utils/generateTreatmentPlanPDF';

// ─── Brand colors ─────────────────────────────────────────────
const C = {
  teal:    '#1B9CC4',
  tealBg:  '#EAF7FB',
  dark:    '#1A3A4A',
  grey:    '#6B7E88',
  border:  '#D0E9F0',
  white:   '#FFFFFF',
  red:     '#E53E3E',
  green:   '#38A169',
};

const fmt = (val) =>
  `€${Number(val || 0).toLocaleString('en-IE', { minimumFractionDigits: 2 })}`;

const CATEGORY_LABELS = {
  implant:      '🦷 Implant',
  crown:        '👑 Crown',
  diagnostic:   '🔬 Diagnostic',
  consultation: '💬 Consultation',
  other:        '➕ Other',
};

// ─── Component ────────────────────────────────────────────────
export default function TreatmentPlanBuilder({ patientId }) {
  const supabase = createClient();

  const [patient,     setPatient]     = useState(null);
  const [treatments,  setTreatments]  = useState([]);
  const [plan,        setPlan]        = useState({
    plan_name:   'Treatment Plan',
    notes:       '',
    created_by:  '',
    valid_until: '',
    status:      'draft',
  });
  const [items,       setItems]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [saving,      setSaving]      = useState(false);
  const [savedPlanId, setSavedPlanId] = useState(null);
  const [toast,       setToast]       = useState(null);

  // ── Load data ───────────────────────────────────────────────
  useEffect(() => {
    if (!patientId) return;
    const load = async () => {
      setLoading(true);
      try {
        const [{ data: pt }, { data: tx }] = await Promise.all([
          supabase.from('leads').select('*').eq('id', patientId).single(),
          supabase.from('treatments').select('*').eq('active', true).order('category').order('name'),
        ]);
        setPatient(pt || {});
        setTreatments(tx || []);
      } catch {
        showToast('Failed to load data', 'error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [patientId]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Add treatment ────────────────────────────────────────────
  const addItem = (treatment) => {
    setItems((prev) => {
      const existing = prev.findIndex((i) => i.treatment_id === treatment.id);
      if (existing >= 0) {
        return prev.map((i, idx) =>
          idx === existing
            ? { ...i, quantity: i.quantity + 1, subtotal_eur: (i.quantity + 1) * i.unit_price_eur }
            : i
        );
      }
      return [...prev, {
        treatment_id:   treatment.id,
        custom_name:    treatment.name,
        brand:          treatment.brand,
        quantity:       1,
        unit_price_eur: treatment.price_eur,
        subtotal_eur:   treatment.price_eur,
        treatment,
      }];
    });
  };

  const updateQty = (idx, qty) => {
    const q = Math.max(1, parseInt(qty) || 1);
    setItems((prev) => prev.map((i, n) =>
      n === idx ? { ...i, quantity: q, subtotal_eur: q * i.unit_price_eur } : i
    ));
  };

  const updatePrice = (idx, price) => {
    const p = parseFloat(price) || 0;
    setItems((prev) => prev.map((i, n) =>
      n === idx ? { ...i, unit_price_eur: p, subtotal_eur: i.quantity * p } : i
    ));
  };

  const removeItem = (idx) => setItems((prev) => prev.filter((_, n) => n !== idx));

  const total = items.reduce((s, i) => s + Number(i.subtotal_eur), 0);

  // ── Save to Supabase ─────────────────────────────────────────
  const savePlan = async () => {
    if (items.length === 0) { showToast('Add at least one treatment first', 'error'); return; }
    setSaving(true);
    try {
      const { data: saved, error: planErr } = await supabase
        .from('treatment_plans')
        .upsert({
          ...(savedPlanId ? { id: savedPlanId } : {}),
          patient_id:  patientId,
          plan_name:   plan.plan_name,
          notes:       plan.notes,
          created_by:  plan.created_by,
          valid_until: plan.valid_until || null,
          status:      plan.status,
          total_eur:   total,
        })
        .select()
        .single();

      if (planErr) throw planErr;
      setSavedPlanId(saved.id);

      await supabase.from('treatment_plan_items').delete().eq('plan_id', saved.id);

      const { error: itemsErr } = await supabase.from('treatment_plan_items').insert(
        items.map((i, idx) => ({
          plan_id:        saved.id,
          treatment_id:   i.treatment_id || null,
          custom_name:    i.custom_name,
          quantity:       i.quantity,
          unit_price_eur: i.unit_price_eur,
          sort_order:     idx,
        }))
      );
      if (itemsErr) throw itemsErr;

      showToast('Plan saved ✓');
    } catch (e) {
      showToast(e.message || 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Generate PDF ─────────────────────────────────────────────
  const handlePDF = () => {
    if (items.length === 0) { showToast('Add treatments before generating PDF', 'error'); return; }
    generateTreatmentPlanPDF({
      patient,
      plan: { ...plan, id: savedPlanId },
      items,
    });
  };

  // ── Grouped catalogue ────────────────────────────────────────
  const grouped = treatments.reduce((acc, t) => {
    const cat = t.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(t);
    return acc;
  }, {});

  // ── Render ───────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={s.loadingWrap}>
        <div style={s.spinner} />
        <p style={{ color: C.grey, marginTop: 12 }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={s.root}>

      {/* Toast */}
      {toast && (
        <div style={{ ...s.toast, backgroundColor: toast.type === 'error' ? C.red : C.green }}>
          {toast.msg}
        </div>
      )}

      {/* Page Header */}
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>Treatment Plan Builder</h1>
          <p style={s.pageSub}>
            Patient: <strong>{patient?.full_name || 'Unknown'}</strong>
            {patient?.country ? ` · ${patient.country}` : ''}
            {patient?.email   ? ` · ${patient.email}`   : ''}
          </p>
        </div>
        <div style={s.headerActions}>
          <button style={s.btnSave} onClick={savePlan} disabled={saving}>
            {saving ? 'Saving...' : '💾 Save Plan'}
          </button>
          <button style={s.btnPDF} onClick={handlePDF}>
            📄 Generate PDF
          </button>
        </div>
      </div>

      {/* Layout */}
      <div style={s.layout}>

        {/* Sidebar — Treatments Catalogue */}
        <aside style={s.sidebar}>
          <h2 style={s.sidebarTitle}>Treatments Catalogue</h2>
          <p style={s.sidebarSub}>Click any item to add it to the plan</p>

          {Object.entries(grouped).map(([cat, txList]) => (
            <div key={cat} style={s.catGroup}>
              <div style={s.catLabel}>{CATEGORY_LABELS[cat] || cat}</div>
              {txList.map((t) => (
                <button key={t.id} style={s.treatmentBtn} onClick={() => addItem(t)}>
                  <div style={s.treatmentBtnLeft}>
                    <span style={s.treatmentName}>{t.name}</span>
                    {t.brand && <span style={s.treatmentBrand}>{t.brand}</span>}
                  </div>
                  <span style={s.treatmentPrice}>{fmt(t.price_eur)}</span>
                </button>
              ))}
            </div>
          ))}
        </aside>

        {/* Main */}
        <main style={s.main}>

          {/* Plan Meta */}
          <div style={s.metaGrid}>
            {[
              { label: 'Plan Name',   key: 'plan_name',   type: 'text',   placeholder: 'e.g. Full Mouth Restoration' },
              { label: 'Prepared By', key: 'created_by',  type: 'text',   placeholder: 'Your name' },
              { label: 'Valid Until', key: 'valid_until', type: 'date',   placeholder: '' },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key} style={s.field}>
                <label style={s.label}>{label}</label>
                <input
                  style={s.input}
                  type={type}
                  placeholder={placeholder}
                  value={plan[key]}
                  onChange={(e) => setPlan({ ...plan, [key]: e.target.value })}
                />
              </div>
            ))}
            <div style={s.field}>
              <label style={s.label}>Status</label>
              <select
                style={s.input}
                value={plan.status}
                onChange={(e) => setPlan({ ...plan, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="sent">Sent to Patient</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Items Table */}
          <div style={s.tableWrap}>
            {items.length === 0 ? (
              <div style={s.emptyState}>
                <span style={{ fontSize: 36 }}>🦷</span>
                <p style={{ color: C.grey, marginTop: 10 }}>
                  No treatments added yet — click items from the left panel.
                </p>
              </div>
            ) : (
              <table style={s.table}>
                <thead>
                  <tr>
                    {['#', 'Treatment', 'Brand', 'Qty', 'Unit Price (€)', 'Subtotal', ''].map((h) => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx} style={idx % 2 === 0 ? s.trEven : s.trOdd}>
                      <td style={s.td}>{idx + 1}</td>
                      <td style={{ ...s.td, fontWeight: 600 }}>{item.custom_name}</td>
                      <td style={s.td}>{item.brand || '—'}</td>
                      <td style={s.td}>
                        <input
                          style={s.qtyInput}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQty(idx, e.target.value)}
                        />
                      </td>
                      <td style={s.td}>
                        <input
                          style={s.priceInput}
                          type="number"
                          min="0"
                          step="10"
                          value={item.unit_price_eur}
                          onChange={(e) => updatePrice(idx, e.target.value)}
                        />
                      </td>
                      <td style={{ ...s.td, fontWeight: 700, color: C.teal }}>
                        {fmt(item.subtotal_eur)}
                      </td>
                      <td style={s.td}>
                        <button style={s.removeBtn} onClick={() => removeItem(idx)}>✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Total */}
          {items.length > 0 && (
            <div style={s.totalBar}>
              <span style={s.totalLabel}>TOTAL</span>
              <span style={s.totalValue}>{fmt(total)}</span>
            </div>
          )}

          {/* Notes */}
          <div style={{ marginTop: 20 }}>
            <label style={s.label}>Clinical Notes (optional — appears on PDF)</label>
            <textarea
              style={s.textarea}
              rows={3}
              placeholder="e.g. Patient prefers Nobel implants. Upper jaw only. Full assessment required on arrival."
              value={plan.notes}
              onChange={(e) => setPlan({ ...plan, notes: e.target.value })}
            />
          </div>

          {/* Action Bar */}
          <div style={s.actionBar}>
            <button style={s.btnSave} onClick={savePlan} disabled={saving}>
              {saving ? 'Saving...' : '💾 Save Plan'}
            </button>
            <button style={s.btnPDF} onClick={handlePDF}>
              📄 Generate PDF
            </button>
            <p style={{ color: C.grey, fontSize: 12, margin: 0 }}>
              Generate PDF opens a print preview — choose "Save as PDF" in the print dialog.
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────
const s = {
  root: {
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    backgroundColor: '#F4F8FA',
    minHeight: '100vh',
    padding: '24px',
  },
  loadingWrap: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', height: '60vh',
  },
  spinner: {
    width: 36, height: 36,
    border: '3px solid #D0E9F0',
    borderTop: '3px solid #1B9CC4',
    borderRadius: '50%',
  },
  toast: {
    position: 'fixed', top: 20, right: 20, zIndex: 1000,
    padding: '10px 20px', borderRadius: 8,
    color: '#fff', fontWeight: 600, fontSize: 14,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  pageHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    backgroundColor: '#1A3A4A', padding: '20px 28px',
    borderRadius: 12, marginBottom: 24,
  },
  pageTitle:     { fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 },
  pageSub:       { fontSize: 13, color: '#8EB8CC', margin: '4px 0 0' },
  headerActions: { display: 'flex', gap: 10 },
  layout:        { display: 'flex', gap: 20, alignItems: 'flex-start' },
  sidebar: {
    width: 260, flexShrink: 0,
    backgroundColor: '#fff', borderRadius: 12,
    padding: 16, border: '1px solid #D0E9F0',
    maxHeight: '80vh', overflowY: 'auto',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  sidebarTitle: { fontSize: 14, fontWeight: 700, color: '#1A3A4A', margin: '0 0 2px' },
  sidebarSub:   { fontSize: 11, color: '#6B7E88', marginBottom: 14 },
  catGroup:     { marginBottom: 14 },
  catLabel: {
    fontSize: 10, fontWeight: 700, color: '#1B9CC4',
    letterSpacing: 1, textTransform: 'uppercase',
    marginBottom: 6, padding: '4px 0',
    borderBottom: '1px solid #D0E9F0',
  },
  treatmentBtn: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    width: '100%', padding: '7px 10px', marginBottom: 4,
    border: '1px solid #D0E9F0', borderRadius: 6,
    backgroundColor: '#EAF7FB', cursor: 'pointer', textAlign: 'left',
  },
  treatmentBtnLeft: { display: 'flex', flexDirection: 'column' },
  treatmentName:    { fontSize: 11, fontWeight: 600, color: '#1A3A4A' },
  treatmentBrand:   { fontSize: 10, color: '#6B7E88', marginTop: 1 },
  treatmentPrice:   { fontSize: 11, fontWeight: 700, color: '#1B9CC4', flexShrink: 0 },
  main:    { flex: 1 },
  metaGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: 12, marginBottom: 20,
  },
  field:   { display: 'flex', flexDirection: 'column', gap: 4 },
  label:   { fontSize: 11, fontWeight: 600, color: '#6B7E88', letterSpacing: 0.5 },
  input: {
    padding: '8px 10px', fontSize: 13,
    border: '1px solid #D0E9F0', borderRadius: 6,
    backgroundColor: '#fff', color: '#1A3A4A', outline: 'none',
  },
  tableWrap: {
    backgroundColor: '#fff', borderRadius: 12,
    border: '1px solid #D0E9F0', overflow: 'hidden', marginBottom: 12,
  },
  emptyState: {
    padding: 40, textAlign: 'center',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
  },
  table:  { width: '100%', borderCollapse: 'collapse' },
  th: {
    padding: '10px 14px', textAlign: 'left',
    fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
    backgroundColor: '#1A3A4A', color: '#fff',
  },
  td:     { padding: '9px 14px', fontSize: 13, color: '#1A3A4A' },
  trEven: { backgroundColor: '#fff' },
  trOdd:  { backgroundColor: '#EAF7FB' },
  qtyInput: {
    width: 50, padding: '4px 6px', fontSize: 12,
    border: '1px solid #D0E9F0', borderRadius: 4, textAlign: 'center',
  },
  priceInput: {
    width: 80, padding: '4px 6px', fontSize: 12,
    border: '1px solid #D0E9F0', borderRadius: 4,
  },
  removeBtn: {
    background: 'none', border: 'none',
    cursor: 'pointer', color: '#E53E3E', fontWeight: 700, fontSize: 14,
  },
  totalBar: {
    display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
    gap: 16, backgroundColor: '#1A3A4A',
    padding: '12px 20px', borderRadius: 8, marginBottom: 16,
  },
  totalLabel: { fontSize: 12, fontWeight: 700, letterSpacing: 2, color: '#8EB8CC' },
  totalValue: { fontSize: 22, fontWeight: 700, color: '#fff' },
  textarea: {
    width: '100%', padding: '10px 12px', fontSize: 13,
    border: '1px solid #D0E9F0', borderRadius: 6,
    backgroundColor: '#fff', color: '#1A3A4A',
    resize: 'vertical', outline: 'none', boxSizing: 'border-box',
  },
  actionBar: {
    display: 'flex', alignItems: 'center', gap: 12, marginTop: 20,
    padding: '16px 0', borderTop: '1px solid #D0E9F0',
  },
  btnSave: {
    padding: '10px 22px', backgroundColor: '#1B9CC4',
    color: '#fff', border: 'none', borderRadius: 8,
    fontWeight: 700, fontSize: 14, cursor: 'pointer',
  },
  btnPDF: {
    padding: '10px 22px', backgroundColor: '#1A3A4A',
    color: '#fff', border: 'none', borderRadius: 8,
    fontWeight: 700, fontSize: 14, cursor: 'pointer',
  },
};
