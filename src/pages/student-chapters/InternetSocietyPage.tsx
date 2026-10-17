import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PageHeader from '../../components/common/PageHeader';
import { fadeUp, stagger } from '../../features/about/animations';
import { AccordionContainer, AccordionItem } from '../../components/common/DepartmentAccordion';
import IframeWithLoader from '../../components/common/IframeWithLoader';

const InternetSocietyPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
            <Navbar />
            <PageHeader title="Internet Society" categoryTitle="Student Chapters" />
            
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="max-w-[1300px] w-full mx-auto px-4 sm:px-5 md:px-6 py-8 lg:py-12 xl:py-16 flex-grow"
            >
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200/60 p-6 sm:p-8 lg:p-12">
                    
                    <AccordionContainer className="w-full">
                        
                        <AccordionItem title="Introduction">
                            <p className="text-neutral-700 leading-relaxed m-0 text-base">
                                The Internet Society Academic Hub at SRIT Engineering College is a dynamic initiative that fosters awareness, education, and research related to various facets of the internet and its technologies. This hub serves as a vibrant platform for students, faculty members, and researchers to collaborate, explore, and stay updated with the constantly evolving internet landscape.
                            </p>
                        </AccordionItem>

                        <AccordionItem title="Objectives">
                            <div className="text-neutral-700 leading-relaxed text-base space-y-4">
                                <p>The primary objectives of the Internet Society Academic Hub are:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>To promote awareness, education, and research in internet technologies.</li>
                                    <li>To provide a collaborative platform for students, faculty, and researchers.</li>
                                    <li>To organize workshops, seminars, webinars, and lectures on internet-related topics.</li>
                                    <li>To encourage research projects focusing on cutting-edge technologies like 5G, IoT, cloud computing, and blockchain.</li>
                                    <li>To bridge the gap between academic knowledge and real-world applications of internet technology.</li>
                                </ul>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="Team Members">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTIkXj-2N8qwM1fsXywK5_V8l9i1A82ZM0JQANnpQXCbFU8MkRWqpcz1i1jtAK_mA/pubhtml?widget=true&chrome=false&headers=false"
                                title="IS Team Members"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="IS Faculty Memberships List">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTs57QyKBtXwYFGoohpOtuGGYWvYvpKqihn9wSb6esAcq5BXsbZMHY7SVetMar44w/pubhtml?widget=true&chrome=false&headers=false"
                                title="IS Faculty Memberships List"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="IS Student Memberships List">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQyE8vRY6XV2BHTOYCxA7Ij_sodYtOUlaRBLDF-ws3QE7mA6pD5t9Y78Eb9qO44dw/pubhtml?widget=true&chrome=false&headers=false"
                                title="IS Student Memberships List"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Minutes of Meeting">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQPJg3F9cAC-gYmqu7JI8WiRhs_XWTwOTnpPRYLG-gql2aePI8mTLoDgt_21fzMEA/pubhtml?widget=true&chrome=false&headers=false"
                                title="Minutes of Meeting"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Activities">
                            <IframeWithLoader 
                                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRfKIPSxtb0UskbJJn2DFn9o5GnEvAY5uxtW7q052Z90hc3c8wQjPpLPTJgykAzyA/pubhtml?widget=true&chrome=false&headers=false"
                                title="Activities"
                                style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                            />
                        </AccordionItem>

                        <AccordionItem title="Contact">
                            <div className="text-neutral-700 space-y-2 m-0">
                                <p className="font-semibold text-lg text-[#0A0903]">Dr. P. Chitralingappa <span className="text-sm font-normal text-neutral-500 ml-2">M. Tech., Ph. D.</span></p>
                                <p className="text-neutral-600">Associate Professor in CSD, Internet Society-Students' Chapter Coordinator.</p>
                                <div className="mt-4 flex flex-col sm:flex-row sm:gap-6 gap-2 pt-2">
                                    <p><span className="font-medium text-[#0A0903]">E-mail:</span> <a href="mailto:chitralingappa.cse@srit.ac.in" className="text-[#FF6600] hover:underline">chitralingappa.cse@srit.ac.in</a></p>
                                    <p><span className="font-medium text-[#0A0903]">Mobile No:</span> <a href="tel:+919849913200" className="text-[#FF6600] hover:underline">+91-9849913200</a></p>
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

export default InternetSocietyPage;
