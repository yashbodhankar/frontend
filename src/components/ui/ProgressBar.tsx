interface ProgressBarProps {
  value: number
  color?: string
  className?: string
}

export function ProgressBar({ value, color = '#3B6FE8', className = '' }: ProgressBarProps) {
  return (
    <div className={`h-2 bg-[#E5E7EB] rounded-full overflow-hidden flex-1 ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, value)}%`, backgroundColor: color }}
      />
    </div>
  )
}
