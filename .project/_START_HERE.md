# Cold-Start Handoff — Astons Law Chambers

**Date written:** 2026-05-13 (updated after research phase)
**Written by:** Claude (session ending due to context compact)
**Read this before touching anything.**

---

## Current state

**Research phase is complete.** Three deep-research reports written, synthesis document produced. Workflow evaluation was done but awaits user approval. No code exists. No CLAUDE.md exists. This is still a clean slate.

---

## Repo structure (as of this handoff)

```
astons-law-chambers/
├── 00_Design System/
│   ├── logo-navy.svg      ← client asset, keep
│   └── logo-white.svg     ← client asset, keep
├── 01_Wireframes/         ← empty, populated in Penpot
├── 02_Design/             ← empty, populated in Penpot
├── 03_Handoff/            ← empty
└── .project/
    ├── _START_HERE.md     ← this file
    ├── workflow-eval/
    │   ├── spec.md        ← evaluation spec
    │   └── findings.md    ← workflow evaluation COMPLETE — awaiting approval
    └── research-01/
        ├── plan.md
        ├── findings-criminal-law-sites.md  ← COMPLETE (34 sources, 8 sections)
        ├── findings-barrister-sites.md     ← COMPLETE (28 sources, 10 observed sites)
        ├── findings-conversion-ux.md       ← COMPLETE (25 sources, all three KPIs covered)
        └── synthesis.md                    ← COMPLETE (cross-cutting strategic brief)
```

---

## The stack (confirmed 2026-05-13)

| Layer | Tool |
|-------|------|
| Design source | Penpot (with MCP integration) |
| Framework | Next.js (App Router, TypeScript strict) |
| Styling | Tailwind CSS + CSS custom properties for tokens |
| Animation | GSAP + ScrollTrigger |
| Content | Static — no CMS. Data in lib/ TypeScript files. |
| Hosting | Vercel (deploy from repo root) |
| Dev driver | Claude Code |

**Code project root:** `astons-law-chambers/` root. Vercel deploys from root.

---

## Verified client facts (the only confirmed facts — no fabrication)

- **Client:** Ghulam Humayun, barrister at Astons Law Chambers
- **Site:** astonslaw.com (rebuild is separate)
- **Phone:** 07922 247 999 (only confirmed number — 07767 268 607 on live site is NOT real)
- **WhatsApp:** wa.me/447922247999
- **Cal.com:** booking (third-priority channel)
- **10 practice areas:** Criminal Defence, Motoring Law, Regulatory Law, Proceeds of Crime, Extradition, Immigration, Inquests, Family Law, Civil Litigation, Licensing
- **URL structure:** /practice-areas/[slug] (301 redirects needed for live site pages before launch)

---

## What happened in this session

1. **Safety hooks added to `.claude/settings.local.json`:**
   - PreCompact hook: agent that rewrites this file before context compacts
   - PostCompact hook: command that injects a CRITICAL reminder to read this file after compact
   - Both fire on auto and manual compact
   - Note: hooks require a `/hooks` refresh or session restart to activate in the current session

2. **Permissions added to `.claude/settings.local.json`:**
   - WebSearch, WebFetch, 7 Playwright tools added to allow array

3. **Workflow evaluation completed:**
   - `.project/workflow-eval/spec.md` — written
   - `.project/workflow-eval/findings.md` — written
   - Verdict: 10 adopt, 2 adjust (GSAP prefers-reduced-motion → hook; session plan mode → project-mgmt skill), 1 drop (Sanity CMS)
   - CLAUDE.md outline drafted (55 lines)
   - 5 gaps flagged: verified-facts hook, 301 redirect map, Penpot page naming, typography scale, breakpoint definitions
   - **STATUS: Awaiting user approval. Do not scaffold until approved.**

4. **Three research reports completed:**
   - findings-criminal-law-sites.md
   - findings-barrister-sites.md
   - findings-conversion-ux.md

5. **Synthesis completed:**
   - synthesis.md — cross-cutting strategic brief
   - **Read synthesis.md before making any design or copy decisions**

---

## The three strongest research signals

**1. No UK criminal law site is designed for the person in acute crisis.**
All three reports confirm this independently. The position is unoccupied. Astons can take it.

**2. WhatsApp is absent from every observed competitor site.**
Zero of 10 barrister sites. Zero criminal law sites. WhatsApp has 15–60% CTR benchmarks and 66% conversation-to-transaction rate in the UK. Pre-filled wa.me deep links are the correct implementation.

**3. 84% of law firm phone calls come from mobile.**
Mobile converts at 21% vs desktop 15.9%. 81% abandon contact forms. Sticky bottom bar (phone + WhatsApp) is a baseline requirement, not a nice-to-have.

---

## Flagged items — need client confirmation before any copy goes live

| # | Item | Why it matters |
|---|------|----------------|
| 1 | 24/7 availability | Cannot be stated if not genuinely provided |
| 2 | Police station duty advice | Is this actively offered? Determines a KPI conversion pattern |
| 3 | Legal aid per practice area | Which of the 10 areas are available on legal aid? |
| 4 | WhatsApp pre-fill text | Exact wording for `?text=` parameter |
| 5 | Response time commitment | Only state if genuinely achievable |
| 6 | Free initial consultation | Confirm before referencing |

---

## What to do next (priority order)

**Step 1 — User approves the workflow evaluation**
Present `.project/workflow-eval/findings.md` to the user. Wait for explicit approval or adjustments. Do not scaffold anything until this happens.

**Step 2 — After approval: scaffold the project**
- Write CLAUDE.md (project contract, ~55 lines)
- Create `.claude/agents/` with design-reader, code-reviewer, component-builder subagents
- Create `styles/tokens.css` with token scaffold
- Scaffold `app/`, `components/`, `lib/` directory structure

**Step 3 — Confirm the 6 flagged client facts**
These affect copy for every practice area page and the homepage. Get them confirmed before drafting any content.

**Step 4 — Penpot setup (user-side)**
The user needs to set up the Astons Law Chambers design file in Penpot. This requires their Penpot account and MCP key. Claude cannot do this.

**Step 5 — Build, starting with design system**
After Penpot is connected: design system tokens → homepage → practice area page template → 10 practice area pages.

---

## Non-negotiable rules (always in effect)

- User's instruction is absolute. No deviation.
- No practitioner portrait anywhere, ever.
- Minimise "Ghulam" in body copy — entity-first (Astons Law Chambers).
- No marketing speak. No rhetorical questions. No value-prop framing.
- Conversion paths: phone + WhatsApp + cal.com only. No email, no forms, no lead magnets.
- No fabricated client facts (BSB number, Inn, year of call, cases, named partners). None.
- No specific statutory section numbers or case citations without explicit confirmation.
- Tonal banding is surgical (1–2 dark sections per page). Never alternating.
- Documents uploaded for evaluation are NOT implementation specs. Evaluate, present findings, wait for instruction.
- All decisions must trace to project-mgmt, frontend-design, or the three deep-research reports.

---

## Git state

- Remote: https://github.com/mxhfxz/astons-law-chambers.git
- Branch: main
- Last commit: "Clean slate: scrap Webflow build, start fresh"
- Git user: Mahfuz Pholby

---

## Memory files

All persistent memory: `/Users/mahfuzpholby/.claude/projects/-Users-mahfuzpholby-Documents-Agency-Work-astons-law-chambers/memory/`

Read MEMORY.md there first — full index with descriptions.
