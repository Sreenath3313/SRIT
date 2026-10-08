import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, GraduationCap, Mail, Menu, Phone, Search, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks, type NavLink } from '../../data/navigation';

const moreLinks = navLinks.slice(5).flatMap((entry) => [
    { label: entry.label, href: entry.href },
    ...(entry.subItems ?? []),
]);

const moreSections = [
    { title: 'Student life & community', entries: [navLinks[5], navLinks[9], navLinks[10]] },
    { title: 'Examination services', entries: [navLinks[6]] },
    { title: 'Placements & careers', entries: [navLinks[7]] },
    { title: 'Committees & cells', entries: [navLinks[8]] },
];

const desktopLinks: NavLink[] = [
    navLinks[0], navLinks[1], navLinks[3], navLinks[2], navLinks[4], navLinks[7],
    { label: 'More', href: '/examination/team-members', hasDropdown: true, subItems: moreLinks },
];

const quickLinks = [
    { label: 'About Us', href: '/about/overview' },
    { label: 'Academics', href: '/departments' },
    { label: 'Admissions', href: '/admissions/courses-offered' },
    { label: 'Campus Life', href: '/campus-life/campus' },
    { label: 'Student Chapters', href: '/student-chapters/chairman-s-club' },
    { label: 'Examination', href: '/examination/team-members' },
    { label: 'Placements', href: '/placements/about-t-and-p' },
    { label: 'Research & Consultancy Cell', href: '/committees/research-and-consultancy-cell' },
    { label: 'Contact Us', href: '/contact-us' },
    ...navLinks.flatMap((entry) => entry.subItems ?? []),
];

