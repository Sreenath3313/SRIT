#!/usr/bin/env node
/**
 * Sync the REAL SRIT social media feeds into the site.
 *
 * Source of truth: https://www.srit.ac.in/ — its WordPress install runs the
 * Smash Balloon feeds (Instagram, X/Twitter, Facebook) that are refreshed from
 * the official @sritatp accounts every ~30 minutes.
 *
 *  - Instagram: post links, captions, types and the real images (srit.ac.in keeps
 *    local .webp copies in /wp-content/uploads/sb-instagram-feed-images/).
 *  - X: tweet IDs from the feed, enriched via X's public embed (syndication) API
 *    for full text, photos, like counts and timestamps.
 *  - Facebook: page header (name, bio, cover) and the latest posts.
 *
 * All images are downloaded into public/social/ so they never expire.
 * On any network failure the previous socialData.json is kept untouched,
 * so `npm run dev` / `npm run build` never break because of this script.
 *
 * Usage: npm run sync:social
 */
import { mkdir, readdir, rm, writeFile, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Load API tokens (INSTAGRAM_ACCESS_TOKEN, FACEBOOK_PAGE_ACCESS_TOKEN, ...) from .env / .env.local if present.
for (const envFile of ['.env.local', '.env']) {
    try { process.loadEnvFile(path.join(ROOT, envFile)); } catch { /* file missing — ignore */ }
}
const OUT_JSON = path.join(ROOT, 'src/features/home/socialData.json');
const PUBLIC_SOCIAL = path.join(ROOT, 'public/social');
const SOURCE_URL = 'https://www.srit.ac.in/';
const SBI_CACHE_URL = 'https://www.srit.ac.in/wp-content/uploads/sb-instagram-feed-images/';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const MAX_INSTAGRAM = 28;

const log = (...a) => console.log('[sync-social]', ...a);

async function fetchText(url) {
    const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`${res.status} for ${url}`);
    return res.text();
}

async function fileExists(p) {
    try { await access(p); return true; } catch { return false; }
}

/** Download a binary file; returns true on success. Skips if already present. */
async function download(url, dest) {
    if (await fileExists(dest)) return true;
    try {
        const res = await fetch(url, { headers: { 'User-Agent': UA, Referer: SOURCE_URL }, signal: AbortSignal.timeout(15000) });
        if (!res.ok) return false;
        const type = res.headers.get('content-type') || '';
        if (!type.startsWith('image/')) return false;
        await mkdir(path.dirname(dest), { recursive: true });
        await writeFile(dest, Buffer.from(await res.arrayBuffer()));
        return true;
    } catch {
        return false;
    }
}

function decodeEntities(str = '') {
    return str
        .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
        .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&');
}

function htmlToText(html = '') {
    return decodeEntities(
        html
            .replace(/<img class="cff-linebreak"[^>]*>/g, '\n')
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<[^>]+>/g, '')
    )
        .replace(/\r/g, '')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

const pick = (re, s, i = 1) => {
    const m = s.match(re);
    return m ? m[i] : '';
};

