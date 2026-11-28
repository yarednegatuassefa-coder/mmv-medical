import test from "node:test";
import assert from "node:assert/strict";
import { buildCoordinationDraftInput, classifyCoordinationScenario, validateCoordinationDraft } from "../src/lib/coordination-draft-policy.mjs";

test("allowed coordination input is synthetic, minimized and draft-only", () => {
  const input = buildCoordinationDraftInput({ scenarioId: "SYN-001", language: "en", consent: true, provider: "Provider A", availability: "Weekday mornings", logistics: "Airport transfer checklist" });
  assert.equal(input.mode, "draft_only");
  assert.equal(input.syntheticScenarioId, "SYN-001");
  assert.equal(input.marker, "DRAFT — HUMAN REVIEW REQUIRED");
  assert.ok(!("patientId" in input));
  assert.throws(() => buildCoordinationDraftInput({ scenarioId: "SYN-002", language: "en", consent: true, provider: "phone: +251900000000" }), /sensitive_field_not_allowed/);
});

test("missing consent, opt-out, urgency and clinical questions escalate", () => {
  assert.deepEqual(classifyCoordinationScenario({ consent: false }), { status: "escalate", code: "consent_missing" });
  assert.deepEqual(classifyCoordinationScenario({ consent: true, optOut: true }), { status: "escalate", code: "opt_out" });
  assert.deepEqual(classifyCoordinationScenario({ consent: true, urgent: true }), { status: "escalate", code: "urgent_clinical_question" });
  assert.deepEqual(classifyCoordinationScenario({ consent: true, clinicalQuestion: true }), { status: "escalate", code: "clinical_content" });
});

test("provider conflicts and timeout use the manual coordination path", () => {
  assert.deepEqual(classifyCoordinationScenario({ consent: true, sourcesConflict: true }), { status: "escalate", code: "conflicting_source" });
  assert.deepEqual(classifyCoordinationScenario({ consent: true, timedOut: true }), { status: "escalate", code: "timeout" });
  assert.deepEqual(classifyCoordinationScenario({ consent: true, providerAvailable: false }), { status: "escalate", code: "unavailable_provider" });
  assert.deepEqual(classifyCoordinationScenario({ consent: true }), { status: "draft_allowed", code: null });
});

test("draft validation rejects clinical or patient-facing authority claims", () => {
  const context = buildCoordinationDraftInput({ scenarioId: "SYN-003", language: "en", consent: true });
  assert.deepEqual(validateCoordinationDraft("DRAFT — HUMAN REVIEW REQUIRED\nAppointment options only; staff must confirm.", context), {
    ok: true,
    text: "DRAFT — HUMAN REVIEW REQUIRED Appointment options only; staff must confirm.",
    requiresHumanReview: true,
  });
  assert.deepEqual(validateCoordinationDraft("DRAFT — HUMAN REVIEW REQUIRED: diagnosis confirmed; send to patient.", context), { ok: false, code: "clinical_or_consequential_claim" });
  assert.deepEqual(validateCoordinationDraft("DRAFT — HUMAN REVIEW REQUIRED: final price is 5000 ETB.", context), { ok: false, code: "clinical_or_consequential_claim" });
});
