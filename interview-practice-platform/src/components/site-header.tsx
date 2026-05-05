import Link from "next/link";
import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/lib/auth";

export async function SiteHeader({
  variant = "marketing",
}: {
  variant?: "marketing" | "app";
}) {
  // In newer Next versions, cookies() is async.
  // Keeping this component server-side lets us render auth-aware links.
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get(AUTH_COOKIE_NAME)?.value === "1";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--surface)]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--surface)]/70">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link 
          href="/" 
          className="group flex items-center gap-3 text-sm font-semibold transition-all duration-300 hover:opacity-95"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] via-blue-500 to-[var(--accent-2)] shadow-lg shadow-[var(--accent)]/25 transition-transform duration-300 group-hover:scale-105">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--accent)] via-blue-500 to-[var(--accent-2)] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50" />
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v2a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="block text-[var(--foreground)]">Interview Practice</span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-muted/80">AI Studio</span>
          </div>
        </Link>

        {variant === "marketing" ? (
          <nav className="flex items-center gap-2 text-sm">
            {isAuthed ? (
              <Link
                href="/app/dashboard"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-[var(--line)] bg-white/70 px-4 font-semibold text-[var(--foreground)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:bg-[var(--surface-2)] hover:shadow-md dark:bg-black/20"
              >
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-[var(--line)] bg-white/70 px-4 font-semibold text-[var(--foreground)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:bg-[var(--surface-2)] hover:shadow-md dark:bg-black/20"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[var(--accent)] via-blue-600 to-[var(--accent-2)] px-4 font-semibold text-white shadow-lg shadow-[var(--accent)]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--accent)]/40"
                >
                  <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                  Sign up
                </Link>
              </>
            )}
          </nav>
        ) : (
          <div />
        )}
      </div>
    </header>
  );
}
