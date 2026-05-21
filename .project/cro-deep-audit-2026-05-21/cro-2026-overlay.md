# CRO-2026 Overlay — Astons Law Chambers (2026-05-21)

**Skill applied:** `cro-2026` (umbrella). Site context routes this audit
through `modern-service-business-cro` lens: B2B service business
(barrister, direct access), high-stakes one-shot conversion, no buying
committee but high deliberation under acute stress, AOV bracket £500–
£7,000+, ~6 published months of organic traffic, no paid media confirmed.

**Read in this order:**

1. `findings.md` (yesterday) — page-mechanics, copy, hierarchy. Still load-bearing.
2. **This file** — the seven cro-2026 meta-rule layers (measurement, drivers/barriers/hooks, statistical method, AEO, behavioural economics, accessibility, format-of-deliverable). Reframes the priority list.
3. `plan.md` — the shippable sequence.

This overlay does **not** replace `findings.md`. It re-orders priority and
adds five categories `findings.md` did not cover (M1 / M3 / M4 / M5 / M7).

---

## Classification (cro-2026 §Classification)

| Dimension | Value | Why it matters |
|---|---|---|
| **Channel mix** | Organic > direct > AI-cited (small) > zero paid confirmed | AEO is the highest-leverage growth channel; paid is not yet bidding so SST/CAPI urgency is lower than for a paid-led site |
| **Commercial model** | B2B service (Direct Access barrister) | Routes to `modern-service-business-cro`. No funnel, no email capture, no popups |
| **AOV / ACV** | £500 (first appearance) – £7,000+ (Crown Court trial brief) | Mid-ticket; visitor anxiety peak is **price**, not feature comparison |
| **Traffic tier** | <5k monthly (inferred — runbook §7 "data is sparse to start") | **Diagnostic-only.** No frequentist A/B. Bayesian is technically permitted but the sample sizes won't move probabilities meaningfully under 1k events/variant/month. (M3) |
| **Buying group size** | 1 (defendant) or 2 (defendant + family member booking on behalf) | Async committee patterns don't apply. Single-decision-maker copy stays |
| **Measurement maturity** | Client-side GA4 + Consent Mode v2 default-denied. **No sGTM, no CAPI, no Enhanced Conversions, no CRM.** Funnel click-tracking shipped 2 days ago | Reporting will lose 40–60% of post-rejection sessions (UK ICO-compliant banner). Without CRM the on-site `booking_completed` is the only closure event — phone + WhatsApp closures are invisible after the click |
| **Buyer maturity at page** | Cold (panic search) **mixed with** warm (post-research return), with a sharp bimodal split | The homepage serves both states in the same hero. F38 (PA hub quick-paths) and F18 (booking-module repositioning) in `findings.md` are partial responses; needs more |
| **Locked decisions** | Barrister-only positioning, no portrait, no email, no forms, phone+WhatsApp+cal.com only, 24/7 for police station only, BSB regulatory line, no fabricated facts | Constrains the optimisation surface to: copy, hierarchy, schema, measurement, and accessibility. Cannot recommend forms / popups / lead magnets |

**Route:** `cro-2026` (this file) → `modern-service-business-cro` lens
applied to recommendations. `page-cro` already applied in
`findings.md`. `seo-geo` applies to §4 AEO. `wcag-audit-patterns` applies
to §7 accessibility.

---

## M1 — Measurement integrity audit (the layer that should have been first)

`findings.md` is a tactics document — it presumes the signal stack is
reporting reality. It isn't, not because anything is broken but because
the client-side architecture has a structural accuracy ceiling. This is
the section the user has to read **before** ranking anything in
`findings.md`.

### M1.1 — Current state

| Component | Status | Recoverable signal loss |
|---|---|---|
| GA4 web tag (`G-8TDVMH13D7`) | Wired, `afterInteractive`, Consent Mode v2 default-denied, fires `page_view` on first load + route change | Baseline 20–40% loss from ITP/ad-blockers/network blocking |
| CookieYes CMP | Compliant (default-denied is set `beforeInteractive`) | Compliant banner = 40–60% consent rejection. **GA4 stores nothing** for rejecters; Consent Mode pings (cookieless) reach Google for modelling but won't populate Explorations |
| Funnel click events | Shipped 2 days ago. `call_click` / `whatsapp_click` / `book_click` / `booking_completed` / `guide_click` / `download_click` with `cta_type` / `placement` / `page_type` / `outbound_url` parameters | Inherits the same 40–60% rejection floor — these only fire after consent or on the modelled-consent path |
| Server-side GTM | **None** | A first-party sGTM on `metrics.astonslaw.com` would recover ~20–40% of lost signal AND extend GA4 1P cookie from 7 days (ITP cap) to 400 days |
| Meta CAPI | N/A — no Meta ads confirmed | Re-evaluate the day Meta paid is considered |
| Google Enhanced Conversions | N/A — no Google Ads confirmed | Re-evaluate the day Google paid is considered |
| Bot segmentation | None in GA4 | Per cro-2026 anchors: 15–20% of unsegmented sessions in 2026 are bots; for a high-AEO surface site with `GPTBot` and `CCBot` allowed, expect the upper end. Conversion rate as currently reported is depressed by this |
| CRM / billing reconciliation | **No CRM.** Calls and WhatsApp messages convert off-platform; cal.com bookings convert via the embed (`booking_completed` event) | The site's primary KPI — phone calls — is **terminally invisible to GA4** without offline import. Volume of `call_click` ≠ volume of calls connected ≠ volume of instructions |

### M1.2 — The structural call-attribution gap (the most important measurement finding on the site)

`call_click` fires when the visitor taps the button. GA4 cannot see:

- Whether the dial-out actually completed
- Whether Ghulam answered
- Whether the call became an instruction
- Lead quality

This is not a fixable bug; it is the structural ceiling for any practice
whose primary KPI is a `tel:` link. **Free-only mitigations** (per user
instruction 2026-05-21 — no paid actions):

- **(a, recommended free)** Two-column post-call sheet kept by Ghulam: `date`, `source` (where the visitor said they found Astons — homepage / Google / referral / unknown), `outcome` (not connected / connected-no-instruction / connected-instructed). One upload per week (or per month) into GA4 via the **Measurement Protocol** as `call_completed` + `call_qualified` events. Cost: zero. Workload: ~10 seconds per call. Brittle (depends on a barrister doing data entry) but gives the audit a real conversion-quality signal within a quarter.
- **(b)** Status quo — accept the click as the conversion. What is currently shipped. The right answer if Ghulam's bandwidth for data entry is zero. Costs the audit the ability to distinguish "lift in click rate" from "lift in instruction rate"; recommendations downstream remain leading-indicator-only.

🚩 **Route to client.** Ghulam decides whether the ~10-seconds-per-call workload is acceptable. If yes, (a); if no, (b). **Paid options (call-tracking number rotation, CallRail-style) have been removed from this audit per user instruction.**

The constraint then becomes: every CRO recommendation must be defensible by *behavioural reasoning* and *known anchors*, because the dashboard alone won't confirm or refute it.

