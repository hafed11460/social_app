import { selectAccessToken } from "features/auth/authSlice"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

const PrivateRoute = ()=>{
    const token = useSelector(selectAccessToken)
    return token != null ? <Outlet/> : <Navigate to ='/login/'/>
}

export default PrivateRoute