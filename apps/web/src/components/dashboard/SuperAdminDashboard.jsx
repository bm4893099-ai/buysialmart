import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BUSINESS_TYPES } from '@vitalblaze/shared';
import CapabilityMatrix from './CapabilityMatrix.jsx';
import CreateTenantForm from './CreateTenantForm.jsx';
import ZatcaQrPreview from './ZatcaQrPreview.jsx';
import GlassPanel from '../ui/GlassPanel.jsx';

const initialBlueprint = {
  storeName: 'Buysial ERP Express',
  vatNumber: '300123456700003',
  businessType: BUSINESS_TYPES.BAKALA,
  generatedAt: '',
};

export default function SuperAdminDashboard() {
  const { t } = useTranslation();
  const [blueprint, setBlueprint] = useState(initialBlueprint);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-100">
              {t('superAdmin.eyebrow')}
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">{t('superAdmin.title')}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">{t('superAdmin.subtitle')}</p>
          </div>

          <div className="mt-8">
            <CreateTenantForm onBlueprintGenerated={setBlueprint} />
          </div>
        </div>

        <div className="space-y-6">
          <GlassPanel className="p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-indigo-200">{t('superAdmin.generated')}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{blueprint.storeName}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-4">
                <span className="text-sm text-slate-400">{t('form.businessType')}</span>
                <span className="mt-2 block text-sm font-semibold text-white">{t(`businessTypes.${blueprint.businessType}`)}</span>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <span className="text-sm text-slate-400">{t('form.vatNumber')}</span>
                <span className="mt-2 block text-sm font-semibold text-white">{blueprint.vatNumber}</span>
              </div>
            </div>
          </GlassPanel>

          <CapabilityMatrix businessType={blueprint.businessType} />
          <ZatcaQrPreview sellerName={blueprint.storeName} vatNumber={blueprint.vatNumber} />
        </div>
      </div>
    </section>
  );
}
