import { useEffect, useState } from 'react'
import { FileText, PhoneCall, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import IframeWithLoader from '../../components/common/IframeWithLoader'
import PageHeader from '../../components/common/PageHeader';
import { AccordionContainer, DepartmentAccordionRow } from '../../components/common/DepartmentAccordion';

export default function ExtraCurricularActivitiesCellPage() {
  const categoryTitle = 'Committees'
  const title = 'Extra Curricular Activities Cell'
  
  const [activeTab, setActiveTab] = useState<string>('Activities')

  useEffect(() => {
    document.title = `${title} | SRIT`
    const description = `Official SRIT information for ${title} under ${categoryTitle}.`
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) { 
        tag = document.createElement('meta'); 
        tag.setAttribute('name', 'description'); 
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', description)
  }, [title])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans selection:bg-primary/20">
      <Navbar />
      <PageHeader title={title} categoryTitle={categoryTitle} icon={<FileText size={26} />} />
      
      <main className="max-w-[1300px] w-full mx-auto px-4 sm:px-6 py-10 lg:py-16 flex-1 relative z-10 -mt-8">
        <div className="flex flex-col gap-8 w-full">
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8">

            {/* Overview Banner & Introduction */}
            <motion.article variants={itemVariants} className="rounded-xl border border-neutral-200/60 bg-white p-6 sm:p-9 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[#FF6600] text-xs font-bold tracking-[.16em] uppercase mb-4">
                At a Glance
              </div>
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">About Extra Curricular Activities Cell</h2>
              
              <div className="w-full mb-6 rounded-xl overflow-hidden border border-orange-100 shadow-sm max-h-[420px] bg-neutral-100">
                <img 
                  src="https://www.srit.ac.in/wp-content/uploads/2024/01/Extra_Curriculars-1024x485.jpg" 
                  alt="Extra Curricular @ SRIT" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group relative bg-neutral-50/80 border border-orange-100/80 rounded-xl p-6 hover:border-orange-300/50 transition-colors duration-300">
                  <h3 className="text-lg font-bold text-[#FF6600] mb-2 uppercase tracking-wide">Vision</h3>
                  <p className="text-neutral-700 leading-relaxed text-sm md:text-base">
                    To Encourage students to explore interests outside of academics, helping them develop new skills, foster creativity, and build emotional intelligence.
                  </p>
                </div>

                <div className="group relative bg-neutral-50/80 border border-orange-100/80 rounded-xl p-6 hover:border-orange-300/50 transition-colors duration-300">
                  <h3 className="text-lg font-bold text-[#FF6600] mb-2 uppercase tracking-wide">Mission</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-neutral-700 leading-relaxed text-sm md:text-base">
                    <li>Encourage a balance between academics, extracurricular activities, and personal life, helping students manage their time effectively while supporting their mental and physical well-being.</li>
                    <li>Promote activities that connect students with their local or global community, allowing them to make meaningful contributions and develop a sense of social responsibility.</li>
                    <li>Inspire students to see extracurricular activities as a means of continuous learning and self-improvement, which can benefit them beyond their school years.</li>
                  </ol>
                </div>
              </div>
            </motion.article>

            {/* Contact Card */}
            <motion.article variants={itemVariants} className="rounded-xl border border-neutral-200/60 bg-white p-6 sm:p-9 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                <div className="p-2.5 bg-orange-50 rounded-xl text-[#FF6600]">
                  <FileText size={22} />
                </div>
                Contact Us
              </h2>

              <div className="p-6 rounded-xl border border-orange-100 bg-neutral-50/50 hover:bg-white hover:shadow-lg hover:border-orange-200 transition-all duration-300 max-w-lg">
                <h3 className="font-bold text-neutral-900 text-lg mb-1">
                  <span className="text-[#FF6600]">TM B. Waheeda Parveen</span>, M.Phil., TEFL., (Ph. D)
                </h3>
                <p className="text-sm text-neutral-600 font-medium mb-1">Convener, Extra Curricular Activities</p>
                <p className="text-sm text-neutral-500 mb-4">
                  Assistant Professor in H &amp; S.<br />
                  Srinivasa Ramanujan Institute of Technology, Rotarypuram, Anantapuramu-515701.
                </p>
                <div className="text-sm text-neutral-700 space-y-2 pt-2 border-t border-neutral-200/60">
                  <p className="flex items-center gap-2">
                    <Mail size={16} className="text-[#FF6600] shrink-0" />
                    <strong>Mail:</strong> 
                    <a href="mailto:waheeda.hs@srit.ac.in" className="text-[#FF6600] hover:underline">
                      waheeda.hs@srit.ac.in
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <PhoneCall size={16} className="text-[#FF6600] shrink-0" />
                    <strong>Mobile No:</strong> 
                    <a href="tel:+917799797555" className="text-[#FF6600] hover:underline">
                      +91-7799797555
                    </a>
                  </p>
                </div>
              </div>
            </motion.article>

            {/* Document Accordions - UNIFIED THEME */}
            <motion.article variants={itemVariants} className="rounded-xl border border-neutral-200/60 bg-white p-6 sm:p-9 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">Documents & Records</h2>
              
              <AccordionContainer className="w-full">
                {/* 01. Vision */}
                <DepartmentAccordionRow
                  id="eca"
                  index={0}
                  title="Vision"
                  isOpen={activeTab === 'Vision'}
                  onToggle={() => setActiveTab(activeTab === 'Vision' ? '' : 'Vision')}
                >
                  <div className="p-3 text-neutral-700 leading-relaxed font-medium">
                    <p className="text-[#FF6600] font-bold mb-1">VISION</p>
                    <p>To Encourage students to explore interests outside of academics, helping them develop new skills, foster creativity, and build emotional intelligence.</p>
                  </div>
                </DepartmentAccordionRow>

                {/* 02. Mission */}
                <DepartmentAccordionRow
                  id="eca"
                  index={1}
                  title="Mission"
                  isOpen={activeTab === 'Mission'}
                  onToggle={() => setActiveTab(activeTab === 'Mission' ? '' : 'Mission')}
                >
                  <div className="p-3 text-neutral-700 leading-relaxed font-medium space-y-2">
                    <p className="text-[#FF6600] font-bold mb-1">MISSION</p>
                    <p>1. Encourage a balance between academics, extracurricular activities, and personal life, helping students manage their time effectively while supporting their mental and physical well-being.</p>
                    <p>2. Promote activities that connect students with their local or global community, allowing them to make meaningful contributions and develop a sense of social responsibility.</p>
                    <p>3. Inspire students to see extracurricular activities as a means of continuous learning and self-improvement, which can benefit them beyond their school years.</p>
                  </div>
                </DepartmentAccordionRow>

                {/* 03. Team */}
                <DepartmentAccordionRow
                  id="eca"
                  index={2}
                  title="Team"
                  isOpen={activeTab === 'Team'}
                  onToggle={() => setActiveTab(activeTab === 'Team' ? '' : 'Team')}
                >
                  <div className="p-3 text-neutral-600 font-medium">
                    Coming Soon.
                  </div>
                </DepartmentAccordionRow>

                {/* 04. Activities (Google Sheet Iframe with Loader) */}
                <DepartmentAccordionRow
                  id="eca"
                  index={3}
                  title="Activities"
                  isOpen={activeTab === 'Activities'}
                  onToggle={() => setActiveTab(activeTab === 'Activities' ? '' : 'Activities')}
                >
                  <IframeWithLoader 
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT1qiQzbukmLwitg5ghUAAii8DPCIkzInKx_jbbSKCPwb49v86Ke0eWZAPrJAiOj6j0k8I777Bu5bFV/pubhtml?widget=true&headers=false"
                    title="Extra Curricular Activities Records"
                    style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                  />
                </DepartmentAccordionRow>

                {/* 05. Contact */}
                <DepartmentAccordionRow
                  id="eca"
                  index={4}
                  title="Contact"
                  isOpen={activeTab === 'Contact'}
                  onToggle={() => setActiveTab(activeTab === 'Contact' ? '' : 'Contact')}
                >
                  <div className="p-3 text-neutral-700 leading-relaxed font-medium space-y-2">
                    <h4 className="text-[#FF6600] font-bold text-base">Contact Us:</h4>
                    <p>
                      <strong><span className="text-[#FF6600]">TM B. Waheeda Parveen</span>, M.Phil., TEFL., (Ph. D),</strong><br />
                      Convener, Extra Curricular Activities,<br />
                      Assistant Professor in H &amp; S.<br />
                      Srinivasa Ramanujan Institute of Technology,<br />
                      Rotarypuram, Anantapuramu-515701.
                    </p>
                    <p className="pt-1">
                      <strong>Mail:</strong> <a href="mailto:waheeda.hs@srit.ac.in" className="text-[#FF6600] hover:underline">waheeda.hs@srit.ac.in</a> | <strong>Mobile No:</strong> <a href="tel:+917799797555" className="text-[#FF6600] hover:underline">+91-7799797555</a>
                    </p>
                  </div>
                </DepartmentAccordionRow>
              </AccordionContainer>
            </motion.article>

          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
