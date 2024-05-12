import { Frame, Header } from '@/components'
import styles from './Recipe.module.scss'
import { useEffect, useState } from 'react'
import { IRecipe } from '@/models'
import { useNavigate, useParams } from 'react-router-dom'
import arrowIcon from '@/assets/icons/arrowLeft.svg'
import cn from 'classnames'
import { useAppSelector } from '@/hooks'
import { ErrorMessage, Loader } from '@/UI'

export function Recipe() {
  const [data, setData] = useState<IRecipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id
  const { total } = useAppSelector((state) => state.recipes)

  const fetchData = async (url: string) => {
    try {
      setLoading(true)
      const request = await fetch(url)
      const response: IRecipe = await request.json()
      setData(response)
      setLoading(false)
    } catch (e) {
      if (e instanceof Error) {
        const error = new Error(
          'Извините, в данный момент сервис не работает, попробуйте обновить или зайдите позже!'
        )
        setError(error.message)
      }

      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_RECIPES_URL}/${id}`)
  }, [id])

  function handlePrevClick() {
    if (id && Number(id) > 1) {
      navigate(`/recipe/${Number(id) - 1}`)
    }
  }

  function handleNextClick() {
    if (id && Number(id) < total) {
      navigate(`/recipe/${Number(id) + 1}`)
    }
  }

  return (
    <div className={styles.page}>
      {data && Object.keys(data).length > 0 ? (
        <>
          <div className={styles.page__header}>
            <Header>
              <button
                type="button"
                className={styles.page__button}
                onClick={() => navigate('/')}
              >
                <img src={arrowIcon} alt="Arrow Icon" />
              </button>
              {data?.name}
            </Header>
          </div>

          <div className={styles.page__body}>
            <div className={styles.page__left}>
              <div className={styles.page__col}>
                <div className={styles.page__item}>
                  <Frame title="Кухня">
                    <span className={styles.page__cuisine}>
                      {data?.cuisine}
                    </span>
                  </Frame>
                </div>
                <div className={styles.page__item}>
                  <Frame title="Теги">
                    <span className={styles.page__tags}>
                      {data?.tags.map((item) => `#${item} `)}
                    </span>
                  </Frame>
                </div>
                <div className={styles.page__item}>
                  <Frame title="Калорийность">
                    <div className={styles.page__caloriesPerServing}>
                      {data?.caloriesPerServing} ккал
                    </div>
                    <div className={styles.page__caloriesGrams}>100 грамм</div>
                  </Frame>
                </div>
                <div className={styles.page__item}>
                  <Frame title="Количество порций">
                    <span className={styles.page__servings}>
                      {data?.servings}
                    </span>
                  </Frame>
                </div>
                <div className={styles.page__item}>
                  <Frame title="Описание">
                    <span className={styles.page__description}>
                      {data?.ingredients.join(', ')}
                    </span>
                  </Frame>
                </div>
              </div>

              <div className={styles.page__col}>
                <div className={styles.page__item}>
                  <Frame title="Общее время приготовления">
                    <span className={styles.page__prepTime}>
                      {data?.prepTimeMinutes} минут
                    </span>
                  </Frame>
                </div>
                <div className={styles.page__item}>
                  <Frame title="Инструкции по приготовлению">
                    <ul>
                      {data?.instructions.map((item, index) => (
                        <li
                          key={item + index}
                          className={styles.page__instruction}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Frame>
                </div>
              </div>
            </div>
            <div className={styles.page__right}>
              <div className={styles.page__imgWrap}>
                <img src={data?.image} alt="" className={styles.page__img} />
              </div>
              <div className={styles.page__arrows}>
                <button
                  type="button"
                  className={cn(styles.page__arrowBlock, {
                    [styles['page__arrow--inactive']]: id === '1',
                  })}
                  onClick={handlePrevClick}
                  disabled={id === '1'}
                >
                  <div
                    className={cn(
                      styles.page__arrow,
                      styles['page__arrow--left']
                    )}
                  />
                </button>

                <button
                  type="button"
                  className={cn(styles.page__arrowBlock, {
                    [styles['page__arrow--inactive']]: Number(id) === total,
                  })}
                  onClick={handleNextClick}
                >
                  <div
                    className={cn(
                      styles.page__arrow,
                      styles['page__arrow--right']
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.page__status}>
          {loading && <Loader />}
          {error && !loading && <ErrorMessage errorMessage={error} />}
        </div>
      )}
    </div>
  )
}
