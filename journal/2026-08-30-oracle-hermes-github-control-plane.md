# 30 August 2026 — Oracle Always Free + Hermes + GitHub control plane

**Status:** Adopted architecture / implementation pending validation  
**Decision class:** Infrastructure / AI Agenti / OOS  
**Related:** OOS, AI Agenti, Hermes Agent, Oracle Cloud Infrastructure, GitHub, n8n, Manus, OpenAI

## Decision

Use the existing Oracle Cloud Always Free Ampere A1 allocation as a lightweight 24/7 control-plane host, not as the primary LLM inference machine.

Confirmed working design target for this tenancy:

- Oracle Ampere A1
- 2 OCPU
- 12 GB RAM
- Always-on Linux host
- resource use kept useful and conservative rather than artificially loaded

The Oracle node is a replaceable execution host. It is not part of the untouchable OOS base and must never become the only copy of canonical state.

## Hermes role

Hermes Agent is the preferred always-on agent/router candidate on Oracle.

Hermes is treated as a replaceable worker and orchestration gateway, not as the trusted Brain. Its intended roles include:

- 24/7 agent execution;
- scheduled and event-driven tasks;
- MCP/API integration;
- controlled browser/tool execution;
- routing to external model providers;
- routing to Manus where autonomous browser/computer-use is justified;
- routing to local/private workers when they are available;
- integration with n8n and project-specific adapters.

Canonical principle:

**Hermes is a Worker/Gateway. OOS policy and canonical state remain independent of Hermes.**

## ChatGPT / OpenAI role

ChatGPT remains the interactive planning, reasoning, architecture and QA surface. Programmatic integration must use supported OpenAI API/MCP interfaces rather than assuming that a ChatGPT Plus conversation itself is a permanently addressable backend service.

OpenAI API usage is treated as a replaceable external provider and is separately metered from ChatGPT subscriptions.

## Manus role

Manus is not the Brain and must not become a mandatory dependency.

Use Manus only for bounded workloads where its autonomous browser/computer-use capability materially outperforms our local/open tooling. Tasks should pass through a provider boundary so Manus can be removed or replaced without changing the OOS kernel.

## GitHub role

GitHub is mandatory for this infrastructure and becomes the source of truth for code, deployable configuration and recovery instructions.

Store in GitHub:

- infrastructure-as-code;
- bootstrap/install scripts;
- container/service definitions;
- version-pinned configuration templates;
- CI validation;
- security checks;
- health-check definitions;
- backup and restore scripts;
- rollback procedures;
- runbooks;
- architecture decisions and journal deltas;
- test fixtures and destructive qualification tests.

Never store in GitHub plaintext:

- API keys;
- passwords;
- private SSH keys;
- recovery secrets;
- database credentials;
- production tokens.

Secrets must be injected through an approved secrets mechanism and remain separately recoverable.

## Oracle Free Tier survival rule

The objective is legitimate continuous usefulness, not fake load designed merely to defeat idle-resource reclamation.

The instance should continuously perform real low-cost duties such as:

- Hermes agent/router availability;
- health monitoring;
- scheduled maintenance checks;
- GitHub sync/deployment checks;
- queues/webhooks;
- lightweight n8n workflows;
- MCP gateways;
- telemetry and audit forwarding;
- periodic backup verification;
- controlled synthetic self-tests that validate real service readiness.

Resource policy:

**minimum useful load, maximum headroom.**

Do not burn CPU or RAM simply to create artificial utilization. A free-tier dependency must be assumed reclaimable; therefore reconstruction from GitHub plus protected state backups must be automated and routinely tested.

## Maintenance baseline

Required maintenance loop:

1. daily service/health verification;
2. regular OS and dependency security review;
3. pinned and reviewed upgrades rather than unattended major-version drift;
4. configuration drift detection against GitHub;
5. backup success verification;
6. scheduled restore drills into an isolated environment;
7. disk, memory, CPU and network trend checks;
8. certificate and key-expiry monitoring;
9. dependency and container vulnerability review;
10. audit of exposed ports and firewall rules;
11. notification on service degradation, backup failure or unexpected drift.

## Recovery / rollback

Oracle is runtime, not source of truth.

If the VM disappears or is compromised, the expected recovery model is:

**new clean instance → bootstrap from GitHub → inject secrets → restore verified state → run qualification tests → promote**

No direct restoration of an unverified backup into production.

The existing OOS constitutional rules remain binding:

- acknowledged critical data target RPO = 0 where applicable;
- rollback preserves history;
- unknown external effects are reconciled, never blindly replayed;
- AI output is an untrusted proposal until policy/evidence authorize the effect;
- recovery and forensics are separate from ordinary availability.

## Security boundary

Oracle/Hermes must not receive unrestricted root authority over all projects.

Use least-privilege credentials, project-scoped capabilities and explicit provider adapters. High-risk actions remain behind the normal OOS risk model and approval gates.

Public ingress should terminate at a controlled edge/reverse proxy. Management access should be restricted and auditable. Secrets must be rotatable without rebuilding the architecture.

## Acceptance gate

This architecture is not considered production-qualified until the following are demonstrated:

- reproducible clean deployment from GitHub;
- reboot persistence;
- deliberate Hermes/service failure and recovery;
- configuration drift detection;
- secret rotation;
- backup restoration into quarantine;
- complete VM-loss reconstruction;
- external-provider outage behavior;
- network interruption behavior;
- audit continuity;
- rollback of one deployed change;
- proof that removing Hermes or Manus does not corrupt canonical state.

## Architectural summary

```text
                         USER / CHATGPT
                               |
                       controlled interfaces
                               |
                    +----------v----------+
                    |  OOS policy/router  |
                    +----------+----------+
                               |
                 ORACLE ALWAYS FREE 2/12
                               |
                    +----------v----------+
                    |       HERMES        |
                    | worker / gateway    |
                    +----+------+----+----+
                         |      |    |
                       n8n    MCP  browser
                         |      |    |
             +-----------+------+----+-----------+
             |                  |                |
          OpenAI              Manus          local/private
          provider            worker            workers

GitHub = code/config/recovery source of truth
Protected state/backups = separate from GitHub
OOS canonical trust/policy = independent of replaceable runtime
```

## Reusable lesson

A free cloud VM is valuable not because it can host the largest model, but because it can provide a permanent, low-cost coordination point. The design is robust only when the VM itself is disposable and the system can be reconstructed from versioned code, protected state and verified recovery procedures.
