# START HERE — Astons Law Chambers rebuild handoff

**Date written:** 2026-05-12 (revised post-v1.2.0 ship + Webflow injection)
**Written by:** outgoing session, for the incoming session
**Status:** Phase 0 + Phase 0.5 + Webflow Variable mirroring + manual Custom Code paste — all complete. Bundle live at `cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@v1.2.0/dist/bundle.min.css`. Webflow Designer Variables aligned with the locked Astons direction. MAST smoke test passed.
**Next phase:** Phase 1 — Foundation, conversion, compliance.

You are picking up a project mid-flight. Every decision below has been negotiated with the client across four iteration rounds and is locked. **Your job is to execute against this plan, not to redesign it.** Do not improvise. Do not default to Claude built-in behaviour. The user notices drift and will surface it; the cost of drift to you is rework and trust erosion.

---

## 0. The single load-bearing rule

**Every decision you make must trace to one of these four sources, in this order of preference:**

1. **A locked decision** in `aesthetic.md`, `visual-layering-plan.md`, `spec.md`, `plan.md`, or `DECISION_LOG.md`. If a decision is already made, use it. Do not re-litigate.
2. **A verified fact** in `~/.claude/projects/-Users-mahfuzpholby-Documents-Agency-Work-astons-law-chambers/memory/verified_facts.md`. That file is the only authority for client facts.
3. **A relevant skill** invoked via the `Skill` tool. The skill routing table in §6 below names which skill governs which kind of task.
4. **One of the three deep-research reports** (Astons Strategy, Visual Practices, Rapid Outreach UX — paths in `findings.md`).

**If none of the four covers the question, you MUST stop and ask the user via `AskUserQuestion`.** Use the closest-fitting skill's framework to scaffold the question so the user is offered structured options, not an open prompt. This rule is codified in `feedback_decision_process_protocol` and is non-negotiable.

You may never fill a gap with a Claude default, an "industry best practice", a "common pattern", a "what I'd suggest", or a "let me just". The list of specific Claude defaults that are FORBIDDEN here is in §8.

---

## 1. First actions before responding to the user

Do all of these silently before you say anything to the user. Do not skip and do not enumerate them back.

1. **Read all memory.** Start at `~/.claude/projects/-Users-mahfuzpholby-Documents-Agency-Work-astons-law-chambers/memory/MEMORY.md` and read every linked memory file. The feedback memories carry binding rules; the project memories carry context.
2. **Read these `.project/rebuild/` files in this exact order:**
   1. This file (`_START_HERE.md`) — you are here
   2. `spec.md` — locked requirements
   3. `plan.md` — four-phase build plan
   4. `aesthetic.md` — locked design direction with departure callouts
   5. `visual-layering-plan.md` — Phase 0.5 iteration history (rounds 1–4)
   6. `findings.md` — synthesis of the three deep-research reports
   7. `progress.md` — session log; the **last** entry tells you exactly where you are
   8. `webflow-injection.md` — how the bundle plugs into Webflow, including v1.2.0 jsDelivr pins
9. **Verify the bundle on disk:** `src/tokens.css`, `src/typography.css`, `src/components.css`, `src/site.js`, `src/assets/logo-white.svg`, `src/assets/logo-navy.svg`, `dist/bundle.css`, `dist/bundle.min.css`, `dist/site.min.js`, `dist/preview.html`, `dist/preview-content.html`.
4. **Confirm skill registry.** The session-start reminder lists installed skills. Confirm `project-mgmt`, `webflow-development`, `ux-designer`, `simplify`, `copywriting`, `copy-editing`, `schema-markup`, `seo-schema`, `superpowers:*` are present. `frontend-design` lives at `~/.claude/skills/frontend-design.md` (single file, not a directory) — read it directly when design questions arise.
5. **Greet the user briefly.** Confirm you have read the handoff. State the next concrete action you are about to take. Do not list every file you read.

---

## 2. Project orientation

