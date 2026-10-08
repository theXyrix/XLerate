import React from 'react';
import { X, FileText, ArrowDown, ShieldCheck, CheckCircle, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const EvidencePanel = ({ isOpen, onClose, selectedResult }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-teal-900 to-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-800/80 text-teal-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">{t('whyAmISeeingThis')}</h3>
              <p className="text-[11px] text-teal-200 font-medium">Evidence-Linked AI Traceability</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Evidence Lineage Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Step 1: AI Insight */}
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 mb-1">
              1. AI Derived Insight
            </div>
            <div className="text-sm font-bold text-teal-950">
              {selectedResult?.status
                ? `${selectedResult.param}: ${selectedResult.status}`
                : "Downward trend detected in Hemoglobin levels across consecutive records."}
            </div>
          </div>

          <div className="flex justify-center text-teal-600">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Step 2: Supporting Extracted Value */}
          <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 mb-1">
              2. Supporting Extracted Values
            </div>
            <div className="space-y-2 text-xs font-semibold text-slate-800">
              <div className="flex justify-between items-center py-1 border-b border-sky-100">
                <span>Oct 08, 2026 Test Value:</span>
                <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                  {selectedResult?.value || '10.2'} {selectedResult?.unit || 'g/dL'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-sky-100">
                <span>June 14, 2026 Test Value:</span>
                <span className="font-bold text-slate-700">11.4 g/dL</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Reference Range on Report:</span>
                <span className="font-bold text-slate-600">{selectedResult?.referenceRange || '12.0 – 16.0 g/dL'}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-sky-600">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Step 3: Source Document & Page Number */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
              3. Verifiable Source Document
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <span className="font-bold text-slate-800">{selectedResult?.sourceDoc || 'Blood_Report_Oct_2026.pdf'}</span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-bold text-[11px]">
                Page {selectedResult?.page || 1}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 font-medium">
            AI Confidence Score: <span className="font-bold text-teal-700">{selectedResult?.confidence || 97}%</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
          >
            Close Evidence
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvidencePanel;
