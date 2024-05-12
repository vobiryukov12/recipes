import styles from './ErrorMessage.module.scss'

/**
 * Компонент используется для отображения сообщений об ошибках.
 * @param errorMessage сообщение об ошибке
 */

export function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return (
    <div className={styles.error}>
      <p className={styles.error__message}>{errorMessage}</p>
      <img
        className={styles.error__img}
        src="/error.png"
        alt="error"
        width={200}
      />
    </div>
  )
}
