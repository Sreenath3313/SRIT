import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/common/PageHeader';
import { ShieldCheck, FileText, RefreshCw, CreditCard, Mail, Phone, MapPin } from 'lucide-react';

interface LegalPoliciesPageProps {
  type: 'privacy' | 'terms' | 'refund';
}

export default function LegalPoliciesPage({ type }: LegalPoliciesPageProps) {
  useEffect(() => {
    const titles = {
      privacy: 'Privacy Policy | SRIT',
      terms: 'Terms & Conditions | SRIT',
      refund: 'Refund & Cancellation Policy | SRIT',
    };
    document.title = titles[type];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [type]);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader
        title={
          type === 'privacy'
            ? 'Privacy Policy'
            : type === 'terms'
            ? 'Terms & Conditions'
            : 'Refund & Cancellation Policy'
        }
        categoryTitle="Institutional Policies"
      />

      <main className="max-w-[1100px] w-full mx-auto px-4 sm:px-6 py-10 lg:py-14 flex-1">
        {/* Navigation Tabs between Policies */}
        <div className="flex flex-wrap gap-2.5 mb-8 border-b border-neutral-200 pb-4">
          <Link
            to="/privacy-policy"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              type === 'privacy'
                ? 'bg-[#FF6600] text-white shadow-sm'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:border-orange-300 hover:text-[#FF6600]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Privacy Policy
          </Link>
          <Link
            to="/terms-and-conditions"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              type === 'terms'
                ? 'bg-[#FF6600] text-white shadow-sm'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:border-orange-300 hover:text-[#FF6600]'
            }`}
          >
            <FileText className="w-4 h-4" />
            Terms &amp; Conditions
          </Link>
          <Link
            to="/refund-and-cancellation"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              type === 'refund'
                ? 'bg-[#FF6600] text-white shadow-sm'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:border-orange-300 hover:text-[#FF6600]'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            Refund &amp; Cancellation
          </Link>
          <Link
            to="/admissions/online-fee-payment"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-white text-neutral-700 border border-neutral-200 hover:border-orange-300 hover:text-[#FF6600] transition-all"
          >
            <CreditCard className="w-4 h-4" />
            Fee Payments
          </Link>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 sm:p-10 text-neutral-800 space-y-8">
          {type === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-neutral-900">Privacy Policy</h2>
                <p className="text-xs text-neutral-500 mt-1">Last Updated: Academic Year 2025–26</p>
              </div>

              <p className="text-[15px] leading-relaxed text-neutral-700">
                Srinivasa Ramanujan Institute of Technology (SRIT) is committed to respecting and protecting the privacy of our students, parents, faculty, alumni, and visitors. This Privacy Policy outlines our practices concerning the collection, use, and safeguarding of personal information provided through our website and institutional portals.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-neutral-900">1. Information Collection</h3>
                <p className="text-[15px] leading-relaxed text-neutral-700">
                  We collect information necessary to facilitate academic administration, admissions, examinations, and fee processing. This may include student names, contact numbers, email addresses, academic credentials, and payment reference identifiers.
                </p>

                <h3 className="text-lg font-bold text-neutral-900">2. Usage of Information</h3>
                <p className="text-[15px] leading-relaxed text-neutral-700">
                  Personal data collected through the portal is strictly used for official educational and administrative purposes, including student enrollment, verifying fee transactions, dispatching circulars/notifications, and issuing authentic university certifications.
                </p>

                <h3 className="text-lg font-bold text-neutral-900">3. Data Security &amp; Protection</h3>
                <p className="text-[15px] leading-relaxed text-neutral-700">
                  SRIT employs strict technical and physical safeguards to prevent unauthorized access, disclosure, or misuse of user records. Payment information processed via official banking gateways is encrypted in compliance with applicable standards.
                </p>

                <h3 className="text-lg font-bold text-neutral-900">4. Third-Party Disclosures</h3>
                <p className="text-[15px] leading-relaxed text-neutral-700">
                  SRIT does not sell, trade, or rent personal data to external third parties. Information may only be shared with authorized educational statutory bodies (AICTE, JNTUA, APSCHE) as mandated by government regulations.
                </p>
              </div>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-neutral-900">Terms &amp; Conditions</h2>
                <p className="text-xs text-neutral-500 mt-1">Effective for all portal users</p>
              </div>

              <p className="text-[15px] leading-relaxed text-neutral-700">
                Welcome to the official web portal of Srinivasa Ramanujan Institute of Technology (SRIT). By accessing or using this website and affiliated online services, you agree to comply with and be bound by the following terms and conditions.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-neutral-900">1. Intellectual Property</h3>
                <p className="text-[15px] leading-relaxed text-neutral-700">
                  All contents of this website, including college insignia, logos, course materials, imagery, and text, are the intellectual property of SRIT and protected by relevant copyright and trademark laws. Unauthorized reproduction or commercial distribution is prohibited.
                </p>

                <h3 className="text-lg font-bold text-neutral-900">2. Portal Usage &amp; Accuracy</h3>
                <p className="text-[15px] leading-relaxed text-neutral-700">
                  Users agree to provide accurate and truthful details when submitting online forms, application requests, or examination e-service inquiries. Any attempt to compromise server integrity, transmit malicious code, or submit falsified records is subject to disciplinary and legal action.
                </p>

                <h3 className="text-lg font-bold text-neutral-900">3. Fee Transactions &amp; Gateway Responsibilities</h3>
                <p className="text-[15px] leading-relaxed text-neutral-700">
                  While online fee payments are facilitated via trusted national banking channels, users are advised to verify account particulars and maintain transaction acknowledgement receipts. The institution is not liable for network drops or technical downtime originating from the user&apos;s banking service.
                </p>

                <h3 className="text-lg font-bold text-neutral-900">4. Institutional Discretion</h3>
                <p className="text-[15px] leading-relaxed text-neutral-700">
                  SRIT reserves the right to modify academic schedules, fee structures, examination protocols, and website policies as per circulars issued by affiliating university (JNTUA) and regulatory authorities.
                </p>
              </div>
            </div>
          )}

          {type === 'refund' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-neutral-900">Refund &amp; Cancellation Policy</h2>
                <p className="text-xs text-neutral-500 mt-1">Fee Reimbursements, Cancellations &amp; Settlements</p>
              </div>

              <p className="text-[15px] leading-relaxed text-neutral-700">
                This policy outlines the regulations governing fee cancellations, duplicate payment reversals, and institutional refund processes at Srinivasa Ramanujan Institute of Technology (SRIT).
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-neutral-900">1. Admission Cancellation &amp; Tuition Refunds</h3>
                <p className="text-[15px] leading-relaxed text-neutral-700">
                  Refund of tuition and institutional fees in the event of admission cancellation shall be governed strictly by the guidelines and schedule prescribed by the All India Council for Technical Education (AICTE) and the Andhra Pradesh State Council of Higher Education (APSCHE) for the respective academic session.
                </p>

                <h3 className="text-lg font-bold text-neutral-900">2. Duplicate or Erroneous Transactions</h3>
                <p className="text-[15px] leading-relaxed text-neutral-700">
                  In case a student or parent makes a duplicate payment or is charged multiple times due to a payment gateway timeout or technical failure, the excess amount will be refunded after verification by the Accounts Department.
                </p>

                <div className="bg-orange-50 border-l-4 border-[#FF6600] p-4 rounded-r-md">
                  <p className="text-sm font-medium text-orange-950">
                    To claim a refund for duplicate deductions, please email your transaction reference ID, student roll number, bank payment receipt, and account details to <a href="mailto:hr@srit.ac.in" className="text-[#FF6600] font-bold underline">hr@srit.ac.in</a>.
                  </p>
                </div>

                <h3 className="text-lg font-bold text-neutral-900">3. Resolution Timeline</h3>
                <p className="text-[15px] leading-relaxed text-neutral-700">
                  Verified duplicate charges or eligible refund requests are normally processed within 7 to 10 working days, credited back to the source bank account from which the original payment was initiated.
                </p>

                <h3 className="text-lg font-bold text-neutral-900">4. Non-Refundable Components</h3>
                <p className="text-[15px] leading-relaxed text-neutral-700">
                  Application processing fees, certificate verification charges, and specific administrative exam fees once processed are non-refundable.
                </p>
              </div>
            </div>
          )}

          {/* Contact Strip */}
          <div className="mt-8 pt-8 border-t border-neutral-100 bg-neutral-50 p-6 rounded-lg border border-neutral-200">
            <h3 className="text-base font-bold text-neutral-900 mb-3">Accounts &amp; Administrative Grievance Contact:</h3>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-neutral-700">
              <a href="tel:9515611111" className="flex items-center gap-2 hover:text-[#FF6600] transition-colors">
                <Phone className="w-4 h-4 text-[#FF6600]" />
                +91-951 561 1111
              </a>
              <a href="mailto:hr@srit.ac.in" className="flex items-center gap-2 hover:text-[#FF6600] transition-colors">
                <Mail className="w-4 h-4 text-[#FF6600]" />
                hr@srit.ac.in
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF6600]" />
                Rotarypuram, Anantapur — 515701
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
