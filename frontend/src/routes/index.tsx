import { Route, Routes } from 'react-router-dom'

import Login from 'components/auth/Login'
import AuthLayout from 'layouts/AuthLayout'
import { PrivateRoute } from 'layouts/PrivateRoute'
import MainLayout from 'layouts/MainLayout'
import Dashboard from 'components/dashbord/Dashboard'
import EmployeesList from 'components/employees/EmployeesList'


const SocialRouter = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login/" element={<Login />} />
                {/* <Route path="/register/" element={<Register />} />
                <Route path="/email-verify/" element={<EmailVerify />} />
                <Route path="/forgot-password/" element={<ForgotPassword />} />
                <Route path="/auth/password-reset-confirm/:uid/:token/" element={<PasswordResetConfirm />} /> */}
            </Route>

            <Route element={<PrivateRoute />}>
                <Route element={<MainLayout />}>
                  
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/employees" element={<EmployeesList />} />
                    
                </Route>
            </Route>
        </Routes>
    )
}

export default SocialRouter