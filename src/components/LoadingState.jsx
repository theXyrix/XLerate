import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message = 'Loading health insights...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-slate-400">
      <Loader2 className="w-8 h-8 text-teal-600 animate-spin mb-3" />
      <span className="text-xs font-semibold text-slate-600">{message}</span>
    </div>
  );
};

export default LoadingState;
