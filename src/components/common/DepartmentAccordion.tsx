import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface AccordionItemData {
    title: string;
    content?: React.ReactNode;
}

export const AccordionContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    let itemIdx = 0;
    const clonedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const currentIdx = itemIdx++;
            const element = child as React.ReactElement<{ index?: number }>;
            return React.cloneElement(element, {
                index: element.props.index !== undefined ? element.props.index : currentIdx,
            });
        }
        return child;
    });

    return (
        <div className={`overflow-hidden rounded-xl border border-[#FFD9C4] bg-[#FFFAF6] shadow-[0_2px_6px_rgba(255,102,0,0.06)] ${className}`}>
            {clonedChildren}
        </div>
    );
};

export const AccordionItem: React.FC<{
    title: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
    index?: number;
    badgeText?: string;
    id?: string;
    contentClassName?: string;
}> = ({ title, children, defaultOpen = false, index = 0, badgeText, id = 'acc-item', contentClassName }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <DepartmentAccordionRow
            title={title}
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            index={index}
            badgeText={badgeText}
            id={id}
            contentClassName={contentClassName}
        >
            {children}
        </DepartmentAccordionRow>
    );
};

interface DepartmentAccordionRowProps {
    index?: number;
    title: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    children?: React.ReactNode;
    id?: string;
    headerOnly?: boolean;
    badgeText?: string;
    className?: string;
    contentClassName?: string;
}

export const DepartmentAccordionRow: React.FC<DepartmentAccordionRowProps> = ({
    index = 0,
    title,
    isOpen,
    onToggle,
    children,
    id = 'accordion',
    headerOnly = false,
    badgeText,
    className = '',
    contentClassName = '',
}) => {
    const panelId = `${id}-panel-${index}`;
    const number = badgeText ?? String(index + 1).padStart(2, '0');

    return (
        <div className={`overflow-hidden border-b border-[#FFD9C4] last:border-b-0 ${className}`}>
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={`group relative flex min-h-[64px] w-full items-center overflow-hidden text-left transition-colors duration-200 sm:min-h-[70px] ${isOpen ? 'bg-[#FFF3E8]' : 'bg-[#FFFAF6] hover:bg-[#FFF3E8]'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF6600]`}
            >
                <span
                    className="relative z-10 flex min-h-[64px] w-[64px] shrink-0 items-center justify-center bg-[#FF6600] pr-3 text-[15px] font-bold tracking-wide text-white sm:min-h-[70px] sm:w-[82px] sm:pr-3.5 sm:text-[16px] md:w-[100px] md:pr-4 md:text-[17px]"
                    style={{ clipPath: 'polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%)' }}
                >
                    {number}
                </span>
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[48px] top-0 z-0 h-full w-6 bg-[#FFB36F]/25 sm:left-[64px] sm:w-[31px] md:left-[78px] md:w-[38px]"
                    style={{ clipPath: 'polygon(0 0, 55% 0, 100% 50%, 55% 100%, 0 100%, 45% 50%)' }}
                />
                <span className={`relative z-10 min-w-0 flex-1 py-3 pl-6 pr-3 text-[14px] font-semibold leading-snug transition-colors sm:pl-8 sm:pr-4 sm:text-[15px] md:pl-10 md:pr-5 ${isOpen ? 'text-[#FF6600] font-bold' : 'text-[#293548] group-hover:text-[#FF6600]'}`}>
                    {title}
                </span>
                <span className="relative z-10 mr-2.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#FF6600] shadow-[0_2px_8px_rgba(255,102,0,0.14)] sm:mr-4 sm:h-9 sm:w-9 md:mr-5">
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </span>
            </button>
            {!headerOnly && <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={panelId}
                        role="region"
                        aria-label={typeof title === 'string' ? title : undefined}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden bg-white"
                    >
                        <div className={`border-t border-[#FFD9C4] p-3 sm:p-5 md:p-6 ${contentClassName}`}>{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>}
        </div>
    );
};

interface DepartmentAccordionProps {
    title: string;
    items: AccordionItemData[];
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
