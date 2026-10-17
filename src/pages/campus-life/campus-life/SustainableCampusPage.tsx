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
    const [isSustainableViewAll, setIsSustainableViewAll] = useState(false);
    const [sustainableGalleryIndex, setSustainableGalleryIndex] = useState(0);

    return (
        <CampusLifeLayout activeSectionId="sustainable-campus">
            <>

                                {/* === 2. ABOUT SUSTAINABLE CAMPUS (Side-by-Side: Text Left + Explore Button, Image Right) === */}
                                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm relative overflow-hidden">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                        <div className="lg:col-span-7 space-y-3.5">
                                            <div className="flex items-center gap-2.5 pb-1">
                                                <span className="h-5 w-1.5 rounded-full bg-[#FF5422]" />
                                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                                    About <span className="text-[#FF5422]">Sustainable &amp; Green Campus</span>
                                                </h2>
                                            </div>

                                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                                <strong className="text-[#FF5422] font-bold">Srinivasa Ramanujan Institute of Technology</strong> is deeply committed to environmental conservation, renewable energy adoption, and sustainable development across its <strong className="text-[#FF5422] font-bold">25+ acre eco-friendly sanctuary</strong>.
                                            </p>

                                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                                Key milestones include extensive rooftop <strong className="text-[#FF5422] font-bold">Solar Photovoltaic Energy (50.40 kWp + 50.24 kWp)</strong> systems supplying clean, green power and significantly reducing institutional carbon footprints.
                                            </p>

                                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                                SRIT conducts comprehensive <span className="text-[#FF5422] font-semibold">environmental &amp; green audits</span>, maintains hundreds of indigenous trees, practices <span className="text-[#FF5422] font-semibold">rainwater harvesting</span>, implements solid waste segregation, and enforces a strict <strong className="text-[#FF5422] font-bold">plastic-free campus policy</strong>.
                                            </p>

                                            <div className="pt-2 flex flex-wrap items-center gap-3">
                                                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-600">
                                                    <span className="px-2.5 py-1 rounded-md bg-orange-50 text-[#FF5422] border border-orange-200">
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
                                                        <span className="w-2 h-2 rounded-full bg-[#FF5422] shrink-0" />
                                                        Institutional Green &amp; Energy Audit Report
                                                    </h4>
                                                    <p className="text-xs text-neutral-600 leading-relaxed">
                                                        Comprehensive institutional audit records certifying renewable energy generation, energy conservation parameters, and compliance with statutory green campus frameworks.
                                                    </p>
                                                </div>
                                                <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70">
                                                    <h4 className="font-bold text-sm text-neutral-900 mb-1 flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-[#FF5422] shrink-0" />
                                                        Environment &amp; Water Conservation Audit
                                                    </h4>
                                                    <p className="text-xs text-neutral-600 leading-relaxed">
                                                        Institutional environmental evaluation confirming 100% surface rainwater recharging, zero hazardous emissions, and strict single-use plastic ban across campus.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </DepartmentAccordionRow>
                                </AccordionContainer>

                                {/* === 6. PHOTO GALLERY === */}
                                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                                        <div className="flex items-center gap-2.5">
                                            <span className="h-5 w-1.5 rounded-full bg-[#FF5422]" />
                                            <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                                Solar Infrastructure &amp; Green Campus Gallery
                                            </h2>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsSustainableViewAll(!isSustainableViewAll)}
                                            className="px-3.5 py-1 rounded-full text-xs font-bold text-[#FF5422] bg-orange-50 border border-orange-200 hover:bg-[#FF5422] hover:text-white transition-all cursor-pointer"
                                        >
                                            {isSustainableViewAll ? 'Show Carousel' : 'View All 5 Photos'}
                                        </button>
                                    </div>

                                    {isSustainableViewAll ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {[
                                                { url: '/optimized/College 2.JPG.webp', caption: 'Sustainable Campus Grounds' },
                                                { url: '/optimized/solar/image2.jpg.webp', caption: 'Solar Infrastructure View' },
                                                { url: '/optimized/solar/image3.png.webp', caption: 'Campus Solar Energy System' },
                                                { url: '/optimized/solar/image4.jpg.webp', caption: 'Rooftop Solar Array' },
                                                { url: '/optimized/Campus.JPG.webp', caption: 'Lush Green Environment' },
                                            ].map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className="group rounded-xl overflow-hidden border border-neutral-200/90 bg-orange-50/20 shadow-sm hover:shadow-md hover:border-[#FF5422]/60 transition-all duration-300"
                                                >
                                                    <div className="relative aspect-[16/11] w-full overflow-hidden">
                                                        <img
                                                            src={img.url}
                                                            alt={img.caption}
                                                            loading="lazy"
                                                            decoding="async"
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = '/optimized/Campus.JPG.webp';
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="relative px-2 py-1">
                                            <button
                                                type="button"
                                                onClick={() => setSustainableGalleryIndex((prev) => (prev <= 0 ? 2 : prev - 1))}
                                                className="absolute -left-2.5 sm:-left-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-800 hover:text-white hover:bg-[#FF5422] hover:border-[#FF5422] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                                                aria-label="Previous image"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {[
                                                    { url: '/optimized/College 2.JPG.webp', caption: 'Sustainable Campus Grounds' },
                                                    { url: '/optimized/solar/image2.jpg.webp', caption: 'Solar Infrastructure View' },
                                                    { url: '/optimized/solar/image3.png.webp', caption: 'Campus Solar Energy System' },
                                                    { url: '/optimized/solar/image4.jpg.webp', caption: 'Rooftop Solar Array' },
                                                    { url: '/optimized/Campus.JPG.webp', caption: 'Lush Green Environment' },
                                                ]
                                                    .slice(sustainableGalleryIndex, sustainableGalleryIndex + 3)
                                                    .map((img, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="group rounded-xl border-2 border-orange-200/90 overflow-hidden bg-orange-50/20 shadow-sm hover:shadow-lg hover:border-[#FF5422] transition-all duration-300 relative"
                                                        >
                                                            <div className="relative aspect-[16/11] w-full overflow-hidden">
                                                                <img
                                                                    src={img.url}
                                                                    alt={img.caption}
                                                                    loading="lazy"
                                                                    decoding="async"
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                                    onError={(e) => {
                                                                        (e.target as HTMLImageElement).src = '/optimized/Campus.JPG.webp';
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => setSustainableGalleryIndex((prev) => (prev >= 2 ? 0 : prev + 1))}
                                                className="absolute -right-2.5 sm:-right-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-800 hover:text-white hover:bg-[#FF5422] hover:border-[#FF5422] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                                                aria-label="Next image"
                                            >
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
        </CampusLifeLayout>
    );
};

export default SustainableCampusPage;
