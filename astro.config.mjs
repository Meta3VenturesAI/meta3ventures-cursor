import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import critters from 'critters';

export default defineConfig({
  output: 'static',
  adapter: netlify(),
  site: 'https://meta3ventures.netlify.app',
  build: {
    format: 'directory',
    assets: '_assets',
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['@supabase/supabase-js']
          }
        }
      }
    },
    ssr: {
      noExternal: ['@elastic/apm-rum']
    },
    plugins: [
      {
        name: 'critters',
        async transformIndexHtml(html) {
          const criticalCSS = new critters({
            preload: 'media',
            pruneSource: true,
            reduceInlineStyles: true,
            mergeStylesheets: true,
            additionalStylesheets: ['/_assets/*.css']
          });
          return await criticalCSS.process(html);
        }
      }
    ]
  }
});