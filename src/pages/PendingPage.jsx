import { useAuth } from '../contexts/AuthContext'

export default function PendingPage() {
  const { currentUser, logout, refreshRole } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-red-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* School header */}
        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-red-900 text-2xl font-bold shadow-lg mx-auto mb-4 select-none">
          ✟
        </div>
        <h1 className="text-xl font-extrabold text-white mb-1">SMAPS-SIS Tutorial Portal</h1>
        <p className="text-red-300 text-sm mb-8">St. Michael the Archangel Parochial School</p>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-5xl mb-4 select-none">⏳</div>
          <h2 className="text-xl font-bold text-red-900 mb-2">Account Pending Approval</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-1">
            Your account has been created successfully.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            A school administrator will assign your role shortly. Once approved, you'll have access
            to your tutorials.
          </p>

          {currentUser && (
            <div className="bg-gray-50 rounded-xl px-4 py-3 mb-6 text-left">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">
                Signed in as
              </p>
              <p className="text-gray-800 font-semibold text-sm truncate">
                {currentUser.displayName || currentUser.email}
              </p>
              {currentUser.displayName && (
                <p className="text-gray-400 text-xs truncate">{currentUser.email}</p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={refreshRole}
              className="w-full py-3 bg-red-800 hover:bg-red-700 text-white font-bold rounded-xl transition-colors duration-200 text-sm"
            >
              Check Approval Status
            </button>
            <button
              onClick={logout}
              className="w-full py-3 border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-semibold rounded-xl transition-colors duration-200 text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>

        <p className="text-red-400 text-xs mt-6">
          © {new Date().getFullYear()} St. Michael the Archangel Parochial School
        </p>
      </div>
    </div>
  )
}
