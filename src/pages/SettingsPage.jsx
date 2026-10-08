import React from 'react';
import { 
  User, 
  ShieldCheck, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Globe, 
  Lock, 
  Sparkles 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealthData } from '../context/HealthDataContext';
import LanguageSelector from '../components/LanguageSelector';

export const SettingsPage = () => {
  const { t } = useLanguage();
  const { data } = useHealthData();
  const p = data.patientInfo;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t('settingsTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Manage user profile, language preferences, and interoperability readiness.
        </p>
      </div>

      {/* User Profile Overview */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card">
        <h3 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-teal-600" />
          <span>Patient Identity Profile</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
            <div className="text-slate-400 font-semibold mb-1">Full Name</div>
            <div className="text-sm font-bold text-slate-800">{p.name}</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
            <div className="text-slate-400 font-semibold mb-1">Age & Gender</div>
            <div className="text-sm font-bold text-slate-800">{p.age} Yrs • {p.gender}</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
            <div className="text-slate-400 font-semibold mb-1">Location</div>
            <div className="text-sm font-bold text-slate-800">{p.location}</div>
          </div>
        </div>
      </div>

      {/* Language Preferences */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-teal-600" />
              <span>Language & Interface</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Switch between English and Tamil translations.</p>
          </div>
          <LanguageSelector />
        </div>
      </div>

      {/* Mock ABDM & FHIR Readiness Section */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50/40 via-white to-sky-50/40 shadow-card space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">{t('healthDataStandards')}</h3>
            <p className="text-xs text-slate-500">Interoperability & National Digital Health Stack Compatibility</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-950">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t('fhirStatus')}</span>
            </div>
            <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-md font-bold text-[10px]">
              Ready
            </span>
          </div>

          <div className="p-4 bg-teal-50/80 border border-teal-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-teal-950">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>{t('abdmStatus')}</span>
            </div>
            <span className="px-2 py-0.5 bg-teal-200 text-teal-900 rounded-md font-bold text-[10px]">
              Demo-Ready
            </span>
          </div>
        </div>

        {/* Mock ABHA ID Box */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider mb-0.5">
              {t('mockAbhaId')}
            </div>
            <div className="text-sm font-mono font-black text-slate-800">
              {p.abhaId}
            </div>
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold text-[11px] rounded-lg border border-amber-300">
            ⚠️ {t('abdmNotice')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
