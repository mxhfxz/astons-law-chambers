# Security Notes

**Status:** active. Last updated 2026-05-14 (end of Phase 1 scaffold).

This file records why the project accepts specific `npm audit` findings without upgrading. Re-evaluate at every dependency change and at Phase 7 pre-launch.

---

## 2026-05-14 — `npm audit` post-Phase-1-install

Five vulnerabilities reported (1 moderate, 4 high). All transitive. The only `npm audit fix --force` path is `next@16.2.6`, which is a major-version breaking change explicitly rejected at scaffold time (Next.js 14.x is the locked stack per `package.json` and `_START_HERE.md`).

### 1. `glob` 10.2.0–10.4.5 — HIGH

- Advisory: [GHSA-5j98-mcp5-4vw2](https://github.com/advisories/GHSA-5j98-mcp5-4vw2)
- Vector: command injection via `glob` CLI `-c`/`--cmd` flag executing matches with `shell:true`.
- Reaches this project via: `eslint-config-next` → `@next/eslint-plugin-next` → `glob`.
- **Practical exposure: none.** The `glob` CLI is never invoked. ESLint and `next lint` use `glob` as a library, not via the CLI command interface. The vulnerable code path is unreachable from this project's commands.
- Action: accept. Recheck if dev tooling is added that shells out to `glob` CLI.

### 2. `next` 9.3.4-canary.0 – 16.3.0-canary.5 — HIGH (13 advisories)

Installed version: 14.2.35.

| Advisory | Vector | Reaches this project? |
|---|---|---|
| [GHSA-9g9p-9gw9-jx7f](https://github.com/advisories/GHSA-9g9p-9gw9-jx7f) | DoS via Image Optimizer `remotePatterns` | No. No remote images. `next/image` uses local assets only. |
| [GHSA-h25m-26qc-wcjf](https://github.com/advisories/GHSA-h25m-26qc-wcjf) | HTTP request deserialization DoS in insecure RSC | No. No Server Actions, no request-time RSC handling. Site is fully static SSG. |
| [GHSA-ggv3-7p47-pfv8](https://github.com/advisories/GHSA-ggv3-7p47-pfv8) | HTTP request smuggling in rewrites | No. No rewrites configured in `next.config.mjs` or `vercel.json`. |
| [GHSA-3x4c-7xq6-9pq8](https://github.com/advisories/GHSA-3x4c-7xq6-9pq8) | Unbounded `next/image` disk cache growth | No. Static SSG; no runtime `next/image` cache. |
| [GHSA-q4gf-8mx6-v5v3](https://github.com/advisories/GHSA-q4gf-8mx6-v5v3) | DoS via Server Components | No. Static SSG; Server Components never execute at request time. |
| [GHSA-8h8q-6873-q5fj](https://github.com/advisories/GHSA-8h8q-6873-q5fj) | DoS via Server Components (variant) | No. Same reason. |
| [GHSA-ffhc-5mcf-pf4q](https://github.com/advisories/GHSA-ffhc-5mcf-pf4q) | XSS in App Router with CSP nonces | No. No CSP nonces configured. |
| [GHSA-vfv6-92ff-j949](https://github.com/advisories/GHSA-vfv6-92ff-j949) | Cache poisoning via RSC cache-busting collisions | No. No runtime RSC cache. |
| [GHSA-gx5p-jg67-6x7h](https://github.com/advisories/GHSA-gx5p-jg67-6x7h) | XSS in `beforeInteractive` scripts | No. No third-party `Script` tags planned (per `CLAUDE.md` "What Never Goes"). |
| [GHSA-h64f-5h5j-jqjh](https://github.com/advisories/GHSA-h64f-5h5j-jqjh) | DoS in Image Optimization API | No. Static SSG; Image Optimization API not in critical path. |
| [GHSA-c4j6-fc7j-m34r](https://github.com/advisories/GHSA-c4j6-fc7j-m34r) | SSRF via WebSocket upgrades | No. No WebSocket usage. |
| [GHSA-wfc6-r584-vfw7](https://github.com/advisories/GHSA-wfc6-r584-vfw7) | Cache poisoning in RSC responses | No. No request-time RSC. |
| [GHSA-36qx-fr4f-26g5](https://github.com/advisories/GHSA-36qx-fr4f-26g5) | Middleware/Proxy bypass with i18n in Pages Router | No. App Router only. No middleware. No i18n. |
| [GHSA-3g8h-86w9-wvmq](https://github.com/advisories/GHSA-3g8h-86w9-wvmq) | Cache poisoning of Middleware/Proxy redirects | No. No middleware. Redirects are static 301s in `vercel.json`. |

- Action: accept. Reassessment trigger: if Server Actions, middleware, image remotePatterns, runtime RSC, or WebSocket use is ever added, every advisory above must be re-evaluated.

### 3. `postcss` <8.5.10 — MODERATE

- Advisory: [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93)
- Vector: XSS via unescaped `</style>` in PostCSS Stringify output.
- Reaches this project via: `next` → `postcss`.
- **Practical exposure: none.** PostCSS runs at build time on developer-authored CSS, not on user-submitted content. The vulnerable path requires user input flowing into PostCSS Stringify, which never happens on this static site.
- Action: accept.

### 4. `eslint` 8.57.1 — DEPRECATED (not a CVE, but flagged for awareness)

- ESLint 8 reached end-of-life (October 2024). No security patches will be issued.
- Migration target: ESLint 9, but `eslint-config-next@14.2.x` does not officially support ESLint 9. Upgrading ESLint forces upgrading `eslint-config-next`, which is tied to Next.js major version.
- Action: accept until Next 14 retirement. Migrate to ESLint 9 when Next 14 is retired (likely Phase 7 or later).

---

## 2026-05-22 — dependency change re-eval (Insights/Pages CMS feature)

Trigger: `package.json` gained build-time markdown dependencies for the `/insights` feature
(`gray-matter`, `unified`, `remark-parse`, `remark-gfm`, `remark-rehype`, `rehype-raw`,
`rehype-sanitize`, `rehype-stringify`, `unist-util-visit`, `image-size`).

- **`npm audit` after install reproduced the SAME five findings as 2026-05-14** — `glob`,
  `next` (13 advisories), `postcss`. **The new dependencies added zero new advisories.**
  The exact-same `next@16.2.6` breaking-change remains the only `audit fix --force` path;
  rejected for the same reason (Next 14.x locked, live site, breaking change out of scope).
- **Re-checked the `next` advisories against the new attack surface.** The feature introduces
  user-submitted content (client Markdown via Pages CMS) flowing into the render pipeline.
  This does NOT change any `next` advisory status: the content is sanitised by *our own*
  `rehype-sanitize` allowlist at build time, never reaching PostCSS Stringify (postcss
  advisory still N/A) or any runtime Next code path (site stays static SSG). No Server
  Actions, middleware, runtime RSC, WebSockets, or CSP nonces are added.
- **Deliberate choice to preserve posture:** images are rendered as raw `<img>` with build-time
  dimension injection (`image-size`, pure-JS, no native deps), NOT via `next/image`. This keeps
  the Next Image Optimization API out of the critical path — which is the stated reason several
  Next advisories above (GHSA-9g9p-9gw9-jx7f, GHSA-3x4c-7xq6-9pq8, GHSA-h64f-5h5j-jqjh) do not
  apply. `sharp` was intentionally NOT added (native dep + would not change this posture).
- Action: accept, unchanged. No new findings attributable to this feature.

## Reassessment triggers

Re-run `npm audit` and re-evaluate every entry in this file when any of the following changes:

- Any `dependencies` or `devDependencies` change in `package.json`.
- Any new file added that uses Server Actions, middleware, image remotePatterns, runtime RSC, WebSocket upgrades, or CSP nonces.
- Phase 7 pre-launch (always).
- Any major Next.js or ESLint version bump.
