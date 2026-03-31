export default function StatusBadge({ children, tone = 'neutral' }) {
  const toneMap = {
    success: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    warning: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
    danger: 'border-rose-400/20 bg-rose-400/10 text-rose-300',
    neutral: 'border-white/10 bg-white/5 text-slate-200',
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${toneMap[tone]}`.trim()}>
      {children}
    </span>
  );
}
