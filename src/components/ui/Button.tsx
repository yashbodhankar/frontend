import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 cursor-pointer'
  const variants = {
    primary: 'bg-[#3B6FE8] text-white hover:bg-[#2D5CD4] active:bg-[#2450BF]',
    secondary: 'bg-white text-[#374151] border border-[#E5E7EB] hover:bg-gray-50 active:bg-gray-100',
    ghost: 'text-[#3B6FE8] hover:bg-[#EEF2FF]',
    danger: 'bg-white text-[#EF4444] border border-[#E5E7EB] hover:bg-red-50',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
