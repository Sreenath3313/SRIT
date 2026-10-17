import React, { useState, useEffect } from 'react';
import {
    ChevronUp, ChevronDown, ChevronRight, ChevronLeft, Maximize2, X, Play, Pause, LayoutGrid, Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CampusLifeLayout from './CampusLifeLayout';
import { campusLifeSections } from './types';
import IframeWithLoader from '../../../components/common/IframeWithLoader';
import { AccordionContainer, DepartmentAccordionRow } from '../../../components/common/DepartmentAccordion';

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
    }),
};

export const AbhigyaanPage: React.FC = () => {
    const [isStudentCategoriesOpen, setIsStudentCategoriesOpen] = useState(false);
    const [isStudentSlidesOpen, setIsStudentSlidesOpen] = useState(false);
    const [isFacultyCategoriesOpen, setIsFacultyCategoriesOpen] = useState(false);
    const [isFacultySlidesOpen, setIsFacultySlidesOpen] = useState(false);
    const [isAchieversReportsOpen, setIsAchieversReportsOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Carousel state
    const [[page, direction], setPage] = useState([0, 0]);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');

    const activeSection = campusLifeSections.find((s) => s.id === 'abhigyaan') || campusLifeSections[0];

    const paginate = (newDirection: number) => {
        if (!activeSection.galleryImages || activeSection.galleryImages.length === 0) return;
        const total = activeSection.galleryImages.length;
        const nextIndex = (page + newDirection + total) % total;
        setPage([nextIndex, newDirection]);
    };

    const goToSlide = (index: number) => {
        if (index === page) return;
        setPage([index, index > page ? 1 : -1]);
    };

    // Auto-moving slideshow timer (every 4.5 seconds, pauses on hover)
    useEffect(() => {
        if (!isAutoPlay || isHovered || viewMode !== 'slider' || !activeSection.galleryImages || activeSection.galleryImages.length <= 1) {
            return;
        }
        const timer = setInterval(() => {
            paginate(1);
        }, 4500);
        return () => clearInterval(timer);
    }, [isAutoPlay, isHovered, viewMode, page, activeSection.galleryImages]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!activeSection.galleryImages) return;
            if (lightboxIndex !== null) {
                if (e.key === 'Escape') setLightboxIndex(null);
                else if (e.key === 'ArrowLeft') {
                    setLightboxIndex((prev) =>
                        prev === null || prev === 0 ? activeSection.galleryImages!.length - 1 : prev - 1
                    );
                } else if (e.key === 'ArrowRight') {
                    setLightboxIndex((prev) =>
                        prev === null || prev >= activeSection.galleryImages!.length - 1 ? 0 : prev + 1
                    );
                }
            } else if (viewMode === 'slider') {
                if (e.key === 'ArrowLeft') paginate(-1);
                else if (e.key === 'ArrowRight') paginate(1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, viewMode, page, activeSection.galleryImages]);

    return (
        <CampusLifeLayout activeSectionId="abhigyaan">
            <div className="space-y-6 w-full">
                                {/* === Key Statistics Cards === */}
                                {activeSection.keyStats && activeSection.keyStats.length > 0 && (
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                                        {activeSection.keyStats.map((stat, idx) => (
                                            <div
                                                key={idx}
                                                className="rounded-xl border border-neutral-200/80 bg-white p-4 shadow-sm hover:border-[#FF5422]/40 transition-colors"
                                            >
                                                <div className="font-serif text-2xl font-black text-[#FF5422]">
                                                    {stat.value}
                                                </div>
                                                <div className="mt-1 text-xs font-bold text-neutral-900">
                                                    {stat.label}
                                                </div>
                                                <div className="mt-0.5 text-[11px] text-neutral-500 leading-normal">
                                                    {stat.desc}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* === Detailed Overview: Exact Text from Official SRIT Achievers Day Page === */}
                                <div className="rounded-xl border border-neutral-200/80 bg-white p-5 sm:p-7 shadow-sm space-y-4">
                                    <div className="flex items-center gap-2.5 pb-2.5 border-b border-neutral-100">
                                        <span className="h-5 w-1.5 rounded-full bg-[#FF5422]" />
                                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-[26px] font-black text-neutral-900 tracking-tight">
                                            ABHIGYAAN (Achievers Day)
                                        </h2>
                                    </div>

                                    <div className="space-y-3 text-[14px] leading-relaxed text-neutral-700">
                                        {activeSection.overview && activeSection.overview.map((para, i) => (
                                            <p
                                                key={i}
                                                className={`text-left sm:text-justify ${
                                                    i === (activeSection.overview?.length || 1) - 1
                                                        ? 'p-3.5 rounded-xl border border-orange-200/80 bg-orange-50/50 text-neutral-900 font-medium'
                                                        : ''
                                                }`}
                                            >
                                                {para}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {/* === Official Accordions Section (5 Interactive Items from SRIT) === */}
                                <section aria-label="Achievers Day Accordions" className="space-y-3 w-full">
                                    <div className="flex items-center gap-3 px-1">
                                        <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                        <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
                                            Reward Guidelines, Presentations &amp; Reports
                                        </h2>
                                    </div>

                                    <AccordionContainer className="w-full">
                                        {/* --- 1. Student Reward Categories --- */}
                                        <DepartmentAccordionRow
                                            id="abhigyaan-student-cat"
                                            index={0}
                                            title="Student Reward Categories"
                                            isOpen={isStudentCategoriesOpen}
                                            onToggle={() => setIsStudentCategoriesOpen(!isStudentCategoriesOpen)}
                                        >
                                            <div className="p-5 sm:p-6 bg-white space-y-3">
                                                <p className="font-serif font-bold text-sm text-[#0f172a]">
                                                    Students who –
                                                </p>
                                                <div className="grid sm:grid-cols-2 gap-2.5">
                                                    {[
                                                        'Received placement offers with the highest pay package.',
                                                        'Secured placement in Reputed Companies.',
                                                        'Secured GATE Rank.',
                                                        'Admitted to various academic programmes in IITs or NITs.',
                                                        'Secured the highest CGPA and stood first in different branches.',
                                                        'Published their works in reputed journals.',
                                                        'Won the best paper award or presentation at conferences.',
                                                        'Won competitions in International, National and State level workshops, symposiums and technical fests.',
                                                        'Participated in International, National and State Level workshops, symposiums and technical fests.',
                                                        'Participated in NCC special drives and contributed directly or indirectly for society’s benefit.',
                                                        'Participated in NSS activities at National, Zonal and State Levels.',
                                                        'Won games and sports competitions at the National and University Levels.',
                                                        'Won prizes in cultural fests at the National, State or University Levels.',
                                                        'Completed NPTEL certificate courses with Elite Gold.',
                                                        'Innovation and Startups.',
                                                        'Won Hackathon competitions in various institutions at different levels.',
                                                        'Won Ideathon competitions in various institutes at different levels.',
                                                        'Secured Internship opportunities with reputed companies.',
                                                        'Students with exemplary performance in any other areas are also recognized.'
                                                    ].map((point, pIdx) => (
                                                        <div
                                                            key={pIdx}
                                                            className="flex items-start gap-2.5 p-3 rounded-lg border border-[#FFD9C4] bg-[#FFFAF6] hover:bg-orange-50/50 transition-colors"
                                                        >
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] mt-1.5 shrink-0" />
                                                            <span className="text-xs sm:text-[13px] text-[#334155] leading-relaxed">
                                                                {point}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </DepartmentAccordionRow>

                                        {/* --- 2. Student Category Information (Google Slides Embed) --- */}
                                        <DepartmentAccordionRow
                                            id="abhigyaan-student-slides"
                                            index={1}
                                            title="Student Category Information"
                                            isOpen={isStudentSlidesOpen}
                                            onToggle={() => setIsStudentSlidesOpen(!isStudentSlidesOpen)}
                                        >
                                            <div className="p-4 sm:p-6 bg-white space-y-4">
                                                <div className="w-full h-[600px] md:h-[700px] rounded-xl overflow-hidden border border-[#FFD9C4] bg-white shadow-inner">
                                                    <IframeWithLoader
                                                        title="Student Category Information Presentation"
                                                        src="https://docs.google.com/presentation/d/e/2PACX-1vQXAhJqXv555FeslvOfQSuY7aFd334Ia0Vxrgt1gyOTxsUv1Tz7rwDmI7UJdfU5Tg/embed?start=true&loop=false&delayms=10000"
                                                        className="w-full h-full border-0"
                                                    />
                                                </div>
                                            </div>
                                        </DepartmentAccordionRow>

                                        {/* --- 3. Faculty Reward Categories --- */}
                                        <DepartmentAccordionRow
                                            id="abhigyaan-faculty-cat"
                                            index={2}
                                            title="Faculty Reward Categories"
                                            isOpen={isFacultyCategoriesOpen}
                                            onToggle={() => setIsFacultyCategoriesOpen(!isFacultyCategoriesOpen)}
                                        >
                                            <div className="p-5 sm:p-6 bg-white space-y-3">
                                                <p className="font-serif font-bold text-sm text-[#0f172a]">
                                                    Faculty who —
                                                </p>
                                                <div className="grid sm:grid-cols-2 gap-2.5">
                                                    {[
                                                        'Received Project grants from International, National and State Level bodies.',
                                                        'Developed Product or Working Model.',
                                                        'Received Project work seed money grant.',
                                                        'Published and Received Patent grant.',
                                                        'Published their research work in reputed journals.',
                                                        'Published a book or chapters with a reputed publisher or Scopus index.',
                                                        'Won the best paper award or presentation at International, national, or university-level conferences.',
                                                        'Received any academic award or recognition from the Central or State governments or any recognized University or body.',
                                                        'Awarded Ph.D. from a University.',
                                                        'Acted as Chair or Co-chair in any International or National Conferences.',
                                                        'Invited as a Resource Person (offline/online) by any reputed national or international institutes.',
                                                        'Delivered talks (offline/online) in any reputed institutes.',
                                                        'Completed NPTEL certificate course with Elite Gold.',
                                                        'Faculty with exemplary performance in any other areas are also recognized.'
                                                    ].map((point, fIdx) => (
                                                        <div
                                                            key={fIdx}
                                                            className="flex items-start gap-2.5 p-3 rounded-lg border border-[#FFD9C4] bg-[#FFFAF6] hover:bg-orange-50/50 transition-colors"
                                                        >
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] mt-1.5 shrink-0" />
                                                            <span className="text-xs sm:text-[13px] text-[#334155] leading-relaxed">
                                                                {point}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </DepartmentAccordionRow>

                                        {/* --- 4. Faculty Category Information (Google Slides Embed) --- */}
                                        <DepartmentAccordionRow
                                            id="abhigyaan-faculty-slides"
                                            index={3}
                                            title="Faculty Category Information"
                                            isOpen={isFacultySlidesOpen}
                                            onToggle={() => setIsFacultySlidesOpen(!isFacultySlidesOpen)}
                                        >
                                            <div className="p-4 sm:p-6 bg-white space-y-4">
                                                <div className="w-full h-[600px] md:h-[700px] rounded-xl overflow-hidden border border-[#FFD9C4] bg-white shadow-inner">
                                                    <IframeWithLoader
                                                        title="Faculty Category Information Presentation"
                                                        src="https://docs.google.com/presentation/d/e/2PACX-1vQUnd3NNM5QVbj6WdofGiolhsuoMrbiW4l4GQ3oN_u4NsGik994WF9vpFU47wPuHg/embed?start=true&loop=false&delayms=10000"
                                                        className="w-full h-full border-0"
                                                    />
                                                </div>
                                            </div>
                                        </DepartmentAccordionRow>

                                        {/* --- 5. Year Wise Report (Google Spreadsheet Embed) --- */}
                                        <DepartmentAccordionRow
                                            id="abhigyaan-achievers-reports"
                                            index={4}
                                            title="Year Wise Report"
                                            isOpen={isAchieversReportsOpen}
                                            onToggle={() => setIsAchieversReportsOpen(!isAchieversReportsOpen)}
                                        >
                                            <div className="p-4 sm:p-6 bg-white space-y-4">
                                                <div className="w-full h-[800px] rounded-xl overflow-hidden border border-[#FFD9C4] bg-white shadow-inner">
                                                    <IframeWithLoader
                                                        title="Achievers Day Year Wise Reports Sheet"
                                                        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS1ucNyZAGkK7xRenY4hX-idp3r-soV79INzPtu26JWrIpoN-wBHgIPrWndilthHA/pubhtml?widget=true&headers=false"
                                                        className="w-full h-full border-0"
                                                    />
                                                </div>
                                            </div>
                                        </DepartmentAccordionRow>
                                    </AccordionContainer>
                                </section>

                                {/* === Image Gallery (Auto-Moving Carousel matching srit.ac.in/achievers-day) === */}
                                {activeSection.galleryImages && activeSection.galleryImages.length > 0 && (
                                    <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-7 shadow-sm space-y-5">
                                        {/* Gallery Header Controls */}
                                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-1.5 h-5 rounded-full bg-[#FF5422]" />
                                                <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900">
                                                    IMAGE GALLERY
                                                </h3>
                                                <span className="text-xs font-bold text-[#FF5422] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                                                    {activeSection.galleryImages.length} Photographs
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {/* Play / Pause Auto-slide Toggle */}
                                                {viewMode === 'slider' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsAutoPlay((prev) => !prev)}
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                                                            isAutoPlay
                                                                ? 'bg-orange-50 text-[#FF5422] border-orange-200 hover:bg-orange-100'
                                                                : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200'
                                                        }`}
                                                        title={isAutoPlay ? 'Click to pause auto-moving' : 'Click to resume auto-moving'}
                                                    >
                                                        {isAutoPlay ? <Pause size={12} /> : <Play size={12} />}
                                                        <span>{isAutoPlay ? 'Auto-moving' : 'Paused'}</span>
                                                    </button>
                                                )}

                                                {/* View Mode Toggle */}
                                                <div className="inline-flex rounded-lg border border-neutral-200 p-0.5 bg-neutral-100 text-xs font-medium">
                                                    <button
                                                        type="button"
                                                        onClick={() => setViewMode('slider')}
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                                                            viewMode === 'slider'
                                                                ? 'bg-white text-[#FF5422] font-bold shadow-xs'
                                                                : 'text-neutral-600 hover:text-neutral-900'
                                                        }`}
                                                    >
                                                        <Sliders size={13} />
                                                        <span>Moving Slider</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setViewMode('grid')}
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                                                            viewMode === 'grid'
                                                                ? 'bg-white text-[#FF5422] font-bold shadow-xs'
                                                                : 'text-neutral-600 hover:text-neutral-900'
                                                        }`}
                                                    >
                                                        <LayoutGrid size={13} />
                                                        <span>All Photos</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* VIEW MODE 1: MOVING SLIDER CAROUSEL (Identical to srit.ac.in/achievers-day) */}
                                        {viewMode === 'slider' ? (
                                            <div className="space-y-4">
                                                {/* Main Slider Stage */}
                                                <div
                                                    className="relative w-full h-[360px] sm:h-[480px] lg:h-[530px] rounded-2xl overflow-hidden bg-neutral-950 shadow-md flex items-center justify-center select-none"
                                                    onMouseEnter={() => setIsHovered(true)}
                                                    onMouseLeave={() => setIsHovered(false)}
                                                >
                                                    {/* Blurred Glow Backdrop */}
                                                    <img
                                                        src={
                                                            activeSection.galleryImages[page].src ||
                                                            (activeSection.galleryImages[page] as any).url
                                                        }
                                                        alt=""
                                                        aria-hidden="true"
                                                        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none transition-all duration-700"
                                                    />

                                                    {/* Sliding Photograph with Framer Motion Animation */}
                                                    <AnimatePresence initial={false} custom={direction}>
                                                        <motion.div
                                                            key={page}
                                                            custom={direction}
                                                            variants={slideVariants}
                                                            initial="enter"
                                                            animate="center"
                                                            exit="exit"
                                                            transition={{
                                                                x: { type: 'spring', stiffness: 280, damping: 32 },
                                                                opacity: { duration: 0.25 }
                                                            }}
                                                            drag="x"
                                                            dragConstraints={{ left: 0, right: 0 }}
                                                            dragElastic={1}
                                                            onDragEnd={(_, { offset, velocity }) => {
                                                                const swipe = Math.abs(offset.x) * velocity.x;
                                                                if (swipe < -10000 || offset.x < -60) {
                                                                    paginate(1);
                                                                } else if (swipe > 10000 || offset.x > 60) {
                                                                    paginate(-1);
                                                                }
                                                            }}
                                                            className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 cursor-grab active:cursor-grabbing"
                                                            onClick={() => setLightboxIndex(page)}
                                                        >
                                                            <img
                                                                src={
                                                                    activeSection.galleryImages[page].src ||
                                                                    (activeSection.galleryImages[page] as any).url
                                                                }
                                                                alt={
                                                                    activeSection.galleryImages[page].caption ||
                                                                    'Achievers Day'
                                                                }
                                                                className="max-h-full max-w-full object-contain rounded-xl shadow-2xl pointer-events-none"
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).src = '/optimized/Campus.JPG.webp';
                                                                }}
                                                            />
                                                        </motion.div>
                                                    </AnimatePresence>

                                                    {/* Left Navigation Arrow */}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            paginate(-1);
                                                        }}
                                                        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#FF5422] text-white flex items-center justify-center transition-all duration-200 border border-white/20 shadow-xl backdrop-blur-xs cursor-pointer group hover:scale-110 active:scale-95"
                                                        aria-label="Previous slide"
                                                    >
                                                        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                                                    </button>

                                                    {/* Right Navigation Arrow */}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            paginate(1);
                                                        }}
                                                        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#FF5422] text-white flex items-center justify-center transition-all duration-200 border border-white/20 shadow-xl backdrop-blur-xs cursor-pointer group hover:scale-110 active:scale-95"
                                                        aria-label="Next slide"
                                                    >
                                                        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                                                    </button>

                                                    {/* Bottom Caption Overlay */}
                                                    <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pointer-events-none">
                                                        <div className="space-y-0.5 pointer-events-auto">
                                                            <span className="text-[11px] font-bold tracking-wider text-[#FF5422] uppercase">
                                                                Abhigyaan 2024 Achievers Day
                                                            </span>
                                                            <p className="text-sm sm:text-base font-semibold text-white line-clamp-1 drop-shadow-sm">
                                                                {activeSection.galleryImages[page].caption}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-3 self-end sm:self-auto pointer-events-auto">
                                                            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-xs border border-white/20">
                                                                {page + 1} / {activeSection.galleryImages.length}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => setLightboxIndex(page)}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5422] hover:bg-[#e04415] text-white text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                                                            >
                                                                <Maximize2 size={12} />
                                                                <span>Enlarge</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Pagination Dots (matching Elementor Swiper pagination) */}
                                                <div className="flex items-center justify-center gap-2 pt-1">
                                                    {activeSection.galleryImages.map((_, i) => (
                                                        <button
                                                            key={i}
                                                            type="button"
                                                            onClick={() => goToSlide(i)}
                                                            aria-label={`Go to slide ${i + 1}`}
                                                            className={`transition-all duration-300 rounded-full cursor-pointer ${
                                                                i === page
                                                                    ? 'w-8 h-2.5 bg-[#FF5422]'
                                                                    : 'w-2.5 h-2.5 bg-neutral-300 hover:bg-neutral-400'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Thumbnail Navigation Strip */}
                                                <div className="pt-2">
                                                    <div className="flex items-center justify-between pb-2 text-xs font-bold text-neutral-600">
                                                        <span className="uppercase tracking-wider text-[11px] text-neutral-500">
                                                            Quick Jump Thumbnails
                                                        </span>
                                                        <span className="text-neutral-400 text-[11px]">
                                                            Click thumbnail to slide
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2 sm:gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                                                        {activeSection.galleryImages.map((img, idx) => (
                                                            <button
                                                                key={idx}
                                                                type="button"
                                                                onClick={() => goToSlide(idx)}
                                                                className={`relative w-20 sm:w-24 h-14 sm:h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                                                                    idx === page
                                                                        ? 'border-[#FF5422] scale-105 shadow-md ring-2 ring-[#FF5422]/30'
                                                                        : 'border-neutral-200 opacity-60 hover:opacity-100 hover:border-neutral-400'
                                                                }`}
                                                            >
                                                                <img
                                                                    src={img.src || (img as any).url}
                                                                    alt={img.caption || `Thumbnail ${idx + 1}`}
                                                                    className="w-full h-full object-cover object-center"
                                                                    onError={(e) => {
                                                                        (e.target as HTMLImageElement).src = '/optimized/Campus.JPG.webp';
                                                                    }}
                                                                />
                                                                <span className="absolute bottom-0.5 right-1 text-[9px] font-bold text-white bg-black/60 px-1 rounded">
                                                                    #{idx + 1}
                                                                </span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            /* VIEW MODE 2: GRID VIEW */
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {activeSection.galleryImages.map((img, gi) => (
                                                    <div
                                                        key={gi}
                                                        onClick={() => setLightboxIndex(gi)}
                                                        className="group cursor-pointer rounded-xl overflow-hidden border border-neutral-200/90 bg-white shadow-sm hover:shadow-lg hover:border-[#FF5422]/60 hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                                                    >
                                                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                                                            <img
                                                                src={img.src || (img as any).url}
                                                                alt={img.caption || activeSection.title}
                                                                loading="lazy"
                                                                decoding="async"
                                                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).src = '/optimized/Campus.JPG.webp';
                                                                }}
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                                                <div className="flex items-center justify-between w-full text-white text-xs">
                                                                    <span className="font-semibold flex items-center gap-1.5 drop-shadow-sm">
                                                                        <Maximize2 size={13} className="text-[#FF5422]" />
                                                                        Click to View
                                                                    </span>
                                                                    <span className="text-[10px] font-bold bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20">
                                                                    #{gi + 1}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {img.caption && (
                                                        <div className="p-3 bg-white border-t border-neutral-100">
                                                            <p className="text-xs font-semibold text-neutral-800 line-clamp-1 group-hover:text-[#FF5422] transition-colors">
                                                                {img.caption}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                                {/* === Lightbox Modal === */}
                                {lightboxIndex !== null && activeSection.galleryImages && (
                                    <div
                                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
                                        onClick={() => setLightboxIndex(null)}
                                    >
                                        <div
                                            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {/* Close Button */}
                                            <button
                                                type="button"
                                                onClick={() => setLightboxIndex(null)}
                                                className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                                                aria-label="Close lightbox"
                                            >
                                                <X size={26} />
                                            </button>

                                            {/* Main Image Box */}
                                            <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/50 border border-white/10 shadow-2xl">
                                                <img
                                                    src={
                                                        activeSection.galleryImages[lightboxIndex].src ||
                                                        (activeSection.galleryImages[lightboxIndex] as any).url
                                                    }
                                                    alt={
                                                        activeSection.galleryImages[lightboxIndex].caption ||
                                                        'Achievers Day'
                                                    }
                                                    className="max-h-[75vh] max-w-full object-contain"
                                                />

                                                {/* Prev Button */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setLightboxIndex((prev) =>
                                                            prev === null || prev === 0
                                                                ? activeSection.galleryImages!.length - 1
                                                                : prev - 1
                                                        );
                                                    }}
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#FF5422] text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg"
                                                    aria-label="Previous image"
                                                >
                                                    <ChevronLeft size={22} />
                                                </button>

                                                {/* Next Button */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setLightboxIndex((prev) =>
                                                            prev === null ||
                                                            prev >= activeSection.galleryImages!.length - 1
                                                                ? 0
                                                                : prev + 1
                                                        );
                                                    }}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#FF5422] text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg"
                                                    aria-label="Next image"
                                                >
                                                    <ChevronRight size={22} />
                                                </button>
                                            </div>

                                            {/* Caption & Counter Bar */}
                                            <div className="mt-3.5 flex items-center justify-between w-full px-2 text-white">
                                                <p className="text-sm sm:text-base font-semibold text-neutral-100">
                                                    {activeSection.galleryImages[lightboxIndex].caption}
                                                </p>
                                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/15 text-orange-200 border border-white/20 shrink-0 ml-4">
                                                    {lightboxIndex + 1} / {activeSection.galleryImages.length}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
        </CampusLifeLayout>
    );
};

export default AbhigyaanPage;
