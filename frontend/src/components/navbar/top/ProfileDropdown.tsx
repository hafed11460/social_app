import Avatar from "components/common/Avatar";
import { Token, useLogoutUserMutation } from "features/auth/authApi";
import { logout, selectAccessToken } from "features/auth/authSlice";
import useAuth from "hooks/useAuth";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AgencyItem = () => {

    return (
        <Dropdown.Item as={Link} to="/vendor/agency/">
            {/* <Avatar src={user.agency_logo} />  */}
            <span>My Agency</span>
            {/* <span>{user.agency_name}</span> */}
        </Dropdown.Item>
    )
}

const ProfileDropdwon = () => {
    const { user, isVendor } = useAuth()
    const  token:Token | null  = useSelector(selectAccessToken)
    const [LogoutUser, { isSuccess: isLogout }] = useLogoutUserMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onLogout = async () => {
        // LogoutUser({ refresh: token.refresh )
        dispatch(logout())
        navigate('/login/')
    }

    if (!user) return null

    return (
        <Dropdown navbar={true} as="li" >
            <Dropdown.Toggle
                bsPrefix="toggle"
                as={Link}
                to="#!"
                className="p-0 px-3 nav-link"
            >
                <div className="user-menu d-flex">
                    <div className="user-img d-flex align-items-center">
                        <div className="avatar avatar-md">
                            <Avatar src={user && user?.avatar} size={40} />
                        </div>
                    </div>
                    <div className="user-name text-start ms-3">
                        <h6 className="mb-0 text-gray-600">{user && user.first_name}</h6>
                        {/* <p className="mb-0 text-sm text-gray-600">Admin</p> */}
                    </div>

                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className=" dropdown-menu-card rounded-0 shadow-sm dropdown-menu-end mt-2" style={{ minWidth: '250px' }}>
                <div className="bg-white rounded-2 py-2 dark__bg-1000">
                    <Dropdown.Item as={Link} to="/account/">
                        <div className="d-flex align-items-center flex-row ">
                            <Avatar src={user && user.avatar} size={60} />
                            <div className="mx-2 h6">{user && user.first_name} {user && user.last_name}</div>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item as={Link} to="/account/">
                        Account
                    </Dropdown.Item>
                    {isVendor && <AgencyItem />}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={onLogout} as={Link} to="#!">
                        Logout
                    </Dropdown.Item>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ProfileDropdwon;