import Link from "next/link";

import { CustomCursor } from "@/components/custom-cursor";
import { ScrollEffects } from "@/components/scroll-effects";
import { SiteHeader } from "@/components/site-header";
import { InterviewCta } from "./login/interview-cta";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 relative overflow-hidden">
      <CustomCursor />
      <ScrollEffects />
      <SiteHeader variant="marketing" />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          data-parallax="-0.08"
          className="absolute -top-28 left-[6%] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(14,102,255,0.48),transparent_68%)] blur-3xl float-animate"
        />
        <div
          data-parallax="-0.12"
          className="absolute top-[24%] right-[8%] h-72 w-72 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(0,197,164,0.36),transparent_70%)] blur-3xl float-animate"
          style={{ animationDelay: "0.8s" }}
        />
        <div
          data-parallax="-0.05"
          className="absolute bottom-[8%] left-[38%] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_55%_55%,rgba(255,106,61,0.28),transparent_72%)] blur-3xl float-animate"
          style={{ animationDelay: "1.6s" }}
        />
        <div
          data-parallax="0.03"
          className="absolute -top-12 right-[42%] h-96 w-96 rounded-full bg-[radial-gradient(circle_at_40%_60%,rgba(167,139,250,0.18),transparent_65%)] blur-3xl"
          style={{ animation: "rotate-continuous 45s linear infinite" }}
        />
      </div>

      <main className="flex-1 relative z-10">
        <section className="mx-auto w-full max-w-6xl px-4 pb-8 pt-16 sm:pt-20 relative">
          <div className="grid gap-6 lg:grid-cols-[1.14fr_0.86fr] lg:items-end">
            <div data-reveal className="reveal-on-scroll space-y-7">
              <div className="inline-flex w-fit gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2">
                <span className="animate-pulse h-2 w-2 rounded-full bg-[var(--accent)]" />
                <p className="text-xs uppercase tracking-[0.18em] text-muted font-medium">
                  AI Interview Studio Live
                </p>
              </div>

              <h1 className="max-w-3xl text-5xl font-semibold leading-[0.94] tracking-[-0.03em] sm:text-6xl md:text-7xl">
                Real Interviews.
                <br />
                <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] bg-clip-text text-transparent">
                  Unreal Preparation.
                </span>
              </h1>

              <p className="max-w-xl text-base leading-7 text-muted sm:text-lg">
                Practice with intense, role-based interview flows and get instant AI-backed
                feedback on clarity, structure, and confidence.
              </p>

<div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  data-cursor="Start"
                  className="group inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(14,102,255,0.28)]"
                >
                  Start free
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/login"
                  data-cursor="Enter"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-6 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[0_8px_24px_rgba(15,20,25,0.12)]"
                >
                  Enter platform
                </Link>
              </div>
            </div>

            <div data-reveal className="reveal-on-scroll glass-card rounded-3xl p-5 sm:p-6 tilt-3d">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <span className="text-xs uppercase tracking-[0.16em] text-muted font-medium">Live Preview</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-2 py-0.5 text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-2)] pulse-glow" />
                  Session AI-42
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-3 hover:bg-[var(--surface-3)] transition-colors duration-300">
                  <p className="text-xs text-muted font-medium uppercase tracking-wide">Interviewer asks</p>
                  <p className="mt-1.5 text-sm font-semibold text-[var(--foreground)]">
                    Design a rate limiter for a high-traffic global API.
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3">
                  <p className="text-xs text-muted font-medium uppercase tracking-wide">Answer quality pulse</p>
                  <div className="mt-3 h-2.5 rounded-full bg-[var(--surface-2)] overflow-hidden">
                    <div className="h-2.5 w-3/4 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] animate-pulse" />
                  </div>
                  <div className="mt-2.5 flex gap-3 text-xs text-muted">
                    <span className="font-medium">Clarity <span className="text-[var(--accent)]">84</span></span>
                    <span className="font-medium">Logic <span className="text-[var(--accent-2)]">79</span></span>
                    <span className="font-medium">Confidence <span className="text-[var(--accent-3)]">88</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-7">
          <div className="marquee rounded-full border border-[var(--line)] bg-[var(--surface)] text-sm text-muted">
            <div className="marquee-track">
              AI Feedback Engine - Domain Specific Interviews - Behavioral and System Design -
              Session Replay - Progress Timeline -
            </div>
            <div className="marquee-track" aria-hidden>
              AI Feedback Engine - Domain Specific Interviews - Behavioral and System Design -
              Session Replay - Progress Timeline -
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-6 sm:grid-cols-2 lg:grid-cols-3 relative">
          <article data-reveal className="reveal-on-scroll glass-card rounded-3xl p-6 tilt-3d group cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.16em] text-muted font-medium">Dashboard</p>
                <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">Command center</h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Watch pending goals, recent practice sessions, and execution quality from one panel.
                </p>
              </div>
              <div className="ml-4 h-12 w-12 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] opacity-10 group-hover:opacity-20 transition-opacity" />
            </div>
          </article>

          <article data-reveal className="reveal-on-scroll glass-card rounded-3xl p-6 tilt-3d group cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.16em] text-muted font-medium">Analytics</p>
                <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">Growth map</h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Measure confidence, correctness, and communication quality across every round.
                </p>
              </div>
              <div className="ml-4 h-12 w-12 rounded-lg bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-3)] opacity-10 group-hover:opacity-20 transition-opacity" />
            </div>
          </article>

          <article data-reveal className="reveal-on-scroll glass-card rounded-3xl p-6 tilt-3d group cursor-pointer sm:col-span-2 lg:col-span-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.16em] text-muted font-medium">Interviews</p>
                <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">Session flow</h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Run mock sessions now and connect your video interview backend when ready.
                </p>
              </div>
              <div className="ml-4 h-12 w-12 rounded-lg bg-gradient-to-br from-[var(--accent-3)] to-[var(--accent-4)] opacity-10 group-hover:opacity-20 transition-opacity" />
            </div>
          </article>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-20">
          <div
            data-reveal
            className="reveal-on-scroll glass-card relative overflow-hidden rounded-3xl p-7 sm:p-10 group"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                data-parallax="0.05"
                className="absolute -right-24 -top-24 h-56 w-56 rounded-full border border-[var(--line-strong)] opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                style={{ animation: "rotate-continuous 35s linear infinite" }}
              />
              <div
                data-parallax="0.08"
                className="absolute -bottom-32 left-1/3 h-64 w-64 -translate-x-1/2 rounded-full border border-[var(--line)] opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                style={{ animation: "rotate-continuous -25s linear infinite" }}
              />
              <div className="absolute top-6 right-6 h-3 w-3 rounded-full bg-[var(--accent-2)] opacity-60 animate-pulse" />
              <div className="absolute bottom-10 right-12 h-2 w-2 rounded-full bg-[var(--accent)] opacity-40 bounce-subtle" />
            </div>

            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.16em] text-muted font-medium">Launch faster</p>
              <h3 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl text-[var(--foreground)]">
                Your structure is ready. Now the experience feels alive.
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
                Smooth reveal transitions on scroll, strong visual depth, 3D perspective effects, and interactive cursor
                behavior are now baked in for a premium first impression.
              </p>
            </div>
          </div>
</section>
      </main>

        <InterviewCta />
      </div>
    );
}
