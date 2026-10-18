import React, { useState } from 'react';
import {
    Phone, ExternalLink, ShieldCheck, Utensils, Wifi, Droplets,
    Activity, BookOpen, Building2, Users, CheckCircle2, AlertCircle
} from 'lucide-react';
import CampusLifeLayout from './CampusLifeLayout';
import IframeWithLoader from '../../../components/common/IframeWithLoader';
import { AccordionContainer, DepartmentAccordionRow } from '../../../components/common/DepartmentAccordion';

interface HostelData {
    block: string;
    total: number;
    breakdown: { year: string; count: number }[];
    wardens: { name: string; phone: string }[];
}

const hostelOccupancyData: HostelData[] = [
    {
        block: 'Boys Hostel',
        total: 350,
        breakdown: [
            { year: '1st Year', count: 111 },
            { year: '2nd Year', count: 99 },
            { year: '3rd Year', count: 95 },
            { year: '4th Year', count: 45 }
        ],
        wardens: [
            { name: 'Sreekanth', phone: '6302525154' },
            { name: 'Sreedhar', phone: '9347606872' }
        ]
    },
    {
        block: 'Girls Hostel',
        total: 410,
        breakdown: [
            { year: '1st Year', count: 109 },
            { year: '2nd Year', count: 111 },
            { year: '3rd Year', count: 110 },
            { year: '4th Year', count: 80 }
        ],
        wardens: [
            { name: 'Sudha Rani', phone: '6303141211' },
            { name: 'Naga Jyothi', phone: '9347053747' }
        ]
    }
];

const hostelAmenities = [
    {
        icon: ShieldCheck,
        title: '24/7 Warden & CCTV Monitoring',
        desc: 'Round-the-clock security surveillance, biometric checkpoints, and dedicated resident wardens to guarantee student safety.'
    },
    {
        icon: Utensils,
        title: 'Nutritious & Hygienic Mess',
        desc: 'Wholesome, balanced vegetarian food prepared under strict hygienic conditions with daily varied breakfast, lunch, snacks, and dinner.'
    },
    {
        icon: Wifi,
        title: 'High-Speed Wi-Fi Connectivity',
        desc: 'Seamless Wi-Fi access across all hostel rooms and study corridors supporting academic coursework and online study.'
    },
    {
        icon: Droplets,
        title: 'RO Purified Drinking Water',
        desc: 'Dedicated commercial reverse osmosis water purification plants with cold water dispensers on each residential floor.'
    },
    {
        icon: Activity,
        title: 'Medical & Emergency Care',
        desc: 'First-aid center, 24/7 standby emergency transport, and direct tie-ups with leading hospitals in Anantapur.'
    },
    {
        icon: BookOpen,
        title: 'Quiet Study Halls & Recreation',
        desc: 'Dedicated quiet study spaces for late-hour exam preparations, alongside indoor recreation and TV lounge areas.'
    }
];

