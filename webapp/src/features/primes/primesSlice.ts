import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "app/store"
import PServices from "./primesServices"
import { IPFilterArgs, IPrime, IProcesVerbal } from "types/types.primes"
import { CreatePrimeFromData } from "components/primes/CreatePrime"

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

export const createProcesVerbal = createAsyncThunk(
    'primes/proces-verbal/create',
    async (procesVerbal: IProcesVerbal, { rejectWithValue }) => {
        try {
            const res = await PServices.createProcesVerbal(procesVerbal)
            return res.data;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

export const updateProcesVerbal = createAsyncThunk(
    'primes/proces-verbal/update',
    async (procesVerbal: IProcesVerbal, { rejectWithValue }) => {
        try {
            const res = await PServices.updateProcesVerbal(procesVerbal)
            return res.data;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

export const deleteProcesVerbal = createAsyncThunk(
    'primes/proces-verbal/delete',
    async (procesId: number, { rejectWithValue }) => {
        try {
            const res = await PServices.deleteProcesVerbal(procesId)
            return procesId

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })


export const createPrime = createAsyncThunk(
    'primes/create',
    async (prime: CreatePrimeFromData, { rejectWithValue }) => {
        try {
            const res = await PServices.createPrime(prime)
            return res.data;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

export const updatePrime = createAsyncThunk(
    'primes/update',
    async (prime: IPrime, { rejectWithValue }) => {
        try {
            const res = await PServices.updatePrime(prime)
            return res.data;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

export const deletePrime = createAsyncThunk(
    'primes/delete',
    async (primeId: number, { rejectWithValue }) => {
        try {
            const res = await PServices.deletePrime(primeId)
            return primeId

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
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
    primes: PrimeResponse,
    procesVerbal: IProcesVerbal[],
    count?: number,
    pages?: number,
    currentProcesV?: IProcesVerbal
}

const initialState: PrimesState = {
    primes: {
        results: [],
        count: 0,
        links: {
            next: '',
            previous: '',
            current: ''
        },
        pages: 0
    },
    procesVerbal: [],
    query: {},
    count: 0,
    pages: 1,
    currentProcesV: undefined
}


export const primesSlice = createSlice({
    name: 'primes',
    initialState,

    reducers: {
        setSelectedDate: (state, { payload: { date } }: PayloadAction<{ date: number }>) => {
            state.selectedDate = date
        },
        setCurrentProcesV: (state, { payload: { proces_v } }: PayloadAction<{ proces_v: IProcesVerbal }>) => {
            state.currentProcesV = proces_v
            console.log('currentProcesV', state.currentProcesV)
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



        /** Get Proces Verbal  */
        builder.addCase(getProcesVerbal.fulfilled, (state, action) => {
            state.procesVerbal = action.payload
        })

        /** create proces Verbal */
        builder.addCase(createProcesVerbal.fulfilled, (state, action) => {
            state.procesVerbal?.push(action.payload)
        })
        builder.addCase(updateProcesVerbal.fulfilled, (state, action) => {
            state.procesVerbal = state.procesVerbal?.filter((proces: IProcesVerbal) => proces.id !== action.payload.id)
            state.procesVerbal?.push(action.payload)
            state.procesVerbal = state.procesVerbal?.sort((a, b) => a.id - b.id);
            state.currentProcesV = action.payload
        })

        builder.addCase(deleteProcesVerbal.fulfilled, (state, action) => {
            if (state.procesVerbal) {
                state.procesVerbal = state.procesVerbal.filter((proces: IProcesVerbal) => proces.id !== Number(action.payload))
            }
        })

        /*********************************************************************************************  */
        builder.addCase(getPrimes.fulfilled, (state, action) => {
            state.primes = action.payload
        })
        /** create proces Verbal */
        builder.addCase(createPrime.fulfilled, (state, action) => {
            state.primes.results.push(action.payload)
            // state.primes.results.filter()
        })

        builder.addCase(updatePrime.fulfilled, (state, action) => {
            console.log(action.payload)
            state.primes.results = state.primes.results.filter((prime: IPrime) => {
                if (prime.id !== action.payload.id)
                    return action.payload
                return prime
            })
            // state.primes.results.push(action.payload)
        })
        builder.addCase(deletePrime.fulfilled, (state, action) => {
            state.primes.results = state.primes.results.filter((prime:IPrime) => prime.id !== Number(action.payload))
            // state.primes.results.filter()
        })
    }
})

export const {
    setSelectedDate,
    setQuery,
    setCurrentProcesV,
} = primesSlice.actions

export default primesSlice.reducer


export const selectPrimesCurrentDate = (state: RootState) => state.primes.selectedDate
export const selectPrimesQuery = (state: RootState) => state.primes.query
export const selectPrimes = (state: RootState) => state.primes.primes
export const selectProcesVerbal = (state: RootState) => state.primes.procesVerbal
export const selectCurrentProcesV = (state: RootState) => state.primes.currentProcesV