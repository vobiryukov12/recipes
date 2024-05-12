import { IOptions } from "@/components/Aside/SortingByFilters/SortingByFilters.props"

export interface IRecipe {
  id: number
  name: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: 'Easy' | 'Medium'
  cuisine: string
  caloriesPerServing: number
  tags: string[]
  userId: number
  image: string
  rating: number
  reviewCount: number
  mealType: string[]
}

export interface IRecipeResponse {
  recipes: IRecipe[]
  total: number
  skip: number
  limit: number
}

export interface IStateRecipe {
  recipes: IRecipe[]
  loading: boolean
  error: string
  total: number
  cuisines: IOptions[]
  mealTypes: IOptions[]
  recipesCount: number
}

export type PaginationProps = {
  onNextPageClick: () => void
  onPrevPageClick: () => void
  onPageClick: (page: number) => void
  total: number
}
