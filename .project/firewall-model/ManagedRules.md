# class ManagedRules (dashboard / API only — NOT in the `vercel firewall` CLI)

Vercel-maintained rulesets. Each is `{ active, action }`. Toggle via dashboard →
Firewall → Bot Management, or REST `updateFirewallConfig`.

```
class ManagedRules {
    bot_protection: { active, action }   // RECOMMENDED on (challenge). Verified-bot aware.
    ai_bots:        { active, action }   // ⛔ FORBIDDEN — see invariant below
    owasp:          { active, action }   // optional — SQLi / XSS CRS
    bot_filter:     { active, action }   // broader heuristic net — off for now
    vercel_ruleset: { active, action }
}
```

## bot_protection — the country/ASN-agnostic backstop
Blocks malicious / unverified automation, so it catches `browser_impersonation` everywhere,
not just on listed ASNs. Verified search + AI crawlers are **exempt** via Vercel's
IP-verified bot registry — spoof-proof: faking `User-Agent: GPTBot` from a datacenter IP
is not verified, so it is still blocked.

## ⛔ ai_bots — NEVER ENABLE
It blocks `GPTBot` / `OAI-SearchBot` / `ChatGPT-User`, `ClaudeBot` / `Claude-*`,
`PerplexityBot`, `Google-Extended` — the crawlers `app/robots.ts` deliberately welcomes
so the chambers surfaces as a source in AI chat (a lead channel). See
[Invariants.md](Invariants.md) and memory `project_seo_intent_mismatch_2026_05_23`.
