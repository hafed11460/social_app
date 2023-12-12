import { useState } from "react"
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DashRoute } from "types/types.routes"

const SidebarItem = ({ route }: { route: DashRoute }) => {
    const { children, label, icon } = route
    const [active, setActive] = useState(false)
    const handleItemClick = () => {
        setActive(!active)
    }
    return (
        <Nav.Item  className={`sidebar-item   ${route.labelDisable ? '' : 'has-sub'}`} >
            {
                route.labelDisable ?
                    <Link to={route.to} className='sidebar-link'>
                        <i className={icon}></i>
                        <span>{label}</span>
                    </Link> :
                    <a href="#" className='sidebar-link' onClick={handleItemClick}>
                        <i className={icon}></i>
                        <span>{label}</span>
                    </a>
            }

            <Nav as={'ul'} className={`submenu ${active ? 'submenu-open' : 'submenu-closed'}`}>
                {
                    children && children.map((item) => (
                        <Nav.Item  className="submenu-item active" key={item.name}>
                            <Link to={item.to}>
                                <i className={item.icon}></i>
                                <span> {item.name} </span>

                            </Link>
                        </Nav.Item>
                    ))
                }
            </Nav>
        </Nav.Item>

    )
}

export default SidebarItem