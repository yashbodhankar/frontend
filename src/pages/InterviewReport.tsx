import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Download, Share2, BookOpen, Plus, ChevronDown, ChevronUp,
  RotateCcw, TrendingUp
} from 'lucide-react'
import { AppLayout } from '../components/layout/AppLayout'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { ProgressBar } from '../components/ui/ProgressBar'
import { mockInterviewReport } from '../lib/mockData'

const scoreColor = (s: number) => {
  if (s >= 80) return '#22C55E'
  if (s >= 65) return '#3B6FE8'
  return '#EF4444'
}

const scoreBarColor = (s: number) => {
  if (s >= 80) return '#22C55E'
  if (s >= 65) return '#3B6FE8'
  return '#F59E0B'
}

export function InterviewReport() {
  const navigate = useNavigate()
  const r = mockInterviewReport
  const [expandedQ, setExpandedQ] = useState<string | null>('q1')

  return (
    <AppLayout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-sm font-medium text-[#3B6FE8] hover:underline mb-6"
        >
          <ArrowLeft size={15} />
          Back to Dashboard
        </button>

        {/* Hero card */}
        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-[#1A202C]">{r.role}</h1>
                <Badge variant="blue">{r.company}</Badge>
              </div>
              <p className="text-sm text-[#6B7280]">{r.date} · {r.duration} · {r.questionCount} questions</p>
              <p className="text-sm text-[#6B7280] mt-1">Interviewer: <span className="font-medium text-[#374151]">{r.interviewer}</span> — {r.interviewerTitle}</p>
            </div>
            <div className="flex flex-col items-center sm:items-end gap-1">
              <div className="text-4xl font-bold" style={{ color: scoreColor(r.overallScore) }}>
                {r.overallScore}%
              </div>
              <Badge variant={r.overallScore >= 80 ? 'green' : r.overallScore >= 70 ? 'blue' : 'amber'}>
                {r.scoreBadge}
              </Badge>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E5E7EB]">
            <button onClick={() => {}} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#374151] hover:bg-gray-50 transition-colors">
              <Download size={15} /> Download PDF
            </button>
            <button onClick={() => {}} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#374151] hover:bg-gray-50 transition-colors">
              <Share2 size={15} /> Share
            </button>
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#374151] hover:bg-gray-50 transition-colors">
              <BookOpen size={15} /> Study Notes
            </button>
            <button onClick={() => navigate('/interview/new')} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#374151] hover:bg-gray-50 transition-colors">
              <RotateCcw size={15} /> Retry
            </button>
          </div>
        </Card>

        {/* Score breakdown */}
        <Card className="mb-6">
          <h2 className="text-base font-semibold text-[#1A202C] mb-5">Performance breakdown</h2>
          <div className="flex flex-col gap-4">
            {r.scores.map(s => (
              <div key={s.label} className="flex items-center gap-4">
                <span className="text-sm text-[#374151] w-40 flex-shrink-0">{s.label}</span>
                <ProgressBar value={s.score} color={scoreBarColor(s.score)} />
                <span className="text-sm font-bold text-[#1A202C] w-10 text-right">{s.score}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium w-24 justify-center ${s.badgeColor}`}>
                  {s.badge}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Q&A Accordion */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-[#1A202C]">Question Feedback</h2>
            <span className="text-sm text-[#9CA3AF]">{r.questions.length} questions</span>
          </div>
          <div className="flex flex-col gap-2">
            {r.questions.map(q => (
              <div key={q.id} className="border border-[#E5E7EB] rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedQ(expandedQ === q.id ? null : q.id)}
                  className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 text-left min-w-0">
                    <span className="text-xs font-medium text-[#9CA3AF] flex-shrink-0">Q{q.number}</span>
                    <span className="text-sm font-medium text-[#374151] truncate">{q.text}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <span className="text-sm font-bold text-[#1A202C]">{q.score}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${q.badgeColor}`}>
                      {q.badge}
                    </span>
                    {expandedQ === q.id ? <ChevronUp size={15} className="text-[#9CA3AF]" /> : <ChevronDown size={15} className="text-[#9CA3AF]" />}
                  </div>
                </button>
                {expandedQ === q.id && (
                  <div className="px-4 pb-4 bg-[#F8F9FB]">
                    <p className="text-sm text-[#1A202C] font-medium mb-2">AI Feedback:</p>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{q.feedback}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Two-col: Communication + Focus Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Communication */}
          <Card>
            <h2 className="text-base font-semibold text-[#1A202C] mb-4">Communication</h2>
            {/* WPM Gauge */}
            <div className="flex flex-col items-center mb-5">
              <div className="relative w-32 h-16 mb-2">
                <svg viewBox="0 0 120 60" className="w-full h-full">
                  <path d="M10 55 A 50 50 0 0 1 110 55" fill="none" stroke="#E5E7EB" strokeWidth="10" strokeLinecap="round"/>
                  <path
                    d="M10 55 A 50 50 0 0 1 110 55"
                    fill="none"
                    stroke="#3B6FE8"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="157"
                    strokeDashoffset={157 * (1 - r.communication.wpm / 200)}
                  />
                </svg>
                <div className="absolute inset-x-0 bottom-0 text-center">
                  <span className="text-xl font-bold text-[#1A202C]">{r.communication.wpm}</span>
                </div>
              </div>
              <p className="text-sm text-[#6B7280]">words per minute <span className="text-[#9CA3AF]">(target: {r.communication.wpmTarget})</span></p>
            </div>
            {/* Filler words */}
            <div className="flex flex-wrap gap-2">
              {r.communication.fillerWords.map((w, i) => (
                <div key={w} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium text-red-700">"{w}"</span>
                  <span className="text-xs text-red-500">×{r.communication.fillerCounts[i]}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Focus Areas */}
          <Card>
            <h2 className="text-base font-semibold text-[#1A202C] mb-4">Focus Areas</h2>
            <div className="flex flex-col gap-3">
              {r.focusAreas.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#F8F9FB] border border-[#E5E7EB]">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#EEF2FF] flex items-center justify-center text-xs font-bold text-[#3B6FE8]">
                      {i + 1}
                    </div>
                    <span className="text-sm font-medium text-[#374151]">{f.area}</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${f.color}`}>
                    {f.priority}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Footer CTA */}
        <Card className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-12 h-12 bg-[#EEF2FF] rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp size={22} className="text-[#3B6FE8]" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-[#1A202C]">Ready to improve your score?</p>
            <p className="text-sm text-[#6B7280] mt-0.5">Practice the weak areas with a targeted follow-up session.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/interview/new')}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#3B6FE8] text-white rounded-lg text-sm font-semibold hover:bg-[#2D5CD4] transition-colors"
            >
              <Plus size={15} /> New Interview
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 bg-white border border-[#E5E7EB] rounded-lg text-sm font-semibold text-[#374151] hover:bg-gray-50 transition-colors"
            >
              Dashboard
            </button>
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}
