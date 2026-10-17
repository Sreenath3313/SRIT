import React, { useState } from 'react';

import CampusLifeLayout from './CampusLifeLayout';
import { campusLifeSections } from './types';

export const InternetPage: React.FC = () => {
    const [isInternetViewAll, setIsInternetViewAll] = useState(false);

    const activeSection = campusLifeSections.find((s) => s.id === 'internet') || campusLifeSections[0];

    return (
        <CampusLifeLayout activeSectionId="internet">
            <>
                {/* === 2. ABOUT INTERNET & WI-FI (Side-by-Side: Text Left + Explore Button, Image Right) === */}
                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        <div className="lg:col-span-7 space-y-3.5">
                            <div className="flex items-center gap-2.5 pb-1">
                                <span className="h-5 w-1.5 rounded-full bg-[#FF5422]" />
                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                    About <span className="text-[#FF5422]">Internet &amp; Wi-Fi Facilities</span>
                                </h2>
                            </div>

                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                SRIT is equipped with a high-speed dedicated <strong className="text-[#FF5422] font-bold">80 Mbps Leased Line</strong> internet connection provided under the <span className="text-[#FF5422] font-semibold">NMEICT program by MHRD, Government of India</span>.
                            </p>

                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                Over <strong className="text-[#FF5422] font-bold">200+ high-performance computer systems</strong> across centralized computing labs, digital library hubs, and department labs are fully networked with high-speed internet.
                            </p>

                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                A secure, high-capacity <strong className="text-[#FF5422] font-bold">campus-wide Wi-Fi network</strong> enables students and faculty to access academic resources seamlessly across all blocks, with specialized <span className="text-[#FF5422] font-semibold">evening browsing access from 5:00 PM to 9:00 PM</span> in hostels.
                            </p>

                            {/* Feature Badges & Action Button */}
                            <div className="pt-2 flex flex-wrap items-center gap-3">
                                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-600">
                                    <span className="px-2.5 py-1 rounded-md bg-orange-50 text-[#FF5422] border border-orange-200">
                                        80 Mbps Leased Line
                                    </span>
                                    <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                        NMEICT MHRD Supported
                                    </span>
                                    <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                        24/7 Redundant Fiber
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 self-stretch flex flex-col justify-center min-h-[260px]">
                            <div className="rounded-xl overflow-hidden border-2 border-orange-200/90 shadow-md bg-gradient-to-br from-white via-orange-50/40 to-orange-100/30 group relative flex-1 w-full min-h-[260px] flex items-center justify-center p-2">
                                <img
                                    src="https://www.srit.ac.in/wp-content/uploads/2021/05/internet-img.jpg"
                                    alt="SRIT Internet & Campus Network Infrastructure"
                                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/optimized/Campus.JPG.webp';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>



                                {/* === 5. SPECIFICATIONS TABLE === */}
                                {activeSection.tableData && (
                                    <div className="rounded-xl border-2 border-orange-200/90 bg-white overflow-hidden shadow-sm">
                                        <div className="bg-gradient-to-r from-[#111827] via-[#1c1412] to-[#2b1610] px-5 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-white border-b-2 border-[#FF5422]">
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5422] shadow-[0_0_8px_#FF5422]" />
                                                <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-tight">
                                                    {activeSection.tableData.title}
                                                </h3>
                                            </div>
                                            <span className="text-xs font-bold text-orange-300 bg-[#FF5422]/20 px-3 py-1 rounded-full border border-[#FF5422]/40">
                                                Official Specifications
                                            </span>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-xs sm:text-sm border-collapse">
                                                <thead>
                                                    <tr className="bg-neutral-100 text-neutral-900 border-b border-neutral-200">
                                                        {activeSection.tableData.headers.map((h, hi) => (
                                                            <th key={hi} className="px-4 py-3.5 font-bold">{h}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-orange-100/80 text-neutral-700">
                                                    {activeSection.tableData.rows.map((row, ri) => (
                                                        <tr key={ri} className="hover:bg-orange-50/50 transition-colors odd:bg-white even:bg-orange-50/20">
                                                            <td className="px-4 py-3.5 font-bold text-neutral-900">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5422]" />
                                                                    <span>{row[0]}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3.5 font-bold text-[#FF5422] whitespace-nowrap">
                                                                {row[1]}
                                                            </td>
                                                            <td className="px-4 py-3.5 text-neutral-600">
                                                                {row[2]}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* === 6. PHOTO GALLERY === */}
                                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                                        <div className="flex items-center gap-2.5">
                                            <span className="h-5 w-1.5 rounded-full bg-[#FF5422]" />
                                            <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                                Internet &amp; Network Infrastructure Gallery
                                            </h2>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsInternetViewAll(!isInternetViewAll)}
                                            className="px-3.5 py-1 rounded-full text-xs font-bold text-[#FF5422] bg-orange-50 border border-orange-200 hover:bg-[#FF5422] hover:text-white transition-all cursor-pointer"
                                        >
                                            {isInternetViewAll ? 'Show Carousel' : 'View All Photos'}
                                        </button>
                                    </div>

                                    {isInternetViewAll ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {[
                                                { url: '/optimized/cse_lab.png.webp', caption: 'High-Speed Internet Connected CSE Laboratory' },
                                                { url: '/optimized/ComputerLab.webp.webp', caption: 'Campus Central Computer Centre' },
                                                { url: '/optimized/csm_lab.png.webp', caption: 'Dedicated Student Browsing & Learning Hub' },
                                            ].map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className="group rounded-xl overflow-hidden border border-orange-200/80 bg-white shadow-sm hover:shadow-lg hover:border-[#FF5422] hover:-translate-y-1 transition-all duration-300"
                                                >
                                                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-orange-50/30 flex items-center justify-center p-2">
                                                        <img
                                                            src={img.url}
                                                            alt={img.caption}
                                                            loading="lazy"
                                                            decoding="async"
                                                            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
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
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {[
                                                    { url: '/optimized/cse_lab.png.webp', caption: 'High-Speed Internet Connected CSE Laboratory' },
                                                    { url: '/optimized/ComputerLab.webp.webp', caption: 'Campus Central Computer Centre' },
                                                    { url: '/optimized/csm_lab.png.webp', caption: 'Dedicated Student Browsing & Learning Hub' },
                                                ].map((img, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="group rounded-xl border-2 border-orange-200/90 overflow-hidden bg-white shadow-sm hover:shadow-lg hover:border-[#FF5422] transition-all duration-300 relative"
                                                    >
                                                        <div className="relative aspect-[16/11] w-full overflow-hidden bg-orange-50/20 flex items-center justify-center p-2">
                                                            <img
                                                                src={img.url}
                                                                alt={img.caption}
                                                                loading="lazy"
                                                                decoding="async"
                                                                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).src = '/optimized/Campus.JPG.webp';
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
        </CampusLifeLayout>
    );
};

export default InternetPage;
