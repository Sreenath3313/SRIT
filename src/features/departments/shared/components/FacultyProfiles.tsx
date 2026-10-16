import React, { useState } from 'react';
import { GraduationCap, Calendar, Users, ArrowRight } from 'lucide-react';
import type { FacultyMember } from '../../index';

interface FacultyProfilesProps {
    faculty: FacultyMember[];
    title?: string;
    subtitle?: string;
    variant?: 'default' | 'csm' | 'cse';
}

const avatarPlaceholder = (name: string) => {
    // Filter out title tokens (Dr., Mr., Mrs., Ms., Prof.) and single-character initials with dots
    const cleanTokens = name
        .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s*/i, '')
        .split(' ')
        .filter((n) => n.length > 1 && !n.endsWith('.'));

    const initials = cleanTokens
        .slice(0, 2)
        .map((n) => n[0])
        .join('');

    return initials || name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s*/i, '').slice(0, 2).toUpperCase();
};

const validProfileUrl = (value?: string) => {
    if (!value) return undefined;
    try {
        const url = new URL(value);
        return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : undefined;
    } catch {
        return undefined;
    }
};

const socialPlatform = (value?: string) => {
    const href = validProfileUrl(value);
    if (!href) return undefined;
    const hostname = new URL(href).hostname.toLowerCase();
    if (hostname === 'orcid.org' || hostname.endsWith('.orcid.org')) return { label: 'ORCID', mark: 'iD', color: 'bg-[#A6CE39] text-white' };
    if (hostname === 'linkedin.com' || hostname.endsWith('.linkedin.com')) return { label: 'LinkedIn', mark: 'in', color: 'bg-[#0A66C2] text-white' };
    if (hostname.startsWith('scholar.google.')) return { label: 'Google Scholar', mark: 'G', color: 'bg-[#4285F4] text-white' };
    if (hostname === 'vidwan.inflibnet.ac.in' || hostname.endsWith('.vidwan.inflibnet.ac.in')) return { label: 'Vidwan', mark: 'V', color: 'bg-[#315A9A] text-white' };
    return undefined;
};

const SocialProfileLink: React.FC<{ url?: string }> = ({ url }) => {
    const platform = socialPlatform(url);
    const href = validProfileUrl(url);
    if (!platform || !href) return null;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${platform.label} profile`}
            title={platform.label}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-xs font-extrabold shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5422] focus-visible:ring-offset-2 ${platform.color}`}
        >
            {platform.mark}
        </a>
    );
};

const ProfileLink: React.FC<{ url?: string }> = ({ url }) => {
    const href = validProfileUrl(url);
    if (!href) return null;
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#FF5422] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#E04515] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5422] focus-visible:ring-offset-2"
        >
            <span>View Profile</span>
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
        </a>
    );
};

