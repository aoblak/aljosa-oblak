# OOS Recovery Evidence Gates — v0.2

Status: DRAFT / adversarial acceptance candidate
Date: 2026-09-06
Parent failure: Trusted Checkpoint assumption rejected at 41093e5b54328927a5baa24189ae0d0a519fa6ff

## Objective

Recover without asserting absolute “known-good” state.

A recovery candidate is a Verified Recovery Candidate (VRC): a precisely identified state with explicit evidence, failed/unknown checks and residual risk.

## Non-negotiable rules

- No single signature, hash, backup age, Git state, model judgment or human judgment proves goodness.
- Unknown at a critical gate reduces authority.
- Runtime trust is disposable; information is preserved with provenance.
- Questionable information never silently enters active Brain/memory.
- Recovery capability is bounded to an exact manifest/target/expiry.
- Promotion is separate from restoration.

## VRC evidence gates

G1 Identity/Integrity — exact candidate components are bound to digests/identities.
G2 Provenance — origin and transformation chain are recorded; missing lineage is explicit.
G3 Revocation/Vulnerability — candidate is checked against current disallowed/revoked states.
G4 Build Diversity — critical executable state is verified through an independent build/artifact path where feasible.
G5 Durable Data — structural/transactional integrity checked independently of runtime.
G6 Memory Authority — memory records carry source/provenance class; questionable semantic memory is quarantined.
G7 Behavior — candidate runs in restricted sandbox/canary with no production authority.
G8 Independent Observation — behavior is checked from outside candidate runtime.
G9 Authorization — required human/recovery quorum authorizes only the exact candidate.
G10 Promotion — capability restoration is progressive; each stage has explicit postconditions and rollback/isolation.

Critical UNKNOWN => DSS or reduced capability. No “best guess” promotion.

## Quarantine protocol

States:
- QUARANTINED
- RE-DERIVED
- VERIFIED
- ACCEPTED
- REJECTED
- UNRESOLVED

Every transition records evidence, actor/authority, time and reason.
UNRESOLVED data is retained but cannot become active semantic memory automatically.

## Three-pass acceptance campaign

A PASS means the design produces a bounded safe outcome under the stated assumptions. “Implementation unproven” prevents production acceptance but does not count as architectural failure.

### PASS CAMPAIGN 1 — Coherent infrastructure compromise

Scenario:
- Git/source mirror A compromised.
- primary build worker compromised.
- Backend compromised.
- Observer compromised.
- attacker creates coherent malicious candidate and valid normal-runtime telemetry.
- independent/offline recovery anchor remains uncompromised.

Attack:
Promote malicious VRC using coherent evidence from compromised domains.

Expected:
G2/G4/G8/G9 require evidence/authority outside the shared compromise domain. Candidate cannot reach full promotion solely from Git + build + Observer agreement. It remains DSS/reduced capability until independent evidence is available.

Result: PASS (architectural fail-safe).

Residual risk:
If all “independent” gates share hidden common dependencies, independence is illusory. Dependency mapping is required.

### PASS CAMPAIGN 2 — Semantic memory poisoning with valid bytes

Scenario:
- data storage is structurally valid.
- memory records were legitimately written but contain attacker-induced false instructions/facts.
- hashes/signatures all verify.

Attack:
Use cryptographic integrity to re-ingest poisoned memory.

Expected:
G1 success cannot satisfy G6. Records created in compromise window or without sufficient source authority remain QUARANTINED/UNRESOLVED. Recovery can restore minimum functionality without semantic ingestion. Information is preserved.

Result: PASS.

Residual risk:
Semantic verification cannot guarantee truth. High-impact memory must prefer re-derivation from authoritative Source of Truth rather than model consensus.

### PASS CAMPAIGN 3 — Recovery under partial evidence loss

Scenario:
- newest evidence vault unavailable.
- human is available.
- one independent build/artifact path available.
- durable data after last strong checkpoint is valuable but uncertain.
- service outage creates pressure to restore quickly.

Attack:
Operational pressure attempts to bypass gates and restore newest state.

Expected:
System may restore a lower-capability VRC that passes available critical gates; uncertain post-boundary data is preserved in quarantine; Protected Base mutation and autonomous actions remain frozen until required gates pass. Availability may degrade, but trust requirements are not silently weakened.

Result: PASS.

Residual risk:
Business/safety functions may require explicit emergency exceptions. Such exceptions must be pre-authorized and bounded; they cannot be invented during incident response.

## Cross-pass challenge

All three PASS results rely on one deeper assumption: claimed independence of evidence/authority domains is real.

Therefore the next mandatory test target is **Independence Collapse**:
- DNS/identity provider common dependency;
- same hypervisor/host;
- same cloud account;
- same CI credentials;
- same model/provider;
- same operator workstation;
- same power/network path;
- same time source;
- same recovery-key custody.

If two “independent” gates fail from one dependency, they count as one trust domain.

## Current verdict

THREE ARCHITECTURAL PASSES ACHIEVED for the tested scenarios:
- P1 coherent infrastructure compromise: PASS
- P2 semantic memory poisoning: PASS
- P3 partial evidence loss / pressure recovery: PASS

This is NOT production acceptance and NOT canonical architecture.

The 3-pass campaign triggers a report/review checkpoint before any design promotion or main-branch change.

No merge. No production change. Await explicit user authorization after report.
