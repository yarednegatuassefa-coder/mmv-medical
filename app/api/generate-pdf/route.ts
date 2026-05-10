import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import PDFDocument from "pdfkit";

const MMV_DARK   = "#0A0F1E";
const MMV_BLUE   = "#1A73E8";
const MMV_ACCENT = "#00C2A8";
const MMV_LIGHT  = "#F4F7FB";
const MMV_GREY   = "#6B7280";
const MMV_BORDER = "#E2E8F0";
const WHITE      = "#FFFFFF";

function sanitize(text: string): string {
  if (!text) return "";
  return text
    .replace(/ş/g, "s").replace(/Ş/g, "S")
    .replace(/ı/g, "i").replace(/İ/g, "I")
    .replace(/ğ/g, "g").replace(/Ğ/g, "G")
    .replace(/ü/g, "u").replace(/Ü/g, "U")
    .replace(/ö/g, "o").replace(/Ö/g, "O")
    .replace(/ç/g, "c").replace(/Ç/g, "C");
}

function fmtPrice(amount: number, currency: string): string {
  return `${currency} ${amount.toLocaleString("en-GB", { minimumFractionDigits: 0 })}`;
}

const VIP_ITEMS = [
  "5-star hotel accommodation (per visit)",
  "Private airport transfers (both directions)",
  "Dedicated personal translator",
  "CT scan / 3D X-ray included",
  "Lifetime implant guarantee",
  "24/7 WhatsApp support - Jared",
];

