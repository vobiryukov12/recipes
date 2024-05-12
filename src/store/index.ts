import { configureStore } from '@reduxjs/toolkit'
import recipes from './recipes.slice'
import filter from './filter.slice'
import tabs from './tabs.slice'

export const store = configureStore({
  reducer: {
    recipes,
    filter,
    tabs,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
