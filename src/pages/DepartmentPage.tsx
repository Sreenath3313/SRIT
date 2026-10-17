import React, { useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getDepartmentBySlug, type DepartmentData } from '../features/departments/index';
import DepartmentNavbar from '../components/layout/DepartmentNavbar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DepartmentAbout from '../features/departments/shared/components/DepartmentAbout';
import DepartmentFaculty from '../features/departments/shared/components/DepartmentFaculty';
import DepartmentStudents from '../features/departments/shared/components/DepartmentStudents';
import DepartmentGallery from '../features/departments/shared/components/DepartmentGallery';
import DepartmentCourseStructure from '../features/departments/shared/components/DepartmentCourseStructure';
import DepartmentProjects from '../features/departments/shared/components/DepartmentProjects';
import DepartmentOverview from '../features/departments/shared/components/DepartmentOverview';
import DepartmentOutcome from '../features/departments/shared/components/DepartmentOutcome';
import DepartmentEContent from '../features/departments/shared/components/DepartmentEContent';
import DepartmentStudentChapters from '../features/departments/shared/components/DepartmentStudentChapters';
import DepartmentAccordion from '../components/common/DepartmentAccordion';
import {
    Info,
    BookOpen,
    Layers,
    GraduationCap,
    Users,
    Image as ImageIcon,
    FileText,
    Target,
    Monitor,
} from 'lucide-react';

const getSidebarItems = (dept: DepartmentData) => {
    if (dept.slug === 'eee' || dept.slug === 'has' || dept.slug === 'ece') {
        return [
            {
                key: 'about',
                label: 'About Us',
                icon: <Info className="w-[18px] h-[18px]" strokeWidth={2.2} />
            },
            {
                key: 'overview',
                label: 'Program Overview',
                icon: <FileText className="w-[18px] h-[18px]" strokeWidth={2.2} />
            },
            {
                key: 'course',
                label: 'Course Structure',
                icon: <BookOpen className="w-[18px] h-[18px]" strokeWidth={2.2} />
            },
            {
                key: 'faculty',
                label: 'Faculty',
                icon: <GraduationCap className="w-[18px] h-[18px]" strokeWidth={2.2} />
            },
            {
                key: 'outcome',
                label: 'Outcome Based Education',
                icon: <Target className="w-[18px] h-[18px]" strokeWidth={2.2} />
            },
            {
                key: 'e-content',
                label: 'E-Content',
                icon: <Monitor className="w-[18px] h-[18px]" strokeWidth={2.2} />
            },
            {
                key: 'students',
                label: 'Students',
                icon: <Users className="w-[18px] h-[18px]" strokeWidth={2.2} />
            },
        ];
    }

    if (dept.layout === 'sidebar') {
        const items = [
            {
                key: 'about',
                label: 'About Us',
                icon: <Info className="w-[18px] h-[18px]" strokeWidth={2.2} />
            },
            {
                key: 'overview',
                label: 'Program Overview',
                icon: <FileText className="w-[18px] h-[18px]" strokeWidth={2.2} />
            },
            {
                key: 'course',
                label: 'Course Structure',
                icon: <BookOpen className="w-[18px] h-[18px]" strokeWidth={2.2} />
            },
            {
                key: 'faculty',
                label: 'Faculty',
                icon: <GraduationCap className="w-[18px] h-[18px]" strokeWidth={2.2} />
            },
            {
                key: 'outcome',
                label: 'Outcome Based Education',
                icon: <Target className="w-[18px] h-[18px]" strokeWidth={2.2} />
            },
            {
                key: 'e-content',
                label: 'E-Content',
                icon: <Monitor className="w-[18px] h-[18px]" strokeWidth={2.2} />
            },
            {
                key: 'students',
                label: 'Students',
                icon: <Users className="w-[18px] h-[18px]" strokeWidth={2.2} />
            }
        ];

        return items;
    }

    const items = [
        {
            key: 'about',
            label: 'About Us',
            icon: (
                <Info
                    className="w-[18px] h-[18px]"
                    strokeWidth={2.2}
                />
            ),
        },
        {
            key: 'course',
            label: 'Course Structure',
            icon: (
                <BookOpen
                    className="w-[18px] h-[18px]"
                    strokeWidth={2.2}
                />
            ),
        },
        {
            key: 'faculty',
            label: 'Faculty',
            icon: (
                <GraduationCap
                    className="w-[18px] h-[18px]"
                    strokeWidth={2.2}
                />
            ),
        },
        {
            key: 'program',
            label: 'Projects',
            icon: (
                <Layers
                    className="w-[18px] h-[18px]"
                    strokeWidth={2.2}
                />
            ),
        },
        {
            key: 'students',
            label: 'Students',
            icon: (
                <Users
                    className="w-[18px] h-[18px]"
                    strokeWidth={2.2}
                />
            ),
        },
        {
            key: 'gallery',
            label: 'Gallery',
            icon: (
                <ImageIcon
                    className="w-[18px] h-[18px]"
                    strokeWidth={2.2}
                />
            ),
        },
    ];

    if (dept?.overview && dept.overview.length > 0) {
        items.splice(1, 0, {
            key: 'overview',
            label: 'Program Overview',
            icon: (
                <FileText
                    className="w-[18px] h-[18px]"
                    strokeWidth={2.2}
                />
            ),
        });
    }

    return items;
};


const DepartmentPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    const dept = getDepartmentBySlug(slug || '');

    const location = useLocation();
    const navigate = useNavigate();

    const pathParts = location.pathname
        .split('/')
        .filter(Boolean);

    const activeTab = pathParts.length > 2
        ? pathParts[2] === 'chapters' ? 'students' : pathParts[2]
        : 'about';


    /*
     * Change department section.
     */
    const handleTabChange = (tabKey: string) => {
        navigate(`/department/${slug}/${tabKey}`);
    };


    /*
     * Smoothly return to the top whenever
     * the department section changes.
     */
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [activeTab]);


    /*
     * Department not found.
     */
    if (!dept) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">

                    <h1 className="font-serif text-5xl font-semibold mb-4 text-neutral-dark">
                        Department Not Found
                    </h1>

                    <Link
                        to="/"
                        className="font-semibold text-primary"
                    >
                        ← Return to Homepage
                    </Link>

                </div>
            </div>
        );
    }


    /*
     * Render the selected department section.
     */
    const renderContent = () => {
        const AboutComp = dept.components?.About || DepartmentAbout;
        const OverviewComp = dept.components?.Overview || DepartmentOverview;
        const FacultyComp = dept.components?.Faculty || DepartmentFaculty;
        const CourseComp = dept.components?.CourseStructure || DepartmentCourseStructure;
        const OutcomeComp = dept.components?.Outcome || DepartmentOutcome;
        const EContentComp = dept.components?.EContent || DepartmentEContent;
        const ChaptersComp = dept.components?.StudentChapters || DepartmentStudentChapters;
        const ProgramComp = dept.components?.Projects || DepartmentProjects;
        const StudentsComp = dept.components?.Students || DepartmentStudents;
        const GalleryComp = dept.components?.Gallery || DepartmentGallery;

        switch (activeTab) {
            case 'about':
                return <AboutComp dept={dept} />;
            case 'overview':
                return <OverviewComp dept={dept} />;
            case 'faculty':
                return <FacultyComp dept={dept} />;
            case 'course':
                return <CourseComp dept={dept} />;
            case 'outcome':
                return <OutcomeComp dept={dept} />;
            case 'e-content':
                return <EContentComp dept={dept} />;
            case 'program':
                return <ProgramComp dept={dept} />;
            case 'students':
                return (
                    <>
                        <StudentsComp dept={dept} />
                        {dept.components?.StudentChapters || dept.studentChapters?.length ? (
                            <div className="mt-10">
                                <ChaptersComp dept={dept} />
                            </div>
                        ) : null}
                    </>
                );
            case 'gallery':
                return <GalleryComp dept={dept} />;
            default:
                return <AboutComp dept={dept} />;
        }
    };


    /*
     * Department navigation items.
     */
    const currentSidebarItems = getSidebarItems(dept);


    return (
        <div className="min-h-screen bg-white" style={{ paddingTop: 'calc(var(--site-navbar-height, 180px) + 8px)' }}>

            <Navbar showPlacementTicker={false} showShadow={false} />

            {/* =====================================================
                DEPARTMENT NAVBAR
            ===================================================== */}

            <DepartmentNavbar
                dept={dept}
                items={currentSidebarItems}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />


            {/* =====================================================
                DEPARTMENT PAGE CONTENT
            ===================================================== */}

            <main className="w-full min-h-screen">

                    <AnimatePresence
                        mode="wait"
                        initial={false}
                    >

                        <motion.div
                            key={activeTab}
                            className="page-layer"

                            initial={{
                                opacity: 0,
                                y: 12,
                            }}

                            animate={{
                                opacity: 1,
                                y: 0,
                            }}

                            exit={{
                                opacity: 0,
                                y: -8,
                            }}

                            transition={{
                                duration: 0.32,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >

                            {/* =================================================
                                ABOUT PAGE HERO
                            ================================================= */}

                            {activeTab === 'about' && (
                                <section className="relative overflow-hidden min-h-[300px] lg:min-h-[400px] flex items-end">

                                    {/* Background Image */}
                                    <div className="absolute inset-0">

                                        <img
                                            src={dept.image}
                                            alt={dept.fullName}
                                            className="w-full h-full object-cover"
                                        loading="lazy" />

                                        {/* Cinematic Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                    </div>


                                    {/* Hero Content */}
                                    <div className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 lg:px-12 lg:py-16 w-full">

                                        <motion.h1
                                            initial={{
                                                opacity: 0,
                                                x: -25,
                                            }}

                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                            }}

                                            transition={{
                                                delay: 0.12,
                                                duration: 0.55,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}

                                            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight"
                                        >
                                            {dept.fullName}
                                        </motion.h1>


                                        <motion.p
                                            initial={{
                                                opacity: 0,
                                                x: -20,
                                            }}

                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                            }}

                                            transition={{
                                                delay: 0.2,
                                                duration: 0.5,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}

                                            className="text-white/90 text-base sm:text-lg lg:text-xl mt-3 sm:mt-4 max-w-3xl font-medium"
                                        >
                                            {dept.tagline}
                                        </motion.p>

                                    </div>

                                </section>
                            )}


                            {/* =================================================
                                DEPARTMENT SECTION CONTENT
                            ================================================= */}

                            <div className="px-4 sm:px-6 py-8 sm:py-10">

                                {renderContent()}

                            </div>

                        </motion.div>

                    </AnimatePresence>

            </main>


            {/* =====================================================
                FOOTER
            ===================================================== */}

            <Footer />

        </div>
    );
};


export default DepartmentPage;
