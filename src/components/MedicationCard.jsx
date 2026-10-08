import React from 'react';
import { Pill, Calendar, Clock, FileText, CheckCircle2 } from 'lucide-react';
import ConfidenceBadge from './ConfidenceBadge';
import { useLanguage } from '../context/LanguageContext';

export const MedicationCard = ({ medication }) => {
  const { t } = useLanguage();
  const isActive = medication.status === 'Active';

  return (
    <div className="glass-card p-5 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${isActive ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'}`}>
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-extrabold text-slate-900">{medication.name}</h4>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                {medication.dosage}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {t('frequency')}: <span className="text-slate-800">{medication.frequency}</span>
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
            isActive
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
          {isActive ? t('medStatusActive') : t('medStatusPrevious')}
        </span>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">{medication.source}</span>
        </div>
        <div className="flex items-center sm:justify-end gap-1.5">
          <ConfidenceBadge confidence={medication.confidence} />
        </div>
      </div>
    </div>
  );
};

export default MedicationCard;
