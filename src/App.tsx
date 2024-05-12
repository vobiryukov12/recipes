import { Route, Routes } from 'react-router-dom'
import { Home, Recipe } from '@/pages'
import { useEffect } from 'react'
import { fetchRecipes } from '@/store/recipes.slice'
import { useAppDispatch } from '@/hooks'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const res = dispatch(
      fetchRecipes(`${import.meta.env.VITE_RECIPES_URL}?limit=6`)
    )
    return () => {
      res.abort()
    }
  }, [dispatch])

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/:page" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
