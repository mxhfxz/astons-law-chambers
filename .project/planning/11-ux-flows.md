# UX Flow Diagrams — Astons Law Chambers

**Written:** 2026-05-13 (Session C, Step 4c)
**Skill used:** ux-designer
**Input files:** .project/research-01/synthesis.md, .project/research-01/findings-conversion-ux.md, .project/planning/03-site-architecture.md

---

## Context

Three primary user paths are confirmed by research. Each has a different cognitive state, intent, and friction profile. The site must handle all three without structural compromise to any.

Five cognitive impairments occur simultaneously in hyperarousal states (findings-conversion-ux §1): attention narrowing, working memory reduction, decision fatigue, time distortion, and error-rate increase. Flow 1 is the highest-stakes path. Flows 2 and 3 tolerate more friction.

---

## Flow 1 — Defendant in Acute Crisis

**User type:** Person or family member dealing with an immediate legal situation (arrest, police interview scheduled, charge received, magistrates' court tomorrow).

**Cognitive state:** High stress, impaired working memory, attention narrowing, time pressure.

**Entry:** Direct mobile search — "criminal defence barrister London", "arrested what do I do", "motoring offence solicitor", "immigration lawyer urgent help".

**Time of entry:** Disproportionately between 9pm–midnight (research-documented night peak for crisis searches).

### Path

```
[Google SERP]
  ↓
  Entry point: Homepage (/) or Practice Area Page directly
  (organic or paid search)
  ↓
  [Above-fold — Zone 1]
  Sees: specific practice statement, phone number, WhatsApp button, legal aid signal (🚩)
  Does NOT see: portrait, hero image, contact form, verbose nav
  ↓
  DECISION POINT A — Immediate conversion trigger
  If ready to call: taps phone CTA → tel:+447922247999
  If not ready: scrolls
  ↓
  [Zone 2 — Situation Acknowledgement]
  Reads 4–6 sentences describing their situation in plain language
  No jargon; confirms this is the right page
  Friction: none if copy mirrors search intent precisely
  ↓
  [Zone 3 — What to Do Right Now]
  Numbered list of immediate actions
  Highest-converting content block; re-confirms relevance
  ↓
  DECISION POINT B — StickyBar or Zone 3 inline CTA
  StickyBar is visible at all times — zero additional clicks
  Sticky bar becomes primary CTA from moment user scrolls past Zone 1
  If ready: taps sticky bar phone or WhatsApp
  If not ready: scrolls to Zone 4
  ↓
  [Zone 4 — How the Process Works]
  3–5 process bullets; removes calling objection "I don't know what happens next"
  ↓
  [Zone 5 — Trust Signals]
  Credentials, legal aid signal, experience
  Inline CTA reappears mid-page
  ↓
  DECISION POINT C — Conversion
  Phone → tel:+447922247999
  WhatsApp → wa.me/447922247999 (🚩 pre-fill pending)
  StickyBar available throughout
  ↓
  [End: Phone call or WhatsApp message initiated]
```

### Friction Points

| Point | Friction | Mitigation |
|-------|----------|-----------|
| Above-fold | Wrong page type or irrelevant headline | Zone 1 headline mirrors search phrase, not legal category |
| Zone 1–2 | Cannot locate relevant practice area | Practice hub card grid on homepage — one tap to any area |
| Zone 2 | Jargon, legal formality, complexity | Zone 2 copy is in plain language; no section numbers |
| Zones 3–5 | Loses confidence page is relevant | Inline CTAs between zones — user does not need to scroll to the end |
| Any point | Unsure whether affordable | Legal aid signal in Zone 1 and Zone 5; `/fees/` linked in Zone 6 |

### Sticky Bar Activation

The sticky bar is the primary CTA from the moment the user scrolls past Zone 1. It remains visible through all zones. At Zone 7 (Repeat CTA), sticky bar and page CTA reinforce each other. Zero additional taps required at any point in the scroll.

### Conversion Trigger

First phone or WhatsApp action. Time-to-trigger for Flow 1 users is typically 30–90 seconds from above-fold (research-documented: distressed users make rapid decisions or abandon). The path must work within that window.

---

## Flow 2 — Researching Pre-Crisis

**User type:** Someone expecting or anticipating a legal issue but not in immediate need. May be a first offender learning their position, a business owner reading about licensing risk, or someone with an upcoming tribunal.

**Cognitive state:** Calm or mildly anxious. Has time to read. Comparing options.

**Entry:** Broader search terms — "direct access barrister UK", "how does legal aid work criminal", "motoring law barrister cost", or a referral link from a known site.

### Path

```
[Google SERP or referral]
  ↓
  Entry point: Direct Access page (/direct-access/) or Fees page (/fees/)
  or Homepage if keyword is brand-adjacent
  ↓
  [Direct Access page — if entry is about the process]
  Reads: what a barrister is, how direct access works, no solicitor required
  BSB Public Access Guidance link available
  Friction: expects a wall of legal text; finds plain-language explanation instead
  ↓
  DECISION POINT A — Understands direct access model
  Wants to explore practice areas: clicks Practice Areas nav → hub page
  Wants to understand costs: clicks Fees & Legal Aid nav → /fees/
  ↓
  [Practice Areas Hub (/practice-areas/)]
  Card grid; one tap to relevant area
  No scrolling required on mobile (P0 areas visible first)
  ↓
  [Practice Area Page]
  Reads Zones 1–6 in full
  Has time — will reach Zone 6 (FAQs) and Zone 7 (Repeat CTA)
  ↓
  DECISION POINT B — Research to booking conversion
  If ready to engage:
    → Phone call (most likely for criminal/motoring)
    → WhatsApp message (lower commitment — pre-crisis user preference)
    → cal.com booking (🚩 URL pending) — preferred for scheduled consultation
  If not ready: bookmarks or returns later
  ↓
  [End: Phone, WhatsApp, or booking initiated]
```

### Friction Points

| Point | Friction | Mitigation |
|-------|----------|-----------|
| Entry | Does not know whether direct access applies to their situation | `/direct-access/` plain-language explanation; inline on practice area pages (Zone 2) |
| Fees page | Uncertainty about affordability | Legal aid signal; plain-language means test; indicative fee ranges (🚩 pending confirmation) |
| Any page | Unsure whether qualification as direct access client | Direct access page — "no solicitor needed" framing |
| Zone 7 | Not ready to call; wants lower-commitment first contact | WhatsApp as lower-commitment channel; cal.com booking as scheduled alternative |

### Sticky Bar Activation

Sticky bar visible throughout. For pre-crisis users, the WhatsApp button is the expected first action — it signals availability without the commitment of a phone call. The cal.com booking link (🚩 pending) is the lowest-commitment option and should appear in Zone 7 of practice area pages.

### Conversion Trigger

WhatsApp message or booking initiation. Pre-crisis users are more likely to initiate asynchronous contact first. Call volume from Flow 2 users is lower but they tend to convert to instructed clients at a higher rate once engaged.

---

## Flow 3 — Professional Referral

**User type:** Solicitor, professional colleague, or intermediary recommending the barrister to a client. Sometimes a journalist or academic. Occasionally another barrister checking practice areas.

**Cognitive state:** Calm, efficient. Looking for specific information quickly: credentials, practice scope, contact.

**Entry:** Direct navigation (knows the URL), branded search, or followed a referral link.

### Path

```
[Direct navigation or branded search]
  ↓
  Entry point: Homepage (/)
  ↓
  [Above-fold — homepage]
  Scans for: practice scope, credentials, contact
  Does NOT need: situation acknowledgement, legal aid signal, emotional copy
  Friction: same page must serve two audiences — resolved by concise Zone 1 that signals scope, not distress
  ↓
  DECISION POINT A — Validates scope
  Sees 10 practice areas; confirms coverage
  → Navigates to specific practice area page to verify
  ↓
  [Practice Area Page — Zone 5: Trust Signals]
  Credentials, experience, BSB registration signal
  More concise read than Flows 1–2 — scrolls to trust zone
  ↓
  DECISION POINT B — Initiates referral contact
  Phone: direct call to discuss referral
  WhatsApp: message to arrange client handoff
  cal.com: book a referral call (🚩 URL pending)
  ↓
  [End: Referral contact initiated]
```

### Friction Points

| Point | Friction | Mitigation |
|-------|----------|-----------|
| Homepage | Too much crisis-oriented copy; referrer needs scope overview | Practice hub card grid on homepage answers scope in one scan |
| Direct Access page | May be relevant if client needs explanation | `/direct-access/` available; referrer may share with client |
| Trust zone | Cannot verify BSB registration without leaving site | Footer BSB Register link on every page |
| Contact | Unsure whether to call or message | Both phone and WhatsApp visible; no friction in channel choice |

### Sticky Bar Activation

Sticky bar is present on mobile but is less relevant for this user type. Professional referrers on desktop (higher proportion than Flows 1–2) use the header phone CTA. No specific sticky bar adaptation required.

### Conversion Trigger

Phone or WhatsApp to arrange referral. This flow has no time urgency. Conversion follows trust verification at Zone 5.

---

## Summary: Path Comparison

| Dimension | Flow 1 (Crisis) | Flow 2 (Pre-crisis) | Flow 3 (Referral) |
|-----------|----------------|--------------------|--------------------|
| Entry point | Homepage or practice area page | Direct access or fees page | Homepage |
| Scroll depth | Zones 1–3 typically | Zones 1–7 | Zones 1, 5 |
| Primary CTA | Phone (urgent) | WhatsApp or booking | Phone or WhatsApp |
| Sticky bar role | Primary CTA from Zone 1 | Supplement to Zone 7 CTA | Supplementary |
| Time on site | 30–90 seconds | 3–8 minutes | 1–3 minutes |
| Key friction | Wrong page / affordability | Process clarity / cost | Scope validation |
| Pages visited | 1–2 | 2–4 | 2–3 |

---

## Navigation Design Implications

All three flows are served by the same IA without compromise:

- Homepage as routing hub satisfies Flows 1 and 3 immediately.
- `/direct-access/` and `/fees/` in primary nav satisfies Flow 2 without exposing Flow 1 to friction.
- Sticky bar serves Flow 1 throughout; WhatsApp serves Flow 2 at lower commitment.
- Zero clicks to conversion from any zone on any page.

No structural changes to the IA in `03-site-architecture.md` are required based on these flows.
