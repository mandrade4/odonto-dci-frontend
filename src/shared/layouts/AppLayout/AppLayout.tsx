import type { ReactNode } from 'react'
import { Sidebar, type SidebarUser } from '../Sidebar'
import styles from './AppLayout.module.css'

interface AppLayoutProps {
  user?: SidebarUser
  onLogout?: () => void
  /** Contenido de la pantalla actual (se muestra a la derecha del sidebar) */
  children?: ReactNode
}

export function AppLayout({ user, onLogout, children }: AppLayoutProps) {
  return (
    <div className={styles.layout}>
      <Sidebar user={user} onLogout={onLogout} />
      <main className={styles.content}>{children}</main>
    </div>
  )
}
