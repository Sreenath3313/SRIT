import React, { useState } from 'react';
import {
    ChevronRight, Phone, ChevronUp, ChevronDown
} from 'lucide-react';
import CampusLifeLayout from './CampusLifeLayout';
import { campusLifeSections } from './types';
import IframeWithLoader from '../../../components/common/IframeWithLoader';
import { AccordionContainer, DepartmentAccordionRow } from '../../../components/common/DepartmentAccordion';

export const SportsPage: React.FC = () => {
    const [isSportsVisionOpen, setIsSportsVisionOpen] = useState(false);

    const [isSportsTeamSheetOpen, setIsSportsTeamSheetOpen] = useState(false);
    const [isSportsAchievementsOpen, setIsSportsAchievementsOpen] = useState(false);
    const [isSportsContactOpen, setIsSportsContactOpen] = useState(false);
    const activeSection = campusLifeSections.find((s) => s.id === 'sports') || campusLifeSections[0];

    return (
        <CampusLifeLayout activeSectionId="sports">
            <>

                                {/* === 2. ABOUT SPORTS ARENA (Side-by-Side: Text Left + Explore Button, Image Right) === */}
                                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm relative overflow-hidden">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                        <div className="lg:col-span-7 space-y-3.5">
                                            <div className="flex items-center gap-2.5 pb-2">
                                                <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-tight">
                                                    Every champion was once a contender that <span className="text-[#FF6600]">refused to give up.</span>
                                                </h2>
                                            </div>

                                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify pt-1">
                                                Sport is an integral part of the curriculum. Various sports facility is provided to the students within the campus. The college is committed to create a balanced atmosphere of academic, cultural and sports activities for the overall personality development of its students. Various sports competitions such as inter departmental, Inter collegiate, Inter University, etc help in developing team spirit in students. Sports and games help the students to improve their interpersonal relationship am in healthy manner. Talented students are honored with medals, trophies and certificates.
                                            </p>

                                            <div className="pt-2 flex flex-wrap items-center gap-3">


                                                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-600">
                                                    <span className="px-2.5 py-1 rounded-md bg-orange-50 text-[#FF6600] border border-orange-200">
                                                        Floodlit Hardcourt
                                                    </span>
                                                    <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                                        25+ Acre Arena
                                                    </span>
                                                    <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                                        JNTUA Competitors
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-5 self-stretch flex flex-col min-h-[280px]">
                                            <div className="rounded-xl overflow-hidden border-2 border-orange-200/90 shadow-md bg-orange-50/20 group relative flex-1 w-full min-h-[280px]">
                                                <img
                                                    src="https://www.srit.ac.in/wp-content/uploads/2021/05/Sports-img.jpg"
                                                    alt="SRIT Sports"
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/optimized/BasketBall.webp.webp';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>




                                {/* === 5. OFFICIAL ACCORDIONS: VISION, MISSION, COMMITTEE, TEAM & ACHIEVEMENTS === */}
                                <section aria-label="Sports Administration & Records" className="space-y-3 w-full">
                                    <div className="flex items-center gap-3 px-1">
                                        <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                        <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
                                            Sports Administration, Committees &amp; Records
                                        </h2>
                                    </div>

                                    <AccordionContainer className="w-full">
                                        {/* 1. Vision & Mission Accordion */}
                                        <DepartmentAccordionRow
                                            id="sports-vision"
                                            index={0}
                                            title="Our Vision & Mission"
                                            isOpen={isSportsVisionOpen}
                                            onToggle={() => setIsSportsVisionOpen(!isSportsVisionOpen)}
                                        >
                                            <div className="p-5 sm:p-6 bg-white space-y-4">
                                                <div className="p-4 sm:p-5 rounded-xl border border-[#FFD9C4] bg-[#FFFAF6]">
                                                    <h4 className="font-bold text-sm text-[#FF6600] mb-1.5 uppercase tracking-wide">
                                                        Vision Statement
                                                    </h4>
                                                    <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                                                        We endeavor to become the leading voice at the intersection of athletics and academics. We hope to use this voice to unite, challenge and inspire the next generation of leaders to improve lives of athletes and to act as stewards of the best practices in the sports industry as a whole.
                                                    </p>
                                                </div>
                                                <div className="p-4 sm:p-5 rounded-xl border border-[#FFD9C4] bg-[#FFFAF6]">
                                                    <h4 className="font-bold text-sm text-[#FF6600] mb-1.5 uppercase tracking-wide">
                                                        Mission Statement
                                                    </h4>
                                                    <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                                                        Advance cutting-edge sports-specific research, educate current and future sports professionals, improve the physical and emotional lives of current and former athletes, and harness the power of sport to inspire positive social change.
                                                    </p>
                                                </div>
                                            </div>
                                        </DepartmentAccordionRow>

                                        {/* 2. Team Live Spreadsheet Accordion */}
                                        <DepartmentAccordionRow
                                            id="sports-committee"
                                            index={1}
                                            title="Games & Sports Cell Committee"
                                            isOpen={isSportsTeamSheetOpen}
                                            onToggle={() => setIsSportsTeamSheetOpen(!isSportsTeamSheetOpen)}
                                        >
                                            <div className="p-3 sm:p-5 bg-white w-full">
                                                <div className="w-full h-[800px] rounded-xl overflow-hidden border border-[#FFD9C4] bg-white shadow-inner">
                                                    <IframeWithLoader
                                                        title="Games & Sports Cell Committee Official Sheet"
                                                        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQZpbEuOe5scEiNw9980WFDkbNNMXDULWIW0FYSciGKSXolKmdHXBdCIp-Ijp1BoardaE-_F3-CGImR/pubhtml?widget=true&headers=false"
                                                        className="w-full h-full border-0"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </div>
                                        </DepartmentAccordionRow>

                                        {/* 3. Achievements Accordion */}
                                        <DepartmentAccordionRow
                                            id="sports-achievements"
                                            index={2}
                                            title="Achievements (Official Sheet)"
                                            isOpen={isSportsAchievementsOpen}
                                            onToggle={() => setIsSportsAchievementsOpen(!isSportsAchievementsOpen)}
                                        >
                                            <div className="p-3 sm:p-5 bg-white space-y-4">
                                                <div className="w-full h-[800px] rounded-xl overflow-hidden border border-[#FFD9C4] bg-white shadow-inner">
                                                    <IframeWithLoader
                                                        title="SRIT Sports Achievements Official Sheet"
                                                        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT_leu0LTIB1htSZkwy7UnfP1sy8HKs3ebxgw4-GJoMdbc3h6rkVk_KEV5MYwHSmfTG8qXT9NEWByxu/pubhtml?widget=true&headers=false"
                                                        className="w-full h-full border-0"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </div>
                                        </DepartmentAccordionRow>

                                        {/* 4. Contact Us Accordion */}
                                        <DepartmentAccordionRow
                                            id="sports-contact"
                                            index={3}
                                            title="Contact Physical Directors"
                                            isOpen={isSportsContactOpen}
                                            onToggle={() => setIsSportsContactOpen(!isSportsContactOpen)}
                                        >
                                            {activeSection.contacts && (
                                                <div className="p-5 sm:p-6 bg-white space-y-4">
                                                    <div className="grid sm:grid-cols-2 gap-3.5">
                                                        {activeSection.contacts.map((c, ci) => (
                                                            <div
                                                                key={ci}
                                                                className="rounded-xl border border-[#FFD9C4] bg-[#FFFAF6] p-4 space-y-2 hover:border-[#FF6600] transition-colors"
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-[10px] font-bold text-[#FF6600] uppercase tracking-wider">
                                                                        {c.role}
                                                                    </span>
                                                                    <span className="text-[11px] font-semibold text-neutral-500">
                                                                        SRIT Ananthapuramu
                                                                    </span>
                                                                </div>
                                                                <h5 className="font-bold text-sm text-[#0f172a]">
                                                                    {c.name}
                                                                </h5>
                                                                <div className="pt-1 flex flex-wrap gap-2 text-xs">
                                                                    {c.phone && (
                                                                        <a
                                                                            href={`tel:${c.phone}`}
                                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#FFD9C4] text-[#0f172a] hover:bg-[#FF6600] hover:text-white transition-colors font-medium shadow-sm"
                                                                        >
                                                                            <Phone size={12} />
                                                                            <span>{c.phone}</span>
                                                                        </a>
                                                                    )}
                                                                    {c.email && (
                                                                        <a
                                                                            href={`mailto:${c.email}`}
                                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#FFD9C4] text-[#0f172a] hover:bg-[#FF6600] hover:text-white transition-colors font-medium shadow-sm"
                                                                        >
                                                                            <span>{c.email}</span>
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </DepartmentAccordionRow>
                                    </AccordionContainer>
                                </section>
                            </>
        </CampusLifeLayout>
    );
};

export default SportsPage;
