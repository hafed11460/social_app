import { Form } from "react-bootstrap"
import ErrorText from "./ErrorText"
import { UseFormGetValues, UseFormRegister } from "react-hook-form"
import { AccountSecurityFormData } from "components/account/AccountSecurity"

interface InputFormProps{
    register: UseFormRegister<AccountSecurityFormData>,
    getValues: UseFormGetValues<AccountSecurityFormData>,
    label:string,
    type:string,
    name:"old_password" | "new_password" | "confirm_password",
    errors:any,
    error?:any,
}
const InputForm = ({
    register,
    getValues,
    name, label,
    type, error, errors }:InputFormProps) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                {...register(name, { required: "This Feild Is required" })}
            ></Form.Control>
            <ErrorText name={name} error={error} />
            {errors[name] && (
                <Form.Text className="text-danger">
                    {errors[name].message}
                </Form.Text>
            )}
        </Form.Group>
    )
}

export default InputForm