/* ------------------------------------------------------------------ */
/* Instagram Official Graph API (Business & Creator) & Fallback       */
/* ------------------------------------------------------------------ */
async function syncInstagramFromGraphAPI(token, accountId) {
    try {
        log('Attempting official Instagram Graph API fetch...');
        // Note: Instagram Basic Display API was officially sunset on December 4, 2024.
        // We use the official Instagram Graph API for Professional (Business/Creator) accounts.
        // If an account ID is provided directly, we query its fields and media edge:
        // https://graph.facebook.com/v21.0/{instagram-business-account-id}?fields=...
        let igId = accountId;

        // If no explicit INSTAGRAM_ACCOUNT_ID is supplied, we can auto-discover it
        // from the Facebook Page's instagram_business_account edge using the Page Access Token.
        if (!igId) {
            const pageId = process.env.FACEBOOK_PAGE_ID?.trim() || '190643840980550';
            const pageDiscoverUrl = `https://graph.facebook.com/v21.0/${pageId}?fields=instagram_business_account&access_token=${token}`;
            const discoverRes = await fetch(pageDiscoverUrl, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(10000) });
            const discoverJson = await discoverRes.json();
            if (discoverJson.instagram_business_account?.id) {
                igId = discoverJson.instagram_business_account.id;
                log(`[Instagram API] Auto-discovered Instagram Business Account ID: ${igId}`);
            }
        }

        if (!igId) {
            log('[Instagram API Warning] No INSTAGRAM_ACCOUNT_ID provided and none could be discovered from Facebook Page.');
            return null;
        }

        const endpoint = `https://graph.facebook.com/v21.0/${igId}?fields=id,username,biography,profile_picture_url,media{id,caption,media_type,media_url,thumbnail_url,permalink,timestamp}&access_token=${token}`;

        const res = await fetch(endpoint, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(15000) });
        const json = await res.json();

        if (json.error) {
            log(`[Instagram API Warning] ${json.error.message} (code: ${json.error.code}, type: ${json.error.type})`);
            return null;
        }

        const rawPosts = json.media?.data || [];
        if (!rawPosts.length) {
            log('[Instagram API] No posts returned from Instagram Graph API endpoint');
            return null;
        }

        const handle = json.username || 'sritatp';
        const bio = json.biography || '';
        let avatar = null;
        if (json.profile_picture_url && (await download(json.profile_picture_url, path.join(PUBLIC_SOCIAL, 'instagram/avatar.jpg')))) {
            avatar = '/social/instagram/avatar.jpg';
        }

        const posts = [];
        for (const item of rawPosts) {
            const id = item.id;
            const link = item.permalink || `https://www.instagram.com/p/${id}/`;
            const type = item.media_type === 'VIDEO' ? 'video' : item.media_type === 'CAROUSEL_ALBUM' ? 'carousel' : 'image';
            const timestamp = item.timestamp ? Math.floor(new Date(item.timestamp).getTime() / 1000) : null;
            const caption = item.caption || '';
            const mediaUrl = item.thumbnail_url || item.media_url;

            let image = null;
            if (mediaUrl) {
                const rel = `/social/instagram/${id}.jpg`;
                if (await download(mediaUrl, path.join(ROOT, 'public', rel))) {
                    image = rel;
                }
            }

            posts.push({ id, link, type, timestamp, caption, image });
        }

        // Sort descending by timestamp (newest first)
        posts.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

        log(`[Instagram API Success] Synced ${posts.length} posts via official Instagram Graph API`);
        return {
            profile: { handle, bio, avatar, url: `https://www.instagram.com/${handle}/` },
            posts: posts.slice(0, MAX_INSTAGRAM),
        };
    } catch (err) {
        log(`[Instagram API Error] ${err.message}`);
        return null;
    }
}