export const FacultyProfiles: React.FC<FacultyProfilesProps> = ({
    faculty,
    subtitle = 'Meet our experienced and dedicated faculty members who drive academic excellence in Artificial Intelligence and Machine Learning.',
    variant = 'default',
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Categorization logic for filter pills
    const getCategory = (designation: string) => {
        const lower = designation.toLowerCase();
        if (lower.includes('associate')) return 'Associate Professor';
        if (lower.includes('assistant')) return 'Assistant Professor';
        if (lower.includes('professor')) return 'Professor';
        return 'Other';
    };

    const categories = [
        { label: 'All', count: faculty.length },
        { label: 'Professor', count: faculty.filter((f) => getCategory(f.designation) === 'Professor').length },
        { label: 'Associate Professor', count: faculty.filter((f) => getCategory(f.designation) === 'Associate Professor').length },
        { label: 'Assistant Professor', count: faculty.filter((f) => getCategory(f.designation) === 'Assistant Professor').length },
    ].filter((cat) => cat.label === 'All' || cat.count > 0);

    const filteredFaculty = selectedCategory === 'All'
        ? faculty
        : faculty.filter((f) => getCategory(f.designation) === selectedCategory);

    return (
        <div className="w-full space-y-10">
            {/* Header Area */}
            <div className="text-center max-w-3xl mx-auto pt-2">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#FF5422] mb-2">
                    OUR TEAM
                </span>
                
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
                    Faculty <span className="text-[#FF5422]">Profiles</span>
                </h2>

                <div className="w-12 h-1 bg-[#FF5422] rounded-full mx-auto mt-3 mb-4" />

                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto px-4">
                    {subtitle}
                </p>

                {/* Filter Pills / Categories */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-7">
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat.label;
                        return (
                            <button
                                key={cat.label}
                                type="button"
                                onClick={() => setSelectedCategory(cat.label)}
                                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                    isActive
                                        ? 'bg-[#FF5422] text-white shadow-md shadow-[#FF5422]/25 scale-105'
                                        : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 hover:text-neutral-900'
                                }`}
                            >
                                {cat.label} ({cat.count})
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Responsive Faculty Grid */}
            <div className={`grid gap-5 sm:gap-6 lg:gap-6 mx-auto ${
                variant === 'cse' || variant === 'csm'
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1360px]'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1240px]'
            }`}>
                {filteredFaculty.map((member, index) => {
                    // CSE & CSM Variant: Full photo squared cards with bottom black gradient mask, orange accent bar, serif faculty name, designation, and profile links
                    if (variant === 'cse' || variant === 'csm') {
                        // Four standard academic profile links matching reference design
                        const socialItems = [
                            {
                                label: 'ORCID',
                                href: member.profileUrl && member.profileUrl.includes('orcid.org') ? member.profileUrl : (member.profileUrl || undefined),
                                icon: (
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A6CE39] text-white text-[13px] font-extrabold tracking-tight shadow-sm transition-transform duration-200 group-hover/icon:scale-110">
                                        iD
                                    </span>
                                ),
                            },
                            {
                                label: 'LinkedIn',
                                href: member.profileUrl && member.profileUrl.includes('linkedin.com') ? member.profileUrl : (member.profileUrl || undefined),
                                icon: (
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A66C2] text-white text-[13px] font-bold tracking-tight shadow-sm transition-transform duration-200 group-hover/icon:scale-110">
                                        in
                                    </span>
                                ),
                            },
                            {
                                label: 'Vidwan',
                                href: member.profileUrl && member.profileUrl.includes('vidwan') ? member.profileUrl : (member.profileUrl || undefined),
                                icon: (
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#315A9A] text-white text-[13px] font-bold shadow-sm transition-transform duration-200 group-hover/icon:scale-110">
                                        V
                                    </span>
                                ),
                            },
                            {
                                label: 'Google Scholar',
                                href: member.profileUrl && member.profileUrl.includes('scholar.google') ? member.profileUrl : (member.profileUrl || undefined),
                                icon: (
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[14px] font-bold shadow-sm transition-transform duration-200 group-hover/icon:scale-110">
                                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                        </svg>
                                    </span>
                                ),
                            },
                        ];

                        return (
                            <div
                                key={index}
                                className="group relative aspect-[2/3] w-full overflow-hidden rounded-none bg-neutral-900 shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.25)]"
                            >
                                {/* Full Photo / Studio Backdrop */}
                                {member.image ? (
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-b from-[#6b7d91] via-[#516375] to-[#34404d] text-white">
                                        {/* Monogram Circle */}
                                        <div className="flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm shadow-inner transition-transform duration-300 group-hover:scale-105">
                                            <span className="font-sans text-2xl sm:text-3xl font-extrabold tracking-wider text-white">
                                                {avatarPlaceholder(member.name)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Bottom Dark Gradient Mask with half opacity at transition */}
                                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/75 to-transparent px-3.5 pb-3.5 pt-16 sm:px-4 sm:pb-4 transition-all duration-300">
                                    {/* Orange accent line */}
                                    <div className="mb-1.5 h-[3px] w-8 rounded-full bg-[#FF5422]" />

                                    {/* Faculty Name in Serif typography */}
                                    <h3 className="font-serif text-sm sm:text-base lg:text-[17px] font-bold text-white tracking-wide leading-snug drop-shadow-md">
                                        {member.name}
                                    </h3>

                                    {/* Designation */}
                                    <p className="mt-0.5 text-[11px] sm:text-xs text-neutral-300 font-normal leading-tight tracking-normal">
                                        {member.designation}
                                    </p>

                                    {/* Academic Profiles Icons Bar */}
                                    <div className="mt-3 flex items-center justify-between gap-1 pt-1 border-t border-white/10">
                                        {socialItems.map((item, idx) => {
                                            const content = (
                                                <div className="group/icon flex flex-col items-center gap-0.5">
                                                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-white/[0.08] backdrop-blur-sm border border-white/10 transition-all duration-200 hover:bg-white/[0.18] hover:border-white/25">
                                                        {item.icon}
                                                    </div>
                                                    <span className="text-[9px] sm:text-[10px] text-neutral-300/90 tracking-tight transition-colors group-hover/icon:text-white">
                                                        {item.label}
                                                    </span>
                                                </div>
                                            );

                                            if (item.href) {
                                                return (
                                                    <a
                                                        key={idx}
                                                        href={item.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title={`${member.name} on ${item.label}`}
                                                        className="focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5422] rounded-xl"
                                                    >
                                                        {content}
                                                    </a>
                                                );
                                            }

                                            return (
                                                <div key={idx} className="cursor-default" title={item.label}>
                                                    {content}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    // Default Card Variant for other departments
                    return (
                        <div
                            key={index}
                            className="group relative flex h-full min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-neutral-200/80 bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FF5422]/40 hover:shadow-[0_16px_36px_rgba(255,84,34,0.12)] sm:p-6 lg:p-7"
                        >
                            {/* Subtle Top Accent */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF5422]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div>
                                {/* Faculty Image / Avatar */}
                                <div className="relative mx-auto mb-4 flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-neutral-100 bg-neutral-50 shadow-sm transition-transform duration-300 group-hover:scale-[1.03] sm:h-36 sm:w-36">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-center"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xl sm:text-2xl font-serif font-bold text-[#FF5422] bg-[#FDEEE9]">
                                            {avatarPlaceholder(member.name)}
                                        </div>
                                    )}
                                </div>

                                {/* Faculty Name */}
                                <h3 className="font-serif text-lg sm:text-[19px] font-bold text-neutral-900 group-hover:text-[#FF5422] transition-colors leading-snug text-center mb-1 min-h-[48px] flex items-center justify-center">
                                    {member.name}
                                </h3>

                                {/* Designation */}
                                <p className="text-[#FF5422] font-semibold text-sm sm:text-[14.5px] text-center mb-5">
                                    {member.designation}
                                </p>

                                {/* Faculty Information List */}
                                <div className="space-y-3 border-t border-neutral-100/90 pt-4 text-xs text-neutral-700 sm:text-[13.5px]">
                                    {/* Qualification */}
                                    <div className="flex items-center gap-3">
                                        <GraduationCap className="w-4 h-4 text-neutral-600 shrink-0" strokeWidth={2.2} />
                                        <span className="font-medium text-neutral-800">{member.qualification}</span>
                                    </div>

                                    {/* Date of Joining */}
                                    {member.joiningDate && (
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-4 h-4 text-neutral-600 shrink-0" strokeWidth={2.2} />
                                            <span className="font-medium text-neutral-800">{member.joiningDate}</span>
                                        </div>
                                    )}

                                    {/* Nature of Association */}
                                    {member.association && <div className="flex items-center gap-3">
                                        <Users className="w-4 h-4 text-neutral-600 shrink-0" strokeWidth={2.2} />
                                        <span className="font-medium text-neutral-800">{member.association}</span>
                                    </div>}
                                    <div className="flex items-center gap-2 pt-1">
                                        <SocialProfileLink url={member.profileUrl} />
                                    </div>
                                </div>
                            </div>

                            {/* View Profile Button */}
                            <div className="mt-6 pt-2">
                                <ProfileLink url={member.profileUrl} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FacultyProfiles;
