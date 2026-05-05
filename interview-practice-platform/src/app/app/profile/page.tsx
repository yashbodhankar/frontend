"use client";

import { useState, useRef } from "react";

// Personal details form data interface
interface PersonalDetails {
  // Professional
  title: string;
  company: string;
  yearsExperience: string;
  location: string;
  phone: string;
  // Social
  linkedin: string;
  github: string;
  portfolio: string;
  // Resume
  resumeFile: File | null;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    title: "",
    company: "",
    yearsExperience: "",
    location: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    resumeFile: null,
  });

  // Profile completion percentage
  const filledCount = [
    personalDetails.title,
    personalDetails.company,
    personalDetails.yearsExperience,
    personalDetails.location,
    personalDetails.phone,
    personalDetails.linkedin,
    personalDetails.github,
    personalDetails.portfolio,
  ].filter(f => f && f.toString().trim() !== "").length;
  
  const resumeFileCount = personalDetails.resumeFile ? 1 : 0;
  const profileCompletion = Math.round(((filledCount + resumeFileCount) / 9) * 100);

  const [resumeName, setResumeName] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Accept PDF, DOC, DOCX files
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a PDF or Word document");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setResumeName(file.name);
      setPersonalDetails(prev => ({ ...prev, resumeFile: file }));
    }
  };

  const handleSaveDetails = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert("Profile details saved successfully!");
  };

  const handleInputChange = (field: keyof PersonalDetails, value: string) => {
    setPersonalDetails(prev => ({ ...prev, [field]: value }));
  };

  const userStats = [
    { label: "Member since", value: "Jan 2024", icon: "📅" },
    { label: "Total interviews", value: "12", icon: "🎤" },
    { label: "Total practice time", value: "2h 14m", icon: "⏱️" },
    { label: "Average score", value: "79%", icon: "📊" },
    { label: "Current streak", value: "5 days", icon: "🔥" },
    { label: "Best score", value: "92%", icon: "🏆" },
  ];

  const achievements = [
    { title: "First Interview", date: "Jan 15, 2024", icon: "🎯", color: "from-blue-500 to-cyan-500", description: "Completed your first mock interview" },
    { title: "Streak: 5 days", date: "Feb 2, 2024", icon: "🔥", color: "from-orange-500 to-amber-500", description: "Practiced for 5 consecutive days" },
    { title: "Score: 90%+", date: "Feb 10, 2024", icon: "⭐", color: "from-yellow-500 to-orange-500", description: "Achieved a score of 90% or higher" },
    { title: "Rising Star", date: "Feb 15, 2024", icon: "🌟", color: "from-purple-500 to-pink-500", description: "Improved by more than 10%" },
    { title: "Code Master", date: "Feb 20, 2024", icon: "💻", color: "from-green-500 to-emerald-500", description: "Completed 10 technical interviews" },
    { title: "Leader", date: "Feb 25, 2024", icon: "👑", color: "from-pink-500 to-rose-500", description: "Completed leadership questions" },
  ];

  const skills = [
    { name: "Behavioral", level: "Advanced", progress: 85 },
    { name: "Technical", level: "Intermediate", progress: 72 },
    { name: "System Design", level: "Beginner", progress: 58 },
    { name: "Leadership", level: "Intermediate", progress: 68 },
    { name: "Communication", level: "Advanced", progress: 88 },
    { name: "Problem Solving", level: "Intermediate", progress: 75 },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">Profile</h1>
        <p className="text-sm text-muted">
          Manage your account and view your achievements.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-[var(--accent)]/30">
            JD
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--foreground)]">John Doe</h2>
                <p className="text-sm text-muted mt-1">john@example.com</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:-translate-y-0.5 transition-all hover:shadow-lg hover:shadow-[var(--accent)]/20">
                  Edit Profile
                </button>
                <button className="px-4 py-2 rounded-xl bg-[var(--surface-2)] text-[var(--foreground)] text-sm font-semibold hover:bg-[var(--surface-3)] transition-all">
                  Settings
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--surface-2)] text-sm">
                <span>📅</span>
                <span className="text-muted">Member since Jan 2024</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--surface-2)] text-sm">
                <span>🎤</span>
                <span className="text-muted">12 Sessions</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--surface-2)] text-sm">
                <span>🔥</span>
                <span className="text-muted">5 day streak</span>
              </div>
            </div>
          </div>
        </div>
      </div>

