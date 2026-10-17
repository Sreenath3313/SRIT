import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ExternalLink, Users, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { navLinks } from '../../data/navigation'
import PageHeader from '../../components/common/PageHeader';
import { AccordionContainer, DepartmentAccordionRow } from '../../components/common/DepartmentAccordion';

const committeeMembers = [
  { sNo: 1, name: "Dr. G. Balakrishna", designation: "Principal", role: "Chairman", contact: "7893005520" },
  { sNo: 2, name: "Dr. L. Vamsi Krishna", designation: "Assoc. Prof. of ME", role: "Convener", contact: "9494592820" },
  { sNo: 3, name: "Dr. K. Uma Maheswari", designation: "Assoc. Prof. of Mathematics", role: "Faculty Member nominated by Principal", contact: "9490607121" },
  { sNo: 4, name: "Dr. S. Nagaraju", designation: "Professor of ECE", role: "Faculty Member nominated by Principal", contact: "9642073576" },
  { sNo: 5, name: "Ms. B.Shravani", designation: "Asst. Professor of EEE", role: "Faculty Member nominated by Principal", contact: "9885233050" },
  { sNo: 6, name: "Ms. M. Kusuma", designation: "R.No. 224G1A0444, Student of IV. B.Tech (ECE)", role: "Meritorious student nominated by Principal", contact: "8247309480" },
  { sNo: 7, name: "Rector (Officiating)", designation: "JNTUA", role: "Ombudsperson appointed by JNTUA", contact: "9000551418" }
]

export default function SgrcPage() {
  const categoryTitle = 'Committees'
  const title = 'Students Grievance Redressal Committee (SGRC)'
  const navGroup = navLinks.find((item) => item.label === categoryTitle)
  
  const [activeTab, setActiveTab] = useState<string>('Committee Members')

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
            
            {/* Constitution & Submit Action */}
            <motion.article variants={itemVariants} className="rounded-xl border border-neutral-200/60 bg-white p-6 sm:p-9 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-primary text-xs font-bold tracking-[.16em] uppercase mb-4">
                Overview
              </div>
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">Constitution of Student Grievance Redressal Committee (SGRC)</h2>
              
              <div className="group relative bg-neutral-50/80 border border-orange-100/80 rounded-xl p-7 hover:border-orange-300/50 transition-colors duration-300 mb-8">
                <p className="text-neutral-700 leading-relaxed text-sm md:text-base relative z-10">
                  As per the AICTE (Redressal of Grievance of Students) Regulations, 2019, vide F.No.1101/PGRC/AICTE/Regulations/2019, dated 07-11-2019, the Student Grievance Redressal Committee (SGRC) is constituted with the following members to address the Grievances of students if any.
                </p>
              </div>

              <div className="border-t border-neutral-100 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-neutral-50/50 rounded-xl p-6 border border-neutral-100">
                  <div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">Have a Grievance?</h3>
                      <p className="text-sm text-neutral-600">For any Grievances, students can submit a formal complaint online.</p>
                  </div>
                  <a 
                    href="https://forms.gle/1WjXVhpLQpnrzCRP8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-orange-600 hover:-translate-y-0.5 transition-all shadow-[0_8px_20px_rgba(255,84,34,0.3)] shrink-0"
                  >
                      Submit Complaint <ExternalLink size={16} />
                  </a>
              </div>
            </motion.article>

            {/* Document Accordions - NEW THEME */}
            <motion.article variants={itemVariants} className="rounded-xl border border-neutral-200/60 bg-white p-6 sm:p-9 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                <div className="p-2.5 bg-orange-50 rounded-xl text-primary">
                  <Users size={22} />
                </div>
                Committee Details
              </h2>
              
              <AccordionContainer className="w-full">
                {[
                  { title: 'Committee Members', type: 'table' }
                ].map((tab, idx) => {
                  const isOpen = activeTab === tab.title
                  return (
                    <DepartmentAccordionRow
                      key={tab.title}
                      id="sgrc"
                      index={idx}
                      title={tab.title}
                      isOpen={isOpen}
                      onToggle={() => setActiveTab(isOpen ? '' : tab.title)}
                    >
                      <div className="overflow-x-auto rounded-xl border border-orange-100 shadow-inner bg-neutral-50 p-2">
                        <table className="w-full text-left text-sm text-neutral-600">
                          <thead className="bg-[#FF6600] text-white">
                            <tr>
                              <th className="px-4 py-3 font-semibold whitespace-nowrap">S. No</th>
                              <th className="px-4 py-3 font-semibold whitespace-nowrap">Name</th>
                              <th className="px-4 py-3 font-semibold whitespace-nowrap">Designation</th>
                              <th className="px-4 py-3 font-semibold whitespace-nowrap">Role</th>
                              <th className="px-4 py-3 font-semibold whitespace-nowrap">Contact No.</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200 bg-white">
                            {committeeMembers.map((member) => (
                              <tr key={member.sNo} className="hover:bg-orange-50/40 transition-colors">
                                <td className="px-4 py-3 font-medium text-neutral-900">{member.sNo}</td>
                                <td className="px-4 py-3 font-medium text-neutral-900">{member.name}</td>
                                <td className="px-4 py-3">{member.designation}</td>
                                <td className="px-4 py-3">{member.role}</td>
                                <td className="px-4 py-3">{member.contact}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
