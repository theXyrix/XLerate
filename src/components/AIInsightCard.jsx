import React from 'react';
import { Sparkles, FileText, Info, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AIInsightCard = ({ explanation, evidenceList, onOpenEvidence }) => {
  const { t } = useLanguage();

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-50/50 via-white to-sky-50/30 shadow-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-teal-500/20">
          <Sparkles className="w-5 h-5 text-amber-300" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">{t('simpleExplanationTitle')}</h3>
          <span className="text-xs font-semibold text-teal-700 bg-teal-100/80 px-2.5 py-0.5 rounded-full">
            AI Generated • Verified against Report Data
          </span>
        </div>
      </div>

      <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium bg-white/80 p-5 rounded-2xl border border-slate-200/80 shadow-inner">
        "{explanation || t('aiHealthOverviewText')}"
      </p>

      {/* Supporting Evidence List Summary */}
      {evidenceList && evidenceList.length > 0 && (
        <div className="mt-5 pt-4 border-t border-teal-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs font-bold text-slate-700">
              Supporting Evidence ({evidenceList.length} values extracted)
            </div>
            <button
              onClick={onOpenEvidence}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-600/20 transition-all hover:scale-105 active:scale-95"
            >
              <Info className="w-4 h-4" />
              <span>{t('whyAmISeeingThis')}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsightCard;
