import { BUSINESS_TYPES } from '@vitalblaze/shared';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTranslation } from 'react-i18next';
import { analyticsKpis, analyticsSeries, departmentBreakdown } from '../../data/demo.js';
import GlassPanel from '../ui/GlassPanel.jsx';
import StatusBadge from '../ui/StatusBadge.jsx';

function KpiCard({ growth, title, value }) {
  return (
    <GlassPanel className="p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <p className="text-3xl font-semibold text-white">{value}</p>
        <StatusBadge tone={growth.startsWith('-') ? 'warning' : 'success'}>{growth}</StatusBadge>
      </div>
    </GlassPanel>
  );
}

export default function AnalyticsDashboard({ businessType }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-3">
        <KpiCard growth={analyticsKpis.revenue.growth} title={t('analytics.revenue')} value={analyticsKpis.revenue.value} />
        <KpiCard growth={analyticsKpis.profit.growth} title={t('analytics.profit')} value={analyticsKpis.profit.value} />
        <KpiCard growth={analyticsKpis.netVatDue.growth} title={t('analytics.netVatDue')} value={analyticsKpis.netVatDue.value} />
      </div>

      <GlassPanel className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-indigo-200">{t('analytics.dailyRevenueProfit')}</p>
            <p className="mt-2 text-sm text-slate-300">{businessType === BUSINESS_TYPES.BAKALA ? t('analytics.simplifiedView') : t('analytics.departmentalView')}</p>
          </div>
          <StatusBadge tone="neutral">{t('analytics.weekGrowth')}</StatusBadge>
        </div>

        <div className="mt-8 h-80">
          <ResponsiveContainer height="100%" width="100%">
            <AreaChart data={analyticsSeries}>
              <defs>
                <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profitFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
              <Area dataKey="revenue" fill="url(#revenueFill)" fillOpacity={1} stroke="#818cf8" strokeWidth={3} type="monotone" />
              <Area dataKey="profit" fill="url(#profitFill)" fillOpacity={1} stroke="#34d399" strokeWidth={3} type="monotone" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassPanel>

      {businessType === BUSINESS_TYPES.GROCERY_STORE ? (
        <GlassPanel className="p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-indigo-200">{t('analytics.departmentBreakdown')}</p>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{t('analytics.department')}</th>
                  <th className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{t('analytics.margin')}</th>
                  <th className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{t('analytics.contribution')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {departmentBreakdown.map((row) => (
                  <tr key={row.department}>
                    <td className="px-4 py-4 text-sm text-white">{row.department}</td>
                    <td className="px-4 py-4 text-sm text-slate-300">{row.margin}</td>
                    <td className="px-4 py-4 text-sm text-slate-300">{row.contribution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      ) : null}
    </div>
  );
}
