# START HERE — Astons Law Chambers rebuild handoff

**Date written:** 2026-05-12
**Written by:** outgoing session, for the incoming session
**Reason:** session cleared deliberately to avoid token drift / compaction loss before the Webflow build phase begins

You are picking up a project mid-flight. Do not improvise. Do not default to Claude built-in behaviour. Everything below has been negotiated with the client over three iteration rounds and is locked. Your job is to execute against this plan, not to redesign it.

---

## 1. First actions before responding to the user

Do all of these before you say anything to the user. Do not skip.

1. Read `~/.claude/projects/-Users-mahfuzpholby-Documents-Agency-Work-astons-law-chambers/memory/MEMORY.md` — every linked memory file matters.
2. Read these `.project/rebuild/` files in this order:
   1. This file (`_START_HERE.md`) — you are here
   2. `spec.md` — the locked requirements (what & why)
   3. `plan.md` — the 4-phase build plan
   4. `aesthetic.md` — the locked design direction
   5. `visual-layering-plan.md` — the Phase 0.5 sub-phase (where you are picking up)
   6. `findings.md` — synthesis of the three deep-research reports
   7. `progress.md` — session log; read last entry to know exactly where you are
   8. `webflow-injection.md` — how the bundle plugs into Webflow
3. Verify the bundle on disk: `src/tokens.css`, `src/typography.css`, `src/components.css`, `src/site.js`, `dist/bundle.css`, `dist/bundle.min.css`, `dist/site.min.js`, `dist/preview.html`, `src/assets/logo-white.svg`.
4. Confirm you can see these skills in the Skill registry (the session-start reminder lists them): `project-mgmt`, `ux-designer`, `webflow-development`, `simplify`, `superpowers:*`. The `webflow-skills` plugin from `webflow/webflow-skills` is also installed but its skills may not surface as registry entries — they live under `~/.claude/plugins/`.
5. Greet the user briefly. Confirm you have read the handoff. State the next action (see section 4 below). Do not list everything you read — they know what's in those files.

---

## 2. Project orientation (one paragraph)

This is a complete rebuild of www.astonslaw.com, a London Direct Access barrister's website. The brief is to materially increase inbound phone calls and WhatsApp messages from defendants in active criminal-legal crisis. The build sits on a Webflow MAST template, with a custom design system loaded from GitHub via jsDelivr, and is constructed by Claude Code driving the Webflow MCP. Three deep-research reports (Astons Strategy, Visual Practices, Rapid Outreach UX, all 2026-05-12, full paths in `findings.md`) are the evidence base for every decision. The client is Ghulam Humayun. The verified-facts memory file is the only source of truth for any factual claim about him or the practice.

---

## 3. What has been locked (do not re-litigate without explicit client confirmation)

### Phase 0 — Design system foundation (built, not yet pushed)
- Brand colours: `#0E1628` navy (brand-primary), `#C23616` red (emergency-accent). Plus surface-secondary `#F4F4F5`, plus a new fourth saturated value `#232536` for cal.com embed band (see iteration 2).
- Typography: IBM Plex Sans only. Weights 400/500/600/700/800. Tabular figures. Italic. Latin Extended.
- Layout: 12 / 8 / 4 column responsive grid on an 8px base. Spacing tokens 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96.
- Component primitives: section-band, card, hero (typographic-anchor), nav (wide-pattern for chambers), disclosure-row, trust-signal-row, sticky-emergency-bar, FAQ accordion, breadcrumb.
- Bundle built into `dist/bundle.min.css` (10.4KB) + `dist/site.min.js` (2.1KB) + `dist/preview.html`. v1.1.0 has NOT been pushed; pause held while iteration rounds 1–3 layered changes on top.

### Phase 0.5 — Visual Layering (planned in three iteration rounds; locked; not yet implemented)
All seven items are decided. Full detail in `visual-layering-plan.md`. Summary:

