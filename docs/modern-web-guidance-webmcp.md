# WebMCP adoption — MMV Medical

## Scope
The public enquiry form is annotated as an agent-assisted form-filling surface only. It contains contact and treatment-interest information, so agents must not submit it automatically. A person reviews the populated form and clicks **Send Enquiry**.

## Privacy boundary
Do not enter diagnoses, medical records, prescriptions, passport/identity data, or other sensitive health information into the free-text field. Use the approved patient/coordinator channel for clinical details. The server-side lead capture and privacy policy remain authoritative.

## Test
Verify that form labels and validation still work for humans; an agent can populate fields but cannot bypass the submit click; honeypot and server anti-abuse checks still run.
