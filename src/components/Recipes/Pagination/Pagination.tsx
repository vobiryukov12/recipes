import classnames from 'classnames'
import { usePagination } from '@/hooks'
import { DOTS } from '@/utils'
import styles from './Pagination.module.scss'
import { IPaginationProps } from './Pagination.props'

export const Pagination = (props: IPaginationProps) => {
  const { onPageChange, totalCount, siblingCount, currentPage, pageSize } =
    props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage =
    paginationRange && paginationRange[paginationRange.length - 1]
  return (
    <ul className={styles.pagination}>
      <li
        className={classnames(styles.pagination__item, {
          [styles['pagination__item--disabled']]: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div
          className={classnames(
            styles.pagination__arrow,
            styles['pagination__arrow--left']
          )}
        />
      </li>

      {paginationRange &&
        paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={index}
                className={classnames(
                  styles.pagination__item,
                  styles.pagination__dots
                )}
              >
                &#x2022;&#x2022;&#x2022;
              </li>
            )
          }

          if (typeof pageNumber !== 'string') {
            return (
              <li
                key={index}
                className={classnames(styles.pagination__item, {
                  [styles['pagination__item--selected']]:
                    pageNumber === currentPage,
                })}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </li>
            )
          }
        })}
      <li
        className={classnames(styles.pagination__item, {
          [styles['pagination__item--disabled']]: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div
          className={classnames(
            styles.pagination__arrow,
            styles['pagination__arrow--right']
          )}
        />
      </li>
    </ul>
  )
}
