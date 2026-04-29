import { useState, useRef } from 'react'
import { Camera, Edit2, X, Upload, FileText as FileIcon, Trash2, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { ProfileLayout } from '../components/layout/ProfileLayout'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Toggle } from '../components/ui/Toggle'
import { Badge } from '../components/ui/Badge'
import { mockUser, mockBillingHistory, mockSessions } from '../lib/mockData'
import { parseResume } from '../lib/resumeParser'

export function ProfilePersonal() {
  const [name, setName] = useState(mockUser.name)
  const [email, setEmail] = useState(mockUser.email)
  const [phone, setPhone] = useState(mockUser.phone)
  const [country, setCountry] = useState(mockUser.country)
  const [role, setRole] = useState(mockUser.role)
  const [exp, setExp] = useState(mockUser.experience)
  const [linkedin, setLinkedin] = useState(mockUser.linkedin)
  const [targetRole, setTargetRole] = useState(mockUser.targetRole)
  const [companies, setCompanies] = useState([...mockUser.targetCompanies])
  const [saved, setSaved] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [parsing, setParsing] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string; fields?: string[] } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const removeCompany = (c: string) => setCompanies(cs => cs.filter(x => x !== c))

  const handleResumeUpload = async (file: File) => {
    setResumeFile(file)
    setParsing(true)
    setToast(null)
    try {
      const parsed = await parseResume(file)
      const filled: string[] = []
      if (parsed.name)        { setName(parsed.name);           filled.push('Full name') }
      if (parsed.email)       { setEmail(parsed.email);         filled.push('Email') }
      if (parsed.phone)       { setPhone(parsed.phone);         filled.push('Phone') }
      if (parsed.linkedin)    { setLinkedin(parsed.linkedin);   filled.push('LinkedIn') }
      if (parsed.currentRole) { setRole(parsed.currentRole);    filled.push('Current role') }
      if (parsed.experience)  { setExp(parsed.experience);      filled.push('Experience') }
      if (parsed.companies?.length) {
        setCompanies(prev => [...new Set([...prev, ...parsed.companies!])])
        filled.push('Companies')
      }
      if (filled.length > 0) {
        setToast({ type: 'success', message: `Parsed ${filled.length} field${filled.length > 1 ? 's' : ''} from your resume`, fields: filled })
      } else {
        setToast({ type: 'error', message: 'Could not extract fields — check your resume format' })
      }
    } catch {
      setToast({ type: 'error', message: 'Failed to parse resume. Please try a different file.' })
    } finally {
      setParsing(false)
      setTimeout(() => setToast(null), 5000)
    }
  }

  return (
    <ProfileLayout>
      <div className="max-w-2xl">
        {/* Toast */}
        {toast && (
          <div className={`flex items-start gap-3 px-4 py-3 rounded-xl mb-5 border ${
            toast.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            {toast.type === 'success'
              ? <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
              : <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />}
            <div>
              <p className={`text-sm font-medium ${toast.type === 'success' ? 'text-green-800' : 'text-red-700'}`}>
                {toast.message}
              </p>
              {toast.fields && (
                <p className="text-xs text-green-700 mt-0.5">
                  {toast.fields.join(' · ')}
                </p>
              )}
            </div>
            <button onClick={() => setToast(null)} className="ml-auto text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#1A202C]">Personal Info</h1>
          <Button variant="secondary" size="sm" onClick={handleSave}>
            <Edit2 size={14} />
            {saved ? 'Saved!' : 'Save changes'}
          </Button>
        </div>

        {/* Avatar */}
        <Card className="mb-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-16 h-16 bg-[#E8F0FE] rounded-full flex items-center justify-center text-xl font-bold text-[#3B6FE8]">
                {mockUser.initials}
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#3B6FE8] rounded-full flex items-center justify-center hover:bg-[#2D5CD4] transition-colors">
                <Camera size={11} className="text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <Button variant="secondary" size="sm" onClick={() => {}}>
                Change photo
              </Button>
              <button onClick={() => {}} className="text-xs text-[#9CA3AF] hover:text-[#6B7280]">Remove photo</button>
            </div>
          </div>
        </Card>

        {/* Form */}
        <Card className="mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input label="Full name" value={name} onChange={e => setName(e.target.value)} />
            <Input label="Email address" value={email} onChange={e => setEmail(e.target.value)} type="email" />
            <Input label="Phone number" value={phone} onChange={e => setPhone(e.target.value)} />
            <Input label="Country" value={country} onChange={e => setCountry(e.target.value)} />
            <Input label="Current role" value={role} onChange={e => setRole(e.target.value)} />
            <Input label="Experience" value={exp} onChange={e => setExp(e.target.value)} />
          </div>
          <Input label="LinkedIn URL" value={linkedin} onChange={e => setLinkedin(e.target.value)} className="mb-4" />
          <Input label="Target role" value={targetRole} onChange={e => setTargetRole(e.target.value)} className="mb-4" />

          {/* Target companies */}
          <div>
            <label className="text-sm font-medium text-[#374151] block mb-1.5">Target companies</label>
            <div className="flex flex-wrap gap-2 p-3 border border-[#E5E7EB] rounded-lg min-h-[44px]">
              {companies.map(c => (
                <span key={c} className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F1F3F7] rounded-lg text-sm font-medium text-[#374151]">
                  {c}
                  <button onClick={() => removeCompany(c)} className="text-[#9CA3AF] hover:text-[#6B7280]">
                    <X size={12} />
                  </button>
                </span>
              ))}
              <input className="outline-none text-sm text-[#9CA3AF] placeholder-[#9CA3AF] flex-1 min-w-[80px]" placeholder="Add company..." onKeyDown={e => {
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value.trim()
                  if (val) { setCompanies(cs => [...cs, val]); (e.target as HTMLInputElement).value = '' }
                }
              }} />
            </div>
          </div>
        </Card>

        {/* Resume upload */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-[#374151]">Resume</label>
            {!resumeFile && (
              <span className="text-xs text-[#9CA3AF]">Auto-fills your profile fields</span>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0]
              if (file) handleResumeUpload(file)
              e.target.value = ''
            }}
          />
          {resumeFile ? (
            <div className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${parsing ? 'bg-blue-50 border-[#3B6FE8]' : 'bg-[#FAFAFA] border-[#E5E7EB]'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${parsing ? 'bg-[#EEF2FF]' : 'bg-red-100'}`}>
                  {parsing
                    ? <Loader size={18} className="text-[#3B6FE8] animate-spin" />
                    : <FileIcon size={18} className="text-red-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A202C]">{resumeFile.name}</p>
                  <p className="text-xs text-[#9CA3AF]">
                    {parsing ? 'Parsing your resume…' : `${(resumeFile.size / 1024).toFixed(0)} KB`}
                  </p>
                </div>
              </div>
              {!parsing && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm font-medium text-[#3B6FE8] hover:underline"
                  >
                    Replace
                  </button>
                  <button
                    onClick={() => { setResumeFile(null); setToast(null) }}
                    className="text-[#9CA3AF] hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => {
                e.preventDefault()
                setDragOver(false)
                const file = e.dataTransfer.files?.[0]
                if (file) handleResumeUpload(file)
              }}
              className={`flex flex-col items-center gap-2 p-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                dragOver ? 'border-[#3B6FE8] bg-[#EEF2FF]' : 'border-[#E5E7EB] bg-[#FAFAFA] hover:border-[#3B6FE8] hover:bg-[#F5F7FF]'
              }`}
            >
              <div className="w-10 h-10 bg-[#EEF2FF] rounded-lg flex items-center justify-center">
                <Upload size={18} className="text-[#3B6FE8]" />
              </div>
              <p className="text-sm font-medium text-[#374151]">
                Drop your resume here or <span className="text-[#3B6FE8]">browse</span>
              </p>
              <p className="text-xs text-[#9CA3AF]">PDF, DOC, DOCX · auto-fills your profile</p>
            </div>
          )}
        </Card>
      </div>
    </ProfileLayout>
  )
}

