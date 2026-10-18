import React, { useState } from 'react';
import {
    ChevronRight, ChevronLeft, ChevronUp, ChevronDown
} from 'lucide-react';
import CampusLifeLayout from './CampusLifeLayout';
import CampusDrivesSection from '../../../components/campus-life/CampusDrivesSection';

export const CampusDrivesPage: React.FC = () => {
    const [isDrivesAccordionOpen, setIsDrivesAccordionOpen] = useState(false);
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

                                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                                The <strong className="text-[#FF6600] font-bold">Training &amp; Placement (T&amp;P) Cell</strong> at Srinivasa Ramanujan Institute of Technology acts as a pivotal interface connecting aspiring engineering students with <span className="text-[#FF6600] font-semibold">premier multinational corporations</span>, product engineering giants, and core manufacturing organizations.
                                            </p>

                                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                                SRIT provides a structured <strong className="text-[#FF6600] font-semibold">360-degree Career Development program</strong> starting right from the second year of study. This includes rigorous <span className="text-[#FF6600] font-semibold">Campus Recruitment Training (CRT)</span> encompassing quantitative aptitude, logical reasoning, verbal communication, <span className="text-[#FF6600] font-semibold">full-stack programming bootcamps</span> (Data Structures, Algorithms, Cloud Computing, AI/ML), and corporate mock interview clinics.
                                            </p>

                                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
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



                                {/* === 6. OFFICIAL CAMPUS DRIVES COMPONENT === */}
                                <CampusDrivesSection />
                            </>
        </CampusLifeLayout>
    );
};

export default CampusDrivesPage;
