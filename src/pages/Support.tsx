import React from 'react';

const Support: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-6">
            <svg
              className="w-16 h-16 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Support
          </h1>
          <p className="text-2xl text-gray-600 font-light">
            Coming Soon
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <p className="text-gray-500 mb-6">
            We're working on building an amazing support experience for you. Stay tuned!
          </p>
          <div className="inline-flex items-center gap-2 text-purple-600">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
