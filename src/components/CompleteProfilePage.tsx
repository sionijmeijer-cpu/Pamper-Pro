import React from 'react';

export const CompleteProfilePage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">
          Complete your profile
        </h1>
        <p className="text-gray-600 mb-4">
          This is a placeholder profile completion page. 
          You can add your real form fields here later.
        </p>
      </div>
    </div>
  );
};
