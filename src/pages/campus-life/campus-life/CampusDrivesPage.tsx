import React, { useState } from 'react';
import {
    ChevronRight, ChevronLeft, ChevronUp, ChevronDown
} from 'lucide-react';
import IframeWithLoader from '../../../components/common/IframeWithLoader';
import CampusLifeLayout from './CampusLifeLayout';
import { AccordionContainer, DepartmentAccordionRow } from '../../../components/common/DepartmentAccordion';

export const CampusDrivesPage: React.FC = () => {
    const [isDrivesAccordionOpen, setIsDrivesAccordionOpen] = useState(false);
    const [isDrivesViewAll, setIsDrivesViewAll] = useState(false);
    const [drivesGalleryIndex, setDrivesGalleryIndex] = useState(0);

    return (
        <CampusLifeLayout activeSectionId="campus-drives">
            <>

                                {/* === 2. ABOUT CAMPUS DRIVES & ECOSYSTEM (Side-by-Side: Text Left + Explore Button, Image Right) === */}
                                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm relative overflow-hidden">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                        {/* Left Column */}
                                        <div className="lg:col-span-7 space-y-3.5">
                                            <div className="flex items-center gap-2.5 pb-1">
                                                <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                                    About <span className="text-[#FF6600]">Campus Drives &amp; Training Ecosystem</span>
                                                </h2>
                                            </div>

                                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                                The <strong className="text-[#FF6600] font-bold">Training &amp; Placement (T&amp;P) Cell</strong> at Srinivasa Ramanujan Institute of Technology acts as a pivotal interface connecting aspiring engineering students with <span className="text-[#FF6600] font-semibold">premier multinational corporations</span>, product engineering giants, and core manufacturing organizations.
                                            </p>

                                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                                SRIT provides a structured <strong className="text-[#FF6600] font-semibold">360-degree Career Development program</strong> starting right from the second year of study. This includes rigorous <span className="text-[#FF6600] font-semibold">Campus Recruitment Training (CRT)</span> encompassing quantitative aptitude, logical reasoning, verbal communication, <span className="text-[#FF6600] font-semibold">full-stack programming bootcamps</span> (Data Structures, Algorithms, Cloud Computing, AI/ML), and corporate mock interview clinics.
                                            </p>

                                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                                Prominent global recruiters conducting regular on-campus and off-campus recruitment drives include <strong className="text-[#FF6600] font-bold">Tata Consultancy Services (78+ selects up to ₹9.08 LPA in TCS Prime)</strong>, Cognizant, Infosys, Tech Mahindra, Nokia, Virtusa, <strong className="text-[#FF6600] font-semibold">Contentstack (₹15 LPA)</strong>, DeltaX (₹7 LPA), SOTI (₹7.5 LPA), Autorabit (₹60k/mo), Enterpret (₹70k–1.2L/mo stipend), TVS Credit, Reliance Industries, Jindal Steel, and Asahi India Glass.
                                            </p>

                                            {/* Feature Badges */}
                                            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-600">
                                                <span className="px-2.5 py-1 rounded-md bg-orange-50 text-[#FF6600] border border-orange-200">
                                                    TCS Prime Partner
                                                </span>
                                                <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                                    Multi-Tier CRT Training
                                                </span>
                                                <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                                    100% Placement Assistance
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right Column: SRIT Placement & Computing Facility Image Card */}
                                        <div className="lg:col-span-5 self-stretch flex flex-col min-h-[280px]">
                                            <div className="rounded-xl overflow-hidden border-2 border-orange-200/90 shadow-md bg-orange-50/20 group relative flex-1 w-full min-h-[280px]">
                                                <img
                                                    src="/optimized/ComputerLab.JPG.webp"
                                                    alt="SRIT Campus Recruitment & Advanced Computing Center"
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/optimized/Campus.JPG.webp';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                {/* === 6. OFFICIAL SPREADSHEET ACCORDION === */}
                                <section aria-label="Official Campus Drives Records" className="space-y-3 w-full">
                                    <div className="flex items-center gap-3 px-1">
                                        <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                        <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
                                            Official Campus Drives Records &amp; Data Tracker
                                        </h2>
                                    </div>

                                    <AccordionContainer className="w-full">
                                        <DepartmentAccordionRow
                                            id="campus-life-drives-tracker"
                                            index={0}
                                            title="Campus Drives (Official T&P Complete Records)"
                                            isOpen={isDrivesAccordionOpen}
                                            onToggle={() => setIsDrivesAccordionOpen(!isDrivesAccordionOpen)}
                                        >
                                            <div className="p-3 sm:p-5 bg-white">
                                                <div className="w-full h-[720px] sm:h-[820px] rounded-xl overflow-hidden border border-[#FFD9C4] bg-white shadow-inner">
                                                    <IframeWithLoader
                                                        title="SRIT Campus Drives Official Sheet"
                                                        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSrEMEyriU1V7vBqzLIwvb9xstWfCC2VAhliaPpXSmvJI0-oF7-98Jerl9sRkidHy5DqIdtw3ZFSndF/pubhtml?widget=true&headers=false"
                                                        className="w-full h-full border-0"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </div>
                                        </DepartmentAccordionRow>
                                    </AccordionContainer>
                                </section>

                                {/* === 8. PLACEMENT & RECRUITMENT PHOTO GALLERY (Slider & Modal) === */}
                                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                                        <div className="flex items-center gap-2.5">
                                            <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                            <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                                Campus Recruitment &amp; Placement Gallery
                                            </h2>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsDrivesViewAll(!isDrivesViewAll)}
                                            className="px-3.5 py-1 rounded-full text-xs font-bold text-[#FF6600] bg-orange-50 border border-orange-200 hover:bg-[#FF6600] hover:text-white transition-all cursor-pointer"
                                        >
                                            {isDrivesViewAll ? 'Show Carousel' : 'View All 6 Photos'}
                                        </button>
                                    </div>

                                    {isDrivesViewAll ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {[
                                                { url: '/optimized/ComputerLab.JPG.webp', caption: 'State-of-the-Art Online Assessment & Technical Labs' },
                                                { url: '/optimized/CollegeMain.jpg.webp', caption: 'SRIT Main Block - Campus Recruitment Entrance' },
                                                { url: '/digital_library.jpg', caption: 'High-Speed Digital Evaluation & Coding Hub' },
                                                { url: '/optimized/Campus.JPG.webp', caption: 'Vibrant 25+ Acre Academic Environment' },
                                                { url: '/optimized/College 1.jpg.webp', caption: 'Administrative Block & Corporate Discussion Suites' },
                                                { url: '/optimized/cse_lab.png.webp', caption: 'Advanced Computing & Project Development Center' },
                                            ].map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className="group rounded-xl overflow-hidden border border-neutral-200/90 bg-orange-50/30 shadow-sm hover:shadow-md hover:border-[#FF6600]/60 transition-all duration-300"
                                                >
                                                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-orange-50/30">
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
                                                onClick={() => setDrivesGalleryIndex((prev) => (prev <= 0 ? 3 : prev - 1))}
                                                className="absolute -left-2.5 sm:-left-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-800 hover:text-white hover:bg-[#FF6600] hover:border-[#FF6600] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                                                aria-label="Previous image"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {[
                                                    { url: '/optimized/ComputerLab.JPG.webp', caption: 'State-of-the-Art Online Assessment & Technical Labs' },
                                                    { url: '/optimized/CollegeMain.jpg.webp', caption: 'SRIT Main Block - Campus Recruitment Entrance' },
                                                    { url: '/digital_library.jpg', caption: 'High-Speed Digital Evaluation & Coding Hub' },
                                                    { url: '/optimized/Campus.JPG.webp', caption: 'Vibrant 25+ Acre Academic Environment' },
                                                    { url: '/optimized/College 1.jpg.webp', caption: 'Administrative Block & Corporate Discussion Suites' },
                                                    { url: '/optimized/cse_lab.png.webp', caption: 'Advanced Computing & Project Development Center' },
                                                ]
                                                    .slice(drivesGalleryIndex, drivesGalleryIndex + 3)
                                                    .map((img, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="group rounded-xl border-2 border-orange-200/90 overflow-hidden bg-orange-50/20 shadow-sm hover:shadow-lg hover:border-[#FF6600] transition-all duration-300 relative"
                                                        >
                                                            <div className="relative aspect-[16/11] w-full overflow-hidden bg-orange-50/20">
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
                                                onClick={() => setDrivesGalleryIndex((prev) => (prev >= 3 ? 0 : prev + 1))}
                                                className="absolute -right-2.5 sm:-right-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-800 hover:text-white hover:bg-[#FF6600] hover:border-[#FF6600] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
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

export default CampusDrivesPage;
