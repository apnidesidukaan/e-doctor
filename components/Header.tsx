
import React from 'react';
import { Search, MapPin, Menu, User, Sparkles, Command } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string, location: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState('General Hospitals');
  const [location, setLocation] = React.useState('Lucknow');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-[60] border-b border-emerald-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Brand */}
          <div className="flex items-center gap-3 cursor-pointer group shrink-0">
            <div className="relative">
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 rotate-3 transition-transform group-hover:rotate-0">
                <Sparkles className="text-white" size={24} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <span className="text-2xl font-black text-slate-800 tracking-tighter">Hospi</span>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none">Navigator</p>
            </div>
          </div>

          {/* Advanced Search Portal */}
          <form onSubmit={handleSubmit} className="hidden md:flex flex-1 max-w-2xl group">
            <div className="flex w-full bg-slate-100/50 rounded-2xl p-1.5 border border-slate-200/50 focus-within:bg-white focus-within:border-emerald-300 focus-within:ring-4 focus-within:ring-emerald-50 transition-all duration-300">
              <div className="flex items-center px-4 gap-2 border-r border-slate-200 w-1/3">
                <MapPin size={18} className="text-emerald-500" />
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-700 w-full"
                  placeholder="Where?"
                />
              </div>
              <div className="flex-1 flex items-center px-4 gap-2">
                <Search size={18} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-700 w-full"
                  placeholder="Search specialists, labs, or trauma care..."
                />
                <div className="hidden lg:flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 shadow-sm">
                  <Command size={10} className="text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-400">K</span>
                </div>
              </div>
            </div>
          </form>

          {/* User & Menu */}
          <div className="flex items-center gap-4">
            <button className="hidden lg:flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold text-sm transition-colors">
              Care Portal
            </button>
            <div className="h-6 w-px bg-slate-200 hidden lg:block" />
            <div className="flex items-center gap-2 bg-slate-900 text-white pl-4 pr-1.5 py-1.5 rounded-2xl shadow-lg shadow-slate-200 hover:bg-emerald-950 transition-all cursor-pointer">
              <span className="text-sm font-bold">Account</span>
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                <User size={18} />
              </div>
            </div>
            <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 md:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
