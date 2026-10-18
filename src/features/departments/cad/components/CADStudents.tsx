import React from 'react';
import type { DepartmentData } from '../../shared/types';
import DepartmentAccordion from '../../../../components/common/DepartmentAccordion';
import ContentRenderer from '../../../../components/common/ContentRenderer';

interface CADStudentsProps {
    dept: DepartmentData;
}

const CADStudents: React.FC<CADStudentsProps> = ({ dept }) => {
    const items = dept.students?.map(item => ({
        title: item.title,
        content: <ContentRenderer content={item.content} />
    })) || [];

    return (
        <DepartmentAccordion
            title="STUDENTS"
            items={items}
        />
    );
};

export default CADStudents;
