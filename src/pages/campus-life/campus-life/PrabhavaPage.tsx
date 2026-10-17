import React, { useState } from 'react';
import { Sparkles, FileSpreadsheet } from 'lucide-react';
import CampusLifeLayout from './CampusLifeLayout';
import { campusLifeSections } from './types';
import IframeWithLoader from '../../../components/common/IframeWithLoader';
import { AccordionContainer, DepartmentAccordionRow } from '../../../components/common/DepartmentAccordion';

export const PrabhavaPage: React.FC = () => {
    const [isPrabhavaReportsOpen, setIsPrabhavaReportsOpen] = useState(false);

    const activeSection = campusLifeSections.find((s) => s.id === 'prabhava') || campusLifeSections[0];

    return (
        <CampusLifeLayout activeSectionId="prabhava">
            <div className="space-y-8 sm:space-y-10 w-full">
                {/* === 1. DETAILED OVERVIEW === */}
                <section aria-label="Prabhava Overview">
                    <div className="rounded-xl border border-[#FFD9C4] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_4px_16px_rgba(255,102,0,0.05)] space-y-6">
                        <div className="flex items-center gap-3 pb-3 border-b border-[#FFD9C4]/60">
                            <span className="h-6 w-1.5 rounded-full bg-[#FF6600]" />
                            <div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
                                    PRABHAVA <span className="text-[#FF6600]">(Freshers Day Celebrations)</span>
                                </h2>
                                <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                                    Annual cultural extravaganza welcoming newly enrolled students into the campus community
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

                {/* === 2. OFFICIAL ACCORDION: YEAR WISE EVENT REPORTS === */}
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
                                id="prabhava-reports"
                                index={0}
                                title={
                                    <span className="flex items-center gap-2">
                                        <FileSpreadsheet className="h-4 w-4 text-[#FF6600] shrink-0" />
                                        <span>Year Wise Event Reports</span>
                                    </span>
                                }
                                isOpen={isPrabhavaReportsOpen}
                                onToggle={() => setIsPrabhavaReportsOpen(!isPrabhavaReportsOpen)}
                            >
                                <div className="p-3 sm:p-5 bg-white">
                                    <div className="mb-3 flex items-center justify-between text-xs text-neutral-500 px-1">
                                        <span>Official event proceedings, cultural highlights, and archival records.</span>
                                        <span className="hidden sm:inline-flex items-center gap-1 text-[#FF6600] font-semibold">
                                            Institutional Records
                                        </span>
                                    </div>
                                    <div className="w-full h-[800px] rounded-xl overflow-hidden border border-[#FFD9C4] bg-white shadow-inner">
                                        <IframeWithLoader
                                            title="PRABHAVA Year Wise Event Reports Sheet"
                                            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSE33k0xRqXtvcdZErGoYQUN1taILxPEYXKVXvQEoUDUS08UaytBYucijczFkYYjKCTixtgnRtkzGdg/pubhtml?widget=true&headers=false"
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

export default PrabhavaPage;
