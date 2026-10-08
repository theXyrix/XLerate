import React, { useState } from 'react';
import { Pill, Filter, Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealthData } from '../context/HealthDataContext';
import MedicationCard from '../components/MedicationCard';

export const MedicationsPage = () => {
  const { t } = useLanguage();
  const { data } = useHealthData();
  const [filter, setFilter] = useState('All');

  const filteredMeds = data.medications.filter(m => {
    if (filter === 'Active') return m.status === 'Active';
    if (filter === 'Previous') return m.status === 'Previous';
    return true;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t('medicationsTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Active and historical prescription medications extracted from your doctor notes.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit border border-slate-200">
        <div className="px-3 text-xs font-bold text-slate-500 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5" />
          <span>Status:</span>
        </div>
        {['All', 'Active', 'Previous'].map((statusKey) => (
          <button
            key={statusKey}
            onClick={() => setFilter(statusKey)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === statusKey
                ? 'bg-white text-teal-800 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {statusKey === 'Active' ? t('medStatusActive') : statusKey === 'Previous' ? t('medStatusPrevious') : 'All'}
          </button>
        ))}
      </div>

      {/* Medication Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMeds.map((med) => (
          <MedicationCard key={med.id} medication={med} />
        ))}
      </div>
    </div>
  );
};

export default MedicationsPage;
