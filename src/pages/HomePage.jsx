import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BANNER_URL =
  'https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/480198983_1091607002762482_8548530664698558169_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeHXS60QWgmzv58HH859Fuxid4MKaE9Zd3V3gwpoT1l3dfmjVy1XpPuCS1Ny1pbpJG9_BldH9oHpdBjiX60bzFw9&_nc_ohc=B9LXIKclRMsQ7kNvwGljNIo&_nc_oc=AdoUnt4sTaRn29dT7E2nDKEK89MODWEWCeJsYhsGs2eXND0Gf3vuy1FnN9M6rEQS4y0&_nc_zt=23&_nc_ht=scontent.filo1-1.fna&_nc_gid=ulT6Wpw4CgPaIkAIPrqnSw&_nc_ss=7a3a8&oh=00_Afznot7HBtSLNWceYPwC6ZJfpfTol9MoHhJNykHli4O9Qg&oe=69D045F8'

export default function HomePage() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(null) // 'admin' | 'parent' | null
  const [bannerError, setBannerError] = useState(false)

  const roles = [
    {
      key: 'teacher',
      label: 'Teacher',
      icon: '👩‍🏫',
      description: 'Access SMAPS-SIS teacher tutorials and step-by-step video guides.',
      cta: 'Get Started →',
      available: true,
      cardClass:
        'bg-white border-2 border-transparent hover:border-amber-400 hover:shadow-2xl hover:-translate-y-1 text-gray-800',
      ctaClass: 'text-amber-600 font-semibold',
    },
    {
      key: 'admin',
      label: 'Admin',
      icon: '👨‍💼',
      description: 'Administrative staff portal and system management tutorials.',
      cta: 'Coming Soon 🔒',
      available: false,
      cardClass:
        'bg-white/10 border-2 border-white/20 hover:border-amber-400/40 hover:shadow-xl hover:-translate-y-0.5 text-white',
      ctaClass: 'text-amber-400/70',
    },
    {
      key: 'parent',
      label: 'Parent',
      icon: '👨‍👩‍👧',
      description: 'Parent portal guides, how-to videos, and enrollment tutorials.',
      cta: 'Coming Soon 🔒',
      available: false,
      cardClass:
        'bg-white/10 border-2 border-white/20 hover:border-amber-400/40 hover:shadow-xl hover:-translate-y-0.5 text-white',
      ctaClass: 'text-amber-400/70',
    },
  ]

  const handleSelect = (role) => {
    if (role.available) {
      navigate('/teacher')
    } else {
      setShowModal(role.key)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex flex-col">
      {/* ── Header ── */}
      <header className="text-center pt-10 pb-4 px-4">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-14 h-14 bg-amber-400 rounded-full flex items-center justify-center text-blue-900 text-2xl shadow-lg select-none">
            ✟
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
          St. Michael the Archangel
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-amber-400 mt-1">
          Parochial School
        </h2>
        <p className="text-blue-200 mt-3 text-base md:text-lg font-medium">
          SMAPS-SIS Tutorial Portal
        </p>
      </header>

      {/* ── Banner Image ── */}
      <div className="mx-auto w-full max-w-4xl px-4 mt-6">
        <div className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-amber-400/20">
          {bannerError ? (
            <div className="w-full h-52 md:h-72 bg-blue-800 flex flex-col items-center justify-center text-center p-8">
              <div className="text-6xl mb-3 select-none">✟</div>
              <p className="text-white text-xl font-semibold">
                St. Michael the Archangel Parochial School
              </p>
              <p className="text-blue-200 mt-2 text-sm">Excellence in Catholic Education</p>
            </div>
          ) : (
            <img
              src={BANNER_URL}
              alt="St. Michael the Archangel Parochial School Banner"
              className="w-full h-52 md:h-72 object-cover"
              onError={() => setBannerError(true)}
            />
          )}
        </div>
      </div>

      {/* ── Welcome Copy ── */}
      <div className="text-center px-4 mt-8 mb-6">
        <h3 className="text-white text-xl md:text-2xl font-bold">
          Welcome to the SIS Tutorial Portal
        </h3>
        <p className="text-blue-200 mt-2 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Select your role below to access video tutorials and guides for the School Information
          System. Learn at your own pace, anytime.
        </p>
      </div>

      {/* ── Role Cards ── */}
      <div className="flex-1 flex flex-col justify-center px-4 pb-12">
        <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest text-center mb-5">
          I am a…
        </p>
        <div className="max-w-3xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role) => (
            <button
              key={role.key}
              onClick={() => handleSelect(role)}
              className={`group rounded-2xl p-6 shadow-lg transition-all duration-300 text-left cursor-pointer ${role.cardClass}`}
            >
              <div className="text-4xl mb-3 select-none">{role.icon}</div>
              <h3 className="font-bold text-xl mb-1">{role.label}</h3>
              <p className={`text-sm leading-relaxed mb-4 ${role.available ? 'text-gray-500' : 'text-blue-300'}`}>
                {role.description}
              </p>
              <p className={`text-sm ${role.ctaClass} group-hover:underline`}>{role.cta}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Coming Soon Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(null)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl mb-4 select-none">🚧</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Coming Soon!</h3>
            <p className="text-gray-600 mb-1">
              The{' '}
              <span className="font-semibold text-blue-800">
                {showModal === 'admin' ? 'Admin' : 'Parent'}
              </span>{' '}
              portal is currently under development.
            </p>
            <p className="text-gray-400 text-sm mb-7">
              We're working hard to bring this feature to you. Check back soon!
            </p>
            <button
              onClick={() => setShowModal(null)}
              className="w-full bg-blue-900 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="text-center py-5 text-blue-500 text-xs">
        <p>© {new Date().getFullYear()} St. Michael the Archangel Parochial School</p>
        <p className="mt-0.5 text-blue-600">SMAPS-SIS Tutorial Portal</p>
      </footer>
    </div>
  )
}
