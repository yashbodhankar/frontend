"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setMockAuthCookie } from "@/lib/auth-client";

export function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [error, setError] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);

    // Show success animation before redirecting
    setShowSuccessAnimation(true);

    // Mock signup: accept anything and set a cookie.
    setMockAuthCookie();

// Wait for animation to complete, then redirect (3 seconds for full effect)
    setTimeout(() => {
      router.replace("/app/resume-upload");
    }, 3000);
  }

  // ==================== SUCCESS ANIMATION ====================
  if (showSuccessAnimation) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden signup-success-overlay animate-fade-in">

        
        {/* Animated grid background */}
        <div className="absolute inset-0 animate-pulse-glow bg-gradient-to-br from-blue-900/90 via-black/95 to-teal-900/90" />


        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center animate-scale-up">


          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100/80">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm stagger-1">Secure setup</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm stagger-2">Profile ready</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm stagger-3">Routing you forward</span>
          </div>

          
          {/* Animated checkmark circle */}
          <div className="relative mb-8 w-[140px] h-[140px] icon-entrance">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#00c5a4] shadow-[0_0_60px_rgba(14,102,255,0.5),0_0_100px_rgba(0,197,164,0.3)] animate-circle-scale" />
            <svg
              className="absolute inset-0 w-full h-full p-[30%]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path className="animate-draw-checkmark [stroke-dasharray:24] [stroke-dashoffset:24]" d="M20 6L9 17l-5-5" />
            </svg>
          </div>


          {/* Success message */}
          <h1 className="text-5xl font-bold text-white mb-4 text-center animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.5s' }}>
            Account Created! 🎉
          </h1>


          <p className="text-lg sm:text-xl text-cyan-100/85 text-center mb-10 max-w-md leading-relaxed"
            style={{
              animation: 'fade-in-up 0.6s ease-out 0.7s forwards',
              opacity: 0
            }}>
            Your journey begins now. Redirecting to setup...
          </p>

          {/* Animated progress indicator */}
          <div className="w-64 mb-12">
            <div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-100/60">
              <span>Creating workspace</span>
              <span>100%</span>
            </div>
            <div style={{
              height: '6px',
              background: 'linear-gradient(90deg, rgba(14, 102, 255, 0.18), rgba(0, 197, 164, 0.18))',
              borderRadius: '999px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #0e66ff, #00c5a4)',
                animation: 'progress-bar 2.5s ease-in-out forwards',
                borderRadius: '999px',
                boxShadow: '0 0 24px rgba(14, 102, 255, 0.6), 0 0 36px rgba(0, 197, 164, 0.25)'
              }} />
            </div>
          </div>

          {/* Animated status text */}
          <div className="flex items-center gap-3"
            style={{
              animation: 'fade-in 0.6s ease-out 0.9s forwards',
              opacity: 0
            }}>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#00c5a4',
                    animation: 'pulse-dot 1.5s ease-in-out infinite',
                    animationDelay: `${i * 0.3}s`,
                    boxShadow: '0 0 8px rgba(0, 197, 164, 0.6)'
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-muted font-medium">Setting up account...</span>
          </div>
        </div>

        <style>{`
          @keyframes pulse-glow {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.5;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.1);
              opacity: 0.8;
            }
          }

          @keyframes scale-up {
            from {
              opacity: 0;
              transform: scale(0.8);
              filter: blur(10px);
            }
            to {
              opacity: 1;
              transform: scale(1);
              filter: blur(0);
            }
          }

          @keyframes circle-scale {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes draw-checkmark {
            from {
              stroke-dashoffset: 24;
              opacity: 0;
            }
            to {
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }

          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes progress-bar {
            from {
              width: 0%;
              opacity: 0;
            }
            to {
              width: 100%;
              opacity: 1;
            }
          }

          @keyframes pulse-dot {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.4;
              transform: scale(0.8);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-500/10 to-red-500/5 p-4 text-sm text-red-600 dark:text-red-400 backdrop-blur-sm animate-bounce-subtle">
          <svg className="mt-0.5 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <div className="space-y-2.5 field-entrance stagger-4">
        <label className="text-sm font-semibold text-[var(--foreground)] block" htmlFor="name">
          Full Name
        </label>
        <div className={`relative input-group-animated group transition-all ${nameFocused ? 'scale-[1.02]' : ''}`}>
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${nameFocused ? 'text-[var(--accent)]' : 'text-muted'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            className="h-13 w-full rounded-2xl border-2 border-[var(--line)] bg-white/50 dark:bg-black/20 px-12 text-sm font-medium text-[var(--foreground)] placeholder:text-muted/50 outline-none transition-all duration-300 focus:border-[var(--accent)] focus:bg-white dark:focus:bg-black/40 focus:shadow-[0_0_0_3px] focus:shadow-[var(--accent)]/15 hover:border-[var(--accent)]/30 input-animated-focus backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="space-y-2.5 field-entrance stagger-5">
        <label className="text-sm font-semibold text-[var(--foreground)] block" htmlFor="email">
          Email
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
            placeholder="you@example.com"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            className="h-13 w-full rounded-2xl border-2 border-[var(--line)] bg-white/50 dark:bg-black/20 px-12 text-sm font-medium text-[var(--foreground)] placeholder:text-muted/50 outline-none transition-all duration-300 focus:border-[var(--accent)] focus:bg-white dark:focus:bg-black/40 focus:shadow-[0_0_0_3px] focus:shadow-[var(--accent)]/15 hover:border-[var(--accent)]/30 input-animated-focus backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="space-y-2.5 field-entrance stagger-6">
        <label className="text-sm font-semibold text-[var(--foreground)] block" htmlFor="password">
          Password
        </label>
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
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            className="h-13 w-full rounded-2xl border-2 border-[var(--line)] bg-white/50 dark:bg-black/20 px-12 pr-14 text-sm font-medium text-[var(--foreground)] placeholder:text-muted/50 outline-none transition-all duration-300 focus:border-[var(--accent)] focus:bg-white dark:focus:bg-black/40 focus:shadow-[0_0_0_3px] focus:shadow-[var(--accent)]/15 hover:border-[var(--accent)]/30 input-animated-focus backdrop-blur-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-transparent p-1 text-muted transition-all duration-300 hover:scale-110 hover:border-[var(--accent)]/20 hover:bg-[var(--accent)]/5 hover:text-[var(--accent)] btn-press"
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
        <div className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--line)]/60 bg-white/50 px-3 py-2 text-xs font-semibold text-muted backdrop-blur-sm dark:bg-black/20">
          <div className="flex-1 h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all strength-bar-animated ${
                password.length === 0 ? "w-0" : 
                password.length < 4 ? "w-1/3 bg-red-500" : 
                password.length < 8 ? "w-2/3 bg-yellow-500" : 
                "w-full bg-green-500"
              }`}
            />
          </div>
          <span className="min-w-14 text-right text-[11px] uppercase tracking-[0.18em] text-muted">
            {password.length < 4 ? "Weak" : password.length < 8 ? "Medium" : "Strong"}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-3 field-entrance stagger-7 rounded-2xl border border-[var(--line)]/60 bg-[var(--surface-2)]/40 px-4 py-3 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setAgreeTerms(!agreeTerms)}
          className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 checkbox-animated ${
            agreeTerms 
              ? "bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] border-[var(--accent)] shadow-lg shadow-[var(--accent)]/20" 
              : "border-[var(--line)] bg-white/70 dark:bg-black/20 hover:border-[var(--accent)]"
          }`}
        >
          {agreeTerms && (
            <svg className="w-3 h-3 text-white animate-jump" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <span className="text-sm text-muted leading-6">
          I agree to the{" "}
          <a href="/terms" className="text-[var(--accent)] hover:underline link-animate">Terms of Service</a>
          {" "}and{" "}
          <a href="/privacy" className="text-[var(--accent)] hover:underline link-animate">Privacy Policy</a>
        </span>
      </div>

      <p className="text-[11px] leading-5 text-center text-muted/70 font-medium px-2">
        Use a real email if you want the signup cookie to feel consistent across the demo flow.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative group inline-flex h-13 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[var(--accent)] via-blue-600 to-cyan-500 px-6 text-sm font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--accent)]/40 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 submit-shimmer btn-press disabled:hover:shadow-none"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-25 transform -skew-x-12 animate-shimmer" />
        <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
        {isSubmitting ? (
          <div className="flex items-center gap-2.5 relative z-10">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Creating account...
          </div>
        ) : (
          <span className="relative z-10">Create account</span>
        )}
      </button>

      <div className="relative my-7">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-[var(--line)]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white dark:bg-black px-3 text-muted uppercase tracking-wider font-semibold">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 field-entrance stagger-8">
        <button
          type="button"
          className="group relative inline-flex h-12 items-center justify-center rounded-xl border-2 border-[var(--line)] bg-white/50 dark:bg-black/20 px-4 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--surface-2)] hover:shadow-lg hover:shadow-[var(--accent)]/15 active:scale-95 backdrop-blur-sm overflow-hidden social-btn"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/5 to-[var(--accent)]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-4.001-4.033-4.001-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span className="relative z-10">GitHub</span>
        </button>
      </div>

      <p className="text-xs text-center text-muted/70 font-medium pt-2">
        Mock signup: this does not create a real account yet.
      </p>
    </form>
  );
}
