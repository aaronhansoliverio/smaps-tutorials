import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar({ title, showBack, backTo, backLabel, dark = false, onMenuClick }) {
  const navigate = useNavigate()
  const { currentUser, userRole, isSuperAdmin, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    setMenuOpen(false)
    await logout()
    navigate('/login', { replace: true })
  }

  const initials = currentUser
    ? (currentUser.displayName || currentUser.email || '?')[0].toUpperCase()
    : '?'

  return (
    <nav
      className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 shadow-md z-10 ${
        dark ? 'bg-gray-900 border-b border-gray-700' : 'bg-red-800'
      }`}
    >
      {showBack && (
        <button
          onClick={() => navigate(backTo || -1)}
          className="flex items-center gap-1.5 text-white/75 hover:text-white transition-colors text-sm font-medium shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:block">{backLabel || 'Back'}</span>
        </button>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest hidden sm:block leading-none mb-0.5">
          SMAPS-SIS Tutorials
        </p>
        <h1 className="text-white font-bold text-sm md:text-base truncate leading-tight">{title}</h1>
      </div>

      {/* Mobile sidebar toggle */}
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          className="lg:hidden text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0"
          aria-label="Toggle course sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
      )}

      {/* ── User menu ── */}
      {currentUser && (
        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full hover:ring-2 hover:ring-yellow-400/60 transition-all duration-200 p-0.5"
            aria-label="User menu"
          >
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt=""
                className="w-8 h-8 rounded-full object-cover ring-2 ring-yellow-400/40"
              />
            ) : (
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-red-900 font-bold text-sm select-none">
                {initials}
              </div>
            )}
          </button>

          {menuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                {/* User info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-semibold text-gray-800 text-sm truncate">
                    {currentUser.displayName || 'User'}
                  </p>
                  <p className="text-gray-400 text-xs truncate">{currentUser.email}</p>
                  <span
                    className={`inline-block mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${
                      userRole === 'admin'   ? 'bg-red-100 text-red-700' :
                      userRole === 'teacher' ? 'bg-blue-100 text-blue-700' :
                      userRole === 'parent'  ? 'bg-green-100 text-green-700' :
                                               'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {userRole || 'pending'}
                  </span>
                </div>

                {/* User Management — superadmin only */}
                {isSuperAdmin && (
                  <button
                    onClick={() => { setMenuOpen(false); navigate('/admin') }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left border-b border-gray-100"
                  >
                    <span>🛡️</span>
                    <span>User Management</span>
                  </button>
                )}

                {/* Home */}
                <button
                  onClick={() => { setMenuOpen(false); navigate('/') }}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                >
                  <span>🏠</span>
                  <span>Home</span>
                </button>

                {/* Sign out */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left border-t border-gray-100"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-semibold">Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Cross badge (shown when no user) */}
      {!currentUser && (
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-red-900 font-bold text-sm shrink-0 shadow-sm select-none">
          ✟
        </div>
      )}
    </nav>
  )
}
