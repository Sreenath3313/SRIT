import React, { useState } from 'react';
import { Sparkles, Calendar, FileSpreadsheet, Users, Compass, BookOpen } from 'lucide-react';
import CampusLifeLayout from './CampusLifeLayout';
import { campusLifeSections } from './types';
import IframeWithLoader from '../../../components/common/IframeWithLoader';
import { AccordionContainer, DepartmentAccordionRow } from '../../../components/common/DepartmentAccordion';

export const AarambhPage: React.FC = () => {
    const [isAarambhReportsOpen, setIsAarambhReportsOpen] = useState(false);

    const activeSection = campusLifeSections.find((s) => s.id === 'aarambh') || campusLifeSections[0];

    return (
        <CampusLifeLayout activeSectionId="aarambh">
            <div className="space-y-8 sm:space-y-10 w-full">
                {/* === 1. KEY STATISTICS CARDS === */}
                {activeSection.keyStats && activeSection.keyStats.length > 0 && (
                    <section aria-label="Key Statistics">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                            {activeSection.keyStats.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="group relative rounded-xl border border-[#FFD9C4] bg-white p-5 sm:p-6 shadow-[0_2px_10px_rgba(255,102,0,0.04)] hover:shadow-[0_12px_24px_rgba(255,102,0,0.12)] hover:border-[#FF6600] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6600] to-[#FFA066] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="flex items-start gap-3.5">
                                        <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 text-[#FF6600] flex items-center justify-center shrink-0 group-hover:bg-[#FF6600] group-hover:text-white transition-all duration-300 shadow-sm">
                                            <Sparkles size={20} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0f172a] group-hover:text-[#FF6600] transition-colors leading-tight">
                                                {stat.value}
                                            </div>
                                            <div className="mt-1 text-sm font-bold text-[#1e293b]">
                                                {stat.label}
                                            </div>
                                            <div className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                                                {stat.desc}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* === 2. DETAILED OVERVIEW === */}
                <section aria-label="Aarambh Overview">
                    <div className="rounded-xl border border-[#FFD9C4] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_4px_16px_rgba(255,102,0,0.05)] space-y-6">
                        <div className="flex items-center gap-3 pb-3 border-b border-[#FFD9C4]/60">
                            <span className="h-6 w-1.5 rounded-full bg-[#FF6600]" />
                            <div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
                                    AARAMBH <span className="text-[#FF6600]">(Orientation Day to Freshers)</span>
                                </h2>
                                <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                                    Welcoming new engineering inductees into the SRIT academic journey
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#334155]">
                            {activeSection.overview && activeSection.overview.map((para, i) => (
                                <p
                                    key={i}
                                    className={`text-left sm:text-justify ${
                                        i === (activeSection.overview?.length || 1) - 1
                                            ? 'p-4 sm:p-5 rounded-xl border border-[#FFD9C4] bg-[#FFFAF6] text-[#0f172a] font-medium'
                                            : ''
                                    }`}
                                >
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === 3. OFFICIAL ACCORDION: YEAR WISE EVENT REPORTS === */}
                <section aria-label="Year Wise Event Reports">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 px-1">
                            <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                            <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
                                Event Documentation &amp; Archival Reports
                            </h2>
                        </div>

                        <AccordionContainer className="w-full">
                            <DepartmentAccordionRow
                                id="aarambh-reports"
                                index={0}
                                title={
                                    <span className="flex items-center gap-2">
                                        <FileSpreadsheet className="h-4 w-4 text-[#FF6600] shrink-0" />
                                        <span>Year Wise Event Reports</span>
                                    </span>
                                }
                                isOpen={isAarambhReportsOpen}
                                onToggle={() => setIsAarambhReportsOpen(!isAarambhReportsOpen)}
                            >
                                <div className="p-3 sm:p-5 bg-white">
                                    <div className="mb-3 flex items-center justify-between text-xs text-neutral-500 px-1">
                                        <span>Official orientation attendance, session itineraries, and event outcomes.</span>
                                        <span className="hidden sm:inline-flex items-center gap-1 text-[#FF6600] font-semibold">
                                            Institutional Records
                                        </span>
                                    </div>
                                    <div className="w-full h-[800px] rounded-xl overflow-hidden border border-[#FFD9C4] bg-white shadow-inner">
                                        <IframeWithLoader
                                            title="AARAMBH Year Wise Event Reports Sheet"
                                            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQidYgY6LYEYXIOVSrNnWNEtWzRUQyc9DXen7BjhxCMCuQQILIhp0pKX7cvLhLT81kiolmFP_2y6gUr/pubhtml?widget=true&headers=false"
                                            className="w-full h-full border-0"
                                            loading="lazy"
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

export default AarambhPage;
