import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, Plus, Minus, ExternalLink } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import PageHeader from '../../components/common/PageHeader'
import Footer from '../../components/layout/Footer'
import IframeWithLoader from '../../components/common/IframeWithLoader'
import { AccordionContainer, DepartmentAccordionRow } from '../../components/common/DepartmentAccordion'

export default function EamcetRanksPage() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.title = 'EAMCET Ranks | SRIT'
    const description = 'Official SRIT EAMCET / EAPCET Previous Cutoff Ranks and Admission Statistics.'
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [])

  const rawSpreadsheetUrl = "https://docs.google.com/spreadsheets/u/0/d/e/2PACX-1vSqDcs5apke8i1PHF3YhDsX6utrVxCPuwfHRHY1XYpGrlIGNEdZ_avkqEbZjqs3ylXfqN2ktrxrwKie/pubhtml"
  const embedSpreadsheetUrl = `${rawSpreadsheetUrl}?widget=false&headers=false&chrome=false`

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader title="EAMCET Ranks" categoryTitle="Admissions" />

      {/* Main Content Area */}
      <main className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-16 flex-1">
        <div className="space-y-6">

          <AccordionContainer className="w-full">
            <DepartmentAccordionRow
              id="eapcet-ranks"
              index={0}
              title="EAPCET / EAMCET Previous Cutoff Ranks & Admission Statistics"
              isOpen={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
            >
              <div className="bg-white p-4 sm:p-6 transition-all duration-300 space-y-4">
                
                {/* Top Action Link */}
                <div className="flex items-center justify-end">
                  <a
                    href={rawSpreadsheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#FF6600] hover:underline font-semibold text-xs sm:text-sm"
                  >
                    Open Google Sheet in New Tab <ExternalLink size={14} />
                  </a>
                </div>

                {/* Google Sheet Embed */}
                <div className="w-full rounded-xl border border-neutral-200 overflow-hidden shadow-inner bg-white" style={{ height: '800px' }}>
                  <IframeWithLoader
                    src={embedSpreadsheetUrl}
                    title="EAPCET Previous Ranks Spreadsheet"
                    className="w-full h-full border-0"
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
