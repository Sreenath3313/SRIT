import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Briefcase, ArrowUpRight } from 'lucide-react';
import { alumniStories } from '../../data/alumni';

const AlumniSuccess: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="alumni" ref={ref} className="section-y-lg bg-white border-t border-neutral-200">
            <div className="section-container">

                {/* Section Header */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                className="mb-8 text-[clamp(1.8rem,5vw,3rem)] font-black leading-tight text-neutral-900 sm:mb-10 lg:mb-12"
                >
                    Alumni Success Stories
                </motion.h2>

                {/* Alumni cards retain source order and adapt from one to three columns. */}
                <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 lg:gap-8">
                    {alumniStories.map((alumni, i) => (
                        <motion.div
                            key={alumni.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
                            /* Outer wrapper — positioned so pseudo-cutouts can sit outside */
                            className="relative h-full min-w-0"
                            style={{ padding: '0' }}
                        >
                            {/*
                             * ─────────────────────────────────────────────────────────
                             *  CARD SHAPE
                             *  The card is orange-bg rounded rectangle.
                             *  Two white "bite" shapes sit over the top-left and
                             *  bottom-right corners to create the exact cutout effect
                             *  from the reference image.
                             * ─────────────────────────────────────────────────────────
                             */}
                            <div className="relative flex h-full min-h-[360px] min-w-0 flex-col overflow-hidden rounded-[24px] bg-[#FFA952]">

                                {/* ── TOP-LEFT WHITE CUTOUT ── */}
                                <div
                                    className="absolute left-0 top-0 z-10 flex h-12 w-[130px] items-center justify-center rounded-br-[24px] bg-white pb-1 pr-2"
                                >
                                    <span className="text-sm sm:text-base font-bold text-neutral-800">
                                        {alumni.batch} Batch
                                    </span>
                                </div>
                                {/* Top Edge Outer Curve */}
                                <div 
                                    className="absolute top-0 z-10 pointer-events-none left-[130px] w-[24px] h-[24px]"
                                    style={{
                                        background: 'radial-gradient(circle at 100% 100%, transparent 24px, white 24px)'
                                    }}
                                />
                                {/* Left Edge Outer Curve */}
                                <div 
                                    className="absolute left-0 z-10 pointer-events-none top-[48px] w-[24px] h-[24px]"
                                    style={{
                                        background: 'radial-gradient(circle at 100% 100%, transparent 24px, white 24px)'
                                    }}
                                />

                                {/* ── BOTTOM-RIGHT WHITE CUTOUT ── */}
                                <div
                                    className="absolute bottom-0 right-0 z-10 flex h-12 w-[140px] items-center justify-center rounded-tl-[24px] bg-white pb-1 pl-2"
                                >
                                    <a
                                        href="#"
                                        className="flex items-center justify-center gap-0.5 sm:gap-1 text-orange-700 hover:text-orange-900 font-bold text-xs sm:text-sm transition-colors"
                                    >
                                        Connect Here
                                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </a>
                                </div>
                                {/* Bottom Edge Outer Curve */}
                                <div 
                                    className="absolute bottom-0 z-10 pointer-events-none right-[140px] w-[24px] h-[24px]"
                                    style={{
                                        background: 'radial-gradient(circle at 0% 0%, transparent 24px, white 24px)'
                                    }}
                                />
                                {/* Right Edge Outer Curve */}
                                <div 
                                    className="absolute right-0 z-10 pointer-events-none bottom-[48px] w-[24px] h-[24px]"
                                    style={{
                                        background: 'radial-gradient(circle at 0% 0%, transparent 24px, white 24px)'
                                    }}
                                />

                                {/* ── CARD CONTENT (sits above the white cutouts via z-20 on individual items) */}
                                <div className="relative flex h-full min-w-0 flex-1 flex-col p-4 pt-4 sm:p-6 sm:pt-4">

                                    {/* ROW 1: Batch (inside cutout space) + Role badge */}
                                    <div className="flex items-center justify-end mb-1">
                                        {/* Top-right badge */}
                                        <div className="z-20 flex max-w-[58%] min-w-0 flex-wrap items-center justify-end gap-1.5 rounded-full bg-orange-200/70 px-2.5 py-1.5 text-right text-[11px] font-semibold leading-tight text-orange-900 sm:px-3 sm:text-xs md:text-sm">
                                            <Briefcase className="w-3.5 h-3.5" />
                                            <span className="min-w-0 break-words">{alumni.company}</span>
                                        </div>
                                    </div>

                                    {/* Existing alumni image and name */}
                                    <div className="z-20 mt-3 flex min-w-0 items-center gap-3 sm:gap-4">
                                        <img src={alumni.image} alt={alumni.name} loading="lazy" className="h-16 w-16 shrink-0 rounded-full border-2 border-white/80 object-cover shadow-sm sm:h-[76px] sm:w-[76px]" />
                                        <h3 className="min-w-0 text-xl font-bold leading-snug text-neutral-900 [overflow-wrap:anywhere] sm:text-2xl">
                                            {alumni.name}
                                        </h3>
                                    </div>

                                    {/* ROW 3: Description */}
                                    <p className="z-20 mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base">
                                        {alumni.role} driving excellence and innovation in top-tier global tech companies.
                                    </p>

                                    {/* ROW 4: Location */}
                                    <div className="z-20 mt-4 flex items-center gap-1.5 text-sm font-medium text-neutral-700 sm:mt-5 sm:text-base">
                                        <MapPin className="w-4 h-4 text-[#FF5422] shrink-0" />
                                        SRIT Alumni Network
                                    </div>

                                    {/* ROW 5: Bottom — button + register link */}
                                    <div className="z-20 mt-auto flex items-end justify-start pb-2 pt-5">
                                        {/* Bottom-left: View Details button */}
                                        <button className="bg-[#FF5422] hover:bg-[#FF5422] text-white text-xs sm:text-base font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors shadow-sm">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* "View More" link below cards — exactly as in reference image */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-10"
                >
                    <a href="#" className="inline-flex items-center gap-1.5 text-orange-700 hover:text-orange-900 font-bold text-lg md:text-xl transition-colors">
                        View More
                        <ArrowUpRight className="w-5 h-5" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
};

export default AlumniSuccess;
