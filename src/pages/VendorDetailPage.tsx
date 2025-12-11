import { useState } from 'react';
import { Star, MapPin, Phone, Mail, ArrowLeft, ShoppingCart, Heart } from 'lucide-react';

export default function VendorDetailPage() {
  const [cartCount, setCartCount] = useState(0);

  const vendor = {
    id: 1,
    name: 'Glam Beauty Store',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
    rating: 4.9,
    reviews: 287,
    location: 'Abuja, Nigeria',
    phone: '+234 (803) 567-8901',
    email: 'store@glambeuaty.com',
    description: 'Premium beauty products and cosmetics. We offer authentic, high-quality products with fast delivery across Nigeria.',
    products: [
      { id: 1, name: 'Foundation Pro', price: 8500, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300' },
      { id: 2, name: 'Lipstick Set', price: 6200, image: 'https://images.unsplash.com/photo-1599305445671-ac13ee48713d?w=300' },
      { id: 3, name: 'Eye Shadow Palette', price: 5400, image: 'https://images.unsplash.com/photo-1596462502278-bf217bf0dba5?w=300' },
    ],
    tags: ['Cosmetics', 'Skincare', 'Fragrances', 'Hair Care'],
  };

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft size={20} />
          Back to Vendors
        </button>

        {/* Vendor Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{vendor.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < Math.floor(vendor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{vendor.rating}</span>
                  <span className="text-gray-600">({vendor.reviews} reviews)</span>
                </div>
                <p className="text-gray-600 mb-6">{vendor.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-purple-600" />
                    <p className="text-gray-600">{vendor.location}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-purple-600" />
                    <p className="text-gray-600">{vendor.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-purple-600" />
                    <p className="text-gray-600">{vendor.email}</p>
                  </div>
                </div>
              </div>

              {/* Cart Badge */}
              <div className="relative">
                <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors">
                  <ShoppingCart size={32} className="text-white" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories/Tags */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {vendor.tags.map((tag) => (
              <button
                key={tag}
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendor.products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-purple-600 mb-4">₦{product.price.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Heart size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">Customer {review}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">Great products and excellent service. Highly recommend this vendor!</p>
                    <p className="text-sm text-gray-500 mt-2">2 weeks ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
