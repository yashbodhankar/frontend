"use client";

import { useState } from "react";
import Link from "next/link";

export default function InterviewResultsPage() {
  const [sessionComplete] = useState(true);

  // Mock interview session data
  const sessionData = {
    date: "Today",
    duration: "12:34",
    questionsAnswered: 5,
    overallScore: 78,
    strengths: [
      "Excellent use of the STAR method",
      "Good eye contact and body language",
      "Clear and concise communication",
    ],
    improvements: [
      "Add more quantifiable metrics",
      "Reduce filler words",
      "Provide more specific examples",
    ],
    questionBreakdown: [
      { 
        question: "Tell me about yourself", 
        score: 82, 
        feedback: "Great summary! Maybe add more about recent achievements." 
      },
      { 
        question: "What are your greatest strengths?", 
        score: 85, 
        feedback: "Excellent examples and confidence." 
      },
      { 
        question: "Describe a time you overcame a challenge", 
        score: 75, 
        feedback: "Good story structure, but be more specific about your role." 
      },
      { 
        question: "Why are you interested in this role?", 
        score: 72, 
        feedback: "Research the company more deeply." 
      },
      { 
        question: "Where do you see yourself in 5 years?", 
        score: 76, 
        feedback: "Good long-term thinking, connect it more to this role." 
      },
    ],
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-400";
    if (score >= 70) return "from-yellow-500 to-yellow-400";
    return "from-red-500 to-red-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 70) return "Good";
    return "Needs Work";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            Interview Results
          </h1>
          <p className="text-sm text-muted">
            One-on-one video interview session
          </p>
        </div>
        <Link
          href="/app/interviews"
          className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-[var(--foreground)] hover:bg-[var(--surface-2)] transition-all"
        >
          ← Back to Interviews
        </Link>
      </div>

      {sessionComplete && (
        <>
          {/* Video Call Summary Card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted mb-1">Video Call Session</div>
                <h2 className="text-xl font-semibold text-[var(--foreground)]">
                  One-on-One Interview
                </h2>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                  <span>📹</span>
                  <span>Recorded {sessionData.date}</span>
                  <span>•</span>
                  <span>⏱️ {sessionData.duration}</span>
                  <span>•</span>
                  <span>5 Questions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Score */}
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="text-xs text-muted mb-2">Overall Score</div>
            <div className={`text-6xl font-bold bg-gradient-to-r ${getScoreColor(sessionData.overallScore)} bg-clip-text text-transparent mb-2`}>
              {sessionData.overallScore}%
            </div>
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
              sessionData.overallScore >= 80 ? "bg-green-500/10 text-green-500" :
              sessionData.overallScore >= 70 ? "bg-yellow-500/10 text-yellow-500" :
              "bg-red-500/10 text-red-500"
            }`}>
              {getScoreLabel(sessionData.overallScore)}
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">✅</span>
                <h3 className="text-base font-semibold text-[var(--foreground)]">Strengths</h3>
              </div>
              <ul className="space-y-3">
                {sessionData.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-green-500">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📈</span>
                <h3 className="text-base font-semibold text-[var(--foreground)]">Areas to Improve</h3>
              </div>
              <ul className="space-y-3">
                {sessionData.improvements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-yellow-500">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Question Breakdown */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">📋</span>
              <h3 className="text-base font-semibold text-[var(--foreground)]">Question Breakdown</h3>
            </div>
            <div className="space-y-4">
              {sessionData.questionBreakdown.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[var(--surface-2)]/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[var(--foreground)]">
                        {idx + 1}. {item.question}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`text-lg font-bold bg-gradient-to-r ${getScoreColor(item.score)} bg-clip-text text-transparent`}>
                        {item.score}%
                      </div>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(item.score)}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-muted">
                    {item.feedback}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Link
              href="/app/interviews/call"
              className="flex-1 inline-flex h-14 items-center justify-center rounded-2xl bg-[var(--accent)] px-6 text-base font-semibold text-white hover:opacity-90 transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Practice Again
            </Link>
            <Link
              href="/app/dashboard"
              className="flex-1 inline-flex h-14 items-center justify-center rounded-2xl bg-[var(--surface-2)] px-6 text-base font-semibold text-[var(--foreground)] hover:bg-[var(--surface-3)] transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-1 4a1 1 0 001-1v-4a1 1 0 011-1h3a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
