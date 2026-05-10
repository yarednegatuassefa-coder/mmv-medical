import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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
  "Somalia diaspora (UK)": "English (warm, community-aware tone)",
};

const CURRENCIES: Record<string, string> = {
  "United Kingdom": "GBP",
  "Somalia diaspora (UK)": "GBP",
};

const STAGE_DESCRIPTIONS: Record<string, string> = {
  first_contact:
    "First contact — asking for dental photos only. Do not ask for full medical history yet.",
  photos_received:
    "Photos have been received. Acknowledge them warmly and explain the next step (treatment plan coming).",
  plan_sent:
    "Treatment plan PDF has just been sent. Brief message to confirm receipt and invite questions.",
  follow_up:
    "Follow-up — patient has not replied in a few days. Gentle guidance, not pressure. Educate rather than sell.",
  booking:
    "Patient is ready to book. Guide them to confirm dates and pay the 60% deposit. Bank details will be sent by email separately — never share IBAN on WhatsApp.",
  pre_arrival:
    "Patient is arriving soon. Confirm logistics: hotel, airport transfer, what to bring, arrival day (Monday or Saturday only — clinic closed Sundays).",
  post_treatment:
    "Patient has completed treatment. Warm check-in, ask how they are feeling, remind them of follow-up visit timeline (3-6 months for crown fitting).",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, country, treatment, price, stage, context } = body;

    if (!name || !country || !stage) {
      return NextResponse.json(
        { error: "name, country, and stage are required" },
        { status: 400 }
      );
    }

    const lang = LANGUAGES[country] || "English";
    const currency = CURRENCIES[country] || "EUR";
    const stageDesc = STAGE_DESCRIPTIONS[stage] || stage;

    const systemPrompt = `You are Jared, Senior Manager of International Patient Services at MMV Medical — a dental tourism platform connecting European patients with top Istanbul clinics.

Your communication philosophy: guide first, sell second. Educate before pitching. Control next steps at every stage. Follow-up is guidance, not pressure.

Key rules:
- Sign every message as "Jared" only (never full name or title)
- Write ONLY in ${lang}
- Currency must be ${currency} if price is mentioned
- Never share IBAN or bank details on WhatsApp — say those come by email
- First contact: ask for photos ONLY, not full medical history
- Keep messages warm, professional, concise (WhatsApp-appropriate length)
- Use the patient's first name naturally
- Output ONLY the WhatsApp message text — no preamble, no explanation, no quotes`;

    const userPrompt = `Write a WhatsApp message for:
Patient name: ${name}
Country: ${country}
Stage: ${stageDesc}
Treatment (if relevant): ${treatment || "not yet specified"}
Price (if relevant): ${price || "not yet quoted"}
Extra context: ${context || "none"}

Write the message now in ${lang}.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text =
      message.content.find((b) => b.type === "text")?.text?.trim() || "";

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("generate-message error:", error);
    return NextResponse.json(
      { error: "Failed to generate message" },
      { status: 500 }
    );
  }
}
