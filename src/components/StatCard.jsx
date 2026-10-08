import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = 'teal', subtitle, onClick }) => {
  const colorMap = {
    teal: 'bg-teal-50 text-teal-700 border-teal-200/60 shadow-teal-500/5',
    blue: 'bg-sky-50 text-sky-700 border-sky-200/60 shadow-sky-500/5',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/60 shadow-amber-500/5',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/60 shadow-rose-500/5',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/60 shadow-emerald-500/5',
  };

  const iconBgMap = {
    teal: 'bg-teal-600 text-white',
    blue: 'bg-sky-600 text-white',
    amber: 'bg-amber-600 text-white',
    rose: 'bg-rose-600 text-white',
    emerald: 'bg-emerald-600 text-white',
  };

  return (
    <div
      onClick={onClick}
      className={`glass-card p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-card cursor-pointer ${colorMap[color] || colorMap.teal}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-500 tracking-wide">{title}</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{value}</h3>
          {subtitle && (
            <p className="text-[11px] font-medium text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl shadow-sm ${iconBgMap[color] || iconBgMap.teal}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
