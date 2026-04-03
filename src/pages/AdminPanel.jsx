import { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'

const ROLES = ['admin', 'teacher', 'parent', 'pending']

const ROLE_STYLES = {
  admin:   'bg-red-100 text-red-800 border-red-200',
  teacher: 'bg-blue-100 text-blue-800 border-blue-200',
  parent:  'bg-green-100 text-green-800 border-green-200',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
}

const ROLE_ICONS = {
  admin:   '🛡️',
  teacher: '👩‍🏫',
  parent:  '👨‍👩‍👧',
  pending: '⏳',
}

export default function AdminPanel() {
  const { currentUser } = useAuth()
  const [users, setUsers]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(null)    // uid of the row being saved
  const [filter, setFilter]     = useState('all')   // 'all' | 'pending' | 'teacher' | 'parent' | 'admin'
  const [search, setSearch]     = useState('')
  const [feedback, setFeedback] = useState(null)    // { uid, message }

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const q    = query(collection(db, 'users'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (e) {
      console.error('Failed to load users:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const handleRoleChange = async (uid, newRole) => {
    setSaving(uid)
    try {
      await updateDoc(doc(db, 'users', uid), { role: newRole })
      setUsers((prev) => prev.map((u) => (u.id === uid ? { ...u, role: newRole } : u)))
      setFeedback({ uid, message: `Role updated to ${newRole}` })
      setTimeout(() => setFeedback(null), 3000)
    } catch (e) {
      console.error('Failed to update role:', e)
    } finally {
      setSaving(null)
    }
  }

  // ── Filtered + searched list ──
  const displayed = users.filter((u) => {
    const matchRole   = filter === 'all' || u.role === filter
    const matchSearch = !search ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.displayName?.toLowerCase().includes(search.toLowerCase())
    return matchRole && matchSearch
  })

  const counts = ROLES.reduce((acc, r) => {
    acc[r] = users.filter((u) => u.role === r).length
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar title="Admin — User Management" showBack backTo="/" backLabel="Home" />

      <div className="max-w-5xl mx-auto w-full px-4 py-8">
        {/* ── Stats strip ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setFilter(filter === r ? 'all' : r)}
              className={`rounded-2xl p-4 border-2 text-left transition-all duration-200 ${
                filter === r
                  ? ROLE_STYLES[r] + ' shadow-md scale-105'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <p className="text-2xl mb-1 select-none">{ROLE_ICONS[r]}</p>
              <p className="text-2xl font-extrabold leading-none">{counts[r] ?? 0}</p>
              <p className="text-xs font-semibold uppercase tracking-wide mt-0.5 capitalize">{r}</p>
            </button>
          ))}
        </div>

        {/* ── Search + refresh ── */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              className="w-full pl-9 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none text-sm transition-colors"
            />
          </div>
          <button
            onClick={fetchUsers}
            className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 text-gray-600 text-sm font-semibold transition-colors"
          >
            ↺ Refresh
          </button>
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-gray-400">
              <svg className="w-6 h-6 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Loading users…
            </div>
          ) : displayed.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-3xl mb-2 select-none">🔍</p>
              <p>No users found.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {/* Header */}
              <div className="hidden md:grid grid-cols-[auto_1fr_160px_160px] gap-4 px-5 py-3 bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>User</span>
                <span />
                <span>Current Role</span>
                <span>Change Role</span>
              </div>

              {displayed.map((user) => {
                const isMe = user.id === currentUser?.uid
                return (
                  <div
                    key={user.id}
                    className={`flex flex-col md:grid md:grid-cols-[auto_1fr_160px_160px] md:items-center gap-3 md:gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${
                      isMe ? 'bg-yellow-50/40' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div className="shrink-0">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-red-800 flex items-center justify-center text-white font-bold text-sm">
                          {(user.displayName || user.email || '?')[0].toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Name + email */}
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 text-sm flex items-center gap-1.5 flex-wrap">
                        {user.displayName || '(No name)'}
                        {isMe && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-medium border border-yellow-200">
                            You
                          </span>
                        )}
                      </p>
                      <p className="text-gray-400 text-xs truncate">{user.email}</p>
                      {feedback?.uid === user.id && (
                        <p className="text-green-600 text-xs font-medium mt-0.5">
                          ✓ {feedback.message}
                        </p>
                      )}
                    </div>

                    {/* Current role badge */}
                    <div>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold ${
                          ROLE_STYLES[user.role] || 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}
                      >
                        <span>{ROLE_ICONS[user.role]}</span>
                        <span className="capitalize">{user.role || 'pending'}</span>
                      </span>
                    </div>

                    {/* Role selector */}
                    <div>
                      <select
                        value={user.role || 'pending'}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        disabled={saving === user.id}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm focus:border-red-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer bg-white"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {ROLE_ICONS[r]} {r.charAt(0).toUpperCase() + r.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          {displayed.length} of {users.length} user{users.length !== 1 ? 's' : ''}
          {filter !== 'all' && ` — filtered by "${filter}"`}
        </p>
      </div>
    </div>
  )
}
