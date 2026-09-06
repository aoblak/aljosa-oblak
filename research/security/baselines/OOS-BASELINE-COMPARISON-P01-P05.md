# OOS Security Baseline Comparison — P01 to P05

Status: RESEARCH / NO ACCEPTANCE CREDIT
Date: 2026-09-06
Purpose: compare OOS critical parameters against established security architectures before further invention.

## Reference baselines

A. NIST Zero Trust Architecture (SP 800-207)
- Policy Engine (decision)
- Policy Administrator (establish/terminate path)
- Policy Enforcement Point (enforcement)
- control plane separated from data plane
- no implicit trust based on network location

B. NASA / Simplex Runtime Assurance
- Advanced Controller
- runtime monitor / decision module
- Reversionary/Safety Controller
- when unsafe behavior is detected, authority shifts to trusted safe controller

C. NIST information-flow controls / cross-domain guard principles
- logical/physical separation of information flows
- normalized internal representation
- data sanitization
- controlled modification/release between domains

D. OOS current differentiators
- independent external Observer
- one-way Second Brain semantic challenger
- provenance/Journaling
- authority decreases under uncertainty
- discard execution trust, preserve information
- Verified Recovery Candidate instead of “known-good”
- per-parameter 3-pass acceptance

## P01 Observer Independence

OOS hypothesis:
Observer monitors all managed machines externally and cannot directly authorize high-impact actions.

Best established baseline:
NIST PE/PA/PEP separation + Simplex runtime monitor.

Recommendation:
Do not invent an OOS-specific super-Gatekeeper.
Map Observer to evidence/monitoring input, not policy authority.
Map decision to Policy Engine-equivalent.
Map enforcement to PEP/response executor.
For safety fallback, adopt Simplex-style trusted reversion behavior where applicable.

Integration risk to test:
Observer, PE and PEP may share hidden infrastructure/identity dependencies.

Status:
KEEP OOS Observer concept, REPLACE authority model with NIST/Simplex separation.

## P02 Second Brain One-Way Isolation

OOS original claim:
A -> Second Brain -> B with no feedback from B.

Prior failure:
absolute no-feedback claim breaks under transport metadata, timing/backpressure and indirect B->A->SB influence.

Best established baseline:
Cross-domain information-flow enforcement:
- physically/logically separated flow;
- normalize input;
- regenerate output;
- sanitize/modify according to policy.

Recommendation:
Use protocol break / regenerated-message semantics rather than proxying a bidirectional connection.
Adopt the narrower OOS claim:
One-Way Semantic Input Boundary (OWSIB).

OWSIB guarantees:
- B cannot directly submit semantic instructions/content to SB;
- SB accepts semantic input only from authenticated A ingress;
- B-side transport metadata is not exposed as semantic SB input;
- output is newly generated/released material, not a transparent bidirectional session.

Residual:
timing/covert/indirect causal channels remain separate parameters.

Status:
REPLACE absolute no-feedback with OWSIB built on CDS/AC-4-style flow separation.

## P03 Second Brain Semantic Poisoning Resistance

OOS problem:
Allowed A-side content can itself contain prompt injection, false provenance or selective evidence.

Best established baseline:
Cross-domain guards normalize/sanitize/inspect content.
NIST ZTA supplies identity/context but not semantic truth.
No baseline removes the need for application-level provenance.

Recommendation:
Second Brain input must be a typed Evidence Envelope, not raw conversational context.

Candidate fields:
- evidence_id
- source_id
- source_authority_class
- acquisition_time
- freshness
- claim boundaries
- content_type
- integrity reference
- provenance chain
- expected coverage
- missing-evidence indicator
- untrusted_payload

Untrusted payload is never control text.

OOS-specific value retained:
claim-level provenance + semantic verifier + explicit UNKNOWN.

Status:
ADOPT guard normalization; retain OOS claim-level provenance as an extension.

## P04 Brain / Second Brain common-mode failure

OOS risk:
both reasoning systems can agree and still be wrong.

Best established baseline:
Simplex assumes the trusted fallback/safety controller is simpler and independently assured rather than merely a second copy of advanced logic.

Recommendation:
Do not treat “two AIs agree” as safety evidence.
Second Brain should not be a clone of Brain.
For critical invariants, final safety boundary must be deterministic/policy-based where feasible.

Independence dimensions to score:
- model/provider
- software/runtime
- context/evidence path
- host/hypervisor
- credentials
- network
- update/build chain
- operator
- trust anchor

If two components share a critical dependency, agreement counts as one domain.

Status:
REPLACE consensus logic with Simplex principle: diversity + simpler independently assured safety rules.

## P05 Protected Base access isolation

OOS hypothesis:
Protected Base contains Brain + Data, hidden from direct public access.

Best established baseline:
NIST ZTA resource-centric access + PEP.
Network isolation is defense-in-depth, not authority.

Recommendation:
Every Base operation passes a resource-side enforcement boundary:
identity -> capability -> policy decision -> enforcement -> postcondition/audit.

Network rules remain:
- no direct public ingress;
- minimal exposed services;
- segmentation;
- independent observation.

But location does not grant trust.

Candidate capability split:
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

Status:
ADOPT NIST resource/identity enforcement; retain physical/network isolation as defense-in-depth.

## Comparative conclusion P01-P05

Do not build these from scratch:

P01 -> NIST ZTA + Simplex
P02 -> cross-domain guard/data-diode information-flow pattern
P03 -> guard normalization + OOS provenance/evidence envelope
P04 -> Simplex diversity/fallback principle, not AI consensus
P05 -> NIST identity/capability/PEP enforcement + network isolation

## New integration attack targets

I01 shared identity-provider compromise
I02 shared hypervisor/common host
I03 shared CI/signing/update chain
I04 shared model/provider/context
I05 policy-engine compromise
I06 PEP/response-executor compromise
I07 protocol-break implementation flaw
I08 evidence-envelope parser/normalizer flaw
I09 deterministic safety-rule incompleteness
I10 fallback controller stale/vulnerable state

No PASS credits are assigned by comparison alone.
