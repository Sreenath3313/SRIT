import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, FileText, ExternalLink, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { navLinks } from '../../data/navigation'
import IframeWithLoader from '../../components/common/IframeWithLoader'
import PageHeader from '../../components/common/PageHeader';
import { AccordionContainer, DepartmentAccordionRow } from '../../components/common/DepartmentAccordion';

const accordions = [
  {
    title: "ECD Cell Team",
    iframeUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTAshrDxDeqX0ZP5u877fI4c7IUeT8wr7PeA93gIC4mxZCSmf7KazSQ5hYqG0YpRCHM90vNWnHNko0J/pubhtml?widget=true&headers=false",
  },
  {
    title: "Activities",
    iframeUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS44QYyk7mQkAS6GBGeJV-WhiWILAHklfxU2KNb55QX9eCT1rR92q8fQ5yazmMbQbEsUNhcFLtQ8btc/pubhtml?widget=true&headers=false",
  },
  {
    title: "Minutes Of Meeting",
    iframeUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRX7uvPXEMP-G8Ffq0pRkm7vU1c3Av5y1M9Yjh_oAubnh_Wkw2PM2atBjaJ6G48jbzKeYg4VBC1jAz_/pubhtml?widget=true&headers=false",
  }
]

const portalLinks = [
  { dept: "CIVIL ENGINEERING", link: "https://www.srit.ac.in/civil-engineering-2/" },
  { dept: "ELECTRICAL AND ELECTRONICS ENGINEERING", link: "https://www.srit.ac.in/eee-2/" },
  { dept: "MECHANICAL ENGINEERING", link: "https://www.srit.ac.in/mec-2/" },
  { dept: "ELECTRONICS AND COMMUNICATION ENGINEERING", link: "https://www.srit.ac.in/electronics-communication-engineering-2/" },
  { dept: "COMPUTER SCIENCE AND ENGINEERING", link: "https://www.srit.ac.in/computer-science-engineering-2/" },
  { dept: "COMPUTER SCIENCE AND ENGINEERING (DATA SCIENCE)", link: "https://www.srit.ac.in/cse-data-science/" },
  { dept: "COMPUTER SCIENCE AND ENGINEERING (AI & ML)", link: "https://www.srit.ac.in/cse-artificial-intelligence-machine-learning-2/" }
]

export default function EContentDevelopmentCellPage() {
  const categoryTitle = 'Committees'
  const title = 'E-Content Development Cell'
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

            {/* Overview */}
            <motion.article variants={itemVariants} className="rounded-xl border border-neutral-200/60 bg-white p-6 sm:p-9 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-primary text-xs font-bold tracking-[.16em] uppercase mb-4">
                At a Glance
              </div>
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">About E-Content Development Cell</h2>
              
              <div className="group relative bg-neutral-50/80 border border-orange-100/80 rounded-xl p-7 hover:border-orange-300/50 transition-colors duration-300 mb-8">
                <p className="text-neutral-700 leading-relaxed text-sm md:text-base relative z-10">
                  <strong>AIM:</strong> e-Content is the digitized information delivered over communicating devices using computer networks. Noway days world moving towards virtual reality, where where physical distance between teacher and student is immaterial.
                </p>
              </div>

              <div className="group relative bg-white border border-neutral-200/60 rounded-xl p-7 hover:border-orange-200 transition-colors duration-300">
                <div className="text-neutral-700 leading-relaxed text-sm md:text-base relative z-10">
                  <strong>OBJECTIVES:</strong>
                  <ul className="list-disc pl-5 mt-2 space-y-1.5">
                    <li>To develop e-Teaching material in a creative way without IT expertise.</li>
                    <li>Enable exploration of more usable presentation in the context of e-Learning content creation through models, practical examples and checklists.</li>
                    <li>To develop e-content using contemporary ICT.</li>
                    <li>To maintain uniformity and follow appropriate standards for inter-operability.</li>
                  </ul>
                </div>
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
                  <h3 className="font-bold text-neutral-900 mb-1">Dr C. Sasikala, M.Tech, PhD</h3>
                  <p className="text-sm text-neutral-500 mb-4">Associate Professor in CSE.<br/>Srinivasa Ramanujan Institute of Technology, Rotarypuram, Anantapuramu-515701.</p>
                  <div className="text-sm text-neutral-600 space-y-2">
                      <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /><strong>Mail:</strong> ecdcell@srit.ac.in</p>
                      <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /><strong>Mobile No:</strong> +91-9493682726</p>
                  </div>
              </div>
            </motion.article>

            {/* Document Accordions - NEW THEME */}
            <motion.article variants={itemVariants} className="rounded-xl border border-neutral-200/60 bg-white p-6 sm:p-9 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">Documents & Records</h2>
              
              <AccordionContainer className="w-full">
                <DepartmentAccordionRow
                  id="ecd"
                  index={0}
                  title="E-Learning Portal"
                  isOpen={activeTab === 'E-Learning Portal'}
                  onToggle={() => setActiveTab(activeTab === 'E-Learning Portal' ? '' : 'E-Learning Portal')}
                >
                  <div className="p-2 space-y-4">
                    <p className="text-center text-neutral-600 font-medium">Click Link to Enter E-Content Site</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {portalLinks.map((item, idx) => (
                        <a 
                          key={idx} 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-start gap-4 p-4 rounded-xl border border-orange-100 bg-white hover:bg-orange-50 hover:border-orange-200 transition-all group"
                        >
                          <div className="p-2 bg-orange-100 text-[#FF6600] rounded-lg shrink-0">
                            <BookOpen size={20} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-neutral-800 group-hover:text-[#FF6600] mb-1 leading-tight">{item.dept}</h4>
                            <span className="inline-flex items-center gap-1 text-xs text-[#FF6600] font-medium">
                              View E-Content <ExternalLink size={12} />
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </DepartmentAccordionRow>

                {accordions.map((tab, idx) => {
                  const isOpen = activeTab === tab.title
                  return (
                    <DepartmentAccordionRow
                      key={tab.title}
                      id="ecd"
                      index={idx + 1}
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
