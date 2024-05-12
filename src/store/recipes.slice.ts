import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IRecipeResponse, IStateRecipe } from '@/models'

export const fetchRecipes = createAsyncThunk(
  'recipes/fetch',
  async (url: string, thunkAPI) => {
    const response = await fetch(url, {
      signal: thunkAPI.signal,
    })

    const data: IRecipeResponse = await response.json()

    return data
  }
)

const initialState: IStateRecipe = {
  recipes: [],
  loading: true,
  error: '',
  total: 0,
  cuisines: [],
  mealTypes: [],
  recipesCount: 0,
}

const recipesSlice = createSlice({
  name: '@recipes',
  initialState,
  reducers: {
    setFilterCount: (state, action) => {
      state.recipesCount = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.loading = false
      state.recipes = action.payload.recipes
      state.total = action.payload.total

      const cuisineSet = Array.from(
        new Set(action.payload.recipes.map((recipe) => recipe.cuisine))
      )
      cuisineSet.push('Все страны и регионы')
      state.cuisines = cuisineSet.map((item, index) => ({
        id: index + 1,
        value: item,
        label: item,
      }))

      const mealTypeSet = Array.from(
        new Set(action.payload.recipes.map((recipe) => recipe.mealType).flat())
      )
      mealTypeSet.push('Все типы')
      state.mealTypes = mealTypeSet.map((mealType, index) => ({
        id: index + 1,
        value: mealType,
        label: mealType,
      }))
    })
    builder.addCase(fetchRecipes.rejected, (state, action) => {
      if (action.error.name === 'AbortError') {
        state.error = 'Запрос прерван'
      } else {
        const error = new Error(
          'Извините, в данный момент сервис не работает, попробуйте позже!'
        )
        state.error = error.message
        state.loading = false
      }
    })
  },
})

export const { setFilterCount } = recipesSlice.actions
export default recipesSlice.reducer
