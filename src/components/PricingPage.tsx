import { Check, Users, Briefcase, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function PricingPage() {
  const professionalPlans = [
    {
      name: "Free",
      price: "₦0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Basic profile listing",
        "Up to 3 service listings",
        "Client reviews",
        "Email notifications",
        "Basic analytics"
      ],
      popular: false,
      cta: "Get Started Free"
    },
    {
      name: "Basic",
      price: "₦5,000",
      period: "per month",
      description: "For growing professionals",
      features: [
        "Everything in Free",
        "Unlimited service listings",
        "Online booking system",
        "SMS & email notifications",
        "Priority support",
        "Portfolio gallery (10 images)",
        "Basic analytics dashboard"
      ],
      popular: false,
      cta: "Start Basic Plan"
    },
    {
      name: "Premium",
      price: "₦12,000",
      period: "per month",
      description: "Most popular choice",
      features: [
        "Everything in Basic",
        "Featured in search results",
        "Advanced analytics & insights",
        "Social media integration",
        "Custom booking page",
        "Unlimited portfolio gallery",
        "Client management tools",
        "24/7 priority support"
      ],
      popular: true,
      cta: "Upgrade to Premium"
    },
    {
      name: "Elite",
      price: "₦25,000",
      period: "per month",
      description: "For established businesses",
      features: [
        "Everything in Premium",
        "Top placement in category",
        "Verified professional badge",
        "Dedicated account manager",
        "Marketing support & promotion",
        "Website widget integration",
        "API access",
        "Custom domain option",
        "White-label solution"
      ],
      popular: false,
      cta: "Go Elite"
    }
  ];

  const vendorPlans = [
    {
      name: "Starter",
      price: "₦3,000",
      period: "per month",
      description: "Start selling products",
      features: [
        "List up to 20 products",
        "Basic storefront",
        "Order management",
        "5% transaction fee",
        "Email notifications",
        "Payment processing"
      ],
      popular: false,
      cta: "Start Selling"
    },
    {
      name: "Growth",
      price: "₦8,000",
      period: "per month",
      description: "Scale your business",
      features: [
        "List up to 100 products",
        "Custom storefront design",
        "Advanced order management",
        "3% transaction fee",
        "SMS & email notifications",
        "Inventory tracking",
        "Analytics dashboard",
        "Priority support"
      ],
      popular: true,
      cta: "Choose Growth"
    },
    {
      name: "Enterprise",
      price: "₦20,000",
      period: "per month",
      description: "For established vendors",
      features: [
        "Unlimited products",
        "Premium storefront",
        "Advanced analytics",
        "1% transaction fee",
        "Dedicated account manager",
        "Bulk upload tools",
        "API integration",
        "Marketing support",
        "Featured vendor badge"
      ],
      popular: false,
      cta: "Go Enterprise"
    }
  ];

  const clientFeatures = [
    "Free to create account",
    "Browse all professionals & products",
    "Book appointments instantly",
    "Manage booking history",
    "Save favorite professionals",
    "Receive SMS & email reminders",
    "Rate and review services",
    "Secure payment processing",
    "24/7 customer support"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16 px-4">
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
                Professionals
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

            {/* Professional Plans */}
            <TabsContent value="professionals" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Service Provider Plans</h2>
                <p className="text-gray-600 text-lg">Perfect for hair stylists, barbers, makeup artists, and wellness experts</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {professionalPlans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative transition-all duration-300 hover:shadow-2xl ${
                      plan.popular ? "border-4 border-green-600 shadow-xl transform scale-105" : "border-2 border-gray-200"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-green-600 text-white px-4 py-1 text-sm font-semibold">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pt-8">
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <CardDescription className="mb-4">{plan.description}</CardDescription>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-2">/ {plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="bg-green-100 rounded-full p-1 mt-0.5">
                              <Check className="h-3 w-3 text-green-700" />
                            </div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-white border-2 border-green-600 text-green-700 hover:bg-green-50"
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Vendor Product Seller Plans</h2>
                <p className="text-gray-600 text-lg">Sell beauty products and supplies to professionals and clients</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {vendorPlans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative transition-all duration-300 hover:shadow-2xl ${
                      plan.popular ? "border-4 border-green-600 shadow-xl transform scale-105" : "border-2 border-gray-200"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-green-600 text-white px-4 py-1 text-sm font-semibold">
                          Recommended
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pt-8">
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <CardDescription className="mb-4">{plan.description}</CardDescription>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-2">/ {plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="bg-green-100 rounded-full p-1 mt-0.5">
                              <Check className="h-3 w-3 text-green-700" />
                            </div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-white border-2 border-green-600 text-green-700 hover:bg-green-50"
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
                <p className="text-gray-600 text-lg">100% Free - No subscription required</p>
              </div>

              <Card className="max-w-2xl mx-auto border-4 border-green-600 shadow-2xl">
                <CardHeader className="text-center bg-green-600 text-white rounded-t-lg py-8">
                  <CardTitle className="text-3xl mb-2">Free Forever</CardTitle>
                  <div className="text-5xl font-bold my-4">₦0</div>
                  <CardDescription className="text-white/90 text-lg">
                    All features included at no cost
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-8">
                  <ul className="space-y-4">
                    {clientFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-1.5 mt-0.5">
                          <Check className="h-4 w-4 text-green-700" />
                        </div>
                        <span className="text-base text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white text-lg py-6">
                    Sign Up Free
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Can I switch plans later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">We accept bank transfers, card payments, and mobile money (Paystack, Flutterwave).</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Is there a setup fee?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No setup fees! You only pay the monthly subscription for the plan you choose.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
