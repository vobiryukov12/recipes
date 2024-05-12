import cn from 'classnames'
import { MouseEvent, useRef, useState } from 'react'
import { useClickOutside, useAppDispatch, useAppSelector } from '@/hooks'
import { setFilter } from '@/store/filter.slice'
import { IFilterProps } from './SortingByFilters.props'
import styles from './SortingByFilters.module.scss'
import arrowDown from '@/assets/icons/arrow-down.svg'

export function SortingByFilters({ filterName, options }: IFilterProps) {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const dispatch = useAppDispatch()

  const filterValue = useAppSelector((state) => state.filter[filterName])

  const onClose = () => {
    setDropdownIsOpen(false)
  }

  const contentRef = useRef(null)
  useClickOutside(contentRef, onClose)

  const handleButtonClick = () => {
    setDropdownIsOpen((prev) => !prev)
  }

  const handleFilterClick = (event: MouseEvent<HTMLLIElement>) => {
    event.currentTarget.textContent &&
      dispatch(
        setFilter({
          filterName: filterName,
          value: event.currentTarget.textContent,
        })
      )

    onClose()
  }

  const buttonClassNames = cn(styles.filter__button, {
    [styles['filter__button--open']]: dropdownIsOpen,
  })
  const iconClassNames = cn(styles.filter__icon, {
    [styles['filter__icon--open']]: dropdownIsOpen,
  })

  return (
    <div className={styles.filter}>
      <div className={styles.filter__select} ref={contentRef}>
        <button
          className={buttonClassNames}
          onClick={handleButtonClick}
          aria-expanded={dropdownIsOpen}
          aria-controls="list"
          disabled={options.length < 1}
        >
          <span className={styles.filter__title}>{filterValue}</span>
          <img className={iconClassNames} src={arrowDown} />
        </button>
        {dropdownIsOpen && (
          <ul className={styles.filter__dropdown}>
            {options.map(
              (item) =>
                item.value !== filterValue && (
                  <li
                    className={styles.filter__item}
                    key={item.id}
                    onClick={handleFilterClick}
                  >
                    {item.label}
                  </li>
                )
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
