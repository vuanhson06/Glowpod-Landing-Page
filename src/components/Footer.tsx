import Link from "next/link";
import { Logo } from "./Logo";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All products" },
      { href: "/shop/glowpod-blend-starter-kit", label: "Starter Kit" },
      { href: "/shop/foundation-base-refill-set", label: "Refills" },
      { href: "/cart", label: "Cart" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/shipping", label: "Shipping information" },
      { href: "/returns", label: "Returns" },
    ],
  },
  {
    title: "GlowPod",
    links: [
      { href: "/about", label: "About us" },
      { href: "/app", label: "The app" },
      { href: "/blog", label: "Blog" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-charcoal/10 bg-sand/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
            Foundation shade guidance and measured dispensing at home.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-semibold">{col.title}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-charcoal/70 hover:text-charcoal hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="border-t border-charcoal/10 px-4 py-4 text-center text-xs text-charcoal/60">
        © 2026 GlowPod
      </p>
    </footer>
  );
}
