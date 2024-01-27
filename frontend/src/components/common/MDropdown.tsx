import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { IconType } from "react-icons";
// const { Dropdown } = require("react-bootstrap")
type DropdownProps ={
    icon?:ReactNode,
    children?:ReactNode,
    width?:number,
    className?:string
}

const MDropdown = ({
    icon,
    children,
    width =200,
    className
}:DropdownProps) => {
    return (
        <Dropdown className={className}>
            <Dropdown.Toggle
                type="button"
                size="sm"
                bsPrefix="toggle"
                className="p-0 px-2 m-0 "
            >
                {icon}
            </Dropdown.Toggle>
            <Dropdown.Menu
                className="dropdown-menu-end mt-2 rounded-0 rounded-bottom bg-light"
                style={{ minWidth: `${width}px`, maxWidth: `${width}px` }}
            >
                {children}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default MDropdown;