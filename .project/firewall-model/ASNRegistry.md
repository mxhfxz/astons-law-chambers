# class ASNRegistry

Three disjoint sets. Membership is decided from evidence:
`vercel metrics vercel.request.count --group-by asn_id --group-by asn_name --since 7d`.

## denyList — scraper / hosting networks (→ BlockScraperFarmRule, action deny)
```
{
  132203, 45090   // Tencent Cloud
  45102           // Alibaba (US) Technology
  136907, 55990   // Huawei Cloud
  16276           // OVH
  24940           // Hetzner
  4837            // China Unicom
  9808            // China Mobile
  4134            // Chinanet
  45899           // VNPT (Vietnam)
  136787          // PacketHub
  22295           // Advin Services
  211590          // Bucklog
  36352           // HostPapa
  62874           // Web2Objects
}                 // 16 ASNs
```

## protectedList — NEVER ASN-deny (these host verified AI / search crawlers)
```
{
  16509, 14618    // Amazon AWS
  8075            // Microsoft / Azure (Bingbot, Azure-hosted crawlers)
  15169, 396982   // Google (Googlebot, Google-Extended)
  31898           // Oracle
  32934           // Facebook (link previews)
}
```

## humanList — residential ISPs = real audience (never block)
```
{ 2856 BT, 5089 Virgin Media, 201838 Community Fibre }   // UK
```

## Upkeep
ASN deny-lists drift. Re-run the metrics query periodically; add new pure-scraper ASNs to
`denyList`, never anything in `protectedList`/`humanList`. `ManagedRules.bot_protection`
covers the gaps between reviews.
