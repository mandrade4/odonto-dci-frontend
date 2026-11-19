import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '@/features/auth'
import { PATHS } from './paths'

type FromState = { from?: string } | null

export function RequireAuth() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'loading') return null
  if (status === 'anonymous') {
    const from = location.pathname + location.search
    return <Navigate to={PATHS.login} state={{ from }} replace />
  }
  return <Outlet />
}

export function PublicOnly() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'loading') return null
  if (status === 'authenticated') {
    const from = (location.state as FromState)?.from
    return <Navigate to={from ?? PATHS.home} replace />
  }
  return <Outlet />
}
