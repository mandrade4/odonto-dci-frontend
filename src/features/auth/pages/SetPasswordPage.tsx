import { useState, type FormEvent } from 'react'
import { AuthLayout } from '@/shared/layouts/AuthLayout'
import { Alert } from '@/shared/ui/Alert'
import { Button } from '@/shared/ui/Button'
import { TextField } from '@/shared/ui/TextField'
import lock from '@/assets/icons/lock.svg'
import styles from './AuthForm.module.css'

const MIN_LENGTH = 8

type SetPasswordPageProps = {
  mode: 'reset' | 'activate'
  email: string
  invitation?: { inviter: string; clinic: string; role: string }
  onSubmit: (password: string) => void
}

// PAN-02 · Crear contraseña nueva / Las contraseñas no coinciden / Activar cuenta (invitación)
export function SetPasswordPage({ mode, email, invitation, onSubmit }: SetPasswordPageProps) {
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const [mismatch, setMismatch] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (password !== repeat) {
      setMismatch(true)
      return
    }
    setMismatch(false)
    onSubmit(password)
  }

  const isActivate = mode === 'activate'

  return (
    <AuthLayout>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {isActivate ? 'Te damos la bienvenida' : 'Crea una contraseña nueva'}
        </h1>
        <p className={styles.subtitle}>
          {isActivate && invitation
            ? `${invitation.inviter} te invitó a ${invitation.clinic} como ${invitation.role}. Crea tu contraseña para ingresar con ${email}.`
            : `Para ${email}`}
        </p>
      </header>

      {mismatch && (
        <Alert
          variant="destructive"
          title="Las contraseñas no coinciden"
          description="Escribe la misma contraseña en los dos campos."
        />
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <TextField
            label="Contraseña nueva"
            icon={lock}
            type="password"
            name="new-password"
            autoComplete="new-password"
            placeholder="••••••••••"
            hint={`Mínimo ${MIN_LENGTH} caracteres.`}
            minLength={MIN_LENGTH}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            label="Repite la contraseña"
            icon={lock}
            type="password"
            name="repeat-password"
            autoComplete="new-password"
            placeholder="••••••••••"
            required
            value={repeat}
            onChange={(event) => setRepeat(event.target.value)}
          />
        </div>
        <Button type="submit">{isActivate ? 'Crear contraseña' : 'Guardar contraseña'}</Button>
      </form>

      <p className={styles.help}>
        {isActivate
          ? 'La invitación vence en 7 días. Si venció, pide una nueva a quien te invitó.'
          : 'Después podrás ingresar con tu contraseña nueva.'}
      </p>
    </AuthLayout>
  )
}
