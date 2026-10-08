import React from 'react';
import Timeline from '../components/Timeline';
import { useLanguage } from '../context/LanguageContext';

export const TimelinePage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t('journeyTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          A continuous chronological view of your lab tests, prescriptions, and health consultations.
        </p>
      </div>

      <Timeline />
    </div>
  );
};

export default TimelinePage;
