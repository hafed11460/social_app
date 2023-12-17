import { useRef, useState } from "react";

interface EditCellProps {
    montant: number
}
const Cell = ({ montant }: EditCellProps) => {
    const inputRef = useRef(null);
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState<number>(Number(montant))
    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsEdit(false)        
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const re = /^[0-9\b]+$/;
        const re = /([0-9]*[.])?[0-9]+/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setValue(Number(e.target.value))
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
                    type='number' style={{ width: '100%' }}
                />

            }
        </div>
    )
}

export default Cell