import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig, passthroughImageService } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "https://hebamme-dresden.eu",
  output: "static",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  vite: { plugins: [tailwindcss()] },

  image: {
    service: passthroughImageService(), // Disables sharp and uses no processing
  },

  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        page !== 'https://hebamme-dresden.eu/datenschutz' &&
        page !== 'https://hebamme-dresden.eu/impressum',
      i18n: {
        defaultLocale: 'de',
        locales: {
          de: 'de-DE', // The `defaultLocale` value must present in `locales` keys
        }
      }
    }),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
      ],
    }),
    mdx(),
  ],

  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: { theme: "one-dark-pro", wrap: true },
    extendDefaultPlugins: true,
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true
    },
  }),
});