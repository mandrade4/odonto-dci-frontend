import { useState, type FormEvent } from 'react'
import { AuthLayout } from '@/shared/layouts/AuthLayout'
import { Alert } from '@/shared/ui/Alert'
import { Button } from '@/shared/ui/Button'
import { TextField } from '@/shared/ui/TextField'
import mail from '@/assets/icons/mail.svg'
import lock from '@/assets/icons/lock.svg'
import styles from './LoginPage.module.css'

export type LoginNotice =
  | { type: 'error'; attemptsLeft: number }
  | { type: 'locked' }
  | { type: 'inactive' }

type LoginPageProps = {
  notice?: LoginNotice
  onSubmit?: (credentials: { email: string; password: string }) => void | Promise<void>
  onForgotPassword?: () => void
}

function renderNotice(notice: LoginNotice) {
  switch (notice.type) {
    case 'error':
      return (
        <Alert
          variant="destructive"
          title="Correo o contraseña incorrectos"
          description={`Te quedan ${notice.attemptsLeft} intentos. Después la cuenta se bloquea por 15 minutos.`}
        />
      )
    case 'locked':
      return (
        <Alert
          variant="destructive"
          title="Cuenta bloqueada temporalmente"
          description="Hubo demasiados intentos fallidos. Vuelve a intentarlo en 15 minutos o pide ayuda al administrador de tu clínica."
        />
      )
    case 'inactive':
      return (
        <Alert
          variant="info"
          title="Tu sesión se cerró por inactividad"
          description="Vuelve a ingresar para continuar donde te quedaste."
        />
      )
  }
}

export function LoginPage({ notice, onSubmit, onForgotPassword }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Evita doble envío.
    if (submitting) return
    setSubmitting(true)
    try {
      await onSubmit?.({ email, password })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <header className={styles.header}>
        <h1 className={styles.title}>Iniciar sesión</h1>
        <p className={styles.subtitle}>
          Ingresa con el correo que te asignó tu clínica.
        </p>
      </header>

      {notice && renderNotice(notice)}

      <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
        <div className={styles.fields}>
          <TextField
            label="Correo electrónico"
            icon={mail}
            type="email"
            name="email"
            autoComplete="username"
            placeholder="correo@clinica.com"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label="Contraseña"
            icon={lock}
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••••"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className={styles.options}>
          <button
            type="button"
            className={styles.link}
            onClick={onForgotPassword}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        <Button type="submit" loading={submitting}>
          Ingresar
        </Button>
      </form>

      <p className={styles.help}>
        ¿Problemas para ingresar? Contacta al administrador de tu clínica.
      </p>
    </AuthLayout>
  )
}
