# Historical Recovery Batch 01 — Integration Record

Target repository: `aoblak/aljosa-oblak`  
Prepared branch: `history/recovery-batch-01`

## Repository comparison
The current public repository is the source for the personal website and public portfolio and explicitly excludes private client data, credentials, internal business records and unfinished experimental systems. OOS context-governance material already exists under `docs/`. No `history/` tree was present on `main` when checked on 2026-09-20.

## Integration boundary
Recovered artifacts belong under `history/2026/`, not in active application source and not in OOS Core.

Statuses:
- OBSERVED
- PROTOTYPE
- DEPLOYMENT UNKNOWN

The Game Agent starter remains historical and is not promoted into OOS Core. The Dunja package is historical source, not current production code. The Vento audit is represented only by a sanitized methodology note; the original third-party audit remains excluded.

## Safety review
The prepared recovery batch was scanned for hard-coded API tokens, passwords, private keys, `.env`, Terraform state, certificates and credential files; none were found. Cloudflare references use secret-variable names and placeholder zone IDs. Example lead data is synthetic.

## Historical interpretation boundary
The material documents earlier web, automation, WordPress, deployment and audit experiments. Similarities to later OOS / Architect of Impossible architecture are retrospective comparisons only.
