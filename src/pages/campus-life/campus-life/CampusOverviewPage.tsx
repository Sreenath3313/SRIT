import React from 'react';
import { useNavigate } from 'react-router-dom';
import CampusLifeLayout from './CampusLifeLayout';
import { campusLifeSections } from './types';

export const CampusOverviewPage: React.FC = () => {
    const navigate = useNavigate();
    const activeSection = campusLifeSections.find((s) => s.id === 'campus') || campusLifeSections[0];

    return (
        <CampusLifeLayout activeSectionId="campus">
            <div className="space-y-6 sm:space-y-8">
                {/* === ABOUT CAMPUS OVERVIEW (Side-by-Side with Orange Accents & Badges) === */}
                <div className="rounded-xl border border-neutral-200/70 bg-white p-5 sm:p-7 shadow-sm relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column: Descriptions & Highlights */}
                        <div className="lg:col-span-7 space-y-3.5">
                            <div className="flex items-center gap-2.5 pb-1">
                                <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                    About <span className="text-[#FF6600]">Campus Overview</span>
                                </h2>
                            </div>

                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                Established in <strong className="text-[#FF6600] font-bold">2008</strong> under the visionary leadership of <span className="text-[#FF6600] font-semibold">Sri Aluru Sambasiva Reddy</span> and managed by the <span className="text-[#FF6600] font-semibold">Smt. Aluru Narayanamma Memorial Educational Society</span>, <span className="text-[#FF6600] font-bold">Srinivasa Ramanujan Institute of Technology (SRIT)</span> is one of the premier technical institutions in Andhra Pradesh.
                            </p>

                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                Permanently affiliated to <span className="text-[#FF6600] font-semibold">JNTU Ananthapuramu</span> and approved by <span className="text-[#FF6600] font-semibold">AICTE, New Delhi</span>, SRIT has earned <span className="text-[#FF6600] font-bold">NAAC "A" Grade accreditation</span> and <span className="text-[#FF6600] font-bold">NBA accreditation</span> for its engineering programs. Located on the serene outskirts of <span className="text-[#FF6600] font-semibold">Rotarypuram Village, B.K. Samudram Mandal</span> in Ananthapuramu district, the campus offers a pristine, pollution-free atmosphere across <span className="text-[#FF6600] font-bold">25+ lush green acres</span> that is ideally conducive to higher learning, research, and innovation.
                            </p>

                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                The campus features <span className="text-[#FF6600] font-semibold">state-of-the-art academic blocks</span>, <span className="text-[#FF6600] font-semibold">smart multimedia classrooms</span>, <span className="text-[#FF6600] font-semibold">advanced engineering laboratories</span>, <span className="text-[#FF6600] font-semibold">high-speed campus-wide Wi-Fi</span>, modern auditoriums, extensive sports facilities, hygienic dining, residential hostels, and dedicated student activity hubs.
                            </p>

                            {/* Feature Tags */}
                            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-600">
                                <span className="px-2.5 py-1 rounded-sm bg-neutral-50 text-neutral-700 border border-neutral-200">
                                    25+ Acres Green Campus
                                </span>
                                <span className="px-2.5 py-1 bg-neutral-100 text-neutral-800 border border-neutral-200">
                                    NAAC "A" Grade Accredited
                                </span>
                                <span className="px-2.5 py-1 bg-neutral-100 text-neutral-800 border border-neutral-200">
                                    NBA Accredited Programs
                                </span>
                                <span className="px-2.5 py-1 bg-neutral-100 text-neutral-800 border border-neutral-200">
                                    Permanent JNTUA Affiliation
                                </span>
                                <span className="px-2.5 py-1 bg-neutral-100 text-neutral-800 border border-neutral-200">
                                    AICTE Approved Institution
                                </span>
                                <span className="px-2.5 py-1 bg-neutral-100 text-neutral-800 border border-neutral-200">
                                    Autonomous Status
                                </span>
                            </div>
                        </div>

                        {/* Right Column: Campus Main Image with Orange Frame & Hover Effect */}
                        <div className="lg:col-span-5 self-stretch flex flex-col min-h-[280px]">
                            <div className="group relative min-h-[280px] w-full flex-1 overflow-hidden bg-neutral-100">
                                <img
                                    src="/optimized/CollegeMain.jpg.webp"
                                    alt="SRIT Main Campus Building"
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/optimized/Campus.JPG.webp';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CampusLifeLayout>
    );
};

export default CampusOverviewPage;
