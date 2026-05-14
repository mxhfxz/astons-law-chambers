# Cold-Start Handoff — Astons Law Chambers

**Date written:** 2026-05-14 (updated after Penpot connect + apex rule lock)
**Read this before touching anything.**

---

## APEX RULES (READ FIRST — NON-NEGOTIABLE)

1. **User instruction is absolute.** Overrides every memory, skill, default, and prior decision. No deviation under any condition.
2. **The pre-existing pages in the Penpot file are NOT a design source.** This is a life-and-death rule.
   - File `Astons` contains: `Logos`, `Website 2026`, `Design v2`, `Website`, `Mobile`. **NONE** of these influence the build.
   - The ONLY in-scope page is `With Claude` (`page-id=fbd0c4dd-760c-804b-8008-04284678d008`) — currently blank.
   - DO NOT extract layouts, sections, colors, typography, or component structures from the other pages.
   - DO NOT propose anything "inspired by" or "echoing" the existing designs.
   - DO NOT analyze or summarize the existing pages unless the user explicitly asks for a forensic readout.
   - Full text of this rule: `CLAUDE.md` top of file + `memory/feedback_penpot_existing_designs_off_limits.md`.

Brief, direction, and decisions come ONLY from: user's in-session instructions, `.project/` planning files (00–17), memory entries, and the three deep-research reports.

---

## Current state (2026-05-14 — Phase 1 scaffold session)

**Planning Phase C is complete.** All planning files 00–17 are written plus `.project/plan.md` (8-phase build plan).

**Phase 1 scaffold written this session — DoD not yet validated.** All 18 deliverables from `.project/plan.md` Phase 1 exist on disk:

| # | File | Notes |
|---|------|-------|
| 1 | `package.json` | Next 14.x, npm, Node 20.x pinned |
| 2 | `tsconfig.json` | strict + `@/` path aliases |
| 3 | `.eslintrc.json` | hex + inline-style enforcement |
| 4 | `next.config.mjs` | `.mjs` not `.ts` — Next 14 does not support `.ts` config natively. Includes `trailingSlash: true` (per SEO spec) |
| 5 | `tailwind.config.ts` + `postcss.config.mjs` | Tailwind references semantic CSS vars; postcss added (needed for build) |
| 6 | `styles/tokens.css` | Primitive layer only (semantic + component layers land in Phase 2 alongside Penpot design pass) |
| 7 | `styles/globals.css` | Imports tokens.css; minimal reset |
| 8 | `app/layout.tsx` + placeholder `Header.tsx` / `Footer.tsx` / `StickyBar.tsx` | Inter + Playfair via `next/font`. Layout components are placeholders for Phase 3 |
| 9 | `lib/practice-areas.ts` | 10 stubs (slug, title, priority, BSB-fee-disclosure flag). Zones empty. `legalAidAvailable: null` per area |
| 10 | `lib/contact.ts` | Phone + WhatsApp confirmed. **WhatsApp prefill + Cal.com URL confirmed in session (2026-05-14)** — see Phase 0 confirmations below |
| 11 | `lib/site.ts` | Site metadata + BSB regulatory statement. BSB number remains empty (fabrication-blocked) |
| 12 | `hooks/useReducedMotion.ts` | Per spec §6 |
| 13 | `hooks/useStickyBarVisibility.ts` | Threshold-based (show after scrolling past 600px on mobile). Phase 3 may revise |
| 14 | `.claude/agents/` | design-reader, code-reviewer, component-builder. Apex Penpot rule embedded in design-reader |
| 15 | `vercel.json` | Redirects + headers (HSTS added per SEO spec on top of plan §4 set) |
| 16 | `app/robots.ts` | Chose App Router native over `public/robots.txt`. AI-crawler blocks + sitemap reference |
| 17 | `CLAUDE.md` | Verified current, no edits needed |
| 18 | This file | (you are reading the update) |

**Gap to surface — DoD not met yet:**

- Phase 1 DoD requires "All 10 practice area slugs resolve in `generateStaticParams`" — that needs `app/practice-areas/[slug]/page.tsx` to exist. It is NOT in the 18-deliverable list. Same for `app/page.tsx` (otherwise build prints "no pages found"). Both are required before `npm run build` can pass against the DoD. User decision pending: add minimal stub pages now (still in Phase 1 spirit) or defer to Phase 4/5.
- Validation runs not yet executed: `npm install`, `npm run type-check`, `npm run lint`, `npm run build`. All deferred until user reviews and approves the scaffold.

**Phase 0 confirmations completed this session (2026-05-14):**

