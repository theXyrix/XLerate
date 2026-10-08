import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  TestTube2, 
  Pill, 
  AlertTriangle, 
  Upload, 
  Sparkles, 
  ChevronRight, 
  TrendingUp, 
  CheckCircle2,
  Calendar,
  Eye
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealthData } from '../context/HealthDataContext';
import StatCard from '../components/StatCard';
import TrendChart from '../components/TrendChart';

export const DashboardPage = () => {
  const { t } = useLanguage();
  const { data, setSelectedRecordId } = useHealthData();
  const navigate = useNavigate();

  const handleViewRecord = (id) => {
    setSelectedRecordId(id);
    navigate('/app/analysis');
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('greeting')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            {t('dashboardSubtitle')}
          </p>
        </div>

        {/* Large Primary Action Button */}
        <Link
          to="/app/upload"
          className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg shadow-teal-700/25 hover:shadow-teal-700/40 transition-all transform hover:-translate-y-0.5"
        >
          <Upload className="w-5 h-5" />
          <span>+ {t('uploadReport')}</span>
        </Link>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title={t('statMedicalRecords')}
          value={data.stats.medicalRecordsCount}
          icon={FileText}
          color="teal"
          subtitle="Updated Oct 2026"
          onClick={() => navigate('/app/records')}
        />
        <StatCard
          title={t('statLabReports')}
          value={data.stats.labReportsCount}
          icon={TestTube2}
          color="blue"
          subtitle="5 Analyzed reports"
          onClick={() => navigate('/app/records')}
        />
        <StatCard
          title={t('statMedications')}
          value={data.stats.medicationsCount}
          icon={Pill}
          color="emerald"
          subtitle="2 Active prescriptions"
          onClick={() => navigate('/app/medications')}
        />
        <StatCard
          title={t('statAttentionAreas')}
          value={data.stats.attentionAreasCount}
          icon={AlertTriangle}
          color="amber"
          subtitle="Hemoglobin & Vitamin D"
          onClick={() => navigate('/app/analysis')}
        />
      </div>

      {/* AI Health Overview Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50/60 via-white to-sky-50/40 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">{t('aiHealthOverviewTitle')}</h3>
              <p className="text-xs text-slate-500 font-medium">Latest automated evidence synthesis</p>
            </div>
          </div>

          <Link
            to="/app/analysis"
            className="flex items-center gap-1.5 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-700/20 transition-all hover:scale-105 self-start md:self-auto"
          >
            <span>{t('viewFullAnalysis')}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed font-medium bg-white/90 p-4 rounded-2xl border border-slate-200/80 mb-6">
          "{data.aiOverview.summary}"
        </p>

        {/* 3 Status Pill Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
          <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-2xl">
            <span className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0"></span>
            <span>🟡 {t('areasToReview')}</span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-900 border border-emerald-200/80 rounded-2xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>🟢 {t('valuesWithinRange')}</span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-sky-50 text-sky-900 border border-sky-200/80 rounded-2xl">
            <TrendingUp className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <span>📈 {t('trendsDetected')}</span>
          </div>
        </div>
      </div>

      {/* Health Trends Quick Chart View */}
      <TrendChart />

      {/* Recent Medical Records Table */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">{t('recentRecordsTitle')}</h3>
            <p className="text-xs text-slate-500 font-medium">Uploaded health records & clinical reports</p>
          </div>
          <Link
            to="/app/records"
            className="text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors flex items-center gap-1"
          >
            <span>View All Records ({data.medicalRecords.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3 pl-2">Date</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Document</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.medicalRecords.slice(0, 4).map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 pl-2 font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{rec.date}</span>
                    </div>
                  </td>
                  <td className="py-4 font-semibold text-slate-800">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                      {rec.type}
                    </span>
                  </td>
                  <td className="py-4 font-bold text-slate-900">{rec.documentName}</td>
                  <td className="py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-4 pr-2 text-right">
                    <button
                      onClick={() => handleViewRecord(rec.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs rounded-xl border border-teal-200 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t('viewButton')}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
