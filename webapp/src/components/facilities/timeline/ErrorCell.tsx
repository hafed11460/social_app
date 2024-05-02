import { memo } from "react"


type ErrorType = {
    variant?: string
    error: string
}

const ErrorCell = ({ error, variant = 'danger' }: ErrorType) => {
    console.log(error)    
    return (
        <p className={`text-${variant}`}>
            {error}
        </p>
    )
}
export default memo(ErrorCell)