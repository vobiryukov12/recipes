import { RecipesList } from '@/components'
import styles from './Recipes.module.scss'
import { useAppSelector } from '@/hooks'

export function Recipes() {
  const { recipesCount } = useAppSelector((state) => state.recipes)

  return (
    <main className={styles.recipes}>
      <header className={styles.recipes__header}>
        <h2 className={styles.recipes__title}>Найденные рецепты</h2>
        <p className={styles.recipes__count}>{recipesCount}</p>
      </header>
      <RecipesList />
    </main>
  )
}
