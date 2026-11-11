import styles from './Sidebar.module.css'
import { NAV_ITEMS, type NavKey } from './navItems'

interface SidebarProps {
  activeKey: NavKey
  onNavigate: (key: NavKey) => void
  /** Contenido de la pantalla actual (se muestra a la derecha del sidebar) */
}

export function Sidebar({ activeKey, onNavigate }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>

        <div className={styles.brand}>
            <span className={styles.logo}>D</span>
            <div className={styles.brandText}>
                <span className={styles.brandName}>DentaPerú</span>
                <span className={styles.brandBranch}>Sede Miraflores</span>
            </div>
        </div>

        <nav className={styles.nav} aria-label="Navegación principal">
            <ul className={styles.navList}>
                {NAV_ITEMS.map((item) => {
                    const isActive = item.key === activeKey

                    return (
                        <li key={item.key}>
                        <button
                            type="button"
                            className={isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem}
                            aria-current={isActive ? 'page' : undefined}
                            onClick={() => onNavigate(item.key)}>
                            
                            <span
                                className={styles.navIcon}
                                style={{ maskImage: `url("${item.icon}")` }}
                                aria-hidden="true"
                            />
                            {item.label}

                        </button>
                        </li>
                    )
                })}
            </ul>
        </nav>

        <div className={styles.user}>
            <span className={styles.avatar}>U</span>
            <div className={styles.userText}>
                <span className={styles.userName}>User</span>
                <span className={styles.userDetail}>Role</span>
            </div>
        </div>

    </aside>
  )
}