# OOS — External Brief

Status: public-safe briefing  
Date: 2026-09-11

## What OOS is

OOS coordinates AI systems across real business and life workflows. The objective is not another chatbot, but a controlled path:

**Intent → Research → Decision → Execution → Verification → Record → Learn → Improve**

The human remains final authority for consequential actions. AI output is not accepted as truth merely because it sounds plausible; claims and actions should be tied to evidence, state and verification.

## Agent orchestration and cost model

Git/GitHub acts as shared context and coordination substrate. Specialized free or low-cost AI agents can perform bounded research, analysis, implementation, testing, documentation and adversarial review.

A stronger paid model can operate as the **conductor** instead of doing every low-level task: reconcile canonical context, dispatch work, compare results, resolve conflicts, request verification and escalate consequential decisions to the human.

**Canonical Git state → scoped task → specialized agents → artifact → verification → Git → next agent / conductor**

The design goal is lower model cost, parallel execution, provider independence and an auditable evidence trail. These remain hypotheses to be measured in real workloads.

## Real-world evidence: forensic reconciliation case

A real pricing-reconciliation task contained two conflicting policy records. The evidence showed that one value set could be mathematically derived from the other, but did not prove chronology, approval or effective production time.

Disposition: **STOP / NEEDS REVIEW**.

No production mutation was authorized or performed. When provenance is insufficient, OOS prefers `UNKNOWN / NEEDS REVIEW` to a confident unsupported action.

## Git evidence model

The underlying restricted Source of Truth contains the full task scope, isolated branch, review boundary, forensic report, decision record, structured state and immutable Git history.

For external review, those restricted references are intentionally abstracted. Reviewers can be granted controlled read access to the restricted repository when appropriate, or receive a sanitized evidence package that preserves provenance without exposing business-sensitive values.

## Why this matters

The core proposition is not that one AI model is always correct. It is that multiple replaceable AI systems can contribute work while Git-backed state, provenance, verification and human authority constrain what becomes accepted truth or consequential action.

> **Use inexpensive agents as the orchestra, a capable model as the conductor, Git as the shared score and evidence trail, and the human as final authority.**

OOS is also being used to coordinate, record and verify development of OOS itself.
