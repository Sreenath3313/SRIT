import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
import { Building2, Briefcase, GraduationCap, Sparkles, RefreshCw } from 'lucide-react';
import fallbackCampusDrivesData from '../../data/campusDrivesData.json';

interface DriveRecord {
    'S. No'?: string;
    'Company Name'?: string;
    'Event Type'?: string;
    [key: string]: string | undefined;
}

type BatchTabId = '2026-2027' | '2025-26' | '2024-25 Batch';

const BATCH_TABS: { id: BatchTabId; label: string; gid: string }[] = [
    { id: '2026-2027', label: '2026-27 Batch', gid: '1926464080' },
    { id: '2025-26', label: '2025-26 Batch', gid: '1076634899' },
    { id: '2024-25 Batch', label: '2024-25 Batch', gid: '0' },
];

function parseCSV(text: string): string[][] {
    const lines: string[][] = [];
    let row: string[] = [];
    let cell = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                cell += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            row.push(cell.trim());
            cell = '';
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') i++;
            row.push(cell.trim());
            if (row.some((c) => c.length > 0)) lines.push(row);
            row = [];
            cell = '';
        } else {
            cell += char;
        }
    }
    if (cell.length > 0 || row.length > 0) {
        row.push(cell.trim());
        if (row.some((c) => c.length > 0)) lines.push(row);
    }
    return lines;
}

const recruiters = [
    'TCS', 'Cognizant', 'HCL', 'Infosys',
    'Lumen Technologies', 'Foxconn', 'Cadsys', 'Playto Labs',
    'IOpex Tech', 'Snovasys', 'INDO-MIM', 'IRMAI',
    'Calix', 'Wayvo.AI', 'IndiGrid', 'Bonito Designs'
];