export function ProfileNotifications() {
  const [prefs, setPrefs] = useState({
    practiceReminders: true,
    weeklyReport: true,
    newInterviewer: false,
    performanceAlerts: true,
    scoreImprovement: true,
    productUpdates: false,
    tips: true,
  })

  const toggle = (k: keyof typeof prefs) => setPrefs(p => ({ ...p, [k]: !p[k] }))

  const rows = [
    { group: 'Practice & Learning', items: [
      { key: 'practiceReminders' as const, label: 'Practice reminders', desc: 'Daily nudges to keep your streak going' },
      { key: 'weeklyReport' as const, label: 'Weekly progress report', desc: 'Summary of your improvement each week' },
    ]},
    { group: 'Performance', items: [
      { key: 'performanceAlerts' as const, label: 'Performance alerts', desc: 'Notify when a skill drops below target' },
      { key: 'scoreImprovement' as const, label: 'Score improvements', desc: 'Celebrate when you hit a new personal best' },
    ]},
    { group: 'Product', items: [
      { key: 'productUpdates' as const, label: 'Product updates', desc: 'New features and improvements' },
      { key: 'tips' as const, label: 'Interview tips', desc: 'Weekly curated tips from top candidates' },
    ]},
  ]

  return (
    <ProfileLayout>
      <div className="max-w-2xl">
        <h1 className="text-xl font-bold text-[#1A202C] mb-6">Notifications</h1>
        {rows.map(group => (
          <div key={group.group} className="mb-5">
            <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">{group.group}</p>
            <Card padding="none">
              {group.items.map((item, i) => (
                <div
                  key={item.key}
                  className={`flex items-center justify-between px-5 py-4 ${i < group.items.length - 1 ? 'border-b border-[#E5E7EB]' : ''}`}
                >
                  <div>
                    <p className="text-sm font-medium text-[#1A202C]">{item.label}</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle enabled={prefs[item.key]} onChange={() => toggle(item.key)} />
                </div>
              ))}
            </Card>
          </div>
        ))}
      </div>
    </ProfileLayout>
  )
}

