/**
 * MMV Medical — Treatment Plan PDF Generator
 * No library needed. Opens a print-ready page in the browser.
 * User clicks Print → Save as PDF.
 */

const fmt = (val) =>
  `€${Number(val || 0).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const today = () =>
  new Date().toLocaleDateString('en-IE', { day: '2-digit', month: 'long', year: 'numeric' });

export function generateTreatmentPlanPDF({ patient = {}, plan = {}, items = [] }) {
  const subtotal  = items.reduce((s, i) => s + Number(i.subtotal_eur || i.quantity * i.unit_price_eur), 0);
  const refCode   = `MMV-${(plan.id || 'DRAFT').toString().slice(0, 8).toUpperCase()}`;
  const validUntil = plan.valid_until
    ? new Date(plan.valid_until).toLocaleDateString('en-IE', { day: '2-digit', month: 'long', year: 'numeric' })
    : '30 days from issue date';

  const rows = items.map((item, idx) => {
    const name     = item.custom_name || item.treatment?.name || 'Treatment';
    const brand    = item.brand || item.treatment?.brand || '—';
    const qty      = item.quantity || 1;
    const unit     = Number(item.unit_price_eur || 0);
    const subtotal = Number(item.subtotal_eur || qty * unit);
    const bg       = idx % 2 === 0 ? '#ffffff' : '#EAF7FB';
    return `
      <tr style="background:${bg}">
        <td style="padding:10px 14px;color:#1A3A4A;font-size:13px;">${idx + 1}</td>
        <td style="padding:10px 14px;color:#1A3A4A;font-size:13px;font-weight:600;">${name}</td>
        <td style="padding:10px 14px;color:#6B7E88;font-size:13px;">${brand}</td>
        <td style="padding:10px 14px;color:#1A3A4A;font-size:13px;text-align:center;">${qty}</td>
        <td style="padding:10px 14px;color:#1A3A4A;font-size:13px;text-align:right;">${fmt(unit)}</td>
        <td style="padding:10px 14px;color:#1B9CC4;font-size:13px;font-weight:700;text-align:right;">${fmt(subtotal)}</td>
      </tr>`;
  }).join('');

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>MMV Medical – Treatment Plan – ${patient.full_name || 'Patient'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #ffffff;
      color: #1A3A4A;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
      @page { margin: 0; size: A4; }
    }
  </style>
</head>
<body>

  <!-- PRINT BUTTON (hidden when printing) -->
  <div class="no-print" style="
    position:fixed; top:0; left:0; right:0;
    background:#1A3A4A; padding:12px 24px;
    display:flex; align-items:center; justify-content:space-between;
    z-index:999;
  ">
    <span style="color:#4ED8F0;font-size:13px;font-weight:600;letter-spacing:1px;">
      MMV MEDICAL — TREATMENT PLAN READY
    </span>
    <button onclick="window.print()" style="
      background:#1B9CC4; color:#fff; border:none;
      padding:10px 24px; border-radius:6px;
      font-size:14px; font-weight:700; cursor:pointer;
      letter-spacing:0.5px;
    ">
      📄 Save as PDF / Print
    </button>
  </div>

  <!-- PAGE -->
  <div style="max-width:794px; margin:0 auto; padding-top:60px;">
  <div class="no-print" style="height:10px;"></div>

    <!-- HEADER -->
    <div style="
      background:#1A3A4A; padding:28px 40px;
      display:flex; justify-content:space-between; align-items:center;
    ">
      <div>
        <div style="font-size:24px;font-weight:800;color:#ffffff;letter-spacing:3px;">MMV MEDICAL</div>
        <div style="font-size:9px;color:#4ED8F0;letter-spacing:4px;margin-top:4px;">DENTAL EXCELLENCE · ISTANBUL</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:15px;font-weight:700;color:#ffffff;letter-spacing:1px;">TREATMENT PLAN</div>
        <div style="font-size:10px;color:#4ED8F0;margin-top:4px;letter-spacing:1px;">REF: ${refCode}</div>
        <div style="font-size:10px;color:#8EB8CC;margin-top:2px;">DATE: ${today()}</div>
      </div>
    </div>

    <!-- TEAL STRIPE -->
    <div style="height:4px;background:#1B9CC4;"></div>

    <!-- BODY -->
    <div style="padding:30px 40px;">

      <!-- INFO CARDS -->
      <div style="display:flex;gap:16px;margin-bottom:28px;">

        <div style="
          flex:1; background:#EAF7FB; border-radius:8px;
          padding:16px; border-left:3px solid #1B9CC4;
        ">
          <div style="font-size:9px;font-weight:700;color:#1B9CC4;letter-spacing:2px;margin-bottom:10px;text-transform:uppercase;">
            Patient Information
          </div>
          ${[
            ['Name',    patient.full_name || '—'],
            ['Country', patient.country   || '—'],
            ['Email',   patient.email     || '—'],
            ['Phone',   patient.phone     || '—'],
          ].map(([l, v]) => `
            <div style="display:flex;margin-bottom:5px;">
              <span style="font-size:11px;color:#6B7E88;width:70px;flex-shrink:0;">${l}</span>
              <span style="font-size:11px;font-weight:600;color:#1A3A4A;">${v}</span>
            </div>`).join('')}
        </div>

        <div style="
          flex:1; background:#EAF7FB; border-radius:8px;
          padding:16px; border-left:3px solid #1B9CC4;
        ">
          <div style="font-size:9px;font-weight:700;color:#1B9CC4;letter-spacing:2px;margin-bottom:10px;text-transform:uppercase;">
            Plan Details
          </div>
          ${[
            ['Plan',       plan.plan_name    || 'Treatment Plan'],
            ['Prepared by',plan.created_by   || 'MMV Medical Team'],
            ['Issue Date', today()],
            ['Valid Until',validUntil],
          ].map(([l, v]) => `
            <div style="display:flex;margin-bottom:5px;">
              <span style="font-size:11px;color:#6B7E88;width:80px;flex-shrink:0;">${l}</span>
              <span style="font-size:11px;font-weight:600;color:#1A3A4A;">${v}</span>
            </div>`).join('')}
        </div>

      </div>

      <!-- TREATMENTS HEADING -->
      <div style="font-size:9px;font-weight:700;color:#1B9CC4;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">
        Recommended Treatments
      </div>

      <!-- TABLE -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;border-radius:8px;overflow:hidden;">
        <thead>
          <tr style="background:#1A3A4A;">
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:#fff;letter-spacing:1px;">#</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:#fff;letter-spacing:1px;">Treatment</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:#fff;letter-spacing:1px;">Brand</th>
            <th style="padding:10px 14px;text-align:center;font-size:11px;font-weight:700;color:#fff;letter-spacing:1px;">Qty</th>
            <th style="padding:10px 14px;text-align:right;font-size:11px;font-weight:700;color:#fff;letter-spacing:1px;">Unit Price</th>
            <th style="padding:10px 14px;text-align:right;font-size:11px;font-weight:700;color:#fff;letter-spacing:1px;">Subtotal</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <!-- TOTALS -->
      <div style="display:flex;justify-content:flex-end;margin-bottom:28px;">
        <div style="width:240px;border:1px solid #D0E9F0;border-radius:8px;overflow:hidden;">
          <div style="display:flex;justify-content:space-between;padding:9px 14px;border-bottom:1px solid #D0E9F0;">
            <span style="font-size:12px;color:#6B7E88;">Subtotal</span>
            <span style="font-size:12px;font-weight:600;color:#1A3A4A;">${fmt(subtotal)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:9px 14px;border-bottom:1px solid #D0E9F0;">
            <span style="font-size:12px;color:#6B7E88;">VAT / Tax</span>
            <span style="font-size:12px;font-weight:600;color:#1A3A4A;">Included</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:12px 14px;background:#1B9CC4;">
            <span style="font-size:13px;font-weight:700;color:#fff;letter-spacing:1px;">TOTAL</span>
            <span style="font-size:13px;font-weight:700;color:#fff;">${fmt(subtotal)}</span>
          </div>
        </div>
      </div>

      ${plan.notes ? `
      <!-- NOTES -->
      <div style="
        background:#FFFDF0; border:1px solid #F0E0A0;
        border-radius:8px; padding:16px; margin-bottom:24px;
      ">
        <div style="font-size:9px;font-weight:700;color:#9A7A00;letter-spacing:1px;margin-bottom:6px;text-transform:uppercase;">
          Clinical Notes
        </div>
        <div style="font-size:12px;color:#1A3A4A;line-height:1.6;">${plan.notes}</div>
      </div>` : ''}

      <!-- VALIDITY -->
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:24px;">
        <div style="width:8px;height:8px;border-radius:50%;background:#1B9CC4;flex-shrink:0;"></div>
        <span style="font-size:11px;color:#6B7E88;">
          This treatment plan is valid until ${validUntil}. Prices are subject to final clinical assessment.
        </span>
      </div>

      <!-- DIVIDER -->
      <div style="height:1px;background:#D0E9F0;margin-bottom:18px;"></div>

      <!-- DISCLAIMER -->
      <p style="font-size:10px;color:#6B7E88;line-height:1.6;margin-bottom:6px;">
        This document is a personalised estimate prepared by MMV Medical based on the patient's expressed needs.
        Final treatment recommendations and pricing may be revised following a clinical examination.
        All procedures are performed by qualified dental professionals in accredited facilities in Istanbul, Turkey.
      </p>
      <p style="font-size:10px;color:#6B7E88;">
        For questions: info@mmvmedical.com · www.mmvmedical.com
      </p>

    </div>

    <!-- FOOTER -->
    <div style="
      background:#1A3A4A; padding:14px 40px;
      display:flex; justify-content:space-between; align-items:center;
      margin-top:20px;
    ">
      <span style="font-size:10px;color:#4ED8F0;letter-spacing:1px;">MMV MEDICAL · ISTANBUL</span>
      <span style="font-size:10px;color:#6B7E88;">CONFIDENTIAL PATIENT DOCUMENT</span>
      <span style="font-size:10px;color:#6B7E88;">${refCode} · ${today()}</span>
    </div>

  </div>
</body>
</html>`;

  // Open in new tab and trigger print
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 800);
}
