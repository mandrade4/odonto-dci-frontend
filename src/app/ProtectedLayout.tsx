import { Outlet } from 'react-router'
import { useAuth } from '@/features/auth'
import { AppLayout } from '@/shared/layouts/AppLayout'

export function ProtectedLayout() {
  const { session, logout } = useAuth()
  return (
    <AppLayout
      user={session ? { email: session.email, roles: session.roles } : undefined}
      onLogout={logout}
    >
      <Outlet />
    </AppLayout>
  )
}
