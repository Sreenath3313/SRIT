import React, { useLayoutEffect } from 'react';

import Navbar from '../components/layout/Navbar';
import Hero from '../features/home/Hero';
import About from '../features/home/About';
import Placements from '../features/placements/Placements';
import AlumniSuccess from '../features/placements/AlumniSuccess';
import Footer from '../components/layout/Footer';
import Accreditations from '../features/home/Accreditations';
import GlobalTieUps from '../features/institution/GlobalTieUps';
import SocialMediaFeeds from '../features/home/SocialMediaFeeds';
import CSRActivities from '../features/institution/CSRActivities';
import { AnnouncementBand, FacilitiesFeature, ProgramsDepartments, ResearchFeature } from '../features/home/HomeEditorial';


const HomePage: React.FC = () => {
    useLayoutEffect(() => {
        const main = document.querySelector<HTMLElement>('[data-home-animations]');
        if (!main) return;
        const sections = Array.from(main.children).filter((child): child is HTMLElement =>
            child instanceof HTMLElement && (child.tagName === 'SECTION' || child.hasAttribute('data-home-reveal'))
        );
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        sections.forEach((section) => section.classList.add('home-scroll-section'));
        if (reduceMotion || !('IntersectionObserver' in window)) {
            sections.forEach((section) => section.classList.add('is-visible'));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-white text-neutral-900">

            {/* =====================================================
                MAIN NAVBAR
            ===================================================== */}

            <Navbar />


            <main className="bg-white" data-home-animations>

                {/* =================================================
                    HERO
                ================================================= */}

                <Hero />
                <div data-home-reveal><AnnouncementBand /></div>
                <div id="home-recognition" data-home-reveal className="w-full">
                    <Accreditations />
                </div>
                <About />
                <ProgramsDepartments />
                <GlobalTieUps />
                <Placements />
                <AlumniSuccess />
                <ResearchFeature />
                <FacilitiesFeature />
                <CSRActivities />
                <SocialMediaFeeds />

            </main>


            {/* =====================================================
                FOOTER
            ===================================================== */}

            <Footer />

        </div>
    );
};


export default HomePage;
