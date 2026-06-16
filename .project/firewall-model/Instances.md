# instances (the live config)

| Rule | conditionGroup → action | status | id |
|------|-------------------------|--------|----|
| ChallengeSingaporeRule | `geo_country eq SG` → challenge | **LIVE** | `rule_challenge_singapore_scrapers_DttlZC` |
| BlockScraperFarmRule | `geo_as_number ∈ denyList` (16, OR-grouped) → deny | **STAGED** (draft) | `rule_block_scraper_farm_networks_asn_3zKBcS` |
| ManagedRules.bot_protection | challenge | OFF (recommended ON) | — |
| ManagedRules.ai_bots | — | OFF (must stay OFF) | — |

## ChallengeSingaporeRule  — LIVE
`geo_country = SG → challenge`. UK criminal-defence practice ⇒ no legit Singapore human
audience. Now slightly redundant with BlockScraperFarmRule (most SG traffic is
Tencent/Alibaba), but harmless. Remove only if going ASN-only.

## BlockScraperFarmRule  — STAGED
OR of 16 `geo_as_number eq <id>` groups ([ASNRegistry.md](ASNRegistry.md) `denyList`) → deny.
Excludes `protectedList` to protect verified AI/search crawlers. Staged 2026-06-15; user is
batching the publish to avoid jolting Googlebot mid-content-push. Promote with
`Firewall.publish()`.
