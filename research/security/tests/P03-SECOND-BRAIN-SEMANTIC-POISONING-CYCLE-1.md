# P03 — Second Brain Semantic Poisoning Resistance — Attack Cycle 1

Status: ADVERSARIAL DESIGN TEST
Date: 2026-09-06

## Invariant under test

Second Brain must not convert untrusted semantic content into trusted authority merely because it was received through the permitted A-side path.

## Attack A — Prompt/instruction injection inside evidence

A-side evidence contains attacker-controlled text such as instructions to ignore policy, misclassify evidence or emit an authorization-shaped output.

Finding:
One-way isolation does not prevent poisoning from the allowed side.

Expected correction:
Evidence and instructions require typed separation; untrusted content is data, not control. SB output cannot itself authorize action.

Result: DESIGN-PASS only if typed/bounded interface is adopted; current implementation absent.

## Attack B — Source-authority laundering

A legitimately aggregates data from an untrusted source. SB sees only A as sender and may incorrectly infer A-level trust for embedded claims.

Finding:
Transport identity != claim provenance.

Required:
field/claim-level provenance survives aggregation; source authority is evaluated per claim.

Result: FAIL in current broad design; claim-level provenance not yet specified.

## Attack C — Context saturation / selective evidence

Attacker cannot alter policy but can flood A-side with large amounts of valid low-value evidence so decisive contrary evidence is omitted/truncated.

Finding:
Semantic verifier can be manipulated without a malicious instruction.

Required:
bounded evidence schema, deterministic priority rules, missing-evidence indicators, source coverage metrics, and refusal on insufficient coverage for high-risk decisions.

Result: FAIL / protocol missing.

## P03 result

0/3.

Second Brain is not accepted as poisoning-resistant.

## New parameters

P55 — claim-level provenance preservation.
P56 — evidence completeness/coverage signaling.
P57 — context/resource exhaustion against verifier.
