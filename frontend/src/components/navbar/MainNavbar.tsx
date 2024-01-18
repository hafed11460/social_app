import { useState } from 'react'
import { Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import dashRoutes from 'routes/routes'
import { DashRoute } from 'types/types.routes'
import ProfileDropdwon from './top/ProfileDropdown'
import ProfileDropdwon2 from './top/ProfileDropdwon2'

const NavbarItem = ({ route }: { route: DashRoute }) => {
    const { children, label, icon } = route
    const [active, setActive] = useState(false)
    const handleItemClick = () => {
        setActive(!active)
    }
    return (
        <Nav.Item className={`menu-item   ${route.labelDisable ? '' : 'has-sub'}`} >
            {
                route.labelDisable ?
                    <Link to={route.to} className='menu-link '>
                        <i className={icon}></i>
                        <span>{label}</span>
                    </Link>
                    :
                    <a href="#" className='menu-link' onClick={handleItemClick}>
                        <i className={icon}></i>
                        <span>{label}</span>
                    </a>
            }

            {/* {
                children.length &&
                <div className="submenu ">
                    <div className="submenu-group-wrapper">
                        <Nav as={'ul'} className={`submenu-group`}>
                            {
                                children && children.map((item) => (
                                    <Nav.Item className="submenu-item active" key={item.name}>
                                        <Link to={item.to}>
                                            <i className={item.icon}></i>
                                            <span> {item.name} </span>

                                        </Link>
                                    </Nav.Item>
                                ))
                            }
                        </Nav>
                    </div>
                </div>
            } */}
        </Nav.Item>
    )
}


const MainNavbar = () => {
    return (
        <header className="mb-5">
            <nav className="main-navbar p-2 ">
                <Container fluid className='d-flex justify-content-between'>
                    <ul>
                        <li
                            className="menu-item  ">
                            <a href="/" className='menu-link'>
                                <span><i className="bi bi-grid-fill"></i> Dashboard</span>
                            </a>
                        </li>
                        {
                            dashRoutes.map((route, idx) => (
                                <NavbarItem route={route} key={idx} />
                            ))
                        }
                    </ul>
                    <ul className='ms-auto '>
                        <ProfileDropdwon2 />
                    </ul>
                </Container>

            </nav>

        </header>
    )
}

export default MainNavbar
