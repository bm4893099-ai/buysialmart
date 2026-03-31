import { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { pricingPlans } from '../../data/marketing.js';
import Button from '../ui/Button.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

export default function PricingTable() {
  const { t } = useTranslation();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = useMemo(() => pricingPlans[billingCycle], [billingCycle]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading badge={t('pricing.title')} description={t('pricing.subtitle')} title={t('pricing.title')} />

        <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2">
          {['monthly', 'yearly'].map((cycle) => {
            const isActive = billingCycle === cycle;

            return (
              <button
                className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-indigo-500 text-white shadow-glow' : 'text-slate-300 hover:bg-white/5'
                }`.trim()}
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                type="button"
              >
                {cycle === 'monthly' ? t('common.monthly') : t('common.yearly')}
              </button>
            );
          })}
          <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            {t('pricing.saveBadge')}
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {plans.map((plan) => (
          <article
            className={`rounded-[1.75rem] border p-8 transition ${
              plan.highlighted
                ? 'border-indigo-400/40 bg-gradient-to-b from-indigo-500/15 to-white/5 shadow-glow'
                : 'border-white/10 bg-white/5'
            }`.trim()}
            key={plan.key}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-white">{t(plan.nameKey)}</h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">{t(plan.descriptionKey)}</p>
              </div>
              {plan.highlighted ? (
                <div className="rounded-full border border-indigo-300/20 bg-indigo-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100">
                  {t('common.recommended')}
                </div>
              ) : null}
            </div>

            <div className="mt-8 flex items-end gap-2">
              <span className="text-5xl font-semibold text-white">SAR {plan.price}</span>
              <span className="pb-2 text-sm text-slate-400">
                {billingCycle === 'monthly' ? t('common.perMonth') : t('common.perYear')}
              </span>
            </div>

            <div className="mt-8 space-y-4">
              {plan.featureKeys.map((featureKey) => (
                <div className="flex items-center gap-3" key={featureKey}>
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
                  <span className="text-sm text-slate-200">{t(featureKey)}</span>
                </div>
              ))}
            </div>

            <Button className="mt-8 w-full justify-center" to="/super-admin" variant={plan.highlighted ? 'primary' : 'secondary'}>
              {t('common.startTrial')}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