This is a rebuild of `www.astonslaw.com`, a London Direct Access barrister's website. The brief is to materially increase inbound phone calls and WhatsApp messages from defendants in active criminal-legal crisis. The build sits on a Webflow MAST template, with a custom design system loaded from GitHub via jsDelivr, and is constructed by Claude Code driving the Webflow MCP. Three deep-research reports dated 2026-05-12 (Astons Strategy, Visual Practices, Rapid Outreach UX — full paths in `findings.md`) form the evidence base. The client is Ghulam Humayun. `verified_facts.md` is the only authority for any factual claim about him or the practice.

---

## 3. Current state at session start

**Bundle:**
- v1.2.0 live on jsDelivr (`immutable` cache)
- `bundle.min.css` 22.5 KB, `site.min.js` 5.4 KB, `logo-navy.svg` 19 KB
- Sources in `src/`, built artefacts in `dist/`, multi-breakpoint preview at `dist/preview.html`

**Webflow site:**
- Site ID `69f88bcd977766f39d880a96` ("Astons Law Chambers")
- Custom domain `www.astonslaw.com` (production — NOT republished since variable changes)
- Staging subdomain `astons-law-chambers.design.webflow.com`
- MAST template Variables overwritten to Astons direction: IBM Plex Sans on both font slots, Primary/Navy `#0E1628`, `Astons/Interactive Accent` `#0F4C81` created, secondary palette neutralised, grey scale realigned, heading weights 700 (H1+H2) / 600 (H3–H6 + Eyebrow)
- Head + footer Custom Code pasted in Project Settings, pinned to `@v1.2.0`
- Designer is updated. **Nothing has been republished since the changes.** Both `.webflow.io` and `www.astonslaw.com` show the pre-rebuild state until the user authorises a publish.

**Repo:**
- Branch `main`, clean working tree, latest commit `4577a00` ("Session log: Webflow injection complete + Phase 1 handoff")
- Tags: `v1.2.0`

---

## 4. What has been locked (do not re-litigate without explicit client confirmation)

Anything in this section is a closed decision. If you find yourself drafting an alternative, stop and either (a) reuse the locked decision, or (b) ask the user explicitly if they want to revisit. **Silent departure is forbidden.**

### Design system (Phase 0)
- Brand colours: `#0E1628` brand-primary (navy, doubles as body text), `#C23616` emergency-accent. `#232536` is the cal.com booking-frame fourth-surface — never a primary brand colour.
- `#0F4C81` Carbon blue 60 is the interactive accent. Text-link state and focus ring only. **Forbidden on buttons, banners, hero fills, decorative surfaces.**
- Typography: IBM Plex Sans only. Weights 400 / 500 / 600 / 700 / 800. Tabular figures, true italic, full Latin Extended.
- Layout: 12 / 8 / 4 column responsive grid on an 8px base. Spacing tokens 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 (px-equivalents).
- Container system: narrow 720 / default 960 / wide 1200, gutter `clamp(20px, 5vw, 96px)`. No edge-to-edge layouts except the sticky bar and the cal.com band.

### Red allocation rule (binding)
- **Solid `#C23616`** = emergency chrome only. Sticky bottom-bar + top-nav CALL button + designated emergency banners. Nothing else.
- **Outlined `#C23616`** = safety exit only. The Quick-exit floating button (2px border, transparent fill, full inversion on hover).
- Forbidden: red on hero CTAs, body, links, dividers, icon fills, mega-menu chips, footer chrome.

### Hero CTA pair (Phase 0.5 iteration 4)
Navy solid (phone) + navy outline (WhatsApp). Equal weight. Hierarchy carried by fill vs outline, not by colour.

### Hero image direction
Architectural detail — chambers entrance / Marylebone street geometry. Subject TBD; sourced separately before homepage build. **Forbidden:** stock, gavels, scales, Inn courtyards, courthouse exteriors, people, AI-generated faces, heraldic vocabulary.

### Mega-menu (binding interaction spec)
- Single "Practice areas" parent → 3-column shallow panel. Col 1 Person offences (Violent, Sexual, Drug, Youth, Theft). Col 2 Financial offences (Fraud, POCA). Col 3 Procedural & other (Driving, Appeals, Inquests). Foot: "Full practice list →" link + phone + WhatsApp.
- Desktop pointer: hover-open no delay, ~280ms close grace.
- Touch: press-to-open; tap outside or tap parent again to close.
- Keyboard: Tab focuses parent → Enter or Space opens; Esc closes; arrows navigate within.
- Mobile ≤767px: absorbs into hamburger drawer as a vertical accordion.

