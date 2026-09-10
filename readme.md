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

### ToDos

- Rotate Brevo Key
- Fix navbar & Hero Banner
    - not properly centered
    - style overall not great
- Fix scrolling when pressing back in the browser

#### SEO — Critical

- Expand `impressum.mdx`: add the Hebammengesetz reference, the competent
  supervisory authority (Landesdirektion Sachsen), and the
  Berufshaftpflichtversicherung disclosure — insurer name, address, and
  geographic coverage need to come from Victoria, can't be filled in blind

#### SEO — High

- Expand `schwangerenvorsorge.mdx` and `wochenbettbetreuung.mdx` — the
  thinnest pages on the site despite being the core, insurance-billed
  services; add subheadings, visit cadence, and address the Hebammenmangel
- Surface the capacity/availability message (currently buried in
  `wochenbettbetreuung.mdx`) prominently on the homepage and
  Schwangerenvorsorge page
- Re-enable the contact form in `kontakt.astro` (already built and
  Brevo-wired, just commented out)
- Check Cloudflare Security settings (Bot Fight Mode / Turnstile) — the
  challenge-platform script it injects adds ~560ms of main-thread blocking
  on the homepage load; confirm it's actually needed on a static page with
  no exposed bot-facing forms besides /api/contact
- Ask Hebammenhandwerk Dresden for a reciprocal link (Victoria links to
  them twice, they don't link back)
- Add real client testimonials/reviews once available — the current
  carousel (`image-carousel.md`) is photos of Victoria, not reviews, so
  the site still has no review/reputation signal

#### SEO — Medium

- Widen `areaServed` on the per-service `Service` schema (`[regular].astro`)
  from "Dresden" only to the full 13-district list already used sitewide
- Add H2/H3 subheadings to the remaining service pages (only
  `akupunktur.mdx` has them)
- Add `public/_headers` with basic security headers for Cloudflare Pages
- Populate the unused `date` frontmatter field for freshness/lastmod
  signals
- Fix the outdated "Privacy Shield" reference in `datenschutz.mdx`
- Verify in Search Console whether hebamme-victoriabudack.de (old
  WordPress site) is competing with hebamme-dresden.eu
- Increase mobile tap target sizes (hamburger icon, dark-mode toggle)
- Manually verify the Google Business Profile is claimed and correctly
  categorized as "Hebamme"/"Midwife"

#### SEO — Low

- Normalize phone number display formatting across Impressum, Kontakt,
  and JSON-LD
- Reuse the canonical-URL logic for `og:url` instead of a separate string
  concatenation in `Base.astro`
- Implement IndexNow



## 📝 License

Copyright (c) 2026 - Present, Designed & Developed by [Victoria Budack](https://hebamme-dresden.eu/)