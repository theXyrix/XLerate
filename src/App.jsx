import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { HealthDataProvider } from './context/HealthDataContext';

import TopNavbar from './components/TopNavbar';
import Sidebar from './components/Sidebar';
import SafetyDisclaimer from './components/SafetyDisclaimer';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import ProcessingPage from './pages/ProcessingPage';
import AnalysisPage from './pages/AnalysisPage';
import RecordsPage from './pages/RecordsPage';
import TimelinePage from './pages/TimelinePage';
import ComparisonPage from './pages/ComparisonPage';
import DoctorVisitPage from './pages/DoctorVisitPage';
import MedicationsPage from './pages/MedicationsPage';
import TrendsPage from './pages/TrendsPage';
import CopilotPage from './pages/CopilotPage';
import SettingsPage from './pages/SettingsPage';

// Main App Layout Wrapper for /app/* routes
const AppLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <TopNavbar onToggleMobileMenu={() => setMobileSidebarOpen(prev => !prev)} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-8 overflow-x-hidden min-h-[calc(100vh-65px)]">
          <Outlet />
        </main>
      </div>

      <SafetyDisclaimer />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <HealthDataProvider>
        <Router>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Application Inner Routes */}
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="upload" element={<UploadPage />} />
              <Route path="processing" element={<ProcessingPage />} />
              <Route path="analysis" element={<AnalysisPage />} />
              <Route path="records" element={<RecordsPage />} />
              <Route path="timeline" element={<TimelinePage />} />
              <Route path="compare" element={<ComparisonPage />} />
              <Route path="doctor-visit" element={<DoctorVisitPage />} />
              <Route path="medications" element={<MedicationsPage />} />
              <Route path="trends" element={<TrendsPage />} />
              <Route path="copilot" element={<CopilotPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </HealthDataProvider>
    </LanguageProvider>
  );
}

export default App;
