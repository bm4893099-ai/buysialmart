import { BUSINESS_TYPES } from '@vitalblaze/shared';
import { useTranslation } from 'react-i18next';
import Field from './Field.jsx';
import GlassPanel from './GlassPanel.jsx';

export default function BusinessTypeSelector({ businessType, onChange }) {
  const { t } = useTranslation();

  return (
    <GlassPanel className="p-5">
      <div className="grid gap-4 lg:grid-cols-[0.45fr_0.55fr] lg:items-center">
        <div>
          <h3 className="text-lg font-semibold text-white">{t('workspace.businessTypeLabel')}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-300">{t('workspace.businessTypeHint')}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-[0.58fr_0.42fr] sm:items-center">
          <Field as="select" label={t('workspace.businessTypeLabel')} name="businessType" onChange={(event) => onChange(event.target.value)} value={businessType}>
            {Object.values(BUSINESS_TYPES).map((type) => (
              <option key={type} value={type}>
                {t(`businessTypes.${type}`)}
              </option>
            ))}
          </Field>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            {businessType === BUSINESS_TYPES.BAKALA ? t('workspace.bakalaMode') : t('workspace.groceryMode')}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