### Top-nav CALL button
`CALL 07922 247 999`, solid `#C23616`, 44px tall, right-aligned. Visible at ≥768px. Disappears into the hamburger drawer at <768px.

### Sticky emergency bar (binding override)
Bottom-fixed, dual chip (phone + WhatsApp), `#C23616`. **Never hides — including on `/contact`.** Iteration 2 override of Rapid Outreach §5.4. Reason: brand signal of always-reachability outweighs the redundancy on `/contact`.

### Quick-exit safety button (binding)
Floating top-right, every page, 44px tall, 2px solid `#C23616` border, transparent fill, full inversion on hover. Esc-twice-within-1000ms keyboard shortcut. Action: `window.location.replace('https://www.google.com')`. Hidden when printing. Z-index above the sticky bar. **Mobile placement mirrors desktop — does NOT shrink.**

### Motion
- Hover: light backgrounds darken 10%, dark backgrounds (navy) lighten 10%, ~150ms ease-out.
- State-change icons animate. Chevrons rotate 180° on open. Hamburger morphs to a close-cross on drawer-open. Accordion chevrons rotate 90°.
- Arrow nudge 4px in the direction the arrow faces on hover, ~120ms ease-out. Text stays still.
- Sticky bar entry: slide-up on first paint, ~200ms ease-out.
- `prefers-reduced-motion` zeros every duration token; state-essential changes flip instantly.
- **Forbidden:** bounce, overshoot, scale-on-hover, parallax, scroll-triggered reveals, hover-lift on cards.

### Accessibility (binding — WCAG 2.2 AA floor)
- Skip-to-content link, visually hidden until keyboard focus.
- 2px solid `#0F4C81` focus ring + 2px offset on every interactive element. Negative-inset white ring on red chrome surfaces.
- ARIA landmarks on every page. ARIA labels on icon-only buttons. ARIA live region for action confirmations ("Calling 07922 247 999", "Opening WhatsApp").
- Tooltips on cursor devices only. Touch devices show permanent labels.
- Keyboard parity for every action. No hover-only content.
- Body 4.5:1 contrast; UI + large text 3:1.
- `prefers-color-scheme` out of scope for v1. White-ground only.

### Medium-optimised UX
Every component specified for every viewport class × every input modality. **Do not assume "mobile = phone" or "desktop = pointer".** Cursor devices get hover states + tooltips. Touch suppresses hover and replaces tooltips with permanent labels. Tap targets ≥48×48 (≥56×64 for emergency CTAs). Hover states never sticky after tap.

### cal.com embed primitive
- Advisory pages only: `/consultation`, `/practice-areas/*/fees`, `/direct-access`, `/what-to-expect`. **Never on emergency-intent pages.**
- Wrapper `.section.cc-booking` with `#232536` background.
- iframe max-width 720px, centred, generous padding.
- `loading="lazy"`, `importance="low"`. cal.com script deferred. Never above the fold.

---

## 5. Phase 1 — Next action with checkpoints

Phase 1 is foundation / conversion / compliance, per `plan.md`. Each task below has a precondition gate. Do not advance past a gate without satisfying it.

### 5.1 Per-page chrome injection
**Gate:** read `webflow-injection.md` §3 in full before any Webflow MCP call.
- Add skip-link + quick-exit + nav + drawer + sticky bar to every page.
- Add cal.com booking band to advisory pages only.
- Use Webflow MCP `element_builder` per page. **One action per MCP call**, no other tool use between calls (`feedback_webflow_mcp_pacing`).
- **Gate before publish:** STOP and ask the user explicitly. Publishing is shared-state — see §9.

### 5.2 Homepage rewrite
**Gate:** ask the user for Ghulam's literal-truth commitments on availability and response time before drafting ANY copy. Without that confirmation, the hero copy cannot ship (`feedback_flag_imported_truth_claims`).
- Engage `copywriting` skill. Use the locked hero direction: "Arrested in the last 24 hours. Police bail expires this week. Crown Court hearing this month."
- Drop: "10+ years experience", "100+ Cases Represented", "approved by the BSB".
- Replace: "approved by the BSB" → "Regulated by the Bar Standards Board".
- Author: named line at the foot of pillars, not above the fold. No portrait, no bio block.
- Hero image: placeholder stays until the architectural-detail subject is sourced. Do not invent a subject.

