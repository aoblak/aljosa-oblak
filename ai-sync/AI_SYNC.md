# AI Sync — Public Working Contract v0.1

Status: PUBLIC-SAFE / WORKING CONTRACT

This file is a common synchronization point for AI systems collaborating with Aljosa Oblak.

## Current operating model

OOS remains the control/governance layer. Do not create parallel cores.

Current public-safe capability direction:

- Prompt Factory
- Prompt Registry
- Skill Factory
- Skill Registry

These are capabilities/modules, not new cores.

## Prompt vs Skill

### Prompt

A prompt is lightweight and easy to share.

Expected properties:
- human-readable
- usually a single Markdown artifact
- usable without installation
- minimal operational complexity
- suitable for free distribution
- suitable as a lead magnet
- versionable and attributable
- may later become input to Skill Factory

Prompts are shared.

### Skill

A skill is an operational package.

Expected properties:
- defined purpose
- workflow
- input/output contract
- boundaries and failure behavior
- version
- provenance
- tests or validation where applicable
- compatibility metadata
- may contain one or more prompts
- may be installable/distributable
- may be commercialized

Skills are products/capabilities, not merely longer prompts.

## Lifecycle

```text
PROBLEM / IDEA
      ↓
Prompt Factory
      ↓
Simple Prompt
      ↓
Prompt Registry
      ↓
Use / Feedback / Evidence
      ↓
Skill Factory
      ↓
Tested Skill
      ↓
Skill Registry
      ↓
Distribution / Installation / Commercialization
```

Not every prompt becomes a skill.

Promotion from prompt to skill requires evidence that the behavior is repeatable and valuable enough to justify a structured operational package.

## Distribution principle

Git is the shared source of truth for public-safe artifacts.

AI systems should consume prompts and skills by:
- stable ID
- version
- canonical Git path/ref
- hash when available

The human should not have to manually copy/paste the same prompt among AI systems.

## Cost principle

External-agent work should default to cost-aware execution:

```text
SCOPE → INDEX → FILTER → TARGETED READ → STOP WHEN SUFFICIENT
```

Do not expand scope automatically when the required conclusion is already supported.

## Alignment check for any AI joining the system

After reading this file, return a short alignment report containing:

1. UNDERSTOOD — summarize Prompt vs Skill in your own words.
2. AGREE / CONCERN — identify architectural concerns or contradictions.
3. COMPATIBILITY — state whether you can consume canonical artifacts from public Git by URL/ref.
4. WRITEBACK — state whether you can write to Git directly, indirectly, or not at all.
5. COST CONTROL — state how you would minimize unnecessary token/credit/tool use.
6. PROPOSED CHANGE — suggest at most one change, only if materially useful.

Do not claim access or write capability that you do not actually have.

## Non-goals

- no autonomous creation of new OOS cores
- no hidden prompt duplication across providers
- no assumption that a model remembers previous sessions
- no private data in this public sync package
- no forced agreement between AI systems

Disagreement is useful when supported by concrete reasoning or evidence.
