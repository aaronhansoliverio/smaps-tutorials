import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PendingPage from './pages/PendingPage'
import TeacherDashboard from './pages/TeacherDashboard'
import ParentDashboard from './pages/ParentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import VideoPlayer from './pages/VideoPlayer'
import AdminPanel from './pages/AdminPanel'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* ── Public ── */}
        <Route path="/login"   element={<LoginPage />} />
        <Route path="/pending" element={<PendingPage />} />

        {/* ── Protected: any authenticated + approved user ── */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={['teacher', 'parent', 'admin']}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* ── Teacher section ── */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={['teacher', 'admin']}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/video/:videoId"
          element={
            <ProtectedRoute allowedRoles={['teacher', 'admin']}>
              <VideoPlayer />
            </ProtectedRoute>
          }
        />

        {/* ── Parent section ── */}
        <Route
          path="/parent"
          element={
            <ProtectedRoute allowedRoles={['parent', 'admin']}>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/video/:videoId"
          element={
            <ProtectedRoute allowedRoles={['parent', 'admin']}>
              <VideoPlayer />
            </ProtectedRoute>
          }
        />

        {/* ── Admin tutorial section ── */}
        <Route
          path="/admin-tutorials"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-tutorials/video/:videoId"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <VideoPlayer />
            </ProtectedRoute>
          }
        />

        {/* ── User Management Panel — Super admin only ── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']} requireSuperAdmin>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* ── Catch-all ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
