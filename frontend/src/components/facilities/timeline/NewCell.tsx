import { createTimeline } from "features/facilities/facilitiesSlice";
// import { useCreateTimelineMutation, useUpdateTimelineMutation } from "features/facilities/facilitiesAPI";
import { useAppDispatch } from "app/hooks";
import { KeyboardEvent, useEffect, useState } from "react";
import { Alert, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ITimeline } from "types/types.facilities";
import ErrorCell from "./ErrorCell";


interface NewCellProps {
    timeline: ITimeline,
    month: number,
    year: number,
    isFacCompleted: boolean,
}

interface CustomTooltipProps {
    error: string
}

const CustomTooltip = ({ error }: CustomTooltipProps) => {
    return (
        <Tooltip
            className="cell-tooltip p-0" >
            <Alert variant="warning" className="m-0">
                <ErrorCell error={error} variant="dark" />
            </Alert>
        </Tooltip>
    )
}

const NewCell = ({ timeline, month, year,isFacCompleted }: NewCellProps) => {
    const dispatch = useAppDispatch()
    const [showMenu, setShowMenu] = useState(false);
    // const inputRef = useRef(Number(timeline ? timeline.somme : 0));
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState<number>(Number(timeline ? timeline.somme : ''))
    const [newTLine, setNewTLine] = useState<ITimeline>(timeline)
    const [bg, setBg] = useState('white')
    const [error, setError] = useState<string>('')

    useEffect(() => {
        setNewTLine({
            ...newTLine,
            somme: value
        })
    }, [value])


    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsEdit(false)
        if (newTLine.somme <= 0) return;
        if (!newTLine.id && newTLine.somme) {
            console.log(newTLine)
            dispatch(createTimeline(newTLine))
                .unwrap()
                .then(() => {
                    setError('')
                })
                .catch((err) => {
                    console.log('errrrrrrrror', err['error'])
                    setError(err['error'])
                })
        }
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
        // value.focus()
        setShowMenu(false);
        // setBg('#cccccc');
    }

    const onContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setShowMenu(true);
        setBg('#77b9f7')
    }

    useEffect(() => {
        const handleClick = () => setShowMenu(false);

        window.addEventListener("mousedown", handleClick);
        return () => {
            window.removeEventListener("mousedown", handleClick);
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

                    className={`position-relative  ${error ? 'cell-error' : ''} `}
                    onContextMenu={onContextMenu}
                    onClick={onClick}
                    onBlur={() => setShowMenu(false)}
                    style={{ backgroundColor: bg }}
                >
                    {!isEdit ?
                        <div
                            // className="border "
                            style={{ minHeight: '100%', width: '100%', minWidth: '100%', height: '100%' }}
                        >
                            {value == 0 ? '-' : value}
                        </div> :
                        <input
                            onKeyUp={onKeyUp}
                            value={value}
                            autoFocus
                            // ref={inputRef}
                            onBlur={onBlur}
                            onChange={onChange}
                            type='number' 
                            style={{ width: '100%', height: '100%' }}
                        />
                    }
                </div>
            </OverlayTrigger>
        )
    }
    return (
        <div

            className={`position-relative ${error ? 'cell-error' : ''} `}
            onContextMenu={onContextMenu}
            onClick={onClick}
            onBlur={() => setShowMenu(false)}
            style={{ backgroundColor: bg }}
        >
            {!isEdit ?
                <div
                    // className="border "
                    style={{ minHeight: '100%', width: '100%', minWidth: '100%', height: '100%' }}
                >
                    {value == 0 ? '-' : value}
                </div> :
                <input
                    disabled={isFacCompleted}
                    // onInput={onChange}
                    onKeyUp={onKeyUp}
                    value={value === 0 ? '' : value}
                    // value={value}
                    autoFocus
                    // ref={inputRef}
                    onBlur={onBlur}
                    onChange={onChange}
                    type='number' style={{ width: '100%', height: '100%' }}
                />
            }

            <Dropdown.Menu
                show={showMenu}
                className=" dropdown-menu-card rounded-0 shadow dropdown-menu-end mt-2">
                <Dropdown.Header>Dropdown header</Dropdown.Header>
                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
            </Dropdown.Menu>
        </div>
    )
}

export default NewCell