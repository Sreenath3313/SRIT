import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AboutUsLayout from '../../features/about/components/AboutUsLayout';
import { fadeUp, stagger } from '../../features/about/animations';
import IframeWithLoader from '../../components/common/IframeWithLoader';

const StrategicPlanPage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [showLiveDoc, setShowLiveDoc] = useState(false);

    const objectives = [
        'Enhance the quality of academic programs to meet national and global standards.',
        'Strengthen research, innovation, and entrepreneurship culture among faculty and students.',
        'Develop state-of-the-art infrastructure and laboratory facilities.',
        'Foster industry-academia collaboration for skill development and placement support.',
        'Promote inclusive education and equal opportunity for students from rural backgrounds.',
        'Achieve and maintain national accreditations (NAAC, NBA) and improve NIRF rankings.',
        'Institutionalize a culture of continuous quality improvement through IQAC.',
        'Expand MOUs and collaborations with leading national and international organizations.',
    ];

    return (
        <AboutUsLayout title="Institutional Strategic Plan">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
                <motion.div variants={fadeUp}>
                    <h2 className="text-3xl font-serif font-bold text-[#0A0903] mb-1 flex items-center gap-3">
                        <span className="w-1 h-8 rounded-full bg-[#FF6600] inline-block" />
                        Institutional Strategic Plan
                    </h2>
                    <p className="text-neutral-500 mt-3 leading-relaxed text-left sm:text-justify text-sm sm:text-base">
                        The Institutional Strategic Plan of SRIT outlines the long-term vision, goals, and objectives for achieving academic excellence, research promotion, and institutional development — a roadmap towards becoming a premier technical institution in India.
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
                        <h3 className="text-base sm:text-lg font-bold">INSTITUTIONAL STRATEGIC PLAN</h3>
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
                                                <th className="p-2.5 sm:p-3 border border-white/20 font-bold text-center text-xs sm:text-sm">Procedure/Document Name</th>
                                                <th className="p-2.5 sm:p-3 border border-white/20 font-bold w-24 text-center text-xs sm:text-sm">View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white hover:bg-orange-50/50 transition-colors">
                                                <td className="p-2.5 sm:p-3 border border-neutral-300 text-center font-medium text-neutral-800">1</td>
                                                <td className="p-2.5 sm:p-3 border border-neutral-300 font-medium text-neutral-800">INSTITUTIONAL STRATEGIC PLAN</td>
                                                <td className="p-2.5 sm:p-3 border border-neutral-300 text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowLiveDoc(!showLiveDoc)}
                                                        className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold text-[#FF6600] bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded transition-colors cursor-pointer"
                                                    >
                                                        {showLiveDoc ? 'Hide' : 'View'}
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Embedded Live Sheet View when opened */}
                {showLiveDoc && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full overflow-hidden rounded-xl border border-neutral-200 shadow-md bg-white"
                    >
                        <div className="bg-[#0A0903] px-5 py-3 flex items-center justify-between">
                            <p className="text-sm font-semibold text-white">Institutional Strategic Plan — Document Viewer</p>
                            <span className="text-xs text-[#FF6600] font-semibold">Live Google Sheet</span>
                        </div>
                        <div style={{ height: 'clamp(400px, 60vh, 640px)' }}>
                            <IframeWithLoader
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRdfyI3JPB1Fs32c0x6dV9jui4wTdbz_-1blmmh5sPDc8jGvP60GLMqN6aaQlUCBQ/pubhtml?widget=true&headers=false"
                                title="SRIT Institutional Strategic Plan"
                                loading="lazy"
                            />
                        </div>
                    </motion.div>
                )}

                {/* Strategic Objectives */}
                <motion.div variants={fadeUp} className="pt-2">
                    <h3 className="text-xl font-serif font-bold text-[#0A0903] mb-4">Strategic Objectives</h3>
                    <motion.div variants={stagger} className="space-y-3">
                        {objectives.map((obj, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                whileHover={{ x: 4 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="flex gap-4 p-4 bg-white border border-neutral-200 rounded-xl hover:border-[#FF6600]/40 hover:shadow-2xs transition-all group"
                            >
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF6600] to-orange-400 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                    {i + 1}
                                </div>
                                <p className="text-neutral-700 leading-relaxed text-sm sm:text-base">{obj}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </AboutUsLayout>
    );
};

export default StrategicPlanPage;