### 5.3 Contact page rewrite
- Remove email + contact form from above-fold.
- Remove the second phone number `07767 268 607` entirely (confirmed-not-real).
- Surface only `07922 247 999`, WhatsApp, and a cal.com booking link.

### 5.4 Compliance fixes
- 301 redirect `/compliance/complaints` → `/compliance/complaints-policy`.
- On the complaints page: add Barristers' Register link + Legal Ombudsman decision-data link (BSB Transparency Rules).

### 5.5 Schema injection
**Gate:** engage `schema-markup` AND `seo-schema` skills before drafting. JSON-LD only.
- `LegalService` + `Person` per practice, `sameAs` chains. Verified facts only.
- `FAQPage` retained as AI-retrieval scaffolding (rich-result retired but parser still ingests).
- `BreadcrumbList` on pillars.
- **Forbidden:** self-hosted `Review` or `AggregateRating` schema. No SERP star value, no SEO upside.

### 5.6 webflow.js suppression verification
Confirm `window.WebflowEnabled = false;` in the head Custom Code is taking effect via DevTools coverage tab. Should reclaim 200–400ms INP budget.

### 5.7 Security headers
Configure via Webflow hosting panel: HSTS preload, CSP (script-src includes `cdn.jsdelivr.net`), `nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, locked `Permissions-Policy`.

### 5.8 Live mobile QA
Tap targets ≥48×48 (≥56×64 emergency). `tel:` and `wa.me/` resolve natively, no JavaScript interception. INP measurement on a real device.

### 5.9 CrUX / PageSpeed baseline
Engage `seo-google` skill. Capture INP, LCP, CLS snapshot for post-rebuild comparison.

After Phase 1 closes: Phase 2 — ten practice-area pillars at 1,800–2,500 words each. Phase 3 — content depth + AI search.

---

## 6. Skill routing table

This is the lookup. When you face a task, find its row and engage the named skill(s) BEFORE doing anything else. If a task does not have a row, see §0 — ask the user.

| Task | Required skill(s) |
|---|---|
| Sequence or scope a phase / sub-phase | `project-mgmt` |
| Write any page copy | `copywriting` (+ `marketing-psychology` if persuasion analysis is needed) |
| Edit existing copy | `copy-editing` |
| Re-litigate or update the design system | `frontend-design` (file at `~/.claude/skills/frontend-design.md`) + `ux-designer` |
| Code-quality review of bundle changes | `simplify` |
| Webflow MCP work (Variables, elements, pages) | `webflow-development` (skill) + `webflow-skills` plugin (under `~/.claude/plugins/`) |
| Schema / JSON-LD | `schema-markup` + `seo-schema` |
| SEO audit (any) | `seo-audit` (delegates to specialists automatically) |
| Single-page SEO check | `seo-page` |
| Local SEO / GBP / map pack | `seo-local` + `seo-maps` |
| AI / generative search (GEO) | `seo-geo` + `ai-seo` |
| Site architecture / URL structure / IA | `site-architecture` |
| Programmatic SEO (templates at scale) | `programmatic-seo` + `seo-programmatic` |
| Content strategy / topic clusters | `content-strategy` + `seo-cluster` + `seo-plan` |
| Sitemap | `seo-sitemap` |
| Technical SEO (crawl, indexation, CWV) | `seo-technical` |
| Google API data (Search Console, CrUX, GA4) | `seo-google` |
| Schema-content quality / E-E-A-T | `seo-content` |
| Backlinks | `seo-backlinks` |
| Hreflang / international SEO | `seo-hreflang` |
| Page CRO / conversion analysis | `page-cro` |
| Form CRO (non-signup) | `form-cro` |
| Popup CRO (still forbidden here, see §7) | `popup-cro` (only if user overrides the no-email-funnel rule) |
| Analytics setup | `analytics-tracking` |
| User research / interview synthesis | `customer-research` |
| Personas / wireframes / IA reviews | `ux-designer` |
| Debugging | `superpowers:systematic-debugging` |
| Multi-step or complex task planning | `project-mgmt` + optionally `superpowers:writing-plans` |
| Memory & note management (skill drift, lessons learned) | `superpowers:using-superpowers` |

**Webflow MCP pacing rule** (binding, see `feedback_webflow_mcp_pacing`):
- Call `webflow_guide_tool` once per session before any other Webflow MCP tool.
- One MCP tool invocation per turn for Webflow work. No interleaving with Read / Edit / Bash / other-MCP between Webflow calls.
- Multiple `actions` within a single Webflow MCP invocation are fine when they are a single logical operation (e.g., updating a batch of related Variables).
- Do not assume a site ID. Always list sites or confirm with the user.

---

## 7. Memory routing — where to find which kind of truth

| Question / need | Source of truth |
|---|---|
| Any client fact (contact, credentials, address, fees, regulator language) | `verified_facts.md` only |
| Why a copy choice is being rejected | `feedback_no_marketing_speak`, `feedback_natural_voice`, `feedback_legal_specificity`, `feedback_no_ai_framing_in_responses` |
| Why a particular fact has been rejected or banned | `feedback_no_fabricated_facts`, `feedback_flag_imported_truth_claims` |
| Decision-routing protocol (this section is itself a summary) | `feedback_decision_process_protocol` |
| Why a design choice was made | `aesthetic.md` (departure callouts) + `visual-layering-plan.md` (iteration rounds 1–4) |
| Why a conversion/CRO choice is constrained | `feedback_no_email_funnel`, `feedback_no_portrait_minimal_name` |
| Section banding rules | `feedback_no_alternating_banding` |
| Webflow MCP behaviour | `feedback_webflow_mcp_pacing` |
| The three deep-research reports | paths listed in `findings.md` |
| Locked URL migrations and authorship line | `project_rebuild_decisions.md` |
| Locked goals / KPI / audience | `project_rebuild_goals.md` |
| The toolchain stack | `project_design_stack.md` |

If a question has no entry in this table, the answer is not memorised yet. Ask the user.

---

## 8. Claude defaults that are FORBIDDEN here

These are the specific anti-patterns the user has rejected. If you feel the pull of one of them, stop. They are forbidden whether or not the rest of this doc explicitly mentions them, because they are codified in the feedback memories.

### Copy defaults
- "The right barrister for you", "trusted criminal defence", "we understand what you're going through".
- Rhetorical-question subheads: "Need a barrister?", "Charged with X?", "Worried about your case?".
- Value-prop framing: "Why choose Astons", "What sets us apart".
- Verbose regulatory clauses, multi-paragraph "About the chambers" sections.
- AI prose patterns: triadic lists ("clear, calm, fast"), anaphora ("Our barristers… Our clerks… Our practice…"), "X not Y" rhythms, em-dash maximalism, aphoristic closes ("After all, time is everything.").
- Sentencing figures, specific statutory section numbers, case-law citations not verified for 2026.

### Conversion defaults
- Email signup forms, newsletter signups, "join our list" CTAs.
- Lead magnets, downloadable guides, "free consultation" promises (unless the user explicitly confirms).
- Exit-intent popups, scroll-triggered modals, "wait!" interrupts.
- ESP integrations (Mailchimp, ConvertKit, Klaviyo) or nurture sequences.
- Live-chat widgets, AI chatbots, "talk to an assistant".
- Self-hosted Review / AggregateRating schema. No SERP star value remains.

### Visual / UX defaults
- A practitioner portrait anywhere. Personality-first framing of any kind.
- Stock photography. Gavels, scales, Inn courtyards, courthouse exteriors, suited-people imagery.
- Hero carousels, animated counters, trust-badge rails, "as seen in" logo soup.
- Shadows, gradients, glassmorphism, parallax, scroll-triggered reveals.
- Rounded buttons over 4px radius. Hover-lift on cards.
- Hover-to-reveal content. Modals for routine information.
- Hamburger menu on desktop. Inter, Roboto, Arial, generic system stacks.
- Warm / ivory backgrounds. Tinted "paper" textures.
- Alternating tonal-step banding (`#FFFFFF` / `#F4F4F5` / repeat across every section). Surgical use only — 1–2 emphasis sections per page max.
- Solid `#C23616` outside emergency chrome.

