import { useState } from 'react';
import { BUSINESS_TYPES } from '@vitalblaze/shared';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard.jsx';
import MarketingContentEditor from '../components/admin/MarketingContentEditor.jsx';
import SiteHeader from '../components/layout/SiteHeader.jsx';
import MarketingFooter from '../components/marketing/MarketingFooter.jsx';
import BusinessTypeSelector from '../components/ui/BusinessTypeSelector.jsx';
import Button from '../components/ui/Button.jsx';
import GlassPanel from '../components/ui/GlassPanel.jsx';
import WorkspaceHero from '../components/ui/WorkspaceHero.jsx';
import { useAdminSession } from '../utils/adminSession.js';

export default function AdminPanelPage() {
  const { t } = useTranslation();
  const { session } = useAdminSession();
  const [businessType, setBusinessType] = useState(session?.user?.businessType || BUSINESS_TYPES.BAKALA);

  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-7xl space-y-8 px-6 py-16 lg:px-8 lg:py-20">
        <WorkspaceHero eyebrow={t('adminPanel.eyebrow')} subtitle={t('adminPanel.subtitle')} title={t('adminPanel.title')} />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <GlassPanel className="p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-indigo-200">{t('adminPanel.quickAccess')}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{session?.user?.name || session?.user?.email}</h2>
            <p className="mt-3 text-sm text-slate-300">{t('adminPanel.quickAccessHint')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/inventory" variant="secondary">{t('workspaceNav.inventory')}</Button>
              <Button to="/pos" variant="secondary">{t('workspaceNav.pos')}</Button>
              <Button to="/analytics" variant="secondary">{t('workspaceNav.analytics')}</Button>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-indigo-200">{t('adminPanel.preview')}</p>
            <p className="mt-3 text-sm text-slate-300">{t('adminPanel.previewHint')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-indigo-400/40 bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-indigo-400" to="/">
                {t('adminPanel.openLanding')}
              </Link>
            </div>
          </GlassPanel>
        </div>

        <BusinessTypeSelector businessType={businessType} onChange={setBusinessType} />
        <AnalyticsDashboard businessType={businessType} />
        <MarketingContentEditor panelLabel={t('adminPanel.contentManager')} />
      </main>
      <MarketingFooter />
    </div>
  );
}
