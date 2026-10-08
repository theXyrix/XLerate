import React, { useState } from 'react';
import { TestTube2, Pill, FileText, Calendar, Filter, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealthData } from '../context/HealthDataContext';

export const Timeline = () => {
  const { t } = useLanguage();
  const { data, setSelectedRecordId } = useHealthData();
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = [
    { key: 'All', label: t('filterAll') },
    { key: 'Lab Reports', label: t('filterLabReports') },
    { key: 'Prescriptions', label: t('filterPrescriptions') },
    { key: 'Diagnoses', label: t('filterDiagnoses') },
    { key: 'Other Records', label: t('filterOther') }
  ];

  const filteredRecords = data.medicalRecords.filter(rec => {
    if (filterCategory === 'All') return true;
    return rec.category === filterCategory;
  });

  return (
    <div className="w-full">
      {/* Category Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-slate-100 rounded-2xl w-fit border border-slate-200">
        <div className="px-3 text-xs font-bold text-slate-500 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilterCategory(cat.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterCategory === cat.key
                ? 'bg-white text-teal-800 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Vertical Timeline Tree */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-8">
        {filteredRecords.map((record) => {
          const isLab = record.type === 'Lab Report';
          const Icon = isLab ? TestTube2 : Pill;
          const nodeColor = isLab
            ? 'bg-teal-600 text-white shadow-teal-500/30 ring-4 ring-teal-50'
            : 'bg-sky-600 text-white shadow-sky-500/30 ring-4 ring-sky-50';

          return (
            <div key={record.id} className="relative group">
              {/* Timeline Icon Node */}
              <div className={`absolute -left-[35px] sm:-left-[43px] top-1 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl ${nodeColor} flex items-center justify-center transition-transform group-hover:scale-110 shadow-md`}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Content Card */}
              <div className="glass-card p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-card transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
                      {record.type}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900">{record.documentName}</h4>
                  </div>
                  <div className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    <span>{record.date}</span>
                  </div>
                </div>

                {/* Key Findings Preview */}
                {record.labResults && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100">
                    {record.labResults.slice(0, 3).map((res, i) => (
                      <div key={i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-[11px] font-medium text-slate-500">{res.param}</div>
                        <div className="text-xs font-extrabold text-slate-800 mt-0.5">
                          {res.value} {res.unit}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {record.medications && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                    {record.medications.map((med, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <Pill className="w-3.5 h-3.5 text-sky-600" />
                        <span>{med.name} {med.dosage}</span>
                        <span className="text-slate-400 font-normal">({med.frequency})</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Card Footer */}
                <div className="mt-4 pt-3 flex items-center justify-between text-xs border-t border-slate-100/60">
                  <span className="text-slate-400 font-medium">Doc: {record.fileName}</span>
                  <button
                    onClick={() => setSelectedRecordId(record.id)}
                    className="flex items-center gap-1 font-bold text-teal-700 hover:text-teal-900 transition-colors"
                  >
                    <span>View Record Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
