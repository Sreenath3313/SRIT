import { useEffect, useState, useMemo } from 'react';
import {
  FileText,
  Calendar,
  GraduationCap,
  RefreshCw,
  Search,
  ExternalLink,
  Building2,
  ArrowRight,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/common/PageHeader';

interface CircularItem {
  id: string;
  sNo: string;
  title: string;
  date?: string;
  type: string;
}

interface ExamNotificationItem {
  id: string;
  sNo: string;
  category: string;
  date?: string;
  title: string;
}

interface PlacementRecord {
  id: string;
  sNo: string;
  company: string;
  offers: string;
  ctc: string;
  isCsr?: boolean;
}

// CSV Parser supporting quotes and multi-lines
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

const SHEET_IDS = {
  circulars: '2PACX-1vT6-1d8VToVqcw7MOziEPqvvJty0mNYfLI0RnZB_AkaAD9-ki525FVfbUYJXwisdQ',
  examination: '2PACX-1vQbUoa40R0QfaHVVE10uNK6hqKmpNhA5Lx5n4-cvw8Pl5WqWq9vdsjHscJJjeFP4Q',
  placements: '2PACX-1vQTZd0sE4NNfuBvjbukFstbZlMTx5Nb8lTjScfA7w8wJgYUuM9RGY3c1DFDvqFYAg',
};

export default function CampusNotificationsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'circulars' | 'examination' | 'placements'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const [circulars, setCirculars] = useState<CircularItem[]>([
    { id: 'c-1', sNo: '1', title: 'Circular - Holiday – DUSSERA FESTIVAL', type: 'Holiday' },
    { id: 'c-2', sNo: '2', title: 'Circular - 02/10/2026 - Holiday – MAHATMA GANDHI JAYANTHI', date: '02/10/2026', type: 'Holiday' },
    { id: 'c-3', sNo: '3', title: 'Circular - 14/09/2026 - Holiday – VINAYAKA CHAVITHI FESTIVAL', date: '14/09/2026', type: 'Holiday' },
    { id: 'c-4', sNo: '4', title: 'Circular - 04/09/2026 - Holiday – SRI KRISHNA JANMASHTAMI FESTIVAL', date: '04/09/2026', type: 'Holiday' },
    { id: 'c-5', sNo: '5', title: 'Circular - 26/08/2026 - Holiday – EID MILAD UN NABI – Festival', date: '26/08/2026', type: 'Holiday' },
    { id: 'c-6', sNo: '6', title: 'Circular - 26/06/2026 - Holiday – Muharram Festival', date: '26/06/2026', type: 'Holiday' },
  ]);

  const [exams, setExams] = useState<ExamNotificationItem[]>([
    { id: 'e-1', sNo: '1', category: 'Time Table', date: '24-08-2026', title: 'II B.Tech I sem SRIT R23 CIE-I - Timetable- AUG/SEP 2026' },
    { id: 'e-2', sNo: '2', category: 'Time Table', date: '24-08-2026', title: 'III B.Tech I sem SRIT R23 CIE-I - Timetable- AUG/SEP 2026' },
    { id: 'e-3', sNo: '3', category: 'Time Table', date: '24-08-2026', title: 'IV B.Tech I sem SRIT R23 CIE-I - Timetable- AUG/SEP 2026' },
  ]);

  const [placements, setPlacements] = useState<PlacementRecord[]>([
    { id: 'p-1', sNo: '1', company: 'Recruit CRM', offers: '1', ctc: '9.00 LPA' },
    { id: 'p-2', sNo: '2', company: 'Tata Consultancy Services', offers: '43', ctc: '7.09 LPA' },
    { id: 'p-3', sNo: '2', company: 'Tata Consultancy Services', offers: '97', ctc: '3.45 LPA' },
    { id: 'p-4', sNo: '3', company: 'Reliance Industries Ltd.', offers: '1', ctc: '7.50 LPA' },
    { id: 'p-5', sNo: '4', company: 'Lumen Technologies', offers: '3', ctc: '7.10 LPA' },
  ]);

  const [totalPlacementOffers, setTotalPlacementOffers] = useState<string>('524');
  const [totalCsrOffers, setTotalCsrOffers] = useState<string>('266');

  // Live Fetch function for Google Sheets CSV
  const fetchLiveData = async () => {
    setIsRefreshing(true);
    try {
      // 1. Fetch Circulars
      try {
        const url = `https://docs.google.com/spreadsheets/d/e/${SHEET_IDS.circulars}/pub?output=csv&t=${Date.now()}`;
        const res = await fetch(url);
        if (res.ok) {
          const text = await res.text();
          const rows = parseCSV(text);
          const parsed: CircularItem[] = [];
          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length < 2) continue;
            const col0 = (row[0] || '').trim();
            const col1 = (row[1] || '').trim();

            if (col0.toLowerCase().includes('#') || col1.toLowerCase() === 'circular' || !col1) continue;

            const dateMatch = col1.match(/(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/);
            parsed.push({
              id: `c-${i}`,
              sNo: col0 || String(parsed.length + 1),
              title: col1,
              date: dateMatch ? dateMatch[1] : undefined,
              type: col1.toLowerCase().includes('holiday') ? 'Holiday' : 'Circular',
            });
          }
          if (parsed.length > 0) setCirculars(parsed);
        }
      } catch (err) {
        console.warn('Could not refresh circulars live:', err);
      }

      // 2. Fetch Examination
      try {
        const url = `https://docs.google.com/spreadsheets/d/e/${SHEET_IDS.examination}/pub?output=csv&t=${Date.now()}`;
        const res = await fetch(url);
        if (res.ok) {
          const text = await res.text();
          const rows = parseCSV(text);
          const parsed: ExamNotificationItem[] = [];

          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length < 2) continue;
            const joined = row.join(' ').toLowerCase();

            if (joined.includes('examination notifications:') || (row[0]?.trim() === '#' && joined.includes('category'))) {
              continue;
            }

            const sNoRaw = (row[0] || '').trim();
            const categoryRaw = (row[1] || '').trim();
            const titleRaw = (row[2] || row[1] || '').trim();

            if (!titleRaw || titleRaw.toLowerCase() === 'notification' || categoryRaw.toLowerCase() === 'category') {
              continue;
            }

            const dateMatch = categoryRaw.match(/(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/);
            const cleanCat = categoryRaw.replace(/\(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\)/, '').trim();

            parsed.push({
              id: `e-${i}`,
              sNo: sNoRaw || String(parsed.length + 1),
              category: cleanCat || 'Notification',
              date: dateMatch ? dateMatch[1] : undefined,
              title: titleRaw,
            });
          }
          if (parsed.length > 0) setExams(parsed);
        }
      } catch (err) {
        console.warn('Could not refresh exams live:', err);
      }

      // 3. Fetch Placements
      try {
        const url = `https://docs.google.com/spreadsheets/d/e/${SHEET_IDS.placements}/pub?output=csv&t=${Date.now()}`;
        const res = await fetch(url);
        if (res.ok) {
          const text = await res.text();
          const rows = parseCSV(text);
          const parsed: PlacementRecord[] = [];
          let isCsrSection = false;
          let lastSNo = '';
          let lastCompany = '';

          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length === 0) continue;
            const joined = row.join(' ').toLowerCase();

            if (joined.includes('csr drives')) {
              isCsrSection = true;
              continue;
            }
            if (joined.includes('total offers')) {
              const val = row.find((c) => /^\d+$/.test(c.trim()));
              if (val) setTotalPlacementOffers(val);
              continue;
            }
            if (joined.includes('total count')) {
              const val = row.find((c) => /^\d+$/.test(c.trim()));
              if (val) setTotalCsrOffers(val);
              continue;
            }

            if (joined.includes('company') || joined.includes('no. of offers') || joined.includes('batch')) {
              continue;
            }

            const sNo = row[0]?.trim();
            const company = row[1]?.trim();
            const offers = row[2]?.trim();
            const ctc = row[3]?.trim() || '';

            if (sNo && sNo.length > 0) lastSNo = sNo;
            if (company && company.length > 0) lastCompany = company;

            if (offers && offers.length > 0 && /^\d+$/.test(offers)) {
              parsed.push({
                id: `p-${i}`,
                sNo: lastSNo,
                company: lastCompany || 'Partner Recruiter',
                offers,
                ctc,
                isCsr: isCsrSection,
              });
            }
          }
          if (parsed.length > 0) setPlacements(parsed);
        }
      } catch (err) {
        console.warn('Could not refresh placements live:', err);
      }

      setLastUpdated(new Date());
    } finally {
      setIsRefreshing(false);
    }
  };

  // Automatic periodic fetch every 30 seconds
  useEffect(() => {
    document.title = 'Notifications & Bulletins | SRIT';
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filtered queries
  const filteredCirculars = useMemo(() => {
    if (!searchQuery) return circulars;
    const q = searchQuery.toLowerCase();
    return circulars.filter((c) => c.title.toLowerCase().includes(q) || c.type.toLowerCase().includes(q));
  }, [circulars, searchQuery]);

  const filteredExams = useMemo(() => {
    if (!searchQuery) return exams;
    const q = searchQuery.toLowerCase();
    return exams.filter((e) => e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q));
  }, [exams, searchQuery]);

  const filteredPlacements = useMemo(() => {
    if (!searchQuery) return placements;
    const q = searchQuery.toLowerCase();
    return placements.filter((p) => p.company.toLowerCase().includes(q) || p.ctc.toLowerCase().includes(q));
  }, [placements, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-[#FF6600] selection:text-white">
      <Navbar />

      <PageHeader
        title="Notifications"
        categoryTitle="Official Campus Bulletins"
        variant="default"
      />

      <main className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex-1">
        {/* Section Title matching SRIT official design language */}
        <div className="mb-8 text-center sm:mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#FF6600]">
              Live Institutional Feeds
            </p>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#171b24] tracking-tight">
            Campus Bulletins & Notices
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-14 rounded-full bg-[#FF6600]" />
          <p className="text-sm text-neutral-600 mt-3 max-w-xl mx-auto">
            Official announcements, examination schedules, and recruitment updates synced live with SRIT Academic Administration.
          </p>
        </div>

        {/* 4 Stat Cards in SRIT Placement Style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="border border-neutral-200/90 bg-white p-4 flex items-center gap-3.5 transition-all duration-200 hover:border-[#FF6600]/40 shadow-xs">
            <div className="h-11 w-11 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF6600] shrink-0">
              <FileText className="h-5 w-5 text-[#FF6600]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none">
                {circulars.length}
              </div>
              <div className="text-[11px] font-bold text-neutral-500 mt-1 uppercase tracking-wider">
                Active Circulars
              </div>
            </div>
          </div>

          <div className="border border-neutral-200/90 bg-white p-4 flex items-center gap-3.5 transition-all duration-200 hover:border-blue-500/40 shadow-xs">
            <div className="h-11 w-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none">
                {exams.length}
              </div>
              <div className="text-[11px] font-bold text-neutral-500 mt-1 uppercase tracking-wider">
                Active Exams
              </div>
            </div>
          </div>

          <div className="border border-neutral-200/90 bg-white p-4 flex items-center gap-3.5 transition-all duration-200 hover:border-emerald-500/40 shadow-xs">
            <div className="h-11 w-11 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <GraduationCap className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none">
                {totalPlacementOffers}
              </div>
              <div className="text-[11px] font-bold text-neutral-500 mt-1 uppercase tracking-wider">
                Total Offers (22-26)
              </div>
            </div>
          </div>

          <div className="border border-neutral-200/90 bg-white p-4 flex items-center gap-3.5 transition-all duration-200 hover:border-purple-500/40 shadow-xs">
            <div className="h-11 w-11 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <Building2 className="h-5 w-5 text-purple-600" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none">
                {totalCsrOffers}
              </div>
              <div className="text-[11px] font-bold text-neutral-500 mt-1 uppercase tracking-wider">
                CSR Drives Offers
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar: Category Buttons + Search + Live Auto-fetch Status */}
        <div className="border border-neutral-200 bg-neutral-50 p-3 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* SRIT-style flat tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Bulletins', count: circulars.length + exams.length + placements.length },
              { id: 'circulars', label: 'Circulars', count: circulars.length },
              { id: 'examination', label: 'Examination', count: exams.length },
              { id: 'placements', label: 'Placements', count: placements.length },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#FF6600] text-white shadow-xs'
                      : 'bg-white hover:bg-neutral-200/80 text-neutral-700 border border-neutral-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-white/25 text-white' : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5">
            {/* Search Input */}
            <div className="relative min-w-[200px] sm:min-w-[250px]">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notices, exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-neutral-200 text-neutral-800 placeholder-neutral-400 focus:border-[#FF6600] focus:ring-1 focus:ring-[#FF6600] outline-none"
              />
            </div>

            {/* Sync Live Button */}
            <button
              type="button"
              onClick={fetchLiveData}
              disabled={isRefreshing}
              title={`Last fetched: ${lastUpdated.toLocaleTimeString()}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-200 hover:border-[#FF6600] bg-white text-xs font-bold text-neutral-700 hover:text-[#FF6600] transition-colors shrink-0 disabled:opacity-60 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#FF6600] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isRefreshing ? 'Syncing…' : 'Sync Live'}</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            SECTION 1: 3-CARD OVERVIEW MATCHING SRIT SOCIAL MEDIA FEEDS STYLE
        ========================================================================== */}
        {activeTab === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* 1. Circulars Feed Card */}
            <div className="relative flex h-[700px] flex-col overflow-hidden border border-neutral-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-5 py-3.5 z-10">
                <h3 className="flex items-center gap-2 text-[16px] font-bold tracking-tight text-neutral-900">
                  <FileText className="w-4 h-4 text-[#FF6600]" />
                  Campus Circulars
                </h3>
                <span className="text-[11px] font-bold text-[#FF6600] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
                  {filteredCirculars.length} Active
                </span>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 p-4 space-y-2">
                {filteredCirculars.length === 0 ? (
                  <div className="text-center py-20 text-neutral-400 text-xs">No circulars match filter</div>
                ) : (
                  filteredCirculars.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 border border-neutral-100 hover:border-[#FF6600]/40 hover:bg-[#FFF9F6] transition-colors group"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-orange-50 text-[#FF6600] text-[11px] font-bold mt-0.5">
                          {item.sNo}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-bold text-neutral-900 group-hover:text-[#FF6600] transition-colors leading-snug">
                            {item.title}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                              Official
                            </span>
                            {item.date && (
                              <span className="text-[11px] text-neutral-500 font-medium">
                                • {item.date}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-3 border-t border-neutral-200 bg-neutral-50 text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('circulars')}
                  className="text-xs font-bold text-[#FF6600] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  View all circulars <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2. Examination Feed Card */}
            <div className="relative flex h-[700px] flex-col overflow-hidden border border-neutral-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-5 py-3.5 z-10">
                <h3 className="flex items-center gap-2 text-[16px] font-bold tracking-tight text-neutral-900">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Examination Section
                </h3>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  AY 2026-27
                </span>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 p-4 space-y-2">
                {filteredExams.length === 0 ? (
                  <div className="text-center py-20 text-neutral-400 text-xs">No exam notifications found</div>
                ) : (
                  filteredExams.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 border border-neutral-100 hover:border-blue-300 hover:bg-blue-50/30 transition-colors group"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-700 text-[11px] font-bold mt-0.5">
                          {item.sNo}
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="inline-block text-[9.5px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 px-1.5 py-0.2 rounded mb-1">
                            {item.category}
                          </span>
                          <p className="text-[13px] font-bold text-neutral-900 group-hover:text-blue-700 transition-colors leading-snug">
                            {item.title}
                          </p>
                          {item.date && (
                            <p className="text-[11px] text-neutral-500 font-medium mt-1">
                              Date: {item.date}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-3 border-t border-neutral-200 bg-neutral-50 text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('examination')}
                  className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  View examination portal <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3. Placements Feed Card */}
            <div className="relative flex h-[700px] flex-col overflow-hidden border border-neutral-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-5 py-3.5 z-10">
                <h3 className="flex items-center gap-2 text-[16px] font-bold tracking-tight text-neutral-900">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  Placements 2022-26
                </h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  {totalPlacementOffers} Offers
                </span>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 p-4 space-y-1.5">
                {filteredPlacements.length === 0 ? (
                  <div className="text-center py-20 text-neutral-400 text-xs">No placement records found</div>
                ) : (
                  filteredPlacements.slice(0, 50).map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 border border-neutral-100 hover:border-emerald-300 hover:bg-emerald-50/20 transition-colors flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="h-5 w-5 shrink-0 rounded bg-neutral-100 flex items-center justify-center text-[10px] font-mono font-bold text-neutral-600">
                          {item.sNo || '#'}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[12.5px] font-bold text-neutral-900 truncate group-hover:text-emerald-700 transition-colors">
                            {item.company}
                          </p>
                          {item.isCsr && (
                            <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-1 py-0.2 rounded">
                              CSR Drive
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="inline-block text-[11px] font-black text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded">
                          {item.offers} {Number(item.offers) === 1 ? 'Offer' : 'Offers'}
                        </span>
                        {item.ctc && (
                          <p className="text-[11px] font-bold text-emerald-700 mt-0.5">
                            {item.ctc}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-3 border-t border-neutral-200 bg-neutral-50 text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('placements')}
                  className="text-xs font-bold text-emerald-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  View full placement table <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 2: CIRCULARS EXPANDED VIEW
        ========================================================================== */}
        {activeTab === 'circulars' && (
          <div className="border border-neutral-200 bg-white">
            <div className="border-b border-neutral-200 bg-neutral-50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900">Campus Circulars</h3>
                <p className="text-xs text-neutral-500 mt-1">Official holiday and administrative notices from SRIT</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className="self-start sm:self-center px-4 py-2 border border-neutral-300 bg-white text-xs font-bold text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                ← Back to Overview
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCirculars.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 border border-neutral-200 hover:border-[#FF6600]/50 hover:bg-[#FFF9F6] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-orange-50 text-[#FF6600] text-xs font-bold">
                        {item.sNo}
                      </span>
                      <div className="flex-1">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded mb-2">
                          {item.type}
                        </span>
                        <h4 className="text-[14.5px] font-bold text-neutral-900 leading-snug">
                          {item.title}
                        </h4>
                        {item.date && (
                          <p className="text-xs text-neutral-500 font-medium mt-2">
                            Announced: {item.date}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 3: EXAMINATION EXPANDED VIEW
        ========================================================================== */}
        {activeTab === 'examination' && (
          <div className="border border-neutral-200 bg-white">
            <div className="border-b border-neutral-200 bg-neutral-50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900">Examination Notifications</h3>
                <p className="text-xs text-neutral-500 mt-1">Timetables and schedules for AY 2026-27</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className="self-start sm:self-center px-4 py-2 border border-neutral-300 bg-white text-xs font-bold text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                ← Back to Overview
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {filteredExams.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 border border-neutral-200 hover:border-blue-400 hover:bg-blue-50/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-700 text-xs font-bold mt-0.5">
                        {item.sNo}
                      </span>
                      <div>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded mb-1.5">
                          {item.category}
                        </span>
                        <h4 className="text-[15px] font-bold text-neutral-900">
                          {item.title}
                        </h4>
                        {item.date && (
                          <p className="text-xs text-neutral-500 font-medium mt-1">
                            Date: {item.date}
                          </p>
                        )}
                      </div>
                    </div>

                    <a
                      href="https://sritexams.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white text-xs font-bold text-neutral-800 transition-colors self-start sm:self-auto shrink-0"
                    >
                      <span>Exam Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 4: PLACEMENTS EXPANDED VIEW
        ========================================================================== */}
        {activeTab === 'placements' && (
          <div className="border border-neutral-200 bg-white">
            <div className="border-b border-neutral-200 bg-neutral-50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900">Placements 2022-26 Registry</h3>
                <p className="text-xs text-neutral-500 mt-1">Company drives, offer counts, and CTC details</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className="self-start sm:self-center px-4 py-2 border border-neutral-300 bg-white text-xs font-bold text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                ← Back to Overview
              </button>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto border border-neutral-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-100/70 border-b border-neutral-200 text-[11px] font-extrabold uppercase tracking-wider text-neutral-600">
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Company Name</th>
                      <th className="py-3 px-4">Drive Type</th>
                      <th className="py-3 px-4 text-center">Offers</th>
                      <th className="py-3 px-4 text-right">Compensation (CTC)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-sm">
                    {filteredPlacements.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="py-3 px-4 text-xs font-mono font-bold text-neutral-500">{item.sNo || idx + 1}</td>
                        <td className="py-3 px-4 font-bold text-neutral-900">{item.company}</td>
                        <td className="py-3 px-4">
                          {item.isCsr ? (
                            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                              CSR Drive
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                              Campus Drive
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-neutral-900">{item.offers}</td>
                        <td className="py-3 px-4 text-right font-bold text-emerald-700">{item.ctc || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