### Process defaults
- Starting work without confirming scope.
- Committing or pushing without explicit user authorisation.
- Publishing to Webflow without explicit user authorisation (either `.webflow.io` or `www.astonslaw.com`).
- Calling multiple Webflow MCP tools in parallel, or interleaving Webflow MCP with other tools mid-operation.
- Falling back to "based on best practices…" or "the standard pattern is…" or "I'd typically suggest…". None of these are evidence. Trace to a skill, to research, or to a memory file. If you cannot, ask.
- Filling a content gap with invented facts. No BSB number, no Inn, no year of call, no panel grades, no reported cases — unless the user states them in-session.
- Silently importing operational claims from research, the live site, or competitors ("clerks answer 24 hours", "first call free", "response within 1 hour"). Flag with 🚩 and ask.

---

## 9. STOP signals — when you must halt and ask

Halt and use `AskUserQuestion` when any of these are true. Do not soldier on.

- You are about to write a fact about Ghulam / the chambers that is not in `verified_facts.md`.
- You are about to publish anything to `.webflow.io` or to `www.astonslaw.com`.
- You are about to `git push` or `git push --tags`.
- You are about to bump `package.json` version.
- You are about to call `webflow.js` suppression on an unaudited page.
- You are about to invoke a Webflow MCP write operation on the production site (`69f88bcd977766f39d880a96`) for anything beyond what's already been authorised in this handoff.
- The user's brief is ambiguous, and resolving it requires a decision not already locked in `aesthetic.md` / `visual-layering-plan.md` / `spec.md` / `plan.md` / `DECISION_LOG.md` / `verified_facts.md`.
- You feel the pull of a Claude default from §8 and you cannot trace an alternative to a skill, to research, or to a memory file.
- A research finding conflicts with a locked decision. Surface the conflict; the user may want to revisit.
- An operational claim (hours, response times, fees, availability) is needed for copy and has not been confirmed in-session.

