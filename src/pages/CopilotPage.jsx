import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare, ShieldCheck, FileText, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealthData } from '../context/HealthDataContext';
import ChatMessage from '../components/ChatMessage';
import SafetyDisclaimer from '../components/SafetyDisclaimer';

export const CopilotPage = () => {
  const { t } = useLanguage();
  const { data, sendMessageToCopilot } = useHealthData();
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  const suggestedPrompts = [
    "What changed in my latest report?",
    "Explain my latest blood test.",
    "What medications are in my records?",
    "What should I discuss with my doctor?",
    "Show my hemoglobin trend."
  ];

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendMessageToCopilot(inputText);
    setInputText('');
  };

  const handlePromptClick = (promptText) => {
    sendMessageToCopilot(promptText);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data.copilotChatHistory]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto flex flex-col min-h-[calc(100vh-140px)]">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              {t('chatTitle')}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {t('chatSubtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Suggested Questions (Click to Ask):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handlePromptClick(prompt)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-900 border border-slate-200 hover:border-teal-300 rounded-xl text-xs font-semibold text-slate-700 transition-all text-left shadow-sm active:scale-95"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 glass-card p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-card flex flex-col justify-between overflow-hidden">
        <div className="overflow-y-auto max-h-[50vh] pr-2 space-y-2">
          {data.copilotChatHistory.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 bg-slate-100/90 p-2 rounded-2xl border border-slate-200 focus-within:border-teal-500 focus-within:bg-white transition-all shadow-inner">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('inputPlaceholder')}
              className="flex-1 bg-transparent px-3 py-2 text-xs font-medium text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white rounded-xl shadow-md transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 font-medium flex items-center justify-between px-2">
            <span>Locked to patient Raj's uploaded documents only.</span>
            <span>No external medical advice generated.</span>
          </div>
        </form>
      </div>

      <SafetyDisclaimer compact />
    </div>
  );
};

export default CopilotPage;
