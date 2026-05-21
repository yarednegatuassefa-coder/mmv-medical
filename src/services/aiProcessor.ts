import { PatientQualification, PatientQualificationSchema } from '../types/qualification';

export async function processRawLeadWithAI(rawMessage: string): Promise<PatientQualification> {
  const proxyUrl = process.env.LITELLM_PROXY_URL || 'http://localhost:4000';
  const proxyKey = process.env.LITELLM_PROXY_MASTER_KEY || '';

  const systemPrompt = `
    You are an elite clinical intake qualification engine for a premium medical tourism center in Istanbul.
    Your job is to analyze raw text messages from prospective international patients and extract structured data matching the exact schema rules provided.

    CRITICAL RULES:
    1. Extract fullName, contactLanguage, and originCountry confidently. If completely absent, use 'Unknown'.
    2. Determine clinicalCategory exactly from this selection: ['Dental', 'Hair', 'Bariatric', 'Ortho', 'Aesthetics', 'Unknown']. 
       - Look for hints like teeth, crowns, implants, smile -> 'Dental'.
       - Look for grafts, bald, hair transplant -> 'Hair'.
    3. If clinicalCategory is 'Dental', populate the dentalDetails block. Estimate missingTeethCount if mentioned.
    4. Rate urgencyScore from 1 (casual inquiry) to 5 (severe active pain or immediate travel booked).
    5. Output ONLY a valid, minified, pure JSON object matching the requested schema. No conversational conversational filler or markdown wrappers.
  `;

  try {
    // We target 'patient-agent' or 'backend-agent' names as configured in our litellm-config.yaml
    const response = await fetch(`${proxyUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${proxyKey}`
      },
      body: JSON.stringify({
        model: 'backend-agent', // Standardizes to Gemini Flash for rapid backend ingestion
        response_format: { type: "json_object" }, // Forces structured output handling natively
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this raw patient lead inquiry: "${rawMessage}"` }
        ],
        temperature: 0.1
      })
    });

    if (!response.ok) {
      throw new Error(`LiteLLM proxy answered with invalid status: ${response.status}`);
    }

    const jsonResult = await response.json();
    const rawAiText = jsonResult.choices[0].message.content;
    
    // Parse and explicitly validate the object layout against our Zod blueprint contract
    const parsedData = JSON.parse(rawAiText);
    return PatientQualificationSchema.parse(parsedData);

  } catch (error: any) {
    console.error('🚨 AI Extraction Service Interruption:', error.message);
    
    // Fallback safe payload object if the model completely fails or errors out
    return {
      fullName: "Unknown Patient Lead",
      contactLanguage: "en",
      originCountry: "Unknown",
      clinicalCategory: "Unknown",
      urgencyScore: 1,
      nextActionRequired: "System fallback triggered: Force manual agent outreach triage immediately."
    };
  }
}
