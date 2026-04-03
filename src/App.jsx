import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TeacherDashboard from './pages/TeacherDashboard'
import ParentDashboard from './pages/ParentDashboard'
import VideoPlayer from './pages/VideoPlayer'
import ComingSoon from './pages/ComingSoon'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/teacher/video/:videoId" element={<VideoPlayer />} />
      <Route path="/parent" element={<ParentDashboard />} />
      <Route path="/parent/video/:videoId" element={<VideoPlayer />} />
      <Route path="/admin" element={<ComingSoon role="Admin" />} />
    </Routes>
  )
}

export default App
