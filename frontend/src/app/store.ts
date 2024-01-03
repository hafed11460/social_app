import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer from 'features/auth/authSlice'
import facilitiesReducer from 'features/facilities/facilitiesSlice'
import { authApi } from "features/auth/authApi"
import { employeeAPI } from "features/employees/employeeAPI"
import { primesAPI } from "features/primes/primesAPI"
import { facilitiesAPI } from "features/facilities/facilitiesAPI"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    facilities: facilitiesReducer, 
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

// export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >
