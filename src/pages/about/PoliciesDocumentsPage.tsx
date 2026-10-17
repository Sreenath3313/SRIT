import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import AboutUsLayout from '../../features/about/components/AboutUsLayout';
import IframeWithLoader from '../../components/common/IframeWithLoader';
import { AccordionContainer, DepartmentAccordionRow } from '../../components/common/DepartmentAccordion';

interface PolicyRecord {
    sNo: number;
    title: string;
}

const policiesData: PolicyRecord[] = [
    { sNo: 1, title: 'Service Rules' },
    { sNo: 2, title: 'Intellectual Property Rights (IPR) Policy' },
    { sNo: 3, title: 'Research and Development (R&D) Policy' },
    { sNo: 4, title: 'National Innovation and Start up (NISP) Policy' },
    { sNo: 5, title: 'Code of Conduct for Head of the Department (HOD)' },
    { sNo: 6, title: 'Code of Conduct of Director IQAC' },
    { sNo: 7, title: 'Code of Conduct for Staff' },
    { sNo: 8, title: 'Code of Conduct for Students' },
    { sNo: 9, title: 'Mentoring Policy' },
    { sNo: 10, title: 'Code of Conduct for Hostelers' },
    { sNo: 11, title: 'Grievance Redressal Policy' },
    { sNo: 12, title: 'Email Etiquette' },
    { sNo: 13, title: 'Process manual for slow learners and advanced learners' },
    { sNo: 14, title: 'Feedback Process manual' },
    { sNo: 15, title: 'Academic Regulations UG-SRIT R19' },
    { sNo: 16, title: 'Academic Regulations UG-SRIT R20' },
    { sNo: 17, title: 'Academic Regulations UG-SRIT R23' },
    { sNo: 18, title: 'IT Policy' },
    { sNo: 19, title: 'Academic Regulations PG-SRIT R19' },
    { sNo: 20, title: 'Academic Regulations PG-SRIT R23' },
    { sNo: 21, title: 'Industry Institute Interaction Policy' },
    { sNo: 22, title: 'Internship Policy' },
    { sNo: 23, title: 'Plagiarism Policy' },
    { sNo: 24, title: 'Malpractice Rules' },
    { sNo: 25, title: 'Women Empowerment Cell - Policy Document' },
    { sNo: 26, title: 'Process Manual for Student Satisfaction Survey' },
];

const OFFICIAL_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRExq8g1wD7bhigayAwuZ4mtiMzONTZ5B7JWHIffaq5Fxhdio3f0mJ8WOLEWGdkmf-kKRzBXdt6xSQ4/pubhtml";
const EMBED_SHEET_URL = `${OFFICIAL_SHEET_URL}?widget=true&chrome=false&headers=false`;

const PoliciesDocumentsPage: React.FC = () => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(true);

    return (
        <AboutUsLayout title="Policies and Documents">
            <div className="space-y-6">
                {/* Section Header */}
                <div className="rounded-xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-3">
                    <div className="flex items-center gap-2.5 pb-1">
                        <span className="h-6 w-1.5 rounded-full bg-[#FF6600]" />
                        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
                            SRIT Policies and Documents
                        </h2>
                    </div>
                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed text-justify">
                        Srinivasa Ramanujan Institute of Technology operates with total institutional governance, compliance, and procedural transparency. Below are the statutory rules, codes of conduct, manuals, and official policy records formulated and periodically reviewed by the Governing Body, Academic Council, and Internal Quality Assurance Cell (IQAC).
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
                        <span className="px-3 py-1 rounded-full bg-orange-50 text-[#FF6600] border border-orange-200/80">
                            26 Institutional Policies &amp; Documents
                        </span>
                        <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200">
                            IQAC Statutory Framework
                        </span>
                        <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200">
                            Autonomous Governance
                        </span>
                    </div>
                </div>

                {/* Main Department-Themed Accordion with Live Google Sheet */}
                <AccordionContainer className="w-full">
                    <DepartmentAccordionRow
                        id="srit-policies-documents"
                        index={0}
                        title="SRIT Policies and Documents Official Register"
                        isOpen={isAccordionOpen}
                        onToggle={() => setIsAccordionOpen(!isAccordionOpen)}
                    >
                        <div className="bg-white p-3 sm:p-5 space-y-4">
                            {/* Action Bar */}
                            <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                                <div className="text-xs text-neutral-500 font-medium">
                                    Official Live Records Repository (26 Statutory Policies)
                                </div>
                                <a
                                    href={OFFICIAL_SHEET_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6600] hover:text-[#e04515] hover:underline"
                                >
                                    <span>Open Official Sheet in New Tab</span>
                                    <ExternalLink size={13} />
                                </a>
                            </div>

                            {/* Google Sheet Embed */}
                            <div className="w-full h-[750px] sm:h-[820px] rounded-xl overflow-hidden border border-neutral-200 shadow-inner bg-white">
                                <IframeWithLoader
                                    title="SRIT Policies and Documents Official Spreadsheet"
                                    src={EMBED_SHEET_URL}
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </DepartmentAccordionRow>
                </AccordionContainer>

                {/* Directory Table Grid for Quick Reference */}
                <div className="rounded-xl border border-neutral-200/80 bg-white p-5 sm:p-7 shadow-sm space-y-4">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100">
                        <span className="h-4 w-1.5 rounded-full bg-[#FF6600]" />
                        <h3 className="font-serif text-lg font-bold text-neutral-900">
                            Statutory Policies Directory Index
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {policiesData.map((policy) => (
                            <div
                                key={policy.sNo}
                                className="flex items-center gap-2.5 p-3 rounded-lg border border-[#FFD9C4]/70 bg-[#FFFAF6] hover:border-[#FF6600] hover:bg-orange-50/60 transition-all text-xs"
                            >
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FF6600] text-white text-[11px] font-bold shrink-0">
                                    {policy.sNo}
                                </span>
                                <span className="font-medium text-neutral-800 truncate" title={policy.title}>
                                    {policy.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AboutUsLayout>
    );
};

export default PoliciesDocumentsPage;
