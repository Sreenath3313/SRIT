import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Users, Building, Award } from 'lucide-react';
import { placementStats } from '../../data/placements';

const statIcons = [TrendingUp, Users, Building, Award];

const recruiters = [
    'TCS', 'Cognizant', 'HCL', 'Infosys',
    'Lumen Technologies', 'Foxconn', 'Cadsys', 'Playto Labs',
    'IOpex Tech', 'Snovasys', 'INDO-MIM', 'IRMAI',
    'Calix', 'Wayvo.AI', 'IndiGrid', 'Bonito Designs'
];

const Placements: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="placements" ref={ref} className="relative bg-white py-6 text-neutral-800 lg:py-10">
            <div className="section-container relative z-10">
                <div className="grid items-center gap-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-10">
                    
                    {/* Left Side: Content & Stats */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                            className="relative z-10 pr-0 lg:pr-8"
                    >
                        <motion.div variants={itemVariants} className="mb-4 flex items-center gap-3">
                            <span className="text-neutral-500 font-bold tracking-[0.2em] text-xs uppercase">
                                PLACEMENTS @ SRIT
                            </span>
                        </motion.div>
                        <motion.h2 
                            variants={itemVariants} 
                            className="mb-4 font-serif text-[2.25rem] font-bold leading-[1.08] text-neutral-900 lg:text-[2.75rem]"
                        >
                            Building Careers, Creating Leaders
                        </motion.h2>
                        <motion.p 
                            variants={itemVariants} 
                            className="mb-6 max-w-lg text-justify text-sm leading-relaxed text-neutral-600 md:text-[15px]"
                        >
                            SRIT has an outstanding placement record with top companies recruiting our students year after year. Our dedicated Training &amp; Placement cell prepares students with industry-ready skills.
                        </motion.p>
 
                        {/* Stats Grid */}
                        <motion.div variants={itemVariants} className="mb-5 grid grid-cols-2 gap-3 lg:gap-4">
                            {placementStats.map((stat, idx) => {
                                const Icon = statIcons[idx];
                                return (
                                    <div key={idx} className="group border border-neutral-200/80 bg-white p-3.5 transition-colors duration-200 hover:border-[#FF5421]/50 sm:p-4">
                                        <Icon className="mb-2.5 h-4 w-4 text-neutral-500 transition-colors duration-200 group-hover:text-[#FF5421]" />
                                        <div className="mb-1 font-serif text-2xl font-bold leading-none text-neutral-900 lg:text-[1.65rem]">
                                            {stat.value}
                                        </div>
                                        <div className="text-neutral-800 text-xs sm:text-sm font-bold mb-1">
                                            {stat.label}
                                        </div>
                                        <div className="text-neutral-500 text-[11px] sm:text-xs">
                                            {stat.subtext}
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
 
                        <motion.a 
                            variants={itemVariants}
                            href="/placements/about-t-and-p"
                            className="inline-flex items-center gap-2 rounded-md bg-[#171b24] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF5421]"
                        >
                            Know More
                        </motion.a>
                    </motion.div>
 
                    {/* Right Side: Recruiters Grid */}
                    <motion.div 
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 , ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 border border-neutral-200 bg-white p-5 text-neutral-800 sm:p-7 lg:p-8"
                    >
                        <div className="text-center mb-8">
                            <h3 className="relative mb-3 font-serif text-xl font-bold text-neutral-900 sm:text-2xl">
                                Our Recruiters
                            </h3>
                            <div className="relative mx-auto h-[3px] w-12 rounded-full bg-[#FF5421]" />
                        </div>
 
                        <div className="relative grid grid-cols-2 gap-2 sm:grid-cols-4 lg:gap-3">
                            {recruiters.map((recruiter, idx) => (
                                <motion.div 
                                    key={recruiter}
                                    whileHover={{ y: -1, transition: { duration: .18 } }}
                                    transition={{ duration: .36, delay: Math.min(idx * .035, .5), ease: [0.22, 1, 0.36, 1] }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                    className="group relative flex min-h-[56px] cursor-default items-center justify-center overflow-hidden border border-neutral-200/80 bg-white px-2 py-2.5 text-center transition-colors duration-200 hover:border-[#FF5421]/50 hover:bg-[#FFF9F6] sm:min-h-[60px]"
                                >
                                    <span className="text-[12px] font-semibold tracking-[-.015em] text-neutral-700 transition-colors duration-200 group-hover:text-[#D94B20] sm:text-[13px]">
                                        {recruiter}
                                    </span>
                                    <span aria-hidden="true" className="absolute inset-x-4 bottom-0 h-[2px] origin-center scale-x-0 rounded-full bg-[#FF5421] transition-transform duration-300 group-hover:scale-x-100" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
                
            </div>
        </section>
    );
};

export default Placements;
