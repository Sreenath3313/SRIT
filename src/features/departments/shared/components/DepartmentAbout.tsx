import React from 'react';
import { Mail, Phone, MapPin, Award, Users, Microscope, GraduationCap, Briefcase } from 'lucide-react';
import type { DepartmentData } from '../../index';

interface DepartmentAboutProps {
    dept: DepartmentData;
}

const DepartmentAbout: React.FC<DepartmentAboutProps> = ({ dept }) => {
    return (
        /* ── Generic Layout for Other Departments ── */
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="space-y-10">
                <div>
                    <h2 className="mb-6 flex flex-wrap items-center gap-3 font-serif text-2xl font-bold uppercase tracking-tight text-neutral-dark sm:gap-4 sm:text-3xl lg:text-4xl">
                        <span aria-hidden="true" className="h-[3px] w-10 rounded-full bg-primary" />
                        ABOUT US
                    </h2>

                    <div className={`mt-6 mb-8 flex flex-col lg:flex-row ${dept.slug === 'mec' ? 'items-start gap-6' : 'overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-md'}`}>
                        <div className={`relative h-[260px] sm:h-[320px] lg:h-[360px] lg:w-4/12 lg:shrink-0 overflow-hidden ${dept.slug === 'mec' ? 'self-start rounded-xl shadow-md' : 'self-center'}`}>
                            <img src={dept.image} alt={dept.name} className="w-full h-full object-cover" loading="lazy" />
                            <span className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-md text-primary text-[10px] font-bold tracking-[0.2em] uppercase rounded shadow-sm">
                                Featured Program
                            </span>
                            <span className="absolute top-4 right-4 text-white/80 font-serif text-2xl font-bold">
                                {dept.code}
                            </span>
                        </div>
                        <div className={`flex flex-col justify-center lg:w-7/12 p-6 lg:p-10 ${dept.slug === 'mec' ? 'rounded-xl border border-neutral-100 bg-white shadow-md' : ''}`}>
                            <h3 className="font-serif text-xl lg:text-2xl font-bold text-neutral-dark mb-3">{dept.name}</h3>
                            <p className="text-neutral-600 text-[14px] leading-[1.8] mb-6 text-justify">{dept.description[0]}</p>

                            <div className="mb-6 grid grid-cols-2 gap-2.5 border-b border-neutral-100 pb-6 sm:gap-3 lg:grid-cols-4">
                                {[
                                    { label: 'Faculty', value: dept.stats.faculty, Icon: Users },
                                    { label: 'Labs', value: dept.stats.labs, Icon: Microscope },
                                    { label: 'Students', value: dept.stats.students, Icon: GraduationCap },
                                    { label: 'Placed', value: dept.stats.placement, Icon: Briefcase },
                                ].map(({ label, value, Icon }) => (
                                    <div key={label} className="flex min-w-0 flex-col items-center justify-center rounded-xl border border-neutral-100 bg-[#FFFAF6] px-2 py-3 text-center sm:px-3 sm:py-4">
                                        <Icon aria-hidden="true" className="mb-1.5 h-4 w-4 text-primary sm:h-[18px] sm:w-[18px]" />
                                        <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-neutral-500 sm:text-[10px] sm:tracking-[0.1em]">{label}</span>
                                        <span className="mt-1 break-words text-base font-bold leading-tight text-neutral-dark sm:text-lg">{value}</span>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <span className="block text-[10px] font-bold tracking-[0.1em] uppercase text-neutral-400 mb-3">Research Focus Areas</span>
                                <div className="flex flex-wrap gap-2">
                                    {dept.researchAreas.map(area => (
                                        <span key={area} className="px-3 py-1.5 bg-primary/5 border border-primary/20 text-neutral-700 text-[12px] font-medium rounded-full">
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-neutral-600 text-base lg:text-lg leading-[1.85] space-y-5 mt-8 text-justify">
                        {dept.description.slice(1).map((para, idx) => (
                            <p key={idx}>{para}</p>
                        ))}
                    </div>
                </div>

                <div className="bg-neutral-100 rounded-xl p-6 sm:p-8 lg:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-primary font-black text-sm lg:text-[15px] uppercase tracking-[0.2em] mb-5">Vision</h3>
                            <p className="text-neutral-600 text-[15px] lg:text-[17px] leading-[1.8] text-justify">{dept.vision}</p>
                        </div>
                        <div>
                            <h3 className="text-primary font-black text-sm lg:text-[15px] uppercase tracking-[0.2em] mb-5">Mission</h3>
                            <div className="text-neutral-600 text-[15px] lg:text-[17px] leading-[1.8] space-y-3 text-justify">
                                {dept.mission.map((m, index) => (
                                    <p key={m.id}>
                                        <strong className="text-neutral-900 font-bold">DM {index + 1}:</strong> {m.text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col sm:flex-row gap-8 lg:gap-10 items-center sm:items-start">
                    {dept.hodMessage.image ? (
                        <img src={dept.hodMessage.image} alt={dept.hodMessage.name} className="w-32 h-32 lg:w-44 lg:h-44 rounded-full object-cover shrink-0 shadow-lg" loading="lazy" />
                    ) : (
                        <div className="w-32 h-32 lg:w-44 lg:h-44 rounded-full bg-neutral-50 flex flex-col items-center justify-center shrink-0 shadow-inner border border-neutral-200 text-center px-4 overflow-hidden">
                            <span className="text-[10px] lg:text-[11px] font-bold text-neutral-400 uppercase tracking-wider leading-tight mb-1">{dept.code}</span>
                            <span className="text-[9px] lg:text-[10px] font-medium text-neutral-500 uppercase tracking-wide leading-tight mb-2">Head of Dept</span>
                            <span className="text-[9px] lg:text-[10px] font-semibold text-neutral-400 italic">Photo<br/>Unavailable</span>
                        </div>
                    )}
                    <div className="flex-1 text-center sm:text-left pt-2">
                        <h3 className="font-serif text-3xl font-bold text-neutral-dark">{dept.hodMessage.name}</h3>
                        <p className="text-primary text-xs lg:text-[13px] font-bold uppercase tracking-[0.2em] mt-3 mb-6">{dept.hodMessage.designation}</p>
                        <p className="text-neutral-600 italic text-base lg:text-lg leading-[1.8] mb-8 font-serif text-justify">&ldquo;{dept.hodMessage.message}&rdquo;</p>
                        <p className="text-neutral-400 text-sm lg:text-[15px] font-semibold">Dept. of {dept.name}</p>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <div className="bg-primary text-white rounded-xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-primary/30">
                    <h3 className="font-serif text-2xl font-bold flex items-center gap-3 mb-10">
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                        CONTACT US
                    </h3>
                    <div className="space-y-8 mb-10">
                        <div className="flex items-start gap-4">
                            <Mail className="w-6 h-6 text-white/90 shrink-0 mt-0.5" strokeWidth={1.5} />
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1.5">Email</p>
                                <p className="text-base text-white font-semibold">{dept.slug}@srit.ac.in</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="w-6 h-6 text-white/90 shrink-0 mt-0.5" strokeWidth={1.5} />
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1.5">Phone</p>
                                <p className="text-base text-white font-semibold">+91 98765 43214</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-white/90 shrink-0 mt-0.5" strokeWidth={1.5} />
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1.5">Location</p>
                                <p className="text-base text-white font-semibold leading-relaxed">{dept.code} Block, SRIT Campus</p>
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-4 rounded-xl bg-white hover:bg-white/90 transition-colors text-xs font-black uppercase tracking-[0.2em] text-primary">
                        View on Map
                    </button>
                </div>

                <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-neutral-100">
                    <h3 className="font-serif text-2xl font-bold flex items-center gap-3 mb-8 text-neutral-dark">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        ACHIEVEMENTS
                    </h3>
                    <div className="space-y-6">
                        {dept.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <Award className="w-6 h-6 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                                <p className="text-neutral-600 text-[15px] lg:text-[17px] font-medium leading-[1.7]">{highlight}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepartmentAbout;
