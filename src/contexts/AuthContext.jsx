import { createContext, useContext, useState, useEffect } from 'react'
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, googleProvider } from '../firebase'

const AuthContext = createContext(null)

// Super admin email — only this user can access user management panel
const SUPERADMIN_EMAIL = (import.meta.env.VITE_SUPERADMIN_EMAIL || '').trim().toLowerCase()

// Emails that are auto-assigned the "admin" role on first login.
const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole]       = useState(null)  // 'admin' | 'teacher' | 'parent' | 'pending'
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)  // Only for user management access
  const [loading, setLoading]         = useState(true)

  // Fetch (or create) the Firestore user document and return the role.
  async function syncUserDoc(firebaseUser) {
    const userEmail = firebaseUser.email?.toLowerCase()
    const ref  = doc(db, 'users', firebaseUser.uid)
    const snap = await getDoc(ref)

    const isSuperAdminUser = userEmail === SUPERADMIN_EMAIL
    setIsSuperAdmin(isSuperAdminUser)

    if (snap.exists()) {
      return snap.data().role || 'pending'
    }

    // First-ever login: create the document.
    const isAdmin = ADMIN_EMAILS.includes(userEmail)
    const newRole = isAdmin ? 'admin' : isSuperAdminUser ? 'admin' : 'pending'

    await setDoc(ref, {
      uid:         firebaseUser.uid,
      email:       firebaseUser.email,
      displayName: firebaseUser.displayName || '',
      photoURL:    firebaseUser.photoURL    || '',
      role:        newRole,
      createdAt:   serverTimestamp(),
    })

    return newRole
  }

  // Subscribe to Firebase auth state changes.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const role = await syncUserDoc(firebaseUser)
          setCurrentUser(firebaseUser)
          setUserRole(role)
          setIsSuperAdmin(firebaseUser.email?.toLowerCase() === SUPERADMIN_EMAIL)
        } catch {
          setCurrentUser(firebaseUser)
          setUserRole('pending')
          setIsSuperAdmin(false)
        }
      } else {
        setCurrentUser(null)
        setUserRole(null)
        setIsSuperAdmin(false)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  // ── Auth actions ──────────────────────────────────────────
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider)

  const loginWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

  const signupWithEmail = async (email, password, displayName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) {
      await updateProfile(result.user, { displayName })
    }
    return result
  }

  const resetPassword = (email) => sendPasswordResetEmail(auth, email)

  const logout = () => signOut(auth)

  // Re-fetch role from Firestore (used after admin updates a role).
  const refreshRole = async () => {
    if (!currentUser) return
    const snap = await getDoc(doc(db, 'users', currentUser.uid))
    if (snap.exists()) setUserRole(snap.data().role || 'pending')
  }

  const value = {
    currentUser,
    userRole,
    isSuperAdmin,
    loading,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    resetPassword,
    logout,
    refreshRole,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
