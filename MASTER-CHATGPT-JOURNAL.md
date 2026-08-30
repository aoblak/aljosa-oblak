# ALJOŠA × ChatGPT — MASTER JOURNAL

**Version:** 0.1.5  
**Date:** 2026-08-30  
**Status:** Reconstructed baseline / living artifact  
**Scope:** Available conversation history, persistent project artifacts, and recoverable project context. This is not claimed to be a verbatim export of every ChatGPT message ever exchanged.

## Purpose

This document reconstructs Aljoša Oblak's work with ChatGPT as one continuous innovation journal rather than disconnected chats.

Recurring pattern:

**real problem → research → prototype → failure → correction → abstraction → reusable system → business model**

## Journal governance and traceability

`MASTER-CHATGPT-JOURNAL.md` is the single canonical cross-project journal. Project-specific journals remain authoritative for their detailed histories and are linked rather than silently duplicated.

Every substantive entry should record decision date/status, related projects, repositories/artifacts, evidence, rejected alternatives, risks, validation gates and traceable links where available. Missing or uncertain links are marked unresolved, never invented.

## Foundational doctrine

**THE BASE IS UNTOUCHABLE. EVERYTHING AROUND IT IS REPLACEABLE.**

The trusted base contains only the minimum identity, policy, provenance, audit and canonical state required for coherence. Providers, agents, interfaces, automations, clouds and experiments connect through controlled contracts and remain replaceable.

## Core development doctrine

**LESS IS MORE → IMMUTABLE BASE → CONTROLLED INTERFACES → READINESS → DECISIVE EXECUTION**

**idea → define invariants → attempt to break → observe failure → correct root cause → regression test → collect evidence → accept, restrict or reject**

Operational rules include: no evidence means no fact; unknown is a valid value; ACK is a recovery guarantee; critical acknowledged writes target RPO=0 where applicable; rollback preserves history; unknown external effects enter reconciliation; AI output is an untrusted proposal; human sovereignty remains final for irreversible legal, physical, safety-critical and contractual effects.

## 2025–2026 reconstructed trajectory

The work evolved from practical engineering and reusable documentation into local AI infrastructure, agent tooling, business automation, NERA — The First Dog OS, ArcaNina, Dunja/CHC, Kairos and OOS. Across these projects, repeated concerns were abstracted into reusable capabilities: identity, policy, tasks, routing, providers, provenance, audit, bookings, media, geocoding, outreach and recovery.

NERA established strong trust rules around verified locations, photography, provenance, coordinates and evidence-based content. ArcaNina established reusable booking/session abstractions and ethical content boundaries. Kairos contributed the less-is-more/readiness doctrine. OOS consolidated these lessons into a project-neutral trusted task-execution architecture.

## OOS canonical execution model

**project / user / agent → signed Task Envelope → identity/capability check → policy/risk decision → optional simulation → replaceable provider → verified result + provenance + audit**

Reference trust zones:

1. Edge and replaceable adapters.
2. Private OOS Core and canonical data.
3. Recovery, Twin and Forensics in a separate failure domain.

The offline/hardware root of trust supports these zones and is not an Internet-accessible control plane.

Canonical task lifecycle:

**RECEIVED → DURABLE_INTENT → AUTHORIZED → EXECUTING → EFFECT_VERIFIED → DURABLE_COMMIT → FORENSIC_ANCHOR → FINAL_ACK**

Ambiguous external effects enter:

**EFFECT_UNKNOWN → RECONCILE → VERIFIED or MANUAL_REVIEW**

## 25 August 2026 — Destructive Qualification Gate

Adopted as mandatory for OOS, Kairos and derived projects. Architecture, security, feasibility and operations cannot honestly score 10/10 from tabletop analysis alone. Operational qualification requires implementation evidence, fault injection, restore drills, measured recovery objectives and zero invariant violations across the agreed campaign.

Mandatory test families include primary failure around ACK transitions; network partitions and split-brain; storage/event corruption; region loss; compromised credentials; poisoned updates; supply-chain compromise; prompt injection and memory poisoning; ambiguous provider receipts; audit failure; key loss; insider misuse; privacy/retention conflicts; failover during suspected cyberattack; full reconstruction; correlated bugs; and cost/latency/complexity/maintainability limits.

## 30 August 2026 — HRM assessment

HRM is accepted as a research/architectural candidate but deferred for production integration. The valuable pattern is separation of reasoning timescales: high-level intent/constraints → bounded execution → independent validation → re-plan or controlled commit. HRM weights are not part of the trusted base. Any future specialist integration must remain isolated, benchmarked and replaceable.

## 30 August 2026 — Oracle Always Free + Hermes + GitHub control plane

**Status:** Adopted architecture / implementation pending destructive validation  
**Related:** OOS, AI Agenti, Hermes Agent, Oracle Cloud Infrastructure, GitHub, n8n, Manus, OpenAI

### Decision

Use the existing Oracle Cloud Always Free Ampere A1 allocation as a lightweight 24/7 control-plane host, not as the primary LLM inference machine.

Target tenancy allocation:

- Ampere A1;
- 2 OCPU;
- 12 GB RAM;
- always-on Linux host;
- minimum useful load, maximum operational headroom.

The Oracle VM is explicitly **replaceable runtime**, never the untouchable base and never the sole copy of canonical state.

### Hermes

