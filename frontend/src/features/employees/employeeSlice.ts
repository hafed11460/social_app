import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "app/store"
import EServices from "./employeeServices"
import { IEFilterArgs, IEmployee } from "types/types.employees"

export const getEmployees = createAsyncThunk(
    'employees/',
    async (args: IEFilterArgs) => {
        const res = await EServices.getEmployees(args)
        return res.data;
    })


interface EmployeeResponse {
    results: IEmployee[],
    pages: number,
    count: number,
    links: {
        next: string,
        previous: string,
        current: string
    },
}

interface IQuery {
    [key: string]: string | number | Array<any>,
}

interface EmployeesState {
    selectedDate?: number,
    query: IQuery,
    employees?: EmployeeResponse,
    count?: number,
    pages?: number,
    currentPage:number
}

const initialState: EmployeesState = {
    employees:undefined,
    query: {},
    count: 0,
    pages: 1,
    currentPage:1
}


export const employeesSlice = createSlice({
    name: 'employees',
    initialState,

    reducers: {
        setSelectedDate: (state, { payload: { date } }: PayloadAction<{ date: number }>) => {
            state.selectedDate = date
        },
        setCurrentPage: (state, { payload: { page } }: PayloadAction<{ page: number }>) => {
            state.currentPage = page
        },
        

        setEmployeeQuery: (state, { payload: { key, query } }: PayloadAction<{ key: String, query: string }>) => {
            if (key === 'init') {
                state.query = {}
            } else {
                state.query[`${key}`] = query
                state.currentPage=1
            }
        },
    },
    extraReducers: (builder) => {
        /** Get Employees  */
        builder.addCase(getEmployees.fulfilled, (state, action) => {
            state.employees = action.payload
        })
    }
})

export const {
    setSelectedDate,
    setEmployeeQuery,
    setCurrentPage,
} = employeesSlice.actions

export default employeesSlice.reducer


export const selectPrimesCurrentDate = (state: RootState) => state.primes.selectedDate
export const selectEmployeesQuery = (state: RootState) => state.employees.query
export const selectEmployees = (state: RootState) => state.employees.employees
export const selectCurrentPage = (state: RootState) => state.employees.currentPage