export default function IconButton({ children, label, className = '', ...props }) {
  return <button aria-label={label} title={label} className={`grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/80 transition hover:bg-white/12 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500/70 ${className}`} {...props}>{children}</button>;
}
