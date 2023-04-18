import {combineReducers, configureStore} from '@reduxjs/toolkit'
import cartItemsSlice from './reducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


const store = configureStore({
    reducer: cartItemsSlice
})

export type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<any> = useSelector

export default store