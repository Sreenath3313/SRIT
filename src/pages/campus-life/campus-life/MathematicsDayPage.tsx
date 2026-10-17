import React, { useState } from 'react';
import { ChevronRight, Award, ExternalLink, FileText } from 'lucide-react';
import CampusLifeLayout from './CampusLifeLayout';
import { campusLifeSections } from './types';
import IframeWithLoader from '../../../components/common/IframeWithLoader';
import { AccordionContainer, DepartmentAccordionRow } from '../../../components/common/DepartmentAccordion';

export const MathematicsDayPage: React.FC = () => {
    const [isMathPosterOpen, setIsMathPosterOpen] = useState(false);

    const activeSection = campusLifeSections.find((s) => s.id === 'mathematics-day') || campusLifeSections[0];

    return (
        <CampusLifeLayout activeSectionId="mathematics-day">
            <div className="space-y-8 sm:space-y-10 w-full">
                {/* === 1. DETAILED OVERVIEW & RAMANUJAN TRIBUTE === */}
                <section aria-label="Mathematics Day Overview">
                    <div className="rounded-xl border border-[#FFD9C4] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_4px_16px_rgba(255,102,0,0.05)] relative overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Left text */}
                            <div className="lg:col-span-8 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF6600] text-xs font-bold tracking-wide uppercase">
                                    <Award size={14} />
                                    <span>National Mathematics Day</span>
                                </div>

                                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f172a] tracking-tight">
                                    MATHEMATICS DAY &amp; <span className="text-[#FF6600]">Intelligence Test</span>
                                </h2>

                                <p className="text-sm sm:text-base leading-relaxed text-[#334155]">
                                    We are thrilled to announce the upcoming <strong className="text-[#FF6600] font-bold">Srinivasa Ramanujan Intelligence Test</strong> at Srinivasa Ramanujan Institute of Technology. This annual event is a prestigious tribute to the legendary mathematician Srinivasa Ramanujan and is open to all Intermediate 2nd year students across the region.
                                </p>

                                <div className="p-4 sm:p-5 rounded-xl border border-[#FFD9C4] bg-[#FFFAF6] space-y-1.5">
                                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#0f172a] flex items-center gap-2">
                                        <span className="w-1.5 h-3.5 rounded-full bg-[#FF6600]" />
                                        About the Test:
                                    </h4>
                                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pl-3.5">
                                        The Srinivasa Ramanujan Intelligence Test is a dedicated platform for young minds to showcase their mathematical prowess and problem-solving abilities, engineered to identify and nurture the brightest mathematical talents.
                                    </p>
                                </div>

                                <div className="p-4 sm:p-5 rounded-xl border border-[#FFD9C4] bg-[#FFFAF6] space-y-1.5">
                                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#0f172a] flex items-center gap-2">
                                        <span className="w-1.5 h-3.5 rounded-full bg-[#FF6600]" />
                                        Join Us in Celebrating Mathematics:
                                    </h4>
                                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pl-3.5">
                                        Let's celebrate the spirit of Srinivasa Ramanujan's timeless legacy together. We look forward to witnessing the brilliance and innovation that young mathematicians bring to our campus!
                                    </p>
                                </div>
                            </div>

                            {/* Right Image: Srinivasa Ramanujan */}
                            <div className="lg:col-span-4 self-stretch flex flex-col justify-center">
                                <div className="rounded-xl overflow-hidden border border-[#FFD9C4] shadow-md bg-[#FFFAF6] group relative w-full aspect-[3/4] flex flex-col items-center justify-center p-2.5">
                                    <img
                                        src="/images/campus-life/ramanujan.jpg"
                                        alt="Srinivasa Ramanujan"
                                        className="w-full h-full object-cover object-top rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/Sunlit Srinivasa Ramanujan Campus Garden.png';
                                        }}
                                    />
                                    <div className="absolute bottom-2.5 inset-x-2.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3.5 rounded-b-lg text-center">
                                        <span className="text-sm font-bold text-white block">
                                            Srinivasa Ramanujan
                                        </span>
                                        <span className="text-xs text-orange-300 block font-medium">
                                            1887 – 1920 • Legendary Mathematician
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === 2. OFFICIAL ACCORDION: NOTIFICATION & POSTER === */}
                <section aria-label="Official Registration & Details Poster">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 px-1">
                            <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                            <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
                                Official Notifications &amp; Registration Materials
                            </h2>
                        </div>

                        <AccordionContainer className="w-full">
                            <DepartmentAccordionRow
                                id="math-poster"
                                index={0}
                                title={
                                    <span className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-[#FF6600] shrink-0" />
                                        <span>Srinivasa Ramanujan Intelligence Test – Details &amp; Registration Poster</span>
                                    </span>
                                }
                                isOpen={isMathPosterOpen}
                                onToggle={() => setIsMathPosterOpen(!isMathPosterOpen)}
                            >
                                <div className="p-3 sm:p-5 bg-white space-y-4">
                                    <div className="rounded-xl bg-[#FFFAF6] border border-[#FFD9C4] p-4 flex flex-wrap items-center justify-between gap-3">
                                        <div>
                                            <h4 className="font-serif font-bold text-sm sm:text-base text-[#0f172a]">
                                                Intelligence Test Notification &amp; Registration Guidelines
                                            </h4>
                                            <p className="text-xs text-neutral-500 mt-0.5">
                                                Official event brochure, registration procedure, and competitive guidelines.
                                            </p>
                                        </div>
                                        <a
                                            href="https://drive.google.com/file/d/1k2BeTed_4LFiazGL_BE3cXoCq_1aQtDz/view?usp=sharing"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-[#FF6600] text-white hover:bg-[#e04515] transition-colors shadow-sm"
                                        >
                                            <span>Open in Google Drive</span>
                                            <ExternalLink size={14} />
                                        </a>
                                    </div>

                                    <div className="w-full h-[800px] rounded-xl overflow-hidden border border-[#FFD9C4] bg-neutral-900 shadow-inner">
                                        <IframeWithLoader
                                            title="Srinivasa Ramanujan Intelligence Test Poster"
                                            src="https://drive.google.com/file/d/1k2BeTed_4LFiazGL_BE3cXoCq_1aQtDz/preview"
                                            className="w-full h-full border-0"
                                        />
                                    </div>
                                </div>
                            </DepartmentAccordionRow>
                        </AccordionContainer>
                    </div>
                </section>
            </div>
        </CampusLifeLayout>
    );
};

export default MathematicsDayPage;
