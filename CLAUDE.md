## Agentic Operations & Behavioral Rules (Karpathy-Inspired)

To prevent architectural drift, token waste, and silent logic failures during automated execution, all agent workflows must strictly adhere to these 8 operational rules:

1. **Read-Before-Write Verification**
   Never modify a file or write a new script based solely on memory or context windows. You must explicitly read the target file and its adjacent dependencies (`cat`, `grep`, or file read tools) immediately before executing a write command to verify the current state of the code.

2. **Fail Loudly & Explicitly**
   Never swallow exceptions or use silent catch blocks (`catch (e) {}` with no logging). If an API call fails, a database validation fails (Zod), or an environmental variable is missing, the system must abort immediately, log the full stack trace, and push an explicit error state to the output UI or logs.

3. **Incremental Execution Checkpoints**
   Break multi-step automation tasks down into atomic, isolated actions. After implementing a single step (e.g., updating an API route), pause and run a localized test script or compilation check. Do not write hundreds of lines of code across multiple files without an explicit verification checkpoint.

4. **Zero-Tolerance Type Alignment**
   Every structural data layer (Vercel, Next.js components, backend API routes) must maintain zero TypeScript errors. If an agent introduces an `any` type or causes a build-time type failure, it must roll back the change immediately and fix the schema definition before proceeding.

5. **Strict Local Isolation (No Speculative Refactoring)**
   When tasked with editing a specific component or route, limit your changes strictly to that file. Do not perform speculative refactoring on shared utilities, global styles, or database models unless explicitly instructed in the prompt brief.

6. **Environment and Secrets Guardrails**
   Never hardcode credentials, API keys, or access tokens. Agents must strictly pull configuration variables via `process.env` backed by a managed local environment manager (`direnv` / `.env.local`). If a key is missing, halt execution and trigger Rule 2.

7. **Idempotent Migration Paths**
   Any script, database seed, or automated action that modifies state must be completely idempotent. Running a script three times back-to-back must produce the exact same outcome as running it once, without duplicating data rows or fracturing files.

8. **Deterministic State over Pure LLM Generation**
   For algorithmic tasks, string formatting (such as Turkish character sanitation), or structural transformations, use strict deterministic code logic rather than relying on an LLM prompt to guess the output. Use the AI for judgment and text generation; use structural logic for pipeline orchestration.

## Navigation Map
Read this section to find context for specific tasks.

## If you are doing patient coordination
Read .hermes/skills/patient-qualification/SKILL.md

## If you are writing a follow-up message
Read .hermes/skills/patient-followup/SKILL.md

## If you are generating a treatment plan PDF
Read .hermes/skills/treatment-plan/SKILL.md

## If you are doing competitive research
Read .hermes/skills/competitor-intel/SKILL.md

## If something went wrong
Read failures.md before starting the task again.
