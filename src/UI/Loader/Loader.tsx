import styles from './Loader.module.scss'

/**
 * Спиннер для визуализации процесса загрузки данных.
 */

export function Loader() {
  return <span className={styles.loader}></span>
}
