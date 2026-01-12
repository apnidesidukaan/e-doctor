
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import HospitalCard from './components/HospitalCard';
import { Hospital, SearchFilters } from './types';
import { searchHospitals } from './services/geminiService';
import { 
  AlertCircle, 
  Loader2, 
  Stethoscope, 
  Activity, 
  Dna, 
  Ambulance, 
  Baby, 
  Filter,
  ArrowRight,
  TrendingUp,
  MapPin,
  Sparkles
} from 'lucide-react';

const App: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | undefined>();
  const [searchParams, setSearchParams] = useState<SearchFilters>({
    query: 'General Hospitals',
    location: 'Lucknow',
    services: [],
    minRating: 0,
    openNow: false
  });

  const categories = [
    { name: 'Cardiology', icon: <Activity size={18} />, color: 'emerald' },
    { name: 'Oncology', icon: <Dna size={18} />, color: 'blue' },
    { name: 'Emergency', icon: <Ambulance size={18} />, color: 'rose' },
    { name: 'Neurology', icon: <Stethoscope size={18} />, color: 'indigo' },
    { name: 'Maternity', icon: <Baby size={18} />, color: 'amber' },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.warn("Location access denied", err)
      );
    }
  }, []);

  const handleSearch = useCallback(async (query: string, location: string) => {
    setLoading(true);
    setError(null);
    try {
      const { hospitals: results } = await searchHospitals({ ...searchParams, query, location }, userLocation);
      setHospitals(results);
      setSearchParams(prev => ({ ...prev, query, location }));
    } catch (err) {
      setError("Healthcare service lookup interrupted. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchParams, userLocation]);

  useEffect(() => {
    handleSearch(searchParams.query, searchParams.location);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header onSearch={handleSearch} />
      
      {/* Category Pills - Sticky */}
      <div className="bg-white/50 backdrop-blur-md border-b border-slate-100 py-4 sticky top-20 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-6 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-3">
            {categories.map((cat, idx) => (
              <button 
                key={idx}
                onClick={() => handleSearch(cat.name, searchParams.location)}
                className="flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all whitespace-nowrap shadow-sm shadow-slate-100"
              >
                <span className="text-emerald-500">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-emerald-950 transition-all shrink-0">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm uppercase tracking-widest mb-1">
                  <TrendingUp size={16} /> Premium Search Results
                </div>
                <h1 className="text-3xl font-black text-slate-900">
                  {searchParams.query} in <span className="text-emerald-600">{searchParams.location}</span>
                </h1>
              </div>
              <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
                <span>Showing {hospitals.length} facilities</span>
                <select className="bg-transparent border-none focus:ring-0 cursor-pointer text-emerald-600">
                  <option>Relevance</option>
                  <option>Nearest</option>
                  <option>Top Rated</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="relative">
                  <Loader2 className="animate-spin text-emerald-600" size={64} />
                  <Activity className="absolute inset-0 m-auto text-emerald-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mt-6">Analyzing Medical Facilities</h3>
                <p className="text-slate-500 text-sm mt-2 font-medium">Matching your query with specialized hospital data...</p>
              </div>
            ) : error ? (
              <div className="p-12 bg-rose-50 rounded-3xl border border-rose-100 text-center shadow-lg shadow-rose-900/5">
                <AlertCircle className="text-rose-500 mx-auto mb-4" size={56} />
                <h3 className="text-rose-900 font-black text-xl mb-2">Service Unavailable</h3>
                <p className="text-rose-700 font-medium mb-6">{error}</p>
                <button 
                  onClick={() => handleSearch(searchParams.query, searchParams.location)}
                  className="bg-rose-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-rose-700 transition-all"
                >
                  Retry Diagnostic
                </button>
              </div>
            ) : (
              <div className="grid gap-8">
                {hospitals.map(h => <HospitalCard key={h.id} hospital={h} />)}
              </div>
            )}
          </div>

          {/* Side Contextual Information */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Real-time Health Monitor (Simulated Context) */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-slate-200/50">
              <h3 className="text-xl font-black text-slate-900 mb-6">Care Coordinator</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Your Current Zone</h4>
                    <p className="text-sm text-slate-500">Search is centered around your detected location for fastest response.</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Today's Health Insight</p>
                   <p className="text-sm text-slate-700 leading-relaxed font-medium">
                     "Air Quality is Moderate today. Patients with respiratory conditions should check for hospitals with advanced Pulmonology units."
                   </p>
                </div>

                <button className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                  Emergency Ambulance <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Why Hospi Benefits */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-500/30 transition-all" />
               <h3 className="text-xl font-black mb-6 relative z-10">The Hospi Advantage</h3>
               <ul className="space-y-5 relative z-10">
                 {[
                   "Verified Specialist Availability",
                   "Real-time ER Wait Times",
                   "Direct Bed Booking System",
                   "Verified Patient Outcomes"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-slate-300 text-sm font-bold">
                     <div className="w-2 h-2 bg-emerald-400 rounded-full" /> {item}
                   </li>
                 ))}
               </ul>
            </div>

            {/* Support Widget */}
            <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
               <h4 className="font-black text-emerald-950 mb-2">Need Direct Guidance?</h4>
               <p className="text-emerald-700 text-sm font-medium mb-6">Talk to our medical concierge for finding highly specific surgeries.</p>
               <button className="bg-white text-emerald-700 font-black px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all">
                 Speak with an Advisor
               </button>
            </div>

          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="text-white" size={20} />
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">Hospi</span>
            </div>
            <p className="text-slate-500 text-lg leading-relaxed font-medium max-w-md">
              The world's most advanced hospital discovery engine. Powered by Gemini to bring you real-time medical insights when every second counts.
            </p>
          </div>
          <div>
            <h5 className="font-black text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">Medical Network</h5>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li className="hover:text-emerald-600 cursor-pointer">Partner Hospitals</li>
              <li className="hover:text-emerald-600 cursor-pointer">Verified Doctors</li>
              <li className="hover:text-emerald-600 cursor-pointer">Diagnostic Labs</li>
            </ul>
          </div>
          <div>
            <h5 className="font-black text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">Community</h5>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li className="hover:text-emerald-600 cursor-pointer">Health Guide</li>
              <li className="hover:text-emerald-600 cursor-pointer">Wait-time Trends</li>
              <li className="hover:text-emerald-600 cursor-pointer">Emergency Support</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-400 font-black uppercase tracking-widest">
           <span>© 2024 Hospi Healthcare Ecosystem • Developed for Modern Wellness</span>
           <div className="flex gap-8">
              <span className="hover:text-emerald-600 cursor-pointer transition-colors">HIPAA Compliant</span>
              <span className="hover:text-emerald-600 cursor-pointer transition-colors">Privacy Shield</span>
              <span className="hover:text-emerald-600 cursor-pointer transition-colors">Security Audit</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
