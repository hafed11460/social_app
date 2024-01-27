import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "app/store"
import PServices from "./primesServices"
import { IPFilterArgs, IPrime, IProcesVerbal } from "types/types.primes"

export const getPrimes = createAsyncThunk(
    'primes/',
    async (args: IPFilterArgs) => {
        const res = await PServices.getPrimes(args)
        return res.data;
    })
export const getProcesVerbal = createAsyncThunk(
    'primes/proces-verbal',
    async () => {
        const res = await PServices.getProcesVerbal()
        return res.data;
    })



interface PrimeResponse {
    results: IPrime[],
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

interface PrimesState {
    selectedDate?: number,
    query: IQuery,
    primes?: PrimeResponse,
    procesVerbal?:IProcesVerbal[], 
    count?: number,
    pages?: number,
}

const initialState: PrimesState = {
    primes: undefined,
    procesVerbal: undefined,
    query: {},
    count: 0,
    pages: 1,
}


export const primesSlice = createSlice({
    name: 'primes',
    initialState,

    reducers: {
        setSelectedDate: (state, { payload: { date } }: PayloadAction<{ date: number }>) => {
            state.selectedDate = date
        },
        setQuery: (state, { payload: { key, query } }: PayloadAction<{ key: String, query: string }>) => {
            if (key === 'init') {
                state.query = {}
            } else {
                state.query[`${key}`] = query
            }
        },
    },
    extraReducers: (builder) => {

        builder.addCase(getPrimes.fulfilled, (state, action) => {
            state.primes = action.payload
        })
        
        /** Get Proces Verbal  */
        builder.addCase(getProcesVerbal.fulfilled, (state, action) => {
            state.procesVerbal = action.payload
        })
        

    }
})

export const {
    setSelectedDate,
    setQuery,
} = primesSlice.actions

export default primesSlice.reducer


export const selectPrimesCurrentDate = (state: RootState) => state.primes.selectedDate
export const selectPrimesQuery = (state: RootState) => state.primes.query
export const selectPrimes = (state: RootState) => state.primes.primes
export const selectProcesVerbal = (state: RootState) => state.primes.procesVerbal