import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PageHeader from '../../components/common/PageHeader';
import { fadeUp, stagger } from '../../features/about/animations';
import { AccordionContainer, AccordionItem } from '../../components/common/DepartmentAccordion';
import IframeWithLoader from '../../components/common/IframeWithLoader';

const NdliClubPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
            <Navbar />
            <PageHeader title="NDLI CLUB" categoryTitle="STUDENT CHAPTERS" />
            
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="max-w-[1300px] w-full mx-auto px-4 sm:px-5 md:px-6 py-8 lg:py-12 xl:py-16 flex-grow"
            >
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 p-6 sm:p-8 lg:p-12">

                    <AccordionContainer className="w-full">
                        
                        <AccordionItem title="About NDLI">
                            <div className="text-neutral-700 leading-relaxed m-0 text-base space-y-4 text-justify">
                                <p>
                                    The National Digital Library of India (NDLI) Club is a dynamic and vibrant community that serves as a catalyst for holistic education and personal development. Rooted in the mission of the NDLI, these clubs are established within institutes and nodal bodies to create an immersive environment for students to expand their horizons beyond the confines of the traditional curriculum.
                                </p>
                                <p>
                                    NDLI Clubs are more than just spaces; they are nurturing hubs of exploration, innovation, and collaboration. These clubs provide a platform for students to engage in a diverse range of activities, events, and initiatives that foster the acquisition of knowledge, skills, and qualities essential for their professional and personal growth. Through a carefully curated blend of learning experiences, the NDLI Clubs empower students to become well-rounded individuals poised to excel in their chosen fields.
                                </p>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="Objectives">
                            <div className="text-neutral-700 leading-relaxed text-base text-justify">
                                <p>
                                    NDLI Clubs are established within institutes and nodal bodies. These Clubs organize events aimed at enabling students to cultivate knowledge, skills, and attributes that extend beyond the standard curriculum, thereby enhancing their advancement in their respective professional fields.
                                </p>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="NDLI Club Team">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRSNsNz9Np8sjT469J_d39FBuMwGOZ5nNI8J77-ZnuCIDaVqVuwNSUePLjpo8Efk2hiKGtZKZGpcx6N/pubhtml?widget=true&chrome=false&headers=false"
                                title="NDLI Club Team"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="NDLI Events Organized">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRtGEf_IEOfv2qLQ1FSufGy-m-XW60jAjZ-dUNtcnIt0sTLt-5BHxcCuiIFlmD3U4MKdf6046jJKnhS/pubhtml?widget=true&chrome=false&headers=false"
                                title="NDLI Events Organized"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Minutes of Meeting of NDLI">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTjOgtErCNtSb0a05VVFu6KvMY3ZKX4p6iv6GECFZfxvPNxhtBYQUuOoaDa7aBzoWZ6DyxLvt2Po0cT/pubhtml?widget=true&chrome=false&headers=false"
                                title="Minutes of Meeting of NDLI"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Contact Us">
                            <div className="text-neutral-700 space-y-2 m-0">
                                <p className="font-semibold text-lg text-[#0A0903]">Dr. S. Lakshmi <span className="text-sm font-normal text-neutral-500 ml-2">,</span></p>
                                <p className="text-neutral-600">Librarian</p>
                                <div className="mt-4 flex flex-col sm:flex-row sm:gap-6 gap-2 pt-2">
                                    <p><span className="font-medium text-[#0A0903]">Mail:</span> <a href="mailto:librarian.hs@srit.ac.in" className="text-[#f67437] hover:underline">librarian.hs@srit.ac.in</a></p>
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

export default NdliClubPage;
