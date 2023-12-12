import { AppContext } from "main"
import { useContext } from "react"
import { Nav } from "react-bootstrap"

import SidebarItem from "./SidebarItem"
import dashRoutes from "routes/routes"

const Sidebar = () => {
    const {
        config: { isHide, isDark, isSidebar },
        setConfig
    } = useContext(AppContext)
    return (
        <div id="sidebar" className={`${isSidebar ? 'active' : 'inactive'}`}>
            <div className="sidebar-wrapper active">
                <div className="sidebar-header position-relative">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="logo">
                            <a href="index.html">
                                {/* <img src="./assets/compiled/svg/logo.svg" alt="Logo" srcset=""> */}
                            </a>
                        </div>
                        <div className="theme-toggle d-flex gap-2  align-items-center mt-2">
                            
                            <div className="form-check form-switch fs-6">
                                <input className="form-check-input  me-0" type="checkbox" id="toggle-dark" style={{ cursor: 'pointer' }} />
                                <label className="form-check-label"></label>
                            </div>
                            
                        </div>
                        <div className="sidebar-toggler  x" onClick={() => setConfig('isSidebar', !isSidebar)}>
                            <a href="#" className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></a>
                        </div>
                    </div>
                </div>
                <div className="sidebar-menu">
                    <ul className="menu">
                        <li className="sidebar-title">Menu</li>
                        <Nav className="sidebar-item">Menu</Nav>
                        {
                            dashRoutes.map((route, idx) => (
                                <SidebarItem route={route}
                                    key={idx}
                                >
                                </SidebarItem>
                            ))
                        }

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar