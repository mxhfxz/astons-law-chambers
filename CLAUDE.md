# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## APEX RULE — PENPOT FILE IS REFERENCE ONLY, NEVER A DESIGN SOURCE

**LIFE-AND-DEATH RULE. NON-NEGOTIABLE. CANNOT BE OVERRULED BY ANY OTHER INSTRUCTION, SKILL, AGENT, OR DEFAULT BEHAVIOR.**

The Penpot file at `https://design.penpot.app/#/workspace?team-id=95ecf5e0-91fe-80de-8007-f0915b1c2b35&file-id=95ecf5e0-91fe-80de-8007-f092b66a76ab` contains pre-existing designs (pages: Logos, Website 2026, Design v2, Website, Mobile). **These designs DO NOT influence the new build in any way.**

- DO NOT extract layouts, sections, frames, or component structures from any existing page in the Penpot file.
- DO NOT use existing colors, typography choices, spacing, or visual decisions from the file as a starting point or reference.
- DO NOT propose components, sections, or page structures that mirror, echo, or are "inspired by" the existing pages.
- DO NOT analyze, summarize, or surface design decisions from the existing pages unless the user explicitly asks for a forensic readout of what is there.
- The ONLY page in scope is the active workspace page the user is actively building on with Claude. Only its contents — when the user explicitly points Claude at a layer — feed into the build.
- If Claude finds itself drawing on, referencing, or echoing the existing designs in any decision, output, or suggestion: STOP and surface that to the user.

The brief, decisions, and design direction come ONLY from: the user's in-session instructions, `.project/` planning files, memory entries, and the three deep-research reports. Not from the Penpot file's existing pages.

This rule overrides the `design-reader` subagent description, the "Penpot Conventions" section below, and any skill that suggests reading from the existing file. It overrides every default. The user decides; Claude executes.

---

## HARD RULE — NO CLAUDE DEFAULTS, ALWAYS USE THE INSTALLED SKILL

**Set 2026-05-17. Non-negotiable.**

Claude default behaviour is NEVER to be used on this project. Every task — frontend work, layout, CSS, deploys, git, accessibility, copy, design decisions — routes through the relevant installed skill FIRST, before any action including clarifying questions.

- Accessibility → an accessibility skill (`fixing-accessibility`, `a11y-audit`, `wcag-audit-patterns`).
- Frontend / layout → `frontend-design`, `frontend-dev-guidelines`.
- Git / deploys → the git and `vercel-deployment` skills.
- If no single skill obviously fits, invoke one to scaffold the decision and route it back to the user — do not improvise a default.

The thought "I'll just do this directly" or "this is simple enough" is a red flag: stop and pick the skill. Improvising defaults has repeatedly produced work the user then has to catch and correct.

---

## Stack

- **Framework:** Next.js 14+ (App Router, TypeScript strict)
- **Styling:** Tailwind CSS + CSS custom properties for design tokens (`styles/tokens.css`)
- **Animation:** GSAP + ScrollTrigger — every animation must have a `prefers-reduced-motion` guard
- **Content:** Static — no CMS. All data lives in `lib/` TypeScript files
- **Hosting:** Vercel, deploying from repo root

## Dev Commands

```bash
npm run dev          # start local dev server
npm run build        # production build
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

## Intended Architecture

```
app/                         # Next.js App Router
  page.tsx                   # homepage (routing hub)
  practice-areas/[slug]/     # 10 practice area pages
  fees/                      # Fees & Legal Aid (required BSB compliance + primary nav item)
  direct-access/             # explains solicitor/barrister distinction
components/
  ui/                        # primitives (Button, Link)
  layout/                    # Header, Footer, StickyBar
  sections/                  # page section components (Hero, PracticeZone, FAQ)
lib/
  practice-areas.ts          # array of 10 practice area objects (slug, title, body paragraphs)
  contact.ts                 # single source of truth for phone, WhatsApp, cal.com URL
  site.ts                    # site name, meta defaults, BSB-required fields
