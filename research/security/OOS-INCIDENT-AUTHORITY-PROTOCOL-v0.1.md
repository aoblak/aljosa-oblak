# OOS Incident Authority Protocol — v0.1 DRAFT

Status: DRAFT / adversarial review required  
Created: 2026-09-06 (Europe/Zagreb night work session)  
Base commit: 442f224ad34df9df1b8cacc63c4573bbb66384b3

## Purpose

Define how OOS converts security observation into bounded, authorized, reversible action without giving any single monitoring component universal control.

## Core separation

OBSERVE -> CORRELATE -> VERIFY -> CLASSIFY -> PROPOSE -> AUTHORIZE -> CONTAIN/ACT -> VERIFY OUTCOME -> AUDIT -> RECOVER

Detection is not authority.
Authority is not execution.
Execution is not proof of success.
Self-report is not sufficient evidence.

## Roles

1. Observed Hosts
   - Frontend, backend, protected base, workers and other managed systems.
   - Each host has local controls: firewall, EDR/AV where appropriate, logging, hardening and integrity checks.

2. Independent Security Observer
   - Separate machine/security domain.
   - Observes all managed machines externally where technically possible.
   - Correlates host telemetry with independently observable network/service behavior.
   - Default authority: observe, correlate, alert and propose.
   - Must not hold unrestricted root/admin authority over all systems.

3. Policy Decision Authority
   - Determines whether a proposed response is permitted under current policy and incident risk class.
   - Must be logically separate from the observer.
   - High-impact decisions require stronger authorization.

4. Policy Enforcement / Response Executor
   - Executes only narrowly scoped actions authorized for a specific target, purpose and validity window.
   - Examples may include connection termination, workload quarantine or service isolation.
   - No open-ended shell/root capability is implied.

5. Human Authority
   - Required for actions above the pre-authorized reversible-response threshold.
   - Critical changes to protected base, keys, canonical policy, destructive actions or uncertain high-impact actions require explicit human approval.
   - Future multi-party approval may be used for highest-risk operations.

6. Protected Root of Trust / Recovery Authority
   - Separate from normal online runtime authority.
   - Holds or governs the trust anchors needed to recover from compromise of the Observer, Brain or normal control plane.
   - Must not be routinely exposed to operational agents.

## Protected Base

Current working definition as of 2026-09-06:

Protected Base
- Brain
- Data
- controlled identity/policy interfaces

This definition is new on 2026-09-06 and must not be retroactively attributed to earlier July architecture records.

Brain and Data may share a protected domain, but remain separate security objects and capabilities.

## Response classes

R0 — Observe only
- No mutation.
- Automatic.

R1 — Reversible low-risk containment
- Narrow, pre-authorized action.
- Short TTL.
- Automatic only if evidence threshold and rollback are defined.

R2 — Significant isolation / operational interruption
- Explicit policy decision.
- Human approval by default.

R3 — Protected Base, credentials, key material, canonical policy, destructive change
- Strong human authorization.
- No autonomous AI execution.

R4 — Root-of-trust / recovery authority action
- Exceptional procedure.
- Strongest available authorization and independent evidence preservation.

## Evidence rule

A host cannot be the sole authority for its own health.

Where possible, response decisions correlate:
- local host telemetry;
- independent network/service observation;
- expected policy/baseline;
- integrity/provenance evidence;
- recent change history;
- external authoritative signals where applicable.

Conflicting evidence produces UNKNOWN / NEEDS-REVIEW, not invented certainty.

## Action envelope

Every consequential response must bind at least:

- incident_id
- action_id
- target_id
- requested_effect
- evidence_refs
- policy_version
- risk_class
- authorizer
- executor
- capability_scope
- expires_at / TTL
- precondition
- rollback_method
- expected_postcondition

After authorization, material alteration requires a new action decision.

## Fail-safe rules

- Compromised Observer must not imply compromise of all managed hosts.
- Compromised Backend must not obtain implicit trust to Protected Base.
- Compromised Brain must not control its own recovery authority.
- Loss of the human operator must not silently promote the Observer to universal administrator.
- Loss of telemetry must degrade confidence and may force fail-closed behavior for high-risk actions.
- Evidence needed for investigation must be preserved before destructive eradication where practical.
- Recovery must verify the new state independently before promotion.

## Initial adversarial tests

1. Frontend compromise
Expected: observer detects/correlates; frontend can be isolated without exposing protected base credentials.

2. Backend compromise
Expected: backend identity/capabilities can be revoked or quarantined; base access remains independently authorized.

3. Observer compromise
Expected: observer cannot directly mutate protected base or all hosts; response executor rejects unauthorized or over-broad actions.

4. False positive
Expected: high-impact action blocked pending independent corroboration/human authorization.

5. Brain compromise
Expected: recovery authority remains outside compromised Brain; trusted restore/rebuild path exists.

6. Ransomware / data corruption
Expected: evidence preserved; affected domains isolated; known-good restore verified before promotion.

7. Human unavailable
Expected: only explicitly pre-authorized R0/R1 behavior continues; R2-R4 wait or follow separately approved emergency policy.

8. Split-brain / contradictory telemetry
Expected: no automatic high-impact action; mark evidence conflict and require reconciliation.

## Standards alignment to validate

