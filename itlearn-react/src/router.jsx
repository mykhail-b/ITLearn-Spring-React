import { Routes, Route, Navigate } from 'react-router-dom'

import Courses from './components/Courses'
// import Leaderboard from './components/Leaderboard'
// import Profile from './components/Profile'
// import Login from './views/Login'
// import Register from './views/Register'
import Crud from './views/Crud'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/courses" replace />} />

      {/* Main Pages */}
      <Route path="/courses" element={<Courses />} />
      {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
      {/* <Route path="/profile" element={<Profile />} /> */}

      <Route path="/crud" element={<Crud />} />


      {/* Auth */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/register" element={<Register />} /> */}

      <Route path="*" element={<Navigate to="/courses" replace />} />
    </Routes>
  )
}
