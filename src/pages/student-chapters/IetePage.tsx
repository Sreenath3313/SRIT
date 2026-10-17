import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PageHeader from '../../components/common/PageHeader';
import { fadeUp, stagger } from '../../features/about/animations';
import { AccordionContainer, AccordionItem } from '../../components/common/DepartmentAccordion';
import IframeWithLoader from '../../components/common/IframeWithLoader';

const IetePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
            <Navbar />
            <PageHeader title="IETE" categoryTitle="Student Chapters" />
            
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="max-w-[1300px] w-full mx-auto px-4 sm:px-5 md:px-6 py-8 lg:py-12 xl:py-16 flex-grow"
            >
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 p-6 sm:p-8 lg:p-12">
                    
                    <AccordionContainer className="w-full">
                        
                        <AccordionItem title="About IETE">
                            <p className="text-neutral-700 leading-relaxed m-0 text-base">
                                The Institution of Electronics and Telecommunication Engineers (IETE) is a premier professional society in India. It promotes the advancement of electronics, telecommunications, and related fields. Established in 1953, it offers various academic programs, certifications, and conferences. IETE fosters networking among professionals and provides a platform for knowledge exchange. With a focus on research and innovation, it contributes significantly to technological development. Its members span academia, industry, and government sectors, driving progress in the realm of electronics and telecommunications.
                            </p>
                        </AccordionItem>

                        <AccordionItem title="Vision & Mission">
                            <p className="text-neutral-700 leading-relaxed m-0 text-base">
                                To inspire excellence & innovation in all fields, and to empower students through knowledge, skills, growth opportunities, and fostering a learning environment.
                            </p>
                        </AccordionItem>

                        <AccordionItem title="Team Members">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTad1ORhJahwlOk5geJm4jmwYfNPA_D6TKHyiskpIrxlpCJiGWvouVR1WFI9cUKsQ/pubhtml?widget=true&chrome=false&headers=false"
                                title="Team Members"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Objectives">
                            <div className="text-neutral-700 leading-relaxed text-base space-y-4">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>To plan and organize technical programs and activities such as Expert lectures, workshops, seminars for the benefit of student members on a regular basis.</li>
                                    <li>To provide a common platform for the student members to exchange ideas and information on the topics of their interest e.g. Project Design, employment / higher educational opportunities, emerging trends, personality development etc.</li>
                                    <li>To facilitate technical visits / practical training / project work of the enrolled students in R&D laboratories, industries, academic institutions etc.</li>
                                    <li>To serve as a nodal point at the institution on all aspects of professional development of the student members.</li>
                                </ul>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="IETE Faculty Membership">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQc_hV6EIfOKNqqlfoKo0qCft_rnwPu6ZU-_X4ydPV556FpUXDKF6X6FJN-SYPZBA/pubhtml?widget=true&chrome=false&headers=false"
                                title="IETE Faculty Membership"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="IETE Student Memberships">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTnJtb5KwvT8wvXIH19b8oN5mb3ISSxAWri01HTF-sWSHeUdZfGpUxLQFsQO-xNVQ/pubhtml?widget=true&chrome=false&headers=false"
                                title="IETE Student Memberships"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Minutes Of Meeting & Action taken Report">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRhZwej5i_WaiNSv5r9oHxsmykYVXBfbHqC9yduY2qydjgN5vxY0A53GZuNdhSNlg/pubhtml?widget=true&chrome=false&headers=false"
                                title="Minutes Of Meeting"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Activities">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRuoH1t8ro7-MdCcpUW5tArSdVTRw_Ebo5G2_Sl1qGp6jg3gt20rPrUCJIwELB6_A/pubhtml?widget=true&chrome=false&headers=false"
                                title="Activities"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Contact">
                            <div className="text-neutral-700 space-y-2 m-0">
                                <p className="font-semibold text-lg text-[#0A0903]">Rami Reddy <span className="text-sm font-normal text-neutral-500 ml-2">M. Tech., (Ph. D)</span></p>
                                <p className="text-neutral-600">Assistant Professor in ECE, IETE-Students' Chapter Coordinator.</p>
                                <div className="mt-4 flex flex-col sm:flex-row sm:gap-6 gap-2 pt-2">
                                    <p><span className="font-medium text-[#0A0903]">E-mail:</span> <a href="mailto:ramireddy.ece@srit.ac.in" className="text-[#f67437] hover:underline">ramireddy.ece@srit.ac.in</a></p>
                                    <p><span className="font-medium text-[#0A0903]">Mobile No:</span> <a href="tel:+919491853612" className="text-[#f67437] hover:underline">+91-9491853612</a></p>
                                </div>
                            </div>
                        </AccordionItem>
                        
                    </AccordionContainer>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default IetePage;
