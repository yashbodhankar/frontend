"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { setMockAuthCookie } from "@/lib/auth-client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(() => {
    const next = searchParams.get("next");
    if (!next || !next.startsWith("/")) return "/app/dashboard";
    return next;
  }, [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

// Mock auth: accept anything and set a cookie.
    setMockAuthCookie();

    // For demo purposes, simulate new user by going to resume upload
    router.replace("/app/resume-upload");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/20 text-sm text-red-600 dark:text-red-400 backdrop-blur-sm animate-bounce-subtle flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

<div className="space-y-2.5 field-entrance stagger-4">
        <label className="text-sm font-semibold text-[var(--foreground)] block" htmlFor="email">
          Email Address
        </label>
        <div className={`relative input-group-animated group transition-all ${emailFocused ? 'scale-[1.02]' : ''}`}>
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${emailFocused ? 'text-[var(--accent)]' : 'text-muted'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            placeholder="you@example.com"
            className="h-13 w-full rounded-2xl border-2 border-[var(--line)] bg-white/50 dark:bg-black/20 px-12 text-sm font-medium text-[var(--foreground)] placeholder:text-muted/50 outline-none transition-all duration-300 focus:border-[var(--accent)] focus:bg-white dark:focus:bg-black/40 focus:shadow-[0_0_0_3px] focus:shadow-[var(--accent)]/15 hover:border-[var(--accent)]/30 input-animated-focus backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="space-y-2.5 field-entrance stagger-5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-[var(--foreground)] block" htmlFor="password">
            Password
          </label>
          <Link href="/forgot-password" className="text-xs font-medium text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors link-animate">
            Forgot password?
          </Link>
        </div>
        <div className={`relative input-group-animated group transition-all ${passwordFocused ? 'scale-[1.02]' : ''}`}>
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${passwordFocused ? 'text-[var(--accent)]' : 'text-muted'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            placeholder="Enter your password"
            className="h-13 w-full rounded-2xl border-2 border-[var(--line)] bg-white/50 dark:bg-black/20 px-12 pr-14 text-sm font-medium text-[var(--foreground)] placeholder:text-muted/50 outline-none transition-all duration-300 focus:border-[var(--accent)] focus:bg-white dark:focus:bg-black/40 focus:shadow-[0_0_0_3px] focus:shadow-[var(--accent)]/15 hover:border-[var(--accent)]/30 input-animated-focus backdrop-blur-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-[var(--accent)] transition-all duration-300 hover:scale-110 btn-press p-1"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.821m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

<div className="flex items-center gap-3 field-entrance stagger-6 py-2">
        <button
          type="button"
          onClick={() => setRememberMe(!rememberMe)}
          className={`relative w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 cursor-pointer checkbox-animated ${
            rememberMe 
              ? "bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] border-[var(--accent)] shadow-lg shadow-[var(--accent)]/25 scale-100" 
              : "border-[var(--line)] hover:border-[var(--accent)]/50 hover:shadow-md hover:shadow-[var(--accent)]/10"
          }`}
        >
          {rememberMe && (
            <svg className="w-3.5 h-3.5 text-white animate-jump" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <label className="text-sm font-medium text-[var(--foreground)] cursor-pointer select-none hover:text-[var(--accent)] transition-colors">
          Remember me for 30 days
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative group inline-flex h-13 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[var(--accent)] via-blue-600 to-cyan-500 px-6 text-sm font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--accent)]/40 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 submit-shimmer btn-press disabled:hover:shadow-none"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 animate-shimmer" />
        {isSubmitting ? (
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Signing in...
          </div>
        ) : (
          <span className="relative z-10">Sign in to account</span>
        )}
      </button>

      <div className="relative my-7">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-[var(--line)]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white dark:bg-black px-3 text-xs font-semibold text-muted uppercase tracking-wider">Or continue with</span>
        </div>
      </div>

<div className="grid grid-cols-2 gap-3 field-entrance stagger-7">
        <button
          type="button"
          className="group relative inline-flex h-12 items-center justify-center rounded-xl border-2 border-[var(--line)] bg-white/50 dark:bg-black/20 px-4 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--surface-2)] hover:shadow-lg hover:shadow-[var(--accent)]/15 active:scale-95 backdrop-blur-sm overflow-hidden social-btn"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/5 to-[var(--accent)]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <svg className="w-5 h-5 mr-2 relative z-10" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="relative z-10">Google</span>
        </button>
        <button
          type="button"
          className="group relative inline-flex h-12 items-center justify-center rounded-xl border-2 border-[var(--line)] bg-white/50 dark:bg-black/20 px-4 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:border-[var(--foreground)] hover:bg-[var(--surface-2)] hover:shadow-lg hover:shadow-[var(--foreground)]/15 active:scale-95 backdrop-blur-sm overflow-hidden social-btn"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--foreground)]/0 via-[var(--foreground)]/5 to-[var(--foreground)]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <svg className="w-5 h-5 mr-2 relative z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-4.001-4.033-4.001-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span className="relative z-10">GitHub</span>
        </button>
      </div>

      <p className="text-xs text-center text-muted/70 font-medium pt-2">
        💡 Mock auth: any email/password works for demo
      </p>
    </form>
  );
}
