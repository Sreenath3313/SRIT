import React, { useState } from 'react';
import {
    ChevronRight, ChevronLeft,
    ChevronUp, ChevronDown
} from 'lucide-react';
import IframeWithLoader from '../../../components/common/IframeWithLoader';
import CampusLifeLayout from './CampusLifeLayout';
import { AccordionContainer, DepartmentAccordionRow } from '../../../components/common/DepartmentAccordion';

export const SustainableCampusPage: React.FC = () => {
    const [isSolarEnergyOpen, setIsSolarEnergyOpen] = useState(false);
    const [isSustainabilityReportsOpen, setIsSustainabilityReportsOpen] = useState(false);
    return (
        <CampusLifeLayout activeSectionId="sustainable-campus">
            <>

                                {/* === 2. ABOUT SUSTAINABLE CAMPUS (Side-by-Side: Text Left + Explore Button, Image Right) === */}
                                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm relative overflow-hidden">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                        <div className="lg:col-span-7 space-y-3.5">
                                            <div className="flex items-center gap-2.5 pb-1">
                                                <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                                    About <span className="text-[#FF6600]">Sustainable &amp; Green Campus</span>
                                                </h2>
                                            </div>

                                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                                <strong className="text-[#FF6600] font-bold">Srinivasa Ramanujan Institute of Technology</strong> is deeply committed to environmental conservation, renewable energy adoption, and sustainable development across its <strong className="text-[#FF6600] font-bold">25+ acre eco-friendly sanctuary</strong>.
                                            </p>

                                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                                Key milestones include extensive rooftop <strong className="text-[#FF6600] font-bold">Solar Photovoltaic Energy (50.40 kWp + 50.24 kWp)</strong> systems supplying clean, green power and significantly reducing institutional carbon footprints.
                                            </p>

                                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                                SRIT conducts comprehensive <span className="text-[#FF6600] font-semibold">environmental &amp; green audits</span>, maintains hundreds of indigenous trees, practices <span className="text-[#FF6600] font-semibold">rainwater harvesting</span>, implements solid waste segregation, and enforces a strict <strong className="text-[#FF6600] font-bold">plastic-free campus policy</strong>.
                                            </p>

                                            <div className="pt-2 flex flex-wrap items-center gap-3">
                                                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-600">
                                                    <span className="px-2.5 py-1 rounded-md bg-orange-50 text-[#FF6600] border border-orange-200">
                                                        100+ kWp Solar Power
                                                    </span>
                                                    <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                                        Rainwater Harvesting
                                                    </span>
                                                    <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                                        Zero Plastic Policy
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-5 self-stretch flex flex-col min-h-[280px]">
                                            <div className="rounded-xl overflow-hidden border-2 border-orange-200/90 shadow-md bg-orange-50/20 group relative flex-1 w-full min-h-[280px]">
                                                <img
                                                    src="/optimized/College.JPG.webp"
                                                    alt="Eco-Friendly, Landscaped Green Campus & Solar Infrastructure at SRIT"
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/optimized/Campus.JPG.webp';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>





                                {/* === 5. OFFICIAL ACCORDIONS: SOLAR ENERGY SPREADSHEET & AUDIT REPORTS === */}
                                <AccordionContainer className="w-full">
                                    <DepartmentAccordionRow
                                        id="solar-energy"
                                        index={0}
                                        title="Solar Energy Data"
                                        isOpen={isSolarEnergyOpen}
                                        onToggle={() => setIsSolarEnergyOpen(!isSolarEnergyOpen)}
                                    >
                                        <div className="p-3 sm:p-5 bg-white w-full">
                                            <div className="w-full h-[750px] sm:h-[820px] rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-inner">
                                                <IframeWithLoader
                                                    title="SRIT Solar Energy Data Official Sheet"
                                                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQuOYiWzEl6jy3tfGJuFG9_BN3gTOgiW-dNCc16_6jyLQk1DMdc9Ld8xSBKzyKSjXayy9JC07PWOCxf/pubhtml?widget=true&headers=false"
                                                    className="w-full h-full border-0"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    </DepartmentAccordionRow>

                                    <DepartmentAccordionRow
                                        id="institutional-audit-reports"
                                        index={1}
                                        title="Institutional Audit Reports"
                                        isOpen={isSustainabilityReportsOpen}
                                        onToggle={() => setIsSustainabilityReportsOpen(!isSustainabilityReportsOpen)}
                                    >
                                        <div className="p-5 sm:p-6 bg-white space-y-4">
                                            <div className="grid sm:grid-cols-2 gap-3.5">
                                                <div className="p-4 rounded-xl border border-orange-200/80 bg-orange-50/40">
                                                    <h4 className="font-bold text-sm text-neutral-900 mb-1 flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-[#FF6600] shrink-0" />
                                                        Institutional Green &amp; Energy Audit Report
                                                    </h4>
                                                    <p className="text-sm text-neutral-600 leading-relaxed">
                                                        Comprehensive institutional audit records certifying renewable energy generation, energy conservation parameters, and compliance with statutory green campus frameworks.
                                                    </p>
                                                </div>
                                                <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70">
                                                    <h4 className="font-bold text-sm text-neutral-900 mb-1 flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-[#FF6600] shrink-0" />
                                                        Environment &amp; Water Conservation Audit
                                                    </h4>
                                                    <p className="text-sm text-neutral-600 leading-relaxed">
                                                        Institutional environmental evaluation confirming 100% surface rainwater recharging, zero hazardous emissions, and strict single-use plastic ban across campus.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </DepartmentAccordionRow>
                                </AccordionContainer>
                            </>
        </CampusLifeLayout>
    );
};

export default SustainableCampusPage;
