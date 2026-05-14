# Plan Review Flags — Astons Law Chambers

**Written:** 2026-05-13 (Session C, Step 5b)
**Input file:** .project/plan.md
**Approach:** Three review perspectives applied to plan.md: CEO/business risk, engineering/technical, design/workflow.
**Rule:** All flags surface only. Nothing resolved here. Resolutions are for the user to decide.

---

## Review 1 — Business / Delivery Risk

### FLAG-B1: Phase 0 is unbounded — it has no timeline estimate or fallback

**Type:** Blocker
**Detail:** Phase 0 requires 14 separate client confirmations (10 🚩 items + 4 additional). The plan depends on the client being available and responsive. There is no stated plan if the client cannot confirm items 🚩7 (fee ranges) or 🚩8 (VAT status) before Phase 6. These are BSB-legally-required — `/fees/`, `/complaints/`, and the motoring/immigration/licensing pages cannot go live without them.

**What needs a decision:** What is the maximum wait time for Phase 0 before the build plan is adjusted? Is there a partial-launch strategy if some 🚩 items are not resolved in time?

---

### FLAG-B2: Two of the 10 🚩 items are legally required at launch — not just preferred

**Type:** High priority
**Detail:** 🚩7 (fee ranges) and 🚩8 (VAT status) are not optional client preferences. Under BSB Transparency Rules, the Motoring, Immigration, and Licensing practice area pages and the `/fees/` page cannot be published without this information. If the client declines to provide fee ranges, the BSB compliance plan in `02-bsb-compliance-map.md` needs to be revisited. The current plan assumes these will be available.

**What needs a decision:** What happens to those three practice area pages if 🚩7 or 🚩8 are not confirmed? Launch without them? Exclude those pages from the initial deploy?

---

### FLAG-B3: The plan has no stated mechanism for the Penpot design file milestone

**Type:** Structural gap
**Detail:** Phase 2 is described as "user-side" for the Penpot design file. The plan notes "Claude cannot do this." There is no stated timeline, no criteria for what constitutes "Penpot file ready for Phase 3," and no fallback if the Penpot design is incomplete when Phase 3 is ready to begin.

**What needs a decision:** Who is responsible for the Penpot file? The user? A designer the user will engage? Does design-reader need a minimum set of Penpot pages (Navigation + Footer) before Phase 3 starts, or the full site design?

---

### FLAG-B4: P2 practice area pages are labelled "placeholder" — undefined quality bar

**Type:** Clarity gap
**Detail:** Regulatory Law, Extradition, Inquests, and Civil Litigation are described as "Zones 1–2 placeholder" at launch. The plan states "P2 placeholder pages still require: a structural above-fold, phone + WhatsApp CTAs, and the sticky bar." It is not clear whether these pages will have confirmed copy or generated placeholder copy. If placeholder copy ships, BSB requires accurate professional service descriptions — generic placeholder text may not satisfy this.

**What needs a decision:** What is the minimum acceptable copy quality for P2 pages at launch? Confirmed stub copy vs. generated placeholder?

---

### FLAG-B5: Client-side pre-launch actions have no assigned owner or timeline

**Type:** Delivery risk
**Detail:** The pre-launch checklist in Phase 7 includes actions Claude cannot perform: old phone number cleanup across GBP/directories, DNS transfer, GBP profile updates, Bing Places update, cal.com verification. These are blocking for launch. The plan documents them but does not assign a responsible party or a timeline for completion.

**What needs a decision:** Who owns the client-side checklist items? Is there a client-side deadline that the build plan should work backward from?

---

## Review 2 — Engineering / Technical

### FLAG-E1: `lib/practice-areas.ts` zone content is deferred without a handoff protocol

**Type:** Dependency risk
**Detail:** The plan correctly defers zone content (copy for Zones 2–7) to "after client confirmation." However, Phase 5 requires that content to be in `lib/practice-areas.ts` before practice area pages can be built. There is no stated protocol for how confirmed copy gets from the client confirmation session into the `lib/` file — who writes it, how it is reviewed, and whether it goes through code-reviewer.

