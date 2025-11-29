import { Lock, Eye, Shield, AlertCircle } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-6">
            <Lock className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-slate-900 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg mb-2">Last updated: January 2024</p>
          <p className="text-teal-600 font-semibold">Your Data. Your Control. Our Commitment.</p>
        </div>

        {/* Trust Banner */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 border-2 border-teal-200 rounded-xl p-6 md:p-8 mb-12">
          <div className="flex items-start gap-4">
            <Eye className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">We Take Your Privacy Seriously</h3>
              <p className="text-teal-800 mb-3">
                At Pamper Pro, your privacy is our top priority. We're fully compliant with GDPR (EU) and NDPR (Nigeria) regulations.
              </p>
              <p className="text-teal-700 text-sm">
                This policy explains how we collect, use, and protect your personal data. If you have questions, contact us at privacy@pamperprong.com.
              </p>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              '1. Information We Collect',
              '2. How We Use Your Data',
              '3. Data Sharing & Third Parties',
              '4. Your GDPR Rights',
              '5. Your NDPR Rights',
              '6. Data Security',
              '7. Cookies & Tracking',
              '8. Data Retention',
              '9. Children\'s Privacy',
              '10. International Transfers',
              '11. Updates to This Policy',
              '12. Contact Information',
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
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-semibold text-gray-900 mb-2">📝 Account Information</p>
                  <p className="text-sm">Full name, email address, phone number, password, profile photo</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-semibold text-gray-900 mb-2">💳 Payment Information</p>
                  <p className="text-sm">Credit/debit card details, bank account info (processed securely through Stripe)</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-semibold text-gray-900 mb-2">📍 Location Data</p>
                  <p className="text-sm">Service address, home location (for booking purposes)</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-semibold text-gray-900 mb-2">📊 Usage Information</p>
                  <p className="text-sm">Pages visited, time spent, search history, booking history</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-semibold text-gray-900 mb-2">🎖️ Verification Documents</p>
                  <p className="text-sm">For professionals: License, certification, ID verification, address proof</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Data</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">We use your information to:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Provide and improve our services</li>
                <li>Process bookings and payments</li>
                <li>Send booking confirmations and reminders</li>
                <li>Send marketing communications (you can opt out)</li>
                <li>Verify professional credentials</li>
                <li>Handle customer support requests</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
                <li>Analyze usage patterns to improve platform</li>
                <li>Personalize your experience</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
              <h2 className="text-2xl font-bold text-gray-900">Data Sharing & Third Parties</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">We may share your data with:</p>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-900">Service Providers</p>
                  <p className="text-sm text-blue-800">Payment processors (Stripe), email services, SMS providers</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-900">Legal Requirements</p>
                  <p className="text-sm text-blue-800">When required by law or to protect our rights</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-900">Business Partners</p>
                  <p className="text-sm text-blue-800">Analytics platforms, customer support tools</p>
                </div>
              </div>
              <p className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
                <span className="font-semibold">Important:</span> We never sell your data to third parties. We only share what's necessary for service delivery.
              </p>
            </div>
          </section>

          {/* Section 4: GDPR Rights */}
          <section id="section-4" className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 border-2 border-blue-200">
            <div className="flex items-start gap-4 mb-4">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-blue-900">Your GDPR Rights (EU Users)</h2>
            </div>
            <div className="ml-10 space-y-4 text-blue-900">
              <p className="font-semibold">If you're in the EU, you have these rights:</p>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-700 mb-1">🔍 Right of Access</p>
                  <p className="text-sm">Request a copy of all your personal data we hold</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-700 mb-1">✏️ Right of Rectification</p>
                  <p className="text-sm">Correct inaccurate or incomplete data</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-700 mb-1">🗑️ Right to Erasure</p>
                  <p className="text-sm">Request deletion of your data (right to be forgotten)</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-700 mb-1">⛔ Right to Restrict Processing</p>
                  <p className="text-sm">Limit how we use your data</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-700 mb-1">📤 Right to Data Portability</p>
                  <p className="text-sm">Receive your data in a machine-readable format</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-700 mb-1">🚫 Right to Object</p>
                  <p className="text-sm">Opt-out of marketing, profiling, or automated decisions</p>
                </div>
              </div>
              <p className="mt-4 p-4 bg-blue-50 rounded-lg text-sm">
                <span className="font-semibold text-blue-900">How to Request:</span> Email gdpr@pamperprong.com with "GDPR Request" in the subject line. We respond within 30 days.
              </p>
            </div>
          </section>

          {/* Section 5: NDPR Rights */}
          <section id="section-5" className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-lg p-8 border-2 border-green-200">
            <div className="flex items-start gap-4 mb-4">
              <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-green-900">Your NDPR Rights (Nigeria Users)</h2>
            </div>
            <div className="ml-10 space-y-4 text-green-900">
              <p className="font-semibold">If you're in Nigeria, you have these rights:</p>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-700 mb-1">🔍 Right of Access</p>
                  <p className="text-sm">Request and access your personal data</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-700 mb-1">✏️ Right to Correction</p>
                  <p className="text-sm">Correct inaccurate personal data</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-700 mb-1">🗑️ Right to Deletion</p>
                  <p className="text-sm">Request deletion of your personal data</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-700 mb-1">📤 Right to Data Portability</p>
                  <p className="text-sm">Get your data in a structured, portable format</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-700 mb-1">📋 Right to Lodge Complaints</p>
                  <p className="text-sm">Report violations to the NDPC (Nigeria Data Protection Commission)</p>
                </div>
              </div>
              <p className="mt-4 p-4 bg-green-50 rounded-lg text-sm">
                <span className="font-semibold text-green-900">How to Request:</span> Email privacy@pamperprong.com. We respond within 30 days. NDPC: www.ndpc.gov.ng
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="section-6" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">6</div>
              <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">We protect your data with:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li><span className="font-semibold">SSL/TLS Encryption:</span> All data in transit is encrypted</li>
                <li><span className="font-semibold">AES Encryption:</span> Data at rest is encrypted</li>
                <li><span className="font-semibold">PCI-DSS Compliance:</span> Payment data meets industry standards</li>
                <li><span className="font-semibold">ISO 27001 Certification:</span> Information security management</li>
                <li><span className="font-semibold">Regular Audits:</span> Security reviews and penetration testing</li>
                <li><span className="font-semibold">Access Controls:</span> Limited employee access to personal data</li>
                <li><span className="font-semibold">Two-Factor Authentication:</span> Optional for extra security</li>
              </ul>
              <p className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                <span className="font-semibold">Data Breach Notification:</span> If a breach occurs, we notify affected users within 72 hours (GDPR requirement).
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="section-7" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">7</div>
              <h2 className="text-2xl font-bold text-gray-900">Cookies & Tracking</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">We use cookies for:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li><span className="font-semibold">Essential Cookies:</span> Keep you logged in, security</li>
                <li><span className="font-semibold">Analytics Cookies:</span> Google Analytics (non-identifying)</li>
                <li><span className="font-semibold">Preference Cookies:</span> Remember your settings</li>
                <li><span className="font-semibold">Marketing Cookies:</span> Personalized ads (optional)</li>
              </ul>
              <p className="mt-4"><span className="font-semibold">Your Control:</span> You can disable non-essential cookies in your browser settings. Essential cookies cannot be disabled as they keep the site functional.</p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="section-8" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">8</div>
              <h2 className="text-2xl font-bold text-gray-900">Data Retention</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">We keep your data for:</p>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-semibold">Active Accounts:</p>
                  <p className="text-sm">For the duration of your account + 90 days after deletion</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-semibold">Booking History:</p>
                  <p className="text-sm">3 years (for legal/financial compliance)</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-semibold">Payment Data:</p>
                  <p className="text-sm">3-7 years (for tax/accounting compliance)</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-semibold">Support Tickets:</p>
                  <p className="text-sm">2 years after resolution</p>
                </div>
              </div>
              <p className="mt-4">You can request deletion anytime via privacy@pamperprong.com</p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="section-9" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">9</div>
              <h2 className="text-2xl font-bold text-gray-900">Children's Privacy</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p>Pamper Pro is not intended for children under 18 years old.</p>
              <p>We do not knowingly collect data from children under 18. If we discover that a child has provided personal information, we will immediately delete it.</p>
              <p>Parents who believe their child has provided information to Pamper Pro should contact us immediately at privacy@pamperprong.com.</p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="section-10" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">10</div>
              <h2 className="text-2xl font-bold text-gray-900">International Data Transfers</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">For EU Users (GDPR):</p>
              <p>If your data is transferred outside the EU, we use:</p>
              <ul className="list-disc list-inside mb-4">
                <li>Standard Contractual Clauses (SCCs)</li>
                <li>Binding Corporate Rules (BCRs)</li>
                <li>Adequacy Decisions</li>
              </ul>
              <p className="font-semibold text-gray-900">For Nigeria Users (NDPR):</p>
              <p>Data is primarily stored in Nigeria and West Africa. International transfers comply with NDPR requirements.</p>
            </div>
          </section>

          {/* Section 11 */}
          <section id="section-11" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">11</div>
              <h2 className="text-2xl font-bold text-gray-900">Updates to This Policy</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p>We may update this Privacy Policy occasionally. We'll notify you of significant changes by:</p>
              <ul className="list-disc list-inside mb-4">
                <li>Email notification</li>
                <li>Posted notice on our website</li>
                <li>Requiring renewed consent</li>
              </ul>
              <p>Your continued use of Pamper Pro after changes means you accept the updated policy.</p>
            </div>
          </section>

          {/* Section 12 */}
          <section id="section-12" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">12</div>
              <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">For privacy-related questions, contact:</p>
              <div className="space-y-3 mt-4">
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <p className="font-semibold text-teal-900">General Privacy Inquiries</p>
                  <p className="text-sm text-teal-700">privacy@pamperprong.com</p>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <p className="font-semibold text-teal-900">GDPR Requests (EU Users)</p>
                  <p className="text-sm text-teal-700">gdpr@pamperprong.com</p>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <p className="font-semibold text-teal-900">Support & General Questions</p>
                  <p className="text-sm text-teal-700">support@pamperprong.com</p>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <p className="font-semibold text-teal-900">Data Protection Commissioner (Nigeria)</p>
                  <p className="text-sm text-teal-700">complaints@ndpc.gov.ng | www.ndpc.gov.ng</p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-teal-600 to-slate-900 rounded-xl shadow-lg p-8 text-center text-white mt-12">
            <h3 className="text-2xl font-bold mb-4">Privacy Questions?</h3>
            <p className="mb-6 text-teal-100">Your data privacy is important to us. We're happy to answer any questions.</p>
            <a href="mailto:privacy@pamperprong.com" className="inline-block px-8 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Our Privacy Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
