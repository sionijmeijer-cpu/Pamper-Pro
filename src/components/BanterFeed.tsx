import { useState } from 'react';
import { Button } from './ui/button';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface BanterPost {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: 'tip' | 'story' | 'question' | 'product';
}

interface BanterFeedProps {
  onNavigate?: (page: string) => void;
}

export function BanterFeed({ onNavigate }: BanterFeedProps) {
  const [posts, setPosts] = useState<BanterPost[]>([
    {
      id: 1,
      author: 'Amara Johnson',
      avatar: '/images/service-natural-hair.png',
      content:
        'Just tried the new moisture-rich treatment routine and my natural hair has never looked better! The key is consistency and using quality products. Who else loves caring for their natural hair? 💚',
      timestamp: '2 hours ago',
      likes: 234,
      comments: 45,
      category: 'tip',
    },
    {
      id: 2,
      author: 'Zainab Adeyemi',
      avatar: '/images/service-silk-press.png',
      content:
        'My client just shared the most amazing transformation! From damaged hair to silky smooth. Protective styling really does work! 😍',
      timestamp: '4 hours ago',
      likes: 512,
      comments: 78,
      category: 'story',
    },
    {
      id: 3,
      author: 'Chioma Okonkwo',
      avatar: '/images/service-braids.png',
      content: 'What is your go-to product for edge control? Im looking for recommendations that actually work and last long!',
      timestamp: '6 hours ago',
      likes: 156,
      comments: 32,
      category: 'question',
    },
  ]);

  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (postId: number) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tip':
        return 'bg-blue-100 text-blue-700';
      case 'story':
        return 'bg-purple-100 text-purple-700';
      case 'question':
        return 'bg-orange-100 text-orange-700';
      case 'product':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Beauty Banter</h1>
          <p className="text-gray-600">
            Connect with beauty professionals, share tips, and inspire each other
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
            >
              {/* Post Header */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-gray-900">{post.author}</h3>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(
                        post.category
                      )}`}
                    >
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

              {/* Post Actions */}
              <div className="flex items-center gap-8 pt-4 border-t border-gray-200">
                <button
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      likedPosts.has(post.id)
                        ? 'fill-red-500 text-red-500'
                        : ''
                    }`}
                  />
                  <span className="text-sm">
                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                  </span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
