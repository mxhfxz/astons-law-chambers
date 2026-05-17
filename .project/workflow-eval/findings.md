# Findings: Penpot + Claude Code Workflow Evaluation

**Issue**: workflow-eval
**Updated**: 2026-05-13
**Source**: Summary captured in `.project/_START_HERE.md` (original document not re-uploaded)

---

## Verdict Summary

| Section | Verdict | Notes |
|---------|---------|-------|
| Penpot folder structure | ✅ Adopt | Already reflected in repo |
| Layer naming convention | ✅ Adopt | `section/element` maps cleanly to React |
| Token hierarchy (primitive → semantic → component) | ✅ Adopt | Standard; no raw hex in Penpot |
| CLAUDE.md as contract | ✅ Adopt with additions | Dev rules only in document — content rules must be added |
| Hooks for compliance | ✅ Adopt | Enforceable at 100% vs ~70% via CLAUDE.md alone |
| Three subagents (design-reader, code-reviewer, component-builder) | ✅ Adopt | Prompts need project-specific scope |
| One component per task | ✅ Adopt | Prevents context bloat |
| Always read Penpot before building | ✅ Adopt | Critical discipline |
| Context management (/compact at 60%, /clear if bad) | ✅ Adopt | Standard |
| GSAP prefers-reduced-motion as convention | ⚠️ Adjust | Move to a hook; convention alone will be missed |
| Session workflow (Penpot → design-reader → plan → build → review → summary) | ✅ Adopt with adjustment | Plan step should invoke project-mgmt skill, not ad-hoc |
| Sanity CMS | ❌ Drop | User confirmed static; content lives in lib/ TypeScript files |

---

## Section-by-Section Detail

### 1. Penpot Folder Structure

Adopt as-is. The four-folder structure (`00_Design System`, `01_Wireframes`, `02_Design`, `03_Handoff`) is already reflected in the repo. No change needed.

**Gap:** No mention of what Penpot page names should be — recommend one page per site section (Homepage, Navigation, Footer, Criminal Defence, etc.) for clarity.

---

### 2. Layer Naming: `section/element`

Adopt as-is. Examples: `hero/headline`, `nav/cta`, `card/body-text`. Maps 1:1 to React component naming (`<HeroHeadline />`, `<NavCta />`). Enforce in design-reader prompt: reject any layers without `/`.

---

### 3. Token Hierarchy

Adopt as-is. Three levels:
- **Primitive:** raw values (`color/navy/900`, `spacing/4`)
- **Semantic:** purpose-bound (`color/text/primary`, `spacing/section-gap`)
- **Component:** scoped overrides (`card/padding`, `nav/height`)

No raw hex values anywhere in the Penpot file. This constraint should be stated in CLAUDE.md and checked by the code-reviewer subagent.

---

### 4. CLAUDE.md as Contract

**Adopt with significant additions.** The document covered only dev-workflow rules. The CLAUDE.md for this project must also include:

**Content rules (non-negotiable, from memory):**
- No practitioner portrait anywhere
- Minimise "Ghulam" in body copy; entity-first (Astons Law Chambers)
- No marketing speak, rhetorical questions, value-prop framing
- Conversion paths: phone (07922 247 999) + WhatsApp (wa.me/447922247999) + cal.com only
- No email capture, lead magnets, exit-intent, or nurture sequences
- No fabricated client facts (BSB number, Inn, year of call, cases, partners)
- No specific statutory section numbers or case citations without user confirmation
- Tonal banding: surgical (1–2 emphasis sections per page); never alternating

**Recommended CLAUDE.md outline:**
```
# Astons Law Chambers — Project Contract
## Stack (5 lines)
## Dev Workflow Rules (10 lines)
## Penpot Conventions (8 lines)
## Subagent Rules (6 lines)
## Content Rules (12 lines)
## Conversion Paths (4 lines)
## What Never Goes in This Site (8 lines)
```
Estimated total: ~55 lines. Well under the 200-line ceiling.

---

### 5. Hooks for Compliance

