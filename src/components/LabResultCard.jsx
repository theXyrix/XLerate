import React from 'react';
import { AlertCircle, CheckCircle2, Info, FileText, ExternalLink } from 'lucide-react';
import ConfidenceBadge from './ConfidenceBadge';
import { useLanguage } from '../context/LanguageContext';

export const LabResultCard = ({ result, onViewEvidence }) => {
  const { t } = useLanguage();

  const isBelow = result.flag === 'critical' || result.status?.toLowerCase().includes('below');
  const isReview = result.flag === 'warning' || result.status?.toLowerCase().includes('review');
  const isNormal = result.flag === 'normal' || result.status?.toLowerCase().includes('within');

  const statusBadgeColor = isBelow
    ? 'bg-rose-50 text-rose-800 border-rose-200'
    : isReview
    ? 'bg-amber-50 text-amber-900 border-amber-200'
    : 'bg-emerald-50 text-emerald-800 border-emerald-200';

  const statusIcon = isBelow ? (
    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
  ) : isReview ? (
    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
  ) : (
    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
  );

  return (
    <div className="glass-card p-5 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-900">{result.param}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusBadgeColor}`}>
              {statusIcon}
              {result.status}
            </span>
            <ConfidenceBadge confidence={result.confidence} />
          </div>
        </div>

        <div className="text-left sm:text-right">
          <div className="text-2xl font-black text-slate-900">
            {result.value} <span className="text-xs font-semibold text-slate-500">{result.unit}</span>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            Ref: {result.referenceRange}
          </div>
        </div>
      </div>

      {/* Footer Info & Evidence trigger */}
      <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span>{result.sourceDoc || 'Blood_Report_Oct_2026.pdf'}</span>
          {result.page && <span className="text-slate-400">• Page {result.page}</span>}
        </div>

        {onViewEvidence && (
          <button
            onClick={() => onViewEvidence(result)}
            className="flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-lg border border-teal-200 transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{t('whyAmISeeingThis')}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default LabResultCard;
