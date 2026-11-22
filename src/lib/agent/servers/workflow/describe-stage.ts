const stages: Record<string, string> = {
  first_contact: "First contact: request dental photos only. Do not request full medical history.",
  photos_received: "Acknowledge receipt and explain that the next step is review by the clinical team.",
  plan_sent: "Confirm the treatment plan was sent and invite questions.",
  follow_up: "Offer a respectful, non-pressuring follow-up. Educate rather than sell.",
  booking: "Explain the booking coordination steps. Never share bank details or promise clinical outcomes.",
  pre_arrival: "Describe approved travel and appointment logistics; verify current clinic schedule before making commitments.",
  post_treatment: "Offer a general check-in and direct clinical questions or symptoms to the treating clinician."
};

export const name = "workflow.describe_message_stage";
export const description = "Retrieve a static, approved communication-stage description. No lead, patient, treatment or contact records are read.";

export function run(stage: unknown) {
  if (typeof stage !== "string" || !(stage in stages)) throw new Error("Unsupported workflow stage.");
  return { stage, guidance: stages[stage] };
}
