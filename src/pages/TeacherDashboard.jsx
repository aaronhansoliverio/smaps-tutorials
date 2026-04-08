import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { modules, getTotalVideos } from '../data/courseData'
import Navbar from '../components/Navbar'

const BANNER_URL =
  'https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/480198983_1091607002762482_8548530664698558169_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeHXS60QWgmzv58HH859Fuxid4MKaE9Zd3V3gwpoT1l3dfmjVy1XpPuCS1Ny1pbpJG9_BldH9oHpdBjiX60bzFw9&_nc_ohc=B9LXIKclRMsQ7kNvwGljNIo&_nc_oc=AdoUnt4sTaRn29dT7E2nDKEK89MODWEWCeJsYhsGs2eXND0Gf3vuy1FnN9M6rEQS4y0&_nc_zt=23&_nc_ht=scontent.filo1-1.fna&_nc_gid=ulT6Wpw4CgPaIkAIPrqnSw&_nc_ss=7a3a8&oh=00_Afznot7HBtSLNWceYPwC6ZJfpfTol9MoHhJNykHli4O9Qg&oe=69D045F8'

export default function TeacherDashboard() {
  const navigate = useNavigate()
  const [openModules, setOpenModules] = useState([1])
  const [completedVideos, setCompletedVideos] = useState(() => {
    const saved = localStorage.getItem('smaps_completed_videos')
    return saved ? JSON.parse(saved) : []
  })
  const [bannerError, setBannerError] = useState(false)

  const totalVideos = getTotalVideos()
  const completedCount = completedVideos.length
  const progressPercent = totalVideos > 0 ? Math.round((completedCount / totalVideos) * 100) : 0

  const toggleModule = (id) => {
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar title="SMAPS-SIS Teacher Tutorials" showBack backTo="/" backLabel="Home" />

      {/* ── Course Hero ── */}
      <div className="bg-gradient-to-r from-red-950 to-red-800 text-white">
        {/* Banner strip */}
        {!bannerError && (
          <div className="h-28 md:h-40 overflow-hidden opacity-30">
            <img
              src={BANNER_URL}
              alt=""
              className="w-full h-full object-cover object-top"
              onError={() => setBannerError(true)}
            />
          </div>
        )}

        <div className="max-w-5xl mx-auto px-4 py-6 -mt-2">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-400 text-red-900 rounded-2xl p-3 text-3xl shadow-lg shrink-0 select-none">
              📚
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">
                St. Michael the Archangel Parochial School
              </p>
              <h1 className="text-xl md:text-3xl font-extrabold leading-tight">
                SMAPS-SIS Teacher Tutorials
              </h1>
              <p className="text-red-200 mt-2 text-sm leading-relaxed max-w-2xl">
                Complete video tutorial series for teachers. Learn how to manage your classroom,
                enter grades, record attendance, and more — at your own pace.
              </p>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-red-300">
                <span>📹 {totalVideos} videos</span>
                <span>📦 {modules.length} modules</span>
                <span>🕐 Self-paced</span>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mt-6 bg-red-900/50 rounded-2xl p-4 border border-red-700/40">
            <div className="flex justify-between items-center mb-2">
              <span className="text-red-200 text-sm font-medium">Overall Progress</span>
              <span className="text-white text-sm font-bold">
                {completedCount} / {totalVideos} videos
              </span>
            </div>
            <div className="w-full bg-red-950/60 rounded-full h-3">
              <div
                className="bg-yellow-400 h-3 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-red-300 text-xs mt-2">{progressPercent}% complete</p>
          </div>
        </div>
      </div>

      {/* ── Modules ── */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Course Modules
        </h2>

        {modules.map((module) => {
          const isOpen = openModules.includes(module.id)
          const moduleCompleted = module.videos.filter((v) => completedVideos.includes(v.id)).length
          const modulePct = Math.round((moduleCompleted / module.videos.length) * 100)
          const allDone = moduleCompleted === module.videos.length

          return (
            <div
              key={module.id}
              className={`rounded-2xl border-2 ${module.borderColor} overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200`}
            >
              {/* Module header button */}
              <button
                onClick={() => toggleModule(module.id)}
                className={`w-full ${module.headerColor} text-white px-5 py-4 flex items-center gap-4 text-left hover:brightness-110 transition-all duration-200`}
              >
                <span className="text-3xl shrink-0 select-none">{module.icon}</span>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base md:text-lg leading-snug">{module.title}</h3>
                  <p className="text-white/70 text-xs mt-0.5 line-clamp-1 hidden sm:block">
                    {module.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {allDone && (
                    <span className="bg-yellow-400 text-red-900 text-xs font-bold px-2 py-0.5 rounded-full">
                      ✓ Done
                    </span>
                  )}
                  <span
                    className={`${module.badgeColor} text-xs font-semibold px-2.5 py-1 rounded-full`}
                  >
                    {moduleCompleted}/{module.videos.length}
                  </span>
                  <svg
                    className={`w-4 h-4 text-white/70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Module progress line */}
              {modulePct > 0 && (
                <div className="h-1 bg-gray-200">
                  <div
                    className="bg-yellow-400 h-1 transition-all duration-700"
                    style={{ width: `${modulePct}%` }}
                  />
                </div>
              )}

              {/* Video list */}
              {isOpen && (
                <div className={`${module.bgColor} divide-y divide-gray-100/80`}>
                  {module.videos.map((video, idx) => {
                    const done = completedVideos.includes(video.id)
                    return (
                      <button
                        key={video.id}
                        onClick={() => navigate(`/teacher/video/${video.id}`)}
                        className="group w-full flex items-center gap-4 px-5 py-4 hover:bg-white/70 transition-colors text-left"
                      >
                        {/* Index / checkmark */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-all duration-200 ${
                            done
                              ? 'bg-green-500 text-white'
                              : 'bg-white border-2 border-gray-300 text-gray-500 group-hover:border-red-400 group-hover:text-red-600'
                          }`}
                        >
                          {done ? '✓' : idx + 1}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-semibold text-sm md:text-base transition-colors duration-200 ${
                              done
                                ? 'text-green-700'
                                : 'text-gray-800 group-hover:text-red-800'
                            }`}
                          >
                            {video.title}
                          </p>
                          <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
                            {video.description}
                          </p>
                        </div>

                        {/* Duration + play button */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-gray-400 text-xs hidden sm:block">{video.duration}</span>
                          <div className="w-9 h-9 bg-red-800 text-white rounded-full flex items-center justify-center text-xs group-hover:bg-red-700 group-hover:scale-110 transition-all duration-200 shadow">
                            ▶
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Footer ── */}
      <footer className="text-center py-8 text-gray-400 text-xs">
        <p>© {new Date().getFullYear()} St. Michael the Archangel Parochial School</p>
      </footer>
    </div>
  )
}