**What needs a decision:** Is copy production part of Claude's scope (draft for client review) or is client-supplied copy dropped into `lib/`? The content rules in CLAUDE.md are strict — does the copy-writing step have its own skill or process?

---

### FLAG-E2: GSAP dynamic import pattern may conflict with Next.js 14 server component boundaries

**Type:** Technical risk
**Detail:** `13-nextjs-scaffold-spec.md §6` specifies that animated sections are marked `'use client'`. If a server component renders a `'use client'` section component, and that section imports GSAP dynamically inside `useEffect`, there is no hard conflict — but there is a risk of hydration mismatch if the component renders differently on server vs. client. The spec does not address how the server-rendered HTML of an animated section is structured to avoid mismatch.

**What needs a decision:** Does each animated section component have a static, server-rendered HTML output that is identical to its post-hydration state (opacity and transform reset)? If GSAP sets `opacity: 0` as an initial state before animating to `opacity: 1`, will the server-rendered HTML show the element at full opacity before GSAP initialises?

---

### FLAG-E3: ESLint token enforcement rules are weak guardrails only

**Type:** Technical gap
**Detail:** `13-nextjs-scaffold-spec.md §9` specifies ESLint rules to catch raw hex values in JSX `className` strings. However, these rules flag strings matching `/#[0-9a-fA-F]{3,6}/` — they will not catch raw hex values passed through template literals, CSS variables misused in `style={{}}` props, or hardcoded values in Tailwind config. The enforcement is advisory, not structural.

**What needs a decision:** Is the ESLint rule sufficient, or should the design token contract be enforced via TypeScript (e.g., a typed token object that errors if an unknown key is used)? This is a build-phase decision.

---

### FLAG-E4: `vercel.json` redirect list is probabilistic — not verified against live site

**Type:** Pre-launch risk (documented, but flag for visibility)
**Detail:** `14-vercel-config-plan.md §3` explicitly states the redirect source URLs are inferred. The live site crawl has not happened. If the live astonslaw.com uses URL formats not listed in the redirect table, existing pages may not redirect and could return 404 on the new site. This is documented in the plan but is a credible risk for URL equity loss.

**What needs a decision:** When will the live site crawl happen? Is there a specific tool (Screaming Frog, Sitebulb) available to the user? This should be scheduled before Phase 7, not deferred to launch day.

---

### FLAG-E5: No testing strategy in the plan

**Type:** Coverage gap
**Detail:** The plan describes `npm run type-check` and `npm run lint` as pass criteria. There are no unit tests, integration tests, or end-to-end tests specified. For a static marketing site this is a low-risk gap, but the practice area `generateStaticParams` function, the `lib/` data utilities, and the conversion link hrefs are all logic-bearing and could silently fail.

**What needs a decision:** Is any automated testing in scope? At minimum, a test that asserts all 10 practice area slugs resolve without 404 and all conversion links match expected values would catch the most likely production errors.

---

### FLAG-E6: Font loading strategy assumes `next/font` covers all CLS — this is not guaranteed

**Type:** Technical nuance
**Detail:** `15-performance-plan.md §1` states that `next/font` with `size-adjust` "eliminates layout shift from font loading." This is accurate in most cases but not guaranteed — if the fallback system font metrics differ significantly from Inter (which is common), there will be a measurable CLS during the font swap. The plan should include a Lighthouse CLS test specifically after fonts are loaded, not just the summary score.

**What needs a decision:** Should CLS be measured specifically against the font swap scenario? (`display: 'optional'` would eliminate swap-period CLS at the cost of slower initial font availability — worth considering for the LCP element.)

---

## Review 3 — Design / Workflow

### FLAG-D1: design-reader depends on a Penpot MCP connection — this has not been verified

