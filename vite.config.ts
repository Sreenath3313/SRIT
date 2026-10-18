import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

import type { ServerResponse } from 'node:http'
import type { ViteDevServer, Connect } from 'vite'

function socialFeedsPlugin() {
  return {
    name: 'srit-social-feeds-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req: Connect.IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
        if (req.url?.startsWith('/api/social-feeds')) {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-cache');
          
          const jsonPath = path.resolve(__dirname, 'src/features/home/socialData.json');
          
          let currentData: Record<string, unknown> | null = null;
          try {
            if (fs.existsSync(jsonPath)) {
              currentData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
            }
          } catch (e: unknown) {
            const err = e as Error;
            console.error('[social-api] Read error:', err?.message);
          }

          // Check if explicit refresh requested or if cached data is older than 15 minutes (900,000 ms)
          const now = Date.now();
          const syncedAtStr = currentData && typeof currentData.syncedAt === 'string' ? currentData.syncedAt : null;
          const lastSynced = syncedAtStr ? new Date(syncedAtStr).getTime() : 0;
          const isStale = (now - lastSynced) > 15 * 60 * 1000;
          const forceRefresh = req.url.includes('refresh=true');

          if (forceRefresh || isStale) {
            try {
              // @ts-expect-error dynamic script import
              const { syncSocialFeeds } = await import('./scripts/sync-social.mjs');
              const fresh = await syncSocialFeeds();
              if (fresh) {
                res.end(JSON.stringify(fresh));
                return;
              }
            } catch (err: unknown) {
              const error = err as Error;
              console.error('[social-api] Live refresh error:', error?.message);
            }
          }

          if (currentData) {
            res.end(JSON.stringify(currentData));
            return;
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

