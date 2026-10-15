import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface AccordionItem {
    title: string;
    content?: React.ReactNode;
}

interface DepartmentAccordionRowProps {
    index: number;
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children?: React.ReactNode;
    id?: string;
    headerOnly?: boolean;
}

export const DepartmentAccordionRow: React.FC<DepartmentAccordionRowProps> = ({
    index,
    title,
    isOpen,
    onToggle,
    children,
    id = 'department-accordion',
    headerOnly = false,
}) => {
    const panelId = `${id}-panel-${index}`;
    const number = String(index + 1).padStart(2, '0');

    return (
        <div className="overflow-hidden border-b border-[#FFD9C4] last:border-b-0">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group relative flex min-h-[64px] w-full items-center overflow-hidden bg-[#FFFAF6] text-left transition-colors duration-200 hover:bg-[#FFF4EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF6A1A] sm:min-h-[70px]"
            >
                <span
                    className="relative z-10 flex min-h-[64px] w-[64px] shrink-0 items-center bg-[#FF5B19] pl-3 text-[15px] font-bold tracking-wide text-white sm:min-h-[70px] sm:w-[82px] sm:pl-4 sm:text-[16px] md:w-[100px] md:pl-[18px] md:text-[17px]"
                    style={{ clipPath: 'polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%)' }}
                >
                    {number}
                </span>
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[48px] top-0 z-0 h-full w-6 bg-[#FFB36F]/25 sm:left-[64px] sm:w-[31px] md:left-[78px] md:w-[38px]"
                    style={{ clipPath: 'polygon(0 0, 55% 0, 100% 50%, 55% 100%, 0 100%, 45% 50%)' }}
                />
                <span className="relative z-10 min-w-0 flex-1 px-3 py-3 text-[14px] font-semibold leading-snug text-[#293548] transition-colors group-hover:text-[#D94B16] sm:px-4 sm:text-[15px] md:px-5">
                    {title}
                </span>
                <span className="relative z-10 mr-2.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#F15B24] shadow-[0_2px_8px_rgba(164,76,31,0.12)] sm:mr-4 sm:h-9 sm:w-9 md:mr-5">
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </span>
            </button>
            {!headerOnly && <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={panelId}
                        role="region"
                        aria-label={title}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden bg-white"
                    >
                        <div className="border-t border-orange-100 p-3 sm:p-5 md:p-6">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>}
        </div>
    );
};

interface DepartmentAccordionProps {
    title: string;
    items: AccordionItem[];
    defaultOpenIndex?: number | null;
    /** Retained for existing department data; all variants now share one design. */
    variant?: 'default' | 'numbered' | 'cse' | 'csm' | 'ece' | 'mec';
}

const DepartmentAccordion: React.FC<DepartmentAccordionProps> = ({ title, items, defaultOpenIndex = null }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
    const id = `department-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {title && <h2 className="mb-6 font-serif text-xl font-bold uppercase tracking-tight text-neutral-900 sm:text-2xl">{title}</h2>}
            <div className="overflow-hidden rounded-xl border border-[#FFD9C4] bg-[#FFFAF6] shadow-[0_2px_5px_rgba(119,66,32,0.08)]">
                {items.map((item, index) => (
                    <DepartmentAccordionRow
                        key={`${id}-${index}`}
                        id={id}
                        index={index}
                        title={item.title}
                        isOpen={openIndex === index}
                        onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                        {item.content || <p className="text-sm text-neutral-500">No information is currently available for this section.</p>}
                    </DepartmentAccordionRow>
                ))}
            </div>
        </div>
    );
};

export default DepartmentAccordion;
