# Ask Humans + Ask AIs — Public Experiment Format v0.1

Status: PUBLIC-SAFE TEMPLATE

## Goal

Run one question through independent AI judgments, human responses, evidence, and optional observed behavior without collapsing them into one truth score.

## Required identifiers

- `experiment_id`
- `question_version`
- `canonical_ref`

Every AI and human-facing surface should reference the same question version.

## Recommended flow

```text
QUESTION
  ├─ Human pre-response
  ├─ Independent AI responses
  ├─ Evidence layer
  ├─ Human reconsideration
  ├─ Optional AI reconsideration
  └─ Optional observed behavior
          ↓
      SIGNAL VECTOR
          ↓
      RESULT ACTION
```

## Signal classes

- `EVIDENCE`
- `MODEL_JUDGMENT`
- `HUMAN_STATED_SIGNAL`
- `HUMAN_BEHAVIOR_SIGNAL`

They must remain separate in storage and reporting.

## Valid result actions

- `NONE`
- `PROMPT_CANDIDATE`
- `PROMPT_REVISION`
- `SKILL_CANDIDATE`
- `SKILL_REVISION`
- `FURTHER_EXPERIMENT`

## Reporting rules

A report may say:

- "73% of respondents in this voluntary LinkedIn sample preferred option A."
- "4 of 6 tested models independently selected option A."
- "Observed repeat usage was 18%."
- "Evidence for the underlying factual claim remains weak."

A report must not convert these into one composite "truth percentage".

## Anti-anchoring rule

When measuring independent AI judgment, collect all first-round model answers before exposing any model to another model's answer.

When measuring human opinion before AI influence, collect the human pre-response before showing AI outputs.

## Example output

```text
Experiment: exp-001
Question version: v1

Evidence: WEAK
AI judgments: 4 A / 2 B
Human pre: 61% A (voluntary web sample, n=312)
Human post: 72% A (same respondents, n=241)
Observed behavior: 19% completed the suggested action

Result action: FURTHER_EXPERIMENT
```

This format measures disagreement and movement. It does not force consensus.
