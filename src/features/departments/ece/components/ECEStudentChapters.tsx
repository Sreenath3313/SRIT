import React from 'react';
import type { DepartmentData } from '../../shared/types';
import DepartmentAccordion from '../../../../components/common/DepartmentAccordion';
import ContentRenderer from '../../../../components/common/ContentRenderer';

interface ECEStudentChaptersProps {
    dept: DepartmentData;
}

const ECEStudentChapters: React.FC<ECEStudentChaptersProps> = ({ dept }) => {
    const items = dept.studentChapters?.map(item => ({
        title: item.title,
        content: typeof item.content === 'string' && item.content.trim() ? (
            <ContentRenderer content={item.content} />
        ) : typeof item.content === 'string' ? (
            <p className="text-sm text-neutral-500">No chapter details are currently available in the department content.</p>
        ) : (
            item.content
        )
    })) || [];

    return (
        <DepartmentAccordion
            title="STUDENTS CHAPTERS"
            items={items}
            variant="ece"
        />
    );
};

export default ECEStudentChapters;
