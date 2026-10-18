import { cadDepartment as cadData } from './data/department';
import type { DepartmentData } from '../shared/types';
import CADCourseStructure from './components/CADCourseStructure';
import CSEOutcome from '../cse/components/CSEOutcome';
import CADStudents from './components/CADStudents';

export const cadDepartment: DepartmentData = {
    ...cadData,
    layout: 'sidebar',
    components: {
        CourseStructure: CADCourseStructure,
        Outcome: CSEOutcome,
        Students: CADStudents,
    }
};
