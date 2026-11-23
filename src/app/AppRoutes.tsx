import { Navigate, Route, Routes } from 'react-router'
import { NAV_ITEMS } from '@/shared/layouts/Sidebar'
import {
  ActivateRoute,
  CheckEmailRoute,
  InvalidLinkRoute,
  LoginRoute,
  PasswordUpdatedRoute,
  RecoverRoute,
  ResetRoute,
} from './authRoutes'
import { PublicOnly, RequireAuth } from './guards'
import { PATHS } from './paths'
import { ProtectedLayout } from './ProtectedLayout'
import { SectionPage } from './SectionPage'
import { useTitle } from './useTitle'

export function AppRoutes() {
  useTitle()

  return (
    <Routes>
      {/* Acceso: solo sin sesión */}
      <Route element={<PublicOnly />}>
        <Route path={PATHS.login} element={<LoginRoute />} />
        <Route path={PATHS.recover} element={<RecoverRoute />} />
        <Route path={PATHS.checkEmail} element={<CheckEmailRoute />} />
      </Route>

      {/* Enlaces de correo: se pueden abrir con o sin sesión */}
      <Route path={PATHS.reset} element={<ResetRoute />} />
      <Route path={PATHS.activate} element={<ActivateRoute />} />
      <Route path={PATHS.invalidLink} element={<InvalidLinkRoute />} />
      <Route path={PATHS.passwordUpdated} element={<PasswordUpdatedRoute />} />

      {/* Pantallas internas: requieren sesión */}
      <Route element={<RequireAuth />}>
        <Route element={<ProtectedLayout />}>
          {NAV_ITEMS.map((item) => (
            <Route key={item.key} path={item.path} element={<SectionPage />} />
          ))}
        </Route>
      </Route>

      <Route path="/" element={<Navigate to={PATHS.home} replace />} />
      <Route path="*" element={<Navigate to={PATHS.home} replace />} />
    </Routes>
  )
}
