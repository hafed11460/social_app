import { ReactElement, memo, useEffect, useState } from "react"
import { Form } from "react-bootstrap"

type ErrorObject = {
    data: object
}

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