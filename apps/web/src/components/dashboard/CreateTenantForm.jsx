import { useMemo, useState } from 'react';
import { BUSINESS_TYPE_CAPABILITIES, BUSINESS_TYPES } from '@vitalblaze/shared';
import { useTranslation } from 'react-i18next';
import { useAdminTheme } from '../../utils/adminTheme.js';
import Button from '../ui/Button.jsx';
import Field from '../ui/Field.jsx';
import GlassPanel from '../ui/GlassPanel.jsx';

const steps = ['profile', 'compliance', 'admin', 'review'];

const initialState = {
  storeName: '',
  logoUrl: '',
  crNumber: '',
  vatNumber: '',
  businessType: BUSINESS_TYPES.BAKALA,
  nationalAddress: {
    buildingNumber: '',
    street: '',
    district: '',
    city: 'Dammam',
    postalCode: '',
    additionalNumber: '',
  },
  adminEmail: '',
  adminPassword: '',
};

function StepBadge({ active, completed, children }) {
  const { isDark } = useAdminTheme();

  return (
    <div
      className={`flex min-h-10 min-w-10 items-center justify-center rounded-2xl border text-sm font-semibold transition ${
        completed
          ? isDark
            ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
            : 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : active
            ? isDark
              ? 'border-indigo-400/30 bg-indigo-500/15 text-indigo-100'
              : 'border-indigo-200 bg-indigo-50 text-indigo-700'
            : isDark
              ? 'border-white/10 bg-white/5 text-slate-400'
              : 'border-slate-200 bg-slate-50 text-slate-500'
      }`.trim()}
    >
      {children}
    </div>
  );
}

