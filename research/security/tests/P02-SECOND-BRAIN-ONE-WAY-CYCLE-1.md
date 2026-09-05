# P02 — Second Brain One-Way Isolation — Attack Cycle 1

Status: ADVERSARIAL DESIGN TEST
Date: 2026-09-06

## Invariant

Recipient B must not have a direct feedback/control channel into Second Brain (SB).
SB receives a bounded input from A-side and emits bounded semantic output toward B-side.
SB has no universal execution authority.

## Attack A — Direct reverse connection

Attacker controls B and attempts:
- TCP/session callback;
- API reply;
- acknowledgement payload;
- websocket/reused bidirectional session;
- tool callback.

Finding:
Software policy alone can accidentally reintroduce reverse paths through connection state.

Result: FAIL unless the one-way property is enforced below the SB application semantics (network/transport architecture or equivalent high-assurance boundary).

## Attack B — Response smuggling in protocol metadata

B cannot open an explicit reverse API but influences:
- error codes;
- delivery receipts;
- timing;
- retry behavior;
- queue depth/backpressure.

Finding:
“No reply message” does not mean “no feedback.” Timing and transport behavior can form a feedback/covert channel.

Result: FAIL under a strict no-feedback claim.

## Attack C — Indirect causal loop

B influences A through another legitimate system.
A later constructs the next SB input using B-influenced state.

Path:
B -> external/operational path -> A -> SB -> B

Finding:
Physical one-way SB interface does not guarantee causal independence.

Result: FAIL under a global “no feedback” claim.

## Root cause

The original property was underspecified.

There are at least three distinct claims:
1. no direct application-layer B->SB message;
2. no transport/control feedback B->SB;
3. no indirect causal influence B->A->SB.

They require different controls and may not all be achievable.

## Correction candidate

Rename property from absolute “no feedback” to explicitly scoped:

**One-Way Semantic Input Boundary (OWSIB)**

Minimum claim:
- B cannot directly submit semantic content/instructions to SB;
- SB input is accepted only from authenticated A-side ingress;
- transport/control metadata from B is not exposed as semantic SB input;
- indirect causal provenance is tracked and can reduce evidence independence;
- covert channels are treated as residual risk unless physically bounded/proven.

## P02 result

0/3. RESET REQUIRED.

No PASS credit retained because the invariant itself changed.

## New parameters

P52 — transport/control feedback leakage.
P53 — causal-provenance independence.
P54 — covert-channel capacity/bounding.
