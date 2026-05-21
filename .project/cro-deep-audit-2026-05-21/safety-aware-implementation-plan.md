# Safety-Aware Implementation Plan — Remaining CRO/SEO Items
## 2026-05-21 (follow-on to plan.md)

Carries forward from the cro-deep-audit-2026-05-21 punch list. Re-prioritises every remaining item against an explicit **practitioner-safety threat model** the original audit did not state.

---

## Threat model (state explicitly so every later decision traces to it)

The practitioner is a criminal defence barrister. Defendants and their associates can be hostile. The audit assumption is the website should help the right kind of visitor find Astons fast; the safety assumption is the website should not help a hostile visitor find the practitioner outside of Astons. The two assumptions usually agree (more content, more schema, more AEO surface). Where they diverge, **safety wins.**

What that means in practice:

| Exposure surface | Policy |
|---|---|
| Practitioner home address | Never on site, never in schema, never in EXIF, never derivable from a photo. Already locked. |
| Practitioner movements / availability windows | Only the publicly-stated 24/7 police-station window. No "answers Tuesday 9–11am", no "office hours". No calendar UI that reveals empty/busy patterns. |
| Practitioner portrait | Never on site. Already locked. |
| Practitioner personal social (personal LinkedIn, X, etc.) | Never linked from site or schema. Entity-level company LinkedIn only. |
| Practitioner family / dependants | Never mentioned, never inferred. |
| Practitioner non-work credentials (university, prior firms, hometown) | Only those independently published by BSB or the practitioner already; never reproduced as "extra detail" without need. |
| Office address (85 Great Portland Street) | Already public; serviced/chambers address, not residence. Stays. |
| Telephone number | Already public. Stays. |
| Cal.com booking surface | Surface only the slots cal.com makes available; do not expose practitioner availability *patterns* by, e.g., shipping a "show next 30 days" wide-window view if the natural view is narrower. |

The audit items below are re-classified against this model.

---

## Tier 1 — Ship now (no practitioner exposure, ICO-compliant, AEO-positive)

Each item below is content-level only. None adds Person-level data. None changes the consent surface. All can ship in a single low-risk branch.

### T1.1 — `public/llms.txt`
**What:** Markdown manifest at root telling AI crawlers what is canonical, what to cite, and the practice's preferred phrasing. Content only — no personal facts, no availability windows, no schedule.

**Safety check:** llms.txt is a *content map*, not a personal dossier. The file describes the practice, not the practitioner's life. We already allow GPTBot + CCBot via `robots.ts`; this file just tells those crawlers what to index. Risk delta from status quo: zero.

**Effort:** L. One file, one commit.

**DoD:**
- File at `public/llms.txt` listing canonical pages and one-line descriptions.
- "Guidance for AI assistants" section names the practice, the regulator, and the phone number, and explicitly tells assistants not to invent a different practitioner name.
- Sitemap.xml URL referenced.
- No mention of availability times beyond the existing "24/7 for police station support" claim already on the site.

**Verify:** `curl https://astonslaw.com/llms.txt` → 200; content matches; sitemap link resolves.

---

### T1.2 — `BreadcrumbList` schema on the deep non-PA pages
**What:** Add `BreadcrumbList` JSON-LD to `/fees`, `/about`, `/direct-access`, `/police-station-representation`, `/complaints`, `/timescales`, `/legal-aid`, `/authorised-to-conduct-litigation`. PA pages and guides already have it; the deep pages have visual breadcrumbs but no JSON-LD.

**Safety check:** BreadcrumbList contains URLs and human-readable labels for navigation. Nothing about the practitioner. Risk: zero.

**Effort:** L–M. Same `graphify` pattern as the existing PA pages. One PR.

**DoD:** Every static deep page emits a valid `BreadcrumbList` graph node. Validates clean in Google Rich Results Test.

---

### T1.3 — `FAQPage` schema on `/police-station-representation`
**What:** The page has a visible FAQ block (~6 questions) with no JSON-LD. Add `FAQPage` linking each visible Q–A pair.