When you ask, use the closest-fitting skill's framework to scaffold the question. The user prefers structured options to open prompts. Two to four options, each with a short description of the trade-off. Mark the recommended option with "(Recommended)" — but only if the recommendation traces to a skill / research / memory.

---

## 10. Skill gotchas

- **`frontend-design`** — lives as a single file at `~/.claude/skills/frontend-design.md`, not a directory and not a Skill-registry entry. Read it directly via `Read` when design questions arise.
- **`webflow-skills` plugin** — installed from `webflow/webflow-skills` marketplace. Its skills live under `~/.claude/plugins/` and may not surface as top-level registry entries. Check there before assuming they're missing.
- **`webflow-development` skill** — installed via raw clone to `~/.claude/skills/webflow-development/`. Has `SKILL.md` plus a `references/` folder; read both before first use.
- **Webflow MCP tools** — extensive list available with prefix `mcp__claude_ai_Webflow__*`. Schemas are deferred and must be loaded via `ToolSearch` (e.g., `select:mcp__claude_ai_Webflow__variable_tool`). Load only what you need per turn to keep schemas tight.
- **`codebase-memory-mcp`** — a code-discovery gate hook may block `Read` on code files in favour of `search_graph` / `get_code_snippet` / `query_graph`. For markdown, config, and non-code files, `Read` works normally. For source code in `src/*`, use the MCP tools.
- **Webflow Designer canvas** does NOT execute Project Settings head Custom Code. To see Plex Sans render in the Designer canvas, the user must add Plex Sans as a Webflow font via Project Settings → Fonts. Without that, the canvas falls back to system-ui anywhere Plex Sans is declared.

---

## 11. Agent dispatch protocol

Use sub-agents only when they reduce context cost or parallelise independent work. Spawning is the expensive path on this plan; do not use sub-agents to duplicate work you should do inline.

- **`Explore`** — read-only code search across `.project/rebuild/` or `src/`. Use for "where is X defined" or "which files reference Y". Quick / medium / thorough breadth as appropriate.
- **`Plan`** — when a sub-task warrants architectural planning before execution.
- **`general-purpose`** — broad research that doesn't fit a specialised agent.
- **SEO agents** (`seo-audit`, `seo-technical`, `seo-local`, `seo-maps`, `seo-google`, `seo-geo`, `seo-content`, `seo-image-gen`, `seo-sxo`, `seo-dataforseo`, `seo-drift`, `seo-ecommerce`, `seo-flow`) — surface only when the matching skill calls them out.

