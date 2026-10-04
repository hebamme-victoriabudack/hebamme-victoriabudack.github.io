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

**Context:** on 2026-10-04 the site migrated off WordPress and off `hebamme-dresden.eu`/Cloudflare entirely — `hebamme-victoriabudack.de` (the original, better-ranking domain, live since ~2017) now runs this same Astro codebase directly on the existing Netcup/Plesk server (Apache+nginx, no CDN). Everything below reflects that new reality; items specific to the old Cloudflare/.eu setup have been removed as obsolete rather than carried forward.

| ToDo | Impact | Effort | Type |
|---|---|---|---|
| Rotate Brevo Key | — | Low | Manual (Brevo account access) |
| Fix navbar & Hero Banner: not properly centered | — | Unconfirmed | Manual (visual audit couldn't reproduce) |
| Fix navbar & Hero Banner: style overall not great | — | High (open-ended) | Manual (design judgment) |
| Fix scrolling when pressing back in the browser | — | Medium | Manual investigation, then code |
| Impressum: add Hebammengesetz reference + supervisory authority (Landesdirektion Sachsen) | Critical | Low | Code-only |
| Impressum: Berufshaftpflichtversicherung disclosure | Critical | Low | Manual (needs insurer name/address/coverage from Victoria) |
| Static assets (CSS/JS/images) lost their `Cache-Control`/`Expires` headers as a side effect of the Plesk fix for the security-headers issue — confirmed via live `curl`, repeat visitors now re-download everything every time | High | Low | Manual (Plesk: add cache headers at the nginx layer, since `.htaccess` no longer reaches these files) |
| Decide the fate of `hebamme-dresden.eu` — it's still a fully live, independently-indexed duplicate of this exact site (own canonical tags, own sitemap). Plan is to redirect it and let the domain lapse at its next renewal rather than renew again; not yet done | High | Low | Manual (Cloudflare dashboard: zone-level redirect to `.de`, then Search Console Change of Address) |
| Expand `schwangerenvorsorge.mdx` & `wochenbettbetreuung.mdx` (thinnest pages, core services) — add visit cadence, address the Hebammenmangel | High | Medium | Code (draft) + manual review before publish |
| Surface the capacity/availability message prominently on the homepage and Schwangerenvorsorge page (currently buried in `wochenbettbetreuung.mdx`) | High | Low | Code-only |
| Re-enable the contact form in `kontakt.astro` (already built and Brevo-wired, just commented out) | High | Low | Code-only |
| Add real client testimonials/reviews once available — the current carousel (`image-carousel.md`) is photos of Victoria, not reviews | High | Medium–High | Manual (collecting real testimonials) + code once provided |
| Homepage LCP is 3.4s (vs. 1.6s on a service subpage) — traced to the Swiper carousel's JS blocking first paint; it also attaches a deprecated `unload` listener that fails the back/forward-cache check | High | Medium | Code (defer further / lighter carousel implementation) |
| Add `geo` coordinates, `openingHoursSpecification`, and a `sameAs` array to the schema (GBP/social profile links, once they exist) | Medium | Low–Medium | Code (geo/hours) + Manual (sameAs needs real profile URLs) |
| Convert service-page H2 headings to question-phrased form (e.g. "Was kostet die Schwangerenvorsorge?") for better AI-answer citability; expand `kinesio-taping.mdx` (81 words, too thin to be a self-contained citable passage) | Medium | Medium | Code-only (content rewrite) |
| Set `charset=utf-8` at the HTTP header level (nginx), not just via the HTML meta tag — currently relies solely on the meta tag, which some non-browser crawlers may not honor | Medium | Low | Manual (Plesk: nginx-level charset directive) |
| Populate the unused `date` frontmatter field for freshness/lastmod signals (low actual SEO value — Google ties sitemap `lastmod` only to crawl scheduling, not rankings, and `dateModified`'s documented benefit is for Article-type content, not our Service/MedicalBusiness schema; keeping this listed as low-priority/optional rather than dropping it) | Medium | Low | Code-only (git-history proxy) or Manual (real dates) |
| `hebamme-dresden.eu` → `hebamme-victoriabudack.de` redirect is live (Cloudflare Redirect Rule, path+query preserved) and Change of Address has been submitted in Search Console — monitor over the coming weeks to confirm it's actually consolidating; let the `.eu` domain lapse at its next renewal rather than renewing again | Medium | Low | Manual (monitoring only, mostly done) |
| Manually verify the Google Business Profile is claimed and correctly categorized as "Hebamme"/"Midwife" | Medium | Low | Manual (GBP access) |
| No English-language content exists; old `/midwife-in-dresden/`, `/midwife-in-jena/`, `/hebamme-in-jena/*` paths now redirect to the homepage instead of 404ing, but there's still no actual English page for international/expat searchers | Low | Medium–High | Manual decision (add an English page?) + code |



## 📝 License

Copyright (c) 2026 - Present, Designed & Developed by [Victoria Budack](https://hebamme-victoriabudack.de/)