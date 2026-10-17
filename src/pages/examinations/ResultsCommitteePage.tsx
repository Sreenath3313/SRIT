import { useState, useEffect } from 'react'
import { FileText, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { AccordionContainer, DepartmentAccordionRow } from '../../components/common/DepartmentAccordion'
import { navLinks } from '../../data/navigation'
import resultsCommitteeData from '../../data/resultsCommittee.json'
import PageHeader from '../../components/common/PageHeader';

export default function ResultsCommitteePage() {
  const categoryTitle = 'Examination'
  const title = 'Results Committee'
  const navGroup = navLinks.find((item) => item.label === 'Examination')

  const [activeTab, setActiveTab] = useState(resultsCommitteeData[0]?.academicYear || '')

  useEffect(() => {
    document.title = `${title} | SRIT`
    const description = `Official SRIT information for Examination ${title}.`
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) { 
        tag = document.createElement('meta'); 
        tag.setAttribute('name', 'description'); 
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', description)
  }, [title])

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <Navbar />
      <PageHeader title={title} categoryTitle={categoryTitle} icon={<FileText size={26} />} />
      
      <main className="max-w-[1300px] w-full mx-auto px-4 sm:px-6 py-10 lg:py-16 flex-1">
        <div className="flex flex-col gap-8 w-full">
          <article className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-9 shadow-sm">
            <p className="text-primary text-xs font-bold tracking-[.16em] uppercase">{categoryTitle}</p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-neutral-900 mb-6">{title}</h2>
            
            <AccordionContainer>
              {resultsCommitteeData.map((tab, index) => {
                const isOpen = activeTab === tab.academicYear;
                return (
                  <DepartmentAccordionRow
                    key={tab.academicYear}
                    id="results-committee"
                    index={index}
                    title={tab.academicYear}
                    isOpen={isOpen}
                    onToggle={() => setActiveTab(isOpen ? '' : tab.academicYear)}
                    contentClassName="p-0 sm:p-0"
                  >
                    <div className="w-full overflow-x-auto">
                      <table className="w-full text-left text-sm text-neutral-700">
                        <thead className="text-white border-b border-neutral-200">
                          <tr className="bg-[#f27441]">
                            <th scope="col" className="px-4 py-4 font-bold text-center border-r border-white/20 w-20">S. No</th>
                            <th scope="col" className="px-4 py-4 font-bold text-center border-r border-white/20">Name & Designation</th>
                            <th scope="col" className="px-4 py-4 font-bold text-center">Role</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 bg-white">
                          {tab.members.map((member, memberIdx) => (
                            <tr key={memberIdx} className="hover:bg-neutral-50/50 transition-colors">
                              <td className="px-4 py-4 font-semibold align-top text-center border-r border-neutral-200">{member.sno}</td>
                              <td className="px-4 py-4 align-top leading-relaxed border-r border-neutral-200">{member.details}</td>
                              <td className="px-4 py-4 align-top leading-relaxed text-center font-medium">{member.role}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </DepartmentAccordionRow>
                );
              })}
            </AccordionContainer>
            
          </article>
          
          
        </div>
      </main>
      <Footer />
    </div>
  )
}
