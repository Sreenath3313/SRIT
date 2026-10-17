import React, { useState } from 'react';

import CampusLifeLayout from './CampusLifeLayout';

export const CafeteriaPage: React.FC = () => {
    const [isCafeteriaViewAll, setIsCafeteriaViewAll] = useState(false);

    return (
        <CampusLifeLayout activeSectionId="cafeteria">
            <>

                                {/* === 2. ABOUT CAFETERIA (Side-by-Side: Text Left, Image Right) === */}
                                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm relative overflow-hidden">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                        <div className="lg:col-span-7 space-y-3.5">
                                            <div className="flex items-center gap-2.5 pb-1">
                                                <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                                    About <span className="text-[#FF6600]">Cafeteria &amp; Student Food Court</span>
                                                </h2>
                                            </div>

                                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                                The SRIT <strong className="text-[#FF6600] font-bold">Cafeteria and Food Court</strong> is a lively, welcoming hub where students, faculty, and campus visitors gather to relax, converse, and enjoy wholesome food throughout the day.
                                            </p>

                                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                                Maintained under strict standards of hygiene and quality, the cafeteria offers a wide variety of freshly prepared <span className="text-[#FF6600] font-semibold">South Indian breakfast items</span>, wholesome thali lunches, snacks, bakery items, hot tea/coffee, and <span className="text-[#FF6600] font-semibold">fresh fruit juices</span>.
                                            </p>

                                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                                The kitchen utilizes <strong className="text-[#FF6600] font-bold">100% purified RO water</strong> for all cooking and washing, adhering to rigorous cleanliness inspections and providing an inviting ambiance at <span className="text-[#FF6600] font-semibold">subsidized, student-friendly prices</span>.
                                            </p>

                                            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-600">
                                                <span className="px-2.5 py-1 rounded-md bg-orange-50 text-[#FF6600] border border-orange-200">
                                                    100% RO Water Purified
                                                </span>
                                                <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                                    Nutritious Balanced Meals
                                                </span>
                                                <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                                    Subsidized Pricing
                                                </span>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-5 self-stretch flex flex-col min-h-[280px]">
                                            <div className="rounded-xl overflow-hidden border-2 border-orange-200/90 shadow-md bg-orange-50/20 group relative flex-1 w-full min-h-[280px]">
                                                <img
                                                    src="/optimized/College 1.jpg.webp"
                                                    alt="SRIT Campus Cafeteria & Student Refreshment Zone"
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/optimized/Campus.JPG.webp';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>





                                {/* === 5. PHOTO GALLERY === */}
                                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                                        <div className="flex items-center gap-2.5">
                                            <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                            <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                                Cafeteria &amp; Dining Gallery
                                            </h2>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsCafeteriaViewAll(!isCafeteriaViewAll)}
                                            className="px-3.5 py-1 rounded-full text-xs font-bold text-[#FF6600] bg-orange-50 border border-orange-200 hover:bg-[#FF6600] hover:text-white transition-all cursor-pointer"
                                        >
                                            {isCafeteriaViewAll ? 'Show Carousel' : 'View All Photos'}
                                        </button>
                                    </div>

                                    {isCafeteriaViewAll ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {[
                                                { url: '/optimized/College 1.jpg.webp', caption: 'SRIT Campus Cafeteria & Student Refreshment Zone' },
                                                { url: '/optimized/CollegeMain.jpg.webp', caption: 'Main Campus Dining Hub' },
                                                { url: '/optimized/Campus.JPG.webp', caption: 'Lush Campus Surroundings & Dining Walkway' },
                                            ].map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className="group rounded-xl overflow-hidden border border-neutral-200/90 bg-orange-50/20 shadow-sm hover:shadow-md hover:border-[#FF6600]/60 transition-all duration-300"
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
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {[
                                                    { url: '/optimized/College 1.jpg.webp', caption: 'SRIT Campus Cafeteria & Student Refreshment Zone' },
                                                    { url: '/optimized/CollegeMain.jpg.webp', caption: 'Main Campus Dining Hub' },
                                                    { url: '/optimized/Campus.JPG.webp', caption: 'Lush Campus Surroundings & Dining Walkway' },
                                                ].map((img, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="group rounded-xl border-2 border-orange-200/90 overflow-hidden bg-orange-50/20 shadow-sm hover:shadow-lg hover:border-[#FF6600] transition-all duration-300 relative"
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
                                        </div>
                                    )}
                                </div>
                            </>
        </CampusLifeLayout>
    );
};

export default CafeteriaPage;
