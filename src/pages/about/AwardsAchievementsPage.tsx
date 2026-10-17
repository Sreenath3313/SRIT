import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    Award,
    Search,
    GraduationCap,
    Building2,
    Users,
    Filter,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    RefreshCw
} from 'lucide-react';
import AboutUsLayout from '../../features/about/components/AboutUsLayout';
import { fadeUp, stagger } from '../../features/about/animations';
import fallbackAwardsData from '../../data/awardsData.json';

interface InstitutionRecord {
    sNo: string;
    year: string;
    category: string;
    name: string;
    awardingBody: string;
}

interface PersonRecord {
    sNo: string;
    year: string;
    facultyName?: string;
    studentName?: string;
    department?: string;
    category: string;
    name: string;
    awardingBody: string;
}

type TabType = 'Institution' | 'Faculty' | 'Student';

const SHEET_GIDS: Record<TabType, string> = {
    Institution: '996383266',
    Faculty: '1922280152',
    Student: '1394954027'
};

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
            if (row.some(c => c.length > 0)) lines.push(row);
            row = [];
            cell = '';
        } else {
            cell += char;
        }
    }
    if (cell.length > 0 || row.length > 0) {
        row.push(cell.trim());
        if (row.some(c => c.length > 0)) lines.push(row);
    }
    return lines;
}

const AwardsAchievementsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('Institution');
    const [isAccordionOpen, setIsAccordionOpen] = useState(true);

    // Live dataset state initialized with bundled fallback data
    const [allData, setAllData] = useState<Record<TabType, (InstitutionRecord | PersonRecord)[]>>({
        Institution: fallbackAwardsData.Institution as InstitutionRecord[],
        Faculty: fallbackAwardsData.Faculty as PersonRecord[],
        Student: fallbackAwardsData.Student as PersonRecord[],
    });

    const [isSyncing, setIsSyncing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    // Fetch live updates from published Google Sheets CSV
    const fetchLiveSheetData = async () => {
        setIsSyncing(true);
        try {
            const tabs: TabType[] = ['Institution', 'Faculty', 'Student'];
            const updatedData: Partial<Record<TabType, (InstitutionRecord | PersonRecord)[]>> = {};

            await Promise.all(
                tabs.map(async tab => {
                    const gid = SHEET_GIDS[tab];
                    const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vSi9187ATTPNildrBFadlWQNtfCFsmkCXCaq-buYZlwMRvWdLXzRH6MCvy1RX3cysktpD8RXiqov2be/pub?gid=${gid}&single=true&output=csv&t=${Date.now()}`;
                    const res = await fetch(url);
                    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                    const csvText = await res.text();
                    const parsed = parseCSV(csvText);

                    if (parsed.length > 1) {
                        const rows = parsed.slice(1);
                        if (tab === 'Institution') {
                            updatedData.Institution = rows.map(r => ({
                                sNo: r[0] || '',
                                year: (r[1] || '').trim(),
                                category: (r[2] || '').trim(),
                                name: (r[3] || '').trim(),
                                awardingBody: (r[4] || '').trim()
                            }));
                        } else if (tab === 'Faculty') {
                            updatedData.Faculty = rows.map(r => ({
                                sNo: r[0] || '',
                                year: (r[1] || '').trim(),
                                facultyName: (r[2] || '').trim(),
                                department: (r[3] || '').trim().toUpperCase(),
                                category: (r[4] || '').trim(),
                                name: (r[5] || '').trim(),
                                awardingBody: (r[6] || '').trim()
                            }));
                        } else if (tab === 'Student') {
                            updatedData.Student = rows.map(r => ({
                                sNo: r[0] || '',
                                year: (r[1] || '').trim(),
                                studentName: (r[2] || '').trim(),
                                department: (r[3] || '').trim().toUpperCase(),
                                category: (r[4] || '').trim(),
                                name: (r[5] || '').trim(),
                                awardingBody: (r[6] || '').trim()
                            }));
                        }
                    }
                })
            );

            setAllData(prev => ({
                ...prev,
                ...(updatedData as Record<TabType, (InstitutionRecord | PersonRecord)[]>)
            }));
            setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        } catch {
            // Keep current data gracefully if network is offline or fails
        } finally {
            setIsSyncing(false);
        }
    };

    // Auto-fetch in background silently without blocking the user
    useEffect(() => {
        // Initial fetch
        fetchLiveSheetData();

        // Automatic background polling every 30 seconds
        const intervalId = setInterval(() => {
            fetchLiveSheetData();
        }, 30000);

        // Auto-fetch whenever the user switches back to this browser tab/window
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchLiveSheetData();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    // Filters & Search
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);

    // Current tab dataset
    const currentData = useMemo(() => {
        return allData[activeTab] || [];
    }, [allData, activeTab]);

    // Available Years for current tab
    const availableYears = useMemo(() => {
        const years = Array.from(new Set(currentData.map(d => d.year).filter(Boolean)));
        return ['All', ...years.sort().reverse()];
    }, [currentData]);

    // Available Categories for current tab
    const availableCategories = useMemo(() => {
        const cats = Array.from(new Set(currentData.map(d => d.category).filter(Boolean)));
        return ['All', ...cats.sort()];
    }, [currentData]);

    // Available Departments (for Faculty & Student)
    const availableDepartments = useMemo(() => {
        if (activeTab === 'Institution') return [];
        const depts = Array.from(
            new Set((currentData as PersonRecord[]).map(d => d.department).filter(Boolean))
        );
        return ['All', ...depts.sort()];
    }, [currentData, activeTab]);

    // Filtered data
    const filteredData = useMemo(() => {
        return currentData.filter(item => {
            if (selectedYear !== 'All' && item.year !== selectedYear) return false;
            if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;

            if (activeTab !== 'Institution' && selectedDepartment !== 'All') {
                const p = item as PersonRecord;
                if (p.department !== selectedDepartment) return false;
            }

            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const person = item as PersonRecord;
                const matchName = (item.name || '').toLowerCase().includes(q);
                const matchAgency = (item.awardingBody || '').toLowerCase().includes(q);
                const matchCategory = (item.category || '').toLowerCase().includes(q);
                const matchPerson =
                    (person.facultyName || '').toLowerCase().includes(q) ||
                    (person.studentName || '').toLowerCase().includes(q);
                const matchDept = (person.department || '').toLowerCase().includes(q);
                const matchYear = (item.year || '').toLowerCase().includes(q);

                return matchName || matchAgency || matchCategory || matchPerson || matchDept || matchYear;
            }

            return true;
        });
    }, [currentData, selectedYear, selectedCategory, selectedDepartment, searchQuery, activeTab]);

    // Pagination calculations
    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(start, start + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
        setSelectedYear('All');
        setSelectedDepartment('All');
        setSelectedCategory('All');
        setSearchQuery('');
        setCurrentPage(1);
    };

    return (
        <AboutUsLayout title="Awards and Achievements">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
                {/* Header intro */}
                <motion.div variants={fadeUp}>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A0903] mb-2 flex items-center gap-3">
                        <span className="w-1.5 h-8 rounded-full bg-[#FF5422] inline-block" />
                        Awards &amp; Achievements
                    </h2>
                    <p className="text-neutral-600 mt-2 leading-relaxed text-left sm:text-justify text-sm sm:text-base">
                        Srinivasa Ramanujan Institute of Technology (SRIT) consistently pursues benchmarks of excellence in technical education, innovation, and community leadership. Discover the prestigious honors, recognitions, and laurels bestowed upon our institution, faculty members, and students.
                    </p>
                </motion.div>

                {/* Main Interactive Accordion matching official SRIT format */}
                <motion.div variants={fadeUp} className="border border-neutral-200 rounded-xl overflow-hidden shadow-sm bg-white">
                    {/* Collapsible Header */}
                    <button
                        type="button"
                        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                        aria-expanded={isAccordionOpen}
                        className="w-full flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-[#FF6600] to-[#FF5422] text-white hover:from-[#e65c00] hover:to-[#e0481b] transition-all text-left"
                    >
                        <div className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-white/90" />
                            <div>
                                <h3 className="text-base sm:text-lg font-bold">Awards and Achievements</h3>
                                <p className="text-white/80 text-xs hidden sm:block mt-0.5">
                                    Complete register of institutional, faculty, and student accolades
                                </p>
                            </div>
                        </div>
                        <motion.div animate={{ rotate: isAccordionOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                            <ChevronDown className="w-5 h-5 text-white" />
                        </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                        {isAccordionOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 sm:p-6 bg-white space-y-5">
                                    {/* Tab Navigation (Institution, Faculty, Student) & Sync Indicator */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-3">
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleTabChange('Institution')}
                                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                                                    activeTab === 'Institution'
                                                        ? 'bg-[#FF5422] text-white shadow-xs'
                                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
                                                }`}
                                            >
                                                <Building2 className="w-4 h-4" />
                                                Institution
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'Institution' ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-700'}`}>
                                                    {allData.Institution.length}
                                                </span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleTabChange('Faculty')}
                                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                                                    activeTab === 'Faculty'
                                                        ? 'bg-[#FF5422] text-white shadow-xs'
                                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
                                                }`}
                                            >
                                                <GraduationCap className="w-4 h-4" />
                                                Faculty
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'Faculty' ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-700'}`}>
                                                    {allData.Faculty.length}
                                                </span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleTabChange('Student')}
                                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                                                    activeTab === 'Student'
                                                        ? 'bg-[#FF5422] text-white shadow-xs'
                                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
                                                }`}
                                            >
                                                <Users className="w-4 h-4" />
                                                Student
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'Student' ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-700'}`}>
                                                    {allData.Student.length}
                                                </span>
                                            </button>
                                        </div>

                                        {/* Automatic Live Sync Status */}
                                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 self-end sm:self-center">
                                            <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-orange-400 animate-ping' : 'bg-emerald-500'}`} />
                                            <span>{isSyncing ? 'Auto-syncing...' : 'Auto-synced with Google Sheets'}</span>
                                        </div>
                                    </div>

                                    {/* Filter and Search Bar Controls */}
                                    <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/70 space-y-3">
                                        <div className="flex flex-col md:flex-row gap-3">
                                            {/* Search input */}
                                            <div className="relative flex-1">
                                                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={e => {
                                                        setSearchQuery(e.target.value);
                                                        setCurrentPage(1);
                                                    }}
                                                    placeholder={
                                                        activeTab === 'Institution'
                                                            ? 'Search awards, awarding body, or category...'
                                                            : activeTab === 'Faculty'
                                                            ? 'Search faculty name, department, award...'
                                                            : 'Search student name, department, award...'
                                                    }
                                                    className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5422]/20 focus:border-[#FF5422] transition-colors"
                                                />
                                            </div>

                                            {/* Filter Dropdowns */}
                                            <div className="flex flex-wrap items-center gap-2">
                                                {/* Year Filter */}
                                                <div className="flex items-center gap-1.5 bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs text-neutral-700">
                                                    <Filter className="w-3.5 h-3.5 text-neutral-500" />
                                                    <span className="font-semibold text-neutral-500">Year:</span>
                                                    <select
                                                        value={selectedYear}
                                                        onChange={e => {
                                                            setSelectedYear(e.target.value);
                                                            setCurrentPage(1);
                                                        }}
                                                        className="bg-transparent font-medium text-neutral-800 focus:outline-none cursor-pointer"
                                                    >
                                                        {availableYears.map(year => (
                                                            <option key={year} value={year}>
                                                                {year}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Department Filter (if applicable) */}
                                                {availableDepartments.length > 0 && (
                                                    <div className="flex items-center gap-1.5 bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs text-neutral-700">
                                                        <span className="font-semibold text-neutral-500">Dept:</span>
                                                        <select
                                                            value={selectedDepartment}
                                                            onChange={e => {
                                                                setSelectedDepartment(e.target.value);
                                                                setCurrentPage(1);
                                                            }}
                                                            className="bg-transparent font-medium text-neutral-800 focus:outline-none cursor-pointer"
                                                        >
                                                            {availableDepartments.map(dept => (
                                                                <option key={dept} value={dept}>
                                                                    {dept}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                )}

                                                {/* Category Filter */}
                                                <div className="flex items-center gap-1.5 bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs text-neutral-700">
                                                    <span className="font-semibold text-neutral-500">Category:</span>
                                                    <select
                                                        value={selectedCategory}
                                                        onChange={e => {
                                                            setSelectedCategory(e.target.value);
                                                            setCurrentPage(1);
                                                        }}
                                                        className="bg-transparent font-medium text-neutral-800 focus:outline-none cursor-pointer max-w-[140px] truncate"
                                                    >
                                                        {availableCategories.map(cat => (
                                                            <option key={cat} value={cat}>
                                                                {cat}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Reset button if filtered */}
                                                {(selectedYear !== 'All' || selectedDepartment !== 'All' || selectedCategory !== 'All' || searchQuery) && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedYear('All');
                                                            setSelectedDepartment('All');
                                                            setSelectedCategory('All');
                                                            setSearchQuery('');
                                                            setCurrentPage(1);
                                                        }}
                                                        className="text-xs text-[#FF5422] hover:underline font-semibold px-2 py-1"
                                                    >
                                                        Reset
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Row count info */}
                                        <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
                                            <span>
                                                Showing <strong>{filteredData.length}</strong> record{filteredData.length === 1 ? '' : 's'} in {activeTab}
                                            </span>
                                            <div className="flex items-center gap-1.5">
                                                <span>Rows per page:</span>
                                                <select
                                                    value={itemsPerPage}
                                                    onChange={e => {
                                                        setItemsPerPage(Number(e.target.value));
                                                        setCurrentPage(1);
                                                    }}
                                                    className="bg-white border border-neutral-300 rounded px-1.5 py-0.5 font-medium text-neutral-800 focus:outline-none cursor-pointer"
                                                >
                                                    {ITEMS_PER_PAGE_OPTIONS.map(opt => (
                                                        <option key={opt} value={opt}>
                                                            {opt}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Data Table */}
                                    <div className="overflow-x-auto border border-neutral-200 rounded-lg">
                                        <table className="w-full min-w-[760px] border-collapse text-xs sm:text-sm">
                                            <thead>
                                                <tr className="bg-[#FF6600] text-white">
                                                    <th className="p-3 border-b border-r border-white/20 font-bold w-12 text-center">S. No.</th>
                                                    <th className="p-3 border-b border-r border-white/20 font-bold w-24 text-center">Academic Year</th>
                                                    {activeTab === 'Faculty' && (
                                                        <>
                                                            <th className="p-3 border-b border-r border-white/20 font-bold w-48 text-left">Name of the Faculty</th>
                                                            <th className="p-3 border-b border-r border-white/20 font-bold w-24 text-center">Dept</th>
                                                        </>
                                                    )}
                                                    {activeTab === 'Student' && (
                                                        <>
                                                            <th className="p-3 border-b border-r border-white/20 font-bold w-48 text-left">Name of the Student</th>
                                                            <th className="p-3 border-b border-r border-white/20 font-bold w-24 text-center">Dept</th>
                                                        </>
                                                    )}
                                                    <th className="p-3 border-b border-r border-white/20 font-bold w-44 text-left">Category</th>
                                                    <th className="p-3 border-b border-r border-white/20 font-bold text-left">Name of the Award/Recognition</th>
                                                    <th className="p-3 border-b border-white/20 font-bold w-52 text-left">Name of the Awarding Body/Agency</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedData.length === 0 ? (
                                                    <tr>
                                                        <td
                                                            colSpan={activeTab === 'Institution' ? 5 : 7}
                                                            className="p-8 text-center text-neutral-500 font-medium bg-neutral-50/50"
                                                        >
                                                            No awards found matching your search and filter criteria.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    paginatedData.map((item, index) => {
                                                        const person = item as PersonRecord;
                                                        return (
                                                            <tr
                                                                key={`${item.sNo}-${index}`}
                                                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#fffaf6]'} hover:bg-orange-50/60 transition-colors`}
                                                            >
                                                                <td className="p-2.5 sm:p-3 border-b border-r border-neutral-200 text-center font-medium text-neutral-800">
                                                                    {item.sNo}
                                                                </td>
                                                                <td className="p-2.5 sm:p-3 border-b border-r border-neutral-200 text-center font-semibold text-neutral-700 whitespace-nowrap">
                                                                    {item.year}
                                                                </td>
                                                                {activeTab === 'Faculty' && (
                                                                    <>
                                                                        <td className="p-2.5 sm:p-3 border-b border-r border-neutral-200 font-semibold text-neutral-900">
                                                                            {person.facultyName || '-'}
                                                                        </td>
                                                                        <td className="p-2.5 sm:p-3 border-b border-r border-neutral-200 text-center font-medium text-neutral-700">
                                                                            <span className="inline-block px-2 py-0.5 bg-neutral-100 rounded text-xs font-semibold">
                                                                                {person.department || '-'}
                                                                            </span>
                                                                        </td>
                                                                    </>
                                                                )}
                                                                {activeTab === 'Student' && (
                                                                    <>
                                                                        <td className="p-2.5 sm:p-3 border-b border-r border-neutral-200 font-semibold text-neutral-900">
                                                                            {person.studentName || '-'}
                                                                        </td>
                                                                        <td className="p-2.5 sm:p-3 border-b border-r border-neutral-200 text-center font-medium text-neutral-700">
                                                                            <span className="inline-block px-2 py-0.5 bg-neutral-100 rounded text-xs font-semibold">
                                                                                {person.department || '-'}
                                                                            </span>
                                                                        </td>
                                                                    </>
                                                                )}
                                                                <td className="p-2.5 sm:p-3 border-b border-r border-neutral-200 text-neutral-700">
                                                                    <span className="inline-block px-2 py-0.5 bg-orange-100/60 text-orange-800 rounded text-xs font-medium">
                                                                        {item.category || '-'}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2.5 sm:p-3 border-b border-r border-neutral-200 font-medium text-neutral-900 leading-snug">
                                                                    {item.name || '-'}
                                                                </td>
                                                                <td className="p-2.5 sm:p-3 border-b border-neutral-200 text-neutral-700 leading-snug">
                                                                    {item.awardingBody || '-'}
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
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs sm:text-sm text-neutral-600">
                                            <span>
                                                Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                                                {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
                                            </span>
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    type="button"
                                                    disabled={currentPage === 1}
                                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                    className="p-1.5 rounded-lg border border-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 transition-colors"
                                                    aria-label="Previous page"
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                </button>

                                                <span className="px-3 py-1 font-semibold text-neutral-800 bg-neutral-100 rounded-lg">
                                                    Page {currentPage} of {totalPages}
                                                </span>

                                                <button
                                                    type="button"
                                                    disabled={currentPage === totalPages}
                                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                                    className="p-1.5 rounded-lg border border-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 transition-colors"
                                                    aria-label="Next page"
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </AboutUsLayout>
    );
};

export default AwardsAchievementsPage;
