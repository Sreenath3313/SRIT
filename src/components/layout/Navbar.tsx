import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, GraduationCap, Search, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks, type NavLink } from '../../data/navigation';
import { placementStats } from '../../data/placements';

const researchLink: NavLink = {
    label: 'Research',
    href: '/committees/research-and-consultancy-cell',
    hasDropdown: false,
};

const desktopLinks: NavLink[] = [
    navLinks[1], navLinks[3], navLinks[2], navLinks[4], navLinks[7], researchLink,
];

const mainNavLabels = new Set(desktopLinks.map(({ label }) => label));
const menuLinks = navLinks.filter((item) => item.href !== '/' && !mainNavLabels.has(item.label));

const placementTickerText = placementStats.map((stat) => `${stat.value} ${stat.label} · ${stat.subtext}`).join('   ·   ');

// Authentic FontAwesome-style icons matching the exact original reference (with responsive/custom sizing)
const PhoneIcon = ({ className = "h-4 w-4 fill-black text-black shrink-0" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor">
        <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
    </svg>
);

const MailIcon = ({ className = "h-4 w-4 fill-black text-black shrink-0" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor">
        <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
    </svg>
);

// Faculty Login: Person standing in front of screen/presentation board (chalkboard-teacher / user-presentation)
const FacultyLoginIcon = ({ className = "h-4 w-4 fill-black text-black shrink-0" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 640 512" fill="currentColor">
        <path d="M208 352c-2.6 0-5.2 .2-7.8 .7C189.6 331 165.7 320 139.1 320H69c-38.1 0-69 30.9-69 69v27c0 17.7 14.3 32 32 32H208c17.7 0 32-14.3 32-32V384c0-17.7-14.3-32-32-32zm-104-64A64 64 0 1 0 40 224a64 64 0 0 0 64 64zm432-192H240c-26.5 0-48 21.5-48 48v80.8c15.2 6.5 28.7 16.5 39.2 29.2H528c8.8 0 16 7.2 16 16v160c0 8.8-7.2 16-16 16H306.9c7.3 10.3 12.3 22.3 14.1 35.3c.7 4.8 1 9.8 1 14.7c0 7.8-.8 15.3-2.3 22.7l.3-.7H592c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48z" />
    </svg>
);

// Classic user-graduate icon
const UserGraduateIcon = ({ className = "h-4 w-4 fill-black text-black shrink-0" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 448 512" fill="currentColor">
        <path d="M224 256A128 128 0 1 0 96 128a128 128 0 0 0 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4zM224 0L10.3 75.8a16 16 0 0 0 0 30.4L224 182l213.7-75.8a16 16 0 0 0 0-30.4L224 0zM32 144v72c0 8.8 7.2 16 16 16s16-7.2 16-16v-60.6l-32-11.4z" />
    </svg>
);

// Solid Font Awesome-style utility icons from the reference navbar.
const DegreeVerificationIcon = ({ className = "h-4 w-4 fill-black text-black shrink-0" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 640 512" fill="currentColor" aria-hidden="true">
        <path d="M622.3 153.2 343.4 51.5a64 64 0 0 0-43.8 0L20.7 153.2c-27.6 10.1-27.6 49.5 0 59.6l52.8 19.3c-11.9 20.9-20.2 44.5-23.8 69.7A32 32 0 0 0 32 329.1V416l-28.8 57.6A24 24 0 0 0 24.7 512h78.6a24 24 0 0 0 21.5-38.4L96 416v-86.9a32 32 0 0 0-15.8-27.3c3.2-19.6 10.3-38.3 20.6-54.5L299.6 325a64 64 0 0 0 43.8 0l278.9-101.7c23.6-8.6 23.6-51.5 0-70.1zM320 384c-19.2 0-38.4-3.3-56.4-9.9l-135.3-49.4L112 456c0 30.9 93.1 56 208 56s208-25.1 208-56l-16.3-131.3-135.3 49.4A168 168 0 0 1 320 384z" />
    </svg>
);

const UsersIcon = ({ className = "h-4 w-4 fill-black text-black shrink-0" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 640 512" fill="currentColor" aria-hidden="true">
        <path d="M96 224a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm448 0a64 64 0 1 0 0-128 64 64 0 0 0 0 128zM0 416v-32c0-53 43-96 96-96h32c53 0 96 43 96 96v32c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm416 0v-32c0-53 43-96 96-96h32c53 0 96 43 96 96v32c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32zM224 192a96 96 0 1 1 192 0 96 96 0 0 1-192 0zm-32 224v-32c0-70.7 57.3-128 128-128s128 57.3 128 128v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32z" />
    </svg>
);

const AddressCardIcon = ({ className = "h-4 w-4 fill-black text-black shrink-0" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 576 512" fill="currentColor" aria-hidden="true">
        <path d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM192 160a64 64 0 1 1 0 128 64 64 0 0 1 0-128zm128 224c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-16c0-35.3 28.7-64 64-64h8.5a96 96 0 0 0 111 0h8.5c35.3 0 64 28.7 64 64v16zm192-16c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16v-16c0-8.8 7.2-16 16-16h128c8.8 0 16 7.2 16 16v16zm0-96c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16v-16c0-8.8 7.2-16 16-16h128c8.8 0 16 7.2 16 16v16zm0-96c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16v-16c0-8.8 7.2-16 16-16h128c8.8 0 16 7.2 16 16v16z" />
    </svg>
);

const DownloadIcon = ({ className = "h-4 w-4 fill-black text-black shrink-0" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
        <path d="M216 0h80c13.3 0 24 10.7 24 24v168h72c21.4 0 32.1 25.9 17 41L273 369c-9.4 9.4-24.6 9.4-33.9 0L103 233c-15.1-15.1-4.4-41 17-41h72V24c0-13.3 10.7-24 24-24zM24 336h112l48 48H48v48h416v-48h-72l48-48h48c13.3 0 24 10.7 24 24v96c0 30.9-25.1 56-56 56H56c-30.9 0-56-25.1-56-56v-96c0-13.3 10.7-24 24-24z" />
    </svg>
);

const utilityLinks = [
    { label: 'Faculty Login', href: 'https://webprosindia.com/srit/default.aspx?ReturnUrl=%2fsrit%2f', external: true, icon: FacultyLoginIcon, fillIcon: true },
    { label: 'Student Login', href: 'https://webprosindia.com/srit/default.aspx?ReturnUrl=%2fsrit%2f', external: true, icon: UserGraduateIcon, fillIcon: true },
    { label: 'Degree Verification', href: '/degree-verification', icon: DegreeVerificationIcon, fillIcon: true },
    { label: 'Alumni', href: 'https://alumni.srit.ac.in/', external: true, icon: UsersIcon, fillIcon: true },
    { label: 'EAPCET/ECET Ranks', href: '/previousranks', icon: UsersIcon, fillIcon: true },
    { label: 'Downloads', href: '/downloads', icon: DownloadIcon, fillIcon: true },
    { label: 'Contact Us', href: '/contact-us', icon: AddressCardIcon, fillIcon: true },
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
    showShadow?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showPlacementTicker = true, showShadow = true }) => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState('');
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const headerRef = useRef<HTMLElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        setOpenMenu(null);
        setMobileOpen(false);
        setMobileSubmenu(null);
        setSearchOpen(false);
    }, [location.pathname]);

    useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        const updateNavbarHeight = () => {
            // `getBoundingClientRect()` is affected by the site's html zoom and
            // would apply that scale twice when this value is reused in CSS.
            document.documentElement.style.setProperty('--site-navbar-height', `${header.offsetHeight}px`);
        };
        updateNavbarHeight();
        const observer = new ResizeObserver(updateNavbarHeight);
        observer.observe(header);
        return () => observer.disconnect();
    }, []);

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

    return <header ref={headerRef} className={`fixed inset-x-0 top-0 z-[100] bg-white ${showShadow ? 'shadow-[0_10px_32px_rgba(255,102,0,.12)]' : 'shadow-none'}`}>
        <div className="bg-[#ff6600] text-white">
            <div className="flex w-full flex-col items-stretch gap-1 px-3 py-1.5 text-white sm:px-5 md:px-6 lg:px-8 min-[960px]:min-h-[38px] min-[960px]:flex-row min-[960px]:items-center min-[960px]:justify-between min-[960px]:gap-2 min-[960px]:py-0">
                <div aria-label="Contact information" className="flex min-h-7 flex-wrap items-center justify-center text-[11px] font-semibold sm:text-[12px] md:justify-start min-[960px]:shrink-0 min-[960px]:text-[11.5px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]">
                    <a href="tel:+919515611111" className="inline-flex items-center gap-1.5 whitespace-nowrap border-r border-white/80 px-2 py-1 text-white transition-opacity hover:opacity-85 sm:px-3 min-[960px]:px-2 xl:px-3">
                        <PhoneIcon className="h-3.5 w-3.5 fill-black text-black shrink-0 xl:h-4 xl:w-4" />
                        <span>91-951 561 1111</span>
                    </a>
                    <a href="mailto:hr@srit.ac.in" className="inline-flex items-center gap-1.5 whitespace-nowrap px-2 py-1 text-white transition-opacity hover:opacity-85 sm:px-3 min-[960px]:px-2 xl:px-3">
                        <MailIcon className="h-3.5 w-3.5 fill-black text-black shrink-0 xl:h-4 xl:w-4" />
                        <span>hr@srit.ac.in</span>
                    </a>
                </div>
                <nav aria-label="Contact and quick links" className="grid w-full grid-cols-2 text-[10px] font-semibold min-[360px]:grid-cols-3 sm:grid-cols-4 sm:text-[11px] min-[960px]:flex min-[960px]:w-auto min-[960px]:flex-1 min-[960px]:items-center min-[960px]:justify-end min-[960px]:text-[10px] lg:text-[10.5px] xl:text-[11.5px] 2xl:text-[12px]">
                    {utilityLinks.map(({ label, href, external, icon: Icon, fillIcon }) => {
                        const itemClass = 'inline-flex min-h-8 min-w-0 items-center justify-center gap-1 border-t border-white/35 px-1 py-1 text-center leading-tight text-white transition-colors hover:bg-black/10 hover:opacity-90 sm:px-2 min-[960px]:min-h-0 min-[960px]:whitespace-nowrap min-[960px]:border-l min-[960px]:border-t-0 min-[960px]:border-white/80 min-[960px]:px-1.5 lg:px-2 2xl:px-2.5 min-[960px]:py-1';
                        const content = <><Icon className={`h-3.5 w-3.5 shrink-0 text-black xl:h-4 xl:w-4 ${fillIcon ? 'fill-black' : ''}`} /><span className="min-w-0">{label}</span></>;
                        return external
                            ? <a key={label} href={href} target="_blank" rel="noreferrer" className={itemClass}>{content}</a>
                            : <Link key={label} to={href} className={itemClass}>{content}</Link>;
                    })}
                </nav>
            </div>
        </div>

        <div className="relative border-t-4 border-[#FF6600] bg-white" onMouseLeave={onMenuLeave}>
            <div className="flex h-[80px] w-full items-center justify-between gap-3 px-3 sm:gap-5 sm:px-5 md:px-6 lg:h-[96px] lg:px-8 xl:h-[100px]">
                <Link to="/" aria-label="SRIT home" className="flex min-w-0 shrink-0 items-center py-1">
                    <img src="/optimized/SRIT_logo_HD_8x.png" alt="Srinivasa Ramanujan Institute of Technology — Autonomous, NBA, NAAC A Grade" width="10240" height="1920" fetchPriority="high" className="h-[56px] w-auto max-w-[65vw] shrink-0 object-contain sm:h-[66px] sm:max-w-[55vw] lg:h-[78px] xl:h-[84px] 2xl:h-[88px] lg:max-w-none transition-transform duration-200" />
                </Link>

                <nav aria-label="Primary navigation" className="ml-auto hidden h-full items-center gap-0.5 lg:flex">
                    {desktopLinks.map((item) => <div key={item.label} className="relative flex h-full items-center" onMouseEnter={() => { setMobileOpen(false); setMobileSubmenu(null); onMenuEnter(item.label); }}>
                        <Link to={item.href} onFocus={() => onMenuEnter(item.label)} className={`relative inline-flex h-full items-center gap-0.5 px-1 text-[13px] font-bold whitespace-nowrap transition-colors duration-200 ease-out hover:text-[#FF6600] lg:px-1.5 lg:text-[14px] xl:px-2 xl:text-[15px] 2xl:px-3 2xl:text-[17px] ${isActive(item) || openMenu === item.label ? 'text-[#FF6600]' : 'text-[#171b24]'}`}>
                            {item.label}{item.hasDropdown && <ChevronDown className={`h-3 w-3 transition-transform duration-300 ease-out ${openMenu === item.label ? 'rotate-180' : ''}`} />}
                            <span className={`absolute inset-x-1 bottom-4 h-[2px] origin-center bg-[#FF6600] transition-transform duration-300 ease-out ${isActive(item) || openMenu === item.label ? 'scale-x-100' : 'scale-x-0'}`} />
                        </Link>
                    </div>)}
                </nav>

                <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:ml-4 xl:ml-6">
                    <button type="button" onClick={() => { setSearchOpen((open) => !open); setOpenMenu(null); }} aria-label={searchOpen ? 'Close search' : 'Search this site'} aria-expanded={searchOpen} className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center text-black transition-colors hover:text-[#FF6600]"><Search className="h-4.5 w-4.5 sm:h-5 sm:w-5" /></button>
                    <button type="button" onClick={() => { setMobileOpen((open) => !open); setSearchOpen(false); setOpenMenu(null); }} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-controls="site-navigation-drawer" aria-expanded={mobileOpen} className="group inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center text-[#171b24] transition-colors hover:text-[#FF6600]">
                        <span className="flex w-6 sm:w-6.5 flex-col gap-[5px] sm:gap-[6px]" aria-hidden="true">
                            <span className={`h-[2px] w-full rounded-full bg-current transition-all duration-300 ease-out ${mobileOpen ? 'translate-y-[7px] sm:translate-y-[8px] rotate-45' : ''}`} />
                            <span className={`h-[2px] w-full rounded-full bg-current transition-all duration-300 ease-out ${mobileOpen ? 'scale-x-0 opacity-0' : ''}`} />
                            <span className={`h-[2px] w-full rounded-full bg-current transition-all duration-300 ease-out ${mobileOpen ? '-translate-y-[7px] sm:-translate-y-[8px] -rotate-45' : ''}`} />
                        </span>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {activeMenu?.hasDropdown && megaLinks.length > 0 && <motion.div key={activeMenu.label} initial={{ opacity: 0, y: -12, scaleY: .985 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -8, scaleY: .99 }} transition={{ duration: .28, ease: [.22, 1, .36, 1] }} style={{ transformOrigin: 'top' }} onMouseEnter={() => onMenuEnter(activeMenu.label)} onMouseLeave={onMenuLeave} className="absolute left-0 right-0 top-full z-50 max-h-[calc(100dvh-150px)] overflow-y-auto border-t border-[#FF6600]/10 bg-[#fffdfa] shadow-[0_24px_44px_rgba(255,102,0,.14)]">
                    <div className="w-full px-5 py-6 sm:px-8 sm:py-8 2xl:px-12">
                        <div className="mb-5 flex items-end justify-between border-b border-[#FF6600]/15 pb-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#FF6600]">Explore SRIT</p><h2 className="mt-1 font-serif text-2xl font-semibold text-black">{activeMenu.label}</h2></div><Link to={activeMenu.href} className="inline-flex items-center gap-2 text-xs font-bold text-black hover:text-[#FF6600]">View section <ArrowRight className="h-3.5 w-3.5" /></Link></div>
                        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: .025, delayChildren: .035 } } }} initial="hidden" animate="visible" className={`grid gap-x-6 gap-y-1 ${megaLinks.length > 7 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                            {megaLinks.map((item, index) => <motion.div key={`${item.label}-${item.href}-${index}`} variants={{ hidden: { opacity: 0, y: 7 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: .22, ease: [.22, 1, .36, 1] }}><Link to={item.href} className={`group flex min-h-10 items-center justify-between gap-3 border-b border-[#eadfd6] px-3 py-2 text-base leading-6 font-medium tracking-[.005em] transition-colors duration-200 hover:border-[#ff9a64] hover:bg-[#fff1e8] hover:text-[#d94b12] ${isSubItemActive(item.href) ? 'border-[#ff9a64] bg-[#fff1e8] text-[#d94b12]' : 'text-[#29313d]'}`}><span>{item.label}</span><ArrowRight className={`h-3.5 w-3.5 shrink-0 -translate-x-1 transition-all duration-200 ease-out ${isSubItemActive(item.href) ? 'translate-x-0 opacity-100 text-[#d94b12]' : 'opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} /></Link></motion.div>)}
                        </motion.div>
                    </div>
                </motion.div>}
            </AnimatePresence>
        </div>

        {showPlacementTicker && <div className="overflow-hidden bg-[#FF6600] text-white shadow-xs">
            <div className="flex h-[42px] sm:h-[44px] w-full items-center overflow-hidden px-3 sm:px-5 md:px-6 lg:px-8">
                <Link to="/placements/about-t-and-p" className="z-10 inline-flex shrink-0 items-center gap-2 bg-[#FF6600] pr-4 text-[13px] sm:text-[14px] md:text-[15px] font-black uppercase tracking-[.18em] drop-shadow-xs">
                    <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />Placements @ SRIT
                </Link>
                <div className="relative min-w-0 flex-1 overflow-hidden border-l-2 border-white/40 pl-4" aria-label="Placement highlights">
                    <div className="animate-marquee flex min-w-max items-center gap-10 whitespace-nowrap text-[13px] sm:text-[14px] md:text-[15px] font-extrabold tracking-wide">
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
                            {(typeof window !== 'undefined' && window.innerWidth >= 1024 ? menuLinks : navLinks.filter(item => item.href !== '/')).map((item) => <div key={item.label} className={`border-b border-[#FF6600]/15 py-1 ${mobileSubmenu === item.label ? 'xl:col-span-4' : ''}`}>
                                <div className="flex min-h-12 items-center justify-between">{item.hasDropdown ? <button type="button" aria-expanded={mobileSubmenu === item.label} onClick={() => setMobileSubmenu((open) => open === item.label ? null : item.label)} className={`flex min-h-11 w-full items-center justify-between rounded-sm px-3 py-3 text-left text-sm font-semibold transition-colors duration-200 hover:bg-[#FFE0CF] hover:text-[#FF6600] ${mobileSubmenu === item.label ? 'bg-[#FFF1E8] text-[#FF6600]' : 'text-[#171b24]'}`}><span>{item.label}</span><ChevronDown className={`h-4 w-4 text-[#FF6600] transition-transform ${mobileSubmenu === item.label ? 'rotate-180' : ''}`} /></button> : <Link to={item.href} onClick={() => setMobileOpen(false)} className="flex min-h-11 w-full items-center rounded-sm px-3 py-3 text-sm font-semibold text-[#171b24] transition-colors duration-200 hover:bg-[#FFE0CF] hover:text-[#FF6600]">{item.label}</Link>}</div>
                                <AnimatePresence>{item.hasDropdown && mobileSubmenu === item.label && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .3, ease: [.22, 1, .36, 1] }} className="grid grid-cols-1 gap-x-5 gap-y-1 overflow-hidden pb-3 pl-4 sm:grid-cols-2 xl:grid-cols-3">{item.subItems?.map((sub, index) => <motion.div key={`${sub.label}-${sub.href}`} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .2, delay: index * .018, ease: 'easeOut' }}><Link to={sub.href} onClick={() => setMobileOpen(false)} className={`flex min-h-12 items-center border-b border-[#FF6600]/10 px-3 py-3 text-base leading-6 transition-colors duration-200 hover:bg-[#FFE0CF] hover:text-[#FF6600] ${isSubItemActive(sub.href) ? 'font-semibold text-[#FF6600]' : 'text-black'}`}>{sub.label}</Link></motion.div>)}</motion.div>}</AnimatePresence>
                            </div>)}
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 border-t border-[#FF6600]/15 pt-3 lg:hidden">{utilityLinks.map(({ label, href, external }) => external ? <a key={label} href={href} target="_blank" rel="noreferrer" className="py-2 text-xs font-semibold text-[#FF6600]">{label}</a> : <Link key={label} to={href} onClick={() => setMobileOpen(false)} className="py-2 text-xs font-semibold text-[#FF6600]">{label}</Link>)}</div>
                        <Link to="/admissions/admission-procedure" onClick={() => setMobileOpen(false)} className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 bg-[#FF6600] text-sm font-bold text-white transition-colors hover:bg-[#FF6600]/90 sm:hidden">Apply to SRIT <ArrowRight className="h-4 w-4" /></Link>
                    </nav>
                </motion.div>
            </>}
        </AnimatePresence>
    </header>;
};

export default Navbar;
