import { useNavigate } from 'react-router-dom'

export default function Navbar({ title, showBack, backTo, backLabel, dark = false, onMenuClick }) {
  const navigate = useNavigate()

  return (
    <nav
      className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 shadow-md z-10 ${
        dark ? 'bg-gray-900 border-b border-gray-700' : 'bg-blue-900'
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
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest hidden sm:block leading-none mb-0.5">
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

      {/* School cross badge */}
      <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-blue-900 font-bold text-sm shrink-0 shadow-sm select-none">
        ✟
      </div>
    </nav>
  )
}
