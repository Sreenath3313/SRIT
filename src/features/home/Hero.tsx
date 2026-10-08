import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
    { src: '/optimized/CollegeMain.webp.webp', alt: 'The main academic building at Srinivasa Ramanujan Institute of Technology', eyebrow: 'An engineering institution with purpose', heading: <>Think boldly.<br />Build what matters.</>, note: 'A close-knit campus where strong foundations meet hands-on engineering and the ambition to make a difference.' },
    { src: '/optimized/Campus.webp.webp', alt: 'Campus grounds at Srinivasa Ramanujan Institute of Technology', eyebrow: 'A campus for curious minds', heading: <>Find your place.<br />Make your mark.</>, note: 'Learn alongside a community that values curiosity, initiative and shared progress.' },
    { src: '/optimized/ComputerLab.webp.webp', alt: 'Students learning in an SRIT computer laboratory', eyebrow: 'Learning beyond the lecture', heading: <>Turn ideas<br />into impact.</>, note: 'Explore engineering disciplines, practical learning and the tools to take your next step.' },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const reduceMotion = useReducedMotion();
    useEffect(() => {
        const timer = window.setTimeout(() => {
            slides.slice(1).forEach(({ src }) => {
                const image = new Image();
                image.decoding = 'async';
                image.fetchPriority = 'low';
                image.src = src;
            });
        }, 900);
        return () => window.clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (reduceMotion) return;
        const timer = window.setInterval(() => setCurrent((index) => (index + 1) % slides.length), 7000);
        return () => window.clearInterval(timer);
    }, [reduceMotion]);
    const slide = slides[current];

    return <section aria-label="Welcome to SRIT" className="bg-white pt-[136px] lg:pt-[144px]">
        <div className="section-container">
            <div className="grid min-h-[650px] grid-cols-1 items-stretch border-b border-neutral-200 lg:min-h-[690px] lg:grid-cols-[1.12fr_.88fr]">
                <div className="relative min-h-[340px] overflow-hidden bg-neutral-100 sm:min-h-[440px] lg:min-h-0">
                    <AnimatePresence mode="sync"><motion.img key={slide.src} src={slide.src} alt={slide.alt} initial={{ opacity: .3, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }} fetchPriority={current === 0 ? 'high' : 'auto'} loading="eager" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center" /></AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between sm:bottom-7 sm:left-7 sm:right-7">
                        <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/90 sm:text-xs">Srinivasa Ramanujan Institute of Technology</span>
                        <div className="flex shrink-0 items-center gap-2" aria-label="Choose campus image">
                            {slides.map((item, index) => <button key={item.src} type="button" aria-label={`Show campus image ${index + 1}`} aria-pressed={index === current} onClick={() => setCurrent(index)} className={`h-1.5 rounded-full transition-all ${index === current ? 'w-8 bg-white' : 'w-3 bg-white/55 hover:bg-white'}`} />)}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center px-5 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16">
                    <AnimatePresence mode="wait"><motion.div key={current} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }}>
                        <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-neutral-500 sm:text-xs"><span className="h-[2px] w-8 bg-primary" />{slide.eyebrow}</p>
                        <h1 className="max-w-[680px] font-serif text-[clamp(2.65rem,5.4vw,5.4rem)] font-semibold leading-[1.02] tracking-[-.045em] text-[#171b24]">{slide.heading}</h1>
                        <p className="mt-6 max-w-lg text-left text-base leading-[1.8] text-neutral-600 sm:mt-7 sm:text-lg">{slide.note}</p>
                    </motion.div></AnimatePresence>

                    <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
                        <Link to="/admissions/courses-offered" className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#171b24] px-6 text-sm font-semibold text-white transition-colors hover:bg-primary">Explore programs <ArrowUpRight className="h-4 w-4" /></Link>
                        <Link to="/about/overview" className="inline-flex min-h-12 items-center justify-center gap-3 border border-neutral-300 px-6 text-sm font-semibold text-[#171b24] transition-colors hover:border-[#171b24]">Discover SRIT <ArrowRight className="h-4 w-4" /></Link>
                    </div>

                    <div className="mt-10 grid max-w-lg grid-cols-3 border-t border-neutral-200 pt-5 sm:mt-14">
                        <div className="pr-3"><span className="block font-serif text-2xl font-semibold text-[#171b24] sm:text-3xl">2007</span><span className="mt-1 block text-[10px] uppercase tracking-[.12em] text-neutral-500 sm:text-xs">Established</span></div>
                        <div className="border-l border-neutral-200 px-3 sm:px-5"><span className="block font-serif text-2xl font-semibold text-[#171b24] sm:text-3xl">7</span><span className="mt-1 block text-[10px] uppercase tracking-[.12em] text-neutral-500 sm:text-xs">Engineering streams</span></div>
                        <a href="#home-recognition" className="border-l border-neutral-200 pl-3 sm:pl-5"><span className="block font-serif text-2xl font-semibold text-[#171b24] sm:text-3xl">SRIT</span><span className="mt-1 block text-[10px] uppercase tracking-[.12em] text-neutral-500 sm:text-xs">Anantapur</span></a>
                    </div>
                </div>
            </div>
            <a href="#home-recognition" className="flex items-center justify-end gap-2 py-3 text-[10px] font-semibold uppercase tracking-[.18em] text-neutral-500 hover:text-neutral-900">Scroll to explore <ArrowDown className="h-3.5 w-3.5" /></a>
        </div>
    </section>;
}