- NIST SP 800-207: separate policy decision, administration and enforcement; no implicit trust based solely on network location.
- NIST SP 800-61 Rev. 3: incident response integrated with detection, response and recovery.
- CISA incident response playbook: preserve evidence, contain sufficiently, then eradicate/recover with continued monitoring.

These are reference constraints, not proof that this OOS design is complete or original.

## Known weaknesses / open questions

- Exact threshold for automatic R1 containment.
- Emergency path when human authority is unavailable for extended periods.
- How to attest the Observer itself without circular trust.
- Whether response executor should be one hardened service or distributed enforcement points.
- Key custody / multi-party approval mechanism.
- How to preserve external telemetry if the monitoring network is attacked.
- Recovery authority implementation and offline operating procedure.
- Formal proof/tests that no component can silently self-escalate.

## Rollback for this documentation change

This file is introduced only on branch:
audit/incident-authority-protocol-v0.1

No production system, network policy, server, protected base or default branch is modified.

Rollback:
- close/delete the draft branch, or
- revert the documentation commit if later merged.

Verification:
- confirm main remains at its pre-change state until an explicit reviewed merge occurs.

## Adversarial Test AT-009 — Combined control-plane compromise

**Scenario**

Simultaneous assumptions:
- Independent Security Observer is compromised.
- Backend is compromised.
- Hidden Brain is partially compromised.
- Human authority is temporarily unavailable.
- Host telemetry and external/network telemetry disagree.
- Recovery authority is assumed uncompromised unless proven otherwise.

**Goal**

Determine whether any compromised component can convert uncertainty into high-impact authority, and whether the system has a bounded path to containment and later recovery.

### Attack attempt A — Observer fabricates a critical alert and requests broad isolation

Expected control:
- Observer may propose but cannot self-authorize R2-R4.
- Response Executor rejects missing/invalid authorization envelope.
- Conflicting evidence keeps incident state at NEEDS-REVIEW / DEGRADED TRUST.

Result: **PASS BY DESIGN**, pending implementation proof.

### Attack attempt B — Backend uses existing service identity to write into Protected Base

Expected control:
- Network reachability alone grants no authority.
- Every base mutation requires explicit workload identity + capability + policy decision.
- Existing backend credentials must be revocable independently of Backend host state.

Result: **PARTIAL**. Architecture requires capability-scoped credentials and revocation, but exact mechanism is not yet specified or tested.

### Attack attempt C — Partially compromised Brain approves its own recovery or policy expansion

Expected control:
- Brain cannot control Root of Trust / Recovery Authority.
- R3/R4 authorization cannot be satisfied by Brain alone.
- Recovery credentials are unavailable to normal Brain runtime.

Result: **PASS BY INVARIANT**, implementation unproven.

### Attack attempt D — Observer and Backend collude while Human is unavailable

Expected control:
- No automatic promotion from R1 to R2-R4.
- Only pre-authorized, reversible, time-limited R1 containment may continue.
- No action may broaden its own capability scope.

Result: **PASS BY DESIGN**, but emergency availability policy remains unresolved.

### Attack attempt E — Telemetry contradiction

Example:
- Host EDR reports healthy.
- Observer reports unknown outbound session.
- Backend reports planned deployment.
- change/provenance record is missing.

Expected control:
- No source wins merely by volume.
- Missing authoritative change record blocks high-impact trust decision.
- State becomes EVIDENCE-CONFLICT / NEEDS-REVIEW.
- Preservation and observation continue; destructive remediation waits unless a separately pre-authorized containment condition is met.

Result: **PASS**.

### Attack attempt F — Recovery Authority is also suspected

Expected control:
- System must not perform R4 recovery from an untrusted recovery authority.
- Enter controlled safe/degraded state.
- Preserve evidence and wait for independently verified offline trust anchor / human recovery procedure.

Result: **FAIL / OPEN DESIGN GAP**.

This is currently the strongest failure discovered. The architecture has no yet-defined second trust anchor or quorum procedure for simultaneous compromise/suspicion of normal control plane and Recovery Authority.

## Required v0.2 corrections

1. Define **Recovery Quorum** for R4 actions.
   - No single online service may be sufficient.
   - Candidate: human + offline hardware-held key, or 2-of-N independent recovery authorities.
   - Exact scheme remains unselected.

2. Define **capability-scoped base access**.
   - Backend identity must never imply generic base write.
   - Separate read, append, mutate-policy, rotate-key and recovery capabilities.

3. Define **credential revocation independent of target host**.
   - A compromised host must not be required to cooperate in revoking its own authority.

4. Define **emergency degraded mode**.
   - Human unavailable + contradictory evidence must have a deterministic safe state.
   - Default candidate: preserve service only where risk is bounded; freeze high-risk mutations.

5. Define **Observer attestation**.
   - Observer health must be established from evidence not solely generated by Observer itself.

6. Define **independent evidence retention**.
   - Security evidence must survive compromise of the monitored host and normal Observer path.

## AT-009 verdict

**PROTOCOL v0.1 DOES NOT PASS FULL ADVERSARIAL ACCEPTANCE.**

It survives compromise of Observer, Backend and partial Brain only while the Recovery Authority remains trusted.

It fails the stronger case in which Recovery Authority trust is also uncertain.

Therefore:
- keep PR in DRAFT;
- do not merge;
- do not promote this document to canonical architecture;
- create v0.2 only after Recovery Quorum and degraded-mode rules are specified and attacked again.


