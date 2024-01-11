import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "app/store"
import { IFFilterArgs, IFacilite, ITimeline } from "types/types.facilities"
import FServices from "./faciliteServices"
import { CreateFaciliteFromData } from "components/facilities/CreateFacilite"

export const getFacilities = createAsyncThunk(
    'facilities/',
    async (args:IFFilterArgs) => {
        const res = await FServices.getFacilities(args)
        return res.data;
    })


export const createFacilite = createAsyncThunk(
    'facilities/create',
    async (facilite: CreateFaciliteFromData, { rejectWithValue }) => {
        try {
            const res = await FServices.createFacilite(facilite)
            return res.data;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })


export const createTimeline = createAsyncThunk(
    'timelines/create',
    async (timeline: ITimeline, { rejectWithValue }) => {
        try {
            const res = await FServices.createTimeline(timeline)
            return res.data;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

export const deleteTimeline = createAsyncThunk(
    'timelines/delete',
    async (timeline: ITimeline, { rejectWithValue }) => {
        try {

            const res = await FServices.deleteTimeline(timeline.id)
            return timeline

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

export const updateTimeline = createAsyncThunk(
    'timelines/update',
    async (timeline: ITimeline, { rejectWithValue }) => {
        try {
            const res = await FServices.updateTimeline(timeline)
            return res.data;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            // return err
            return rejectWithValue(err.response.data)
        }
    })


interface FacilteResponse {
    results: IFacilite[],
    pages: number,
    count: number,
    links: {
        next: string,
        previous: string,
        current:string
    },
}

interface FacilitiesState {
    selectedDate?:number,
    query?:string,
    facilities?: FacilteResponse,
    count?: number,
    pages?: number,
    isLoading?: boolean,
    isError?: boolean,
    error?: any
    isSuccess?: boolean
}




function isEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
}



const initialState: FacilitiesState = {
    facilities: undefined,
    query:'',
    count: 0,
    pages: 1,
    isError: false,
    isLoading: false,
    error: null,
    isSuccess: false
}


export const facilitiesSlice = createSlice({
    name: 'facilities',
    initialState,
    
    reducers: {
        setSelectedDate: (state, { payload: { date } }: PayloadAction<{ date: number }>) => {
            state.selectedDate = date            
        },        
        setQuery: (state, { payload: { query } }: PayloadAction<{ query: string }>) => {
            state.query = query            
        },        
    },
    extraReducers: (builder) => {

        builder.addCase(getFacilities.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getFacilities.fulfilled, (state, action) => {
            state.isLoading = true;
            state.isError = false
            state.facilities = action.payload           
        })
        builder.addCase(getFacilities.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            // state.error = action.payload;
        })


        //*****  create facilite  */        
        builder.addCase(createFacilite.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(createFacilite.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false
            state.facilities?.results.push(action.payload)
        })
        builder.addCase(createFacilite.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            // state.isSuccess = false
            // state.errors = action.payload;
        })


        //*****  create timeline  */        
        builder.addCase(createTimeline.pending, (state, action) => {
            state.isLoading = true;
            // state.postID = action.meta.arg.post
        })
        builder.addCase(createTimeline.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false
            // state.isSuccess = true
            // state.postID = null;    
            state.facilities?.results.filter((facilite: IFacilite) => {
                if (facilite.id === action.payload.facilite) {
                    return facilite.timelines.push(action.payload)
                }
                return facilite
            })
        })
        builder.addCase(createTimeline.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            // state.isSuccess = false
            // state.errors = action.payload;
        })


        //*****  Update timeline  */        
        builder.addCase(updateTimeline.pending, (state, action) => {
            state.isLoading = true;
            // state.postID = action.meta.arg.post
        })
        builder.addCase(updateTimeline.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false
            // state.isSuccess = true
            // state.postID = null;    
            state.facilities?.results.filter((facilite: IFacilite) => {
                if (facilite.id === action.payload.facilite) {
                    facilite.timelines = facilite.timelines.filter((timeline: ITimeline) => timeline.id !== action.payload.id)
                    facilite.timelines.push(action.payload)
                    return facilite
                }
                return facilite
            })
        })
        builder.addCase(updateTimeline.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
            state.isError = true
            // state.error = action.payload;
            // console.log('error', action.payload)
        })


        //*****  Delete timeline  */        
        builder.addCase(deleteTimeline.pending, (state, action) => {
            state.isLoading = true;
            // state.postID = action.meta.arg.post
        })
        builder.addCase(deleteTimeline.fulfilled, (state, action) => {
            state.facilities?.results.filter((facilite: IFacilite) => {
                if (facilite.id === action.payload.facilite) {
                    facilite.timelines = facilite.timelines.filter((timeline: ITimeline) => timeline.id !== action.payload.id)
                    return facilite
                }
                return facilite
            })
        })
        builder.addCase(deleteTimeline.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
            state.isError = true
            // state.error = action.payload;
            // console.log('error', action.payload)
        })





    }
})

export const {
    setSelectedDate,
    setQuery,
} = facilitiesSlice.actions

export default facilitiesSlice.reducer


export const selectCurrentDate = (state: RootState) => state.facilities.selectedDate
export const selectQuery = (state: RootState) => state.facilities.query
// export const selectAccessToken = state => state.auth.token

export const selectFacilities = (state: RootState) => state.facilities.facilities
// export const selectAccessToken = (state:RootState) => state.auth.token