import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PageHeader from '../../components/common/PageHeader';
import { fadeUp, stagger } from '../../features/about/animations';
import { AccordionContainer, AccordionItem } from '../../components/common/DepartmentAccordion';
import IframeWithLoader from '../../components/common/IframeWithLoader';

const IciPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
            <Navbar />
            <PageHeader title="ICI" categoryTitle="Student Chapters" />
            
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="max-w-[1300px] w-full mx-auto px-4 sm:px-5 md:px-6 py-8 lg:py-12 xl:py-16 flex-grow"
            >
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 p-6 sm:p-8 lg:p-12">
                    
                    <AccordionContainer className="w-full">
                        
                        <AccordionItem title="About ICI">
                            <div className="text-neutral-700 leading-relaxed text-base space-y-4">
                                <p>
                                    The Indian Concrete Institute (ICI) is a prominent professional organization in India, dedicated to advancing knowledge and practices in concrete technology and construction. Established in 1982 following a successful international seminar on modern concrete practices, ICI has grown substantially, boasting over 14,500 members across 47 regional centers nationwide.
                                </p>
                                <p>
                                    With a focus on disseminating knowledge, promoting concrete technology, and addressing research needs, ICI organizes various programs, including seminars, workshops, conferences, and exhibitions at both national and international levels. These events provide a platform for industry stakeholders to exchange ideas and experiences, with participation from practicing engineers, manufacturers, academics, consultants, and researchers.
                                </p>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="Vision, Mission, Objectives">
                            <div className="text-neutral-700 leading-relaxed text-base space-y-4">
                                <div>
                                    <h4 className="font-bold text-[#0A0903] text-lg mb-2">Vision:</h4>
                                    <p>The Indian Concrete Institute (ICI) Student Chapter dreams of a future where young civil engineering students are well-prepared with practical knowledge and skills for real-world applications in concrete construction.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#0A0903] text-lg mb-2 mt-4">Mission:</h4>
                                    <p>To create a community of students who are innovative and committed to sustainable construction practices, contributing to the improvement of the concrete industry.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#0A0903] text-lg mb-2 mt-4">Objectives:</h4>
                                    <ol className="list-decimal pl-5 space-y-2">
                                        <li><strong>Education:</strong> Provide students hands-on learning opportunities and training in concrete technology and construction practices so they can succeed in their careers.</li>
                                        <li><strong>Sustainability:</strong> Encourage the use of eco-friendly practices in concrete construction and explore new materials and techniques that are good for the environment and make structures stronger and longer-lasting.</li>
                                        <li><strong>Collaboration:</strong> Promote sharing ideas and working together among students, teachers, industry professionals, and others involved in concrete, both in India and abroad.</li>
                                        <li><strong>Professional Skills:</strong> Offers extra courses and activities to help students become more employable and ready for the concrete industry.</li>
                                        <li><strong>Community Involvement:</strong> Explain the significance of concrete in construction and explore ways to use it that benefit the environment.</li>
                                        <li><strong>Learning Together:</strong> Organize events like seminars and lectures so students can keep learning and stay updated on what's new in concrete construction.</li>
                                    </ol>
                                </div>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="Team Members">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRbhSTPdBGChkPT_jYOrWiBIXTzat4HnZhrhenIGvm2ECQcmxF1nWhDMKxwr05snA/pubhtml?widget=true&chrome=false&headers=false"
                                title="Team Members"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Faculty Membership List">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSid-jY5oKjzen8WzaFWVhw13YEroWnrj1VLzwCZfpV968K74gH-aoTnnuQAIRveA/pubhtml?widget=true&chrome=false&headers=false"
                                title="Faculty Membership List"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Student Membership List">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTh8jRGHScHrjiPLr19Ux77UvQ59yx_mF-Si5o_Q-0bBxGv3HIGt-DvfzFDkqgtkQ/pubhtml?widget=true&chrome=false&headers=false"
                                title="Student Membership List"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="MoM & Action Taken Report">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTQrSTbDWqw3kh2pGVkmn_x-dzvr1MU_zAQLAsKDHioqS_cir9sU9KoGDDZeLBnPw/pubhtml?widget=true&chrome=false&headers=false"
                                title="MoM & Action Taken Report"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Activities">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRif2d4t_Aymq-46V1UXeafNV-Ym7ujXlEHktiRPSTwQzxbaquVgvwugtPSa3YlHA/pubhtml?widget=true&chrome=false&headers=false"
                                title="Activities"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Contact">
                            <div className="text-neutral-700 space-y-2 m-0">
                                <p className="font-semibold text-lg text-[#0A0903]">Dr. U. Raghu Babu <span className="text-sm font-normal text-neutral-500 ml-2">M. Tech., Ph. D.</span></p>
                                <p className="text-neutral-600">Associate Professor in CIV, ICI-Students' Chapter Coordinator.</p>
                                <div className="mt-4 flex flex-col sm:flex-row sm:gap-6 gap-2 pt-2">
                                    <p><span className="font-medium text-[#0A0903]">E-mail:</span> <a href="mailto:raghubabu.ce@srit.ac.in" className="text-[#FF6600] hover:underline">raghubabu.ce@srit.ac.in</a></p>
                                    <p><span className="font-medium text-[#0A0903]">Mobile No:</span> <a href="tel:+919177964984" className="text-[#FF6600] hover:underline">+91-9177964984</a></p>
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

export default IciPage;
