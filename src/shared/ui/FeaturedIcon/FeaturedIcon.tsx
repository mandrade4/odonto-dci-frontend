import styles from './FeaturedIcon.module.css'

type FeaturedIconProps = {
  tone: 'primary' | 'destructive' | 'success'
  icon: string
}

export function FeaturedIcon({ tone, icon }: FeaturedIconProps) {
  return (
    <span className={`${styles.box} ${styles[tone]}`}>
      <img src={icon} alt="" width={24} height={24} />
    </span>
  )
}
