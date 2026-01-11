import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL) => `\
user-agent: *
allow: /

sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap.xml', site);
  return new Response(getRobotsTxt(sitemapURL));
};