import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import AboutUsLayout from '../../features/about/components/AboutUsLayout';
import { fadeUp, stagger } from '../../features/about/animations';

const governingBodyMembers = [
    { sNo: 1, name: 'Prof. K. Rajanikanth', affiliation: 'Former Principal, MSRIT', designation: 'Chairman' },
    { sNo: 2, name: 'Sri A. Sambasiva Reddy', affiliation: 'Correspondent & Secretary', designation: 'Management - Member', link: '/about/secretary' },
    { sNo: 3, name: 'Smt. J. Padmavathy', affiliation: 'President', designation: 'Management - Member', link: '/about/chairperson' },
    { sNo: 4, name: 'Dr. M. Ranjit Reddy', affiliation: 'Vice-President', designation: 'Management - Member' },
    { sNo: 5, name: 'Sri E.S. Chakravarthy', affiliation: 'Advisor to SRIT, Bangalore', designation: 'Nominated by Management' },
    { sNo: 6, name: 'Dr. D. Sai Chaitanya Kishore', affiliation: 'Professor, Mechanical Engineering, SRIT', designation: 'Nominated by Principal', link: '/department/mec' },
    { sNo: 7, name: 'Dr. U. Raghu Babu', affiliation: 'Associate Professor, Civil Engineering, SRIT', designation: 'Nominated by Principal', link: '/department/civil' },
    { sNo: 8, name: 'Prof. A. Suresh Babu', affiliation: 'Director, Software Development Centre, JNTUA', designation: 'Nominated by APSCHE', link: '/sdc-director' },
    { sNo: 9, name: 'Prof. S.V. Satyanarayana', affiliation: 'Principal, JNTUA College of Engineering, Kalikiri', designation: 'Nominated by JNTUA' },
    { sNo: 10, name: 'Dr. G. Balakrishna', affiliation: 'Principal of SRIT', designation: 'Ex-Officio', link: '/about/principal' },
];

const minutesOfMeeting = [
    { num: 'XXX', date: '29/06/2025' },
    { num: 'XXIX', date: '28/12/2024' },
    { num: 'XXVIII', date: '17/02/2024' },
    { num: 'XXVII', date: '23/09/2023' },
    { num: 'XXVI', date: '30/01/2023' },
    { num: 'XXV', date: '30/04/2022' },
    { num: 'XXIV', date: '04/09/2021' },
    { num: 'XXIII', date: '03/01/2021' },
    { num: 'XXII', date: '29/02/2020' },
    { num: 'XXI', date: '20/10/2019' },
    { num: 'XX', date: '07/09/2019' },
];

import { AccordionContainer, DepartmentAccordionRow } from '../../components/common/DepartmentAccordion';

const GoverningBodyPage: React.FC = () => {
    const [openTab, setOpenTab] = useState<'members' | 'minutes' | null>('members');

    return (
        <AboutUsLayout title="Governing Body">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
                <motion.h2 variants={fadeUp} className="text-3xl font-serif font-bold text-[#0A0903] flex items-center gap-3">
                    <span className="w-1 h-8 rounded-full bg-[#FF6600] inline-block" />
                    Governing Body
                </motion.h2>

                <motion.div variants={fadeUp} className="space-y-4">
                    <AccordionContainer className="w-full">
                        <DepartmentAccordionRow
                            id="governing-body"
                            index={0}
                            title="Governing Body Members"
                            isOpen={openTab === 'members'}
                            onToggle={() => setOpenTab(openTab === 'members' ? null : 'members')}
                        >
                        <h4 className="font-semibold text-neutral-700 mb-3 text-left text-sm">Members of Governing Body: <span className="text-neutral-500 font-normal">Sheet1</span></h4>
                        <div className="w-full overflow-x-auto custom-scrollbar border border-neutral-200">
                            <table className="w-full min-w-[600px] border-collapse text-sm">
                                <thead>
                                    <tr className="bg-[#FF6600] text-white">
                                        <th className="p-2.5 border border-white/20 font-bold w-12 text-center text-xs">S. No.</th>
                                        <th className="p-2.5 border border-white/20 font-bold text-center text-xs">Name of the Member &amp; Affiliation</th>
                                        <th className="p-2.5 border border-white/20 font-bold text-center w-1/3 text-xs">Designation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {governingBodyMembers.map((m, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.03 }}
                                            className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#fffaf6]'} hover:bg-orange-50/50 transition-colors`}
                                        >
                                            <td className="p-2.5 border border-neutral-300 text-center font-medium text-neutral-800">{m.sNo}</td>
                                            <td className="p-2.5 border border-neutral-300">
                                                {m.link ? (
                                                    <Link to={m.link} className="hover:underline group">
                                                        <span className="font-bold text-[#d03a10] group-hover:text-[#FF5422]">{m.name}</span>
                                                        <span className="text-neutral-600 block text-xs mt-0.5 group-hover:text-neutral-800">{m.affiliation}</span>
                                                    </Link>
                                                ) : (
                                                    <>
                                                        <span className="font-bold text-[#d03a10]">{m.name}</span>
                                                        <span className="text-neutral-600 block text-xs mt-0.5">{m.affiliation}</span>
                                                    </>
                                                )}
                                            </td>
                                            <td className="p-2.5 border border-neutral-300 text-center text-neutral-700 font-medium">{m.designation}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </DepartmentAccordionRow>

                    <DepartmentAccordionRow
                        id="governing-body"
                        index={1}
                        title="Minutes of Meeting"
                        isOpen={openTab === 'minutes'}
                        onToggle={() => setOpenTab(openTab === 'minutes' ? null : 'minutes')}
                    >
                        <h4 className="font-semibold text-neutral-700 mb-4 text-center text-sm uppercase tracking-wide">Minutes of Meeting of Governing Body</h4>
                        <table className="w-full min-w-[400px] sm:min-w-full border-collapse text-sm max-w-2xl mx-auto">
                            <thead>
                                <tr className="bg-[#FF6600] text-white">
                                    <th className="p-3 border border-neutral-700 font-semibold text-center">Meeting Number</th>
                                    <th className="p-3 border border-neutral-700 font-semibold text-center">Date</th>
                                    <th className="p-3 border border-neutral-700 font-semibold text-center">Minutes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {minutesOfMeeting.map((m, i) => (
                                    <motion.tr
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.04 }}
                                        className={`${i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'} hover:bg-orange-50/50 transition-colors`}
                                    >
                                        <td className="p-3 border border-neutral-200 text-center font-bold text-neutral-800">{m.num}</td>
                                        <td className="p-3 border border-neutral-200 text-center text-neutral-600">{m.date}</td>
                                        <td className="p-3 border border-neutral-200 text-center">
                                            <span className="px-4 py-1.5 text-xs font-semibold text-[#FF6600] bg-orange-50 border border-orange-200 rounded-full">
                                                View
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </DepartmentAccordionRow>
                </AccordionContainer>
            </motion.div>
            </motion.div>
        </AboutUsLayout>
    );
};

export default GoverningBodyPage;
