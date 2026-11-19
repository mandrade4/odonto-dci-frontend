import { useState } from 'react'
import { Navigate, useNavigate, useLocation, useSearchParams } from 'react-router'
import {
  CheckEmailPage,
  InvalidLinkPage,
  LoginPage,
  PasswordUpdatedPage,
  RecoverPasswordPage,
  SetPasswordPage,
  useAuth,
  type LoginNotice,
} from '@/features/auth'
import { PATHS } from './paths'

// TODO(DCI-5): datos de ejemplo; vendrán de validar el token.
const SAMPLE_EMAIL = 'rosa.campos@clinica.test'
const SAMPLE_INVITATION = { inviter: 'Lucía Torres', clinic: 'Clínica Sonrisa', role: 'Recepción' }

// Vista previa: /login?estado=error|bloqueada|inactividad
function noticeFromQuery(estado: string | null): LoginNotice | undefined {
  switch (estado) {
    case 'error':
      return { type: 'error', attemptsLeft: 2 }
    case 'bloqueada':
      return { type: 'locked' }
    case 'inactividad':
      return { type: 'inactive' }
    default:
      return undefined
  }
}

export function LoginRoute() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const previewNotice = noticeFromQuery(searchParams.get('estado'))
  const [failed, setFailed] = useState(false)

  async function handleLogin({ email, password }: { email: string; password: string }) {
    try {
      await login(email, password)
      setFailed(false)
    } catch {
      // TODO(DCI-5): distinguir bloqueo y contar intentos.
      setFailed(true)
    }
  }

  return (
    <LoginPage
      notice={failed ? { type: 'error', attemptsLeft: 2 } : previewNotice}
      onSubmit={handleLogin}
      onForgotPassword={() => navigate(PATHS.recover)}
    />
  )
}

export function RecoverRoute() {
  const navigate = useNavigate()
  return (
    <RecoverPasswordPage
      onSubmit={(email) => {
        // TODO(DCI-5): pedir el enlace al backend.
        navigate(PATHS.checkEmail, { state: { email } })
      }}
      onBackToLogin={() => navigate(PATHS.login)}
    />
  )
}

export function CheckEmailRoute() {
  const navigate = useNavigate()
  const email = (useLocation().state as { email?: string } | null)?.email
  if (!email) return <Navigate to={PATHS.recover} replace />
  return (
    <CheckEmailPage
      email={email}
      onBackToLogin={() => navigate(PATHS.login)}
      onResend={() => {
        // TODO(DCI-5): reenviar el enlace.
      }}
    />
  )
}

export function InvalidLinkRoute() {
  const navigate = useNavigate()
  return (
    <InvalidLinkPage
      onRequestNewLink={() => navigate(PATHS.recover)}
      onBackToLogin={() => navigate(PATHS.login)}
    />
  )
}

export function ResetRoute() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  if (!searchParams.get('token')) return <Navigate to={PATHS.invalidLink} replace />
  return (
    <SetPasswordPage
      mode="reset"
      email={SAMPLE_EMAIL}
      // TODO(DCI-5): enviar la contraseña al backend.
      onSubmit={() => navigate(PATHS.passwordUpdated)}
    />
  )
}

export function ActivateRoute() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  if (!searchParams.get('token')) return <Navigate to={PATHS.invalidLink} replace />
  return (
    <SetPasswordPage
      mode="activate"
      email={SAMPLE_EMAIL}
      invitation={SAMPLE_INVITATION}
      // TODO(DCI-5): activar la cuenta en el backend.
      onSubmit={() => navigate(PATHS.login)}
    />
  )
}

export function PasswordUpdatedRoute() {
  const navigate = useNavigate()
  return <PasswordUpdatedPage onGoToLogin={() => navigate(PATHS.login)} />
}
