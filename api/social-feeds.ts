/**
 * Vercel Serverless Function: /api/social-feeds
 * 
 * Automatically returns the cached social media feeds.
 * If ?refresh=true or if cache is older than 15 minutes, it can attempt
 * to refresh via official APIs (Instagram / Facebook Graph API) or syndication feeds,
 * preserving previous data on any network or rate-limit issues.
 */
import fs from 'node:fs';
import path from 'node:path';

export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');

  const jsonPath = path.join(process.cwd(), 'src/features/home/socialData.json');
  let currentData: any = null;

  try {
    if (fs.existsSync(jsonPath)) {
      currentData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    }
  } catch (e: any) {
    console.error('[api/social-feeds] Error reading bundled json:', e?.message);
  }

  // Check if live refresh was requested or cache is older than 2 minutes
  const now = Date.now();
  const lastSynced = currentData?.syncedAt ? new Date(currentData.syncedAt).getTime() : 0;
  const isStale = (now - lastSynced) > 2 * 60 * 1000;
  const shouldRefresh = req.query?.refresh === 'true' || isStale;

  if (shouldRefresh) {
    try {
      // Dynamic import of sync module
      // @ts-ignore
      const { syncSocialFeeds } = await import('../scripts/sync-social.mjs');
      const fresh = await syncSocialFeeds();
      if (fresh) {
        return res.status(200).json(fresh);
      }
    } catch (err: any) {
      console.warn('[api/social-feeds] Refresh attempt failed, serving cached feeds:', err?.message);
    }
  }

  if (currentData) {
    return res.status(200).json(currentData);
  }

  return res.status(500).json({ error: 'Failed to load social feeds' });
}
