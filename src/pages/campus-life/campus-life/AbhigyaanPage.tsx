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
                                                className="rounded-xl border border-neutral-200/80 bg-white p-4 shadow-sm hover:border-[#FF6600]/40 transition-colors"
                                            >
                                                <div className="font-serif text-2xl font-black text-[#FF6600]">
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
                                        <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
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
                                                            <span className="text-sm sm:text-[15px] text-[#334155] leading-relaxed">
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
                                                            <span className="text-sm sm:text-[15px] text-[#334155] leading-relaxed">
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
                            </div>
        </CampusLifeLayout>
    );
};

export default AbhigyaanPage;
