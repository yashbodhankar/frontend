"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const userName = "John"; // Would come from user profile in full implementation

  const quickActions = [
    { 
      title: "Behavioral", 
      desc: "Practice common behavioral questions",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 18H4a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V18zM9 18a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      href: "/app/interviews",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500"
    },
{ 
      title: "Technical", 
      desc: "Practice coding & technical questions",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      href: "/app/interviews",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-500"
    },
    { 
      title: "System Design", 
      desc: "Practice architecture questions",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      href: "/app/interviews",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-500"
    },
    { 
      title: "Leadership", 
      desc: "Practice management scenarios",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.893 1.69-1.608 1.63l-3.657-1.602c-1.098-.504-1.456-1.842-.565-2.508l2.741-1.977c.891-.642 1.491-1.705.776-2.618l-1.518-4.674c-.3-.922-.893-1.69-1.608-1.63l-3.657 1.602c-1.098.504-1.456 1.842-.565 2.508l2.741 1.977c.891.642 1.491 1.705.776 2.618z" />
        </svg>
      ),
      href: "/app/interviews",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500"
    },
  ];

  const recentSessions = [
    { id: 1, title: "Tell me about yourself", date: "Today", score: 78, duration: "3m 45s", type: "behavioral" },
    { id: 2, title: "Your greatest weakness", date: "Yesterday", score: 85, duration: "4m 12s", type: "behavioral" },
    { id: 3, title: "Why this company", date: "2 days ago", score: 72, duration: "2m 58s", type: "company" },
    { id: 4, title: "Array of products", date: "3 days ago", score: 68, duration: "5m 20s", type: "technical" },
  ];

const achievements = [
    { title: "5 Day Streak", icon: "🔥", date: "Today", color: "from-orange-500" },
    { title: "10 Sessions", icon: "🎯", date: "This week", color: "from-blue-500" },
    { title: "Top Performer", icon: "⭐", date: "Yesterday", color: "from-yellow-500" },
  ];

  // Daily practice tips
  const practiceTips = [
    { tip: "Use the STAR method for behavioral questions", category: "Behavioral" },
    { tip: "Think aloud during technical problems", category: "Technical" },
    { tip: "Maintain eye contact and body language", category: "Communication" },
  ];

const stats = [
    { label: "Total interviews", value: "12", change: "+3 this week", color: "from-blue-500" },
    { label: "Avg score", value: "79%", change: "+5% improvement", color: "from-green-500" },
    { label: "Streak", value: "5", change: "days in a row", color: "from-teal-500" },
  ];

  // Areas that need improvement based on performance
  const areasToImprove = [
    { name: "System Design", score: 58, status: "needs-work", icon: "🏗️" },
    { name: "Leadership", score: 68, status: "moderate", icon: "👔" },
    { name: "Behavioral", score: 85, status: "strong", icon: "💬" },
  ];

  // Skill sets with proficiency levels
const skillSets = [
    { name: "Problem Solving", level: "Advanced", progress: 88, color: "from-green-500" },
    { name: "Communication", level: "Advanced", progress: 82, color: "from-blue-500" },
    { name: "Technical", level: "Intermediate", progress: 75, color: "from-teal-500" },
    { name: "Time Management", level: "Intermediate", progress: 70, color: "from-orange-500" },
    { name: "Code Quality", level: "Beginner", progress: 55, color: "from-red-500" },
  ];

  // Interview dates for calendar (simulated data)
  const interviewDates = [
    new Date(2024, 1, 1),  // Feb 1
    new Date(2024, 1, 2),  // Feb 2
    new Date(2024, 1, 3),  // Feb 3
    new Date(2024, 1, 5),  // Feb 5
    new Date(2024, 1, 7),  // Feb 7
    new Date(2024, 1, 8),  // Feb 8
    new Date(2024, 1, 10), // Feb 10
    new Date(2024, 1, 12), // Feb 12
    new Date(2024, 1, 14), // Feb 14
    new Date(2024, 1, 15), // Feb 15
    new Date(2024, 1, 17), // Feb 17
    new Date(2024, 1, 20), // Feb 20
  ];

// Calendar helper functions
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  const currentYear = 2024;
  const currentMonth = 1; // February
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Check if a date has an interview
  const hasInterview = (day: number) => {
    return interviewDates.some(d => d.getDate() === day && d.getMonth() === currentMonth && d.getFullYear() === currentYear);
  };

return (
    <>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]">
              {greeting}, {userName}! 👋
            </h1>
            <p className="text-base sm:text-lg text-muted mt-2 max-w-md">
              Ready to ace your next interview? Let&apos;s practice and improve your skills.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted/75">
              <span className="rounded-full border border-[var(--line)]/70 bg-white/70 px-3 py-1 shadow-sm dark:bg-black/20">Focus mode</span>
              <span className="rounded-full border border-[var(--line)]/70 bg-white/70 px-3 py-1 shadow-sm dark:bg-black/20">Daily streak active</span>
              <span className="rounded-full border border-[var(--line)]/70 bg-white/70 px-3 py-1 shadow-sm dark:bg-black/20">AI feedback ready</span>
            </div>
          </div>
          <Link
            href="/app/interviews/call"
            className="group relative inline-flex h-12 sm:h-14 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[var(--accent)] via-blue-600 to-[var(--accent-2)] px-6 sm:px-8 text-sm sm:text-base font-semibold text-white shadow-lg shadow-[var(--accent)]/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[var(--accent)]/40"
          >
            <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
            <svg className="w-5 h-5 mr-2.5 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v2a3 3 0 01-3 3z" />
            </svg>
            <span className="relative z-10">Start Practice</span>
          </Link>
        </div>

        <div className="glass-card rounded-2xl border border-white/50 bg-gradient-to-r from-[var(--accent)]/10 via-blue-500/5 to-[var(--accent-2)]/10 p-5 backdrop-blur-md dark:border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Today&apos;s Focus</p>
              <p className="mt-1 text-sm sm:text-base font-semibold text-[var(--foreground)]">Run 1 behavioral + 1 technical round to maintain momentum.</p>
            </div>
            <Link href="/app/interviews" className="inline-flex h-10 items-center justify-center rounded-xl border border-[var(--accent)]/20 bg-white/70 px-4 text-sm font-semibold text-[var(--accent)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:bg-white dark:bg-black/20">
              Open interview sets
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-6 sm:p-7 hover:shadow-xl hover:border-[var(--accent)]/30 transition-all duration-300 group backdrop-blur-md bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-xs sm:text-sm text-muted font-medium uppercase tracking-wider opacity-75">{stat.label}</div>
                <div className={`mt-3 sm:mt-4 text-3xl sm:text-5xl font-bold bg-gradient-to-r ${stat.color} to-transparent bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-[var(--accent)] font-semibold opacity-90">{stat.change}</div>
              </div>
              <div className={`h-14 sm:h-16 w-14 sm:w-16 rounded-2xl bg-gradient-to-br ${stat.color} to-transparent opacity-15 group-hover:opacity-25 transition-opacity duration-300 flex items-center justify-center flex-shrink-0`}>
                {idx === 0 && (
                  <svg className="w-7 sm:w-8 h-7 sm:h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v2a3 3 0 01-3 3z" />
                  </svg>
                )}
                {idx === 1 && (
                  <svg className="w-7 sm:w-8 h-7 sm:h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )}
{idx === 2 && (
                  <svg className="w-7 sm:w-8 h-7 sm:h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11l11.45-11.45A7.975 7.975 0 0121 13c0 2.418-.457 4.862-1.45 7.107" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

{/* Achievements Section */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 backdrop-blur-md bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-[var(--foreground)]">Achievements</div>
              <div className="text-sm text-muted">Your recent accomplishments</div>
            </div>
          </div>
          <Link href="/app/analytics" className="text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent)]/80 hover:underline transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/50 to-white/20 dark:from-white/5 dark:to-white/2 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/30 dark:border-white/10">
              <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br ${achievement.color} to-transparent flex items-center justify-center text-2xl sm:text-3xl shadow-lg flex-shrink-0`}>
                {achievement.icon}
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-[var(--foreground)]">{achievement.title}</div>
                <div className="text-xs sm:text-sm text-muted">{achievement.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Areas to Improve Section */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 backdrop-blur-md bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-[var(--foreground)]">Areas to Improve</div>
            <div className="text-sm text-muted">Focus on these to boost your score</div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areasToImprove.map((area, idx) => (
            <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white/50 to-white/20 dark:from-white/5 dark:to-white/2 hover:shadow-lg transition-all duration-300 border border-white/30 dark:border-white/10 group hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl sm:text-3xl group-hover:scale-125 transition-transform duration-300">{area.icon}</span>
                <span className={`text-xs sm:text-sm px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  area.status === "needs-work" ? "bg-red-500/20 text-red-600 dark:text-red-400" :
                  area.status === "moderate" ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" :
                  "bg-green-500/20 text-green-600 dark:text-green-400"
                }`}>
                  {area.status === "needs-work" ? "Needs Work" : area.status === "moderate" ? "Moderate" : "Strong"}
                </span>
              </div>
              <div className="text-base sm:text-lg font-bold text-[var(--foreground)] mb-3">{area.name}</div>
              <div className="space-y-2">
                <div className="h-3 rounded-full bg-[var(--surface-2)]/40 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      area.score >= 80 ? "bg-gradient-to-r from-green-400 to-green-500" :
                      area.score >= 70 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" :
                      "bg-gradient-to-r from-red-400 to-red-500"
                    }`}
                    style={{ width: `${area.score}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[var(--foreground)]">{area.score}%</span>
                  <span className="text-xs text-muted">{area.score >= 80 ? "Excellent" : area.score >= 70 ? "Good" : "Work in progress"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Sets Section */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 backdrop-blur-md bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10">
        <div className="flex items-center gap-4 mb-6">
<div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.372 3.372 0 0018 14.92V16a1 1 0 11-2 0v-.08a3.372 3.372 0 00-1.664-2.668l-.548-.547z" />
            </svg>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-[var(--foreground)]">Skill Sets</div>
            <div className="text-sm text-muted">Your proficiency across key skills</div>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {skillSets.map((skill, idx) => (
            <div key={idx} className="text-center p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white/50 to-white/20 dark:from-white/5 dark:to-white/2 hover:shadow-lg transition-all duration-300 border border-white/30 dark:border-white/10 group hover:scale-105 hover:-translate-y-1">
              <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${skill.color} to-transparent mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                {skill.progress}%
              </div>
              <div className="text-base sm:text-lg font-bold text-[var(--foreground)]">{skill.name}</div>
              <div className={`text-xs sm:text-sm mt-2 font-semibold transition-colors ${
                skill.level === "Advanced" ? "text-green-600 dark:text-green-400" :
                skill.level === "Intermediate" ? "text-yellow-600 dark:text-yellow-400" :
                "text-orange-600 dark:text-orange-400"
              }`}>{skill.level}</div>
            </div>
          ))}
        </div>
      </div>

{/* Quick Start Section */}
      <div className="relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-5">Quick Start</h2>
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, idx) => (
            <Link
              key={idx}
              href={action.href}
              className="glass-card group rounded-2xl p-6 sm:p-7 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 backdrop-blur-md bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 hover:border-[var(--accent)]/30"
            >
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${action.color} mb-4 flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                {action.icon}
              </div>
              <div className="text-base sm:text-lg font-bold text-[var(--foreground)]">{action.title}</div>
              <div className="mt-2 text-sm text-muted group-hover:text-[var(--foreground)]/70 transition-colors">{action.desc}</div>
              <div className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Start <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-5 text-2xl sm:text-3xl font-bold text-[var(--foreground)]">Daily Tips</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {practiceTips.map((item, idx) => (
            <div key={idx} className="glass-card rounded-2xl border border-white/50 bg-white/50 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-black/20">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">{item.category}</p>
              <p className="mt-2 text-sm font-medium leading-6 text-[var(--foreground)]">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        {/* Recent Sessions Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-5">Recent Sessions</h2>
          <div className="glass-card rounded-2xl overflow-hidden divide-y divide-white/20 dark:divide-white/5 backdrop-blur-md bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 shadow-lg">
            {recentSessions.map((session) => (
              <div key={session.id} className="p-5 sm:p-6 hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-base sm:text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">{session.title}</div>
                    <div className="mt-2 flex items-center gap-3 text-xs sm:text-sm text-muted">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {session.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {session.duration}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 font-bold transition-all ${
                      session.score >= 80 ? "bg-green-500/20 text-green-600 dark:text-green-400 group-hover:bg-green-500/30" :
                      session.score >= 70 ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 group-hover:bg-yellow-500/30" :
                      "bg-red-500/20 text-red-600 dark:text-red-400 group-hover:bg-red-500/30"
                    }`}>
                      <span className="text-lg sm:text-xl">{session.score}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Link href="/app/interviews" className="block p-5 sm:p-6 text-center text-sm font-semibold text-[var(--accent)] hover:bg-white/50 dark:hover:bg-white/5 transition-colors hover:underline">
              View all sessions →
            </Link>
          </div>
        </div>

        {/* Calendar */}
        <div className="glass-card rounded-2xl p-6 lg:sticky lg:top-24 backdrop-blur-md bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <button className="p-2.5 hover:bg-white/50 dark:hover:bg-white/10 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-[var(--foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-lg sm:text-xl font-bold text-[var(--foreground)]">{monthNames[currentMonth]} {currentYear}</div>
            <button className="p-2.5 hover:bg-white/50 dark:hover:bg-white/10 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-[var(--foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-bold text-muted py-2">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1.5 mb-6">
            {Array.from({ length: firstDay }).map((_, idx) => (
              <div key={`empty-${idx}`} className="aspect-square" />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const hasInterviewDay = hasInterview(day);
              return (
                <div 
                  key={day}
                  className={`aspect-square flex items-center justify-center text-sm font-semibold rounded-lg relative transition-all duration-200 cursor-pointer ${
                    hasInterviewDay 
                      ? "bg-gradient-to-br from-[var(--accent)] to-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-110" 
                      : "text-[var(--foreground)] hover:bg-white/50 dark:hover:bg-white/10"
                  }`}
                >
                  {day}
                  {hasInterviewDay && (
                    <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="pt-6 border-t border-white/20 dark:border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl animate-bounce">🔥</span>
                <div>
                  <div className="text-base sm:text-lg font-bold text-[var(--foreground)]">{interviewDates.length} day streak</div>
                  <div className="text-xs text-muted">Current month</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[var(--accent)] to-blue-500 bg-clip-text text-transparent">{interviewDates.length}</div>
                <div className="text-xs text-muted">interviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>

    </>
  );
}
