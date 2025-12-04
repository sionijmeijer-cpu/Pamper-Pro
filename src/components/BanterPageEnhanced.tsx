import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Heart, Share2, MessageCircle, Trophy, Calendar, Mail } from 'lucide-react';

interface BanterPageEnhancedProps {
  onNavigate?: (page: string, params?: Record<string, string>) => void;
}

export function BanterPageEnhanced({ onNavigate }: BanterPageEnhancedProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [pollVotes, setPollVotes] = useState({ option1: 2156, option2: 3234, option3: 1089 });
  const [userPoll, setUserPoll] = useState<string | null>(null);
  const [likedContent, setLikedContent] = useState<number[]>([]);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [referralCopied, setReferralCopied] = useState(false);

  const filters = [
    { id: 'all', label: 'All', emoji: '⭐' },
    { id: 'deals', label: 'Deals', emoji: '🔥' },
    { id: 'fun', label: 'Fun', emoji: '😂' },
    { id: 'tips', label: 'Tips', emoji: '💡' },
    { id: 'marketplace', label: 'New', emoji: '🆕' },
    { id: 'pro-spotlight', label: 'Pros', emoji: '⭐' },
    { id: 'community', label: 'Community', emoji: '👥' },
    { id: 'events', label: 'Events', emoji: '📅' },
    { id: 'newsletter', label: 'Letter', emoji: '📧' },
    { id: 'giveaways', label: 'Giveaways', emoji: '🎁' },
  ];

  const promotions = [
    {
      id: 1,
      title: '🔥 FLASH DEAL: 40% OFF!',
      description: 'All braiding services this Saturday only',
      discount: '40%',
      location: 'Lekki & VI',
      timeLeft: '2 hours 30 mins',
      badge: 'FLASH',
      color: 'from-red-500 to-orange-500',
      details: 'Valid for new and existing customers',
    },
    {
      id: 2,
      title: '✨ WEEKLY WONDER',
      description: 'Get ₦5,000 off your first makeup service',
      discount: '₦5K',
      location: 'All Lagos',
      timeLeft: '4 days left',
      badge: 'WEEKLY',
      color: 'from-purple-500 to-pink-500',
      details: 'Perfect for first-time customers',
    },
    {
      id: 3,
      title: '👑 SUMMER SEASON SPECIAL',
      description: 'Bundle 3 services and save ₦8,000',
      discount: '₦8K',
      location: 'All areas',
      timeLeft: 'Until Dec 31',
      badge: 'SEASONAL',
      color: 'from-yellow-500 to-orange-400',
      details: 'Includes hair, nails, and makeup',
    },
    {
      id: 4,
      title: '💅 NAIL ART EXTRAVAGANZA',
      description: 'Luxury nail art at regular prices this week',
      discount: '₦3K OFF',
      location: 'All Salons',
      timeLeft: '5 days left',
      badge: 'WEEKLY',
      color: 'from-pink-500 to-rose-500',
      details: 'Design consultation included',
    },
    {
      id: 5,
      title: '🧴 HAIR CARE ESSENTIALS',
      description: 'Professional hair treatments bundled',
      discount: '35%',
      location: 'Ikoyi & Surulere',
      timeLeft: 'Until end of month',
      badge: 'SEASONAL',
      color: 'from-green-500 to-teal-500',
      details: 'Full hair recovery program',
    },
  ];

  const funContent = [
    {
      id: 1,
      type: 'meme',
      title: 'Hair Growth Timeline 😂',
      image: 'https://i.imgur.com/8kY5QVm.jpeg',
      likes: 2341,
      comments: 456,
      shares: 123,
      postedBy: 'Beauty Lovers Nigeria',
    },
    {
      id: 2,
      type: 'quote',
      title: '"A woman who cuts her hair is about to change her life" - Coco Chanel',
      emoji: '✂️',
      likes: 1892,
      comments: 234,
      shares: 89,
      postedBy: 'Hair Inspiration Daily',
    },
    {
      id: 3,
      type: 'joke',
      title: 'Why did the makeup artist go to school? To improve her foundation! 💄',
      emoji: '😄',
      likes: 3421,
      comments: 567,
      shares: 234,
      postedBy: 'Makeup Jokes Central',
    },
    {
      id: 4,
      type: 'hack',
      title: 'Quick Hack: Use conditioner as a make-up primer!',
      image: 'https://i.imgur.com/2xR7nKw.jpeg',
      likes: 4123,
      comments: 892,
      shares: 567,
      postedBy: 'Pro Beauty Hacks',
    },
    {
      id: 5,
      type: 'meme',
      title: 'When the barber asks "How short?" and you show a picture 🤦',
      emoji: '✂️😅',
      likes: 5234,
      comments: 1234,
      shares: 892,
      postedBy: 'Barbershop Humor',
    },
    {
      id: 6,
      type: 'quote',
      title: '"Your hair is the crown you never take off" - Unknown',
      emoji: '👑',
      likes: 2156,
      comments: 345,
      shares: 156,
      postedBy: 'Hair Confidence',
    },
  ];

  const tipsContent = [
    {
      id: 1,
      category: 'Skincare',
      title: '5 Morning Skincare Steps for Lagos Heat ☀️',
      description: 'Beat the humidity with these quick steps to keep your skin fresh all day',
      image: 'https://i.imgur.com/PQr5c2L.jpeg',
      readTime: '3 min read',
      author: 'Dr. Adeola',
      views: 5234,
    },
    {
      id: 2,
      category: 'Haircare',
      title: 'How to Maintain Braids in Humid Weather 💨',
      description: 'Pro tips to keep your braids looking fresh for 8+ weeks',
      image: 'https://i.imgur.com/GqP5kL9.jpeg',
      readTime: '5 min read',
      author: 'Zainab Ahmed',
      views: 8934,
    },
    {
      id: 3,
      category: 'Nails',
      title: 'Choose Your Nail Shape: Complete Guide ✨',
      description: 'From almond to coffin - find which shape suits your hands best',
      image: 'https://i.imgur.com/hrnUh5H.jpeg',
      readTime: '4 min read',
      author: 'Chioma Beauty',
      views: 6234,
    },
    {
      id: 4,
      category: 'Trends',
      title: 'Trending: Chocolate Tint Nails for 2024 🍫',
      description: 'The hottest nail color taking over Lagos salons right now',
      image: 'https://i.imgur.com/8nB4xPl.jpeg',
      readTime: '2 min read',
      author: 'Nail Trends Today',
      views: 3456,
    },
    {
      id: 5,
      category: 'Makeup',
      title: 'Makeup for Dark Skin Tones: Ultimate Guide 🎨',
      description: 'Color palettes and techniques that make dark skin radiate',
      image: 'https://i.imgur.com/KjL9mPo.jpeg',
      readTime: '6 min read',
      author: 'Tunde Makeup Pro',
      views: 9876,
    },
    {
      id: 6,
      category: 'Business',
      title: 'Scale Your Beauty Business: 10 Proven Strategies 📈',
      description: 'Real tips from professionals who tripled their income on PamperPro',
      image: 'https://i.imgur.com/WqL8nKs.jpeg',
      readTime: '8 min read',
      author: 'Success Stories',
      views: 12456,
    },
  ];

  const marketplaceUpdates = [
    {
      id: 1,
      type: 'new-pro',
      title: 'Meet Amara - Your New Silk Press Expert! 👋',
      description: 'Just joined PamperPro. Specialized in silk press and color treatments. Location: Ikoyi. Rating: 4.8 ⭐',
      image: 'https://i.pinimg.com/1200x/2c/b5/10/2cb5106a48964692fab9fb3280aa9280.jpg',
      icon: '🌟',
      bookingsSoFar: 48,
    },
    {
      id: 2,
      type: 'feature',
      title: 'NEW FEATURE: Video Consultations!',
      description: 'Book a free 10-min video chat with any professional before your appointment. Perfect for consultations!',
      icon: '📹',
    },
    {
      id: 3,
      type: 'success',
      title: 'Success Story: Zainab tripled her bookings! 📈',
      description: 'After joining PamperPro 6 months ago, Zainab went from 5 to 15 bookings/week with ₦500k+ monthly earnings',
      image: 'https://i.pinimg.com/736x/1f/9b/8e/1f9b8ee240289f9754bc801afd1b5808.jpg',
      icon: '💰',
      earnings: '₦500k+',
    },
    {
      id: 4,
      type: 'new-pro',
      title: 'Meet Tunde - Master Barber & Beard Specialist 🪒',
      description: 'Traditional & modern barbering. Location: Surulere. 200+ bookings. Rating: 4.9 ⭐',
      image: 'https://i.imgur.com/HjK9mPq.jpeg',
      icon: '💈',
      bookingsSoFar: 200,
    },
  ];

  const partnerships = [
    {
      id: 1,
      type: 'pro-spotlight',
      name: 'Chioma Nwankwo',
      title: 'Top Makeup Artist - 4.9 stars',
      bio: 'PamperPro changed my business game. Now I reach clients I never would have found alone! ₦300k/month',
      image: 'https://i.pinimg.com/1200x/2c/b5/10/2cb5106a48964692fab9fb3280aa9280.jpg',
      badge: 'Featured Pro',
      bookings: 150,
    },
    {
      id: 2,
      type: 'brand-partnership',
      name: 'Gel Polish Perfection',
      title: 'Official Partner Brand',
      bio: 'Get 20% off all Gel Polish Perfection products when you book through PamperPro. Used by 5000+ professionals',
      image: 'https://i.imgur.com/9B5L8x2.jpeg',
      badge: 'Partner Brand',
      discount: '20% OFF',
    },
    {
      id: 3,
      type: 'collaboration',
      name: 'Interview: Inside Tunde Salon',
      title: 'How he scaled to 3 locations in 2 years',
      bio: 'Exclusive interview with Tunde Okafor about growth, challenges, and PamperPro impact',
      image: 'https://i.pinimg.com/736x/1f/9b/8e/1f9b8ee240289f9754bc801afd1b5808.jpg',
      badge: 'Interview',
      readTime: '7 min',
    },
  ];

  const communityContent = [
    {
      id: 1,
      type: 'before-after',
      title: 'Check out this transformation! 🤩',
      before: 'https://i.imgur.com/7t6AXsz.jpeg',
      after: 'https://i.imgur.com/GKiG5k9.jpeg',
      userComment: 'By Blessing Okoro | Booked through PamperPro',
      likes: 5234,
      service: 'Hair Braiding',
    },
    {
      id: 2,
      type: 'review',
      title: 'Best braider in Lagos! 10/10 would recommend',
      rating: 5,
      reviewer: 'Nneka Johnson',
      pro: 'Zainab Ahmed',
      service: 'Ghana Weave Braids',
      likes: 892,
      verified: true,
    },
    {
      id: 3,
      type: 'contest',
      title: 'Tag & Share Contest!',
      description: 'Tag 2 friends who need a makeover for a chance to win ₦10,000 in PamperPro credits',
      status: '3 days left',
      participants: 456,
      prizePool: '₦100,000',
    },
    {
      id: 4,
      type: 'testimonial',
      title: '"I found my regular professionals on PamperPro!"',
      content: 'I have been looking for a consistent, high-quality salon experience and PamperPro delivered exactly that!',
      reviewer: 'Ngozi Uche',
      rating: 5,
      likes: 2345,
    },
    {
      id: 5,
      type: 'success-story',
      title: 'From unemployed to ₦1M/month! 🚀',
      content: 'Blessed by PamperPro, this young woman now earns over ₦1 million monthly doing what she loves',
      likes: 8934,
      participants: 3200,
    },
  ];

  const events = [
    {
      id: 1,
      title: 'Beauty Expo 2024 Lagos 🎨',
      date: 'Dec 15-17, 2024',
      location: 'Eko Convention Centre',
      time: '10 AM - 6 PM',
      price: '₦2,000',
      attendees: 1234,
      image: 'https://i.imgur.com/4Vo2Ncz.jpeg',
      speakers: 'Top 20 Beauty Influencers',
    },
    {
      id: 2,
      title: 'Masterclass: Advanced Braiding Techniques 🧵',
      date: 'Dec 20, 2024',
      location: 'Lekki',
      time: '2 PM - 5 PM',
      price: 'FREE for PamperPro Pros',
      attendees: 567,
      image: 'https://i.imgur.com/YjhbHX6.jpeg',
      instructor: 'Zainab Ahmed (4.9⭐)',
    },
    {
      id: 3,
      title: 'Training: Starting Your Beauty Business 📚',
      date: 'Dec 22, 2024',
      location: 'Victoria Island',
      time: '1 PM - 4 PM',
      price: '₦5,000',
      attendees: 234,
      image: 'https://i.imgur.com/PjT4nQv.jpeg',
      instructor: 'Business Coach Tunde',
    },
    {
      id: 4,
      title: 'PamperPro Pro Summit 2024 🌟',
      date: 'Jan 10, 2025',
      location: 'Lagos Convention Centre',
      time: '9 AM - 6 PM',
      price: 'FREE for all PamperPro Professionals',
      attendees: 2000,
      image: 'https://i.imgur.com/KjL9mPo.jpeg',
      highlights: 'Networking, Awards, Workshops',
    },
  ];

  const giveawayContent = [
    {
      id: 1,
      title: '💅 ₦50,000 GIVEAWAY! Win Luxury Nail Kit',
      prize: '₦50,000 worth of professional nail supplies',
      entryMethod: 'Follow + Like + Tag 3 friends',
      endDate: 'Dec 18, 2024',
      entries: 5678,
      image: 'https://i.imgur.com/8kL9pQs.jpeg',
    },
    {
      id: 2,
      title: '✂️ Hair Care Bundle Worth ₦30,000',
      prize: 'Complete professional hair care set (shampoo, conditioner, oils)',
      entryMethod: 'Share this post + comment why you need it',
      endDate: 'Dec 20, 2024',
      entries: 3245,
      image: 'https://i.imgur.com/PjT4nQv.jpeg',
    },
  ];

  const quizzes = [
    {
      id: 1,
      title: '🎨 What\'s Your Ideal Nail Style?',
      question: 'Which nail shape are you most drawn to?',
      options: [
        { text: 'Almond - Classic & elegant', votes: 2156 },
        { text: 'Coffin - Bold & trendy', votes: 3234 },
        { text: 'Square - Strong & clean', votes: 1089 },
      ],
      totalVotes: 6479,
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Nneka Johnson',
      role: 'Client',
      text: 'PamperPro made finding quality services so easy. I have my favorite professionals booked months in advance!',
      rating: 5,
      image: 'https://i.imgur.com/HjK9mPq.jpeg',
    },
    {
      id: 2,
      name: 'Zainab Ahmed',
      role: 'Professional',
      text: 'Started with 5 clients a week. Now I am booked out 2 months ahead earning ₦250k+ monthly. PamperPro is the best!',
      rating: 5,
      image: 'https://i.pinimg.com/1200x/2c/b5/10/2cb5106a48964692fab9fb3280aa9280.jpg',
    },
    {
      id: 3,
      name: 'Tunde Okafor',
      role: 'Business Owner',
      text: 'Scaled from 1 location to 3 locations in 2 years. PamperPro\'s system is amazing for business growth.',
      rating: 5,
      image: 'https://i.imgur.com/KjL9mPo.jpeg',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Pamper Pro Banter 🎉
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our vibrant community of beauty professionals and enthusiasts. Discover deals, tips, inspiration, and connect with thousands of like-minded beauty lovers!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 ${
                selectedFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 shadow-md'
              }`}
            >
              <span>{filter.emoji}</span>
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Promotions Section */}
        {(selectedFilter === 'all' || selectedFilter === 'deals') && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🔥 Hot Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotions.map((promo) => (
                <div
                  key={promo.id}
                  className={`bg-gradient-to-br ${promo.color} rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{promo.title}</h3>
                      <p className="text-sm opacity-90 mt-1">{promo.description}</p>
                    </div>
                    <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                      {promo.badge}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>📍 {promo.location}</p>
                    <p>⏱️ {promo.timeLeft}</p>
                    <p className="opacity-90">{promo.details}</p>
                  </div>
                  <Button className="w-full mt-4 bg-white text-gray-900 hover:bg-gray-100 font-bold">
                    Claim Deal
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Fun Content */}
        {(selectedFilter === 'all' || selectedFilter === 'fun') && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">😂 Fun & Entertainment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {funContent.map((content) => (
                <div
                  key={content.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
                >
                  {content.image && (
                    <img
                      src={content.image}
                      alt={content.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="font-bold text-lg mb-2">{content.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">By {content.postedBy}</p>
                  <div className="flex justify-between items-center text-gray-600">
                    <div className="flex gap-4 text-sm">
                      <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                        <Heart size={16} /> {content.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                        <MessageCircle size={16} /> {content.comments}
                      </button>
                      <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                        <Share2 size={16} /> {content.shares}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tips Section */}
        {(selectedFilter === 'all' || selectedFilter === 'tips') && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">💡 Pro Tips & Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tipsContent.map((tip) => (
                <div
                  key={tip.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-purple-600 uppercase">
                        {tip.category}
                      </span>
                      <span className="text-xs text-gray-500">{tip.readTime}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{tip.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>By {tip.author}</span>
                      <span>👁️ {tip.views} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Marketplace Updates */}
        {(selectedFilter === 'all' || selectedFilter === 'marketplace') && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🆕 New on PamperPro</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplaceUpdates.map((update) => (
                <div
                  key={update.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{update.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{update.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{update.description}</p>
                  {update.image && (
                    <img
                      src={update.image}
                      alt={update.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  {update.bookingsSoFar && (
                    <p className="text-xs text-purple-600 font-semibold">
                      ✅ {update.bookingsSoFar} bookings already!
                    </p>
                  )}
                  {update.earnings && (
                    <p className="text-sm font-bold text-green-600">Earning: {update.earnings}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pro Spotlight */}
        {(selectedFilter === 'all' || selectedFilter === 'pro-spotlight') && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">⭐ Pro Spotlight</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {partnerships.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{partner.name}</h3>
                        <p className="text-xs text-purple-600 font-semibold">{partner.title}</p>
                      </div>
                      <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">
                        {partner.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{partner.bio}</p>
                    <div className="text-xs text-gray-500">
                      {partner.bookings && <p>📅 {partner.bookings} bookings</p>}
                      {partner.discount && <p>💰 {partner.discount}</p>}
                      {partner.readTime && <p>📖 {partner.readTime}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Community */}
        {(selectedFilter === 'all' || selectedFilter === 'community') && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">👥 Community Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityContent.map((content) => (
                <div
                  key={content.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="font-bold text-lg mb-3">{content.title}</h3>
                  {content.before && content.after && (
                    <div className="flex gap-3 mb-3">
                      <img
                        src={content.before}
                        alt="Before"
                        className="w-1/2 h-32 object-cover rounded-lg"
                      />
                      <img
                        src={content.after}
                        alt="After"
                        className="w-1/2 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  {content.userComment && (
                    <p className="text-sm text-gray-600 mb-2">{content.userComment}</p>
                  )}
                  {content.content && (
                    <p className="text-sm text-gray-700 mb-3">{content.content}</p>
                  )}
                  {content.rating && (
                    <div className="mb-2">
                      <p className="text-sm font-semibold">
                        {'⭐'.repeat(content.rating)}
                      </p>
                    </div>
                  )}
                  {content.reviewer && (
                    <p className="text-xs text-gray-500">
                      {content.reviewer} {content.verified && '✅'}
                    </p>
                  )}
                  <button className="text-sm text-purple-600 font-semibold hover:text-purple-800 flex items-center gap-1 mt-2">
                    <Heart size={16} /> {content.likes} likes
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Events */}
        {(selectedFilter === 'all' || selectedFilter === 'events') && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">📅 Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <p>📅 {event.date}</p>
                      <p>⏰ {event.time}</p>
                      <p>📍 {event.location}</p>
                      <p>💰 {event.price}</p>
                      {event.instructor && <p>👨‍🏫 Instructor: {event.instructor}</p>}
                      {event.speakers && <p>🎤 {event.speakers}</p>}
                      {event.highlights && <p>✨ {event.highlights}</p>}
                    </div>
                    <p className="text-xs text-purple-600 font-semibold">
                      {event.attendees} people interested
                    </p>
                    <Button className="w-full mt-3 bg-purple-600 text-white hover:bg-purple-700">
                      Register Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Giveaways */}
        {(selectedFilter === 'all' || selectedFilter === 'giveaways') && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🎁 Giveaways & Contests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {giveawayContent.map((giveaway) => (
                <div
                  key={giveaway.id}
                  className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl shadow-md p-6 border-2 border-yellow-300"
                >
                  <img
                    src={giveaway.image}
                    alt={giveaway.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-bold text-lg mb-2">{giveaway.title}</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Prize:</strong> {giveaway.prize}
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Entry:</strong> {giveaway.entryMethod}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-gray-600">Ends: {giveaway.endDate}</span>
                    <span className="text-xs text-gray-600">{giveaway.entries} entries</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg font-bold">
                    Enter Now
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter */}
        {(selectedFilter === 'all' || selectedFilter === 'newsletter') && (
          <section>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
              <Mail className="w-12 h-12 mx-auto mb-3" />
              <h2 className="text-2xl font-bold mb-2">Stay in the Loop 📧</h2>
              <p className="mb-4 opacity-90">
                Get weekly deals, pro tips, and exclusive community updates delivered to your inbox!
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="text-gray-900"
                />
                <Button
                  onClick={() => {
                    if (newsletterEmail) {
                      setNewsletterSubmitted(true);
                      setTimeout(() => setNewsletterSubmitted(false), 3000);
                    }
                  }}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold"
                >
                  {newsletterSubmitted ? '✅ Subscribed!' : 'Subscribe'}
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">❤️ What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{testimonial.text}</p>
                <p className="text-yellow-400">{'⭐'.repeat(testimonial.rating)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to Transform Your Beauty Journey? 💅</h2>
          <p className="mb-6 opacity-90">
            Join thousands of professionals and clients already thriving on PamperPro
          </p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-3 text-lg">
            Get Started Today
          </Button>
        </section>
      </div>
    </div>
  );
}
