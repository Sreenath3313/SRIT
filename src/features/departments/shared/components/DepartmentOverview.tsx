import React, { useState } from 'react';
import type { DepartmentData } from '../../index';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AccordionWave from '../../../../components/common/AccordionWave';
import SpreadsheetTable from '../../../../components/common/SpreadsheetTable';
import ContentRenderer from '../../../../components/common/ContentRenderer';

interface DepartmentOverviewProps {
    dept: DepartmentData;
}



const DepartmentOverview: React.FC<DepartmentOverviewProps> = ({ dept }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!dept.overview || dept.overview.length === 0) {
        return (
            <div className="bg-white rounded-xl p-8 border border-neutral-200/60 shadow-sm text-center">
                <p className="text-neutral-500">Overview information is not available for this department yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-6 uppercase">Program Overview</h2>

                {/* Peach/orange numbered accordion — matches reference image */}
                <div
                    className={`${dept.slug === 'mec' ? 'space-y-3 overflow-visible rounded-none border-0 bg-transparent' : `rounded-xl ${dept.slug === 'csm' || dept.slug === 'ece' ? 'overflow-hidden' : 'overflow-hidden shadow-sm'}`}`}
                    style={dept.slug === 'csm' || dept.slug === 'ece' || dept.slug === 'mec' ? undefined : { background: '#fdf0e6', border: '1px solid rgba(255,120,50,0.18)' }}
                >
                    {dept.overview.map((item, index) => {
                        const isOpen = openIndex === index;
                        const num = String(index + 1).padStart(2, '0');

                        return (
                            <div
                                key={index}
                                className={dept.slug === 'csm' ? 'overflow-hidden rounded-xl border border-orange-200/60 bg-[#fff8f4] shadow-[0_2px_9px_rgba(173,79,35,0.08)]' : dept.slug === 'ece' ? 'overflow-hidden rounded-xl border border-orange-200/70 bg-[#fffaf5] shadow-[0_2px_8px_rgba(173,79,35,0.07)]' : dept.slug === 'mec' ? `overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow] duration-200 ${isOpen ? 'border-[#f0c8ad] shadow-[0_5px_16px_rgba(161,91,48,0.10)]' : 'border-[#f6dfd0] shadow-[0_3px_12px_rgba(161,91,48,0.06)]'}` : ''}
                                style={{
                                    borderBottom: dept.slug !== 'ece' && dept.slug !== 'mec' && index < dept.overview!.length - 1
                                        ? '1px solid rgba(255,120,50,0.15)'
                                        : 'none',
                                }}
                            >
                                {/* Accordion header */}
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className={`group relative flex w-full items-center gap-0 overflow-hidden text-left transition-all duration-200 ${dept.slug === 'csm' ? 'isolate rounded-xl' : ''} ${dept.slug === 'ece' ? 'min-h-[72px]' : ''} ${dept.slug === 'mec' ? 'min-h-[62px] gap-3 px-2.5 py-2 sm:gap-5 sm:px-3' : ''}`}
                                    aria-expanded={isOpen}
                                    aria-controls={dept.slug === 'mec' ? `mec-overview-panel-${index}` : undefined}
                                    style={{
                                        background: isOpen
                                    ? (dept.slug === 'csm' ? '#fff0e7' : dept.slug === 'ece' ? '#fff0e5' : dept.slug === 'mec' ? '#fffdfa' : 'rgba(255,120,50,0.08)')
                                            : dept.slug === 'mec' ? '#ffffff' : 'transparent',
                                    }}
                                >
                                    {/* Orange number badge */}
                                    <span
                                        className={`relative z-10 flex shrink-0 items-center justify-center font-bold text-white text-sm sm:text-base ${dept.slug === 'ece' ? 'min-h-[72px] w-[136px] justify-start pl-5 text-2xl tracking-wide' : ''} ${dept.slug === 'mec' ? 'h-10 w-10 rounded-xl border border-[#f8dfd0] text-[#e96a27] sm:h-[42px] sm:w-[42px]' : ''}`}
                                        style={{
                                            background: dept.slug === 'mec' ? '#fff0e7' : dept.slug === 'csm' || dept.slug === 'ece' ? 'linear-gradient(145deg, #ff5915, #ff7625)' : '#FF5422',
                                            width: dept.slug === 'ece' ? 'clamp(86px, 20vw, 136px)' : dept.slug === 'mec' ? '42px' : dept.slug === 'csm' ? '58px' : 'clamp(40px, 8vw, 52px)',
                                            minHeight: dept.slug === 'ece' ? '72px' : dept.slug === 'mec' ? '42px' : 'clamp(40px, 8vw, 52px)',
                                            alignSelf: dept.slug === 'mec' ? 'center' : 'stretch',
                                            clipPath: dept.slug === 'ece' ? 'polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%)' : undefined,
                                            color: dept.slug === 'mec' ? '#e96a27' : undefined,
                                        }}
                                    >
                                        {num}
                                    </span>

                                    {dept.slug === 'ece' && <span aria-hidden="true" className="pointer-events-none absolute left-[66px] top-0 z-0 h-full w-[38px] bg-[#ffb36f]/25 sm:left-[106px] sm:w-[54px]" style={{ clipPath: 'polygon(0 0, 55% 0, 100% 50%, 55% 100%, 0 100%, 45% 50%)' }} />}

                                    {/* Vertical divider */}
                                    <span
                                        style={{
                                            width: dept.slug === 'ece' || dept.slug === 'mec' ? '0' : dept.slug === 'csm' ? '2px' : '3px',
                                            alignSelf: 'stretch',
                                            background: dept.slug === 'csm' ? 'rgba(255,120,50,0.25)' : 'rgba(255,84,34,0.25)',
                                        }}
                                    />

                                    {dept.slug === 'csm' && <>
                                        <AccordionWave className="inset-y-0 left-[58px] z-0 h-full w-[calc(100%-58px)]" />
                                    </>}

                                    {/* Title */}
                                    <span className={`relative z-10 flex-1 px-5 py-3.5 text-[15px] transition-colors duration-200 ${dept.slug === 'csm' || dept.slug === 'ece' ? 'font-semibold text-[#293548] group-hover:text-[#d94b16]' : dept.slug === 'mec' ? 'px-0 py-2 text-[14px] font-semibold leading-snug text-[#34404e] group-hover:text-[#dd6528] sm:text-[15px]' : 'font-bold text-neutral-800 group-hover:text-[#FF5422]'}`}>
                                        {item.title}
                                    </span>

                                    {/* Faded number on right */}
                                    <span
                                        className={`px-4 font-bold text-sm shrink-0 ${dept.slug === 'csm' || dept.slug === 'ece' || dept.slug === 'mec' ? 'hidden' : 'hidden sm:block'}`}
                                        style={{ color: 'rgba(255,84,34,0.35)' }}
                                    >
                                        {num}
                                    </span>

                                    {/* Circular chevron */}
                                    <span
                                        className={`relative z-10 shrink-0 mr-4 flex items-center justify-center rounded-full transition-all duration-300 ${dept.slug === 'csm' || dept.slug === 'ece' ? 'bg-white shadow-[0_2px_8px_rgba(164,76,31,0.12)]' : dept.slug === 'mec' ? 'mr-1 bg-[#fff1e8] text-[#e96a27] sm:mr-2' : ''}`}
                                        style={{
                                            width: dept.slug === 'ece' ? '40px' : dept.slug === 'mec' ? '34px' : '30px',
                                            height: dept.slug === 'ece' ? '40px' : dept.slug === 'mec' ? '34px' : '30px',
                                            border: dept.slug === 'csm' || dept.slug === 'ece' || dept.slug === 'mec' ? 'none' : '1.5px solid #FF5422',
                                            color: dept.slug === 'mec' ? '#e96a27' : '#FF5422',
                                        }}
                                    >
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                        />
                                    </span>
                                </button>

                                {/* Accordion body */}
                                <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                id={dept.slug === 'mec' ? `mec-overview-panel-${index}` : undefined}
                                                role={dept.slug === 'mec' ? 'region' : undefined}
                                                aria-label={dept.slug === 'mec' ? item.title : undefined}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                            style={{ background: dept.slug === 'mec' ? '#ffffff' : '#fff8f3' }}
                                        >
                                            {item.isSpreadsheet ? (
                                                <div className="border-t border-orange-100">
                                                    <SpreadsheetTable
                                                        sheetUrls={item.sheetUrls}
                                                        editUrls={item.editUrls}
                                                        availableYears={item.availableYears}
                                                        fallbackColumns={['News Letter', 'Date', 'Link']}
                                                        fallbackData={{}}
                                                    />
                                                </div>
                                            ) : (
                                                <div
                                                    className="p-6 prose prose-neutral max-w-none w-full
                                                    prose-h4:text-[#FF5422] prose-h4:font-bold prose-h4:mb-3 prose-h4:uppercase
                                                    prose-p:text-neutral-600 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-justify
                                                    prose-strong:text-neutral-900
                                                    prose-table:w-full prose-table:border-collapse prose-table:text-[16px]
                                                    prose-th:border prose-th:border-neutral-200 prose-th:p-3.5 prose-th:text-[16px] prose-th:font-bold prose-th:bg-neutral-50
                                                    prose-td:border prose-td:border-neutral-200 prose-td:p-3.5 prose-td:text-[16px]
                                                    prose-iframe:w-full prose-iframe:min-h-[500px] prose-iframe:rounded-xl prose-iframe:border prose-iframe:border-neutral-200
                                                    "
                                                >
                                                    <ContentRenderer content={item.content} />
                                                </div>
                                            )}
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

export default DepartmentOverview;
