import { Link } from 'react-router-dom';
import { GraduationCap, Instagram, Landmark, Mail, MapPin, Network, Phone, Send } from 'lucide-react';

interface FooterLink {
    label: string;
    href: string;
    external?: boolean;
}

const columns: Record<string, FooterLink[]> = {
    About: [
        { label: 'Overview', href: '/about/overview' },
        { label: 'Vision & Mission', href: '/about/vision-mission' },
        { label: 'Chairperson', href: '/about/chairperson' },
        { label: 'Principal', href: '/about/principal' },
    ],

    Academics: [
        { label: 'Courses Offered', href: '/admissions/courses-offered' },
        { label: 'Fee Structure', href: '/admissions/fee-structure' },
        { label: 'Scholarships', href: '/admissions/scholarships' },
        { label: 'Library', href: '/campus-life/library' },
        { label: 'NDLI Club', href: '/ndli-club' },
        { label: 'Women Empowerment Cell', href: '/women-empowerment-cell' },
    ],

    Departments: [
        { label: 'CSE', href: '/department/cse' },
        { label: 'CSE — AI & ML', href: '/department/csm' },
        { label: 'CSE — AI & DS', href: '/department/cad' },
        { label: 'ECE', href: '/department/ece' },
        { label: 'EEE', href: '/department/eee' },
        { label: 'Mechanical', href: '/department/mec' },
        { label: 'Civil', href: '/department/civil' },
    ],

    Connect: [
        { label: 'Admissions', href: '/admissions/admission-procedure' },
        { label: 'Contact Us', href: '/#contact' },
        { label: 'Previous Ranks', href: '/admissions/eamcet-ranks' },
    ],
};

const socialLinks = [
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/sritatp/',
        icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    },
    {
        label: 'Twitter',
        href: 'https://x.com/sritatp',
        icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/school/sritatp/',
        icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    { label: 'Instagram', href: 'https://www.instagram.com/sritatp/', icon: '' },
];

const footerIcons = { About: Landmark, Academics: GraduationCap, Departments: Network, Connect: Send };

