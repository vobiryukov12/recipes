import { useAppSelector } from '@/hooks'
import styles from './Aside.module.scss'
import { Filters, Hero } from '@/components'
import { useNavigate } from 'react-router-dom'

export function Aside() {
  const { total } = useAppSelector((state) => state.recipes)
  const navigate = useNavigate()

  return (
    <aside className={styles.aside}>
      <div className={styles.aside__hero}>
        <Hero />
      </div>

      <div className={styles.aside__filters}>
        <Filters />
      </div>

      <div className={styles.aside__luckyText}>
        А еще можно попробовать на вкус удачу
      </div>
      <button
        className={styles.aside__luckyBtn}
        onClick={() =>
          navigate(`/recipe/${Math.floor(Math.random() * total) + 1}`)
        }
      >
        Мне повезёт
      </button>
    </aside>
  )
}
