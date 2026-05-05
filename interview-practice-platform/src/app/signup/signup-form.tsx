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
  const [successStage, setSuccessStage] = useState<"zoom" | "network" | "verify" | "success">("zoom");
  const [error, setError] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const isZoomStage = successStage === "zoom";
  const isNetworkStage = successStage === "network";
  const isVerifyStage = successStage === "verify";
  const isSuccessStage = successStage === "success";

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
    setSuccessStage("zoom");

    // Mock signup: accept anything and set a cookie.
    setMockAuthCookie();

    window.setTimeout(() => setSuccessStage("network"), 1200);
    window.setTimeout(() => setSuccessStage("verify"), 3200);
    window.setTimeout(() => setSuccessStage("success"), 5400);

    // Wait for animation to complete, then redirect.
    setTimeout(() => {
      router.replace("/app/resume-upload");
    }, 8200);
  }

  // ==================== SUCCESS ANIMATION ====================
  if (showSuccessAnimation) {
    return (
      <div className="fixed inset-0 z-[100] overflow-hidden signup-success-overlay animate-fade-in">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,255,0.96)_42%,rgba(236,244,255,0.92))]" />
        <div className="absolute inset-0 opacity-14 signup-grid signup-grid-light" />
        <div className="absolute inset-0 signup-vignette signup-vignette-light" />

        <div className="absolute inset-0 pointer-events-none">
          <div className={`signup-flow-camera ${successStage === "zoom" ? "is-zooming" : ""} ${successStage === "network" ? "is-network" : ""} ${successStage === "verify" ? "is-verify" : ""} ${successStage === "success" ? "is-success" : ""}`}>
            <div className={`signup-network ${successStage === "network" || successStage === "verify" || successStage === "success" ? "is-live" : ""}`}>
              <div className="signup-network-line signup-network-line-a" />
              <div className="signup-network-line signup-network-line-b" />
              <div className="signup-network-line signup-network-line-c" />
              <div className="signup-network-line signup-network-line-d" />
              <div className="signup-node signup-node-core" />
              <div className="signup-node signup-node-a" />
              <div className="signup-node signup-node-b" />
              <div className="signup-node signup-node-c" />
              <div className="signup-node signup-node-d" />

              <div className="signup-particle signup-particle-1" />
              <div className="signup-particle signup-particle-2" />
              <div className="signup-particle signup-particle-3" />
              <div className="signup-particle signup-particle-4" />

              <div className="signup-lock signup-lock-left">🔒</div>
              <div className="signup-lock signup-lock-right">🔐</div>

              <div className={`signup-pulse-ring ${successStage === "verify" || successStage === "success" ? "is-active" : ""}`} />
            </div>

            <div className={`signup-success-panel ${successStage === "success" ? "is-visible" : ""}`}>
              <div className="signup-success-card">
                <div className="signup-success-tick">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h1>Account Created Successfully</h1>
                <p>Your secure workspace is live. Redirecting to setup...</p>
              </div>
            </div>
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

          @keyframes ui-zoom {
            0% { transform: scale(1) translateY(0); opacity: 1; }
            100% { transform: scale(0.5) translateY(-28px); opacity: 0.1; }
          }

          @keyframes network-drift {
            0% { opacity: 0; transform: translateY(24px) scale(0.96); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }

          @keyframes node-pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 197, 164, 0.0), 0 0 18px rgba(59,130,246,0.32); }
            50% { transform: scale(1.12); box-shadow: 0 0 0 16px rgba(0, 197, 164, 0.0), 0 0 28px rgba(147,51,234,0.45); }
          }

          @keyframes particle-flow {
            0% { opacity: 0; transform: translate3d(0,0,0) scale(0.8); }
            15% { opacity: 1; }
            100% { opacity: 0; transform: translate3d(220px,-120px,0) scale(1.5); }
          }

          @keyframes pulse-ring {
            0% { transform: scale(0.65); opacity: 0.85; }
            100% { transform: scale(1.6); opacity: 0; }
          }

          @keyframes success-pop {
            0% { opacity: 0; transform: translateY(24px) scale(0.96); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }

          .signup-grid {
            background-image:
              linear-gradient(rgba(13,39,80,0.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(13,39,80,0.045) 1px, transparent 1px);
            background-size: 42px 42px;
            mask-image: radial-gradient(circle at center, black 35%, transparent 90%);
          }

          .signup-grid-light {
            mix-blend-mode: multiply;
          }

          .signup-vignette {
            background: radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.05) 55%, rgba(226,235,248,0.18) 100%);
          }

          .signup-vignette-light {
            mix-blend-mode: screen;
          }

          .signup-flow-camera,
          .signup-network,
          .signup-validation,
          .signup-success-panel {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .signup-flow-camera.is-zooming .signup-flow-ui {
            animation: ui-zoom 1.6s ease-in forwards;
            transform-origin: center center;
          }

          .signup-flow-camera.is-network .signup-flow-ui,
          .signup-flow-camera.is-verify .signup-flow-ui,
          .signup-flow-camera.is-success .signup-flow-ui {
            opacity: 0;
          }

          .signup-flow-ui {
            width: 100%;
            height: 100%;
            max-width: none;
            transition: opacity 0.6s ease;
          }

          .signup-success-card h1 {
            color: #0f172a;
            font-weight: 700;
            letter-spacing: -0.03em;
          }

          .signup-success-card p {
            margin-top: 0.65rem;
            color: rgba(51,65,85,0.84);
            max-width: 50rem;
            line-height: 1.7;
          }

          .signup-network {
            opacity: 0;
            transition: opacity 0.5s ease;
          }

          .signup-network.is-live {
            opacity: 1;
            animation: network-drift 0.8s ease-out both;
          }

          .signup-network-line {
            position: absolute;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(59,130,246,0.95), rgba(168,85,247,0.8), transparent);
            filter: drop-shadow(0 0 10px rgba(59,130,246,0.6));
            opacity: 0.9;
          }

          .signup-network-line-a { width: 26vw; top: 44%; left: 11%; transform: rotate(-18deg); }
          .signup-network-line-b { width: 31vw; top: 37%; right: 8%; transform: rotate(22deg); }
          .signup-network-line-c { width: 27vw; top: 60%; left: 12%; transform: rotate(14deg); }
          .signup-network-line-d { width: 25vw; top: 56%; right: 12%; transform: rotate(-14deg); }

          .signup-node {
            position: absolute;
            border-radius: 999px;
            background: radial-gradient(circle, #dbeafe 0%, #60a5fa 24%, #7c3aed 62%, rgba(124,58,237,0.2) 100%);
            box-shadow: 0 0 22px rgba(59,130,246,0.5), 0 0 36px rgba(147,51,234,0.3);
            animation: node-pulse 1.8s ease-in-out infinite;
          }

          .signup-node-core { width: 148px; height: 148px; left: 50%; top: 46%; transform: translate(-50%, -50%); }
          .signup-node-a { width: 44px; height: 44px; left: 13%; top: 28%; animation-delay: 0.1s; }
          .signup-node-b { width: 38px; height: 38px; right: 14%; top: 28%; animation-delay: 0.4s; }
          .signup-node-c { width: 40px; height: 40px; left: 18%; bottom: 22%; animation-delay: 0.8s; }
          .signup-node-d { width: 36px; height: 36px; right: 18%; bottom: 23%; animation-delay: 1.1s; }

          .signup-particle {
            position: absolute;
            width: 14px;
            height: 14px;
            border-radius: 999px;
            background: linear-gradient(135deg, #e0f2fe, #38bdf8 40%, #8b5cf6 100%);
            box-shadow: 0 0 14px rgba(56,189,248,0.8);
            animation: particle-flow 2.6s linear infinite;
          }

          .signup-particle-1 { top: 45%; left: 18%; }
          .signup-particle-2 { top: 36%; right: 16%; animation-delay: 0.6s; }
          .signup-particle-3 { top: 59%; left: 24%; animation-delay: 1.1s; }
          .signup-particle-4 { top: 55%; right: 22%; animation-delay: 1.4s; }

          .signup-lock {
            position: absolute;
            font-size: 1.25rem;
            filter: drop-shadow(0 0 16px rgba(96,165,250,0.7));
            opacity: 0.85;
          }

          .signup-lock-left { left: 10%; top: 22%; }
          .signup-lock-right { right: 10%; bottom: 20%; }

          .signup-pulse-ring {
            position: absolute;
            left: 50%;
            top: 46%;
            width: 228px;
            height: 228px;
            margin-left: -114px;
            margin-top: -114px;
            border-radius: 999px;
            border: 1px solid rgba(0,197,164,0.55);
            opacity: 0;
          }

          .signup-pulse-ring.is-active {
            animation: pulse-ring 1.4s ease-out infinite;
          }

          .signup-success-panel {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
            transition: opacity 0.5s ease, transform 0.5s ease;
          }

          .signup-success-panel.is-visible {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          .signup-success-card {
            width: min(96vw, 1120px);
            text-align: center;
            border-radius: 42px;
            padding: clamp(34px, 4vw, 64px) clamp(28px, 4vw, 72px);
            background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(244,248,255,0.94));
            border: 1px solid rgba(134,239,172,0.18);
            box-shadow: 0 32px 120px rgba(15,23,42,0.12), 0 0 0 1px rgba(255,255,255,0.7);
          }

          .signup-success-tick {
            width: 132px;
            height: 132px;
            margin: 0 auto 26px;
            border-radius: 999px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #10b981;
            background: radial-gradient(circle, rgba(34,197,94,0.20), rgba(34,197,94,0.03));
            box-shadow: 0 0 0 1px rgba(134,239,172,0.22), 0 0 44px rgba(34,197,94,0.18);
            animation: success-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          }

          .signup-success-tick svg {
            width: 68px;
            height: 68px;
          }

          .signup-success-overlay .signup-flow-camera {
            perspective: 1400px;
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
