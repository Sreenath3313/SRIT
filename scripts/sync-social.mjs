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
import { mkdir, readdir, rm, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
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
/* Instagram                                                          */
/* ------------------------------------------------------------------ */
async function syncInstagram(html) {
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
/* Facebook                                                           */
/* ------------------------------------------------------------------ */
async function syncFacebook(html, twitterTweets = []) {
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
    let html;
    try {
        html = await fetchText(SOURCE_URL);
    } catch (err) {
        log(`Could not reach ${SOURCE_URL} (${err.cause?.code || err.message}). Keeping existing social data.`);
        return null;
    }

    try {
        const [instagram, twitter] = await Promise.all([
            syncInstagram(html),
            syncTwitter(html),
        ]);
        const facebook = await syncFacebook(html, twitter.tweets);
        if (!instagram.posts.length && !twitter.tweets.length && !facebook.posts.length) {
            log('No posts found in source page. Keeping existing social data.');
            return null;
        }
        const data = { syncedAt: new Date().toISOString(), source: SOURCE_URL, instagram, twitter, facebook };
        await writeFile(OUT_JSON, JSON.stringify(data, null, 2) + '\n');
        await cleanUnused(data);
        log(`Saved ${path.relative(ROOT, OUT_JSON)}`);
        return data;
    } catch (err) {
        log(`Sync failed (${err.message}). Keeping existing social data.`);
        return null;
    }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
    syncSocialFeeds();
}

