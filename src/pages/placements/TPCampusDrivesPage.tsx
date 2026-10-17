import React, { useEffect, useState } from 'react'
import { Building2 } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import PageHeader from '../../components/common/PageHeader'
import Footer from '../../components/layout/Footer'
import IframeWithLoader from '../../components/common/IframeWithLoader'
import { AccordionContainer, DepartmentAccordionRow } from '../../components/common/DepartmentAccordion'

export default function TPCampusDrivesPage() {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    document.title = 'Campus Drives | SRIT'
    const description =
      'Official Campus Drives schedule and placement recruitment details at Srinivasa Ramanujan Institute of Technology (SRIT).'
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

      <PageHeader title="Campus Drives" categoryTitle="Placements" />

      {/* Main Content Area */}
      <main className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-16 flex-1">
        <div className="w-full space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200/80 p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-2">
              Campus Recruitment Drives Schedule &amp; Live Tracker
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Official schedule, eligibility criteria, registered candidate lists, and ongoing campus recruitment drive records.
            </p>
          </div>

          <AccordionContainer className="w-full">
            <DepartmentAccordionRow
              id="campus-drives-tracker"
              index={0}
              title={
                <span className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#FF6600] shrink-0" />
                  <span>Campus Drives Data Tracker</span>
                </span>
              }
              isOpen={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
            >
              <div className="p-3 sm:p-5 bg-white">
                <div className="w-full h-[800px] rounded-xl overflow-hidden border border-[#FFD9C4] bg-white shadow-inner">
                  <IframeWithLoader
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSrEMEyriU1V7vBqzLIwvb9xstWfCC2VAhliaPpXSmvJI0-oF7-98Jerl9sRkidHy5DqIdtw3ZFSndF/pubhtml?widget=true&headers=false"
                    title="SRIT Campus Drives Live Sheet"
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
