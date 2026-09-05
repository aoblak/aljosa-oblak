# OOS Incident Authority Protocol — v0.2 DRAFT

Status: DRAFT / falsification target
Created: 2026-09-06, Europe/Zagreb night work session
Parent hypothesis: v0.1 commit 894419041b673f033d2245d9f106fa3b382d69be
Reason for revision: AT-009 exposed loss of trusted recovery authority as an unresolved single-root failure.

## Objective
Remove the assumption that one online Recovery Authority remains trusted during compound compromise.

## Retained invariants
- Detection != authority.
- Authority != execution.
- Execution != proof of success.
- Self-report != sufficient evidence.
- Network location != trust.
- No component may silently expand its own capability.
- Compromised Brain cannot authorize its own recovery.
- Observer has no universal root.

## Recovery Quorum hypothesis
R4 actions require independent factors from different trust domains.

Candidate minimum:
1. Human Recovery Authority (HRA): explicit human intent through a dedicated recovery procedure.
2. Offline Recovery Key / Hardware Trust Anchor (ORK): normally offline and unavailable to Brain, Backend, Observer and normal Response Executor.

A valid R4 authorization requires HRA + ORK.
Normal online components may prepare evidence and a proposed plan but cannot satisfy the quorum.

## Capability model
Protected Base access is decomposed:
- BASE_READ
- DATA_APPEND
- DATA_MUTATE
- BRAIN_EXECUTE
- POLICY_PROPOSE
- POLICY_ACTIVATE
- CREDENTIAL_REVOKE
- KEY_ROTATE
- RECOVERY_PREPARE
- RECOVERY_COMMIT

Possession of one capability never implies another.
RECOVERY_COMMIT is R4 and cannot be held by normal online runtime.

## Host-independent revocation
Authority must be revocable without cooperation from the compromised host. Revocation decision/enforcement occurs outside the target host's administrative control; credentials should be short-lived where practical; revocation is independently auditable.

## Degraded Safe State (DSS)
DSS is entered when trust is insufficient for normal operation but evidence does not justify destructive recovery.

Triggers:
- contradictory high-confidence telemetry;
- Observer compromise suspected;
- Brain integrity uncertain;
- Recovery Authority uncertain;
- required human authority unavailable during R2-R4 incident;
- quorum cannot be established.

Allowed:
- preserve evidence;
- continue independent observation;
- maintain explicitly approved safety/availability functions;
- execute already authorized bounded R1 containment until TTL;
- revoke clearly compromised short-lived credentials where a pre-authorized rule exists.

Frozen by default:
- Protected Base mutation;
- policy activation;
- key rotation;
- privilege expansion;
- destructive remediation;
- software/firmware update;
- recovery commit;
- creation of new trust anchors.

DSS is not recovery. It is a controlled refusal to guess.

## Observer attestation hypothesis
Observer health cannot be established only by Observer telemetry.

Candidate evidence:
- measured/verified boot where supported;
- signed software/configuration measurements;
- external network behavior observation;
- expected heartbeat from a separate channel;
- externally anchored configuration/version record.

Failure to attest Observer reduces its evidence weight and blocks it as sole corroboration for R2-R4.

## Independent Evidence Vault hypothesis
Evidence needed for attribution/recovery must survive loss of monitored host, normal Observer, Backend and Brain.

Candidate properties:
- append-only ingestion;
- authenticated timestamps;
- hash chaining/integrity proofs;
- restricted write interface;
- no normal delete/update path;
- replicated or offline checkpoint;
- readers cannot rewrite historical evidence.

The vault is evidence infrastructure, not Brain and not a universal administrator.

## R4 recovery transaction
PREPARE
1. Collect independent evidence.
2. Freeze high-risk mutation.
3. Produce known-good target state and fallback plan.
4. Hash/sign the recovery manifest.

AUTHORIZE
5. HRA reviews the manifest.
6. ORK authorizes exactly that manifest, target and expiry.
7. Material change invalidates authorization.

EXECUTE
8. Dedicated Recovery Executor receives only bounded recovery capability.
9. Rebuild/restore from known-good source.
10. Normal runtime credentials are not reused automatically.

VERIFY
11. Independent verification checks identity, software/config measurements, data integrity and network behavior.
12. Verification must not rely solely on the recovered system.

PROMOTE
13. Return to normal service only after verification.
14. Temporary recovery capability expires/revokes.

AUDIT
15. Evidence, authorization, execution and verification are appended to the evidence record.

## AT-010 — Recovery proposal substitution
Observer, Backend and partial Brain are compromised; ORK is safe.
Expected: modified/unreviewed manifest cannot obtain RECOVERY_COMMIT.
Result: PASS BY DESIGN / implementation unproven.

## AT-011 — Normal human credential compromise
Attacker owns routine human admin session; ORK remains offline.
Expected: routine account cannot satisfy R4.
Result: PASS BY DESIGN if recovery identity is separate.

## AT-012 — Offline key theft
ORK is compromised; HRA is not.
Expected: ORK alone cannot satisfy quorum.
Result: PASS BY DESIGN.

## AT-013 — Human mistaken/coerced/malicious while holding ORK
Legitimate human approves a bad recovery manifest and controls ORK.
Expected finding: two-factor quorum does not protect against one authority controlling both factors.
Result: FAIL / OPEN DESIGN GAP.

Implication: factor separation != authority separation.

Potential corrections, not selected:
- two-person rule for highest-impact R4;
- M-of-N recovery trustees;
- mandatory independent verifier before commit;
- delayed activation/cooldown for non-emergency R4.

## AT-014 — Evidence Vault compromise
Attacker controls online Evidence Vault.
Expected: independent offline/replicated anchor detects divergence.
Result: PARTIAL; without an independent anchor, privileged vault compromise can rewrite claimed history.

## AT-015 — Quorum availability attack
Attacker cannot forge R4 but prevents quorum availability.
Expected: system remains in DSS rather than weakening authorization.
Result: SECURITY PASS / AVAILABILITY FAIL.
This is intentional fail-safe behavior; operational consequences remain to be quantified.

## Current verdict
NOT ACCEPTED.

v0.2 removes the v0.1 single-online-recovery-authority assumption but exposes a deeper problem:

factor separation is not the same as independent authority.

Next target: find the minimum independent-authority scheme that materially improves R4 security without making recovery operationally impossible for a small system/operator.

Do not merge to main.
