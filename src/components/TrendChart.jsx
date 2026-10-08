import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';
import { TrendingDown, TrendingUp, Info, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealthData } from '../context/HealthDataContext';

export const TrendChart = () => {
  const { t } = useLanguage();
  const { data } = useHealthData();
  const [selectedMetric, setSelectedMetric] = useState('Hemoglobin');

  const chartData = data.trendSeries[selectedMetric] || [];

  const trendNoticeMap = {
    Hemoglobin: {
      text: t('trendHemoglobinNotice'),
      direction: 'down',
      unit: 'g/dL',
      range: '12.0 – 16.0 g/dL'
    },
    Glucose: {
      text: "Upward trend detected across recent fasting test dates.",
      direction: 'up',
      unit: 'mg/dL',
      range: '70.0 – 99.0 mg/dL'
    },
    'Vitamin D': {
      text: "Downward trend detected across available records below normal reference threshold.",
      direction: 'down',
      unit: 'ng/mL',
      range: '30.0 – 100.0 ng/mL'
    }
  };

  const currentNotice = trendNoticeMap[selectedMetric];

  // Custom tooltip styling
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
          <div className="font-bold text-teal-300">{point.date}</div>
          <div className="text-sm font-extrabold">
            {point.value} {point.unit}
          </div>
          <div className="text-[10px] text-slate-400">Ref range: {currentNotice.range}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card">
      {/* Header & Metric Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">{t('healthTrendsTitle')}</h3>
          <p className="text-xs text-slate-500 mt-0.5">Visualizing test results over time</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600">{t('selectBiomarker')}:</label>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3.5 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl outline-none transition-colors cursor-pointer"
          >
            <option value="Hemoglobin">Hemoglobin (g/dL)</option>
            <option value="Glucose">Fasting Glucose (mg/dL)</option>
            <option value="Vitamin D">Vitamin D (ng/mL)</option>
          </select>
        </div>
      </div>

      {/* Trend Notification Pill */}
      <div className="mb-6 p-3.5 bg-amber-50/90 border border-amber-200/80 rounded-2xl flex items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2 font-bold">
          {currentNotice.direction === 'down' ? (
            <TrendingDown className="w-4 h-4 text-rose-600" />
          ) : (
            <TrendingUp className="w-4 h-4 text-amber-600" />
          )}
          <span>{currentNotice.text}</span>
        </div>
        <span className="text-[11px] font-semibold bg-amber-100 px-2 py-0.5 rounded-md text-amber-800">
          Ref: {currentNotice.range}
        </span>
      </div>

      {/* Recharts Responsive Container */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={chartData[0]?.referenceMin} label={{ value: 'Min Ref', fill: '#0d9488', fontSize: 10 }} stroke="#14b8a6" strokeDasharray="4 4" />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0d9488"
              strokeWidth={3}
              dot={{ r: 6, fill: '#0d9488', strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 8, fill: '#0f766e', stroke: '#ffffff', strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Safe Wording Disclaimer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
        <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        <span>{t('trendNoticeDisclaimer')}</span>
      </div>
    </div>
  );
};

export default TrendChart;
