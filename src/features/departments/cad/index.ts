import { cadDepartment as cadData } from './data/department';
import type { DepartmentData } from '../shared/types';
import CADCourseStructure from './components/CADCourseStructure';
import CADOutcome from './components/CADOutcome';
import CADStudents from './components/CADStudents';

export const cadDepartment: DepartmentData = {
    ...cadData,
    layout: 'sidebar',
    components: {
        CourseStructure: CADCourseStructure,
        Outcome: CADOutcome,
        Students: CADStudents,
    }
};
