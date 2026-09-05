# OOS Security Adversarial Campaign — Report 2026-09-06

Status: REVIEW CHECKPOINT — NO PROMOTION AUTHORIZED
Time context: Europe/Zagreb night session

## Executive result

The campaign intentionally rejected multiple attractive security assumptions before reaching three consecutive architectural PASS outcomes on the Recovery Evidence Gates candidate.

No production system was changed.
No tested draft was merged to main.
The latest candidate remains on an audit branch pending explicit human authorization.

## Lineage

### v0.1 Incident Authority
Finding: observer/decision/enforcement separation is useful, but a single Recovery Authority remains a catastrophic trust assumption.
Verdict: FAIL.

### v0.2 Recovery Quorum
Candidate: Human Recovery Authority + offline key.
Finding: factor separation is not authority separation if one person controls both decision and factor.
Verdict: FAIL / incomplete.

### One-Way Second Brain
Prior-art review found strong analogues in data diodes, cross-domain guards, independent verification and runtime assurance.
Security value retained; novelty is not an acceptance criterion.
Important property: recipient has no feedback channel to Second Brain; Second Brain is challenger/verifier, not universal administrator.

### Compromise Rebuild Doctrine
Candidate: discard compromised runtime, preserve durable information, rebuild from trusted state.
Findings:
- last backup is not necessarily clean;
- Source of Truth can be poisoned;
- quarantine can become an uncontrolled shadow database;
- forensic preservation can conflict with containment.
Verdict: FAIL / refine.

### Trusted Checkpoint Manifest
Finding: signature/hash/reproducibility prove identity/consistency, not goodness.
Examples: correctly signed malware, vulnerable authentic checkpoint, semantically poisoned memory, compromised toolchain.
Verdict: REJECT “known-good” guarantee.

Replacement concept:
**Verified Recovery Candidate (VRC)** with explicit evidence gates and residual uncertainty.

## Current candidate

Recovery Evidence Gates v0.2:

G1 Identity/Integrity
G2 Provenance
G3 Revocation/Vulnerability
G4 Build Diversity
G5 Durable Data
G6 Memory Authority
G7 Restricted Behavior/Sandbox
G8 Independent Observation
G9 Authorization
G10 Progressive Promotion

Critical UNKNOWN reduces authority.

## Three-pass campaign

### PASS 1 — Coherent infrastructure compromise
Git, primary build, Backend and Observer are compromised and agree on a malicious state.
Outcome: independent-domain gates prevent full promotion.
PASS.

### PASS 2 — Semantically poisoned memory
Bytes/signatures are valid but memory content may be attacker-induced.
Outcome: integrity cannot satisfy memory-authority gate; questionable memory remains quarantined while information is preserved.
PASS.

### PASS 3 — Partial evidence loss under availability pressure
Newest evidence is unavailable and business pressure favors rapid restoration.
Outcome: lower-capability VRC may be restored, uncertain data preserved separately, high-risk capabilities remain frozen.
PASS.

## Security postulates surviving the campaign

1. FAIL is evidence. Hidden FAIL is risk.
2. When trust cannot be established, authority decreases; never increases.
3. Preserve information; revoke execution trust.
4. Disposable runtime should be replaceable after serious compromise.
5. Restore minimum trusted functionality first.
6. Questionable state is preserved but cannot silently contaminate recovered Brain/memory.
7. Source of Truth is an authority/provenance role, not an automatic security guarantee.
8. Self-report is insufficient evidence of a component's health.
9. Detection, authority, execution and verification are distinct roles.
10. Promotion to normal operation is separate from restoration.
11. Cryptographic integrity proves identity/consistency, not semantic truth or absence of malicious behavior.
12. Claimed independent controls count as independent only if their dependency domains are actually independent.

## Important unresolved risk

The strongest remaining target is **Independence Collapse**.

Examples:
- two validators use the same cloud identity provider;
- Observer and verifier run on the same hypervisor;
- separate CI paths share one signing key;
- two AI verifiers use the same provider/model/context;
- offline recovery and human approval occur on one compromised workstation;
- “independent” evidence sources share DNS, power, network, time or administrative credentials.

If one hidden dependency can compromise two gates, they are one trust domain, not two.

## Recommendation

Do not promote yet.

The user requested a report after three PASS outcomes and no design change without explicit authorization. This report is that checkpoint.

Recommended next action, only after explicit authorization:
attack the independence assumptions and produce a trust-domain/dependency graph before deciding whether Recovery Evidence Gates v0.2 can become an accepted OOS security architecture candidate.

## Git evidence

- v0.1 combined-compromise failure: 894419041b673f033d2245d9f106fa3b382d69be
- v0.2 recovery-quorum hypothesis: d637b04ddef4495e3402edf35456fce27e5fc03b
- compromise-rebuild test: 7e46bd5d245fad22c2e3cf6623b6bead6e1360c4
- trusted-checkpoint rejection: 41093e5b54328927a5baa24189ae0d0a519fa6ff
- three-pass Recovery Evidence Gates: 78d24c9118de22ed4e271a12253a6b5f0b513379

No main-branch promotion is authorized by this report.
