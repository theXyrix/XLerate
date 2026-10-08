import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Eye, Calendar, HardDrive, TestTube2, Pill, Upload } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealthData } from '../context/HealthDataContext';

export const RecordsPage = () => {
  const { t } = useLanguage();
  const { data, setSelectedRecordId } = useHealthData();
  const navigate = useNavigate();

  const handleView = (id) => {
    setSelectedRecordId(id);
    navigate('/app/analysis');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('navRecords')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            All stored diagnostic reports, laboratory test panels, and doctor prescriptions.
          </p>
        </div>

        <button
          onClick={() => navigate('/app/upload')}
          className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
        >
          <Upload className="w-4 h-4" />
          <span>{t('uploadReport')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.medicalRecords.map((rec) => {
          const isLab = rec.type === 'Lab Report';
          const Icon = isLab ? TestTube2 : Pill;

          return (
            <div
              key={rec.id}
              className="glass-card p-6 rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-card transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold ${isLab ? 'bg-teal-100 text-teal-700' : 'bg-sky-100 text-sky-700'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">{rec.documentName}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <span>{rec.date}</span>
                      <span>•</span>
                      <span>{rec.type}</span>
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {rec.status}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                  <span>{rec.fileName} ({rec.fileSize || '1.8 MB'})</span>
                </div>

                <button
                  onClick={() => handleView(rec.id)}
                  className="flex items-center gap-1 font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-xl border border-teal-200 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t('viewButton')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecordsPage;
