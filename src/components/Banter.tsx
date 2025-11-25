import { useState } from "react";
import { Sparkles, Heart, BookOpen, Handshake, Tag, Gift, Trash2, Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";

interface BeautyTip {
  id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  date: string;
  likes: number;
}

interface Partnership {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
}

interface PromoOffer {
  id: string;
  title: string;
  description: string;
  discount: string;
  code?: string;
  validUntil: string;
  image: string;
}

export function Banter() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState<"tips" | "partnerships" | "promos" | "special">("tips");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Category filters for each section
  const [selectedTipsCategory, setSelectedTipsCategory] = useState<string>("all");
  const [selectedPartnershipsCategory, setSelectedPartnershipsCategory] = useState<string>("all");
  const [selectedPromosCategory, setSelectedPromosCategory] = useState<string>("all");
  const [selectedSpecialCategory, setSelectedSpecialCategory] = useState<string>("all");

  // Beauty Tips State
  const [beautyTips, setBeautyTips] = useState<BeautyTip[]>([
    {
      id: "1",
      title: "10 Steps to Perfect Braids",
      content: "Learn the essential techniques for creating flawless braids. From preparation to final styling, master the art of braiding with our expert guide.",
      category: "Hair Care",
      image: "https://i.imgur.com/X9k5Fnx.jpeg",
      date: "2024-11-20",
      likes: 234
    },
    {
      id: "2",
      title: "Natural Hair Maintenance Tips",
      content: "Discover the best practices for maintaining healthy natural hair. Learn about moisture, protective styling, and daily routines.",
      category: "Natural Hair",
      image: "https://i.imgur.com/KyERSSz.jpeg",
      date: "2024-11-18",
      likes: 189
    },
    {
      id: "3",
      title: "Makeup for Different Skin Tones",
      content: "Master the art of makeup for your specific skin tone. Learn which colors and techniques work best for your unique complexion.",
      category: "Makeup",
      image: "https://i.imgur.com/u5V476n.jpeg",
      date: "2024-11-15",
      likes: 156
    }
  ]);

  const [partnerships, setPartnerships] = useState<Partnership[]>([
    {
      id: "1",
      name: "Beauty Supply Co",
      description: "Premium hair and beauty products with exclusive Pamper Pro discounts",
      logo: "https://via.placeholder.com/150/3d6a68/ffffff?text=Beauty+Supply",
      category: "Products"
    },
    {
      id: "2",
      name: "Wellness Spa",
      description: "Relaxation and wellness services partnered with Pamper Pro",
      logo: "https://via.placeholder.com/150/3d6a68/ffffff?text=Wellness+Spa",
      category: "Services"
    },
    {
      id: "3",
      name: "Fashion & Style",
      description: "Complete your look with our fashion partners",
      logo: "https://via.placeholder.com/150/3d6a68/ffffff?text=Fashion+Style",
      category: "Fashion"
    }
  ]);

  const [promos, setPromos] = useState<PromoOffer[]>([
    {
      id: "1",
      title: "Get 30% Off Your First Booking",
      description: "New users get 30% discount on their first service booking with any professional on Pamper Pro",
      discount: "30%",
      code: "FIRST30",
      validUntil: "2024-12-31",
      image: "https://i.imgur.com/otDlO9q.jpeg"
    },
    {
      id: "2",
      title: "Referral Rewards Program",
      description: "Refer a friend and both get ₦5,000 credit. Unlimited referrals, unlimited rewards!",
      discount: "₦5,000",
      code: "REFER2024",
      validUntil: "2024-12-31",
      image: "https://i.imgur.com/JibMUrE.jpeg"
    },
    {
      id: "3",
      title: "Elite Bundle Package",
      description: "Book 5 services and get the 6th completely free",
      discount: "Free Service",
      validUntil: "2024-12-15",
      image: "https://i.imgur.com/bhLcj37.jpeg"
    }
  ]);

  const [specialOffers] = useState([
    {
      id: "1",
      title: "Flash Sale - Weekend Special",
      description: "Every Saturday & Sunday: Get up to 40% off selected services. Limited slots available!",
      validUntil: "2024-12-31",
      image: "https://i.imgur.com/KZ1zmRr.jpeg",
      type: "Flash Sale"
    },
    {
      id: "2",
      title: "Birthday Month Special",
      description: "It's your birthday? Get 25% off all services when you book in your birth month",
      validUntil: "2024-12-31",
      image: "https://i.imgur.com/I0tB7Lk.jpeg",
      type: "Birthday Special"
    },
    {
      id: "3",
      title: "Loyalty Rewards",
      description: "Every booking earns you points. Redeem points for free services, products, and more",
      validUntil: "2024-12-31",
      image: "https://i.imgur.com/JZOqHiF.jpeg",
      type: "Loyalty Program"
    }
  ]);

  // Modal States
  const [showAddTip, setShowAddTip] = useState(false);
  const [showAddPromo, setShowAddPromo] = useState(false);
  const [showAddPartnership, setShowAddPartnership] = useState(false);

  // Form States
  const [newTip, setNewTip] = useState({ title: "", content: "", category: "", image: "" });
  const [newPromo, setNewPromo] = useState({ title: "", description: "", discount: "", code: "", validUntil: "", image: "" });
  const [newPartnership, setNewPartnership] = useState({ name: "", description: "", logo: "", category: "" });

  // Admin Functions
  const handleAdminLogin = () => {
    if (adminPassword === "admin123") {
      setIsAdmin(true);
      setShowPasswordPrompt(false);
      setAdminPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  // Beauty Tips Functions
  const addBeautyTip = () => {
    if (newTip.title && newTip.content && newTip.category) {
      setBeautyTips([...beautyTips, {
        id: Date.now().toString(),
        title: newTip.title,
        content: newTip.content,
        category: newTip.category,
        image: newTip.image || "https://via.placeholder.com/400x300",
        date: new Date().toISOString().split('T')[0],
        likes: 0
      }]);
      setNewTip({ title: "", content: "", category: "", image: "" });
      setShowAddTip(false);
    }
  };

  const deleteBeautyTip = (id: string) => {
    setBeautyTips(beautyTips.filter(tip => tip.id !== id));
  };

  // Promo Functions
  const addPromo = () => {
    if (newPromo.title && newPromo.description && newPromo.discount && newPromo.validUntil) {
      setPromos([...promos, {
        id: Date.now().toString(),
        title: newPromo.title,
        description: newPromo.description,
        discount: newPromo.discount,
        code: newPromo.code || undefined,
        validUntil: newPromo.validUntil,
        image: newPromo.image || "https://via.placeholder.com/400x300"
      }]);
      setNewPromo({ title: "", description: "", discount: "", code: "", validUntil: "", image: "" });
      setShowAddPromo(false);
    }
  };

  const deletePromo = (id: string) => {
    setPromos(promos.filter(promo => promo.id !== id));
  };

  // Partnership Functions
  const addPartnership = () => {
    if (newPartnership.name && newPartnership.description && newPartnership.category) {
      setPartnerships([...partnerships, {
        id: Date.now().toString(),
        name: newPartnership.name,
        description: newPartnership.description,
        logo: newPartnership.logo || "https://via.placeholder.com/150",
        category: newPartnership.category
      }]);
      setNewPartnership({ name: "", description: "", logo: "", category: "" });
      setShowAddPartnership(false);
    }
  };

  const deletePartnership = (id: string) => {
    setPartnerships(partnerships.filter(p => p.id !== id));
  };

  // Filter Functions
  const filteredTips = beautyTips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedTipsCategory === "all" || tip.category === selectedTipsCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredPartnerships = partnerships.filter(p =>
    selectedPartnershipsCategory === "all" || p.category === selectedPartnershipsCategory
  );

  const filteredPromos = promos.filter(p =>
    selectedPromosCategory === "all" || p.discount === selectedPromosCategory
  );

  const filteredSpecialOffers = specialOffers.filter(offer =>
    selectedSpecialCategory === "all" || offer.type === selectedSpecialCategory
  );

  // Get unique values for category filters
  const tipsCategories = ["Hair Care", "Makeup", "Natural Hair", "Skincare", "Nails"];
  const partnershipCategories = Array.from(new Set(partnerships.map(p => p.category)));
  const promoDiscounts = Array.from(new Set(promos.map(p => p.discount)));
  const specialTypes = Array.from(new Set(specialOffers.map(o => o.type)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="h-8 w-8 text-pink-600" />
              <h1 className="text-4xl font-bold text-gray-900">Banter</h1>
            </div>
            <p className="text-gray-600">Beauty tips, partnerships, promos, discounts & special offers</p>
          </div>

          {/* Admin Button */}
          <div>
            {!isAdmin ? (
              <Button
                onClick={() => setShowPasswordPrompt(true)}
                className="bg-gray-700 hover:bg-gray-800 text-white"
                size="sm"
              >
                Admin Access
              </Button>
            ) : (
              <Button
                onClick={handleAdminLogout}
                className="bg-red-600 hover:bg-red-700 text-white"
                size="sm"
              >
                Logout Admin
              </Button>
            )}
          </div>
        </div>

        {/* Admin Password Prompt */}
        {showPasswordPrompt && (
          <Card className="mb-8 border-2 border-pink-200 bg-pink-50">
            <CardContent className="pt-6">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Admin Password</label>
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
                  />
                </div>
                <Button onClick={handleAdminLogin} className="bg-pink-600 hover:bg-pink-700 text-white">
                  Login
                </Button>
                <Button variant="outline" onClick={() => setShowPasswordPrompt(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Tabs with "All" Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
            {[
              { id: "tips", label: "Beauty Tips", icon: BookOpen },
              { id: "partnerships", label: "Partnerships", icon: Handshake },
              { id: "promos", label: "Promos & Discounts", icon: Tag },
              { id: "special", label: "Special Offers", icon: Gift }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-pink-600 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-pink-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Category Filter Bar */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <label className="text-sm font-semibold text-gray-700 mb-3 block">Filter by Category:</label>
            <div className="flex flex-wrap gap-2">
              {/* "All" Button */}
              <button
                onClick={() => {
                  if (activeTab === "tips") setSelectedTipsCategory("all");
                  else if (activeTab === "partnerships") setSelectedPartnershipsCategory("all");
                  else if (activeTab === "promos") setSelectedPromosCategory("all");
                  else if (activeTab === "special") setSelectedSpecialCategory("all");
                }}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  (activeTab === "tips" && selectedTipsCategory === "all") ||
                  (activeTab === "partnerships" && selectedPartnershipsCategory === "all") ||
                  (activeTab === "promos" && selectedPromosCategory === "all") ||
                  (activeTab === "special" && selectedSpecialCategory === "all")
                    ? "bg-pink-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-pink-300"
                }`}
              >
                All
              </button>

              {/* Dynamic Category Buttons */}
              {activeTab === "tips" && tipsCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedTipsCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                    selectedTipsCategory === category
                      ? "bg-pink-600 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-pink-300"
                  }`}
                >
                  {category}
                </button>
              ))}

              {activeTab === "partnerships" && partnershipCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedPartnershipsCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                    selectedPartnershipsCategory === category
                      ? "bg-pink-600 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-pink-300"
                  }`}
                >
                  {category}
                </button>
              ))}

              {activeTab === "promos" && promoDiscounts.map(discount => (
                <button
                  key={discount}
                  onClick={() => setSelectedPromosCategory(discount)}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                    selectedPromosCategory === discount
                      ? "bg-pink-600 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-pink-300"
                  }`}
                >
                  {discount}
                </button>
              ))}

              {activeTab === "special" && specialTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedSpecialCategory(type)}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                    selectedSpecialCategory === type
                      ? "bg-pink-600 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-pink-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Beauty Tips Section */}
        {activeTab === "tips" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>
              {isAdmin && (
                <Button onClick={() => setShowAddTip(true)} className="bg-pink-600 hover:bg-pink-700 text-white gap-2">
                  <Plus className="h-4 w-4" />
                  Add Tip
                </Button>
              )}
            </div>

            {/* Add Tip Modal */}
            {showAddTip && (
              <Card className="border-2 border-pink-200 bg-pink-50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <h3 className="text-lg font-semibold">Add New Beauty Tip</h3>
                  <button onClick={() => setShowAddTip(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Title *</label>
                    <Input
                      placeholder="Tip title"
                      value={newTip.title}
                      onChange={(e) => setNewTip({...newTip, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Content *</label>
                    <Textarea
                      placeholder="Tip content"
                      rows={4}
                      value={newTip.content}
                      onChange={(e) => setNewTip({...newTip, content: e.target.value})}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Category *</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={newTip.category}
                        onChange={(e) => setNewTip({...newTip, category: e.target.value})}
                      >
                        <option value="">Select category</option>
                        <option value="Hair Care">Hair Care</option>
                        <option value="Makeup">Makeup</option>
                        <option value="Natural Hair">Natural Hair</option>
                        <option value="Skincare">Skincare</option>
                        <option value="Nails">Nails</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Image URL</label>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={newTip.image}
                        onChange={(e) => setNewTip({...newTip, image: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={addBeautyTip} className="flex-1 bg-pink-600 hover:bg-pink-700 text-white">
                      Add Tip
                    </Button>
                    <Button onClick={() => setShowAddTip(false)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Beauty Tips Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTips.map(tip => (
                <Card key={tip.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 overflow-hidden">
                    <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-pink-100 text-pink-700">{tip.category}</Badge>
                      {isAdmin && (
                        <button
                          onClick={() => deleteBeautyTip(tip.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tip.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{tip.date}</span>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        <span>{tip.likes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Partnerships Section */}
        {activeTab === "partnerships" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              {isAdmin && (
                <Button onClick={() => setShowAddPartnership(true)} className="bg-pink-600 hover:bg-pink-700 text-white gap-2">
                  <Plus className="h-4 w-4" />
                  Add Partnership
                </Button>
              )}
            </div>

            {/* Add Partnership Modal */}
            {showAddPartnership && (
              <Card className="border-2 border-pink-200 bg-pink-50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <h3 className="text-lg font-semibold">Add New Partnership</h3>
                  <button onClick={() => setShowAddPartnership(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Partner Name *</label>
                    <Input
                      placeholder="Partnership name"
                      value={newPartnership.name}
                      onChange={(e) => setNewPartnership({...newPartnership, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Description *</label>
                    <Textarea
                      placeholder="Partnership description"
                      rows={3}
                      value={newPartnership.description}
                      onChange={(e) => setNewPartnership({...newPartnership, description: e.target.value})}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Category *</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={newPartnership.category}
                        onChange={(e) => setNewPartnership({...newPartnership, category: e.target.value})}
                      >
                        <option value="">Select category</option>
                        <option value="Products">Products</option>
                        <option value="Services">Services</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Technology">Technology</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Logo URL</label>
                      <Input
                        placeholder="https://example.com/logo.png"
                        value={newPartnership.logo}
                        onChange={(e) => setNewPartnership({...newPartnership, logo: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={addPartnership} className="flex-1 bg-pink-600 hover:bg-pink-700 text-white">
                      Add Partnership
                    </Button>
                    <Button onClick={() => setShowAddPartnership(false)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Partnerships Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPartnerships.map(partner => (
                <Card key={partner.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <img src={partner.logo} alt={partner.name} className="h-16 w-16 object-contain" />
                      {isAdmin && (
                        <button
                          onClick={() => deletePartnership(partner.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 mb-3">{partner.category}</Badge>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{partner.name}</h3>
                    <p className="text-sm text-gray-600">{partner.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Promos & Discounts Section */}
        {activeTab === "promos" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              {isAdmin && (
                <Button onClick={() => setShowAddPromo(true)} className="bg-pink-600 hover:bg-pink-700 text-white gap-2">
                  <Plus className="h-4 w-4" />
                  Add Promo
                </Button>
              )}
            </div>

            {/* Add Promo Modal */}
            {showAddPromo && (
              <Card className="border-2 border-pink-200 bg-pink-50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <h3 className="text-lg font-semibold">Add New Promo</h3>
                  <button onClick={() => setShowAddPromo(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Title *</label>
                    <Input
                      placeholder="Promo title"
                      value={newPromo.title}
                      onChange={(e) => setNewPromo({...newPromo, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Description *</label>
                    <Textarea
                      placeholder="Promo description"
                      rows={3}
                      value={newPromo.description}
                      onChange={(e) => setNewPromo({...newPromo, description: e.target.value})}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Discount *</label>
                      <Input
                        placeholder="e.g., 30%, ₦5,000"
                        value={newPromo.discount}
                        onChange={(e) => setNewPromo({...newPromo, discount: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Promo Code</label>
                      <Input
                        placeholder="e.g., PROMO30"
                        value={newPromo.code}
                        onChange={(e) => setNewPromo({...newPromo, code: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Valid Until *</label>
                      <Input
                        type="date"
                        value={newPromo.validUntil}
                        onChange={(e) => setNewPromo({...newPromo, validUntil: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Image URL</label>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={newPromo.image}
                        onChange={(e) => setNewPromo({...newPromo, image: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={addPromo} className="flex-1 bg-pink-600 hover:bg-pink-700 text-white">
                      Add Promo
                    </Button>
                    <Button onClick={() => setShowAddPromo(false)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Promos Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPromos.map(promo => (
                <Card key={promo.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-orange-200 to-red-200 relative overflow-hidden">
                    <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                      {promo.discount}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1">{promo.title}</h3>
                      {isAdmin && (
                        <button
                          onClick={() => deletePromo(promo.id)}
                          className="text-red-600 hover:text-red-700 ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{promo.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">Valid until {promo.validUntil}</div>
                      {promo.code && (
                        <Badge className="bg-green-100 text-green-700 font-mono">{promo.code}</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Special Offers Section */}
        {activeTab === "special" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredSpecialOffers.map(offer => (
                <Card key={offer.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
                  <div className="h-40 bg-gradient-to-br from-purple-300 to-pink-300 overflow-hidden">
                    <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <Badge className="bg-purple-100 text-purple-700 mb-3">{offer.type}</Badge>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{offer.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Valid until {offer.validUntil}</span>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white text-xs py-1 h-auto">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