Adopt. Proposed hooks and their triggers:

| Hook | Trigger | Rejects when |
|------|---------|--------------|
| `secrets-gate` | pre-commit | Detects hardcoded secrets, API keys |
| `content-gate` | pre-commit | Detects portrait image filenames, email form markup |
| `reduced-motion` | post-build | Detects GSAP animations without `prefers-reduced-motion` media query check |
| `token-check` | post-design-read | Flags any Penpot layer value that is a raw hex (not a token reference) |

**Gap:** The document did not specify what `content-gate` should actually detect. Recommend defining a rejection list: `<form>` with email input, any img referencing "portrait", "headshot", "photo-ghulam", etc.

---

### 6. Three Subagents

Adopt with project-specific scope added to each prompt:

**design-reader** (read-only):
- Connect to Penpot MCP
- Navigate to specified page
- Extract layer tree, token assignments, component names
- Output structured list: component name → token list → dimensions
- Reject: any raw hex value found → flag immediately

**code-reviewer** (read-only):
- Check component output against design spec
- Check: no hardcoded colours, no inline styles, no portrait images
- Check: conversion links use correct numbers (07922 247 999, wa.me/447922247999)
- Check: GSAP animations have `prefers-reduced-motion` guard
- Output: pass / flag list

**component-builder** (write):
- Receive design-reader output
- Build one component at a time
- Uses Tailwind + CSS custom properties
- No CMS calls, no email integration

---

### 7. Session Workflow

Adopt with one adjustment — replace "Plan mode" with explicit project-mgmt skill invocation.

**Adjusted session rhythm:**
1. Open Penpot, navigate to correct page, confirm MCP connection
2. Run design-reader subagent (read-only; confirm design is ready)
3. Invoke `project-mgmt` skill → read plan.md for the active task
4. Enter Plan mode (EnterPlanMode) for component scope
5. Build one component (component-builder)
6. Run code-reviewer subagent
7. Update progress.md
8. Repeat from step 2 for next component, or write session summary and close

---

### 8. Sanity CMS

**Drop entirely.** User confirmed: static content, no CMS. Content model lives in `lib/` TypeScript files. Recommend:
- `lib/practice-areas.ts` — array of 10 practice area objects (slug, title, summary, body paragraphs)
- `lib/contact.ts` — single source of truth for phone, WhatsApp, cal.com URL
- `lib/site.ts` — site name, meta defaults

---

## Gaps (items the document was silent on)

1. **Verified facts enforcement** — no hook or rule for preventing fabricated client data. Needs a CLAUDE.md rule and a note in the code-reviewer prompt.
2. **301 redirect map** — document has no mention of URL migration from live site (`/criminal-defence/` → `/practice-areas/criminal-defence/`). Needs a task in plan.md before launch.
3. **Penpot page naming** — document specifies layer naming but not page/board naming. Recommend naming pages by site section.
4. **Typography scale** — document mentions font tokens but gives no recommended scale for a professional services site. Should be established in `00_Design System` before any page design.
5. **Breakpoints** — document mentions "all breakpoints" but does not define them. Recommend: 375 (mobile), 768 (tablet), 1280 (desktop), 1440 (wide).

---

## Technical Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| Drop Sanity CMS | User confirmed static; lib/ TypeScript is simpler and avoids CMS cost/complexity | 2026-05-13 |
| Move GSAP reduced-motion to hook | Convention is fragile under context pressure; hook enforces at 100% | 2026-05-13 |
| Add content rules to CLAUDE.md | Document only covered dev workflow; barrister-specific rules are non-negotiable | 2026-05-13 |
| Plan step → project-mgmt skill | Ad-hoc planning loses context across sessions; skill + plan.md is persistent | 2026-05-13 |

---

## Status

Findings complete. Awaiting user approval before any scaffolding begins.

**If approved:** proceed to write CLAUDE.md, create `.claude/agents/` and `.claude/hooks/`, scaffold `lib/` content files, and set up `styles/tokens.css`.
