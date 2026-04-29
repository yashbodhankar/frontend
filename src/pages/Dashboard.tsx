import { useNavigate } from 'react-router-dom'
import { Bell, Plus, TrendingUp, Clock, Zap, Target, Cpu, Star, Mic, ChevronRight } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts'
import { AppLayout } from '../components/layout/AppLayout'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { mockStats, mockSkills, mockPerformance, mockRecommendations, mockInterviewHistory, mockUser } from '../lib/mockData'

const recIcons: Record<string, typeof Cpu> = { cpu: Cpu, star: Star, mic: Mic }

export function Dashboard() {
  const navigate = useNavigate()

  return (
    <AppLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Topbar */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-xl font-bold text-[#1A202C]">Good morning, {mockUser.name.split(' ')[0]} 👋</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">Ready to practice today?</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 bg-[#F8F9FB] border border-[#E5E7EB] rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors relative">
              <Bell size={17} className="text-[#374151]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#3B6FE8] rounded-full" />
            </button>
            <button
              onClick={() => navigate('/interview/new')}
              className="flex items-center gap-2 px-4 py-2 bg-[#3B6FE8] text-white rounded-lg text-sm font-semibold hover:bg-[#2D5CD4] transition-colors"
            >
              <Plus size={16} />
              New Interview
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {mockStats.map((stat, i) => {
            const icons = [TrendingUp, Target, Clock, Zap]
            const colors = ['text-[#3B6FE8] bg-[#EEF2FF]', 'text-green-600 bg-green-50', 'text-purple-600 bg-purple-50', 'text-amber-600 bg-amber-50']
            const Icon = icons[i]
            return (
              <Card key={stat.label} padding="sm">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colors[i]}`}>
                    <Icon size={18} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-[#1A202C]">{stat.value}</p>
                <p className="text-xs text-[#6B7280] mt-0.5">{stat.label}</p>
                <p className="text-xs text-green-600 mt-1 font-medium">{stat.change}</p>
              </Card>
            )
          })}
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Skill radar */}
          <Card>
            <h2 className="text-base font-semibold text-[#1A202C] mb-4">Skill Breakdown</h2>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={mockSkills}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Radar name="Score" dataKey="score" stroke="#3B6FE8" fill="#3B6FE8" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Recent interviews */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[#1A202C]">Recent Interviews</h2>
              <button onClick={() => {}} className="text-sm text-[#3B6FE8] font-medium hover:underline">View all</button>
            </div>
            <div className="flex flex-col gap-3">
              {mockInterviewHistory.map(item => (
                <button
                  key={item.id}
                  onClick={() => navigate('/interview/report')}
                  className="flex items-center justify-between p-3 rounded-lg border border-[#E5E7EB] hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#1A202C]">{item.role}</p>
                    <p className="text-xs text-[#6B7280]">{item.company} · {item.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.score >= 80 ? 'green' : item.score >= 70 ? 'blue' : 'amber'}>
                      {item.score}%
                    </Badge>
                    <ChevronRight size={15} className="text-[#9CA3AF]" />
                  </div>
                </button>
              ))}
              <button
                onClick={() => navigate('/interview/new')}
                className="flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-[#E5E7EB] hover:border-[#3B6FE8] hover:text-[#3B6FE8] transition-colors text-sm text-[#9CA3AF] font-medium"
              >
                <Plus size={15} />
                Start new interview
              </button>
            </div>
          </Card>
        </div>

        {/* Performance chart */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-[#1A202C]">Performance Over Time</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Average score per month</p>
            </div>
            <Badge variant="green">↑ 5% this month</Badge>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={mockPerformance} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B6FE8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3B6FE8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 12 }}
                formatter={(v: number) => [`${v}%`, 'Score']}
              />
              <Area type="monotone" dataKey="score" stroke="#3B6FE8" strokeWidth={2.5} fill="url(#scoreGrad)" dot={{ r: 4, fill: '#3B6FE8', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Recommendations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#1A202C]">Recommendations</h2>
            <button onClick={() => {}} className="text-sm text-[#3B6FE8] font-medium hover:underline">See all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockRecommendations.map(rec => {
              const Icon = recIcons[rec.icon]
              return (
                <Card key={rec.id} padding="sm" className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/interview/new')}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 bg-[#EEF2FF] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={17} className="text-[#3B6FE8]" />
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${rec.tagColor}`}>
                      {rec.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#1A202C] mb-1">{rec.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{rec.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
