import axios, { AxiosError } from 'axios'
import { BASE_URL } from './BASE_URL'
import { Token } from './auth/authApi'

export const axiosBaseQuery =
  (
    { baseUrl } = { baseUrl: '' }
  ) =>
  async ({ url, method, data }:{url:string,method:string,data:object}) => {
    try {
      let header = {}
      if(localStorage.getItem("token")){
        const token:Token = JSON.parse(localStorage.getItem('token') || "")
        header = {
            baseURL:BASE_URL,
            // headers: {
            //   "Content-Type": "multipart/form-data",
            //   'Authorization':`Bearer ${token.access}`,
            // },
            headers:{
                'Authorization':`Bearer ${token.access}`,
                // 'Content-Type':'application/json;multipart/form-data',
                'Accept':'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }
     }else{
        header = {
            baseURL:BASE_URL,
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }
    }
      const api = axios.create(header)
      const result = await api({ url: baseUrl + url, method, data })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: { status: err.response?.status, data: err.response?.data },
      }
    }
  }
