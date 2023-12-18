import { Route, Routes } from 'react-router-dom'

import Login from 'components/auth/Login'
import AuthLayout from 'layouts/AuthLayout'
import { PrivateRoute } from 'layouts/PrivateRoute'
import MainLayout from 'layouts/MainLayout'
import Dashboard from 'components/dashbord/Dashboard'
import EmployeesList from 'components/employees/EmployeesList'
import EmployeeDetail from 'components/employees/EmployeeDetail'
import { PrimesList } from 'components/primes/PrimesList'
import { ToastContainer } from 'react-toastify'
import FaciliteApp from 'components/facilities/FaciliteApp'


const SocialRouter = () => {
    return (
        <>
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login/" element={<Login />} />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route element={<MainLayout />}>
                  
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/employees" element={<EmployeesList />} />
                        <Route path="/employees/:eid/" element={<EmployeeDetail />} />                    
                        <Route path="/employees/primes/" element={<PrimesList />} />

                        <Route path="/facilities" element={<FaciliteApp />} />
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