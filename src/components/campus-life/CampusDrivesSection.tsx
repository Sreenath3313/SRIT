import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Building2,
    Calendar,
    Briefcase,
    GraduationCap,
    DollarSign,
    Users,
    Sparkles,
    RefreshCw
} from 'lucide-react';
import fallbackCampusDrivesData from '../../data/campusDrivesData.json';

export interface DriveRecord {
    'S. No'?: string;
    'Company Name'?: string;
    'Event Type'?: string;
    'Eligible Branches'?: string;
    'Eligibility Criteria'?: string;
    'Role'?: string;
    'CTC'?: string;
    'Registration Link'?: string;
    'Drive Date'?: string;
    'No Of Selects'?: string;
    'Jod Description'?: string;
    [key: string]: string | undefined;
}

export type BatchTabId = '2026-2027' | '2025-26' | '2024-25 Batch';

const BATCH_TABS: { id: BatchTabId; label: string; academicYear: string; gid: string }[] = [
    { id: '2026-2027', label: '2026-27 Batch', academicYear: '2026 - 2027', gid: '1926464080' },
    { id: '2025-26', label: '2025-26 Batch', academicYear: '2022 - 2026', gid: '1076634899' },
    { id: '2024-25 Batch', label: '2024-25 Batch', academicYear: '2021 - 2025', gid: '0' },
];

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

// Robust CSV parser supporting quotes and commas
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

