# Mobile-First Layout Specification — Astons Law Chambers

**Written:** 2026-05-13 (Session C, Step 4b)
**Skill used:** mobile-design
**Input files:** .project/research-01/synthesis.md, .project/planning/03-site-architecture.md

---

## Research Baseline

- 84% of law firm phone calls originate from mobile devices.
- Mobile converts at 21% vs desktop 15.9%.
- 81% of users abandon contact forms before submission.
- Sticky bottom bar generated 10% conversion lift in A/B testing (synthesis.md §3).

All layout decisions start from the 375px viewport. Desktop is a wider expression of the same structure, not a separate design.

---

## 1. Breakpoint Definitions

| Breakpoint | Width | Tailwind Prefix | Target Device |
|-----------|-------|-----------------|---------------|
| Mobile | 375px | (base, no prefix) | iPhone SE, standard Android handsets |
| Tablet | 768px | `md:` | iPad, large Android tablets |
| Desktop | 1280px | `lg:` | Standard laptop/desktop |
| Wide | 1440px | `xl:` | Large desktop monitors |

Container max-widths:

| Viewport | Container Max-Width | Horizontal Padding |
|----------|---------------------|--------------------|
| 375px | 100% (fluid) | 24px each side |
| 768px | 720px | 24px each side |
| 1280px | 1200px | 40px each side |
| 1440px | 1360px | 40px each side |

---

## 2. Sticky Bottom Bar

### Specification

| Property | Value | Notes |
|----------|-------|-------|
| Height | 56px minimum | WCAG 2.5.5 touch target compliance |
| Position | `position: fixed; bottom: 0; left: 0; right: 0` | Viewport-fixed — not document-relative |
| Z-index | 50 | Above all page content |
| Display | Mobile only (below `lg:`) | Hidden on desktop ≥1280px |
| Background | `--color-bg-footer` (navy-800) | Distinguishable from page content |
| Border-top | 1px `--color-border-strong` | Visual separator |

### Buttons

