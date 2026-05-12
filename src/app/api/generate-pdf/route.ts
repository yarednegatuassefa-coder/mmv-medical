import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import PDFDocument from "pdfkit";

// ── Brand colours ─────────────────────────────────────────────────────────────
const MMV_DARK    = "#0A0F1E";
const MMV_BLUE    = "#1A73E8";
const MMV_ACCENT  = "#00C2A8";
const MMV_LIGHT   = "#F8FAFC";
const MMV_GOLD    = "#D4A847";
const MMV_MUTED   = "#64748B";

// ── Currency maps ─────────────────────────────────────────────────────────────
const CURRENCY: Record<string, { symbol: string; code: string }> = {
  Netherlands:          { symbol: "€", code: "EUR" },
  "Belgium (Dutch)":    { symbol: "€", code: "EUR" },
  "Belgium (French)":   { symbol: "€", code: "EUR" },
  Germany:              { symbol: "€", code: "EUR" },
  France:               { symbol: "€", code: "EUR" },
  Norway:               { symbol: "kr", code: "NOK" },
  Sweden:               { symbol: "kr", code: "SEK" },
  Denmark:              { symbol: "kr", code: "DKK" },
  "United Kingdom":     { symbol: "£", code: "GBP" },
  Ireland:              { symbol: "€", code: "EUR" },
  Albania:              { symbol: "€", code: "EUR" },
  Romania:              { symbol: "€", code: "EUR" },
  "Somalia diaspora (UK)": { symbol: "£", code: "GBP" },
};

