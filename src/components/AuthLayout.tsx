import type { ReactNode } from 'react'
import stethoscope from '../assets/icons/stethoscope.svg'
import check from '../assets/icons/check.svg'
import styles from './AuthLayout.module.css'

const BENEFITS = [
  'Agenda por doctor, sillón y sede',
  'Expediente, odontograma y especialidades',
  'Presupuestos, cobros y aseguradoras',
]

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <aside className={styles.brand}>
        <div className={styles.logo}>
          <span className={styles.isotype}>
            <img src={stethoscope} alt="" width={20} height={20} />
          </span>
          <span className={styles.logoName}>DentalCare</span>
        </div>
        <div className={styles.message}>
          <h2 className={styles.headline}>
            La gestión de tu clínica dental, en un solo lugar.
          </h2>
          <ul className={styles.benefits}>
            {BENEFITS.map((benefit) => (
              <li key={benefit} className={styles.benefit}>
                <img src={check} alt="" width={16} height={16} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <p className={styles.copyright}>© 2026 DentalCare</p>
      </aside>
      <main className={styles.form}>
        <div className={styles.card}>{children}</div>
      </main>
    </div>
  )
}