1. **Imagery** — editorial card images + one contextual hero image on homepage (Freshfields/Bain pattern). No stock, no gavels, no scales, no Inn courtyards, no courthouse exteriors, no people. Hero subject is TBD by frontend-design execution — propose architectural detail or abstract context.
2. **Logo** — existing white SVG provided by client at `src/assets/logo-white.svg`. Single asset: 32×32 mark on the left, "ASTONS LAW CHAMBERS" wordmark on the right, same baseline. Generate a navy variant for light surfaces; keep white variant for dark surfaces. Mark only at <480px; wordmark surfaces in footer.
3. **Colour additions** — Carbon blue `#0F4C81` as interactive accent for links and focus rings only, never for buttons or banners. Surgical tonal-step using `#F4F4F5` to emphasise specific sections, never alternated (see `feedback_no_alternating_banding`).
4. **FAB** — REJECTED. Keep the existing sticky-emergency-bar as the only persistent contact element. On mobile, the sticky bar never hides, including on `/contact` (explicit override of Rapid Outreach §5.4).
5. **Mega-menu** — single "Practice areas" parent, opens to a 3-column shallow mega-menu. Col 1 Person offences (Violent, Sexual, Drug, Youth, Theft). Col 2 Financial offences (Fraud, POCA). Col 3 Procedural & other (Driving, Appeals, Inquests). Foot: "Full practice list →" + phone + WhatsApp chip. Desktop opens on hover with no delay, closes with ~250–300ms grace. Touch press-to-open. Mobile absorbs into hamburger drawer as a vertical accordion.
6. **Top-nav CTA** — `CALL 07922 247 999` solid `#C23616` button right-aligned in the desktop nav. Tablet keeps full label. Mobile: lives in hamburger drawer as top item. Approx 40–44px tall (less prominent than the hero CTA used to be).
7. **Responsive** — `clamp()` formulas on all six type tokens (hero, h1, h2, h3, body, caption). Container system: narrow 720 / default 960 / wide 1200, with `clamp(20px, 5vw, 96px)` horizontal gutter. No edge-to-edge layouts.

### Red allocation rule (locked, iteration round 2)
Emergency-accent `#C23616` solid is RESERVED for the chrome only — sticky bar + top-nav CALL button + any future page-level emergency banner explicitly designated. It is FORBIDDEN on hero CTAs, body content, links, dividers, icon fills, mega-menu chips, footer chrome. The hero CTAs that currently exist as red in `dist/preview.html` are a bug to be fixed during Phase 0.5 implementation.

A separate visual treatment uses red as an outlined border + text only — the safe-exit ("Quick exit") button. Two distinct uses of red, two distinct visual treatments, each carrying a different signal.

### Motion (locked, iteration round 2 + 3)
- Hover: light buttons darken 10%, dark buttons (navy) lighten 10%, transition ~150ms ease-out.
- State-change icons animate: chevrons rotate 180° on mega-menu open, hamburger morphs to close cross on drawer open, accordion chevrons rotate 90°.
- Arrows in directional links nudge 4px in the direction they face on hover, ~120ms ease-out.
- Sticky bar entry: slide-up on first paint, ~200ms ease-out.
- `prefers-reduced-motion` disables decorative motion only; state-essential changes (open/close, focus rings) remain.
- No bounce, no overshoot, no scale-on-hover, no parallax, no scroll-triggered reveals.

### Accessibility (locked, iteration round 3 — WCAG 2.2 AA floor)
- Skip-to-content link, visually hidden until keyboard focus.
- Focus rings: 2px solid `#0F4C81` outline + 2px offset on every interactive element.
- ARIA landmarks on every page. ARIA labels on icon-only buttons. ARIA live regions for action confirmations.
- Tooltips on cursor devices only, `aria-describedby` linked, ~500ms appear delay.
- Keyboard parity for every action. No hover-only content.
- Body 4.5:1 contrast. UI/large text 3:1.
- `prefers-color-scheme` out of scope for v1. Site is white-ground only.

### Medium-optimised UX rule (locked, iteration round 3)
Every component must be specified for every viewport class × every input modality. Do not assume "mobile = phone" or "desktop = pointer". Cursor: hover states + tooltips on hover. Touch: hover suppressed; tooltips replaced by permanent labels; tap targets ≥48×48 (≥56×64 emergency). Hover states never sticky after tap.

