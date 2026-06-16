# Invariants (hold across the whole firewall)

1. ⛔ Never enable `ManagedRules.ai_bots` — it blocks the welcomed AI/search crawlers that
   are a lead channel. See [ManagedRules.md](ManagedRules.md).
2. Never ASN-deny `protectedList` (AWS / Azure / GCP / Oracle / Facebook) — they host
   verified AI/search crawlers. Deny only pure-scraper ASNs.
3. Never geo/ASN-block the audience: US, GB, and EU human ISPs stay open.
4. Prefer `challenge` over `deny` where a rare human is possible (geo rules); `deny` is
   fine for pure-datacenter ASNs with zero human audience.
5. `denyList` membership must trace to `vercel metrics` evidence, not assumption.
6. `vercel firewall publish` is OUT-OF-BAND from git / Vercel deploy — neither triggers the
   other.
7. Managed rulesets are dashboard / API only — not in the `vercel firewall` CLI.
8. Rule `description` <= 256 chars (CLI hard limit).

## Open items (2026-06-15)
- [ ] `publish()` BlockScraperFarmRule (user batching the push).
- [ ] Enable `ManagedRules.bot_protection = challenge` (dashboard).
- [ ] Decide: keep or drop ChallengeSingaporeRule once the ASN rule is live.
- [ ] Schedule a periodic ASN drift review (`vercel metrics`).
