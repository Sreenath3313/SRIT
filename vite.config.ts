import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

function socialFeedsPlugin() {
  return {
    name: 'srit-social-feeds-api',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url?.startsWith('/api/social-feeds')) {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-cache');
          
          const jsonPath = path.resolve(__dirname, 'src/features/home/socialData.json');
          
          // Optionally trigger background refresh if ?refresh=true or if requested
          if (req.url.includes('refresh=true')) {
            try {
              // @ts-ignore
              const { syncSocialFeeds } = await import('./scripts/sync-social.mjs');
              const fresh = await syncSocialFeeds();
              if (fresh) {
                res.end(JSON.stringify(fresh));
                return;
              }
            } catch (err: any) {
              console.error('[social-api] Live refresh error:', err?.message);
            }
          }

          try {
            if (fs.existsSync(jsonPath)) {
              const content = fs.readFileSync(jsonPath, 'utf-8');
              res.end(content);
              return;
            }
          } catch (e: any) {
            console.error('[social-api] Read error:', e?.message);
          }
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Failed to load social feeds' }));
          return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), socialFeedsPlugin()],
  build: {
    target: 'es2018',
    cssTarget: 'chrome61',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2018',
    },
  },
})

