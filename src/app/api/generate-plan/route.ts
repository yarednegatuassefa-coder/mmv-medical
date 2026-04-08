import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const PRICING = `
Implant Brand Pricing (per unit, Istanbul):
- Macros (Turkey): Implant €160–200, Crown €150
- Implant Swiss (Switzerland): Implant €220–250, Crown €150
- Medigma (Germany): Implant €250–350, Crown €150
- Neodent (Brazil/Straumann Group): Implant €300–350, Crown €150
- Medentika (Germany/Straumann Group): Implant €400–450, Crown €150
- Nobel (Switzerland): Implant €500–600, Crown €150
- Straumann (Switzerland): Implant €700–800, Crown €150

Example packages:
- 8 implants (4 top/4 bottom) + 24 crowns: €4,920–€10,000 depending on brand
- 12 implants (6 top/6 bottom) + 24 crowns: €5,520–€13,200 depending on brand
`

export async function POST(req: NextRequest) {
  const { lead } = await req.json()

  const message = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `You are a medical tourism coordinator at MMV Medical, based in Istanbul. 
Write a professional treatment plan for this patient. Be warm, specific, and persuasive.

Patient details:
- Name: ${lead.full_name}
- Country: ${lead.country}
- Treatment interest: ${lead.treatment}
- Notes: ${lead.notes ?? 'None provided'}

${PRICING}

Write the plan in this exact structure (use these exact headings):
1. RECOMMENDED TREATMENT
2. SUGGESTED IMPLANT BRAND & RATIONALE
3. COST ESTIMATE
4. WHAT'S INCLUDED
5. NEXT STEPS

Keep it under 400 words. Address the patient by first name. Do not use markdown bold or asterisks — plain text only.`
    }]
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  return NextResponse.json({ plan: text })
}
