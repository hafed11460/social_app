import { Container, Nav, Navbar } from "react-bootstrap"
import { BsEnvelope, BsJustify } from "react-icons/bs"
import MessageDropdown from "./MessageDropdown"
import NotificationDropdown from "./NotificationDropdown"
import ProfileDropdwon from "./ProfileDropdown"
import { AppContext } from "main"
import { useContext } from "react"

const TopNavbar = () => {
    const {
        config: { isHide, isDark,isSidebar },
        setConfig        
    } = useContext(AppContext)
    return (
        <header>
            <Navbar>
                <Container fluid>                    
                    <a onClick={() => setConfig('isSidebar', !isSidebar)} href="#" className="burger-btn d-block">
                        <BsJustify size={40} />
                    </a>
                    <Navbar.Collapse>
                        <Nav className="ms-auto mb-lg-0">
                            <MessageDropdown width={250} />
                            {/* <NotificationDropdown/> */}
                            <ProfileDropdwon />
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default TopNavbar