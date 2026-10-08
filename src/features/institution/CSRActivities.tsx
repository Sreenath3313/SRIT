import React from 'react';
import { motion } from 'framer-motion';

const csrImages = [
    { src: '/optimized/saro1.jpeg.webp', title: 'Community Outreach', description: 'Empowering local communities through education and support.' },
    { src: '/optimized/saro2.jpeg.webp', title: 'Environmental Initiatives', description: 'Commitment to a greener campus and sustainable practices.' },
    { src: '/optimized/saro3.jpeg.webp', title: 'Social Responsibility', description: 'Fostering a culture of giving back and social awareness.' },
    { src: '/optimized/saro4.jpeg.webp', title: 'Health & Wellness', description: 'Promoting well-being and health awareness in our surroundings.' },
];

const CSRActivities: React.FC = () => {
    return (
        <section id="csr" className="section-y-lg bg-white overflow-hidden">
            <div className="section-container">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="label-caps text-neutral-500 tracking-[0.25em] mb-4"
                    >
                        Beyond Academia
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 , ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="heading-lg text-neutral-dark mb-6"
                    >
                        CSR Activities
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 , ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed"
                    >
                        At SRIT, we believe in holistic development and social impact. Our CSR initiatives are designed to create a meaningful difference in society.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {csrImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.5, delay: index * 0.1 , ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="group relative h-[380px] sm:h-[400px] lg:h-[420px] w-full overflow-hidden rounded-sm shadow-md bg-neutral-200"
                            style={{ position: 'relative' }}
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    display: 'block'
                                }}
                            loading="lazy" />
                            <div 
                                className="flex flex-col justify-end p-6 z-10 transition-all duration-300"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%)'
                                }}
                            >
                                <h3 className="text-xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                                    {image.title}
                                </h3>
                                <p className="text-white/85 text-sm leading-relaxed drop-shadow">
                                    {image.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CSRActivities;
