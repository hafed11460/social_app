import { useEffect, useRef, useState } from "react"
import { Button, ButtonToolbar, Dropdown, ListGroup, OverlayTrigger, Popover, Tooltip } from "react-bootstrap"
import NavBar from "./Navbar"
import { BsFillFilterSquareFill } from "react-icons/bs"


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

const Example2TooltipCustomClass = () => {
    return (
        <ButtonToolbar>
            {["custom-1", "custom-2"].map(customClass => (
                <OverlayTrigger
                    key={customClass}
                    placement="bottom"
                    overlay={
                        <Tooltip
                            id={`tooltip-${customClass}`}
                            className={`tooltip-${customClass}`}
                        >
                            Tooltip {customClass} example
                        </Tooltip>
                    }
                >
                    <Button className="ml-2 mb-5" variant="secondary">
                        Tooltip {customClass}
                    </Button>
                </OverlayTrigger>
            ))}
        </ButtonToolbar>
    );
};


const SimplePop = ()=> {
    const ref = useRef();
  
    console.log(ref.current); // 👈️ undefined here
  
    useEffect(() => {
      const element = ref.current;
      console.log(element); // 👈️ element here
    }, []);
  
    const handleClick = () => {
      console.log(ref.current); // 👈️ element here
    };
  
    return (
      <div>
        <div ref={ref}>
          <h2>bobbyhadz.com</h2>
        </div>
  
        <button onClick={handleClick}>Click</button>
      </div>
    );
  }

const ExamplePop = () => {
    console.log('Example Pop Rendering')
    const popRef = useRef(null);
    const [show, setShow] = useState(false);

    const handleOutsideClick = (event: any) => {
        if (
            popRef.current &&
            !popRef.current.contains(event.target)
            // &&
            // event.target !== cellRef.current
        ) {
            setShow(false);
        } else {
            console.log(popRef.current)
            console.log(event.target)
        }
    }
    useEffect(() => {
        window.addEventListener("mousedown", handleOutsideClick);
        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [show])
    return (

        <OverlayTrigger
            show={show}
            // trigger="click"
            placement="right"
            overlay={
                <Popover ref={popRef} id="popover-basic">
                    <Popover.Header as="h3">Popover right</Popover.Header>
                    <Popover.Body>
                        And here's some <strong>amazing</strong> content. It's very engaging.
                        right?
                    </Popover.Body>
                </Popover>
            }>
            <Button onClick={() => setShow(!show)} variant="warning">Click me to see</Button>
        </OverlayTrigger>
    );
}

const Toolpit = () => {
    const [isError] = useState(true)
    return (
        <>

            <OverlayTrigger trigger="hover" placement="bottom"
                overlay={isError ?
                    <Popover id="popover-basic">
                        <Popover.Header as="h3">Popover right</Popover.Header>
                        <Popover.Body>
                            And here's some <strong>amazing</strong> content. It's very engaging.eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                            right?
                        </Popover.Body>
                    </Popover> : <></>}
            >
                <Button variant="success">Tooltip example </Button>
            </OverlayTrigger>

        </>
    )
}

const Dashboard = () => {
    const [montCells] = useState<number[]>(Array.from({ length: 3 }, (value, index) => index + 1))
    return (
        <>
            <SimplePop />
            <ExamplePop />
            <Toolpit />
            <span className="d-inline-block" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover">
                <button className="btn btn-primary" type="button" disabled>Disabled button</button>
            </span>
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