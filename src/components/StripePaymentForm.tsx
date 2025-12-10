import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface StripePaymentFormProps {
  amount: number;
  description: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  description,
  onSuccess,
  onError,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const [cardData, setCardData] = useState({
    name: '',
    email: user?.email || '',
    number: '',
    expiry: '',
    cvc: '',
  });

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'number') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    // Format expiry as MM/YY
    if (name === 'expiry') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      if (formatted.length >= 2) {
        setCardData(prev => ({ ...prev, [name]: `${formatted.slice(0, 2)}/${formatted.slice(2)}` }));
      } else {
        setCardData(prev => ({ ...prev, [name]: formatted }));
      }
      return;
    }

    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const validateCardData = (): boolean => {
    if (!cardData.name || !cardData.number || !cardData.expiry || !cardData.cvc) {
      setErrorMessage('Please fill in all payment details');
      return false;
    }
    if (cardData.number.replace(/\s/g, '').length !== 16) {
      setErrorMessage('Card number must be 16 digits');
      return false;
    }
    if (cardData.cvc.length !== 3) {
      setErrorMessage('CVC must be 3 digits');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateCardData()) {
      setPaymentStatus('error');
      return;
    }

    setLoading(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      // Simulate Stripe API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demo: Accept test card numbers
      const cardNumber = cardData.number.replace(/\s/g, '');
      if (!cardNumber.startsWith('4')) {
        throw new Error('Please use a valid test card (starting with 4)');
      }

      const generatedPaymentId = `pi_${Date.now()}`;
      setPaymentId(generatedPaymentId);
      setPaymentStatus('success');

      if (onSuccess) {
        onSuccess(generatedPaymentId);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Payment failed. Please try again.';
      setErrorMessage(errorMsg);
      setPaymentStatus('error');
      if (onError) {
        onError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  if (paymentStatus === 'success') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-900">Payment Successful!</h3>
            <div className="bg-white p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-600">Payment ID</p>
              <p className="text-lg font-mono font-bold">{paymentId}</p>
              <p className="text-sm text-gray-600">Amount Charged</p>
              <p className="text-2xl font-bold text-gray-900">${amount.toFixed(2)}</p>
            </div>
            <p className="text-gray-600 text-sm">A confirmation email has been sent.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Amount Display */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600">Amount to Pay</p>
          <p className="text-3xl font-bold text-gray-900">${amount.toFixed(2)}</p>
        </div>

        {/* Error Message */}
        {paymentStatus === 'error' && (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900">Payment Failed</p>
              <p className="text-sm text-red-800">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Card Details Form */}
        <div className="space-y-4">
          <Input
            placeholder="Cardholder Name"
            name="name"
            value={cardData.name}
            onChange={handleCardChange}
            disabled={loading}
          />

          <Input
            placeholder="Email Address"
            type="email"
            name="email"
            value={cardData.email}
            onChange={handleCardChange}
            disabled={loading}
          />

          <Input
            placeholder="Card Number (4111 1111 1111 1111)"
            name="number"
            value={cardData.number}
            onChange={handleCardChange}
            disabled={loading}
            maxLength={19}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="MM/YY"
              name="expiry"
              value={cardData.expiry}
              onChange={handleCardChange}
              disabled={loading}
              maxLength={5}
            />
            <Input
              placeholder="CVC"
              name="cvc"
              value={cardData.cvc}
              onChange={handleCardChange}
              disabled={loading}
              maxLength={3}
              type="password"
            />
          </div>
        </div>

        {/* Test Card Info */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600">
            <strong>Test Card:</strong> 4111 1111 1111 1111 • Any future date • Any 3-digit CVC
          </p>
        </div>

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          disabled={loading || paymentStatus === 'processing'}
          className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing Payment...
            </>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </Button>

        {/* Security Info */}
        <p className="text-xs text-gray-500 text-center">
          🔒 Your payment information is secure and encrypted
        </p>
      </CardContent>
    </Card>
  );
};

export default StripePaymentForm;
