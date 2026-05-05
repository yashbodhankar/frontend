import Link from "next/link";

import { CustomCursor } from "@/components/custom-cursor";
import { ScrollEffects } from "@/components/scroll-effects";
import { SiteHeader } from "@/components/site-header";
import { SignupForm } from "@/app/signup/signup-form";
import { InterviewCta } from "../login/interview-cta";

export default function SignupPage() {
  return (
    <div className="flex min-h-dvh flex-col relative overflow-hidden bg-gradient-to-b from-[#f6faf8] via-white to-[#f7f8ff]">
      <CustomCursor />
      <ScrollEffects />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(0,197,164,0.18),transparent_70%)] blur-3xl animate-auth-blob shadow-2xl shadow-teal-500/10" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(14,102,255,0.16),transparent_68%)] blur-3xl animate-auth-blob stagger-2 shadow-2xl shadow-blue-500/10" />
        <div className="absolute top-1/2 -right-40 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,106,61,0.1),transparent_70%)] blur-3xl animate-auth-blob stagger-4 shadow-2xl shadow-orange-500/5" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/20 to-transparent" />
        </div>
      </div>

      <SiteHeader variant="marketing" />
      <main className="flex flex-1 items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--accent)] via-blue-500 to-cyan-500 mb-6 icon-entrance shadow-xl shadow-blue-500/30 relative group cursor-pointer hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--accent)] via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity" />
              <svg className="w-10 h-10 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0H9m9-5a3 3 0 11-6 0 3 3 0 016 0zM6 22a6 6 0 01-6-6V6a6 6 0 016-6h8a6 6 0 016 6v10a6 6 0 01-6 6H6z" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] title-reveal stagger-1 bg-gradient-to-r from-[var(--foreground)] to-[var(--foreground)]/70 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-base sm:text-lg text-muted mt-3 title-reveal stagger-2 font-medium">
              Start your interview practice journey
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted/70">
              <span className="rounded-full border border-[var(--line)]/70 bg-white/70 px-3 py-1 shadow-sm backdrop-blur-sm dark:bg-black/20">Free starter</span>
              <span className="rounded-full border border-[var(--line)]/70 bg-white/70 px-3 py-1 shadow-sm backdrop-blur-sm dark:bg-black/20">Takes 2 minutes</span>
              <span className="rounded-full border border-[var(--line)]/70 bg-white/70 px-3 py-1 shadow-sm backdrop-blur-sm dark:bg-black/20">No credit card</span>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 sm:p-10 auth-card-entrance stagger-3 backdrop-blur-xl bg-white/80 dark:bg-black/40 border-2 border-white/60 dark:border-white/10 shadow-2xl">
            <div className="space-y-2.5 mb-8">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Sign up for an account</h2>
              <p className="text-base text-muted font-medium">
                Enter your details to get started
              </p>
            </div>

            <SignupForm />

            <div className="mt-8 grid grid-cols-3 gap-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted/70">
              <div className="rounded-2xl border border-[var(--line)]/70 bg-white/60 px-3 py-3 backdrop-blur-sm dark:bg-black/20">
                Secure
              </div>
              <div className="rounded-2xl border border-[var(--line)]/70 bg-white/60 px-3 py-3 backdrop-blur-sm dark:bg-black/20">
                Fast setup
              </div>
              <div className="rounded-2xl border border-[var(--line)]/70 bg-white/60 px-3 py-3 backdrop-blur-sm dark:bg-black/20">
                Guided flow
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 dark:border-white/10 text-center text-sm text-muted font-medium">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
      <InterviewCta />
    </div>
  );
}
