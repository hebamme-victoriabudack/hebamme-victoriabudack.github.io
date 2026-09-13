### Install Dependencies

```bash
yarn install
```

### Development Command

```bash
yarn run dev
```

### Build Command

```bash
yarn run build
```

### Notify Search Engines of Changes (IndexNow)

After deploying a content change, optionally let Bing/Yandex know right away
instead of waiting for their next crawl (Google doesn't participate in
IndexNow, so this has no effect there):

```bash
yarn indexnow
```

### ToDos

| ToDo | Impact | Effort | Type |
|---|---|---|---|
| Rotate Brevo Key | — | Low | Manual (Brevo account access) |
| Fix navbar & Hero Banner: not properly centered | — | Unconfirmed | Manual (visual audit couldn't reproduce) |
| Fix navbar & Hero Banner: style overall not great | — | High (open-ended) | Manual (design judgment) |
| Fix scrolling when pressing back in the browser | — | Medium | Manual investigation, then code |
| Impressum: add Hebammengesetz reference + supervisory authority (Landesdirektion Sachsen) | Critical | Low | Code-only |
| Impressum: Berufshaftpflichtversicherung disclosure | Critical | Low | Manual (needs insurer name/address/coverage from Victoria) |
| Expand `schwangerenvorsorge.mdx` & `wochenbettbetreuung.mdx` (thinnest pages, core services) — add visit cadence, address the Hebammenmangel | High | Medium | Code (draft) + manual review before publish |
| Surface the capacity/availability message prominently on the homepage and Schwangerenvorsorge page (currently buried in `wochenbettbetreuung.mdx`) | High | Low | Code-only |
| Re-enable the contact form in `kontakt.astro` (already built and Brevo-wired, just commented out) | High | Low | Code-only |
| Check Cloudflare Security settings (Bot Fight Mode / Turnstile) — the challenge-platform script is confirmed live on every page; it no longer dominates homepage TBT (860ms → 129ms after the carousel fix) but may still be delaying LCP paint by ~2s on both pages (plausible, not fully isolated/confirmed) | High | Low | Manual (Cloudflare dashboard) |
| Ask Hebammenhandwerk Dresden for a reciprocal link (Victoria links to them twice, they don't link back) | High | Low | Manual (outreach to a third party) |
| Add real client testimonials/reviews once available — the current carousel (`image-carousel.md`) is photos of Victoria, not reviews | High | Medium–High | Manual (collecting real testimonials) + code once provided |
| Fix `www.hebamme-dresden.eu` not redirecting to the apex domain — `public/_redirects` is committed with Cloudflare's documented host-redirect syntax, confirmed served by the current Pages deployment (carries our own `_headers` values), but still returns 200 instead of 301 roughly an hour after deploy; needs the Cloudflare Pages dashboard (Redirect Rules / Bulk Redirects may be overriding it) | High | Low | Manual (Cloudflare dashboard investigation) |
| Re-enable GPTBot and ClaudeBot in Cloudflare's AI Bots / Content Signals settings — the repo's own `robots.txt` is clean, but Cloudflare injects a managed block at the edge disallowing both, undercutting the `llms.txt` work | High | Low | Manual (Cloudflare dashboard) |
| Populate the unused `date` frontmatter field for freshness/lastmod signals (low actual SEO value — Google ties sitemap `lastmod` only to crawl scheduling, not rankings, and `dateModified`'s documented benefit is for Article-type content, not our Service/MedicalBusiness schema; keeping this listed as low-priority/optional rather than dropping it) | Medium | Low | Code-only (git-history proxy) or Manual (real dates) |
| Fix the outdated "Privacy Shield" reference in `datenschutz.mdx` | Medium | Low | Code-only |
| Verify in Search Console whether hebamme-victoriabudack.de (old WordPress site) is competing with hebamme-dresden.eu | Medium | Low | Manual (Search Console access) |
| Manually verify the Google Business Profile is claimed and correctly categorized as "Hebamme"/"Midwife" | Medium | Low | Manual (GBP access) |
| Add `priceRange`/`offers` to the per-service `Service` schema — every page states a concrete euro price in prose but none of it is machine-readable, the clearest remaining gap for "Hebamme Dresden Kosten"-type AI/search queries | Medium | Low | Code-only |



## 📝 License

Copyright (c) 2026 - Present, Designed & Developed by [Victoria Budack](https://hebamme-dresden.eu/)