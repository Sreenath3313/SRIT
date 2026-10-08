import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BookOpen, Building2, FlaskConical, GraduationCap, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { departments } from '../../data/departments';

const departmentImages: Record<string, string> = {
    cse: '/CSEDept.jpg', csm: '/CSMDept.JPG', cad: '/CSDDept.JPG', ece: '/ECE Dept.JPG',
    eee: '/EEE Dept.JPG', mec: '/MechDept.JPG', civil: '/CIVILDept.JPG', has: '/CollegeMain.jpg',
};

const programs = departments.filter((dept) => ['cse', 'csm', 'cad', 'ece', 'eee', 'mec', 'civil'].includes(dept.slug));

const features = [
    { id: 'learning', label: 'Learning', title: 'A strong foundation for what comes next.', text: 'Explore engineering disciplines grounded in core concepts, practical learning and the evolving needs of technology.', image: '/optimized/ComputerLab.webp.webp', link: '/departments', linkText: 'Explore departments', icon: BookOpen },
    { id: 'industry', label: 'Industry connect', title: 'Learning connected to the world of work.', text: 'SRIT’s Training and Placement Cell supports students through training, internships and campus recruitment activities.', image: '/optimized/College 2.JPG.webp', link: '/placements/about-t-and-p', linkText: 'Meet the T & P Cell', icon: Building2 },
    { id: 'research', label: 'Research', title: 'Curiosity, with room to build.', text: 'Research and consultancy activities across departments give students opportunities to investigate ideas and solve practical problems.', image: '/optimized/ece_lab.png.webp', link: '/committees/research-and-consultancy-cell', linkText: 'Research at SRIT', icon: FlaskConical },
    { id: 'campus', label: 'Campus', title: 'A place to learn, make and belong.', text: 'From laboratories and the central library to clubs, sports and student events, campus life extends beyond the classroom.', image: '/optimized/culturalevent.jpg.webp', link: '/campus-life/campus', linkText: 'Discover campus life', icon: Sparkles },
];

export function AnnouncementBand() {
    return <div className="bg-white border-y border-neutral-200 text-neutral-800"><div className="section-container flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-3.5"><span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[.18em] uppercase text-neutral-500"><span className="w-1.5 h-1.5 bg-primary rounded-full" />SRIT updates</span><Link to="/examination/notifications-and-results" className="group flex min-w-0 items-center gap-3 text-sm sm:text-[15px] text-neutral-700 hover:text-neutral-950"><span className="truncate">Read the latest academic and examination notifications</span><ArrowUpRight className="w-4 h-4 shrink-0 text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link><Link className="sm:ml-auto text-xs font-semibold text-neutral-500 hover:text-neutral-900" to="/examination/notifications-and-results">All notifications <span aria-hidden="true">→</span></Link></div></div>;
}

