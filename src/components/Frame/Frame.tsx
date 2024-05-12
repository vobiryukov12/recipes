import { ReactNode } from 'react'
import styles from './Frame.module.scss'

export function Frame({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className={styles.frame}>
      <div className={styles.frame__header}>
        <h2 className={styles.frame__title}>{title}</h2>
      </div>
      <div className={styles.frame__body}>{children}</div>
    </div>
  )
}
