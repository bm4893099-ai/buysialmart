import { useState } from 'react';
import { BUSINESS_TYPES, USER_ROLES } from '@vitalblaze/shared';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SiteHeader from '../components/layout/SiteHeader.jsx';
import MarketingFooter from '../components/marketing/MarketingFooter.jsx';
import Button from '../components/ui/Button.jsx';
import Field from '../components/ui/Field.jsx';
import GlassPanel from '../components/ui/GlassPanel.jsx';
import { getPanelPathForRole, useAdminSession } from '../utils/adminSession.js';

function resolveApiBaseUrl() {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  if (window.location.port === '5173') {
    return 'http://localhost:5000';
  }

  return window.location.origin;
}

const initialFormState = {
  email: '',
  name: '',
  role: USER_ROLES.SUPER_ADMIN,
  businessType: BUSINESS_TYPES.GROCERY_STORE,
};

export default function AdminLoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { session, saveSession } = useAdminSession();
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (session?.user) {
    return <Navigate replace to={getPanelPathForRole(session.user.role)} />;
  }

  function updateField(fieldKey, value) {
    setFormState((currentState) => ({
      ...currentState,
      [fieldKey]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${resolveApiBaseUrl()}/api/auth/demo-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || t('adminLogin.loginFailed'));
      }

      saveSession(payload);

      const targetPath = location.state?.from || getPanelPathForRole(payload.user.role);
      navigate(targetPath, { replace: true });
    } catch (error) {
      setErrorMessage(error.message || t('adminLogin.loginFailed'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <SiteHeader />
      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-100">
            {t('adminLogin.eyebrow')}
          </div>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">{t('adminLogin.title')}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{t('adminLogin.subtitle')}</p>

          <div className="mt-8 space-y-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <div className="rounded-2xl bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">{t('adminLogin.superAdminPanel')}</p>
              <p className="mt-2 text-sm text-slate-200">{t('adminLogin.superAdminPanelHint')}</p>
            </div>
            <div className="rounded-2xl bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">{t('adminLogin.adminPanel')}</p>
              <p className="mt-2 text-sm text-slate-200">{t('adminLogin.adminPanelHint')}</p>
            </div>
          </div>
        </div>

        <GlassPanel className="p-6 lg:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Field label={t('adminLogin.email')} name="email" onChange={(event) => updateField('email', event.target.value)} type="email" value={formState.email} />
            <Field label={t('adminLogin.name')} name="name" onChange={(event) => updateField('name', event.target.value)} value={formState.name} />
            <Field as="select" label={t('adminLogin.role')} name="role" onChange={(event) => updateField('role', event.target.value)} value={formState.role}>
              <option value={USER_ROLES.SUPER_ADMIN}>{t('adminLogin.superAdminRole')}</option>
              <option value={USER_ROLES.STORE_ADMIN}>{t('adminLogin.adminRole')}</option>
            </Field>
            <Field as="select" label={t('adminLogin.businessType')} name="businessType" onChange={(event) => updateField('businessType', event.target.value)} value={formState.businessType}>
              <option value={BUSINESS_TYPES.BAKALA}>{t('businessTypes.BAKALA')}</option>
              <option value={BUSINESS_TYPES.GROCERY_STORE}>{t('businessTypes.GROCERY_STORE')}</option>
            </Field>

            {errorMessage ? <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{errorMessage}</div> : null}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <p className="text-sm text-slate-400">{t('adminLogin.accessHint')}</p>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? t('adminLogin.loggingIn') : t('adminLogin.submit')}
              </Button>
            </div>
          </form>
        </GlassPanel>
      </main>
      <MarketingFooter />
    </div>
  );
}
