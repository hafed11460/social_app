import { useAppDispatch, useAppSelector } from "app/hooks";
import CreateComment from "components/facilities/timeline/CreateComment";
import { deleteTimeline, selectCellCut, setCellCut, updateTimeline } from "features/facilities/facilitiesSlice";
import { KeyboardEvent, memo, useCallback, useEffect, useRef, useState } from "react";
import { Alert, Dropdown, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { BsArrowsMove, BsChatSquareText, BsFileEarmarkPost, BsFillPenFill, BsScissors, BsTrash } from "react-icons/bs";
import { ITimeline } from "types/types.facilities";
import 'components/facilities/facilities.css'
import EditTimeline from "./EditTimeline";
// import CreateComment from "./CreateComment";

interface UpdateTdProps {
    timeline: ITimeline,
    isExist: boolean,
    isFacCompleted: boolean,
}

const bg_actvie = "#77b9f7"
const bg_exist = "#FFFFE0"

type Action = 'STYLE' | "COMMENT";

interface CellInputProps {
    value: number,
    isEdit: boolean,
    timeline: ITimeline,
    cellCut: ITimeline | null,
    isFacCompleted: boolean,
    onBlur: () => void,
    onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
const CellInput = ({
    isEdit,
    timeline,
    cellCut,
    isFacCompleted,
    value,
    onKeyUp,
    onBlur,
    onChange
}: CellInputProps) => {
    return (
        <>
            {
                !isEdit ?
                    <div style={{
                        fontSize: '13px',
                        minHeight: '100%',
                        width: '100%',
                        minWidth: '100%',
                        height: '100%',
                        textAlign: 'center',
                        // justifyContent:'center',
                        alignContent: 'center'
                    }}
                        className={timeline.id === cellCut?.id ? "dashed-border" : ""} >
                        {value && value.toFixed(2)}
                    </div>
                    :
                    <input
                        disabled={isFacCompleted}
                        onKeyUp={onKeyUp}
                        // value={value}
                        value={value === 0 ? '' : value}
                        autoFocus
                        onBlur={onBlur}
                        onChange={onChange}
                        type='number'
                        style={{ width: '100%', height: '100%', fontSize: '13px' }}
                    />
            }
        </>
    )
}
const UpdateTd = memo(({ timeline, isExist, isFacCompleted }: UpdateTdProps) => {
    // console.log('render cell ', timeline.id)
    const dispatch = useAppDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState<number>(Number(timeline ? timeline.somme : 0))
    const [newTLine, setNewTLine] = useState<ITimeline>(timeline)
    const [bg, setBg] = useState(bg_exist)
    const [error, setError] = useState<string>('')
    const menuRef: React.LegacyRef<HTMLDivElement> = useRef(null)
    const cellRef = useRef(null)
    const [showModal, setShowModal] = useState(false);
    const [cellStyle, setCellStyle] = useState<Object>({})
    const cellCut = useAppSelector(selectCellCut)
    const [isLoding, setLoading] = useState(false)


    const handleAddComment = () => {
        setShowModal(true)
        // setShowMenu(false)
    }

    const handleCellPaste = () => {
        if (cellCut) {
            setNewTLine({
                ...newTLine,
                somme: cellCut.somme,
            })
            handleUpdateTimeline({
                ...cellCut,
                id: newTLine.id,
                month: newTLine.month,
                facilite: newTLine.facilite,
                mois: newTLine.mois,
            })
            setValue(Number(cellCut.somme))
            setShowMenu(false)
        }
    }

    const handleDelete = () => {
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

    const handleActionClear = (action: Action) => {
        console.log('delete clicked')
        let newTimeline: ITimeline = timeline;

        switch (action) {
            case "STYLE":
                newTimeline = {
                    ...timeline,
                    color: '',
                    background: ''
                }
                break;

            case 'COMMENT':
                newTimeline = {
                    ...timeline,
                    observation: ''
                }

                break;
        }

        dispatch(updateTimeline(newTimeline))
            .unwrap()
            .then(() => {
                setError('')
            })
            .catch((err) => {
                setError('Can\'t remove this timeline')
            })
    }

    useEffect(() => {
        setCellStyle({
            color: timeline.color,
            backgroundColor: timeline.background ? timeline.background : bg
        })
    }, [timeline])

    useEffect(() => {
        setNewTLine({
            ...newTLine,
            somme: Number(value)
        })
    }, [value])

    const handleUpdateTimeline = useCallback((obj: ITimeline) => {
        console.log('useCalback')
        if (obj.somme < 0) return;
        if (obj.somme === 0) {
            handleDelete()
        }
        setLoading(true)
        dispatch(updateTimeline(obj))
            .unwrap()
            .then(() => {
                setError('')
                setLoading(false)
            })
            .catch((err) => {
                setError(err['error'])
                setLoading(false)
            })
    }, [])


    const onBlur = () => {
        setIsEdit(false)
        setBg(bg_exist)
        handleUpdateTimeline(newTLine)
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
            !menuRef.current?.contains(event.target)
            && event.target !== cellRef.current
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
            <td
                className={`cell position-relative  ${error ? 'cell-error' : ''} `}
                onDoubleClick={onDoubleClick}
                onContextMenu={onContextMenu}
            >
                <OverlayTrigger
                    overlay={
                        <Tooltip
                            className="cell-tooltip p-0" >
                            <Alert variant="danger" className="m-0">
                                {error}
                            </Alert>
                        </Tooltip>
                    }
                >
                    <div>
                        <CellInput
                            value={value}
                            timeline={timeline}
                            cellCut={cellCut}
                            isEdit={isEdit}
                            isFacCompleted={isFacCompleted}
                            onBlur={onBlur}
                            onChange={onChange}
                            onKeyUp={onKeyUp}
                        />
                      
                        <Dropdown.Menu
                            ref={menuRef}
                            show={showMenu}
                            className=" dropdown-menu-card rounded-0 shadow dropdown-menu-end mt-2">
                            <Dropdown.Item className="border-bottom" onClick={handleDelete}>Remove </Dropdown.Item>
                            <Dropdown.Item onClick={handleAddComment} >Add Comment</Dropdown.Item>
                        </Dropdown.Menu>
                    </div>
                </OverlayTrigger>
            </td>
        )
    }


    return (
        <td
            ref={cellRef}
            className={`cell position-relative  ${isExist ? 'cell-exist' : ''} ${error ? 'cell-error' : ''}`}
            onContextMenu={onContextMenu}
            onDoubleClick={onDoubleClick}
            style={cellStyle}
        >
            <EditTimeline timeline={timeline} show={showModal} setShow={setShowModal} />
            {isLoding ? <Spinner variant="primary" size="sm" /> :
                <CellInput
                    value={value}
                    timeline={timeline}
                    cellCut={cellCut}
                    isEdit={isEdit}
                    isFacCompleted={isFacCompleted}
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
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
                            <p className="text-black">
                                {timeline.observation}
                            </p>
                        </div>
                    </div>
                </>

            }

            <Dropdown.Menu
                ref={menuRef}
                show={showMenu}
                className=" dropdown-menu-card rounded-0 shadow dropdown-menu-end mt-2 p-0 border">
                <div style={
                    {
                        position: 'absolute',
                        width: "0px",
                        height: "0px",
                        right: '0px',
                        top: '-10px',
                        borderRight: '8px solid transparent',
                        borderLeft: '8px solid transparent',
                        borderBottom: '10px solid #ccc',
                    }
                }></div>

                <Dropdown.Item
                    disabled={isFacCompleted}
                    className="border-bottom  py-1 px-2"
                    onClick={() => {
                        dispatch(setCellCut({ timeline: timeline }))
                        setShowMenu(false)
                    }}
                >
                    <small> <BsScissors /> Couper </small>
                </Dropdown.Item>
                {
                    cellCut &&
                    <Dropdown.Item
                        disabled={isFacCompleted}
                        className="border-bottom  py-1 px-2"
                        onClick={handleCellPaste} >
                        <small> <BsFileEarmarkPost /> Coller </small>
                    </Dropdown.Item>
                }
                <Dropdown.Item
                    disabled={isFacCompleted}
                    className="pt-1 pb-0 px-2"
                    onClick={handleAddComment} >
                    <small> <BsFillPenFill /> Edit</small>
                </Dropdown.Item>

                <Dropdown.Divider></Dropdown.Divider>

                <Dropdown.Item disabled={isFacCompleted}
                    className="border-bottom  py-1 px-2"
                    onClick={handleDelete}>
                    <small> <BsTrash /> Remove</small>
                </Dropdown.Item>
                
                <Dropdown.Item disabled={isFacCompleted}
                    className="border-bottom  py-1 px-2"
                    onClick={() => handleActionClear('STYLE')}>
                    <small> <BsTrash /> Clear Style</small>
                </Dropdown.Item>
                {
                    timeline.observation &&
                    <Dropdown.Item disabled={isFacCompleted}
                        className="border-bottom py-1 px-2"
                        onClick={() => handleActionClear('COMMENT')}>
                        <small> <BsChatSquareText /> Delete comment</small>
                    </Dropdown.Item>
                }
            </Dropdown.Menu>
        </td>
    )
})

export default UpdateTd