import React, { useState } from 'react';
import { GitCompare, ArrowDown, ArrowUp, Info, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealthData } from '../context/HealthDataContext';

export const ComparisonCard = () => {
  const { t } = useLanguage();
  const { data } = useHealthData();

  const [prevDocId, setPrevDocId] = useState('rec-001'); // Jan 12, 2026
  const [latestDocId, setLatestDocId] = useState('rec-005'); // Oct 08, 2026
  const [compared, setCompared] = useState(true);

  const prevDoc = data.medicalRecords.find(r => r.id === prevDocId) || data.medicalRecords[4];
  const latestDoc = data.medicalRecords.find(r => r.id === latestDocId) || data.medicalRecords[0];

  const handleCompare = () => {
    setCompared(true);
  };

  return (
    <div className="w-full space-y-6">
      {/* Selection Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card">
        <h3 className="text-lg font-extrabold text-slate-900 mb-4">{t('compareTitle')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t('previousRecord')}
            </label>
            <select
              value={prevDocId}
              onChange={(e) => setPrevDocId(e.target.value)}
              className="w-full px-4 py-3 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl outline-none transition-colors"
            >
              {data.medicalRecords.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.date} — {r.documentName} ({r.type})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t('latestRecord')}
            </label>
            <select
              value={latestDocId}
              onChange={(e) => setLatestDocId(e.target.value)}
              className="w-full px-4 py-3 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl outline-none transition-colors"
            >
              {data.medicalRecords.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.date} — {r.documentName} ({r.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleCompare}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-600/20 transition-all active:scale-95"
        >
          <GitCompare className="w-4 h-4" />
          <span>{t('compareBtn')}</span>
        </button>
      </div>

      {/* Comparison Results */}
      {compared && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">{t('whatChangedTitle')}</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparing {prevDoc?.date} vs {latestDoc?.date}
              </p>
            </div>
            <span className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-bold rounded-full border border-teal-200">
              Observation Summary
            </span>
          </div>

          {/* Change Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hemoglobin */}
            <div className="p-5 bg-rose-50/70 border border-rose-200 rounded-2xl">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-bold text-rose-950">Hemoglobin</h4>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                  <ArrowDown className="w-3.5 h-3.5" /> {t('decreased')}
                </span>
              </div>
              <div className="text-lg font-black text-rose-900 mt-1">
                12.8 → <span className="text-rose-600">10.2 g/dL</span>
              </div>
              <div className="text-[11px] text-rose-700 mt-1">
                Decreased by 2.6 g/dL over 9 months.
              </div>
            </div>

            {/* Vitamin D */}
            <div className="p-5 bg-rose-50/70 border border-rose-200 rounded-2xl">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-bold text-rose-950">Vitamin D</h4>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                  <ArrowDown className="w-3.5 h-3.5" /> {t('decreased')}
                </span>
              </div>
              <div className="text-lg font-black text-rose-900 mt-1">
                22 → <span className="text-rose-600">14 ng/mL</span>
              </div>
              <div className="text-[11px] text-rose-700 mt-1">
                Decreased by 8 ng/mL.
              </div>
            </div>

            {/* Fasting Glucose */}
            <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-bold text-amber-950">Fasting Glucose</h4>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                  <ArrowUp className="w-3.5 h-3.5" /> {t('increased')}
                </span>
              </div>
              <div className="text-lg font-black text-amber-900 mt-1">
                108 → <span className="text-amber-600">126 mg/dL</span>
              </div>
              <div className="text-[11px] text-amber-700 mt-1">
                Increased by 18 mg/dL.
              </div>
            </div>

            {/* Medication Continuity */}
            <div className="p-5 bg-teal-50/70 border border-teal-200 rounded-2xl">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-bold text-teal-950">Medication Continuity</h4>
                <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md">
                  Continued
                </span>
              </div>
              <div className="text-xs font-semibold text-teal-900 mt-2">
                {t('medicationObservation')}
              </div>
              <div className="text-[11px] text-teal-700 mt-1">
                Vitamin D3 60,000 IU added in recent prescription.
              </div>
            </div>
          </div>

          {/* Safe Wording Disclaimer */}
          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>{t('compareDisclaimer')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonCard;
