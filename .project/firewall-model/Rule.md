# abstract class Rule

A custom firewall rule. `conditionGroup` is an **OR of AND-groups**: the rule fires when any
group matches, then applies `action`.

```
abstract class Rule {
    name: string             // unique
    description: string      // <= 256 chars (HARD CLI limit)
    active: bool             // enabled / disabled
    conditionGroup: Group[]  // OR across groups
    action: Action
    status: { staged | live }
}

class Group { conditions: Condition[] }   // AND within a group

enum Action {
    deny       // 403
    challenge  // managed verification page; humans pass, headless bots fail
    log        // observe only — safe dry-run before enforcing
    bypass     // skip system mitigations (allowlist)
    rate_limit // window + limit + keys (ip / ja4 / header)
    redirect   // 307 / 301
}
```

## CLI construction
```
vercel firewall rules add "<name>" \
  --condition '<json>' [--or --condition '<json>' ...] \
  --action <action> --yes
```
- repeated `--condition` = AND inside one group; `--or` starts a new OR group.
- always stages a DRAFT — never live until `Firewall.publish()`.
- choose `challenge` where a rare human is possible; `deny` for pure-datacenter ASNs.