const Footer: React.FC = () => (
    <footer className="relative isolate overflow-hidden bg-[#080C0E] text-white">
        {/* Compliance / Policy Links on top of footer */}
        <div className="border-t-2 border-[#FF5B18] border-b border-white/10 bg-[#060A0C] py-2 sm:py-2.5">
            <div className="section-container flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-x-6 gap-y-1.5 text-xs text-slate-300">
                <Link to="/privacy-policy" className="transition-colors hover:text-[#FF7A32] whitespace-nowrap">
                    Privacy Policy
                </Link>
                <span className="hidden sm:inline text-white/20 select-none">•</span>
                <Link to="/terms-and-conditions" className="transition-colors hover:text-[#FF7A32] whitespace-nowrap">
                    Terms &amp; Conditions
                </Link>
                <span className="hidden sm:inline text-white/20 select-none">•</span>
                <Link to="/refund-and-cancellation" className="transition-colors hover:text-[#FF7A32] whitespace-nowrap">
                    Refund &amp; Cancellation
                </Link>
                <span className="hidden sm:inline text-white/20 select-none">•</span>
                <Link to="/admissions/online-fee-payment" className="transition-colors hover:text-[#FF7A32] whitespace-nowrap">
                    Fee Payments
                </Link>
            </div>
        </div>

        <div className="relative z-10 section-container py-6 md:py-7">
            {/* Top Brand & Contact Row */}
            <div className="grid gap-4 border-b border-white/15 pb-4 md:gap-5 md:pb-5 lg:grid-cols-[1fr_auto_auto] lg:items-end lg:gap-8">
                <div>
                    <div className="mb-2 h-[2.5px] w-10 bg-[#FF5B18]" />
                    <Link to="/" className="block max-w-max text-base font-bold leading-tight tracking-tight transition-colors hover:text-[#FF7A32] sm:text-lg md:text-xl">
                        Srinivasa Ramanujan<br /><span className="text-[#FF6422]">Institute of Technology</span>
                    </Link>
                    <p className="mt-2 flex items-start sm:items-center gap-2 text-xs sm:text-[13px] text-slate-300">
                        <MapPin className="h-4 w-4 shrink-0 text-[#FF6422] mt-0.5 sm:mt-0" />
                        <span>Rotarypuram, Anantapur — 515701, Andhra Pradesh</span>
                    </p>
                </div>
                <div className="flex flex-col gap-2 text-xs text-slate-200 sm:flex-row sm:items-center sm:gap-6 sm:text-[13px]">
                    <a href="tel:9515611111" className="inline-flex items-center gap-2 transition-colors hover:text-[#FF7A32]">
                        <Phone className="h-4 w-4 shrink-0 text-[#FF6422]" />
                        <span>91-951 561 1111</span>
                    </a>
                    <span className="hidden h-4 w-px bg-white/20 sm:block" />
                    <a href="mailto:hr@srit.ac.in" className="inline-flex items-center gap-2 transition-colors hover:text-[#FF7A32]">
                        <Mail className="h-4 w-4 shrink-0 text-[#FF6422]" />
                        <span>hr@srit.ac.in</span>
                    </a>
                </div>
                <p className="hidden border-l border-white/20 pl-5 text-[10px] font-semibold uppercase leading-relaxed tracking-[.22em] text-slate-400 xl:block">
                    Learn<br />Innovate<br />Build<br />Belong
                </p>
            </div>

            {/* Main Links Grid - 2 cols on mobile, 4 cols on tablet & desktop */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-7 py-5 md:grid-cols-4 md:gap-0 md:py-6">
                {Object.entries(columns).map(([title, links], index) => {
                    const Icon = footerIcons[title as keyof typeof footerIcons];
                    return (
                        <div
                            key={title}
                            className={`flex flex-col md:px-5 lg:px-6 ${
                                index === 0
                                    ? 'md:pl-0'
                                    : 'md:border-l md:border-white/15'
                            }`}
                        >
                            <div className="flex items-center gap-2 sm:gap-2.5">
                                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center border border-[#FF6422]/25 bg-[#FF6422]/[0.06] text-[#FF6422]">
                                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.2} />
                                </div>
                                <p className="text-xs font-bold uppercase tracking-[.14em] text-slate-100 sm:tracking-[.15em]">{title}</p>
                            </div>
                            <div className="mb-2 mt-1.5 h-[2px] w-7 bg-[#FF5B18]" />
                            <ul className="space-y-1.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        {link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block text-xs sm:text-[13px] text-slate-300 transition-colors hover:text-[#FF7A32] leading-snug"
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link
                                                to={link.href}
                                                className="block text-xs sm:text-[13px] text-slate-300 transition-colors hover:text-[#FF7A32] leading-snug"
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Copyright & Social Strip */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-4 text-center sm:flex-row sm:text-left">
                <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-xs sm:justify-start sm:text-[13px]">
                    <span className="text-slate-400">© 2026 Copyright All Rights Reserved</span>
                    <span className="hidden sm:inline text-white/30">•</span>
                    <span
                        className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-[#FF6600] via-[#FF7A32] to-[#FF5500] text-white font-extrabold shadow-[0_0_15px_rgba(255,102,0,0.6)] border border-white/30 tracking-wide text-[11px] sm:text-xs uppercase cursor-default"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_#ffffff] animate-pulse shrink-0" />
                        <span>Designed by SDC Cell SRIT</span>
                    </span>
                </div>
                <div className="flex items-center justify-center gap-2 shrink-0">
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full border border-white/20 bg-[#080C0E]/50 text-slate-200 transition-colors hover:border-[#FF6422] hover:bg-[#FF6422] hover:text-white"
                            aria-label={social.label}
                        >
                            {social.label === 'Instagram' ? (
                                <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            ) : (
                                <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d={social.icon} />
                                </svg>
                            )}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
