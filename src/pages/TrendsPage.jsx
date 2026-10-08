import React from 'react';
import TrendChart from '../components/TrendChart';
import { useLanguage } from '../context/LanguageContext';

export const TrendsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t('healthTrendsTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Track changes in key blood markers across multiple diagnostic lab reports.
        </p>
      </div>

      <TrendChart />
    </div>
  );
};

export default TrendsPage;
