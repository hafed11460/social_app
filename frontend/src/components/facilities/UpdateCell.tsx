import { deleteTimeline, updateTimeline } from "features/facilities/facilitiesSlice";
import { KeyboardEvent, memo, useEffect, useRef, useState } from "react";
import { Alert, Dropdown, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ITimeline } from "types/types.facilities";
import ErrorCell from "./ErrorCell";

interface UpdateCellProps {
    timeline: ITimeline,
    isExist: boolean,
    isFacCompleted: boolean,
}

const bg_actvie = "#77b9f7"
const bg_exist = "#dddddd"


const UpdateCell = memo(({ timeline, isExist, isFacCompleted }: UpdateCellProps) => {
    console.log('render cell ', timeline.id)
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState<number>(Number(timeline ? timeline.somme : 0))
    const [newTLine, setNewTLine] = useState<ITimeline>(timeline)
    const [bg, setBg] = useState(bg_exist)
    const [error, setError] = useState<string>('')
    const menuRef = useRef(null)
    const cellRef = useRef(null)

    const handleDelete = (e:React.MouseEvent) => {
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



    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsEdit(false)
        setBg(bg_exist)
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
    const onClick = () => {
        setIsEdit(true)
        // inputRef.current.focus()
        setShowMenu(false);
        // setBg('white');
    }

    const onContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setShowMenu(true);
        // setBg(bg_actvie)
    }

    const handleOutsideClick = (event:any) => {
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

    // if (error) {
    //     return (
    //         <OverlayTrigger
    //             overlay={
    //                 <Tooltip
    //                     color="red"
    //                     className="p-0">
    //                     <Alert variant="warning" className="m-0">
    //                         <ErrorCell error={error} variant="dark" />
    //                     </Alert>
    //                 </Tooltip>
    //             }
    //         >
    //             <div

    //                 className={`position-relative ${isExist ? 'cell-exist' : ''} ${error ? 'cell-error' : ''} `}
    //                 onContextMenu={onContextMenu}
    //                 onClick={onClick}
    //                 // onBlur={() => setShowMenu(false)}
    //                 style={{ backgroundColor: bg }}
    //             >
    //                 {!isEdit ?
    //                     <div
    //                         style={{ minHeight: '100%', width: '100%', minWidth: '100%', height: '100%' }}
    //                     >
    //                         {value}
    //                     </div> :
    //                     <input
    //                         onKeyUp={onKeyUp}
    //                         value={value}
    //                         autoFocus
    //                         onBlur={onBlur}
    //                         onChange={onChange}
    //                         type='number' style={{ width: '100%', height: '100%' }}
    //                     />
    //                 }
    //             </div>
    //         </OverlayTrigger>
    //     )
    // }
    return (
        <div
            ref={cellRef}
            className={`position-relative ${isExist ? 'cell-exist' : ''} ${error ? 'cell-error' : ''} `}
            onContextMenu={onContextMenu}
            onClick={onClick}
            style={{ backgroundColor: bg }}
        >
            {!isEdit ?
                <div
                    // className="border "
                    style={{ minHeight: '100%', width: '100%', minWidth: '100%', height: '100%' }}
                >
                    {value.toFixed(2)}
                </div> :
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

            <Dropdown ref={menuRef} className="shadow-sm border m-auto">
                <Dropdown.Menu
                    show={showMenu}
                    className=" dropdown-menu-card rounded-0 shadow dropdown-menu-end mt-2">
                    <Dropdown.Item onClick={handleDelete}>Remove </Dropdown.Item>
                    <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
})

export default UpdateCell