| Flag | Status | Notes |
|------|--------|-------|
| 🚩1 24/7 availability | **Already resolved** in `memory/verified_facts.md` (2026-05-13 hero round). Reconfirmed via WhatsApp prefill |
| 🚩2 Police station duty advice | **Already resolved** in `memory/verified_facts.md` (2026-05-13). Reconfirmed via WhatsApp prefill: "Police station callouts are available 24 hours" |
| 🚩3 Legal aid per practice area | **PARTIAL.** New today: legal aid is provided **through the firms Ghulam works with** — partner solicitor firms, not direct. Per-area `legalAidAvailable` boolean per practice area still unresolved at finer granularity. See `memory/verified_facts.md` |
| 🚩4 WhatsApp pre-fill text | **RESOLVED.** Text in `lib/contact.ts`. Typos corrected from client-supplied draft |
| Cal.com URL | **RESOLVED.** `https://cal.com/astonslaw/callback?overlayCalendar=true` in `lib/contact.ts` |

**Security:** 5 `npm audit` findings accepted at end of Phase 1. Rationale per-CVE in `.project/security-notes.md`. Re-evaluate at every dependency change and at Phase 7 pre-launch.

**Phase 0 confirmations still open:**

- 🚩5 Response time commitment — leaning toward no fixed commitment per verified_facts ("No published reply-time commitment for missed calls or WhatsApp messages")
- 🚩6 Free initial consultation — verified_facts records "First call: Free initial conversation. No fee, no duration framing." May already be resolved; recheck before Phase 6 Fees page
- 🚩7 Fee ranges for Motoring, Immigration, Licensing — BSB legally required; not yet itemised per area
- 🚩8 VAT status — BSB legally required
- 🚩9 Direct access training completion — required for `/direct-access/` page assertion
- 🚩10 Internal complaints response timeframe — BSB legally required
- Practice address — `memory/verified_facts.md` has "85 Great Portland Street, First Floor, London W1W 7LT" confirmed; not yet propagated to `lib/site.ts` (spec §4 did not include address field)
- Production domain — `astonslaw.com` assumed; needs explicit sign-off

**Penpot file is connected and verified.** API access works via the token in `.mcp.json` (gitignored). The user owns the file. The `With Claude` page is the active workspace and is currently blank (1 placeholder shape). All design work happens on this page from scratch.

**Workflow evaluation:** still awaiting user approval (`.project/workflow-eval/findings.md`).

Read `.project/planning/session-C-handoff.md` for the full Session C summary.

---

## Penpot file — verified state

| Field | Value |
|---|---|
| File name | Astons |
| File ID | `95ecf5e0-91fe-80de-8007-f092b66a76ab` |
| Team ID | `95ecf5e0-91fe-80de-8007-f0915b1c2b35` |
| Permissions | Owner, admin, edit, read (full) |
| Pages | Logos, Website 2026, Design v2, Website, Mobile, **With Claude** |
| Active workspace page | `With Claude` (`fbd0c4dd-760c-804b-8008-04284678d008`) |
| MCP endpoint | `https://design.penpot.app/mcp/stream?userToken=...` (configured in `.mcp.json`) |
| MCP status | Tools not surfaced in current session — restart Claude Code to activate; raw API fallback works in the meantime |

**Reminder:** the only page Claude touches is `With Claude`, and only when the user explicitly points it at a layer.

---

## Repo structure

```
astons-law-chambers/
├── 00_Design System/
│   ├── logo-navy.svg      ← client asset, keep
│   └── logo-white.svg     ← client asset, keep
├── 01_Wireframes/         ← empty
├── 02_Design/             ← empty
├── 03_Handoff/            ← empty
├── CLAUDE.md              ← project contract — apex Penpot rule at top
├── .claude/CLAUDE.md      ← skills-in-use list
├── .mcp.json              ← Penpot MCP config (gitignored)
└── .project/
    ├── _START_HERE.md     ← this file
    ├── workflow-eval/
    │   ├── spec.md
    │   └── findings.md    ← AWAITING USER APPROVAL
    ├── research-01/       ← 4 research files (synthesis.md is the master)
    ├── plan.md            ← 8-phase build plan
    └── planning/
        ├── 00-repo-baseline.md
        ├── 01-synthesis-gaps.md
        ├── 02-bsb-compliance-map.md
        ├── 03-site-architecture.md
        ├── 04-seo-technical.md
        ├── 05-seo-schema-plan.md
        ├── 06-seo-local-plan.md
        ├── 07-sxo-intent-check.md
        ├── 08-content-strategy.md
        ├── 09-design-system-spec.md
        ├── 10-mobile-layout-spec.md
        ├── 11-ux-flows.md
        ├── 12-tailwind-token-spec.md
        ├── 13-nextjs-scaffold-spec.md
        ├── 14-vercel-config-plan.md
        ├── 15-performance-plan.md
        ├── 16-component-inventory.md
        ├── 17-plan-review-flags.md
        ├── session-A-handoff.md
        ├── session-B-handoff.md
        └── session-C-handoff.md
```

---

## The stack (confirmed 2026-05-13)

