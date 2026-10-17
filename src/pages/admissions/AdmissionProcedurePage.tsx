import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import PageHeader from '../../components/common/PageHeader'
import Footer from '../../components/layout/Footer'

export default function AdmissionProcedurePage() {
  const categoryTitle = 'Admissions'
  const title = 'Admission Procedure'

  useEffect(() => {
    document.title = `${title} | SRIT`
    const description = 'Official SRIT Admission Procedure: Category-A, Category-B, Lateral Entry, Criteria and Weightages for Admission, and Qualification requirements.'
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [title])

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader title="Admission Procedure" categoryTitle="Admissions" />

      {/* Main Content Area - Extended Left and Right to Fill Screen Gaps */}
      <main className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-16 flex-1">
        <article className="w-full bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">

          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#FF6600] to-[#FF6600] text-white px-6 sm:px-10 py-7">
            <span className="text-white/80 text-xs uppercase tracking-widest font-bold">Official Guidelines</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide mt-1">
              Admission Procedure
            </h2>
          </div>

          {/* Exact Text Content - Polished Theme */}
          <div className="p-6 sm:p-10 md:p-12 space-y-8 text-neutral-800 text-sm sm:text-base leading-relaxed font-sans">

            {/* Paragraph 1 */}
            <div className="p-5 sm:p-6 rounded-xl border border-orange-100 bg-orange-50/30">
              <p className="leading-relaxed text-justify">
                The entire process of admission is carried out by adopting a transparent procedure, of filling up category-A &amp; Category-B seats. Category-A seats are filled up by the convener of Admissions, EAMCET based on the ranks of the candidates, following the rule of reservation. Category B seats are filled up by the Management of the college, following the guidelines issued by the APSCHE. The admissions into the second year of B. Tech, known as a lateral entry (20% of the sanctioned intake of seats) are made by the ECET convener.
              </p>
            </div>

            {/* Section: Criteria and Weightages for Admission */}
            <div className="p-5 sm:p-6 rounded-xl border border-neutral-200/80 bg-white space-y-4">
              <h3 className="font-sans font-bold text-lg sm:text-xl text-neutral-900 tracking-tight flex items-center gap-2.5">
                <span className="h-4 w-1.5 rounded-full bg-[#FF6600]" />
                <span><span className="text-[#FF6600]">Criteria</span> and <span className="text-[#FF6600]">Weightages</span> for Admission:</span>
              </h3>

              <p className="leading-relaxed">
                Describe each criterion with its respective weightage i.e., Admission Test, marks in qualifying examination, etc.
              </p>

              <p className="leading-relaxed">
                The Criteria for admission are prescribed by the Govt. of Andhra Pradesh and JNTU University, Ananthapuramu issued every year, through a common prospectus for admission of professional degree courses.
              </p>
            </div>

            {/* Section: Qualification */}
            <div className="p-5 sm:p-6 rounded-xl border border-neutral-200/80 bg-white space-y-4">
              <h4 className="font-sans font-bold text-lg sm:text-xl text-neutral-900 tracking-tight flex items-center gap-2.5">
                <span className="h-4 w-1.5 rounded-full bg-[#FF6600]" />
                <span>Qualification:</span>
              </h4>

              <p className="leading-relaxed">
                A pass in 12th Standard of Andhra Pradesh Board of Intermediate (Academic) with mathematics, physics, and chemistry or equivalent.
              </p>

              <p className="leading-relaxed text-neutral-600 text-xs sm:text-sm">
                For SC/ST candidates, a mere pass in the qualifying examination will suffice and the minimum marks are the same as the passing minimum for APSCHE/Diploma of the State of Andhra Pradesh. Candidates belonging to communities other than SC/ST should have obtained the minimum marks for admission.
              </p>
            </div>

          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
