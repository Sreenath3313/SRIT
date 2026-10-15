import React from 'react';
import DepartmentAccordion from '../../../../components/common/DepartmentAccordion';
import IframeWithLoader from '../../../../components/common/IframeWithLoader';
import ContentRenderer from '../../../../components/common/ContentRenderer';
import type { DepartmentData } from '../../index';
import type { CourseSection } from '../types';

interface DepartmentCourseStructureProps {
    dept: DepartmentData;
}

const DepartmentCourseStructure: React.FC<DepartmentCourseStructureProps> = ({ dept }) => {
    const sections: CourseSection[] = dept.courses?.length
        ? dept.courses
        : (dept.courseStructureItems || []).map((item, index) => ({
            key: `course-structure-${index}`,
            title: item.title,
            content: item.content,
        }));
    const items = sections.map((section) => ({
        title: section.title,
        content: (
            <>
                {section.subtitle && <p className="mb-4 text-sm text-neutral-500">{section.subtitle}</p>}
                {section.iframeSrc && (
                    <IframeWithLoader
                        src={section.iframeSrc}
                        title={section.title}
                        style={{ width: '100%', minHeight: '600px', border: 'none', borderRadius: '8px' }}
                    />
                )}
                {section.content && <div className="max-w-full overflow-x-auto"><ContentRenderer content={section.content} /></div>}
                {section.documents?.length ? (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[400px] border-collapse text-left">
                            <thead>
                                <tr className="bg-[#FF5B19] text-white">
                                    <th className="border-r border-white/15 px-4 py-3 text-sm font-bold uppercase tracking-wide">Description</th>
                                    <th className="w-[200px] px-4 py-3 text-center text-sm font-bold uppercase tracking-wide">View/Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {section.documents.map((doc, index) => (
                                    <tr key={`${section.key}-${index}`} className={index % 2 === 0 ? 'bg-[#FFFAF6]' : 'bg-white'}>
                                        <td className="border-b border-orange-100 px-4 py-3 text-sm text-neutral-700">{doc.description}</td>
                                        <td className="border-b border-orange-100 px-4 py-3 text-center">
                                            <a href={doc.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#F15A24] hover:text-[#D94B16]">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
                ) : null}
            </>
        ),
    }));
    const defaultOpenIndex = sections.findIndex((section) => section.key === 'regulations' || /regulation/i.test(section.title));

    return (
        <div className="space-y-8">
            <div className="mb-8 text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                    <span className="h-[2px] w-8 rounded-full bg-[#F85E00]" />
                    <span className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#F15A24] sm:text-xs sm:tracking-[0.3em]">{dept.code} · Academics</span>
                    <span className="h-[2px] w-8 rounded-full bg-[#F85E00]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#0A0903] sm:text-3xl lg:text-4xl">COURSE STRUCTURE</h2>
            </div>
            <DepartmentAccordion title="" items={items} defaultOpenIndex={defaultOpenIndex} />
        </div>
    );
};

export default DepartmentCourseStructure;
