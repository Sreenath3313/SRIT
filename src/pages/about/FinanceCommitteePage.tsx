import React from 'react';
import { motion } from 'framer-motion';
import AboutUsLayout from '../../features/about/components/AboutUsLayout';
import { fadeUp, stagger } from '../../features/about/animations';
import IframeWithLoader from '../../components/common/IframeWithLoader';
import { AccordionContainer, AccordionItem } from '../../components/common/DepartmentAccordion';

const FINANCE_COMMITTEE_SHEET_1 =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbYJW5HW-VyLUW_Yh9lr4DAcO6Nw2DxyHeeezJSwafyvFq3-mqnWKe8kP6KsFU0TGBYfU_9ex5N1gN/pubhtml?widget=true&chrome=false&headers=false';

const FINANCE_COMMITTEE_SHEET_2 =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSEWpHvWy6VCXYRp2HQV9hof1tEXUimCIiPOxyvVvDPGNgWiArINxoVbevMBsh_K8Z9lb1GBt4jzEth/pubhtml?widget=true&chrome=false&headers=false';

const FinanceCommitteePage: React.FC = () => {
    return (
        <AboutUsLayout title="Finance Committee">
            <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="space-y-8"
            >
                {/* Page Heading */}
                <motion.h2
                    variants={fadeUp}
                    className="text-3xl font-serif font-bold text-[#0A0903] flex items-center gap-3"
                >
                    <span className="w-1 h-8 rounded-full bg-[#FF6600] inline-block" />
                    Finance Committee
                </motion.h2>

                {/* Dropdown Sections */}
                <motion.div
                    variants={fadeUp}
                    className="space-y-4"
                >
                    <AccordionContainer className="w-full">
                        <AccordionItem title="Members of Finance Committee" defaultOpen={true}>
                            <div className="border border-neutral-200 rounded-lg overflow-hidden">
                                <IframeWithLoader
                                    src={FINANCE_COMMITTEE_SHEET_1}
                                    title="Members of Finance Committee"
                                    style={{ height: 'clamp(300px, 50vh, 600px)' }}
                                />
                            </div>
                        </AccordionItem>

                        <AccordionItem title="Audited Statements">
                            <div className="border border-neutral-200 rounded-lg overflow-hidden">
                                <IframeWithLoader
                                    src={FINANCE_COMMITTEE_SHEET_2}
                                    title="Finance Committee Additional Details"
                                    style={{ height: 'clamp(300px, 50vh, 600px)' }}
                                />
                            </div>
                        </AccordionItem>
                    </AccordionContainer>
                </motion.div>
            </motion.div>
        </AboutUsLayout>
    );
};

export default FinanceCommitteePage;