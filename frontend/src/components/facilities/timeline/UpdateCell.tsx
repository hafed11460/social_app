import { useAppDispatch } from "app/hooks";
import { deleteTimeline, updateTimeline } from "features/facilities/facilitiesSlice";
import { KeyboardEvent, memo, useCallback, useEffect, useRef, useState } from "react";
import { Alert, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsFillPenFill, BsTrash } from "react-icons/bs";
import { ITimeline } from "types/types.facilities";
import CreateComment from "./CreateComment";

interface UpdateCellProps {
    timeline: ITimeline,
    isExist: boolean,
    isFacCompleted: boolean,
}

const bg_actvie = "#77b9f7"
const bg_exist = "#FFFFE0"




const UpdateCell = memo(({ timeline, isExist, isFacCompleted }: UpdateCellProps) => {
    // console.log('render cell ', timeline.id)
    const dispatch = useAppDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState<number>(Number(timeline ? timeline.somme : 0))
    const [newTLine, setNewTLine] = useState<ITimeline>(timeline)
    const [bg, setBg] = useState(bg_exist)
    const [error, setError] = useState<string>('')
    const menuRef = useRef(null)
    const cellRef = useRef(null)
    const [showModal, setShowModal] = useState(false);

    const handleAddComment = () => {
        setShowModal(true)
        // setShowMenu(false)
    }

    const handleDelete = (e: React.MouseEvent) => {
        console.log('delete clicked')
        dispatch(deleteTimeline(timeline))
            .unwrap()
            .then(() => {
                setError('')
            })
            .catch((err) => {
                setError('Can\'t remove this timeline')
            })
    }

    useEffect(() => {
        setNewTLine({
            ...newTLine,
            somme: Number(value)
        })
    }, [value])

    const handleUpdateTimeline = useCallback(() => {
        console.log('useCalback')
        if (newTLine.somme < 0) return;
        dispatch(updateTimeline(newTLine))
            .unwrap()
            .then(() => {
                setError('')
            })
            .catch((err) => {
                console.log('errrrrrrrror', err['error'])
                setError(err['error'])
            })
    }, [newTLine])


    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsEdit(false)
        setBg(bg_exist)
        handleUpdateTimeline()
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const re = /([0-9]*[.])?[0-9]+/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setValue(Number(e.target.value))
        }
    }

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode == 13) {
            e.currentTarget.blur()
        }
    }

    const onDoubleClick = () => {
        setIsEdit(true)
        // inputRef.current.focus()
        setShowMenu(false);
        // setBg('white');
    }

    const onContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log('onContext Menu')
        event.preventDefault();
        setShowMenu(true);
        // setBg(bg_actvie)
    }


    const handleOutsideClick = (event: any) => {
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


    if (error) {
        return (
            <OverlayTrigger
                overlay={
                    <Tooltip
                        className="cell-tooltip p-0" >
                        <Alert variant="warning" className="m-0">
                            {error}
                        </Alert>
                    </Tooltip>
                }
            >
                <div

                    className={`position-relative ${isExist ? 'cell-exist' : ''} ${error ? 'cell-error' : ''} `}
                    onContextMenu={onContextMenu}
                    // onClick={onClick}
                    // onBlur={() => setShowMenu(false)}
                    style={{ backgroundColor: bg }}
                >
                    {!isEdit ?
                        <div
                            style={{ minHeight: '100%', width: '100%', minWidth: '100%', height: '100%' }}
                        >
                            {value}
                        </div> :
                        <input
                            onKeyUp={onKeyUp}
                            value={value}
                            autoFocus
                            onBlur={onBlur}
                            onChange={onChange}
                            type='number' style={{ width: '100%', height: '100%' }}
                        />
                    }
                    <Dropdown.Menu
                        ref={menuRef}
                        show={showMenu}
                        className=" dropdown-menu-card rounded-0 shadow dropdown-menu-end mt-2">
                        <Dropdown.Item className="border-bottom" onClick={handleDelete}>Remove </Dropdown.Item>
                        <Dropdown.Item onClick={handleAddComment} >Add Comment</Dropdown.Item>
                    </Dropdown.Menu>
                </div>
            </OverlayTrigger>
        )
    }


    return (
        <div
            ref={cellRef}
            className={`cell position-relative ${isExist ? 'cell-exist' : ''} ${error ? 'cell-error' : ''} `}
            onContextMenu={onContextMenu}
            onDoubleClick={onDoubleClick}
            style={{ backgroundColor: bg }}
        >
            <CreateComment timeline={timeline} show={showModal} setShow={setShowModal} />
            {
                !isEdit ?
                    <div style={{
                        minHeight: '100%',
                        width: '100%',
                        minWidth: '100%',
                        height: '100%'
                    }} >
                        {value.toFixed(2)}
                    </div>
                    :
                    <input
                        disabled={isFacCompleted}
                        onKeyUp={onKeyUp}
                        value={value}
                        autoFocus
                        onBlur={onBlur}
                        onChange={onChange}
                        type='number' style={{ width: '100%', height: '100%' }}
                    />
            }
            {error &&
                <div className="popup-error position-absolute px-3 py-2 bg-warning  top-100 start-100 rounded">
                    <div className="popover-body">
                        {error}
                    </div>
                </div>
            }
            {
                timeline.observation &&
                <>
                    <div className="position-absolute top-0 end-0 comment ">
                        <div className="position-absolute top-100 start-100 comment-content bg-white">
                            <p>
                                {timeline.observation}
                            </p>
                        </div>
                    </div>
                </>

            }

            <Dropdown.Menu
                ref={menuRef}
                show={showMenu}
                className=" dropdown-menu-card rounded-0 shadow dropdown-menu-end mt-2 p-0">
                <div style={
                    {   
                        position:'absolute',
                        width:"0px",
                        height:"0px",
                        right: '0px',
                        top:'-8px',
                        borderRight: '8px solid transparent',
                        borderLeft: '8px solid transparent',
                        borderBottom: '10px solid white',
                    }
                }></div>
                <Dropdown.Item className="border-bottom" onClick={handleDelete}><BsTrash /> Remove </Dropdown.Item>
                <Dropdown.Item onClick={handleAddComment} ><BsFillPenFill /> Edit Comment</Dropdown.Item>
            </Dropdown.Menu>
        </div>
    )
})

export default UpdateCell