interface AvatarProps {
  initials: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Avatar({ initials, size = 'md', className = '' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-16 h-16 text-lg',
  }
  return (
    <div className={`${sizes[size]} bg-[#E8F0FE] rounded-full flex items-center justify-center font-semibold text-[#3B6FE8] flex-shrink-0 ${className}`}>
      {initials}
    </div>
  )
}
