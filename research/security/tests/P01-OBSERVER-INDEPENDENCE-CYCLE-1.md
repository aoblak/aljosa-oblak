# P01 — Observer Independence — Attack Cycle 1

Status: ADVERSARIAL DESIGN TEST
Protocol: OOS Security Acceptance Protocol RESET v1
Date: 2026-09-06
Starting score: 0/3

## Invariant

Loss, compromise or deception of the Observer must not:
- grant execution authority;
- authorize R2-R4;
- establish trust in another component;
- erase or rewrite independent evidence;
- prevent safe degradation.

Observer evidence is advisory/corroborative, never sufficient alone for high-impact action.

## Attack A — Full Observer runtime compromise

Attacker capability:
- root/admin on Observer;
- can modify Observer software/config;
- can forge Observer-local logs;
- can send arbitrary alerts/proposals;
- cannot forge external recovery authority.

Attack:
Observer reports fabricated compromise and requests broad isolation/recovery.

Expected:
- action envelope lacks independent authorization;
- Executor rejects R2-R4;
- conflicting/missing corroboration lowers trust;
- Observer cannot modify Protected Base.

Result: DESIGN-PASS.
Residual: executor independence not implementation-proven.

## Attack B — Healthy Observer, poisoned upstream dependency

Attacker capability:
- Observer host remains intact;
- compromise occurs in threat-intelligence/feed/update/model/provider dependency;
- malicious dependency causes plausible false analysis.

Attack:
Observer honestly produces wrong high-confidence conclusion.

Finding:
Host attestation cannot detect a semantically poisoned upstream dependency.

Expected:
- dependency provenance identifies evidence origin;
- no single Observer conclusion satisfies R2-R4;
- high-impact action requires evidence from a different dependency domain.

Result: DESIGN-PASS.
New dependency requirement: evidence-domain graph.

## Attack C — Evidence-path manipulation

Attacker capability:
- Observer runtime remains healthy;
- attacker can suppress/reorder/replay part of telemetry between observed host and Observer;
- local attestation still passes.

Attack:
Make compromised host appear normal by selectively withholding evidence.

Expected:
- sequence/freshness/heartbeat gaps are explicit;
- missing evidence becomes UNKNOWN, not HEALTHY;
- loss of expected independent telemetry reduces authority;
- R2-R4 cannot be justified by absence of alerts.

Result: DESIGN-PASS.

## Cross-test dependency challenge

A, B and C attack different layers:
A runtime,
B upstream semantic dependency,
C evidence transport.

However all three still rely on Policy/Executor correctly refusing Observer-only authority.

Therefore they are not fully independent acceptance proofs for the entire system. They are valid design evidence for Observer Independence, but share a downstream enforcement dependency.

## P01 result

P01 Observer Independence: 3 DESIGN-PASS / 0 IMPLEMENTATION-PASS.

Production acceptance score remains 0/3.

No architecture promotion.

## New parameter discovered

P51 — Security-control dependency graph correctness.

Reason:
“Independent evidence” cannot be asserted without modeling shared dependencies among Observer, verifier, identity, executor, network, provider and trust anchors.

P51 is added to the open critical matrix.
