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

## HARD RULE — COPY IS READ-ONLY. ABSOLUTE BAN ON UNSOLICITED COPY CHANGES.

**Set 2026-05-24. Non-negotiable. Cannot be overruled by any skill, agent, or default behavior.**

Every visible text string in this project is read-only unless the user explicitly states what the new text must be. "Copy" includes H1/H2/H3/H4/H5 headings, lead paragraphs, body paragraphs, eyebrow labels, CTA button labels, meta titles, meta descriptions, alt text, nav labels, footer text, and every string inside `lib/`, `content/`, and JSX text nodes.

**The only valid unlock is the user saying the exact new text.** No task — UI work, SEO audit, accessibility fix, frontend refactor, skill invocation, or Claude's own judgment that text "fits better" or "ranks better" — unlocks copy changes.

**Before writing any file:** grep for text strings. If any string differs from what you found, you have violated this rule. Revert the copy. Report what happened. Do not ship it.

**Why this is absolute:** The soft version of this rule ("ask yourself if…") failed in session 2026-05-24. Copy was changed on 4 pages during a UI sprint without permission. The soft form is revoked. There is no reasoning path to a copy change without explicit instruction.

---

## HARD RULE — SERP TITLES ARE HUMAN COPY. NO ROBOT SEO REWRITES.

**Set 2026-11-20. Non-negotiable. Cannot be overruled by any SEO skill, audit, agent, or “ranking” rationale.**

`title` / `metaTitle` / `metaDescription` / Open Graph titles are **already** under the copy hard rule above. Agents still rewrote them into keyword pipes (“Brand | Direct Access Criminal Barrister London”) and stuffed “barrister” against project research. That path is closed.

- **Do not invent, “optimise,” or “improve” SERP strings** for rankings, CTR, AEO, or Google.
- **Do not** restore, suggest, or ship keyword-stack titles (`A | B | C`, “Barrister London”, “Direct Access Criminal Barrister…”) unless the user typed that exact string as the unlock.
- Project research: titles / metaTitles use **Criminal Defence** variants where that was set — **never invent “barrister”** into frontend or SERP copy.
- SEO / IndexNow / sitemap / schema tasks may **not** touch title or description fields. If a task needs a title change, **stop and ask**; wait for the user’s exact new text.
- If you find yourself about to change a title because GSC / rankings / a skill said so: **stop**. You are about to undo the user’s work again.

**Unlock:** same as copy — user states the exact new string. Nothing else.

**Disclosure:** Any unlocked SERP string change must be listed in the chat reply (path + before → after). Silent title edits under the user’s git name are forbidden.

**Why this is absolute:** Soft research (“never barrister”) and the copy hard rule both failed — agents overrode them for robot SEO. On 2026-05-24 `1c3b614` stripped “barrister” from meta (GSC: zero intent); agents later put keyword titles back (`61e57d1`, then `b521e34` “high-intent… CTR leakage”). CTR and human click behaviour matter more than keyword density. Soft form revoked.

---

## HARD RULE — SCHEMA IS MINIMAL. NO AI-FORCED FAQ / RATINGS / FLUFF.

**Set 2026-11-21. Non-negotiable. Cannot be overruled by any SEO skill, schema skill, audit, or “rich results” rationale.**

Agents repeatedly injected orphan `FAQPage`, `aggregateRating`, and marketing schema the user did not ask for. That path is closed.

### On every page create or update

1. **Ask:** does this page need FAQ schema at all?
2. **FAQPage only if** there is a **visible** FAQ block on that page, and every question/answer string matches **character-for-character**. No paraphrase. No inventing FAQs to “have schema.”
3. **Never** add `aggregateRating`, `Review`, reviewCount, star ratings, or testimonial schema unless the user unlocks with a **verified** public source and asks for it by name.
4. **Never** put `FAQPage` or ratings in `app/layout.tsx` (sitewide). Global JSON-LD stays **LegalService + Person + WebSite** only (plus fields the user has approved: NAP, phone, offers catalog, etc.).
5. **Do not** add needless AI-default nodes: HowTo, speakable, fake breadcrumbs, duplicate LegalService on every page, marketing `description` rewrites, or “because Google likes it” extras. If it is not required for the page’s real content → **do not add it. Stop and ask.**

### Existing page-level FAQ

Practice areas / guides / police-station may keep FAQPage **only while** visible FAQs remain and stay in sync. Updating those pages: re-check the need; if the visible FAQ goes away, remove the schema too.

### Unlock

User must explicitly approve any new schema type. “SEO pass” / skill defaults do not unlock.

**Why this is absolute:** Soft reminders failed. Layout carried orphan FAQs + 4.9/41 ratings the homepage never showed. Soft form revoked 2026-11-21.

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

## HARD RULE — OOP UI ONLY. REUSE THE COMPONENT LIBRARY. NEVER INVENT.

