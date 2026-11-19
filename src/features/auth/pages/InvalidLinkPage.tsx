import { AuthLayout } from '@/shared/layouts/AuthLayout'
import { Button } from '@/shared/ui/Button'
import { FeaturedIcon } from '@/shared/ui/FeaturedIcon'
import circleAlertFeatured from '@/assets/icons/circle-alert-featured.svg'
import styles from './AuthForm.module.css'

type InvalidLinkPageProps = {
  onRequestNewLink: () => void
  onBackToLogin: () => void
}

// PAN-02 · Recuperar contraseña — enlace no válido
export function InvalidLinkPage({ onRequestNewLink, onBackToLogin }: InvalidLinkPageProps) {
  return (
    <AuthLayout>
      <FeaturedIcon tone="destructive" icon={circleAlertFeatured} />
      <header className={styles.header}>
        <h1 className={styles.title}>Este enlace ya no es válido</h1>
        <p className={styles.subtitle}>
          Venció (dura 30 minutos) o ya se usó. Pide uno nuevo para crear tu contraseña.
        </p>
      </header>

      <Button type="button" onClick={onRequestNewLink}>
        Pedir un enlace nuevo
      </Button>
      <div className={styles.options}>
        <button type="button" className={styles.link} onClick={onBackToLogin}>
          Volver al inicio de sesión
        </button>
      </div>

      <p className={styles.help}>Por seguridad, cada enlace se puede usar una sola vez.</p>
    </AuthLayout>
  )
}