export default function CreateTenantForm({ onBlueprintGenerated }) {
  const { t } = useTranslation();
  const { isDark } = useAdminTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [formState, setFormState] = useState(initialState);

  const capabilityProfile = useMemo(() => BUSINESS_TYPE_CAPABILITIES[formState.businessType], [formState.businessType]);

  function updateField(name, value) {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function updateAddressField(name, value) {
    setFormState((prevState) => ({
      ...prevState,
      nationalAddress: {
        ...prevState.nationalAddress,
        [name]: value,
      },
    }));
  }

  function goToNextStep() {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  }

  function goToPreviousStep() {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onBlueprintGenerated({
      ...formState,
      capabilityProfile,
      hiddenModules: capabilityProfile.limited,
      enabledModules: capabilityProfile.enabled,
      generatedAt: new Date().toISOString(),
    });
  }

  return (
    <GlassPanel className="p-6 lg:p-8">
      <div className="flex flex-wrap gap-3">
        {steps.map((step, index) => (
          <div className="flex items-center gap-3" key={step}>
            <StepBadge active={index === currentStep} completed={index < currentStep}>
              {index + 1}
            </StepBadge>
            <div className="text-start">
              <p className={isDark ? 'text-xs uppercase tracking-[0.2em] text-slate-400' : 'text-xs uppercase tracking-[0.2em] text-slate-500'}>{t('form.step')} {index + 1}</p>
              <p className={isDark ? 'text-sm font-medium text-slate-100' : 'text-sm font-medium text-slate-800'}>{t(`form.${step}`)}</p>
            </div>
          </div>
        ))}
      </div>

      <form className="mt-8" onSubmit={handleSubmit}>
        {currentStep === 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={t('form.storeName')} name="storeName" onChange={(event) => updateField('storeName', event.target.value)} placeholder="Buysial ERP Downtown" value={formState.storeName} />
            <Field label={t('form.logoUrl')} name="logoUrl" onChange={(event) => updateField('logoUrl', event.target.value)} placeholder="https://..." value={formState.logoUrl} />
            <Field label={t('form.crNumber')} name="crNumber" onChange={(event) => updateField('crNumber', event.target.value)} placeholder="2051XXXXXX" value={formState.crNumber} />
            <Field as="select" label={t('form.businessType')} name="businessType" onChange={(event) => updateField('businessType', event.target.value)} value={formState.businessType}>
              {Object.values(BUSINESS_TYPES).map((type) => (
                <option key={type} value={type}>
                  {t(`businessTypes.${type}`)}
                </option>
              ))}
            </Field>
          </div>
        ) : null}

        {currentStep === 1 ? (
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={t('form.vatNumber')} name="vatNumber" onChange={(event) => updateField('vatNumber', event.target.value)} placeholder="3XXXXXXXXXXXXXX" value={formState.vatNumber} />
            <Field label={t('form.buildingNumber')} name="buildingNumber" onChange={(event) => updateAddressField('buildingNumber', event.target.value)} value={formState.nationalAddress.buildingNumber} />
            <Field label={t('form.street')} name="street" onChange={(event) => updateAddressField('street', event.target.value)} value={formState.nationalAddress.street} />
            <Field label={t('form.district')} name="district" onChange={(event) => updateAddressField('district', event.target.value)} value={formState.nationalAddress.district} />
            <Field label={t('form.city')} name="city" onChange={(event) => updateAddressField('city', event.target.value)} value={formState.nationalAddress.city} />
            <Field label={t('form.postalCode')} name="postalCode" onChange={(event) => updateAddressField('postalCode', event.target.value)} value={formState.nationalAddress.postalCode} />
            <Field label={t('form.additionalNumber')} name="additionalNumber" onChange={(event) => updateAddressField('additionalNumber', event.target.value)} value={formState.nationalAddress.additionalNumber} />
          </div>
        ) : null}

        {currentStep === 2 ? (
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={t('form.adminEmail')} name="adminEmail" onChange={(event) => updateField('adminEmail', event.target.value)} type="email" value={formState.adminEmail} />
            <Field label={t('form.adminPassword')} name="adminPassword" onChange={(event) => updateField('adminPassword', event.target.value)} type="password" value={formState.adminPassword} />
          </div>
        ) : null}

        {currentStep === 3 ? (
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className={isDark ? 'space-y-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5' : 'space-y-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5'}>
              <div>
                <p className={isDark ? 'text-xs uppercase tracking-[0.24em] text-indigo-200' : 'text-xs uppercase tracking-[0.24em] text-indigo-600'}>{t('form.review')}</p>
                <h3 className={isDark ? 'mt-2 text-xl font-semibold text-white' : 'mt-2 text-xl font-semibold text-slate-900'}>{formState.storeName || t('form.tenantBlueprint')}</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className={isDark ? 'rounded-2xl bg-slate-950/60 p-4 text-sm text-slate-300' : 'rounded-2xl bg-white p-4 text-sm text-slate-600'}>
                  <span className={isDark ? 'block text-slate-400' : 'block text-slate-500'}>{t('form.businessType')}</span>
                  <span className={isDark ? 'mt-2 block font-medium text-white' : 'mt-2 block font-medium text-slate-900'}>{t(`businessTypes.${formState.businessType}`)}</span>
                </div>
                <div className={isDark ? 'rounded-2xl bg-slate-950/60 p-4 text-sm text-slate-300' : 'rounded-2xl bg-white p-4 text-sm text-slate-600'}>
                  <span className={isDark ? 'block text-slate-400' : 'block text-slate-500'}>{t('form.vatNumber')}</span>
                  <span className={isDark ? 'mt-2 block font-medium text-white' : 'mt-2 block font-medium text-slate-900'}>{formState.vatNumber || '—'}</span>
                </div>
                <div className={isDark ? 'rounded-2xl bg-slate-950/60 p-4 text-sm text-slate-300 sm:col-span-2' : 'rounded-2xl bg-white p-4 text-sm text-slate-600 sm:col-span-2'}>
                  <span className={isDark ? 'block text-slate-400' : 'block text-slate-500'}>{t('form.nationalAddress')}</span>
                  <span className={isDark ? 'mt-2 block font-medium text-white' : 'mt-2 block font-medium text-slate-900'}>
                    {[
                      formState.nationalAddress.buildingNumber,
                      formState.nationalAddress.street,
                      formState.nationalAddress.district,
                      formState.nationalAddress.city,
                      formState.nationalAddress.postalCode,
                    ]
                      .filter(Boolean)
                      .join(', ') || '—'}
                  </span>
                </div>
              </div>
            </div>

            <div className={isDark ? 'rounded-[1.75rem] border border-white/10 bg-white/5 p-5' : 'rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5'}>
              <p className={isDark ? 'text-xs uppercase tracking-[0.24em] text-slate-400' : 'text-xs uppercase tracking-[0.24em] text-slate-500'}>{t('form.modePreview')}</p>
              <h3 className={isDark ? 'mt-2 text-lg font-semibold text-white' : 'mt-2 text-lg font-semibold text-slate-900'}>{t(`businessTypes.${formState.businessType}`)}</h3>
              <div className="mt-5 space-y-4">
                <div>
                  <p className={isDark ? 'text-sm font-semibold text-emerald-300' : 'text-sm font-semibold text-emerald-700'}>{t('superAdmin.enabledFeatures')}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {capabilityProfile.enabled.map((capability) => (
                      <span className={isDark ? 'rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300' : 'rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700'} key={capability}>
                        {t(`capabilityLabels.${capability}`)}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className={isDark ? 'text-sm font-semibold text-amber-300' : 'text-sm font-semibold text-amber-700'}>{t('superAdmin.limitedFeatures')}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {capabilityProfile.limited.map((capability) => (
                      <span className={isDark ? 'rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300' : 'rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700'} key={capability}>
                        {t(`capabilityLabels.${capability}`)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <Button onClick={goToPreviousStep} type="button" variant="ghost">
            {t('form.back')}
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button onClick={goToNextStep} type="button">
              {t('form.next')}
            </Button>
          ) : (
            <Button type="submit">{t('form.generate')}</Button>
          )}
        </div>
      </form>
    </GlassPanel>
  );
}
