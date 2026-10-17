import React from 'react';
import type { DepartmentData } from '../../index';
import DepartmentAccordion from '../../../../components/common/DepartmentAccordion';
import SpreadsheetTable from '../../../../components/common/SpreadsheetTable';
import ContentRenderer from '../../../../components/common/ContentRenderer';

interface DepartmentOverviewProps {
    dept: DepartmentData;
}

const DepartmentOverview: React.FC<DepartmentOverviewProps> = ({ dept }) => {
    if (!dept.overview?.length) {
        return (
            <div className="rounded-xl border border-neutral-200/60 bg-white p-8 text-center shadow-sm">
                <p className="text-neutral-500">Overview information is not available for this department yet.</p>
            </div>
        );
    }

    const items = dept.overview.map((item) => ({
        title: item.title,
        content: item.isSpreadsheet ? (
            <SpreadsheetTable
                sheetUrls={item.sheetUrls}
                editUrls={item.editUrls}
                availableYears={item.availableYears}
                fallbackColumns={['News Letter', 'Date', 'Link']}
                fallbackData={{}}
            />
        ) : (
            <div className="prose prose-neutral max-w-none w-full overflow-x-auto prose-h4:mb-3 prose-h4:font-bold prose-h4:uppercase prose-h4:text-[#FF6600] prose-p:mb-4 prose-p:leading-relaxed prose-p:text-justify prose-p:text-neutral-600 prose-strong:text-neutral-900 prose-table:w-full prose-table:border-collapse prose-table:text-[16px] prose-th:border prose-th:border-neutral-200 prose-th:bg-neutral-50 prose-th:p-3.5 prose-th:text-[16px] prose-th:font-bold prose-td:border prose-td:border-neutral-200 prose-td:p-3.5 prose-td:text-[16px] prose-iframe:min-h-[500px] prose-iframe:w-full prose-iframe:rounded-xl prose-iframe:border prose-iframe:border-neutral-200">
                <ContentRenderer content={item.content} />
            </div>
        ),
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-[3px] w-8 shrink-0 rounded-full bg-[#FF6600] sm:w-10" />
                <h2 className="font-serif text-2xl font-bold tracking-tight text-[#171b24] sm:text-3xl">Program Overview</h2>
            </div>
            <DepartmentAccordion title="" items={items} />
        </div>
    );
};

export default DepartmentOverview;
