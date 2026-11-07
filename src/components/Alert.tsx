import circleAlert from '../assets/icons/circle-alert.svg'
import info from '../assets/icons/info.svg'
import styles from './Alert.module.css'

type AlertProps = {
  variant: 'destructive' | 'info'
  title: string
  description: string
}

export function Alert({ variant, title, description }: AlertProps) {
  return (
    <div
      className={`${styles.alert} ${styles[variant]}`}
      role={variant === 'destructive' ? 'alert' : 'status'}
    >
      <span className={styles.icon}>
        <img
          src={variant === 'destructive' ? circleAlert : info}
          alt=""
          width={16}
          height={16}
        />
      </span>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}
