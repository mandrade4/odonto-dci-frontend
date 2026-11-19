import { useId, type InputHTMLAttributes } from 'react'
import styles from './TextField.module.css'

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string
  icon: string
  hint?: string
}

export function TextField({ label, icon, hint, ...inputProps }: TextFieldProps) {
  const id = useId()
  const hintId = `${id}-hint`
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.control}>
        <img src={icon} alt="" width={16} height={16} />
        <input
          id={id}
          className={styles.input}
          aria-describedby={hint ? hintId : undefined}
          {...inputProps}
        />
      </div>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
    </div>
  )
}
