import React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Department {
    slug: string;
    code: string;
    name: string;
    fullName?: string;
}

interface DepartmentNavItem {
    key: string;
    label: string;
    icon: React.ReactNode;
}

interface DepartmentNavbarProps {
    dept: Department;
    items: DepartmentNavItem[];
    activeTab: string;
    onTabChange: (tabKey: string) => void;
}

const DepartmentNavbar: React.FC<DepartmentNavbarProps> = ({
    dept,
    items,
    activeTab,
    onTabChange,
}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const isActive = (key: string) => {
        if (key === "about") {
            return activeTab === "about" || activeTab === "";
        }

        return activeTab === key;
    };

    return (
        <header
            className="sticky z-50 w-full border-b border-[#F0E5DE]"
            style={{
                top: 'calc(var(--site-navbar-height, 120px) - 2px)',
                marginTop: '-2px',
                background: 'linear-gradient(90deg, #FFF7F1 0%, #FFFCFA 30%, #FFFFFF 62%)',
            }}
        >

            <div className="relative z-20 border-b border-[#F0E5DE] bg-transparent">
                <div className="flex w-full items-center px-3 sm:px-5 md:px-6 lg:px-8">
                    <div
                        title={dept.fullName || dept.name}
                        className="flex h-[54px] sm:h-[60px] shrink-0 items-center border-r border-[#F0E5DE] pr-4 sm:pr-6 mr-2 sm:mr-4"
                    >
                        <span className="inline-flex min-w-0 items-center gap-2 overflow-hidden rounded-lg border border-[#F5D8C8] bg-white/95 px-2.5 py-1.5 text-[11px] font-bold tracking-[0.035em] text-[#F15A24] shadow-[0_2px_8px_rgba(164,76,31,0.09)] sm:px-3 sm:text-[12px] lg:text-[13px]">
                            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6600]" />
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap">Dept of {dept.code}</span>
                        </span>
                    </div>

                    {/* MOBILE DROPDOWN TABS */}
                    <div className="min-w-0 flex-1 lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex h-[54px] w-full items-center justify-between px-2 font-bold text-[#111827]"
                        >
                            <div className="flex min-w-0 flex-1 items-center gap-2">
                                <span className="shrink-0 rounded-full bg-[#FFF0E6] p-1.5">{items.find(i => isActive(i.key))?.icon}</span>
                                <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{items.find(i => isActive(i.key))?.label}</span>
                            </div>
                            <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden bg-white absolute left-0 right-0 top-[54px] shadow-lg border-b border-neutral-100 z-50"
                                >
                                    <div className="flex flex-col pb-2 max-h-[60vh] overflow-y-auto">
                                        {items.map((item) => {
                                             const active = isActive(item.key);
                                             return (
                                                 <button
                                                     key={item.key}
                                                     onClick={() => {
                                                         onTabChange(item.key);
                                                         setIsMenuOpen(false);
                                                     }}
                                                     className={`flex items-center gap-3 border-t border-[#F5EAE3] px-5 py-3.5 font-bold transition-colors ${active ? 'bg-[#FFF3EA] text-[#111827]' : 'text-[#111827] hover:bg-[#FFFAF7]'}`}
                                                 >
                                                     <span className={`${active ? 'text-[#F15A24]' : 'text-[#8192AA]'}`}>{item.icon}</span>
                                                     <span className="font-medium text-[14px]">{item.label}</span>
                                                 </button>
                                             );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* DESKTOP TABS */}
                    <nav
                        className="hidden lg:flex items-center overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar flex-1 justify-start gap-1 sm:gap-2 xl:gap-3 min-h-[54px] sm:min-h-[60px]"
                    >
                        {items.map((item) => {
                            const active = isActive(item.key);

                            return (
                                <button
                                    key={item.key}
                                    type="button"
                                    onClick={() => onTabChange(item.key)}
                                    className={`
                                        relative h-[54px] sm:h-[60px] px-2.5 sm:px-3.5
                                        flex items-center justify-center gap-1.5 sm:gap-2
                                        whitespace-nowrap shrink-0 text-[12px] sm:text-[13px] font-bold
                                        transition-colors duration-200 group
                                        ${active ? "text-[#111827]" : "text-[#111827] hover:text-[#F15A24]"}
                                    `}
                                >
                                    <span
                                        className={`
                                            flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8
                                            rounded-full shrink-0 transition-colors duration-200
                                            ${active ? "bg-[#FFF0E6] text-[#F15A24]" : "bg-transparent text-[#9AAAC0] group-hover:text-[#F15A24]"}
                                        `}
                                    >
                                        {item.icon}
                                    </span>
                                    <span>{item.label}</span>
                                    <span className={`absolute inset-x-0 bottom-0 h-[3px] rounded-t-full bg-[#F15A24] transition-opacity duration-150 ${active ? 'opacity-100' : 'opacity-0'}`} />
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

        </header>
    );
};

export default DepartmentNavbar;
