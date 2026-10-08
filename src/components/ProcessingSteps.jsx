import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Brain, BarChart3, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealthData } from '../context/HealthDataContext';

export const ProcessingSteps = () => {
  const { t } = useLanguage();
  const { setProcessingState } = useHealthData();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, label: t('step1'), icon: FileText, desc: 'Verifying image clarity & formatting' },
    { id: 2, label: t('step2'), icon: Search, desc: 'Extracting printed & handwritten text' },
    { id: 3, label: t('step3'), icon: Brain, desc: 'Recognizing biomarkers, dosages, and reference values' },
    { id: 4, label: t('step4'), icon: BarChart3, desc: 'Normalizing lab units & comparing previous history' },
    { id: 5, label: t('step5'), icon: Sparkles, desc: 'Synthesizing evidence-based plain-language explanation' },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(2), 1200);
    const timer2 = setTimeout(() => setCurrentStep(3), 2400);
    const timer3 = setTimeout(() => setCurrentStep(4), 3600);
    const timer4 = setTimeout(() => setCurrentStep(5), 4800);
    const timer5 = setTimeout(() => {
      setProcessingState({ isProcessing: false, step: 5, completed: true });
      navigate('/app/analysis');
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [navigate, setProcessingState]);

  return (
    <div className="w-full max-w-xl mx-auto glass-card p-8 rounded-3xl border border-slate-200 shadow-card">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 mb-4 animate-bounce">
          <Brain className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-800">Processing Medical Document</h3>
        <p className="text-xs text-slate-500 mt-1">Our AI engine is extracting and structuring your health data.</p>
      </div>

      <div className="space-y-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const isDone = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isPending = currentStep < step.id;

          return (
            <div
              key={step.id}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border ${
                isDone
                  ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-900'
                  : isCurrent
                  ? 'bg-teal-50/90 border-teal-300 shadow-sm text-teal-900 scale-[1.02]'
                  : 'bg-slate-50/50 border-slate-200/50 text-slate-400 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold">{step.label}</h4>
                  <p className="text-[11px] opacity-80 mt-0.5">{step.desc}</p>
                </div>
              </div>

              <div>
                {isDone && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Done
                  </span>
                )}
                {isCurrent && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-100 px-2 py-0.5 rounded-md animate-pulse">
                    Running
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Line */}
      <div className="mt-8 pt-4 border-t border-slate-100">
        <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
          <span>Overall Progress</span>
          <span>{currentStep * 20}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${currentStep * 20}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessingSteps;
