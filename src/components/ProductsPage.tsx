import { Search, ShoppingCart, Star, Filter, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

export function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "Premium Hair Growth Oil",
      category: "Hair Care",
      price: 8500,
      image: "/images/service-natural-hair.png",
      rating: 4.8,
      reviews: 124,
      vendor: "Natural Essence Lagos",
      inStock: true
    },
    {
      id: 2,
      name: "Professional Braiding Hair Extensions",
      category: "Hair Extensions",
      price: 15000,
      image: "/images/service-braids.png",
      rating: 4.9,
      reviews: 256,
      vendor: "Glam Supply Nigeria",
      inStock: true
    },
    {
      id: 3,
      name: "Luxury Makeup Brush Set",
      category: "Makeup Tools",
      price: 25000,
      image: "/images/service-makeup.png",
      rating: 4.7,
      reviews: 89,
      vendor: "Beauty Pro Supplies",
      inStock: true
    },
    {
      id: 4,
      name: "Gel Nail Polish Collection",
      category: "Nail Products",
      price: 12000,
      image: "/images/service-nails.png",
      rating: 4.6,
      reviews: 156,
      vendor: "Nail Haven Store",
      inStock: true
    }
  ];

  const categories = ["All Products", "Hair Care", "Hair Extensions", "Makeup", "Nail Products", "Skincare", "Tools & Equipment"];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Beauty Products Marketplace</h1>
          <p className="text-xl mb-8">Discover premium beauty products from trusted vendors in Lagos</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for products..."
                className="pl-12 h-14 bg-white text-gray-900 border-0"
              />
              <Button className="absolute right-2 top-2 bg-green-600 hover:bg-green-700">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="whitespace-nowrap hover:bg-green-600 hover:text-white border-green-600 text-green-700"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-600 mt-2">{products.length} products available</p>
            </div>
            <Button variant="outline" className="border-green-600 text-green-700">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-600">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {product.inStock && (
                    <Badge className="absolute top-2 left-2 bg-green-600">In Stock</Badge>
                  )}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2 text-xs">
                    {product.category}
                  </Badge>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription className="text-sm">{product.vendor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-bold text-green-700">₦{product.price.toLocaleString()}</p>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Become a Vendor</h2>
          <p className="text-xl mb-8">Sell your beauty products to thousands of professionals across Lagos</p>
          <Button size="lg" className="bg-white text-green-800 hover:bg-gray-100">
            Start Selling Today
          </Button>
        </div>
      </section>
    </div>
  );
}