function buildPDF(patient: Record<string, any>): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const doc = new PDFDocument({ size: "A4", margin: 45, bufferPages: true });

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const pw = doc.page.width;
    const margin = 45;
    const contentW = pw - margin * 2;
    const currency = patient.currency || "EUR";
    const name = sanitize(patient.name || "Valued Patient");
    const country = patient.country || "";
    const refId = patient.ref_id || `MMV-${Date.now()}`;
    const dateStr = patient.date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    const depositPct = patient.deposit_pct || 60;
    const treatments: any[] = patient.treatments || [];

    doc.rect(0, 0, pw, 110).fill(MMV_DARK);
    doc.rect(0, 0, 5, 110).fill(MMV_BLUE);
    doc.circle(pw - 60, 50, 40).fill(MMV_DARK);
    doc.circle(pw - 60, 50, 32).fill(MMV_ACCENT);
    doc.circle(pw - 60, 50, 26).fill(MMV_DARK);
    doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(22).text("MMV Medical", margin, 28);
    doc.fillColor("#A0AEC0").font("Helvetica").fontSize(9).text("International Dental Tourism  —  Istanbul, Turkey", margin, 54);
    doc.roundedRect(margin, 70, 180, 22, 4).fill(MMV_BLUE);
    doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(8).text("PERSONALISED TREATMENT PLAN", margin + 10, 77);

    doc.moveDown(0);
    doc.y = 125;

    doc.rect(margin, doc.y, contentW, 38).fill(MMV_LIGHT);
    doc.rect(margin, doc.y, contentW, 38).stroke(MMV_BORDER);

    const colW = contentW / 4;
    const infoY = doc.y + 6;
    const labels = ["PATIENT", "REFERENCE", "DATE", "COUNTRY"];
    const vals   = [name, refId, dateStr, country];

    labels.forEach((lbl, i) => {
      const x = margin + i * colW + 8;
      doc.fillColor(MMV_GREY).font("Helvetica-Bold").fontSize(7).text(lbl, x, infoY);
      doc.fillColor(MMV_DARK).font("Helvetica").fontSize(9).text(sanitize(vals[i]), x, infoY + 13);
    });

    doc.y = infoY + 38;
    doc.moveDown(0.8);

    doc.fillColor(MMV_BLUE).font("Helvetica-Bold").fontSize(10).text("TREATMENT PLAN", margin, doc.y);
    doc.moveDown(0.4);

    const colWidths = [contentW * 0.30, contentW * 0.22, contentW * 0.08, contentW * 0.20, contentW * 0.20];
    const headers = ["Treatment", "Brand / Origin", "Units", "Unit Price", "Total"];
    const rowH = 24;
    let tableX = margin;
    let tableY = doc.y;

    doc.rect(tableX, tableY, contentW, rowH).fill(MMV_DARK);
    doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(8);

    let cx = tableX;
    headers.forEach((h, i) => {
      const align = i >= 2 ? "center" : "left";
      doc.text(h, cx + 5, tableY + 8, { width: colWidths[i] - 10, align });
      cx += colWidths[i];
    });

    tableY += rowH;

    let grandTotal = 0;
    treatments.forEach((t, idx) => {
      const units     = t.units || 1;
      const unitPrice = t.unit_price || 0;
      const total     = units * unitPrice;
      grandTotal     += total;

      const bg = idx % 2 === 0 ? WHITE : MMV_LIGHT;
      doc.rect(margin, tableY, contentW, rowH).fill(bg).stroke(MMV_BORDER);
      doc.fillColor(MMV_DARK).font("Helvetica").fontSize(8.5);
      cx = margin;

      const cells = [
        { text: sanitize(t.name || ""), align: "left" },
        { text: sanitize(t.brand || "—"), align: "left" },
        { text: String(units), align: "center" },
        { text: fmtPrice(unitPrice, currency), align: "right" },
        { text: fmtPrice(total, currency), align: "right" },
      ];

      cells.forEach((cell, i) => {
        doc.text(cell.text, cx + 5, tableY + 8, { width: colWidths[i] - 10, align: cell.align as any });
        cx += colWidths[i];
      });

      tableY += rowH;
    });

    doc.y = tableY + 10;

    const deposit = grandTotal * depositPct / 100;
    const balance = grandTotal - deposit;

    const totalRows = [
      { label: "TOTAL TREATMENT COST", value: fmtPrice(grandTotal, currency), bold: true, large: true },
      { label: `Deposit — Visit 1 (${depositPct}%)`, value: fmtPrice(deposit, currency), bold: false, large: false },
      { label: `Balance — Visit 2 (${100 - depositPct}%)`, value: fmtPrice(balance, currency), bold: false, large: false },
    ];

    doc.moveTo(margin + contentW * 0.55, doc.y).lineTo(pw - margin, doc.y).stroke(MMV_BLUE);
    doc.moveDown(0.3);

    totalRows.forEach((row) => {
      const y = doc.y;
      doc.fillColor(row.large ? MMV_BLUE : MMV_DARK).font(row.bold ? "Helvetica-Bold" : "Helvetica").fontSize(row.large ? 11 : 9)
        .text(row.label, margin + contentW * 0.55, y, { width: contentW * 0.27, align: "right" });
      doc.fillColor(row.large ? MMV_BLUE : MMV_GREY).font(row.bold ? "Helvetica-Bold" : "Helvetica").fontSize(row.large ? 11 : 9)
        .text(row.value, margin + contentW * 0.82, y, { width: contentW * 0.18, align: "right" });
      doc.moveDown(0.5);
    });

    doc.moveDown(0.8);

    doc.moveTo(margin, doc.y).lineTo(pw - margin, doc.y).lineWidth(0.5).stroke(MMV_BORDER);
    doc.moveDown(0.5);
    doc.fillColor(MMV_BLUE).font("Helvetica-Bold").fontSize(10).text("VISIT SCHEDULE", margin, doc.y);
    doc.moveDown(0.4);

    const visitY = doc.y;
    const visitW = contentW / 2 - 4;

    doc.rect(margin, visitY, visitW, 72).fill(MMV_LIGHT).stroke(MMV_BORDER);
    doc.fillColor(MMV_DARK).font("Helvetica-Bold").fontSize(9).text("VISIT 1 — Implant Placement", margin + 8, visitY + 8);
    doc.fillColor(MMV_GREY).font("Helvetica").fontSize(8.5)
      .text("Duration: 3–5 days  |  Arrive Mon or Sat\nProcedure: Implant surgery + temporary\nPayment: 60% deposit due on arrival", margin + 8, visitY + 24, { width: visitW - 16 });

    const v2x = margin + visitW + 8;
    doc.rect(v2x, visitY, visitW, 72).fill("#EFF6FF").stroke(MMV_BLUE);
    doc.fillColor(MMV_DARK).font("Helvetica-Bold").fontSize(9).text("VISIT 2 — Crown Fitting", v2x + 8, visitY + 8);
    doc.fillColor(MMV_GREY).font("Helvetica").fontSize(8.5)
      .text("Duration: 5–6 days  |  Arrive Mon or Sat\nProcedure: Final zirconia crown placement\nTiming: 3–6 months after Visit 1\nPayment: 40% balance due on arrival", v2x + 8, visitY + 24, { width: visitW - 16 });

    doc.y = visitY + 82;
    doc.moveDown(0.8);

    doc.moveTo(margin, doc.y).lineTo(pw - margin, doc.y).lineWidth(0.5).stroke(MMV_BORDER);
    doc.moveDown(0.5);
    doc.fillColor(MMV_BLUE).font("Helvetica-Bold").fontSize(10).text("VIP PACKAGE — INCLUDED", margin, doc.y);
    doc.moveDown(0.4);

    const vipY = doc.y;
    const vipBoxH = Math.ceil(VIP_ITEMS.length / 2) * 22 + 14;
    doc.rect(margin, vipY, contentW, vipBoxH).fill("#F0FDF4").stroke(MMV_ACCENT);

    VIP_ITEMS.forEach((item, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const ix  = margin + 12 + col * (contentW / 2);
      const iy  = vipY + 10 + row * 22;
      doc.fillColor("#065F46").font("Helvetica").fontSize(8.5).text(`\u2713  ${item}`, ix, iy, { width: contentW / 2 - 20 });
    });

    doc.y = vipY + vipBoxH + 10;

    const notes = patient.notes ? sanitize(patient.notes) : null;
    if (notes) {
      doc.moveDown(0.5);
      doc.fillColor(MMV_BLUE).font("Helvetica-Bold").fontSize(10).text("NOTES", margin, doc.y);
      doc.moveDown(0.3);
      doc.fillColor(MMV_GREY).font("Helvetica-Oblique").fontSize(8.5).text(notes, margin, doc.y, { width: contentW });
      doc.moveDown(0.8);
    }

    doc.moveDown(1);
    doc.moveTo(margin, doc.y).lineTo(pw - margin, doc.y).lineWidth(1).stroke(MMV_BLUE);
    doc.moveDown(0.4);

    const footerY = doc.y;
    const fCol    = contentW / 3;
    doc.fillColor(MMV_GREY).font("Helvetica").fontSize(7.5);
    doc.text("mmvmedical.health", margin, footerY, { width: fCol, align: "center" });
    doc.text("WhatsApp: +90 533 250 3194", margin + fCol, footerY, { width: fCol, align: "center" });
    doc.text("Prepared by Jared | MMV Medical", margin + fCol * 2, footerY, { width: fCol, align: "center" });

    doc.moveDown(0.6);
    doc.fillColor(MMV_GREY).font("Helvetica").fontSize(7.5)
      .text("This treatment plan is valid for 30 days from the date of issue. All prices include clinic fees and materials. Bank/IBAN details provided via email only.", margin, doc.y, { width: contentW, align: "center" });

    doc.end();
  });
}

export async function POST(req: NextRequest) {
  try {
    const patient = await req.json();

    if (!patient.name || !patient.treatments?.length) {
      return NextResponse.json({ error: "name and treatments are required" }, { status: 400 });
    }

    const pdfBuffer = await buildPDF(patient);
    const filename  = `MMV_TreatmentPlan_${patient.name.replace(/\s+/g, "_")}.pdf`;

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("generate-pdf error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
