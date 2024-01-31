import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import { authApi } from "features/auth/authApi"
import authReducer from 'features/auth/authSlice'
import { employeeAPI } from "features/employees/employeeAPI"
import { facilitiesAPI } from "features/facilities/facilitiesAPI"
import facilitiesReducer from 'features/facilities/facilitiesSlice'
import { primesAPI } from "features/primes/primesAPI"
import primesReducer from 'features/primes/primesSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    facilities: facilitiesReducer, 
    primes: primesReducer, 
    [authApi.reducerPath]: authApi.reducer,
    [employeeAPI.reducerPath]: employeeAPI.reducer,
    [primesAPI.reducerPath]: primesAPI.reducer,
    [facilitiesAPI.reducerPath]: facilitiesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat([
    authApi.middleware,   
    employeeAPI.middleware,   
    facilitiesAPI.middleware,   
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