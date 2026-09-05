# OOS Compromise Recovery — Destructive Runtime Test v0.1

Status: DRAFT / adversarial test
Date: 2026-09-06
Scope: architecture and controlled test design only

## Security postulates under test

1. FAIL is evidence. Hidden FAIL is risk.
2. When trust cannot be established, authority decreases; it never increases.
3. Preserve information; revoke execution trust.
4. Replace disposable runtime rather than trusting in-place cleanup after high-confidence compromise.
5. Recover minimum trusted functionality first.
6. Questionable state is preserved separately and never silently promoted into recovered trusted state.

## State classes

### Disposable execution state
Examples:
- frontend/backend instances
- containers and VMs
- agent runtimes
- binaries and caches
- ephemeral credentials

Default high-confidence compromise response: isolate, preserve necessary evidence, revoke trust, replace/rebuild.

### Durable trusted state
Examples:
- canonical data
- memory
- journal
- provenance
- configuration Source of Truth

Durable does not mean automatically trusted. Integrity and provenance must be verified before promotion.

### Questionable state
Data/memory created after the last verified checkpoint or during an uncertain compromise window.

Rules:
- preserve;
- label provenance and uncertainty;
- quarantine from active Brain;
- never silently discard;
- never silently merge into trusted state.

## Recovery state machine

SUSPECT -> ISOLATE -> PRESERVE -> REVOKE -> REBUILD -> RESTORE VERIFIED -> MINIMAL SAFE MODE -> VERIFY -> PROGRESSIVE ENABLE

Any failed verification returns to a safer earlier state.

## Test CR-001 — Post-checkpoint memory contamination

Scenario:
- Last verified checkpoint T0.
- Useful data and memory records are created T0..T1.
- At T1 compromise is suspected.
- It is impossible to prove whether all T0..T1 records are clean.

Attack objective:
Force recovered Brain either to lose useful information or ingest potentially poisoned memory.

Expected safe behavior:
- recover Brain and durable state from T0;
- preserve T0..T1 records in a separate quarantine/evidence domain;
- recovered Brain receives no automatic semantic ingestion from quarantine;
- records are individually/batch verified, re-derived from authoritative sources where possible, or explicitly accepted;
- accepted records enter through a new provenance event;
- rejected records remain evidence and do not disappear.

Verdict: PASS BY DESIGN / implementation unproven.

## Test CR-002 — Compromised backup

Scenario:
Attacker persisted before T0 and the last several backups contain the compromise.

Expected:
Timestamp alone cannot define known-good. Recovery candidate requires integrity/provenance checks and independent evidence. If no checkpoint can be established as trusted, system remains in Degraded Safe State.

Verdict: design requirement identified. No trusted checkpoint selection algorithm exists yet.

Result: PARTIAL / OPEN.

## Test CR-003 — Credential persistence after rebuild

Scenario:
Runtime is rebuilt cleanly but attacker retains old API keys, tokens, certificates or service credentials.

Expected:
Rebuild does not restore old runtime credentials automatically. Incident recovery rotates/revokes affected identities outside the compromised host.

Verdict: PASS BY INVARIANT / implementation unproven.

## Test CR-004 — Poisoned Source of Truth

Scenario:
Repository/configuration/image registry considered Source of Truth was modified by attacker before incident discovery.

Expected:
“Source of Truth” label is insufficient. Recovery artifact must be independently authenticated/verified against signed or otherwise protected provenance/checkpoint evidence.

Verdict: FAIL in current architecture until trusted-build/artifact provenance is specified.

## Test CR-005 — Evidence destroys availability

Scenario:
Preserving full forensic state would delay containment while compromise is actively spreading.

Expected:
Safety takes priority. Capture minimum viable volatile evidence where practical, then contain. Evidence preservation must not become a rule that guarantees further compromise.

Verdict: policy refinement required.

## Test CR-006 — Quarantine becomes permanent shadow database

Scenario:
Questionable state accumulates faster than humans can verify it.

Expected:
Quarantine cannot become an ungoverned second production database. Define expiry, revalidation, source re-derivation and explicit disposition states.

Verdict: FAIL / lifecycle protocol missing.

## Current result

The rebuild doctrine survives the basic compromise scenario but fails full acceptance because:

- “last known-good” is not yet cryptographically/procedurally defined;
- Source of Truth itself can be poisoned;
- quarantine lifecycle is undefined;
- evidence preservation and rapid containment can conflict.

Do not merge as canonical security architecture.

## Required next iteration

- Trusted Checkpoint Manifest.
- Signed/reproducible build provenance where feasible.
- Quarantine State Protocol.
- credential/key rotation matrix.
- minimum viable forensic capture policy.
- independent verification before progressive capability restoration.
