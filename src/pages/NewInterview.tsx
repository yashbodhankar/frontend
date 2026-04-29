import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, ChevronRight, Mic, Video, Wifi, X } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { StepWizard } from '../components/ui/StepWizard'
import { mockPersonas } from '../lib/mockData'

const STEPS = ['Setup', 'Persona', 'Device', 'Interview']

const durations = ['15 min', '30 min', '45 min', '60 min']
const interviewTypes = ['Technical', 'Behavioral', 'System Design', 'Mixed', 'HR Round', 'Case Study']
const experienceLevels = ['0–2 years', '3–5 years', '5–8 years', '8+ years']
const roleChips = ['Frontend', 'Backend', 'Full Stack', 'React', 'TypeScript']

export function NewInterview() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  // Step 1 state
  const [selectedRole, setSelectedRole] = useState<string[]>(['Frontend', 'React'])
  const [experience, setExperience] = useState('3–5 years')
  const [duration, setDuration] = useState('45 min')
  const [type, setType] = useState('Technical')
  const [roleInput, setRoleInput] = useState('Senior Frontend Engineer')

  // Step 2 state
  const [persona, setPersona] = useState('p1')

  const difficultyColor = (d: string) => {
    if (d === 'Hard') return 'text-red-600 bg-red-50'
    if (d === 'Medium') return 'text-amber-600 bg-amber-50'
    return 'text-green-600 bg-green-50'
  }

  const handleStart = () => navigate('/interview/report')

  // Step 4 — Interview In Progress
  if (step === 4) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-[#E5E7EB] px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#3B6FE8] rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <span className="font-bold text-[#1A202C] text-base">InterviewAI</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F1F3F7] rounded-full">
              <span className="text-sm text-[#374151] font-medium">Question 3 of 8</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#374151]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span className="font-medium tabular-nums">24:15</span>
            </div>
          </div>
          <button
            onClick={() => setStep(1)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#EF4444] hover:bg-red-50 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
            End Interview
          </button>
        </header>

        {/* Main */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6">
          {/* Interviewer */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-md bg-[#F3E8FF] flex items-center justify-center">
              <span className="text-3xl">🎓</span>
            </div>
            <div className="text-center">
              <p className="font-semibold text-[#1A202C]">Sarah Chen</p>
              <p className="text-sm text-[#6B7280]">Senior Engineer at Google</p>
            </div>
          </div>

          {/* Question card */}
          <Card className="max-w-2xl w-full">
            <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-3">Question 3</p>
            <p className="text-lg font-semibold text-[#1A202C] leading-relaxed">
              Walk me through how you would design a scalable notification system for a social media platform with 50 million users.
            </p>
          </Card>
        </div>

        {/* Bottom bar */}
        <div className="bg-white border-t border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
          {/* Camera feed */}
          <div className="w-24 h-16 rounded-lg bg-[#E8F0FE] flex items-center justify-center">
            <Video size={20} className="text-[#3B6FE8]" />
          </div>

          {/* Record */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5,6,7].map(i => (
                <div key={i} className="wave-bar w-1.5 rounded-full bg-[#3B6FE8]" style={{ height: 8 + Math.sin(i) * 8 + 'px' }} />
              ))}
            </div>
            <button
              onClick={handleStart}
              className="w-14 h-14 bg-[#EF4444] rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
            >
              <div className="w-6 h-6 bg-white rounded-sm" />
            </button>
          </div>

          {/* Filler info */}
          <div className="text-right">
            <p className="text-sm text-[#9CA3AF]">Filler words</p>
            <p className="text-sm font-semibold text-[#EF4444]">3 detected</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl">
        {/* Breadcrumb */}
        <button
          onClick={() => step > 1 ? setStep(s => s - 1) : navigate('/dashboard')}
          className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#374151] mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          {step > 1 ? 'Back' : 'Back to Dashboard'}
        </button>

        {/* Stepper */}
        <StepWizard steps={STEPS} currentStep={step} />

        {/* Step 1: Interview Setup */}
        {step === 1 && (
          <Card>
            <h2 className="text-xl font-bold text-[#1A202C] mb-6">Interview setup</h2>

            {/* Role */}
            <div className="mb-5">
              <label className="text-sm font-medium text-[#374151] block mb-2">Target role</label>
              <input
                className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#3B6FE8]/30 focus:border-[#3B6FE8]"
                value={roleInput}
                onChange={e => setRoleInput(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {roleChips.map(chip => (
                  <button
                    key={chip}
                    onClick={() => setSelectedRole(r => r.includes(chip) ? r.filter(x => x !== chip) : [...r, chip])}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      selectedRole.includes(chip)
                        ? 'bg-[#EEF2FF] text-[#3B6FE8] border-[#3B6FE8]'
                        : 'bg-white text-[#374151] border-[#E5E7EB] hover:border-[#3B6FE8]'
                    }`}
                  >
                    {chip}
                    {selectedRole.includes(chip) && <X size={10} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="mb-5">
              <label className="text-sm font-medium text-[#374151] block mb-2">Experience level</label>
              <div className="flex gap-2 p-1 bg-[#F8F9FB] rounded-lg">
                {experienceLevels.map(l => (
                  <button
                    key={l}
                    onClick={() => setExperience(l)}
                    className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${
                      experience === l ? 'bg-white text-[#1A202C] shadow-sm' : 'text-[#6B7280] hover:text-[#374151]'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="mb-5">
              <label className="text-sm font-medium text-[#374151] block mb-2">Duration</label>
              <div className="grid grid-cols-4 gap-2">
                {durations.map(d => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`py-2.5 text-sm font-medium rounded-lg border-2 transition-colors ${
                      duration === d
                        ? 'border-[#3B6FE8] bg-[#EEF2FF] text-[#3B6FE8]'
                        : 'border-[#E5E7EB] bg-white text-[#374151] hover:border-[#3B6FE8]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Interview type */}
            <div className="mb-5">
              <label className="text-sm font-medium text-[#374151] block mb-2">Interview type</label>
              <div className="grid grid-cols-3 gap-2">
                {interviewTypes.map(t => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`py-2.5 text-sm font-medium rounded-lg border-2 transition-colors ${
                      type === t
                        ? 'border-[#3B6FE8] bg-[#EEF2FF] text-[#3B6FE8]'
                        : 'border-[#E5E7EB] bg-white text-[#374151] hover:border-[#3B6FE8]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* JD Upload */}
            <div className="mb-6">
              <label className="text-sm font-medium text-[#374151] block mb-2">Job description <span className="text-[#9CA3AF] font-normal">(optional)</span></label>
              <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-6 flex flex-col items-center gap-2 bg-[#FAFAFA] hover:border-[#3B6FE8] transition-colors cursor-pointer">
                <Upload size={24} className="text-[#9CA3AF]" />
                <p className="text-sm text-[#6B7280]">Drop your JD here or <span className="text-[#3B6FE8] font-medium">browse</span></p>
                <p className="text-xs text-[#9CA3AF]">PDF, DOCX up to 5MB</p>
              </div>
              <button onClick={() => {}} className="text-sm text-[#3B6FE8] font-medium mt-2 hover:underline">
                Or paste job description text
              </button>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => navigate('/dashboard')}>Cancel</Button>
              <Button onClick={() => setStep(2)}>
                Next <ChevronRight size={16} />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Interviewer Persona */}
        {step === 2 && (
          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1A202C]">Choose your interviewer</h2>
              <p className="text-sm text-[#6B7280] mt-1">Select the persona that matches your prep goals</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {mockPersonas.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPersona(p.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    persona === p.id
                      ? 'border-[#3B6FE8] bg-[#EEF2FF]'
                      : 'border-[#E5E7EB] bg-white hover:border-[#3B6FE8]'
                  }`}
                >
                  <div className="text-2xl mb-2">{p.icon}</div>
                  <p className="text-sm font-semibold text-[#1A202C]">{p.name}</p>
                  <p className="text-xs text-[#6B7280] mt-1">{p.description}</p>
                  <span className={`inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColor(p.difficulty)}`}>
                    {p.difficulty}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)}>
                Next <ChevronRight size={16} />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Device Check */}
        {step === 3 && (
          <Card>
            <h2 className="text-xl font-bold text-[#1A202C] mb-6">Check your setup</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Camera */}
              <div className="p-4 rounded-xl border border-[#E5E7EB] flex flex-col items-center gap-3">
                <div className="w-full h-32 bg-[#E8F0FE] rounded-lg flex items-center justify-center">
                  <Video size={32} className="text-[#3B6FE8]" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-[#374151]">Camera ready</span>
                </div>
              </div>
              {/* Mic */}
              <div className="p-4 rounded-xl border border-[#E5E7EB] flex flex-col items-center gap-3">
                <div className="w-full h-32 bg-[#F3E8FF] rounded-lg flex items-center justify-center">
                  <Mic size={32} className="text-purple-500" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-[#374151]">Microphone ready</span>
                </div>
              </div>
            </div>

            {/* Connection */}
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg mb-6">
              <Wifi size={18} className="text-green-600" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-[#374151]">Connection stable · 45 Mbps</span>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
              <button
                onClick={() => setStep(4)}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
              >
                Start Interview
                <ChevronRight size={16} />
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
