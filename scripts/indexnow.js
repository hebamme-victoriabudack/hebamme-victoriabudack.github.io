#!/usr/bin/env node
// Submits every URL in the sitemap to IndexNow so participating search
// engines (Bing, Yandex, and a few smaller ones) can re-crawl changed pages
// faster than waiting for their own schedule. Google does not participate
// in IndexNow, so this has no effect there.
//
// Run manually after deploying a content change: `yarn indexnow`

const SITE = "https://hebamme-dresden.eu";
const KEY = "86b3745770ec492b819875ced2f0147e";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const SITEMAP_URL = `${SITE}/sitemap-0.xml`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

async function main() {
  const sitemapRes = await fetch(SITEMAP_URL);
  if (!sitemapRes.ok) {
    throw new Error(
      `Failed to fetch sitemap (${SITEMAP_URL}): ${sitemapRes.status}`,
    );
  }
  const sitemapXml = await sitemapRes.text();
  const urls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );

  if (urls.length === 0) {
    throw new Error("No <loc> URLs found in sitemap");
  }

  console.log(`Submitting ${urls.length} URL(s) to IndexNow:`);
  urls.forEach((url) => console.log(`  - ${url}`));

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE).host,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`IndexNow submission failed: ${res.status} ${text}`);
  }

  console.log(`Done (status ${res.status}).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
