import { RootState } from "app/store";
import ErrorText from "components/common/ErrorText";
import { updateTimeline } from "features/facilities/facilitiesSlice";
// import { useCreateTimelineMutation, useUpdateTimelineMutation } from "features/facilities/facilitiesAPI";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Alert, Button, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ITimeline } from "types/types.facilities";

interface EditCellProps {
    timeline: ITimeline,
    isExist: boolean,
    isFacCompleted: boolean,

}


const Cell = ({ timeline, isExist, isFacCompleted }: EditCellProps) => {
    const dispatch = useDispatch()
    // console.log('render Cell Componente')
    const [isShown, setIsShown] = useState(false);
    const {isError} = useSelector((state:RootState) =>state.facilities,shallowEqual)
    // const [createTimeline, { data: created, isError, error }] = useCreateTimelineMutation()
    // const [updateTimeline, { data: updated, isError: isUpdateError, error: updateError }] = useUpdateTimelineMutation()
    const inputRef = useRef(Number(timeline ? timeline.somme : 0));
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState<number>(Number(timeline ? timeline.somme : 0))
    const [newTLine, setNewTLine] = useState<ITimeline>(timeline)
    const [bg, setBg] = useState('white')

    useEffect(() => {
        setNewTLine({
            ...newTLine,
            somme: Number(inputRef.current)
        })
    }, [inputRef.current])

    useEffect(() => {

    }, [newTLine])


    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsEdit(false)
        if (newTLine.somme <= 0) return;
        if (!newTLine.id && newTLine.somme) {
            // createTimeline(newTLine)
        } else {
            // createTimeline(newTLine)
            dispatch(updateTimeline(newTLine))
            // updateTimeline(newTLine)
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const re = /([0-9]*[.])?[0-9]+/;
        if (e.target.value === '' || re.test(e.target.value)) {
            if (inputRef.current != Number(e.target.value))
                inputRef.current = Number(e.target.value)
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
        setIsShown(false);
        setBg('white');
    }

    const onContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsShown(true);
        setBg('#77b9f7')
    }


    if (isError) {
        return (
            <OverlayTrigger
                overlay={
                    <Tooltip
                        color="red"
                        className="p-0">
                        <Alert variant="warning" className="m-0">
                            {/* <ErrorText name="error" error={error || updateError} variant="dark" /> */}
                        </Alert>
                    </Tooltip>
                }
            >
                <div

                    className={`position-relative ${isExist ? 'cell-exist' : ''} ${isError ? 'cell-error' : ''} `}
                    onContextMenu={onContextMenu}
                    onClick={onClick}
                    onBlur={() => setIsShown(false)}
                    style={{ backgroundColor: bg }}
                >
                    {!isEdit ?
                        <div
                            // className="border "
                            style={{ minHeight: '100%', width: '100%', minWidth: '100%', height: '100%' }}
                        >
                            {inputRef.current == 0 ? '-' : inputRef.current}
                        </div> :
                        <input
                            onKeyUp={onKeyUp}
                            value={inputRef.current}
                            autoFocus
                            // ref={inputRef}
                            onBlur={onBlur}
                            onChange={onChange}
                            type='number' style={{ width: '100%', height: '100%' }}
                        />
                    }
                </div>
            </OverlayTrigger>
        )
    }
    return (
        <div

            className={`position-relative ${isExist ? 'cell-exist' : ''} ${isError ? 'cell-error' : ''} `}
            onContextMenu={onContextMenu}
            onClick={onClick}
            onBlur={() => setIsShown(false)}
            style={{ backgroundColor: bg }}
        >
            {!isEdit ?
                <div
                    // className="border "
                    style={{ minHeight: '100%', width: '100%', minWidth: '100%', height: '100%' }}
                >
                    {inputRef.current == 0 ? '-' : inputRef.current}
                </div> :
                <input
                    disabled={isFacCompleted}
                    onKeyUp={onKeyUp}
                    value={inputRef.current}
                    autoFocus
                    // ref={inputRef}
                    onBlur={onBlur}
                    onChange={onChange}
                    type='number' style={{ width: '100%', height: '100%' }}
                />
            }

            <Dropdown.Menu
                show={isShown}
                className=" dropdown-menu-card rounded-0 shadow dropdown-menu-end mt-2">
                <Dropdown.Header>Dropdown header</Dropdown.Header>
                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
            </Dropdown.Menu>
        </div>
    )
}

// export default Cell