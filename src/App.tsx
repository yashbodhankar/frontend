import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
import { NewInterview } from './pages/NewInterview'
import { InterviewReport } from './pages/InterviewReport'
import { ProfilePersonal, ProfileNotifications, ProfileSecurity, ProfileBilling, ProfileHelp, ProfilePrivacy } from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview/new" element={<NewInterview />} />
        <Route path="/interview/report" element={<InterviewReport />} />
        <Route path="/profile" element={<ProfilePersonal />} />
        <Route path="/profile/notifications" element={<ProfileNotifications />} />
        <Route path="/profile/security" element={<ProfileSecurity />} />
        <Route path="/profile/billing" element={<ProfileBilling />} />
        <Route path="/profile/help" element={<ProfileHelp />} />
        <Route path="/profile/privacy" element={<ProfilePrivacy />} />
      </Routes>
    </BrowserRouter>
  )
}
