import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Achievement = {
    name: string;
    role: string;
    quote: string;
    illustrative?: boolean;
};

const achievements: Achievement[] = [
    {
        name: "Tejaswini",
        role: "Mechanical Student",
        quote: "As being a student from the Department of Mechanical Engineering. I've secured a job in Infosys as a System Engineer with a package of 3.6 LPA. I strongly believe that the branch you choose doesn't stop you from getting into the IT industry."
    },
    {
        name: "Abhimanyu Reddy",
        role: "Mechanical Student",
        quote: "My four years at SRIT were great memory to cherish for a lifetime. It was full of learning and grooming oneself. It gave me an opportunity to meet myself and learn many things. I am thankful to the whole faculty and mentors for sculpting me into a great sculpture."
    },
    {
        name: "Ravichandra Reddy",
        role: "Mechanical Student",
        quote: "I believe that Mechanical Engineers have the power to shift the trend. We are seeing a burst of opportunities in the industry. I thank each and everyone who believed in me & contributed to my success. Placed in Mobileum as an Associate Software Engineer with a package of 7 LPA."
    },
    {
        name: "Aarav Reddy",
        role: "Computer Science Student",
        quote: "Working through project challenges helped me connect classroom concepts with practical engineering. I grew more confident collaborating with peers and presenting ideas.",
        illustrative: true,
    },
    {
        name: "Nisha Rao",
        role: "Electronics Student",
        quote: "Exploring circuits in the lab helped me turn my curiosity into a clear academic direction. Faculty encouragement made it easier to stay curious and keep learning.",
        illustrative: true,
    },
    {
        name: "Kiran Kumar",
        role: "Civil Engineering Student",
        quote: "Team assignments taught me to plan carefully, listen to different ideas, and keep improving when the first solution did not work.",
        illustrative: true,
    }
];

const duplicatedAchievements = [...achievements, ...achievements];

const StudentAchievements: React.FC = () => {
    const reduceMotion = useReducedMotion();

    const renderCard = (item: Achievement, index: number) => (
        <motion.article
            key={`${item.name}-${index}`}
            whileHover={{ y: -4, transition: { duration: .2 } }}
            className="group flex min-h-[330px] w-[min(82vw,350px)] shrink-0 flex-col border border-[#E99036] bg-[#FFAD52] p-5 shadow-[0_5px_16px_rgba(114,61,12,.08)] transition-shadow duration-300 hover:shadow-[0_14px_28px_rgba(114,61,12,.14)] sm:min-h-[350px] sm:w-[360px] sm:p-6 lg:w-[380px] lg:p-7"
        >
            <div className="flex items-center justify-between gap-3 border-b border-[#8D4B12]/20 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#713B12]">{item.illustrative ? 'Illustrative sample' : 'Student story'}</span>
                <span className="border border-[#8D4B12]/25 bg-[#FFD39B] px-3 py-1.5 text-xs font-semibold text-[#713B12]">{item.role}</span>
            </div>
            <p className="my-5 flex-1 text-[15px] leading-[1.75] text-[#202632] sm:text-base">{item.quote}</p>
            <div className="border-t border-[#8D4B12]/20 pt-4">
                <h3 className="font-serif text-xl font-semibold text-[#171b24] sm:text-2xl">{item.name}</h3>
                <p className="mt-1 text-sm font-medium text-[#713B12]">{item.role}</p>
            </div>
        </motion.article>
    );

    return (
        <section id="student-achievements" className="border-y border-neutral-200 bg-white py-10 md:py-16">
            <div className="section-container">
                <h2 className="mb-3 font-serif text-3xl font-semibold text-[#171b24] md:text-4xl">
                    Students Achievements
                </h2>
                <p className="mb-8 max-w-3xl text-base leading-relaxed text-neutral-600 md:mb-10 md:text-lg">
                    Our Students have been achieving their dreams in all aspects. In short, our students have been spread over various fields and streams of society and have been growing with greater positions in society.
                </p>
                <p className="-mt-5 mb-6 text-xs text-neutral-500">Cards marked “Illustrative sample” are fictional examples.</p>
            </div>
            {reduceMotion ? (
                <div className="section-container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                    {achievements.map((item, index) => renderCard(item, index))}
                </div>
            ) : (
                <div className="overflow-hidden py-2" aria-label="Student achievement stories moving right to left">
                    <motion.div
                        initial={{ x: '0%' }}
                        animate={{ x: '-50%' }}
                        transition={{ ease: 'linear', duration: 48, repeat: Infinity }}
                        className="flex w-max"
                    >
                        {[0, 1].map((group) => (
                            <div key={group} className="flex w-max gap-4 pr-4 sm:gap-5 sm:pr-5" aria-hidden={group === 1}>
                                {achievements.map((item, index) => renderCard(item, index + group * achievements.length))}
                            </div>
                        ))}
                    </motion.div>
                </div>
            )}
        </section>
    );
};

export default StudentAchievements;