export const CampusDrivesSection: React.FC = () => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(true);
    const [activeTab, setActiveTab] = useState<BatchTabId>('2026-2027');

    // Store records for each tab
    const [allData, setAllData] = useState<Record<BatchTabId, DriveRecord[]>>({
        '2026-2027': (fallbackCampusDrivesData['2026-2027']?.entries || []) as DriveRecord[],
        '2025-26': (fallbackCampusDrivesData['2025-26']?.entries || []) as DriveRecord[],
        '2024-25 Batch': (fallbackCampusDrivesData['2024-25 Batch']?.entries || []) as DriveRecord[],
    });

    const [isSyncing, setIsSyncing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    // Filter controls
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEventType, setSelectedEventType] = useState('All');
    const [selectedBranch, setSelectedBranch] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Live background sync from published Google Sheets
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

                    // Find header row containing company name or s. no
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
                const now = new Date();
                setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
            }
        } catch {
            // Keep existing fallback data on error
        } finally {
            setIsSyncing(false);
        }
    };

    // Auto-sync on mount and periodic 45s interval
    useEffect(() => {
        fetchLiveSheetData();
        const interval = setInterval(fetchLiveSheetData, 45000);
        return () => clearInterval(interval);
    }, []);

    // Reset pagination and filters when switching batch tabs
    useEffect(() => {
        setCurrentPage(1);
        setSelectedEventType('All');
        setSelectedBranch('All');
        setSearchQuery('');
    }, [activeTab]);

    const currentRecords = allData[activeTab] || [];

    // Distinct event types for dropdown filter
    const availableEventTypes = useMemo(() => {
        const types = new Set<string>();
        currentRecords.forEach((r) => {
            const et = (r['Event Type'] || '').trim();
            if (et && et !== '-') types.add(et);
        });
        return ['All', ...Array.from(types).sort()];
    }, [currentRecords]);

    // Distinct branches/eligibility criteria for dropdown filter
    const availableBranches = useMemo(() => {
        const branches = new Set<string>();
        currentRecords.forEach((r) => {
            const raw = (r['Eligible Branches'] || r['Eligibility Criteria'] || '').trim();
            if (raw && raw !== '-') {
                // Split multiple branches if comma separated
                raw.split(/[,&/]/).forEach((b) => {
                    const clean = b.trim();
                    if (clean && clean.length <= 15) branches.add(clean);
                });
            }
        });
        return ['All', ...Array.from(branches).sort()];
    }, [currentRecords]);

    // Filter and search
    const filteredRecords = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return currentRecords.filter((record) => {
            // Event type filter
            if (selectedEventType !== 'All') {
                const et = (record['Event Type'] || '').trim().toLowerCase();
                if (et !== selectedEventType.toLowerCase()) return false;
            }

            // Branch filter
            if (selectedBranch !== 'All') {
                const branchStr = (record['Eligible Branches'] || record['Eligibility Criteria'] || '').toLowerCase();
                if (!branchStr.includes(selectedBranch.toLowerCase()) && !branchStr.includes('all branches')) {
                    return false;
                }
            }

            // Text search across all fields
            if (query) {
                const searchable = [
                    record['Company Name'],
                    record['Role'],
                    record['CTC'],
                    record['Eligible Branches'] || record['Eligibility Criteria'],
                    record['Drive Date'],
                    record['Event Type'],
                    record['No Of Selects'],
                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase();

                if (!searchable.includes(query)) return false;
            }

            return true;
        });
    }, [currentRecords, searchQuery, selectedEventType, selectedBranch]);

    // Pagination calculations
    const totalPages = Math.max(1, Math.ceil(filteredRecords.length / itemsPerPage));
    const paginatedRecords = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredRecords.slice(start, start + itemsPerPage);
    }, [filteredRecords, currentPage, itemsPerPage]);

    // Metrics for the active batch
    const metrics = useMemo(() => {
        const total = currentRecords.length;
        const onCampus = currentRecords.filter((r) => (r['Event Type'] || '').toLowerCase().includes('on-campus') || (r['Event Type'] || '').toLowerCase().includes('on campus')).length;
        const offCampus = currentRecords.filter((r) => (r['Event Type'] || '').toLowerCase().includes('off')).length;
        const contests = currentRecords.filter((r) => (r['Event Type'] || '').toLowerCase().includes('contest') || (r['Event Type'] || '').toLowerCase().includes('hackathon')).length;
        return { total, onCampus, offCampus, contests };
    }, [currentRecords]);

    return (
        <section aria-label="Campus Drives Complete Records" className="space-y-4 w-full">
            {/* Header Accordion Container */}
            <div className="overflow-hidden border border-[#FFD9C4] bg-white shadow-xs">
                {/* Accordion Trigger Bar */}
                <button
                    type="button"
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                    aria-expanded={isAccordionOpen}
                    className="w-full flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-[#FFF5EE] via-white to-[#FFF5EE] hover:from-[#FFEDE0] transition-colors border-b border-[#FFD9C4]/70 cursor-pointer"
                >
                    <div className="flex items-center gap-3 text-left">
                        <span className="h-6 w-1.5 rounded-full bg-[#FF6600]" />
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-serif text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                                    Campus Drives &amp; Placement Records
                                </h3>
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#FF6600] text-white">
                                    Live Tracker
                                </span>
                            </div>
                            <p className="text-xs text-neutral-500 mt-0.5">
                                Official Training &amp; Placement Cell (T&amp;P) Complete Multi-Year Drive Database
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {isSyncing && (
                            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#FF6600] font-semibold bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                Syncing...
                            </span>
                        )}
                        <span
                            className={`flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF0E6] text-[#FF6600] transition-transform duration-300 ${
                                isAccordionOpen ? 'rotate-180' : ''
                            }`}
                        >
                            <ChevronDown className="h-5 w-5" />
                        </span>
                    </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                    {isAccordionOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 sm:p-6 lg:p-7 space-y-6 bg-white">
                                {/* Batch Switcher Tabs */}
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-neutral-200 pb-4">
                                    {BATCH_TABS.map((tab) => {
                                        const isActive = activeTab === tab.id;
                                        const count = allData[tab.id]?.length || 0;
                                        return (
                                            <button
                                                key={tab.id}
                                                type="button"
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                                                    isActive
                                                        ? 'bg-[#FF6600] text-white shadow-sm'
                                                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                                                }`}
                                            >
                                                <Calendar className={`h-4 w-4 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                                                <span>{tab.label}</span>
                                                <span
                                                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                                                        isActive ? 'bg-white/25 text-white' : 'bg-neutral-200 text-neutral-700'
                                                    }`}
                                                >
                                                    {count} Drives
                                                </span>
                                            </button>
                                        );
                                    })}

                                    <div className="ml-auto flex items-center gap-2 text-xs text-neutral-500">
                                        <button
                                            type="button"
                                            onClick={fetchLiveSheetData}
                                            disabled={isSyncing}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold text-[#FF6600] bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-colors cursor-pointer disabled:opacity-50"
                                            title="Sync latest entries from official database"
                                        >
                                            <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                                            <span>{isSyncing ? 'Syncing...' : 'Refresh'}</span>
                                        </button>
                                        {lastUpdated && (
                                            <span className="hidden md:inline text-[11px] text-neutral-400">
                                                Updated {lastUpdated}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Summary Metric Pills */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div className="border border-neutral-200 bg-neutral-50/50 p-3 flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center text-[#FF6600] shrink-0">
                                            <Building2 className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="text-xl sm:text-2xl font-black text-neutral-900 leading-none">
                                                {metrics.total}
                                            </div>
                                            <div className="text-[11px] font-bold text-neutral-500 mt-1 uppercase tracking-wider">
                                                Total Drives
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-neutral-200 bg-neutral-50/50 p-3 flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                                            <Briefcase className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="text-xl sm:text-2xl font-black text-neutral-900 leading-none">
                                                {metrics.onCampus}
                                            </div>
                                            <div className="text-[11px] font-bold text-neutral-500 mt-1 uppercase tracking-wider">
                                                On-Campus
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-neutral-200 bg-neutral-50/50 p-3 flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                                            <GraduationCap className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="text-xl sm:text-2xl font-black text-neutral-900 leading-none">
                                                {metrics.offCampus}
                                            </div>
                                            <div className="text-[11px] font-bold text-neutral-500 mt-1 uppercase tracking-wider">
                                                Off-Campus
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-neutral-200 bg-neutral-50/50 p-3 flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                                            <Sparkles className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="text-xl sm:text-2xl font-black text-neutral-900 leading-none">
                                                {metrics.contests}
                                            </div>
                                            <div className="text-[11px] font-bold text-neutral-500 mt-1 uppercase tracking-wider">
                                                Contests / Intern
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Filters and Search Bar */}
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3.5 bg-neutral-50 border border-neutral-200">
                                    {/* Search input */}
                                    <div className="md:col-span-5 relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            placeholder="Search by company, role, package, branch..."
                                            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-neutral-300 focus:outline-none focus:border-[#FF6600] focus:ring-1 focus:ring-[#FF6600] transition-colors"
                                        />
                                    </div>

                                    {/* Event Type Dropdown Filter */}
                                    <div className="md:col-span-3">
                                        <div className="flex items-center gap-2">
                                            <Filter className="h-4 w-4 text-[#FF6600] shrink-0" />
                                            <select
                                                value={selectedEventType}
                                                onChange={(e) => {
                                                    setSelectedEventType(e.target.value);
                                                    setCurrentPage(1);
                                                }}
                                                className="w-full py-2 px-2.5 text-xs sm:text-sm bg-white border border-neutral-300 focus:outline-none focus:border-[#FF6600] transition-colors"
                                            >
                                                <option value="All">All Event Types</option>
                                                {availableEventTypes.filter((t) => t !== 'All').map((type) => (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Branch Dropdown Filter */}
                                    <div className="md:col-span-2">
                                        <select
                                            value={selectedBranch}
                                            onChange={(e) => {
                                                setSelectedBranch(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="w-full py-2 px-2.5 text-xs sm:text-sm bg-white border border-neutral-300 focus:outline-none focus:border-[#FF6600] transition-colors"
                                        >
                                            <option value="All">All Branches</option>
                                            {availableBranches.filter((b) => b !== 'All').map((branch) => (
                                                <option key={branch} value={branch}>
                                                    {branch}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Items Per Page Dropdown */}
                                    <div className="md:col-span-2 flex items-center justify-end gap-1.5 text-xs text-neutral-600">
                                        <span className="whitespace-nowrap font-bold">Show:</span>
                                        <select
                                            value={itemsPerPage}
                                            onChange={(e) => {
                                                setItemsPerPage(Number(e.target.value));
                                                setCurrentPage(1);
                                            }}
                                            className="py-1.5 px-2 bg-white border border-neutral-300 text-xs focus:outline-none focus:border-[#FF6600] transition-colors"
                                        >
                                            {ITEMS_PER_PAGE_OPTIONS.map((num) => (
                                                <option key={num} value={num}>
                                                    {num} / page
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Results Count Status */}
                                <div className="flex items-center justify-between text-xs text-neutral-600 font-semibold px-1">
                                    <span>
                                        Showing <strong className="text-neutral-900">{filteredRecords.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> to{' '}
                                        <strong className="text-neutral-900">
                                            {Math.min(currentPage * itemsPerPage, filteredRecords.length)}
                                        </strong>{' '}
                                        of <strong className="text-[#FF6600]">{filteredRecords.length}</strong> drives
                                        {searchQuery || selectedEventType !== 'All' || selectedBranch !== 'All' ? ' (filtered)' : ''}
                                    </span>

                                    {(searchQuery || selectedEventType !== 'All' || selectedBranch !== 'All') && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSearchQuery('');
                                                setSelectedEventType('All');
                                                setSelectedBranch('All');
                                                setCurrentPage(1);
                                            }}
                                            className="text-xs text-[#FF6600] hover:underline font-bold"
                                        >
                                            Reset Filters
                                        </button>
                                    )}
                                </div>

                                {/* Desktop & Mobile Responsive Table */}
                                <div className="overflow-x-auto border border-neutral-200">
                                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                                        <thead>
                                            <tr className="bg-[#171b24] text-white">
                                                <th className="py-3 px-3 w-12 text-center font-black">#</th>
                                                <th className="py-3 px-4 font-black">Company Name</th>
                                                <th className="py-3 px-3 font-black">Event Type</th>
                                                <th className="py-3 px-4 font-black">Eligible Branches</th>
                                                <th className="py-3 px-4 font-black">Role / Profile</th>
                                                <th className="py-3 px-3 font-black">CTC / Stipend</th>
                                                <th className="py-3 px-3 font-black">Drive Date</th>
                                                <th className="py-3 px-3 font-black text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-200">
                                            {paginatedRecords.length === 0 ? (
                                                <tr>
                                                    <td colSpan={8} className="py-12 text-center text-neutral-500">
                                                        <div className="flex flex-col items-center justify-center gap-2">
                                                            <Building2 className="h-8 w-8 text-neutral-300" />
                                                            <p className="font-bold text-sm text-neutral-700">No drives match your current filter</p>
                                                            <p className="text-xs text-neutral-500">Try adjusting your search keyword or selected dropdowns</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                paginatedRecords.map((r, idx) => {
                                                    const sNo = r['S. No'] || `${(currentPage - 1) * itemsPerPage + idx + 1}`;
                                                    const company = r['Company Name'] || '-';
                                                    const eventType = r['Event Type'] || '-';
                                                    const branches = r['Eligible Branches'] || r['Eligibility Criteria'] || '-';
                                                    const role = r['Role'] || '-';
                                                    const ctc = r['CTC'] || '-';
                                                    const driveDate = r['Drive Date'] || '-';
                                                    const selects = r['No Of Selects'];

                                                    const isHighPackage =
                                                        ctc.toLowerCase().includes('lpa') &&
                                                        parseFloat(ctc.replace(/[^0-9.]/g, '')) >= 7;

                                                    return (
                                                        <tr
                                                            key={`${sNo}-${company}-${idx}`}
                                                            className={`transition-colors hover:bg-orange-50/40 ${
                                                                idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/40'
                                                            }`}
                                                        >
                                                            <td className="py-3 px-3 text-center font-bold text-neutral-500">
                                                                {sNo}
                                                            </td>
                                                            <td className="py-3 px-4 font-black text-neutral-900">
                                                                <div className="flex items-center gap-2">
                                                                    <span>{company}</span>
                                                                    {isHighPackage && (
                                                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300">
                                                                            Premium
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-3">
                                                                <span
                                                                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                                                                        eventType.toLowerCase().includes('on')
                                                                            ? 'bg-emerald-100 text-emerald-800'
                                                                            : eventType.toLowerCase().includes('off')
                                                                            ? 'bg-blue-100 text-blue-800'
                                                                            : 'bg-purple-100 text-purple-800'
                                                                    }`}
                                                                >
                                                                    {eventType}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4 text-neutral-700 text-xs">
                                                                <span className="font-semibold text-neutral-800">{branches}</span>
                                                            </td>
                                                            <td className="py-3 px-4 font-semibold text-neutral-800">
                                                                {role}
                                                            </td>
                                                            <td className="py-3 px-3">
                                                                {ctc && ctc !== 'NA' && ctc !== '-' ? (
                                                                    <span className="font-black text-[#FF6600] whitespace-nowrap">
                                                                        {ctc}
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-neutral-400 font-medium">As per norms</span>
                                                                )}
                                                            </td>
                                                            <td className="py-3 px-3 text-neutral-600 text-xs whitespace-nowrap">
                                                                {driveDate !== '-' ? driveDate : 'Scheduled'}
                                                            </td>
                                                            <td className="py-3 px-3 text-center">
                                                                {selects && selects !== '0' && selects !== '' ? (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800">
                                                                        <Users className="h-3 w-3" />
                                                                        {selects} Selects
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-600">
                                                                        Drive Completed
                                                                    </span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-neutral-200">
                                        <div className="text-xs text-neutral-500 font-semibold">
                                            Page <span className="font-black text-neutral-900">{currentPage}</span> of{' '}
                                            <span className="font-black text-neutral-900">{totalPages}</span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                                disabled={currentPage === 1}
                                                className="px-2.5 py-1.5 border border-neutral-300 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 cursor-pointer flex items-center gap-1"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                                <span className="hidden sm:inline">Previous</span>
                                            </button>

                                            {/* Page numbers */}
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                let pageNum: number;
                                                if (totalPages <= 5) {
                                                    pageNum = i + 1;
                                                } else if (currentPage <= 3) {
                                                    pageNum = i + 1;
                                                } else if (currentPage >= totalPages - 2) {
                                                    pageNum = totalPages - 4 + i;
                                                } else {
                                                    pageNum = currentPage - 2 + i;
                                                }
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        type="button"
                                                        onClick={() => setCurrentPage(pageNum)}
                                                        className={`min-w-[32px] h-8 text-xs font-black transition-colors cursor-pointer ${
                                                            currentPage === pageNum
                                                                ? 'bg-[#FF6600] text-white'
                                                                : 'bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-800'
                                                        }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}

                                            <button
                                                type="button"
                                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                                disabled={currentPage === totalPages}
                                                className="px-2.5 py-1.5 border border-neutral-300 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 cursor-pointer flex items-center gap-1"
                                            >
                                                <span className="hidden sm:inline">Next</span>
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default CampusDrivesSection;
