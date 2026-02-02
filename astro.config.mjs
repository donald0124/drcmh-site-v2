// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import keystatic from '@keystatic/astro';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // 上線前記得改
  site: 'https://dr-chou.com',

  integrations: [
    react(), 
    tailwind(), // Astro 會自動讀取 tailwind.config.mjs
    sitemap(), 
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    keystatic()
  ],

  output: 'static',
  adapter: cloudflare(),
});