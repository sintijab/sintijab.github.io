import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: 'https://syntia.org',
  server: {
    headers: {
      "Content-Security-Policy": " style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' *.googletagmanager.com *.prismic.io *.amazonaws.com *.google-analytics.com *.youtube.com; img-src 'self' data: *.prismic.io; default-src 'self' *.googletagmanager.com *.prismic.io *.amazonaws.com *.google-analytics.com *.youtube.com",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "geolocation=(self)",
      "X-Frame-Options": "DENY",
      "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
      "Access-Control-Allow-Origin": "https://syntia.org"
    }
  },
  integrations: [mdx(), sitemap(), svelte()]
});