import { Suspense } from "react";
import Link from "next/link";

import { CustomCursor } from "@/components/custom-cursor";
import { ScrollEffects } from "@/components/scroll-effects";
import { SiteHeader } from "@/components/site-header";
import { LoginForm } from "@/app/login/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col relative overflow-hidden bg-gradient-to-b from-[#f5f7fc] via-white to-[#faf9fc]">
      <CustomCursor />
      <ScrollEffects />
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Enhanced animated gradient blobs */}
        <div className="absolute -top-40 right-1/3 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(14,102,255,0.2),transparent_70%)] blur-3xl animate-auth-blob shadow-2xl shadow-blue-500/10" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(0,197,164,0.15),transparent_68%)] blur-3xl animate-auth-blob stagger-2 shadow-2xl shadow-teal-500/10" />
        <div className="absolute top-1/2 -right-40 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,106,61,0.12),transparent_70%)] blur-3xl animate-auth-blob stagger-4 shadow-2xl shadow-orange-500/5" />
        
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent"></div>
        </div>
      </div>

      <SiteHeader variant="marketing" />
      <main className="flex flex-1 items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--accent)] via-blue-500 to-cyan-500 mb-6 icon-entrance shadow-xl shadow-blue-500/30 relative group cursor-pointer hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--accent)] via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity"></div>
              <svg className="w-10 h-10 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] title-reveal stagger-1 bg-gradient-to-r from-[var(--foreground)] to-[var(--foreground)]/70 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-lg text-muted mt-3 title-reveal stagger-2 font-medium">
              Continue your journey to interview mastery
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 sm:p-10 auth-card-entrance stagger-3 backdrop-blur-xl bg-white/80 dark:bg-black/40 border-2 border-white/60 dark:border-white/10 shadow-2xl">
            <div className="space-y-2 mb-8">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Sign in to your account</h2>
              <p className="text-base text-muted font-medium">
                Access your practice sessions and track progress
              </p>
            </div>

            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></div>
                    <span className="text-sm font-medium text-muted">Loading...</span>
                  </div>
                </div>
              }
            >
              <LoginForm />
            </Suspense>

            <div className="mt-8 pt-6 border-t border-white/20 dark:border-white/10 text-center text-sm text-muted font-medium">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-bold text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors">
                Create one now
              </Link>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex items-center justify-center gap-8 opacity-60">
            <div className="flex items-center gap-2 text-sm text-muted">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Secure Login
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Privacy Protected
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Quick Access
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
