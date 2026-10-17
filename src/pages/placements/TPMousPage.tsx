import React, { useEffect, useState } from 'react'
import { Handshake } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import PageHeader from '../../components/common/PageHeader'
import Footer from '../../components/layout/Footer'
import IframeWithLoader from '../../components/common/IframeWithLoader'
import { AccordionContainer, DepartmentAccordionRow } from '../../components/common/DepartmentAccordion'

export interface MouItem {
  id: string
  title: string
  sheetUrl?: string
  height?: number
  text?: string
}

export const mousList: MouItem[] = [
  {
    id: 'eduskills',
    title: 'Eduskills Foundation',
    sheetUrl:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0Mi1aiHa-DRpQyR_VmN9CKGIrCqquC2z9PgWXQNQ-s1I7R_03nTwBtDPjvP0hIf5dRS3SZVOouo_4/pubhtml?widget=true&headers=false',
    height: 450
  },
  {
    id: 'tcs-yep',
    title: 'TCS Youth Employability Program',
    sheetUrl:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSlo6KQmatHUPtsleiD9714_W2ghygL83FvVNY7sY5-5X0WaDZeyFRrSUESqi-RkLMW2bA1DW7rgfJx/pubhtml?widget=true&headers=false',
    height: 450
  },
  {
    id: 'epam',
    title: 'EPAM Center of Excellence',
    sheetUrl:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSoadfqdKNNSzBYnG532njGFtVeMICl8B-EVGNWJMLAOIcEH0fP_ShQNf6Qj6r_YlgBVUDzlL0XtSA-/pubhtml?widget=true&headers=false',
    height: 480
  },
  {
    id: 'virtusa',
    title: 'Virtusa Center of Excellence',
    sheetUrl:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTedBkDg-7PKvijI6Bri_uTmjYiY2cjTbv-f1YGvROH3iUOuGf7lN_EDIGgwJTIK1B01ERvcHQlALml/pubhtml?widget=true&headers=false',
    height: 450
  },
  {
    id: 'wipro',
    title: 'Wipro Talent Next',
    sheetUrl:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vRDiwl2kBZqgIG6uSmFdkXRO5i9w4ZDeOgPW0toIzGTM_Ez60p6pkKJrLYYhQGubm115hpcFKjjpQk9/pubhtml?widget=true&headers=false',
    height: 450
  },
  {
    id: 'movate',
    title: 'Movate Center of Excellence',
    sheetUrl:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSxKArUxCCfk_KP3TF1Aj6gikUaZJ0I6DaZvz5v5d-03C5cDglhkBC5JAe-h3twJLwS0RkBWltt4xJ6/pubhtml?widget=true&headers=false',
    height: 450
  },
  {
    id: 'ict-academy',
    title: 'ICT Academy',
    text: 'SRIT maintains a strategic partnership with ICT Academy for faculty development programs, youth empowerment, and student skill certification.'
  },
  {
    id: 'tata-trust',
    title: 'TATA Community Initiatives Trust',
    sheetUrl:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vQk4pqdOYiDSX_x440NcHgq8D2qbwIZirNRCuuwYxSZAE2vfB0UINpVeQb1u_l5J6hRkweas80C9mwy/pubhtml?widget=true&headers=false',
    height: 480
  },
  {
    id: 'excelr',
    title: 'ExcelR',
    sheetUrl:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vT94A5tn5KqmpDl2Xfo3vFA2UhIvQQJxEiF8WtMMWSg2LlkI8bUZy5sJ3XW3wf_4e4ZHzg476s7F4s8/pubhtml?widget=true&headers=false',
    height: 500
  },
  {
    id: 'data-flair',
    title: 'Data Flair',
    sheetUrl:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vQjGbvuuHxj5TaHcsepavmlnqsGjeRYQ7gmq1kriZ89npclafbooOnfwdTDSd4Cf1ebbuOiV6tJ-Nm3/pubhtml?widget=true&headers=false',
    height: 500
  },
  {
    id: 'pantech',
    title: 'Pantech e Learning',
    sheetUrl:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vRaQ11Slxx2CXPYM2GYi_HRRDmeSCMzBiqc1CHt8cpN4wlucDge2MHpCFhzsWkc1u7nVyaB_xd1zfAg/pubhtml?widget=true&headers=false',
    height: 450
  },
  {
    id: 'smartbridge',
    title: 'Smartbridge',
    sheetUrl:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSaqUz0ZpBLF7HzYxj9x2pz2ul_W9zBisrDsL0y39sPX6tkIrvI_ZM3jET1BFQYlw/pubhtml?widget=true&headers=false',
    height: 450
  },
  {
    id: 'code-tantra',
    title: 'Code Tantra',
    sheetUrl:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSnKxW3G7c4f4K2aKkW2XmN1X_W2Q1j4nKq1XwZ6_yY8n0K7lM9N1X/pubhtml?widget=true&headers=false',
    height: 450
  },
  {
    id: 'salesforce',
    title: 'Salesforce (Trailhead Academic Partner)',
    text: 'Authorized Academic Alliance with Salesforce Trailhead enabling direct access to cloud developer curriculum, developer badges, and enterprise ecosystem certification.'
  },
  {
    id: 'aws-academy',
    title: 'AWS Academy',
    text: 'Official AWS Academy member institution delivering Cloud Computing, Cloud Architecting, and Solutions Architecture curriculum preparing students for industry AWS certifications.'
  }
]

export default function TPMousPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    document.title = 'MOUs & Collaborations | SRIT'
    const description =
      'Official MOUs and Industry Collaborations with Centers of Excellence at Srinivasa Ramanujan Institute of Technology (SRIT).'
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [])

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader title="MOUs & Collaborations" categoryTitle="Placements" />

      {/* Main Content Area */}
      <main className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-16 flex-1">
        <div className="w-full space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200/80 p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-2">
              Industry Partnerships &amp; Centers of Excellence
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              SRIT collaborates with leading global technology partners and industry leaders to establish Centers of Excellence, provide specialized certifications, and facilitate direct recruitment drives. Click on any MOU below to view details.
            </p>
          </div>

          {/* Accordions List with Unified Department Theme */}
          <AccordionContainer className="w-full">
            {mousList.map((mou, index) => {
              const isExpanded = openIndex === index
              return (
                <DepartmentAccordionRow
                  key={mou.id}
                  id={`mou-${mou.id}`}
                  index={index}
                  title={
                    <span className="flex items-center gap-2">
                      <Handshake className="h-4 w-4 text-[#FF6600] shrink-0" />
                      <span>{mou.title}</span>
                    </span>
                  }
                  isOpen={isExpanded}
                  onToggle={() => toggleAccordion(index)}
                >
                  <div className="p-3 sm:p-5 bg-white">
                    {mou.sheetUrl ? (
                      <div
                        className="w-full rounded-xl overflow-hidden border border-[#FFD9C4] bg-white shadow-inner"
                        style={{ height: `${mou.height || 450}px` }}
                      >
                        <IframeWithLoader
                          src={mou.sheetUrl}
                          title={`${mou.title} Live Data Sheet`}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                    ) : (
                      <div className="p-5 rounded-xl bg-[#FFFAF6] border border-[#FFD9C4] text-[#334155] text-sm leading-relaxed">
                        {mou.text || 'MOU details and active skill initiatives.'}
                      </div>
                    )}
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
