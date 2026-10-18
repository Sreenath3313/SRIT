import React, { useState } from 'react';
import {
    ChevronRight,
    ChevronLeft,
    ChevronDown,
    Phone,
    Quote,
    BookOpen,
    Library as LibraryIcon,
    Layers,
    BookMarked,
    FileText,
    Globe,
    Cpu,
    ShieldCheck,
    Users,
    Calendar,
    ExternalLink,
    CheckCircle2
} from 'lucide-react';
import CampusLifeLayout from './CampusLifeLayout';
import libraryDetailsData from '../../../data/libraryDetailsData.json';

export const CentralLibraryPage: React.FC = () => {
    // Accordions state: 10 official dropdown sections
    const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
        'at-a-glance': true,
        'library-committee': false,
        'titles-volumes': false,
        'print-journals': false,
        'online-journals': false,
        'eresources': false,
        'library-automation': false,
        'rules-regulations': false,
        'team': false,
        'moms': false,
    });

    const toggleAccordion = (id: string) => {
        setOpenAccordions((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Data shortcuts from libraryDetailsData.json
    const committeeRows = libraryDetailsData.library_committee_members?.rows?.slice(2) || [];
    const titlesAndVolumesRows = libraryDetailsData.titles_and_volumes?.rows?.slice(1) || [];
    const printJournalsRows = libraryDetailsData.print_journals?.rows?.slice(1) || [];
    const onlineJournalsRows = libraryDetailsData.online_journals?.rows?.slice(2) || [];
    const eresourcesRows = libraryDetailsData.eresources?.rows?.slice(2) || [];
    const momsRows = libraryDetailsData.moms?.rows?.slice(1) || [];

    return (
        <CampusLifeLayout activeSectionId="library">
            <div className="space-y-6 sm:space-y-8">
                {/* === HERO BANNER IMAGE (Full Width Official Image from srit.ac.in/library/) === */}
                <div className="rounded-xl overflow-hidden border border-neutral-200/80 bg-white shadow-sm">
                    <div className="relative aspect-[21/9] sm:aspect-[24/9] lg:aspect-[28/9] w-full bg-neutral-100 overflow-hidden">
                        <img
                            src="/library-img.jpg"
                            alt="SRIT Central Library - Knowledge Center"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/optimized/library.webp.webp';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4 sm:p-6 lg:p-8">
                            <div className="text-white max-w-3xl">
                                <span className="inline-block px-3 py-1 rounded-full bg-[#FF6600] text-white text-xs font-black tracking-wider uppercase mb-2">
                                    Knowledge Hub
                                </span>
                                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-md">
                                    Central Library &amp; Information Center
                                </h1>
                                <p className="text-xs sm:text-sm text-neutral-200 font-medium mt-1 line-clamp-2">
                                    A vibrant repository managing over 53,290 volumes, 4,448 titles, international journals, digital databases, and advanced computer stations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* === ABOUT CENTRAL LIBRARY SECTION === */}
                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column */}
                        <div className="lg:col-span-7 space-y-4">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[#FF6600] text-[11px] font-bold uppercase tracking-wider mb-2">
                                    <BookOpen size={13} />
                                    <span>Library &amp; Information Center</span>
                                </div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                    About <span className="text-[#FF6600]">Central Library</span>
                                </h2>
                            </div>

                            {/* Philosophy Callout Quote */}
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent border-l-4 border-[#FF6600] p-4 sm:p-4.5 shadow-2xs">
                                <div className="flex items-start gap-3">
                                    <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6600] shrink-0 mt-0.5 opacity-90" />
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

                            {/* Official Paragraphs */}
                            <div className="space-y-3.5 text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                <p>
                                    The main aim of the Library is to provide necessary support for teaching, learning, and research activities of the Institute by creating state-of-the-art facilities and offering innovative services to the academic community. The library manages knowledge, both in print and digital formats. Knowledge resources play a key role in the growth of any educational institution.
                                </p>

                                <p>
                                    The library consists of a rich collection of <strong className="text-[#FF6600] font-bold">53,290 Volumes</strong>, <strong className="text-[#FF6600] font-bold">4,448 Titles</strong>, and <strong className="text-[#FF6600] font-bold">36+ National &amp; International Journals/Magazines</strong>. The Digital Library constitutes <strong className="text-[#FF6600] font-bold">35 computer systems</strong> in order to access E-journals, E-books, and E-learning platforms.
                                </p>

                                <p>
                                    The Library &amp; Information Center provides uncompromising information and intellectual requirements to students and faculty with a user-friendly approach. It facilitates a fully integrated and dynamic environment for all academic studies. The Library is <strong className="text-neutral-900 font-bold">Fully Computerized</strong> using an <span className="text-[#FF6600] font-semibold">Integrated Library Management Software (ECAP)</span> with automated bar-coding and <span className="text-[#FF6600] font-semibold">On-line Public Access Catalogue (OPAC)</span> accessible across the campus intranet.
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

                {/* === KEY METRIC CARDS === */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                        { label: 'Total Volumes', val: '53,290', icon: BookOpen },
                        { label: 'Book Titles', val: '4,448', icon: BookMarked },
                        { label: 'Carpet Area', val: '463.2 Sq.m', icon: Layers },
                        { label: 'Reading Seats', val: '150 Capacity', icon: Users },
                        { label: 'Digital PCs', val: '35 High-Speed', icon: Cpu },
                        { label: 'Journals / Mag', val: '36+ Nat & Int', icon: FileText },
                    ].map((m, idx) => {
                        const Icon = m.icon;
                        return (
                            <div
                                key={idx}
                                className="p-3.5 border border-neutral-200 bg-white rounded-xl shadow-2xs hover:border-[#FF6600]/60 transition-colors"
                            >
                                <div className="h-8 w-8 rounded-lg bg-orange-50 text-[#FF6600] flex items-center justify-center mb-2">
                                    <Icon size={18} />
                                </div>
                                <div className="text-lg sm:text-xl font-black text-neutral-900 leading-none">
                                    {m.val}
                                </div>
                                <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mt-1">
                                    {m.label}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ========================================================================= */}
                {/* === ALL 10 OFFICIAL ACCORDIONS / DROPDOWNS FROM SRIT LIBRARY COMMITTEE === */}
                {/* ========================================================================= */}
                <div className="space-y-3.5">
                    <div className="flex items-center gap-2.5 pb-1">
                        <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                        <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                            Library Information &amp; Official Records
                        </h2>
                    </div>

                    {/* --- [1] At a Glance --- */}
                    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden shadow-2xs">
                        <button
                            type="button"
                            onClick={() => toggleAccordion('at-a-glance')}
                            className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 hover:bg-orange-50/50 transition-colors text-left cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
                                <span className="font-serif font-black text-base sm:text-lg text-neutral-900">
                                    1. At a Glance (Infrastructure &amp; Five Laws of Library Science)
                                </span>
                            </div>
                            <ChevronDown
                                className={`h-5 w-5 text-[#FF6600] transition-transform duration-200 ${
                                    openAccordions['at-a-glance'] ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {openAccordions['at-a-glance'] && (
                            <div className="p-4 sm:p-6 border-t border-neutral-200 space-y-5 bg-white">
                                <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200/80">
                                    <h3 className="font-serif font-black text-center text-[#FF6600] text-base sm:text-lg italic mb-2">
                                        "Library is the heart of any Institution"
                                    </h3>
                                    <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                                        Father of Library Science in India <strong>Dr. S. R. Ranganathan</strong> proposed five fundamental laws of Library Science, which SRIT Library strictly adheres to in serving its academic fraternity:
                                    </p>
                                    <ol className="list-decimal list-inside mt-2.5 space-y-1 text-sm sm:text-[15px] lg:text-base font-semibold text-neutral-800">
                                        <li>Books are for use (Not for preservation).</li>
                                        <li>Every reader his or her book.</li>
                                        <li>Every book its reader.</li>
                                        <li>Save the time of the reader.</li>
                                        <li>A library is a growing organism.</li>
                                    </ol>
                                </div>

                                {/* Table: Library Details */}
                                <div>
                                    <h4 className="font-bold text-sm text-neutral-900 mb-2">
                                        Official Library Dimensions &amp; Operational Timings
                                    </h4>
                                    <div className="overflow-x-auto border border-neutral-200 rounded-lg">
                                        <table className="w-full text-left text-xs sm:text-sm border-collapse">
                                            <thead>
                                                <tr className="bg-[#FF6600] text-white font-black">
                                                    <th className="py-2.5 px-4">Parameter / Facility</th>
                                                    <th className="py-2.5 px-4">Specification / Statistics</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-neutral-200">
                                                {[
                                                    ['Library Carpet Area', '463.221 Sq.mts.'],
                                                    ['Reading Space', '442.085 Sq.mts.'],
                                                    ['Reading Hall Seating Capacity', '150 Students'],
                                                    ['Library Working Timings', '9:00 AM to 5:30 PM (All working days)'],
                                                    ['Circulation & Transactions', '9:30 AM to 4:30 PM'],
                                                    ['Total No. of Titles', '4,448 Titles'],
                                                    ['Total No. of Volumes', '53,290 Volumes'],
                                                    ['Total No. of National Journals', '11 Subscribed'],
                                                    ['Total No. of International Journals', '24 Subscribed'],
                                                    ['Total No. of Newspapers', '04 Daily Editions'],
                                                    ['Digital Library Computers', '35 High-Speed Workstations'],
                                                    ['Departmental Libraries', '06 Independent Dept Libraries'],
                                                ].map(([param, val], idx) => (
                                                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}>
                                                        <td className="py-2.5 px-4 font-bold text-neutral-900">{param}</td>
                                                        <td className="py-2.5 px-4 font-semibold text-[#FF6600]">{val}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- [2] Library Committee --- */}
                    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden shadow-2xs">
                        <button
                            type="button"
                            onClick={() => toggleAccordion('library-committee')}
                            className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 hover:bg-orange-50/50 transition-colors text-left cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
                                <span className="font-serif font-black text-base sm:text-lg text-neutral-900">
                                    2. Library Committee (Composition &amp; Faculty Members)
                                </span>
                            </div>
                            <ChevronDown
                                className={`h-5 w-5 text-[#FF6600] transition-transform duration-200 ${
                                    openAccordions['library-committee'] ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {openAccordions['library-committee'] && (
                            <div className="p-4 sm:p-6 border-t border-neutral-200 bg-white space-y-4">
                                <p className="text-sm sm:text-[15px] text-neutral-600">
                                    The Library Committee formulates policies, evaluates procurement demands, and ensures superior library services across all engineering departments.
                                </p>
                                <div className="overflow-x-auto border border-neutral-200 rounded-lg">
                                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                                        <thead>
                                            <tr className="bg-[#171b24] text-white font-black">
                                                <th className="py-2.5 px-3 w-14 text-center">S.No.</th>
                                                <th className="py-2.5 px-4">Name of Faculty Member</th>
                                                <th className="py-2.5 px-4">Designation</th>
                                                <th className="py-2.5 px-4">Role in Committee</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-200">
                                            {committeeRows.map((r: string[], idx: number) => {
                                                const sNo = r[1] || `${idx + 1}`;
                                                const name = r[2] || '-';
                                                const desig = r[3] || '-';
                                                const role = r[4] || '-';
                                                return (
                                                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}>
                                                        <td className="py-2.5 px-3 text-center font-bold text-neutral-500">{sNo}</td>
                                                        <td className="py-2.5 px-4 font-bold text-neutral-900">{name}</td>
                                                        <td className="py-2.5 px-4 text-neutral-700">{desig}</td>
                                                        <td className="py-2.5 px-4 font-bold text-[#FF6600]">{role}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- [3] No. of Titles and Volumes Department-wise --- */}
                    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden shadow-2xs">
                        <button
                            type="button"
                            onClick={() => toggleAccordion('titles-volumes')}
                            className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 hover:bg-orange-50/50 transition-colors text-left cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
                                <span className="font-serif font-black text-base sm:text-lg text-neutral-900">
                                    3. No. of Titles &amp; Volumes (Department-Wise Distribution)
                                </span>
                            </div>
                            <ChevronDown
                                className={`h-5 w-5 text-[#FF6600] transition-transform duration-200 ${
                                    openAccordions['titles-volumes'] ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {openAccordions['titles-volumes'] && (
                            <div className="p-4 sm:p-6 border-t border-neutral-200 bg-white space-y-4">
                                <div className="overflow-x-auto border border-neutral-200 rounded-lg">
                                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                                        <thead>
                                            <tr className="bg-[#FF6600] text-white font-black">
                                                <th className="py-2.5 px-3 w-14 text-center">S.No.</th>
                                                <th className="py-2.5 px-4">Department / Branch</th>
                                                <th className="py-2.5 px-4 text-right">Number of Titles</th>
                                                <th className="py-2.5 px-4 text-right">Number of Volumes</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-200">
                                            {titlesAndVolumesRows.map((r: string[], idx: number) => {
                                                const sNo = r[1] || `${idx + 1}`;
                                                const branch = r[2] || '-';
                                                const titles = r[3] || '-';
                                                const volumes = r[4] || '-';
                                                const isTotal = branch.toLowerCase().includes('total');
                                                return (
                                                    <tr
                                                        key={idx}
                                                        className={
                                                            isTotal
                                                                ? 'bg-orange-100 font-black text-neutral-900'
                                                                : idx % 2 === 0
                                                                ? 'bg-white'
                                                                : 'bg-neutral-50/50'
                                                        }
                                                    >
                                                        <td className="py-2.5 px-3 text-center font-bold text-neutral-600">{sNo}</td>
                                                        <td className="py-2.5 px-4 font-bold text-neutral-900">{branch}</td>
                                                        <td className="py-2.5 px-4 text-right font-semibold text-neutral-800">{titles}</td>
                                                        <td className="py-2.5 px-4 text-right font-black text-[#FF6600]">{volumes}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- [4] Details of Print Journals --- */}
                    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden shadow-2xs">
                        <button
                            type="button"
                            onClick={() => toggleAccordion('print-journals')}
                            className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 hover:bg-orange-50/50 transition-colors text-left cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
                                <span className="font-serif font-black text-base sm:text-lg text-neutral-900">
                                    4. Details of Print Journals (35 Subscribed Periodicals)
                                </span>
                            </div>
                            <ChevronDown
                                className={`h-5 w-5 text-[#FF6600] transition-transform duration-200 ${
                                    openAccordions['print-journals'] ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {openAccordions['print-journals'] && (
                            <div className="p-4 sm:p-6 border-t border-neutral-200 bg-white space-y-4">
                                <div className="overflow-x-auto border border-neutral-200 rounded-lg max-h-[500px]">
                                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                                        <thead className="sticky top-0 bg-[#171b24] text-white font-black z-10">
                                            <tr>
                                                <th className="py-2.5 px-3 w-14 text-center">S.No.</th>
                                                <th className="py-2.5 px-3">Type</th>
                                                <th className="py-2.5 px-4">Name of Journal</th>
                                                <th className="py-2.5 px-3">ISSN</th>
                                                <th className="py-2.5 px-3">Periodicity</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-200">
                                            {printJournalsRows.map((r: string[], idx: number) => {
                                                const sNo = r[1] || `${idx + 1}`;
                                                const type = r[2] || '-';
                                                const name = r[3] || '-';
                                                const issn = r[4] || '-';
                                                const periodicity = r[5] || '-';
                                                return (
                                                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}>
                                                        <td className="py-2 px-3 text-center font-bold text-neutral-500">{sNo}</td>
                                                        <td className="py-2 px-3">
                                                            <span
                                                                className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                                                    type.toLowerCase().includes('inter')
                                                                        ? 'bg-blue-100 text-blue-800'
                                                                        : 'bg-emerald-100 text-emerald-800'
                                                                }`}
                                                            >
                                                                {type}
                                                            </span>
                                                        </td>
                                                        <td className="py-2 px-4 font-bold text-neutral-900">{name}</td>
                                                        <td className="py-2 px-3 font-mono text-xs text-neutral-600">{issn}</td>
                                                        <td className="py-2 px-3 text-neutral-700">{periodicity}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- [5] Details of Online Journals --- */}
                    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden shadow-2xs">
                        <button
                            type="button"
                            onClick={() => toggleAccordion('online-journals')}
                            className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 hover:bg-orange-50/50 transition-colors text-left cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
                                <span className="font-serif font-black text-base sm:text-lg text-neutral-900">
                                    5. Details of Online Journals &amp; Digital Periodicals
                                </span>
                            </div>
                            <ChevronDown
                                className={`h-5 w-5 text-[#FF6600] transition-transform duration-200 ${
                                    openAccordions['online-journals'] ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {openAccordions['online-journals'] && (
                            <div className="p-4 sm:p-6 border-t border-neutral-200 bg-white space-y-4">
                                <div className="overflow-x-auto border border-neutral-200 rounded-lg">
                                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                                        <thead>
                                            <tr className="bg-[#FF6600] text-white font-black">
                                                <th className="py-2.5 px-3 w-14 text-center">S.No.</th>
                                                <th className="py-2.5 px-4">Name of Online Journal / Serial</th>
                                                <th className="py-2.5 px-4">Access Link</th>
                                                <th className="py-2.5 px-3">Periodicity</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-200">
                                            {onlineJournalsRows.map((r: string[], idx: number) => {
                                                const sNo = r[1] || `${idx + 1}`;
                                                const name = r[2] || '-';
                                                const link = r[3] || '-';
                                                const periodicity = r[4] || '-';
                                                const fullHref = link.startsWith('http') ? link : `https://${link}`;
                                                return (
                                                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}>
                                                        <td className="py-2.5 px-3 text-center font-bold text-neutral-500">{sNo}</td>
                                                        <td className="py-2.5 px-4 font-bold text-neutral-900">{name}</td>
                                                        <td className="py-2.5 px-4">
                                                            {link && link !== '-' ? (
                                                                <a
                                                                    href={fullHref}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-1 text-[#FF6600] hover:underline font-bold"
                                                                >
                                                                    <span>{link}</span>
                                                                    <ExternalLink size={12} />
                                                                </a>
                                                            ) : (
                                                                '-'
                                                            )}
                                                        </td>
                                                        <td className="py-2.5 px-3 text-neutral-700">{periodicity || 'Regular'}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- [6] Details of e-resources available @ SRIT --- */}
                    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden shadow-2xs">
                        <button
                            type="button"
                            onClick={() => toggleAccordion('eresources')}
                            className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 hover:bg-orange-50/50 transition-colors text-left cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
                                <span className="font-serif font-black text-base sm:text-lg text-neutral-900">
                                    6. Details of e-Resources Available @ SRIT (DELNET, NDLI, JNTUA, ReP)
                                </span>
                            </div>
                            <ChevronDown
                                className={`h-5 w-5 text-[#FF6600] transition-transform duration-200 ${
                                    openAccordions['eresources'] ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {openAccordions['eresources'] && (
                            <div className="p-4 sm:p-6 border-t border-neutral-200 bg-white space-y-4">
                                <div className="space-y-4">
                                    {eresourcesRows.map((r: string[], idx: number) => {
                                        const title = r[2] || `e-Resource ${idx + 1}`;
                                        const desc = r[3] || '';
                                        const url = r[4] || '';
                                        const fullHref = url.startsWith('http') ? url : `https://${url}`;

                                        return (
                                            <div
                                                key={idx}
                                                className="border border-neutral-200 rounded-xl p-4 sm:p-5 bg-neutral-50/40 hover:border-[#FF6600]/60 transition-colors space-y-2"
                                            >
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <Globe className="h-5 w-5 text-[#FF6600]" />
                                                        <h4 className="font-serif font-bold text-base text-neutral-900">
                                                            {title}
                                                        </h4>
                                                    </div>
                                                    {url && (
                                                        <a
                                                            href={fullHref}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-[#FF6600] text-white hover:bg-[#e05a00] transition-colors"
                                                        >
                                                            <span>Access Portal</span>
                                                            <ExternalLink size={12} />
                                                        </a>
                                                    )}
                                                </div>
                                                <p className="text-sm sm:text-[15px] text-neutral-700 leading-relaxed text-justify">
                                                    {desc}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- [7] Library Automation --- */}
                    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden shadow-2xs">
                        <button
                            type="button"
                            onClick={() => toggleAccordion('library-automation')}
                            className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 hover:bg-orange-50/50 transition-colors text-left cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
                                <span className="font-serif font-black text-base sm:text-lg text-neutral-900">
                                    7. Library Automation &amp; Bar-Coding System (ECAP)
                                </span>
                            </div>
                            <ChevronDown
                                className={`h-5 w-5 text-[#FF6600] transition-transform duration-200 ${
                                    openAccordions['library-automation'] ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {openAccordions['library-automation'] && (
                            <div className="p-4 sm:p-6 border-t border-neutral-200 bg-white space-y-4">
                                <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-200/70 space-y-3">
                                    <h4 className="font-serif font-bold text-base text-[#FF6600]">
                                        Engineering College Automation Package (ECAP)
                                    </h4>
                                    <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                        The SRIT Central Library is completely automated using <strong>ECAP (Engineering College Automation Package)</strong>, developed by Web Pros Solutions Pvt. Ltd., Visakhapatnam. ECAP is a user-friendly, multi-user, and multitasking library management package used at SRIT since <strong>2013</strong>.
                                    </p>
                                    <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                        Advanced <strong>Barcode Technology</strong> is integrated throughout the data-entry and cataloging pipeline. The use of barcode scanning dramatically elevates check-in/check-out efficiency and eliminates human error. In SRIT Library, each book carries unique dual barcodes matching its accession number, generated in-house via ECAP barcode sticker printers.
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-bold text-neutral-800">
                                        {['Book Status Tracking', 'Book Reservation', 'Circulation & Dues', 'OPAC Search', 'Departmental Synch', 'Fine Receipts', 'Stock Verification', 'Automated Barcodes'].map((mod, i) => (
                                            <div key={i} className="flex items-center gap-1.5 p-2 rounded bg-white border border-neutral-200">
                                                <CheckCircle2 size={13} className="text-[#FF6600] shrink-0" />
                                                <span className="truncate">{mod}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- [8] Rules & Regulations --- */}
                    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden shadow-2xs">
                        <button
                            type="button"
                            onClick={() => toggleAccordion('rules-regulations')}
                            className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 hover:bg-orange-50/50 transition-colors text-left cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
                                <span className="font-serif font-black text-base sm:text-lg text-neutral-900">
                                    8. Library Rules &amp; Regulations (General &amp; Circulation)
                                </span>
                            </div>
                            <ChevronDown
                                className={`h-5 w-5 text-[#FF6600] transition-transform duration-200 ${
                                    openAccordions['rules-regulations'] ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {openAccordions['rules-regulations'] && (
                            <div className="p-4 sm:p-6 border-t border-neutral-200 bg-white space-y-6">
                                <div>
                                    <h4 className="font-bold text-sm text-neutral-900 mb-2 flex items-center gap-2">
                                        <ShieldCheck size={16} className="text-[#FF6600]" />
                                        <span>General Library Rules</span>
                                    </h4>
                                    <ol className="list-decimal list-inside space-y-1.5 text-sm sm:text-[15px] text-neutral-700">
                                        <li>Faculty members and students of SRIT are allowed to use the library services. Members must always produce their Identity cards while entering.</li>
                                        <li>Readers should observe strict “silence” inside the library.</li>
                                        <li>Use of mobile phones is strictly prohibited inside the library reading areas.</li>
                                        <li>Members are solely responsible for books issued against their membership.</li>
                                        <li>Readers are not allowed to bring personal text books inside the library stack room.</li>
                                        <li>Readers should not mark, scratch, disfigure, or damage library volumes.</li>
                                        <li>Eatables and drinks are strictly not permitted inside the library.</li>
                                        <li>Library functions from 9:00 AM to 6:00 PM on all working days.</li>
                                    </ol>
                                </div>

                                <div className="pt-2 border-t border-neutral-200">
                                    <h4 className="font-bold text-sm text-neutral-900 mb-2 flex items-center gap-2">
                                        <BookMarked size={16} className="text-[#FF6600]" />
                                        <span>Circulation &amp; Borrowing Rules</span>
                                    </h4>
                                    <ol className="list-decimal list-inside space-y-1.5 text-sm sm:text-[15px] text-neutral-700">
                                        <li>Book borrowers must verify the physical condition of the book before taking it out.</li>
                                        <li>Books are normally issued for a duration of 14 days (2 Weeks), except reference copies.</li>
                                        <li>Renewal of any book depends on borrower demand and reservations.</li>
                                        <li>Textbooks with single reference copies shall not be issued.</li>
                                        <li>Reference volumes, Theses, and Project reports are strictly for in-library reference only.</li>
                                        <li>The Librarian reserves the right to recall any issued book before the due date.</li>
                                        <li>Sub-lending or transferring books to third parties is strictly prohibited.</li>
                                    </ol>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- [9] Team --- */}
                    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden shadow-2xs">
                        <button
                            type="button"
                            onClick={() => toggleAccordion('team')}
                            className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 hover:bg-orange-50/50 transition-colors text-left cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
                                <span className="font-serif font-black text-base sm:text-lg text-neutral-900">
                                    9. Library Team &amp; Supporting Staff
                                </span>
                            </div>
                            <ChevronDown
                                className={`h-5 w-5 text-[#FF6600] transition-transform duration-200 ${
                                    openAccordions['team'] ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {openAccordions['team'] && (
                            <div className="p-4 sm:p-6 border-t border-neutral-200 bg-white space-y-4">
                                <div className="overflow-x-auto border border-neutral-200 rounded-lg">
                                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                                        <thead>
                                            <tr className="bg-[#FF6600] text-white font-black">
                                                <th className="py-2.5 px-3 w-14 text-center">S.No.</th>
                                                <th className="py-2.5 px-4">Name of the Staff Member</th>
                                                <th className="py-2.5 px-4">Designation</th>
                                                <th className="py-2.5 px-4">Qualification</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-200">
                                            {[
                                                ['1.', 'Dr. S. Lakshmi', 'Librarian', 'M.A., M.L.I.Sc., M.Phil., Ph.D.'],
                                                ['2.', 'Ms. Y. Jyothi', 'Assistant Librarian', 'M.L.I.Sc., M.B.A.'],
                                                ['3.', 'Ms. A. Aruna Jyothi', 'Book Keeper', 'B.A.'],
                                                ['4.', 'Ms. K. Hemalatha', 'Book Keeper', 'Intermediate'],
                                                ['5.', 'Mr. D. Lal Basha', 'Book Keeper', 'B.A.'],
                                            ].map(([sNo, name, desig, qual], idx) => (
                                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}>
                                                    <td className="py-2.5 px-3 text-center font-bold text-neutral-500">{sNo}</td>
                                                    <td className="py-2.5 px-4 font-bold text-neutral-900">{name}</td>
                                                    <td className="py-2.5 px-4 font-bold text-[#FF6600]">{desig}</td>
                                                    <td className="py-2.5 px-4 text-neutral-700">{qual}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- [10] MOMs --- */}
                    <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden shadow-2xs">
                        <button
                            type="button"
                            onClick={() => toggleAccordion('moms')}
                            className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 hover:bg-orange-50/50 transition-colors text-left cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
                                <span className="font-serif font-black text-base sm:text-lg text-neutral-900">
                                    10. Minutes of Meetings (MOMs &amp; Resolutions)
                                </span>
                            </div>
                            <ChevronDown
                                className={`h-5 w-5 text-[#FF6600] transition-transform duration-200 ${
                                    openAccordions['moms'] ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {openAccordions['moms'] && (
                            <div className="p-4 sm:p-6 border-t border-neutral-200 bg-white space-y-4">
                                <p className="text-sm sm:text-[15px] text-neutral-600">
                                    Official documented proceedings and resolutions approved by the Library Committee across academic sessions:
                                </p>
                                <div className="overflow-x-auto border border-neutral-200 rounded-lg">
                                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                                        <thead>
                                            <tr className="bg-[#171b24] text-white font-black">
                                                <th className="py-2.5 px-3 w-14 text-center">S.No.</th>
                                                <th className="py-2.5 px-4">Academic Year</th>
                                                <th className="py-2.5 px-4">Date of Meeting</th>
                                                <th className="py-2.5 px-4 text-center">Status / Document</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-200">
                                            {momsRows
                                                .filter((r: string[]) => r[1] && r[1].trim() !== '')
                                                .map((r: string[], idx: number) => {
                                                    const sNo = r[1] || `${idx + 1}`;
                                                    const ay = r[2] || '-';
                                                    const date = r[3] || '-';
                                                    return (
                                                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}>
                                                            <td className="py-2.5 px-3 text-center font-bold text-neutral-500">{sNo}</td>
                                                            <td className="py-2.5 px-4 font-bold text-neutral-900">{ay}</td>
                                                            <td className="py-2.5 px-4 font-semibold text-neutral-700">{date}</td>
                                                            <td className="py-2.5 px-4 text-center">
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-[#FF6600]">
                                                                    <FileText size={12} />
                                                                    Recorded
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>



                {/* === CONTACT & HELP DESK === */}
                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm space-y-3">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
                        <Phone size={16} className="text-[#FF6600]" />
                        <span>Library Administration &amp; Help Desk</span>
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-3">
                        {[
                            { role: 'Librarian', name: 'Dr. S. Lakshmi', email: 'library@srit.ac.in', phone: '91-951 561 1111' },
                            { role: 'Assistant Librarian', name: 'Ms. Y. Jyothi', email: 'asst.librarian@srit.ac.in', phone: '91-951 561 1111' },
                        ].map((c, ci) => (
                            <div
                                key={ci}
                                className="rounded-xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/30 p-3.5 flex items-center justify-between"
                            >
                                <div>
                                    <span className="text-[10px] font-bold text-[#FF6600] uppercase tracking-wider block">
                                        {c.role}
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-neutral-900">
                                        {c.name}
                                    </span>
                                    <span className="text-[11px] text-neutral-500 block mt-0.5">
                                        {c.email}
                                    </span>
                                </div>
                                <a
                                    href={`tel:${c.phone}`}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-orange-200 hover:bg-[#FF6600] hover:text-white hover:border-[#FF6600] px-2.5 py-1 text-xs font-semibold text-neutral-800 transition shadow-2xs"
                                >
                                    <Phone size={11} />
                                    <span>{c.phone}</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CampusLifeLayout>
    );
};

export default CentralLibraryPage;