export function ProgramsDepartments() {
    const [query, setQuery] = useState('');
    const visible = useMemo(() => programs.filter((dept) => `${dept.code} ${dept.name}`.toLowerCase().includes(query.toLowerCase())), [query]);
    return <>
        <section id="programs" className="bg-white pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-16">
            <div className="section-container">
                <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-8 lg:gap-16 items-end mb-10 lg:mb-14">
                    <div><p className="text-neutral-500 text-xs font-bold tracking-[.22em] uppercase mb-4">Find your direction</p><h2 className="font-serif text-[clamp(2.25rem,5vw,4.2rem)] leading-[1.02] font-semibold text-[#171b24]">A field of study.<br /><span className="text-neutral-500">A future to shape.</span></h2></div>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5"><p className="text-neutral-600 leading-relaxed max-w-lg">Explore SRIT’s engineering departments and find the discipline that fits your interests.</p><label className="relative w-full sm:w-64 shrink-0"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search departments" aria-label="Search departments" className="w-full border-0 border-b border-neutral-300 bg-transparent py-3 pl-10 pr-4 text-sm outline-none focus:border-neutral-900 focus:ring-0" /></label></div>
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
                    {visible.map((dept, i) => <motion.div
                        key={dept.slug}
                        initial={{ opacity: 0, y: 28, scale: .97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        whileHover={{ y: -8, scale: 1.012, transition: { duration: .28, delay: 0, ease: 'easeOut' } }}
                        viewport={{ once: true, amount: .2 }}
                        transition={{ duration: .55, delay: Math.min(i * .07, .42), ease: [0.22, 1, 0.36, 1] }}
                        className="group relative isolate min-h-[280px] overflow-hidden bg-[#101722] shadow-[0_12px_32px_rgba(16,23,34,.12)] ring-1 ring-black/10 sm:min-h-[320px] xl:min-h-[340px] hover:shadow-[0_24px_55px_rgba(16,23,34,.28)]"
                    >
                        <img src={departmentImages[dept.slug] ?? dept.image} alt={`${dept.name} at SRIT`} loading="lazy" decoding="async" className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" />
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-black/15" />
                        <div className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between sm:left-6 sm:right-6 sm:top-6">
                            <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.2em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"><span className="h-px w-5 bg-[#FF5421] transition-all duration-500 group-hover:w-9" />Engineering · {dept.code}</span>
                            <span className="font-mono text-[11px] tracking-[.12em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{String(i + 1).padStart(2, '0')}</span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white sm:p-7">
                            <h3 className="max-w-md font-serif text-2xl leading-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:-translate-y-1 sm:text-[28px]">{dept.name}</h3>
                            <Link to={`/department/${dept.slug}`} className="mt-5 inline-flex items-center gap-2 border-t border-white/70 pt-3 text-sm font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] transition-colors duration-300 group-hover:text-white">
                                Explore department
                                <span className="flex h-7 w-7 items-center justify-center border border-white/35 transition-all duration-500 group-hover:border-[#FF5421] group-hover:bg-[#FF5421]"><ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                            </Link>
                        </div>
                        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-20 h-[2px] origin-left scale-x-0 bg-[#FF5421] transition-transform duration-500 group-hover:scale-x-100" />
                    </motion.div>)}
                    {visible.length === 0 && <p className="sm:col-span-2 xl:col-span-4 py-12 text-center text-neutral-500">No departments match “{query}”.</p>}
                </div>
                <Link to="/departments" className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-[#171b24] hover:text-primary">View all departments <ArrowRight className="w-4 h-4" /></Link>
            </div>
        </section>
        <WhySRIT />
    </>;
}

function WhySRIT() {
    const [active, setActive] = useState('learning');
    const item = features.find((feature) => feature.id === active) ?? features[0];
    const Icon = item.icon;
    return <section className="bg-white py-10 sm:py-12 lg:py-16">
        <div className="section-container grid items-center gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
            <div>
                <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-neutral-500"><span className="h-[2px] w-8 bg-[#FF5421]" />The SRIT experience</p>
                <h2 className="max-w-[13ch] font-serif text-[clamp(2.25rem,4vw,3.6rem)] font-semibold leading-[1.04] tracking-[-.025em] text-[#171b24]">More than a degree.<br />A place to grow.</h2>
                <p className="mt-6 max-w-md leading-relaxed text-neutral-600">Discover the people, facilities and opportunities that shape learning at Srinivasa Ramanujan Institute of Technology.</p>
                <Link to="/about/overview" className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 transition-colors hover:text-primary">About SRIT <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
            </div>

            <div className="min-w-0 rounded-2xl border border-neutral-200/80 bg-[#f7f8fa] p-3 shadow-[0_18px_50px_rgba(23,27,36,.07)] sm:p-5 lg:p-6">
                <div role="tablist" aria-label="Explore the SRIT experience" className="flex gap-1.5 overflow-x-auto rounded-xl border border-neutral-200/80 bg-white p-1.5">
                    {features.map((feature, index) => <button
                        key={feature.id}
                        id={`feature-tab-${feature.id}`}
                        role="tab"
                        aria-controls="srit-feature-panel"
                        aria-selected={active === feature.id}
                        onClick={() => setActive(feature.id)}
                        onKeyDown={(event) => {
                            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                                event.preventDefault();
                                const currentIndex = features.findIndex((x) => x.id === active);
                                const next = (currentIndex + (event.key === 'ArrowRight' ? 1 : features.length - 1)) % features.length;
                                setActive(features[next].id);
                                document.getElementById(`feature-tab-${features[next].id}`)?.focus();
                            }
                        }}
                        className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all duration-300 sm:px-4 sm:text-sm ${active === feature.id ? 'bg-[#171b24] text-white shadow-md shadow-[#171b24]/15' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'}`}
                    ><span className={`font-mono text-[9px] ${active === feature.id ? 'text-[#FF8A67]' : 'text-neutral-400'}`}>{String(index + 1).padStart(2, '0')}</span>{feature.label}</button>)}
                </div>

                <div id="srit-feature-panel" role="tabpanel" aria-labelledby={`feature-tab-${active}`} className="grid items-center gap-5 px-2 pb-2 pt-5 sm:grid-cols-[1fr_.92fr] sm:gap-7 sm:px-3 sm:pt-7">
                    <AnimatePresence mode="wait">
                        <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .32, ease: [0.22, 1, 0.36, 1] }}>
                            <div className="flex items-center gap-3 text-primary"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF5421]/10"><Icon className="h-4 w-4" /></span><span className="text-[10px] font-bold uppercase tracking-[.2em]">{item.label}</span></div>
                            <h3 className="mt-4 font-serif text-2xl leading-tight text-[#171b24] sm:text-[28px]">{item.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.text}</p>
                            <Link to={item.link} className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-neutral-800 transition-colors hover:text-primary">{item.linkText}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        <motion.div key={item.image} initial={{ opacity: 0, scale: .96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: .42, ease: [0.22, 1, 0.36, 1] }} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-200 shadow-[0_12px_28px_rgba(23,27,36,.14)]">
                            <img src={item.image} alt={`${item.label} at SRIT`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#101722]/50 via-transparent to-transparent" />
                            <span className="absolute bottom-3 left-3 text-[9px] font-bold uppercase tracking-[.18em] text-white/90">Srinivasa Ramanujan Institute of Technology</span>
                            <div className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/95 text-primary shadow-lg transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"><GraduationCap className="h-5 w-5" /></div>
                            <span aria-hidden="true" className="absolute left-0 top-0 h-1 w-16 bg-[#FF5421] transition-all duration-500 group-hover:w-28" />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    </section>;
}

export function ResearchFeature() {
    return <section className="bg-white text-[#171b24] py-10 sm:py-12 lg:py-16 overflow-hidden border-y border-neutral-200"><div className="section-container grid lg:grid-cols-[.95fr_1.05fr] items-center gap-10 lg:gap-16"><div><p className="text-neutral-500 text-xs font-bold tracking-[.22em] uppercase mb-4">Research & innovation</p><h2 className="font-serif text-[clamp(2.3rem,5vw,4rem)] leading-[1.04] font-semibold">Ideas take shape<br /><span className="text-neutral-500">through discovery.</span></h2><p className="mt-6 max-w-lg text-neutral-600 leading-relaxed">Explore research laboratories, department initiatives and the Research & Consultancy Cell at SRIT.</p><Link to="/committees/research-and-consultancy-cell" className="inline-flex items-center gap-2 mt-7 px-5 py-3 bg-[#171b24] text-white text-sm font-semibold hover:bg-primary transition-colors">Explore research <ArrowUpRight className="w-4 h-4" /></Link><div className="grid grid-cols-2 gap-4 mt-10 max-w-lg">{[{ label: 'Research & Consultancy Cell', href: '/committees/research-and-consultancy-cell' }, { label: 'Innovation & Entrepreneurship', href: '/committees/innovations-and-entrepreneurship-development-cell' }].map((x) => <Link key={x.label} to={x.href} className="border-t border-neutral-300 pt-4 text-sm text-neutral-600 hover:text-neutral-950">{x.label}<ArrowRight className="w-4 h-4 inline ml-2" /></Link>)}</div></div><div className="relative min-h-[320px] sm:min-h-[430px]"><img src="/optimized/ece_lab.png.webp" alt="Electronics and communications laboratory at SRIT" loading="lazy" className="absolute inset-0 w-[76%] h-[82%] object-cover" /><img src="/optimized/cse_lab.png.webp" alt="Computing laboratory at SRIT" loading="lazy" className="absolute right-0 bottom-0 w-[48%] h-[48%] object-cover border-[8px] sm:border-[12px] border-white" /><div className="absolute left-0 bottom-0 text-[10px] tracking-[.2em] uppercase text-neutral-500">Learning through making</div></div></div></section>;
}

export function FacilitiesFeature() {
    const cards = [{ title: 'Laboratories', image: '/optimized/ComputerLab.webp.webp', href: '/campus-life/labs' }, { title: 'Central Library', image: '/optimized/library.webp.webp', href: '/campus-life/library' }, { title: 'Student Life', image: '/optimized/culturalevent.jpg.webp', href: '/campus-life/symphony' }, { title: 'Sports & Fitness', image: '/BasketBall.JPG', href: '/campus-life/sports' }];
    return <section className="bg-white py-10 sm:py-12 lg:py-16"><div className="section-container"><div className="mb-8 flex flex-col gap-5 sm:mb-9 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-neutral-500">Study, live, belong</p><h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.7rem)] font-semibold leading-tight text-[#171b24]">A campus made for possibility.</h2></div><Link to="/campus-life/campus" className="group inline-flex items-center gap-2 text-sm font-bold text-neutral-800 transition-colors hover:text-primary">Explore campus <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link></div><div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">{cards.map((card, i) => <motion.div key={card.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .5, delay: i * .07, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -4, transition: { duration: .22 } }} className={`group relative min-h-[220px] overflow-hidden border border-neutral-200 bg-neutral-100 shadow-[0_5px_18px_rgba(23,27,36,.06)] transition-shadow duration-300 hover:shadow-[0_14px_32px_rgba(23,27,36,.14)] sm:min-h-[280px] ${i === 0 ? 'lg:col-span-2 lg:row-span-2 lg:min-h-[580px]' : ''}`}><Link to={card.href} className="absolute inset-0"><img src={card.image} alt={card.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" /><div className="absolute inset-0 bg-gradient-to-t from-[#111722]/85 via-[#111722]/10 to-transparent" /><div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#FF5421] transition-transform duration-500 group-hover:scale-x-100" /><div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white sm:inset-x-6 sm:bottom-6"><span className="font-serif text-lg leading-tight sm:text-xl lg:text-2xl">{card.title}</span><span className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/60 bg-black/10 transition-colors duration-300 group-hover:border-[#FF5421] group-hover:bg-[#FF5421]"><ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span></div></Link></motion.div>)}</div><div className="mt-5 flex justify-end sm:mt-6"><Link to="/campus-life/campus" className="text-sm text-neutral-500 transition-colors hover:text-primary">Hostels, transport and more <ArrowRight className="ml-1 inline h-4 w-4" /></Link></div></div></section>;
}
