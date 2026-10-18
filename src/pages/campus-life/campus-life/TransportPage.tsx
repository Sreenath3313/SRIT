import React, { useState } from 'react';
import {
    ChevronRight, ChevronLeft, ChevronUp, ChevronDown
} from 'lucide-react';
import IframeWithLoader from '../../../components/common/IframeWithLoader';
import CampusLifeLayout from './CampusLifeLayout';
import { AccordionContainer, DepartmentAccordionRow } from '../../../components/common/DepartmentAccordion';

export const TransportPage: React.FC = () => {
    const [isTransportSpreadsheetOpen, setIsTransportSpreadsheetOpen] = useState(false);
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
                                <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                    About <span className="text-[#FF6600]">Transport Facilities</span>
                                </h2>
                            </div>

                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                The institution runs <strong className="text-[#FF6600] font-bold">30 buses</strong> covering all important points in <span className="text-[#FF6600] font-semibold">Anantapur City, Tadipatri, Dharmavaram &amp; Pamidi</span> towns with a total seating capacity of <strong className="text-[#FF6600] font-bold">1,528 students</strong>.
                            </p>

                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                To ensure convenient, safe, and punctual transit for day-scholar students and faculty members, <span className="text-[#FF6600] font-bold">Srinivasa Ramanujan Institute of Technology</span> operates a dedicated fleet of modern buses synchronized with daily academic and laboratory schedules.
                            </p>

                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                Every vehicle is maintained with stringent safety compliance, <span className="text-[#FF6600] font-semibold">speed governors</span>, first-aid equipment, and <span className="text-[#FF6600] font-semibold">experienced licensed drivers</span>. Clear route schedules and designated boarding points ensure students arrive and return safely every day.
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
                            </>
        </CampusLifeLayout>
    );
};

export default TransportPage;
// EOF
