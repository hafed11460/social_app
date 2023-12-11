import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { IconType } from "react-icons";
// const { Dropdown } = require("react-bootstrap")
type DropdownProps ={
    icon?:ReactNode,
    children?:ReactNode,
    width?:number
}

const MDropdown = ({
    icon,
    children,
    width =200
}:DropdownProps) => {
    return (
        <Dropdown>
            <Dropdown.Toggle
                type="button"
                bsPrefix="toggle"
                className="p-0 px-2 nav-link "
            >
                {icon}
            </Dropdown.Toggle>
            <Dropdown.Menu
                className="dropdown-menu-end mt-2 rounded-0 rounded-bottom"
                style={{ minWidth: `${width}px`, maxWidth: `${width}px` }}
            >
                {children}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default MDropdown;