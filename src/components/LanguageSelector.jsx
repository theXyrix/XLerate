import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
      <div className="flex items-center gap-1.5 px-2 text-slate-500">
        <Globe className="w-3.5 h-3.5" />
      </div>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-lg transition-all ${
          language === 'en'
            ? 'bg-white text-teal-800 shadow-sm font-semibold'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('ta')}
        className={`px-2.5 py-1 rounded-lg transition-all ${
          language === 'ta'
            ? 'bg-white text-teal-800 shadow-sm font-semibold'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        தமிழ்
      </button>
    </div>
  );
};

export default LanguageSelector;
