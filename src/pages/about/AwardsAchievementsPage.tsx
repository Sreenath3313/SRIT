import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trophy, Award, Star, Medal } from 'lucide-react';
import AboutUsLayout from '../../features/about/components/AboutUsLayout';
import { fadeUp, stagger } from '../../features/about/animations';

interface AwardRecord {
    sNo: number;
    year: string;
    category: string;
    name: string;
    awardingBody: string;
}

const awardsTableData: AwardRecord[] = [
    { sNo: 1, year: '2026-27', category: 'Academic Excellence', name: 'Certificate of Appreciation - SARTHI SEASON V', awardingBody: 'VERTUSA' },
    { sNo: 2, year: '2025-26', category: 'Academic Excellence', name: 'Most Engaged Institutions of the Year 2025', awardingBody: 'ICT Academy' },
    { sNo: 3, year: '2024-25', category: 'Academic Excellence', name: 'Certificate of Appreciation - SRIT', awardingBody: 'CyberPeace Foundation & ICT Academy' },
    { sNo: 4, year: '2023-24', category: 'Toastmasters', name: 'Best Shining Club - SRIT Bloopers Speakers', awardingBody: 'Toastmasters' },
    { sNo: 5, year: '2023-24', category: 'Toastmasters', name: 'Golden Eagle Award', awardingBody: 'Vibrant Speakers Toastmasters' },
    { sNo: 6, year: '2023-24', category: 'Toastmasters', name: 'Third Place - Evaluation Contest 2023-24', awardingBody: 'Toastmasters' },
    { sNo: 7, year: '2023-24', category: 'Academic Excellence', name: 'ALL INDIA 3rd Rank for Completing AICTE-EDUSKILLS Virtual Internships', awardingBody: 'EduSkills' },
    { sNo: 8, year: '2023-24', category: 'Academic Excellence', name: 'Best Performing Engineering Institute - 2023', awardingBody: 'EduSkills' },
    { sNo: 9, year: '2023-24', category: 'Academic Excellence', name: 'Talent Connect Excellence Award - 2023', awardingBody: 'EduSkills' },
    { sNo: 10, year: '2023-24', category: 'Academic Excellence', name: 'Certificate of Appreciation - SRIT', awardingBody: 'EduSkills' },
    { sNo: 11, year: '2023-24', category: 'Academic Excellence', name: 'Best Performing Institute (Juniper Internship Domain)', awardingBody: 'EduSkills' },
    { sNo: 12, year: '2023-24', category: 'Academic Excellence', name: 'Best Performing Institute (Fortinet Internship Domain)', awardingBody: 'EduSkills' },
    { sNo: 13, year: '2023-24', category: 'Academic Excellence', name: 'Best Performing Institute (Cisco Networking Domain)', awardingBody: 'EduSkills' },
    { sNo: 14, year: '2023-24', category: 'Academic Excellence', name: 'Best Performing Institute (EduSkills Academy Internship Domain)', awardingBody: 'EduSkills' },
    { sNo: 15, year: '2023-24', category: 'Academic Excellence', name: 'Best Performing Civil Engineering Dept. in Internship - 2023', awardingBody: 'EduSkills' },
    { sNo: 16, year: '2023-24', category: 'Academic Excellence', name: 'Best Performing Electrical & Electronics Engineering Dept. in Internship - 2023', awardingBody: 'EduSkills' },
];

const cardsData = [
    { title: 'NAAC A Grade Accreditation', description: 'Accredited by National Assessment and Accreditation Council (NAAC) with A Grade, recognizing excellence in education.', icon: Award, year: '2023', color: 'from-amber-500 to-orange-500' },
    { title: 'NBA Accreditation', description: 'B.Tech programs in CSE, ECE, EEE, and MEC are accredited by the National Board of Accreditation.', icon: Trophy, year: '2022', color: 'from-[#FF5422] to-orange-400' },
    { title: 'NIRF Ranking', description: 'Consistently recognized and ranked in the top engineering colleges by the National Institutional Ranking Framework (NIRF).', icon: Star, year: '2023', color: 'from-purple-500 to-indigo-500' },
    { title: 'Best Engineering College Award', description: 'Awarded the Best Engineering College in the Rayalaseema region for outstanding academic performance and placements.', icon: Medal, year: '2021', color: 'from-emerald-500 to-teal-500' },
];

