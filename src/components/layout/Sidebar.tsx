import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Plus, Clock, User, Settings, LogOut, Zap
} from 'lucide-react'
import { mockUser } from '../../lib/mockData'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Plus, label: 'New Interview', path: '/interview/new' },
  { icon: Clock, label: 'History', path: '/dashboard' },
]

const bottomItems = [
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/profile' },
]

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className="w-60 h-screen bg-white border-r border-[#E5E7EB] flex flex-col flex-shrink-0">
      <div className="flex-1 p-4">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 py-3 mb-6">
          <div className="w-8 h-8 bg-[#3B6FE8] rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap size={15} className="text-white" fill="white" />
          </div>
          <span className="font-bold text-[#1A202C] text-base">InterviewAI</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1">
          {navItems.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path || (path === '/dashboard' && location.pathname === '/')
            return (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-colors ${
                  active ? 'bg-[#E8F0FE] text-[#3B6FE8]' : 'text-[#374151] hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            )
          })}

          <div className="my-2 border-t border-[#E5E7EB]" />

          {bottomItems.map(({ icon: Icon, label, path }) => {
            const active = location.pathname.startsWith(path) && path !== '/dashboard'
            return (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-colors ${
                  active ? 'bg-[#E8F0FE] text-[#3B6FE8]' : 'text-[#374151] hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* User */}
      <div className="p-4 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#E8F0FE] rounded-full flex items-center justify-center text-sm font-semibold text-[#3B6FE8]">
            {mockUser.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1A202C] truncate">{mockUser.name}</p>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-[#EEF2FF] text-[#3B6FE8]">
              {mockUser.plan}
            </span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}
