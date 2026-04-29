export const mockUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@gmail.com',
  initials: 'AJ',
  plan: 'Pro' as const,
  role: 'Frontend Engineer',
  experience: '3-5 years',
  country: 'United States',
  phone: '+1 (555) 234-5678',
  linkedin: 'linkedin.com/in/alexjohnson',
  targetRole: 'Senior Frontend Engineer',
  targetCompanies: ['Google', 'Meta', 'Stripe'],
};

export const mockStats = [
  { label: 'Total Interviews', value: '24', change: '+3 this week', positive: true },
  { label: 'Avg. Score', value: '78%', change: '+5% vs last month', positive: true },
  { label: 'Hours Practiced', value: '18h', change: '+2h this week', positive: true },
  { label: 'Streak', value: '7 days', change: 'Personal best!', positive: true },
];

export const mockSkills = [
  { skill: 'Technical', score: 82, color: '#3B6FE8' },
  { skill: 'Communication', score: 74, color: '#8B5CF6' },
  { skill: 'Problem Solving', score: 88, color: '#10B981' },
  { skill: 'System Design', score: 65, color: '#F59E0B' },
  { skill: 'Behavioral', score: 79, color: '#EF4444' },
];

export const mockPerformance = [
  { month: 'Oct', score: 62 },
  { month: 'Nov', score: 68 },
  { month: 'Dec', score: 71 },
  { month: 'Jan', score: 69 },
  { month: 'Feb', score: 75 },
  { month: 'Mar', score: 78 },
  { month: 'Apr', score: 82 },
];

export const mockRecommendations = [
  {
    id: '1',
    title: 'Practice System Design',
    description: 'Your system design score is 65% — below target. Try 2 mock interviews this week.',
    tag: 'System Design',
    tagColor: 'bg-amber-100 text-amber-700',
    icon: 'cpu',
  },
  {
    id: '2',
    title: 'Improve STAR Responses',
    description: 'Behavioral answers average 74%. Focus on quantifying impact in your stories.',
    tag: 'Behavioral',
    tagColor: 'bg-purple-100 text-purple-700',
    icon: 'star',
  },
  {
    id: '3',
    title: 'Reduce Filler Words',
    description: 'You used "um" 14 times in your last session. Practice pausing instead.',
    tag: 'Communication',
    tagColor: 'bg-blue-100 text-blue-700',
    icon: 'mic',
  },
];

export const mockInterviewReport = {
  id: 'r1',
  role: 'Senior Frontend Engineer',
  company: 'Google',
  date: 'April 28, 2026',
  duration: '42 min',
  overallScore: 78,
  scoreBadge: 'Good',
  interviewer: 'Sarah Chen',
  interviewerTitle: 'Senior Engineer at Google',
  questionCount: 8,
  scores: [
    { label: 'Technical Knowledge', score: 82, badge: 'Strong', badgeColor: 'text-green-700 bg-green-50' },
    { label: 'Communication', score: 74, badge: 'Needs Work', badgeColor: 'text-red-700 bg-red-50' },
    { label: 'Problem Solving', score: 88, badge: 'Excellent', badgeColor: 'text-green-700 bg-green-50' },
    { label: 'Cultural Fit', score: 79, badge: 'Good', badgeColor: 'text-gray-600 bg-gray-100' },
  ],
  questions: [
    {
      id: 'q1',
      number: 1,
      text: 'Describe your experience with React performance optimization.',
      score: 85,
      badge: 'Strong',
      badgeColor: 'text-green-700 bg-green-50',
      feedback: 'You demonstrated solid understanding of React.memo, useMemo, and useCallback. Consider elaborating on profiling tools like the React DevTools Profiler to show deeper expertise.',
    },
    {
      id: 'q2',
      number: 2,
      text: 'How would you design a real-time collaborative editor?',
      score: 68,
      badge: 'Fair',
      badgeColor: 'text-amber-700 bg-amber-50',
      feedback: 'Good high-level architecture but missed discussing conflict resolution (OT vs CRDT). Mentioning WebSockets and operational transforms would strengthen this answer.',
    },
    {
      id: 'q3',
      number: 3,
      text: 'Walk me through how the browser renders a webpage.',
      score: 91,
      badge: 'Excellent',
      badgeColor: 'text-green-700 bg-green-50',
      feedback: 'Excellent coverage of the critical rendering path, including DOM construction, CSSOM, layout, paint, and compositing. You also touched on reflows vs repaints perfectly.',
    },
  ],
  communication: {
    wpm: 142,
    wpmTarget: 160,
    fillerWords: ['um', 'like', 'you know'],
    fillerCounts: [14, 8, 5],
    pauseScore: 72,
  },
  focusAreas: [
    { area: 'System Design depth', priority: 'High', color: 'text-red-600 bg-red-50' },
    { area: 'Reduce filler words', priority: 'Medium', color: 'text-amber-600 bg-amber-50' },
    { area: 'Quantify impact in STAR answers', priority: 'Medium', color: 'text-amber-600 bg-amber-50' },
  ],
};

export const mockInterviewHistory = [
  { id: 'h1', role: 'Senior Frontend Eng.', company: 'Google', date: 'Apr 28', score: 78, badge: 'Good' },
  { id: 'h2', role: 'React Developer', company: 'Meta', date: 'Apr 22', score: 82, badge: 'Strong' },
  { id: 'h3', role: 'UI Engineer', company: 'Stripe', date: 'Apr 15', score: 71, badge: 'Fair' },
];

export const mockPersonas = [
  { id: 'p1', name: 'The Technician', description: 'Deep dives on implementation details', difficulty: 'Hard', icon: '⚙️' },
  { id: 'p2', name: 'The Architect', description: 'Focuses on system design & scalability', difficulty: 'Hard', icon: '🏗️' },
  { id: 'p3', name: 'The Mentor', description: 'Supportive, coaching style', difficulty: 'Easy', icon: '🎓' },
  { id: 'p4', name: 'The Skeptic', description: 'Challenges every answer critically', difficulty: 'Hard', icon: '🤨' },
  { id: 'p5', name: 'The Friendly PM', description: 'Product thinking & trade-offs', difficulty: 'Medium', icon: '💼' },
  { id: 'p6', name: 'The Speed Round', description: 'Rapid-fire quick questions', difficulty: 'Medium', icon: '⚡' },
];

export const mockBillingHistory = [
  { date: 'Apr 1, 2026', description: 'Pro Plan – Monthly', amount: '$29.00', status: 'Paid' },
  { date: 'Mar 1, 2026', description: 'Pro Plan – Monthly', amount: '$29.00', status: 'Paid' },
  { date: 'Feb 1, 2026', description: 'Pro Plan – Monthly', amount: '$29.00', status: 'Paid' },
];

export const mockSessions = [
  { device: 'Chrome on macOS', location: 'San Francisco, CA', lastActive: 'Active now', current: true },
  { device: 'Safari on iPhone', location: 'San Francisco, CA', lastActive: '2 hours ago', current: false },
  { device: 'Firefox on Windows', location: 'New York, NY', lastActive: '3 days ago', current: false },
];
