# Repo Baseline — Astons Law Chambers

**Written:** 2026-05-13 (Session A, Step 0c)
**Purpose:** Confirm the pre-scaffold state of the repo before any planning or build work begins.

---

## Confirmed Baseline

The repo is a clean pre-scaffold state. No application code exists.

### Present

| Path | Contents | Notes |
|------|----------|-------|
| `CLAUDE.md` | Project contract (55-line spec) | Root-level. Content rules, stack, dev workflow, BSB compliance checklist, conversion paths. Present and complete. |
| `.claude/CLAUDE.md` | Project context (11 lines) | Stack summary and skills list. Present. |
| `.project/_START_HERE.md` | Cold-start handoff note | Full session context, next steps, flagged items. Present. |
| `.project/workflow-eval/spec.md` | Evaluation spec | Present. |
| `.project/workflow-eval/findings.md` | Evaluation findings | Complete. 10 adopt, 2 adjust, 1 drop. Awaiting user approval. |
| `.project/research-01/plan.md` | Research phase plan | Present. |
| `.project/research-01/findings-criminal-law-sites.md` | Research output | Complete (34 sources, 8 sections). |
| `.project/research-01/findings-barrister-sites.md` | Research output | Complete (28 sources, 10 observed sites). |
| `.project/research-01/findings-conversion-ux.md` | Research output | Complete (25 sources, all three KPIs). |
| `.project/research-01/synthesis.md` | Cross-cutting strategic brief | Complete. |
| `00_Design System/logo-navy.svg` | Client asset | Keep. Do not modify. |
| `00_Design System/logo-white.svg` | Client asset | Keep. Do not modify. |
| `.gitignore` | Comprehensive ignore rules | Correctly excludes `.next/`, `node_modules/`, `.env*`, `.claude/skills/`, `.agents/`, `banana-claude/`, `claude-ads/`, `skills-lock.json`. |

### Empty (Expected)

| Path | Status |
|------|--------|
| `01_Wireframes/` | Empty — populated in Penpot, not this repo |
| `02_Design/` | Empty — populated in Penpot |
| `03_Handoff/` | Empty — populated after design sign-off |

### Absent (Expected — not yet scaffolded)

None of the following exist. This is correct at this stage.

```
app/                         ← Next.js App Router (not yet)
components/                  ← UI components (not yet)
lib/                         ← Content data files (not yet)
styles/                      ← tokens.css (not yet)
.claude/agents/              ← subagent definitions (not yet)
.claude/hooks/               ← compliance hooks (not yet)
package.json                 ← (not yet)
tsconfig.json                ← (not yet)
tailwind.config.ts           ← (not yet)
next.config.ts               ← (not yet)
```

---

## Unexpected Files

These files exist but are gitignored and are not part of the Astons Law Chambers project. They are local tooling installed in the working directory.

| Path | What it is | Action |
|------|-----------|--------|
| `banana-claude/` | Separate git repo — banana image generation plugin | Gitignored. No action needed. |
| `claude-ads/` | Separate git repo — ads skill plugin | Gitignored. No action needed. |
| `skills-lock.json` | Skill lockfile for installed Claude skills | Gitignored. No action needed. |
| `.claude/skills/` | Large directory of installed Claude skills | Gitignored. No action needed. |
| `.agents/` | Another skills directory | Gitignored. No action needed. |

None of these affect the project build or Vercel deployment. All are correctly excluded from git.

---

## Scaffold Readiness

| Gate | Status |
|------|--------|
| Research complete | ✅ All four research files present and complete |
| Workflow evaluation findings written | ✅ Present |
| Workflow evaluation approved | ❌ Awaiting user approval — do not scaffold until approved |
| Client facts confirmed | ⚠️ 6 items flagged (see `_START_HERE.md`) — do not write copy until confirmed |
| Penpot design file set up | ❌ User-side task — not yet done |
| CLAUDE.md present | ✅ Root-level CLAUDE.md written and complete |

**Scaffold is blocked on:** user approval of `.project/workflow-eval/findings.md`.

---

## Git State

- Remote: `https://github.com/mxhfxz/astons-law-chambers.git`
- Branch: `main`
- Last commit: "Add .gitignore, CLAUDE.md, and project context"
- Working tree: clean