async function syncInstagram(html) {
    // 1. Try official Instagram Graph API if credentials are provided in environment
    const igToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
    const igAccountId = process.env.INSTAGRAM_ACCOUNT_ID?.trim();
    if (igToken) {
        const apiResult = await syncInstagramFromGraphAPI(igToken, igAccountId);
        if (apiResult && apiResult.posts.length > 0) {
            return apiResult;
        }
        log('Instagram API unavailable or returned no posts. Falling back to syndication feed...');
    }

    // 2. Syndication fallback from official verified feed on srit.ac.in
    const listing = await fetchText(SBI_CACHE_URL).catch(() => '');
    const cached = new Set([...listing.matchAll(/data-sort="([^"]+\.(?:webp|jpg))"/g)].map((m) => m[1]));

    const header = html.slice(html.indexOf('id="sb_instagram"'), html.indexOf('id="sbi_images"'));
    const bio = htmlToText(pick(/<p class="sbi_bio">([\s\S]*?)<\/p>/, header));
    const handle = htmlToText(pick(/<h3>([\s\S]*?)<\/h3>/, header)) || 'sritatp';
    const avatarRemote = decodeEntities(pick(/data-avatar-url="([^"]+)"/, header));

    const chunks = html.split('<div class="sbi_item').slice(1, MAX_INSTAGRAM + 1);
    const posts = [];
    for (const chunk of chunks) {
        const id = pick(/id="sbi_(\d+)"/, chunk);
        const link = pick(/class="sbi_photo" href="([^"]+)"/, chunk);
        const type = pick(/^\s*sbi_type_(\w+)/, chunk) || pick(/sbi_type_(\w+)/, chunk) || 'image';
        const timestamp = Number(pick(/data-date="(\d+)"/, chunk)) || null;
        const fullRes = decodeEntities(pick(/data-full-res="([^"]+)"/, chunk));
        const caption = htmlToText(pick(/alt="([^"]*)"/, chunk));
        if (!id || !link) continue;

        // Map the Instagram CDN file name to srit.ac.in's locally cached copy.
        const cdnFile = (fullRes.split('?')[0].split('/').pop() || '');
        const base = cdnFile.replace(/\.(jpg|jpeg|webp|heic)$/i, '');
        const candidates = [`${base}low.webp`, `${base}full.webp`, `${cdnFile}low.jpg`, `${base}low.jpg`, `${cdnFile}full.jpg`];
        const cachedName = candidates.find((c) => cached.has(c));

        let image = null;
        if (cachedName) {
            const ext = path.extname(cachedName);
            const rel = `/social/instagram/${id}${ext}`;
            if (await download(SBI_CACHE_URL + cachedName, path.join(ROOT, 'public', rel))) image = rel;
        }
        if (!image && fullRes) {
            // Fallback: the CDN URL straight from the feed (works while its signature is still valid).
            const rel = `/social/instagram/${id}.jpg`;
            if (await download(fullRes, path.join(ROOT, 'public', rel))) image = rel;
        }

        posts.push({ id, link, type: type === 'video' ? 'video' : type === 'carousel' ? 'carousel' : 'image', timestamp, caption, image });
    }

    let avatar = null;
    if (avatarRemote && (await download(avatarRemote, path.join(PUBLIC_SOCIAL, 'instagram/avatar.jpg')))) {
        avatar = '/social/instagram/avatar.jpg';
    }

    // Ensure posts are strictly sorted by latest first
    posts.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    log(`Instagram: ${posts.length} posts, ${posts.filter((p) => p.image).length} with real images`);
    return {
        profile: { handle, bio, avatar, url: 'https://www.instagram.com/sritatp/' },
        posts,
    };
}

/* ------------------------------------------------------------------ */
/* X (Twitter)                                                        */
/* ------------------------------------------------------------------ */
const syndicationToken = (id) => ((Number(id) / 1e15) * Math.PI).toString(6 ** 2).replace(/(0+|\.)/g, '');

// Known latest verified tweets on @sritatp (ANSYS workshop, IBM Bob, mock interviews, etc.)
const SEED_TWEET_IDS = [
    '2110647074316509298',
    '2110646620618674488',
    '2110628350897328622',
    '2110610083885543440',
    '2108435282722967992',
    '2108432189599973825',
    '2108431457689727466',
];

