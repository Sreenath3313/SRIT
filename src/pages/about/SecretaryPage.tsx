import React from 'react';
import { motion } from 'framer-motion';
import AboutUsLayout from '../../features/about/components/AboutUsLayout';
import { fadeUp, stagger, slideLeft } from '../../features/about/animations';

const SecretaryPage: React.FC = () => {
    const bullets = [
        'He believes that education to one member educates an entire family and provides them with an income, giving them pride and self-respect. The founder firmly believes that "EDUCATION IS SIMPLY THE SOUL OF A SOCIETY AS IT PASSES FROM ONE GENERATION TO ANOTHER". That was when Srinivasa Ramanujan Institute of Technology (SRIT) was born out of his feelings to serve. The name was chosen as the founder wanted to honor the achievements of the great mathematician, Sri Srinivasa Ramanujan.',
        'The role of an educator is to bring out the best in every individual and that of an educational institution to provide the best facilities and the right ambiance. With this motto and vision, Sri Aluru Sambasiva Reddy set out to fulfill his vision of providing "VALUE & SKILL-BASED EDUCATION" by establishing SRIT, a world-class technological institute.',
        'He leads from the front; his indomitable spirit and his unflagging energy providing the institute with focus and direction. He relentlessly mixes education and human values — great respect, love, and concern to his teachers, his family members, and parents in equal measure.',
        'Under his benign and pragmatic guidance, SRIT has grown in reputation and merit. Today, it is regarded among the best engineering institutes in India.',
    ];

    return (
        <AboutUsLayout title="About Secretary">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col lg:flex-row gap-10 items-start">
                {/* Image */}
                <motion.div variants={slideLeft} className="w-full lg:w-[360px] xl:w-[400px] shrink-0">
                    <div className="relative">
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#FF6600] to-orange-300 blur-sm opacity-40" />
                        <img
                            src="https://www.srit.ac.in/wp-content/uploads/2021/07/samba-siva.jpeg"
                            alt="Aluru Sambasiva Reddy"
                            className="relative w-full rounded-xl shadow-xl border-2 border-white object-cover"
                        loading="lazy" />
                    </div>
                    <motion.div variants={fadeUp} className="mt-4 bg-gradient-to-br from-[#0A0903] to-neutral-800 rounded-xl p-4 text-center shadow">
                        <p className="text-white font-bold text-lg">Aluru Sambasiva Reddy</p>
                        <p className="text-[#FF6600] text-sm font-semibold mt-1">Founder & Secretary</p>
                        <a href="mailto:correspondent@srit.ac.in" className="mt-3 inline-block text-xs text-neutral-400 hover:text-[#FF6600] transition-colors">
                            correspondent@srit.ac.in
                        </a>
                    </motion.div>
                </motion.div>

                {/* Content */}
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
                            hidden: { opacity: 0, x: -50, filter: "blur(6px)" },
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
                        Aluru Sambasiva Reddy
                    </motion.h2>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: -35 },
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
                            Founder & Secretary
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
                        className="space-y-6 text-neutral-600 leading-loose text-[15px] sm:text-base"
                    >
                        {[
                            <React.Fragment key="p1">
                                <strong className="text-[#FF6600] font-semibold">Aluru Sambasiva Reddy</strong>, the Founder Secretary of SRIT, is the youngest son of <strong className="text-[#FF6600] font-semibold">Sri Aluru Sunki Reddy</strong> and <strong className="text-[#FF6600] font-semibold">Late Smt Aluru Narayanamma</strong> with six brothers and two sisters in an ordinary middle-class family in East Narasapuram, a village in Singanamala Mandal of Ananthapuramu District. Samba, as his parents fondly called him saying that he was a very enthusiastic kid, always interested in learning new things. Though his parents were uneducated, his mother observed her son&apos;s interest in studies and encouraged him to study. He completed his schooling at the local Govt. High School. With the support of his family, he joined the Intermediate course at SSN Junior College, Ongole. His dream was to pursue an engineering degree at the university campus.
                            </React.Fragment>,
                            <React.Fragment key="p2">
                                With that goal in mind, he studied hard and obtained a graduate&apos;s degree in Mechanical Engineering from the prestigious <strong className="text-[#FF6600] font-semibold">JNTUCE</strong>, Anantapuramu, in the year 2000. He also completed his M. Tech in Refrigeration and Air Conditioning from <strong className="text-[#FF6600] font-semibold">JNTUA</strong> in 2004.
                            </React.Fragment>,
                            <React.Fragment key="p3">
                                With the advice of his tutor, guide, mentor and patron <strong className="text-[#FF6600] font-semibold">Sri Y. Venkata Rami Reddy</strong>, Ex Vice-chancellor of JNTU Anantapur and Ex-Chairman, APPSC, he joined as an Assistant Professor in Sri Kottam Thulasi Reddy Memorial College of Engineering in the Department of Mechanical Engineering and later became an Associate Professor.
                            </React.Fragment>,
                            <React.Fragment key="p4">
                                In his 7 years stay at the college, with his administrative and enormous organizing abilities, he was handed over to manage the administrative duties of the college. He worked as the Officer In-Charge for admissions and later as Training and Placement Officer.
                            </React.Fragment>,
                            <React.Fragment key="p5">
                                It was at about this time that he began to firm up his beliefs in education into an actual service credo. He realized that the purpose of human life is to serve and to show compassion to the people around us. He felt that it was better to educate youth and help them stand on their own feet, rather than simply providing food and shelter to the needy.
                            </React.Fragment>,
                        ].map((para, i) => (
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
                            >
                                {para}
                            </motion.p>
                        ))}

                        {/* Existing bullet section — unchanged */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-6 space-y-3"
                        >
                            {bullets.map((b, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 4 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    className="flex gap-3 p-4 bg-neutral-50 border border-neutral-200 rounded-xl hover:border-[#FF6600]/40 transition-all"
                                >
                                    <span className="w-5 h-5 rounded-full bg-[#FF6600] text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                                        {i + 1}
                                    </span>
                                    <p className="text-sm leading-relaxed">{b}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AboutUsLayout>
    );
};

export default SecretaryPage;
