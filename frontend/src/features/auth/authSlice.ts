import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Token, User } from "./authApi"
import { RootState } from "app/store"



type AuthState = {
    user: User | null,
    token:Token | null
}

const user:User = JSON.parse(localStorage.getItem('user') || '{}')
const token:Token = JSON.parse(localStorage.getItem('token') || '{}')


function isEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
}


const initialState:AuthState = {
    user: isEmpty(user) ? null : user,
    token: isEmpty(token) ? null : token,
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginUser: (
            state, { payload: { user, tokens } }: PayloadAction<{ user: User, tokens: Token }>
        ) => {
            if (typeof(Storage) !== "undefined"){
                state.user = user
                state.token = tokens

                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('token', JSON.stringify(tokens))
            }else{
                console.error("Local storage is not supported in this browser.");
            }
        },
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        },
    },
    extraReducers: (builder) => {

    }
})

export const {
    setLoginUser,
    logout,
} = authSlice.actions

export default authSlice.reducer


// export const selectCurrentUser = state => state.auth.user
// export const selectAccessToken = state => state.auth.token

export const selectCurrentUser = (state:RootState) => state.auth.user
export const selectAccessToken = (state:RootState) => state.auth.token