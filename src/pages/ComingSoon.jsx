import { useNavigate } from 'react-router-dom'

const roleConfig = {
  Admin: {
    icon: '👨‍💼',
    gradient: 'from-red-950 via-red-900 to-red-800',
    features: [
      'System configuration tutorials',
      'User management guides',
      'Reports & data export walkthroughs',
      'School-year setup instructions',
    ],
  },
  Parent: {
    icon: '👨‍👩‍👧',
    gradient: 'from-red-950 via-rose-900 to-red-800',
    features: [
      "How to view your child's grades",
      'Checking attendance records',
      'Accessing class schedules',
      'Updating contact information',
    ],
  },
}

export default function ComingSoon({ role }) {
  const navigate = useNavigate()
  const config = roleConfig[role] ?? {
    icon: '🚧',
    gradient: 'from-red-950 to-red-800',
    features: [],
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${config.gradient} flex flex-col items-center justify-center p-4`}
    >
      <div className="bg-white rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl text-center">
        {/* Icon */}
        <div className="text-7xl mb-5 select-none">{config.icon}</div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{role} Portal</h1>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-red-700 rounded-full px-4 py-1.5 font-semibold text-sm mb-5">
          <span>🚧</span> Coming Soon
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          We're currently building the{' '}
          <span className="font-semibold text-gray-700">{role.toLowerCase()}</span> tutorials
          section. It will be available soon with comprehensive step-by-step video guides.
        </p>

        {/* Feature preview */}
        {config.features.length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-7 text-left">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              What's coming
            </p>
            <ul className="space-y-2">
              {config.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-yellow-500 mt-0.5 shrink-0">✦</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="w-full bg-red-800 text-white font-semibold py-3 rounded-xl hover:bg-red-700 transition-colors"
        >
          ← Back to Home
        </button>
      </div>

      <p className="text-white/30 text-xs mt-8 text-center">
        © {new Date().getFullYear()} St. Michael the Archangel Parochial School
      </p>
    </div>
  )
}
