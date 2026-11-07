import { useId, type InputHTMLAttributes } from 'react'
import styles from './TextField.module.css'

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string
  icon: string
}

export function TextField({ label, icon, ...inputProps }: TextFieldProps) {
  const id = useId()
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.control}>
        <img src={icon} alt="" width={16} height={16} />
        <input id={id} className={styles.input} {...inputProps} />
      </div>
    </div>
  )
}
