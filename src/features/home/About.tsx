import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BookOpen, Landmark, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
    return <section className="overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
        <div className="section-container grid items-center gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-8 xl:gap-14">
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }} className="relative z-10">
                <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#e95a24] sm:text-xs"><span className="h-px w-7 bg-[#e95a24]" />The SRIT story</p>
                <h2 className="max-w-[580px] font-sans text-[clamp(2.5rem,4.8vw,4rem)] font-semibold leading-[1.04] tracking-[-.045em] text-[#20242b]">Education is a key enabler <span className="text-[#e95a24]">for progress.</span></h2>
                <p className="mt-6 max-w-[510px] text-[15px] leading-[1.75] text-slate-600">Established in 2007 by Founder-cum-Secretary Sri Aluru Sambasiva Reddy in memory of his mother, Smt. Aluru Narayanamma, SRIT is built on the belief that education can expand opportunity for students from rural and developing communities.</p>
                <div className="mt-7 flex flex-wrap items-center gap-4"><Link to="/about/overview" className="inline-flex h-11 items-center gap-3 bg-[#e95a24] px-5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#cf4818]">Our story <ArrowUpRight className="h-4 w-4" /></Link><Link to="/about/vision-mission" className="inline-flex h-11 items-center gap-2 px-2 text-sm font-semibold text-[#303744] transition-colors duration-300 hover:text-[#e95a24]">Vision &amp; mission <ArrowRight className="h-4 w-4" /></Link></div>
                <div className="mt-9 grid max-w-[620px] grid-cols-3 border-t border-slate-200/80 pt-5 sm:mt-10 sm:pt-6">
                    <div className="flex gap-2.5 pr-3 sm:gap-3 sm:pr-5"><Landmark className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5421]" /><div><p className="text-xs font-bold text-[#171b24] sm:text-sm">Rotarypuram</p><p className="mt-1 text-[10px] leading-relaxed text-slate-500 sm:text-xs">Anantapur district, Andhra Pradesh</p></div></div>
                    <div className="flex gap-2.5 border-l border-slate-200/80 px-3 sm:gap-3 sm:px-5"><BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5421]" /><div><p className="text-xs font-bold text-[#171b24] sm:text-sm">Engineering education</p><p className="mt-1 text-[10px] leading-relaxed text-slate-500 sm:text-xs">Seven engineering departments</p></div></div>
                    <div className="flex gap-2.5 border-l border-slate-200/80 pl-3 sm:gap-3 sm:pl-5"><UsersRound className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5421]" /><div><p className="text-xs font-bold text-[#171b24] sm:text-sm">Empowering communities</p><p className="mt-1 text-[10px] leading-relaxed text-slate-500 sm:text-xs">Opportunities for rural and developing students</p></div></div>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6, delay: .1, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto h-[390px] w-full max-w-[720px] sm:h-[500px] lg:h-[530px]">
                <span aria-hidden="true" className="absolute right-0 top-0 h-1 w-28 bg-[#e95a24] sm:w-36" />
                <div className="absolute left-0 top-[7%] h-[76%] w-[82%] overflow-hidden bg-slate-100 shadow-[0_14px_35px_rgba(23,27,36,.12)]"><img src="/College 1.jpg" alt="SRIT academic building illuminated at night" loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>
                <div className="absolute bottom-[2%] right-0 z-10 h-[43%] w-[57%] overflow-hidden border-[7px] border-white bg-slate-100 shadow-[0_14px_35px_rgba(23,27,36,.16)] sm:border-[9px]"><img src="/College 2.JPG" alt="SRIT campus grounds, buses and academic buildings" loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>
                <div className="absolute right-0 top-[29%] z-20 flex max-w-[235px] items-center gap-3 border-l-2 border-[#e95a24] bg-white px-4 py-3 text-[#20242b] shadow-[0_8px_24px_rgba(23,27,36,.10)] sm:max-w-[260px] sm:gap-4 sm:px-5"><span className="text-3xl font-semibold tracking-tight sm:text-4xl">2007</span><span className="border-l border-slate-200 pl-3 text-[9px] font-semibold uppercase leading-[1.6] tracking-[.1em] text-slate-500 sm:pl-4 sm:text-[10px]">Established in memory of Smt. Aluru Narayanamma</span></div>
            </motion.div>
        </div>
    </section>;
}
