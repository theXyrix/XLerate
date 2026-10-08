import React from 'react';
import ComparisonCard from '../components/ComparisonCard';
import { useLanguage } from '../context/LanguageContext';

export const ComparisonPage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t('compareTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Select any two health reports to analyze changes in blood parameters, dosages, and test results over time.
        </p>
      </div>

      <ComparisonCard />
    </div>
  );
};

export default ComparisonPage;
