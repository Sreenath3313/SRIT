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
                <div className="relative overflow-hidden border border-neutral-200 bg-white p-5 sm:p-7">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column: Descriptions & Highlights */}
                        <div className="lg:col-span-7 space-y-3.5">
                            <div className="flex items-center gap-2.5 pb-1">
                                <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                    About <span className="text-[#FF6600]">Campus Overview</span>
                                </h2>
                            </div>

                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                Established in <strong className="text-[#FF6600] font-bold">2008</strong> under the visionary leadership of <span className="text-[#FF6600] font-semibold">Sri Aluru Sambasiva Reddy</span> and managed by the <span className="text-[#FF6600] font-semibold">Smt. Aluru Narayanamma Memorial Educational Society</span>, <span className="text-[#FF6600] font-bold">Srinivasa Ramanujan Institute of Technology (SRIT)</span> is one of the premier technical institutions in Andhra Pradesh.
                            </p>

                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                Permanently affiliated to <span className="text-[#FF6600] font-semibold">JNTU Ananthapuramu</span> and approved by <span className="text-[#FF6600] font-semibold">AICTE, New Delhi</span>, SRIT has earned <span className="text-[#FF6600] font-bold">NAAC "A" Grade accreditation</span> and <span className="text-[#FF6600] font-bold">NBA accreditation</span> for its engineering programs. Located on the serene outskirts of <span className="text-[#FF6600] font-semibold">Rotarypuram Village, B.K. Samudram Mandal</span> in Ananthapuramu district, the campus offers a pristine, pollution-free atmosphere across <span className="text-[#FF6600] font-bold">25+ lush green acres</span> that is ideally conducive to higher learning, research, and innovation.
                            </p>

                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
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

                                {/* === 4. CAMPUS FACILITIES & AMENITIES (8 Cards in 2 Rows × 4 Columns with Orange Hover & Glow) === */}
                                <div className="space-y-4 border border-neutral-200 bg-white p-5 sm:p-7">
                                    <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100">
                                        <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
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
                                                className="group flex cursor-pointer flex-col justify-between overflow-hidden border border-neutral-200 bg-white transition-colors duration-200 hover:border-[#FF6600]/50"
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
                                                        <h4 className="font-bold text-sm text-neutral-900 group-hover:text-[#FF6600] transition-colors truncate">
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


            </div>
        </CampusLifeLayout>
    );
};

export default CampusOverviewPage;
