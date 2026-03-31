export default function WorkspaceHero({ eyebrow, title, subtitle, action }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-500/15 via-slate-900/80 to-emerald-500/10 p-8 shadow-glow">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-100">
            {eyebrow}
          </div>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">{subtitle}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}
