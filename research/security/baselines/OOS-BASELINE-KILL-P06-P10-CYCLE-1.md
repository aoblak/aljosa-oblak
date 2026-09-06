# OOS Baseline Comparison — P06 to P10 — Kill Cycle 1

Status: ADVERSARIAL DESIGN REVIEW / NO ACCEPTANCE CREDIT
Date: 2026-09-06
Method: LOOK -> USE -> IMPROVE -> KILL -> PROVE

Reference patterns:
- NIST SP 800-207: Policy Engine / Policy Administrator / Policy Enforcement Point, resource-centric authorization.
- NIST SP 800-53: separation of duties and least privilege.
- NASA Simplex / Runtime Assurance: untrusted advanced controller, runtime monitor, trusted/reversionary safety controller.

## P06 Brain / Data capability separation

LOOK:
NIST least privilege and separation of duties already require distinct duties/authorizations rather than ambient administrator power.

USE:
Split Brain execution from durable-data authority. No Brain identity receives generic database administration.

Candidate capabilities:
- DATA_READ_SCOPED
- DATA_APPEND
- DATA_MUTATE_SCOPED
- MEMORY_PROPOSE
- MEMORY_PROMOTE
- BRAIN_EXECUTE
- SCHEMA_MIGRATE

IMPROVE:
Memory promotion is a distinct authority from memory proposal.

KILL A — Brain RCE:
Attacker obtains arbitrary code execution in Brain and attempts database-wide mutation.
Expected: Brain token lacks broad mutation/schema capabilities.
Result: DESIGN-PASS if capability boundary is externally enforced.

KILL B — confused deputy:
Brain asks Backend/PEP to perform a mutation using a nominally valid workflow.
Finding: capability separation alone fails if policy does not bind operation, target, purpose and context.
Result: FAIL. Need object/action/context-bound authorization.

KILL C — stolen service identity:
Attacker steals Brain credential and replays from another workload.
Finding: bearer identity can collapse separation.
Result: FAIL unless workload identity is bound to instance/session/attestation and short lifetime.

P06 score: 0/3. Reset after correction.

New parameters:
P58 object/action/context binding.
P59 workload identity anti-replay.

## P07 Credential revocation independent of compromised host

LOOK:
ZTA assumes access can be denied/revoked by policy infrastructure outside the requesting resource/session.

USE:
Revocation must be enforced by PEP/identity boundary not by asking compromised workload to log out.

KILL A — host ignores revocation:
Expected: new access blocked externally.
Result: DESIGN-PASS.

KILL B — already-issued long-lived credential:
Finding: revocation latency may leave attacker access.
Result: FAIL unless short-lived credentials / active session termination / key rotation semantics are defined.

KILL C — identity control plane unavailable:
Finding: inability to consult revocation state can produce fail-open pressure.
Required: explicit fail-closed/degraded behavior by capability risk.
Result: FAIL / availability policy missing.

P07: 0/3.

New:
P60 revocation propagation latency.
P61 authorization behavior during IdP/PDP outage.

## P08 Human authority separation

LOOK:
NIST separation of duties explicitly addresses abuse of authorized privileges and recommends dividing functions/roles.

USE:
Routine operator, security approver, recovery authority and audit authority are distinct roles even if a small deployment sometimes maps multiple roles to one human.

KILL A — routine admin account compromise:
Expected: cannot perform R4.
Result: DESIGN-PASS if credentials/roles are genuinely separate.

KILL B — same human holds all recovery roles:
Finding: role separation on paper does not create independent authority.
Result: FAIL for high-impact R4 independence.

KILL C — emergency override:
Attacker/social engineer induces use of break-glass authority.
Finding: break-glass can collapse all separation.
Result: FAIL unless bounded, delayed/dual-confirmed where feasible, heavily audited and automatically expires.

P08: 0/3.

New:
P62 break-glass authority containment.
P63 role-to-person independence metric.

## P09 Recovery quorum independence

LOOK:
Separation of duties supports non-collocated authority; quorum patterns reduce single-authority failure, but quorum members can share dependencies.

USE:
Count trust domains, not signatures.

KILL A — two approvals, one compromised workstation:
Result: FAIL. Two credentials on one endpoint are one endpoint failure domain.

KILL B — two humans, same IdP:
Result: FAIL if IdP compromise can impersonate both.

KILL C — human + hardware key, same coercion/decision:
Result: FAIL against coercion/mistake; factor diversity is not authority diversity.

P09: 0/3.

Correction target:
quorum independence score must include person, endpoint, identity root, key custody and communication path.

New:
P64 quorum common-dependency analysis.

## P10 Recovery-key custody

LOOK:
Least privilege/separation-of-duties principles imply recovery secrets should not be routinely available to normal runtime or routine administrators.

USE:
Recovery key is offline/non-exportable where feasible and cannot be read by Brain/Backend/Observer.

KILL A — normal runtime compromise:
Expected: key unavailable.
Result: DESIGN-PASS if hardware/offline boundary is real.

KILL B — key loss/destruction:
Finding: strongest offline key can create unrecoverable availability failure.
Result: FAIL without independently protected recovery/escrow scheme.

KILL C — key use on compromised workstation:
Finding: non-exportable key may still authorize attacker-selected manifest if presentation/confirmation path is compromised.
Result: FAIL. Need trusted-path/manifest-binding and independent display/verification for high-impact recovery.

P10: 0/3.

New:
P65 recovery-key availability/escrow.
P66 trusted recovery confirmation path.

## Cycle conclusion

No parameter P06-P10 earns acceptance credit.

The comparison prevented reinvention but also exposed that adopting NIST/Simplex principles is not enough: implementation composition creates new failure modes.

Matrix expands from P01-P57 to P66.

Next kill scope:
P11 Evidence Integrity through P15 Verified Recovery Candidate eligibility, with external baseline search first.

No merge/canonization/production change.
