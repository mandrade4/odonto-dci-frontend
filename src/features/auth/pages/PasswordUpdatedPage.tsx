import { AuthLayout } from '@/shared/layouts/AuthLayout'
import { Button } from '@/shared/ui/Button'
import { FeaturedIcon } from '@/shared/ui/FeaturedIcon'
import checkFeatured from '@/assets/icons/check-featured.svg'
import styles from './AuthForm.module.css'

// PAN-02 · Recuperar contraseña — contraseña actualizada
export function PasswordUpdatedPage({ onGoToLogin }: { onGoToLogin: () => void }) {
  return (
    <AuthLayout>
      <FeaturedIcon tone="success" icon={checkFeatured} />
      <header className={styles.header}>
        <h1 className={styles.title}>Contraseña actualizada</h1>
        <p className={styles.subtitle}>
          Ya puedes ingresar con tu contraseña nueva. Si tu cuenta estaba bloqueada, también quedó desbloqueada.
        </p>
      </header>

      <Button type="button" onClick={onGoToLogin}>
        Ir a iniciar sesión
      </Button>
    </AuthLayout>
  )
}
