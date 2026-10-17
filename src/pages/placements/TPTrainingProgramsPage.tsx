import React, { useEffect, useState } from 'react'
import { BookOpen } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import PageHeader from '../../components/common/PageHeader'
import Footer from '../../components/layout/Footer'
import IframeWithLoader from '../../components/common/IframeWithLoader'
import { AccordionContainer, DepartmentAccordionRow } from '../../components/common/DepartmentAccordion'

export default function TPTrainingProgramsPage() {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    document.title = 'Training Programs | SRIT'
    const description =
      'Official Training Programs conducted by Training & Placement Cell at Srinivasa Ramanujan Institute of Technology (SRIT).'
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader title="Training Programs" categoryTitle="Placements" />

      {/* Main Content Area */}
      <main className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-16 flex-1">
        <div className="w-full space-y-8">

          {/* Banner Graphic Card */}
          <div className="bg-white rounded-xl border border-neutral-200/80 p-4 sm:p-6 shadow-sm overflow-hidden flex justify-center">
            <img
              src="https://www.srit.ac.in/wp-content/uploads/2022/08/Training-768x373.png"
              alt="SRIT Training Program Banner"
              className="rounded-xl max-h-[380px] w-auto object-contain"
              loading="lazy"
            />
          </div>

          {/* Training Schedule Document Card with Accordion */}
          <AccordionContainer className="w-full">
            <DepartmentAccordionRow
              id="training-schedule-tracker"
              index={0}
              title={
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#FF6600] shrink-0" />
                  <span>Training Schedule &amp; Course Structure Tracker</span>
                </span>
              }
              isOpen={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
            >
              <div className="p-3 sm:p-5 bg-white">
                <div className="w-full h-[800px] sm:h-[1000px] rounded-xl overflow-hidden border border-[#FFD9C4] bg-white shadow-inner">
                  <IframeWithLoader
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRXXbFF905K-gqxcGMcr4v4JngDAsJgzkC40N2QnIuKz57jyF2ADHOvc_Yi6eJgdCAhFN-sF3eL4qno/pubhtml?widget=true&headers=false"
                    title="SRIT Training Programs Schedule"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>
            </DepartmentAccordionRow>
          </AccordionContainer>

        </div>
      </main>

      <Footer />
    </div>
  )
}
