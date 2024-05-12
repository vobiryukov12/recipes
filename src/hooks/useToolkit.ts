import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { AppDispatch, RootState } from '@/store'

/**
 * Это затипизированный useDispath.
 * Чтобы каждый раз не типизировать это сделано один раз в этом хуке
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()

/**
 * Это затипизированный useSelector.
 * Чтобы каждый раз не типизировать это сделано один раз в этом хуке
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
