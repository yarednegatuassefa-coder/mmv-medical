import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      patientName,
      patientDOB,
      diagnosis,
      treatmentPlan,
      medications,
      notes,
      doctorName,
      clinicName,
      date,
    } = body;

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const { width, height } = page.getSize();

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const margin = 50;
    const lineHeight = 18;
    let y = height - margin;

    // Helper: draw text
    const drawText = (
      text: string,
      x: number,
      yPos: number,
      size = 11,
      bold = false,
      color = rgb(0.1, 0.1, 0.1)
    ) => {
      page.drawText(text ?? "", {
        x,
        y: yPos,
        size,
        font: bold ? fontBold : fontRegular,
        color,
      });
    };

    // Helper: wrap long text into lines
    const wrapText = (text: string, maxWidth: number, size = 11): string[] => {
      const words = (text ?? "").split(" ");
      const lines: string[] = [];
      let current = "";

      for (const word of words) {
        const test = current ? `${current} ${word}` : word;
        const testWidth = fontRegular.widthOfTextAtSize(test, size);
        if (testWidth > maxWidth && current) {
          lines.push(current);
          current = word;
        } else {
          current = test;
        }
      }
      if (current) lines.push(current);
      return lines;
    };

    // ── Header ──────────────────────────────────────────────
    drawText(clinicName ?? "MMV Medical", margin, y, 18, true, rgb(0.05, 0.35, 0.65));
    y -= 22;
    drawText("Treatment Plan", margin, y, 13, false, rgb(0.4, 0.4, 0.4));
    y -= 10;

    // Divider
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 1,
      color: rgb(0.05, 0.35, 0.65),
    });
    y -= 20;

    // ── Patient Info ─────────────────────────────────────────
    drawText("Patient Information", margin, y, 12, true, rgb(0.05, 0.35, 0.65));
    y -= lineHeight + 2;

    const infoRows: [string, string][] = [
      ["Patient Name:", patientName ?? "—"],
      ["Date of Birth:", patientDOB ?? "—"],
      ["Date:", date ?? new Date().toLocaleDateString()],
      ["Attending Physician:", doctorName ?? "—"],
    ];

    for (const [label, value] of infoRows) {
      drawText(label, margin, y, 11, true);
      drawText(value, margin + 150, y, 11, false);
      y -= lineHeight;
    }
    y -= 6;

    // ── Diagnosis ────────────────────────────────────────────
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.5,
      color: rgb(0.8, 0.8, 0.8),
    });
    y -= 16;

    drawText("Diagnosis", margin, y, 12, true, rgb(0.05, 0.35, 0.65));
    y -= lineHeight;

    const diagLines = wrapText(diagnosis ?? "—", width - margin * 2);
    for (const line of diagLines) {
      drawText(line, margin, y);
      y -= lineHeight;
    }
    y -= 6;

    // ── Treatment Plan ───────────────────────────────────────
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.5,
      color: rgb(0.8, 0.8, 0.8),
    });
    y -= 16;

    drawText("Treatment Plan", margin, y, 12, true, rgb(0.05, 0.35, 0.65));
    y -= lineHeight;

    const planLines = wrapText(treatmentPlan ?? "—", width - margin * 2);
    for (const line of planLines) {
      drawText(line, margin, y);
      y -= lineHeight;
    }
    y -= 6;

    // ── Medications ──────────────────────────────────────────
    if (medications && medications.length > 0) {
      page.drawLine({
        start: { x: margin, y },
        end: { x: width - margin, y },
        thickness: 0.5,
        color: rgb(0.8, 0.8, 0.8),
      });
      y -= 16;

      drawText("Medications", margin, y, 12, true, rgb(0.05, 0.35, 0.65));
      y -= lineHeight;

      for (const med of medications) {
        const medText =
          typeof med === "string"
            ? med
            : `${med.name ?? ""} — ${med.dosage ?? ""} ${med.frequency ?? ""}`.trim();
        drawText(`• ${medText}`, margin + 10, y);
        y -= lineHeight;
      }
      y -= 6;
    }

    // ── Notes ────────────────────────────────────────────────
    if (notes) {
      page.drawLine({
        start: { x: margin, y },
        end: { x: width - margin, y },
        thickness: 0.5,
        color: rgb(0.8, 0.8, 0.8),
      });
      y -= 16;

      drawText("Additional Notes", margin, y, 12, true, rgb(0.05, 0.35, 0.65));
      y -= lineHeight;

      const noteLines = wrapText(notes, width - margin * 2);
      for (const line of noteLines) {
        drawText(line, margin, y);
        y -= lineHeight;
      }
    }

    // ── Footer ───────────────────────────────────────────────
    const footerY = margin + 20;
    page.drawLine({
      start: { x: margin, y: footerY + 14 },
      end: { x: width - margin, y: footerY + 14 },
      thickness: 0.5,
      color: rgb(0.8, 0.8, 0.8),
    });
    drawText(
      `Generated by ${clinicName ?? "MMV Medical"} · ${new Date().toLocaleDateString()}`,
      margin,
      footerY,
      9,
      false,
      rgb(0.55, 0.55, 0.55)
    );

    // Serialize
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="treatment-plan-${patientName?.replace(/\s+/g, "-") ?? "patient"}.pdf"`,
      },
    });
  } catch (err) {
    console.error("generate-pdf error:", err);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
