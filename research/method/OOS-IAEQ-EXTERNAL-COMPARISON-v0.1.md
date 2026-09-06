# OOS Assurance Method — External Comparison and Naming Check

Status: RESEARCH / NO NOVELTY CLAIM
Date: 2026-09-06
Working names reviewed: 3IAE, IAEQ, Three Independent Adversarial Evidence Gates

## Naming check

No established cybersecurity/assurance standard or framework was found using IAEQ with the intended meaning.

"Three independent reviews" and related phrases are already used publicly in AI assurance products and research. Therefore a name centered only on "three independent reviews" would be weakly distinctive.

Working recommendation:
Use IAEQ only as an internal working label until the method stabilizes.

## External patterns found

### PALO-AI external assurance plan
Uses three independent review tracks:
1. architecture/threat-model review;
2. cryptography/evidence review;
3. adversarial implementation assessment.

Lesson:
Independent assurance tracks are already emerging in agentic AI governance.

### SignalWitness
Runs three independent model reviews with different analytical mandates and no cross-review visibility.

Lesson:
Cross-model independence is already productized; model count alone is not a differentiator.

### EQUORA Trilith research plan
Uses assert-refute-adjudicate, multi-model triangulation, research logs and reproducibility checks.

Lesson:
Adversarial multi-model verification + logs + governance is active prior art.

### PRUVZ evidence-packet conformance
Uses three independent verifier implementations across different runtimes and frozen adversarial attack cases; all verifiers must agree on verdict and state.

Lesson:
Independent implementation diversity + fixed adversarial corpus + exact conformance is stronger than three conversational reviews.

### Safety-case literature
Long-established use of multiple independent lines of evidence to increase confidence, while explicitly examining whether those lines are genuinely independent.

Lesson:
"Independent evidence" is not new; dependency analysis is mandatory.

### Adversarial-defense literature
Combining multiple weak defenses does not necessarily create a strong defense.

Lesson:
Three weak PASSes can still be meaningless against an adaptive attacker.

## Method implication

The OOS method should not define itself by the number three.

The stronger core is:

- parameterized invariants;
- materially independent attack families;
- independent evidence paths;
- preserved FAIL/UNKNOWN history;
- dependency-collapse analysis;
- design-vs-implementation evidence separation;
- reset after affected design change;
- meta-assurance of the test process;
- STOP/REPORT/human gate.

Three remains a minimum threshold, not the identity of the method.

## Candidate internal definition

IAEQ — Independent Adversarial Evidence Qualification

For each critical parameter:
1. define invariant and threat scope;
2. establish external baseline/prior art;
3. run materially independent adversarial tests;
4. collect evidence from distinct domains where feasible;
5. preserve negative results;
6. invalidate credits after relevant design/dependency changes;
7. require implementation evidence for production claims;
8. stop only when residual critical unknowns are resolved or explicitly accepted.

Minimum qualification threshold:
three independent PASS evidences per critical parameter, subject to meta-assurance and dependency checks.

No novelty claim is made.
