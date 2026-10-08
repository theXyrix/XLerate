import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HeartPulse, 
  Search, 
  Bell, 
  Menu, 
  User,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealthData } from '../context/HealthDataContext';
import LanguageSelector from './LanguageSelector';

export const TopNavbar = ({ onToggleMobileMenu }) => {
  const { t } = useLanguage();
  const { searchQuery, setSearchQuery, loadDemoData } = useHealthData();
  const navigate = useNavigate();

  const handleDemoClick = () => {
    loadDemoData();
    navigate('/app/dashboard');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-200/80 px-4 sm:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left Section: Mobile Menu + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6 animate-pulse-subtle" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-slate-900 via-teal-900 to-teal-700 bg-clip-text text-transparent">
                MedJourney <span className="text-teal-600 font-extrabold">AI</span>
              </span>
              <span className="hidden sm:block text-[10px] font-medium text-slate-400 tracking-wider uppercase">
                Personal Health Copilot
              </span>
            </div>
          </Link>
        </div>

        {/* Center Section: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports, lab values, medications..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-teal-500 rounded-xl outline-none transition-all placeholder:text-slate-400 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Section: Language, Demo Button, Notifications, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Demo Button */}
          <button
            onClick={handleDemoClick}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('tryDemo')}</span>
          </button>

          {/* Language Selector */}
          <LanguageSelector />

          {/* Notification Icon */}
          <button 
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            title="2 new health alerts"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white animate-pulse"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              R
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-800 leading-tight">Raj</div>
              <div className="text-[10px] text-slate-500 font-medium">ABHA: 91-8273...</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