| Layer | Tool |
|-------|------|
| Design source | Penpot — **only `With Claude` page is in scope** |
| Framework | Next.js (App Router, TypeScript strict) |
| Styling | Tailwind CSS + CSS custom properties for tokens |
| Animation | GSAP + ScrollTrigger |
| Content | Static — no CMS. Data in `lib/` TypeScript files. |
| Hosting | Vercel (deploy from repo root) |
| Dev driver | Claude Code |

---

## Verified client facts (no fabrication)

- **Client:** Ghulam Humayun, barrister at Astons Law Chambers
- **Site:** astonslaw.com (rebuild is separate)
- **Phone:** 07922 247 999 (only confirmed number — 07767 268 607 is NOT real)
- **WhatsApp:** wa.me/447922247999
- **Cal.com:** booking (third-priority channel — URL not yet confirmed 🚩)
- **10 practice areas:** Criminal Defence, Motoring Law, Regulatory Law, Proceeds of Crime, Extradition, Immigration, Inquests, Family Law, Civil Litigation, Licensing
- **URL structure:** `/practice-areas/[slug]/`

---

## Flagged items (status as of 2026-05-14)

| # | Item | Status | Why it matters |
|---|------|--------|----------------|
| 🚩1 | 24/7 availability | RESOLVED 2026-05-13 (verified_facts.md "Operational commitments") | Above-fold copy, sticky bar text |
| 🚩2 | Police station duty advice | RESOLVED 2026-05-13 (verified_facts.md "Credentials"; "24/7 police station attendance") | Homepage + Criminal Defence Zone 1–2 |
| 🚩3 | Legal aid per practice area | PARTIAL 2026-05-14 — confirmed legal aid is via partner firms, not direct. Per-area boolean still unresolved | All practice area pages + Fees page |
| 🚩4 | WhatsApp pre-fill text | RESOLVED 2026-05-14 — in `lib/contact.ts` | `lib/contact.ts`, StickyBar |
| 🚩5 | Response time commitment | LIKELY RESOLVED (verified_facts.md: no published commitment) — copy must avoid "reply within X" language | Any speed-of-response copy |
| 🚩6 | Free initial consultation | LIKELY RESOLVED (verified_facts.md: "First call free, no duration framing") — recheck before Phase 6 | FAQs, Fees page |
| 🚩7 | Fee ranges: Motoring, Immigration, Licensing | OPEN — BSB legally required | Fees page + three practice area pages |
| 🚩8 | VAT status | OPEN — BSB legally required | Fees page + fee ranges |
| 🚩9 | Direct access training completion | OPEN | `/direct-access/` page |
| 🚩10 | Internal complaints response timeframe | OPEN — BSB legally required | `/complaints/` page |

---

## Non-negotiable rules (always in effect)

- **User instruction is absolute.** No deviation.
- **The pre-existing Penpot pages do not influence the build.** Only `With Claude` is in scope.
- **No practitioner portrait anywhere, ever.**
- **Minimise "Ghulam" in body copy** — entity-first (Astons Law Chambers).
- **No marketing speak.** No rhetorical questions, no value-prop framing, no triadic structures.
- **Conversion paths:** phone + WhatsApp + cal.com only. No email, no forms, no lead magnets.
- **No fabricated client facts** (BSB number, Inn, year of call, cases, named partners).
- **No specific statutory section numbers** or case citations without explicit confirmation.
- **Tonal banding is surgical** (1–2 dark sections per page max). Never alternating.
- **Documents uploaded for evaluation are NOT implementation specs.** Evaluate, present findings, wait.
- **All decisions trace to project-mgmt, frontend-design, or the three deep-research reports.** Claude defaults are rejected.

---

## What to do next

The next phase is decided at session start by the user. Read this doc, confirm the apex rules, confirm the Penpot state, and **ask the user what the next phase is** before doing anything.

Candidate phases (from `plan.md` and the 17 planning files):

- **Resolve 3 blockers from `17-plan-review-flags.md`** — Penpot connection (now verified), Phase 0 timeline/fallback, Penpot file ownership (now owned by user).
- **User approves `.project/workflow-eval/findings.md`** — required before any scaffold.
- **Client confirmation session** — get answers to all 10 🚩 flagged items.
- **Phase 1 scaffold** — Next.js + Tailwind + tokens + repo structure per `13-nextjs-scaffold-spec.md`.
- **Begin design exploration on `With Claude` page in Penpot** — from blank, no reference to other pages.

Do not pick one and start. Ask the user.

---

## Git state

- Remote: https://github.com/mxhfxz/astons-law-chambers.git
- Branch: main
- Last commit: `05cb087 Add .gitignore, CLAUDE.md, and project context`
- Working tree: modified (planning files, updated CLAUDE.md with apex Penpot rule, updated `_START_HERE.md`)

---

## Memory files

All persistent memory: `/Users/mahfuzpholby/.claude/projects/-Users-mahfuzpholby-Documents-Agency-Work-astons-law-chambers/memory/`

`MEMORY.md` there is auto-loaded at session start. The two apex rules (user-instruction-is-absolute, Penpot-existing-designs-off-limits) are at the top of that index.
