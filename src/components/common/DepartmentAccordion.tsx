import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AccordionWave from './AccordionWave';

interface AccordionItem {
    title: string;
    content?: React.ReactNode;
}

interface DepartmentAccordionProps {
    title: string;
    items: AccordionItem[];
    defaultOpenIndex?: number | null;
    variant?: 'default' | 'numbered' | 'csm' | 'ece' | 'mec';
}

const DepartmentAccordion: React.FC<DepartmentAccordionProps> = ({ title, items, defaultOpenIndex = null, variant = 'default' }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h2 className={`mb-6 text-2xl font-bold uppercase text-neutral-900 ${variant === 'mec' ? 'font-sans tracking-tight' : 'font-serif'}`}>
                    {title}
                </h2>

                <div className={`${variant === 'mec' ? 'space-y-3 overflow-visible rounded-none shadow-none' : 'overflow-hidden rounded-xl shadow-sm'} ${variant === 'numbered' ? 'border border-orange-200/70 bg-[#fdf0e6]' : variant === 'csm' ? 'border border-orange-200/60 bg-[#fff8f4]' : variant === 'ece' ? 'border border-orange-200/70 bg-[#fffaf5]' : variant === 'mec' ? 'bg-transparent' : 'divide-y divide-neutral-200/60 border border-neutral-200/60 bg-white'}`}>
                    {items.map((item, index) => {
                        const isOpen = openIndex === index;

                        if (variant === 'ece') {
                            const number = String(index + 1).padStart(2, '0');
                            return (
                                <div key={index} className="overflow-hidden border-b border-orange-200/70 last:border-b-0">
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        aria-expanded={isOpen}
                                        className={`group relative flex min-h-[72px] w-full items-center overflow-hidden text-left transition-colors duration-200 ${isOpen ? 'bg-[#fff0e5]' : 'bg-[#fffaf5]'}`}
                                    >
                                        <span className="relative z-10 flex min-h-[72px] w-[86px] shrink-0 items-center bg-gradient-to-br from-[#ff5915] to-[#ff7625] pl-3 text-2xl font-semibold tracking-wide text-white sm:w-[136px] sm:pl-5" style={{ clipPath: 'polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%)' }}>{number}</span>
                                        <span aria-hidden="true" className="pointer-events-none absolute left-[66px] top-0 h-full w-[38px] bg-[#ffb36f]/25 sm:left-[106px] sm:w-[54px]" style={{ clipPath: 'polygon(0 0, 55% 0, 100% 50%, 55% 100%, 0 100%, 45% 50%)' }} />
                                        <span className="relative z-10 flex-1 px-3 py-4 text-[15px] font-semibold text-[#293548] transition-colors group-hover:text-[#d94b16] sm:px-7">{item.title}</span>
                                        <span className="relative z-10 mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#f15b24] shadow-[0_2px_8px_rgba(164,76,31,0.12)] sm:mr-5">
                                            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                        </span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden bg-white">
                                            <div className="border-t border-orange-100 p-5 sm:p-6">{item.content || <p className="italic text-neutral-500">Content for {item.title} will be updated soon.</p>}</div>
                                        </motion.div>}
                                    </AnimatePresence>
                                </div>
                            );
                        }

                        if (variant === 'mec') {
                            const number = String(index + 1).padStart(2, '0');
                            return (
                                <div key={index} className={`overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow] duration-200 ${isOpen ? 'border-[#f0c8ad] shadow-[0_5px_16px_rgba(161,91,48,0.10)]' : 'border-[#f6dfd0] shadow-[0_3px_12px_rgba(161,91,48,0.06)] hover:shadow-[0_5px_16px_rgba(161,91,48,0.10)]'}`}>
                                    <button
                                        type="button"
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        aria-expanded={isOpen}
                                        aria-controls={`mec-accordion-panel-${index}`}
                                        className="group flex min-h-[62px] w-full items-center gap-3 px-2.5 py-2 text-left transition-colors hover:bg-[#fffdfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ed9b69] sm:gap-5 sm:px-3"
                                    >
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#f8dfd0] bg-[#fff0e7] text-sm font-bold tracking-wide text-[#e96a27] sm:h-[42px] sm:w-[42px]">{number}</span>
                                        <span className="flex-1 py-2 text-[14px] font-semibold text-[#34404e] transition-colors group-hover:text-[#dd6528] sm:text-[15px]">{item.title}</span>
                                        <span className="mr-1 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#fff1e8] text-[#e96a27] transition-transform duration-300 sm:mr-2">
                                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                        </span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && <motion.div id={`mec-accordion-panel-${index}`} role="region" aria-label={item.title} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden bg-white">
                                            <div className="border-t border-[#f8e8de] p-5 sm:p-6">{item.content || <p className="italic text-neutral-500">Content for {item.title} will be updated soon.</p>}</div>
                                        </motion.div>}
                                    </AnimatePresence>
                                </div>
                            );
                        }

                        if (variant === 'numbered' || variant === 'csm') {
                            const number = String(index + 1).padStart(2, '0');
                            return (
                                <div key={index} className={`overflow-hidden border-b last:border-b-0 ${variant === 'csm' ? 'border-orange-200/55' : 'border-orange-200/70'}`}>
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        aria-expanded={isOpen}
                                        className={`group relative isolate flex w-full items-stretch gap-0 overflow-hidden text-left transition-colors duration-200 ${variant === 'csm' ? 'bg-[#fff8f4]' : ''}`}
                                        style={{ background: isOpen ? (variant === 'csm' ? '#fff0e7' : 'rgba(255,120,50,0.08)') : undefined }}
                                    >
                                        <span className={`relative z-10 flex min-h-[52px] shrink-0 items-center justify-center text-sm font-bold text-white sm:text-base ${variant === 'csm' ? 'w-[58px] bg-gradient-to-br from-[#ff4f0b] to-[#ff7625]' : 'w-[52px] bg-[#FF5422]'}`}>{number}</span>
                                        <span className={`relative z-10 shrink-0 ${variant === 'csm' ? 'w-[2px] bg-orange-200/80' : 'w-[3px] bg-[#ff5422]/25'}`} />
                                        {variant === 'csm' && <>
                                            <AccordionWave className="inset-y-0 left-[58px] z-0 h-full w-[calc(100%-58px)]" />
                                        </>}
                                        <span className={`relative z-10 flex flex-1 items-center px-4 py-3.5 text-[15px] font-bold transition-colors sm:px-5 ${variant === 'csm' ? 'text-[#293548] group-hover:text-[#d94b16]' : 'text-slate-800 group-hover:text-[#FF5422]'}`}>{item.title}</span>
                                        {variant === 'numbered' && <span className="hidden shrink-0 items-center px-4 text-sm font-bold text-[#FF5422]/35 sm:flex">{number}</span>}
                                        <span className={`relative z-10 mr-4 my-auto flex h-[30px] w-[30px] shrink-0 items-center justify-center ${variant === 'csm' ? 'rounded-full bg-white text-[#f15b24] shadow-[0_2px_8px_rgba(164,76,31,0.12)]' : 'rounded-full border-[1.5px] border-[#FF5422] text-[#FF5422]'}`}>
                                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                        </span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className={`overflow-hidden ${variant === 'csm' ? 'bg-white' : 'bg-[#fff8f3]'}`}>
                                                <div className={`p-5 sm:p-6 ${variant === 'csm' ? 'border-t border-orange-100' : 'border-t border-orange-100'}`}>{item.content || <p className="italic text-neutral-500">Content for {item.title} will be updated soon.</p>}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={index}
                                className="overflow-hidden transition-all duration-300"
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between p-4 lg:p-5 text-left transition-colors duration-300"
                                    style={{ background: '#0A0903' }}
                                    onMouseEnter={(e) => {
                                        if (!isOpen) e.currentTarget.style.background = '#1a1812';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#0A0903';
                                    }}
                                >
                                    <span className="font-bold text-[#FF5422]">{item.title}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-[#FF5422] transition-transform duration-300 ${
                                            isOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden bg-white"
                                        >
                                            <div className="p-6 border-t border-neutral-100">
                                                {item.content || (
                                                    <p className="text-neutral-500 italic">
                                                        Content for {item.title} will be updated soon.
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DepartmentAccordion;
