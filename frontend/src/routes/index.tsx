import FApp from 'components/app/FApp'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

// import Login from 'components/auth/Login'
// import Dashboard from 'components/dashbord/Dashboard'
// import EmployeeDetail from 'components/employees/EmployeeDetail'
// import EmployeesList from 'components/employees/EmployeesList'
// import FaciliteApp from 'components/facilities/FaciliteApp'
// import PrimesApp from 'components/primes/PrimesApp'
// import AuthLayout from 'layouts/AuthLayout'
// import MainLayout from 'layouts/MainLayout'
// import  PrivateRoute  from 'layouts/PrivateRoute'

const PrivateRoute = lazy(()=>import('layouts/PrivateRoute'))
const MainLayout = lazy(()=>import('layouts/MainLayout'))
const AuthLayout = lazy(()=>import('layouts/AuthLayout'))
const PrimesApp = lazy(()=>import('components/primes/PrimesApp'))
const FaciliteApp = lazy(()=>import('components/facilities/FaciliteApp'))
const EmployeesApp = lazy(()=>import('components/employees/EmployeesApp'))
const EmployeeDetail = lazy(()=>import('components/employees/EmployeeDetail'))
const Dashboard = lazy(()=>import('components/dashbord/Dashboard'))
const Login = lazy(()=>import('components/auth/Login'))

const SocialRouter = () => {
    return (
        <>
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login/" element={<Login />} />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route element={<MainLayout />}>
                  
                        {/* <Route path="/" element={<FaciliteApp />} /> */}
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/employees" element={<EmployeesApp />} />
                        <Route path="/employees/:matricule/" element={<EmployeeDetail />} />  

                        <Route path="/primes/" element={<PrimesApp />} />
                        <Route path="/facilities" element={<FaciliteApp />} />
                        <Route path="/app" element={<FApp />} />
                </Route>
            </Route>
        </Routes>
        {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                // pauseOnFocusLoss
                // draggable
                // pauseOnHover
            /> */}
        </>
    )
}

export default SocialRouter