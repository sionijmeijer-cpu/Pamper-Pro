import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Heart, Share2, MessageCircle, Trophy, Calendar, Mail } from 'lucide-react';

interface BanterPageEnhancedProps {
  onNavigate?: (page: string, params?: Record<string, string>) => void;
}

export function BanterPageEnhanced({ onNavigate }: BanterPageEnhancedProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [pollVotes, setPollVotes] = useState({ option1: 156, option2: 234, option3: 89 });
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
    },
    {
      id: 2,
      type: 'quote',
      title: '"A woman who cuts her hair is about to change her life" - Coco Chanel',
      emoji: '✂️',
      likes: 1892,
      comments: 234,
      shares: 89,
    },
    {
      id: 3,
      type: 'joke',
      title: 'Why did the makeup artist go to school? To improve her foundation! 💄',
      emoji: '😄',
      likes: 3421,
      comments: 567,
      shares: 234,
    },
    {
      id: 4,
      type: 'hack',
      title: 'Quick Hack: Use conditioner as a make-up primer!',
      image: 'https://i.imgur.com/2xR7nKw.jpeg',
      likes: 4123,
      comments: 892,
      shares: 567,
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
    },
    {
      id: 2,
      category: 'Haircare',
      title: 'How to Maintain Braids in Humid Weather 💨',
      description: 'Pro tips to keep your braids looking fresh for 8+ weeks',
      image: 'https://i.imgur.com/GqP5kL9.jpeg',
      readTime: '5 min read',
    },
    {
      id: 3,
      category: 'Nails',
      title: 'Choose Your Nail Shape: Complete Guide ✨',
      description: 'From almond to coffin - find which shape suits your hands best',
      image: 'https://i.imgur.com/hrnUh5H.jpeg',
      readTime: '4 min read',
    },
    {
      id: 4,
      category: 'Trends',
      title: 'Trending: Chocolate Tint Nails for 2024 🍫',
      description: 'The hottest nail color taking over Lagos salons right now',
      image: 'https://i.imgur.com/8nB4xPl.jpeg',
      readTime: '2 min read',
    },
  ];

  const marketplaceUpdates = [
    {
      id: 1,
      type: 'new-pro',
      title: 'Meet Amara - Your New Silk Press Expert! 👋',
      description: 'Just joined PamperPro. Specialized in silk press and color treatments. Location: Ikoyi',
      image: 'https://i.pinimg.com/1200x/2c/b5/10/2cb5106a48964692fab9fb3280aa9280.jpg',
      icon: '🌟',
    },
    {
      id: 2,
      type: 'feature',
      title: 'NEW FEATURE: Video Consultations!',
      description: 'Book a free 10-min video chat with any professional before your appointment',
      icon: '📹',
    },
    {
      id: 3,
      type: 'success',
      title: 'Success Story: Zainab tripled her bookings! 📈',
      description: 'After joining PamperPro 6 months ago, Zainab went from 5 to 15 bookings/week',
      image: 'https://i.pinimg.com/736x/1f/9b/8e/1f9b8ee240289f9754bc801afd1b5808.jpg',
      icon: '💰',
    },
  ];

  const partnerships = [
    {
      id: 1,
      type: 'pro-spotlight',
      name: 'Chioma Nwankwo',
      title: 'Top Makeup Artist - 4.9 stars',
      bio: 'PamperPro changed my business game. Now I reach clients I never would have found alone!',
      image: 'https://i.pinimg.com/1200x/2c/b5/10/2cb5106a48964692fab9fb3280aa9280.jpg',
      badge: 'Featured Pro',
    },
    {
      id: 2,
      type: 'brand-partnership',
      name: 'Gel Polish Perfection',
      title: 'Official Partner Brand',
      bio: 'Get 20% off all Gel Polish Perfection products when you book through PamperPro',
      image: 'https://i.imgur.com/9B5L8x2.jpeg',
      badge: 'Partner Brand',
    },
    {
      id: 3,
      type: 'collaboration',
      name: 'Interview: Inside Tunde Salon',
      title: 'How he scaled to 3 locations in 2 years',
      bio: 'Exclusive interview with Tunde Okafor about growth, challenges, and PamperPro impact',
      image: 'https://i.pinimg.com/736x/1f/9b/8e/1f9b8ee240289f9754bc801afd1b5808.jpg',
      badge: 'Interview',
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
    },
    {
      id: 3,
      type: 'contest',
      title: 'Tag & Share Contest!',
      description: 'Tag 2 friends who need a makeover for a chance to win ₦10,000 in PamperPro credits',
      status: '3 days left',
      participants: 456,
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
    },
    {
      id: 3,
      title: 'Training: Starting Your Beauty Business 📚',
      date: 'Every Saturday',
      location: 'Online + In-person',
      time: '11 AM - 1 PM',
      price: '₦5,000 per session',
      attendees: 234,
      image: 'https://i.imgur.com/BpH6y6T.jpeg',
    },
  ];

  const giveaways = [
    {
      id: 1,
      title: 'December Prize Draw',
      prize: 'Win ₦100,000 in salon vouchers!',
      description: 'Every booking this month = 1 entry. More bookings = more chances to win!',
      deadline: 'Dec 31, 2024',
      participants: 2341,
    },
    {
      id: 2,
      title: 'Instagram Challenge',
      prize: 'Best transformation wins ₦50,000',
      description: '#PamperProTransformation - Show us your before & after',
      deadline: 'Dec 25, 2024',
      participants: 892,
    },
    {
      id: 3,
      title: 'Referral Rewards',
      prize: 'Unlimited rewards!',
      description: 'Refer a friend = ₦1,000 credit. They book = you both get ₦2,000!',
      deadline: 'Ongoing',
      participants: 5234,
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What is the best frequency for moisturizing in Lagos heat?',
      options: ['Once a week', 'Twice daily', 'Only at night', 'When it feels dry'],
      correct: 1,
    },
    {
      id: 2,
      question: 'Which hair type benefits most from silk press?',
      options: ['Straight hair', 'Relaxed hair', 'Natural hair', 'All types'],
      correct: 2,
    },
  ];

  const handlePollVote = (option: string) => {
    setUserPoll(option);
    const newVotes = { ...pollVotes };
    const key = option as keyof typeof pollVotes;
    newVotes[key] = (newVotes[key] || 0) + 1;
    setPollVotes(newVotes);
  };

  const handleLike = (id: number) => {
    if (likedContent.includes(id)) {
      setLikedContent(likedContent.filter(item => item !== id));
    } else {
      setLikedContent([...likedContent, id]);
    }
  };

  const handleQuizAnswer = (optionIndex: number) => {
    setQuizAnswer(optionIndex);
    if (optionIndex === quizQuestions[0].correct) {
      setQuizScore(quizScore + 1);
    }
  };

  const handleNewsletterSignup = () => {
    if (newsletterEmail.includes('@')) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSubmitted(false);
      }, 3000);
    }
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('REFER-BLESSING123');
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2000);
  };

  const shouldShowSection = (sectionId: string) => {
    return selectedFilter === 'all' || selectedFilter === sectionId;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* STICKY FILTER TABS */}
      <div className="sticky top-0 z-40 bg-white border-b-2 border-gray-100 shadow-lg">
        <div className="px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider mb-3">Filter</h3>
            <div className="flex overflow-x-auto gap-2 sm:gap-3 pb-2 scrollbar-hide">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                    selectedFilter === filter.id
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <span className="hidden sm:inline">{filter.emoji} {filter.label}</span>
                  <span className="sm:hidden">{filter.emoji}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: PROMOTIONS & DEALS */}
      {shouldShowSection('deals') && (
        <section className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-teal-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2">🔥 Hot Deals</h2>
              <p className="text-sm sm:text-lg text-gray-600">Flash sales, weekly wonders & seasonal specials</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {promotions.map((promo) => (
                <div
                  key={promo.id}
                  className={`relative rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br ${promo.color}`}
                >
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white bg-opacity-20 px-2 sm:px-3 py-1 rounded-full text-xs font-bold">
                    {promo.badge}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black mb-2">{promo.title}</h3>
                  <p className="text-xs sm:text-sm opacity-90 mb-4">{promo.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl sm:text-3xl font-black">{promo.discount}</span>
                    <span className="text-xs opacity-75">{promo.timeLeft}</span>
                  </div>
                  <p className="text-xs mt-3 opacity-80">📍 {promo.location}</p>
                </div>
              ))}
            </div>

            <Button className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base">
              View All Offers
            </Button>
          </div>
        </section>
      )}

      {/* SECTION 2: FUN BANTER CONTENT */}
      {shouldShowSection('fun') && (
        <section className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2">😂 Fun & Laughs</h2>
              <p className="text-sm sm:text-lg text-gray-600">Memes, jokes, quick hacks & beauty stories</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {funContent.map((content) => (
                <div
                  key={content.id}
                  className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  {content.image ? (
                    <div className="h-40 sm:h-48 bg-gray-300 overflow-hidden">
                      <img src={content.image} alt={content.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-32 sm:h-40 bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl">{content.emoji}</span>
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-gray-900 line-clamp-2">{content.title}</h3>
                    <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                      <button
                        onClick={() => handleLike(content.id)}
                        className={`flex items-center gap-1 ${likedContent.includes(content.id) ? 'text-red-500 font-bold' : ''}`}
                      >
                        <Heart className={`w-4 h-4 ${likedContent.includes(content.id) ? 'fill-red-500' : ''}`} />
                        {content.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-teal-700">
                        <MessageCircle className="w-4 h-4" />
                        {content.comments}
                      </button>
                      <button className="flex items-center gap-1 hover:text-teal-700">
                        <Share2 className="w-4 h-4" />
                        {content.shares}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* POLL */}
            <div className="mt-8 sm:mt-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl sm:rounded-2xl p-5 sm:p-8 border-2 border-purple-300">
              <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">📊 Quick Poll: Your favorite?</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { key: 'option1', label: '💅 Nails', votes: pollVotes.option1 },
                  { key: 'option2', label: '💇‍♀️ Hair', votes: pollVotes.option2 },
                  { key: 'option3', label: '💄 Makeup', votes: pollVotes.option3 },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handlePollVote(option.key)}
                    className={`w-full text-left p-3 sm:p-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 ${
                      userPoll === option.key
                        ? 'bg-purple-500 text-white'
                        : 'bg-white text-gray-900 hover:bg-purple-50'
                    }`}
                  >
                    {option.label} - {option.votes} votes
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: TIPS & EXPERT ADVICE */}
      {shouldShowSection('tips') && (
        <section className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-teal-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2">💡 Tips & Advice</h2>
              <p className="text-sm sm:text-lg text-gray-600">Skincare, haircare, nails & trending styles</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {tipsContent.map((tip) => (
                <div
                  key={tip.id}
                  className="group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white"
                >
                  <div className="h-40 sm:h-48 bg-gray-300 overflow-hidden relative">
                    <img src={tip.image} alt={tip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-teal-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                      {tip.category}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="font-bold text-base sm:text-xl mb-2 text-gray-900 group-hover:text-teal-700 transition-colors line-clamp-2">{tip.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">{tip.description}</p>
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-xs text-gray-500">⏱️ {tip.readTime}</span>
                      <Button className="bg-teal-700 hover:bg-teal-800 text-white px-3 sm:px-4 py-2 h-auto rounded-lg text-xs sm:text-sm">
                        Read More
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: MARKETPLACE UPDATES */}
      {shouldShowSection('marketplace') && (
        <section className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2">🆕 What is New</h2>
              <p className="text-sm sm:text-lg text-gray-600">New pros, features & success stories</p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {marketplaceUpdates.map((update) => (
                <div
                  key={update.id}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 border-l-4 border-teal-500"
                >
                  {update.image && (
                    <img src={update.image} alt={update.title} className="w-full sm:w-24 h-32 sm:h-24 rounded-lg sm:rounded-xl object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl sm:text-3xl">{update.icon}</span>
                      <h3 className="text-base sm:text-xl font-bold text-gray-900 line-clamp-1">{update.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">{update.description}</p>
                    <Button className="bg-teal-700 hover:bg-teal-800 text-white px-4 sm:px-6 py-2 h-auto rounded-lg text-xs sm:text-sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: PARTNERSHIPS & PRO SPOTLIGHTS */}
      {shouldShowSection('pro-spotlight') && (
        <section className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-teal-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2">⭐ Pro Spotlights</h2>
              <p className="text-sm sm:text-lg text-gray-600">Featured pros, interviews & brand partnerships</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {partnerships.map((partner) => (
                <div
                  key={partner.id}
                  className="group rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white"
                >
                  <div className="relative h-40 sm:h-48 bg-gray-300 overflow-hidden">
                    <img src={partner.image} alt={partner.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-amber-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold">
                      {partner.badge}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 line-clamp-1">{partner.name}</h3>
                    <p className="text-teal-700 font-semibold text-xs sm:text-sm mb-2 line-clamp-1">{partner.title}</p>
                    <p className="text-gray-700 text-xs sm:text-sm italic mb-4 line-clamp-2">"{partner.bio}"</p>
                    <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 px-3 h-auto rounded-lg text-xs sm:text-sm">
                      {partner.type === 'pro-spotlight' ? 'Book Now' : 'Learn More'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: COMMUNITY ENGAGEMENT */}
      {shouldShowSection('community') && (
        <section className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2">👥 Community Love</h2>
              <p className="text-sm sm:text-lg text-gray-600">Before & afters, reviews, contests & more</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
              {communityContent.slice(0, 1).map((content) => (
                <div key={content.id} className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-pink-50 to-rose-50">
                  <div className="grid grid-cols-2 h-48 sm:h-64">
                    <div className="bg-gray-300">
                      <img src={content.before} alt="Before" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-gray-300">
                      <img src={content.after} alt="After" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900">{content.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-1">{content.userComment}</p>
                    <button className="flex items-center gap-2 text-red-500 font-semibold hover:text-red-600 text-sm">
                      <Heart className="w-5 h-5 fill-red-500" />
                      {content.likes} loves
                    </button>
                  </div>
                </div>
              ))}

              {communityContent.slice(1, 2).map((content) => (
                <div key={content.id} className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 sm:p-6">
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {Array.from({ length: content.rating }).map((_, i) => (
                      <span key={i} className="text-xl sm:text-2xl">⭐</span>
                    ))}
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-gray-900 line-clamp-2">{content.title}</h3>
                  <div className="space-y-1 text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                    <p><strong>By:</strong> {content.reviewer}</p>
                    <p><strong>Pro:</strong> {content.pro}</p>
                    <p><strong>Service:</strong> {content.service}</p>
                  </div>
                  <button className="flex items-center gap-2 text-red-500 font-semibold hover:text-red-600 text-sm">
                    <Heart className="w-5 h-5" />
                    {content.likes} helpful
                  </button>
                </div>
              ))}

              {communityContent.slice(2, 3).map((content) => (
                <div
                  key={content.id}
                  className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-green-100 to-emerald-100 p-4 sm:p-6 flex flex-col justify-between border-2 border-green-300"
                >
                  <div>
                    <h3 className="font-black text-xl sm:text-2xl mb-2 text-gray-900">{content.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-800 font-semibold mb-3 sm:mb-4">{content.description}</p>
                    <p className="text-xs text-gray-700 mb-3 sm:mb-4">📅 {content.status}</p>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 h-auto rounded-lg text-xs sm:text-sm">
                    Join & Win! ({content.participants})
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: EVENTS & WORKSHOPS */}
      {shouldShowSection('events') && (
        <section className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-teal-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2">📅 Events & Masterclasses</h2>
              <p className="text-sm sm:text-lg text-gray-600">Beauty expos, training & learning opportunities</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white"
                >
                  <div className="h-40 sm:h-48 bg-gray-300 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="font-bold text-base sm:text-lg mb-3 text-gray-900 line-clamp-2">{event.title}</h3>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                      <p className="flex items-center gap-2">📅 {event.date}</p>
                      <p className="flex items-center gap-2">🕐 {event.time}</p>
                      <p className="flex items-center gap-2">📍 {event.location}</p>
                      <p className="flex items-center gap-2 font-bold text-teal-700">💰 {event.price}</p>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 sm:mb-4">{event.attendees}+ registered</p>
                    <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 h-auto rounded-lg text-xs sm:text-sm">
                      Register
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: NEWSLETTER SIGNUP */}
      {shouldShowSection('newsletter') && (
        <section className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 bg-gradient-to-r from-teal-700 to-teal-600 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <Mail className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">Stay In The Loop!</h2>
            <p className="text-sm sm:text-lg mb-6 sm:mb-8 opacity-90">Get weekly deals, beauty tips & exclusive offers straight to your inbox</p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
              <Input
                type="email"
                placeholder="Your email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-white text-gray-900 rounded-lg sm:rounded-xl px-3 sm:px-6 py-2.5 sm:py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm sm:text-base"
              />
              <Button
                onClick={handleNewsletterSignup}
                className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-4 sm:px-8 py-2.5 sm:py-3 h-auto rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
              >
                Subscribe
              </Button>
            </div>

            {newsletterSubmitted && (
              <p className="text-amber-200 font-semibold text-sm">✅ Thanks for subscribing! Check your email soon!</p>
            )}
          </div>
        </section>
      )}

      {/* SECTION 9: GIVEAWAYS & CHALLENGES */}
      {shouldShowSection('giveaways') && (
        <section className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2">🎁 Giveaways & Challenges</h2>
              <p className="text-sm sm:text-lg text-gray-600">Win prizes, get rewards, have fun!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
              {giveaways.map((giveaway) => (
                <div
                  key={giveaway.id}
                  className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-purple-100 to-pink-100 p-4 sm:p-8 border-2 border-purple-300 text-center flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-black text-lg sm:text-2xl mb-3 sm:mb-4 text-gray-900">{giveaway.title}</h3>
                    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                      <p className="text-xl sm:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        {giveaway.prize}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-700 font-semibold">{giveaway.description}</p>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">📅 Deadline: {giveaway.deadline}</p>
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-700 mb-4 sm:mb-6">
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                      {giveaway.participants}+ joined
                    </div>
                  </div>
                  <div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 sm:py-3 h-auto rounded-lg sm:rounded-xl text-xs sm:text-base">
                      {giveaway.id === 3 ? 'Get Code' : 'Join Now'}
                    </Button>

                    {giveaway.id === 3 && (
                      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-purple-300">
                        <button
                          onClick={handleCopyReferral}
                          className="w-full bg-white text-purple-600 font-bold py-2 px-3 sm:px-4 rounded-lg hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm"
                        >
                          <span className="font-mono truncate">REFER-BLESSING123</span>
                          {referralCopied ? '✅' : '📋'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* MINI QUIZ */}
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl sm:rounded-2xl p-4 sm:p-8 border-2 border-blue-300">
              <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 text-gray-900">🧠 Beauty Brain Quiz</h3>
              <div className="mb-6">
                <p className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-lg">{quizQuestions[0].question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  {quizQuestions[0].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      className={`p-2 sm:p-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-xs sm:text-base ${
                        quizAnswer === idx
                          ? idx === quizQuestions[0].correct
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-white text-gray-900 hover:bg-blue-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              {quizAnswer !== null && (
                <div className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl text-center font-bold text-xs sm:text-base">
                  {quizAnswer === quizQuestions[0].correct ? '🎉 Correct! You got it!' : '❌ Not quite - try again!'} 
                  <p className="text-xs mt-2 text-gray-600">Your Score: {quizScore} point{quizScore !== 1 ? 's' : ''}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 bg-gradient-to-r from-teal-700 to-emerald-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-6">Ready to get pampered?</h2>
          <p className="text-xs sm:text-lg mb-6 sm:mb-8 opacity-90">Join thousands of Lagosians getting pampered daily on PamperPro</p>
          <div className="flex flex-col gap-3 justify-center">
            <Button
              onClick={() => onNavigate?.('find-professional')}
              className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-6 sm:px-8 py-2.5 sm:py-3 h-auto rounded-lg sm:rounded-xl text-sm sm:text-lg transform hover:scale-105 transition-all duration-200"
            >
              Book Now
            </Button>
            <Button
              onClick={() => onNavigate?.('launch-business')}
              className="bg-white hover:bg-gray-100 text-teal-700 font-bold px-6 sm:px-8 py-2.5 sm:py-3 h-auto rounded-lg sm:rounded-xl text-sm sm:text-lg transform hover:scale-105 transition-all duration-200"
            >
              Launch Your Business
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