### Safe-exit / "Quick exit" feature (locked, iteration round 3 — outside research coverage, scaffolded via ux-designer skill)
- Floating outlined red button, fixed top-right of every page, always visible (Refuge / Women's Aid pattern).
- Border 2px solid `#C23616`, transparent fill, text `#C23616` at rest. Hover: fill inverts to `#C23616`, text white.
- Label "Quick exit".
- `aria-label="Leave this site immediately — opens Google in this tab"`.
- Tooltip on cursor devices only: `"Quickly leaves this site. Press Esc twice as a shortcut."`.
- Keyboard: Esc twice within 1000ms triggers. Single Esc retains its existing duty (closes mega-menus, drawers, modals).
- Action: `window.location.replace('https://www.google.com')`. Same tab. No confirmation dialog. No farewell page.
- Z-index above the sticky-emergency-bar. Hidden when printing. Mobile mirrors desktop placement — does NOT shrink.

### cal.com embed component (locked, iteration round 2 — new primitive)
- Lives on advisory pages only: `/consultation`, `/practice-areas/*/fees`, `/direct-access`, `/what-to-expect`. Never on emergency-intent pages.
- Wrapper background `#232536`. iframe `max-width: 720px`, centred. Generous `var(--space-16)` vertical padding.
- Lazy-loaded, `loading="lazy"`, `importance="low"`. cal.com script deferred. Never above the fold.

---

## 4. Next action

Engage the `webflow-development` skill (newly installed this session — appears in the Skill registry as `webflow-development`). The Webflow MCP server is also active for this project (see the session-start MCP servers reminder). The next action sequence is:

1. **Greet the user briefly**, confirm you have read this handoff, state that you are picking up at Phase 0.5 implementation.
2. **Ask the user if they have any final iteration items** before you amend the bundle. The plan was at a clean re-entry point with the SVG received and all decisions locked; the previous session was about to engage frontend-design but cleared instead. The user may have new thoughts after a break.
3. **If no further iteration**, invoke `webflow-development` skill and (where the question is design rather than Webflow-specific) `ux-designer` skill. There is no `frontend-design` skill in the registry — previous sessions referenced it as a top-level skill file outside the registry; if you can find `~/.claude/skills/frontend-design/SKILL.md`, read it directly. Otherwise rely on `ux-designer` + `webflow-development` for execution and `superpowers:writing-skills` / `simplify` for code-quality review of the bundle changes.
4. **Produce token + component deltas** that implement everything in section 3 above. Edit `src/tokens.css`, `src/typography.css`, `src/components.css`, `src/site.js`. Rebuild `dist/bundle.css`, `dist/bundle.min.css`, `dist/site.min.js`. Rebuild `dist/preview.html` as a true multi-breakpoint preview (desktop ~1280, tablet 768, mobile 390 — three side-by-side iframes or three preview routes).
5. **Update `aesthetic.md`** with explicit departure callouts per `feedback_callout_departures` for every line that changed (red allocation rule, fourth surface value `#232536`, motion section rewrite, `clamp()` responsive type section, container section, mobile-sticky-never-hides override, safe-exit feature). Keep it internally consistent — no lingering "zero third hue" line if hues were added.
6. **Update `DECISION_LOG.md`** with the Phase 0.5 decisions (separate from the Phase 0 entries already there).
7. **Visual review with user** before any git push. Show them the new `dist/preview.html`. Iterate.
8. **Push v1.2.0 to GitHub main** ONLY after explicit user authorisation. Tag the release. Verify jsDelivr resolves the pinned tag.
9. **Move to Webflow**: configure Webflow Variables per `webflow-injection.md` (extend it for the new tokens), inject head + footer custom code, smoke-test MAST + design-system, run a live mobile QA.

---

## 5. Skill protocol (HARD RULES)

**Every decision must trace to one of:**
1. The `project-mgmt` skill (sequencing and structure)
2. The `webflow-development` skill (Webflow-specific execution)
3. The `ux-designer` skill (interaction design, accessibility patterns, IA edge cases)
4. One of the three deep-research reports (Astons Strategy, Visual Practices, Rapid Outreach UX — pointers in `MEMORY.md` and `findings.md`)
5. The `simplify` skill (code-quality review of the bundle changes)

**If none of those covers the question:**
- Identify the closest other skill from the registry that does (e.g., `schema-markup`, `seo-schema`, `analytics-tracking`, `copy-editing`, `copywriting`, `marketing-psychology`, etc.)
- Invoke that skill
- Use its framework to scaffold a question back to the user
- DO NOT GUESS. DO NOT FALL BACK TO CLAUDE DEFAULTS. This is locked behaviour, codified in `feedback_decision_process_protocol`.

**For Webflow MCP work:**
- One action per Webflow MCP call. No tool use in between. No thinking mid-operation. See `feedback_webflow_mcp_pacing`.
- Call `webflow_guide_tool` once at the start to learn available capabilities. Only once per session.

**For agent dispatch:**
- The `Explore` agent for read-only code search across `.project/rebuild/` or `src/`. Quick / medium / thorough breadth as appropriate.
- The `Plan` agent if a sub-task warrants architectural planning before execution.
- The `general-purpose` agent only for broad research that doesn't match a specialised agent.
- Subagents are for parallelisation and context protection — not for duplicating work you should do inline.

---

## 6. Skill gotchas

- **`frontend-design`** — referenced repeatedly in previous sessions and in `project_design_stack.md` memory, but NOT in the Skill registry as of the last session. Previous sessions read its file directly from `~/.claude/skills/frontend-design/` if present. Check `ls ~/.claude/skills/` early in the session. If it exists, read it directly. If not, use `ux-designer` + `webflow-development` together.
- **`webflow-skills` plugin** — installed from `webflow/webflow-skills` marketplace. Skills inside it may not surface as top-level registry entries; they live under `~/.claude/plugins/`. Check there before assuming they're missing.
- **`webflow-development`** — newly installed this session via raw repo clone to `~/.claude/skills/webflow-development/`. Confirmed in the registry. Has `SKILL.md` + `references/` — read both before first use.
- **Webflow MCP tools** — extensive list available (see session-start tool list, prefix `mcp__claude_ai_Webflow__*`). These are deferred tools loaded via `ToolSearch`. Load only what you need per call to keep schemas tight.
- **`codebase-memory-mcp`** — the project has a code-discovery gate hook that blocks `Read` on code files in favour of `search_graph` / `get_code_snippet` / `query_graph`. For markdown / config / non-code files, `Read` works; for code in `src/*` use the MCP tools.

---

## 7. Hard "don't" list

Pulled from the feedback-memory files for fast reference. Cross-check `MEMORY.md` for the canonical versions.

- Do not assert any client fact not in `verified_facts.md`. No BSB number, no Inn, no year of call, no named cases, no second phone. (`feedback_no_fabricated_facts`)
- Do not write marketing-speak: no "right barrister for you", no rhetorical questions, no value-prop framing, no verbose regulatory clauses. (`feedback_no_marketing_speak`)
- Do not write AI-style prose: no triadic lists, no anaphora, no "performance of honesty", no em-dash maximalism, no aphoristic closes. Applies to both site copy AND conversational responses to the user. (`feedback_natural_voice`, `feedback_no_ai_framing_in_responses`)
- Do not cite specific statutory section numbers, sentencing figures, or case law unless verified for 2026. (`feedback_legal_specificity`)
- Do not add email captures, lead magnets, exit-intent, ESP integrations, nurture sequences. KPI is phone + WhatsApp + cal.com only. (`feedback_no_email_funnel`)
- Do not show a practitioner portrait. Do not over-use Ghulam's name. Entity-first, not personality-first. (`feedback_no_portrait_minimal_name`)
- Do not silently change any decision that differs from the live www.astonslaw.com. Flag every departure with reasoning. (`feedback_callout_departures`)
- Do not import literal-truth operational claims (hours, response times, "first call free", "clerks answer at night") from research or competitor sites without explicit user confirmation. Flag with 🚩. (`feedback_flag_imported_truth_claims`)
- Do not alternate tonal-step backgrounds across every section. Surgical use only — 1–2 emphasis sections per page maximum. (`feedback_no_alternating_banding`)
- Do not call multiple Webflow MCP tools in parallel or interleave with other tools. One action per call, no thinking mid-operation. (`feedback_webflow_mcp_pacing`)
- Do not fall back to Claude defaults for design or build decisions. Trace every decision to a skill or research citation. If neither covers it, ask the user via a scaffolded question from another skill. (`feedback_decision_process_protocol`)

---

## 8. Pending open items (for the next session to surface to the user)

These are NOT new decisions — they are execution-time questions the previous session deferred to the frontend-design engagement. Surface them when you start the design execution, not before:

- **Hero CTA replacement style** (red was removed from hero per the red-allocation rule). Three options in `visual-layering-plan.md` section "Hero CTA replacement". Default recommendation: navy solid for phone, navy outline for WhatsApp. Confirm with user.
- **Contextual hero image subject matter** — what specifically does the homepage hero image show? Must NOT be: stock, gavels, scales, Inn courtyards, courthouse exteriors, people. Suggest architectural detail (chambers entrance / Marylebone street geometry) or abstract textural composition. Confirm with user.
- **Card hover treatment** — does the practice-areas card border darken 10% on hover (consistent with button rule), or only the heading text colour shifts, or no change? Decided in frontend-design with reference to "no hover-lift" lock + 10% darken rule.
- **Mega-menu open-on-hover keyboard parity** — opens on hover with no delay for pointer; what about keyboard focus? Standard pattern: Tab focuses parent → Enter/Space opens. Confirm.

---

## 9. The user's expectations of you

The user has paid close attention this session and expects:
- Tight, plain professional register in chat. No AI prose patterns.
- Every decision traceable to a skill or to the research. No "I think it would be nice if…" — that gets pushed back as a Claude default.
- Proactive use of the `AskUserQuestion` tool when there is a real choice to make. Not for confirmation of obvious things.
- The bundle bumped to v1.2.0 only after they sign off on the visual preview.
- No git pushes without explicit authorisation. No Webflow MCP injection without explicit authorisation. These are shared-state actions.
- Frequent reference to and update of `.project/rebuild/progress.md` so the next session (if there is one) can pick up cleanly.

The user is not a developer in the strictest sense but is a careful operator who reads everything and notices drift. Treat this like working with a senior product manager, not a hobbyist.

---

Good luck. Pick this up well.
