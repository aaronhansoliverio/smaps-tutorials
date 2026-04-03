import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ROLE_REDIRECTS = { admin: '/', teacher: '/teacher', parent: '/parent' }

export default function LoginPage() {
  const { currentUser, userRole, loginWithGoogle, loginWithEmail, signupWithEmail, resetPassword } =
    useAuth()
  const navigate = useNavigate()

  const [mode, setMode]         = useState('signin')   // 'signin' | 'signup' | 'reset'
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]         = useState('')
  const [error, setError]       = useState('')
  const [info, setInfo]         = useState('')
  const [busy, setBusy]         = useState(false)

  // Already logged in → send to their dashboard.
  if (currentUser) {
    const dest = ROLE_REDIRECTS[userRole] ?? '/pending'
    return <Navigate to={dest} replace />
  }

  const clearMessages = () => { setError(''); setInfo('') }

  // ── Google sign-in ────────────────────────────────────────
  const handleGoogle = async () => {
    clearMessages()
    setBusy(true)
    try {
      await loginWithGoogle()
      // onAuthStateChanged will update userRole; Navigate above redirects.
    } catch (e) {
      setError(friendlyError(e.code))
    } finally {
      setBusy(false)
    }
  }

  // ── Email submit ──────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    clearMessages()
    setBusy(true)
    try {
      if (mode === 'reset') {
        await resetPassword(email)
        setInfo('Password reset email sent! Check your inbox.')
        setMode('signin')
      } else if (mode === 'signup') {
        await signupWithEmail(email, password, name)
      } else {
        await loginWithEmail(email, password)
      }
    } catch (err) {
      setError(friendlyError(err.code))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-red-800 flex flex-col items-center justify-center p-4">
      {/* ── Card ── */}
      <div className="w-full max-w-md">
        {/* School header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-red-900 text-2xl font-bold shadow-lg mx-auto mb-4 select-none">
            ✟
          </div>
          <h1 className="text-2xl font-extrabold text-white leading-tight">
            St. Michael the Archangel
          </h1>
          <p className="text-yellow-400 font-semibold">Parochial School</p>
          <p className="text-red-300 text-sm mt-1">SMAPS-SIS Tutorial Portal</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-red-900 mb-1 text-center">
            {mode === 'signup' ? 'Create Account' : mode === 'reset' ? 'Reset Password' : 'Sign In'}
          </h2>
          <p className="text-gray-400 text-sm text-center mb-6">
            {mode === 'signup'
              ? 'Sign up to access your tutorials'
              : mode === 'reset'
              ? 'Enter your email to receive a reset link'
              : 'Sign in to access your tutorials'}
          </p>

          {/* Error / info banners */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}
          {info && (
            <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
              {info}
            </div>
          )}

          {/* ── Google button (not shown on reset screen) ── */}
          {mode !== 'reset' && (
            <>
              <button
                onClick={handleGoogle}
                disabled={busy}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-200 font-semibold text-gray-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Google icon */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-gray-400 text-xs font-medium">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
            </>
          )}

          {/* ── Email form ── */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Juan dela Cruz"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none text-sm transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none text-sm transition-colors"
              />
            </div>

            {mode !== 'reset' && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none text-sm transition-colors"
                />
              </div>
            )}

            {mode === 'signin' && (
              <button
                type="button"
                onClick={() => { clearMessages(); setMode('reset') }}
                className="text-xs text-red-600 hover:underline float-right -mt-2"
              >
                Forgot password?
              </button>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full py-3 bg-red-800 hover:bg-red-700 text-white font-bold rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2 clear-both"
            >
              {busy
                ? 'Please wait…'
                : mode === 'signup'
                ? 'Create Account'
                : mode === 'reset'
                ? 'Send Reset Email'
                : 'Sign In'}
            </button>
          </form>

          {/* ── Mode toggle ── */}
          <div className="mt-5 text-center text-sm text-gray-500">
            {mode === 'reset' ? (
              <button
                onClick={() => { clearMessages(); setMode('signin') }}
                className="text-red-700 font-semibold hover:underline"
              >
                ← Back to Sign In
              </button>
            ) : mode === 'signup' ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => { clearMessages(); setMode('signin') }}
                  className="text-red-700 font-semibold hover:underline"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => { clearMessages(); setMode('signup') }}
                  className="text-red-700 font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-red-400 text-xs mt-6">
          © {new Date().getFullYear()} St. Michael the Archangel Parochial School
        </p>
      </div>
    </div>
  )
}

// Convert Firebase error codes into readable messages.
function friendlyError(code) {
  const map = {
    'auth/user-not-found':       'No account found with this email.',
    'auth/wrong-password':       'Incorrect password. Try again.',
    'auth/invalid-credential':   'Incorrect email or password.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password':        'Password must be at least 6 characters.',
    'auth/invalid-email':        'Please enter a valid email address.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
    'auth/too-many-requests':    'Too many attempts. Please wait a moment and try again.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  }
  return map[code] || 'Something went wrong. Please try again.'
}
