import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useAuth } from '../hooks/useAuth';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShoppingCartProps {
  items?: CartItem[];
  onCheckout?: (items: CartItem[], total: number) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ items = [], onCheckout }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>(items);

  // Get discount based on subscription tier
  const getDiscount = (): number => {
    const tier = user?.subscription_tier || 'free';
    if (tier === 'premium') return 0.20; // 20% discount
    if (tier === 'pro') return 0.10; // 10% discount
    return 0.05; // 5% discount for free
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * getDiscount();
  const shippingCost = user?.subscription_tier === 'premium' ? 0 : 5;
  const total = subtotal - discount + shippingCost;

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (itemId: number) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout(cartItems, total);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600">Add products to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <Card>
        <CardHeader>
          <CardTitle>Shopping Cart ({cartItems.length} items)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
              {item.image && (
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({(getDiscount() * 100).toFixed(0)}%)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600">
              Shipping {user?.subscription_tier === 'premium' ? '(Free)' : ''}
            </span>
            <span className="font-semibold">${shippingCost.toFixed(2)}</span>
          </div>
          
          <div className="pt-3 border-t-2 border-gray-200 flex justify-between">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-lg text-blue-600">${total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Checkout Button */}
      <Button
        onClick={handleCheckout}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Proceed to Checkout
      </Button>

      {/* Subscription Info */}
      {user?.subscription_tier && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <p className="text-sm text-gray-700">
              💝 <strong>{user.subscription_tier.toUpperCase()}</strong> member discount applied!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShoppingCart;
