import React from 'react';
import { Bot, User, FileText, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ChatMessage = ({ message }) => {
  const { t } = useLanguage();
  const isAi = message.sender === 'ai';

  return (
    <div className={`flex gap-3 my-3 ${isAi ? 'justify-start' : 'justify-end'}`}>
      {isAi && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-600 to-sky-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm text-xs leading-relaxed ${
          isAi
            ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
            : 'bg-teal-700 text-white rounded-tr-none font-medium'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>

        {/* Source References Pill */}
        {isAi && message.sources && message.sources.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
            <div className="text-[10px] font-bold text-teal-700 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{t('basedOnRecords')}:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {message.sources.map((src, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-semibold"
                >
                  <FileText className="w-3 h-3 text-teal-600" />
                  {src}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className={`text-[9px] mt-2 font-medium ${isAi ? 'text-slate-400' : 'text-teal-200'} text-right`}>
          {message.timestamp}
        </div>
      </div>

      {!isAi && (
        <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-1 font-bold text-xs">
          R
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
