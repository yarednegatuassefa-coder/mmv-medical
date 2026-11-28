const MAX_TEXT = 2_000;
const ESCALATION_CODES = Object.freeze({
  consent_missing: "consent_missing",
  opt_out: "opt_out",
  urgent_clinical_question: "urgent_clinical_question",
  clinical_content: "clinical_content",
  unsupported_language: "unsupported_language",
  unavailable_provider: "unavailable_provider",
  conflicting_source: "conflicting_source",
  timeout: "timeout",
});

const forbiddenClaims = /\b(diagnos|treat|treatment plan|clinical outcome|guarantee|cure|final price|costs?\s+will be|send to patient|write to crm|consent changed)\w*/i;
const sensitiveField = /\b(passport|patient\s*id|medical record|diagnosis|symptom|private message|phone|email)\b\s*[:=]/i;

function clean(value, limit = MAX_TEXT) {
  return String(value ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, limit);
}

export function buildCoordinationDraftInput({ scenarioId, language, consent, optOut = false, provider, availability, logistics } = {}) {
  if (!clean(scenarioId, 120) || !clean(language, 40)) throw new Error("synthetic_scenario_metadata_required");
  const safeProvider = clean(provider, 160);
  const safeAvailability = clean(availability, 300);
  const safeLogistics = clean(logistics, 300);
  if ([safeProvider, safeAvailability, safeLogistics].some((value) => sensitiveField.test(value))) throw new Error("sensitive_field_not_allowed");
  return {
    mode: "draft_only",
    syntheticScenarioId: clean(scenarioId, 120),
    language: clean(language, 40),
    consent: consent === true,
    optOut: optOut === true,
    provider: safeProvider,
    availability: safeAvailability,
    logistics: safeLogistics,
    marker: "DRAFT — HUMAN REVIEW REQUIRED",
    forbiddenActions: ["diagnosis", "treatment selection", "final pricing", "patient-facing sending", "CRM writes", "consent changes"],
  };
}

export function classifyCoordinationScenario({ consent, optOut = false, urgent = false, clinicalQuestion = false, languageSupported = true, providerAvailable = true, sourcesConflict = false, timedOut = false } = {}) {
  if (timedOut) return { status: "escalate", code: ESCALATION_CODES.timeout };
  if (optOut) return { status: "escalate", code: ESCALATION_CODES.opt_out };
  if (consent !== true) return { status: "escalate", code: ESCALATION_CODES.consent_missing };
  if (urgent) return { status: "escalate", code: ESCALATION_CODES.urgent_clinical_question };
  if (clinicalQuestion) return { status: "escalate", code: ESCALATION_CODES.clinical_content };
  if (!languageSupported) return { status: "escalate", code: ESCALATION_CODES.unsupported_language };
  if (!providerAvailable) return { status: "escalate", code: ESCALATION_CODES.unavailable_provider };
  if (sourcesConflict) return { status: "escalate", code: ESCALATION_CODES.conflicting_source };
  return { status: "draft_allowed", code: null };
}

export function validateCoordinationDraft(text, context) {
  const draft = clean(text);
  if (!draft) return { ok: false, code: "empty_output" };
  if (!draft.includes(context.marker)) return { ok: false, code: "review_marker_missing" };
  if (forbiddenClaims.test(draft)) return { ok: false, code: "clinical_or_consequential_claim" };
  if (context.optOut === true) return { ok: false, code: ESCALATION_CODES.opt_out };
  if (context.consent !== true) return { ok: false, code: ESCALATION_CODES.consent_missing };
  return { ok: true, text: draft, requiresHumanReview: true };
}

export { ESCALATION_CODES };
