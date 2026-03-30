import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { allVideos, modules, getVideoById } from '../data/courseData'
import Navbar from '../components/Navbar'

export default function VideoPlayer() {
  const { videoId } = useParams()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [completedVideos, setCompletedVideos] = useState(() => {
    const saved = localStorage.getItem('smaps_completed_videos')
    return saved ? JSON.parse(saved) : []
  })

  const video = getVideoById(videoId)
  const currentIndex = allVideos.findIndex((v) => v.id === videoId)
  const prevVideo = currentIndex > 0 ? allVideos[currentIndex - 1] : null
  const nextVideo = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : null
  const isCompleted = completedVideos.includes(videoId)
  const currentModule = modules.find((m) => m.id === video?.moduleId)

  // Auto-mark as complete on load (optional — remove if you prefer manual only)
  // useEffect(() => { /* could auto-mark here */ }, [videoId])

  const toggleComplete = () => {
    const updated = isCompleted
      ? completedVideos.filter((id) => id !== videoId)
      : [...completedVideos, videoId]
    setCompletedVideos(updated)
    localStorage.setItem('smaps_completed_videos', JSON.stringify(updated))
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar title="Video Not Found" showBack backTo="/teacher" backLabel="Course" dark />
        <div className="flex-1 flex items-center justify-center text-center p-8">
          <div>
            <p className="text-gray-400 text-lg mb-4">This video could not be found.</p>
            <button
              onClick={() => navigate('/teacher')}
              className="text-amber-400 hover:underline font-medium"
            >
              ← Back to Course
            </button>
          </div>
        </div>
      </div>
    )
  }

  const isPlaceholder = video.driveId.startsWith('REPLACE')

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar
        title={video.title}
        showBack
        backTo="/teacher"
        backLabel="Course"
        dark
        onMenuClick={() => setSidebarOpen((prev) => !prev)}
      />

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 52px)' }}>
        {/* ── Main content ── */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Video area */}
          <div className="bg-black w-full">
            <div className="max-w-5xl mx-auto w-full">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                {isPlaceholder ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-white text-center p-6 md:p-10">
                    <div className="text-6xl mb-4 select-none">🎬</div>
                    <p className="text-xl font-bold mb-1">{video.title}</p>
                    <p className="text-gray-400 text-sm max-w-md mb-5">
                      Video not configured yet. Open{' '}
                      <code className="bg-gray-700 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs">
                        src/data/courseData.js
                      </code>{' '}
                      and replace the{' '}
                      <code className="bg-gray-700 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs">
                        driveId
                      </code>{' '}
                      for this video with the Google Drive file ID.
                    </p>
                    <div className="bg-gray-700/60 rounded-xl p-4 text-left text-sm max-w-sm w-full">
                      <p className="text-amber-400 font-semibold text-xs uppercase tracking-wider mb-2">
                        How to get the file ID
                      </p>
                      <ol className="text-gray-300 text-xs space-y-1 list-decimal list-inside">
                        <li>Open your Google Drive folder</li>
                        <li>Right-click the video → Share → Copy link</li>
                        <li>Set access to "Anyone with the link"</li>
                        <li>
                          Copy the ID between{' '}
                          <code className="text-amber-400">/d/</code> and{' '}
                          <code className="text-amber-400">/view</code>
                        </li>
                        <li>Paste it as the driveId value</li>
                      </ol>
                    </div>
                  </div>
                ) : (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://drive.google.com/file/d/${video.driveId}/preview`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={video.title}
                  />
                )}
              </div>
            </div>
          </div>

          {/* ── Video info bar ── */}
          <div className="bg-gray-900 border-b border-gray-700/60">
            <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  {currentModule?.title}
                </p>
                <h1 className="text-white text-lg md:text-2xl font-bold leading-tight">
                  {video.title}
                </h1>
                <p className="text-gray-400 text-sm mt-1 leading-relaxed">{video.description}</p>
              </div>
              <button
                onClick={toggleComplete}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  isCompleted
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-amber-400 hover:bg-amber-300 text-blue-900'
                }`}
              >
                <span>{isCompleted ? '✓' : '○'}</span>
                <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
              </button>
            </div>
          </div>

          {/* ── Prev / Next navigation ── */}
          <div className="bg-gray-800 border-b border-gray-700/60">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
              <button
                onClick={() => prevVideo && navigate(`/teacher/video/${prevVideo.id}`)}
                disabled={!prevVideo}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium"
              >
                ← <span className="hidden md:block truncate max-w-xs">{prevVideo?.title ?? 'Previous'}</span>
                <span className="md:hidden">Prev</span>
              </button>

              <button
                onClick={() => navigate('/teacher')}
                className="px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl transition-colors text-sm font-medium"
              >
                ☰ Modules
              </button>

              <button
                onClick={() => nextVideo && navigate(`/teacher/video/${nextVideo.id}`)}
                disabled={!nextVideo}
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-blue-900 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm font-semibold"
              >
                <span className="hidden md:block truncate max-w-xs">{nextVideo?.title ?? 'Next'}</span>
                <span className="md:hidden">Next</span> →
              </button>
            </div>
          </div>

          <div className="flex-1" />
        </div>

        {/* ── Sidebar — Desktop ── */}
        <aside className="hidden lg:flex flex-col w-80 xl:w-96 bg-gray-800 border-l border-gray-700 overflow-y-auto shrink-0">
          <SidebarContent
            currentVideoId={videoId}
            completedVideos={completedVideos}
            onSelect={(id) => navigate(`/teacher/video/${id}`)}
          />
        </aside>

        {/* ── Sidebar — Mobile overlay ── */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="w-80 bg-gray-800 flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                <h2 className="text-white font-bold">Course Content</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-400 hover:text-white text-xl leading-none p-1"
                >
                  ✕
                </button>
              </div>
              <SidebarContent
                currentVideoId={videoId}
                completedVideos={completedVideos}
                onSelect={(id) => {
                  navigate(`/teacher/video/${id}`)
                  setSidebarOpen(false)
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────── */
/*  Sidebar inner content (shared)         */
/* ─────────────────────────────────────── */
function SidebarContent({ currentVideoId, completedVideos, onSelect }) {
  const currentVideo = allVideos.find((v) => v.id === currentVideoId)
  const [openModules, setOpenModules] = useState(() =>
    currentVideo ? [currentVideo.moduleId] : [1]
  )

  const totalCompleted = completedVideos.length
  const total = allVideos.length

  const toggle = (id) =>
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-700 bg-gray-900/60">
        <h2 className="text-white font-bold text-sm">Course Content</h2>
        <p className="text-gray-400 text-xs mt-0.5">
          {totalCompleted} / {total} completed
        </p>
        {total > 0 && (
          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
            <div
              className="bg-amber-400 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.round((totalCompleted / total) * 100)}%` }}
            />
          </div>
        )}
      </div>

      {/* Module list */}
      <div className="flex-1 overflow-y-auto">
        {modules.map((module) => {
          const isOpen = openModules.includes(module.id)
          const done = module.videos.filter((v) => completedVideos.includes(v.id)).length

          return (
            <div key={module.id} className="border-b border-gray-700/60">
              <button
                onClick={() => toggle(module.id)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-700/50 transition-colors"
              >
                <span className="text-lg shrink-0 select-none">{module.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold leading-snug line-clamp-2">
                    {module.title}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {done}/{module.videos.length} done
                  </p>
                </div>
                <svg
                  className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="bg-gray-900/40">
                  {module.videos.map((video, idx) => {
                    const active = video.id === currentVideoId
                    const isDone = completedVideos.includes(video.id)

                    return (
                      <button
                        key={video.id}
                        onClick={() => onSelect(video.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left text-xs border-l-2 transition-colors ${
                          active
                            ? 'border-amber-400 bg-blue-900/40 text-white'
                            : 'border-transparent hover:bg-gray-700/40 text-gray-300 hover:text-white'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-xs transition-colors ${
                            isDone
                              ? 'bg-green-500 text-white'
                              : active
                              ? 'bg-amber-400 text-blue-900'
                              : 'bg-gray-600 text-gray-400'
                          }`}
                        >
                          {isDone ? '✓' : idx + 1}
                        </div>
                        <span className="flex-1 line-clamp-2 leading-snug">{video.title}</span>
                        {active && (
                          <span className="text-amber-400 text-xs shrink-0 font-semibold">▶</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
