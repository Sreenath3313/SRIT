import React, { useState } from 'react';
import {
    ChevronRight, ChevronLeft, ChevronUp, ChevronDown
} from 'lucide-react';
import IframeWithLoader from '../../../components/common/IframeWithLoader';
import CampusLifeLayout from './CampusLifeLayout';
import { AccordionContainer, DepartmentAccordionRow } from '../../../components/common/DepartmentAccordion';

export const TransportPage: React.FC = () => {
    const [isTransportSpreadsheetOpen, setIsTransportSpreadsheetOpen] = useState(false);
    const [isTransportViewAll, setIsTransportViewAll] = useState(false);
    const [transportGalleryIndex, setTransportGalleryIndex] = useState(0);
    const [isBusFeeOpen, setIsBusFeeOpen] = useState(false);
    const [isBusSeatingOpen, setIsBusSeatingOpen] = useState(false);

    return (
        <CampusLifeLayout activeSectionId="transport">
            <>
                {/* === 2. ABOUT TRANSPORT (Side-by-Side: Text Left + Explore Button, Image Right) === */}
                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column */}
                        <div className="lg:col-span-7 space-y-3.5">
                            <div className="flex items-center gap-2.5 pb-1">
                                <span className="h-5 w-1.5 rounded-full bg-[#FF5422]" />
                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                    About <span className="text-[#FF5422]">Transport Facilities</span>
                                </h2>
                            </div>

                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                The institution runs <strong className="text-[#FF5422] font-bold">30 buses</strong> covering all important points in <span className="text-[#FF5422] font-semibold">Anantapur City, Tadipatri, Dharmavaram &amp; Pamidi</span> towns with a total seating capacity of <strong className="text-[#FF5422] font-bold">1,528 students</strong>.
                            </p>

                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                To ensure convenient, safe, and punctual transit for day-scholar students and faculty members, <span className="text-[#FF5422] font-bold">Srinivasa Ramanujan Institute of Technology</span> operates a dedicated fleet of modern buses synchronized with daily academic and laboratory schedules.
                            </p>

                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                                Every vehicle is maintained with stringent safety compliance, <span className="text-[#FF5422] font-semibold">speed governors</span>, first-aid equipment, and <span className="text-[#FF5422] font-semibold">experienced licensed drivers</span>. Clear route schedules and designated boarding points ensure students arrive and return safely every day.
                            </p>

                            
                        </div>

                        {/* Right Column: Transport Fleet Image */}
                        <div className="lg:col-span-5 self-stretch flex flex-col justify-center min-h-[260px]">
                            <div className="rounded-xl overflow-hidden border-2 border-orange-200/90 shadow-md bg-gradient-to-br from-white via-orange-50/40 to-orange-100/30 group relative flex-1 w-full min-h-[260px] flex items-center justify-center p-2">
                                <img
                                    src="/optimized/Transport.jpg.webp"
                                    alt="SRIT Transport Bus Fleet"
                                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/optimized/Transport.webp.webp';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>



                                {/* === 5. OFFICIAL SPREADSHEETS (Bus Fee & Bus Seating Plan Accordions) === */}
                                <AccordionContainer className="w-full">
                                    {/* 1. Bus Fee Accordion */}
                                    <DepartmentAccordionRow
                                        id="transport-bus-fee"
                                        index={0}
                                        title="SRIT Transport Bus Fee Official Schedule"
                                        isOpen={isBusFeeOpen}
                                        onToggle={() => setIsBusFeeOpen(!isBusFeeOpen)}
                                    >
                                        <div className="p-3 sm:p-4 bg-white w-full animate-in fade-in duration-300">
                                            <div className="w-full h-[700px] rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-inner">
                                                <IframeWithLoader
                                                    title="SRIT Transport Bus Fee Official Sheet"
                                                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQQyx-PWU8lPnhfDlDBL7YtpWohDx_UrqnmXUy85XKXHV5r8P00qMIJ2QSBZliNgg/pubhtml?widget=true&headers=false"
                                                    className="w-full h-full border-0"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    </DepartmentAccordionRow>

                                    {/* 2. Bus Seating Plan Accordion */}
                                    <DepartmentAccordionRow
                                        id="transport-bus-seating"
                                        index={1}
                                        title="SRIT Transport Bus Seating Plan Official Records"
                                        isOpen={isBusSeatingOpen}
                                        onToggle={() => setIsBusSeatingOpen(!isBusSeatingOpen)}
                                    >
                                        <div className="p-3 sm:p-4 bg-white w-full animate-in fade-in duration-300">
                                            <div className="w-full h-[800px] rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-inner">
                                                <IframeWithLoader
                                                    title="SRIT Transport Bus Seating Plan Official Sheet"
                                                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTHDtLoCshdquMnpnnnLp-PF4FGzB8qG_g4r3A8hriwD97YzdM2lQ-2sJ9J0mVEaQ/pubhtml?widget=true&headers=false"
                                                    className="w-full h-full border-0"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    </DepartmentAccordionRow>
                                </AccordionContainer>

                                {/* === 6. GALLERY (Horizontal Slider / Carousel with Left & Right Arrow Buttons) === */}
                                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                                        <div className="flex items-center gap-2.5">
                                            <span className="h-5 w-1.5 rounded-full bg-[#FF5422]" />
                                            <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                                Gallery
                                            </h2>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsTransportViewAll(!isTransportViewAll)}
                                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FF5422] hover:text-[#d43d0e] transition-colors group cursor-pointer"
                                        >
                                            <span>{isTransportViewAll ? 'Show Carousel' : 'View All'}</span>
                                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>

                                    {isTransportViewAll ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {[
                                                { url: '/optimized/Transport.jpg.webp', caption: 'SRIT 30-Bus Transit Fleet & Campus Parking' },
                                                { url: '/optimized/Transport.webp.webp', caption: 'Punctual Daily Commute & Route Operations' },
                                                { url: '/optimized/CollegeMain.jpg.webp', caption: 'Campus Terminal & Main Entrance Gate' },
                                                { url: '/optimized/Campus.JPG.webp', caption: 'Sprawling 25+ Acre Campus Road Network' },
                                                { url: '/optimized/College 2.JPG.webp', caption: 'Academic Block Drop-off Zone & Courtyard' },
                                                { url: '/optimized/College 3.JPG.webp', caption: 'Scenic Landscaped Transit Pathways' },
                                            ].map((img, gi) => (
                                                <div
                                                    key={gi}
                                                    className="group rounded-xl overflow-hidden border border-orange-200/80 bg-white shadow-sm hover:shadow-lg hover:border-[#FF5422] hover:-translate-y-1 transition-all duration-300"
                                                >
                                                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-orange-50/30 flex items-center justify-center p-2">
                                                        <img
                                                            src={img.url}
                                                            alt={img.caption}
                                                            loading="lazy"
                                                            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = '/optimized/Transport.jpg.webp';
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="relative group/transportsilder px-1">
                                            <button
                                                type="button"
                                                onClick={() => setTransportGalleryIndex((prev) => (prev === 0 ? 3 : prev - 1))}
                                                className="absolute -left-2.5 sm:-left-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-800 hover:text-white hover:bg-[#FF5422] hover:border-[#FF5422] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                                                aria-label="Previous image"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {[
                                                    { url: '/optimized/Transport.jpg.webp', caption: 'SRIT 30-Bus Transit Fleet & Campus Parking' },
                                                    { url: '/optimized/Transport.webp.webp', caption: 'Punctual Daily Commute & Route Operations' },
                                                    { url: '/optimized/CollegeMain.jpg.webp', caption: 'Campus Terminal & Main Entrance Gate' },
                                                    { url: '/optimized/Campus.JPG.webp', caption: 'Sprawling 25+ Acre Campus Road Network' },
                                                    { url: '/optimized/College 2.JPG.webp', caption: 'Academic Block Drop-off Zone & Courtyard' },
                                                    { url: '/optimized/College 3.JPG.webp', caption: 'Scenic Landscaped Transit Pathways' },
                                                ]
                                                    .slice(transportGalleryIndex, transportGalleryIndex + 3)
                                                    .concat(
                                                        transportGalleryIndex + 3 > 6
                                                            ? [
                                                                  { url: '/optimized/Transport.jpg.webp', caption: 'SRIT 30-Bus Transit Fleet & Campus Parking' },
                                                                  { url: '/optimized/Transport.webp.webp', caption: 'Punctual Daily Commute & Route Operations' },
                                                                  { url: '/optimized/CollegeMain.jpg.webp', caption: 'Campus Terminal & Main Entrance Gate' },
                                                                  { url: '/optimized/Campus.JPG.webp', caption: 'Sprawling 25+ Acre Campus Road Network' },
                                                                  { url: '/optimized/College 2.JPG.webp', caption: 'Academic Block Drop-off Zone & Courtyard' },
                                                                  { url: '/optimized/College 3.JPG.webp', caption: 'Scenic Landscaped Transit Pathways' },
                                                              ].slice(0, (transportGalleryIndex + 3) % 6)
                                                            : []
                                                    )
                                                    .map((img, gi) => (
                                                        <div
                                                            key={gi}
                                                            className="group rounded-xl overflow-hidden border border-orange-200/80 bg-white shadow-sm hover:shadow-lg hover:border-[#FF5422] hover:-translate-y-1 transition-all duration-300"
                                                        >
                                                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-orange-50/30 flex items-center justify-center p-2">
                                                                <img
                                                                    src={img.url}
                                                                    alt={img.caption}
                                                                    loading="lazy"
                                                                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
                                                                    onError={(e) => {
                                                                        (e.target as HTMLImageElement).src = '/optimized/Transport.jpg.webp';
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => setTransportGalleryIndex((prev) => (prev >= 3 ? 0 : prev + 1))}
                                                className="absolute -right-2.5 sm:-right-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-800 hover:text-white hover:bg-[#FF5422] hover:border-[#FF5422] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
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

export default TransportPage;
// EOF
