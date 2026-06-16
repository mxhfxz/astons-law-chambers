# Firewall Object Model — index

The project's bot-mitigation config as an OOP class model, one class per file. The live
config is a single **instance** (`alc-staging` firewall); every change is a **staged draft**
promoted by `vercel firewall publish`. Edit by adding `Rule` instances and overriding
documented hooks. **Do not invent new rule shapes; do not relax the Invariants.**

Source of truth for values: the `vercel firewall` CLI (`overview` / `diff` / `rules list`)
plus the Vercel dashboard → Firewall (managed rulesets only). Traffic evidence comes from
`vercel metrics`. Full narrative: memory `project_vercel_firewall_singapore_2026_06_09`.

Project: alc-staging (prj_Fj4Y2t9b0CBflI0Bxo96vvBHZlC5, team_h56XkPoiUvCygqdsx1PhjjAM).
Last reviewed: 2026-06-15.

## Classes
- [Firewall.md](Firewall.md) — singleton container (custom rules + managed rules + lifecycle)
- [Rule.md](Rule.md) — abstract custom rule (conditionGroup + Action); OR/AND semantics
- [Condition.md](Condition.md) — condition `type` / `op` enums (use `geo_as_number`, not `ip_asn`)
- [ManagedRules.md](ManagedRules.md) — managed ruleset enum (`bot_protection` ON; `ai_bots` FORBIDDEN)
- [ASNRegistry.md](ASNRegistry.md) — denyList (scraper networks) vs protectedList (verified-crawler hosts)
- [Instances.md](Instances.md) — the concrete rules and their live / staged status
- [Invariants.md](Invariants.md) — rules that hold across the whole config + open items

## Lifecycle (state machine)
```
draft (staged) --publish--> live
draft          --discard--> (gone)
```
`publish()` is OUT-OF-BAND from git / Vercel deploy — a `git push` does NOT publish it.
