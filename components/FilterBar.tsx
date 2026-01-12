
import React from 'react';
import { ChevronDown, Zap, ShieldCheck, Star, Clock, Filter } from 'lucide-react';

const FilterBar: React.FC = () => {
  const filters = [
    { name: 'Sort by', icon: <ChevronDown size={14} /> },
    { name: 'Book Appointment', active: false },
    { name: 'Insurance Accepted', icon: <ChevronDown size={14} /> },
    { name: 'Top Rated', icon: <Star size={14} className="text-yellow-500 fill-yellow-500" /> },
    { name: 'Quick Response', icon: <Zap size={14} className="text-purple-500" /> },
    { name: 'Verified', icon: <ShieldCheck size={14} className="text-blue-500" />, active: true },
    { name: 'Jd Trust', active: false },
    { name: 'Ratings', icon: <ChevronDown size={14} /> },
  ];

  return (
    <div className="bg-white border-b border-gray-200 py-3 mb-6">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2">
          {filters.map((f, i) => (
            <button 
              key={i}
              className={`whitespace-nowrap flex items-center gap-1.5 px-4 py-1.5 rounded-lg border text-sm font-medium transition-all
                ${f.active 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
            >
              {f.name}
              {f.icon}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors">
          <Filter size={16} /> All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
