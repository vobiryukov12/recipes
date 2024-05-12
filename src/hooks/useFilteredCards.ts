import { IRecipe } from '@/models'
import { useState, useEffect } from 'react'

export const useFilteredCards = (
  cards: IRecipe[],
  filter: string,
  filterValue: string
) => {
  const [filteredCards, setFilteredCards] = useState<IRecipe[]>([])

  useEffect(() => {
    let filteredArray = [...cards]

    switch (filter) {
      case 'cuisines':
        if (filterValue !== 'Все страны и регионы') {
          filteredArray = filteredArray.filter(
            (card) => card.cuisine === filterValue
          )
        }
        break
      case 'mealTypes':
        if (filterValue !== 'Все типы') {
          filteredArray = filteredArray.filter((card) =>
            card.mealType.includes(filterValue)
          )
        }
        break
      case 'difficulty':
        if (filterValue !== 'Any') {
          filteredArray = filteredArray.filter(
            (card) => card.difficulty === filterValue
          )
        }
        break
      default:
        filteredArray = [...cards]
        break
    }

    setFilteredCards(filteredArray)
  }, [cards, filter, filterValue])

  return filteredCards
}
