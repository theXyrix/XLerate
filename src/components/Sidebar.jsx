import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  Pill, 
  TrendingUp, 
  Stethoscope, 
  MessageSquare, 
  Settings,
  GitCompare,
  Upload,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Sidebar = ({ mobileOpen, onCloseMobile }) => {
  const { t } = useLanguage();

  const navItems = [
    { path: '/app/dashboard', label: t('navDashboard'), icon: LayoutDashboard },
    { path: '/app/records', label: t('navRecords'), icon: FileText },
    { path: '/app/timeline', label: t('navTimeline'), icon: Clock },
    { path: '/app/medications', label: t('navMedications'), icon: Pill },
    { path: '/app/trends', label: t('navTrends'), icon: TrendingUp },
    { path: '/app/compare', label: t('compareRecords'), icon: GitCompare },
    { path: '/app/doctor-visit', label: t('navDoctorVisit'), icon: Stethoscope },
    { path: '/app/copilot', label: t('navCopilot'), icon: MessageSquare },
    { path: '/app/settings', label: t('navSettings'), icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full py-6 px-4">
      {/* Upload button CTA in sidebar */}
      <div className="mb-6 px-2">
        <NavLink
          to="/app/upload"
          onClick={onCloseMobile}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white text-xs font-bold rounded-xl shadow-md shadow-teal-700/20 hover:shadow-lg hover:shadow-teal-700/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Upload className="w-4 h-4" />
          <span>{t('uploadReport')}</span>
        </NavLink>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 border-l-4 border-teal-600 shadow-sm font-bold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* ABDM readiness badge footer */}
      <div className="mt-auto pt-4 px-2">
        <div className="p-3 bg-slate-100/90 rounded-xl border border-slate-200/80 text-[11px] text-slate-500">
          <div className="font-bold text-slate-700 mb-0.5">ABDM / FHIR Ready</div>
          <div className="flex items-center gap-1 text-[10px] text-teal-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Active Standard v2.1</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r border-slate-200/80 bg-white min-h-[calc(100vh-65px)] sticky top-[65px]">
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-50 flex flex-col transform transition-transform">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <span className="font-bold text-slate-800 text-sm">Navigation</span>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
