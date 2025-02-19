import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

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
    }
  }
});