import React from 'react';

const Banter: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-6">
            <svg
              className="w-16 h-16 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Pamper Pro Banter
          </h1>
          <p className="text-2xl text-gray-600 font-light">
            Coming Soon
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <p className="text-gray-500 mb-6">
            Connect, share, and engage with beauty professionals and clients. This community space is under construction!
          </p>
          <div className="inline-flex items-center gap-2 text-indigo-600">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banter;