const Placements: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [activeTab, setActiveTab] = useState<BatchTabId>('2026-2027');
    const [allData, setAllData] = useState<Record<BatchTabId, DriveRecord[]>>({
        '2026-2027': (fallbackCampusDrivesData['2026-2027']?.entries || []) as DriveRecord[],
        '2025-26': (fallbackCampusDrivesData['2025-26']?.entries || []) as DriveRecord[],
        '2024-25 Batch': (fallbackCampusDrivesData['2024-25 Batch']?.entries || []) as DriveRecord[],
    });
    const [isSyncing, setIsSyncing] = useState(false);

    const fetchLiveSheetData = async () => {
        setIsSyncing(true);
        try {
            const updatedData: Partial<Record<BatchTabId, DriveRecord[]>> = {};

            await Promise.all(
                BATCH_TABS.map(async (tab) => {
                    const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vSrEMEyriU1V7vBqzLIwvb9xstWfCC2VAhliaPpXSmvJI0-oF7-98Jerl9sRkidHy5DqIdtw3ZFSndF/pub?gid=${tab.gid}&single=true&output=csv&t=${Date.now()}`;
                    const res = await fetch(url);
                    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                    const csvText = await res.text();
                    const parsed = parseCSV(csvText);

                    let headerIdx = -1;
                    for (let i = 0; i < parsed.length; i++) {
                        const joined = parsed[i].join(' ').toLowerCase();
                        if (joined.includes('company name') || joined.includes('s. no') || joined.includes('s.no')) {
                            headerIdx = i;
                            break;
                        }
                    }

                    if (headerIdx !== -1 && headerIdx < parsed.length - 1) {
                        const headers = parsed[headerIdx].map((h) => h.trim());
                        const entries: DriveRecord[] = [];
                        for (let r = headerIdx + 1; r < parsed.length; r++) {
                            const row = parsed[r];
                            if (!row || !row.some((c) => c.length > 0)) continue;
                            const entry: DriveRecord = {};
                            headers.forEach((h, colIdx) => {
                                if (h && row[colIdx] !== undefined) {
                                    entry[h] = row[colIdx].trim();
                                }
                            });
                            const company = entry['Company Name'] || entry['Company'];
                            const sNo = entry['S. No'] || entry['S.No'] || entry['S.No.'];
                            if (company || sNo) {
                                entries.push(entry);
                            }
                        }
                        if (entries.length > 0) {
                            updatedData[tab.id] = entries;
                        }
                    }
                })
            );

            if (Object.keys(updatedData).length > 0) {
                setAllData((prev) => ({
                    ...prev,
                    ...(updatedData as Record<BatchTabId, DriveRecord[]>),
                }));
            }
        } catch {
            // Keep existing fallback data on error
        } finally {
            setIsSyncing(false);
        }
    };

    useEffect(() => {
        fetchLiveSheetData();
        const interval = setInterval(fetchLiveSheetData, 45000);
        return () => clearInterval(interval);
    }, []);

    const currentRecords = allData[activeTab] || [];

    const metrics = useMemo(() => {
        const total = currentRecords.length;
        const onCampus = currentRecords.filter((r) => (r['Event Type'] || '').toLowerCase().includes('on-campus') || (r['Event Type'] || '').toLowerCase().includes('on campus')).length;
        const offCampus = currentRecords.filter((r) => (r['Event Type'] || '').toLowerCase().includes('off')).length;
        const contests = currentRecords.filter((r) => (r['Event Type'] || '').toLowerCase().includes('contest') || (r['Event Type'] || '').toLowerCase().includes('hackathon')).length;
        return { total, onCampus, offCampus, contests };
    }, [currentRecords]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="placements" ref={ref} className="relative bg-white py-6 text-neutral-800 lg:py-10">
            <div className="section-container relative z-10">
                <div className="grid items-center gap-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-10">
                    
                    {/* Left Side: Content & Stats */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                            className="relative z-10 pr-0 lg:pr-8"
                    >
                        <motion.div variants={itemVariants} className="mb-4 flex items-center justify-between gap-3">
                            <span className="text-neutral-500 font-bold tracking-[0.2em] text-xs uppercase">
                                PLACEMENTS @ SRIT
                            </span>
                            <div className="flex items-center gap-1.5">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-orange-100 text-[#FF6600]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF6600] animate-pulse" />
                                    Live Tracker
                                </span>
                                {isSyncing && (
                                    <RefreshCw className="h-3 w-3 text-[#FF6600] animate-spin" />
                                )}
                            </div>
                        </motion.div>
                        <motion.h2 
                            variants={itemVariants} 
                            className="mb-4 font-serif text-[2.25rem] font-bold leading-[1.08] text-neutral-900 lg:text-[2.75rem]"
                        >
                            Building Careers, Creating Leaders
                        </motion.h2>
                        <motion.p 
                            variants={itemVariants} 
                            className="mb-5 max-w-lg text-justify text-sm leading-relaxed text-neutral-600 md:text-[15px]"
                        >
                            SRIT has an outstanding placement record with top companies recruiting our students year after year. Our dedicated Training &amp; Placement cell prepares students with industry-ready skills.
                        </motion.p>

                        {/* Batch Selector Pills */}
                        <motion.div variants={itemVariants} className="mb-4 flex flex-wrap items-center gap-1.5">
                            {BATCH_TABS.map((tab) => {
                                const isActive = activeTab === tab.id;
                                const count = allData[tab.id]?.length || 0;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                                            isActive
                                                ? 'bg-[#FF6600] text-white shadow-xs'
                                                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                                        }`}
                                    >
                                        <span>{tab.label}</span>
                                        <span
                                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                                                isActive ? 'bg-white/25 text-white' : 'bg-neutral-200 text-neutral-700'
                                            }`}
                                        >
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </motion.div>
 
                        {/* Dynamic Live Placement Statistics Grid - 2x2 layout matching original design */}
                        <motion.div variants={itemVariants} className="mb-6 grid grid-cols-2 gap-3 sm:gap-4">
                            {/* 1. Total Drives */}
                            <div className="border border-neutral-200/90 bg-white p-3.5 sm:p-4 flex items-center gap-3.5 transition-all duration-200 hover:border-[#FF6600]/40 hover:shadow-xs">
                                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF6600] shrink-0">
                                    <Building2 className="h-5 w-5 text-[#FF6600]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none">
                                        {metrics.total}
                                    </div>
                                    <div className="text-[11px] sm:text-xs font-bold text-neutral-500 mt-1 uppercase tracking-wider">
                                        TOTAL DRIVES
                                    </div>
                                </div>
                            </div>

                            {/* 2. On-Campus */}
                            <div className="border border-neutral-200/90 bg-white p-3.5 sm:p-4 flex items-center gap-3.5 transition-all duration-200 hover:border-emerald-500/40 hover:shadow-xs">
                                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                    <Briefcase className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none">
                                        {metrics.onCampus}
                                    </div>
                                    <div className="text-[11px] sm:text-xs font-bold text-neutral-500 mt-1 uppercase tracking-wider">
                                        ON-CAMPUS
                                    </div>
                                </div>
                            </div>

                            {/* 3. Off-Campus */}
                            <div className="border border-neutral-200/90 bg-white p-3.5 sm:p-4 flex items-center gap-3.5 transition-all duration-200 hover:border-blue-500/40 hover:shadow-xs">
                                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                    <GraduationCap className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none">
                                        {metrics.offCampus}
                                    </div>
                                    <div className="text-[11px] sm:text-xs font-bold text-neutral-500 mt-1 uppercase tracking-wider">
                                        OFF-CAMPUS
                                    </div>
                                </div>
                            </div>

                            {/* 4. Contests / Intern */}
                            <div className="border border-neutral-200/90 bg-white p-3.5 sm:p-4 flex items-center gap-3.5 transition-all duration-200 hover:border-purple-500/40 hover:shadow-xs">
                                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                                    <Sparkles className="h-5 w-5 text-purple-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none">
                                        {metrics.contests}
                                    </div>
                                    <div className="text-[11px] sm:text-xs font-bold text-neutral-500 mt-1 uppercase tracking-wider">
                                        CONTESTS / INTERN
                                    </div>
                                </div>
                            </div>
                        </motion.div>
 
                        <motion.a 
                            variants={itemVariants}
                            href="/placements/about-t-and-p"
                            className="inline-flex items-center gap-2 rounded-md bg-[#171b24] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF6600]"
                        >
                            Know More
                        </motion.a>
                    </motion.div>
 
                    {/* Right Side: Recruiters Grid */}
                    <motion.div 
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 , ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 border border-neutral-200 bg-white p-5 text-neutral-800 sm:p-7 lg:p-8"
                    >
                        <div className="text-center mb-8">
                            <h3 className="relative mb-3 font-serif text-xl font-bold text-neutral-900 sm:text-2xl">
                                Our Recruiters
                            </h3>
                            <div className="relative mx-auto h-[3px] w-12 rounded-full bg-[#FF6600]" />
                        </div>
 
                        <div className="relative grid grid-cols-2 gap-2 sm:grid-cols-4 lg:gap-3">
                            {recruiters.map((recruiter, idx) => (
                                <motion.div 
                                    key={recruiter}
                                    whileHover={{ y: -1, transition: { duration: .18 } }}
                                    transition={{ duration: .36, delay: Math.min(idx * .035, .5), ease: [0.22, 1, 0.36, 1] }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                    className="group relative flex min-h-[56px] cursor-default items-center justify-center overflow-hidden border border-neutral-200/80 bg-white px-2 py-2.5 text-center transition-colors duration-200 hover:border-[#FF6600]/50 hover:bg-[#FFF9F6] sm:min-h-[60px]"
                                >
                                    <span className="text-[12px] font-semibold tracking-[-.015em] text-neutral-700 transition-colors duration-200 group-hover:text-[#D94B20] sm:text-[13px]">
                                        {recruiter}
                                    </span>
                                    <span aria-hidden="true" className="absolute inset-x-4 bottom-0 h-[2px] origin-center scale-x-0 rounded-full bg-[#FF6600] transition-transform duration-300 group-hover:scale-x-100" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
                
            </div>
        </section>
    );
};

export default Placements;
