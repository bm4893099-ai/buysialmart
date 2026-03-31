export default function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 via-indigo-500 to-emerald-400 shadow-glow">
        <span className="text-sm font-black tracking-[0.2em] text-white">VB</span>
      </div>
      <div className="text-start">
        <div className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-100">VITALBLAZE</div>
        <div className="text-xs text-slate-400">Retail Cloud Suite</div>
      </div>
    </div>
  );
}