export function ProfileSecurity() {
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [tfa, setTfa] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleUpdate = () => {
    setSaved(true)
    setCurrentPw(''); setNewPw(''); setConfirmPw('')
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <ProfileLayout>
      <div className="max-w-2xl">
        <h1 className="text-xl font-bold text-[#1A202C] mb-6">Security</h1>

        {/* Password */}
        <Card className="mb-5">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-[#1A202C]">Change Password</h2>
            <p className="text-sm text-[#6B7280] mt-0.5">Use a strong password you don't reuse elsewhere.</p>
          </div>
          <div className="flex flex-col gap-4 mb-5">
            <Input label="Current password" type="password" placeholder="••••••••" value={currentPw} onChange={e => setCurrentPw(e.target.value)} />
            <Input label="New password" type="password" placeholder="••••••••" value={newPw} onChange={e => setNewPw(e.target.value)} />
            <Input label="Confirm new password" type="password" placeholder="••••••••" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
          </div>
          <div className="pt-4 border-t border-[#E5E7EB]">
            <Button onClick={handleUpdate}>{saved ? 'Password updated!' : 'Update password'}</Button>
          </div>
        </Card>

        {/* 2FA */}
        <Card className="mb-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-base font-semibold text-[#1A202C]">Two-Factor Authentication</h2>
                <Badge variant={tfa ? 'green' : 'gray'}>{tfa ? 'Enabled' : 'Disabled'}</Badge>
              </div>
              <p className="text-sm text-[#6B7280]">Add an extra layer of security to your account.</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setTfa(v => !v)}>
              {tfa ? 'Disable' : 'Enable'}
            </Button>
          </div>
        </Card>

        {/* Sessions */}
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-base font-semibold text-[#1A202C]">Active Sessions</h2>
            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-[#374151]">{mockSessions.length}</span>
          </div>
          <div className="flex flex-col gap-3">
            {mockSessions.map((s, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${s.current ? 'border-[#3B6FE8] bg-[#F9FBFF]' : 'border-[#E5E7EB]'}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#374151]">{s.device}</p>
                    {s.current && <Badge variant="blue">Current</Badge>}
                  </div>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">{s.location} · {s.lastActive}</p>
                </div>
                {!s.current && (
                  <button onClick={() => {}} className="text-sm font-medium text-[#EF4444] hover:underline">Revoke</button>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </ProfileLayout>
  )
}

export function ProfileBilling() {
  return (
    <ProfileLayout>
      <div className="max-w-3xl">
        <h1 className="text-xl font-bold text-[#1A202C] mb-6">Billing</h1>

        {/* Plan card */}
        <Card className="mb-5">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-base font-semibold text-[#1A202C]">Pro Plan</h2>
                <Badge variant="blue">Current</Badge>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-[#1A202C]">$29</span>
                <span className="text-sm text-[#6B7280]">/month</span>
              </div>
              <p className="text-sm text-[#6B7280] mb-4">Renews May 1, 2026</p>
              <ul className="flex flex-col gap-2 mb-4">
                {['Unlimited interviews', 'AI feedback on all questions', 'Performance analytics', 'All interviewer personas'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#374151]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="border-t border-[#E5E7EB] pt-4">
                <Button variant="secondary" size="sm" onClick={() => {}}>Manage subscription</Button>
              </div>
            </div>

            {/* Right: usage */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#374151] mb-4">This month's usage</p>
              <div className="flex flex-col gap-4 mb-5">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-[#374151]">Interviews</span>
                    <span className="font-semibold text-[#1A202C]">8 / unlimited</span>
                  </div>
                  <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div className="h-full bg-[#3B6FE8] rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-[#374151]">AI Feedback tokens</span>
                    <span className="font-semibold text-[#1A202C]">12,400 / unlimited</span>
                  </div>
                  <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                <p className="text-sm font-semibold text-[#1A202C] mb-1">Upgrade to Enterprise</p>
                <p className="text-xs text-[#6B7280] mb-3">Team accounts, custom personas, and dedicated support.</p>
                <Button size="sm" onClick={() => {}}>Contact sales</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment method */}
        <Card className="mb-5">
          <h2 className="text-base font-semibold text-[#1A202C] mb-4">Payment Method</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 bg-[#1A1F71] rounded flex items-center justify-center">
                <span className="text-xs font-bold text-white">VISA</span>
              </div>
              <div>
                <p className="text-sm font-medium text-[#374151]">Visa ending in 4242</p>
                <p className="text-xs text-[#9CA3AF]">Expires 08/2028</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => {}}>Edit</Button>
              <Button variant="secondary" size="sm" onClick={() => {}}>Remove</Button>
            </div>
          </div>
        </Card>

        {/* Billing history */}
        <Card>
          <h2 className="text-base font-semibold text-[#1A202C] mb-4">Billing History</h2>
          <div className="rounded-lg overflow-hidden border border-[#E5E7EB]">
            <div className="grid grid-cols-5 gap-4 px-4 py-2.5 bg-[#F9FAFB]">
              {['Date', 'Description', 'Amount', 'Status', 'Receipt'].map(h => (
                <span key={h} className="text-xs font-semibold text-[#6B7280]">{h}</span>
              ))}
            </div>
            {mockBillingHistory.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-5 gap-4 px-4 py-3.5 items-center ${i < mockBillingHistory.length - 1 ? 'border-b border-[#E5E7EB]' : ''}`}
              >
                <span className="text-sm text-[#374151]">{row.date}</span>
                <span className="text-sm text-[#374151]">{row.description}</span>
                <span className="text-sm font-medium text-[#374151]">{row.amount}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 w-fit">
                  {row.status}
                </span>
                <button onClick={() => {}} className="text-sm text-[#3B6FE8] font-medium hover:underline text-left">
                  Download
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </ProfileLayout>
  )
}

export function ProfileHelp() {
  return (
    <ProfileLayout>
      <div className="max-w-2xl">
        <h1 className="text-xl font-bold text-[#1A202C] mb-2">Help & Support</h1>
        <p className="text-sm text-[#6B7280] mb-6">Get help with InterviewAI or contact our support team.</p>
        <Card>
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="w-12 h-12 bg-[#EEF2FF] rounded-xl flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B6FE8" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <p className="text-sm font-semibold text-[#1A202C]">Support centre coming soon</p>
            <p className="text-sm text-[#6B7280]">For now, email us at <a href="mailto:support@interviewai.com" className="text-[#3B6FE8] hover:underline">support@interviewai.com</a></p>
          </div>
        </Card>
      </div>
    </ProfileLayout>
  )
}

export function ProfilePrivacy() {
  return (
    <ProfileLayout>
      <div className="max-w-2xl">
        <h1 className="text-xl font-bold text-[#1A202C] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#6B7280] mb-6">How we collect, use, and protect your data.</p>
        <Card>
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="w-12 h-12 bg-[#EEF2FF] rounded-xl flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B6FE8" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <p className="text-sm font-semibold text-[#1A202C]">Privacy Policy</p>
            <p className="text-sm text-[#6B7280]">Full policy document coming soon.</p>
          </div>
        </Card>
      </div>
    </ProfileLayout>
  )
}
