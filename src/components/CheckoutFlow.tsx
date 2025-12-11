import React from 'react';

interface CheckoutFlowProps {
  cartTotal: number;
  items: any[]; // you can replace `any` with your real CartItem type later
}

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ cartTotal, items }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">
          Checkout
        </h1>
        <p className="text-gray-700 mb-2">
          This is a placeholder checkout flow.
        </p>
        <p className="text-gray-600 text-sm">
          Items in cart: {items.length} · Total: {cartTotal}
        </p>
      </div>
    </div>
  );
};

export default CheckoutFlow;