<div className="flex gap-1 p-1 rounded-xl bg-[var(--surface-2)] w-fit">
        {["personal", "overview", "achievements", "skills", "preferences"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-[var(--accent)] text-white"
                : "text-muted hover:text-[var(--foreground)]"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "personal" && (
        <div className="space-y-6">
          {/* Personal Details Form */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <div className="text-base font-semibold text-[var(--foreground)]">Personal Details</div>
                <div className="text-xs text-muted">Help us personalize your interview practice</div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Professional Info */}
              <div className="sm:col-span-2">
                <div className="text-sm font-semibold text-[var(--foreground)] mb-3">Professional Information</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="title">
                  Job Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={personalDetails.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Senior Software Engineer"
                  className="h-11 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 text-sm text-[var(--foreground)] outline-none transition-all focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="company">
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  value={personalDetails.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="e.g., Google"
                  className="h-11 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 text-sm text-[var(--foreground)] outline-none transition-all focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="yearsExperience">
                  Years of Experience
                </label>
                <select
                  id="yearsExperience"
                  value={personalDetails.yearsExperience}
                  onChange={(e) => handleInputChange("yearsExperience", e.target.value)}
                  className="h-11 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 text-sm text-[var(--foreground)] outline-none transition-all focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="location">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={personalDetails.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="e.g., San Francisco, CA"
                  className="h-11 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 text-sm text-[var(--foreground)] outline-none transition-all focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={personalDetails.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="e.g., +1 (555) 123-4567"
                  className="h-11 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 text-sm text-[var(--foreground)] outline-none transition-all focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              {/* Social Links */}
              <div className="sm:col-span-2 mt-4">
                <div className="text-sm font-semibold text-[var(--foreground)] mb-3">Social Links</div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="linkedin">
                  LinkedIn Profile
                </label>
                <input
                  id="linkedin"
                  type="url"
                  value={personalDetails.linkedin}
                  onChange={(e) => handleInputChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="h-11 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 text-sm text-[var(--foreground)] outline-none transition-all focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="github">
                  GitHub Profile
                </label>
                <input
                  id="github"
                  type="url"
                  value={personalDetails.github}
                  onChange={(e) => handleInputChange("github", e.target.value)}
                  placeholder="https://github.com/yourusername"
                  className="h-11 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 text-sm text-[var(--foreground)] outline-none transition-all focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="portfolio">
                  Portfolio Website
                </label>
                <input
                  id="portfolio"
                  type="url"
                  value={personalDetails.portfolio}
                  onChange={(e) => handleInputChange("portfolio", e.target.value)}
                  placeholder="https://yourportfolio.com"
                  className="h-11 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 text-sm text-[var(--foreground)] outline-none transition-all focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent)] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="text-base font-semibold text-[var(--foreground)]">Resume</div>
                <div className="text-xs text-muted">Upload your resume for better practice sessions</div>
              </div>
            </div>

            <div 
              className="border-2 border-dashed border-[var(--line)] rounded-xl p-8 text-center hover:border-[var(--accent)] transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
              {resumeName ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-[var(--foreground)]">{resumeName}</div>
                    <div className="text-xs text-green-500">Click to replace</div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="h-12 w-12 rounded-full bg-[var(--surface-2)] flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-[var(--foreground)]">Click to upload</div>
                  <div className="text-xs text-muted mt-1">PDF, DOC, or DOCX (max 5MB)</div>
                </>
              )}
            </div>
          </div>

          {/* Target Roles */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--accent-3)] to-[var(--accent-4)] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.262 23.262 0 0112 15c-3.183 0-5.775-.78-7.952-2.255M8 8h8m-4 4v4m0-4h4m-4 0l-4 4m4-4l4 4" />
                </svg>
              </div>
              <div>
                <div className="text-base font-semibold text-[var(--foreground)]">Target Roles</div>
                <div className="text-xs text-muted">Select roles you're targeting</div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { id: "swe", label: "Software Engineer", icon: "💻" },
                { id: "swe2", label: "Senior Software Engineer", icon: "🚀" },
                { id: "fe", label: "Frontend Developer", icon: "🎨" },
                { id: "be", label: "Backend Developer", icon: "⚙️" },
                { id: "fs", label: "Full Stack Developer", icon: "🌐" },
                { id: "mobile", label: "Mobile Developer", icon: "📱" },
                { id: "data", label: "Data Engineer", icon: "📊" },
                { id: "ml", label: "ML Engineer", icon: "🤖" },
                { id: "devops", label: "DevOps Engineer", icon: "🔧" },
                { id: "pm", label: "Product Manager", icon: "📦" },
              ].map((role) => (
                <label
                  key={role.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-2)]/50 cursor-pointer hover:bg-[var(--surface-2)] transition-colors"
                >
                  <input type="checkbox" className="w-4 h-4 rounded border-[var(--line)] text-[var(--accent)] focus:ring-[var(--accent)]" />
                  <span className="text-xl">{role.icon}</span>
                  <span className="text-sm font-medium text-[var(--foreground)]">{role.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <button 
              onClick={handleSaveDetails}
              disabled={isSaving}
              className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold hover:opacity-90 disabled:opacity-60 transition-all hover:shadow-lg hover:shadow-[var(--accent)]/20 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Details
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {activeTab === "overview" && (
        <>
          <div>
            <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">Statistics</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {userStats.map((stat, idx) => (
                <div key={idx} className="glass-card rounded-2xl p-4 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{stat.icon}</span>
                    <div className="text-xs text-muted font-semibold uppercase tracking-wide">{stat.label}</div>
                  </div>
                  <div className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent)]/5 to-transparent">
            <div className="text-sm font-semibold text-[var(--foreground)] mb-4">Account Status</div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-2)]/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--foreground)]">Pro Plan</div>
                  <div className="text-xs text-muted">Unlimited practice sessions</div>
                </div>
              </div>
              <span className="px-3 py-1 rounded-lg bg-green-500/10 text-green-500 text-xs font-semibold">Active</span>
            </div>
          </div>
        </>
      )}

      {activeTab === "achievements" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all hover:-translate-y-1 group">
              <div className="flex items-start justify-between">
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {achievement.icon}
                </div>
                <span className="text-xs text-muted">{achievement.date}</span>
              </div>
              <div className="mt-4">
                <div className="text-base font-semibold text-[var(--foreground)]">{achievement.title}</div>
                <div className="mt-1 text-sm text-muted">{achievement.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "skills" && (
        <div className="glass-card rounded-2xl p-5">
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-4">Skill Levels</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((skill, idx) => (
              <div key={idx} className="space-y-3 p-4 rounded-xl bg-[var(--surface-2)]/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[var(--foreground)]">{skill.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                    skill.level === "Advanced" ? "bg-green-500/10 text-green-500" :
                    skill.level === "Intermediate" ? "bg-yellow-500/10 text-yellow-500" :
                    "bg-red-500/10 text-red-500"
                  }`}>{skill.level}</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] transition-all"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
                <div className="text-xs text-muted text-right">{skill.progress}% proficiency</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "preferences" && (
        <div className="glass-card rounded-2xl p-5 border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent)]/5 to-transparent">
          <div className="font-semibold text-[var(--foreground)] mb-4">Preferences</div>
          <div className="space-y-4">
            {[
              { label: "Email notifications", desc: "Get updates about your practice sessions", enabled: true },
              { label: "Weekly summary", desc: "Receive weekly progress reports", enabled: true },
              { label: "Public profile", desc: "Let others view your achievements", enabled: false },
              { label: "Sound effects", desc: "Play sounds during interviews", enabled: true },
              { label: "Auto-save recordings", desc: "Automatically save interview recordings", enabled: false },
            ].map((pref, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-2)]/50">
                <div>
                  <div className="text-sm font-semibold text-[var(--foreground)]">{pref.label}</div>
                  <div className="text-xs text-muted mt-0.5">{pref.desc}</div>
                </div>
                <button 
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    pref.enabled ? "bg-[var(--accent)]" : "bg-[var(--surface-3)]"
                  }`}
                >
                  <div 
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all ${
                      pref.enabled ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
