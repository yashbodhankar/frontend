import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { Logo } from '../components/ui/Logo'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

function getStrength(pw: string): { score: number; label: string; color: string } {
  if (pw.length === 0) return { score: 0, label: '', color: '' }
  if (pw.length < 6) return { score: 1, label: 'Weak', color: '#EF4444' }
  if (pw.length < 10) return { score: 2, label: 'Fair', color: '#EAB308' }
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) return { score: 4, label: 'Strong', color: '#22C55E' }
  return { score: 3, label: 'Good', color: '#3B6FE8' }
}

export function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [agreed, setAgreed] = useState(true)

  const strength = getStrength(password)

  const handleCreate = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo size="lg" showTagline />
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A202C]">Create your account</h1>
          <p className="text-sm text-[#6B7280] mt-1">Start your interview journey today</p>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            label="Full name"
            type="text"
            placeholder="Alex Johnson"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div>
            <Input
              label="Password"
              type={showPw ? 'text' : 'password'}
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              rightIcon={
                <button onClick={() => setShowPw(v => !v)} className="text-[#9CA3AF] hover:text-[#6B7280]">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
            {password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="flex-1 h-1.5 rounded-full transition-all"
                      style={{ backgroundColor: i <= strength.score ? strength.color : '#E5E7EB' }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#9CA3AF]">Password strength</span>
                  <span style={{ color: strength.color }} className="font-medium">{strength.label}</span>
                </div>
              </div>
            )}
          </div>
          <Input
            label="Confirm password"
            type="password"
            placeholder="Repeat your password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />

          {/* Terms */}
          <label className="flex items-start gap-2 cursor-pointer">
            <div
              onClick={() => setAgreed(v => !v)}
              className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${agreed ? 'bg-[#EEF2FF] border-[#3B6FE8]' : 'border-[#E5E7EB] bg-white'}`}
            >
              {agreed && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="#3B6FE8" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            <span className="text-sm text-[#6B7280]">
              I agree to the{' '}
              <button onClick={() => {}} className="text-[#3B6FE8] font-medium hover:underline">Terms of Service</button>
              {' '}and{' '}
              <button onClick={() => {}} className="text-[#3B6FE8] font-medium hover:underline">Privacy Policy</button>
            </span>
          </label>

          <Button onClick={handleCreate} className="w-full mt-1">
            Create account
          </Button>
        </div>

        <p className="text-center text-sm text-[#6B7280] mt-6">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="font-semibold text-[#3B6FE8] hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
