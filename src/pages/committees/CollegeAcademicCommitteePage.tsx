import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { navLinks } from '../../data/navigation'
import IframeWithLoader from '../../components/common/IframeWithLoader'
import PageHeader from '../../components/common/PageHeader';
import { AccordionContainer, DepartmentAccordionRow } from '../../components/common/DepartmentAccordion';

const cacIframes = [
  {
    title: "Minutes of Meeting",
    iframeUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYBeCEDNI1807nX_LMmQBr8jfcrnzRnKfKLDnQgjdc0UmrxBRHYadiHRaiEYy1s5JA8McsA9EEScJl/pubhtml?widget=true&headers=false"
  }
]

export default function CollegeAcademicCommitteePage() {
  const categoryTitle = 'Committees'
  const title = 'College Academic Committee'
  const navGroup = navLinks.find((item) => item.label === categoryTitle)
  
  const [activeTab, setActiveTab] = useState<string>('')

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
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
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
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-8"
          >

            {/* Overview */}
            <motion.article variants={itemVariants} className="rounded-xl border border-neutral-200/60 bg-white p-6 sm:p-9 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-primary text-xs font-bold tracking-[.16em] uppercase mb-4">
                Overview
              </div>
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">About College Academic Committee</h2>
              
              <div className="group relative bg-neutral-50/80 border border-orange-100/80 rounded-xl p-7 hover:border-orange-300/50 transition-colors duration-300 mb-8">
                <p className="text-neutral-700 leading-relaxed text-sm md:text-base relative z-10 mb-4">
                  <strong>AIM:</strong> NSS is part of our academic, social and personal life as it is the third dimension of education, it allows the students to actively contribute their services for the cause of community and the nation, thus helping them develop their personally. Service and attain the traits of a leader of the nation. As such it is the right platform, where the student – youth of the nation may get to involve with real-life social activities, and there by become responsible citizen of India.
                </p>
                <p className="text-neutral-700 leading-relaxed text-sm md:text-base relative z-10">
                  <strong>VISION:</strong> The vision is to build the youth with the mind and spirit to serve the society and work for the social uplift of the down-trodden masses of our nation as a movement.
                </p>
              </div>
            </motion.article>

            {/* Contact Us */}
            <motion.article variants={itemVariants} className="rounded-xl border border-neutral-200/60 bg-white p-6 sm:p-9 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                <div className="p-2.5 bg-orange-50 rounded-xl text-primary">
                  <FileText size={22} />
                </div>
                Contact Us
              </h2>

              <div className="p-6 rounded-xl border border-neutral-100 bg-neutral-50/50 hover:bg-white hover:shadow-lg hover:border-orange-100 transition-all duration-300 max-w-lg">
                  <h3 className="font-bold text-neutral-900 mb-1">Mr. G.Chinna Pullaiah, M.Tech</h3>
                  <p className="text-sm text-neutral-500 mb-4">(PhD), President Awardee, Assistant Professor in CSE.<br/>Srinivasa Ramanujan Institute of Technology, Rotarypuram, Anantapuramu-515701.</p>
                  <div className="text-sm text-neutral-600 space-y-2">
                      <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /><strong>Mail:</strong> nsspo@srit.ac.in</p>
                      <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /><strong>Mobile No:</strong> +91-9505004112</p>
                  </div>
              </div>
            </motion.article>

            {/* Document Accordions - NEW THEME */}
            <motion.article variants={itemVariants} className="rounded-xl border border-neutral-200/60 bg-white p-6 sm:p-9 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">Documents & Records</h2>
              
              <AccordionContainer className="w-full">
                <DepartmentAccordionRow
                  id="cac"
                  index={0}
                  title="Our Mission"
                  isOpen={activeTab === 'Our Mission'}
                  onToggle={() => setActiveTab(activeTab === 'Our Mission' ? '' : 'Our Mission')}
                >
                  <div className="p-2 text-neutral-600 font-medium leading-relaxed">
                    <p>MISSION: The National Service Scheme has been functioning with the motto "NOT ME BUT YOU" in view of making the youth inspired in service of the people and hence NSS Aims Education through Community Service and Community Service through Education.</p>
                  </div>
                </DepartmentAccordionRow>

                <DepartmentAccordionRow
                  id="cac"
                  index={1}
                  title="Objectives"
                  isOpen={activeTab === 'Objectives'}
                  onToggle={() => setActiveTab(activeTab === 'Objectives' ? '' : 'Objectives')}
                >
                  <div className="p-2 text-neutral-600 font-medium leading-relaxed">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Understand the community in which they work</li>
                      <li>Understand themselves in relation to their community</li>
                      <li>Identify the needs and problems of the community and involve them in problem solving process</li>
                      <li>Develop among themselves a sense of social and civic responsibility</li>
                      <li>Utilize their knowledge in finding practical solution to individual and community problems</li>
                      <li>Develop competence required for group living and sharing of responsibilities</li>
                      <li>Gain skills in mobilizing community participation</li>
                    </ul>
                  </div>
                </DepartmentAccordionRow>

                <DepartmentAccordionRow
                  id="cac"
                  index={2}
                  title="Team"
                  isOpen={activeTab === 'Team'}
                  onToggle={() => setActiveTab(activeTab === 'Team' ? '' : 'Team')}
                >
                  <div className="p-2 text-neutral-600 font-medium">
                    Coming Soon.
                  </div>
                </DepartmentAccordionRow>

                {cacIframes.map((tab, idx) => {
                  const isOpen = activeTab === tab.title
                  return (
                    <DepartmentAccordionRow
                      key={tab.title}
                      id="cac"
                      index={idx + 3}
                      title={tab.title}
                      isOpen={isOpen}
                      onToggle={() => setActiveTab(isOpen ? '' : tab.title)}
                    >
                      <IframeWithLoader 
                        src={tab.iframeUrl}
                        title={tab.title}
                        style={{ height: 'clamp(500px, 75vh, 1200px)' }}
                      />
                    </DepartmentAccordionRow>
                  )
                })}
              </AccordionContainer>
            </motion.article>

          </motion.div>
          
          
        </div>
      </main>
      <Footer />
    </div>
  )
}
