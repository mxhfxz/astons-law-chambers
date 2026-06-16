# class Firewall (singleton)

The `alc-staging` firewall config. One live instance; edits are staged drafts.

```
class Firewall {
    enabled: bool              // currently true
    customRules: Rule[]        // ordered — see Instances.md
    managedRules: ManagedRules // see ManagedRules.md
    ipBlocks: IPBlock[]        // 0
    systemBypass: IP[]         // 0
    attackMode: bool           // off — emergency "challenge everything" toggle
    systemMitigations: bool    // on — Vercel baseline DDoS (always)
    draft: Change[]            // unpublished staged changes
}
```

## Methods (CLI, run from repo root)
- `overview()` → `vercel firewall overview`     — live state + pending count
- `diff()`     → `vercel firewall diff`          — pending draft changes only
- `list()`     → `vercel firewall rules list`    — all custom rules (drafts marked `+`)
- `publish()`  → `vercel firewall publish`       — draft → live
- `discard()`  → `vercel firewall discard`       — drop all draft changes

## Invariant
`publish()` is independent of `git push` / Vercel deploy. Shipping code does not ship
firewall changes, and vice versa. See [Invariants.md](Invariants.md).
