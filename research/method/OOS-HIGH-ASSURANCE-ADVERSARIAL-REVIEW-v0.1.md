# OOS High-Assurance Method — Adversarial Review v0.1

Status: METHOD ITSELF IS UNTRUSTED
Date: 2026-09-06
Parent method: LOOK -> USE -> IMPROVE -> CHALLENGE -> PROVE

## Meta-invariant
No test process may certify itself merely by producing PASS results.

## Meta parameters
M01 Test-oracle correctness
M02 Test independence
M03 Hidden dependency collapse
M04 Coverage completeness
M05 Combinatorial explosion
M06 Stale evidence
M07 Reproducibility
M08 Environment fidelity
M09 Adversarial diversity
M10 Model/reviewer correlated error
M11 Human confirmation bias
M12 Evidence authenticity
M13 Negative-result preservation
M14 Requirement drift
M15 Metric gaming
M16 Risk-class calibration
M17 Availability/security balance
M18 Complexity budget
M19 Recovery-test realism
M20 Stop-rule soundness
M21 Re-open rule
M22 External-knowledge freshness
M23 External-source monoculture
M24 Formal-vs-real gap
M25 Security theater

## Stronger acceptance structure
Three PASSes are necessary but not sufficient.

Critical parameter candidate acceptance requires:
- 3 materially independent tests;
- dependency graph checked;
- oracle reviewed;
- residual risk recorded;
- implementation evidence for production claims;
- no affected open meta-failure;
- change/version scope pinned.

System-level acceptance additionally requires:
- interaction/composition tests;
- recovery tests;
- meta-method tests;
- explicit risk-class target;
- external independent review where practical.

## AR-001 — Infinite parameter growth
Finding: method can become non-terminating and prevent delivery.
Result: FAIL.
Correction candidate: risk-ranked registry. New items record severity, exposure, blast radius, detectability, dependency centrality and assurance class. Lower-risk items may remain explicit residual risk.

## AR-002 — Three-PASS gaming
Finding: three easy variants can manufacture apparent assurance.
Result: FAIL.
Correction: three tests must use distinct attack families and distinct evidence paths where feasible. Independence is separately reviewed.

## AR-003 — AI self-review monoculture
Finding: one model designing, challenging and judging can preserve correlated blind spots.
Result: FAIL.
Correction: high-impact parameters require external baseline, heterogeneous reviewer/test generator where available, and ultimately executable evidence.

## AR-004 — Design-PASS inflation
Finding: paper reasoning can create an appearance of assurance without executable evidence.
Result: FAIL.
Correction: DESIGN-PASS never counts toward production acceptance.

## AR-005 — Requirement weakening
Finding: after failure, an invariant can be narrowed until it passes.
Result: FAIL.
Correction: preserve old invariant, reason for change, threats removed/retained and residual risk. A weaker replacement never erases the failed claim.

## Verdict
Current OOS assurance method: NOT ACCEPTED.

It is useful but vulnerable to infinite growth, PASS gaming, correlated blind spots, paper-assurance inflation and requirement weakening.

No architecture is accepted merely because it satisfies the parameter matrix while relevant meta-method failures remain unresolved.
