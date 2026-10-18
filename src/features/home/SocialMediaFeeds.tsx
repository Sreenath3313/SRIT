import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import socialData from './socialData.json';

/**
 * Real SRIT social feeds (X, Instagram, Facebook).
 *
 * Data + images come from `scripts/sync-social.mjs`, which pulls the live
 * @sritatp feeds published on https://www.srit.ac.in/ and X's public embed API.
 * It runs automatically before `npm run dev` and `npm run build`
 * (or manually with `npm run sync:social`).
 */

type InstaPost = (typeof socialData.instagram.posts)[number];

const LOGO = '/SRIT_LOGO.jpg';
const SRIT_ORANGE = '#E85D30';

/* ---------- helpers ---------- */

const formatShortDate = (iso?: string | null, fallback = '') => {
    if (!iso) return fallback;
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? fallback : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

const formatLongDate = (unix?: number | null) => {
    if (!unix) return 'Recent post';
    const postDate = new Date(unix * 1000);
    if (Number.isNaN(postDate.getTime())) return 'Recent post';
    return postDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

/** Renders **bold** markers used in SRIT's Facebook posts. */
const RichText: React.FC<{ text: string }> = ({ text }) => (
    <>
        {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
            part.startsWith('**') && part.endsWith('**') ? (
                <strong key={i} className="font-semibold text-neutral-900">{part.slice(2, -2)}</strong>
            ) : (
                <React.Fragment key={i}>{part}</React.Fragment>
            )
        )}
    </>
);

const ExpandableText: React.FC<{ text: string; limit?: number }> = ({ text, limit = 400 }) => {
    const [open, setOpen] = useState(false);
    const needsToggle = text.length > limit;
    const shown = open || !needsToggle ? text : `${text.slice(0, limit).trimEnd()}…`;
    return (
        <div className="text-[13px] leading-relaxed text-neutral-700 whitespace-pre-line break-words">
            <RichText text={shown} />
            {needsToggle && (
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="ml-1 font-semibold text-[#1877F2] hover:underline"
                >
                    {open ? 'See less' : 'See more'}
                </button>
            )}
        </div>
    );
};

/* ---------- icons ---------- */

const XIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);
const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none" />
    </svg>
);
const FacebookIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);
const HeartIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);
const ReplyIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);
const RetweetIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);

/* ---------- layout pieces ---------- */

const FeedCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    accent: string;
    href: string;
    delay: number;
    inView: boolean;
    isLoading?: boolean;
    children: React.ReactNode;
}> = ({ title, icon, accent, href, delay, inView, isLoading, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-[680px] flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all"
    >
        <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-5 py-3.5 z-10">
            <h3 className="flex items-center gap-2 text-[17px] font-bold tracking-tight text-neutral-900">
                <span style={{ color: accent }}>{icon}</span>
                {title}
            </h3>
            <div className="flex items-center gap-2">
                {isLoading && (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-neutral-400">
                        <svg className="h-3 w-3 animate-spin text-neutral-500" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        Updating…
                    </span>
                )}
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold hover:underline" style={{ color: accent }}>
                    @sritatp
                </a>
            </div>
        </div>

        {/* Loading Overlay with shimmer */}
        {isLoading && (
            <div className="absolute inset-x-0 top-[52px] bottom-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-[2px] transition-all">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-[#E85D30]" />
                    <span className="text-xs font-medium text-neutral-600">Checking for new posts…</span>
                </div>
            </div>
        )}

        <div className={`flex flex-1 flex-col overflow-hidden transition-opacity duration-300 ${isLoading ? 'opacity-40' : 'opacity-100'}`}>
            {children}
        </div>
    </motion.div>
);

const Avatar: React.FC<{ src?: string | null; alt: string; className?: string }> = ({ src, alt, className = '' }) => (
    <img
        src={src || LOGO}
        alt={alt}
        className={`shrink-0 border border-neutral-200 bg-white object-cover ${className}`}
        onError={(e) => {
            const img = e.currentTarget;
            if (!img.src.endsWith(LOGO)) img.src = LOGO;
        }}
    />
);

/* ---------- main ---------- */

const SocialMediaFeeds: React.FC = () => {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const [activePost, setActivePost] = useState<InstaPost | null>(null);

    // Dynamic state initialized with bundled data, updated live from API
    const [data, setData] = useState<typeof socialData>(socialData);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [liveStatus, setLiveStatus] = useState<'idle' | 'syncing' | 'live'>('live');

    const fetchLiveFeeds = async (forceRefresh = false) => {
        try {
            if (forceRefresh) setIsRefreshing(true);
            setLiveStatus('syncing');
            const res = await fetch(`/api/social-feeds${forceRefresh ? '?refresh=true' : ''}`, {
                headers: { 'Cache-Control': 'no-cache' },
            });
            if (res.ok) {
                const fresh = await res.json();
                if (fresh?.instagram && fresh?.twitter && fresh?.facebook) {
                    setData(fresh);
                    setLiveStatus('live');
                }
            }
        } catch {
            // Keep current feeds on network hiccups
            setLiveStatus('idle');
        } finally {
            setIsRefreshing(false);
        }
    };

    // Live background polling: checks for new posts every 5 minutes while user is on page
    React.useEffect(() => {
        // Fetch once on mount to get latest updates
        fetchLiveFeeds(false);

        const interval = setInterval(() => {
            fetchLiveFeeds(false);
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const { twitter, instagram, facebook } = data;
    // All three accounts use the same official SRIT logo as their profile picture.
    const sharedAvatar = twitter.profile.avatar || LOGO;

    return (
        <section ref={ref} id="social-media" className="relative overflow-hidden border-t border-neutral-100 bg-white pt-10 pb-14 lg:pt-16 lg:pb-20">
            <div className="section-container mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-10 text-center lg:mb-12"
                >
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <p className="label-caps tracking-[0.25em] text-primary">Live Feeds · Connect With SRIT</p>
                    </div>

                    <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl" style={{ color: SRIT_ORANGE }}>
                        Social Media
                    </h2>
                    <div className="mx-auto mt-3 h-1 w-16 rounded-full" style={{ backgroundColor: SRIT_ORANGE }} />
                </motion.div>

                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {/* ===================== X (Twitter) ===================== */}
                    <FeedCard title="X (Twitter)" icon={<XIcon className="w-5 h-5" />} accent="#0F1419" href={twitter.profile.url} delay={0.1} inView={inView} isLoading={isRefreshing}>
                        <div className="flex items-start gap-3 border-b border-neutral-100 p-4">
                            <Avatar src={twitter.profile.avatar} alt={twitter.profile.name} className="h-12 w-12 rounded-full" />
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="min-w-0">
                                        <a href={twitter.profile.url} target="_blank" rel="noopener noreferrer" className="block truncate text-[14px] font-bold text-neutral-900 hover:underline">
                                            {twitter.profile.name}
                                        </a>
                                        <span className="text-[12px] text-neutral-500">@{twitter.profile.handle}</span>
                                    </div>
                                    <a
                                        href={`https://x.com/intent/follow?screen_name=${twitter.profile.handle}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-bold text-white transition-colors hover:bg-neutral-700"
                                    >
                                        <XIcon className="w-3 h-3" /> Follow
                                    </a>
                                </div>
                                {twitter.profile.bio && (
                                    <p className="mt-1.5 text-[12px] leading-snug" style={{ color: SRIT_ORANGE }}>{twitter.profile.bio}</p>
                                )}
                            </div>
                        </div>

                        <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto bg-neutral-50/60 p-3">
                            {twitter.tweets.map((tweet) => (
                                <article key={tweet.id} className="rounded-lg border border-neutral-200 bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md">
                                    <div className="mb-2 flex items-center justify-between gap-2">
                                        <div className="flex min-w-0 items-center gap-2">
                                            <Avatar src={twitter.profile.avatar} alt="" className="h-8 w-8 rounded-full" />
                                            <div className="min-w-0 leading-tight">
                                                <span className="block truncate text-[13px] font-bold text-neutral-900">{twitter.profile.name}</span>
                                                <span className="text-[11px] text-neutral-500">
                                                    @{twitter.profile.handle} · {formatShortDate(tweet.createdAt, tweet.dateLabel)}
                                                </span>
                                            </div>
                                        </div>
                                        <a href={tweet.url} target="_blank" rel="noopener noreferrer" className="p-1 text-neutral-400 hover:text-neutral-900" aria-label="Open on X">
                                            <XIcon className="w-3.5 h-3.5" />
                                        </a>
                                    </div>

                                    <p className="whitespace-pre-line break-words text-[13px] leading-relaxed text-neutral-800">{tweet.text}</p>

                                    {tweet.media.length > 0 && (
                                        <a
                                            href={tweet.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`mt-3 grid gap-1 overflow-hidden rounded-lg border border-neutral-200 ${tweet.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}
                                        >
                                            {tweet.media.map((m, i) => (
                                                <img
                                                    key={m.src}
                                                    src={m.src}
                                                    alt={`Image ${i + 1} from SRIT post on X`}
                                                    loading="lazy"
                                                    className={`w-full object-cover ${tweet.media.length === 1 ? 'max-h-64' : 'h-32'} ${tweet.media.length === 3 && i === 0 ? 'col-span-2 h-40' : ''}`}
                                                />
                                            ))}
                                        </a>
                                    )}

                                    <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-2.5 text-xs text-neutral-500">
                                        <a href={`https://x.com/intent/tweet?in_reply_to=${tweet.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#1D9BF0]" aria-label="Reply">
                                            <ReplyIcon />{tweet.replies > 0 && <span>{tweet.replies}</span>}
                                        </a>
                                        <a href={`https://x.com/intent/retweet?tweet_id=${tweet.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-green-600" aria-label="Repost">
                                            <RetweetIcon />
                                        </a>
                                        <a href={`https://x.com/intent/like?tweet_id=${tweet.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-rose-500" aria-label="Like">
                                            <HeartIcon /><span>{tweet.likes}</span>
                                        </a>
                                        <a href={tweet.url} target="_blank" rel="noopener noreferrer" className="text-[11px] font-medium hover:underline">
                                            View on X
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </FeedCard>

                    {/* ===================== Instagram ===================== */}
                    <FeedCard title="Instagram" icon={<InstagramIcon className="w-5 h-5" />} accent="#E1306C" href={instagram.profile.url} delay={0.2} inView={inView} isLoading={isRefreshing}>
                        <a
                            href={instagram.profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] p-4 text-white"
                        >
                            <Avatar src={instagram.profile.avatar || sharedAvatar} alt={instagram.profile.handle} className="h-12 w-12 rounded-full border-2 border-white/90" />
                            <div className="min-w-0">
                                <h4 className="text-[16px] font-bold leading-tight">{instagram.profile.handle}</h4>
                                <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/90">{instagram.profile.bio}</p>
                            </div>
                        </a>

                        <div className="custom-scrollbar flex-1 overflow-y-auto bg-neutral-50 p-2.5">
                            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4">
                                {instagram.posts.map((post) =>
                                    post.image ? (
                                        <button
                                            key={post.id}
                                            type="button"
                                            onClick={() => setActivePost(post)}
                                            className="group relative aspect-square overflow-hidden rounded bg-neutral-200"
                                            title={post.caption.split('\n')[0]}
                                        >
                                            <img
                                                src={post.image}
                                                alt={post.caption.split('\n')[0] || 'SRIT Instagram post'}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            {post.type !== 'image' && (
                                                <span className="pointer-events-none absolute right-1 top-1 rounded bg-black/55 p-0.5 text-white">
                                                    {post.type === 'video' ? (
                                                        <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                    ) : (
                                                        <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
                                                    )}
                                                </span>
                                            )}
                                            <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/25" />
                                        </button>
                                    ) : (
                                        // No image synced: link straight to the real post instead of showing a stand-in photo.
                                        <a
                                            key={post.id}
                                            href={post.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex aspect-square items-center justify-center rounded bg-neutral-200 text-neutral-500 hover:text-[#E1306C]"
                                            title={post.caption.split('\n')[0]}
                                        >
                                            <InstagramIcon className="w-5 h-5" />
                                        </a>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="border-t border-neutral-200 bg-white p-3">
                            <a
                                href={instagram.profile.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#0095F6] py-2 text-xs font-bold text-white transition-colors hover:bg-[#1877F2]"
                            >
                                <InstagramIcon className="w-3.5 h-3.5" /> Follow on Instagram
                            </a>
                        </div>
                    </FeedCard>

                    {/* ===================== Facebook ===================== */}
                    <FeedCard title="Facebook" icon={<FacebookIcon className="w-5 h-5" />} accent="#1877F2" href={facebook.profile.url} delay={0.3} inView={inView} isLoading={isRefreshing}>
                        <div className="border-b border-neutral-100">
                            {facebook.profile.cover && (
                                <img src={facebook.profile.cover} alt="" className="h-24 w-full object-cover" />
                            )}
                            <div className="flex items-start gap-3 p-4">
                                <Avatar src={facebook.profile.avatar || sharedAvatar} alt={facebook.profile.name} className="h-12 w-12 rounded-md" />
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <a href={facebook.profile.url} target="_blank" rel="noopener noreferrer" className="text-[14px] font-bold leading-tight text-neutral-900 hover:text-[#1877F2]">
                                            {facebook.profile.name}
                                        </a>
                                        {facebook.profile.likes && (
                                            <span className="inline-flex shrink-0 items-center gap-1 rounded bg-[#1877F2]/10 px-2 py-0.5 text-[11px] font-bold text-[#1877F2]">
                                                <FacebookIcon className="w-3 h-3" /> {facebook.profile.likes}
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-1.5 whitespace-pre-line text-[12px] leading-snug text-neutral-600">{facebook.profile.bio}</p>
                                </div>
                            </div>
                        </div>

                        <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto bg-neutral-50/60 p-3">
                            {facebook.posts.map((post: any) => (
                                <article key={post.id} className="rounded-lg border border-neutral-200 bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md">
                                    <div className="mb-2 flex items-center gap-2">
                                        <Avatar src={facebook.profile.avatar || sharedAvatar} alt="" className="h-8 w-8 rounded" />
                                        <div className="min-w-0 leading-tight">
                                            <a href={facebook.profile.url} target="_blank" rel="noopener noreferrer" className="block truncate text-[13px] font-bold hover:underline" style={{ color: SRIT_ORANGE }}>
                                                {facebook.profile.name}
                                            </a>
                                            <span className="text-[11px] text-neutral-500">{post.dateLabel}</span>
                                        </div>
                                    </div>

                                    {post.text && <ExpandableText text={post.text} />}

                                    {post.media && post.media.length > 0 && (
                                        <a
                                            href={post.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`mt-3 grid gap-1 overflow-hidden rounded-lg border border-neutral-200 ${post.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}
                                        >
                                            {post.media.map((m: any, i: number) => (
                                                <img
                                                    key={m.src}
                                                    src={m.src}
                                                    alt={`Photo from SRIT Facebook post`}
                                                    loading="lazy"
                                                    className={`w-full object-cover ${post.media.length === 1 ? 'max-h-64' : 'h-32'} ${post.media.length === 3 && i === 0 ? 'col-span-2 h-40' : ''}`}
                                                />
                                            ))}
                                        </a>
                                    )}

                                    <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-2.5 text-xs text-neutral-500">
                                        <a href={post.url} target="_blank" rel="noopener noreferrer" className="font-medium text-[#1877F2] hover:underline">
                                            {post.type === 'video' ? '▶ Watch video' : post.type === 'photo' || post.media?.length ? 'View photos' : 'View post'}
                                        </a>
                                        <div className="flex items-center gap-2">
                                            <a href={post.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#1877F2]">View on Facebook</a>
                                            <span>·</span>
                                            <a
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(post.url)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-[#1877F2]"
                                            >
                                                Share
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </FeedCard>
                </div>
            </div>

            {/* Instagram post viewer */}
            {activePost && activePost.image && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onClick={() => setActivePost(null)} role="dialog" aria-modal="true">
                    <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl md:flex-row" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center bg-black md:w-1/2">
                            <img src={activePost.image} alt={activePost.caption.split('\n')[0]} className="max-h-[45vh] w-full object-contain md:max-h-[90vh]" />
                        </div>
                        <div className="flex min-h-0 flex-1 flex-col md:w-1/2">
                            <div className="flex items-center justify-between border-b border-neutral-100 p-3">
                                <div className="flex items-center gap-2">
                                    <Avatar src={instagram.profile.avatar || sharedAvatar} alt="" className="h-8 w-8 rounded-full" />
                                    <div className="leading-tight">
                                        <span className="block text-sm font-bold text-neutral-900">{instagram.profile.handle}</span>
                                        <span className="text-[11px] text-neutral-500">{formatLongDate(activePost.timestamp)}</span>
                                    </div>
                                </div>
                                <button type="button" onClick={() => setActivePost(null)} className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200" aria-label="Close">
                                    ✕
                                </button>
                            </div>
                            <div className="custom-scrollbar flex-1 overflow-y-auto whitespace-pre-line p-4 text-[13px] leading-relaxed text-neutral-700">
                                <RichText text={activePost.caption} />
                            </div>
                            <div className="border-t border-neutral-100 p-3">
                                <a
                                    href={activePost.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] py-2 text-xs font-bold text-white"
                                >
                                    <InstagramIcon className="w-3.5 h-3.5" /> {activePost.type === 'video' ? 'Watch on Instagram' : 'View on Instagram'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default SocialMediaFeeds;
