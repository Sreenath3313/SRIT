import React, { useEffect, useState } from 'react'
import { BookOpen, MonitorPlay } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import PageHeader from '../../components/common/PageHeader'
import Footer from '../../components/layout/Footer'
import IframeWithLoader from '../../components/common/IframeWithLoader'
import { AccordionContainer, DepartmentAccordionRow } from '../../components/common/DepartmentAccordion'

export default function TPElearningPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    document.title = 'e-Learning | SRIT'
    const description =
      'Official Training & Placement e-Learning resources and training activities at Srinivasa Ramanujan Institute of Technology (SRIT).'
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [])

  const elearningItems = [
    {
      id: 'e-resources',
      title: 'E-Resources',
      icon: BookOpen,
      sheetUrl:
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSls4CAvBK8IO766XFdmdsIaetq2_UzPW0yK_kVOgiAGXy2yndpz5FRlA6YUUZUTCiHmn3GOpoqn4F3/pubhtml?widget=true&headers=false',
      height: 650
    },
    {
      id: 'training-activities',
      title: 'Training Activities',
      icon: MonitorPlay,
      sheetUrl:
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vRtkudTnEiAQZPfU9osugEeb_s9j1Pppma16ilqWXDRrJmTb0v3bPaqdlVoPTfhuQ/pubhtml?widget=true&headers=false',
      height: 650
    }
  ]

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader title="Training & Placement e-Learning" categoryTitle="Placements" />

      {/* Main Content Area */}
      <main className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-16 flex-1">
        <div className="w-full space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200/80 p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-2">
              Digital Learning &amp; Training Resources
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Access curated e-resources, online practice portals, coding material, and recorded training activities designed to empower SRIT students for technical placements.
            </p>
          </div>

          {/* Accordions List with Unified Department Theme */}
          <AccordionContainer className="w-full">
            {elearningItems.map((item, index) => {
              const isExpanded = openIndex === index
              const Icon = item.icon
              return (
                <DepartmentAccordionRow
                  key={item.id}
                  id={`elearning-${item.id}`}
                  index={index}
                  title={
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-[#FF6600] shrink-0" />
                      <span>{item.title}</span>
                    </span>
                  }
                  isOpen={isExpanded}
                  onToggle={() => toggleAccordion(index)}
                >
                  <div className="p-3 sm:p-5 bg-white">
                    <div
                      className="w-full rounded-xl overflow-hidden border border-[#FFD9C4] bg-white shadow-inner"
                      style={{ height: `${item.height}px` }}
                    >
                      <IframeWithLoader
                        src={item.sheetUrl}
                        title={`SRIT e-Learning ${item.title}`}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  </div>
                </DepartmentAccordionRow>
              )
            })}
          </AccordionContainer>
        </div>
      </main>

      <Footer />
    </div>
  )
}
