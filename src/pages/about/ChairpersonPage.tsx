import React from 'react';
import { motion } from 'framer-motion';
import AboutUsLayout from '../../features/about/components/AboutUsLayout';
import { fadeUp, stagger, slideLeft } from '../../features/about/animations';

const ProfilePage: React.FC<{
    name: string;
    role: string;
    imageSrc: string;
    email?: string;
    paragraphs: (string | React.ReactNode)[];
}> = ({ name, role, imageSrc, email, paragraphs }) => (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Image */}
        <motion.div variants={slideLeft} className="w-full lg:w-[360px] xl:w-[400px] shrink-0">
            <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#FF6600] to-orange-300 blur-sm opacity-40" />
                <img
                    src={imageSrc}
                    alt={name}
                    className="relative w-full rounded-xl shadow-xl border-2 border-white object-cover"
                loading="lazy" />
            </div>
            <motion.div
                variants={fadeUp}
                className="mt-4 bg-gradient-to-br from-[#0A0903] to-neutral-800 rounded-xl p-4 text-center shadow"
            >
                <p className="text-white font-bold text-lg">{name}</p>
                <p className="text-[#FF6600] text-sm font-semibold mt-1">{role}</p>
                {email && (
                    <a href={`mailto:${email}`} className="mt-3 inline-block text-xs text-neutral-400 hover:text-[#FF6600] transition-colors break-all">
                        {email}
                    </a>
                )}
            </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
            className="flex-1"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.18,
                        delayChildren: 0.25,
                    },
                },
            }}
        >
            <motion.h2
                variants={{
                    hidden: {
                        opacity: 0,
                        x: -50,
                        filter: "blur(6px)",
                    },
                    visible: {
                        opacity: 1,
                        x: 0,
                        filter: "blur(0px)",
                        transition: {
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                        },
                    },
                }}
                className="text-3xl font-serif font-bold text-[#0A0903] mb-1"
            >
                {name}
            </motion.h2>

            <motion.div
                variants={{
                    hidden: {
                        opacity: 0,
                        x: -35,
                    },
                    visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                        },
                    },
                }}
                className="flex items-center gap-2 mb-6"
            >
                <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: 32 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-0.5 bg-[#FF6600] rounded-full"
                />

                <span className="text-[#FF6600] font-semibold">
                    {role}
                </span>
            </motion.div>

            <motion.div
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.22,
                            delayChildren: 0.75,
                        },
                    },
                }}
                className="space-y-4"
            >
                {paragraphs.map((para, i) => (
                    <motion.p
                        key={i}
                        variants={{
                            hidden: {
                                opacity: 0,
                                x: -45,
                                filter: "blur(4px)",
                            },
                            visible: {
                                opacity: 1,
                                x: 0,
                                filter: "blur(0px)",
                                transition: {
                                    duration: 0.65,
                                    ease: [0.22, 1, 0.36, 1],
                                },
                            },
                        }}
                        className="text-neutral-600 leading-relaxed"
                    >
                        {para}
                    </motion.p>
                ))}
            </motion.div>
        </motion.div>
    </motion.div>
);

const ChairpersonPage: React.FC = () => (
    <AboutUsLayout title="About Chairperson">
        <ProfilePage
            name="Smt. Jonnalagadda Padmavathy"
            role="Chairperson"
            imageSrc="https://www.srit.ac.in/wp-content/uploads/2021/07/cp-srit-768x1154.jpeg"
            email="chairperson@srit.ac.in"
            paragraphs={[
                <>
                    <strong className="text-[#FF6600] font-semibold">Smt. Jonnalagadda Padmavathy</strong>, the Chairperson of SRIT, is the youngest daughter of <strong className="text-[#FF6600] font-semibold">Sri. Jonnalagadda Chennakesavulu</strong>, born and brought up in Nellore. She completed her schooling, and intermediate education in Nellore. Being from engineering background (her father too was an engineer), she pursued Engineering at the JNTU Anantapur University campus, obtaining a graduate degree in Mechanical Engineering from the prestigious JNTUCE, Ananthapuramu, in the year 2000. She pursued M. Tech In Computer Science from JNTUA in 2012. She has worked as <strong className="text-[#FF6600] font-semibold">Assistant Professor</strong> in Sri Kottam Thulasi Reddy Memorial College of Engineering in the <strong className="text-[#FF6600] font-semibold">Department of Mechanical Engineering</strong>. She joined as <strong className="text-[#FF6600] font-semibold">Associate Professor</strong> in the CSE Department.
                </>,
                <>
                    Her skills at managing a society and her charitable nature, along with her vision of educating youth across the country has seen her become one of the foremost educationists in Andhra Pradesh. <strong className="text-[#FF6600] font-semibold">Smt. Aluru Narayanamma Memorial Educational Society</strong> recognized her vision. She, as the Chairperson of the society, constantly pushing the boundaries of what the society aims to achieve.
                </>,
                <>
                    She is an elected <strong className="text-[#FF6600] font-semibold">Member of the Legislative Assembly</strong> representing Singanamala Constituency of Andhra Pradesh, championing the cause of women, children and education with all her considerable might.
                </>,
                <>
                    As she expands her field of influence, her vision too is expanding to see a society where education and technical knowhow, bring parity and equality to all. We are proud and honored to be guided by a mind that is constantly searching for ways to create an equitable society.
                </>,
            ]}
        />
    </AboutUsLayout>
);

export default ChairpersonPage;
