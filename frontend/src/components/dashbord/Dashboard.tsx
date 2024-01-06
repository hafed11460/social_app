import { useEffect, useRef, useState } from "react"
import { Dropdown, ListGroup } from "react-bootstrap"
import NavBar from "./Navbar"


const Cell = ({ month }: { month: number }) => {
    console.log('Render Cell', month)
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null)
    const cellRef = useRef(null)

    const handleDelete = (e: React.MouseEvent) => {
        console.log('delete clicked')
        setShowMenu(false)
    }

    const onContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setShowMenu(true);
        // setBg(bg_actvie)
    }
    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target) &&
            event.target !== cellRef.current
        ) {
            setShowMenu(false);
        }
    }
    useEffect(() => {
        window.addEventListener("mousedown", handleOutsideClick);
        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [])
    return (
        <div
            ref={cellRef}
            onContextMenu={onContextMenu}>
            <h2>item</h2>
            {
                showMenu && <ListGroup ref={menuRef} onClick={handleDelete}>
                    <ListGroup.Item onClick={handleDelete}>Cras justo odio</ListGroup.Item>
                </ListGroup>
            }

        </div>
    )
}

const Dashboard = () => {
    const [montCells] = useState<number[]>(Array.from({ length: 3 }, (value, index) => index + 1))
    return (
        <>
            <NavBar />
            {
                montCells && montCells.map((month, index) =>
                    <div key={index} className="d-flex align-content-start flex-wrap d-inline-flex me-1 p-1 border">
                        <Cell month={month} />
                    </div>
                )
            }
        </>
    )
}

export default Dashboard