| Button | Label | Action | Background | Text |
|--------|-------|--------|-----------|------|
| Left (primary) | Call now | `tel:+447922247999` | `--color-cta-phone` (amber-500) | Navy-950 dark |
| Right (secondary) | WhatsApp | `https://wa.me/447922247999` (🚩 add `?text=` once confirmed) | `--color-cta-whatsapp` (#25D366) | White |

Both buttons take 50% of bar width. No icons required — labels are sufficient at this size. Icons may be added in Penpot design phase if space permits.

### Scroll Behaviour

- Show on scroll up (user is seeking information or about to act).
- Hide on scroll down (prevent content obstruction during reading).
- Always visible at page bottom (user has finished reading — highest-intent moment).
- Implementation: IntersectionObserver on a sentinel element or scroll direction detection via GSAP ScrollTrigger.

**CLS note:** The sticky bar uses `position: fixed` — it does not participate in document flow and does not cause layout shift. However, page content must have `padding-bottom: 56px` applied on mobile to prevent the bar from obscuring the last element. Apply this via a global `.sticky-bar-spacer` class injected by the StickyBar component.

### Desktop Behaviour

StickyBar component renders `null` on viewports ≥1280px. The phone CTA in the header nav handles desktop conversion.

---

## 3. Above the Fold — Mobile (375px, no scroll)

Available viewport height (375×812, iPhone 14 equivalent): approximately 812px minus browser chrome (~100px) = ~712px usable.

### Required Elements (in priority order)

| Position | Element | Notes |
|----------|---------|-------|
| 1 | Navigation header (64px) | Logo left, phone CTA right, hamburger icon |
| 2 | Practice-specific statement (h1) | Mirrors search phrase, not legal category name |
| 3 | Supporting line (1 sentence) | What the practice handles — factual, plain |
| 4 | Phone CTA (tap-to-call) | Visually dominant; `--text-xl` minimum |
| 5 | WhatsApp CTA button | `#25D366`; full-width or side-by-side with phone |
| 6 | Legal aid signal | Single line — 🚩 exact wording pending client confirmation |

**Estimated height of above-fold zone:** 64px (nav) + 260px (h1 + supporting line) + 120px (phone + WhatsApp CTAs) + 40px (legal aid signal) + spacing = approximately 560–640px. Fits within 712px usable on a standard handset.

### Must NOT Appear Above Fold

- Practitioner portrait or any photograph
- Hero/banner image
- Awards, accreditations, or star-rating widgets
- Social media links
- Contact form or email input
- Verbose navigation (hamburger contains all nav items)
- Regulatory disclaimer text
- Blog or news teasers

---

## 4. Thumb Zone Considerations

Based on a 375px wide viewport and a right-handed grip (dominant pattern):

| Zone | Screen Position | Reach Comfort |
|------|----------------|---------------|
| Natural thumb zone | Lower 40% of screen | Easy reach, single-handed |
| Stretch zone | Upper 50%, centre and right | Requires thumb extension |
| Hard zone | Upper 10%, corners | Requires grip shift or second hand |

### CTA Placement Rules

- Primary phone number (tap-to-call): position in the lower 55% of the above-fold zone.
- WhatsApp CTA button: adjacent to or below phone CTA — both in thumb zone.
- StickyBar phone + WhatsApp: naturally in thumb zone by virtue of fixed bottom position.
- Header nav hamburger: upper right — accepted convention; tolerable in stretch zone because it is a deliberate navigation intent, not a reactive conversion tap.

---

## 5. Page Zone Layout Decisions — Mobile

Applied across all practice area pages. Zones 1–7 as defined in synthesis.md §3.

### Zone 1: Above-Fold Statement (Hero Zone)

- Full viewport width.
- Background: `--color-bg-base` (white) or a very subtle navy tint.
- No image. Text-first. Minimal visual noise.
- H1 + supporting line + phone + WhatsApp + legal aid signal.
- Padding: 32px top (below nav), 24px horizontal, 40px bottom.

### Zone 2: Situation Acknowledgement

- Background: `--color-bg-base`.
- 4–6 short paragraphs. No headers in this zone — flows directly from Zone 1.
- Inline Direct Access / no-solicitor-needed signal.
- Font: `--text-lg` with 1.7 line height.
- Max-width: 70ch on prose container.

### Zone 3: What to Do Right Now

- Background: `--color-bg-subtle` (off-white) OR `--color-bg-dark` (navy emphasis — at most once per page, shared with Zone 5 if Zone 5 is dark).
- Numbered list. Steps are short actions, not paragraphs.
- This is the highest-converting content block — no clutter, no sidebar.

### Zone 4: How the Process Works

- Background: `--color-bg-base`.
- 3–5 bullets with short explanatory text.
- No icons required at MVP — clarity over decoration.

### Zone 5: Trust Signals

- Background: `--color-bg-dark` (navy-900) — this is one of the 1–2 permitted emphasis sections.
- 2–4 items only. No wall. Items: credentials, legal aid signal (🚩), experience.
- Text: `--color-text-inverse`.
- Inline CTA: "Call 07922 247 999" or WhatsApp — re-trigger at mid-page.

### Zone 6: FAQs

- Background: `--color-bg-base`.
- 3–5 questions as users phrase them, not as legal categories.
- Accordion or static — static at MVP (no JS dependency; accordion deferred to design phase).
- Inline fee signal for Motoring, Immigration, Licensing (🚩 ranges pending client confirmation).

### Zone 7: Repeat CTA

- Background: `--color-bg-base` or `--color-bg-subtle`.
- Phone + WhatsApp + cal.com (🚩 URL pending).
- Consistent with above-fold presentation — same button styles, same copy.

---

## 6. Navigation — Mobile

| Element | Mobile Behaviour |
|---------|----------------|
| Header | 64px height; `position: sticky; top: 0` |
| Logo | Left; links to `/` |
| Phone CTA | Right of logo; visible at all times; `tel:` link; `--color-cta-phone` |
| Hamburger | Rightmost; opens full-screen overlay nav |
| Nav overlay | Full screen, dark background (navy-900), close button top-right |
| Nav items in overlay | Practice Areas, Fees & Legal Aid, Direct Access + phone + WhatsApp |

Desktop header: hamburger hidden, inline nav items visible, phone CTA persists.

---

## 7. Homepage — Mobile Layout Sequence

```
[Header — 64px sticky]
[Hero Zone — above-fold statement + dual CTAs]
[Practice Zone — card grid, 1 column on mobile]
[Legal Aid Intro — 2–3 sentences; signals accessibility]
[Direct Access Explainer — 2–3 sentences + link]
[BSB Regulatory Statement — 1 line + link]
[Footer — 4-column stacked on mobile]
[StickyBar — 56px fixed bottom]
```

The homepage is a routing hub, not a content page. Each practice card navigates to a practice area page in one tap.

---

## 8. Breakpoint Deltas

Changes applied at each breakpoint beyond the mobile base:

### 768px (tablet)

- Container: 720px max-width, centred.
- Practice area card grid: 2 columns.
- Section vertical padding: increases to 72px.
- StickyBar: remains visible.

### 1280px (desktop)

- Container: 1200px max-width.
- StickyBar: hidden. Phone CTA in header handles conversion.
- Practice area card grid: 4 columns (or 5, subject to Penpot design).
- Zone 1 hero: can introduce a side-by-side layout (text left, CTA panel right) if the Penpot design supports it.
- Font sizes: h1 scales to `--text-5xl` minimum.

### 1440px (wide)

- Container: 1360px max-width.
- No structural changes from 1280px.

---

## 9. Open Items

- 🚩 Legal aid signal wording for Zone 1 — blocks above-fold copy; confirmed structure, not confirmed text.
- 🚩 Cal.com URL — blocks Zone 7 / Repeat CTA booking button.
- Penpot design file — final visual decisions on Zone 1 layout supersede this spec once design is confirmed.
