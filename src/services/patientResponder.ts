interface PatientData {
  fullName: string;
  contactLanguage: string;
  clinicalCategory: string;
  missingTeethCount: number;
  hasXRay: boolean;
  primaryComplaint?: string;
}

export async function generatePatientDraftResponse(patient: PatientData): Promise<string> {
  const proxyUrl = process.env.LITELLM_PROXY_URL || 'http://localhost:4000';
  const proxyKey = process.env.LITELLM_PROXY_MASTER_KEY || '';

  // Build high-judgment clinic guidelines for Claude 3.5 Sonnet
  const medicalTonePrompt = `
    You are an expert, deeply empathetic International Patient Coordinator at a premier dental & medical tourism clinic in Istanbul.
    Your objective is to review the structured intake data of a new lead and draft a personalized, warm WhatsApp welcome response.

    CRITICAL TONE RULES:
    1. Be deeply welcoming but professional. Never guarantee clinical diagnoses without a doctor's physical review.
    2. Address the patient explicitly by their first name if possible.
    3. Respond strictly in the patient's preferred language (Language code provided: ${patient.contactLanguage}).
    4. Highlight the next clear tactical action step (e.g., inviting them to share an X-ray panorama or booking a video consultation).
    5. Keep the spacing clean and easy to scan on a mobile screen using paragraph breaks. Do not use generic corporate jargon.
  `;

  // Context injection based on what the intake spine discovered
  const dynamicContext = `
    Patient Name: ${patient.fullName}
    Treatment Track: ${patient.clinicalCategory}
    Missing Teeth Count: ${patient.missingTeethCount}
    Has uploaded X-Ray: ${patient.hasXRay ? 'Yes' : 'No'}
    Specific complaint noted: ${patient.primaryComplaint || 'General restoration inquiry'}
  `;

  try {
    const response = await fetch(`${proxyUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${proxyKey}`
      },
      body: JSON.stringify({
        model: 'patient-agent', // Routes dynamically to Claude 3.5 Sonnet via LiteLLM
        messages: [
          { role: 'system', content: medicalTonePrompt },
          { role: 'user', content: `Draft the WhatsApp message based on this profile data:\n${dynamicContext}` }
        ],
        temperature: 0.6 // Slightly higher for natural, warm conversational fluidity
      })
    });

    if (!response.ok) {
      throw new Error(`Proxy response error status code: ${response.status}`);
    }

    const jsonResult = await response.json();
    return jsonResult.choices[0].message.content;

  } catch (error: any) {
    console.error('🚨 Claude Patient Generation Engine Interrupted:', error.message);
    return `Hello ${patient.fullName}, thank you for contacting our clinic in Istanbul. One of our senior patient specialists is reviewing your clinical request right now and will reach out with customized structural details momentarily.`;
  }
}
