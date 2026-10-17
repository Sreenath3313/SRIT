import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import AboutUsLayout from '../../features/about/components/AboutUsLayout';
import { fadeUp, stagger } from '../../features/about/animations';
import IframeWithLoader from '../../components/common/IframeWithLoader';

interface IndustryMou {
    title: string;
    sheetUrl?: string;
    description?: string;
}

const industryMous: IndustryMou[] = [
    {
        title: 'Tata Consultancy Services',
        sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSlo6KQmatHUPtsleiD9714_W2ghygL83FvVNY7sY5-5X0WaDZeyFRrSUESqi-RkLMW2bA1DW7rgfJx/pubhtml?widget=true&headers=false',
        description: 'TCS Youth Employability Program & Academic Partner'
    },
    {
        title: 'Blueprism University Academy',
        description: 'Robotic Process Automation (RPA) curriculum integration and student credentialing.'
    },
    {
        title: 'EduSkills',
        sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0Mi1aiHa-DRpQyR_VmN9CKGIrCqquC2z9PgWXQNQ-s1I7R_03nTwBtDPjvP0hIf5dRS3SZVOouo_4/pubhtml?widget=true&headers=false',
        description: 'EduSkills Foundation Center of Excellence, Virtual Internships & Global Certifications'
    },
    {
        title: 'APSSDC',
        description: 'Andhra Pradesh State Skill Development Corporation Technical Skill Programs & Certification Drives.'
    },
    {
        title: 'UiPath',
        description: 'UiPath Academic Alliance for Enterprise Automation & Intelligent Automation Training.'
    },
    {
        title: 'Virtual Labs',
        description: 'Ministry of Education (MoE) Virtual Labs Nodal Center collaboration for engineering simulation.'
    },
    {
        title: 'Cisco Networking Academy',
        description: 'CCNA, CyberOps, Python Programming, and Networking infrastructure academy courses.'
    },
    {
        title: 'Deltacons Projects (India) Pvt Ltd',
        description: 'Civil & Infrastructure engineering consultancy, site internships, and practical project design.'
    },
    {
        title: 'Microchip Academic Program',
        description: 'Embedded systems, microcontrollers, and IoT development laboratory collaboration.'
    },
    {
        title: 'NHAI',
        description: 'National Highways Authority of India (NHAI) institutional collaboration for highway design & survey.'
    },
    {
        title: 'Palo Alto Cybersecurity Academy',
        description: 'Palo Alto Networks Academy for network security, firewalls, and cloud security specialization.'
    },
    {
        title: 'AIC-SKU Confederation, Atal Incubation Centre',
        sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQqbDS13l8xRC3rnGfF3L9s1IwlJAhZYDQ7SfsgTD5rDhC8A59Rsfb6-gaOIE8H_FFzBwDIrSL6fm7f/pubhtml?widget=true&headers=false',
        description: 'Atal Incubation Centre (SKU) for student startup incubation, seed funding, and entrepreneurship.'
    },
];

const MousPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (idx: number) => {
        setOpenIndex((prev) => (prev === idx ? null : idx));
    };

    return (
        <AboutUsLayout title="MOUs & Collaborations">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
                <motion.div variants={fadeUp}>
                    <h2 className="text-3xl font-serif font-bold text-[#0A0903] mb-1 flex items-center gap-3">
                        <span className="w-1 h-8 rounded-full bg-[#FF6600] inline-block" />
                        MOU&apos;s with Industry
                    </h2>
                    <p className="text-neutral-600 mt-3 leading-relaxed text-left sm:text-justify text-sm sm:text-base">
                        The institute has entered into Memoranda of Understanding with many corporate and industrial organisations to strengthen the skill sets it provides its students. Ranging from educational material to soft skills that improve the employability of the students, these MOUs will help SRIT (s) create character-shaping and life changing training modules for students, helping them gain more success in life — as employees and as human beings.
                    </p>
                </motion.div>

                {/* 2-Column Responsive Grid matching original screenshot */}
                <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {industryMous.map((mou, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={mou.title}
                                className="border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-2xs"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleAccordion(i)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left bg-neutral-50/70 hover:bg-orange-50/40 transition-colors"
                                >
                                    <span className="text-sm sm:text-base font-bold text-neutral-900 pr-2">
                                        {mou.title}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="shrink-0"
                                    >
                                        <ChevronDown className="w-4 h-4 text-[#FF6600]" />
                                    </motion.div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden border-t border-neutral-200 bg-white p-4"
                                        >
                                            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-3">
                                                {mou.description}
                                            </p>
                                            {mou.sheetUrl && (
                                                <div className="w-full h-[360px] rounded-lg overflow-hidden border border-neutral-200 shadow-2xs">
                                                    <IframeWithLoader
                                                        src={mou.sheetUrl}
                                                        title={`${mou.title} Live Data`}
                                                        style={{ width: '100%', height: '100%' }}
                                                    />
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </AboutUsLayout>
    );
};

export default MousPage;