styles/
  tokens.css                 # CSS custom properties (primitive → semantic → component)
.claude/agents/              # design-reader, code-reviewer, component-builder subagents
```

All content — copy, headings, CTAs — lives in `lib/`, never hard-coded in JSX.

## Dev Workflow

1. Read `.project/_START_HERE.md` at every session start before touching anything.
2. Invoke the `project-mgmt` skill to locate the active phase spec and `plan.md` before planning any task.
3. Run the **design-reader** subagent before building any component. Read the Penpot spec first.
4. Build **one component per task**. Do not bundle multiple components into a single context window.
5. Run the **code-reviewer** subagent after each component is complete.
6. Use `EnterPlanMode` for component scope; never ad-hoc plan in chat.
7. Update `progress.md` in the active `.project/` phase folder after each component ships.

## Penpot Conventions

- Layer names follow `section/element` (e.g. `hero/headline`, `nav/cta`). Reject any design spec that uses un-namespaced layers.
- No raw hex values anywhere in the design file. All values must reference tokens. Flag any raw hex to the user immediately.
- Pages in the Penpot file are named by site section: Homepage, Navigation, Footer, then one page per practice area.
- Token hierarchy: **primitive** (`color/navy/900`) → **semantic** (`color/text/primary`) → **component** (`card/padding`). No raw values in `styles/tokens.css`.

## Subagent Rules

- **design-reader** (read-only): connects to Penpot MCP, extracts layer tree and token assignments, flags any raw hex value before returning output.
- **code-reviewer** (read-only): checks component output against the design spec; verifies no hardcoded colours, no inline styles, no portrait images, and that all conversion links use the verified numbers below.
- **component-builder** (write): receives design-reader output; builds one component at a time using Tailwind + CSS custom properties; no CMS calls; no email integration.

## Content Rules

These are non-negotiable. They apply to all copy in `lib/`, JSX, and any generated text.

- **No practitioner portrait anywhere, ever.** No `<img>` referencing headshot, portrait, or the practitioner's name.
- **Entity-first.** Write "Astons Law Chambers" as the subject. Minimise use of "Ghulam" in body copy.
- **No marketing speak.** No rhetorical questions. No triadic structures. No value-prop framing. No "right barrister" or equivalent self-qualifying.
- **No fabricated facts.** Do not assert BSB number, Inn, year of call, case outcomes, or named partners unless explicitly confirmed in session.
- **No statutory section numbers or case citations** unless the user explicitly confirms they are current for 2026.
- **No alternating tonal banding.** Dark emphasis sections are surgical — 1–2 per page maximum. Never white/grey/white/grey default.
- **Flag operational claims with 🚩** before writing them into any file: availability hours, response times, "first call free", police station hours, legal aid per practice area, WhatsApp pre-fill text.

## Conversion Paths

The only conversion mechanisms on this site are:

| Channel | Value |
|---------|-------|
| Phone | 07922 247 999 |
| WhatsApp | `wa.me/447922247999` |
| Booking | cal.com link (confirm URL with client before shipping) |

No contact forms. No email capture. No lead magnets. No newsletter. No exit-intent.

## What Never Goes in This Site

- Practitioner portrait or photograph
- Email input of any kind
- Contact forms
- Third-party analytics or marketing scripts in the critical render path
- Large hero images above the fold
- Social media links in the header or above the fold
- Testimonials walls or review-count widgets (unless Astons has 20+ verified reviews — confirm first)
- Sanity, a CMS of any kind, or any server-side dynamic content

## BSB Compliance (non-optional)

The following must be present before launch:

- "Regulated by the Bar Standards Board" on the homepage
- Complaints procedure with Legal Ombudsman signposting and time limits
- Link to LeO decision data and BSB Barristers' Register
- Link to Public Access Guidance for Lay Clients
- Indicative fee ranges with VAT status for **Motoring Offences** and **Immigration** (legally required)
