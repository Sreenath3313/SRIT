import React, { useState } from 'react';

import CampusLifeLayout from './CampusLifeLayout';

export const ComputerCenterPage: React.FC = () => {
    return (
        <CampusLifeLayout activeSectionId="computer-center">
            <>

                                {/* === 2. ABOUT COMPUTER CENTER (Side-by-Side: Text Left, Image Right) === */}
                                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm relative overflow-hidden">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                        <div className="lg:col-span-7 space-y-3.5">
                                            <div className="flex items-center gap-2.5 pb-1">
                                                <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                                    About <span className="text-[#FF6600]">Central Computer Center</span>
                                                </h2>
                                            </div>

                                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                                The <strong className="text-[#FF6600] font-bold">Central Computer Center</strong> at SRIT serves as the core computational facility for the entire institution, supporting <span className="text-[#FF6600] font-semibold">campus-wide online examinations</span>, competitive programming, skill certifications, and faculty research.
                                            </p>

                                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                                Equipped with over <strong className="text-[#FF6600] font-bold">300+ high-performance desktop workstations</strong>, structured <span className="text-[#FF6600] font-semibold">gigabit fiber connectivity</span>, centralized server blades, and enterprise software licenses, the Center caters to all academic departments simultaneously.
                                            </p>

                                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                                The Computer Center is an authorized venue for national competitive exams, campus recruitment assessments (<span className="text-[#FF6600] font-semibold">TCS, Infosys, Cognizant</span>), <span className="text-[#FF6600] font-semibold">NPTEL online examinations</span>, and 24-hour collegiate hackathons.
                                            </p>

                                            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-600">
                                                <span className="px-2.5 py-1 rounded-md bg-orange-50 text-[#FF6600] border border-orange-200">
                                                    300+ High-End PCs
                                                </span>
                                                <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                                    Gigabit LAN Backbone
                                                </span>
                                                <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                                    Authorized Exam Venue
                                                </span>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-5 self-stretch flex flex-col min-h-[280px]">
                                            <div className="rounded-xl overflow-hidden border-2 border-orange-200/90 shadow-md bg-orange-50/20 group relative flex-1 w-full min-h-[280px]">
                                                <img
                                                    src="/optimized/ComputerLab.webp.webp"
                                                    alt="Central Computer Center & Online Examination Hub"
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/optimized/Campus.JPG.webp';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
        </CampusLifeLayout>
    );
};

export default ComputerCenterPage;