// ── Sanitise text (no exotic chars that pdfkit can't handle) ──────────────────
function sanitise(text: string): string {
  return text
    .replace(/İ/g, "I").replace(/ı/g, "i")
    .replace(/Ş/g, "S").replace(/ş/g, "s")
    .replace(/Ğ/g, "G").replace(/ğ/g, "g")
    .replace(/Ü/g, "U").replace(/ü/g, "u")
    .replace(/Ö/g, "O").replace(/ö/g, "o")
    .replace(/Ç/g, "C").replace(/ç/g, "c");
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface TreatmentItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

interface PatientData {
  name: string;
  country: string;
  email?: string;
  phone?: string;
  treatments: TreatmentItem[];
  notes?: string;
  includeVip?: boolean;
  visitDate?: string;
}

// ── PDF builder ───────────────────────────────────────────────────────────────
async function buildPDF(patient: PatientData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50, bufferPages: true });
    const chunks: Buffer[] = [];

    doc.on("data",  (c: Buffer) => chunks.push(c));
    doc.on("end",   () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const { symbol } = CURRENCY[patient.country] ?? { symbol: "€" };
    const W = doc.page.width - 100; // usable width

    // ── Header bar ────────────────────────────────────────────────────────────
    doc.rect(0, 0, doc.page.width, 90).fill(MMV_DARK);

    doc.fillColor(MMV_ACCENT).fontSize(22).font("Helvetica-Bold")
       .text("MMV MEDICAL", 50, 28);
    doc.fillColor(MMV_BLUE).fontSize(9).font("Helvetica")
       .text("Istanbul Dental Excellence", 50, 54);

    doc.fillColor(MMV_LIGHT).fontSize(8).font("Helvetica")
       .text("www.mmvmedical.org", doc.page.width - 200, 35, { width: 150, align: "right" })
       .text("Dr. Mehmet Akif Turkan", doc.page.width - 200, 48, { width: 150, align: "right" })
       .text("Istanbul, Turkey", doc.page.width - 200, 61, { width: 150, align: "right" });

    // ── Title block ───────────────────────────────────────────────────────────
    doc.fillColor(MMV_DARK).fontSize(16).font("Helvetica-Bold")
       .text("PERSONALISED TREATMENT PLAN", 50, 110);

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit", month: "long", year: "numeric",
    });
    doc.fillColor(MMV_MUTED).fontSize(9).font("Helvetica")
       .text(`Prepared: ${today}`, 50, 132);

    // ── Divider ───────────────────────────────────────────────────────────────
    doc.moveTo(50, 148).lineTo(50 + W, 148).lineWidth(2)
       .strokeColor(MMV_ACCENT).stroke();

    // ── Patient info box ──────────────────────────────────────────────────────
    doc.rect(50, 158, W, 68).fill("#F1F5F9");
    doc.fillColor(MMV_DARK).fontSize(10).font("Helvetica-Bold")
       .text("PATIENT INFORMATION", 62, 168);

    doc.font("Helvetica").fontSize(9).fillColor(MMV_DARK)
       .text(`Name:     ${sanitise(patient.name)}`,    62, 184)
       .text(`Country:  ${patient.country}`,           62, 198)
       .text(`Email:    ${patient.email  ?? "—"}`,     62, 212)
       .text(`Phone:    ${patient.phone  ?? "—"}`,    310, 184)
       .text(`Currency: ${symbol} (${(CURRENCY[patient.country] ?? {code:"EUR"}).code})`, 310, 198);

    // ── Treatment table ───────────────────────────────────────────────────────
    let y = 242;

    // Table header
    doc.rect(50, y, W, 22).fill(MMV_DARK);
    doc.fillColor(MMV_LIGHT).fontSize(9).font("Helvetica-Bold")
       .text("Treatment",  62,  y + 7)
       .text("Qty",       330,  y + 7, { width: 40, align: "center" })
       .text("Unit Price", 380, y + 7, { width: 80, align: "right" })
       .text("Total",      470, y + 7, { width: 70, align: "right" });
    y += 22;

    let subtotal = 0;
    patient.treatments.forEach((item, i) => {
      const lineTotal = item.quantity * item.unitPrice;
      subtotal += lineTotal;

      doc.rect(50, y, W, 20).fill(i % 2 === 0 ? "#FFFFFF" : "#F8FAFC");
      doc.fillColor(MMV_DARK).fontSize(9).font("Helvetica")
         .text(sanitise(item.name),          62,  y + 6)
         .text(String(item.quantity),        330,  y + 6, { width: 40, align: "center" })
         .text(`${symbol}${item.unitPrice.toLocaleString()}`, 380, y + 6, { width: 80, align: "right" })
         .text(`${symbol}${lineTotal.toLocaleString()}`,      470, y + 6, { width: 70, align: "right" });
      y += 20;
    });

    // VIP package
    const vipPrice = 350;
    if (patient.includeVip) {
      subtotal += vipPrice;
      doc.rect(50, y, W, 20).fill("#FFF8E7");
      doc.fillColor(MMV_GOLD).fontSize(9).font("Helvetica-BoldOblique")
         .text("VIP Package (hotel + transfers + support)", 62, y + 6)
         .text("1", 330, y + 6, { width: 40, align: "center" });
      doc.fillColor(MMV_GOLD).font("Helvetica-Bold")
         .text(`${symbol}${vipPrice}`, 380, y + 6, { width: 80, align: "right" })
         .text(`${symbol}${vipPrice}`, 470, y + 6, { width: 70, align: "right" });
      y += 20;
    }

    // Totals
    const deposit = Math.round(subtotal * 0.2);
    const balance = subtotal - deposit;

    y += 6;
    doc.moveTo(50, y).lineTo(50 + W, y).lineWidth(1).strokeColor(MMV_MUTED).stroke();
    y += 8;

    const totals = [
      { label: "Subtotal",               value: subtotal,   color: MMV_DARK,   bold: false },
      { label: "Deposit (20%)",          value: deposit,    color: MMV_BLUE,   bold: false },
      { label: "Balance on arrival",     value: balance,    color: MMV_DARK,   bold: false },
      { label: "TOTAL",                  value: subtotal,   color: MMV_ACCENT, bold: true  },
    ];

    totals.forEach(({ label, value, color, bold }) => {
      doc.fillColor(color).font(bold ? "Helvetica-Bold" : "Helvetica").fontSize(bold ? 11 : 9)
         .text(label, 350, y, { width: 130, align: "right" })
         .text(`${symbol}${value.toLocaleString()}`, 490, y, { width: 50, align: "right" });
      y += bold ? 18 : 15;
    });

    // ── Visit schedule ────────────────────────────────────────────────────────
    y += 10;
    doc.fillColor(MMV_DARK).fontSize(11).font("Helvetica-Bold").text("VISIT SCHEDULE", 50, y);
    y += 16;

    const visits = [
      { day: "Day 1", desc: "Consultation, X-rays, treatment planning & first procedures" },
      { day: "Day 2", desc: "Main treatment session" },
      { day: "Day 3", desc: "Follow-up, adjustments, final checks & aftercare briefing" },
    ];

    visits.forEach(({ day, desc }) => {
      doc.rect(50, y, 60, 18).fill(MMV_ACCENT);
      doc.fillColor(MMV_LIGHT).font("Helvetica-Bold").fontSize(8).text(day, 50, y + 5, { width: 60, align: "center" });
      doc.fillColor(MMV_DARK).font("Helvetica").fontSize(9).text(desc, 120, y + 4);
      y += 24;
    });

    // ── Notes ─────────────────────────────────────────────────────────────────
    if (patient.notes) {
      y += 6;
      doc.fillColor(MMV_DARK).fontSize(10).font("Helvetica-Bold").text("NOTES", 50, y);
      y += 14;
      doc.fillColor(MMV_MUTED).fontSize(9).font("Helvetica")
         .text(sanitise(patient.notes), 50, y, { width: W });
    }

    // ── Footer ────────────────────────────────────────────────────────────────
    const pageH = doc.page.height;
    doc.rect(0, pageH - 55, doc.page.width, 55).fill(MMV_DARK);
    doc.fillColor(MMV_MUTED).fontSize(8).font("Helvetica")
       .text("This treatment plan is valid for 30 days. All prices in local currency equivalent.", 50, pageH - 44, { width: W, align: "center" })
       .text("Questions? WhatsApp: +90 532 XXX XXXX  |  info@mmvmedical.org", 50, pageH - 28, { width: W, align: "center" });

    doc.fillColor(MMV_ACCENT).fontSize(8).font("Helvetica-Bold")
       .text("MMV MEDICAL — Istanbul Dental Excellence", 50, pageH - 14, { width: W, align: "center" });

    doc.end();
  });
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const patient: PatientData = {
      name:       body.name       ?? "Patient",
      country:    body.country    ?? "United Kingdom",
      email:      body.email,
      phone:      body.phone,
      treatments: body.treatments ?? [],
      notes:      body.notes,
      includeVip: body.includeVip ?? false,
      visitDate:  body.visitDate,
    };

    if (!patient.treatments.length) {
      return NextResponse.json({ error: "No treatments provided" }, { status: 400 });
    }

    const pdfBuffer = await buildPDF(patient);
    const filename  = `MMV_TreatmentPlan_${patient.name.replace(/\s+/g, "_")}.pdf`;

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type":        "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length":      String(pdfBuffer.length),
      },
    });
  } catch (err: unknown) {
    console.error("generate-pdf error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
