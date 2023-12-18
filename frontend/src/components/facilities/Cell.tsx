import { useCreateTimelineMutation, useUpdateTimelineMutation } from "features/facilities/facilitiesAPI";
import { KeyboardEvent, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { ITimeline } from "types/types.facilities";

interface EditCellProps {
    timeline: ITimeline
}
const Cell = ({ timeline }: EditCellProps) => {
    console.log('render Cell Componente', timeline)
    const [isShown, setIsShown] = useState(false);
    const [createTimeline, { data: created }] = useCreateTimelineMutation()
    const [updateTimeline, { data: updated }] = useUpdateTimelineMutation()
    const inputRef = useRef(null);
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState<number>(Number(timeline ? timeline.somme : 0))
    const [newTLine, setNewTLine] = useState<ITimeline>(timeline)
    const [bg,setBg] = useState('white')
    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsEdit(false)
        if (!newTLine.id) {
            createTimeline(newTLine)
        } else {
            updateTimeline(newTLine)
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const re = /([0-9]*[.])?[0-9]+/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setValue(Number(e.target.value))
            setNewTLine({
                ...newTLine,
                somme: Number(e.target.value)
            })
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
    

    return (
        <div
            className="position-relative"
            onContextMenu={onContextMenu}
            onClick={onClick}
            style={{backgroundColor:bg}}
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
                    ref={inputRef}
                    onBlur={onBlur}
                    onChange={onChange}
                    type='number' style={{ width: '100%', height: '100%' }}
                />
            }
            <Dropdown.Menu show={isShown} className=" dropdown-menu-card rounded-0 shadow-sm dropdown-menu-end mt-2">
                <Dropdown.Header>Dropdown header</Dropdown.Header>
                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
            </Dropdown.Menu>
           
        </div>
    )
}

export default Cell