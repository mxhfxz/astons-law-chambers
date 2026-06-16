# class Condition

```
class Condition {
    type: ConditionType
    op: Op
    value: string
    key?: string   // for header / cookie / query
    neg?: bool
}

enum ConditionType {   // full valid set (CLI-enforced)
    host, path, method, header, query, cookie, target_path, route, raw_path,
    ip_address, region, protocol, scheme, environment, user_agent,
    geo_continent, geo_country, geo_country_region, geo_city, geo_as_number,
    ja4_digest, ja3_digest, rate_limit_api_id, server_action,
    bot_name, bot_category, bot_status, bot_protection, trusted_source
}

enum Op { eq, neq, pre, sub, inc, re, gt, ge, lt, le }
```

## Gotchas
- ASN condition is `geo_as_number` — **NOT** `ip_asn` (CLI rejects `ip_asn` outright).
- `geo_country` value = ISO-2 (e.g. `"SG"`); `geo_as_number` value = AS number string (e.g. `"132203"`).
- `bot_category eq browser_impersonation` is a valid direct lever against the #1 bad bucket
  (2,932 reqs/7d) if maintaining an ASN list is undesirable.
