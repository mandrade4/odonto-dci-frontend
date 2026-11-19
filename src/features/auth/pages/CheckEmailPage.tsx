import { AuthLayout } from '@/shared/layouts/AuthLayout'
import { Button } from '@/shared/ui/Button'
import { FeaturedIcon } from '@/shared/ui/FeaturedIcon'
import mailFeatured from '@/assets/icons/mail-featured.svg'
import styles from './AuthForm.module.css'

type CheckEmailPageProps = {
  email: string
  onBackToLogin: () => void
  onResend: () => void
}

// PAN-02 · Recuperar contraseña — revisa tu correo
export function CheckEmailPage({ email, onBackToLogin, onResend }: CheckEmailPageProps) {
  return (
    <AuthLayout>
      <FeaturedIcon tone="primary" icon={mailFeatured} />
      <header className={styles.header}>
        <h1 className={styles.title}>Revisa tu correo</h1>
        <p className={styles.subtitle}>
          Si {email} tiene una cuenta, te enviamos un enlace para crear una contraseña nueva. El enlace vence en 30 minutos.
        </p>
      </header>

      <Button variant="outline" type="button" onClick={onBackToLogin}>
        Volver al inicio de sesión
      </Button>
      <div className={styles.options}>
        <button type="button" className={styles.link} onClick={onResend}>
          Reenviar el enlace
        </button>
      </div>

      <p className={styles.help}>
        ¿No te llegó? Revisa la carpeta de correo no deseado. Puedes reenviarlo después de un minuto.
      </p>
    </AuthLayout>
  )
}
