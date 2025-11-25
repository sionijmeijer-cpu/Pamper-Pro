import { ArrowUp, Shield, Lock, Eye } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useState } from "react";

export function PrivacyPolicy() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction and Scope",
      content: "This Privacy Policy explains how Pamper Pro ('we', 'us', 'our', or 'Company') collects, uses, discloses, and otherwise processes personal data in connection with our website, mobile applications, and services (collectively, the 'Platform'). We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This policy applies to all users including clients, service professionals, and vendors. We comply with the General Data Protection Regulation (GDPR) for EU residents and the Nigeria Data Protection Regulation (NDPR) for Nigerian users."
    },
    {
      id: "data-controller",
      title: "2. Data Controller and Contact Information",
      content: `Pamper Pro operates as the Data Controller for all personal data processed on our platform.

Data Controller:
Pamper Pro
Email: hello@pamperpro.ng
Data Protection Officer: dpo@pamperpro.ng
Support: support@pamperpro.ng

For GDPR inquiries (EU Residents):
You may contact our Data Protection Officer or lodge a complaint with your local Data Protection Authority.

For NDPR inquiries (Nigerian Users):
You may contact our Data Protection Officer or lodge a complaint with the Nigerian Data Protection Commission (NDPC).

Response Time: We will respond to all privacy inquiries within 30 days.`
    },
    {
      id: "data-collection",
      title: "3. Information We Collect",
      content: `We collect personal data in several categories:

A. Information You Provide Directly:
• Account registration information (name, email, phone number)
• Profile information (bio, photo, location, business details)
• Payment information (processed securely by third-party providers)
• Service details (descriptions, pricing, availability)
• Communication with other users (messages, reviews)
• Identification documents (for verification purposes)
• Health or allergy information (for service-related purposes)
• Photos and videos (with your consent)

B. Information Collected Automatically:
• Device information (device type, operating system, browser)
• IP address and location data
• Cookies and tracking technologies
• Usage data (pages visited, time spent, interactions)
• Log files (timestamps, referral source)

C. Information from Third Parties:
• Payment processors (transaction data)
• Social media platforms (if you link accounts)
• Service professionals and clients (reviews, feedback)
• Analytics providers

D. Special Categories of Data (Sensitive Data):
• Health information (allergies, medical conditions) - with explicit consent only
• Identification documents - processed securely for verification
• We do NOT process biometric data or genetic information`
    },
    {
      id: "data-usage",
      title: "4. How We Use Your Information",
      content: `We use your personal data for the following purposes:

A. Service Provision:
• Creating and managing your account
• Processing bookings and payments
• Delivering and improving services
• Communication about bookings and services
• Resolving service disputes

B. Communication:
• Sending transactional emails (confirmations, notifications)
• Marketing communications (with your consent only)
• Support and customer service
• Updates about our platform and policies
• Newsletters (opt-in)

C. Safety and Security:
• Verifying user identity
• Detecting fraudulent activity
• Preventing abuse and illegal activity
• Protecting intellectual property rights
• Maintaining account security

D. Analytics and Improvement:
• Analyzing user behavior and preferences
• Improving platform features and functionality
• Conducting market research
• Understanding user needs and trends
• A/B testing and optimization

E. Legal Compliance:
• Fulfilling legal obligations
• Responding to law enforcement requests
• Maintaining compliance with GDPR and NDPR
• Enforcing our terms and policies

F. Legitimate Business Interests:
• Business development and growth
• Customer relationship management
• Risk management and fraud prevention
• Platform security and optimization`
    },
    {
      id: "legal-basis",
      title: "5. Legal Basis for Processing",
      content: `Under GDPR and NDPR, we process your data based on:

A. Contract (GDPR Article 6(1)(b), NDPR Section 1.1.1(a)):
• Processing necessary to provide services you requested
• Processing booking information for service delivery

B. Consent (GDPR Article 6(1)(a), NDPR Section 1.1.1(b)):
• Marketing communications (opt-in)
• Health information processing (explicit consent)
• Cookie usage (with preferences management)
• Photos and video usage (with your permission)

C. Legal Obligation (GDPR Article 6(1)(c), NDPR Section 1.1.1(c)):
• Tax compliance
• Payment processing requirements
• Anti-money laundering (AML) regulations
• Law enforcement requests

D. Legitimate Interests (GDPR Article 6(1)(f), NDPR Section 1.1.1(d)):
• Fraud detection and prevention
• Platform security and protection
• Business improvement and analytics
• User support and customer service
• We balance our interests against your rights

E. Vital Interests (GDPR Article 6(1)(d)):
• Only used in emergency situations involving health or safety

F. Performance of Public Task (GDPR Article 6(1)(e)):
• Not applicable - Pamper Pro is a private company`
    },
    {
      id: "data-sharing",
      title: "6. Data Sharing and Disclosure",
      content: `We share your personal data only in the following circumstances:

A. With Service Providers:
• Payment processors (Paystack, Flutterwave) - for transactions
• Cloud hosting providers (for data storage)
• Analytics providers (Google Analytics - anonymized)
• Email service providers (for communications)
• SMS service providers (for notifications)
• We have Data Processing Agreements with all providers

B. Between Users:
• Booking information shared with service professionals
• Contact information shared when booking confirmed
• Reviews and ratings displayed publicly
• Messages shared in our messaging system

C. Legal Requirements:
• Law enforcement and government agencies (with court order)
• Regulatory authorities (NDPC, EU DPAs)
• In response to legal process or subpoena
• To comply with court orders or legal obligations

D. Business Transfers:
• In case of merger, acquisition, or asset sale
• You will be notified of any such transfer
• Privacy protections will be maintained

E. With Your Consent:
• We will ask before sharing data for any other purpose
• You can withdraw consent at any time

F. Aggregated and Anonymized Data:
• We may share aggregated, de-identified data
• This cannot identify you personally
• Used for research, analytics, and business purposes`
    },
    {
      id: "international-transfer",
      title: "7. International Data Transfers",
      content: `A. Data Transfers (GDPR and NDPR):
• Most data is stored within Nigeria and EU-compatible servers
• Transfers outside EU/Nigeria only occur with adequate safeguards
• We use Standard Contractual Clauses (SCCs) for transfers
• Transfers comply with GDPR Chapter V requirements

B. For EU Users:
• Personal data is processed with GDPR-level protections
• Adequacy decisions are followed
• Standard Contractual Clauses protect international transfers

C. For Nigerian Users:
• Data processing complies with NDPR standards
• We maintain NDPR-compliant security measures
• Transfers follow NDPC guidelines

D. Binding Corporate Rules:
• Not applicable - Pamper Pro does not operate under BCRs

E. Your Rights:
• You have the right to know where data is transferred
• You can request information about transfer safeguards
• You can object to transfers to certain jurisdictions`
    },
    {
      id: "data-retention",
      title: "8. Data Retention",
      content: `We retain personal data for the following periods:

A. Active Account Data:
• Retained as long as your account is active
• Plus additional periods for legal compliance

B. After Account Closure:
• Transaction records: 7 years (tax/legal requirements)
• Payment information: 3 years (financial compliance)
• Account information: 1 year (dispute resolution)
• Communications/messages: 1 year
• Photos/videos: Until you request deletion

C. Specific Data Retention Periods:
• Marketing data: Until you unsubscribe (max 3 years)
• Cookies: 12 months (or as set in preferences)
• IP logs: 6 months
• Analytics data: 26 months (Google Analytics default)
• Booking history: 7 years
• Dispute records: 3 years

D. Right to Deletion:
• You can request deletion at any time
• We delete data within 30 days unless legally required to retain
• Some data may be retained for legal compliance
• Anonymized data may be retained indefinitely

E. Archival Data:
• Historical data may be retained in backups
• Backups are deleted according to our retention schedule
• Archived data is not accessible or used`
    },
    {
      id: "user-rights",
      title: "9. Your Privacy Rights",
      content: `A. Right to Access (GDPR Article 15, NDPR Section 2.3):
• You have the right to know what personal data we hold
• Request a copy of your data in a structured format
• Receive response within 30 days (can be extended to 60 days)
• Request submission: dpo@pamperpro.ng

B. Right to Rectification (GDPR Article 16, NDPR Section 2.3):
• You can correct inaccurate personal data
• We will update information within 15 days
• Inaccurate data will be corrected immediately
• You can make changes in account settings

C. Right to Erasure (GDPR Article 17, NDPR Section 2.3):
• Also known as the 'right to be forgotten'
• You can request deletion of your data
• Deletion occurs within 30 days unless legal reasons apply
• Some data must be retained (e.g., tax records)

D. Right to Restrict Processing (GDPR Article 18, NDPR Section 2.3):
• You can request we limit how we use your data
• We will restrict processing while reviewing
• Applicable when data is inaccurate or processing unlawful

E. Right to Data Portability (GDPR Article 20, NDPR Section 2.3):
• You can receive your data in a portable format
• Data will be provided in machine-readable format
• You can transfer to another service provider
• Response within 30 days

F. Right to Object (GDPR Article 21, NDPR Section 2.3):
• You can object to processing for marketing
• You can object to processing based on legitimate interests
• We will stop processing within 30 days
• Some processing may continue for legal reasons

G. Right to Not Be Subject to Automated Decision Making:
• You have the right to object to automated decisions
• Significant decisions will involve human review
• Applicable only to decisions with legal/significant effects

H. Right to Lodge a Complaint:
• You can file a complaint with your Data Protection Authority
• EU residents: Your local Data Protection Authority
• Nigerian residents: Nigerian Data Protection Commission
• Complaints can also be filed with us via dpo@pamperpro.ng`
    },
    {
      id: "security",
      title: "10. Data Security and Protection",
      content: `A. Security Measures:
• Encryption in transit (SSL/TLS 256-bit)
• Encryption at rest (AES-256 encryption)
• Secure password hashing (bcrypt)
• Multi-factor authentication available
• Regular security audits and penetration testing
• Firewalls and intrusion detection systems
• Access controls and role-based permissions
• Data minimization practices

B. Payment Security:
• PCI DSS compliant payment processing
• Tokens used instead of storing card numbers
• Third-party payment processor handles card data
• No payment card data stored on our servers

C. Data Breach Response:
• We monitor for security breaches 24/7
• Breaches affecting rights/freedoms reported within 72 hours
• Users notified of material breaches immediately
• Authorities notified as required
• Incident investigation and remediation plans

D. Limitations:
• No system is 100% secure
• You are responsible for password security
• You should use strong, unique passwords
• Enable two-factor authentication

E. Employee Training:
• All staff receive data protection training
• Confidentiality agreements required
• Limited access to personal data based on need
• Regular security awareness updates`
    },
    {
      id: "cookies",
      title: "11. Cookies and Tracking Technologies",
      content: `A. What Are Cookies:
• Small files stored on your device
• Help us recognize you and remember preferences
• Used to track usage patterns and improve service
• Can be session-based or persistent

B. Types of Cookies We Use:

Essential Cookies:
• Required for platform functionality
• Include security and authentication cookies
• Cannot be disabled without breaking the site

Analytical Cookies:
• Google Analytics for usage tracking
• Help us understand user behavior
• Anonymized and aggregated
• Can be disabled in cookie preferences

Marketing Cookies:
• Used for targeted advertising
• Track your interests and preferences
• Only set with explicit consent
• Can be disabled anytime

B. Cookie Preferences:
• You can manage cookie preferences in your account settings
• Disable non-essential cookies anytime
• Your browser can block or delete cookies
• Some functionality may be limited without cookies

C. Do Not Track (DNT):
• We respect DNT signals in browsers
• We do not track you if DNT is enabled
• Some third parties may still track despite DNT

D. Third-Party Tracking:
• Social media platforms may track you
• Advertising networks may track behavior
• Analytics providers may set cookies
• You can review privacy policies of third parties`
    },
    {
      id: "children",
      title: "12. Children's Privacy",
      content: `A. Age Restrictions:
• Our platform is not intended for children under 18
• Users must be at least 18 years old
• Parents/guardians should monitor children's online activity
• We comply with COPPA (Children's Online Privacy Protection Act)

B. If We Discover Child Data:
• We will delete information immediately
• We will notify the account holder
• Legal action may be taken if appropriate
• We appreciate reports of child data usage

C. GDPR Compliance for Minors:
• Additional protections for users under 16
• Parental consent may be required
• Special privacy protections apply

D. NDPR Compliance for Minors:
• Minors require guardian consent
• Additional data protection measures
• Limited data collection for minors

E. Parental Rights:
• Parents can request information about their child's data
• Parents can request deletion of child's data
• Parents can verify our data practices`
    },
    {
      id: "third-party",
      title: "13. Third-Party Links and Services",
      content: `A. External Links:
• Our platform may contain links to third-party websites
• We are not responsible for their privacy practices
• Review their privacy policies before sharing data
• We have no control over third-party content

B. Social Media Integration:
• You may link social media accounts
• Sharing your data with social platforms
• Review their privacy policies
• You can disconnect accounts anytime

C. Third-Party Vendors:
• Payment processors (Paystack, Flutterwave)
• Email providers (SendGrid, etc.)
• Analytics providers (Google Analytics)
• Hosting providers (cloud services)
• We have Data Processing Agreements with all vendors

D. Affiliate Links:
• Some links may be affiliate links
• We may earn commissions from purchases
• Your privacy is not affected
• Affiliate partners follow their own privacy policies

E. User Responsibility:
• You are responsible for reviewing third-party policies
• We are not liable for third-party practices
• Use third-party services at your own risk`
    },
    {
      id: "marketing",
      title: "14. Marketing Communications",
      content: `A. Email Marketing:
• You must opt-in to marketing emails
• We use double opt-in confirmation
• Unsubscribe link in every marketing email
• You can manage preferences in account settings
• Comply with CAN-SPAM Act and GDPR

B. SMS Marketing:
• Separate opt-in required for SMS messages
• Carry important booking and account alerts
• You can opt-out anytime by responding STOP
• Complies with TCPA regulations

C. Push Notifications:
• Browser notifications require permission
• Mobile app notifications require opt-in
• You can disable in device settings
• You can manage in app preferences

D. Targeted Advertising:
• We may use your data for advertising
• Requires explicit opt-in consent
• You can opt-out anytime
• Third-party ad networks may track you

E. Unsubscribe and Preferences:
• Click unsubscribe in any marketing email
• Update preferences in account settings
• Contact support@pamperpro.ng to opt-out
• Opt-out usually takes 10 business days
• We respect your preferences immediately for account settings`
    },
    {
      id: "compliance",
      title: "15. GDPR and NDPR Compliance",
      content: `A. GDPR Compliance (EU Regulation 2016/679):
• We comply with all GDPR requirements
• EU residents have enhanced privacy rights
• International data transfers use SCCs
• Data Protection Impact Assessments completed
• Privacy by design principles implemented
• We maintain compliance documentation
• Regular audits and assessments conducted

B. NDPR Compliance (Nigeria Data Protection Regulation):
• We comply with all NDPR requirements
• Nigerian users' data receives full protection
• Data processing follows NDPR principles
• Accountability measures implemented
• Adequate security safeguards in place
• Breach notification within 30 days
• Cooperation with NDPC when required

C. California Consumer Privacy Act (CCPA):
• Not applicable to most users
• California residents have additional rights
• Similar rights to GDPR (access, deletion, opt-out)
• Do Not Sell My Personal Information option
• Privacy notice available upon request

D. Other Applicable Laws:
• Nigeria's cybersecurity regulations
• EU ePrivacy Directive
• UK GDPR (if applicable)
• Other local data protection laws
• We comply with all applicable regulations`
    },
    {
      id: "dpa",
      title: "16. Data Processing Agreements",
      content: `A. Vendors and Processors:
• All third-party vendors sign Data Processing Agreements (DPAs)
• DPAs specify how data is processed
• Vendors must comply with GDPR and NDPR
• Sub-processors must be approved

B. Standard Contractual Clauses (SCCs):
• Used for all international transfers
• Ensures adequate data protection
• Binding on all parties
• Updated per latest requirements

C. Your Vendors (Service Professionals):
• Service professionals act as processors
• They have access to booking information only
• They must maintain data confidentiality
• They cannot use data for other purposes
• They must implement adequate security

D. Payment Processors:
• Paystack and Flutterwave handle payment data
• They are independent data controllers for payments
• Review their privacy policies
• They comply with PCI DSS standards`
    },
    {
      id: "policy-changes",
      title: "17. Changes to This Privacy Policy",
      content: `A. Policy Updates:
• We may update this policy at any time
• Material changes will be notified in advance
• Notification via email and website announcement
• 30-day advance notice for material changes

B. Your Rights Upon Changes:
• You have the right to review changes
• You can terminate your account before changes take effect
• Continued use means acceptance of new policy
• Archived versions available for reference

C. Notification Methods:
• Email notification to account email address
• Dashboard notification upon login
• Website banner announcement
• Privacy policy version history

D. Notification Timing:
• Material changes: 30 days advance notice
• Non-material changes: Effective immediately
• Emergency changes: Effective immediately with notice

E. Your Obligations:
• You are responsible for reviewing updates
• We recommend checking policy periodically
• Ignorance of changes is not an excuse
• Your continued use signifies acceptance`
    },
    {
      id: "contact",
      title: "18. Contact Us and Data Protection Officer",
      content: `A. Privacy Inquiries:
Email: dpo@pamperpro.ng
Subject: Privacy Inquiry
Response Time: Within 30 days

B. Support and General Questions:
Email: support@pamperpro.ng
Phone: Available in app
Response Time: Within 48 business hours

C. General Inquiries:
Email: hello@pamperpro.ng
Response Time: Within 48 business hours

D. Data Protection Officer:
Name: Data Protection Officer
Email: dpo@pamperpro.ng
Role: Handles all privacy requests and complaints
Availability: During business hours

E. Complaints and Disputes:
• File formal complaints via email
• Include detailed description of issue
• Provide supporting documentation
• We will investigate and respond

F. Regulatory Authorities:
EU Users:
• Your local Data Protection Authority
• European Data Protection Board (EDPB)

Nigerian Users:
• Nigerian Data Protection Commission (NDPC)
• Email: complaints@ndpc.gov.ng

G. Response Commitments:
• Acknowledge receipt within 5 business days
• Investigate thoroughly
• Provide substantive response
• Offer remediation if appropriate
• Appeal process available`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-600 text-lg mb-4">
            How Pamper Pro collects, uses, and protects your personal information
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="h-4 w-4 text-blue-600" />
              GDPR Compliant
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="h-4 w-4 text-blue-600" />
              NDPR Compliant
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Eye className="h-4 w-4 text-blue-600" />
              Data Rights Protected
            </div>
            <div className="text-sm text-gray-500">
              Last updated: November 2024
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold text-gray-900 mb-3">Quick Navigation:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setExpandedSection(section.id);
                    setTimeout(() => {
                      document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="text-left text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors text-xs"
                >
                  {section.title.split(".")[1].trim().split(" ").slice(0, 2).join(" ")}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Points */}
        <Card className="mb-8 bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-purple-900 mb-3">Privacy at a Glance:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex gap-2">
                <span className="text-purple-600">✓</span>
                <p className="text-sm text-purple-800">We collect only necessary data</p>
              </div>
              <div className="flex gap-2">
                <span className="text-purple-600">✓</span>
                <p className="text-sm text-purple-800">Your data is encrypted and secure</p>
              </div>
              <div className="flex gap-2">
                <span className="text-purple-600">✓</span>
                <p className="text-sm text-purple-800">You control your information</p>
              </div>
              <div className="flex gap-2">
                <span className="text-purple-600">✓</span>
                <p className="text-sm text-purple-800">We respect your privacy rights</p>
              </div>
              <div className="flex gap-2">
                <span className="text-purple-600">✓</span>
                <p className="text-sm text-purple-800">We comply with GDPR and NDPR</p>
              </div>
              <div className="flex gap-2">
                <span className="text-purple-600">✓</span>
                <p className="text-sm text-purple-800">Transparent data practices</p>
              </div>
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
                  <span className={`text-blue-600 transition-transform duration-300 ${expandedSection === section.id ? 'rotate-180' : ''}`}>
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
        <Card className="border-2 border-blue-200 bg-blue-50 mb-8">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-900 mb-3">🔐 Your Privacy is Important to Us</h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              Pamper Pro is committed to protecting your privacy and maintaining your trust. We process your personal data responsibly, 
              transparently, and in compliance with GDPR, NDPR, and all applicable data protection laws. If you have any concerns about 
              how we handle your data, please contact our Data Protection Officer at dpo@pamperpro.ng. You have the right to lodge a 
              complaint with your local data protection authority at any time.
            </p>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-12">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-white mb-3">Data Protection Officer</h3>
            <p className="text-white/90 mb-4">
              Have questions about your privacy or our data practices? Contact our dedicated Data Protection Officer:
            </p>
            <div className="space-y-2">
              <p className="text-white text-sm"><strong>Email:</strong> dpo@pamperpro.ng</p>
              <p className="text-white text-sm"><strong>Support:</strong> support@pamperpro.ng</p>
              <p className="text-white text-sm"><strong>General:</strong> hello@pamperpro.ng</p>
              <p className="text-white text-sm"><strong>Response Time:</strong> Within 30 days</p>
            </div>
          </CardContent>
        </Card>

        {/* Scroll to Top Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={scrollToTop}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
