import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../AxiosBaseQuery"



const auth_root = '/auth'

export interface User{
    id:number,
    first_name:string,
    last_name:string,
    email:string,
    profile_image:string,
    role:string,
    avatar:string,
    agency_id?:number
}

export interface Token{
    access:string | null,
    refresh:string | null
}
export interface UserResponse{
    user:User,
    token:Token
}

export interface LoginRequest {
    email: string,
    password: string
}

type AuthState = {

}

export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery:axiosBaseQuery(),
    endpoints:(builder)=>({
        loginUser:builder.mutation({
            query:(body)=>{
                return{
                    url:`${auth_root}/login/`,
                    method:'POST',
                    data:body,
                };
            },
            
        }),
        RegisterUser:builder.mutation({
            query:(body)=>{
                return{
                    url:`${auth_root}/register/`,
                    method:'POST',
                    data:body,
                };
            },
        }),
        getUserInfo:builder.query({
            query:()=>{
                return{
                    url:`/auth/update-user-info/`,
                    method:'GET',
                    data:{},
                };
            },
        }),
        updateUserInfo:builder.mutation({
            query:(body)=>{
                return{
                    url:`/auth/update-user-info/`,
                    method:'POST',
                    data:body,
                };
            },
        }),
        updateUserAvatar:builder.mutation({
            query:(body)=>{
                return{
                    url:`/auth/update-user-avatar/`,
                    method:'PATCH',
                    data:body,
                };
            },
        }),
        updateUserPassword:builder.mutation({
            query:(body)=>{
                return{
                    url:`/auth/update-user-password/`,
                    method:'PATCH',
                    data:body,
                };
            },
        }),
        emailVerify: builder.mutation({
            query: (body) => {
                return {
                url: "/auth/email-verify/?token="+body.token,
                method: "get",
                data:{},
                };
            },
        }),
        emailRestPassword:builder.mutation({
            query:(body)=>{
                return{
                    url:`/auth/request-reset-email/`,
                    method:'POST',
                    data:body,
                };
            },
        }),
        passwordResetConfirm: builder.mutation({
            query: (body) => {
                console.log(body)
                return {
                url: `/auth/password-reset-confirm/${body.uidb64}/${body.token}/`,
                method: "get",
                data:{},
                };
            },
        }),
        passwordResetComplete: builder.mutation({
            query: (body) => {
                console.log(body)
                return {
                url: `/auth/password-reset-complete/`,
                method: "PATCH",
                data:body,
                };
            },
        }),
        LogoutUser:builder.mutation({
            query:(data)=>{               
                return{
                    url:`${auth_root}/logout/`,
                    method:'POST',
                    data:data,
                };
            },
        })
    })
})

export const {
    useUpdateUserPasswordMutation,
    useUpdateUserAvatarMutation,
    useGetUserInfoQuery,
    useUpdateUserInfoMutation,
    usePasswordResetCompleteMutation,
    usePasswordResetConfirmMutation,
    useEmailVerifyMutation,
    useLoginUserMutation,
    useRegisterUserMutation,
    useEmailRestPasswordMutation,
    useLogoutUserMutation
} = authApi
