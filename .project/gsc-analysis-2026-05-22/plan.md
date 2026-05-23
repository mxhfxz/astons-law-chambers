# GSC Analysis → Gameplan — 2026-05-22

Source: 5 GSC exports (Queries, Pages, Countries, Devices, Search appearance),
last 3 months vs previous 3 months, for live `www.astonslaw.com`. Site was
restructured ~2 days ago, so windows mostly reflect the OLD solicitor-firm site.

Coordinated via project-mgmt (sequencing) + ceo-advisor (Tree-of-Thought,
verified/assumed tagging, red-team). Confidence tags: 🟢 verified · 🟡 medium · 🔴 assumed.

---

## Evidence base (what is actually true)

- 🟢 `next.config.mjs` redirects cover `/compliance/*`, top-level legacy slugs
  (`/criminal-defence`, `/motoring-law`, `/our-fees`…), and removed practice
  areas. They do **NOT** cover `/offences/*`, `/transparency/*`, or top-level
  `/violent-crimes`, `/drug-offences`, `/fraud-allegations`,
  `/restraint-confiscation-orders`.
- 🟢 GSC `Pages.csv`: those un-redirected URLs previously ranked and now read 0:
  `/offences/held-by-police` (pos **1.29**, 603 impr), `/offences/robbery-armed-robbery`
  (pos 5.46, 2,194 impr), `/offences/court-appearance` (pos 2.91, 1,266 impr),
  `/transparency/how-to-instruct-us` (pos 2.64, 240 impr),
  `/violent-crimes` (pos 1.82, 176 impr), `/fraud-allegations` (pos 1.8, 128 impr).
- 🟢 `app/legal-aid` exists with the correct BSB-safe model (not a contract
  holder → partner-firm referral → counsel under Graduated Fee Scheme) and is
  already AEO-optimised. The legal-aid query cluster is an asset, not a trap.
- 🟢 `proceeds-of-crime` is in `removed[]` → POCA/confiscation/tainted-gifts is
  a **deliberate scope cut**. No practice-area home for those queries.
- 🟢 Settled decision (keyword-reintegration 2026-05-19): titles stay
  barrister-led; "criminal defence lawyer" in body/meta only.
- 🟢 Prior audit: backlinks/brand mentions near-empty = the dominant ranking
  constraint, and it is off-site / client-owned.
- 🟢 Gate 0 (2026-05-22): all 15 un-redirected old URLs return a **hard 404** on
  the apex (`/offences/*`, `/transparency/*`, `/violent-crimes`, `/drug-offences`,
  `/fraud-allegations`, `/restraint-confiscation-orders`). Equity is leaking now.
- 🟢 Gate 0 (2026-05-22): the new Next.js build **is live on production** — `/`,
  `/police-station-representation`, `/legal-aid`, `/insights`,
  `/practice-areas/violent-crimes` all 200. `www` 308→ apex (canonical OK).
- 🔴 Client-owned facts: partner legal-aid firm, GBP existence/optimisation,
  Trustpilot review count, GSC/Bing property verification.

---

## DRAFT PLAN (pre-scrutiny)

