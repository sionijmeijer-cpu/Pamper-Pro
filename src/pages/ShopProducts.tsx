import { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '../components/ui/button';

interface Product {
  id: number;
  name: string;
  vendor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  isFavorite: boolean;
  inCart: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Moroccan Argan Oil',
    vendor: 'Beauty Essentials Co.',
    price: 5500,
    originalPrice: 7000,
    rating: 4.9,
    reviews: 523,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
    category: 'Hair Care',
    isFavorite: false,
    inCart: false,
  },
  {
    id: 2,
    name: 'Vitamin C Serum',
    vendor: 'Skincare Pro',
    price: 8900,
    rating: 4.8,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    category: 'Skincare',
    isFavorite: false,
    inCart: false,
  },
  {
    id: 3,
    name: 'Face Mask Kit (10 pieces)',
    vendor: 'Glow Beauty',
    price: 3200,
    originalPrice: 4500,
    rating: 4.7,
    reviews: 218,
    image: 'https://images.unsplash.com/photo-1596462502278-af407713fc22?w=400&h=400&fit=crop',
    category: 'Skincare',
    isFavorite: false,
    inCart: false,
  },
  {
    id: 4,
    name: 'Hair Growth Supplement',
    vendor: 'Health & Beauty',
    price: 12000,
    rating: 4.6,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop',
    category: 'Hair Care',
    isFavorite: false,
    inCart: false,
  },
  {
    id: 5,
    name: 'Nail Polish Set (24 colors)',
    vendor: 'Nail Art Studio',
    price: 6800,
    originalPrice: 9500,
    rating: 4.8,
    reviews: 267,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop',
    category: 'Nails',
    isFavorite: false,
    inCart: false,
  },
  {
    id: 6,
    name: 'Collagen Facial Cream',
    vendor: 'Premium Skincare',
    price: 9800,
    rating: 4.9,
    reviews: 445,
    image: 'https://images.unsplash.com/photo-1566746a06c8-9d12-cc3f-95881-6f78db42f72e?w=400&h=400&fit=crop',
    category: 'Skincare',
    isFavorite: false,
    inCart: false,
  },
  {
    id: 7,
    name: 'Deep Conditioner (250ml)',
    vendor: 'Hair Therapy',
    price: 4500,
    originalPrice: 6000,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
    category: 'Hair Care',
    isFavorite: false,
    inCart: false,
  },
  {
    id: 8,
    name: 'Professional Makeup Brush Set',
    vendor: 'Makeup Masters',
    price: 7500,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    category: 'Makeup',
    isFavorite: false,
    inCart: false,
  },
];

export function ShopProducts() {
  const [items, setItems] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const categories = ['All', 'Hair Care', 'Skincare', 'Makeup', 'Nails'];

  const toggleFavorite = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const toggleCart = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, inCart: !item.inCart } : item
      )
    );
    setCartCount(prev => prev + 1);
  };

  const filteredProducts = items.filter(product => {
    const categoryMatch =
      selectedCategory === 'All' || product.category === selectedCategory;
    const searchMatch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const discountPercentage = (product: Product) => {
    if (product.originalPrice) {
      return Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Beauty Products</h1>
              <p className="text-gray-600 mt-2">Premium products from trusted vendors</p>
            </div>
            <div className="relative">
              <ShoppingCart className="w-8 h-8 text-teal-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex gap-3 overflow-x-auto pb-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-teal-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.originalPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{discountPercentage(product)}%
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      product.isFavorite
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex-grow flex flex-col">
                <p className="text-xs text-gray-500 font-medium mb-1">
                  {product.vendor}
                </p>
                <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₦{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => toggleCart(product.id)}
                  className={`w-full font-semibold transition-all ${
                    product.inCart
                      ? 'bg-teal-600 hover:bg-teal-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  {product.inCart ? '✓ In Cart' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found. Try adjusting your search or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