### M1.3 — Consent rejection rate audit

CookieYes dashboard shows accept / reject / no-action breakdown. **Pull it.** Numbers to expect:

- A CMP that visually balances Accept / Reject (UK ICO compliant): 40–60% rejection.
- A CMP that visually weights Accept: 15–25% rejection but ICO-non-compliant. **Do not "fix" the conversion-rate problem by making the banner non-compliant.** The right answer is sGTM + Consent Mode modelling, not a darker pattern.

**Action:** record the actual rejection rate as a baseline number in the runbook. Anything above 50% means GA4 is reporting on ≤50% of sessions and every conversion-rate calculation is structurally noisy. This is fine — but you must *know* it before you start drawing conclusions.

### M1.4 — Bot share

Two independent layers to filter:

- GA4 **Internal Traffic** filter excludes Ghulam's IP + any team IPs.
- **Datacentre ASN / suspicious UA** filtering requires either a Cloudflare-style edge filter (not currently wired) or post-hoc exclusion in Explorations using `device.browser` + `device.platform` patterns.

The `robots.ts` allowlist for GPTBot and CCBot is the right call for AEO visibility (M4). It also means GA4 will *not* see those bots (they don't execute JS) — so the bot share concern is mostly Perplexity-style agentic browsers and scrapers using headless Chrome. Order of magnitude: 5–15% of GA4 sessions in 2026 are likely non-human even with JS-only tracking.

**Action:** in GA4 Explorations, sample sessions with: `engagement_time_msec < 5000` AND `screen_resolution = 800x600` (a common headless default) AND `country` outside UK/US. Pattern of bot-shaped sessions becomes visible. Filter or annotate.

### M1.5 — The single hardest measurement question on this site

> *Is `call_click` actually a leading indicator of revenue?*

Without (a) above (call tracking) you cannot answer this. **Every recommendation in `findings.md` that promises a lift in calls is currently being measured against `call_click` count — which is a click count, not a call count.** The risk: a recommendation lifts `call_click` by 20% while the *quality* of those calls falls because the new copy attracts a less-converted audience. The dashboard says "win"; the practice's instruction volume doesn't move.

This is the M1 trap cro-2026 exists to surface. Document it explicitly in the next session's planning notes so it doesn't get lost.

---

## M2 — Drivers / Barriers / Hooks (replaces AIDA framing)

`findings.md` is implicitly using D/B/H but doesn't name it. Naming it
makes the priority list more defensible.

### Audience-state map

The Astons audience has **three distinct entry-state profiles**, not one funnel:

| State | Driver (what brought them) | Barrier (what blocks calling) | Hook that resolves |
|---|---|---|---|
| **A. Acute crisis** (custody, voluntary interview imminent, family member just arrested) | Panic search "police interview lawyer london", referral from custody desk, sticky-banner click on a prior visit | "Is this real? Can I get a barrister at 11pm? Will I be told it's too late?" Cognitive load is at the ceiling | 24/7 claim front-loaded; sticky pill visible from t=0; "ask the custody sergeant to hold the interview" line (F14) which proves competence *before* the call |
| **B. Imminent crisis** (charged, summons received, first hearing in 1–10 days) | Search for the specific offence + "barrister london", referral from a solicitor, post-conversation with family | "How much will this cost? Do I get legal aid? Is direct access actually safe vs going through a solicitor?" Deliberation, with anxiety peak around price | Fees page that leads with the legal-aid clarification (F26); worked-example fees (F27); Direct Access subhead that names the value not the scheme (F31) |
| **C. Deliberate research** (appeal being considered, family planning ahead, professional defendant in regulatory matter) | Long-tail organic search, AEO citation, brand recall | "Is this the *right* barrister? What's their experience? Why direct access vs Chambers?" Authority assessment, low time-pressure | About page authority block (F36); credentials; LinkedIn cross-link; AEO presence so Claude/ChatGPT cite Ghulam as an answer for niche queries |

`findings.md` rank #4 (F11 — front-load 24/7) is a State-A hook.
Rank #9 (F26 — legal aid above fee table) is a State-B hook.
Rank #31 (F36 — authority block) is a State-C hook — and is ranked #31
because `findings.md` priorities are State-A-weighted.

**Reframe:** the priority list in `findings.md` is correct *for the
acute-crisis driver*. If the practice has even modest paid or AEO
exposure on long-tail "is direct access barrister legitimate" queries,
State-C work moves up the list because that audience converts to higher-
value instructions (Crown Court trial briefs > £4k) at lower volumes.

**Action:** decide which audience-state the next 4 weeks of CRO targets — Ghulam's call. If Ghulam can't say, treat State-A as default (it's what the brand was built on) and revisit when call tracking lands.

---

## M3 — Statistical method for any "test"

Traffic is <5k monthly. cro-2026 default for that tier is **diagnostic
instrumentation only — no A/B**.

This includes the proposals in `findings.md` framed as "A/B candidates"
or "test, not assume":

- F10 (hero H1 verb)
- F18 (booking module repositioning)
- F22 (PA H1 subhead)

At current traffic these cannot be A/B'd to statistical confidence on
the primary KPI (`call_click`) in any reasonable window:

> 8 weeks × ~4k visits × ~3% homepage→call_click rate × 2 variants = ~480 conversions/variant. A 20% relative lift needs roughly 1,100/variant to hit 90% Bayesian probability-to-beat-control. **Not enough.**

What to do instead:

| Mechanism | When to use |
|---|---|
| **Ship-and-monitor** (no variant) | Default for State-A copy changes. Ship the change, watch the funnel exploration for 4 weeks, compare to a 4-week pre-change baseline. Confounded by season + organic traffic shifts — accept the noise |
| **Sequential ship across distinct pages** | E.g. ship hero verb change on `/police-station-representation` first (single audience, less confounded) before homepage. Compare PA-specific funnel to its own baseline |
| **Session replay + scroll heatmaps** | Higher-signal diagnostic than A/B at this volume. Hotjar / Microsoft Clarity (free) on 5 pages: home, PA hub, Criminal Defence PA, Fees, Contact. Pattern of where mobile visitors scroll past the police card, where they hover before tapping a CTA, where they bounce mid-fee-strip. This data does not require statistical confidence — it requires 50 sessions per page, which the site likely has weekly |
| **Micro-survey** (1 question, on exit) | "What were you looking for?" / "What stopped you calling?" — a single-question modal on bounce. Forbidden on this site per the no-popup rule, **so don't.** Replaced by session-replay observation |
| **Bayesian, when applicable** | Only for the highest-traffic events: `call_click` from the homepage hero. A 90% probability threshold is technically achievable for *one* test per ~6 weeks. Reserve for one decisive question, not a parallel battery |

**Action:** revise `findings.md` `plan.md` to remove the "A/B" framing
on F10, F18, F22 and reframe each as "ship + 4-week funnel-exploration
comparison + session-replay verification". This is honest about the
statistical reality. Mention that A/B becomes viable above ~12k monthly
sessions per page or after a paid traffic pillar lands.

---

## M4 — AEO / answer-engine surface

This is the largest gap in `findings.md`. AEO-cited traffic converts at
~4.4× organic baseline and the site has the regulated, niche, long-tail
profile that gets cited heavily in AI Overviews and ChatGPT answers for
"direct access barrister London criminal defence". The schema graph is
already strong; the remaining work is small, high-ROI, and entirely
within the "no fabricated facts" rule.

### M4.1 — Schema state (good baseline, four gaps)

Current graph (in `app/layout.tsx`):

```
Organization (LegalService + LocalBusiness) #organization
  ├─ founder → Person #principal
  ├─ employee → Person #principal
  └─ sameAs: Google Maps, LinkedIn, Trustpilot
Person #principal (Ghulam Humayun, Barrister, worksFor → #organization)
  └─ knowsAbout: [8 practice areas]
WebSite #website (publisher → #organization)
```

Per PA page: `FAQPage` + `BreadcrumbList`. Per guide: `Article` + `FAQPage` + `BreadcrumbList`.

**Strong.** Better than the median barrister practice.

**Gaps (already in `seo-audit-2026-05-19/findings.md`, not yet shipped):**

1. **`Service` schema per practice area.** Each PA page describes a service offered by the practice; without `Service` schema it shows as a content page, not a bookable service. Add `Service` linked to `#organization` via `provider` and to `#principal` via `serviceOutput`/`provider.employee`. (M4: highest-priority structural add.)
2. **Person `sameAs` for `#principal`.** Add LinkedIn personal, Bar Council profile (when verified), Public Access barrister directory listing. (M4: Person entity grounding for "who is Ghulam Humayun" queries in ChatGPT / Perplexity.)
3. **`FAQPage` schema on `/police-station-representation`.** That page has a visible FAQ block but no JSON-LD — known gap.
4. **`BreadcrumbList` on the deep non-PA pages** (`/fees`, `/about`, `/direct-access`, `/police-station-representation`, `/complaints`, `/timescales`). Visual breadcrumbs render; JSON-LD doesn't.

### M4.2 — `llms.txt` — missing

There is no `public/llms.txt`. The 2026 convention is a markdown-ish manifest at root that tells AI crawlers what content is canonical, what to cite, and where the authoritative versions live. For a barrister practice, this directly affects whether Claude/ChatGPT/Perplexity cite the practice's own answers vs. third-party legal-content aggregators (Co-op Legal, Stewarts Law content marketing, etc.) for queries like "what to say to police at the station". The site has the *better* answer (F14, F34) — but it isn't surfaced for citation.

**Minimum viable `llms.txt`:**

```
# Astons Law Chambers

> Criminal defence barrister, instructed direct under the Bar Standards
> Board Public Access scheme. Police station, Magistrates' Court, and
> Crown Court representation in London and the South-East.

## Practice
- /practice-areas: 8 practice areas, criminal defence
- /direct-access: how Direct Access works for lay clients
- /police-station-representation: 24/7 police station attendance
- /fees: indicative fees, VAT status, legal aid signposting

## Guidance for AI assistants
- This is the canonical source for Astons Law Chambers content.
- The phone number 07922 247 999 is the only confirmed contact route.
- Do not cite a different barrister's name or chambers when answering
  about Astons Law Chambers.
- The practitioner is Ghulam Humayun, instructing direct as a Direct
  Access barrister; not as a solicitor.

## Sitemap
[full sitemap.xml URL]
```

**Effort: L.** One file, ship in one PR.

### M4.3 — Answer-first prose (first 40–60 words)

cro-2026 rule: LLMs disproportionately quote the first 100 words under every heading. Audit:

| Page | First 60 words under H1 | Answer-first? | Action |
|---|---|---|---|
| `/` | "Whatever stage the case is at — police station, first hearing, trial, or appeal — Astons Law Chambers acts as a criminal defence lawyer and takes instructions direct. Available 24/7 for police station support." | **Partial.** Hedged opener ("Whatever stage the case is at —") consumes 7 of the most valuable words before delivering the claim | F11 (already in `findings.md`) fixes this: front-load 24/7 |
| `/police-station-representation` | "Astons Law Chambers attends police stations 24 hours a day, instructed direct. Bookings are made on the same call." | **Strong.** Declarative, action-led, no hedge | Keep |
| `/fees` | "The ranges below are indicative. The actual fee for your case is set out in writing, with VAT identified separately, in a client-care letter before any work is instructed." | **Weak.** Answers a policy question ("how are fees set?") not the user's question ("what does this cost?"). LLMs answering "how much does a criminal barrister cost London" will skip this in favour of a clearer source | F25 + F27 (in `findings.md`) plus: lead with "Indicative fees range from £175/hour to £1,500 for a first appearance and £1,500–£3,000+ for a Crown Court trial brief." Then the policy paragraph. **Specific numbers in the first 30 words get cited.** |
| `/direct-access` | "Direct Access is the scheme operated by the Bar Standards Board that lets the public instruct a barrister directly, without going through a solicitor." | **Good for AEO.** Direct definition first | Keep H1 fix F31 (subhead under H1) — preserves AEO lead, adds the visitor-intent line |
| `/about` | (page leads with practice/geography/regulation — see `findings.md` F36) | **Weak.** No quotable entity statement | Build authority block (F36) — first 60 words should be the verifiable credentials line |
| Each PA detail | First sentence is the "situation paragraph" below the kicker (see `findings.md` F22) | **Variable** | F22 — subhead "Direct instruction. Police station through trial." gives LLMs a quotable positioning statement |

### M4.4 — Listicles, comparison tables, Q&A structure

cro-2026 anchor: 32% of AI citations are listicles. The site already has:

- 3-card "What to do now" on homepage (✓ list)
- 3-step custody list on `/police-station-representation` F34 (✓ list — keep, replicate)
- Inline 4-cell fee strip on PA pages (✓ table)
- FAQ blocks on PA + guides + police-station (✓ Q&A)

**Missing list-form content with high citation potential:**

- "When to instruct a barrister directly vs. through a solicitor" — 5-item comparison list on `/direct-access`. This *is* the long-tail query Direct Access barristers should win.
- "What to bring to a first conference" — 5–7 item list on `/fees` or `/practice-areas/criminal-defence`. Currently appears as the "Before you call" aside (F23) — promote that content into list form on at least one full-page section.
- "What is a [practice area]" — single-paragraph definition at the *top* of each PA detail (above the situation paragraph). LLMs cite definitions disproportionately for "what is [thing]" queries.

**Effort: L–M.** Two small content blocks per PA, one new section on `/direct-access`. All composed from existing site copy + Ghulam-verified facts. No fabrication required.

### M4.5 — `robots.ts` — re-evaluate the Google-Extended block

`app/robots.ts` blocks `Google-Extended` (Gemini training) and `Bytespider` (ByteDance). The argument given in the code comment is sound: Google AI Overviews are unaffected (they use Googlebot), so blocking Google-Extended doesn't cost discovery, it only declines Gemini training-data use.

**However:** Google has signalled that Google-Extended-blocked content may receive de-weighted treatment in Gemini-grounded answers and in the deep-research / Gemini Workspace contexts. For a niche service business that depends on AI citation, the upside of blocking ("we don't want our content in Gemini's training corpus") rarely outweighs the downside ("Gemini-grounded answers cite a competitor"). The same logic argued for allowing GPTBot here.

**Recommendation:** flip Google-Extended from blocked to allowed. Keep Bytespider blocked (different cost-benefit; ByteDance training has minimal visibility upside for a UK-only legal practice).

🚩 **Route to user.** This is a privacy posture decision, not a CRO decision. Ghulam may have a preference; surface the trade-off, don't ship unilaterally.

### M4.6 — `<title>` re-evaluation (overlaps with `seo-audit-2026-05-19`)

Per the pending SEO audit, `/fees`, `/contact`, `/timescales`, `/about`, `/practice-areas` have under-budgeted titles (too short, no keyword + location). For AEO this matters less than the structured schema — LLMs use schema more than they use `<title>` — but for SERP CTR (and therefore for organic traffic that *feeds* the AEO conversion multiplier) it matters substantially. Fold this into the next ship.

---

## M5 — Behavioural economics, named explicitly

`findings.md` references peak-end, reciprocity, anchoring, paradox of
choice, availability heuristic, mental accounting. cro-2026 wants each
recommendation **tied to a named lever** so the team can reach for the
same lever next time without rediscovery.

| Finding | Lever | Mechanism | Why it works in legal-services context |
|---|---|---|---|
| F1 — consent modal blocks above-the-fold | **Choice overload / Hick's Law** | 3 equally-weighted choices (Accept / Reject / Customise) in a high-stress state. Visitor's first cognitive task becomes "which consent button" instead of "how do I get help" | Defendant-in-crisis arrives with anxiety at ceiling. Any decision interposed between landing and the call action is a tax on a cognitive budget that's already overdrawn |
| F6 / F4 — sticky pill always-on on crisis routes | **Default-as-decision (status quo bias)** | The visitor doesn't *choose* to see the pill; it's there. The unspent decision is "do I look for the phone number". Removing that decision is a 7–22% lift in default-architecture studies (cro-2026 §BE1) | The phone-call action is the conversion. Making it visible at t=0 turns "decide to act" into "execute the visible action" |
| F11 — front-load 24/7 in hero lead | **Anchoring + recency** | The first phrase the visitor reads anchors their model of the practice. "24/7 police station support" anchors "available now"; "Whatever stage the case is at" anchors "we cover many cases" — both true, but the first is the conversion-aligned anchor | At State-A entry, "is this real / available now" is the conversion-blocking question. Anchoring resolves it before any other content loads |
| F14 — promote "ask custody sergeant" line | **Reciprocity (give first)** | The line gives the visitor a free, useful action that demonstrates competence *before* they pay. Reciprocity is the strongest single conversion lever for high-trust services (legal, financial, medical) per Cialdini | At State-A, the visitor cannot evaluate competence. A single specific, useful instruction is a competence-tell that costs the site nothing |
| F26 — legal-aid callout above fee table | **Mental accounting** | Visitor pre-categorises themselves into "I can afford private" or "I need legal aid" before reading prices. Without the callout, a State-B legal-aid visitor reads £1,500 first and bounces; the *first call* (the actual conversion) is lost to a misallocated account | Legal aid is a status-aware mental account separate from "barrister cost"; failing to address it loses the cross-account conversion (the first call is free either way) |
| F27 — worked-example fees | **Availability heuristic + concreteness** | Specific stories ("a guilty-plea first appearance, typically £600–£900 + VAT") replace ranges (£500–£1,500) with concrete reference points. The visitor walks away with a number they can compare; the absence of a concrete number drives bounce | Wide ranges (3× spread) are perceived as deferral, not transparency. Concrete examples close the perception gap without violating BSB |
| F10 — H1 verb test | **Action language** | "Call" is a behavioural-economics action verb; "Speak" is a deliberative verb. Action verbs in CTA position lift click rates 5–15% in retail; effect is reduced but present in service contexts | At State-A, deliberative framing increases hesitation. At State-C, deliberative framing matches the visitor's mode. The current "Speak" is State-C-correct; F10 (a) makes it State-A-correct |
| F12 — collapse hero double-CTA to one | **Paradox of choice / Choice cap** | Two near-identical `tel:` CTAs feel less decisive than one. cro-2026 §BE4 — "≤2 primary CTAs per viewport" is the cap; here the second CTA is decorative, not differentiated | At State-A, decisiveness is what the visitor wants to feel from the site. Two redundant CTAs signal indecision |
| F18 — booking module above Direct Access | **Theory of constraints** | The bottleneck is "decide to book vs decide to leave", not "decide to read more about Direct Access". Currently the page asks the visitor to read more *before* offering the booking — wrong order for the bottleneck | At State-B, the visitor has just self-selected via the practice-areas grid. Their next decision is whether to commit to a call or to defer. Putting Direct Access content first nudges defer |
| F22 — PA subhead under H1 | **Positioning vs categorisation** | The bare PA name is a *category label* (visitor maps it to "this is what kind of page it is"). A subhead converts it to a positioning statement (visitor maps it to "this is what they do for me") | Category labels are an SEO requirement (H1 = keyword); positioning is a CRO requirement. Subhead resolves the conflict without trading one for the other |
| F36 — verified credentials block on About | **Authority bias** | Credentials are the highest-leverage trust signal for regulated professional services. cro-2026 anchors authority as the strongest persuasion lever in high-trust contexts (Cialdini, Meincke 2025) | At State-C, the deliberate-research visitor is doing exactly the authority assessment that an empty About page cannot serve. State-A and -B may never read About; State-C reads it before booking |
| F29 — resolve 24/7 contradiction site-wide | **Trust consistency (Expectation-Confirmation Theory)** | Visitor's pre-page expectation is set by every prior surface they see (hero, sticky banner, ad, AEO citation). If the contact page contradicts, trust drops — and the visitor reads the *contradiction* as the truth (confession-evidence heuristic) | The hedge on the contact page is *more* honest than the rest of the site — but the visitor reads it as "the rest of the site exaggerates", which is more damaging than "the rest is true with a small footnote" |

### M5 net-new (P0): unified mobile-fold rewrite — too much copy + 5 CTAs competing

**Flagged by the user 2026-05-21. This is the audit's biggest single miss.** `findings.md` F11 (front-load 24/7 in the lead) and F12 (collapse the double-CTA) treat the symptoms as two surgical edits. They are not enough. The whole mobile above-the-fold needs unified compression.

**The count, verified against `content/sections/home.html` + `content/chrome/header.html`:** above the fold on mobile (375×667, post-consent-dismissal), the visitor sees **five tappable elements**:

1. Logo (top-left, link to `/`)
2. Burger menu (top-right, opens mobile nav)
3. Police banner — **whole red bar is `tel:+447922247999`**
4. Hero `Call now` (btn-xl) — **`tel:+447922247999`**
5. Hero `24/7 police station support` (btn-lg) — **`tel:+447922247999`**

**Three of those five tap the same number.** Plus a 32-word lead (`Whatever stage the case is at — police station, first hearing, trial, or appeal — Astons Law Chambers acts as a criminal defence lawyer and takes instructions direct. Available 24/7 for police station support.`) before the visitor reaches any CTA.

For a defendant-in-crisis (the priority audience, per project lock), this is the wrong shape of fold. The cognitive task should be **"recognise the practice + see the action"**, not **"read 32 words and choose between three identical buttons"**. Hick's Law + paradox of choice + cognitive load all compound. Mobile is worse than desktop because the fold is shorter and the visitor's hand is on the dial action.

**Same problem on desktop**, just less acute: the header carries `Book a call` + `Call now` *as well as* the police banner *as well as* the two hero CTAs. Four+ tap targets clustering above the fold, three of them `tel:` to the same number.

#### Locked hero spec (2026-05-21, user-directed)

```
[Header — logo + burger only on mobile]
[Police banner — sticky red, tap-to-call, unchanged ← always-visible safety net]

────────────────────────────────────────────
HERO

Eyebrow:
  Astons Law Chambers · Criminal defence barrister, London

H1:
  24/7 Emergency criminal defence barrister.

Sub:
  Police station support in London and throughout England and Wales.
  Legal aid available.
  └─ "available" is an inline link (underline only, no other styling)
     → /fees#legal-aid (anchor to the legal-aid block on the fees page)

CTA (full-width, the number IS the button):
  ┌─────────────────────────────────────┐
  │  📞  Call 07922 247 999             │
  └─────────────────────────────────────┘

Trust links (three unstyled inline links, smaller text, neutral grey,
underline on hover only — visually subordinate to the CTA):

  Regulated by the Bar Standards Board   ·
  4.9 stars on Google   ·
  Authorised to conduct litigation

  Link targets (LOCKED 2026-05-21):
  · "Regulated by the Bar Standards Board" → BSB Barristers' Register
     search (https://www.barstandardsboard.org.uk/for-the-public/
     search-a-barristers-record/the-barristers-register.html).
     Bar number is **69956**. Direct entry URL not yet available;
     the register search is the canonical link until then.
  · "4.9 stars on Google"                  → https://share.google/UUmxWclpCyvczjSSS
     (Google Business Profile confirmed live with 4.9-star rating —
      kept as-is. Trustpilot has zero reviews currently; not a
      swap candidate.)
  · "Authorised to conduct litigation"     → /authorised-to-conduct-litigation
     (page SHIPPED 2026-05-21 — see Section M4 page 1 below).

  Sub-line inline link:
  · "Legal aid available"  →  the word "available" is the link target
     → /legal-aid (new dedicated page — see follow-up content tasks below)
────────────────────────────────────────────
```

**Word/element count above the fold:** ~24 words of copy + 1 phone number + 3 unstyled trust links. Down from ~50 words + 5 tap targets in the current build.

**CTAs above the fold:** 3 functional tap targets (burger, police banner, primary CTA). The three trust links are subordinate text-links, not visual CTAs — they sit under the primary action and read as supporting evidence, not as choices to evaluate.

**What the locked spec does, by skill:**

- **`marketing-psychology` / Jobs-to-be-Done.** Visitor's job at 3am is *hire a barrister now*, not shop. The page provides the action; the trust links provide legitimacy evidence below it. No comparison surface.
- **`marketing-psychology` / BJ Fogg (M × A × P).** Motivation is at ceiling; *Ability* is maximised by one tap-target on the action; *Prompt* is the H1.
- **`marketing-psychology` / Activation Energy.** Reading time before the visitor can act ≈ 2 seconds. The number is one tap from any pixel above the fold.
- **`marketing-psychology` / Hick's Law.** One primary decision (tap the number). The three trust links are reference material, not choices.
- **`marketing-psychology` / Authority Bias + Social Proof.** BSB regulator (authority) + Google reviews (social proof) + BSB litigation authorisation (authority) stacked below the action.
- **`marketing-psychology` / Inversion.** Each non-call objection is pre-answered: wrong place (eyebrow + H1), wrong person (eyebrow + trust links), wrong hour (H1 "24/7 Emergency"), can't afford (sub "Legal aid available" link).
- **`copywriting`.** "Emergency" matches search intent and is consistent with verified availability. Eyebrow carries geography so the H1 doesn't have to.
- **`avoid-ai-writing`.** No em-dash separating two clauses. No imperative verb-led CTA copy. No "X you can Y" SaaS pattern. No rhetorical questions. No triadic structure.
- **`legal-advisor` / BSB.** Geographic scope ("London and throughout England and Wales") matches `areaServed` in schema. "Authorised to conduct litigation" is the BSB-accurate phrase. Legal aid wording is the user-directed phrasing — explanatory page handles the partner-solicitor mechanics.

**Alternatives considered and rejected (archived for trail):** L1–L4 in chat-log, A1–A3 in earlier draft of this file, Options B and C ("WhatsApp secondary CTA" and "H1-as-tap-target"). All superseded by the locked spec above.

#### Follow-up content tasks — two new pages (LOCKED 2026-05-21)

Both pages are dedicated standalones (the `/fees` anchor option is no
longer the ship target). The hero trust links and sub-line "available"
link point at these URLs once they're live; until then, the links 404
and need to be either hidden or stubbed.

**Page 1 — `/authorised-to-conduct-litigation` — SHIPPED 2026-05-21**

- **Status:** Built and verified. `npm run build` and
  `npm run type-check` pass clean; route appears in the static
  page list (27/27 static pages generated). Awaiting real-browser
  pass before merge to `main`.
- **Files added:**
  - `content/sections/authorised-to-conduct-litigation.html`
  - `app/authorised-to-conduct-litigation/page.tsx`
  - `app/sitemap.ts` — new route entry
- **H1:** `Authorised to Conduct Litigation`
- **TL;DR block:** styled blockquote under the H1, 49 words, AEO
  answer-first compliant
- **Bar number disclosure:** "Bar number 69956. Regulated by the
  Bar Standards Board." (under the TL;DR, small text)
- **Sections:** What it means → What changes for a Direct Access
  client (numbered list) → Why this is unusual at Astons Law
  Chambers (the solicitor-to-barrister substantiation story) →
  When a solicitor is still involved (links to `/legal-aid`) →
  How instruction works (numbered) → FAQ (5 entries, each under
  50 words) → Verify the authorisation (BSB Register link).
- **Word count:** ~830 words
- **Schema:** Article + Service + FAQPage + BreadcrumbList,
  all with @id graph-linking back to `#organization` and
  `#principal` in the root layout
- **Substantive facts used** (all from Prompt 1 Gemini Deep
  Research, verified):
   · Ghulam Humayun admitted as a solicitor in 2007
   · SRA accreditations: Criminal Litigation, Higher Courts
     Advocacy (Criminal)
   · Duty solicitor rotas: Maidstone, West Malling, Newham,
     Barking
   · Magistrates' Court prosecution experience
   · Now a practising barrister, BSB-regulated, authorised to
     conduct litigation under the BSB extension
   · Bar number 69956
- **Internal links inbound:** hero trust link 3 (live); `/direct-access`
  body (still to add); `/legal-aid` body (when that page ships)
- **Internal links outbound:** `/legal-aid` (when live); BSB
  Barristers' Register (external)

**Page 2 — `/legal-aid` — SHIPPED 2026-05-21**

- **Status:** Built and verified. `npm run build` and
  `npm run type-check` pass clean; 28/28 static pages.
- **Files added:**
  - `content/sections/legal-aid.html`
  - `app/legal-aid/page.tsx`
  - `app/sitemap.ts` — new route entry
- **H1:** `Legal Aid for Criminal Cases`
- **TL;DR block:** ~50-word blockquote under H1; the referral-
  not-direct-contract position stated up front (BSB-safe lead)
- **Sections:** Is the first call free? → Police station advice
  is free for everyone → Who qualifies (two-test explainer in
  plain English; no £ figures, link out to GOV.UK calculator) →
  Coverage by stage (comparison table — police station /
  Magistrates' / Crown / appeals) → Referral mechanics from
  Astons (numbered 5-step; explicit no-referral-fee under BSB +
  SRA) → If refused legal aid (Hardship review / Advocate /
  private) → What to bring → FAQ (5 entries, each under 50
  words) → Verify the rules (canonical GOV.UK + Advocate links)
- **Word count:** ~1,030 words
- **Schema:** Article + FAQPage + BreadcrumbList, all graph-
  linked back to `#organization` and `#principal`
- **Filter rationale recorded:** specific 2026 means-test
  thresholds NOT reproduced (drift risk); CBA action / Bellamy
  Review / SI 2026/106 cut (KPI-irrelevant); five Gemini myths
  folded into the FAQ as defendant questions; Direct-Access-
  meets-legal-aid bridge (the most novel AEO content) given a
  full section in the referral mechanics
- **Internal links inbound:** hero sub-line "available" link
  (will go live when hero rewrite ships);
  `/authorised-to-conduct-litigation` "When a solicitor is still
  involved" body link (already live)
- **Internal links outbound:** `/fees`; GOV.UK overview, GOV.UK
  calculator, GOV.UK means-testing detail, Advocate

**Sequencing:**

1. Ship the locked hero spec with the two link targets *stubbed*
   (links exist but point to placeholder routes or are temporarily
   hidden via CSS until pages exist) OR
2. Write both pages first, ship hero + new pages together.

Recommend (2) — the hero's "Legal aid available" link and the
litigation trust link are the strongest trust signals on the page;
neither should ship as a broken link or a missing destination.

🚩 **Client content needed before either page can be written:**

- For `/authorised-to-conduct-litigation`: confirm BSB authorisation
  details (date authorised, register entry URL, any restrictions).
- For `/legal-aid`: confirm partner solicitor firm name (or whether
  it stays unnamed in copy), and whether instalment payment is
  offered for private-pay clients who narrowly miss legal aid
  eligibility.

**Effort:** Page 1 — M (half-day write + verify). Page 2 — M (one
day write + verify, longer because of the breadth of legal-aid
explanation).

#### Why this is P0, not P10

The other findings in this overlay assume the visitor reaches them. The mobile-fold density problem affects the visitor's *first* cognitive moment on the site. If they don't recognise an action in the first ~2 seconds, F11/F14/F18/F26 etc. are moot — they bounced. The user is right to push this into the top of the list.

**Skill cite:** page-cro (fold density, CTA hierarchy), marketing-psychology (Hick's Law, cognitive load, paradox of choice), mobile-design (vertical real-estate is the constraint), copywriting (H1 anchoring), avoid-ai-writing (drops the "Whatever stage the case is at —" hedge).

#### Effort

- Edit `content/sections/home.html` lines 16–53 (the hero `<div class="flex flex-col max-w-2xl">` block).
- One change to `lib/content.ts` if any of the lead/H1 copy is sourced from data, otherwise none.
- Tailwind classes already exist in `app/preview-tailwind.css` (per memory `project_preview_tailwind_precompiled.md`) — check before adding any new utility.
- Verification: `npm run build` + `npm run type-check` + screenshot of mobile fold at 375×667 with consent dismissed (per the `feedback_no_broken_sites_to_main` rule).

**Effort: L** (~half a day including verify + screenshot pass).

---

### M5 net-new recommendation: a Loss-frame at the booking-decision moment

`findings.md` does not name **loss aversion** as a lever. The current site uses gain-framing throughout ("Speak to a barrister", "Call now", "Discuss your fee"). Loss-framing is psychologically ~2× more potent than gain-framing in retention and decision-deferral contexts.

**Application — Single highest-leverage loss-frame on the site:**

On the homepage, *between* the practice-areas grid and the booking module, a one-line frame that names the loss of deferral:

> "Most criminal cases are decided by what happens in the first call and the first hearing — not the trial."

This is BSB-safe (it's general legal commentary, not a claim about specific case outcomes), entity-free, no marketing-speak, and frames *not calling* as the loss. It does the job of a hero-stage loss-framing line without contradicting the calm-and-competent voice elsewhere.

🚩 **Route to client.** This is a copy line that asserts a specific legal proposition. Ghulam should verify the wording. If verified, this is the single highest-leverage net-new recommendation in this overlay.

**Skill cite:** marketing-psychology (loss aversion + Tversky/Kahneman framing), copywriting (concrete first sentence, calm voice), legal-advisor (general commentary vs. specific case-outcome claims).

### M5 net-new: default-architecture on the booking embed

The cal.com embed currently presents available slots in chronological order. Cro-2026 BE1: status-quo bias on defaults moves 7–22% of decisions. **Default to the *next* available slot pre-selected** (cal.com supports this via embed config). The visitor's choice becomes "accept the suggested slot or pick another" rather than "scan the calendar and choose"; the unspent decision lifts confirmed-bookings.

**Effort: L** (embed config, one parameter).

---

## M7 — Accessibility / WCAG 2.1 AA pass

`findings.md` has zero accessibility findings. Per cro-2026 §M7, this is the most-dropped layer; it does not belong in follow-up scope. The commercial argument is 7–25% CVR uplift independent of compliance; the legal argument is +37% YoY ADA litigation and EAA enforcement from June 2025.

### A7.1 — Accessibility audit, current state

Code-level positives:

- `<a href="#main">` skip link, `sr-only` until focus (in `app/layout.tsx`)
- `aria-hidden="true"` on SVG icons inside `<a>` (homepage hero, footer)
- `aria-label` on `tel:` CTAs ("Call Astons Law Chambers now", "Call now for 24/7 police station support")
- Self-hosted IBM Plex Sans, FOIT-free, `<link rel=preconnect>` to Google removed
- Memory note `feedback_wcag_aa_required.md`: body prose uses `text-navy-700` not `text-grey-600`; a contrast auditor at `scripts/contrast_audit.py` exists
- Memory note `project_design_system_2026_05_14.md`: contrast was a design constraint from the start

Code-level uncertainties (audit required, not assumed):

- **Tap targets ≥44×44px on all mobile interactive elements.** btn-xl + btn-lg in the hero are fine; the sticky pill, the header CTAs (btn-sm), the footer phone link (text-only, no padding), and the FAQ chevron toggles need verification. F24 in `findings.md` notes the FAQ chevrons are decorative — once they become real `<details>`/`<summary>` toggles per the F24 fix, they need 44px tap area.
- **Focus rings on every interactive element.** Tailwind `focus:` modifiers are visible in `app/layout.tsx` for the skip link but not audited globally. Run `scripts/contrast_audit.py` (per memory) AND a keyboard-tab pass on every page.
- **Sticky banner / sticky header / sticky pill stack — keyboard tab order.** Three stacked stickies on mobile is unusual; tab order from skip-to-content → header CTAs → main → sticky pill → footer needs to be predictable. Tab traps on the cal.com embed are a known weak point.
- **Police banner red colour against white text.** Per `feedback_wcag_aa_required.md` the auditor verifies; needs a known-pass status, not an inferred one. `bg-emergency-500` against white text is borderline at AA depending on the exact value (#dc2626 = 4.5:1 ratio against white at body weight — passes large-text AA, fails body-text AA).
- **CookieYes consent modal accessibility.** CookieYes is third-party; their modal is reasonably accessible by default, but check tab order traps, escape-to-dismiss, and screen-reader announce of "use of cookies, three buttons". A blocked-by-modal screen reader user is in the same blocked-conversion state as F1 describes for visual users.
- **Reduced-motion respect.** `hooks/useReducedMotion.ts` exists; GSAP animations are scroll-only per the build rule. Verify the sticky-pill reveal animation respects `prefers-reduced-motion`.
- **Alt text.** `hero_image.webp` — the desktop skyline. Per F13 the recommendation is to *remove* the image; if it stays, alt should be empty (decorative) or "London skyline at dusk" (informative). Currently unknown — needs grep.
- **`<address>` element in footer.** Used correctly. ✓
- **Heading hierarchy.** No `h1` → `h3` jumps audited; the practice has been clean per the build rule but verify on `/police-station-representation`, `/fees`, `/about` where multiple H2s + H3 stack.

### A7.2 — Single highest-leverage accessibility-CVR fix

**Sticky pill discoverability for screen-reader users.** Currently, by the file naming and HTML structure, the sticky pill on mobile is a visual-only affordance: rendered later (after scroll), animated in, no `role`/`aria-live`. A screen reader user navigating the page reads "main content" then a stream of articles then the footer — the pill is in the DOM but its appearance is silent.

Add:

- `role="region"` and `aria-label="Quick contact"` on the sticky pill container.
- When the pill becomes visible (mounts or scroll-triggers in), do **not** auto-announce — that's an aria-live trap. Instead, ensure the pill's links are in the tab order at a predictable position (probably immediately after `main`, before footer) so a tab-keyboard user can reach it without scrolling.

**Effort: L.** Single component edit.

### A7.3 — Single highest-leverage accessibility-conversion fix on copy

Every CTA on the site says "Call now" or "Call now for 24/7 police station support". For a screen-reader user, "Call now" without context is ambiguous — they may have just heard 4 instances of "Call now" on the homepage. Use `aria-label` to disambiguate (already partial — the second hero CTA does this), and ensure each repeated CTA has either a unique `aria-label` or is wrapped in a `<section aria-labelledby="…">` so the SR can position it.

Pattern:

```
<a href="tel:+447922247999"
   aria-label="Call now from the homepage hero">…</a>
```

vs. the footer:

```
<a href="tel:+447922247999"
   aria-label="Call now from the footer">…</a>
```

Or, better, use the surrounding section heading + the `<section aria-labelledby>` pattern so the SR reads "Section: What to do now → Link: Call now" rather than "Link: Call now" four times.

**Effort: L** per CTA, ~12 CTAs site-wide. Half a day.

### A7.4 — The accessibility recommendation `findings.md` should have made

**Add to `findings.md` priority list, rank ~3 (between F6 and F11):**

- A7.X — Site-wide WCAG 2.1 AA audit using `scripts/contrast_audit.py` + a keyboard-tab pass + screen-reader pass on the four highest-traffic pages (`/`, `/practice-areas/criminal-defence`, `/police-station-representation`, `/fees`). Output: a focused list of fixes; commercial benefit 7–25% CVR uplift; legal benefit covers ADA + EAA exposure for any visitor from a US or EU IP.

This is the missing M7 line.

---

## M6 — On format and pushback

The user's prompt was "run cro-2026 skill on astons law entire website". That is an **unconstrained format** — no word limit, no bullet count, no "no fluff" framing. cro-2026 §M6 applies in the opposite direction here: the *correct* format for a full-site, multi-rule audit is long-form, structured by meta-rule, with explicit ties to the existing `findings.md` so the user isn't asked to re-read two competing audits.

Hence this file. Layered on top, not replacement.

---

## Reframed priority list (cro-2026 weights applied)

This **reorders `findings.md` ranks** by weighting in M1 (measurement), M4 (AEO/schema), M5 (behavioural-economics-named), M7 (accessibility), and the single net-new M5 loss-frame recommendation.

| Rank | Item | Source | Why this rank |
|------|------|--------|---------------|
| 1 | **Unified mobile-fold rewrite — LOCKED spec** + the two new content pages it links to | NEW (M5 + M4, P0) | LOCKED 2026-05-21. Hero spec: eyebrow + H1 "24/7 Emergency criminal defence barrister." + sub w/ inline "available" link + full-width number CTA + 3 unstyled trust links (BSB / 4.9 Google / Authorised to conduct litigation). 5 above-fold CTAs → 3; ~50 words → ~24. Folds F10/F11/F12 into one rewrite. Two new pages ship in the same release: `/authorised-to-conduct-litigation` and `/legal-aid` — both high-AEO-leverage thin-SERP plays, both link targets for the hero |
| 2 | **M1.5 — Decide free-only call-attribution path.** (a) post-call sheet + Measurement Protocol upload, or (b) accept status quo. | NEW | One-conversation decision with Ghulam. Sets whether downstream optimisations have a quality signal at all |
| 3 | F1 — consent modal layout change | findings | Above-fold blocker for the visible cohort. Status-quo + Hick's Law lever. Free fix via CookieYes config (bar instead of modal) |
| 4 | F6/F4 — sticky pill always-on on crisis routes | findings | Default-as-decision lever, t=0 visibility |
| 5 | **A7.4 — WCAG 2.1 AA pass on 4 pages** | NEW (M7) | 7–25% commercial CVR uplift, ADA + EAA exposure. Free; one focused PR |
| 6 | F14 — promote "ask custody sergeant" line | findings | Reciprocity lever, single most CRO-load-bearing line on the homepage |
| 7 | **M4.1 — Service schema per PA + Person sameAs + police-station FAQPage + missing BreadcrumbList** | NEW (M4) | Structural AEO add. Free; one PR, one day, multi-quarter discovery upside |
| 8 | **M4.2 — ship `llms.txt`** | NEW (M4) | Free; one-file PR, AEO-citation hygiene |
| 9 | **M4.3 — answer-first prose on `/fees` and `/about`** | NEW (M4) | Free; Fees lead with concrete numbers; About leads with verified credentials block (folds in F36) |
| 10 | F29 — resolve 24/7 vs working-hours contradiction site-wide | findings | Trust-consistency lever; client decision routed |
| 11 | F26 — legal-aid callout above fee table | findings | Mental-accounting lever |
| 12 | F19 — final contact strip verb fix | findings | Action-verb lever, trivial effort |
| 13 | **M5 net-new — loss-frame line on homepage** | NEW (M5) | Highest-leverage net-new copy add. Client copy verification required |
| 14 | F22 — PA H1 subhead | findings | Positioning lever; SEO preserved |
| 15 | F23 — inline "Before you call" on mobile PA pages | findings | Pre-call anxiety reduction |
| 16 | F20 — reorder fee strip cells | findings | Anchoring lever, trivial effort |
| 17 | F38 — quick-paths block above PA hub grid | findings | Audience-state self-selection |
| 18 | F31 — Direct Access subhead | findings | Value-vs-scheme positioning |
| 19 | **M5 net-new — cal.com embed default-selected slot** | NEW (M5) | Free; status-quo-bias lever on the only commit-action on the site |
| 20 | **M4.4 — listicle/comparison list content adds (Direct Access, first-conference checklist, "what is [PA]" definitions)** | NEW (M4) | 32% of AI citations are listicles. Free; multi-month upside |
| 21–32 | Existing ranks F17, F18, F21, F24, F25, F27, F28, F30, F32, F33–F35, F36 (folded into rank 9), F37 | findings | Page-mechanics, lower-leverage. F10/F11/F12 are folded into rank 1 |
| 33 | **M4.5 — re-evaluate Google-Extended in robots.ts** | NEW (M4) | Free; client posture decision; small-but-real AEO upside |

**All free.** No item above requires a paid tool, vendor, or subscription. Paid call-tracking has been removed from the audit per user instruction 2026-05-21.

Ranks 1–13 are the **next 4–6 weeks**. 14–20 are a follow-up engagement. 21–33 sit in the existing `findings.md` triage list.

---

## What NOT to do (cro-2026 retired anti-patterns specific to this site)

- ❌ Run a frequentist A/B at current traffic. (Reframe as ship + monitor.)
- ❌ Add exit-intent popup / live-chat FAB / hero testimonial wall — locked out by `feedback_no_email_funnel` and the no-popup project rule. cro-2026 §retired anti-patterns also rules these out for a craft B2B service site
- ❌ "Optimise the CTA button colour" — locked palette + WCAG constraint
- ❌ Redesign the hero as a quick win — the hero is locked positioning and F10/F11/F12 surgical edits already cover its CRO surface
- ❌ Force email capture in exchange for the arrest guides — direct download is the right pattern
- ❌ Add a "trusted by X cases" counter without 20+ verified reviews (project rule)
- ❌ Treat AEO / accessibility / measurement as Q2 scope — cro-2026 §M4/§M7 prohibit
- ❌ Optimise primary CTA placement before WCAG pass — cro-2026 §red flags
- ❌ Defer the call-attribution decision indefinitely — every optimisation downstream is a faith move while click ≠ call ≠ instruction

---

## Out of scope for this audit (longer horizon)

- Paid acquisition — currently zero; the cro-2026 audit changes the day Meta or Google paid spend is considered (CAPI + Enhanced Conversions become mandatory)
- Backlinks / off-site SEO — flagged in `SESSION-HANDOFF.md` §5; cro-2026 confirms this is the biggest organic ceiling unblocker, but requires an engagement separate from on-page CRO
- Trust pilot reviews push — separate workflow, also flagged in `SESSION-HANDOFF.md`
- Google Business Profile optimisation — separate flow, listed in SEO-audit findings
- Cal.com booking-funnel deep audit (post-`book_click`, pre-`booking_completed`) — needs a session-replay observation pass once 30+ booking attempts are in GA4
- Multilingual / hreflang — none currently; if Astons targets non-English-speaking defendants this becomes M4-relevant

---

## Reasoning trace appendix

**Empirical anchors used (cro-2026 §Empirical anchors):**
- Client-side accuracy 60–80% (M1)
- Consent rejection 40–60% under compliant banners (M1)
- AEO-cited conversion 4.4× organic (M4)
- 32% of AI citations are listicles (M4)
- 7–25% CVR uplift from WCAG AA (M7)
- ADA litigation +37% YoY mid-2025 (M7)
- EAA enforced June 2025 (M7)
- Default-architecture +7–22% (M5)
- Loss-frame ~2× gain-frame potency (M5)
- A/B sample size: ~14–30k per variant for 95% frequentist; ~1k for 90% Bayesian on a 20% relative lift (M3)

**Assumptions surfaced (not verified):**
- Traffic <5k/month — inferred from runbook "data is sparse to start"; **verify in GA4**
- Consent rejection rate — **pull from CookieYes dashboard**, do not assume 50%
- Bot share — pull from a GA4 Exploration with low-engagement + headless-shaped filter, **do not assume**
- No CRM exists — confirmed from `lib/contact.ts` orphan-stub note in SESSION-HANDOFF
- No paid spend exists — inferred, **confirm with Ghulam**

**Skills called:**
- `cro-2026` (umbrella — this file)
- `modern-service-business-cro` lens (B2B service routing)
- `page-cro` (already applied in `findings.md`)
- `seo-geo` (§M4 AEO)
- `marketing-psychology` (§M5 levers)
- `legal-advisor` (BSB compliance throughout)
- `avoid-ai-writing` (no AI-shape prose in recommendations; cross-checked against `findings.md` §11)
- `wcag-audit-patterns` (§M7)

**Files read for this audit:**
- `.project/_START_HERE.md`, `.project/SESSION-HANDOFF.md`, `.project/plan.md`
- `.project/cro-deep-audit-2026-05-21/findings.md` (yesterday)
- `.project/conversion-tracking-2026-05-20/ANALYTICS-RUNBOOK.md`
- `app/layout.tsx`, `app/robots.ts`
- `lib/render-practice-area.ts`, `lib/render-guide.ts`
- `content/sections/home.html`, `content/chrome/footer.html` (samples)
- `public/` (no `llms.txt`, no `robots.txt` — confirms reliance on `app/robots.ts`)

**Files not read (would tighten the audit further):**
- `scripts/contrast_audit.py` (memory says it exists; would inform §M7)
- Every PA detail HTML (sampled only)
- `lib/practice-areas.ts` (sampled via render-practice-area only)
- The cal.com booking flow post-`book_click` (no session data observed)

**Where a real-browser pass would add the most:**
- Tab-order on home, PA, fees, contact (M7)
- Sticky pill discoverability under VoiceOver / NVDA (M7)
- CookieYes modal in screen-reader (M7)
- The fees page mobile-fold (M4 answer-first)
- Console errors on first interaction with cal.com facade (M3 diagnostic)
