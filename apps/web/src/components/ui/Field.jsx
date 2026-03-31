export default function Field({
  as = 'input',
  children,
  className = '',
  label,
  name,
  onChange,
  type = 'text',
  value,
  ...props
 }) {
  const Component = as;
  const baseClassName = 'mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/30';
  const inputProps = Component === 'input' ? { type } : {};
 
  return (
    <label className="block text-start">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      <Component className={`${baseClassName} ${className}`.trim()} name={name} onChange={onChange} value={value} {...inputProps} {...props}>
        {children}
      </Component>
    </label>
  );
 }
