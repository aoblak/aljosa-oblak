# OOS Trusted Checkpoint Manifest — Adversarial Test v0.1

Status: DRAFT / intentionally attacked
Date: 2026-09-06
Parent test: OOS-COMPROMISE-RECOVERY-TEST-v0.1
Purpose: determine whether a “known-good” recovery point can remain trustworthy when normal infrastructure is suspect.

## Candidate manifest

A checkpoint candidate C contains references/digests for:
- Brain/runtime artifact
- canonical configuration
- schema/migrations
- durable data checkpoint
- memory checkpoint
- policy version
- identity/trust configuration
- build inputs/toolchain where available
- provenance/journal boundary
- creation time and sequence
- verification evidence

Manifest M binds those elements by cryptographic digest and is signed/anchored outside normal runtime authority.

## Claim under attack

“If M verifies, C is known-good.”

This claim is deliberately considered FALSE until the following attacks are resolved.

## TC-001 — Correctly signed malicious state

Scenario:
Attacker compromises build/source before checkpoint creation. Authorized process honestly hashes and signs the already-malicious artifact.

Finding:
Signature proves which bytes were approved, not that bytes are benign.

Result: FAIL.

Required correction:
Known-good requires behavioral/security evidence and provenance, not signature alone.

## TC-002 — Compromised signing authority

Scenario:
Attacker obtains checkpoint signing key and creates a valid manifest for malicious state.

Finding:
Single signing key is a catastrophic trust root.

Result: FAIL.

Required correction:
Checkpoint trust must not depend on one routinely-online key. Independent/offline anchoring or quorum is required for high-assurance promotion.

## TC-003 — Rollback to vulnerable but authentic state

Scenario:
Old checkpoint is authentic and uncompromised, but contains a known exploitable vulnerability.

Finding:
Authenticity != current safety.

Result: FAIL.

Required correction:
Recovery eligibility must include current vulnerability/revocation policy. Some authentic checkpoints must become permanently ineligible.

## TC-004 — Data is valid, memory is semantically poisoned

Scenario:
Database pages and hashes are intact. Memory contains attacker-induced false facts/instructions created through legitimate application writes before compromise detection.

Finding:
Cryptographic integrity cannot prove semantic truth.

Result: FAIL.

Required correction:
Memory needs provenance, source authority and revalidation rules distinct from byte integrity.

## TC-005 — Reproducible malicious build

Scenario:
Source, compiler inputs and resulting binary reproduce perfectly, but source itself contains malicious logic.

Finding:
Reproducibility proves consistency, not goodness.

Result: FAIL.

## TC-006 — Build toolchain compromise / trusting-trust attack

Scenario:
Source appears clean but compiler/build environment injects malicious behavior.

Finding:
Source review + reproducible output from one compromised toolchain is insufficient.

Result: FAIL / hard problem.

Candidate mitigations:
- diverse/reproducible builds;
- independently sourced toolchains;
- signed provenance;
- binary transparency/attestation;
- minimal trusted build base.

None is accepted yet.

## TC-007 — Timestamp/replay attack

Scenario:
Attacker presents an old valid manifest as the latest trusted checkpoint.

Expected:
Manifest sequence/epoch and revocation state are externally anchored; stale checkpoint cannot silently supersede newer trust state.

Result: requirement identified; implementation absent.

## TC-008 — Evidence-anchor compromise

Scenario:
Manifest, signing key and online evidence index are all compromised.

Finding:
An online trust stack can manufacture a coherent false history.

Result: FAIL.

Required correction:
At least one trust anchor/checkpoint must be outside the ordinary compromise domain, potentially offline or independently administered.

## TC-009 — All digital anchors disagree

Scenario:
Git, backup hashes, Observer evidence, manifest history and offline copy disagree.

Expected:
System cannot prove known-good.

Safe result:
Do not invent a trusted state. Enter Degraded Safe State / manual forensic recovery. Preserve all candidates and evidence.

Result: PASS AS FAIL-SAFE, availability may be severely reduced.

## TC-010 — Perfectly valid state causes unacceptable data loss

Scenario:
Only provably clean checkpoint is substantially older than current durable data.

Expected:
Recover clean execution state while quarantining post-checkpoint information for later revalidation/re-derivation. Do not silently destroy it and do not silently ingest it.

Result: PASS BY DESIGN / quarantine protocol still incomplete.

## Critical conclusion

A Trusted Checkpoint Manifest cannot prove “goodness.”

It can prove a bounded set of narrower claims:
- identity of bytes/state;
- linkage between components;
- chronology/sequence if independently anchored;
- authorization history;
- consistency with recorded provenance.

It cannot by itself prove:
- absence of malicious logic;
- semantic truth of memory;
- absence of unknown vulnerabilities;
- uncompromised toolchain;
- correctness of the human/AI decision that approved it.

Therefore rename the concept:

**Verified Recovery Candidate (VRC)**

A VRC is not “known-good.” It is a recovery candidate with explicit evidence and residual uncertainty.

## Proposed recovery eligibility gates

A VRC may be promoted only if it passes independent gates appropriate to risk:
1. provenance/integrity gate;
2. revocation/vulnerability gate;
3. build/artifact gate;
4. data consistency gate;
5. memory/source-authority gate;
6. behavior/sandbox gate;
7. independent verification gate;
8. required human/quorum authorization.

Failure or uncertainty at a critical gate reduces authority and may keep the system in DSS.

## Verdict

TRUSTED CHECKPOINT MANIFEST v0.1: REJECTED as a security guarantee.

The manifest remains useful as evidence infrastructure, but “known-good” is too strong.

New working concept:
VERIFIED RECOVERY CANDIDATE + explicit eligibility gates + residual-risk record.

Do not merge as canonical architecture.
