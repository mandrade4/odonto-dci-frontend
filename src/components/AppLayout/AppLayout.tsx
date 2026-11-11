import type { ReactNode } from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import type { NavKey } from '../Sidebar/navItems'
import styles from './AppLayout.module.css'

interface AppLayoutProps {
  activeKey: NavKey
  onNavigate: (key: NavKey) => void
  /** Contenido de la pantalla actual (se muestra a la derecha del sidebar) */
  children?: ReactNode
}

export function AppLayout({ activeKey, onNavigate, children }: AppLayoutProps) {
  return (
    <div className={styles.layout}>
      <Sidebar activeKey={activeKey} onNavigate={onNavigate} />
      <main className={styles.content}>{children}</main>
    </div>
  )
}