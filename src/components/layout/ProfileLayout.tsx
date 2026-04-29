import { ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { User, Bell, Shield, CreditCard, HelpCircle, FileText, LogOut, ArrowLeft } from 'lucide-react'
import { mockUser } from '../../lib/mockData'

const navItems = [
  { icon: User, label: 'Personal Info', path: '/profile' },
  { icon: Bell, label: 'Notifications', path: '/profile/notifications' },
  { icon: Shield, label: 'Security', path: '/profile/security' },
  { icon: CreditCard, label: 'Billing', path: '/profile/billing' },
  { icon: HelpCircle, label: 'Help & Support', path: '/profile/help' },
  { icon: FileText, label: 'Privacy Policy', path: '/profile/privacy' },
]

interface ProfileLayoutProps {
  children: ReactNode
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FB]">
      {/* Profile Sidebar */}
      <aside className="w-64 h-screen bg-white border-r border-[#E5E7EB] flex flex-col flex-shrink-0">
        <div className="p-6">
          {/* Back to Dashboard */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#374151] transition-colors mb-5 w-full"
          >
            <ArrowLeft size={15} />
            Back to Dashboard
          </button>

          {/* User area */}
          <div className="flex flex-col items-center gap-2 mb-6 text-center">
            <div className="w-14 h-14 bg-[#E8F0FE] rounded-full flex items-center justify-center text-lg font-bold text-[#3B6FE8]">
              {mockUser.initials}
            </div>
            <div>
              <p className="font-semibold text-[#1A202C] text-sm">{mockUser.name}</p>
              <p className="text-xs text-[#9CA3AF]">{mockUser.email}</p>
              <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-700">
                {mockUser.plan}
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1">
            {navItems.map(({ icon: Icon, label, path }) => {
              const active = location.pathname === path
              return (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-colors text-left ${
                    active ? 'bg-[#F0F4FF] text-[#3B6FE8]' : 'text-[#374151] hover:bg-gray-50'
                  }`}
                >
                  <Icon size={17} />
                  {label}
                </button>
              )
            })}

            <div className="my-2 border-t border-[#E5E7EB]" />

            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full text-[#EF4444] hover:bg-red-50 transition-colors"
            >
              <LogOut size={17} />
              Sign Out
            </button>
          </nav>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}
