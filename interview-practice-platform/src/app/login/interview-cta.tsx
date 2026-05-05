 "use client"

import Link from 'next/link'

export function InterviewCta() {
  return (
    <Link
      href="/app/interviews/call"
      className="fixed bottom-8 right-8 z-50 group cursor-pointer"
    >
      <div className="relative float-animate">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] opacity-0 group-hover:opacity-60 blur-2xl transition-all duration-500 scale-125" />
        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center shadow-2xl shadow-[var(--accent)]/40 group-hover:scale-110 transition-all duration-300 group-hover:shadow-[var(--accent)]/60">
          <div className="w-28 h-28 rounded-full bg-[var(--surface)] flex items-center justify-center border-2 border-[var(--line)] group-hover:border-[var(--accent)]/50 transition-colors">
            <svg className="w-14 h-14 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-[var(--accent)] opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 animate-ping" />
      </div>
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-[var(--accent-2)] opacity-50 animate-ping" />
          <div className="relative rounded-full bg-[var(--accent-2)] px-4 py-1.5 shadow-lg">
            <span className="text-sm font-semibold text-white whitespace-nowrap">
              Give interview here
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
} 
