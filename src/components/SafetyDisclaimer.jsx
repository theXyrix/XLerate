import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SafetyDisclaimer = ({ compact = false }) => {
  const { t } = useLanguage();

  if (compact) {
    return (
      <div className="flex items-center gap-2 p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl text-amber-800 text-xs leading-relaxed">
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>{t('safetyDisclaimer')}</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900 text-slate-300 py-4 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <ShieldAlert className="w-4 h-4 text-teal-400 flex-shrink-0" />
          <span>{t('safetyDisclaimer')}</span>
        </div>
        <div className="text-slate-300">
          © {new Date().getFullYear()} MedJourney AI. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default SafetyDisclaimer;
