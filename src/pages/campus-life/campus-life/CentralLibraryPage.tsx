import React, { useState } from 'react';
import {
    ChevronRight, ChevronLeft, Phone, Quote, BookOpen
} from 'lucide-react';
import CampusLifeLayout from './CampusLifeLayout';
import { campusLifeSections } from './types';

export const CentralLibraryPage: React.FC = () => {
    const [isLibraryTableOpen, setIsLibraryTableOpen] = useState(false);
    const [isLibraryViewAll, setIsLibraryViewAll] = useState(false);
    const [libraryGalleryIndex, setLibraryGalleryIndex] = useState(0);

    const activeSection = campusLifeSections.find((s) => s.id === 'library')!;

    const galleryImages = [
        { url: '/optimized/library.webp.webp', caption: 'Central Reading & Reference Section' },
        { url: '/optimized/Library 1.JPG.webp', caption: 'Study Cubicles & Stack Area' },
        { url: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1588&auto=format&fit=crop', caption: 'Periodicals & Research Hub' },
    ];

    return (
        <CampusLifeLayout activeSectionId="library">
            {/* === 2. ABOUT LIBRARY (Side-by-Side: Text Left + Explore Button, Image Right) === */}
            <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column */}
                    <div className="lg:col-span-7 space-y-4">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[#FF5422] text-[11px] font-bold uppercase tracking-wider mb-2">
                                <BookOpen size={13} />
                                <span>Library &amp; Information Center</span>
                            </div>
                            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight">
                                About <span className="text-[#FF5422]">Central Library</span>
                            </h2>
                        </div>

                        {/* Highlighted Quote Callout */}
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent border-l-4 border-[#FF5422] p-4 sm:p-4.5 shadow-2xs">
                            <div className="flex items-start gap-3">
                                <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF5422] shrink-0 mt-0.5 opacity-90" />
                                <div>
                                    <p className="font-serif italic font-bold text-neutral-900 text-base sm:text-lg lg:text-xl leading-snug">
                                        “Without libraries what have we? We have no past and no future.”
                                    </p>
                                    <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500 mt-1 block">
                                        Institutional Philosophy &amp; Academic Vision
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Institutional Paragraphs from Official Image */}
                        <div className="space-y-3.5 text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 text-justify">
                            <p>
                                The main aim of the Library is to provide necessary support for teaching, learning, and research activities of the Institute by creating state-of-the-art facilities and offering innovative services to the academic community. The library manages knowledge, both in print and digital formats. Knowledge resources play a key role for the growth of any educational institution.
                            </p>

                            <p>
                                The library consists the collection of <strong className="text-[#FF5422] font-bold">51,477 Volumes</strong>, <strong className="text-[#FF5422] font-bold">36+ National &amp; International Journals/Magazines</strong> as on August, 2018. Digital library constitutes <strong className="text-[#FF5422] font-bold">12 computer systems</strong> in order to access E-journals, E-books and E-learning and so on.
                            </p>

                            <p>
                                Library &amp; Information Center provides uncompromising information and intellectual requirements to students and faculty with user-friendly approach. It facilitates a fully integrated and dynamic environment for all academic studies. The Library is <strong className="text-neutral-900 font-bold">Fully Computerized</strong> using an <span className="text-[#FF5422] font-semibold">Integrated Library Management Software</span>. <span className="text-[#FF5422] font-semibold">On-line Public Access Catalogue (OPAC)</span> facility is available in the Library and it can be accessed through intranet.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Library Reading Hall Image */}
                    <div className="lg:col-span-5 self-stretch flex flex-col justify-center min-h-[260px]">
                        <div className="rounded-xl overflow-hidden border-2 border-orange-200/90 shadow-md bg-gradient-to-br from-white via-orange-50/40 to-orange-100/30 group relative flex-1 w-full min-h-[260px] flex items-center justify-center p-2">
                            <img
                                src="/optimized/library.webp.webp"
                                alt="SRIT Central Library Reading Hall"
                                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/digital_library.jpg';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>



            {/* === 5. RESOURCE SPECIFICATIONS TABLE (Collapsible) === */}
            {activeSection.tableData && (
                <div className="rounded-xl border-2 border-orange-200/90 bg-white shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-[#111827] via-[#1c1412] to-[#2b1610] px-5 py-4 sm:px-6 sm:py-4.5 flex flex-wrap items-center justify-between gap-3 text-white border-b-2 border-[#FF5422]">
                        <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5422] shadow-[0_0_10px_#FF5422]" />
                            <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-tight">
                                {activeSection.tableData.title}
                            </h3>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-300 bg-[#FF5422]/20 px-3 py-1 rounded-full border border-[#FF5422]/40 shadow-sm">
                            Verified Institutional Records
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
                                                className={`px-4 py-3.5 align-middle transition-colors ${ci === 0 ? 'pl-5 sm:pl-6 border-l-4 border-l-transparent group-hover:border-l-[#FF5422]' : ci === row.length - 1 ? 'pr-5 sm:pr-6' : ''}`}
                                            >
                                                {ci === 0 ? (
                                                    <div className="flex items-center gap-2.5 font-bold text-xs sm:text-[13px] text-neutral-900 group-hover:text-[#FF5422] transition-colors">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5422] shadow-[0_0_4px_#FF5422] shrink-0" />
                                                        <span>{cell}</span>
                                                    </div>
                                                ) : ci === 1 && String(cell).length <= 25 ? (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#FF5422]/10 text-[#FF5422] border border-[#FF5422]/30 shadow-2xs group-hover:bg-[#FF5422] group-hover:text-white group-hover:border-[#FF5422] transition-all duration-200 whitespace-nowrap">
                                                        {cell}
                                                    </span>
                                                ) : ci === 1 ? (
                                                    <div className="text-xs text-neutral-800 font-medium bg-orange-50/60 p-2 rounded-lg border border-orange-200/60 leading-relaxed group-hover:bg-white group-hover:border-orange-300 transition-colors">
                                                        {cell}
                                                    </div>
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

            {/* === 6. GALLERY (Horizontal Slider / Carousel with Left & Right Arrow Buttons) === */}
            <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <div className="flex items-center gap-2.5">
                        <span className="h-5 w-1.5 rounded-full bg-[#FF5422]" />
                        <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                            Library Gallery
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsLibraryViewAll(!isLibraryViewAll)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FF5422] hover:text-[#d43d0e] transition-colors group cursor-pointer"
                    >
                        <span>{isLibraryViewAll ? 'Show Carousel' : 'View All'}</span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {isLibraryViewAll ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {galleryImages.map((img, gi) => (
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
                                            (e.target as HTMLImageElement).src = '/optimized/library.webp.webp';
                                        }}
                                    />
                                </div>
                                <div className="px-3 py-2 bg-white border-t border-orange-100 text-center">
                                    <span className="text-[11.5px] font-bold text-neutral-800 line-clamp-1">{img.caption}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="relative group/libslider px-1">
                        <button
                            type="button"
                            onClick={() => setLibraryGalleryIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                            className="absolute -left-2.5 sm:-left-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-800 hover:text-white hover:bg-[#FF5422] hover:border-[#FF5422] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {galleryImages
                                .slice(libraryGalleryIndex, libraryGalleryIndex + 3)
                                .concat(
                                    libraryGalleryIndex + 3 > galleryImages.length
                                        ? galleryImages.slice(0, (libraryGalleryIndex + 3) % galleryImages.length)
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
                                                    (e.target as HTMLImageElement).src = '/optimized/library.webp.webp';
                                                }}
                                            />
                                        </div>
                                        <div className="px-3 py-2 bg-white border-t border-orange-100 text-center">
                                            <span className="text-[11.5px] font-bold text-neutral-800 line-clamp-1">{img.caption}</span>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => setLibraryGalleryIndex((prev) => (prev >= galleryImages.length - 1 ? 0 : prev + 1))}
                            className="absolute -right-2.5 sm:-right-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-800 hover:text-white hover:bg-[#FF5422] hover:border-[#FF5422] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                            aria-label="Next image"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>

            {/* === 7. CONTACTS === */}
            {activeSection.contacts && activeSection.contacts.length > 0 && (
                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm space-y-3">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
                        <Phone size={16} className="text-[#FF5422]" />
                        <span>Library Administration &amp; Help Desk</span>
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-3">
                        {activeSection.contacts.map((c, ci) => (
                            <div
                                key={ci}
                                className="rounded-xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/30 p-3.5 flex items-center justify-between"
                            >
                                <div>
                                    <span className="text-[10px] font-bold text-[#FF5422] uppercase tracking-wider block">
                                        {c.role}
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-neutral-900">
                                        {c.name}
                                    </span>
                                    {c.email && (
                                        <span className="text-[11px] text-neutral-500 block mt-0.5">
                                            {c.email}
                                        </span>
                                    )}
                                </div>
                                {c.phone && (
                                    <a
                                        href={`tel:${c.phone}`}
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-orange-200 hover:bg-[#FF5422] hover:text-white hover:border-[#FF5422] px-2.5 py-1 text-xs font-semibold text-neutral-800 transition shadow-2xs"
                                    >
                                        <Phone size={11} />
                                        <span>{c.phone}</span>
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </CampusLifeLayout>
    );
};

export default CentralLibraryPage;
