import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ITabsState {
  selectedTab: string
}

const initialState: ITabsState = {
  selectedTab: 'Any',
}

export const filterSlice = createSlice({
  name: '@tabs',
  initialState,
  reducers: {
    selectTab(state, action: PayloadAction<string>) {
      state.selectedTab = action.payload
    },
    resetTab(state) {
      state.selectedTab = 'Any'
    },
  },
})

export const { selectTab, resetTab } = filterSlice.actions
export default filterSlice.reducer
