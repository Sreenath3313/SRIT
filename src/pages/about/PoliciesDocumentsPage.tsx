import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import AboutUsLayout from '../../features/about/components/AboutUsLayout';
import { fadeUp, stagger } from '../../features/about/animations';

interface PolicyRecord {
    sNo: number;
    title: string;
    url?: string;
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
];

const PoliciesDocumentsPage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <AboutUsLayout title="Policies and Documents">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
                <motion.div variants={fadeUp}>
                    <h2 className="text-3xl font-serif font-bold text-[#0A0903] mb-1 flex items-center gap-3">
                        <span className="w-1 h-8 rounded-full bg-[#FF5422] inline-block" />
                        SRIT Policies and Documents
                    </h2>
                    <p className="text-neutral-500 mt-3 leading-relaxed text-left sm:text-justify text-sm sm:text-base">
                        SRIT operates with transparency and adheres strictly to its established policies and guidelines. Below are the key policy documents governing academic, administrative, and statutory functions.
                    </p>
                </motion.div>

                {/* Collapsible Accordion Table matching original site */}
                <motion.div variants={fadeUp} className="border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between p-4 sm:p-5 bg-[#FF6600] text-white hover:bg-[#e65c00] transition-colors text-left"
                    >
                        <h3 className="text-base sm:text-lg font-bold">SRIT Policies and Documents</h3>
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <ChevronDown className="w-5 h-5 text-white" />
                        </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden bg-white"
                            >
                                <div className="p-3 sm:p-6 overflow-x-auto custom-scrollbar">
                                    <table className="w-full min-w-[500px] border-collapse text-sm">
                                        <thead>
                                            <tr className="bg-[#FF6600] text-white">
                                                <th className="p-2.5 sm:p-3 border border-white/20 font-bold w-16 text-center text-xs sm:text-sm">S. No.</th>
                                                <th className="p-2.5 sm:p-3 border border-white/20 font-bold text-center text-xs sm:text-sm">Policy/Rules/Guidelines/Document</th>
                                                <th className="p-2.5 sm:p-3 border border-white/20 font-bold w-24 text-center text-xs sm:text-sm">View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {policiesData.map((item, index) => (
                                                <tr
                                                    key={item.sNo}
                                                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#fffaf6]'} hover:bg-orange-50/50 transition-colors`}
                                                >
                                                    <td className="p-2.5 sm:p-3 border border-neutral-300 text-center font-medium text-neutral-800">
                                                        {item.sNo}
                                                    </td>
                                                    <td className="p-2.5 sm:p-3 border border-neutral-300 font-medium text-neutral-800">
                                                        {item.title}
                                                    </td>
                                                    <td className="p-2.5 sm:p-3 border border-neutral-300 text-center">
                                                        {item.url ? (
                                                            <a
                                                                href={item.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold text-[#FF5422] bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded transition-colors"
                                                            >
                                                                View
                                                            </a>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={() => alert(`${item.title} document is maintained in the IQAC repository.`)}
                                                                className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold text-[#FF5422] bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded transition-colors cursor-pointer"
                                                            >
                                                                View
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </AboutUsLayout>
    );
};

export default PoliciesDocumentsPage;
