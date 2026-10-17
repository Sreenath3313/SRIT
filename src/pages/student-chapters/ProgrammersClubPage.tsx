import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PageHeader from '../../components/common/PageHeader';
import { fadeUp, stagger } from '../../features/about/animations';
import { AccordionContainer, AccordionItem } from '../../components/common/DepartmentAccordion';
import IframeWithLoader from '../../components/common/IframeWithLoader';

const ProgrammersClubPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
            <Navbar />
            <PageHeader title="PROGRAMMERS CLUB" categoryTitle="STUDENT CHAPTERS" />
            
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
                                src="https://www.srit.ac.in/wp-content/uploads/2023/10/newlogo.jpg" 
                                alt="Programmers Club Logo" 
                                className="w-64 sm:w-[400px] h-auto object-contain"
                            loading="lazy" />
                        </div>
                    </motion.div>

                    <AccordionContainer className="w-full">
                        
                        <AccordionItem title="About Programmers Club">
                            <div className="text-neutral-700 leading-relaxed m-0 text-base space-y-4 text-justify">
                                <p className="font-semibold text-lg text-[#0A0903]">Welcome to the Programmers Club of SRIT!</p>
                                <h4 className="font-bold text-[#f67437] text-lg mt-4 mb-2">Our Journey</h4>
                                <p>
                                    Established in the year 2012, the Programmers Club has been at the forefront of promoting coding excellence, fostering innovation, and nurturing the technical talents of students from diverse branches. Over the years, we have evolved into a vibrant and dynamic community dedicated to empowering students with the skills they need to thrive in the world of technology.
                                </p>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="Objectives">
                            <div className="text-neutral-700 leading-relaxed text-base">
                                <h4 className="font-bold text-[#f67437] text-lg mb-4">Objectives:</h4>
                                <ul className="list-disc pl-5 space-y-3">
                                    <li><span className="font-semibold text-[#0A0903]">Promote Coding Excellence:</span> We believe that coding is both an art and a science. We provide a platform for students to hone their coding skills, explore programming languages, and tackle real-world challenges.</li>
                                    <li><span className="font-semibold text-[#0A0903]">Encourage Innovation:</span> Innovation is at the heart of technology. We inspire students to think outside the box, develop innovative solutions, and contribute to the ever-evolving tech landscape.</li>
                                    <li><span className="font-semibold text-[#0A0903]">Facilitate Learning:</span> Learning is a lifelong journey, and we are here to support it. We offer workshops, competitions, and resources to enhance students' technical knowledge and soft skills.</li>
                                    <li><span className="font-semibold text-[#0A0903]">Foster Collaboration:</span> Collaboration is key to success in the tech industry. We encourage teamwork, knowledge sharing, and collaboration among students from diverse academic backgrounds.</li>
                                </ul>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="What We Do">
                            <div className="text-neutral-700 leading-relaxed text-base space-y-4">
                                <p><span className="font-semibold text-[#0A0903]">Coding Challenges:</span> We organize coding challenges and hackathons that test students' problem-solving abilities, coding proficiency, and creativity. These challenges provide a platform for students to showcase their talent and win exciting prizes.</p>
                                <p><span className="font-semibold text-[#0A0903]">Quiz Competitions:</span> Our quiz competitions cover a wide range of technical topics, challenging students to stay updated with the latest trends in the tech world. It's an opportunity to test their knowledge and compete with their peers.</p>
                                <p><span className="font-semibold text-[#0A0903]">Workshops and Seminars:</span> We host workshops and seminars on emerging technologies, programming languages, and industry best practices. These sessions are led by experts and provide valuable insights to students.</p>
                                <p><span className="font-semibold text-[#0A0903]">Tech Talks:</span> Programmers Club invites industry professionals to share their experiences and expertise with students. These tech talks offer valuable career insights and networking opportunities.</p>
                                <p><span className="font-semibold text-[#0A0903]">Project Showcases:</span> We encourage students to showcase their innovative projects, whether it's a mobile app, a website, or a software solution. It's a chance to inspire others and receive constructive feedback.</p>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="Team">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vR3XvOaklMYaZuNZB4E73UBMgt9s_WwoN0JMA5qx8XqM9_ltnLIQ3JnwFArGd4yrTNJwupfhACCSEW2/pubhtml?widget=true&chrome=false&headers=false"
                                title="Team"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Activities">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTE1Lw3jFq2kaF3D6ZOWhSTtyCbO9Jajoi5j_WNM2oadiqEsXwHPJyTNuu1AZW2bGKihs-kRQJBYxyG/pubhtml?widget=true&chrome=false&headers=false"
                                title="Activities"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Contact">
                            <div className="text-neutral-700 space-y-2 m-0">
                                <h4 className="font-bold text-[#f67437] text-xl mb-4">Contact Us:</h4>
                                <p><span className="font-medium text-[#0A0903]">Mail:</span> <a href="mailto:programmerclub@srit.ac.in" className="text-[#f67437] hover:underline font-medium">programmerclub@srit.ac.in</a></p>
                            </div>
                        </AccordionItem>
                        
                    </AccordionContainer>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default ProgrammersClubPage;