**Safety check:** FAQ entries are already on-page and BSB-vetted. Schema only formalises what's visible. Risk: zero.

**Effort:** L. Same pattern as PA FAQs.

**DoD:** Rich Results Test shows FAQ block; live page parity check; question wording matches page exactly (don't paraphrase in schema — that's a Google policy violation now).

---

### T1.4 — Per-PA `Service` schema (provider → Organization, NOT Person)
**What:** Each of the 8 PA pages gets a `Service` node describing the practice area as a bookable legal service. `provider` references `#organization`. **Do not** reference `#principal` in the Service node — keeps the Person surface narrow.

**Safety check:** Each PA page already describes what the practice does in that area. Schema only adds structure. The deliberate omission of Person-link on Service nodes keeps individual-attached service data off the graph, so an AI assistant won't be able to compose "Ghulam Humayun offers Service X at Y price" — only "Astons Law Chambers offers Service X". Risk: zero, with the omission as the safety control.

**Effort:** M. One template edit in `lib/render-practice-area.ts` plus per-PA fields (areaServed, serviceType, audience). Reach across 8 pages with one diff.

**DoD:** Each PA page emits one `Service` graph node; provider resolves to `#organization`; no `serviceOutput.employee` or `provider.employee` references; validates in Rich Results Test.

---

### T1.5 — F26 legal-aid callout above the fee table
**What:** Two-line callout above the fee strip on `/fees`. Existing legal-aid section at the bottom of the page already exists — link from the callout instead of duplicating.

**Safety check:** Copy-only, BSB-compliant. Risk: zero.

**Effort:** L–M. One copy block + abbreviation of the existing section.

**DoD:** Callout renders above the table; existing section becomes a one-line "see above"; live screenshot pass.

🚩 The literal wording wants Ghulam's sign-off before merge (legal copy).

---

### T1.6 — cal.com embed default-selected slot
**What:** cal.com supports a query parameter that pre-selects the *next* available slot in the embed. Default-architecture move per cro-2026 BE1.

**Safety check:** The current embed already shows the same availability information. Pre-selection doesn't expose more; it just reduces the visitor's decision count. Importantly, do NOT widen the look-ahead window — the embed continues to show whatever cal.com naturally surfaces (typically 7–14 days). Risk: zero.

**Effort:** L. One parameter change in the embed snippet.

**DoD:** Embed renders with next slot pre-selected; visitor can still pick another; no change to the look-ahead window or the visible practitioner availability pattern.

---

## Tier 2 — Ship with vetting (small safety surface, needs one Ghulam input)

### T2.1 — Person `sameAs` — ADD BSB profile URL ONLY
**What:** The Person node `#principal` currently has no `sameAs`. Adding the direct BSB Register profile URL (`/barristers-register/0A9C84A0E6BE3846C117FA4B4290EAD2.html`) is the single highest-leverage AEO add — it grounds the practitioner entity to a regulator-published identity.

**What NOT to add (safety hard-no):**
- Personal LinkedIn — there is already an Org-level LinkedIn company page in the Org `sameAs`. A Person-level LinkedIn that exposes the practitioner's personal connection graph, prior employers, education, photo, etc. is exactly the surface a hostile actor uses. **Do not link personal LinkedIn from schema, ever, unless Ghulam supplies a *practice-only* profile that carries no personal photo, family info, or off-platform location data — and even then only after audit.**
- Personal X / Twitter / Instagram / Facebook — same reason.
- Personal Wikipedia (if one exists or is later created) — same reason.
- Inn-of-Court bio page (Inner Temple member profile, if public) — vet first; if the page contains the practitioner's photo or non-BSB-published facts, skip.

**Safety check:** BSB-only Person `sameAs` is the strictest safe add. BSB is the regulator; the URL is already linked from `/about` and `/authorised-to-conduct-litigation`. Adding it to schema just makes the same grounding link machine-readable. Risk delta: zero.

