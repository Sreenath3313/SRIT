import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import IframeWithLoader from '../../components/common/IframeWithLoader';
declare global {
    interface Window {
        twttr?: {
            widgets?: { load: (element?: HTMLElement) => Promise<unknown> | void };
        };
    }
}

const loadScript = (id: string, src: string) => new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(id) as HTMLScriptElement | null;
    if (existing) {
        if (existing.dataset.loaded === 'true' || (id === 'twitter-wjs' && window.twttr?.widgets)) return resolve();
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true });
        return;
    }
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    if (id === 'twitter-wjs') script.charset = 'utf-8';
    script.onload = () => {
        script.dataset.loaded = 'true';
        resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
});

const SocialMediaFeeds: React.FC = () => {
    const ref = useRef(null);
    const xFeedRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [xUnavailable, setXUnavailable] = useState(false);

    useEffect(() => {
        let cancelled = false;
        void loadScript('elfsight-platform', 'https://elfsightcdn.com/platform.js').catch(() => undefined);
        loadScript('twitter-wjs', 'https://platform.twitter.com/widgets.js')
            .then(() => {
                let attempts = 0;
                const initializeTimeline = () => {
                    if (cancelled) return;
                    const container = xFeedRef.current;
                    const widgets = window.twttr?.widgets;
                    if (container && widgets) {
                        void Promise.resolve(widgets.load(container)).then(() => {
                            window.setTimeout(() => {
                                if (!cancelled && !container.querySelector('iframe')) setXUnavailable(true);
                            }, 8000);
                        });
                        return;
                    }
                    if (attempts++ < 30) {
                        window.setTimeout(initializeTimeline, 100);
                    } else {
                        setXUnavailable(true);
                    }
                };
                initializeTimeline();
            })
            .catch(() => { if (!cancelled) setXUnavailable(true); });
        return () => { cancelled = true; };
    }, []);

    return (
        <section ref={ref} className="pt-8 lg:pt-14 pb-4 lg:pb-8 bg-neutral-50 relative overflow-hidden">
            <div className="section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <p className="label-caps text-primary tracking-[0.25em] mb-4">
                        Campus Life & Updates
                    </p>
                    <h2 className="font-serif text-3xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
                        Connect With SRIT
                    </h2>
                    <p className="mt-6 text-neutral-500 max-w-2xl mx-auto leading-relaxed text-[15px]">
                        Stay updated with the latest news, events, and everyday life at our vibrant campus through our official digital channels.
                    </p>
                </motion.div>

                {/* Feeds Container */}
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-[1300px] mx-auto justify-items-center">

                    {/* 1. Instagram Feed (Live Elfsight Widget) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 , ease: [0.22, 1, 0.36, 1] }}
                        className="relative flex h-[500px] w-full max-w-[420px] flex-col overflow-hidden border border-neutral-200 bg-white shadow-sm md:h-[600px]"
                    >
                        <div className="absolute inset-0 flex flex-col overflow-hidden bg-neutral-50 pt-4">
                            <div className="flex justify-center mb-2 shrink-0 z-10 w-full px-4">
                                <a href="https://instagram.com/sritatp" target="_blank" rel="noreferrer" className="text-[13px] md:text-[14px] font-bold text-neutral-900 border border-neutral-200 bg-white px-4 py-1.5 rounded-full hover:bg-neutral-50 transition-colors shadow-sm text-center truncate">
                                    View @sritatp on Instagram
                                </a>
                            </div>
                            <div className="min-h-0 flex-1 w-full bg-white relative overflow-y-auto custom-scrollbar mt-2 flex justify-center pt-2">
                                {/* Live Elfsight Widget */}
                                <div className="elfsight-app-6e1a9c1a-2f8e-405a-808a-92f57c6cdbde w-full max-w-full" data-elfsight-app-lazy></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. Facebook Feed */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 , ease: [0.22, 1, 0.36, 1] }}
                        className="relative flex h-[500px] w-full max-w-[420px] flex-col overflow-hidden border border-neutral-200 bg-white shadow-sm md:h-[600px]"
                    >
                        <div className="absolute inset-0 flex flex-col overflow-hidden bg-neutral-50 pt-4">
                            <div className="flex justify-center mb-2 shrink-0 z-10 w-full px-4">
                                <a href="https://www.facebook.com/sritatp/" target="_blank" rel="noreferrer" className="text-[13px] md:text-[14px] font-bold text-neutral-900 border border-neutral-200 bg-white px-4 py-1.5 rounded-full hover:bg-neutral-50 transition-colors shadow-sm text-center truncate">
                                    View SRIT on Facebook
                                </a>
                            </div>
                            <div className="min-h-0 flex-1 w-full bg-white relative overflow-hidden mt-2 flex justify-center items-start pt-2">
                                <IframeWithLoader
                                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsritatp%2F&tabs=timeline&width=340&height=540&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                                    width="340"
                                    height="540"
                                    title="SRIT Facebook timeline"
                                    style={{ border: "none", overflow: "hidden", height: "540px", minHeight: "540px", width: "100%", maxWidth: "340px" }}
                                    scrolling="no"
                                    allowFullScreen={true}
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                    className="max-w-full"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* 3. X (Twitter) Feed */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.4 , ease: [0.22, 1, 0.36, 1] }}
                        className="relative flex h-[500px] w-full max-w-[420px] flex-col overflow-hidden border border-neutral-200 bg-white shadow-sm md:h-[600px]"
                    >
                        <div className="absolute inset-0 flex flex-col overflow-hidden bg-neutral-50 pt-4">
                            <div className="flex justify-center mb-2 shrink-0 z-10 w-full px-4">
                                <a href="https://x.com/sritatp" target="_blank" rel="noreferrer" className="text-[13px] md:text-[14px] font-bold text-neutral-900 border border-neutral-200 bg-white px-4 py-1.5 rounded-full hover:bg-neutral-50 transition-colors shadow-sm text-center truncate">
                                    View @sritatp on X
                                </a>
                            </div>
                            <div className="min-h-0 flex-1 w-full bg-white relative overflow-hidden mt-2">
                                <div id="twitter-feed-container" ref={xFeedRef} className="absolute top-0 left-0 w-full h-full overflow-y-auto custom-scrollbar bg-white p-2 flex justify-center">
                                    <a
                                        className="twitter-timeline"
                                        data-height="530"
                                        data-theme="light"
                                        data-chrome="noheader nofooter noborders"
                                        href="https://twitter.com/sritatp"
                                    >
                                        Tweets by @sritatp
                                    </a>
                                    {xUnavailable && <p className="absolute inset-x-4 bottom-4 bg-white/95 py-2 text-center text-xs text-neutral-500">The X feed could not load here. Use the button above to view the live profile.</p>}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default SocialMediaFeeds;
