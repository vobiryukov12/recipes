import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IInitialState {
  [key: string]: string
}

const initialState: IInitialState = {
  cuisines: 'Все страны и регионы',
  mealTypes: 'Все типы',
}

export const filterSlice = createSlice({
  name: '@filter',
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ filterName: string; value: string }>
    ) => {
      const { filterName, value } = action.payload
      state[filterName] = value
    },
    resetFilters: (state) => {
      state.cuisines = 'Все страны и регионы'
      state.mealTypes = 'Все типы'
    },
  },
})

export const { setFilter, resetFilters } = filterSlice.actions
export default filterSlice.reducer
