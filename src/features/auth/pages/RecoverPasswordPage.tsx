import { useState, type FormEvent } from 'react'
import { AuthLayout } from '@/shared/layouts/AuthLayout'
import { Button } from '@/shared/ui/Button'
import { TextField } from '@/shared/ui/TextField'
import mail from '@/assets/icons/mail.svg'
import styles from './AuthForm.module.css'

type RecoverPasswordPageProps = {
  onSubmit: (email: string) => void
  onBackToLogin: () => void
}

// PAN-02 · Recuperar contraseña — pedir enlace
export function RecoverPasswordPage({ onSubmit, onBackToLogin }: RecoverPasswordPageProps) {
  const [email, setEmail] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit(email)
  }

  return (
    <AuthLayout>
      <header className={styles.header}>
        <h1 className={styles.title}>Recuperar contraseña</h1>
        <p className={styles.subtitle}>
          Escribe el correo con el que ingresas y te enviaremos un enlace para crear una contraseña nueva.
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
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
        <Button type="submit">Enviar enlace</Button>
        <div className={styles.options}>
          <button type="button" className={styles.link} onClick={onBackToLogin}>
            Volver al inicio de sesión
          </button>
        </div>
      </form>

      <p className={styles.help}>
        Si ya no tienes acceso a ese correo, pide ayuda al administrador de tu clínica.
      </p>
    </AuthLayout>
  )
}
