import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { Logo } from '../components/ui/Logo'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(false)

  const handleSignIn = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-8">
        <Logo size="lg" showTagline />
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A202C]">Sign in</h1>
          <p className="text-sm text-[#6B7280] mt-1">Welcome back</p>
        </div>

        {/* Social buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-medium text-[#374151]">Google</span>
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            <span className="text-sm font-medium text-[#374151]">LinkedIn</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[#E5E7EB]" />
          <span className="text-xs text-[#9CA3AF]">or</span>
          <div className="flex-1 h-px bg-[#E5E7EB]" />
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type={showPw ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            rightIcon={
              <button onClick={() => setShowPw(v => !v)} className="text-[#9CA3AF] hover:text-[#6B7280]">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setRemember(v => !v)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${remember ? 'bg-[#3B6FE8] border-[#3B6FE8]' : 'border-[#E5E7EB] bg-white'}`}
              >
                {remember && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#374151]">Remember me</span>
            </label>
            <button
              onClick={() => {}}
              className="text-sm font-medium text-[#3B6FE8] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <Button onClick={handleSignIn} className="w-full mt-1">
            Sign in
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[#6B7280] mt-6">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="font-semibold text-[#3B6FE8] hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
