import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

export function Card({ padding = 'md', className = '', children, ...props }: CardProps) {
  const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' }
  return (
    <div className={`bg-white rounded-xl border border-[#E5E7EB] ${paddings[padding]} ${className}`} {...props}>
      {children}
    </div>
  )
}
