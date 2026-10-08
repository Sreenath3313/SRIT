import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const accreditations = [
    { 
        title: 'NAAC A', 
        text: 'Accredited', 
        desc: "Accredited with Grade 'A' by National Assessment and Accreditation Council (NAAC)",
        logo: '/optimized/naac.jpg.webp' 
    },
    { 
        title: 'UGC', 
        text: 'Autonomous Status', 
        desc: 'Granted Autonomous Status by University Grants Commission (UGC)',
        logo: '/optimized/UGC.jpg.webp' 
    },
    { 
        title: 'NBA', 
        text: 'Accredited Programs', 
        desc: 'Programs Accredited by National Board of Accreditation (NBA)',
        logo: '/optimized/nba.jpg.webp' 
    }
];

const Accreditations: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

        return (
        <div ref={ref} className="flex h-full w-full flex-col bg-white py-3">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 flex flex-col items-center sm:mb-10"
            >
                <div className="flex w-full items-center justify-center gap-5">
                    <span className="h-px flex-1 max-w-[220px] bg-gradient-to-r from-transparent to-neutral-200" />
                    <p className="text-xs font-semibold uppercase tracking-[.32em] text-[#FF5421] sm:text-sm">Recognized for</p>
                    <span className="h-px flex-1 max-w-[220px] bg-gradient-to-l from-transparent to-neutral-200" />
                </div>
                <h3 className="mt-1 text-[clamp(2rem,4vw,3.25rem)] font-black uppercase leading-none tracking-[-.035em] text-[#171b24]">Excellence</h3>
                <span aria-hidden="true" className="mt-3 h-[4px] w-16 rounded-full bg-[#FF5421]" />
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:flex-1 md:grid-cols-3">
                {accreditations.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 14 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.15 , ease: [0.22, 1, 0.36, 1] }}
                        className="group relative flex min-h-[350px] min-w-0 flex-col items-center overflow-hidden rounded-[20px] border border-neutral-200/70 border-b-2 border-b-[#FF5421]/55 bg-white px-5 pb-7 pt-6 text-center shadow-[0_8px_24px_rgba(23,27,36,.035)] transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-200 hover:shadow-[0_14px_30px_rgba(23,27,36,.07)] sm:px-6"
                    >
                        <span aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border-[22px] border-[#FFF8F4] transition-transform duration-500 ease-out group-hover:scale-105" />
                        <span aria-hidden="true" className="pointer-events-none absolute right-6 top-20 h-20 w-20 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,84,33,.3) 1.25px, transparent 1.5px)', backgroundSize: '14px 14px' }} />
                        <span className="absolute left-5 top-5 z-10 inline-flex h-12 min-w-12 items-center justify-center rounded-xl bg-[#FFF7F2] px-2 text-lg font-extrabold text-[#FF5421]">0{index + 1}</span>
                        <div className="relative z-10 mt-8 flex h-36 w-full max-w-[290px] items-center justify-center sm:h-40">
                            <motion.img
                                src={item.logo}
                                alt={item.title}
                                className="max-h-[132px] max-w-[250px] object-contain transition-transform duration-500 ease-out group-hover:scale-105 sm:max-h-[145px] sm:max-w-[270px]"
                            />
                        </div>

                        <span aria-hidden="true" className="relative z-10 mt-2 h-1 w-10 rounded-full bg-[#FF5421] transition-all duration-300 group-hover:w-16" />
                        <div className="relative z-10 mt-3 flex min-w-0 flex-1 flex-col items-center gap-2">
                            <h4 className="text-base font-extrabold tracking-[.04em] text-[#171b24] uppercase transition-colors duration-300 group-hover:text-[#FF5421] sm:text-lg">
                                {item.text}
                            </h4>
                            <p className="max-w-sm text-[13px] font-medium leading-relaxed text-neutral-600 sm:text-sm">
                                {item.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Accreditations;