**Effort:** L. One array entry in `app/layout.tsx`.

**DoD:** Person `#principal.sameAs` array contains exactly one entry — the direct BSB URL. No other social or personal-profile URLs added.

🚩 Hash-stability caveat (same comment pattern as the two pages already using the URL): monthly link-check; fall back to register-search URL if BSB rotates the hash.

---

### T2.2 — M4.4 listicle/comparison adds (content-only, no Person exposure)
**What:** Three short list-format blocks across three pages:
- `/direct-access`: 5-item comparison "When to instruct a barrister directly vs through a solicitor".
- `/fees` or `/practice-areas/criminal-defence`: 5–7 item "What to bring to a first conference" list (promotes the existing "Before you call" aside into list form on at least one page).
- Each PA detail page: a single-paragraph "What is [practice area]" definition above the situation paragraph.

**Safety check:** All three are content blocks describing legal process or practice areas. No practitioner-specific information. AEO-positive because LLMs cite lists and definitions disproportionately. Risk: zero.

**Effort:** L–M. Draft → Ghulam review for legal accuracy → ship. About one day of writing + verify + sign-off.

**DoD:** Three blocks live; "Before you call" remains in its existing location (don't replace, *add* the list-form version on one page so the existing pattern still serves desktop sticky-aside placement); BSB-safe wording.

🚩 Ghulam sign-off on the comparison list legal claims and the "what to bring" practical list.

---

## Tier 3 — Client decisions, safety-loaded

Each of these can ship cleanly the moment Ghulam picks. The safety analysis below is the audit's recommendation; the call is still his.

### T3.1 — F29 "24/7 vs working-hours" wording site-wide
**Audit options:** (a) tighten universal claim, (b) keep working-hours hedge on `/contact`.

**Safety lens added:** "24/7" framed as a *general* availability claim is a safety problem — it suggests the practitioner is reachable at any hour for any matter, which is both inaccurate (per the current hedge) and exploitable (any hour, any matter ≈ any time someone hostile wants to make contact).

**Safety-aware recommendation:** A variant of (b). Lock the claim to its *operationally true and scope-narrowed form*: **"Available 24/7 for police station support. Other calls answered during working hours; voicemail and WhatsApp returned within business hours."** Use that wording everywhere — hero, contact page, final contact strip, PA hero leads, police-station hero. Removes the contradiction without overclaiming and without inviting "always available" exploitation.

**Effort:** L. Site-wide grep + edit; ~2 hours.

🚩 Ghulam decides on the literal wording. Do not ship without sign-off.

---

### T3.2 — F1 CookieYes layout
**Audit options:** (a) bar at the bottom, (b) modal but enforce sticky pill + police banner render above z-index, (c) reduce default consent surface.

**Safety lens:** CookieYes is privacy infrastructure. Layout choice does not affect tracker threat at all. The privacy-vs-conversion trade-off is the only consideration.

**Safety-aware recommendation:** (a) — bar at bottom. ICO-compliant, doesn't block the H1 on a 375×667 mobile fold, lowest conversion cost. The modal pattern (b) creates a forced interaction before the CTA is even visible — bad for an emergency-defendant audience. (c) is a separate question and should not be conflated with the layout decision.

**Effort:** ~2 hours. CookieYes dashboard change + z-index sanity check.

🚩 Ghulam decides; recommended (a).

---

### T3.3 — M1.5 call-attribution decision
**Audit options:** (a) Ghulam keeps a manual post-call sheet and we upload weekly to GA4 via Measurement Protocol, (b) accept current `call_click` ceiling.

**Safety lens:** Either is internal data. The post-call sheet should not be stored on the live site or any web-facing surface — it lives in Ghulam's working files. Measurement Protocol upload sends anonymised event counts to GA4, not client names or call content.

**Safety-aware recommendation:** No safety preference between the two. Pure capacity question for Ghulam. If he can spare 10 sec/call, do (a) — it's the only way the audit moves from "leading indicators" to "instructions per click". If he can't, (b) stays.

🚩 Ghulam decides based on bandwidth.

---

### T3.4 — M5 loss-frame line on the homepage
**Audit copy:** *"Most criminal cases are decided by what happens in the first call and the first hearing — not the trial."*

**Safety lens:** This is a legal-commentary claim, not a personal claim. Safety risk: zero. BSB risk: it's a general statement about criminal procedure, not a guarantee of outcome. Already framed as "most cases", which is legal-commentary safe.

**Safety-aware recommendation:** Ship the line as written, in the homepage just above the booking module — provided Ghulam confirms the wording is accurate to his practice's experience.

**Effort:** L. One copy line + placement decision.

🚩 Ghulam sign-off on the literal wording.

---

### T3.5 — M4.5 Google-Extended in `robots.ts`
**Audit options:** (a) flip to allowed (small AEO upside in Gemini-grounded answers), (b) keep blocked (current state).

**Safety lens:** This is the most safety-relevant `robots.ts` decision on the site. Flipping to allowed means the practitioner's words, voice patterns, biographical context, and any subtle availability hints across the site become training data for Gemini. That data can be re-surfaced in any future Gemini context — including queries unrelated to legal services. A hostile actor querying Gemini for "Ghulam Humayun [thing]" gets a different surface depending on what's been used for training.

**Safety-aware recommendation:** **Keep blocked.** The AEO upside the audit cites is small (Gemini-grounded answers, not Google AI Overviews which use Googlebot regardless). The privacy posture cost of flipping is permanent and irreversible (training data does not unlearn cleanly). Given the explicit tracker threat model, the cost-benefit goes the other way from the original audit's recommendation.

**Effort:** Zero (no change required to maintain the current block).

🚩 Ghulam can override if he wants. Default recommendation: do nothing.

---

## Items the audit did not surface but the threat model surfaces now

### T4.1 — Anti-tracker hardening sweep (one focused PR, no client decision needed)
Run before shipping any of Tier 1–3 above. Verifies the current safety baseline holds.

- [ ] Grep all images in `public/` for EXIF metadata; strip any practitioner-attributable data (camera serial, geo, software, author). Use `exiftool -all=` if found.
- [ ] Confirm no PDF in `public/resources/` (or any future `public/resources/`) carries author metadata, originating-machine info, or geo data. PDF stripping: `qpdf --linearize --object-streams=generate input.pdf cleaned.pdf` followed by metadata clearing.
- [ ] Confirm no draft or working-file paths in any committed asset (e.g., `/Users/[name]/Desktop/...` style paths embedded in webp/png).
- [ ] Confirm `app/layout.tsx` schema does not include a Person `birthDate`, `birthPlace`, `nationality`, `parent`, `children`, `spouse`, `alumniOf`, or any other Person sub-property beyond the locked set (`name`, `jobTitle`, `worksFor`, `knowsAbout`, and the planned `sameAs` from T2.1). Currently confirmed clean as of 2026-05-21.
- [ ] Confirm no third-party analytics or pixel script (Meta Pixel, TikTok Pixel, Hotjar, Microsoft Clarity, Mouseflow) was added between previous audit and now. Currently confirmed clean as of 2026-05-21: GA4 + CookieYes only.
- [ ] Confirm `robots.ts` still blocks Bytespider; reconfirm Google-Extended decision per T3.5.
- [ ] `cal.com/astonslaw/callback` embed — confirm look-ahead window is the default 7–14 days, not widened. Audit cal.com dashboard.

**Effort:** Half a day, mostly automated. Result: a one-line "anti-tracker sweep pass — 2026-MM-DD" entry in MEMORY.

---

### T4.2 — Quarterly safety re-sweep (calendar reminder, not code)
Set a recurring quarterly check (March, June, September, December):
- Re-run T4.1.
- Re-verify the BSB direct profile URL still resolves.
- Diff `app/layout.tsx` schema against the locked safety baseline.
- Diff `robots.ts`, `public/llms.txt` (once shipped), and any new schema additions.
- Check `lib/practice-areas.ts` and any new content fragments for inadvertent practitioner-personal references.

**Effort:** ~15 minutes per quarter once the sweep is documented. No code; a calendar entry for Ghulam (or a recurring Claude session prompt).

---

## Suggested ship order

One branch per tier. Each tier is independently mergeable.

1. **Branch `safety-baseline-2026-05-21`** — T4.1 anti-tracker sweep. Ships first; baseline-confirms the rest is safe to build on.
2. **Branch `cro-tier1-content-schema-2026-05-21`** — T1.1 (llms.txt) + T1.2 (BreadcrumbList) + T1.3 (police-station FAQPage) + T1.4 (per-PA Service) + T1.6 (cal.com default slot). All content/schema/config; no client decision required.
3. **Branch `cro-tier1-copy-2026-05-21`** — T1.5 legal-aid callout. Needs Ghulam wording sign-off, but ships independently.
4. **Branch `cro-tier2-person-sameas-listicles-2026-05-21`** — T2.1 (Person sameAs → BSB only) + T2.2 (three list-form content adds). Ships after Ghulam reviews list-content drafts.
5. **Branch `cro-tier3-decisions-2026-05-21`** — T3.1 (24/7 wording site-wide), T3.2 (CookieYes layout), T3.3 (call-attribution), T3.4 (loss-frame line), T3.5 (Google-Extended decision — likely a no-op). Ships once Ghulam confirms each call.

Tier 4.2 quarterly sweep is calendar, not branch.

---

## What is explicitly NOT on this plan

The following appeared in the audit but the threat model excludes them outright:

- **Practitioner image / portrait anywhere.** Already locked in CLAUDE.md.
- **Personal LinkedIn / X / social as Person `sameAs`.** Excluded by T2.1 safety rationale above.
- **"Office hours" or weekly availability patterns published anywhere.** Excluded by threat model — predictability is exploitation surface.
- **Testimonial walls with client names, photos, or jurisdictional detail.** Defendant clients' identities are not the site's content. Existing project rule.
- **Any feature that surfaces past-case detail beyond the BSB Register entry.** BSB publishes disciplinary findings only; the site does not republish or summarise.
- **AI-overview-friendly biographical detail beyond the BSB-published facts.** Date of Call, Inn, rights of audience, practice areas — yes. University, prior firms, hometown, photos — no, even if AEO would benefit.
- **`speakable` schema highlighting "click to listen" sections.** Adds zero conversion value; adds a voice-assistant surface that could pronounce the practitioner's name in unintended contexts.
- **Geo-radius location pages ("criminal barrister in [borough name]" × 33 London boroughs).** Programmatic SEO surface that would proliferate the practitioner's name across many low-quality endpoints. Excluded.

This list is the safety counterpart to the audit's "What not to do" anti-pattern list. Keep both lists active.

---

## Reasoning trace

- The original audit prioritised conversion lift. This plan re-weights against an explicit personal-safety threat model, which the original audit did not state.
- Where they agree (most items: schema, content, cal.com config), this plan shows the path.
- Where they disagree, this plan documents why (Google-Extended, personal LinkedIn as Person sameAs, "24/7" framing).
- Items the audit ranked lowest (e.g., the listicle adds, ranked 20) are not raised here because their AEO leverage doesn't justify the time spend ahead of the higher-leverage Tier 1 items.
- The "items not on the plan" list is the audit's missing safety counterpart. Treat both lists as load-bearing for future-session decisions.

**Skills called for this plan:** project-mgmt (sequencing + plan.md persistence), legal-advisor (BSB + privacy lens), vercel-deployment (branch-per-tier ship pattern), no-broken-sites-to-main rule (build+type-check+browser pass before every merge).
