# Insights pre-publish review checklist

Run before merging `content-staging` → `main` to publish an article. The build is
airtight against breakage (a bad article only fails to render itself, never the
site), but **compliance, accuracy, and voice are human judgements** — this gate is
where they happen. The substantive BSB conduct call is Ghulam's.

## Compliance (legal-advisor / BSB)

- [ ] Content is **general information**, not advice on a specific person's live case.
- [ ] No fabricated facts — no asserted case outcomes, no invented statute section
      numbers or sentencing figures unless verified current for 2026.
- [ ] No claim that misstates regulated status or services (barrister, Direct Access,
      litigation certificate are accurate; nothing implies solicitor status).
- [ ] No operational promise that isn't already verified site-wide (e.g. response
      times). "First call free" and "24/7 police station support" are the only
      standing operational claims.
- [ ] The standing disclaimer in the byline foot is present (it renders automatically).

## Voice (copywriting / avoid-ai-writing)

- [ ] Reads in the chambers' barrister voice — plain, factual, no marketing speak,
      no rhetorical questions, no triadic flourishes, no em-dash maximalism.
- [ ] Entity-first where natural; the named byline is fine, but body copy is not
      "I"-heavy self-promotion.

## Images (if any)

- [ ] **No photograph of a person / no portrait.** (Absolute rule.)
- [ ] Lead image is landscape and relevant; "Lead image description" (alt text) is
      filled in, or the image is genuinely decorative.
- [ ] Image file is a reasonable size (the build warns on very large files — if
      warned, compress and re-upload before merge).

## Technical (verified on the `content-staging` preview)

- [ ] Article renders correctly on the preview at `…/insights/<slug>` — mobile
      (375px) and desktop.
- [ ] Headings read as a sensible outline (the build normalises them; just confirm
      it reads well).
- [ ] Links work and point where intended.
- [ ] `npm run build` + `npm run type-check` pass (CI / local).
- [ ] Article + BreadcrumbList JSON-LD passes the Google Rich Results Test.
- [ ] The `draft` box is **unticked** (otherwise it will not appear on the live site).

## Publish

- [ ] Merge `content-staging` → `main`.
- [ ] Confirm the article is live at `astonslaw.com/insights/<slug>` and listed on
      `astonslaw.com/insights`.
