import React, { useState } from 'react';
import {
    ChevronRight, ChevronLeft, Phone, ChevronUp, ChevronDown
} from 'lucide-react';
import CampusLifeLayout from './CampusLifeLayout';
import { campusLifeSections } from './types';
import IframeWithLoader from '../../../components/common/IframeWithLoader';
import { AccordionContainer, DepartmentAccordionRow } from '../../../components/common/DepartmentAccordion';

export const HostelsPage: React.FC = () => {
    const [isHostelTableOpen, setIsHostelTableOpen] = useState(false);
    const [isHostelViewAll, setIsHostelViewAll] = useState(false);
    const [hostelGalleryIndex, setHostelGalleryIndex] = useState(0);
    const [isGirlsHostelSheetOpen, setIsGirlsHostelSheetOpen] = useState(false);
    const [isBoysHostelSheetOpen, setIsBoysHostelSheetOpen] = useState(false);
    const [isHostelFeeOpen, setIsHostelFeeOpen] = useState(false);

    const activeSection = campusLifeSections.find((s) => s.id === 'hostels') || campusLifeSections[0];

    return (
        <CampusLifeLayout activeSectionId="hostels">
            <>
                {/* === 2. ABOUT HOSTELS (Side-by-Side: Text Left, Image Right matching Cafeteria style) === */}
                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column */}
                        <div className="lg:col-span-7 space-y-3.5">
                            <div className="flex items-center gap-2.5 pb-1">
                                <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                    Comfortable <span className="text-[#FF6600]">Accommodation..</span>
                                </h2>
                            </div>

                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                The Institute runs separate hostels for boys and girls in the Campus itself with comfortable accommodation with a home like stay feel. The Hostels are kept under complete monitoring by Wardens for security of the students and take care of their needs.
                            </p>

                            <div className="space-y-2.5 pt-1">
                                <p className="text-xs sm:text-[13px] font-bold text-neutral-900">
                                    Current Hostel accommodated as follows:
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {/* Boys Hostel */}
                                    <div className="rounded-xl border border-orange-100 bg-orange-50/30 p-3 space-y-1.5">
                                        <p className="text-xs font-bold text-neutral-900">
                                            Boys Hostel: <span className="text-[#FF6600]">350 students</span>
                                        </p>
                                        <p className="text-[11.5px] text-neutral-600 font-medium">
                                            (1st: 111, 2nd: 99, 3rd: 95, 4th: 45)
                                        </p>
                                        <div className="pt-1.5 border-t border-orange-200/60 text-xs">
                                            <span className="font-bold text-neutral-900 underline underline-offset-2 decoration-[#FF6600] block mb-0.5">
                                                Boys Hostel Wardens:
                                            </span>
                                            <span className="text-neutral-700 leading-snug block">
                                                Sreekanth: <a href="tel:6302525154" className="text-[#FF6600] font-semibold hover:underline">6302525154</a><br />
                                                Sreedhar: <a href="tel:9347606872" className="text-[#FF6600] font-semibold hover:underline">9347606872</a>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Girls Hostel */}
                                    <div className="rounded-xl border border-orange-100 bg-orange-50/30 p-3 space-y-1.5">
                                        <p className="text-xs font-bold text-neutral-900">
                                            Girls Hostel: <span className="text-[#FF6600]">410 students</span>
                                        </p>
                                        <p className="text-[11.5px] text-neutral-600 font-medium">
                                            (1st: 109, 2nd: 111, 3rd: 110, 4th: 80)
                                        </p>
                                        <div className="pt-1.5 border-t border-orange-200/60 text-xs">
                                            <span className="font-bold text-neutral-900 underline underline-offset-2 decoration-[#FF6600] block mb-0.5">
                                                Girls Hostel Wardens:
                                            </span>
                                            <span className="text-neutral-700 leading-snug block">
                                                Sudha Rani: <a href="tel:6303141211" className="text-[#FF6600] font-semibold hover:underline">6303141211</a><br />
                                                Naga Jyothi: <a href="tel:9347053747" className="text-[#FF6600] font-semibold hover:underline">9347053747</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Feature Tags matching Cafeteria style */}
                            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-600">
                                <span className="px-2.5 py-1 rounded-md bg-orange-50 text-[#FF6600] border border-orange-200">
                                    Home-Like Stay Feel
                                </span>
                                <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                    24/7 Warden Monitoring
                                </span>
                                <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                    Separate Boys &amp; Girls Hostels
                                </span>
                            </div>
                        </div>

                        {/* Right Column: Image matching Cafeteria style */}
                        <div className="lg:col-span-5 self-stretch flex flex-col min-h-[280px]">
                            <div className="rounded-xl overflow-hidden border-2 border-orange-200/90 shadow-md bg-orange-50/20 group relative flex-1 w-full min-h-[280px]">
                                <img
                                    src="/Hostel.jpg"
                                    alt="SRIT On-Campus Student Hostels"
                                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/optimized/Hostel.jpg.webp';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>



                                {/* === 5. CURRENT HOSTEL OCCUPANCY BREAKDOWN TABLE === */}
                                {activeSection.tableData && isHostelTableOpen && (
                                    <div className="rounded-xl border-2 border-orange-200/90 bg-white shadow-md overflow-hidden animate-in fade-in duration-300">
                                        <div className="bg-gradient-to-r from-[#111827] via-[#1c1412] to-[#2b1610] px-5 py-4 sm:px-6 sm:py-4.5 flex flex-wrap items-center justify-between gap-3 text-white border-b-2 border-[#FF6600]">
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6600] shadow-[0_0_10px_#FF6600]" />
                                                <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-tight">
                                                    {activeSection.tableData.title}
                                                </h3>
                                            </div>
                                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-300 bg-[#FF6600]/20 px-3 py-1 rounded-full border border-[#FF6600]/40 shadow-sm">
                                                Official Institutional Records
                                            </span>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-xs sm:text-sm border-collapse">
                                                <thead>
                                                    <tr className="bg-gradient-to-r from-orange-100/90 via-orange-50 to-orange-100/90 text-neutral-900 font-bold border-b-2 border-orange-200">
                                                        {activeSection.tableData.headers.map((h, hi) => (
                                                            <th
                                                                key={hi}
                                                                className={`px-4 py-3.5 text-[11px] font-black uppercase tracking-wider text-orange-950 whitespace-nowrap ${hi === 0 ? 'pl-5 sm:pl-6' : hi === activeSection.tableData!.headers.length - 1 ? 'pr-5 sm:pr-6' : ''}`}
                                                            >
                                                                {h}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-orange-100/80 text-neutral-700">
                                                    {activeSection.tableData.rows.map((row, ri) => (
                                                        <tr
                                                            key={ri}
                                                            className="group hover:bg-orange-100/50 transition-colors duration-150 odd:bg-white even:bg-orange-50/30"
                                                        >
                                                            {row.map((cell, ci) => (
                                                                <td
                                                                    key={ci}
                                                                    className={`px-4 py-3.5 align-middle transition-colors ${ci === 0 ? 'pl-5 sm:pl-6 border-l-4 border-l-transparent group-hover:border-l-[#FF6600]' : ci === row.length - 1 ? 'pr-5 sm:pr-6' : ''}`}
                                                                >
                                                                    {ci === 0 ? (
                                                                        <div className="flex items-center gap-2.5 font-bold text-xs sm:text-[13px] text-neutral-900 group-hover:text-[#FF6600] transition-colors">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] shadow-[0_0_4px_#FF6600] shrink-0" />
                                                                            <span>{cell}</span>
                                                                        </div>
                                                                    ) : ci === row.length - 1 ? (
                                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#FF6600]/10 text-[#FF6600] border border-[#FF6600]/30 shadow-2xs group-hover:bg-[#FF6600] group-hover:text-white group-hover:border-[#FF6600] transition-all duration-200 whitespace-nowrap">
                                                                            {cell}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed group-hover:text-neutral-900 transition-colors">
                                                                            {cell}
                                                                        </span>
                                                                    )}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* === 6. OFFICIAL SPREADSHEETS (Girls & Boys Hostel Occupation Status + Fee) === */}
                                <AccordionContainer className="w-full">
                                    {/* 1. Girls Hostel Occupation Status 2025-26 Accordion */}
                                    <DepartmentAccordionRow
                                        id="girls-hostel-occupation"
                                        index={0}
                                        title="Girls Hostel — Occupation Status 2025–26 Official Records"
                                        isOpen={isGirlsHostelSheetOpen}
                                        onToggle={() => setIsGirlsHostelSheetOpen(!isGirlsHostelSheetOpen)}
                                    >
                                        <div className="p-3 sm:p-4 bg-white w-full animate-in fade-in duration-300">
                                            <div className="w-full h-[850px] rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-inner">
                                                <IframeWithLoader
                                                    title="SRIT Girls Hostel Occupation Status Official Sheet"
                                                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTACl9d8n3XIv2VixPLnxicxKPXpoKpgZxvpVulWTjRb1nvwyXP81k-kxDIYvSsaA/pubhtml?widget=true&headers=false"
                                                    className="w-full h-full border-0"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    </DepartmentAccordionRow>

                                    {/* 2. Boys Hostel Occupation Status 2025-26 Accordion */}
                                    <DepartmentAccordionRow
                                        id="boys-hostel-occupation"
                                        index={1}
                                        title="Boys Hostel — Occupation Status 2025–26 Official Records"
                                        isOpen={isBoysHostelSheetOpen}
                                        onToggle={() => setIsBoysHostelSheetOpen(!isBoysHostelSheetOpen)}
                                    >
                                        <div className="p-3 sm:p-4 bg-white w-full animate-in fade-in duration-300">
                                            <div className="w-full h-[850px] rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-inner">
                                                <IframeWithLoader
                                                    title="SRIT Boys Hostel Occupation Status Official Sheet"
                                                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTllrdleVA99O1B5nHG4tLz2u9QiO9FnIe5MCdJUhK_cW2p7KK6haiUQiEwuo3csg/pubhtml?widget=true&headers=false"
                                                    className="w-full h-full border-0"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    </DepartmentAccordionRow>

                                    {/* 3. Hostel Fee Accordion */}
                                    <DepartmentAccordionRow
                                        id="hostel-fee-info"
                                        index={2}
                                        title="Hostel Fee Information"
                                        isOpen={isHostelFeeOpen}
                                        onToggle={() => setIsHostelFeeOpen(!isHostelFeeOpen)}
                                    >
                                        <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-neutral-700 leading-relaxed animate-in fade-in duration-300 space-y-2">
                                            <p>For detailed hostel room tariff, dining mess dues, installment options, and admission fee schedules, please visit the college administrative office or contact the respective hostel wardens directly.</p>
                                        </div>
                                    </DepartmentAccordionRow>
                                </AccordionContainer>

                                {/* === 7. WARDENS CONTACT & CARE TEAM === */}
                                {activeSection.contacts && activeSection.contacts.length > 0 && (
                                    <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm space-y-4">
                                        <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100">
                                            <Phone size={18} className="text-[#FF6600]" />
                                            <h3 className="font-serif text-lg font-bold text-neutral-900">
                                                Hostel Wardens &amp; Caretaker Contacts
                                            </h3>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-3.5">
                                            {activeSection.contacts.map((c, ci) => (
                                                <div
                                                    key={ci}
                                                    className="rounded-xl border border-orange-100 bg-orange-50/30 p-4 flex items-center justify-between hover:border-orange-300 hover:bg-orange-50/60 transition-colors"
                                                >
                                                    <div>
                                                        <span className="text-[10px] font-bold text-[#FF6600] uppercase tracking-wider block">
                                                            {c.role}
                                                        </span>
                                                        <span className="text-xs sm:text-sm font-bold text-neutral-900 mt-0.5 block">
                                                            {c.name}
                                                        </span>
                                                    </div>
                                                    {c.phone && (
                                                        <a
                                                            href={`tel:${c.phone}`}
                                                            className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-orange-200 hover:bg-[#FF6600] hover:text-white px-3 py-1.5 text-xs font-semibold text-neutral-800 transition shadow-2xs"
                                                        >
                                                            <Phone size={12} />
                                                            <span>{c.phone}</span>
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* === 8. GALLERY (Horizontal Slider / Carousel with Left & Right Arrow Buttons) === */}
                                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                                        <div className="flex items-center gap-2.5">
                                            <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                            <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                                Gallery
                                            </h2>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsHostelViewAll(!isHostelViewAll)}
                                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FF6600] hover:text-[#d43d0e] transition-colors group cursor-pointer"
                                        >
                                            <span>{isHostelViewAll ? 'Show Carousel' : 'View All'}</span>
                                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>

                                    {isHostelViewAll ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {[
                                                { url: '/optimized/Hostel.jpg.webp', caption: 'SRIT On-Campus Student Hostels' },
                                                { url: '/optimized/hostel_room.jpg.webp', caption: 'Comfortable Student Accommodations' },
                                                { url: '/optimized/hostel_mess.jpg.webp', caption: 'Spacious & Hygienic Dining Mess' },
                                                { url: '/optimized/hostel_study.jpg.webp', caption: 'Common Study & Recreation Hall' },
                                                { url: '/optimized/CollegeMain.jpg.webp', caption: 'Hostel Resident Campus Courtyard' },
                                                { url: '/optimized/BasketBall.JPG.webp', caption: 'Evening Sports & Recreation Ground' },
                                            ].map((img, gi) => (
                                                <div
                                                    key={gi}
                                                    className="group rounded-xl overflow-hidden border border-orange-200/80 bg-white shadow-sm hover:shadow-lg hover:border-[#FF6600] hover:-translate-y-1 transition-all duration-300"
                                                >
                                                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-orange-50/30 flex items-center justify-center p-2">
                                                        <img
                                                            src={img.url}
                                                            alt={img.caption}
                                                            loading="lazy"
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
                                        <div className="relative group/hostelslider px-1">
                                            <button
                                                type="button"
                                                onClick={() => setHostelGalleryIndex((prev) => (prev === 0 ? 3 : prev - 1))}
                                                className="absolute -left-2.5 sm:-left-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-800 hover:text-white hover:bg-[#FF6600] hover:border-[#FF6600] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                                                aria-label="Previous image"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {[
                                                    { url: '/optimized/Hostel.jpg.webp', caption: 'SRIT On-Campus Student Hostels' },
                                                    { url: '/optimized/hostel_room.jpg.webp', caption: 'Comfortable Student Accommodations' },
                                                    { url: '/optimized/hostel_mess.jpg.webp', caption: 'Spacious & Hygienic Dining Mess' },
                                                    { url: '/optimized/hostel_study.jpg.webp', caption: 'Common Study & Recreation Hall' },
                                                    { url: '/optimized/CollegeMain.jpg.webp', caption: 'Hostel Resident Campus Courtyard' },
                                                    { url: '/optimized/BasketBall.JPG.webp', caption: 'Evening Sports & Recreation Ground' },
                                                ]
                                                    .slice(hostelGalleryIndex, hostelGalleryIndex + 3)
                                                    .concat(
                                                        hostelGalleryIndex + 3 > 6
                                                            ? [
                                                                  { url: '/optimized/Hostel.jpg.webp', caption: 'SRIT On-Campus Student Hostels' },
                                                                  { url: '/optimized/hostel_room.jpg.webp', caption: 'Comfortable Student Accommodations' },
                                                                  { url: '/optimized/hostel_mess.jpg.webp', caption: 'Spacious & Hygienic Dining Mess' },
                                                                  { url: '/optimized/hostel_study.jpg.webp', caption: 'Common Study & Recreation Hall' },
                                                                  { url: '/optimized/CollegeMain.jpg.webp', caption: 'Hostel Resident Campus Courtyard' },
                                                                  { url: '/optimized/BasketBall.JPG.webp', caption: 'Evening Sports & Recreation Ground' },
                                                              ].slice(0, (hostelGalleryIndex + 3) % 6)
                                                            : []
                                                    )
                                                    .map((img, gi) => (
                                                        <div
                                                            key={gi}
                                                            className="group rounded-xl overflow-hidden border border-orange-200/80 bg-white shadow-sm hover:shadow-lg hover:border-[#FF6600] hover:-translate-y-1 transition-all duration-300"
                                                        >
                                                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-orange-50/30 flex items-center justify-center p-2">
                                                                <img
                                                                    src={img.url}
                                                                    alt={img.caption}
                                                                    loading="lazy"
                                                                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
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
                                                onClick={() => setHostelGalleryIndex((prev) => (prev >= 3 ? 0 : prev + 1))}
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

export default HostelsPage;