- **WS-A — Redirect recovery.** Add 301s for every indexed old URL with no map
  entry. Recover the equity of `held-by-police` (≈#1), robbery, court-appearance.
- **WS-B — Legal-aid asset.** Strengthen internal linking to `/legal-aid`; it
  ranks 1–4 for "legal aid … near me / london" but gets near-zero clicks.
- **WS-C — Insights content.** Build out the informational clusters: ABH-vs-GBH,
  armed-robbery sentencing, "what happens at court", confiscation/POCA.
- **WS-D — Entity/brand capture.** Catch "ghulam humayun (barrister)" searches
  (pos 7–9, 0 clicks) on the About/entity page.
- **WS-E — Mobile-first.** Mobile = 9× desktop CTR, crisis intent. Reinforce.

---

## RED-TEAM (CEO war room — four dissenting voices)

### 1. SEO Realist (Head of Organic) — attacks WS-A and WS-C
Those pages ranked under the OLD **solicitor** entity for **solicitor / sentence-
info** intent the new barrister positioning deliberately abandons. Redirecting
crime-specific URLs (`robbery-armed-robbery`) into a broader `/practice-areas/
violent-crimes` page is a relevance downgrade; Google may treat it as a soft-404
and pass little equity. Recovering rankings for queries you can't or won't
convert is vanity. **Verdict:** redirect for hygiene (kill 404s), but do NOT
treat rank recovery as a KPI, and do NOT build sentence-length content to chase
the robbery cluster.

### 2. Compliance/Brand Hawk (BSB + practitioner safety) — attacks WS-C and WS-D
Sentencing-figure content ("how long do you get for armed robbery", "abh
sentence") collides with the legal-specificity rule (no sentence figures /
section numbers unless verified current for 2026). WS-D collides with the
minimise-name rule and the practitioner-safety baseline — actively SEO-targeting
the practitioner's personal name is the opposite of the locked posture.
**Verdict:** definitional/process content only (ABH vs GBH *defined*, "what
happens at a first hearing"); no sentence tariffs. Entity capture is passive
(accurate About page), never name-targeted.

### 3. Patient Contrarian (statistician) — attacks the whole premise of acting now
The data is a pre-restructure baseline. Aggregate position (11.6 → 18.9) is
polluted by US-spelling head terms ("criminal defense lawyer" 3,693 impr, "dui
lawyer" 1,327) that will never convert. Reacting to a 2-day-old restructure
before Google has recrawled is premature. **Verdict:** only act now on the one
thing that is time-critical and unambiguous (redirects — 404 decay is real and
compounding). Everything else waits for a clean 4–6 week post-restructure
baseline so we measure the NEW site, not ghosts.

### 4. CFO / Opportunity-cost — attacks resource allocation across the board
The prior audit already named the dominant constraint: **backlinks and brand
mentions are near-empty**, and that is off-site/client-owned. On-site redirect
archaeology and a fourth content system are low-leverage while the authority
profile is the real ceiling. **Verdict:** the highest-ROI move is a client-side
authority + GBP + GSC-hygiene push, not more dev cycles. Cap on-site work to the
cheap, verified-urgent items.

---

## RECONCILIATION (what survives)

| Draft | Survives? | Change forced by scrutiny |
|-------|-----------|---------------------------|
| WS-A redirects | ✅ kept, re-scoped | Done as **404 hygiene + equity**, not rank-recovery KPI. Gated on a live-status check first (Contrarian). |
| WS-B legal aid | ✅ kept | Lowest-cost, highest-fit: page exists, ranks 1–4, just needs internal links + a clean post-restructure read. |
| WS-C content | ⚠️ narrowed | Definitional/process only; **no sentence tariffs** (Hawk). POCA is out of scope (verified). Sequence behind a clean baseline (Contrarian). |
| WS-D entity | 🔁 reframed | Passive accuracy on About page only; never name-targeted (Hawk). Demoted to a side-effect of WS-B/C, not a workstream. |
| WS-E mobile | ✅ kept as lens | Not a workstream — a constraint applied to A–C (crisis UX, mobile CTA clarity). |
| (new) WS-F authority | ➕ added | CFO is right: client-owned backlinks/GBP/GSC hygiene is the real ceiling. Belongs in the plan as a client action list even though it is not code. |

---

## REFINED GAMEPLAN

### Gate 0 — Verify before building (this week, ~30 min, read-only)
1. Live-check the un-redirected old URLs (HEAD/GET): do `/offences/held-by-police`,
   `/offences/robbery-armed-robbery`, `/offences/court-appearance`,
   `/transparency/*`, `/violent-crimes`, `/drug-offences`, `/fraud-allegations`
   currently 404 or resolve? Confirms 🟡→🟢 and sizes WS-A.
2. Confirm what is actually live on production vs staging (resolves 🔴).
3. Confirm GSC property + sitemap submitted; note GBP + Trustpilot count (client).

### Phase 1 — Redirect recovery (only if Gate 0 shows 404s) — code, low risk
Add to `next.config.mjs`, intent-matched:
- `/offences/held-by-police`, `/offences/immediate-advice` → `/police-station-representation`
- `/offences/robbery-armed-robbery`, `/offences/assault`, `/offences/murder-manslaughter`,
  `/violent-crimes` → `/practice-areas/violent-crimes`
- `/drug-offences` → `/practice-areas/drug-offences`
- `/offences/court-appearance` → `/practice-areas/criminal-defence` (or a future "going to court" guide)
- `/transparency/how-to-instruct-us` → `/direct-access`
- `/transparency/your-rights-with-the-legal-ombudsman` → `/complaints`
- `/transparency/timescales-how-long-cases-take` → `/timescales`
- `/fraud-allegations`, `/restraint-confiscation-orders`, `/offences/confiscation-orders`,
  `/offences/tainted-gifts` → `/practice-areas` (POCA out of scope; hub is least-bad)
Verify: build + type-check + curl each redirect on the branch preview. KPI =
zero 404s on indexed URLs, NOT rank recovery.

### Phase 2 — Legal-aid internal linking — code, low risk
Add contextual links to `/legal-aid` from `/fees`, `/police-station-representation`,
`/direct-access`, and the criminal-defence PA page. The page already ranks 1–4
for the cluster; the gap is discovery + click-through, not ranking.

### Phase 3 — Insights content (after a clean ~4–6 week baseline) — content
Build definitional/process explainers via the existing insights CMS, ONE at a
time, each with Article schema + a self-contained answer block:
- "ABH vs GBH — the difference explained" → links to `/practice-areas/violent-crimes`
- "What happens at a first hearing" already shipped → measure it as the pilot
- A "what to do when someone is arrested / held by police" piece → reinforces
  the recovered `police-station-representation` intent
Excluded by rule: sentence-length tariffs; POCA/confiscation (out of scope).

### Phase 4 — Authority (client-owned, parallel, highest ceiling) — not code
Brief the client on: backlink/brand-mention push (Reddit/LinkedIn/legal
directories), GBP optimisation (NAP = 85 Great Portland Street, W1W 7LT),
GSC/Bing verification + sitemap, and the Trustpilot threshold for review schema.

### Success metric (set now, read after baseline)
Primary KPI stays calls + WhatsApp (not rankings). Proxy: indexed-URL 404 count
→ 0; `/legal-aid` and `/police-station-representation` impressions/clicks trend
on the NEW site over the next 4–6 weeks.

---

---

## AUDIT UPDATE — 2026-05-22 (live production, apex)

Re-audited the live site against the 2026-05-19 audit's gap list. **Most gaps are
closed.** The on-site foundation is now strong; this shifts leverage off-site.

### Prior gaps → current live status
| Prior finding | Status now |
|---|---|
| H2 `llms.txt` missing | 🟢 live (200, 3.2 KB) |
| H3 BreadcrumbList only on PA pages | 🟢 now on /about, /legal-aid, /police-station, /fees, /insights, /guides |
| H4 per-PA Service schema | 🟢 live on /practice-areas/violent-crimes |
| M1 Person `sameAs` missing | 🟢 live on every page — **NB: memory says branch-4 sameAs was "held/unshipped"; it is LIVE. Reconcile.** |
| M2 police-station FAQPage | 🟢 live (FAQPage present) |
| robots/sitemap/canonicals/CWV | 🟢 clean; sitemap = 26 canonical URLs, dead /offences correctly excluded |

### NEW live issues found this audit
- 🔴 **`/legal-aid` title duplicates the brand:** `Criminal Legal Aid | Astons Law
  Chambers — Astons Law Chambers` (62 chars). Template appends brand to a title
  that already carries it. Real bug; wastes SERP space on the page that ranks 1–4.
- 🟡 **`/legal-aid` meta description = 234 chars** → truncates (~160 visible).
- 🟡 Title-budget waste: `/about` (27 chars), `/fees` (36, "Barrister Fees —").
  `/fees` should carry "& Legal Aid" (it ranks for the legal-aid cluster).
- 🟢 **Phase 2 re-scoped:** `/legal-aid` is already in the main nav AND footer
  (2 inlinks/page sitewide); `/police-station-representation` is heavily linked
  (7 inlinks on homepage). The legal-aid cluster's low CTR is therefore a
  TITLE/META problem (the bug above), not an internal-linking gap. Phase 2
  becomes "fix the title/meta," not "add links."

### Net effect on the plan
- Phase 1 (redirects) — unchanged, still the one verified-urgent structural item.
- Phase 2 — **re-scoped** from internal-linking to the legal-aid title/meta bug
  fix + /fees + /about title-budget tweaks. Bundles with Phase 1 (both are tiny
  config/metadata edits → one clean branch).
- Phase 3 (content) — unchanged; definitional/process only (user-confirmed).
- Phase 4 (authority) — **elevated to start now, in parallel.** The audit proves
  on-site is near-done; off-site is the ceiling and agency owns it (user-confirmed).
  It is the long pole, so it should begin first, not "later."

---

---

## GIT GATE — RESULT (2026-05-22) — GREEN, nothing to reconcile

- 🟢 `main` = `origin/main` = `HEAD` = `aa039bd`, working tree clean (only
  untracked files: this `.project` folder, a `.bak`, `.mcp.json.disabled`).
  The divergence the memory warned about is already merged into `main`.
- 🟢 Branch 4 (Person `sameAs` `24752e3` + list-form adds `d242efa`) is **merged
  into main** — explains the live `sameAs`. Memory + index already corrected.
- 🟢 Insights CMS merged via PR #2 (`54b26bb`). `.pages.yml` tracked in main.
- 🟢 Redirect gap re-confirmed: `next.config.mjs` has no `/offences/*` rules
  (the 3 "offences" substring hits are driving-/drug-/motoring-offences).
- ⚠️ **Standing constraint** (`project_pages_cms_writes_origin_main`): the Pages
  CMS commits directly to `origin/main`, so it can advance with no local push.
  Protocol before ANY push to main: `git fetch origin` → check
  `git merge-base --is-ancestor origin/main HEAD` → rebase if it moved → push.
- 🟡 Note: `d242efa` carries `[PENDING GHULAM SIGN-OFF]` in its message; the
  corrected memory states sign-off was obtained — stale tag, not a blocker.

**Conclusion:** Branch 1 can be cut cleanly off `main` now. No reconciliation
work required; the gate was a verification, and it passed.

---

## BRANCH 1 — IMPLEMENTED + VERIFIED (2026-05-22), HELD AT PUSH GATE

Branch `fix/seo-404-redirects-meta-2026-05-22` off `main` (`aa039bd`). Two commits:
`ef6b91c` (redirects), `831eb52` (titles/meta). 4 files, +34/-4.

- Redirects: explicit intent-matched mappings + wildcard catch-alls for the dead
  `/offences/*` and `/transparency/*` silos + top-level crime URLs. (Expanded
  from "15 explicit" to explicit+wildcard so untracked old slugs are covered too.)
- Meta: `/legal-aid` title de-duplicated (`Criminal Legal Aid in London`), meta
  234→143; `/fees` → `Barrister Fees & Legal Aid`; `/about` → `About the Practice`.
- Verified: `tsc` clean; `next build` 26 routes OK; on a local prod server (port
  3137 after a 3100 port-collision was diagnosed) all redirects emit 308 to the
  correct targets, the `/offences/held-by-police` explicit rule correctly beats
  the wildcard, all 11 live routes still 200 (no regressions), edited titles +
  meta render correctly.
- ⚠️ Stray process: `next-server` PID 79124 holds port 3100 (old build, from a
  prior session) — orphan, harmless, worth killing when convenient. Not touched.
- Branch PUSHED to origin (preview deploy `dpl_F55SK5...`). Verified on the
  DEPLOYED preview via a Vercel bypass link: titles/meta correct, all redirects
  308 to correct targets on Vercel infra (wildcards + explicit-beats-wildcard
  confirmed), live routes 200. HTTP/HTML-level (no pixel render — not needed for
  redirects + head metadata).
- ✅ SHIPPED 2026-05-22. PR #3 merged to `main` (`874ea81`); production deploy
  `dpl_BTeAK5...` READY. Verified LIVE on astonslaw.com: all recovered URLs
  resolve 200 at correct targets (were 404), all 3 titles fixed, no regressions.
  Rollback candidate = prior prod `aa039bd` (`dpl_Loss...`).

## OPEN QUESTIONS FOR THE USER
1. Go-ahead to run the Gate-0 live URL checks against production now?
2. Is the new Next.js build fully live on `astonslaw.com`, or still staging?
3. Confirm: definitional/process insights content only, no sentence tariffs?
4. Who owns the Phase-4 client/authority actions — agency or client side?
