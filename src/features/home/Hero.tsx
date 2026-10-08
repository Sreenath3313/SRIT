import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
    { src: '/College 2.JPG', alt: 'Campus grounds and academic buildings at Srinivasa Ramanujan Institute of Technology', eyebrow: 'Life across campus', heading: <>A place to learn.<br />A place to belong.</>, note: 'Discover the people, spaces and experiences that make campus life part of the SRIT journey.' },
    { src: '/BasketBall.JPG', alt: 'Outdoor basketball court on the SRIT campus', eyebrow: 'Beyond the classroom', heading: <>Make room<br />to play.</>, note: 'Take a break, get moving and enjoy the shared spaces that bring campus life together.' },
    { src: '/College 1.jpg', alt: 'SRIT academic building illuminated at night', eyebrow: 'A campus that comes alive', heading: <>A place to learn.<br />A place to belong.</>, note: 'Discover the people, spaces and experiences that make campus life part of the SRIT journey.' },
    { src: '/CollegeMain.jpg', alt: 'The main academic building at Srinivasa Ramanujan Institute of Technology', eyebrow: 'An engineering institution with purpose', heading: <>Think boldly.<br />Build what matters.</>, note: 'A close-knit campus where strong foundations meet hands-on engineering and the ambition to make a difference.' },
    { src: '/Sunlit Srinivasa Ramanujan Campus Garden.png', alt: 'Sunlit campus garden and academic block at Srinivasa Ramanujan Institute of Technology', eyebrow: 'A campus in full bloom', heading: <>Find space<br />to flourish.</>, note: 'A welcoming campus, framed by green spaces and places to learn, connect and grow.' },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const [isImageHovered, setIsImageHovered] = useState(false);
    const reduceMotion = useReducedMotion();
    useEffect(() => {
        const nextSlide = slides[(current + 1) % slides.length];
        const image = new Image();
        image.decoding = 'async';
        image.fetchPriority = 'low';
        image.src = nextSlide.src;
    }, [current]);
    useEffect(() => {
        if (reduceMotion || isImageHovered) return;
        const timer = window.setInterval(() => setCurrent((index) => (index + 1) % slides.length), 7000);
        return () => window.clearInterval(timer);
    }, [reduceMotion, isImageHovered]);
    const slide = slides[current];

    return <section aria-label="Welcome to SRIT" className="bg-white pt-[146px] lg:pt-[154px]">
        <div className="w-full">
            <div className="grid min-h-0 grid-cols-1 items-stretch border-b border-neutral-200 lg:h-[calc(100svh-56px)] lg:min-h-[560px] lg:grid-rows-[minmax(0,1fr)] lg:grid-cols-[1.12fr_.88fr]">
                <div
                    className="group relative h-[min(78vw,420px)] min-h-[300px] overflow-hidden bg-neutral-100 sm:h-[min(66vw,500px)] sm:min-h-[400px] lg:h-auto lg:min-h-0"
                    onMouseEnter={() => setIsImageHovered(true)}
                    onMouseLeave={() => setIsImageHovered(false)}
                >
                    <AnimatePresence mode="sync"><motion.img key={slide.src} src={slide.src} alt={slide.alt} draggable={false} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }} fetchPriority={current === 0 ? 'high' : 'auto'} loading="eager" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center" /></AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between sm:bottom-7 sm:left-7 sm:right-7">
                        <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/90 sm:text-xs">Srinivasa Ramanujan Institute of Technology</span>
                        <div className="flex shrink-0 items-center gap-2 opacity-100 transition-opacity duration-200 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100" role="group" aria-label="Choose campus image">
                            {slides.map((item, index) => <button key={item.src} type="button" aria-label={`Show campus image ${index + 1}`} aria-pressed={index === current} onClick={() => setCurrent(index)} className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30 ${index === current ? 'w-8 bg-white' : 'w-2.5 bg-white/65 hover:bg-white'}`} />)}
                        </div>
                    </div>
                </div>

                <div className="flex min-h-0 flex-col justify-center px-5 py-6 sm:px-10 sm:py-10 lg:px-12 lg:py-8 xl:px-16">
                    <AnimatePresence mode="wait"><motion.div key={current} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }}>
                        <p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-neutral-500 sm:mb-6 sm:text-xs"><span className="h-[2px] w-8 bg-primary" />{slide.eyebrow}</p>
                        <h1 className="max-w-[680px] font-serif text-[clamp(2.65rem,4vw,4.5rem)] font-semibold leading-[1.02] tracking-[-.045em] text-[#171b24]">{slide.heading}</h1>
                        <p className="mt-4 max-w-lg text-left text-base leading-[1.7] text-neutral-600 sm:mt-7 sm:text-lg sm:leading-[1.8]">{slide.note}</p>
                    </motion.div></AnimatePresence>

                    <div className="mt-6 flex flex-row gap-2 max-[360px]:flex-col sm:mt-10 sm:gap-3 sm:flex-row lg:mt-8">
                        <Link to="/admissions/courses-offered" className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#171b24] px-6 text-sm font-semibold text-white transition-colors hover:bg-primary">Explore programs <ArrowUpRight className="h-4 w-4" /></Link>
                        <Link to="/about/overview" className="inline-flex min-h-12 items-center justify-center gap-3 border border-neutral-300 px-6 text-sm font-semibold text-[#171b24] transition-colors hover:border-[#171b24]">Discover SRIT <ArrowRight className="h-4 w-4" /></Link>
                    </div>

                    <div className="mt-6 grid max-w-lg grid-cols-3 border-t border-neutral-200 pt-4 sm:mt-10 sm:pt-5 lg:mt-10">
                        <div className="pr-3"><span className="block font-serif text-2xl font-semibold text-[#171b24] sm:text-3xl">2007</span><span className="mt-1 block text-[10px] uppercase tracking-[.12em] text-neutral-500 sm:text-xs">Established</span></div>
                        <div className="border-l border-neutral-200 px-3 sm:px-5"><span className="block font-serif text-2xl font-semibold text-[#171b24] sm:text-3xl">7</span><span className="mt-1 block text-[10px] uppercase tracking-[.12em] text-neutral-500 sm:text-xs">Engineering streams</span></div>
                        <a href="#home-recognition" className="border-l border-neutral-200 pl-3 sm:pl-5"><span className="block font-serif text-2xl font-semibold text-[#171b24] sm:text-3xl">SRIT</span><span className="mt-1 block text-[10px] uppercase tracking-[.12em] text-neutral-500 sm:text-xs">Anantapur</span></a>
                    </div>
                </div>
            </div>
            <a href="#home-recognition" className="flex items-center justify-end gap-2 px-4 py-3 text-[10px] font-semibold uppercase tracking-[.18em] text-neutral-500 hover:text-neutral-900 sm:px-6 lg:px-8">Scroll to explore <ArrowDown className="h-3.5 w-3.5" /></a>
        </div>
    </section>;
}
