import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BookOpen, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
    return <section className="overflow-hidden bg-white pb-8 pt-10 sm:pb-10 sm:pt-14 lg:pb-12 lg:pt-16">
        <div className="section-container grid items-center gap-10 lg:grid-cols-[.94fr_1.06fr] lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}>
                <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-[#FF5421]"><span className="h-[2px] w-8 bg-[#FF5421]" />The SRIT story</p>
                <h2 className="font-serif text-[clamp(2.35rem,5vw,4.3rem)] font-semibold leading-[1.02] tracking-[-.025em] text-[#171b24]">Education is a key enabler <span className="text-[#FF5421]">for progress.</span></h2>
                <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-neutral-600">Established in 2007 by Founder-cum-Secretary Sri Aluru Sambasiva Reddy in memory of his mother, Smt. Aluru Narayanamma, SRIT is built on the belief that education can expand opportunity for students from rural and developing communities.</p>
                <div className="mt-7 flex flex-wrap gap-3"><Link to="/about/overview" className="inline-flex h-12 items-center gap-3 bg-[#FF5421] px-5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#DD4700]">Our story <ArrowUpRight className="h-4 w-4" /></Link><Link to="/about/vision-mission" className="inline-flex h-12 items-center gap-2 px-3 text-sm font-semibold text-[#303744] transition-colors duration-300 hover:text-[#FF5421]">Vision & mission <ArrowRight className="h-4 w-4" /></Link></div>
                <div className="mt-10 grid max-w-lg grid-cols-2 gap-5 border-t border-neutral-200 pt-5"><div className="flex gap-3"><Landmark className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div><p className="text-sm font-bold text-[#171b24]">Rotarypuram</p><p className="mt-1 text-xs text-neutral-500">Anantapur district, Andhra Pradesh</p></div></div><div className="flex gap-3"><BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div><p className="text-sm font-bold text-[#171b24]">Engineering education</p><p className="mt-1 text-xs text-neutral-500">Seven engineering departments</p></div></div></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6, delay: .1 , ease: [0.22, 1, 0.36, 1] }} className="relative min-h-[380px] bg-[#FFFFFF] sm:min-h-[500px]">
                <span aria-hidden="true" className="absolute right-0 top-0 h-1.5 w-28 bg-[#FF5421] sm:w-40" />
                <div className="absolute left-0 top-0 h-[82%] w-[83%] overflow-hidden border border-white bg-neutral-100 shadow-[0_18px_40px_rgba(23,27,36,.12)]"><img src="/College 1.jpg" alt="SRIT academic building illuminated at night" loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>
                <div className="absolute bottom-0 right-0 h-[47%] w-[48%] overflow-hidden border-[8px] border-white bg-neutral-100 shadow-[0_18px_40px_rgba(23,27,36,.16)] sm:border-[12px]"><img src="/College 3.JPG" alt="SRIT building and institute sign beneath the sky" loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>
                <div className="absolute bottom-[52%] right-0 flex max-w-[190px] items-center gap-3 border-l-[3px] border-primary bg-white px-4 py-4 text-[#171b24] shadow-[0_12px_34px_rgba(20,24,32,.12)] sm:max-w-[220px] sm:px-5"><span className="font-serif text-3xl font-semibold">2007</span><span className="text-[10px] font-bold uppercase tracking-[.12em] leading-relaxed text-neutral-600">Established in memory of Smt. Aluru Narayanamma</span></div>
                <span className="absolute bottom-4 left-0 text-[9px] font-bold uppercase tracking-[.2em] text-neutral-500">Srinivasa Ramanujan Institute of Technology</span>
            </motion.div>
        </div>
    </section>;
}
