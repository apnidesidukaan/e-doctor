
import React, { useState, useEffect } from 'react';
import { Hospital } from '../types';
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
  XCircle,
  Phone, 
  Calendar, 
  Navigation,
  Shield,
  ArrowUpRight
} from 'lucide-react';

interface HospitalCardProps {
  hospital: Hospital;
}

const STATIC_FALLBACKS = [
  "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1586773860418-d3b3a998dc55?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=1200"
];

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  const [imgSrc, setImgSrc] = useState(hospital.imageUrl);
  
  // Update image source if hospital prop changes (e.g., new search)
  useEffect(() => {
    setImgSrc(hospital.imageUrl);
  }, [hospital.imageUrl]);

  const checklistItems = [
    { label: 'Cardiac Care', key: 'cardiacCare' as const },
    { label: 'Cancer Care', key: 'cancerCare' as const },
    { label: 'Emergency Care', key: 'emergencyCare' as const },
    { label: 'Neurosciences', key: 'neurosciences' as const },
    { label: 'Orthopaedics', key: 'orthopaedics' as const },
  ];

  const handleImageError = () => {
    // If the image fails to load, pick a deterministic fallback from the high-quality list
    const fallback = STATIC_FALLBACKS[Math.abs(hospital.name.length) % STATIC_FALLBACKS.length];
    setImgSrc(fallback);
  };

  return (
    <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden group hover:border-emerald-200 transition-all duration-500">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="w-full lg:w-80 relative h-56 lg:h-auto overflow-hidden shrink-0 bg-slate-100">
          <img 
            src={imgSrc} 
            alt={hospital.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={handleImageError}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:hidden" />
          
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/95 backdrop-blur-md text-emerald-900 text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-widest border border-white/20">
              <Shield size={12} className="text-emerald-500" /> PLATINUM VERIFIED
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-10 lg:hidden">
             <h3 className="text-xl font-black text-white leading-tight drop-shadow-lg">{hospital.name}</h3>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
            <div className="hidden lg:block">
              <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2 group-hover:text-emerald-700 transition-colors">
                {hospital.name}
              </h3>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <Star size={12} fill="currentColor" /> {hospital.rating.toFixed(1)}
                </div>
                <span>•</span>
                <span>{hospital.reviewsCount.toLocaleString()} Verified Reviews</span>
              </div>
            </div>

            {/* Availability Badges */}
            <div className="flex gap-2 w-full md:w-auto">
               <div className="flex-1 md:flex-none bg-slate-50 px-4 py-2 rounded-xl text-center border border-slate-100">
                 <p className="text-[8px] uppercase font-black text-slate-400 tracking-tighter">Beds Free</p>
                 <p className="text-base font-black text-emerald-600">{hospital.bedAvailability}</p>
               </div>
               <div className="flex-1 md:flex-none bg-slate-50 px-4 py-2 rounded-xl text-center border border-slate-100">
                 <p className="text-[8px] uppercase font-black text-slate-400 tracking-tighter">ER Wait</p>
                 <p className="text-base font-black text-amber-500">{hospital.waitTime}</p>
               </div>
            </div>
          </div>

          <div className="flex items-start gap-2 text-slate-500 mb-6">
            <MapPin size={16} className="text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm font-semibold leading-relaxed line-clamp-2">{hospital.address}</p>
          </div>

          {/* Checklist */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100 mt-auto">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Facility Capability Matrix</p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {checklistItems.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  {hospital.checklist[item.key] ? (
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle size={14} className="text-slate-300 shrink-0" />
                  )}
                  <span className={`text-[11px] font-bold ${hospital.checklist[item.key] ? 'text-slate-700' : 'text-slate-400'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="lg:w-60 bg-slate-50/50 p-6 lg:p-8 flex flex-col justify-center gap-3 border-t lg:border-t-0 lg:border-l border-slate-100">
          <button className="w-full bg-slate-900 hover:bg-emerald-700 text-white font-black py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
            <Calendar size={16} /> BOOK VISIT
          </button>
          
          <div className="flex gap-2">
            <a href={`tel:${hospital.phone}`} className="flex-1 flex items-center justify-center h-12 bg-white border border-slate-200 rounded-xl text-slate-700 hover:text-emerald-600 hover:border-emerald-600 transition-all">
              <Phone size={18} />
            </a>
            {hospital.mapUrl && (
              <a href={hospital.mapUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center h-12 bg-white border border-slate-200 rounded-xl text-slate-700 hover:text-emerald-600 hover:border-emerald-600 transition-all">
                <Navigation size={18} />
              </a>
            )}
          </div>
          
          <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1 hover:text-emerald-600 mt-2">
            FULL DETAILS <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
