import { ReactElement, memo, useEffect, useState } from "react"
import { Form } from "react-bootstrap"

type ErrorObject ={
    data:object
}

type ErrorType = {
    name:string
    error:any
}
const ErrorText = ({ name, error }:ErrorType) => {
    
    const [content, setContent] = useState<any>(null)
    useEffect(() => {
        try {
            if (error) {
                if (name in error.data) {
                    setContent(
                        <Form.Text className="text-danger">
                            {error.data[name]}
                        </Form.Text>
                    )
                }
            }

        } catch (error) {

        }
    },[error])
    return content
}
export default memo(ErrorText)