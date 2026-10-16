import React from 'react';
import { motion } from 'framer-motion';
import AboutUsLayout from '../../features/about/components/AboutUsLayout';
import { fadeUp, stagger } from '../../features/about/animations';

interface ChartBoxProps {
    children: React.ReactNode;
    className?: string;
    level?: 'top' | 'branch' | 'sub';
}

const ChartBox: React.FC<ChartBoxProps> = ({
    children,
    className = '',
    level = 'branch',
}) => {
    const bgStyle =
        level === 'top'
            ? 'bg-[#FF6600] text-white border-[#d03a10] font-bold shadow-sm'
            : level === 'sub'
            ? 'bg-[#fffaf6] text-neutral-800 border-[#FF6600]/40 text-[11px] sm:text-xs font-medium hover:border-[#FF6600] shadow-xs'
            : 'bg-[#FF6600] text-white border-[#d03a10] text-xs sm:text-sm font-semibold shadow-xs';

    return (
        <div
            className={`
                px-2.5 py-1.5 sm:px-3 sm:py-2
                border rounded-md
                text-center leading-tight
                transition-all duration-200
                ${bgStyle}
                ${className}
            `}
        >
            {children}
        </div>
    );
};

const VerticalArrow: React.FC<{ length?: string }> = ({ length = 'h-5 sm:h-6' }) => (
    <div className={`flex flex-col items-center ${length}`}>
        <div className="w-[1.5px] flex-1 bg-[#d03a10]" />
        <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#d03a10]" />
    </div>
);