const AwardsAchievementsPage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <AboutUsLayout title="Awards and Achievements">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">
                <motion.div variants={fadeUp}>
                    <h2 className="text-3xl font-serif font-bold text-[#0A0903] mb-1 flex items-center gap-3">
                        <span className="w-1 h-8 rounded-full bg-[#FF5422] inline-block" />
                        Awards &amp; Achievements
                    </h2>
                    <p className="text-neutral-500 mt-3 leading-relaxed text-left sm:text-justify text-sm sm:text-base">
                        SRIT has been constantly striving for excellence in engineering education and research. Our commitment to quality has been recognized by various national bodies through prestigious awards, accreditations, and rankings.
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
                        <h3 className="text-base sm:text-lg font-bold">Awards and Achievements</h3>
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
                                    <table className="w-full min-w-[700px] border-collapse text-sm">
                                        <thead>
                                            <tr className="bg-[#FF6600] text-white">
                                                <th className="p-2.5 sm:p-3 border border-white/20 font-bold w-14 text-center text-xs sm:text-sm">S. No.</th>
                                                <th className="p-2.5 sm:p-3 border border-white/20 font-bold w-24 text-center text-xs sm:text-sm">Academic Year</th>
                                                <th className="p-2.5 sm:p-3 border border-white/20 font-bold w-40 text-center text-xs sm:text-sm">Category</th>
                                                <th className="p-2.5 sm:p-3 border border-white/20 font-bold text-center text-xs sm:text-sm">Name of the Award/Recognition</th>
                                                <th className="p-2.5 sm:p-3 border border-white/20 font-bold w-48 text-center text-xs sm:text-sm">Name of the Awarding Body/Agency</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {awardsTableData.map((item, index) => (
                                                <tr
                                                    key={item.sNo}
                                                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#fffaf6]'} hover:bg-orange-50/50 transition-colors`}
                                                >
                                                    <td className="p-2.5 sm:p-3 border border-neutral-300 text-center font-medium text-neutral-800">
                                                        {item.sNo}
                                                    </td>
                                                    <td className="p-2.5 sm:p-3 border border-neutral-300 text-center text-neutral-700 font-medium">
                                                        {item.year}
                                                    </td>
                                                    <td className="p-2.5 sm:p-3 border border-neutral-300 text-neutral-700 text-center sm:text-left">
                                                        {item.category}
                                                    </td>
                                                    <td className="p-2.5 sm:p-3 border border-neutral-300 font-medium text-neutral-900">
                                                        {item.name}
                                                    </td>
                                                    <td className="p-2.5 sm:p-3 border border-neutral-300 text-neutral-700 text-center sm:text-left">
                                                        {item.awardingBody}
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

                {/* Key Recognition Highlights */}
                <motion.div variants={fadeUp} className="pt-4">
                    <h3 className="text-xl font-serif font-bold text-[#0A0903] mb-4">Key Recognitions & Accreditations</h3>
                    <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cardsData.map((award, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -4, scale: 1.01 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="relative bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden group hover:shadow-md transition-shadow"
                            >
                                <div className={`h-1.5 w-full bg-gradient-to-r ${award.color}`} />
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${award.color} flex items-center justify-center text-white shadow-xs`}>
                                            <award.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-bold text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full">{award.year}</span>
                                    </div>
                                    <h4 className="text-base font-bold text-[#0A0903] mb-1.5 group-hover:text-[#FF5422] transition-colors">{award.title}</h4>
                                    <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">{award.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </AboutUsLayout>
    );
};

export default AwardsAchievementsPage;
