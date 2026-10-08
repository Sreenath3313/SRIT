import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, ChevronDown, Contact, Download, GraduationCap, Mail, Phone, Search, UsersRound, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks, type NavLink } from '../../data/navigation';
import { placementStats } from '../../data/placements';

const desktopLinks: NavLink[] = [
    navLinks[1], navLinks[3], navLinks[2], navLinks[4], navLinks[7],
];

const menuLinks = navLinks.filter((item) => item.href !== '/');

const placementTickerText = placementStats.map((stat) => `${stat.value} ${stat.label} · ${stat.subtext}`).join('   ·   ');

const utilityLinks = [
    { label: 'Faculty Login', href: 'https://webprosindia.com/srit/default.aspx?ReturnUrl=%2fsrit%2f', external: true, icon: UsersRound },
    { label: 'Student Login', href: 'https://webprosindia.com/srit/default.aspx?ReturnUrl=%2fsrit%2f', external: true, icon: GraduationCap },
    { label: 'Degree Verification', href: '/degree-verification', icon: BadgeCheck },
    { label: 'Alumni', href: 'https://alumni.srit.ac.in/', external: true, icon: UsersRound },
    { label: 'EAPCET/ECET Ranks', href: '/previousranks', icon: UsersRound },
    { label: 'Downloads', href: '/downloads', icon: Download },
    { label: 'Contact Us', href: '/contact-us', icon: Contact },
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

interface NavbarProps {
    showPlacementTicker?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showPlacementTicker = true }) => {
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
    const isSubItemActive = (href: string) => location.pathname === href;

    return <header className="fixed inset-x-0 top-0 z-[100] bg-white shadow-[0_10px_32px_rgba(255,102,0,.12)]">
        <div className="bg-[#FF6600] text-black">
            <div className="mx-auto flex min-h-[34px] max-w-[1680px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
                <div className="hidden items-center md:flex">
                    <a href="tel:+919515611111" className="inline-flex items-center gap-2 whitespace-nowrap border-r border-white py-1 pr-3 text-[10px] font-medium sm:text-[11px]"><Phone className="h-3 w-3" />91-951 561 1111</a>
                    <a href="mailto:hr@srit.ac.in" className="hidden items-center gap-2 whitespace-nowrap py-1 pl-3 text-[10px] font-medium sm:inline-flex sm:text-[11px]"><Mail className="h-3 w-3" />hr@srit.ac.in</a>
                </div>
                <div aria-label="Contact and quick links" className="flex w-full flex-col items-center gap-1 py-1 md:hidden">
                    <div className="flex items-center justify-center whitespace-nowrap text-[11px] font-medium">
                        <a href="tel:+919515611111" className="inline-flex items-center gap-1.5 border-r border-white px-2 py-0.5"><Phone className="h-3 w-3" />91-951 561 1111</a>
                        <a href="mailto:hr@srit.ac.in" className="inline-flex items-center gap-1.5 px-2 py-0.5"><Mail className="h-3 w-3" />hr@srit.ac.in</a>
                    </div>
                    <div className="grid w-full max-w-[540px] grid-cols-3 text-[10px] font-medium">
                        {utilityLinks.map(({ label, href, external, icon: Icon }, index) => {
                            const itemClass = `inline-flex min-h-6 items-center justify-center gap-1 px-1 py-0.5 text-center leading-tight ${index < 6 && index % 3 < 2 ? 'border-r border-white' : ''} ${index === 6 ? 'col-span-3' : ''}`;
                            return external ? <a key={label} href={href} target="_blank" rel="noreferrer" className={itemClass}><Icon className="h-3 w-3 shrink-0" />{label}</a> : <Link key={label} to={href} className={itemClass}><Icon className="h-3 w-3 shrink-0" />{label}</Link>;
                        })}
                    </div>
                </div>
                <div className="hidden items-center text-[10px] font-medium xl:flex">
                    {utilityLinks.map(({ label, href, external, icon: Icon }) => external ? <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 whitespace-nowrap border-l border-white px-2.5 py-1 transition-colors hover:text-black/75"><Icon className="h-3.5 w-3.5" />{label}</a> : <Link key={label} to={href} className="inline-flex items-center gap-1.5 whitespace-nowrap border-l border-white px-2.5 py-1 transition-colors hover:text-black/75"><Icon className="h-3.5 w-3.5" />{label}</Link>)}
                </div>
                <div className="hidden items-center text-[10px] font-medium md:flex xl:hidden">
                    {utilityLinks.filter(({ label }) => ['Faculty Login', 'Student Login', 'Downloads', 'Contact Us'].includes(label)).map(({ label, href, external, icon: Icon }) => external ? <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 whitespace-nowrap border-l border-white px-2 py-1 transition-colors hover:text-black/75"><Icon className="h-3.5 w-3.5" />{label}</a> : <Link key={label} to={href} className="inline-flex items-center gap-1 whitespace-nowrap border-l border-white px-2 py-1 transition-colors hover:text-black/75"><Icon className="h-3.5 w-3.5" />{label}</Link>)}
                </div>
            </div>
        </div>

        <div className="relative border-t-4 border-[#FF6600] bg-white" onMouseLeave={onMenuLeave}>
            <div className="mx-auto flex h-[72px] max-w-[1680px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[80px] lg:px-8">
                <Link to="/" aria-label="SRIT home" className="flex min-w-0 shrink-0 items-center gap-3">
                    <img src="/optimized/srit.jpg" alt="Srinivasa Ramanujan Institute of Technology — Autonomous, NBA, NAAC A Grade" width="1280" height="240" fetchPriority="high" className="h-auto w-[240px] max-w-[46vw] object-contain sm:w-[300px] lg:w-[360px]" />
                </Link>

                <nav aria-label="Primary navigation" className="ml-auto hidden h-full items-center gap-1 xl:flex">
                    {desktopLinks.map((item) => <div key={item.label} className="relative flex h-full items-center" onMouseEnter={() => { setMobileOpen(false); setMobileSubmenu(null); onMenuEnter(item.label); }}>
                        <Link to={item.href} onFocus={() => onMenuEnter(item.label)} className={`relative inline-flex h-full items-center gap-1.5 px-2.5 text-[15px] font-semibold transition-colors duration-200 ease-out hover:text-[#FF6600] 2xl:px-3 2xl:text-[16px] ${isActive(item) || openMenu === item.label ? 'text-[#FF6600]' : 'text-[#171b24]'}`}>
                            {item.label}{item.hasDropdown && <ChevronDown className={`h-3 w-3 transition-transform duration-300 ease-out ${openMenu === item.label ? 'rotate-180' : ''}`} />}
                            <span className={`absolute inset-x-3 bottom-4 h-[2px] origin-center bg-[#FF6600] transition-transform duration-300 ease-out ${isActive(item) || openMenu === item.label ? 'scale-x-100' : 'scale-x-0'}`} />
                        </Link>
                    </div>)}
                </nav>

                <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-4">
                    <button type="button" onClick={() => { setSearchOpen((open) => !open); setOpenMenu(null); }} aria-label={searchOpen ? 'Close search' : 'Search this site'} aria-expanded={searchOpen} className="inline-flex h-11 w-11 items-center justify-center text-black transition-colors hover:text-[#FF6600]"><Search className="h-5 w-5" /></button>
                    <button type="button" onClick={() => { setMobileOpen((open) => !open); setSearchOpen(false); setOpenMenu(null); }} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-controls="site-navigation-drawer" aria-expanded={mobileOpen} className="group inline-flex h-11 w-11 items-center justify-center text-[#171b24] transition-colors hover:text-[#FF6600]">
                        <span className="flex w-6 flex-col gap-[6px]" aria-hidden="true">
                            <span className={`h-[1.5px] rounded-full bg-current transition-all duration-300 ease-out ${mobileOpen ? 'translate-y-[6.5px] rotate-45' : 'w-5 group-hover:w-4'}`} />
                            <span className={`h-[1.5px] rounded-full bg-current transition-all duration-300 ease-out ${mobileOpen ? 'scale-x-0 opacity-0' : 'w-3.5 group-hover:w-5'}`} />
                            <span className={`h-[1.5px] rounded-full bg-current transition-all duration-300 ease-out ${mobileOpen ? '-translate-y-[6.5px] -rotate-45' : 'w-5 group-hover:w-4'}`} />
                        </span>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {activeMenu?.hasDropdown && megaLinks.length > 0 && <motion.div key={activeMenu.label} initial={{ opacity: 0, y: -12, scaleY: .985 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -8, scaleY: .99 }} transition={{ duration: .28, ease: [.22, 1, .36, 1] }} style={{ transformOrigin: 'top' }} onMouseEnter={() => onMenuEnter(activeMenu.label)} onMouseLeave={onMenuLeave} className="absolute left-0 right-0 top-full z-50 max-h-[calc(100dvh-150px)] overflow-y-auto border-t border-[#FF6600]/10 bg-[#fffdfa] shadow-[0_24px_44px_rgba(255,102,0,.14)]">
                    <div className="mx-auto max-w-[1500px] px-5 py-6 sm:px-8 sm:py-8 2xl:px-12">
                        <div className="mb-5 flex items-end justify-between border-b border-[#FF6600]/15 pb-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#FF6600]">Explore SRIT</p><h2 className="mt-1 font-serif text-2xl font-semibold text-black">{activeMenu.label}</h2></div><Link to={activeMenu.href} className="inline-flex items-center gap-2 text-xs font-bold text-black hover:text-[#FF6600]">View section <ArrowRight className="h-3.5 w-3.5" /></Link></div>
                        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: .025, delayChildren: .035 } } }} initial="hidden" animate="visible" className={`grid gap-x-6 gap-y-1 ${megaLinks.length > 15 ? 'grid-cols-4' : megaLinks.length > 7 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                            {megaLinks.map((item, index) => <motion.div key={`${item.label}-${item.href}-${index}`} variants={{ hidden: { opacity: 0, y: 7 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: .22, ease: [.22, 1, .36, 1] }}><Link to={item.href} className={`group flex min-h-10 items-center justify-between gap-3 border-b border-[#eadfd6] px-3 py-2 text-sm leading-5 font-medium tracking-[.005em] transition-colors duration-200 hover:border-[#ff9a64] hover:bg-[#fff1e8] hover:text-[#d94b12] ${isSubItemActive(item.href) ? 'border-[#ff9a64] bg-[#fff1e8] text-[#d94b12]' : 'text-[#29313d]'}`}><span>{item.label}</span><ArrowRight className={`h-3.5 w-3.5 shrink-0 -translate-x-1 transition-all duration-200 ease-out ${isSubItemActive(item.href) ? 'translate-x-0 opacity-100 text-[#d94b12]' : 'opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} /></Link></motion.div>)}
                        </motion.div>
                    </div>
                </motion.div>}
            </AnimatePresence>
        </div>

        {showPlacementTicker && <div className="overflow-hidden bg-[#FF6600] text-white">
            <div className="mx-auto flex h-[36px] max-w-[1680px] items-center overflow-hidden px-4 sm:px-6 lg:px-8">
                <Link to="/placements/about-t-and-p" className="z-10 inline-flex shrink-0 items-center gap-2 bg-[#FF6600] pr-4 text-[9px] font-extrabold uppercase tracking-[.16em] sm:text-[10px]">
                    <GraduationCap className="h-3.5 w-3.5" />Placements @ SRIT
                </Link>
                <div className="relative min-w-0 flex-1 overflow-hidden border-l border-white/30 pl-4" aria-label="Placement highlights">
                    <div className="animate-marquee flex min-w-max items-center gap-8 whitespace-nowrap text-[10px] font-medium sm:text-[11px]">
                        <span>{placementTickerText}</span>
                        <span aria-hidden="true">{placementTickerText}</span>
                    </div>
                </div>
            </div>
        </div>}

        <AnimatePresence>
                    {searchOpen && <motion.div initial={{ opacity: 0, y: -10, scaleY: .985 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -6, scaleY: .99 }} transition={{ duration: .24, ease: [.22, 1, .36, 1] }} style={{ transformOrigin: 'top' }} className="absolute left-0 right-0 top-full z-[60] border-t border-[#FF6600]/15 bg-white shadow-[0_16px_36px_rgba(255,102,0,.12)]">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-8"><label htmlFor="srit-site-search" className="mb-2 block text-[10px] font-bold uppercase tracking-[.18em] text-[#FF6600]">Search SRIT</label><div className="flex items-center gap-3 border-b-2 border-[#FF6600]/20 pb-3 focus-within:border-[#FF6600]"><Search className="h-5 w-5 text-[#FF6600]" /><input id="srit-site-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search departments, admissions, facilities…" className="min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-neutral-500" /><button type="button" onClick={() => { setSearchOpen(false); setQuery(''); }} aria-label="Close search"><X className="h-5 w-5 text-[#FF6600]" /></button></div>
                    {query.trim().length >= 2 && <div className="mt-3 grid sm:grid-cols-2">{results.length ? results.map((item) => <Link key={`${item.href}-${item.label}`} to={item.href} className="flex items-center justify-between border-b border-[#FF6600]/10 px-2 py-3 text-sm text-black hover:text-[#FF6600]">{item.label}<ArrowRight className="h-4 w-4" /></Link>) : <p className="py-3 text-sm text-neutral-600">No matching pages. Try another search.</p>}</div>}
                </div>
            </motion.div>}
        </AnimatePresence>

        <AnimatePresence>
            {mobileOpen && <>
                <motion.button aria-label="Close navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }} onClick={() => setMobileOpen(false)} className="absolute inset-x-0 top-full z-40 h-[100dvh] bg-black/20 backdrop-blur-[1px]" />
                <motion.div id="site-navigation-drawer" initial={{ opacity: 0, height: 0, y: -10 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0, y: -6 }} transition={{ height: { duration: .34, ease: [.22, 1, .36, 1] }, opacity: { duration: .22 }, y: { duration: .28, ease: [.22, 1, .36, 1] } }} className="absolute left-0 right-0 top-full z-50 max-h-[calc(100dvh-15rem)] overflow-y-auto overscroll-contain border-t border-[#FF6600]/10 bg-white shadow-[0_24px_48px_rgba(23,27,36,.14)] md:max-h-[calc(100dvh-9.125rem)] lg:max-h-[calc(100dvh-9.625rem)]">
                    <nav aria-label="Site navigation" className="mx-auto max-w-[1500px] px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-8">
                        <div className="flex items-end justify-between border-b border-[#FF6600]/20 py-4">
                            <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#FF6600]">Explore SRIT</p><p className="mt-1 text-xs text-neutral-500">Browse departments and services</p></div>
                        </div>
                        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 xl:grid-cols-4">
                        {menuLinks.map((item) => <div key={item.label} className="border-b border-[#FF6600]/15 py-1">
                            <div className="flex min-h-12 items-center justify-between">{item.hasDropdown ? <button type="button" aria-expanded={mobileSubmenu === item.label} onClick={() => setMobileSubmenu((open) => open === item.label ? null : item.label)} className={`flex min-h-11 w-full items-center justify-between rounded-sm px-3 py-3 text-left text-sm font-semibold transition-colors duration-200 hover:bg-[#FFE0CF] hover:text-[#FF6600] ${mobileSubmenu === item.label ? 'bg-[#FFF1E8] text-[#FF6600]' : 'text-[#171b24]'}`}><span>{item.label}</span><ChevronDown className={`h-4 w-4 text-[#FF6600] transition-transform ${mobileSubmenu === item.label ? 'rotate-180' : ''}`} /></button> : <Link to={item.href} onClick={() => setMobileOpen(false)} className="flex min-h-11 w-full items-center rounded-sm px-3 py-3 text-sm font-semibold text-[#171b24] transition-colors duration-200 hover:bg-[#FFE0CF] hover:text-[#FF6600]">{item.label}</Link>}</div>
                            <AnimatePresence>{item.hasDropdown && mobileSubmenu === item.label && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .3, ease: [.22, 1, .36, 1] }} className="grid grid-cols-1 gap-0 overflow-hidden pb-2 pl-4 sm:grid-cols-2">{item.subItems?.map((sub, index) => <motion.div key={`${sub.label}-${sub.href}`} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .2, delay: index * .018, ease: 'easeOut' }}><Link to={sub.href} onClick={() => setMobileOpen(false)} className={`block py-2.5 pr-3 text-[12px] transition-colors duration-200 hover:bg-[#FFE0CF] hover:text-[#FF6600] ${isSubItemActive(sub.href) ? 'font-semibold text-[#FF6600]' : 'text-black'}`}>{sub.label}</Link></motion.div>)}</motion.div>}</AnimatePresence>
                        </div>)}
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 border-t border-[#FF6600]/15 pt-3 xl:hidden">{utilityLinks.map(({ label, href, external }) => external ? <a key={label} href={href} target="_blank" rel="noreferrer" className="py-2 text-xs font-semibold text-[#FF6600]">{label}</a> : <Link key={label} to={href} onClick={() => setMobileOpen(false)} className="py-2 text-xs font-semibold text-[#FF6600]">{label}</Link>)}</div>
                        <Link to="/admissions/admission-procedure" onClick={() => setMobileOpen(false)} className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 bg-[#FF6600] text-sm font-bold text-white transition-colors hover:bg-[#FF6600]/90 sm:hidden">Apply to SRIT <ArrowRight className="h-4 w-4" /></Link>
                    </nav>
                </motion.div>
            </>}
        </AnimatePresence>
    </header>;
};

export default Navbar;
