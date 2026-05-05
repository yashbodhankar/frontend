"use client";

import { useState } from "react";
import Link from "next/link";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week");
  
  const skills = [
    { name: "Behavioral", score: 82, category: "soft-skills" },
    { name: "Technical", score: 75, category: "hard-skills" },
    { name: "Problem Solving", score: 88, category: "hard-skills" },
    { name: "Communication", score: 79, category: "soft-skills" },
    { name: "Leadership", score: 71, category: "soft-skills" },
    { name: "System Design", score: 68, category: "hard-skills" },
  ];

  const metrics = [
    { label: "Accuracy", value: 79, unit: "%", change: "+3%", color: "from-blue-500 to-cyan-500", trend: "up" },
    { label: "Pace", value: 82, unit: "%", change: "+5%", color: "from-green-500 to-emerald-500", trend: "up" },
    { label: "Confidence", value: 75, unit: "%", change: "-2%", color: "from-purple-500 to-pink-500", trend: "down" },
    { label: "Consistency", value: 88, unit: "%", change: "+8%", color: "from-orange-500 to-amber-500", trend: "up" },
  ];

  const weeklyProgress = [
    { day: "Mon", score: 72 },
    { day: "Tue", score: 76 },
    { day: "Wed", score: 81 },
    { day: "Thu", score: 78 },
    { day: "Fri", score: 85 },
    { day: "Sat", score: 82 },
    { day: "Sun", score: 79 },
  ];

  const maxScore = Math.max(...weeklyProgress.map(d => d.score));

  const improvements = [
    { title: "STAR Method", progress: 85, description: "Structure your answers effectively" },
    { title: "Body Language", progress: 72, description: "Maintain eye contact and posture" },
    { title: "Pace Control", progress: 68, description: "Don't speak too fast" },
    { title: "Specific Examples", progress: 90, description: "Use concrete examples" },
  ];

  // Additional metrics for Gurully-like dashboard
  const sessionHistory = [
    { id: 1, title: "Tell me about yourself", date: "Today", score: 78, duration: "3m 45s", type: "behavioral" },
    { id: 2, title: "Your greatest weakness", date: "Yesterday", score: 85, duration: "4m 12s", type: "behavioral" },
    { id: 3, title: "Why this company", date: "2 days ago", score: 72, duration: "2m 58s", type: "company" },
    { id: 4, title: "Array of products", date: "3 days ago", score: 68, duration: "5m 20s", type: "technical" },
    { id: 5, title: "Design a URL shortener", date: "4 days ago", score: 75, duration: "6m 10s", type: "system-design" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">Analytics</h1>
          <p className="text-sm text-muted mt-1">
            Track your performance and identify areas for improvement.
          </p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-[var(--surface-2)]">
          {["week", "month", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === range
                  ? "bg-[var(--accent)] text-white"
                  : "text-muted hover:text-[var(--foreground)]"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted font-semibold uppercase tracking-wider">{metric.label}</div>
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${metric.color} opacity-20 group-hover:opacity-30 transition-opacity flex items-center justify-center`}>
                <div className="text-lg">
                  {idx === 0 && "🎯"}
                  {idx === 1 && "⚡"}
                  {idx === 2 && "💪"}
                  {idx === 3 && "📈"}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <div className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, var(--${idx === 0 || idx === 2 ? 'accent' : idx === 1 ? 'accent-2' : 'accent-3'}), transparent)` }}>
                {metric.value}
              </div>
              <div className="text-sm text-muted">{metric.unit}</div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] transition-all" 
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-[var(--foreground)]">Skill Breakdown</h2>
              <p className="text-xs text-muted mt-0.5">Performance by category</p>
            </div>
          </div>
          <div className="space-y-4">
            {skills.map((skill, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      skill.category === "soft-skills" ? "bg-purple-500" : "bg-blue-500"
                    }`} />
                    <span className="text-sm font-medium text-[var(--foreground)]">{skill.name}</span>
                  </div>
                  <span className="text-sm font-bold text-[var(--foreground)]">{skill.score}%</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      skill.score >= 80 ? "bg-gradient-to-r from-green-500 to-green-400" :
                      skill.score >= 70 ? "bg-gradient-to-r from-yellow-500 to-yellow-400" :
                      "bg-gradient-to-r from-red-500 to-red-400"
                    }`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-[var(--foreground)]">Weekly Performance</h2>
            <p className="text-xs text-muted mt-0.5">Average score per day</p>
          </div>
          <div className="flex items-end justify-between gap-2 h-48">
            {weeklyProgress.map((day, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full rounded-t-lg bg-gradient-to-t from-[var(--accent)] to-[var(--accent-2)] transition-all hover:shadow-lg hover:shadow-[var(--accent)]/20"
                  style={{ height: `${(day.score / maxScore) * 100}%` }}
                />
                <div className="text-xs font-semibold text-muted">{day.day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold text-[var(--foreground)] mb-4">Areas for Improvement</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {improvements.map((item, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-4 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[var(--foreground)]">{item.title}</span>
                <span className={`text-sm font-bold ${
                  item.progress >= 80 ? "text-green-500" :
                  item.progress >= 70 ? "text-yellow-500" :
                  "text-red-500"
                }`}>{item.progress}%</span>
              </div>
              <p className="text-xs text-muted mb-3">{item.description}</p>
              <div className="h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    item.progress >= 80 ? "bg-green-500" :
                    item.progress >= 70 ? "bg-yellow-500" :
                    "bg-red-500"
                  }`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

<div className="grid gap-3 sm:grid-cols-3">
        <div className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all">
          <div className="text-xs text-muted font-semibold uppercase tracking-wide">Total sessions</div>
          <div className="mt-3 text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">12</div>
          <div className="mt-2 text-xs text-[var(--accent)] font-medium">+3 this week</div>
        </div>
        <div className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all">
          <div className="text-xs text-muted font-semibold uppercase tracking-wide">Best score</div>
          <div className="mt-3 text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">92%</div>
          <div className="mt-2 text-xs text-muted">"Why this company"</div>
        </div>
        <div className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all">
          <div className="text-xs text-muted font-semibold uppercase tracking-wide">Total time</div>
          <div className="mt-3 text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">2h 14m</div>
          <div className="mt-2 text-xs text-muted">Practice time invested</div>
        </div>
      </div>

      {/* Session History Section - Gurully-like */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Recent Sessions</h2>
            <p className="text-xs text-muted mt-0.5">Your practice history</p>
          </div>
          <Link href="/app/interviews" className="text-xs text-[var(--accent)] hover:underline">
            View all →
          </Link>
        </div>
        <div className="glass-card rounded-2xl overflow-hidden divide-y divide-[var(--line)]">
          {sessionHistory.map((session) => (
            <div key={session.id} className="p-4 hover:bg-[var(--surface-2)]/40 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-[var(--foreground)]">{session.title}</div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                    <span>{session.date}</span>
                    <span>•</span>
                    <span>{session.duration}</span>
                    <span>•</span>
                    <span className="capitalize">{session.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center justify-center rounded-lg px-3 py-1.5 ${
                    session.score >= 80 ? "bg-green-500/10" :
                    session.score >= 70 ? "bg-yellow-500/10" :
                    "bg-red-500/10"
                  }`}>
                    <span className={`text-sm font-bold ${
                      session.score >= 80 ? "text-green-500" :
                      session.score >= 70 ? "text-yellow-500" :
                      "text-red-500"
                    }`}>{session.score}%</span>
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