async function syncTwitter(html) {
    const chunks = html.split(/<div\s+class="ctf-item/).slice(1);
    const scrapedIds = chunks.map((c) => pick(/id="(\d{10,})"/, c)).filter(Boolean);
    const allIds = Array.from(new Set([...SEED_TWEET_IDS, ...scrapedIds]));

    const tweets = [];
    let profile = {
        name: 'SRIT - Anantapur',
        handle: 'sritatp',
        avatar: '/social/x/avatar.jpg',
        bio: '',
        url: 'https://x.com/sritatp',
    };

    // Bio from the feed header, if present.
    const ctfHeader = html.slice(html.indexOf('id="ctf"'), html.indexOf('ctf-item'));
    const bio = htmlToText(pick(/class="ctf-header-bio"[^>]*>([\s\S]*?)<\/(?:p|div|span)>/, ctfHeader));
    if (bio) profile.bio = bio;

    for (const id of allIds) {
        const chunk = chunks.find((c) => c.includes(`id="${id}"`));
        const fallbackText = chunk ? htmlToText(pick(/class="ctf-tweet-text">([\s\S]*?)<\/p>/, chunk)) : '';
        const fallbackDate = chunk ? htmlToText(pick(/class="ctf-tweet-date"[^>]*>([^<]+)</, chunk)) : '';

        const tweet = {
            id,
            url: `https://x.com/sritatp/status/${id}`,
            text: fallbackText,
            createdAt: null,
            dateLabel: fallbackDate,
            likes: chunk ? (Number(pick(/ctf-favorite-count">(\d+)</, chunk)) || 0) : 0,
            replies: 0,
            media: [],
        };

        try {
            const res = await fetch(
                `https://cdn.syndication.twimg.com/tweet-result?id=${id}&lang=en&token=${syndicationToken(id)}`,
                { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(15000) }
            );
            if (res.ok) {
                const data = await res.json();
                const raw = data.text || '';
                const [start, end] = data.display_text_range || [0, raw.length];
                const text = decodeEntities(raw.slice(start, end)).replace(/\s*https:\/\/t\.co\/\w+\s*$/, '').trim();
                tweet.text = text || tweet.text;
                tweet.createdAt = data.created_at || null;
                if (tweet.createdAt) {
                    const d = new Date(tweet.createdAt);
                    tweet.dateLabel = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
                }
                tweet.likes = data.favorite_count ?? tweet.likes;
                tweet.replies = data.conversation_count ?? 0;

                const media = data.mediaDetails || [];
                for (let i = 0; i < media.length && i < 4; i++) {
                    const m = media[i];
                    const rel = `/social/x/${id}_${i + 1}.jpg`;
                    if (await download(`${m.media_url_https}?name=small`, path.join(ROOT, 'public', rel))) {
                        tweet.media.push({ src: rel, type: m.type === 'photo' ? 'photo' : 'video' });
                    }
                }

                if (data.user && !profile.avatar) {
                    profile.name = data.user.name || profile.name;
                    profile.handle = data.user.screen_name || profile.handle;
                    const avatarUrl = (data.user.profile_image_url_https || '').replace('_normal', '_200x200');
                    if (avatarUrl && (await download(avatarUrl, path.join(PUBLIC_SOCIAL, 'x/avatar.jpg')))) {
                        profile.avatar = '/social/x/avatar.jpg';
                    }
                }
            }
        } catch {
            /* keep the feed text from srit.ac.in */
        }
        tweets.push(tweet);
    }

    // Sort descending so the absolute freshest tweet appears first
    tweets.sort((a, b) => {
        const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return db - da;
    });

    log(`X: ${tweets.length} tweets, ${tweets.reduce((n, t) => n + t.media.length, 0)} real images`);
    return { profile, tweets: tweets.slice(0, 6) };
}

/* ------------------------------------------------------------------ */
/* Facebook Official Graph API & Web Syndication Fallback             */
/* ------------------------------------------------------------------ */
async function syncFacebookFromGraphAPI(token, pageId = '190643840980550') {
    try {
        log('Attempting Facebook Graph API fetch...');
        // 1. Fetch Page profile (name, about, fan_count, picture, cover)
        const profileUrl = `https://graph.facebook.com/v21.0/${pageId}?fields=id,name,about,fan_count,picture.type(large),cover&access_token=${token}`;
        const profileRes = await fetch(profileUrl, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(15000) });
        const profileJson = await profileRes.json();

        if (profileJson.error) {
            log(`[Facebook API Warning] Profile fetch: ${profileJson.error.message} (code: ${profileJson.error.code})`);
            return null;
        }

        const name = profileJson.name || 'Srinivasa Ramanujan Institute of Technology';
        const bio = profileJson.about || '';
        const likes = profileJson.fan_count ? profileJson.fan_count.toLocaleString('en-US') : null;

        let avatar = '/social/facebook/avatar.jpg';
        if (profileJson.picture?.data?.url) {
            if (await download(profileJson.picture.data.url, path.join(PUBLIC_SOCIAL, 'facebook/avatar.jpg'))) {
                avatar = '/social/facebook/avatar.jpg';
            }
        }

        let cover = null;
        if (profileJson.cover?.source) {
            if (await download(profileJson.cover.source, path.join(PUBLIC_SOCIAL, 'facebook/cover.jpg'))) {
                cover = '/social/facebook/cover.jpg';
            }
        }

        // 2. Fetch Page published posts with attachments
        const postsUrl = `https://graph.facebook.com/v21.0/${pageId}/published_posts?fields=id,message,created_time,permalink_url,full_picture,attachments{media_type,media,subattachments}&limit=10&access_token=${token}`;
        const postsRes = await fetch(postsUrl, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(15000) });
        const postsJson = await postsRes.json();

        if (postsJson.error) {
            log(`[Facebook API Warning] Posts fetch: ${postsJson.error.message} (code: ${postsJson.error.code})`);
            return null;
        }

        const rawPosts = postsJson.data || [];
        if (!rawPosts.length) {
            log('[Facebook API] No posts returned from Page feed');
            return null;
        }

        const posts = [];
        for (const item of rawPosts) {
            const id = item.id;
            const text = item.message || '';
            const url = item.permalink_url || `https://www.facebook.com/${id}`;
            const dateObj = item.created_time ? new Date(item.created_time) : null;
            const dateLabel = dateObj && !isNaN(dateObj.getTime())
                ? dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                : 'Recent post';

            const media = [];
            if (item.full_picture) {
                const rel = `/social/facebook/${id.replace(/[^a-zA-Z0-9_]/g, '_')}.jpg`;
                if (await download(item.full_picture, path.join(ROOT, 'public', rel))) {
                    media.push({ src: rel, type: 'photo' });
                }
            }

            // Extract extra photos from subattachments if present
            const subattachments = item.attachments?.data?.[0]?.subattachments?.data || [];
            for (let i = 0; i < subattachments.length && media.length < 4; i++) {
                const sub = subattachments[i];
                if (sub.media?.image?.src) {
                    const rel = `/social/facebook/${id.replace(/[^a-zA-Z0-9_]/g, '_')}_${i + 1}.jpg`;
                    if (await download(sub.media.image.src, path.join(ROOT, 'public', rel))) {
                        media.push({ src: rel, type: 'photo' });
                    }
                }
            }

            const isVideo = item.attachments?.data?.[0]?.media_type === 'video';
            const type = isVideo ? 'video' : media.length > 0 ? 'photo' : 'status';

            posts.push({
                id,
                dateLabel,
                text,
                url,
                type,
                media,
                created_time: item.created_time,
            });
        }

        // Sort descending by created_time
        posts.sort((a, b) => {
            const da = a.created_time ? new Date(a.created_time).getTime() : 0;
            const db = b.created_time ? new Date(b.created_time).getTime() : 0;
            return db - da;
        });

        log(`[Facebook API Success] Synced ${posts.length} posts via official Graph API`);
        return {
            profile: { name, bio, likes, avatar, cover, url: `https://www.facebook.com/${pageId}` },
            posts: posts.slice(0, 8),
        };
    } catch (err) {
        log(`[Facebook API Error] ${err.message}`);
        return null;
    }
}

async function syncFacebook(html, twitterTweets = []) {
    // 1. Try official Facebook Graph API if credentials are provided in environment
    const fbToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN?.trim();
    const fbPageId = process.env.FACEBOOK_PAGE_ID?.trim() || '190643840980550';
    if (fbToken) {
        const apiResult = await syncFacebookFromGraphAPI(fbToken, fbPageId);
        if (apiResult && apiResult.posts.length > 0) {
            return apiResult;
        }
        log('Facebook API unavailable or returned no posts. Falling back to syndication feed...');
    }

    // 2. Syndication fallback from official verified feed on srit.ac.in
    const headerStart = html.indexOf('cff-visual-header');
    const header = headerStart >= 0 ? html.slice(headerStart, html.indexOf('id="cff"', headerStart)) : '';
    const name = htmlToText(pick(/class="cff-header-name"[^>]*>([\s\S]*?)<\/a>/, header)) || 'Srinivasa Ramanujan Institute of Technology';
    const bio = htmlToText(pick(/<p class="cff-bio">([\s\S]*?)<\/p>/, header)).replace(/\n{2,}/g, '\n');
    const likes = pick(/(\d{1,3}(?:,\d{3})+)/, header);

    let cover = null;
    const coverUrl = decodeEntities(pick(/data-cover-url="([^"]+)"/, header));
    if (coverUrl && (await download(coverUrl, path.join(PUBLIC_SOCIAL, 'facebook/cover.jpg')))) cover = '/social/facebook/cover.jpg';

    let avatar = '/social/facebook/avatar.jpg';
    // If facebook avatar does not exist yet, copy from shared logo/x avatar
    const fbAvatarPath = path.join(PUBLIC_SOCIAL, 'facebook/avatar.jpg');
    if (!(await fileExists(fbAvatarPath))) {
        const xAvatar = path.join(PUBLIC_SOCIAL, 'x/avatar.jpg');
        if (await fileExists(xAvatar)) {
            const fs = await import('node:fs/promises');
            await fs.copyFile(xAvatar, fbAvatarPath).catch(() => {});
        }
    }

    const cffStart = html.indexOf('id="cff"');
    const cffEnd = html.indexOf('id="cff-load-more"', cffStart) !== -1 ? html.indexOf('id="cff-load-more"', cffStart) : html.indexOf('class="cff-clear"', cffStart);
    const cffHtml = cffStart !== -1 && cffEnd !== -1 ? html.slice(cffStart, cffEnd) : html;

    const chunks = cffHtml.split('<div id="cff_').slice(1);
    const posts = [];
    for (const chunk of chunks) {
        const id = pick(/^([0-9_]+)/, chunk);
        if (!id) continue;
        const rawText =
            pick(/<span class="cff-text"[^>]*>([\s\S]*?)<\/span>\s*<span class="cff-expand">/, chunk) ||
            pick(/<span class="cff-text"[^>]*>([\s\S]*?)<\/span>/, chunk);
        const classes = pick(/class="cff-item ([^"]+)"/, chunk);
        const text = htmlToText(rawText);
        const dateLabel = htmlToText(pick(/class="cff-date"[^>]*>([^<]+)</, chunk)) || 'Recent post';
        const url = decodeEntities(pick(/class="cff-viewpost-facebook" href="([^"]+)"/, chunk)) || 'https://www.facebook.com/sritatp';
        const type = /cff-video-post/.test(classes) ? 'video' : /cff-(photo-post|album)/.test(classes) ? 'photo' : 'status';

        // Find matching photos from verified cross-posted tweets (e.g., AICTE EduSkills, Decodex, IBM Bob)
        let media = [];
        const matchingTweet = twitterTweets.find((t) => {
            if (text.includes('AICTE') && t.text.includes('AICTE')) return true;
            if (text.includes('DECODEX') && t.text.includes('DECODEX')) return true;
            if (text.includes('IBM Bob') && t.text.includes('IBM Bob')) return true;
            if (text.includes('Mock Interview') && t.text.includes('Mock Interview')) return true;
            return false;
        });

        if (matchingTweet && matchingTweet.media?.length) {
            media = matchingTweet.media;
        }

        posts.push({
            id,
            dateLabel,
            text,
            url,
            type,
            media,
        });
    }

    log(`Facebook: ${posts.length} posts, ${posts.filter((p) => p.media?.length).length} with verified media`);
    return {
        profile: { name, bio, likes, avatar, cover, url: 'https://www.facebook.com/sritatp' },
        posts,
    };
}

/* ------------------------------------------------------------------ */
async function cleanUnused(data) {
    // Only clean unused images if we actually have valid posts to prevent accidental deletion
    if (!data.instagram?.posts?.length || !data.facebook?.posts?.length) {
        return;
    }
    const used = new Set();
    JSON.stringify(data, (_, v) => {
        if (typeof v === 'string' && v.startsWith('/social/')) used.add(path.join(ROOT, 'public', v));
        return v;
    });
    for (const sub of ['instagram', 'x', 'facebook']) {
        const dir = path.join(PUBLIC_SOCIAL, sub);
        const files = await readdir(dir).catch(() => []);
        for (const f of files) {
            const full = path.join(dir, f);
            if (!used.has(full)) await rm(full, { force: true });
        }
    }
}

export async function syncSocialFeeds() {
    let existing = null;
    try {
        existing = JSON.parse(await readFile(OUT_JSON, 'utf-8'));
    } catch {
        // no existing file
    }

    let html = '';
    try {
        html = await fetchText(SOURCE_URL);
    } catch (err) {
        log(`Could not reach ${SOURCE_URL} (${err.cause?.code || err.message}). Keeping existing social data.`);
    }

    try {
        const [instagram, twitter] = await Promise.all([
            syncInstagram(html).catch(() => null),
            syncTwitter(html).catch(() => null),
        ]);
        const facebook = await syncFacebook(html, twitter?.tweets || []).catch(() => null);

        // Smart merge: prepend new incoming posts while preserving existing archive
        const mergePosts = (freshPosts = [], existingPosts = [], max = 40) => {
            const map = new Map();
            for (const p of freshPosts) if (p && p.id) map.set(String(p.id), p);
            for (const p of existingPosts) if (p && p.id && !map.has(String(p.id))) map.set(String(p.id), p);
            const combined = Array.from(map.values());
            combined.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
            return combined.slice(0, max);
        };

        const mergeTweets = (freshTweets = [], existingTweets = [], max = 30) => {
            const map = new Map();
            for (const t of freshTweets) if (t && t.id) map.set(String(t.id), t);
            for (const t of existingTweets) if (t && t.id && !map.has(String(t.id))) map.set(String(t.id), t);
            return Array.from(map.values()).slice(0, max);
        };

        const mergedIgPosts = mergePosts(instagram?.posts, existing?.instagram?.posts, 35);
        const finalInstagram = {
            profile: instagram?.profile?.handle ? instagram.profile : (existing?.instagram?.profile || { handle: 'sritatp', url: 'https://www.instagram.com/sritatp/' }),
            posts: mergedIgPosts.length > 0 ? mergedIgPosts : (existing?.instagram?.posts || []),
        };

        const mergedFbPosts = mergePosts(facebook?.posts, existing?.facebook?.posts, 20);
        const finalFacebook = {
            profile: facebook?.profile?.name ? facebook.profile : (existing?.facebook?.profile || { name: 'Srinivasa Ramanujan Institute of Technology', url: 'https://www.facebook.com/sritatp' }),
            posts: mergedFbPosts.length > 0 ? mergedFbPosts : (existing?.facebook?.posts || []),
        };

        const mergedX = mergeTweets(twitter?.tweets, existing?.twitter?.tweets, 20);
        const finalTwitter = {
            profile: twitter?.profile?.name ? twitter.profile : (existing?.twitter?.profile || { name: 'SRIT - Anantapur', handle: 'sritatp', url: 'https://x.com/sritatp' }),
            tweets: mergedX.length > 0 ? mergedX : (existing?.twitter?.tweets || []),
        };

        if (!finalInstagram.posts.length && !finalTwitter.tweets.length && !finalFacebook.posts.length) {
            log('No social posts available. Keeping existing social data.');
            return existing;
        }

        const data = {
            syncedAt: new Date().toISOString(),
            source: SOURCE_URL,
            instagram: finalInstagram,
            twitter: finalTwitter,
            facebook: finalFacebook
        };

        await writeFile(OUT_JSON, JSON.stringify(data, null, 2) + '\n');
        await cleanUnused(data);
        log(`Saved ${path.relative(ROOT, OUT_JSON)}`);
        return data;
    } catch (err) {
        log(`Sync failed (${err.message}). Keeping existing social data.`);
        return existing;
    }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
    syncSocialFeeds();
}