const Navbar: React.FC = () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState('');
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const location = useLocation();

    useEffect(() => {
        setOpenMenu(null);
        setMobileOpen(false);
        setMobileSubmenu(null);
        setSearchOpen(false);
    }, [location.pathname]);

    useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

    const results = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        if (normalized.length < 2) return [];
        const seen = new Set<string>();
        return quickLinks.filter((item) => {
            if (!item.label.toLowerCase().includes(normalized) || seen.has(item.href)) return false;
            seen.add(item.href);
            return true;
        }).slice(0, 8);
    }, [query]);

    const onMenuEnter = (label: string) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpenMenu(label);
    };
    const onMenuLeave = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
    };

    const activeMenu = desktopLinks.find((item) => item.label === openMenu);
    const megaLinks = activeMenu?.subItems ?? [];
    const isActive = (link: NavLink) => location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));

    return <header className="fixed inset-x-0 top-0 z-[100] bg-white shadow-[0_10px_32px_rgba(255,84,34,.12)]">
        <div className="border-b border-primary/15 bg-white">
            <div className="mx-auto flex min-h-[34px] max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 sm:gap-6">
                    <a href="tel:+919515611111" className="inline-flex items-center gap-2 text-[10px] font-medium sm:text-[11px] text-primary-dark"><Phone className="h-3 w-3 text-primary" />+91 95156 11111</a>
                    <a href="mailto:hr@srit.ac.in" className="hidden sm:inline-flex items-center gap-2 text-[10px] font-medium sm:text-[11px] text-primary-dark"><Mail className="h-3 w-3 text-primary" />hr@srit.ac.in</a>
                </div>
                <div className="hidden sm:flex items-center gap-5 text-[10px] font-medium text-primary-dark">
                    <a href="https://webprosindia.com/srit/default.aspx?ReturnUrl=%2fsrit%2f" target="_blank" rel="noreferrer" className="hover:text-primary">Faculty login</a>
                    <a href="https://webprosindia.com/srit/default.aspx?ReturnUrl=%2fsrit%2f" target="_blank" rel="noreferrer" className="hover:text-primary">Student login</a>
                    <Link to="/downloads" className="hover:text-primary">Downloads</Link>
                    <Link to="/contact-us" className="hover:text-primary">Contact</Link>
                </div>
                <Link to="/contact-us" className="sm:hidden text-[10px] font-semibold text-primary-dark">Contact SRIT</Link>
            </div>
        </div>

        <div className="relative bg-primary" onMouseLeave={onMenuLeave}>
            <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[80px] lg:px-8">
                <Link to="/" aria-label="SRIT home" className="flex min-w-0 shrink-0 items-center gap-3">
                    <img src="/optimized/srit.jpg" alt="Srinivasa Ramanujan Institute of Technology — Autonomous, NBA, NAAC A Grade" width="1280" height="240" fetchPriority="high" className="h-auto w-[220px] max-w-[38vw] rounded-md bg-white p-1.5 object-contain shadow-[0_2px_8px_rgba(116,38,13,.18)] sm:w-[280px] lg:w-[320px]" />
                </Link>

                <nav aria-label="Primary navigation" className="hidden xl:flex h-full items-center gap-0.5">
                    {desktopLinks.map((item) => <div key={item.label} className="relative flex h-full items-center" onMouseEnter={() => onMenuEnter(item.label)}>
                        <Link to={item.href} onFocus={() => onMenuEnter(item.label)} className={`relative inline-flex h-full items-center gap-1 px-2 text-[12px] font-semibold transition-colors hover:bg-white/10 2xl:px-3 2xl:text-[13px] ${isActive(item) || openMenu === item.label ? 'text-black' : 'text-black hover:text-black'}`}>
                            {item.label}{item.hasDropdown && <ChevronDown className={`h-3 w-3 transition-transform ${openMenu === item.label ? 'rotate-180' : ''}`} />}
                            <span className={`absolute inset-x-3 bottom-4 h-[2px] origin-center bg-white transition-transform ${isActive(item) || openMenu === item.label ? 'scale-x-100' : 'scale-x-0'}`} />
                        </Link>
                    </div>)}
                </nav>

                <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-0">
                    <button type="button" onClick={() => { setSearchOpen((open) => !open); setOpenMenu(null); }} aria-label={searchOpen ? 'Close search' : 'Search this site'} aria-expanded={searchOpen} className="inline-flex h-10 w-10 items-center justify-center text-white transition-colors hover:bg-white/10"><Search className="h-[18px] w-[18px]" /></button>
                    <Link to="/admissions/admission-procedure" className="hidden sm:inline-flex h-10 items-center gap-2 bg-white px-5 text-[11px] font-bold uppercase tracking-[.1em] text-primary-dark transition-colors hover:bg-orange-50">Apply <ArrowRight className="h-3.5 w-3.5" /></Link>
                    <button type="button" onClick={() => { setMobileOpen((open) => !open); setSearchOpen(false); }} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} className="inline-flex h-10 w-10 items-center justify-center text-white xl:hidden">{mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
                </div>
            </div>

            <AnimatePresence>
                {activeMenu?.hasDropdown && megaLinks.length > 0 && <motion.div key={activeMenu.label} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .18 }} onMouseEnter={() => onMenuEnter(activeMenu.label)} onMouseLeave={onMenuLeave} className="absolute left-0 right-0 top-full z-50 max-h-[calc(100dvh-150px)] overflow-y-auto border-t border-primary/10 bg-white shadow-[0_24px_44px_rgba(255,84,34,.14)]">
                    <div className="mx-auto max-w-[1500px] px-5 py-6 sm:px-8 sm:py-8 2xl:px-12">
                        <div className="mb-5 flex items-end justify-between border-b border-primary/15 pb-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-primary-dark">Explore SRIT</p><h2 className="mt-1 font-serif text-2xl font-semibold text-black">{activeMenu.label}</h2></div><Link to={activeMenu.href} className="inline-flex items-center gap-2 text-xs font-bold text-black hover:text-primary">View section <ArrowRight className="h-3.5 w-3.5" /></Link></div>
                        {activeMenu.label === 'More' ? <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
                            {moreSections.map((section) => <section key={section.title} aria-label={section.title} className="min-w-0">
                                <h3 className="mb-3 border-b border-primary/20 pb-2 text-sm font-semibold text-primary-dark">{section.title}</h3>
                                <div className="space-y-5">
                                    {section.entries.map((entry) => <div key={entry.label}>
                                        <Link to={entry.href} className="mb-1 block text-xs font-bold text-black hover:text-primary">{entry.label}</Link>
                                        {entry.subItems?.length ? <ul className="space-y-0.5">{entry.subItems.map((item) => <li key={`${item.href}-${item.label}`}><Link to={item.href} className="group flex min-h-8 items-center justify-between gap-2 border-b border-primary/10 py-1.5 text-[11px] leading-snug text-black hover:bg-orange-50"><span>{item.label}</span><ArrowRight className="h-3 w-3 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" /></Link></li>)}</ul> : null}
                                    </div>)}
                                </div>
                            </section>)}
                        </div> : <div className={`grid gap-x-6 gap-y-1 ${megaLinks.length > 15 ? 'grid-cols-4' : megaLinks.length > 7 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                            {megaLinks.map((item, index) => <Link key={`${item.label}-${item.href}-${index}`} to={item.href} className="group flex min-h-10 items-center justify-between gap-3 border-b border-primary/10 px-2 py-2 text-[12px] font-medium text-black transition-colors hover:bg-orange-50 hover:text-black"><span>{item.label}</span><ArrowRight className="h-3 w-3 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" /></Link>)}
                        </div>}
                    </div>
                </motion.div>}
            </AnimatePresence>
        </div>

        <div className="border-b border-primary/15 bg-white">
            <div className="mx-auto flex h-[36px] max-w-[1500px] items-center gap-3 px-4 sm:px-6 lg:px-8">
                <span className="inline-flex shrink-0 items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[.16em] text-primary"><GraduationCap className="h-3.5 w-3.5 text-primary" />SRIT</span>
                <span className="h-3 w-px bg-primary/20" />
                <Link to="/admissions/courses-offered" className="truncate text-[10px] font-semibold text-black hover:text-primary">Explore engineering programs at SRIT</Link>
                <Link to="/examination/notifications-and-results" className="ml-auto inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-black hover:text-primary">Notifications <ArrowRight className="h-3 w-3" /></Link>
            </div>
        </div>

        <AnimatePresence>
            {searchOpen && <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute left-0 right-0 top-full z-[60] border-t border-primary/15 bg-white shadow-[0_16px_36px_rgba(255,84,34,.12)]">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-8"><label htmlFor="srit-site-search" className="mb-2 block text-[10px] font-bold uppercase tracking-[.18em] text-primary-dark">Search SRIT</label><div className="flex items-center gap-3 border-b-2 border-primary/20 pb-3 focus-within:border-primary"><Search className="h-5 w-5 text-primary-dark" /><input id="srit-site-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search departments, admissions, facilities…" className="min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-primary-dark" /><button type="button" onClick={() => { setSearchOpen(false); setQuery(''); }} aria-label="Close search"><X className="h-5 w-5 text-primary-dark" /></button></div>
                    {query.trim().length >= 2 && <div className="mt-3 grid sm:grid-cols-2">{results.length ? results.map((item) => <Link key={`${item.href}-${item.label}`} to={item.href} className="flex items-center justify-between border-b border-primary/10 px-2 py-3 text-sm text-primary-dark hover:text-primary">{item.label}<ArrowRight className="h-4 w-4" /></Link>) : <p className="py-3 text-sm text-primary-dark">No matching pages. Try another search.</p>}</div>}
                </div>
            </motion.div>}
        </AnimatePresence>

        <AnimatePresence>
            {mobileOpen && <>
                <motion.button aria-label="Close navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-x-0 bottom-0 top-[142px] z-40 bg-primary/20 xl:hidden" />
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .22 }} className="absolute left-0 right-0 top-[calc(100%+36px)] z-50 max-h-[calc(100dvh-142px)] overflow-y-auto overscroll-contain border-t border-primary/10 bg-white shadow-[0_16px_36px_rgba(255,84,34,.12)] xl:hidden">
                    <nav aria-label="Mobile navigation" className="px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2 sm:px-6">
                        {navLinks.map((item) => <div key={item.label} className="border-b border-primary/10 last:border-0">
                            <div className="flex min-h-12 items-center justify-between"><Link to={item.href} onClick={() => !item.hasDropdown && setMobileOpen(false)} className="flex-1 py-3 text-sm font-semibold text-black">{item.label}</Link>{item.hasDropdown && <button type="button" aria-label={`${mobileSubmenu === item.label ? 'Close' : 'Open'} ${item.label} submenu`} aria-expanded={mobileSubmenu === item.label} onClick={() => setMobileSubmenu((open) => open === item.label ? null : item.label)} className="inline-flex h-10 w-10 items-center justify-center text-primary"><ChevronDown className={`h-4 w-4 transition-transform ${mobileSubmenu === item.label ? 'rotate-180' : ''}`} /></button>}</div>
                            <AnimatePresence>{item.hasDropdown && mobileSubmenu === item.label && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="grid grid-cols-1 gap-0 overflow-hidden pb-2 pl-4 sm:grid-cols-2">{item.subItems?.map((sub) => <Link key={`${sub.label}-${sub.href}`} to={sub.href} onClick={() => setMobileOpen(false)} className="py-2.5 pr-3 text-[12px] text-black hover:text-black">{sub.label}</Link>)}</motion.div>}</AnimatePresence>
                        </div>)}
                        <div className="grid grid-cols-2 gap-2 pt-4 sm:hidden"><a href="https://webprosindia.com/srit/default.aspx?ReturnUrl=%2fsrit%2f" className="py-2 text-xs font-semibold text-primary-dark">Faculty login</a><a href="https://webprosindia.com/srit/default.aspx?ReturnUrl=%2fsrit%2f" className="py-2 text-xs font-semibold text-primary-dark">Student login</a><Link to="/downloads" onClick={() => setMobileOpen(false)} className="py-2 text-xs font-semibold text-primary-dark">Downloads</Link><Link to="/previousranks" onClick={() => setMobileOpen(false)} className="py-2 text-xs font-semibold text-primary-dark">EAPCET / ECET ranks</Link></div>
                        <Link to="/admissions/admission-procedure" onClick={() => setMobileOpen(false)} className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 bg-primary-dark text-sm font-bold text-white transition-colors hover:bg-[#C94100] sm:hidden">Apply to SRIT <ArrowRight className="h-4 w-4" /></Link>
                    </nav>
                </motion.div>
            </>}
        </AnimatePresence>
    </header>;
};

export default Navbar;
