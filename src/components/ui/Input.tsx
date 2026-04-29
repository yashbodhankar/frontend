import { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  rightIcon?: ReactNode
  leftIcon?: ReactNode
}

export function Input({ label, rightIcon, leftIcon, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[#374151]">{label}</label>}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">{leftIcon}</div>
        )}
        <input
          className={`w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#1A202C] placeholder-[#9CA3AF] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B6FE8]/30 focus:border-[#3B6FE8] transition-colors ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] cursor-pointer">{rightIcon}</div>
        )}
      </div>
    </div>
  )
}
