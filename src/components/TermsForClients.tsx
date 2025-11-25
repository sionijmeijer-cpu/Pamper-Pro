import { ArrowUp, Shield, Heart } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useState } from "react";

export function TermsForClients() {
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
      content: "By using Pamper Pro to book beauty and wellness services, you agree to comply with these Terms and Conditions. If you do not agree to these terms, please do not use our platform. We reserve the right to modify these terms at any time. Your continued use of the platform signifies your acceptance of any changes."
    },
    {
      id: "user-account",
      title: "2. User Account",
      content: `Your account responsibilities:
• You must provide accurate, truthful, and complete information
• You are responsible for maintaining the confidentiality of your password
• You are responsible for all activities under your account
• You must not create multiple accounts or impersonate others
• You must be at least 18 years old to create an account
• You agree to receive communication from Pamper Pro via email or in-app
• You must update your information if details change
• Account suspension may occur for violation of these terms`
    },
    {
      id: "booking-terms",
      title: "3. Booking and Service Terms",
      content: `Terms related to booking services:
• Bookings are confirmed between you and the service professional
• You must arrive on time for your appointment
• Cancellations must be made according to the professional's cancellation policy
• Refunds are processed according to the professional's specific policy
• No-show may result in forfeiture of payment
• You must communicate changes via the platform messaging system
• Service professionals may cancel bookings in emergency situations
• Disputes about service quality should be raised within 48 hours
• Reviews can only be left for completed services
• Payment is required at the time of booking confirmation`
    },
    {
      id: "payment-security",
      title: "4. Payment and Security",
      content: `Payment terms and security:
• All payments are processed securely through our payment partners
• We use industry-standard encryption to protect financial information
• Your payment details are never stored on our servers
• Failed payments may result in cancellation of your booking
• Refunds are processed within 5-7 business days
• You are responsible for any fraudulent charges on your account
• Report suspicious transactions immediately to our support team
• Multiple payment methods are available for your convenience
• Currency conversions follow current market rates
• Receipt and payment confirmation are sent via email`
    },
    {
      id: "user-conduct",
      title: "5. User Conduct and Behavior",
      content: `Expected conduct as a client:
• You must treat service professionals with respect
• No discrimination, harassment, or abusive behavior is tolerated
• Do not engage in illegal activities via the platform
• Do not attempt to bypass our payment system
• Do not share personal contact information to avoid platform fees
• Do not request services outside the scope of what professionals offer
• Maintain professional and appropriate communication
• Respect the privacy and dignity of service professionals
• Do not attempt to manipulate ratings or reviews
• Violation of conduct standards may result in account suspension or permanent ban`
    },
    {
      id: "service-quality",
      title: "6. Service Quality and Satisfaction",
      content: `Service quality expectations:
• Service professionals are independent contractors, not Pamper Pro employees
• Service quality is the responsibility of the individual professional
• Pamper Pro is not liable for service quality issues
• Report quality concerns to the professional first for resolution
• If unresolved, file a complaint within 48 hours of service
• Pamper Pro may mediate disputes between clients and professionals
• Ratings and reviews should reflect your honest experience
• False reviews may result in account suspension
• Service professionals have the right to refuse service to disruptive clients`
    },
    {
      id: "cancellation-refund",
      title: "7. Cancellation and Refund Policy",
      content: `Our cancellation and refund policy:
• Each professional may have their own cancellation policy
• Review cancellation terms before confirming your booking
• Cancellations made 24+ hours before appointment: Full refund
• Cancellations made 12-24 hours before: 50% refund
• Cancellations made less than 12 hours before: No refund
• Professional-initiated cancellations: Full refund
• No-show to appointment: No refund
• Refunds are processed within 5-7 business days
• Refund requests must be made within 30 days of service date
• System credit may be offered as alternative to monetary refund`
    },
    {
      id: "data-protection",
      title: "8. Data Protection and Privacy",
      content: `Your data protection rights (GDPR and NDPR Compliant):
• Your personal information is treated confidentially
• We only collect information necessary for service provision
• You have the right to access your personal data
• You can request correction of inaccurate information
• You have the right to request deletion of your data
• Your data is protected with industry-standard security
• We do not share your information with third parties without consent
• Service professionals may only use your data for appointment purposes
• GDPR: EU residents have additional rights to data portability
• NDPR: Nigerian users' data is protected under NDPR standards
• Report data breaches immediately to dpo@pamperpro.ng`
    },
    {
      id: "ratings-reviews",
      title: "9. Ratings, Reviews, and Feedback",
      content: `Guidelines for ratings and reviews:
• You may leave reviews only for services you have used
• Reviews must be honest and accurate
• Abusive, discriminatory, or false reviews will be removed
• Do not reveal private information in reviews
• Reviews should focus on service quality and professionalism
• You may update or delete your own reviews
• Service professionals have the right to respond to reviews
• Fake reviews or review manipulation will result in account suspension
• Reviews are published in compliance with consumer protection laws
• Ratings help improve the quality of professionals on our platform`
    },
    {
      id: "liability-disclaimer",
      title: "10. Limitation of Liability",
      content: `Limitation of liability:
• Pamper Pro provides the platform "as-is" without warranties
• We are not responsible for service quality or professional conduct
• We are not liable for personal injury or property damage during services
• You assume responsibility for choosing a professional
• We are not liable for data loss or technical failures beyond our control
• Maximum liability of Pamper Pro is limited to the amount you paid
• We are not liable for indirect, incidental, or consequential damages
• Some jurisdictions do not allow liability limitations
• You are responsible for obtaining proper insurance if needed
• Service professionals maintain their own liability insurance`
    },
    {
      id: "health-safety",
      title: "11. Health and Safety",
      content: `Health and safety considerations:
• Disclose any allergies or health conditions to your professional
• Professionals may refuse service if safety cannot be ensured
• You are responsible for your own health and safety
• Report any health concerns to your professional immediately
• Follow professional advice regarding pre- and post-service care
• If you have infectious diseases, reschedule your appointment
• Pregnant clients should consult healthcare providers before services
• Professionals follow health and safety regulations
• Report unsanitary conditions to support immediately
• Personal hygiene practices are expected on both sides`
    },
    {
      id: "intellectual-property",
      title: "12. Intellectual Property",
      content: `Regarding content and intellectual property:
• Content on Pamper Pro is protected by copyright and trademark laws
• You may not reproduce, distribute, or transmit platform content
• You grant Pamper Pro the right to use your reviews and feedback
• You grant professionals the right to use photos taken during services (with consent)
• You may not use content for commercial purposes without permission
• Before and after photos shared should only include the client
• Pamper Pro retains all rights to platform design and functionality
• Do not attempt to reverse engineer or copy platform features
• Your personal reviews and content remain your intellectual property`
    },
    {
      id: "compliance",
      title: "13. Legal Compliance",
      content: `Compliance and legal obligations:
• These terms comply with Nigerian consumer protection laws
• GDPR compliance for EU users
• NDPR compliance for Nigerian users
• Local laws may impose additional obligations
• You are responsible for understanding applicable laws in your jurisdiction
• Pamper Pro complies with anti-money laundering regulations
• Tax obligations on services are your responsibility
• Illegal activities are strictly prohibited
• Violation of laws may result in account termination and legal action
• Pamper Pro cooperates with law enforcement when required`
    },
    {
      id: "dispute-resolution",
      title: "14. Dispute Resolution",
      content: `How disputes are resolved:
• First attempt: Direct communication with the service professional
• Second attempt: Pamper Pro mediation service
• Pamper Pro will review both parties' evidence
• Decision will be issued within 30 days of complaint
• Both parties will be notified of the resolution
• You may appeal within 7 days of the decision
• Mediation decisions are binding
• For unresolved disputes, legal remedies may be available
• You have the right to contact regulatory authorities
• Formal complaints are documented and tracked`
    },
    {
      id: "termination",
      title: "15. Account Termination",
      content: `Account termination and suspension:
• You may terminate your account at any time
• Your data will be deleted within 30 days upon request
• Pamper Pro may suspend or terminate your account for:
  - Violations of these terms
  - Abusive or harassing behavior
  - Non-payment of outstanding fees
  - Fraudulent activity
  - Multiple complaints from service professionals
  - Data protection violations
  - Illegal activity
• Upon termination, your right to use the platform ends immediately
• Outstanding payments remain due
• Data will be handled according to GDPR/NDPR requirements`
    },
    {
      id: "modifications",
      title: "16. Changes to Terms",
      content: `How we handle changes to these terms:
• We may update these terms at any time
• Material changes will be notified 30 days in advance
• Your continued use after notification means acceptance
• You may terminate your account before new terms take effect
• All previous versions will be archived
• Change history is available for reference
• Data protection terms require your explicit consent if changed
• We will clearly highlight what has changed
• Notification will be sent via email and dashboard
• Historic agreements remain valid for past transactions`
    },
    {
      id: "contact-support",
      title: "17. Contact Information",
      content: `How to reach us and get support:
• Support email: support@pamperpro.ng
• General inquiries: hello@pamperpro.ng
• Data protection concerns: dpo@pamperpro.ng
• Response time: Within 48 business hours
• Complaints can be filed via your dashboard or email
• We maintain a complaints register for your records
• You have the right to escalate complaints
• For GDPR complaints: Contact your EU Data Protection Authority
• For NDPR complaints: Contact the Nigerian Data Protection Commission
• Professional support is available during business hours
• Live chat support available in the mobile app`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-pink-600" />
            <h1 className="text-4xl font-bold text-gray-900">Terms of Service for Clients</h1>
          </div>
          <p className="text-gray-600 text-lg mb-4">
            Complete terms and conditions for beauty service clients on Pamper Pro
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-pink-600" />
              Your Rights Protected
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-pink-600" />
              GDPR & NDPR Compliant
            </div>
            <div className="text-sm text-gray-500">
              Last updated: November 2024
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <Card className="mb-8 bg-pink-50 border-pink-200">
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
                  className="text-left text-sm text-pink-600 hover:text-pink-700 hover:underline transition-colors"
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
                  <span className={`text-pink-600 transition-transform duration-300 ${expandedSection === section.id ? 'rotate-180' : ''}`}>
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
        <Card className="border-2 border-purple-200 bg-purple-50 mb-8">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-purple-900 mb-3">ℹ️ Client Rights Summary</h3>
            <ul className="text-sm text-purple-800 space-y-2">
              <li>✓ Right to fair and high-quality service</li>
              <li>✓ Right to transparent pricing and policies</li>
              <li>✓ Right to cancel with appropriate notice</li>
              <li>✓ Right to fair refunds</li>
              <li>✓ Right to privacy and data protection</li>
              <li>✓ Right to leave honest reviews</li>
              <li>✓ Right to dispute resolution</li>
              <li>✓ Right to access your personal data</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-pink-600 to-pink-700 text-white mb-12">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-white mb-3">Need Help?</h3>
            <p className="text-white/90 mb-4">
              We are here to help! Contact our friendly support team for any questions:
            </p>
            <div className="space-y-2">
              <p className="text-white text-sm"><strong>Support Email:</strong> support@pamperpro.ng</p>
              <p className="text-white text-sm"><strong>General Inquiries:</strong> hello@pamperpro.ng</p>
              <p className="text-white text-sm"><strong>Response Time:</strong> Within 48 business hours</p>
            </div>
          </CardContent>
        </Card>

        {/* Scroll to Top Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={scrollToTop}
            className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