Always brief the agent fully. Sub-agents start cold and do not see this conversation; the prompt must be self-contained, include file paths and concrete success criteria, and never ask the agent to "synthesise" something you should synthesise yourself.

---

## 12. Hard "don't" list (binding, cross-referenced)

Pulled from the feedback memories. Cross-check `MEMORY.md` for canonical versions.

- Do not assert any client fact not in `verified_facts.md`. No BSB number, no Inn, no year of call, no named cases, no second phone. (`feedback_no_fabricated_facts`)
- Do not write marketing-speak. No "right barrister for you", no rhetorical questions, no value-prop framing, no verbose regulatory clauses. (`feedback_no_marketing_speak`)
- Do not write AI-style prose in copy OR in chat. No triadic lists, no anaphora, no "performance of honesty", no em-dash maximalism, no aphoristic closes. (`feedback_natural_voice`, `feedback_no_ai_framing_in_responses`)
- Do not cite specific statutory section numbers, sentencing figures, or case law unless verified for 2026. (`feedback_legal_specificity`)
- Do not add email captures, lead magnets, exit-intent, ESP integrations, nurture sequences. KPI is phone + WhatsApp + cal.com only. (`feedback_no_email_funnel`)
- Do not show a practitioner portrait. Do not over-use Ghulam's name. Entity-first, not personality-first. (`feedback_no_portrait_minimal_name`)
- Do not silently change any decision that differs from the live `www.astonslaw.com`. Flag every departure with reasoning. (`feedback_callout_departures`)
- Do not import literal-truth operational claims from research, competitors, or the live site without explicit user confirmation. Flag with 🚩. (`feedback_flag_imported_truth_claims`)
- Do not alternate tonal-step backgrounds across every section. Surgical use only — 1–2 emphasis sections per page max. (`feedback_no_alternating_banding`)
- Do not call multiple Webflow MCP tools in parallel or interleave with other tools. One operation per call, no thinking mid-operation. (`feedback_webflow_mcp_pacing`)
- Do not fall back to Claude defaults for design, copy, build, or process decisions. Trace every decision to a skill, research, or memory file. If neither covers it, ask the user via a scaffolded question. (`feedback_decision_process_protocol`)

---

## 13. Pending open items

The four Phase 0.5 frontend-design questions from the previous handoff are resolved (see `visual-layering-plan.md` iteration round 4). Open items now sit at the copy layer (Phase 1) and at the publish layer.

Copy layer (require client input before drafting):
- Ghulam's literal-truth commitments on availability and response time before any hero copy ships.
- Verifiable credentials beyond `verified_facts.md` (Inn, year of call, BSB number, panel grades, reported cases). None invented; only added on direct confirmation.
- Specific hero image subject (architectural-detail direction locked; specific subject TBD).
- Real verified cases for anonymised case examples (Hansard / BAILII links only).

Publish layer (require explicit authorisation each time):
- Publish to `.webflow.io` staging (`astons-law-chambers.design.webflow.com`).
- Publish to `www.astonslaw.com` custom domain (production).

---

## 14. The user's working style

- Tight, plain professional register in chat. No AI prose patterns in conversation or in planning files.
- Every decision traceable to a skill, to one of the three research reports, or to a memory file. Recommendations grounded in "I think" or "it would be nice if" are pushed back as Claude defaults.
- Proactive use of `AskUserQuestion` for real choices. Not for confirmation of obvious things, but yes for any decision that crosses a STOP signal in §9 or routes outside the locked direction.
- Frequent updates to `.project/rebuild/progress.md` and `DECISION_LOG.md` so the next session can pick up without re-deriving context.
- No git pushes, no Webflow publishes, no MCP write operations on shared state without explicit authorisation.

The user is not a developer in the strict sense, but is a careful operator who reads everything and notices drift. Treat the engagement like working with a senior product manager who has limited tolerance for slop and full memory of every prior conversation.

---

Pick this up well. Stay tight. When unsure, ask.
