// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
//mport keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import markdoc from '@astrojs/markdoc';



// https://astro.build/config
export default defineConfig({
  // 上線前記得改

  redirects: {
    '/admin': '/keystatic',
  },

  integrations: [// Astro 會自動讀取 tailwind.config.mjs
    react(),
    tailwind({
      applyBaseStyles: false // 🟢 建議：設為 false，避免 Tailwind 強制注入 base styles 影響後台
    }),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    //keystatic(), 
    mdx(),
    markdoc()],


  site: 'https://drcmh-site-v2.pages.dev',
  output: 'static',
  adapter: cloudflare({
    // 這裡可以針對圖片做優化設定，讓 Cloudflare 幫你處理圖片
    imageService: 'compile',
  }),

});