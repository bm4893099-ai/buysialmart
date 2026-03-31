import { useTranslation } from 'react-i18next';
import { useAdminTheme } from '../../utils/adminTheme.js';
import { resolveLocalizedValue, useSiteContent } from '../../utils/siteContent.js';

export default function LogoMark() {
  const { i18n } = useTranslation();
  const { isDark } = useAdminTheme();
  const { siteContent } = useSiteContent();
  const language = i18n.resolvedLanguage || 'en';

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 via-indigo-500 to-emerald-400 shadow-glow">
        <span className="text-sm font-black tracking-[0.2em] text-white">{siteContent.brand.shortMark}</span>
      </div>
      <div className="text-start">
        <div className={isDark ? 'text-sm font-semibold uppercase tracking-[0.3em] text-indigo-100' : 'text-sm font-semibold uppercase tracking-[0.3em] text-indigo-700'}>{resolveLocalizedValue(siteContent.brand.name, language)}</div>
        <div className={isDark ? 'text-xs text-slate-400' : 'text-xs text-slate-500'}>{resolveLocalizedValue(siteContent.brand.tagline, language)}</div>
      </div>
    </div>
  );
}
