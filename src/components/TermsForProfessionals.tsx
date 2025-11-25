import { ArrowUp, Shield, Lock } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useState } from "react";

export function TermsForProfessionals() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: "By registering as a service professional or vendor on Pamper Pro, you agree to comply with these Terms and Conditions. If you do not agree to these terms, you may not use our platform. We reserve the right to modify these terms at any time, and your continued use of the platform constitutes acceptance of any changes."
    },
    {
      id: "user-responsibilities",
      title: "2. Professional Responsibilities",
      content: `As a professional on Pamper Pro, you agree to:
• Provide accurate and truthful information in your profile and service listings
• Maintain professional conduct with all clients
• Deliver services as described and agreed upon
• Respond to client inquiries in a timely manner
• Maintain proper licensing and qualifications as required by law
• Comply with all health and safety regulations
• Not engage in discriminatory practices
• Maintain confidentiality of client information
• Not use the platform for any illegal activities`
    },
    {
      id: "service-standards",
      title: "3. Service Standards and Quality",
      content: `You commit to maintaining high-quality service standards:
• Services must be delivered as advertised on your profile
• You are responsible for cancellation policies and notice periods
• Provide accurate pricing and transparent cost breakdown
• Maintain professional hygiene and safety standards
• Not overbook or fail to deliver promised services
• Address client complaints professionally and promptly
• Keep detailed records of service delivery
• Provide fair and honest service descriptions`
    },
    {
      id: "gdpr-compliance",
      title: "4. GDPR Compliance (EU Data Protection)",
      content: `In accordance with the General Data Protection Regulation (EU) 2016/679:
• You may only process personal data you collect for legitimate business purposes
• You must obtain explicit consent before processing client data
• You have the right to access, rectify, or delete your personal data
• You must implement appropriate security measures to protect client data
• Data breaches must be reported to Pamper Pro immediately
• You are responsible for third-party data processors you engage
• You must maintain records of data processing activities
• You cannot transfer personal data outside the EU without adequate safeguards
• Clients have the right to data portability
• You must comply with data retention periods and delete data when no longer needed`
    },
    {
      id: "ndpr-compliance",
      title: "5. NDPR Compliance (Nigeria Data Protection)",
      content: `In accordance with the Nigeria Data Protection Regulation (NDPR):
• You must protect the personal data of Nigerian clients and users
• Obtain clear consent before collecting or processing personal information
• You are accountable for data processing activities under your control
• Implement security measures appropriate to the sensitivity of data collected
• Report any data breaches to Pamper Pro within 30 days
• Respect the right to privacy and confidentiality of client information
• Ensure data accuracy and keep information up to date
• Comply with requests to access or delete personal data
• Do not engage in unauthorized processing or disclosure of data
• Maintain documentation of your data handling practices`
    },
    {
      id: "payment-terms",
      title: "6. Payment and Financial Terms",
      content: `Payment terms and conditions for professionals:
• Payments are processed based on the plan selected (Pay-per-booking or Monthly Subscription)
• For Pay-per-booking: 20% commission is deducted from each booking amount
• For Monthly Subscription: Fixed monthly fee is charged in advance
• Payments are issued via registered payment methods on file
• Minimum payout thresholds may apply
• You are responsible for all taxes on earnings
• Refunds are issued within 5-7 business days
• Failed payments may result in account suspension
• You must maintain valid payment information at all times
• No refunds for cancellations made within 48 hours of service`
    },
    {
      id: "intellectual-property",
      title: "7. Intellectual Property Rights",
      content: `Regarding content and intellectual property:
• You retain ownership of your original content (photos, descriptions)
• You grant Pamper Pro a license to display your content on the platform
• Pamper Pro may use your content for marketing purposes with your consent
• You warrant that content you upload is original and not infringing
• You must not use others' copyrighted or trademarked material
• You grant clients the right to leave reviews and share their experience
• Pamper Pro's platform, logo, and branding remain our exclusive property
• You may not copy, reproduce, or distribute platform content`
    },
    {
      id: "liability",
      title: "8. Limitation of Liability",
      content: `Limitation of liability and indemnification:
• Pamper Pro is provided on an "as-is" basis
• We are not liable for service quality issues between you and clients
• We are not responsible for data loss or technical failures beyond our control
• You indemnify Pamper Pro against claims arising from your conduct
• Maximum liability of Pamper Pro is limited to fees paid in the last 3 months
• We are not liable for indirect, incidental, or consequential damages
• You are responsible for obtaining appropriate business insurance
• Client disputes are your responsibility to resolve
• You assume all risks related to service delivery`
    },
    {
      id: "dispute-resolution",
      title: "9. Dispute Resolution",
      content: `Dispute resolution process:
• First attempt: Direct negotiation between you and the client
• Second attempt: Pamper Pro mediation if direct resolution fails
• Pamper Pro will review evidence from both parties
• Decisions are binding and final
• For financial disputes, resolution must occur within 30 days
• You may appeal decisions within 7 days of notification
• For GDPR/NDPR violations, disputes go to regulatory authorities
• Legal fees are borne by the party found at fault
• Unresolved disputes may result in account suspension or termination`
    },
    {
      id: "termination",
      title: "10. Account Termination",
      content: `Account termination conditions:
• You may terminate your account at any time with notice
• Pamper Pro may terminate your account for:
  - Repeated policy violations
  - Poor service quality or complaints
  - Data protection violations
  - Fraudulent or illegal activity
  - Non-payment of subscription fees
  - Harassment or unprofessional conduct
• Upon termination, you lose access to the platform
• Outstanding payments remain due
• Client data must be deleted within 30 days (GDPR/NDPR compliant)
• You may request data export before account closure`
    },
    {
      id: "privacy-policy",
      title: "11. Data Privacy and Security",
      content: `Your data privacy rights and our responsibilities:
• Your personal information is encrypted and securely stored
• We do not share your data with third parties without consent
• You have the right to request what data we hold about you
• You can request correction or deletion of inaccurate data
• We retain data only as long as necessary for service provision
• You have the right to lodge complaints with data protection authorities
• We comply with both GDPR and NDPR data protection standards
• Security audits are conducted regularly
• You must report security concerns immediately
• Data transfers are made only to certified processors`
    },
    {
      id: "cookies",
      title: "12. Cookies and Tracking",
      content: `Information about our use of cookies and tracking:
• We use cookies to improve user experience and platform functionality
• Essential cookies are necessary for platform operation
• Analytical cookies help us understand usage patterns
• You may disable non-essential cookies in your browser settings
• Third-party tools may use cookies with your consent
• We comply with ePrivacy Directive and NDPR on tracking
• Cookie preferences can be managed in account settings
• Marketing communications require separate opt-in consent
• Do-Not-Track signals are respected where applicable`
    },
    {
      id: "regulatory-compliance",
      title: "13. Regulatory Compliance",
      content: `Compliance with applicable laws:
• You must comply with all applicable Nigerian laws
• EU-based professionals must comply with GDPR
• Professional licensing requirements must be maintained
• Health and safety regulations must be followed
• Tax obligations are your sole responsibility
• You must comply with anti-money laundering (AML) regulations
• Sanctions and PEP screening may be required
• You are responsible for understanding your legal obligations
• Changes in law will be communicated promptly
• Non-compliance may result in account suspension`
    },
    {
      id: "modifications",
      title: "14. Modifications to Terms",
      content: `How we handle changes to these terms:
• We may modify terms at any time
• Material changes will be communicated 30 days in advance
• Your continued use constitutes acceptance of new terms
• You have the right to terminate before changes take effect
• Archived versions of terms will be available for reference
• Notification will be sent via email and on your dashboard
• Changes to data protection terms require explicit consent
• Historic rights under old terms are preserved
• You can view the change history of these terms`
    },
    {
      id: "contact",
      title: "15. Contact and Complaints",
      content: `How to contact us and file complaints:
• Support email: support@pamperpro.ng
• General inquiries: hello@pamperpro.ng
• Data protection officer: dpo@pamperpro.ng
• Complaints can be filed via your dashboard or email
• Response time: 48 business hours
• Formal complaints are escalated to management
• You have the right to lodge complaints with:
  - Nigerian Data Protection Commission (for NDPR)
  - EU Data Protection Authorities (for GDPR)
  - Local regulatory bodies in your jurisdiction
• Complaint handling is documented and tracked
• Regular feedback is used to improve our policies`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-[#3d6a68]" />
            <h1 className="text-4xl font-bold text-gray-900">Terms of Service for Professionals</h1>
          </div>
          <p className="text-gray-600 text-lg mb-4">
            Complete terms and conditions for service professionals and vendors on Pamper Pro
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="h-4 w-4 text-green-600" />
              GDPR Compliant
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="h-4 w-4 text-green-600" />
              NDPR Compliant
            </div>
            <div className="text-sm text-gray-500">
              Last updated: November 2024
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold text-gray-900 mb-3">Quick Navigation:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setExpandedSection(section.id);
                    setTimeout(() => {
                      document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="text-left text-sm text-[#3d6a68] hover:text-[#2d5a58] hover:underline transition-colors"
                >
                  {section.title.split(".")[1].trim().split(" ").slice(0, 2).join(" ")}...
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <div className="space-y-4 mb-12">
          {sections.map((section) => (
            <Card
              key={section.id}
              id={section.id}
              className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                  <span className={`text-[#3d6a68] transition-transform duration-300 ${expandedSection === section.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </CardHeader>
              {expandedSection === section.id && (
                <CardContent className="pt-0">
                  <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{section.content}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Important Notice */}
        <Card className="border-2 border-amber-200 bg-amber-50 mb-8">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-amber-900 mb-3">⚠️ Important Notice</h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              These terms are provided for informational purposes and constitute the complete agreement between you and Pamper Pro. 
              By using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms. 
              If you have specific legal concerns, we recommend consulting with a qualified legal professional. 
              For GDPR compliance matters, the EU Data Protection Authority is the governing body. 
              For NDPR compliance matters, the Nigerian Data Protection Commission oversees enforcement.
            </p>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-[#3d6a68] to-[#2d5a58] text-white mb-12">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-white mb-3">Questions About These Terms?</h3>
            <p className="text-white/90 mb-4">
              If you have any questions or concerns about these terms, please contact our support team:
            </p>
            <div className="space-y-2">
              <p className="text-white text-sm"><strong>Email:</strong> support@pamperpro.ng</p>
              <p className="text-white text-sm"><strong>Data Protection Officer:</strong> dpo@pamperpro.ng</p>
              <p className="text-white text-sm"><strong>Response Time:</strong> Within 48 business hours</p>
            </div>
          </CardContent>
        </Card>

        {/* Scroll to Top Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={scrollToTop}
            className="bg-[#3d6a68] hover:bg-[#2d5a58] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
