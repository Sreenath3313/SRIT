import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AccordionWave from '../../../../components/common/AccordionWave';
import type { DepartmentData } from '../../index';

interface DepartmentCourseStructureProps {
    dept: DepartmentData;
}

/* ── Course Structure data per department ─────────────── */

interface CourseDocument {
    description: string;
    link: string;
}

interface CourseSection {
    key: string;
    title: string;
    subtitle?: string;
    documents: CourseDocument[];
}


/* Data moved to department data files */
/* ── Component ─────────────────────────────────────────── */

const DepartmentCourseStructure: React.FC<
    DepartmentCourseStructureProps
> = ({ dept }) => {
    const [openSection, setOpenSection] = useState<string | null>(
        'regulations'
    );

    const sections =
        dept.courses || [];

    const toggleSection = (key: string) => {
        setOpenSection((prev) =>
            prev === key ? null : key
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <span
                        className="w-8 h-[2px] rounded-full"
                        style={{ background: '#F85E00' }}
                    />

                    <span
                        className="text-xs font-bold tracking-[0.3em] uppercase"
                        style={{ color: '#FF5422' }}
                    >
                        {dept.code} · Academics
                    </span>

                    <span
                        className="w-8 h-[2px] rounded-full"
                        style={{ background: '#F85E00' }}
                    />
                </div>

                <h2
                    className="font-serif text-3xl lg:text-4xl font-bold"
                    style={{ color: '#0A0903' }}
                >
                    COURSE STRUCTURE
                </h2>
            </div>

            {/* Accordion Sections */}
            <div className={dept.slug === 'cse' ? 'space-y-0' : dept.slug === 'csm' || dept.slug === 'mec' ? 'space-y-3' : 'space-y-3'}>
                {(sections || []).map((section, index) => {
                    const isOpen =
                        openSection === section.key;
                    const number = String(index + 1).padStart(2, '0');

                    return (
                        <div
                            key={section.key}
                            className={`overflow-hidden transition-all duration-300 ${dept.slug === 'cse' ? 'rounded-none first:rounded-t-xl last:rounded-b-xl bg-[#fdf0e6]' : 'rounded-xl'} ${dept.slug === 'csm' ? 'rounded-xl bg-[#fff8f4]' : ''} ${dept.slug === 'mec' ? 'rounded-2xl bg-white' : ''}`}
                            style={{
                                border: dept.slug === 'cse'
                                    ? '1px solid rgba(255,120,50,0.18)'
                                    : dept.slug === 'csm' ? '1px solid rgba(255,140,80,0.24)'
                                    : dept.slug === 'mec' ? '1px solid #f6dfd0'
                                    : isOpen ? '1px solid rgba(255, 84, 34, 0.25)' : '1px solid rgba(10, 9, 3, 0.06)',
                                boxShadow: dept.slug === 'cse'
                                    ? '0 1px 4px rgba(0,0,0,0.06)'
                                    : dept.slug === 'csm' ? '0 2px 9px rgba(173,79,35,0.08)'
                                    : dept.slug === 'mec' ? '0 3px 12px rgba(161,91,48,0.06)'
                                    : isOpen ? '0 4px 20px rgba(255, 84, 34, 0.12)' : '0 1px 4px rgba(0,0,0,0.06)',
                            }}
                        >
                            {/* Accordion Header */}
                            <button
                                onClick={() =>
                                    toggleSection(section.key)
                                }
                                className={`group relative isolate w-full flex justify-between overflow-hidden transition-colors duration-300 ${dept.slug === 'cse' ? 'items-stretch gap-0 p-0 text-left' : dept.slug === 'mec' ? 'items-center gap-3 px-2.5 py-2 text-left sm:gap-5 sm:px-3' : 'items-center px-6 py-4 lg:px-8 lg:py-5'} ${dept.slug === 'csm' ? 'items-stretch gap-0 rounded-xl bg-[#fff8f4] p-0 text-left' : ''}`}
                                style={{
                                    background: dept.slug === 'cse' ? (isOpen ? 'rgba(255,120,50,0.08)' : 'transparent') : dept.slug === 'csm' ? (isOpen ? '#fff0e7' : '#fff8f4') : dept.slug === 'mec' ? (isOpen ? '#fffdfa' : '#ffffff') : '#0A0903',
                                }}
                                onMouseEnter={(e) => {
                                    if (!isOpen && dept.slug !== 'cse' && dept.slug !== 'csm' && dept.slug !== 'mec') {
                                        e.currentTarget.style.background =
                                            '#1a1812';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = dept.slug === 'cse' ? (isOpen ? 'rgba(255,120,50,0.08)' : 'transparent') : dept.slug === 'csm' ? (isOpen ? '#fff0e7' : '#fff8f4') : dept.slug === 'mec' ? (isOpen ? '#fffdfa' : '#ffffff') : '#0A0903';
                                }}
                            >
                                {dept.slug === 'csm' && <>
                                    <span className="relative z-10 flex min-h-[58px] w-[58px] shrink-0 items-center justify-center bg-gradient-to-br from-[#ff4f0b] to-[#ff7625] text-sm font-bold text-white sm:text-base">{number}</span>
                                    <span className="relative z-10 w-[2px] shrink-0 self-stretch bg-orange-200/80" />
                                    <AccordionWave className="inset-y-0 left-[58px] z-0 h-full w-[calc(100%-58px)]" />
                                </>}
                                {dept.slug === 'cse' && <>
                                    <span className="flex min-h-[52px] w-[52px] shrink-0 items-center justify-center bg-[#FF5422] text-sm font-bold text-white sm:text-base">{number}</span>
                                    <span className="w-[3px] shrink-0 self-stretch bg-[#FF5422]/25" />
                                </>}
                                {dept.slug === 'mec' && <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#f8dfd0] bg-[#fff0e7] text-sm font-bold tracking-wide text-[#e96a27] sm:h-[42px] sm:w-[42px]">{number}</span>}
                                <h3
                                    className={`font-semibold ${dept.slug === 'cse' ? 'flex flex-1 items-center px-4 py-3.5 text-[15px] text-slate-800 transition-colors group-hover:text-[#FF5422] sm:px-5' : dept.slug === 'csm' ? 'relative z-10 flex flex-1 items-center px-4 py-3.5 text-[15px] text-[#293548] transition-colors group-hover:text-[#d94b16] sm:px-5' : dept.slug === 'mec' ? 'flex-1 py-2 text-[14px] text-[#34404e] transition-colors group-hover:text-[#dd6528] sm:text-[15px]' : 'font-serif text-lg lg:text-xl'}`}
                                    style={{
                                        color: dept.slug === 'cse' || dept.slug === 'csm' || dept.slug === 'mec' ? undefined : '#FF5422',
                                    }}
                                >
                                    {section.title}
                                </h3>

                                {dept.slug === 'cse' && <span className="hidden shrink-0 items-center px-4 text-sm font-bold text-[#FF5422]/35 sm:flex">{number}</span>}

                                <motion.span
                                    animate={{
                                        rotate: isOpen ? 180 : 0,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                    }}
                                    className={`shrink-0 ${dept.slug === 'cse' ? 'mr-4 my-auto flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-[#FF5422] text-[#FF5422]' : dept.slug === 'csm' ? 'relative z-10 mr-4 my-auto flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white text-[#f15b24] shadow-[0_2px_8px_rgba(164,76,31,0.12)]' : dept.slug === 'mec' ? 'mr-1 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#fff1e8] text-[#e96a27] sm:mr-2' : 'ml-4'}`}
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                    >
                                        <path
                                            d="M5 8L10 13L15 8"
                                            stroke={dept.slug === 'csm' || dept.slug === 'mec' ? '#e96a27' : '#FF5422'}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </motion.span>
                            </button>

                            {/* Accordion Content */}
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{
                                            height: 0,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            height: 'auto',
                                            opacity: 1,
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            ease: [
                                                0.22,
                                                1,
                                                0.36,
                                                1,
                                            ],
                                        }}
                                        className={`overflow-hidden ${dept.slug === 'cse' || dept.slug === 'mec' ? 'border-t border-[#f8e8de]' : ''}`}
                                        style={{
                                            background: dept.slug === 'cse' ? '#fff8f3' : 'white',
                                        }}
                                    >
                                        {section.subtitle && (
                                            <div className={`px-6 pt-4 pb-2 lg:px-8 ${dept.slug === 'cse' ? 'text-[#737b87]' : ''}`}>
                                                <p className="text-sm text-neutral-400">
                                                    {
                                                        section.subtitle
                                                    }
                                                </p>
                                            </div>
                                        )}

                                        {section.documents && section.documents.length > 0 && (
                                            <div className="px-4 lg:px-6 pb-5 overflow-x-auto custom-scrollbar">
                                                <table className="w-full text-left border-collapse min-w-[400px] sm:min-w-full">
                                                    <thead>
                                                        <tr>
                                                            <th
                                                                className="px-4 py-3.5 text-[15px] font-bold uppercase tracking-wider"
                                                                style={{
                                                                    background: '#F85E00',
                                                                    color: 'white',
                                                                    borderRight: '1px solid rgba(255,255,255,0.15)',
                                                                }}
                                                            >
                                                                Description
                                                            </th>
                                                            <th
                                                                className="px-4 py-3.5 text-[15px] font-bold uppercase tracking-wider text-center"
                                                                style={{
                                                                    background: '#F85E00',
                                                                    color: 'white',
                                                                    width: '200px',
                                                                }}
                                                            >
                                                                View/Download
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {section.documents.map((doc, di) => (
                                                            <tr
                                                                key={di}
                                                                className="transition-colors duration-200"
                                                                style={{
                                                                    borderBottom: '1px solid rgba(248, 94, 0, 0.06)',
                                                                    background: di % 2 === 0 ? 'rgba(255, 250, 243, 0.5)' : 'white',
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.background = 'rgba(255, 210, 157, 0.15)';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.background = di % 2 === 0 ? 'rgba(255, 250, 243, 0.5)' : 'white';
                                                                }}
                                                            >
                                                                <td className="px-4 py-3.5 text-[16px] text-neutral-700">
                                                                    {doc.description}
                                                                </td>
                                                                <td className="px-4 py-3.5 text-center">
                                                                    <a
                                                                        href={doc.link}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="inline-flex items-center gap-1.5 text-[15px] font-medium transition-colors duration-200"
                                                                        style={{ color: '#FF5422' }}
                                                                        onMouseEnter={(e) => {
                                                                            e.currentTarget.style.color = '#FFB563';
                                                                        }}
                                                                        onMouseLeave={(e) => {
                                                                            e.currentTarget.style.color = '#F85E00';
                                                                        }}
                                                                    >
                                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                                            <path d="M7 1.75V9.625M7 9.625L4.375 7M7 9.625L9.625 7M2.625 11.375H11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>
                                                                        View/Download
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {section.iframeSrc && (
                                            <div className="w-full">
                                                <iframe src={section.iframeSrc} className="w-full h-[600px] border-none" />
                                            </div>
                                        )}

                                        {section.content && (
                                            <div className="w-full" dangerouslySetInnerHTML={{ __html: section.content }} />
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DepartmentCourseStructure;
