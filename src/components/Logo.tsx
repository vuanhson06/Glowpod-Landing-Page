export function Droplet({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 2.5c3.6 4.3 7 8.4 7 12.2A7 7 0 0 1 5 14.7c0-3.8 3.4-7.9 7-12.2Z" fill="var(--color-rose)" />
      <ellipse cx="9.6" cy="14.2" rx="1.6" ry="2.4" fill="var(--color-ivory)" opacity="0.7" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-1.5 text-xl font-semibold tracking-tight text-charcoal">
      <Droplet />
      GlowPod
    </span>
  );
}
