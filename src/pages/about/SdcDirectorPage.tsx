import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Mail, Phone } from 'lucide-react';
import AboutUsLayout from '../../features/about/components/AboutUsLayout';
import { fadeUp, stagger, slideLeft } from '../../features/about/animations';

const SdcDirectorPage: React.FC = () => {
    return (
        <AboutUsLayout title="Director, Software Development Centre">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">
                {/* Profile Top Card */}
                <div className="flex flex-col lg:flex-row gap-8 items-start bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
                    {/* Portrait Frame */}
                    <motion.div variants={slideLeft} className="w-full lg:w-[320px] shrink-0 space-y-4">
                        <div className="relative group">
                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#FF5422] to-amber-500 blur-sm opacity-30 group-hover:opacity-50 transition-opacity" />
                            <div className="relative aspect-4/5 rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-neutral-100 flex items-center justify-center">
                                <img
                                    src="/optimized/Faculty/SDC_Director.jpg"
                                    alt="Prof. A. Suresh Babu"
                                    className="w-full h-full object-cover object-top"
                                    onError={(e) => {
                                        // Fallback if image not directly at this path
                                        (e.target as HTMLImageElement).src = '/optimized/principal.jpg.webp';
                                    }}
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#0A0903] to-neutral-800 rounded-xl p-4 text-center shadow-md text-white">
                            <h3 className="font-bold text-lg text-white">Prof. A. Suresh Babu</h3>
                            <p className="text-[#FF5422] text-xs sm:text-sm font-semibold mt-1">Director, Software Development Centre</p>
                            <p className="text-neutral-400 text-xs mt-0.5">JNTUA Ananthapuramu</p>
                            <span className="inline-block mt-2 px-2.5 py-0.5 bg-orange-500/20 text-orange-300 text-[11px] font-medium rounded-full border border-orange-500/30">
                                Nominated Member by APSCHE
                            </span>
                        </div>
                    </motion.div>

                    {/* Bio & Details */}
                    <motion.div variants={fadeUp} className="flex-1 space-y-5">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="h-5 w-1.5 rounded-full bg-[#FF5422]" />
                                <span className="text-xs font-bold uppercase tracking-wider text-[#FF5422]">Leadership &amp; Governance</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 leading-tight">
                                Director — Software Development Centre (SDC)
                            </h2>
                            <p className="text-sm font-medium text-neutral-500 mt-1">
                                Jawaharlal Nehru Technological University Anantapur (JNTUA) &amp; SRIT Governing Body Member
                            </p>
                        </div>

                        <div className="prose prose-neutral max-w-none text-neutral-700 text-sm sm:text-base leading-relaxed space-y-4">
                            <p>
                                <strong className="text-neutral-900 font-bold">Prof. A. Suresh Babu</strong> serves as the distinguished <strong className="text-[#FF5422]">Director of Software Development Centre (SDC)</strong> at Jawaharlal Nehru Technological University Anantapur (JNTUA) and represents the Andhra Pradesh State Council of Higher Education (<strong className="text-[#FF5422]">APSCHE</strong>) on the Governing Body of Srinivasa Ramanujan Institute of Technology.
                            </p>
                            <p>
                                With decades of academic, administrative, and industry-oriented technology leadership, Prof. Suresh Babu has played a pivotal role in spearheading digital transformation initiatives, e-governance solutions, software architecting, and institutional capacity-building across affiliated universities and engineering colleges in Andhra Pradesh.
                            </p>
                            <p>
                                As an esteemed member of the SRIT Governing Body nominated by APSCHE, he actively guides the institution&apos;s strategic roadmap in computing education, industry-academia research collaborations, software innovations, and standard operating policies.
                            </p>
                        </div>

                        {/* Highlight Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-100 flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-[#FF5422] text-white shrink-0 mt-0.5">
                                    <GraduationCap size={18} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-neutral-900 uppercase">Affiliation</h4>
                                    <p className="text-xs text-neutral-700 mt-0.5 font-medium">Director, SDC, JNTUA</p>
                                </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-neutral-800 text-white shrink-0 mt-0.5">
                                    <Award size={18} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-neutral-900 uppercase">Board Designation</h4>
                                    <p className="text-xs text-neutral-700 mt-0.5 font-medium">Governing Body (Nominated by APSCHE)</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AboutUsLayout>
    );
};

export default SdcDirectorPage;
