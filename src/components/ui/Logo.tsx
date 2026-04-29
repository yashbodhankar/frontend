import { Zap } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
}

export function Logo({ size = 'md', showTagline = false }: LogoProps) {
  const sizes = {
    sm: { mark: 'w-7 h-7', icon: 14, wordmark: 'text-base', tagline: 'text-xs' },
    md: { mark: 'w-9 h-9', icon: 18, wordmark: 'text-lg', tagline: 'text-sm' },
    lg: { mark: 'w-11 h-11', icon: 22, wordmark: 'text-xl', tagline: 'text-sm' },
  }
  const s = sizes[size]
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-2">
        <div className={`${s.mark} bg-[#3B6FE8] rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Zap size={s.icon} className="text-white" fill="white" />
        </div>
        <span className={`${s.wordmark} font-bold text-[#1A202C]`}>InterviewAI</span>
      </div>
      {showTagline && <p className={`${s.tagline} text-[#6B7280]`}>Ace your next interview</p>}
    </div>
  )
}
