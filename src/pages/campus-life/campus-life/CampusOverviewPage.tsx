import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar, Landmark, TreePine, Monitor, Shield, Droplet, Zap, Award
} from 'lucide-react';
import CampusLifeLayout from './CampusLifeLayout';
import { campusLifeSections } from './types';

export const CampusOverviewPage: React.FC = () => {
    const navigate = useNavigate();
    const activeSection = campusLifeSections.find((s) => s.id === 'campus') || campusLifeSections[0];

    return (
        <CampusLifeLayout activeSectionId="campus">
            <div className="space-y-6 sm:space-y-8">
                                {/* === 1. KEY STATISTICS CARDS (Warm Orange Shades & Hover Animations) === */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                                    {[
                                        {
                                            value: '2008',
                                            label: 'Established Year',
                                            desc: 'Over 16 years of academic excellence',
                                            icon: Calendar,
                                        },
                                        {
                                            value: 'NAAC "A"',
                                            label: 'Accreditation',
                                            desc: 'Accredited with highest standards',
                                            icon: Award,
                                        },
                                        {
                                            value: 'JNTUA',
                                            label: 'Permanent Affiliation',
                                            desc: 'Affiliated to JNTU Ananthapuramu',
                                            icon: Landmark,
                                        },
                                        {
                                            value: '25+ Acres',
                                            label: 'Campus Area',
                                            desc: 'Sprawling eco-friendly campus',
                                            icon: TreePine,
                                        },
                                    ].map((stat, idx) => {
                                        const StatIcon = stat.icon;
                                        return (
                                            <div
                                                key={idx}
                                                className="group relative overflow-hidden border border-neutral-200 bg-white p-4 transition-colors duration-200 hover:border-[#FF5422]/50 sm:p-5"
                                            >
                                                <div className="flex items-center gap-3.5">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#FFF3ED] text-[#FF5422] transition-colors duration-200 group-hover:bg-[#FF5422] group-hover:text-white">
                                                        <StatIcon size={19} />
                                                    </div>
                                                    <div>
                                                        <div className="font-serif text-2xl font-semibold leading-none text-neutral-900 sm:text-3xl">
                                                            {stat.value}
                                                        </div>
                                                        <div className="mt-1 text-xs sm:text-sm font-bold text-neutral-900">
                                                            {stat.label}
                                                        </div>
                                                        <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                                                            {stat.desc}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* === 2. ABOUT CAMPUS OVERVIEW (Side-by-Side with Orange Accents & Badges) === */}
                                <div className="relative overflow-hidden border border-neutral-200 bg-white p-5 sm:p-7">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                        {/* Left Column: Descriptions & Highlights */}
                                        <div className="lg:col-span-7 space-y-3.5">
                                            <div className="flex items-center gap-2.5 pb-1">
                                                <span className="h-5 w-1.5 rounded-full bg-[#FF5422]" />
                                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                                    About <span className="text-[#FF5422]">Campus Overview</span>
                                                </h2>
                                            </div>

                                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                                Established in <strong className="text-[#FF5422] font-bold">2008</strong> under the visionary leadership of <span className="text-[#FF5422] font-semibold">Sri Aluru Sambasiva Reddy</span> and managed by the <span className="text-[#FF5422] font-semibold">Smt. Aluru Narayanamma Memorial Educational Society</span>, <span className="text-[#FF5422] font-bold">Srinivasa Ramanujan Institute of Technology (SRIT)</span> is one of the premier technical institutions in Andhra Pradesh.
                                            </p>

                                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                                Permanently affiliated to <span className="text-[#FF5422] font-semibold">JNTU Ananthapuramu</span> and approved by <span className="text-[#FF5422] font-semibold">AICTE, New Delhi</span>, SRIT has earned <span className="text-[#FF5422] font-bold">NAAC "A" Grade accreditation</span> and <span className="text-[#FF5422] font-bold">NBA accreditation</span> for its engineering programs. Located on the serene outskirts of <span className="text-[#FF5422] font-semibold">Rotarypuram Village, B.K. Samudram Mandal</span> in Ananthapuramu district, the campus offers a pristine, pollution-free atmosphere across <span className="text-[#FF5422] font-bold">25+ lush green acres</span> that is ideally conducive to higher learning, research, and innovation.
                                            </p>

                                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                                The campus features <span className="text-[#FF5422] font-semibold">state-of-the-art academic blocks</span>, <span className="text-[#FF5422] font-semibold">smart multimedia classrooms</span>, <span className="text-[#FF5422] font-semibold">advanced engineering laboratories</span>, <span className="text-[#FF5422] font-semibold">high-speed campus-wide Wi-Fi</span>, modern auditoriums, extensive sports facilities, hygienic dining, residential hostels, and dedicated student activity hubs.
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

                                {/* === 3. KEY HIGHLIGHTS & FACILITIES (4 Cards with Rich Orange Shades & Lift Animation) === */}
                                <div className="space-y-4 border border-neutral-200 bg-white p-5 sm:p-7">
                                    <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100">
                                        <span className="h-5 w-1.5 rounded-full bg-[#FF5422]" />
                                        <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                            Key Highlights &amp; Facilities
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {[
                                            {
                                                title: 'Smart Multimedia Classrooms',
                                                desc: 'Acoustically designed lecture halls equipped with modern LCD projectors, interactive smart boards, and high-speed audio-visual aids.',
                                                icon: Monitor,
                                            },
                                            {
                                                title: 'Safe & Secure Campus',
                                                desc: '24/7 campus-wide CCTV surveillance, gated security checkpoints, and vigilant round-the-clock physical security guards.',
                                                icon: Shield,
                                            },
                                            {
                                                title: 'Purified RO Drinking Water',
                                                desc: 'Centralized high-capacity Reverse Osmosis (RO) drinking water plants providing safe and cold drinking water across all blocks.',
                                                icon: Droplet,
                                            },
                                            {
                                                title: 'Continuous Power Backup',
                                                desc: 'High-capacity generator sets and heavy-duty UPS systems ensuring uninterrupted electricity supply to laboratories and classrooms.',
                                                icon: Zap,
                                            },
                                        ].map((item, idx) => {
                                            const ItemIcon = item.icon;
                                            return (
                                                <div
                                                    key={idx}
                                                    className="group flex flex-col justify-between overflow-hidden border border-neutral-200 bg-white p-4 transition-colors duration-200 hover:border-[#FF5422]/50 sm:p-5"
                                                >
                                                    <div>
                                                        <div className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center bg-[#FFF3ED] text-[#FF5422] transition-colors duration-200 group-hover:bg-[#FF5422] group-hover:text-white">
                                                            <ItemIcon size={20} />
                                                        </div>
                                                        <h4 className="font-bold text-sm sm:text-[14.5px] text-neutral-900 group-hover:text-[#FF5422] transition-colors">
                                                            {item.title}
                                                        </h4>
                                                        <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* === 4. CAMPUS FACILITIES & AMENITIES (8 Cards in 2 Rows × 4 Columns with Orange Hover & Glow) === */}
                                <div className="space-y-4 border border-neutral-200 bg-white p-5 sm:p-7">
                                    <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100">
                                        <span className="h-5 w-1.5 rounded-full bg-[#FF5422]" />
                                        <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                            Campus Facilities &amp; Amenities
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {[
                                            {
                                                title: 'Academic Infrastructure',
                                                desc: 'Modern classrooms, labs and seminar halls.',
                                                img: '/optimized/College.JPG.webp',
                                                link: '/campus-life/labs'
                                            },
                                            {
                                                title: 'Central Library',
                                                desc: 'Rich collection of books and digital resources.',
                                                img: '/optimized/library.webp.webp',
                                                link: '/campus-life/library'
                                            },
                                            {
                                                title: 'Hostel Life',
                                                desc: 'Safe and comfortable hostel facilities.',
                                                img: '/optimized/Hostel.jpg.webp',
                                                link: '/campus-life/hostel'
                                            },
                                            {
                                                title: 'Sports & Games',
                                                desc: 'Indoor and outdoor sports facilities.',
                                                img: '/optimized/BasketBall.JPG.webp',
                                                link: '/campus-life/sports'
                                            },
                                            {
                                                title: 'Transport',
                                                desc: 'Well-connected transport facility.',
                                                img: '/optimized/Transport.jpg.webp',
                                                link: '/campus-life/transport'
                                            },
                                            {
                                                title: 'Sustainable Campus',
                                                desc: 'Lush greenery and eco-friendly environment.',
                                                img: '/optimized/College 3.JPG.webp',
                                                link: '/campus-life/sustainability'
                                            },
                                            {
                                                title: 'Cafeteria',
                                                desc: 'Hygienic and spacious dining facilities.',
                                                img: '/optimized/Campus.JPG.webp',
                                                link: '/campus-life/canteen'
                                            },
                                            {
                                                title: 'Student Activities',
                                                desc: 'Platforms to showcase talent and creativity.',
                                                img: '/aarambh_orientation.jpg',
                                                link: '/campus-life/cultural'
                                            },
                                        ].map((item, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => navigate(item.link)}
                                                className="group flex cursor-pointer flex-col justify-between overflow-hidden border border-neutral-200 bg-white transition-colors duration-200 hover:border-[#FF5422]/50"
                                            >
                                                {/* Image */}
                                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-orange-50/20">
                                                    <img
                                                        src={item.img}
                                                        alt={item.title}
                                                        loading="lazy"
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = '/optimized/Campus.JPG.webp';
                                                        }}
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className="border-t border-neutral-100 bg-white p-3.5">
                                                    <div className="min-w-0">
                                                        <h4 className="font-bold text-sm text-neutral-900 group-hover:text-[#FF5422] transition-colors truncate">
                                                            {item.title}
                                                        </h4>
                                                        <p className="text-[11.5px] text-neutral-500 mt-0.5 line-clamp-1">
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* === 5. OPERATING SCHEDULES & GUIDELINES === */}
                                {activeSection.highlights && activeSection.highlights.length > 0 && (
                                    <div className="space-y-3 border border-neutral-200 bg-white p-5 sm:p-7">
                                        <h3 className="font-serif text-lg font-bold text-neutral-900 flex items-center gap-2">
                                            <span className="h-4 w-1 rounded-full bg-[#FF5422]" />
                                            <span>Operating Schedules & Key Guidelines</span>
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-2.5">
                                            {activeSection.highlights.map((hl, hi) => (
                                                <div key={hi} className="flex items-start gap-2.5 border border-neutral-200 bg-neutral-50 p-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5422] mt-1.5 shrink-0" />
                                                    <span className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed font-medium">
                                                        {hl}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
            </div>
        </CampusLifeLayout>
    );
};

export default CampusOverviewPage;
