# Findings: Astons Law Chambers rebuild

## Source research (2026-05-12)

Three deep-research projects executed on 2026-05-12 form the evidence base. Full reports live outside this repo because they are large; pointers below.

### 1. Astons Law Strategy Research (primary)
- **Path:** `~/Documents/Astons_Law_Strategy_Research_20260512/`
- **Files:** `report.md` (synthesis), `agent1_regulatory_competitors.md`, `agent2_search_behaviour_serp.md`, `agent3_ai_search_technical_seo.md`, `agent4_emergency_cro_ux.md`, `agent5_copy_positioning.md`
- **Headline:** 7 strategic directions; 3-phase recommended sequencing. The "two SERPs" insight (chambers SERP vs solicitor SERP) is the single most important finding.

### 2. Professional Website UI Visual Practices Research
- **Path:** `~/Documents/Professional_Website_UI_Visual_Practices_Research_20260512/`
- **Files:** `research_report_20260512_professional_website_ui_visual_practices.md`, `evidence.jsonl`, `claims.jsonl`, `sources.jsonl`
- **Headline:** Across 16 elite professional services sites — sans-serif primary (every one), 3–5 hue palettes, white grounds, generous whitespace on card-based 8px grids, trust via dated heritage + aggregate numbers + named outcomes. The "elite legal = serif/ivory/magazine" instinct is empirically wrong.

### 3. Professional Services Rapid Outreach UX Research
- **Path:** `~/Documents/Professional_Services_Rapid_Outreach_UX_Research_20260512/`
- **File:** `report.md`
- **Headline:** 50ms aesthetic verdict, 46% of credibility from visual design, phone outconverts forms 10–15×. The three-respectful-paths architecture (phone / WhatsApp / cal.com) directly matches the locked KPI.

## Cross-report convergence

The three reports independently land on the same shape — making the rebuild brief largely an execution job rather than a positioning argument.

| Theme | Astons Strategy | Visual Practices | Rapid Outreach UX |
|---|---|---|---|
| Phone + WhatsApp primary | Direction 2 (emergency triage) | n/a | §4–§5 (10–15× phone:form gap) |
| No portrait, entity-first | Direction 4 (schema + Wikidata) | Finding 6 (compensate with disclosure/rankings) | §4 (visual professionalism = 46% credibility) |
| Sans-serif, austere palette | Direction 4 (typography note) | Findings 1–2 (universal in 16-site sample) | §2 (rainbow effect harms 50ms verdict) |
| GOV.UK plain-English register | Direction 5 (entire) | n/a | §3 (specific verb CTAs, microcopy) |
| Reject SaaS/influencer playbook | Direction 2 + 4 | Finding 4 (no badge soup, no stock) | §7 (full reject list) |
| INP/CWV is the technical risk | Direction 7 (webflow.js issue) | Finding 1 (font fragility) | §8 (WCAG + tap targets) |
| AI citation = organic top-10 + passage patterns | Direction 6 (entire) | n/a | n/a |
| Trust signals: dates, numbers, named outcomes | Direction 4 (restraint) | Finding 4 (the framework) | §4 (trust hierarchy) |

## Confirmed client decisions (2026-05-12)

1. **URL migration approved** — `/criminal-defence/[area]` → `/practice-areas/[area]` with 301s
2. **Second phone number dropped** — 07767 268 607 confirmed not real; only 07922 247 999 surfaces
3. **Named authorship line approved** — "Reviewed by Ghulam Humayun, barrister, regulated by the Bar Standards Board" at foot of each pillar; no portrait, no bio block
4. **Workflow: project-mgmt spec-driven** — this directory is the source of truth across sessions

## Open questions

- **Brand accent colour** — burgundy vs navy vs deep indigo. Decision pending client input. Token set in `design-system/tokens.css` cannot lock until resolved
- **Clerks-line wording** — does Ghulam answer outside office hours, or do clerks? Need a literal-truth commitment before the hero copy lands
- **Complaints handler email** — live site shows `ghulam@astonslaw.com`; verified_facts treats it as unconfirmed. Re-confirm before publishing
- **Real verified cases** — need from Ghulam directly. Without these, no anonymised case examples appear anywhere
- **WhatsApp Business migration trigger volume** — wa.me to dedicated Business app is fine for v1; the WhatsApp Business API decision waits on observed inbound volume
- **Verifiable credentials beyond what's in verified_facts.md** — Inn, year of call, BSB number, panel grades, reported cases. None to be invented; only added on direct user confirmation

## Key technical decisions (already made by the research)

- **Suppress `webflow.js`** via `<script>WebflowEnabled=false</script>` once MAST replaces Webflow interactions — reclaims 200–400ms INP budget
- **Schema combination:** `LegalService` + `Person` + `Service` per practice area; `BreadcrumbList`; `FAQPage` as AI-retrieval scaffolding (rich-result retired 7 May 2026 but parser still uses it)
- **No self-hosted `Review` / `AggregateRating`** — no longer triggers SERP stars; no SEO value
- **Minimal `llms.txt`** for optionality only — not a strategic investment (theatre per current evidence)
- **IndexNow** if a free Webflow integration appears — feeds Bing → benefits ChatGPT Search freshness; otherwise low priority
- **WCAG 2.2 AA floor** — 4.5:1 body contrast, 3:1 large text & UI, tap target ≥48×48px (≥56×64px for emergency CTAs)

## Constraints (overrides defaults)

Inherited from project memory; all checked against the three research reports and survive intact:

- Phone + WhatsApp + cal.com only — no email funnels, lead magnets, exit-intent, ESP, nurture (per [[feedback_no_email_funnel]])
- No practitioner portrait, minimised name in body copy (per [[feedback_no_portrait_minimal_name]])
- GOV.UK plain-English register, no SaaS marketing-speak (per [[feedback_no_marketing_speak]], [[feedback_natural_voice]])
- No fabricated credentials (per [[feedback_no_fabricated_facts]])
- Soften statutory references — named Acts + Sentencing Council links only, no specific section numbers or year tariffs (per [[feedback_legal_specificity]])
- Webflow MCP: one action per call, no thinking mid-operation (per [[feedback_webflow_mcp_pacing]])
- Every departure from live site flagged with reasoning (per [[feedback_callout_departures]])
