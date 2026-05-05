import Link from "next/link";

import { CustomCursor } from "@/components/custom-cursor";
import { ScrollEffects } from "@/components/scroll-effects";
import { AppNavLink } from "@/components/app-nav-link";
import { LogoutButton } from "@/components/logout-button";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-[var(--background)] via-[var(--surface-2)] to-[var(--background)] text-[var(--foreground)] relative overflow-hidden">
      <CustomCursor />
      <ScrollEffects />
      
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 right-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(14,102,255,0.12),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,197,164,0.1),transparent_68%)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-dvh w-full max-w-7xl grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[248px_1fr]">
        <aside className="glass-card h-fit rounded-2xl p-4 md:sticky md:top-4">
          <div className="flex items-center justify-between rounded-xl border border-[var(--line)]/70 bg-white/60 px-3 py-3 dark:bg-black/20">
            <Link href="/app" className="group flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] via-blue-500 to-[var(--accent-2)] shadow-lg shadow-[var(--accent)]/20 transition-transform duration-300 group-hover:scale-105">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v2a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div className="leading-tight">
                <span className="text-sm font-semibold text-[var(--foreground)]">Interview</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted/70">workspace</span>
              </div>
            </Link>
          </div>

          <nav className="mt-4 space-y-1.5">
            <AppNavLink href="/app/dashboard" label="Dashboard" />
            <AppNavLink href="/app/analytics" label="Analytics" />
            <AppNavLink href="/app/repo" label="Repo" />
            <AppNavLink href="/app/interviews" label="Interviews" />
            <AppNavLink href="/app/profile" label="Profile" />
          </nav>

          <div className="mt-6">
            <LogoutButton className="h-11 w-full justify-start rounded-xl border border-[var(--line)] bg-white/70 px-3 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent)]/25 hover:bg-[var(--surface-2)] dark:bg-black/20" />
          </div>

          <div className="mt-4 rounded-xl border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent)]/10 via-[var(--accent-2)]/8 to-transparent p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <p className="text-xs font-medium text-[var(--foreground)]">Pro Tip</p>
            </div>
            <p className="text-xs leading-5 text-muted">
              Practice daily with STAR method for behavioral questions to improve your scores!
            </p>
          </div>
        </aside>

        <main className="glass-card rounded-2xl p-5 md:p-6">
          {children}
        </main>
      </div>

      {/* Floating quick interview CTA */}
      <Link
        href="/app/interviews/call"
        className="group fixed bottom-6 right-6 z-50"
        aria-label="Start live interview"
      >
        <div className="relative hidden md:block">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[var(--accent)]/45 via-blue-500/40 to-[var(--accent-2)]/45 blur-xl opacity-60 transition-all duration-300 group-hover:opacity-90" />
          <div className="absolute -inset-4 rounded-[2rem] border border-[var(--accent)]/30 opacity-35 [animation:ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <div className="relative mb-1 ml-2 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-cyan-100 backdrop-blur-md">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-[var(--accent)]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="8.2" r="3.2" />
                <path d="M5.2 18.2c1.4-2.8 3.7-4.2 6.8-4.2s5.4 1.4 6.8 4.2" />
              </svg>
            </span>
            AI INTERVIEWER AVA
          </div>
          <div className="relative inline-flex items-center gap-3 rounded-2xl border border-white/40 bg-gradient-to-r from-[var(--accent)] via-blue-600 to-[var(--accent-2)] px-4 py-3 text-white shadow-2xl shadow-[var(--accent)]/35 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.02] group-hover:shadow-[var(--accent)]/55">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#32ff8f] shadow-[0_0_10px] shadow-[#32ff8f] animate-pulse" />
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="8.2" r="3.2" />
                <path d="M5.2 18.2c1.4-2.8 3.7-4.2 6.8-4.2s5.4 1.4 6.8 4.2" />
                <path d="M7.2 11.8c-.7-.7-1.1-1.6-1.1-2.6 0-1 .4-1.9 1.1-2.6" />
                <path d="M16.8 11.8c.7-.7 1.1-1.6 1.1-2.6 0-1-.4-1.9-1.1-2.6" />
              </svg>
            </div>
            <div className="leading-tight">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/80">Interviewer Live</p>
              <p className="text-sm font-extrabold">Start Mock Interview</p>
            </div>
            <svg className="h-4 w-4 text-white/90 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <div className="relative md:hidden">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[var(--accent)]/40 to-[var(--accent-2)]/40 blur-lg opacity-70" />
          <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/35 bg-gradient-to-br from-[var(--accent)] via-blue-600 to-[var(--accent-2)] text-white shadow-xl shadow-[var(--accent)]/45 transition-transform duration-300 group-hover:scale-105">
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#32ff8f] shadow-[0_0_10px] shadow-[#32ff8f] animate-pulse" />
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="8.2" r="3.2" />
              <path d="M5.2 18.2c1.4-2.8 3.7-4.2 6.8-4.2s5.4 1.4 6.8 4.2" />
              <path d="M7.2 11.8c-.7-.7-1.1-1.6-1.1-2.6 0-1 .4-1.9 1.1-2.6" />
              <path d="M16.8 11.8c.7-.7 1.1-1.6 1.1-2.6 0-1-.4-1.9-1.1-2.6" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}
