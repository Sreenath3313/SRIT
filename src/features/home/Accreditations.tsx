import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const accreditations = [
    {
        title: 'NAAC A',
        text: 'ACCREDITED',
        desc: "Accredited with Grade 'A' by the National Assessment and Accreditation Council (NAAC)",
        logo: '/optimized/naac.jpg.webp'
    },
    {
        title: 'UGC',
        text: 'AUTONOMOUS STATUS',
        desc: 'Granted Autonomous Status by University Grants Commission (UGC)',
        logo: '/optimized/UGC.jpg.webp'
    },
    {
        title: 'NBA',
        text: 'ACCREDITED PROGRAMS',
        desc: 'Programs Accredited by National Board of Accreditation (NBA)',
        logo: '/optimized/nba.jpg.webp'
    }
];

const Accreditations: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <section
            ref={ref}
            className="relative w-full overflow-hidden bg-[#FBF8F4] py-14 sm:py-20 lg:py-24"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                    backgroundImage: "url('/optimized/CollegeMain.webp.webp')",
                    maskImage: 'linear-gradient(90deg, black 0%, black 17%, transparent 42%, transparent 58%, black 83%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(90deg, black 0%, black 17%, transparent 42%, transparent 58%, black 83%, black 100%)'
                }}
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,251,246,.98)_0%,rgba(255,249,239,.91)_42%,rgba(255,247,236,.62)_100%)]" />
            {/* Restrained gold details frame the title, as in the reference. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-5 top-12 h-16 w-16 opacity-70 sm:left-8 lg:left-[8%]"
                style={{ backgroundImage: 'radial-gradient(circle, #DDBB83 2px, transparent 2.6px)', backgroundSize: '18px 18px' }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-5 top-12 h-16 w-16 opacity-70 sm:right-8 lg:right-[8%]"
                style={{ backgroundImage: 'radial-gradient(circle, #DDBB83 2px, transparent 2.6px)', backgroundSize: '18px 18px' }}
            />
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full border-[18px] border-[#D7B56F]/45 sm:-right-32 sm:-top-44 sm:h-[420px] sm:w-[420px] sm:border-[28px]" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full border-[14px] border-[#741629]/20 sm:-right-20 sm:-top-32 sm:h-[340px] sm:w-[340px] sm:border-[22px]" />

            {/* Layered lower wave echoes the burgundy and gold frame in the reference. */}
            <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[27%] min-h-[105px] w-full" viewBox="0 0 1600 260" preserveAspectRatio="none">
                <path d="M0 100 C270 10 430 120 710 145 C1030 174 1290 90 1600 16 L1600 260 L0 260 Z" fill="#6E1022" />
                <path d="M0 78 C270 0 440 103 715 128 C1035 158 1290 73 1600 0" fill="none" stroke="#D5A348" strokeWidth="13" />
                <path d="M0 157 C300 86 520 155 810 183 C1110 212 1380 145 1600 94" fill="none" stroke="#8A1A2D" strokeWidth="36" opacity=".72" />
                <path d="M0 196 C330 118 545 192 845 218 C1160 244 1400 185 1600 137" fill="none" stroke="#4D0715" strokeWidth="38" opacity=".76" />
            </svg>

            <div className="relative z-10 mx-auto w-full max-w-[2000px] px-4 sm:px-8 lg:px-12">
                <motion.header
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-8 flex flex-col items-center text-center sm:mb-9"
                >
                    <p className="text-xs font-medium uppercase tracking-[.38em] text-[#741629] sm:text-sm">
                        RECOGNIZED FOR
                    </p>
                    <h2 style={{ fontFamily: "Georgia, 'Times New Roman', serif" }} className="mt-1 text-[clamp(2.6rem,6vw,6rem)] font-bold uppercase leading-none tracking-[-.025em] text-[#741629]">
                        EXCELLENCE
                    </h2>
                    <span aria-hidden="true" className="mt-4 flex w-72 items-center justify-center gap-3 sm:mt-5">
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C99A43]" />
                        <span className="h-3 w-3 rotate-45 border-2 border-[#C99A43]" />
                        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C99A43]" />
                    </span>
                </motion.header>

                <div className="relative z-10 grid grid-cols-1 gap-5 px-1 sm:px-2 md:grid-cols-2 md:gap-x-5 md:gap-y-7 xl:grid-cols-3 xl:gap-x-6">
                    {accreditations.map((item, index) => (
                        <motion.article
                            key={item.title}
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className={`group relative min-h-[205px] pt-5 transition-transform duration-300 hover:-translate-y-1 sm:min-h-[215px] lg:min-h-[240px] ${index === 2 ? 'md:max-xl:col-span-2 md:max-xl:mx-auto md:max-xl:w-1/2' : ''}`}
                        >
                            {/* Gold beveled card silhouette, with a restrained wine-colored lower edge. */}
                            <div className="relative min-h-[185px] bg-gradient-to-br from-[#F2C66F] via-[#D7A54A] to-[#8A351C] p-[2px] drop-shadow-[0_8px_8px_rgba(82,35,16,.2)] [clip-path:polygon(4%_0,92%_0,100%_50%,92%_100%,4%_100%,0_50%)] sm:min-h-[194px] sm:[clip-path:polygon(6%_0,92%_0,100%_50%,92%_100%,6%_100%,0_50%)] lg:min-h-[214px] lg:[clip-path:polygon(8%_0,91%_0,100%_50%,91%_100%,8%_100%,0_50%)]">
                                <div className="relative flex min-h-[181px] items-stretch bg-[#FFFEFC] [clip-path:polygon(4%_0,92%_0,100%_50%,92%_100%,4%_100%,0_50%)] sm:min-h-[190px] sm:[clip-path:polygon(6%_0,92%_0,100%_50%,92%_100%,6%_100%,0_50%)] lg:min-h-[210px] lg:[clip-path:polygon(8%_0,91%_0,100%_50%,91%_100%,8%_100%,0_50%)]">
                                    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[9%] bg-gradient-to-br from-[#F4CC73] via-[#D69B37] to-[#9D542B] [clip-path:polygon(35%_0,100%_0,100%_100%,0_100%)]" />
                                    <div className="relative z-10 flex w-[35%] shrink-0 items-center justify-center border-r border-[#DCBD85] bg-white/95 px-2 py-4 sm:w-[34%] sm:px-3">
                                        <img
                                            src={item.logo}
                                            alt={item.title}
                                            className="max-h-[118px] max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:max-h-[132px]"
                                        />
                                    </div>

                                    <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center py-4 pl-3 pr-8 text-left sm:pl-4 sm:pr-10">
                                        <h3 className="text-xs font-bold uppercase leading-snug tracking-[.015em] text-[#611322] sm:text-[13px] lg:text-sm">
                                            {item.text}
                                        </h3>
                                        <p className="mt-2 text-[11px] leading-relaxed text-[#34343A] sm:text-xs lg:text-[13px]">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating numbered hexagon badge. */}
                            <span aria-hidden="true" className="absolute left-[8%] top-0 z-20 flex h-12 w-[52px] items-center justify-center bg-[#D7A54A] [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)] sm:h-[54px] sm:w-[58px]">
                                <span className="flex h-[42px] w-[46px] items-center justify-center bg-[#790F25] text-sm font-bold text-white [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)] sm:h-[48px] sm:w-[52px] sm:text-base">0{index + 1}</span>
                            </span>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Accreditations;
