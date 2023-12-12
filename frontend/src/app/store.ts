import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer from 'features/auth/authSlice'
import { authApi } from "features/auth/authApi"
import { employeeAPI } from "features/employees/employeeAPI"
import { primesAPI } from "features/primes/primesAPI"

export const store = configureStore({
  reducer: {
    auth:authReducer,  
    [authApi.reducerPath]: authApi.reducer,
    [employeeAPI.reducerPath]: employeeAPI.reducer,
    [primesAPI.reducerPath]: primesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat([
    authApi.middleware,   
    employeeAPI.middleware,   
    primesAPI.middleware,   
  ]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
