import styles from './Filters.module.scss'
import { resetTab, selectTab } from '@/store/tabs.slice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { SortingByFilters } from '../SortingByFilters/SortingByFilters'
import { resetFilters } from '@/store/filter.slice'

export function Filters() {
  const { cuisines, mealTypes } = useAppSelector((state) => state.recipes)
  const dispatch = useAppDispatch()
  const selectedTab = useAppSelector((state) => state.tabs.selectedTab)

  const handleTabClick = (tab: string) => {
    dispatch(selectTab(tab))
  }

  function handleReset() {
    dispatch(resetFilters())
    dispatch(resetTab())
  }

  return (
    <div className={styles.aside__filters}>
      <div className={styles.filter}>
        <div className={styles.filter__name}>Кухня:</div>
        <SortingByFilters filterName="cuisines" options={cuisines} />
      </div>
      <div className={styles.filter}>
        <div className={styles.filter__name}>Тип блюда:</div>
        <SortingByFilters filterName="mealTypes" options={mealTypes} />
      </div>
      <div className={styles.filter}>
        <div className={styles.filter__name}>Сложность приготовления:</div>
        <div className={styles.tabs}>
          <div
            className={`${styles.tabs__item} ${selectedTab === 'Any' ? styles['tabs__item--active'] : ''}`}
            onClick={() => handleTabClick('Any')}
          >
            Любая
          </div>
          <div
            className={`${styles.tabs__item} ${selectedTab === 'Easy' ? styles['tabs__item--active'] : ''}`}
            onClick={() => handleTabClick('Easy')}
          >
            Низкая
          </div>
          <div
            className={`${styles.tabs__item} ${selectedTab === 'Medium' ? styles['tabs__item--active'] : ''}`}
            onClick={() => handleTabClick('Medium')}
          >
            Средняя
          </div>
        </div>
      </div>
      <button className={styles.filter__reset} onClick={() => handleReset()}>
        Сбросить все фильтры
      </button>
    </div>
  )
}
