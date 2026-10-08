export interface Faculty {
    id: string;
    name: string;
    department: string;
    specialization: string;
    image: string;
}

export const facultyProfiles: Faculty[] = [
    {
        id: 'fac-1',
        name: 'Dr. Anand Raman',
        department: 'Computer Science',
        specialization: 'Artificial Intelligence & Deep Learning',
        image: '/optimized/padmavathi.jpg.webp'
    },
    {
        id: 'fac-2',
        name: 'Dr. Sarah Mathews',
        department: 'Electronics & Comm.',
        specialization: 'VLSI Design & Embedded Systems',
        image: '/optimized/principal.jpg.webp'
    },
    {
        id: 'fac-3',
        name: 'Dr. Rajesh Kumar',
        department: 'Mechanical Engineering',
        specialization: 'Thermal Sciences & Robotics',
        image: '/optimized/ranjit.jpg.webp'
    },
    {
        id: 'fac-4',
        name: 'Dr. Priya Reddy',
        department: 'Data Science',
        specialization: 'Big Data Analytics & NLP',
        image: '/optimized/sambasir.jpg.webp'
    }
];