const OrganizationChartPage: React.FC = () => {
    return (
        <AboutUsLayout title="Organization Chart">
            <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                {/* Heading */}
                <motion.div variants={fadeUp}>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A0903] flex items-center gap-3">
                        <span className="w-1 h-6 sm:h-8 rounded-full bg-[#FF5422] inline-block" />
                        Organization Chart
                    </h2>

                    <p className="text-neutral-500 mt-2 sm:mt-3 leading-relaxed text-left sm:text-justify text-sm sm:text-base">
                        SRIT&apos;s contribution to the world of academia, especially technical academia has been recognised by the nation&apos;s finest empowering authorities.
                    </p>
                </motion.div>

                {/* Organization Chart Container */}
                <motion.div
                    variants={fadeUp}
                    className="w-full overflow-x-auto custom-scrollbar p-3 sm:p-6 bg-white border border-neutral-200 rounded-xl shadow-xs"
                >
                    <div className="min-w-[920px] max-w-5xl mx-auto py-4">

                        {/* Top Hierarchy */}
                        <div className="flex flex-col items-center">
                            {/* Chairperson */}
                            <ChartBox level="top" className="w-52 py-2 text-sm sm:text-base font-bold">
                                Chairperson
                            </ChartBox>

                            <VerticalArrow />

                            {/* Secretary */}
                            <ChartBox level="top" className="w-52 py-2 text-sm sm:text-base font-bold">
                                Secretary
                            </ChartBox>

                            <VerticalArrow />

                            {/* Principal */}
                            <ChartBox level="top" className="w-52 py-2 text-sm sm:text-base font-bold uppercase tracking-wider">
                                Principal
                            </ChartBox>

                            {/* Main Horizontal Distribution Bus */}
                            <div className="relative w-full h-8 sm:h-9 my-1">
                                {/* Horizontal trunk line spanning across all 6 columns */}
                                <div className="absolute top-0 left-[8.33%] right-[8.33%] h-[2px] bg-[#d03a10]" />

                                {/* Drop lines with arrowheads */}
                                {[8.33, 25, 41.66, 58.33, 75, 91.66].map((leftPct, i) => (
                                    <div
                                        key={i}
                                        style={{ left: `${leftPct}%` }}
                                        className="absolute top-0 -translate-x-1/2 flex flex-col items-center h-full"
                                    >
                                        <div className="w-[1.5px] h-full bg-[#d03a10]" />
                                        <div className="w-0 h-0 border-l-[3.5px] border-r-[3.5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#d03a10]" />
                                    </div>
                                ))}
                            </div>

                            {/* 6 Structural Columns */}
                            <div className="grid grid-cols-6 gap-2 sm:gap-3 w-full items-start">

                                {/* Col 1: Departments */}
                                <div className="flex flex-col items-center gap-1.5 w-full">
                                    <ChartBox level="branch" className="w-full font-bold">
                                        Departments
                                    </ChartBox>
                                    <VerticalArrow length="h-3" />
                                    <div className="flex flex-col gap-1 w-full">
                                        <ChartBox level="sub" className="w-full">Head of CE</ChartBox>
                                        <ChartBox level="sub" className="w-full">Head of EEE</ChartBox>
                                        <ChartBox level="sub" className="w-full">Head of ME</ChartBox>
                                        <ChartBox level="sub" className="w-full">Head of ECE</ChartBox>
                                        <ChartBox level="sub" className="w-full">Head of CSE</ChartBox>
                                        <ChartBox level="sub" className="w-full">Head of H &amp; S</ChartBox>
                                    </div>
                                </div>

                                {/* Col 2: Examination */}
                                <div className="flex flex-col items-center gap-1.5 w-full">
                                    <ChartBox level="branch" className="w-full font-bold">
                                        Examination Cell
                                    </ChartBox>
                                    <VerticalArrow length="h-3" />
                                    <div className="flex flex-col gap-1 w-full">
                                        <ChartBox level="sub" className="w-full font-semibold">Controller of Exams</ChartBox>
                                        <ChartBox level="sub" className="w-full">Deputy Controller</ChartBox>
                                        <ChartBox level="sub" className="w-full">Additional Controllers</ChartBox>
                                        <ChartBox level="sub" className="w-full">Confidential Section</ChartBox>
                                    </div>
                                </div>

                                {/* Col 3: Training & Administration */}
                                <div className="flex flex-col items-center gap-1.5 w-full">
                                    <ChartBox level="branch" className="w-full font-bold">
                                        Administration &amp; Accounts
                                    </ChartBox>
                                    <VerticalArrow length="h-3" />
                                    <div className="flex flex-col gap-1 w-full">
                                        <ChartBox level="sub" className="w-full">Administrative Officer</ChartBox>
                                        <ChartBox level="sub" className="w-full">Accounts Officer</ChartBox>
                                        <ChartBox level="sub" className="w-full">Establishment Section</ChartBox>
                                        <ChartBox level="sub" className="w-full">Maintenance In-Charge</ChartBox>
                                    </div>
                                </div>

                                {/* Col 4: Academic & Student Activities */}
                                <div className="flex flex-col items-center gap-1.5 w-full">
                                    <ChartBox level="branch" className="w-full font-bold">
                                        Academic &amp; Student Affairs
                                    </ChartBox>
                                    <VerticalArrow length="h-3" />
                                    <div className="flex flex-col gap-1 w-full">
                                        <ChartBox level="sub" className="w-full">Dean / Incharge Academics</ChartBox>
                                        <ChartBox level="sub" className="w-full">Physical Director</ChartBox>
                                        <ChartBox level="sub" className="w-full">Committees &amp; Student Support</ChartBox>
                                        <div className="grid grid-cols-2 gap-1 w-full">
                                            <ChartBox level="sub" className="w-full px-1">NSS</ChartBox>
                                            <ChartBox level="sub" className="w-full px-1">NCC</ChartBox>
                                        </div>
                                    </div>
                                </div>

                                {/* Col 5: IQAC & R&D */}
                                <div className="flex flex-col items-center gap-1.5 w-full">
                                    <ChartBox level="branch" className="w-full font-bold">
                                        IQAC &amp; R&amp;D
                                    </ChartBox>
                                    <VerticalArrow length="h-3" />
                                    <div className="flex flex-col gap-1 w-full">
                                        <ChartBox level="sub" className="w-full">Director / Coordinator IQAC</ChartBox>
                                        <ChartBox level="sub" className="w-full">R&amp;D Cell Coordinator</ChartBox>
                                        <ChartBox level="sub" className="w-full">Boys &amp; Girls Hostels</ChartBox>
                                    </div>
                                </div>

                                {/* Col 6: T&P and Library */}
                                <div className="flex flex-col items-center gap-1.5 w-full">
                                    <ChartBox level="branch" className="w-full font-bold">
                                        Placement &amp; Library
                                    </ChartBox>
                                    <VerticalArrow length="h-3" />
                                    <div className="flex flex-col gap-1 w-full">
                                        <ChartBox level="sub" className="w-full font-semibold">Training &amp; Placement Officer</ChartBox>
                                        <ChartBox level="sub" className="w-full">Librarian / Central Library</ChartBox>
                                        <ChartBox level="sub" className="w-full">Digital Library &amp; NDLI</ChartBox>
                                    </div>
                                </div>
                            </div>

                            {/* Base Staff Footer Bus */}
                            <div className="relative w-full mt-8 pt-6">
                                <div className="absolute top-0 left-[20%] right-[20%] h-[2px] bg-[#d03a10]" />

                                {[30, 50, 70].map((leftPct, i) => (
                                    <div
                                        key={i}
                                        style={{ left: `${leftPct}%` }}
                                        className="absolute top-0 -translate-x-1/2 flex flex-col items-center h-6"
                                    >
                                        <div className="w-[1.5px] h-full bg-[#d03a10]" />
                                        <div className="w-0 h-0 border-l-[3.5px] border-r-[3.5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#d03a10]" />
                                    </div>
                                ))}

                                <div className="flex justify-center gap-3 sm:gap-6 w-full max-w-2xl mx-auto">
                                    <ChartBox level="branch" className="flex-1 py-2 font-bold">
                                        Teaching Staff
                                    </ChartBox>
                                    <ChartBox level="branch" className="flex-1 py-2 font-bold">
                                        Technical Staff
                                    </ChartBox>
                                    <ChartBox level="branch" className="flex-1 py-2 font-bold">
                                        Supporting Staff
                                    </ChartBox>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AboutUsLayout>
    );
};

export default OrganizationChartPage;
