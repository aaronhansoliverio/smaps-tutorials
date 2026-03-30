import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TeacherDashboard from './pages/TeacherDashboard'
import VideoPlayer from './pages/VideoPlayer'
import ComingSoon from './pages/ComingSoon'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/teacher/video/:videoId" element={<VideoPlayer />} />
      <Route path="/admin" element={<ComingSoon role="Admin" />} />
      <Route path="/parent" element={<ComingSoon role="Parent" />} />
    </Routes>
  )
}

export default App
