import { useState, useEffect } from 'react'
import { Pagination, RecipeCard } from '@/components'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { IRecipe, IRecipeResponse } from '@/models'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './RecipesList.module.scss'
import { useFilteredCards } from '@/hooks/useFilteredCards'
import { ErrorMessage, Loader } from '@/UI'
import { setFilterCount } from '@/store/recipes.slice'

const PageSize = 6

export function RecipesList() {
  const { recipes, total } = useAppSelector((state) => state.recipes)
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([])
  const cuisines = useAppSelector((state) => state.filter['cuisines'])
  const mealTypes = useAppSelector((state) => state.filter['mealTypes'])
  const difficulty = useAppSelector((state) => state.tabs.selectedTab)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const dispatch = useAppDispatch()

  const filteredCards1 = useFilteredCards(filteredRecipes, 'cuisines', cuisines)
  const filteredCards2 = useFilteredCards(
    filteredCards1,
    'mealTypes',
    mealTypes
  )
  const filteredCards3 = useFilteredCards(
    filteredCards2,
    'difficulty',
    difficulty
  )

  const combinedFilteredCards = filteredCards1.filter((card1) =>
    filteredCards2.some((card2) =>
      filteredCards3.some(
        (card3) => card1.id === card2.id && card1.id === card3.id
      )
    )
  )

  const params = useParams()
  const page = params.page || 1
  const navigate = useNavigate()

  useEffect(() => {
    if (!page || page === 1) {
      setFilteredRecipes(recipes)
    }
  }, [recipes, page])

  const fetchData = async (signal: AbortSignal, page: string | 1) => {
    try {
      setLoading(true)
      const response = await fetch(
        `${import.meta.env.VITE_RECIPES_URL}?limit=6&skip=${Number(page) === 1 ? 0 : Number(page) * PageSize}`,
        { signal }
      )
      const result: IRecipeResponse = await response.json()
      setFilteredRecipes(result.recipes)
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
    if (page !== 1) {
      const abortController = new AbortController()

      fetchData(abortController.signal, page)
    }
  }, [params, page])

  useEffect(() => {
    dispatch(setFilterCount(combinedFilteredCards.length))
  }, [combinedFilteredCards.length, dispatch])

  return (
    <div className={styles.recipesList}>
      {filteredRecipes?.length > 0 ? (
        <div className={styles.recipesList__container}>
          {combinedFilteredCards.length > 0 &&
            combinedFilteredCards.map((item) => (
              <RecipeCard key={item.id} {...item} />
            ))}
        </div>
      ) : (
        <div className={styles.recipesList__status}>
          {loading && <Loader />}
          {error && !loading && <ErrorMessage errorMessage={error} />}
        </div>
      )}

      <Pagination
        currentPage={Number(page)}
        totalCount={total}
        pageSize={PageSize}
        siblingCount={1}
        onPageChange={(pageNumber) => {
          if (!page && pageNumber === 1) return

          if (Number(page) !== pageNumber) {
            navigate(`/${pageNumber}`)
            setFilteredRecipes([])
          }
        }}
      />
    </div>
  )
}
