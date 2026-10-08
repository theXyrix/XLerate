import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HeartPulse, 
  Upload, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Share2, 
  FileCheck, 
  ShieldAlert,
  Layers,
  Brain,
  Clock,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealthData } from '../context/HealthDataContext';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import LanguageSelector from '../components/LanguageSelector';

export const LandingPage = () => {
  const { t } = useLanguage();
  const { loadDemoData } = useHealthData();
  const navigate = useNavigate();

  const handleTryDemo = () => {
    loadDemoData();
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Landing Navbar */}
      <header className="glass-nav sticky top-0 z-40 px-6 py-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <HeartPulse className="w-6 h-6 animate-pulse-subtle" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-teal-800 bg-clip-text text-transparent">
              MedJourney <span className="text-teal-600 font-extrabold">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSelector />
            <button
              onClick={handleTryDemo}
              className="px-4 py-2 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-all shadow-sm"
            >
              {t('tryDemo')}
            </button>
            <Link
              to="/app/dashboard"
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-600/20 transition-all hover:scale-105"
            >
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        {/* Soft background glow accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-teal-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-900 text-xs font-extrabold shadow-sm">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>AI-Powered Personal Health Copilot</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            {t('heroTitle')}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            {t('heroSubtitle')}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/app/upload"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-teal-700/25 hover:shadow-teal-700/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              <span>{t('uploadReport')}</span>
            </Link>

            <Link
              to="/app/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm rounded-2xl border border-slate-300 shadow-soft transition-all flex items-center justify-center gap-2"
            >
              <span>{t('exploreDashboard')}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <button
              onClick={handleTryDemo}
              className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{t('tryDemo')}</span>
            </button>
          </div>

          {/* Hero Visual Transformation Flow */}
          <div className="pt-12">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-6">
              Document Transformation Pipeline
            </div>

            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card bg-white/90 grid grid-cols-1 md:grid-cols-4 gap-4 text-left relative overflow-hidden">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs mb-2">
                  1
                </div>
                <div className="font-bold text-slate-800 text-xs">Medical Doc (PDF/JPG)</div>
                <div className="text-[11px] text-slate-500 mt-1">Raw lab tests, prescriptions, discharge summary</div>
              </div>

              <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xs mb-2">
                  2
                </div>
                <div className="font-bold text-teal-900 text-xs">OCR & AI Extraction</div>
                <div className="text-[11px] text-teal-700 mt-1">Biomarkers, units, dates, and dosages identified</div>
              </div>

              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200">
                <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-xs mb-2">
                  3
                </div>
                <div className="font-bold text-sky-900 text-xs">Health Timeline</div>
                <div className="text-[11px] text-sky-700 mt-1">Connected record history over time</div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-2">
                  4
                </div>
                <div className="font-bold text-emerald-900 text-xs">Evidence Insights</div>
                <div className="text-[11px] text-emerald-700 mt-1">Plain language summary & doctor prep questions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Main Feature Cards */}
      <section className="py-16 px-6 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Designed for Clear, Actionable Healthcare Support
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
              Transforming complex clinical terminology into accessible understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-8 rounded-3xl border border-slate-200 shadow-soft hover:shadow-card transition-all">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 shadow-sm">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">{t('featUnderstandTitle')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t('featUnderstandDesc')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-8 rounded-3xl border border-slate-200 shadow-soft hover:shadow-card transition-all">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6 shadow-sm">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">{t('featConnectTitle')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t('featConnectDesc')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8 rounded-3xl border border-slate-200 shadow-soft hover:shadow-card transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
                <FileCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">{t('featPrepareTitle')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t('featPrepareDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Compliance notice */}
      <div className="mt-auto">
        <SafetyDisclaimer />
      </div>
    </div>
  );
};

export default LandingPage;
