import { ReactElement, memo, useEffect, useState } from "react"
import { Form } from "react-bootstrap"



type ErrorType = {
    name:string
    variant?:string
    error:any
}
const RError = ({ name, error,variant='danger' }:ErrorType) => {
    
    const [content, setContent] = useState<any>(null)
    
    useEffect(() => {
        try {
            if (error) {
                if (name in error.data) {
                    setContent(
                        <Form.Text className={`text-${variant}`}>
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
export default memo(RError)