Hermes Agent is the preferred always-on agent/router candidate. It is a **Worker/Gateway, not the Brain**. Intended roles include scheduled/event-driven execution, MCP/API integration, bounded browser/tool execution, n8n integration, and routing toward OpenAI, Manus or local/private workers.

Removing or replacing Hermes must not corrupt canonical state or require redesign of the OOS kernel.

### ChatGPT / OpenAI

ChatGPT remains the interactive planning, reasoning, architecture and QA surface. Programmatic automation uses supported API/MCP interfaces rather than assuming a ChatGPT conversation is a permanently addressable backend. OpenAI API is a separately metered, replaceable provider.

### Manus

Manus remains an optional specialist worker for bounded workloads where autonomous browser/computer-use materially outperforms local/open tooling. It must never become a mandatory dependency or trusted Brain.

### GitHub — source of truth

GitHub is mandatory for this infrastructure and becomes the source of truth for code, deployable configuration and recovery instructions.

Version in GitHub:

- infrastructure-as-code;
- bootstrap/install/deploy scripts;
- service/container definitions;
- pinned configuration templates;
- CI/security validation;
- health checks and monitoring definitions;
- backup/restore/rollback procedures;
- runbooks and ADRs;
- journal deltas;
- destructive qualification tests.

Never commit plaintext API keys, passwords, SSH private keys, database credentials, recovery secrets, production tokens or sensitive production state. Use approved secret injection/storage and ensure secrets are independently recoverable and rotatable.

### Oracle Free Tier operating policy

The objective is legitimate continuous usefulness, not artificial CPU/RAM burning intended solely to evade idle-resource reclamation.

Useful continuous duties may include Hermes availability, health monitoring, maintenance checks, GitHub deployment/drift checks, queues/webhooks, lightweight n8n workflows, MCP gateways, telemetry/audit forwarding, backup verification and controlled synthetic readiness tests.

**Policy:** minimum useful load, maximum headroom.

The free VM is assumed reclaimable. Therefore complete reconstruction must be automated and routinely tested.

### Maintenance baseline

1. Daily service and health verification.
2. Regular OS/dependency security review.
3. Pinned, reviewed upgrades; no uncontrolled major-version drift.
4. Configuration drift detection against GitHub.
5. Backup-success verification.
6. Isolated restore drills.
7. Disk/RAM/CPU/network trend monitoring.
8. Certificate/key expiry monitoring.
9. Dependency/container vulnerability review.
10. Exposed-port/firewall audit.
11. Alerting on degradation, backup failure and unexpected drift.

### Recovery baseline

**new clean instance → bootstrap from GitHub → inject secrets → restore verified state → qualification tests → promote**

No unverified backup is restored directly into production. Availability, backup and forensics remain separate controls.

### Security boundary

Oracle/Hermes receives least-privilege, project-scoped capabilities. Public ingress terminates at a controlled edge/reverse proxy. High-risk actions remain subject to the OOS risk/approval model. Secrets must be rotatable without redesigning the architecture.

### Acceptance gate

Production qualification requires demonstrated clean deployment from GitHub, reboot persistence, deliberate service failure/recovery, drift detection, secret rotation, quarantine restore, total VM-loss reconstruction, external-provider outage handling, network-interruption behavior, audit continuity, deployment rollback and proof that Hermes/Manus can be removed without corrupting canonical state.

### Architecture summary

```text
USER / CHATGPT
      |
controlled interfaces
      |
OOS policy / router
      |
Oracle Always Free 2 OCPU / 12 GB
      |
Hermes worker / gateway
  |       |       |
 n8n     MCP    browser
  |       |       |
OpenAI  Manus  local/private workers

GitHub = code/config/recovery source of truth
Protected state/backups = separate from GitHub
OOS canonical trust/policy = independent of replaceable runtime
```

**Reusable lesson:** a free cloud VM is valuable as a permanent low-cost coordination point only when the VM itself is disposable and reconstruction from versioned code, protected state and verified recovery procedures is routine.

## OOS Knowledge Engine

Development conversations are reusable intellectual assets. Qualifying discussions can generate journal entries, tutorials, case studies, ADRs, lessons learned, troubleshooting guides, competitive analyses and course modules. Automation must include a quality/provenance gate rather than turning every chat into content.

## Recurring operating principles

1. The base is untouchable; everything around it is replaceable.
2. Less is more, but readiness matters.
3. Unknown is better than invented.
4. Trust is architecture.
5. A working UI does not prove a working system.
6. Feature count is not progress.
7. Competitive value matters after technical validity.
8. Failures are reusable assets.
9. Build reusable cores, not repeated projects.
10. Monetization follows utility and trust.
11. Development itself can become a product.
12. Runtime infrastructure must be reconstructible; no free/cloud VM is canonical state.

## Canonical file set

- `MASTER-CHATGPT-JOURNAL.md` — single canonical cross-project journal;
- `KNOWLEDGE-INDEX.md`;
- `TUTORIAL-INDEX.md`;
- `ADR-INDEX.md`;
- `FAILURE-LESSONS.md`;
- per-project canonical journals;
- `journal/` — dated deltas feeding the canonical master.

## Reconstruction limits

This journal remains a reconstructed baseline from recoverable conversation context and persistent artifacts, not a guaranteed verbatim export of every historical conversation. Future versions should ingest more recoverable history, attach stronger source references, assign stable knowledge-object IDs and link decisions to implementation/release evidence.

**End of v0.1.5**