export const HostelsPage: React.FC = () => {
    // Accordion states matching exact Elementor items on https://www.srit.ac.in/hostels/
    const [isHostelFeeOpen, setIsHostelFeeOpen] = useState(false);
    const [isGirlsHostelSheetOpen, setIsGirlsHostelSheetOpen] = useState(false);
    const [isBoysHostelSheetOpen, setIsBoysHostelSheetOpen] = useState(false);

    const girlsSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTACl9d8n3XIv2VixPLnxicxKPXpoKpgZxvpVulWTjRb1nvwyXP81k-kxDIYvSsaA/pubhtml?widget=true&headers=false";
    const boysSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTllrdleVA99O1B5nHG4tLz2u9QiO9FnIe5MCdJUhK_cW2p7KK6haiUQiEwuo3csg/pubhtml?widget=true&headers=false";

    return (
        <CampusLifeLayout activeSectionId="hostels">
            <div className="space-y-6 sm:space-y-8">
                {/* === 1. HERO BANNER IMAGE (Full Width from srit.ac.in/hostels/) === */}
                <div className="rounded-xl overflow-hidden border border-neutral-200/80 bg-white shadow-sm">
                    <div className="relative aspect-[21/9] sm:aspect-[24/9] lg:aspect-[28/9] w-full bg-neutral-100 overflow-hidden">
                        <img
                            src="/Hostel.jpg"
                            alt="SRIT On-Campus Hostels"
                            className="w-full h-full object-cover object-center"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/Hostel-hero.jpg';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent flex items-end p-4 sm:p-6 lg:p-8">
                            <div className="text-white max-w-3xl">
                                <span className="inline-block px-3 py-1 rounded-full bg-[#FF6600] text-white text-xs font-black tracking-wider uppercase mb-2 shadow-sm">
                                    Campus Living
                                </span>
                                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-md">
                                    Comfortable Accommodation..
                                </h1>
                                <p className="text-xs sm:text-sm text-neutral-200 font-medium mt-1 line-clamp-2">
                                    Safe, hygienic, and home-like on-campus residential facilities accommodating 760+ boys and girls with 24/7 warden supervision.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* === 2. ABOUT HOSTELS (Side-by-Side: Text Left, Image Right) === */}
                <div className="rounded-xl border border-neutral-200/70 bg-white p-5 sm:p-7 shadow-sm relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                        {/* Left Column: Official Verbatim Content */}
                        <div className="lg:col-span-7 space-y-4">
                            <div className="flex items-center gap-2.5 pb-1">
                                <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                    Comfortable <span className="text-[#FF6600]">Accommodation..</span>
                                </h2>
                            </div>

                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                The Institute runs separate hostels for boys and girls in the Campus itself with comfortable accommodation with a home like stay feel. The Hostels are kept under complete monitoring by Wardens for security of the students and take care of their needs.
                            </p>

                            <div className="pt-1 space-y-2.5">
                                <p className="text-sm sm:text-[15px] font-bold text-neutral-900 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600]" />
                                    Current Hostel accommodated as follows:
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {/* Boys Hostel Card */}
                                    <div className="rounded-xl border border-orange-200/80 bg-orange-50/40 p-4 space-y-2 shadow-2xs">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-black text-neutral-900 uppercase tracking-wide">
                                                Boys Hostel
                                            </p>
                                            <span className="px-2 py-0.5 rounded-md bg-[#FF6600] text-white text-[11px] font-bold">
                                                350 students
                                            </span>
                                        </div>
                                        <p className="text-[12px] text-neutral-700 font-medium">
                                            Occupied by students across all 4 years:
                                        </p>
                                        <div className="grid grid-cols-4 gap-1 py-1 text-center">
                                            <div className="bg-white/90 rounded border border-orange-100 p-1">
                                                <div className="text-[10px] text-neutral-500 font-bold">1st Yr</div>
                                                <div className="text-xs font-black text-[#FF6600]">111</div>
                                            </div>
                                            <div className="bg-white/90 rounded border border-orange-100 p-1">
                                                <div className="text-[10px] text-neutral-500 font-bold">2nd Yr</div>
                                                <div className="text-xs font-black text-[#FF6600]">99</div>
                                            </div>
                                            <div className="bg-white/90 rounded border border-orange-100 p-1">
                                                <div className="text-[10px] text-neutral-500 font-bold">3rd Yr</div>
                                                <div className="text-xs font-black text-[#FF6600]">95</div>
                                            </div>
                                            <div className="bg-white/90 rounded border border-orange-100 p-1">
                                                <div className="text-[10px] text-neutral-500 font-bold">4th Yr</div>
                                                <div className="text-xs font-black text-[#FF6600]">45</div>
                                            </div>
                                        </div>
                                        <div className="pt-2 border-t border-orange-200/60 text-xs">
                                            <span className="font-bold text-neutral-900 underline underline-offset-2 decoration-[#FF6600] block mb-1">
                                                Boys Hostel Wardens:
                                            </span>
                                            <div className="space-y-1 text-neutral-700">
                                                <div className="flex items-center justify-between">
                                                    <span>Sreekanth:</span>
                                                    <a href="tel:6302525154" className="text-[#FF6600] font-bold hover:underline flex items-center gap-1">
                                                        <Phone size={10} /> 6302525154
                                                    </a>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Sreedhar:</span>
                                                    <a href="tel:9347606872" className="text-[#FF6600] font-bold hover:underline flex items-center gap-1">
                                                        <Phone size={10} /> 9347606872
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Girls Hostel Card */}
                                    <div className="rounded-xl border border-orange-200/80 bg-orange-50/40 p-4 space-y-2 shadow-2xs">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-black text-neutral-900 uppercase tracking-wide">
                                                Girls Hostel
                                            </p>
                                            <span className="px-2 py-0.5 rounded-md bg-[#FF6600] text-white text-[11px] font-bold">
                                                410 students
                                            </span>
                                        </div>
                                        <p className="text-[12px] text-neutral-700 font-medium">
                                            Occupied by students across all 4 years:
                                        </p>
                                        <div className="grid grid-cols-4 gap-1 py-1 text-center">
                                            <div className="bg-white/90 rounded border border-orange-100 p-1">
                                                <div className="text-[10px] text-neutral-500 font-bold">1st Yr</div>
                                                <div className="text-xs font-black text-[#FF6600]">109</div>
                                            </div>
                                            <div className="bg-white/90 rounded border border-orange-100 p-1">
                                                <div className="text-[10px] text-neutral-500 font-bold">2nd Yr</div>
                                                <div className="text-xs font-black text-[#FF6600]">111</div>
                                            </div>
                                            <div className="bg-white/90 rounded border border-orange-100 p-1">
                                                <div className="text-[10px] text-neutral-500 font-bold">3rd Yr</div>
                                                <div className="text-xs font-black text-[#FF6600]">110</div>
                                            </div>
                                            <div className="bg-white/90 rounded border border-orange-100 p-1">
                                                <div className="text-[10px] text-neutral-500 font-bold">4th Yr</div>
                                                <div className="text-xs font-black text-[#FF6600]">80</div>
                                            </div>
                                        </div>
                                        <div className="pt-2 border-t border-orange-200/60 text-xs">
                                            <span className="font-bold text-neutral-900 underline underline-offset-2 decoration-[#FF6600] block mb-1">
                                                Girls Hostel Wardens:
                                            </span>
                                            <div className="space-y-1 text-neutral-700">
                                                <div className="flex items-center justify-between">
                                                    <span>Sudha Rani:</span>
                                                    <a href="tel:6303141211" className="text-[#FF6600] font-bold hover:underline flex items-center gap-1">
                                                        <Phone size={10} /> 6303141211
                                                    </a>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Naga Jyothi:</span>
                                                    <a href="tel:9347053747" className="text-[#FF6600] font-bold hover:underline flex items-center gap-1">
                                                        <Phone size={10} /> 9347053747
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Feature Tags */}
                            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-600">
                                <span className="px-2.5 py-1 rounded-md bg-orange-50 text-[#FF6600] border border-orange-200 font-bold">
                                    Home-Like Stay Feel
                                </span>
                                <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                    24/7 Warden Monitoring
                                </span>
                                <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                    Separate Boys &amp; Girls Hostels
                                </span>
                                <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                    760 Total Residents
                                </span>
                            </div>
                        </div>

                        {/* Right Column: Building Photo */}
                        <div className="lg:col-span-5 self-stretch flex flex-col min-h-[300px]">
                            <div className="rounded-xl overflow-hidden border-2 border-orange-200/90 shadow-md bg-orange-50/20 group relative flex-1 w-full min-h-[300px]">
                                <img
                                    src="/Hostel.jpg"
                                    alt="SRIT On-Campus Student Hostels"
                                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/Hostel-hero.jpg';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                                    <div className="text-white">
                                        <p className="text-xs font-bold uppercase tracking-wider text-orange-300">
                                            SRIT Residential Campus
                                        </p>
                                        <p className="text-sm font-bold text-white">
                                            Secure, clean, and self-contained accommodation
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* === 3. YEAR-WISE HOSTEL OCCUPANCY SUMMARY TABLE === */}
                <div className="rounded-xl border border-neutral-200/80 bg-white shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-[#111827] via-[#1c1412] to-[#2b1610] px-5 py-4 sm:px-6 sm:py-4.5 flex flex-wrap items-center justify-between gap-3 text-white border-b-2 border-[#FF6600]">
                        <div className="flex items-center gap-2.5">
                            <Building2 className="w-5 h-5 text-[#FF6600]" />
                            <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-tight">
                                Current Hostel Occupancy Summary (2025–26)
                            </h3>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-300 bg-[#FF6600]/20 px-3 py-1 rounded-full border border-[#FF6600]/40 shadow-sm">
                            760 Students Total
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-orange-100/90 via-orange-50 to-orange-100/90 text-neutral-900 font-bold border-b-2 border-orange-200">
                                    <th className="px-5 py-3.5 text-[11px] font-black uppercase tracking-wider text-orange-950 whitespace-nowrap">
                                        Hostel Block
                                    </th>
                                    <th className="px-4 py-3.5 text-[11px] font-black uppercase tracking-wider text-orange-950 text-center whitespace-nowrap">
                                        1st Year
                                    </th>
                                    <th className="px-4 py-3.5 text-[11px] font-black uppercase tracking-wider text-orange-950 text-center whitespace-nowrap">
                                        2nd Year
                                    </th>
                                    <th className="px-4 py-3.5 text-[11px] font-black uppercase tracking-wider text-orange-950 text-center whitespace-nowrap">
                                        3rd Year
                                    </th>
                                    <th className="px-4 py-3.5 text-[11px] font-black uppercase tracking-wider text-orange-950 text-center whitespace-nowrap">
                                        4th Year
                                    </th>
                                    <th className="px-4 py-3.5 text-[11px] font-black uppercase tracking-wider text-orange-950 text-center whitespace-nowrap">
                                        Total Occupancy
                                    </th>
                                    <th className="px-5 py-3.5 text-[11px] font-black uppercase tracking-wider text-orange-950 whitespace-nowrap">
                                        Wardens &amp; Contact
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-orange-100/80 text-neutral-700">
                                {hostelOccupancyData.map((hostel, idx) => (
                                    <tr
                                        key={idx}
                                        className="group hover:bg-orange-100/40 transition-colors duration-150 odd:bg-white even:bg-orange-50/20"
                                    >
                                        <td className="px-5 py-3.5 font-bold text-neutral-900 border-l-4 border-l-transparent group-hover:border-l-[#FF6600]">
                                            <div className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600]" />
                                                <span>{hostel.block}</span>
                                            </div>
                                        </td>
                                        {hostel.breakdown.map((item, i) => (
                                            <td key={i} className="px-4 py-3.5 text-center font-semibold text-neutral-800">
                                                {item.count}
                                            </td>
                                        ))}
                                        <td className="px-4 py-3.5 text-center">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-black bg-[#FF6600]/10 text-[#FF6600] border border-[#FF6600]/30">
                                                {hostel.total}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-xs">
                                            <div className="space-y-1">
                                                {hostel.wardens.map((w, wi) => (
                                                    <div key={wi} className="flex items-center gap-2">
                                                        <span className="font-semibold text-neutral-900">{w.name}:</span>
                                                        <a href={`tel:${w.phone}`} className="text-[#FF6600] hover:underline font-bold">
                                                            {w.phone}
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                <tr className="bg-orange-100/60 font-black text-neutral-900 border-t-2 border-orange-300">
                                    <td className="px-5 py-3.5">Total Accommodated</td>
                                    <td className="px-4 py-3.5 text-center text-[#FF6600]">220</td>
                                    <td className="px-4 py-3.5 text-center text-[#FF6600]">210</td>
                                    <td className="px-4 py-3.5 text-center text-[#FF6600]">205</td>
                                    <td className="px-4 py-3.5 text-center text-[#FF6600]">125</td>
                                    <td className="px-4 py-3.5 text-center">
                                        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-black bg-[#FF6600] text-white shadow-2xs">
                                            760 Students
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-xs text-neutral-600">4 Resident Wardens</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* === 4. OFFICIAL ACCORDIONS (Exact Elementor Titles from srit.ac.in/hostels/) === */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2.5">
                        <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                        <h3 className="font-serif text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                            Hostel Records, Occupation Status &amp; Fee Details
                        </h3>
                    </div>

                    <AccordionContainer className="w-full">
                        {/* 1. Hostel Fee Accordion (Exact Title from live website) */}
                        <DepartmentAccordionRow
                            id="hostel-fee"
                            index={0}
                            title="Hostel Fee"
                            isOpen={isHostelFeeOpen}
                            onToggle={() => setIsHostelFeeOpen(!isHostelFeeOpen)}
                        >
                            <div className="p-5 sm:p-6 bg-white space-y-5 animate-in fade-in duration-300">
                                <div className="rounded-xl border border-orange-200/80 bg-orange-50/30 p-4 sm:p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-[#FF6600]/10 text-[#FF6600] shrink-0 mt-0.5">
                                            <AlertCircle size={20} />
                                        </div>
                                        <div className="space-y-1 text-sm sm:text-base text-neutral-700 leading-relaxed">
                                            <p className="font-bold text-neutral-900 text-sm sm:text-base">
                                                Hostel Admission &amp; Annual Fee Guidelines
                                            </p>
                                            <p>
                                                Hostel accommodation is allocated on a first-come, first-served basis at the beginning of each academic semester. Room allotment is confirmed upon full payment of the annual hostel fee and submission of the anti-ragging undertaking.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Fee Components */}
                                    <div className="rounded-xl border border-neutral-200 p-4 space-y-3 bg-neutral-50/50">
                                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 flex items-center gap-2">
                                            <CheckCircle2 size={16} className="text-[#FF6600]" />
                                            Hostel Fee Inclusions
                                        </h4>
                                        <ul className="text-sm sm:text-[15px] text-neutral-600 space-y-2">
                                            <li className="flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] mt-1.5 shrink-0" />
                                                <span>Furnished shared room (cot, mattress, study table, chair, and wardrobe)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] mt-1.5 shrink-0" />
                                                <span>Four meals daily (Breakfast, Lunch, Evening Snacks &amp; Dinner)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] mt-1.5 shrink-0" />
                                                <span>24/7 RO Purified drinking water and continuous water supply</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] mt-1.5 shrink-0" />
                                                <span>High-speed optical fiber Wi-Fi internet access</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] mt-1.5 shrink-0" />
                                                <span>24-hour security, biometric attendance, and generator power backup</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Payment Modes */}
                                    <div className="rounded-xl border border-neutral-200 p-4 space-y-3 bg-neutral-50/50">
                                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 flex items-center gap-2">
                                            <CheckCircle2 size={16} className="text-[#FF6600]" />
                                            Payment Methods &amp; Administrative Help
                                        </h4>
                                        <div className="text-sm sm:text-[15px] text-neutral-600 space-y-2 leading-relaxed">
                                            <p>
                                                <strong>1. Online Net Banking / UPI / NEFT:</strong> Payments can be completed through the college official fee portal or via direct bank transfer using the designated virtual account number.
                                            </p>
                                            <p>
                                                <strong>2. College Cash / Accounts Counter:</strong> Demand Drafts drawn in favour of <em>"Srinivasa Ramanujan Institute of Technology"</em> payable at Anantapur or card swipes at the campus accounts counter.
                                            </p>
                                            <div className="pt-2 border-t border-neutral-200">
                                                <p className="text-neutral-800 font-semibold">
                                                    For fee queries &amp; receipts:
                                                </p>
                                                <p className="text-neutral-600">
                                                    Administrative Office: <a href="tel:919515611111" className="text-[#FF6600] font-bold hover:underline">+91 95156 11111</a> | Email: <a href="mailto:hr@srit.ac.in" className="text-[#FF6600] font-bold hover:underline">hr@srit.ac.in</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DepartmentAccordionRow>

                        {/* 2. Girls Hostel_Occupation Status_2025-26 Accordion (Exact Title from live website) */}
                        <DepartmentAccordionRow
                            id="girls-hostel-occupation"
                            index={1}
                            title="Girls Hostel_Occupation Status_2025-26"
                            isOpen={isGirlsHostelSheetOpen}
                            onToggle={() => setIsGirlsHostelSheetOpen(!isGirlsHostelSheetOpen)}
                        >
                            <div className="p-3 sm:p-5 bg-white space-y-3 w-full animate-in fade-in duration-300">
                                <div className="flex flex-wrap items-center justify-between gap-3 px-1 py-1">
                                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="font-semibold text-neutral-900">Live Google Sheet:</span>
                                        <span>Includes Ground Floor, 1st Floor, 2nd Floor &amp; 3rd Floor allocations</span>
                                    </div>
                                    <a
                                        href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTACl9d8n3XIv2VixPLnxicxKPXpoKpgZxvpVulWTjRb1nvwyXP81k-kxDIYvSsaA/pubhtml"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-[#FF6600] hover:text-white border border-orange-200 text-[#FF6600] text-xs font-bold transition shadow-2xs"
                                    >
                                        <ExternalLink size={13} />
                                        <span>Open Full Sheet in New Tab</span>
                                    </a>
                                </div>

                                <div className="w-full h-[850px] rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-inner">
                                    <IframeWithLoader
                                        title="SRIT Girls Hostel Occupation Status Official Sheet"
                                        src={girlsSheetUrl}
                                        className="w-full h-full border-0"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </DepartmentAccordionRow>

                        {/* 3. Boys Hostel_Occupation Status_2025-26 Accordion (Exact Title from live website) */}
                        <DepartmentAccordionRow
                            id="boys-hostel-occupation"
                            index={2}
                            title="Boys Hostel_Occupation Status_2025-26"
                            isOpen={isBoysHostelSheetOpen}
                            onToggle={() => setIsBoysHostelSheetOpen(!isBoysHostelSheetOpen)}
                        >
                            <div className="p-3 sm:p-5 bg-white space-y-3 w-full animate-in fade-in duration-300">
                                <div className="flex flex-wrap items-center justify-between gap-3 px-1 py-1">
                                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="font-semibold text-neutral-900">Live Google Sheet:</span>
                                        <span>Includes 1st Floor, 2nd Floor &amp; 3rd Floor allocations</span>
                                    </div>
                                    <a
                                        href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTllrdleVA99O1B5nHG4tLz2u9QiO9FnIe5MCdJUhK_cW2p7KK6haiUQiEwuo3csg/pubhtml"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-[#FF6600] hover:text-white border border-orange-200 text-[#FF6600] text-xs font-bold transition shadow-2xs"
                                    >
                                        <ExternalLink size={13} />
                                        <span>Open Full Sheet in New Tab</span>
                                    </a>
                                </div>

                                <div className="w-full h-[850px] rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-inner">
                                    <IframeWithLoader
                                        title="SRIT Boys Hostel Occupation Status Official Sheet"
                                        src={boysSheetUrl}
                                        className="w-full h-full border-0"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </DepartmentAccordionRow>
                    </AccordionContainer>
                </div>

                {/* === 5. HOSTEL WARDENS & CARETAKER CONTACTS === */}
                <div className="rounded-xl border border-neutral-200/80 bg-white p-5 sm:p-7 shadow-sm space-y-4">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100">
                        <Phone size={18} className="text-[#FF6600]" />
                        <h3 className="font-serif text-lg font-bold text-neutral-900">
                            Hostel Wardens &amp; Caretaker Contacts
                        </h3>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                        {/* Boys Warden 1 */}
                        <div className="rounded-xl border border-orange-100 bg-orange-50/30 p-4 space-y-2 hover:border-orange-300 hover:bg-orange-50/60 transition-colors">
                            <span className="text-[10px] font-black text-[#FF6600] uppercase tracking-wider block">
                                Boys Hostel Warden
                            </span>
                            <span className="text-sm font-bold text-neutral-900 block">
                                Mr. Sreekanth
                            </span>
                            <a
                                href="tel:6302525154"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-orange-200 hover:bg-[#FF6600] hover:text-white px-3 py-1.5 text-xs font-bold text-neutral-800 transition shadow-2xs w-full justify-center"
                            >
                                <Phone size={12} />
                                <span>6302525154</span>
                            </a>
                        </div>

                        {/* Boys Warden 2 */}
                        <div className="rounded-xl border border-orange-100 bg-orange-50/30 p-4 space-y-2 hover:border-orange-300 hover:bg-orange-50/60 transition-colors">
                            <span className="text-[10px] font-black text-[#FF6600] uppercase tracking-wider block">
                                Boys Hostel Warden
                            </span>
                            <span className="text-sm font-bold text-neutral-900 block">
                                Mr. Sreedhar
                            </span>
                            <a
                                href="tel:9347606872"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-orange-200 hover:bg-[#FF6600] hover:text-white px-3 py-1.5 text-xs font-bold text-neutral-800 transition shadow-2xs w-full justify-center"
                            >
                                <Phone size={12} />
                                <span>9347606872</span>
                            </a>
                        </div>

                        {/* Girls Warden 1 */}
                        <div className="rounded-xl border border-orange-100 bg-orange-50/30 p-4 space-y-2 hover:border-orange-300 hover:bg-orange-50/60 transition-colors">
                            <span className="text-[10px] font-black text-[#FF6600] uppercase tracking-wider block">
                                Girls Hostel Warden
                            </span>
                            <span className="text-sm font-bold text-neutral-900 block">
                                Mrs. Sudha Rani
                            </span>
                            <a
                                href="tel:6303141211"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-orange-200 hover:bg-[#FF6600] hover:text-white px-3 py-1.5 text-xs font-bold text-neutral-800 transition shadow-2xs w-full justify-center"
                            >
                                <Phone size={12} />
                                <span>6303141211</span>
                            </a>
                        </div>

                        {/* Girls Warden 2 */}
                        <div className="rounded-xl border border-orange-100 bg-orange-50/30 p-4 space-y-2 hover:border-orange-300 hover:bg-orange-50/60 transition-colors">
                            <span className="text-[10px] font-black text-[#FF6600] uppercase tracking-wider block">
                                Girls Hostel Warden
                            </span>
                            <span className="text-sm font-bold text-neutral-900 block">
                                Mrs. Naga Jyothi
                            </span>
                            <a
                                href="tel:9347053747"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-orange-200 hover:bg-[#FF6600] hover:text-white px-3 py-1.5 text-xs font-bold text-neutral-800 transition shadow-2xs w-full justify-center"
                            >
                                <Phone size={12} />
                                <span>9347053747</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* === 6. HOSTEL AMENITIES & FACILITIES === */}
                <div className="rounded-xl border border-neutral-200/80 bg-white p-5 sm:p-7 shadow-sm space-y-5">
                    <div className="flex items-center gap-2.5">
                        <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900">
                            Hostel Amenities &amp; Living Experience
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {hostelAmenities.map((amenity, index) => {
                            const IconComponent = amenity.icon;
                            return (
                                <div
                                    key={index}
                                    className="rounded-xl border border-neutral-200/80 bg-neutral-50/40 p-4 hover:border-orange-300 hover:bg-orange-50/30 transition duration-200 group"
                                >
                                    <div className="p-2.5 rounded-lg bg-orange-100 text-[#FF6600] group-hover:bg-[#FF6600] group-hover:text-white transition w-fit mb-3">
                                        <IconComponent size={20} />
                                    </div>
                                    <h4 className="text-sm font-bold text-neutral-900 mb-1">
                                        {amenity.title}
                                    </h4>
                                    <p className="text-sm text-neutral-600 leading-relaxed">
                                        {amenity.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </CampusLifeLayout>
    );
};

export default HostelsPage;
