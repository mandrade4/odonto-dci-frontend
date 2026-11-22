import { NavLink } from 'react-router'
import styles from './Sidebar.module.css'
import { NAV_ITEMS } from './navItems'

export interface SidebarUser {
  email: string
  roles: string[]
}

interface SidebarProps {
  user?: SidebarUser
  /** No está en el diseño de Figma. */
  onLogout?: () => void
}

export function Sidebar({ user, onLogout }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>

        <div className={styles.brand}>
            <span className={styles.logo}>D</span>
            <span className={styles.brandName}>DentaPerú</span>
        </div>

        <nav className={styles.nav} aria-label="Navegación principal">
            <ul className={styles.navList}>
                {NAV_ITEMS.map((item) => (
                    <li key={item.key}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem
                            }>
                            <span
                                className={styles.navIcon}
                                style={{ maskImage: `url("${item.icon}")` }}
                                aria-hidden="true"
                            />
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>

        <div className={styles.user}>
            <span className={styles.avatar}>{user ? user.email.charAt(0).toUpperCase() : 'U'}</span>
            <div className={styles.userText}>
                <span className={styles.userName}>{user?.email ?? 'User'}</span>
                <span className={styles.userDetail}>{user?.roles.join(', ') || 'Role'}</span>
            </div>
            {onLogout && (
                <button type="button" className={styles.logout} onClick={onLogout}>
                    Salir
                </button>
            )}
        </div>

    </aside>
  )
}