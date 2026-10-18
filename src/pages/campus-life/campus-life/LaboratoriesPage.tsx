import React, { useState } from 'react';
import {
    ChevronRight, ChevronLeft, ChevronUp, ChevronDown
} from 'lucide-react';
import CampusLifeLayout from './CampusLifeLayout';
import { AccordionContainer, DepartmentAccordionRow } from '../../../components/common/DepartmentAccordion';

export const LaboratoriesPage: React.FC = () => {
    const [isLabsTableOpen, setIsLabsTableOpen] = useState(false);
    const [isCivilLabsOpen, setIsCivilLabsOpen] = useState(false);
    const [isCseLabsOpen, setIsCseLabsOpen] = useState(false);

    return (
        <CampusLifeLayout activeSectionId="labs">
            <>

                                {/* === 2. ABOUT ADVANCED LABORATORIES (Side-by-Side: Text Left + Explore Button, Image Right) === */}
                                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 sm:p-7 shadow-sm relative overflow-hidden">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                        <div className="lg:col-span-7 space-y-3.5">
                                            <div className="flex items-center gap-2.5 pb-1">
                                                <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                                    About <span className="text-[#FF6600]">Advanced Engineering Laboratories</span>
                                                </h2>
                                            </div>

                                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                                Laboratories at <strong className="text-[#FF6600] font-bold">Srinivasa Ramanujan Institute of Technology (SRIT)</strong> bridge academic theory with real-world engineering applications. The institution houses <strong className="text-[#FF6600] font-bold">8 specialized, fully computerized state-of-the-art laboratories</strong> designed for high-performance computing, artificial intelligence, research, and skill training.
                                            </p>

                                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                                The computing ecosystem includes the <span className="text-[#FF6600] font-semibold">C &amp; Data Structures Lab</span>, three <span className="text-[#FF6600] font-semibold">B-Block Computer Laboratories</span>, a dedicated <span className="text-[#FF6600] font-semibold">Research Lab</span>, a <span className="text-[#FF6600] font-semibold">Capstone Project Lab</span>, the <span className="text-[#FF6600] font-bold">APSSDC CM’s Skill Excellence Center</span>, and a dedicated <span className="text-[#FF6600] font-bold">Machine Learning Laboratory</span>.
                                            </p>

                                            <p className="text-sm sm:text-[15px] lg:text-base leading-[1.8] text-neutral-700 text-justify">
                                                All facilities are powered by high-specification multi-core workstations with <strong className="text-[#FF6600] font-semibold">16GB RAM Intel Core i5 systems</strong>, backed by industry-standard suites (<span className="text-[#FF6600] font-semibold">TensorFlow, Keras, Scikit-learn, Hadoop, Oracle 11g, MongoDB, Selenium, and NS3</span>), gigabit networking, and continuous industrial <span className="text-[#FF6600] font-semibold">NUMERIC UPS power backup</span>.
                                            </p>

                                            <div className="pt-2 flex flex-wrap items-center gap-3">

                                                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-600">
                                                    <span className="px-2.5 py-1 rounded-md bg-orange-50 text-[#FF6600] border border-orange-200">
                                                        8 Computing Labs
                                                    </span>
                                                    <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                                        16 GB RAM i5 Nodes
                                                    </span>
                                                    <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                                                        APSSDC CM's Skill Center
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-5 self-stretch flex flex-col min-h-[280px]">
                                            <div className="rounded-xl overflow-hidden border-2 border-orange-200/90 shadow-md bg-orange-50/20 group relative flex-1 w-full min-h-[280px]">
                                                <img
                                                    src="/optimized/ComputerLab.JPG.webp"
                                                    alt="SRIT Advanced Computing & Machine Learning Laboratories"
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/optimized/Campus.JPG.webp';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                {/* === 4. COMPUTING LABS BREAKDOWN TABLE (Collapsible) === */}
                                {/* Table moved to CSE Section */}

                                {/* === 5. OFFICIAL DEPARTMENT ACCORDIONS (CIVIL & CSE) === */}
                                <section aria-label="Department Laboratories" className="space-y-3 w-full">
                                    <div className="flex items-center gap-3 px-1">
                                        <span className="h-5 w-1.5 rounded-full bg-[#FF6600]" />
                                        <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
                                            Department Laboratories &amp; Technical Equipment
                                        </h2>
                                    </div>

                                    <AccordionContainer className="w-full">
                                        {/* CIVIL Department Laboratories */}
                                        <DepartmentAccordionRow
                                            id="labs-civil"
                                            index={0}
                                            title="CIVIL Department Laboratories"
                                            isOpen={isCivilLabsOpen}
                                            onToggle={() => setIsCivilLabsOpen(!isCivilLabsOpen)}
                                        >
                                            <div className="p-5 sm:p-6 bg-white space-y-3">
                                                <div className="p-4 sm:p-5 rounded-xl border border-[#FFD9C4] bg-[#FFFAF6]">
                                                    <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                                                        Civil Engineering departmental laboratories including Surveying, Concrete Technology, Fluid Mechanics, and Environmental Engineering are housed in the Civil Block with specialized apparatus and field testing equipment.
                                                    </p>
                                                </div>
                                            </div>
                                        </DepartmentAccordionRow>

                                        {/* CSE Department Laboratories */}
                                        <DepartmentAccordionRow
                                            id="labs-cse"
                                            index={1}
                                            title="CSE Department Laboratories & Computing Specifications"
                                            isOpen={isCseLabsOpen}
                                            onToggle={() => setIsCseLabsOpen(!isCseLabsOpen)}
                                        >
                                            <div className="p-4 sm:p-6 bg-white space-y-4">
                                                <div className="overflow-x-auto rounded-xl border border-[#FFD9C4]">
                                                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                                                        <thead>
                                                            <tr className="bg-[#FFFAF6] text-[#0f172a] border-b border-[#FFD9C4]">
                                                                <th className="px-4 py-3 font-bold whitespace-nowrap">Laboratory Name</th>
                                                                <th className="px-4 py-3 font-bold">Hardware Configuration</th>
                                                                <th className="px-4 py-3 font-bold">Installed Software &amp; Frameworks</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white text-[#334155] divide-y divide-[#FFD9C4]/60">
                                                            {[
                                                                ['1. C & Data Structures Lab', 'HP Core 2 DUO Processor, 2 GB RAM, 160 GB HDD, 15.6" Monitor', 'GCC, Dev C/C++, Open Office, Ubuntu'],
                                                                ['2. B-Block Computer Lab-1', 'HP-3090 Pro / Dual Core 3.0, 6 GB RAM, 320 GB HDD, 18.5" LCD Monitor', 'Oracle 11g Express, JDK, GCC, DIA Tool, Dev C++, Xrunner, WAMP, Tomcat, WEKA, Wireshark, OpenSSL, GNU PGP, NMAP, Ethereal, J2ME, Android ADT, R, MongoDB, PIG, HIVE Hadoop, TestLink, Selenium, Ubuntu'],
                                                                ['3. B-Block Computer Lab-2', 'HP-3090 Pro / Dual Core 3.0, 6 GB RAM, 320 GB HDD, 18.5" LCD Monitor', 'JDK, GCC, DIA Tool, Dev C/C++, Xrunner, WAMP, Tomcat Server, WEKA Tool, Wireshark, Open SSL, GNU PGP, NMAP, Ethereal, J2ME Wireless Toolkit, Android ADT Bundle, Ubuntu'],
                                                                ['4. B-Block Computer Lab-3', 'HP-3090 Pro / Dual Core 3.0, 6 GB RAM, 320 GB HDD, 18.5" LCD Monitor', 'JDK, GCC, DIA Tool, Dev C/C++, Xrunner, WAMP, Tomcat Server, WEKA Tool, Wireshark, Open SSL, GNU PGP, NMAP, Ethereal, J2ME Toolkit, Android ADT Bundle, Ubuntu'],
                                                                ['5. Research Lab', 'Lenovo – Dual Core, 4 GB RAM, 320 GB HDD, 18.5" Monitor', 'Python, JDK, Ubuntu, NS3, Android Studio, R Programming, GNU Octave'],
                                                                ['6. Project Lab', 'Lenovo – Dual Core, 4 GB RAM, 320 GB HDD, 18.5" Monitor', 'Python, JDK, Ubuntu, NS3, Android Studio, R Programming, GNU Octave'],
                                                                ['7. APSSDC CM’s Skill Excellence Center', 'Acer TMP 249-G2-M Laptops, Intel Core i5, 16 GB RAM, 500 GB HDD, 14" Display', 'Android Studio, Java/Kotlin SDK, Cloud Toolchains'],
                                                                ['8. Machine Learning Lab', 'Acer TMP 249-G2-M Laptops, Intel Core i5, 16 GB RAM, 500 GB HDD, 14" Display', 'TensorFlow, Keras, Octave, Scikit-learn'],
                                                            ].map((row, ri) => (
                                                                <tr key={ri} className="hover:bg-orange-50/30 transition-colors">
                                                                    <td className="px-4 py-3 font-semibold text-[#0f172a] whitespace-nowrap">
                                                                        {row[0]}
                                                                    </td>
                                                                    <td className="px-4 py-3">
                                                                        {row[1]}
                                                                    </td>
                                                                    <td className="px-4 py-3">
                                                                        {row[2]}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </DepartmentAccordionRow>
                                    </AccordionContainer>
                                </section>
                            </>
        </CampusLifeLayout>
    );
};

export default LaboratoriesPage;
