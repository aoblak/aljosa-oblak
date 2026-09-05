# OOS Security Acceptance Protocol — RESET v1

Status: TEST PROTOCOL / no architecture acceptance
Date: 2026-09-06
Reason: prior “three passes” were too coarse. Acceptance campaign is reset.

## Governing rule

No OOS security candidate passes because it survived three scenarios overall.

Every critical invariant, trust assumption, failure domain and recovery property must independently earn three materially different PASS results against adversarial tests.

Any material design change affecting a parameter invalidates prior PASS credit for that parameter and all dependent parameters.

A newly discovered critical parameter is added to the matrix and must earn its own three PASS results.

## PASS validity

A PASS counts only when all are true:
1. test preconditions are explicit;
2. attacker capability is explicit;
3. expected safe outcome is explicit before result;
4. evidence needed to determine result is identified;
5. test is materially different from the other two PASS tests for that parameter;
6. no hidden assumption discovered during the test invalidates the result;
7. residual risk is recorded;
8. rollback/recovery behavior is defined where applicable;
9. result is reproducible in implementation before production acceptance.

Design-only PASS is marked DESIGN-PASS and cannot become production PASS without executable evidence.

## Result classes

FAIL — safety/security property broken.
PARTIAL — some property holds but a material gap remains.
UNKNOWN — insufficient evidence.
DESIGN-PASS — architecture produces a bounded safe outcome on paper; implementation not proven.
IMPLEMENTATION-PASS — reproducible executable evidence confirms expected outcome.

Only IMPLEMENTATION-PASS counts toward production acceptance.

## Reset rule

For each parameter:
P1, P2, P3 must be independent attacks.

If:
PASS, PASS, FAIL -> parameter resets to 0 after correction.
PASS, UNKNOWN -> no completion.
Design change -> affected PASS credits reset.
Shared hidden dependency -> apparently independent tests collapse into one evidence domain and may be invalidated.

## Initial critical matrix

P01 Observer independence
P02 Second Brain one-way isolation
P03 Second Brain semantic poisoning resistance
P04 Brain/Second-Brain common-mode failure
P05 Protected Base access isolation
P06 Brain/Data capability separation
P07 Credential revocation independent of compromised host
P08 Human authority separation
P09 Recovery quorum independence
P10 Recovery-key custody
P11 Evidence integrity
P12 Evidence availability
P13 Source-of-Truth poisoning resistance
P14 Build/toolchain compromise
P15 Verified Recovery Candidate eligibility
P16 Durable-data integrity
P17 Memory semantic contamination
P18 Quarantine lifecycle
P19 Progressive capability restoration
P20 Degraded Safe State correctness
P21 Network partition / split brain
P22 Replay/stale-message resistance
P23 Identity-provider compromise
P24 DNS/time/common infrastructure compromise
P25 Hypervisor/host common-mode compromise
P26 Cloud/account common-mode compromise
P27 Monitoring-network compromise
P28 Power/hardware failure
P29 Backup compromise
P30 Ransomware/destructive corruption
P31 Insider/malicious authorized operator
P32 Human error / 03:00 recovery
P33 Human unavailable
P34 Coercion/social-engineering approval
P35 Supply-chain dependency compromise
P36 Update/rollback attack
P37 Audit/provenance tampering
P38 Logging/telemetry deception
P39 Availability/DoS against security controls
P40 Emergency exception abuse
P41 Policy self-escalation
P42 Executor scope escape
P43 Key rotation failure
P44 Secret leakage
P45 Cross-agent prompt/instruction injection
P46 Indirect causal feedback B->A->SecondBrain
P47 Data exfiltration through allowed semantic output
P48 Covert-channel risk across one-way boundary
P49 Recovery evidence conflict
P50 Total loss of trust anchors

This list is open-ended. Discovery adds parameters.

## Immediate reset finding

Previous three Recovery Evidence Gate passes are retained as historical evidence but are NOT acceptance credits under this stricter protocol.

Current acceptance score:
0 parameters accepted.
0 production PASS triplets.
50 initial critical parameters requiring attack.

## Stop condition

STOP + REPORT occurs only when:
- every known critical parameter has three materially independent PASS results at the required evidence level;
- no unresolved critical UNKNOWN/PARTIAL/FAIL exists;
- no newly discovered critical assumption remains untested;
- dependency analysis shows the three tests are not secretly one common failure domain;
- residual risks are explicit.

After STOP + REPORT:
NO merge, canonization or production change without explicit user authorization.

## First kill target

P01 Observer independence.

Attack families:
A. Observer host/runtime compromise.
B. Observer's upstream dependencies compromised while host appears healthy.
C. Observer evidence path manipulated while local attestation remains valid.

Expected invariant:
Observer can never become sole authority for R2-R4; loss of Observer trust reduces authority and cannot silently convert its claims into execution rights.
