import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * ProtectedRoute
 *
 * allowedRoles: string[]  — which roles may access this route
 *
 * Flow:
 *   not logged in          → /login
 *   role = pending/null    → /pending
 *   role not in allowedRoles → /  (home; user sees their own accessible cards)
 *   otherwise              → render children
 */
export default function ProtectedRoute({ children, allowedRoles, requireSuperAdmin = false }) {
  const { currentUser, userRole, isSuperAdmin } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (!userRole || userRole === 'pending') {
    return <Navigate to="/pending" replace />
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to="/" replace />
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />
  }

  return children
}
