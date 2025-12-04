import { useNavigate } from 'react-router-dom';
import { Scissors, Sparkles, Heart, Paintbrush, Hand, Smile, Users, Zap } from 'lucide-react';

const serviceCategories = [
  { name: 'Hair Styling', icon: Scissors, color: 'bg-pink-500', service: 'Hair Styling' },
  { name: 'Makeup', icon: Paintbrush, color: 'bg-purple-500', service: 'Makeup' },
  { name: 'Nail Art', icon: Hand, color: 'bg-rose-500', service: 'Nail Art' },
  { name: 'Skincare', icon: Sparkles, color: 'bg-teal-500', service: 'Skincare Treatment' },
  { name: 'Spa & Massage', icon: Heart, color: 'bg-indigo-500', service: 'Massage & Spa' },
  { name: 'Facials', icon: Smile, color: 'bg-amber-500', service: 'Facials' },
  { name: 'Braids', icon: Users, color: 'bg-emerald-500', service: 'Braids & Extensions' },
  { name: 'Mens Grooming', icon: Zap, color: 'bg-blue-500', service: 'Mens Grooming' },
];

export function ServiceCategoryQuickFind() {
  const navigate = useNavigate();

  const handleCategoryClick = (service: string) => {
    sessionStorage.setItem('searchFilters', JSON.stringify({ service }));
    navigate('/find-professional');
  };

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Find Professionals by Service
          </h2>
          <p className="text-gray-600 text-lg">
            Choose a category to discover top-rated professionals near you
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.service)}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center gap-3 transform hover:scale-105"
              >
                <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-gray-900 font-semibold text-center text-sm sm:text-base">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/find-professional')}
            className="text-teal-600 hover:text-teal-700 font-semibold text-lg underline decoration-2 underline-offset-4 hover:scale-105 transform transition-all duration-200"
          >
            View All Services →
          </button>
        </div>
      </div>
    </div>
  );
}
