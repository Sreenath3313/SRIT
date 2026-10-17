import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PageHeader from '../../components/common/PageHeader';
import { fadeUp, stagger } from '../../features/about/animations';
import { AccordionContainer, AccordionItem } from '../../components/common/DepartmentAccordion';
import IframeWithLoader from '../../components/common/IframeWithLoader';

const ToastmastersPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
            <Navbar />
            <PageHeader title="TOASTMASTERS INTERNATIONAL CLUB" categoryTitle="STUDENT CHAPTERS" />
            
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="max-w-[1300px] w-full mx-auto px-4 sm:px-5 md:px-6 py-8 lg:py-12 xl:py-16 flex-grow"
            >
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 p-6 sm:p-8 lg:p-12">
                    
                    <motion.div variants={fadeUp} className="w-full flex justify-center mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                            <img 
                                src="https://www.srit.ac.in/wp-content/uploads/2022/01/toastmasters-logo-for-main-image.png" 
                                alt="Toastmasters International Club Logo" 
                                className="w-64 sm:w-[500px] h-auto object-contain"
                            loading="lazy" />
                        </div>
                    </motion.div>

                    <AccordionContainer className="w-full">
                        
                        <AccordionItem title="Our Vision">
                            <div className="text-neutral-700 leading-relaxed m-0 text-base space-y-4">
                                <h3 className="text-[#FF6600] font-bold text-xl mb-2">Core Values:</h3>
                                <p className="text-justify">
                                    Toastmasters International is a non-profit educational organization that teaches public speaking and leadership skills through a worldwide network of clubs. Headquartered in Englewood, Colo., the organization's membership exceeds 300,000 in more than 15,800 clubs in 149 countries. Since 1924, Toastmasters International has helped people from diverse backgrounds become more confident speakers, communicators, and leaders.
                                </p>
                                <h4 className="text-[#FF6600] font-bold text-2xl mt-6 mb-2">Vision:</h4>
                                <p className="italic text-lg">
                                    To be the first-choice provider of dynamic, high-value, experiential communication and leadership skills development.
                                </p>
                                <p className="text-justify">
                                    Toastmasters International empowers people to achieve their full potential and realize their dreams. Through our member clubs, people throughout the world can improve their communication and leadership skills, and find the courage to change.
                                </p>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="Our Mission">
                            <div className="text-neutral-700 leading-relaxed text-base space-y-6">
                                <div>
                                    <h4 className="font-bold text-[#FF6600] text-lg mb-2">Toast Masters International Mission:</h4>
                                    <p>We empower individuals to become more effective communicators and leaders.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#FF6600] text-lg mb-2">District Mission:</h4>
                                    <p>We build new clubs and support all clubs in achieving excellence.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#FF6600] text-lg mb-2">Club Mission:</h4>
                                    <p>We provide a supportive and positive learning experience in which members are empowered to develop communication and leadership skills, resulting in greater self-confidence and personal growth.</p>
                                </div>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="Objectives">
                            <div className="text-neutral-700 leading-relaxed text-base">
                                <h4 className="font-bold text-[#FF6600] text-lg mb-4">OBJECTIVES:</h4>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Build self-confidence; both personal and professional.</li>
                                    <li>Learn to plan and run effective, efficient meetings.</li>
                                    <li>Foster initiative and "pro-active" thinking within the organization.</li>
                                    <li>Improve communication to be clear and concise.</li>
                                    <li>Promote leadership qualities within the business and community.</li>
                                    <li>Develop and polish networking, sales and marketing skills.</li>
                                    <li>Enhance the ability to listen and evaluate objectively.</li>
                                    <li>Accomplishments create and sustain a winning attitude.</li>
                                </ul>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="Ex-Com Members">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQKzJ60_jqh0nKlGAB8Z8WybD4vqkfDqIS-Ikzdq7aqTnQap_jgWSYi1GmPcCFjkAG3nrUXv81rqyaD/pubhtml?widget=true&chrome=false&headers=false"
                                title="Ex-Com Members"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="MOM">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSsEt2moyYVW_h-Z4SLavbtEj2qeKAIUOumOgJmV9-f2C5IfnBXJ7yh_eW52F_YYWA2Ecm6XYg1x11k/pubhtml?widget=true&chrome=false&headers=false"
                                title="MOM"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Activities">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSg40gtUGWVUlwPQOv2K0GrGmepXIUgJTT27g-Sl5Qytqxdg2mS_b-hyJoWsStXQDlRRTO0R8fYJZ2X/pubhtml?widget=true&chrome=false&headers=false"
                                title="Activities"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Awards">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTixGoxmYra_sRJvowDs6pq9BqarEDV0OAIZ4zRat4GFIDbu1hVcsy6-NS40JgqqqTE5-Ebx2YlwRuY/pubhtml?widget=true&chrome=false&headers=false"
                                title="Awards"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Pathways">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTkXimcg1By55GFTAiyU-uXUGJEdn2kIeQBcH2VI4kx6TibORDTkG0n7NAeCiGYu7Kd3ETmwQW0vnhQ/pubhtml?widget=true&chrome=false&headers=false"
                                title="Pathways"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Contact">
                            <div className="text-neutral-700 space-y-4 m-0">
                                <h4 className="font-bold text-[#FF6600] text-xl mb-4">Contact Us:</h4>
                                <div>
                                    <p className="font-semibold text-lg text-[#FF6600]">Dr. D. Anil Kumar <span className="text-neutral-500 text-sm ml-1 font-normal">,</span></p>
                                    <p className="text-neutral-600">Associate Professor of English, Srinivasa Ramanujan Institute of Technology,</p>
                                    <p className="text-neutral-600">Rotarypuram, Anantapuramu-515701.</p>
                                </div>
                                <div className="mt-4 flex flex-col sm:flex-row sm:gap-6 gap-2 pt-2">
                                    <p><span className="font-medium text-[#0A0903]">Mail:</span> <a href="mailto:anilkumar.hs@srit.ac.in" className="text-[#FF6600] hover:underline">anilkumar.hs@srit.ac.in</a></p>
                                    <p><span className="font-medium text-[#0A0903]">Mobile No:</span> <a href="tel:+918778004869" className="text-[#FF6600] hover:underline">+91-8778004869</a></p>
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

export default ToastmastersPage;
