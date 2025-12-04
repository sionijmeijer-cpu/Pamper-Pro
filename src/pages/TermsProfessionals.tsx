import { CheckCircle, Shield, Lock, AlertCircle } from 'lucide-react';

export function TermsProfessionals() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-6">
            <Shield className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-slate-900 bg-clip-text text-transparent mb-4">
            Terms & Conditions for Professionals
          </h1>
          <p className="text-gray-600 text-lg mb-2">Last updated: January 2024</p>
          <p className="text-teal-600 font-semibold">Compliant with GDPR & NDPR</p>
        </div>

        {/* Quick Summary Card */}
        <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6 md:p-8 mb-12">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">Quick Summary</h3>
              <ul className="space-y-2 text-teal-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Join our platform with your professional credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Monthly membership: ₦16,350 after 7-day free trial</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Your data is protected by GDPR & NDPR regulations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>We take your privacy and security seriously</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              '1. Introduction',
              '2. Service Terms',
              '3. Account & Membership',
              '4. Professional Standards',
              '5. Payment & Billing',
              '6. Data Protection (GDPR)',
              '7. Data Protection (NDPR)',
              '8. SMS Communications',
              '9. Intellectual Property',
              '10. Liability & Indemnification',
              '11. Dispute Resolution',
              '12. Account Termination',
            ].map((item, idx) => (
              <a
                key={idx}
                href={`#section-${idx + 1}`}
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-teal-50 text-teal-700 hover:text-teal-900 transition-colors"
              >
                <span className="font-semibold">{item}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section id="section-1" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
              <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p>
                Welcome to <span className="font-semibold text-teal-700">Pamper Pro</span>, the premier marketplace connecting beauty and wellness professionals with clients across Nigeria and beyond.
              </p>
              <p>
                By signing up and using Pamper Pro as a service professional, you agree to these Terms & Conditions and our <span className="font-semibold">Privacy Policy</span>.
              </p>
              <p>
                We comply with both <span className="font-semibold">GDPR</span> (for EU users) and <span className="font-semibold">NDPR</span> (Nigeria Data Protection Regulation).
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
              <h2 className="text-2xl font-bold text-gray-900">Service Terms</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">As a professional on Pamper Pro, you:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Hold valid licenses and certifications for your services</li>
                <li>Maintain professional standards and conduct</li>
                <li>Provide accurate service descriptions and pricing</li>
                <li>Are responsible for your own liability insurance</li>
                <li>Comply with all local and national regulations</li>
                <li>Maintain up-to-date professional credentials</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
              <h2 className="text-2xl font-bold text-gray-900">Account & Membership</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">Membership Plan:</p>
              <div className="bg-gradient-to-r from-teal-50 to-slate-50 p-4 rounded-lg border border-teal-200 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Standard Membership</span>
                  <span className="text-2xl font-bold text-teal-600">₦16,350</span>
                </div>
                <p className="text-sm text-gray-600">/month after 7-day free trial</p>
              </div>
              <p><span className="font-semibold">Free Trial:</span> Enjoy 7 days of full access at no cost</p>
              <p><span className="font-semibold">Auto-Renewal:</span> Your membership renews monthly unless cancelled</p>
              <p><span className="font-semibold">Cancellation:</span> You can cancel anytime from your account settings</p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
              <h2 className="text-2xl font-bold text-gray-900">Professional Standards</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">You must maintain:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Professional conduct at all times</li>
                <li>Hygiene and safety standards</li>
                <li>Punctuality and reliability</li>
                <li>Client confidentiality</li>
                <li>Professional appearance and demeanor</li>
                <li>Current training and certifications</li>
              </ul>
              <p className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                <span className="font-semibold">Violations:</span> Breaching these standards may result in warnings, suspension, or permanent removal from the platform.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">5</div>
              <h2 className="text-2xl font-bold text-gray-900">Payment & Billing</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">Payment Processing:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Payments are processed securely through Paystack/Flutterwave</li>
                <li>Basic Plan: 20% commission per booking</li>
                <li>Standard Plan: ₦16,350/month (auto-renewed)</li>
                <li>Premium Plan: ₦23,850/month (auto-renewed)</li>
                <li>Refund requests handled within 14 days</li>
                <li>Bank account verification required for payouts</li>
              </ul>
              <p className="mt-4"><span className="font-semibold">Invoices:</span> Digital invoices sent to your email after each transaction</p>
            </div>
          </section>

          {/* Section 6: GDPR */}
          <section id="section-6" className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 border-2 border-blue-200">
            <div className="flex items-start gap-4 mb-4">
              <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-blue-900">Data Protection: GDPR Compliance</h2>
            </div>
            <div className="ml-10 space-y-4 text-blue-900">
              <p className="font-semibold">Your GDPR Rights (EU Users):</p>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-700">✓ Right to Access</p>
                  <p className="text-sm">Request a copy of all your personal data</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-700">✓ Right to Rectification</p>
                  <p className="text-sm">Correct inaccurate or incomplete data</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-700">✓ Right to Erasure</p>
                  <p className="text-sm">Request deletion of your data (right to be forgotten)</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-700">✓ Right to Data Portability</p>
                  <p className="text-sm">Receive your data in a portable format</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-700">✓ Right to Object</p>
                  <p className="text-sm">Opt-out of certain types of processing</p>
                </div>
              </div>
              <p className="mt-4 text-sm"><span className="font-semibold">Response Time:</span> We respond to GDPR requests within 30 days</p>
              <p className="text-sm"><span className="font-semibold">Contact:</span> gdpr@pamperprong.com</p>
            </div>
          </section>

          {/* Section 7: NDPR */}
          <section id="section-7" className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-lg p-8 border-2 border-green-200">
            <div className="flex items-start gap-4 mb-4">
              <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-green-900">Data Protection: NDPR Compliance</h2>
            </div>
            <div className="ml-10 space-y-4 text-green-900">
              <p className="font-semibold">Your NDPR Rights (Nigeria Users):</p>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-700">✓ Right of Access</p>
                  <p className="text-sm">Request and access your personal data</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-700">✓ Right to Correction</p>
                  <p className="text-sm">Correct inaccurate personal data</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-700">✓ Right to Deletion</p>
                  <p className="text-sm">Request deletion of your personal data</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-700">✓ Right to Data Portability</p>
                  <p className="text-sm">Get your data in a structured, portable format</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-700">✓ Right to Lodge Complaints</p>
                  <p className="text-sm">Report violations to the NDPC (Nigeria Data Protection Commission)</p>
                </div>
              </div>
              <p className="mt-4 text-sm"><span className="font-semibold">Response Time:</span> We respond to NDPR requests within 30 days</p>
              <p className="text-sm"><span className="font-semibold">Contact:</span> privacy@pamperprong.com</p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="section-8" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">8</div>
              <h2 className="text-2xl font-bold text-gray-900">SMS Communications</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p>By signing up, you opt-in to receive SMS notifications about:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>New booking requests</li>
                <li>Client messages</li>
                <li>Account notifications</li>
                <li>Payment receipts</li>
                <li>Platform updates</li>
              </ul>
              <p className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="font-semibold text-blue-900">Opt-Out:</span> Reply "STOP" to any SMS to unsubscribe. Reply "HELP" for support.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="section-9" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">9</div>
              <h2 className="text-2xl font-bold text-gray-900">Intellectual Property</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p>All content, images, and materials on Pamper Pro are owned by Pamper Pro or licensed partners.</p>
              <p>You retain ownership of your professional photos and service descriptions. By uploading content, you grant Pamper Pro a license to display it on the platform.</p>
              <p>You cannot reproduce, redistribute, or sell any platform content without permission.</p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="section-10" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">10</div>
              <h2 className="text-2xl font-bold text-gray-900">Liability & Indemnification</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">Important:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>You are solely responsible for your services and conduct</li>
                <li>Pamper Pro is not liable for service quality or outcomes</li>
                <li>You must maintain professional liability insurance</li>
                <li>You agree to indemnify Pamper Pro for any claims arising from your services</li>
                <li>We are not responsible for client disputes or payment issues</li>
              </ul>
            </div>
          </section>

          {/* Section 11 */}
          <section id="section-11" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">11</div>
              <h2 className="text-2xl font-bold text-gray-900">Dispute Resolution</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">If you have a dispute:</p>
              <ol className="space-y-2 list-decimal list-inside">
                <li>Contact our support team at support@pamperprong.com</li>
                <li>We'll review the issue within 5 business days</li>
                <li>If unresolved, disputes go to binding arbitration</li>
                <li>Arbitration is conducted in Nigeria</li>
              </ol>
            </div>
          </section>

          {/* Section 12 */}
          <section id="section-12" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">12</div>
              <h2 className="text-2xl font-bold text-gray-900">Account Termination</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">We may terminate your account if you:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Violate these Terms & Conditions</li>
                <li>Breach professional standards</li>
                <li>Engage in fraudulent activity</li>
                <li>Receive multiple client complaints</li>
                <li>Fail to maintain valid credentials</li>
              </ul>
              <p className="mt-4"><span className="font-semibold">Your Data:</span> Upon termination, we retain your data for 90 days. After that, your data is permanently deleted in compliance with GDPR and NDPR.</p>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-teal-600 to-slate-900 rounded-xl shadow-lg p-8 text-center text-white mt-12">
            <h3 className="text-2xl font-bold mb-4">Questions about our Terms?</h3>
            <p className="mb-6 text-teal-100">Contact our support team - we're here to help!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:support@pamperprong.com" className="px-6 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Email Support
              </a>
              <a href="mailto:gdpr@pamperprong.com" className="px-6 py-3 bg-teal-700 text-white rounded-lg font-semibold hover:bg-teal-800 transition-colors border border-white">
                Privacy Questions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
