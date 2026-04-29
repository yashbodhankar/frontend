interface StepWizardProps {
  steps: string[]
  currentStep: number
}

export function StepWizard({ steps, currentStep }: StepWizardProps) {
  return (
    <div className="flex flex-col items-center gap-3 mb-8">
      <div className="flex items-center gap-0">
        {steps.map((_, i) => {
          const idx = i + 1
          const done = idx < currentStep
          const active = idx === currentStep
          return (
            <div key={i} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all ${
                  done ? 'bg-[#3B6FE8] border-[#3B6FE8] text-white'
                  : active ? 'bg-[#3B6FE8] border-[#3B6FE8] text-white'
                  : 'bg-white border-[#E5E7EB] text-[#9CA3AF]'
                }`}
              >
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : idx}
              </div>
              {i < steps.length - 1 && (
                <div className={`h-0.5 w-16 mx-1 ${idx < currentStep ? 'bg-[#3B6FE8]' : 'bg-[#E5E7EB]'}`} />
              )}
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-0">
        {steps.map((label, i) => {
          const idx = i + 1
          const active = idx === currentStep
          return (
            <div key={i} className="flex items-center">
              <span className={`text-xs font-medium w-8 text-center ${active ? 'text-[#3B6FE8]' : 'text-[#9CA3AF]'}`}>
                {label.split(' ')[0]}
              </span>
              {i < steps.length - 1 && <div className="w-16 mx-1" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
