import { Link } from 'react-router-dom';

function getVariantClasses(variant) {
  if (variant === 'secondary') {
    return 'border border-white/15 bg-white/5 text-slate-100 hover:bg-white/10';
  }

  if (variant === 'ghost') {
    return 'border border-transparent bg-transparent text-slate-200 hover:bg-white/5';
  }

  return 'border border-indigo-400/40 bg-indigo-500 text-white shadow-glow hover:bg-indigo-400';
}

export default function Button({ children, className = '', to, type = 'button', variant = 'primary', ...props }) {
  const sharedClassName = `inline-flex min-h-11 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition duration-200 ${getVariantClasses(variant)} ${className}`.trim();

  if (to) {
    return (
      <Link className={sharedClassName} to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={sharedClassName} type={type} {...props}>
      {children}
    </button>
  );
}
