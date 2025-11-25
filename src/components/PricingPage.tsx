import { Check, Users, Briefcase, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function PricingPage() {
  const serviceProfessionalPlans = [
    {
      name: "Basic Plan",
      price: "20%",
      period: "per booking",
      description: "Pay only when you earn",
      features: [
        "Create a basic profile",
        "List up to 3 services",
        "Limited to 10 bookings per month",
        "Access to basic dashboard features",
        "Pay only when you earn",
        "Core platform features",
        "Standard support"
      ],
      popular: false,
      cta: "Start 7-day Free Trial"
    },
    {
      name: "Standard Plan",
      price: "₦16,350",
      period: "per month",
      description: "Best for growing professionals",
      features: [
        "Unlimited services listing",
        "Unlimited bookings",
        "One free studio photo session by PamperPro",
        "Access to analytics and customer management tools",
        "Highlighted profile/status in search results",
        "Priority support"
      ],
      popular: true,
      cta: "Start 7-day Free Trial"
    },
    {
      name: "Premium Plan",
      price: "₦23,850",
      period: "per month",
      description: "Maximum visibility & features",
      features: [
        "All Standard features",
        "Feature in premium listings",
        "One free studio photo and video session by PamperPro",
        "Promotion through featured banners",
        "Advanced analytics",
        "Ability to create promotional offers and discounts"
      ],
      popular: false,
      cta: "Start 7-day Free Trial"
    },
    {
      name: "Enterprise Plan",
      price: "Custom",
      period: "pricing",
      description: "For large or multi-location businesses",
      features: [
        "For large or multiple-location salons/spas",
        "Custom branding and marketing options",
        "API access for integrations to social media platforms",
        "Dedicated support team",
        "Unlimited services and bookings",
        "Custom solutions tailored to your needs"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const vendorPlans = [
    {
      name: "Basic Plan",
      price: "20%",
      period: "per sale",
      description: "Pay only when you sell",
      features: [
        "Create a basic profile",
        "List up to 3 products",
        "Limited to 20 sales per month",
        "Access to basic dashboard features",
        "Pay only when you sell",
        "Core platform features",
        "Standard support"
      ],
      popular: false,
      cta: "Start 7-day Free Trial"
    },
    {
      name: "Premium Plan",
      price: "₦19,350",
      period: "per month",
      description: "Best for active vendors",
      features: [
        "Unlimited product listing",
        "Unlimited sales",
        "Access to analytics and customer management tools",
        "Priority support",
        "Promotion through featured banners",
        "Advanced analytics",
        "Ability to create promotional offers and discounts on products"
      ],
      popular: true,
      cta: "Start 7-day Free Trial"
    }
  ];

  const clientBasicFeatures = [
    "Browse all services and professionals",
    "Create and manage profile",
    "View booking history",
    "Save favourites",
    "Receive notifications"
  ];

  const clientPremiumFeatures = [
    "All Basic Features",
    "Early access to new services and promotions",
    "Priority customer support",
    "Ability to receive exclusive discounts",
    "Option to subscribe for unlimited bookings",
    "Special offers for group bookings",
    "Surprise occasions with discounts"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#3d6a68] to-[#2d5a58] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl mb-8">Choose the perfect plan for your business needs</p>
        </div>
      </section>

      {/* Pricing Tabs */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="professionals" className="space-y-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
              <TabsTrigger value="professionals" className="text-base">
                <Briefcase className="mr-2 h-4 w-4" />
                Service Pros
              </TabsTrigger>
              <TabsTrigger value="vendors" className="text-base">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Vendors
              </TabsTrigger>
              <TabsTrigger value="clients" className="text-base">
                <Users className="mr-2 h-4 w-4" />
                Clients
              </TabsTrigger>
            </TabsList>

            {/* Service Professional Plans */}
            <TabsContent value="professionals" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Service Provider Plans</h2>
                <p className="text-gray-600 text-lg">For hair stylists, barbers, makeup artists, and wellness professionals</p>
              </div>



              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {serviceProfessionalPlans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative transition-all duration-300 hover:shadow-2xl flex flex-col ${
                      plan.popular ? "border-4 border-[#3d6a68] shadow-xl transform lg:scale-105" : "border-2 border-gray-200"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-[#3d6a68] text-white px-4 py-1 text-sm font-semibold">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pt-8">
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <CardDescription className="mb-4 min-h-12">{plan.description}</CardDescription>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-2 text-sm">/ {plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <ul className="space-y-3 mb-6 flex-1">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="bg-[#3d6a68]/10 rounded-full p-1 mt-0.5 flex-shrink-0">
                              <Check className="h-3 w-3 text-[#3d6a68]" />
                            </div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-[#3d6a68] hover:bg-[#2d5a58] text-white"
                            : "bg-white border-2 border-[#3d6a68] text-[#3d6a68] hover:bg-[#3d6a68]/5"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Vendor Plans */}
            <TabsContent value="vendors" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Vendor Plans</h2>
                <p className="text-gray-600 text-lg">Sell beauty products and supplies to professionals and clients</p>
              </div>



              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {vendorPlans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative transition-all duration-300 hover:shadow-2xl flex flex-col ${
                      plan.popular ? "border-4 border-[#3d6a68] shadow-xl transform scale-105" : "border-2 border-gray-200"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-[#3d6a68] text-white px-4 py-1 text-sm font-semibold">
                          Recommended
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pt-8">
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <CardDescription className="mb-4 min-h-12">{plan.description}</CardDescription>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-2 text-sm">/ {plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <ul className="space-y-3 mb-6 flex-1">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="bg-[#3d6a68]/10 rounded-full p-1 mt-0.5 flex-shrink-0">
                              <Check className="h-3 w-3 text-[#3d6a68]" />
                            </div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-[#3d6a68] hover:bg-[#2d5a58] text-white"
                            : "bg-white border-2 border-[#3d6a68] text-[#3d6a68] hover:bg-[#3d6a68]/5"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Client Plans */}
            <TabsContent value="clients" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">For Clients</h2>
                <p className="text-gray-600 text-lg">Choose the perfect plan for your booking needs</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Free Basic Access */}
                <Card className="relative transition-all duration-300 hover:shadow-2xl flex flex-col border-2 border-gray-200">
                  <CardHeader className="text-center pt-8">
                    <CardTitle className="text-2xl mb-2">Free Basic Access</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">₦0</span>
                      <span className="text-gray-600 ml-2">/month</span>
                    </div>
                    <CardDescription className="mb-4 min-h-12">Perfect for exploring services</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-6 flex-1">
                      {clientBasicFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="bg-[#3d6a68]/10 rounded-full p-1 mt-0.5 flex-shrink-0">
                            <Check className="h-3 w-3 text-[#3d6a68]" />
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                      <p className="text-xs text-yellow-800"><span className="font-semibold">Note:</span> After your first 5 bookings, a small fee of ₦500/month will apply.</p>
                    </div>
                    <Button className="w-full bg-white border-2 border-[#3d6a68] text-[#3d6a68] hover:bg-[#3d6a68]/5">
                      Get Started Free
                    </Button>
                  </CardContent>
                </Card>

                {/* Premium Membership */}
                <Card className="relative transition-all duration-300 hover:shadow-2xl flex flex-col border-4 border-[#3d6a68] shadow-xl transform scale-105">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#3d6a68] text-white px-4 py-1 text-sm font-semibold">
                      Recommended
                    </Badge>
                  </div>
                  <CardHeader className="text-center pt-8">
                    <CardTitle className="text-2xl mb-2">Premium Membership</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">₦13,500</span>
                      <span className="text-gray-600 ml-2">/month</span>
                    </div>
                    <CardDescription className="mb-4 min-h-12">Best value for frequent bookers</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-6 flex-1">
                      {clientPremiumFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="bg-[#3d6a68]/10 rounded-full p-1 mt-0.5 flex-shrink-0">
                            <Check className="h-3 w-3 text-[#3d6a68]" />
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-[#3d6a68] hover:bg-[#2d5a58] text-white">
                      Upgrade to Premium
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Pamper Pro?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Flexible Payment Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Choose between monthly subscriptions or pay-per-transaction. Switch anytime based on your business needs.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Free Studio Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Standard and Premium plans include professional photo/video sessions to boost your profile visibility.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Track bookings, revenue, client insights, and performance metrics to grow your business intelligently.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Priority Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Get dedicated support from our team to help you succeed and grow your business.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Do all professionals get a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Yes! All Service Professionals and Vendors receive a 7-day free trial upon sign up. No credit card required. Start earning or selling immediately!</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Can I switch plans after my trial ends?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Absolutely! After your 7-day trial, you can choose the Basic, Standard, Premium, or Enterprise plan that suits your needs. You can upgrade or downgrade anytime.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What happens if I don't choose a plan after the trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your account will revert to the Basic Plan (20% per booking/sale) automatically, so you can continue earning immediately.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>When do I start paying as a client?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Clients enjoy completely free access for their first 5 bookings. After that, a small fee of ₦500/month applies. You can also upgrade to Premium Membership (₦13,500/month) for unlimited bookings and exclusive benefits.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">We accept bank transfers, card payments, and mobile money through Paystack and Flutterwave.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Is there a setup fee?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No setup fees! For subscription plans, you only pay the monthly fee. For the Basic Plan, you pay 20% per transaction (only when you earn/sell).</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
