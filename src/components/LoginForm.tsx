import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface LoginFormProps {
  onLoginSuccess: (email: string, password?: string) => Promise<void>;
  onForgotPassword: () => void;
  onSwitchToSignup: () => void;
  onSocialAuth: (email: string, firstName: string, lastName: string, socialProvider: string) => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export function LoginForm({
  onLoginSuccess,
  onForgotPassword,
  onSwitchToSignup,
  onSocialAuth,
  isLoading,
  error,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLoginSuccess(email, password);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to your account</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 rounded-lg transition-all"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          type="button"
          onClick={onForgotPassword}
          variant="outline"
          className="w-full"
          disabled={isLoading}
        >
          Forgot Password?
        </Button>
      </div>

      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-teal-700 font-semibold hover:text-teal-800"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
