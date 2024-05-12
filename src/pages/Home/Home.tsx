import { Aside, Header, Recipes } from '@/components'
import styles from './Home.module.scss'
import { useAppSelector } from '@/hooks'
import { ErrorMessage, Loader } from '@/UI'

export function Home() {
  const { recipes, loading, error } = useAppSelector((state) => state.recipes)

  return (
    <div className={styles.page}>
      <div className={styles.page__header}>
        <Header>Сборник рецептов из разных стран мира</Header>
      </div>
      <div className={styles.page__body}>
        {recipes?.length > 0 ? (
          <>
            <div className={styles.page__aside}>
              <Aside />
            </div>
            <div className={styles.page__recipes}>
              <Recipes />
            </div>
          </>
        ) : (
          <div className={styles.page__status}>
            {loading && <Loader />}
            {error && !loading && <ErrorMessage errorMessage={error} />}
          </div>
        )}
      </div>
    </div>
  )
}
