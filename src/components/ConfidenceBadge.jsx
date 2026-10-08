import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ConfidenceBadge = ({ confidence = 95 }) => {
  const { t } = useLanguage();
  const isLowConfidence = confidence < 80;

  if (isLowConfidence) {
    return (
      <div className="inline-flex flex-col gap-1">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          {t('confidence')}: {confidence}%
        </span>
        <span className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
          ⚠️ {t('lowConfidenceWarning')}
        </span>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200">
      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
      {t('confidence')}: <span className="font-bold">{confidence}%</span>
    </span>
  );
};

export default ConfidenceBadge;
