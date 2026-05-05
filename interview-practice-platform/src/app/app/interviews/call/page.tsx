"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CallPage() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const questions = [
    "Tell me about yourself",
    "What are your greatest strengths?",
    "Describe a time you overcame a challenge",
    "Why are you interested in this role?",
    "Where do you see yourself in 5 years?",
  ];

  const startSession = () => {
    setIsActive(true);
    setCurrentQuestion(0);
    setTimeElapsed(0);
    setTranscript("");
    setFeedback("");
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setIsListening(true);
    } else {
      setIsRecording(false);
      setIsListening(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTranscript("");
      setFeedback("");
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTranscript("");
      setFeedback("");
    }
  };

const endSession = () => {
    setIsActive(false);
    setIsRecording(false);
    setIsListening(false);
    setIsActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    // Navigate to results page after session ends
    router.push("/app/interviews/results");
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive]);

  useEffect(() => {
    if (isListening && transcript.length > 10) {
      const mockFeedbacks = [
        "Great use of the STAR method! Try to add more specific metrics.",
        "Good pacing. Consider making your answer more concise.",
        "Excellent answer structure!",
        "Try to include more quantifiable achievements.",
        "Good eye contact (virtual). Add more detail about your role.",
      ];
      setFeedback(mockFeedbacks[Math.floor(Math.random() * mockFeedbacks.length)]);
    }
  }, [transcript, isListening]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">Interview Session</h1>
          <p className="text-sm text-muted">
            AI-powered practice with real-time feedback
          </p>
        </div>
        <Link
          href="/app/interviews"
          className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-[var(--foreground)] hover:bg-[var(--surface-2)] transition-all"
        >
          ← Back
        </Link>
      </div>

      {!isActive ? (
        <div className="glass-card rounded-2xl p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center shadow-lg shadow-[var(--accent)]/30">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v2a3 3 0 01-3 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">Ready to Practice?</h2>
          <p className="text-sm text-muted mb-8 max-w-md mx-auto">
            Start a mock interview session with our AI interviewer. You'll receive real-time feedback on your answers.
          </p>
          <button
            onClick={startSession}
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-[var(--accent)] px-10 text-base font-semibold text-white hover:-translate-y-1 transition-all hover:shadow-xl hover:shadow-[var(--accent)]/30"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Interview
          </button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-gray-500"}`} />
                  <span className="text-sm font-medium text-muted">
                    {isRecording ? "Recording..." : "Ready"}
                  </span>
                </div>
                <div className="text-3xl font-mono font-bold text-[var(--foreground)]">
                  {formatTime(timeElapsed)}
                </div>
              </div>

              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className={`w-40 h-40 rounded-full flex items-center justify-center transition-all ${
                    isListening 
                      ? "bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] shadow-[0_0_60px_rgba(0,197,164,0.4)] scale-110" 
                      : "bg-[var(--surface-2)]"
                  }`}>
                    {isListening ? (
                      <svg className="w-16 h-16 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v2a3 3 0 01-3 3z" />
                      </svg>
                    ) : (
                      <svg className="w-16 h-16 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v2a3 3 0 01-3 3z" />
                      </svg>
                    )}
                  </div>
                  {isListening && (
                    <div className="absolute inset-0 rounded-full border-4 border-[var(--accent)]/30 animate-ping" />
                  )}
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-xs text-muted mb-2">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                <h2 className="text-xl font-semibold text-[var(--foreground)]">
                  {questions[currentQuestion]}
                </h2>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={toggleRecording}
                  className={`p-4 rounded-full transition-all ${
                    isRecording 
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/30" 
                      : "bg-[var(--accent)] text-white hover:shadow-lg hover:shadow-[var(--accent)]/30"
                  }`}
                >
                  {isRecording ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="6" width="12" height="12" rx="2" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v2a3 3 0 01-3 3z" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="flex-1 inline-flex h-12 items-center justify-center rounded-xl bg-[var(--surface-2)] text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--surface-3)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button
                  onClick={nextQuestion}
                  disabled={currentQuestion >= questions.length - 1}
                  className="flex-1 inline-flex h-12 items-center justify-center rounded-xl bg-[var(--surface-2)] text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--surface-3)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>

              <button
                onClick={endSession}
                className="w-full mt-3 inline-flex h-12 items-center justify-center rounded-xl bg-red-500/10 text-sm font-semibold text-red-500 hover:bg-red-500/20 transition-colors"
              >
                End Session
              </button>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Live Transcript</h3>
              <div className="h-24 rounded-xl bg-[var(--surface-2)]/50 p-4 overflow-y-auto">
                <p className="text-sm text-muted">
                  {transcript || "Your speech will appear here when you start recording..."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Real-time Feedback</h3>
              <div className={`p-4 rounded-xl ${
                feedback ? "bg-green-500/10 border border-green-500/20" : "bg-[var(--surface-2)]/50"
              }`}>
                <p className="text-sm text-muted">
                  {feedback || "Start speaking to receive feedback..."}
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Session Tips</h3>
              <ul className="text-sm text-muted space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)]">📹</span>
                  Maintain eye contact with the camera
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)]">🎯</span>
                  Use the STAR method for behavioral questions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)]">⏱️</span>
                  Aim for 1-2 minute responses
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)]">💪</span>
                  Be confident and show enthusiasm
                </li>
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface-2)]/50">
                  <span className="text-xs text-muted">Questions Answered</span>
                  <span className="text-sm font-semibold text-[var(--foreground)]">{currentQuestion + 1}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface-2)]/50">
                  <span className="text-xs text-muted">Estimated Score</span>
                  <span className={`text-sm font-semibold ${getScoreColor(78)}`}>78%</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface-2)]/50">
                  <span className="text-xs text-muted">Session Time</span>
                  <span className="text-sm font-semibold text-[var(--foreground)]">{formatTime(timeElapsed)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
