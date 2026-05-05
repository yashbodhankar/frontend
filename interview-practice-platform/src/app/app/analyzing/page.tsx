"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AnalyzingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const analysisSteps = [
    { label: "Extracting experience", icon: "📋" },
    { label: "Identifying skills", icon: "🛠️" },
    { label: "Analyzing achievements", icon: "🏆" },
    { label: "Generating questions", icon: "❓" },
    { label: "Personalizing feedback", icon: "✨" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalysisComplete(true);
          setTimeout(() => {
            router.replace("/app/dashboard");
          }, 2000);
          return 100;
        }
        const increment = Math.random() * 8 + 4;
        const newProgress = prev + increment;
        const stepIndex = Math.floor((newProgress / 100) * analysisSteps.length);
        setCurrentStep(Math.min(stepIndex, analysisSteps.length - 1));
        return Math.min(newProgress, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="space-y-12">
      {/* Main analyzing visualization */}
      <div className="relative flex flex-col items-center justify-center py-8">
        {/* Circular progress container */}
        <div className="relative w-48 h-48">
          {/* Background glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-2)]/20 blur-xl animate-pulse" />
          
          {/* SVG Progress ring */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="var(--surface-2)"
              strokeWidth="6"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.83} 283`}
              className="transition-all duration-300"
              style={{
                filter: "drop-shadow(0 0 8px var(--accent))",
              }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent-2)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {analysisComplete ? (
              <div className="text-center animate-scale-in">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent)] mb-2">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[var(--accent-2)]">Complete!</p>
              </div>
            ) : (
              <>
                <div className="text-4xl font-bold text-[var(--foreground)] mb-1">
                  {Math.round(progress)}%
                </div>
                <p className="text-xs text-muted">Analyzing</p>
              </>
            )}
          </div>

          {/* Orbiting dots */}
          {!analysisComplete && (
            <>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
                <div className="w-3 h-3 rounded-full bg-[var(--accent)] animate-ping" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-2)] animate-pulse" />
              </div>
            </>
          )}
        </div>

        {/* Status message */}
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
            {analysisComplete 
              ? "Analysis Complete!" 
              : analysisSteps[currentStep].label
            }
          </h2>
          <p className="text-sm text-muted">
            {analysisComplete 
              ? "Redirecting to your dashboard..." 
              : "Please wait while we personalize your experience"
            }
          </p>
        </div>
      </div>

      {/* Analysis steps visualization */}
      <div className="space-y-4">
        <div className="flex items-center justify-between relative">
          {/* Connection line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-[var(--surface-2)] -z-10" />
          
          {analysisSteps.map((step, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center gap-2 transition-all duration-500 ${
                index <= currentStep 
                  ? "opacity-100 scale-100" 
                  : "opacity-40 scale-90"
              }`}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                  index < currentStep
                    ? "bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent)] text-white"
                    : index === currentStep
                      ? "bg-[var(--surface)] border-2 border-[var(--accent)] text-[var(--accent)] animate-bounce-subtle"
                      : "bg-[var(--surface)] border border-[var(--line)] text-muted"
                }`}
              >
                {index < currentStep ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.icon
                )}
              </div>
              <span className="text-xs text-muted hidden sm:block">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats preview cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-xl p-4 text-center animate-float-delay-1">
          <div className="text-2xl font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
            12+
          </div>
          <p className="text-xs text-muted">Skills detected</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center animate-float-delay-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent)] bg-clip-text text-transparent">
            5+
          </div>
          <p className="text-xs text-muted">Years experience</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center animate-float-delay-3">
          <div className="text-2xl font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent-3)] bg-clip-text text-transparent">
            25+
          </div>
          <p className="text-xs text-muted">Questions ready</p>
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted">Analysis progress</span>
          <span className="text-[var(--accent)] font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[var(--surface-2)] overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
