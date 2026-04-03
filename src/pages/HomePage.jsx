import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const BANNER_URL =
  'https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/480198983_1091607002762482_8548530664698558169_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeHXS60QWgmzv58HH859Fuxid4MKaE9Zd3V3gwpoT1l3dfmjVy1XpPuCS1Ny1pbpJG9_BldH9oHpdBjiX60bzFw9&_nc_ohc=B9LXIKclRMsQ7kNvwGljNIo&_nc_oc=AdoUnt4sTaRn29dT7E2nDKEK89MODWEWCeJsYhsGs2eXND0Gf3vuy1FnN9M6rEQS4y0&_nc_zt=23&_nc_ht=scontent.filo1-1.fna&_nc_gid=ulT6Wpw4CgPaIkAIPrqnSw&_nc_ss=7a3a8&oh=00_Afznot7HBtSLNWceYPwC6ZJfpfTol9MoHhJNykHli4O9Qg&oe=69D045F8'

// Which roles may access each section.
const ROLE_ACCESS = {
  teacher: ['teacher', 'admin'],
  parent:  ['parent',  'admin'],
  admin:   ['admin'],
}

export default function HomePage() {
  const navigate = useNavigate()
  const { currentUser, userRole, logout } = useAuth()
  const [bannerError, setBannerError] = useState(false)

  const canAccess = (key) =>
    userRole && ROLE_ACCESS[key]?.includes(userRole)

  const roles = [
    {
      key: 'teacher',
      label: 'Teacher',
      icon: '👩‍🏫',
      description: 'Access SMAPS-SIS teacher tutorials and step-by-step video guides.',
      path: '/teacher',
      ready: true,
    },
    {
      key: 'admin',
      label: 'Admin',
      icon: '👨‍💼',
      description: 'Administrative staff portal and system management tutorials.',
      path: '/admin',
      ready: false,  // Coming soon
    },
    {
      key: 'parent',
      label: 'Parent',
      icon: '👨‍👩‍👧',
      description: 'Parent portal guides, how-to videos, and enrollment tutorials.',
      path: '/parent',
      ready: true,
    },
  ]

  const handleSelect = (role) => {
    if (canAccess(role.key)) {
      navigate(role.path)
    }
    // If locked, do nothing — the card shows a visual indicator
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-red-800 flex flex-col">
      {/* ── Header ── */}
      <header className="text-center pt-10 pb-4 px-4">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center text-red-900 text-2xl shadow-lg select-none font-bold">
            ✟
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
          St. Michael the Archangel
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-yellow-400 mt-1">
          Parochial School
        </h2>
        <p className="text-red-200 mt-3 text-base md:text-lg font-medium">
          SMAPS-SIS Tutorial Portal
        </p>

        {/* Signed-in user chip */}
        {currentUser && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="" className="w-5 h-5 rounded-full" />
              ) : (
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-red-900 text-xs font-bold select-none">
                  {(currentUser.displayName || currentUser.email || '?')[0].toUpperCase()}
                </div>
              )}
              <span className="text-white text-xs font-medium">
                {currentUser.displayName || currentUser.email}
              </span>
              <span
                className={`text-xs font-semibold px-1.5 py-0.5 rounded-full capitalize ${
                  userRole === 'admin'   ? 'bg-red-400/30 text-red-200' :
                  userRole === 'teacher' ? 'bg-blue-400/30 text-blue-200' :
                  userRole === 'parent'  ? 'bg-green-400/30 text-green-200' :
                                           'bg-yellow-400/30 text-yellow-200'
                }`}
              >
                {userRole}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-white/50 hover:text-white/80 text-xs transition-colors"
              title="Sign out"
            >
              Sign out
            </button>
          </div>
        )}
      </header>

      {/* ── Banner Image ── */}
      <div className="mx-auto w-full max-w-4xl px-4 mt-6">
        <div className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-yellow-400/30">
          {bannerError ? (
            <div className="w-full h-52 md:h-72 bg-red-800 flex flex-col items-center justify-center text-center p-8">
              <div className="text-6xl mb-3 select-none">✟</div>
              <p className="text-white text-xl font-semibold">
                St. Michael the Archangel Parochial School
              </p>
              <p className="text-red-200 mt-2 text-sm">Excellence in Catholic Education</p>
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
        <p className="text-red-200 mt-2 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          {userRole === 'admin'
            ? 'You have full access to all sections and user management.'
            : 'Your role determines which section you can access below.'}
        </p>
      </div>

      {/* ── Role Cards ── */}
      <div className="flex-1 flex flex-col justify-center px-4 pb-12">
        <p className="text-red-300 text-xs font-semibold uppercase tracking-widest text-center mb-5">
          I am a…
        </p>
        <div className="max-w-3xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role) => {
            const accessible = canAccess(role.key) && role.ready
            const locked = !role.ready
            return (
              <button
                key={role.key}
                onClick={() => handleSelect(role)}
                disabled={!accessible}
                className={`group rounded-2xl p-6 shadow-lg transition-all duration-300 text-left relative overflow-hidden ${
                  accessible
                    ? 'bg-white border-2 border-transparent hover:border-yellow-400 hover:shadow-2xl hover:-translate-y-1 text-gray-800 cursor-pointer'
                    : 'bg-white/10 border-2 border-white/10 text-white/50 cursor-not-allowed'
                }`}
              >
                {/* Lock badge for locked/unavailable cards */}
                {locked && (
                  <div className="absolute top-3 right-3 bg-white/10 rounded-full p-1">
                    <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                )}

                <div className={`text-4xl mb-3 select-none ${!accessible ? 'opacity-40' : ''}`}>
                  {role.icon}
                </div>
                <h3 className={`font-bold text-xl mb-1 ${!accessible ? 'text-white/40' : ''}`}>
                  {role.label}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${
                  accessible ? 'text-gray-500' : 'text-white/30'
                }`}>
                  {role.description}
                </p>
                <p className={`text-sm font-semibold ${
                  accessible
                    ? 'text-red-700 group-hover:underline'
                    : 'text-white/30'
                }`}>
                  {accessible ? 'Get Started →' : locked ? 'Coming Soon' : 'No Access'}
                </p>
              </button>
            )
          })}
        </div>

      </div>

      {/* ── Footer ── */}
      <footer className="text-center pb-6 pt-4 text-red-400 text-xs">
        {/* Social / External Links */}
        <div className="flex items-center justify-center gap-6 mb-4">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/smapssmii"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SMAPS Facebook Page"
            className="group flex flex-col items-center gap-1.5 transition-transform duration-200 hover:scale-110"
          >
            <div className="w-11 h-11 bg-[#1877F2] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-400/40 group-hover:shadow-xl transition-shadow duration-200">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.532-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
              </svg>
            </div>
            <span className="text-red-300 text-xs font-medium group-hover:text-white transition-colors duration-200">Facebook</span>
          </a>

          {/* SMAPS-SIS Portal */}
          <a
            href="https://smaps-sis.base44.app/login"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SMAPS-SIS Student Portal"
            className="group flex flex-col items-center gap-1.5 transition-transform duration-200 hover:scale-110"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden shadow-lg ring-2 ring-yellow-400/40 group-hover:ring-yellow-400 group-hover:shadow-yellow-400/30 group-hover:shadow-xl transition-all duration-200 bg-white">
              <img
                src="https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/367997140_758570752732777_7988798035132123966_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeECzXPJVvSUKj-VPDJFqb0xFXpXWUz8k-hFeldZTPhT6JknlCvO5kH6hOvKDV-UOTg_FmovH_z1Nc2kPksMm_5C&_nc_ohc=fD3zVECT-9AQ7kNvwFH0K6J&_nc_oc=AdlL5I4TQDtpx4pSZ0kVm1vWVhTdIr4yoUrV56VLRJ80EVb1FS_kTvxwPsTNy4TpFgg&_nc_zt=23&_nc_ht=scontent.filo1-1.fna&_nc_gid=yF9fJGPf5i7EBzDJaqiWRiA&oh=00_AfAjMVJHGgDpPyWXqBM0r3lDRSAXIV5i6Hm5MJZQwnKfhA&oe=67F8CF78"
                alt="SMAPS-SIS"
                className="w-full h-full object-cover mix-blend-multiply"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<span style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;color:#991b1b;">SIS</span>'
                }}
              />
            </div>
            <span className="text-red-300 text-xs font-medium group-hover:text-white transition-colors duration-200">SIS Portal</span>
          </a>
        </div>

        <p>© {new Date().getFullYear()} St. Michael the Archangel Parochial School</p>
        <p className="mt-0.5 text-red-500">SMAPS-SIS Tutorial Portal</p>
      </footer>
    </div>
  )
}
