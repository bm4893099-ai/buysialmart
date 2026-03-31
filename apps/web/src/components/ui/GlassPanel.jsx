export default function GlassPanel({ children, className = '' }) {
  return <div className={`glass-panel surface-ring ${className}`.trim()}>{children}</div>;
}
