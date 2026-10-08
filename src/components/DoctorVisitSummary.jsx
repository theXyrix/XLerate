import React, { useState } from 'react';
import { Stethoscope, Printer, Download, HelpCircle, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealthData } from '../context/HealthDataContext';

export const DoctorVisitSummary = () => {
  const { t } = useLanguage();
  const { data } = useHealthData();
  const [generated, setGenerated] = useState(true);

  const summary = data.doctorVisitSummary;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner CTA */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-teal-200 bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white shadow-card flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-600/30 text-teal-300 flex items-center justify-center border border-teal-500/30">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold">{t('doctorVisitTitle')}</h3>
            <p className="text-xs text-teal-200 mt-0.5">
              Structured summary, evidence, and key questions for your clinical consultation.
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:scale-105 active:scale-95 flex-shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>{t('downloadPrintSummary')}</span>
        </button>
      </div>

      {/* Printable Summary Sheet */}
      {generated && (
        <div className="printable-summary glass-card p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-card bg-white space-y-8">
          {/* Header info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 gap-2">
            <div>
              <div className="flex items-center gap-2 text-teal-800 font-extrabold text-lg">
                <Stethoscope className="w-5 h-5 text-teal-600" />
                <span>MedJourney AI — Doctor Consultation Prep</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Patient: <span className="font-bold text-slate-800">{summary.patientName}</span> • ABHA: 91-8273-4921-1029
              </p>
            </div>
            <div className="text-right text-xs text-slate-500">
              Date Generated: <span className="font-bold text-slate-800">{summary.dateGenerated}</span>
            </div>
          </div>

          {/* Section 1: Recent Changes */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              {t('recentChangesHeader')}
            </h4>
            <div className="space-y-2">
              {summary.recentChanges.map((change, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>{change}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Recommended Questions to Discuss */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-600"></span>
              {t('questionsToDiscussHeader')}
            </h4>
            <div className="space-y-2.5">
              {summary.discussionQuestions.map((q, i) => (
                <div key={i} className="p-4 bg-sky-50/70 border border-sky-200/80 rounded-2xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-sky-600 text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="text-xs font-bold text-sky-950 pt-0.5">
                    {q}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Relevant Supporting Records */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              {t('relevantRecordsHeader')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {summary.relevantRecords.map((rec, i) => (
                <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <FileText className="w-3.5 h-3.5 text-teal-600" />
                    <span>{rec.type}</span>
                  </div>
                  <div className="font-bold text-slate-800">{rec.name}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{rec.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Disclaimer */}
          <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-400 leading-relaxed font-medium">
            Note to Practitioner: This summary compiles observational data extracted from patient-uploaded records. MedJourney AI does not establish diagnostic causality, make clinical determinations, or modify treatment regimens.
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorVisitSummary;