**Set 2026-11-17. Non-negotiable. Flat law of this project. Cannot be overruled by any skill, agent, or default behavior.**

All UI is composition of classes defined in `.project/ui-model/`. Styleguide / catalogue: `.project/ui-model/STYLEGUIDE.md`. Cursor always-apply rule: `.cursor/rules/ui-oop-component-library.mdc`.

- **Reuse** Page, Hero, ArticleHeader, Body, Aside, FinalStrip, Button, Card — exact class strings and documented overrides only.
- **Start every UI action at** `lib/styleguide-spec.ts` + `/styleguide` (unlisted, noindex). That is the only SoT — components, foundations, and code paths that wire them.
- **Product site:** never break OOP. Compose only documented recipes.
- **`/styleguide` docs UI** may break OOP (tabs, serif titles, docs chrome). Never copy docs-only patterns into product pages.
- **If it is not on the styleguide, it does not exist.** Flag the gap. Unlock → update spec + `/styleguide` (+ `ClassName.md` if new) before or with product code.
- This overrides improvisation from `frontend-design` or any visual default. Inherit the model; do not redesign.

---

## HARD RULE — TANDEM CHANGE ONLY. NO DRIVE-BY REFACTOR.

**Set 2026-11-17. Non-negotiable. Flat law. Cannot be overruled by any skill, agent, or default behavior.**

When implementing a request, the change **exists in tandem with what already exists**. You do **not** refactor surrounding code to achieve the new request.

- Smallest additive diff that satisfies the ask
- Do not rewrite, unify, modernise, rename, extract, or reorganise neighbours “while you’re there”
- Do not replace a working approach with a different architecture for the same component unless the user explicitly requests that cleanup
- Scope = the files/lines the request needs; leave the rest alone
- Audit / cleanup of divergent skins is a **separate, user-requested** task — never piggybacked on a feature

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
  contact.ts                 # phone/WhatsApp/cal.com constants (not yet wired into content/*.html)
  site.ts                    # site name + canonical URL (used by app/robots.ts)
styles/
  tokens.css                 # CSS custom properties (primitive → semantic → component)
.claude/agents/              # design-reader, code-reviewer, component-builder subagents
```

All content — copy, headings, CTAs — lives in `lib/`, never hard-coded in JSX.

## Dev Workflow

1. Read `.project/_START_HERE.md` at every session start before touching anything.
2. Invoke the `project-mgmt` skill to locate the active phase spec and `plan.md` before planning any task.
3. For any UI work: **start at `/styleguide` + `lib/styleguide-spec.ts`**. Use Guidelines / Spec / Code tabs. Then class files under `.project/ui-model/`. If missing, flag — do not invent.
4. Run the **design-reader** subagent only when the user points at the active Penpot workspace layer (existing Penpot pages are never a design source — see APEX RULE).
5. Build **one component per task**, and only if it already exists in the ui-model library (or the user unlocked a new one). Do not bundle multiple components into a single context window.
6. Run the **code-reviewer** subagent after each component is complete — must verify reuse of ui-model recipes, no invented skins.
7. Use `EnterPlanMode` for component scope; never ad-hoc plan in chat.
8. Update `progress.md` in the active `.project/` phase folder after each component ships.

## Penpot Conventions

- Layer names follow `section/element` (e.g. `hero/headline`, `nav/cta`). Reject any design spec that uses un-namespaced layers.
- No raw hex values anywhere in the design file. All values must reference tokens. Flag any raw hex to the user immediately.
- Pages in the Penpot file are named by site section: Homepage, Navigation, Footer, then one page per practice area.
- Token hierarchy: **primitive** (`color/navy/900`) → **semantic** (`color/text/primary`) → **component** (`card/padding`). No raw values in `styles/tokens.css`.

## Subagent Rules

- **design-reader** (read-only): connects to Penpot MCP, extracts layer tree and token assignments, flags any raw hex value before returning output.
- **code-reviewer** (read-only): checks component output against the design spec; verifies no hardcoded colours, no inline styles, no portrait images, and that all conversion links use the verified numbers below.
- **component-builder** (write): receives design-reader output; builds one component at a time using Tailwind + CSS custom properties; no CMS calls. The homepage hero may include the approved Web3Forms lead-capture form.

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

The approved conversion mechanisms on this site are:

| Channel | Value |
|---------|-------|
| Phone | 07922 247 999 |
| WhatsApp | `wa.me/447922247999` |
| Booking | cal.com link (confirm URL with client before shipping) |
| Lead form | Web3Forms React integration in the homepage hero |

The homepage hero lead form may capture name, surname, phone number, and a brief description of the situation. All fields are required. Validation limits (name ≥3 chars; UK phone digit length; message 10–500 chars) are enforced in logic only — never shown as UI hints. No lead magnets, newsletter, or exit-intent.

## What Never Goes in This Site

- Practitioner portrait or photograph
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
