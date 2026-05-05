"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppNavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={
        isActive
          ? "group relative flex h-11 items-center gap-2 rounded-xl border border-[var(--accent)]/20 bg-gradient-to-r from-[var(--accent)]/15 to-[var(--accent-2)]/10 px-3 text-sm font-semibold text-[var(--accent)] shadow-sm transition-all duration-300"
          : "group relative flex h-11 items-center gap-2 rounded-xl border border-transparent px-3 text-sm font-medium text-[var(--muted)] transition-all duration-300 hover:border-[var(--line)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]"
      }
    >
      <span className={isActive ? "h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_10px] shadow-[var(--accent)]/60" : "h-1.5 w-1.5 rounded-full bg-[var(--muted)]/50 transition-colors group-hover:bg-[var(--accent)]/50"} />
      {label}
      {isActive ? <span className="ml-auto h-5 w-1 rounded-full bg-gradient-to-b from-[var(--accent)] to-[var(--accent-2)]" /> : null}
    </Link>
  );
}
