# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
