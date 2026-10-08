import React from 'react';
import { FileSearch } from 'lucide-react';

export const EmptyState = ({ title = 'No Records Found', subtitle = 'Try clearing your search filter or uploading a new medical report.' }) => {
  return (
    <div className="glass-card p-12 rounded-3xl border border-slate-200 text-center my-6">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
        <FileSearch className="w-8 h-8" />
      </div>
      <h4 className="text-base font-bold text-slate-800">{title}</h4>
      <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">{subtitle}</p>
    </div>
  );
};

export default EmptyState;
