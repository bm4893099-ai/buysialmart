import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import InventoryPage from './pages/InventoryPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import PosPage from './pages/PosPage.jsx';
import SuperAdminPage from './pages/SuperAdminPage.jsx';

export default function App() {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage || 'en';
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [direction, language]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/pos" element={<PosPage />} />
        <Route path="/super-admin" element={<SuperAdminPage />} />
      </Routes>
    </div>
  );
}
