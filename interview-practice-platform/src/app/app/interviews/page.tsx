"use client";

import Link from "next/link";

export default function InterviewsPage() {
  const sessions = [
    {
      id: 1,
      question: "Tell me about yourself",
      date: "Today",
      time: "3m 45s",
      score: 78,
      feedback: "Good structure, improve pacing"
    },
    {
      id: 2,
      question: "Your greatest weakness",
      date: "Yesterday",
      time: "4m 12s",
      score: 85,
      feedback: "Excellent self-awareness and solutions"
    },
    {
      id: 3,
      question: "Why this company",
      date: "2 days ago",
      time: "2m 58s",
      score: 72,
      feedback: "Add more specific company details"
    },
    {
      id: 4,
      question: "Team conflict resolution",
      date: "3 days ago",
      time: "5m 10s",
      score: 88,
      feedback: "Strong STAR methodology"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">Interviews</h1>
        <p className="text-sm text-muted">
          Practice mock interviews and track your progress with AI feedback.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-4 bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent-2)]/5 border border-[var(--accent)]/20">
        <h2 className="text-base font-semibold text-[var(--foreground)] mb-2">How to Practice</h2>
        <ol className="text-sm text-muted space-y-1.5 list-decimal list-inside">
          <li>Click <span className="font-semibold text-[var(--accent)]">"Start Now"</span> to begin a new interview session</li>
          <li>You&apos;ll be connected with our AI interviewer for a real-time mock interview</li>
          <li>Answer questions aloud while the AI evaluates your responses</li>
          <li>Receive instant feedback and tips to improve your answers</li>
          <li>Review past sessions to track your progress over time</li>
        </ol>
      </div>

      <div className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-[var(--foreground)]">Start a new interview session</div>
            <div className="mt-0.5 text-sm text-muted">
              Practice with AI feedback and track improvements.
            </div>
          </div>
          <Link
            href="/app/interviews/call"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--accent)] px-4 text-sm font-semibold text-white hover:-translate-y-0.5 transition-all hover:shadow-md"
          >
            Start Now
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">Recent Sessions</h2>
        <div className="glass-card rounded-2xl overflow-hidden divide-y divide-[var(--line)]">
          {sessions.map((session) => (
            <div key={session.id} className="p-4 hover:bg-[var(--surface-2)]/40 transition-colors cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-[var(--foreground)]">{session.question}</div>
                  <div className="text-xs text-muted mt-1">{session.date} ��� {session.time}</div>
                  <div className="text-xs text-muted mt-1.5 italic">💡 {session.feedback}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-2)]/10 px-3 py-1.5">
                    <span className="text-sm font-bold text-[var(--accent)]">{session.score}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
