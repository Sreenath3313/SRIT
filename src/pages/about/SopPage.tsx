import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AboutUsLayout from '../../features/about/components/AboutUsLayout';
import { fadeUp, stagger } from '../../features/about/animations';

interface SopItem {
    sNo: number;
    title: string;
    url?: string;
}

const sopItems: SopItem[] = [
    { sNo: 1, title: 'Academic and administrative bodies' },
    { sNo: 2, title: 'Conduction of Remedial Classes' },
    { sNo: 3, title: 'Identifying Slow learners - Remedial Action' },
    { sNo: 4, title: 'Preparation of Class and Individual Time Tables' },
    { sNo: 5, title: 'SOP of Conduction of SEE for Laboratory Courses' },
    { sNo: 6, title: 'SOP of Conduction of Internal Laboratory Examinations' },
    { sNo: 7, title: 'SOP for Invigilation Duties' },
    { sNo: 8, title: 'SOP of Conduction of Continuous Internal Examinations (CIE)' },
    { sNo: 9, title: 'Conduction of SEE for Laboratory Courses' },
    { sNo: 10, title: 'Stock Verification of Laboratories' },
    { sNo: 11, title: 'Faculty attending FDPs/Seminars/Workshops/STTPs' },
];

const SopPage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <AboutUsLayout title="Standard Operating Procedures">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
                <motion.div variants={fadeUp}>
                    <h2 className="text-3xl font-serif font-bold text-[#0A0903] mb-1 flex items-center gap-3">
                        <span className="w-1 h-8 rounded-full bg-[#FF5422] inline-block" />
                        SRIT Standard Operating Procedures
                    </h2>
                    <p className="text-neutral-500 mt-3 leading-relaxed text-left sm:text-justify text-sm sm:text-base">
                        SRIT has established SOPs to ensure consistency, transparency, and efficiency across all academic, administrative, and student welfare activities.
                    </p>
                </motion.div>

                {/* Collapsible Accordion Table matching original site reference */}
                <motion.div variants={fadeUp} className="border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between p-4 sm:p-5 bg-[#FF6600] text-white hover:bg-[#e65c00] transition-colors text-left"
                    >
                        <h3 className="text-base sm:text-lg font-bold">SRIT Standard Operating Procedures</h3>
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
                                    <table className="w-full min-w-[550px] border-collapse text-sm">
                                        <thead>
                                            <tr className="bg-[#FF6600] text-white">
                                                <th className="p-2.5 sm:p-3 border border-white/20 font-bold w-16 text-center text-xs sm:text-sm">S. No.</th>
                                                <th className="p-2.5 sm:p-3 border border-white/20 font-bold text-center text-xs sm:text-sm">Procedure/Document Name</th>
                                                <th className="p-2.5 sm:p-3 border border-white/20 font-bold w-24 text-center text-xs sm:text-sm">View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sopItems.map((item, index) => (
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
                                                                onClick={() => alert(`${item.title} SOP document is available with the IQAC coordinator.`)}
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

export default SopPage;
