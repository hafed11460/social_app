import axios from "axios";
import { axiosBaseQuery } from "features/AxiosBaseQuery";
import { BASE_URL } from "features/BASE_URL";
import { Token } from "features/auth/authApi";



const headers = () => {

    const token:Token = JSON.parse(localStorage.getItem('token') || '{}')
    let header = null
    if (token) {
        header = {
            baseURL:BASE_URL,
            headers:{
                'Authorization':`Bearer ${token.access}`,
                'Content-Type':'application/json',
                'Accept':'application/json',
            }
        }
    } else {
        header = {
            baseURL:BASE_URL,
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }
    }
    return header
}
// export const api = axiosBaseQuery
export const api = axios.create(headers())

export default  axios.create(headers())