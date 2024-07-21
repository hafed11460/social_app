import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GService from './globalServices'
import { IStatistic } from "types/types.global";
import { RootState } from "app/store";
export const getGlobalStatistic = createAsyncThunk(
    'primes/proces-verbal/create',
    async () => {
        const res = await GService.getGlobalStatistic()
        return res.data;
    })

interface IGlobalState {
    statistic:IStatistic,
}
const initialState: IGlobalState = {
    statistic:{
        employees_count:0,
        facilities_count:0,
        primes_count:0
    }
}
export const globalSlice = createSlice({
    name:'globals',
    initialState:initialState,
    reducers:{},
    extraReducers(builder) {
        /** get statistic for dashboard */
        builder.addCase(getGlobalStatistic.fulfilled,(state, action)=>{
            state.statistic = action.payload
        })
    },
})

export default globalSlice.reducer

export const selectGlobalStatistic = (state:RootState)=> state.global.statistic