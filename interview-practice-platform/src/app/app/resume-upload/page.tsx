"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ResumeUploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile && (selectedFile.type === "application/pdf" || 
        selectedFile.name.endsWith(".doc") || selectedFile.name.endsWith(".docx"))) {
      setFile(selectedFile);
      setUploadProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Redirect to analyzing page
          router.replace("/app/analyzing");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const skipAndContinue = () => {
    router.replace("/app/dashboard");
  };

  return (
    <div className="space-y-8">
      {/* Header with animation */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] mb-4 float-animate">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Upload Your Resume
        </h1>
        <p className="text-muted max-w-md mx-auto">
          Upload your resume to get personalized interview questions based on your experience and skills
        </p>
      </div>

      {/* File drop zone */}
      <div 
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${
          dragOver 
            ? "border-[var(--accent)] bg-[var(--accent)]/5 scale-[1.02]" 
            : file
              ? "border-[var(--accent-2)] bg-[var(--accent-2)]/5"
              : "border-[var(--line)] hover:border-[var(--accent)]"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[var(--accent)]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[var(--accent-2)]/10 blur-3xl" />
        </div>

        <div className="relative p-8">
          {file ? (
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)]">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[var(--accent-2)]/20 to-[var(--accent)]/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--accent-2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">{file.name}</p>
                  <p className="text-xs text-muted">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <button 
                  onClick={() => setFile(null)}
                  className="p-2 rounded-lg hover:bg-[var(--surface-2)] transition-colors"
                >
                  <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div 
              className="text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-2)]/10 mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 11-8 0 4 4 0 018 0zM12 9V4m0 0l3 3m-3-3L9 7" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-[var(--foreground)] mb-2">
                Drop your resume here
              </p>
              <p className="text-sm text-muted mb-4">
                or click to browse (PDF, DOC, DOCX)
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure upload
                </span>
                <span>•</span>
                <span>AI-powered analysis</span>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          />
        </div>
      </div>

      {/* Progress bar when uploading */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--foreground)]">Analyzing your resume...</span>
            <span className="text-[var(--accent)] font-medium">{uploadProgress}%</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-1 text-sm text-muted">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      {!isUploading && (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={simulateUpload}
            disabled={!file}
            className="flex-1 inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-4 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-[var(--accent)]/20"
          >
            {file ? "Analyze Resume" : "Select a file first"}
          </button>
          <button
            onClick={skipAndContinue}
            className="flex-1 inline-flex h-12 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 text-sm font-medium text-muted hover:text-[var(--foreground)] hover:bg-[var(--surface-2)] transition-all"
          >
            Skip for now
          </button>
        </div>
      )}

      {/* Features showcase */}
      <div className="grid gap-4 sm:grid-cols-3 pt-4">
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--accent)]/10 mb-3">
            <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-[var(--foreground)]">Quick Analysis</p>
          <p className="text-xs text-muted mt-1">Get results in seconds</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--accent-2)]/10 mb-3">
            <svg className="w-5 h-5 text-[var(--accent-2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.372 3.372 0 0018 14.92V16a1 1 0 11-2 0v-.08a3.372 3.372 0 00-1.664-2.668l-.548-.547z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-[var(--foreground)]">Smart Questions</p>
          <p className="text-xs text-muted mt-1">AI-generated based on your profile</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--accent-3)]/10 mb-3">
            <svg className="w-5 h-5 text-[var(--accent-3)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-[var(--foreground)]">Track Progress</p>
          <p className="text-xs text-muted mt-1">Monitor your improvement</p>
        </div>
      </div>
    </div>
  );
}