**Type:** Blocker (if MCP is not configured)
**Detail:** The CLAUDE.md subagent definition for design-reader states it "connects to Penpot MCP." The `.project/workflow-eval/findings.md` covers the subagent workflow but its approval is still pending. There is no confirmed test of the Penpot MCP connection. If the MCP connection is not functional when Phase 3 begins, design-reader cannot operate and the entire component build workflow stalls.

**What needs a decision:** Has the Penpot MCP been tested in this Claude Code environment? This should be verified before Phase 2 starts, not during Phase 3.

---

### FLAG-D2: The plan has no stated design-review cycle for the homepage HeroZone

**Type:** Workflow gap
**Detail:** The homepage HeroZone (Phase 4) is described as a "variant" of the practice area HeroZone. The Penpot homepage design page is required for Phase 4. The plan does not state whether design-reader runs on the Homepage Penpot page specifically, or whether the homepage HeroZone reuses the practice area HeroZone component with different props. If they are the same component with different prop values, design-reader only needs to run once. If they are structurally different, two separate design-reader passes are required.

**What needs a decision:** Is the homepage HeroZone a separate component or a prop variant of the practice area HeroZone?

---

### FLAG-D3: Zone 3 (ActionSteps) dark background creates a conflict with the tonal banding rule

**Type:** Design conflict
**Detail:** `10-mobile-layout-spec.md §5` states Zone 3 may use `--color-bg-dark` (navy emphasis) as one of the 1–2 permitted emphasis sections per page, shared with Zone 5 if Zone 5 is dark. Zone 5 (TrustSignals) is specifically described as a dark section. If both Zone 3 and Zone 5 use dark backgrounds, that is 2 emphasis sections per page — exactly at the ceiling. This means Zone 3 can never be dark if Zone 5 is always dark.

**What needs a decision:** Is Zone 5 (TrustSignals) always dark across all 10 practice area pages? If yes, Zone 3 must always be light. The `Section` component `variant` prop default should reflect this constraint.

---

### FLAG-D4: The component inventory does not specify the mobile hamburger overlay design

**Type:** Design gap
**Detail:** `16-component-inventory.md §layout/Header` states the hamburger "opens full-screen overlay nav." The overlay's visual design (background colour, typography, close button placement, animation) is not specified in any planning file. This is the only interactive modal-style component on the site and it needs a Penpot spec before component-builder can work.

**What needs a decision:** Should the hamburger overlay be specified in a separate planning file, or is it captured in the Navigation page of the Penpot design file? The plan should explicitly include it as a Phase 3 component requiring a design-reader pass.

---

### FLAG-D5: Cookie banner decision creates a potential CLS and visual design gap

**Type:** Design gap
**Detail:** `16-component-inventory.md §7` states "if no cookies, no banner needed" and defers the decision to the analytics discussion. The plan does not include a cookie banner component in the component inventory or build order. If the client later decides to add analytics (which requires a PECR-compliant cookie banner), a banner must be added post-launch. This is a known gap that is not surfaced as a risk in the plan itself.

**What needs a decision:** Confirm the analytics decision before Phase 6 so the privacy policy and cookie handling are accurate at launch.

---

## Conflict Summary

| Conflict | Files in conflict | Note |
|---------|-------------------|------|
| Zone 3 dark background vs. Zone 5 always dark | `10-mobile-layout-spec.md` and `16-component-inventory.md` | Cannot both be dark; one must yield |
| P2 placeholder copy quality vs. BSB accuracy requirements | `plan.md Phase 5` and `02-bsb-compliance-map.md` | BSB requires accurate practice descriptions even on incomplete pages |
| font display: 'swap' vs. CLS target | `15-performance-plan.md` and plan.md Phase 7 target | Font swap can cause measurable CLS; `optional` eliminates it at a UX cost |

---

## Blockers That Must Be Resolved Before Phase 1 Starts

| Blocker | Flag reference |
|---------|---------------|
| Penpot MCP connection not verified | FLAG-D1 |
| Phase 0 timeline and fallback for unconfirmed 🚩 items not defined | FLAG-B1 |
| Who owns Penpot file creation — user or a designer? | FLAG-B3 |
