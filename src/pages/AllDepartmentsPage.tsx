import React from 'react';
import Navbar from '../components/layout/Navbar';
import Departments from '../features/departments/shared/components/Departments';
import Footer from '../components/layout/Footer';

const AllDepartmentsPage: React.FC = () => {
    return (
        <div className="flex min-h-screen flex-col bg-warm-50" style={{ paddingTop: 'var(--site-navbar-height, 130px)' }}>
            <Navbar />
            <main className="flex-1 py-8 sm:py-12">
                <Departments />
            </main>
            <Footer />
        </div>
    );
};

export default AllDepartmentsPage;
