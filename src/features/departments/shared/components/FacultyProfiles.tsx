import React, { useState } from 'react';
import { GraduationCap, Calendar, Users, ArrowRight } from 'lucide-react';
import type { FacultyMember } from '../../index';

interface FacultyProfilesProps {
    faculty: FacultyMember[];
    title?: string;
    subtitle?: string;
    variant?: 'default' | 'csm';
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

            {/* Responsive Faculty Grid - Spacious and High-Definition 3-Column Grid */}
            <div className={`grid gap-7 sm:gap-8 lg:gap-9 mx-auto ${
                variant === 'csm'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1240px]'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1240px]'
            }`}>
                {filteredFaculty.map((member, index) => {
                    if (variant === 'csm') {
                        return (
                            <div
                                key={index}
                                className="group flex h-full min-h-[440px] min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-[0_8px_28px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,84,34,0.16)] sm:min-h-[480px]"
                            >
                                {/* Perfectly Circular Photo Container */}
                                <div className="relative z-10 mx-auto mt-5 flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-neutral-50 shadow-md transition-transform duration-300 group-hover:scale-[1.03] sm:mt-6 sm:h-40 sm:w-40">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-center"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 via-orange-50/40 to-neutral-200 text-[#FF5422]">
                                            <div className="w-full h-full rounded-full flex items-center justify-center text-3xl font-serif font-bold text-[#FF5422]">
                                                {avatarPlaceholder(member.name)}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content Details */}
                                    <div className="flex flex-1 flex-col justify-between overflow-hidden px-4 pb-4 pt-5 text-center sm:px-6">
                                    <div>
                                        {/* Faculty Name */}
                                        <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-neutral-900 group-hover:text-[#FF5422] transition-colors leading-snug mb-1 min-h-[46px] flex items-center justify-center">
                                            {member.name}
                                        </h3>

                                        {/* Designation */}
                                        <p className="text-[#FF5422] font-semibold text-sm sm:text-[14.5px] text-center mb-3.5 leading-tight tracking-wide">
                                            {member.designation}
                                        </p>
                                    </div>

                                    {/* Information List */}
                                        <div className="mx-auto w-full space-y-2.5 px-1 pb-1 text-left text-xs text-neutral-700 sm:px-2 sm:text-[13.5px]">
                                        {/* Qualification */}
                                        <div className="flex items-center gap-3">
                                            <GraduationCap className="w-4 h-4 text-neutral-600 shrink-0" strokeWidth={2.2} />
                                            <span className="font-medium text-neutral-800 truncate" title={member.qualification}>{member.qualification}</span>
                                        </div>

                                        {/* Date of Joining */}
                                        {member.joiningDate && <div className="flex items-center gap-3">
                                            <Calendar className="h-4 w-4 shrink-0 text-neutral-600" strokeWidth={2.2} />
                                            <span className="font-medium text-neutral-800">{member.joiningDate}</span>
                                        </div>}

                                        {/* Association / Employment Status */}
                                        {member.association && <div className="flex items-center gap-3">
                                            <Users className="w-4 h-4 text-neutral-600 shrink-0" strokeWidth={2.2} />
                                            <span className="font-medium text-neutral-800">{member.association}</span>
                                        </div>}
                                        <div className="flex items-center gap-2 pt-1">
                                            <SocialProfileLink url={member.profileUrl} />
                                        </div>
                                    </div>
                                </div>

                                {/* Full-Width Bottom Action Button */}
                                <div className="w-full shrink-0">
                                    <ProfileLink url={member.profileUrl} />
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
