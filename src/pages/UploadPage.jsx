import React from 'react';
import { UploadBox } from '../components/UploadBox';
import { SafetyDisclaimer } from '../components/SafetyDisclaimer';
import { useLanguage } from '../context/LanguageContext';

export const UploadPage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t('uploadTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md mx-auto">
          {t('uploadSubtitle')}
        </p>
      </div>

      <UploadBox />

      <div className="pt-8">
        <SafetyDisclaimer compact />
      </div>
    </div>
  );
};

export default UploadPage;
