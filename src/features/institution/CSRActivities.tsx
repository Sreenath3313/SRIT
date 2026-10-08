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
        <section id="csr" className="overflow-hidden border-y border-[#E5DED4] bg-[#F4F1EA] py-10 md:py-14">
            <div className="section-container">
                <div className="mb-8 grid items-end gap-5 sm:mb-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
                    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}>
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[.24em] text-[#B64A27]">Beyond Academia <span className="ml-2 font-mono tracking-normal text-neutral-500">/ 04 initiatives</span></p>
                        <h2 className="font-serif text-3xl font-semibold leading-tight tracking-[-.02em] text-[#171b24] sm:text-4xl lg:text-5xl">CSR Activities</h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: .5, delay: .08, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="max-w-2xl text-base leading-relaxed text-neutral-600 lg:justify-self-end lg:text-lg"
                    >
                        At SRIT, we believe in holistic development and social impact. Our CSR initiatives are designed to create a meaningful difference in society.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                    {csrImages.map((image, index) => (
                        <motion.div
                            key={image.title}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: .5, delay: index * .07, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="group flex h-full flex-col border border-[#DED8CF] bg-white transition-colors duration-300 hover:border-[#B64A27]/60"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E3DA]">
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className="relative flex flex-1 flex-col border-l-[3px] border-transparent px-4 py-4 transition-colors duration-300 group-hover:border-[#B64A27] sm:px-5 sm:py-5">
                                <span className="mb-2 font-mono text-[10px] tracking-[.16em] text-[#B64A27]">{String(index + 1).padStart(2, '0')}</span>
                                <h3 className="font-serif text-lg font-semibold leading-snug text-[#171b24] sm:text-xl">{image.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{image.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CSRActivities;
