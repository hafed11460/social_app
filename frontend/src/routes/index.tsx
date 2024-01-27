import { Route, Routes } from 'react-router-dom'

import Login from 'components/auth/Login'
import Dashboard from 'components/dashbord/Dashboard'
import EmployeeDetail from 'components/employees/EmployeeDetail'
import EmployeesList from 'components/employees/EmployeesList'
import FaciliteApp from 'components/facilities/FaciliteApp'
import PrimesApp from 'components/primes/PrimesApp'
import AuthLayout from 'layouts/AuthLayout'
import MainLayout from 'layouts/MainLayout'
import { PrivateRoute } from 'layouts/PrivateRoute'


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
                        <Route path="/employees" element={<EmployeesList />} />
                        <Route path="/employees/:matricule/" element={<EmployeeDetail />} />  

                        <Route path="/primes/" element={<PrimesApp />} />
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