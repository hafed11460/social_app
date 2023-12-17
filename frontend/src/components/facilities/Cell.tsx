import { useCreateTimelineMutation, useUpdateTimelineMutation } from "features/facilities/facilitiesAPI";
import { useRef, useState } from "react";
import { ITimeline } from "types/types.facilities";

interface EditCellProps {
    timeline: ITimeline 
}
const Cell = ({ timeline }: EditCellProps) => {
    console.log('render Cell Componente')
    const [createTimeline,{data:created}] = useCreateTimelineMutation()
    const [updateTimeline,{data:updated}] = useUpdateTimelineMutation()
    const inputRef = useRef(null);
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState<number>(Number(timeline?timeline.somme:0))
    const [newTLine, setNewTLine] = useState<ITimeline>(timeline)

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsEdit(false)  
        if(!newTLine.id){
            createTimeline(newTLine)           
        }else{
            updateTimeline(newTLine)
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const re = /([0-9]*[.])?[0-9]+/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setValue(Number(e.target.value))
            setNewTLine({
                ...newTLine,
                somme:Number(e.target.value)
            })  
        }
    }


    const onDoubleClick = () => {
        setIsEdit(true)
        // inputRef.current.focus()
    }

    
    return (
        <div onClick={onDoubleClick}>
            {!isEdit ?
                <div>{value}</div> :
                <input
                    value={value}
                    autoFocus
                    ref={inputRef}
                    onBlur={onBlur}
                    onChange={onChange}
                    type='number' style={{ width: '100%',height:'100%' }}
                />

            }
        </div>
    )
}

export default Cell