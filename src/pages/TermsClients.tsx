import { CheckCircle, Shield, Lock, AlertCircle } from 'lucide-react';

export function TermsClients() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-6">
            <Shield className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-slate-900 bg-clip-text text-transparent mb-4">
            Terms & Conditions for Clients
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
                  <span>Book beauty & wellness services from verified professionals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Cancel bookings within 24 hours for full refund</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Your personal data is protected by GDPR & NDPR</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Secure payments and guaranteed satisfaction</span>
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
              '2. Using Pamper Pro',
              '3. Booking Services',
              '4. Payment & Refunds',
              '5. Cancellation Policy',
              '6. Data Protection (GDPR)',
              '7. Data Protection (NDPR)',
              '8. SMS Notifications',
              '9. Reviews & Ratings',
              '10. Prohibited Activities',
              '11. Liability Disclaimer',
              '12. Dispute Resolution',
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
                Welcome to <span className="font-semibold text-teal-700">Pamper Pro</span>, your trusted marketplace for beauty and wellness services.
              </p>
              <p>
                By using Pamper Pro, you agree to these Terms & Conditions and our <span className="font-semibold">Privacy Policy</span>.
              </p>
              <p>
                We're committed to protecting your privacy in compliance with <span className="font-semibold">GDPR</span> and <span className="font-semibold">NDPR</span>.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
              <h2 className="text-2xl font-bold text-gray-900">Using Pamper Pro</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">As a client, you agree to:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Be at least 18 years old</li>
                <li>Provide accurate information in your profile</li>
                <li>Respect service professionals and their time</li>
                <li>Not engage in abusive or harassing behavior</li>
                <li>Keep your account secure and confidential</li>
                <li>Not use the platform for illegal activities</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
              <h2 className="text-2xl font-bold text-gray-900">Booking Services</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">How to Book:</p>
              <ol className="space-y-2 list-decimal list-inside">
                <li>Search for professionals or services</li>
                <li>Select your preferred service and time slot</li>
                <li>Confirm the booking and payment</li>
                <li>Receive confirmation via email and SMS</li>
              </ol>
              <p className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="font-semibold text-blue-900">Payment:</span> Payment is collected at booking and held until service completion.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
              <h2 className="text-2xl font-bold text-gray-900">Payment & Refunds</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">Payment Processing:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Secure payment processing through Stripe</li>
                <li>All transactions are encrypted and secure</li>
                <li>We accept all major credit and debit cards</li>
                <li>Bank transfers available for payments</li>
              </ul>
              <p className="mt-4"><span className="font-semibold">Receipts:</span> Digital receipts sent to your email after each transaction</p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-8 border-2 border-orange-200">
            <div className="flex items-start gap-4 mb-4">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-orange-900">Cancellation & Refund Policy</h2>
            </div>
            <div className="ml-10 space-y-4 text-orange-900">
              <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
                <p className="font-semibold text-orange-700 mb-2">24-Hour Cancellation Window</p>
                <p className="text-sm">Cancel within 24 hours of booking for a full refund</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
                <p className="font-semibold text-orange-700 mb-2">Refund Processing</p>
                <p className="text-sm">Refunds are processed within 5-7 business days</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-orange-200">
                <p className="font-semibold text-orange-700 mb-2">No-Show Cancellation</p>
                <p className="text-sm">If you don't show up for an appointment, no refund is issued</p>
              </div>
              <p className="mt-4 text-sm">Contact support@pamperprong.com for refund requests</p>
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
              <h2 className="text-2xl font-bold text-gray-900">SMS Notifications</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p>We may send you SMS notifications about:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Booking confirmations</li>
                <li>Service reminders</li>
                <li>Professional messages</li>
                <li>Payment confirmations</li>
                <li>Account updates</li>
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
              <h2 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">When Leaving Reviews:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Be honest and fair in your feedback</li>
                <li>Don't include personal information</li>
                <li>Don't use offensive or abusive language</li>
                <li>Base reviews on your actual experience</li>
                <li>Avoid defamatory or false claims</li>
              </ul>
              <p className="mt-4">We reserve the right to remove reviews that violate these guidelines.</p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="section-10" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">10</div>
              <h2 className="text-2xl font-bold text-gray-900">Prohibited Activities</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">You cannot:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Use the platform for illegal purposes</li>
                <li>Harass, threaten, or abuse professionals</li>
                <li>Attempt to bypass payment systems</li>
                <li>Share false reviews or ratings</li>
                <li>Disclose professional personal information</li>
                <li>Engage in fraudulent activity</li>
              </ul>
              <p className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                <span className="font-semibold">Violations:</span> Violating these rules may result in account suspension or termination.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section id="section-11" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">11</div>
              <h2 className="text-2xl font-bold text-gray-900">Liability Disclaimer</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">Important:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Pamper Pro is not liable for service quality or outcomes</li>
                <li>We don't provide medical or professional advice</li>
                <li>Users assume all health and safety risks</li>
                <li>We're not responsible for professional misconduct</li>
                <li>Our liability is limited to the booking fee</li>
              </ul>
              <p className="mt-4">Always ensure the service professional is qualified and licensed for their services.</p>
            </div>
          </section>

          {/* Section 12 */}
          <section id="section-12" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">12</div>
              <h2 className="text-2xl font-bold text-gray-900">Dispute Resolution</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">If you have a dispute:</p>
              <ol className="space-y-2 list-decimal list-inside">
                <li>Contact our support team at support@pamperprong.com</li>
                <li>We'll review the issue within 5 business days</li>
                <li>We'll attempt to resolve the issue amicably</li>
                <li>If unresolved, disputes go to binding arbitration</li>
              </ol>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-teal-600 to-slate-900 rounded-xl shadow-lg p-8 text-center text-white mt-12">
            <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
            <p className="mb-6 text-teal-100">Our support team is ready to help you!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:support@pamperprong.com" className="px-6 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Support
              </a>
              <a href="mailto:privacy@pamperprong.com" className="px-6 py-3 bg-teal-700 text-white rounded-lg font-semibold hover:bg-teal-800 transition-colors border border-white">
                Privacy Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
