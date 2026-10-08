import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  User, 
  Sparkles, 
  Info, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useHealthData } from '../context/HealthDataContext';
import LabResultCard from '../components/LabResultCard';
import AIInsightCard from '../components/AIInsightCard';
import EvidencePanel from '../components/EvidencePanel';
import SafetyDisclaimer from '../components/SafetyDisclaimer';

export const AnalysisPage = () => {
  const { t } = useLanguage();
  const { selectedRecord, data } = useHealthData();
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [selectedEvidenceResult, setSelectedEvidenceResult] = useState(null);

  const record = selectedRecord || data.medicalRecords[0];

  const handleOpenEvidence = (resultItem) => {
    setSelectedEvidenceResult(resultItem || record.labResults?.[0]);
    setEvidenceModalOpen(true);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Navigation Back Link */}
      <div className="flex items-center justify-between">
        <Link
          to="/app/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Status: {record.status} • OCR 99.4% Accurate
        </span>
      </div>

      {/* Header Info Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {record.documentName}
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Uploaded document: <span className="font-bold text-slate-700">{record.fileName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Extracted Metadata Grid */}
        <div className="mt-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            {t('extractedInfo')}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-teal-600" />
                <span>{t('patientName')}</span>
              </div>
              <div className="text-sm font-extrabold text-slate-800 mt-1">Raj</div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-sky-600" />
                <span>{t('documentType')}</span>
              </div>
              <div className="text-sm font-extrabold text-slate-800 mt-1">{record.type}</div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>{t('reportDate')}</span>
              </div>
              <div className="text-sm font-extrabold text-slate-800 mt-1">{record.date}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lab Results Cards Grid */}
      {record.labResults && record.labResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900">{t('labResultsTitle')}</h3>
            <span className="text-xs text-slate-500 font-medium">
              Showing {record.labResults.length} extracted parameters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {record.labResults.map((result, idx) => (
              <LabResultCard
                key={idx}
                result={result}
                onViewEvidence={handleOpenEvidence}
              />
            ))}
          </div>
        </div>
      )}

      {/* Simple AI Explanation Card */}
      <AIInsightCard
        explanation={record.simpleExplanation}
        evidenceList={record.evidenceList}
        onOpenEvidence={() => handleOpenEvidence(record.labResults?.[0])}
      />

      {/* Safety Disclaimer */}
      <SafetyDisclaimer compact />

      {/* Expandable Evidence Drawer/Modal */}
      <EvidencePanel
        isOpen={evidenceModalOpen}
        onClose={() => setEvidenceModalOpen(false)}
        selectedResult={selectedEvidenceResult}
      />
    </div>
  );
};

export default AnalysisPage;
