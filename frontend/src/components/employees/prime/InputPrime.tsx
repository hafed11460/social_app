import { memo } from "react";
import { Col, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { CreatePropertyFromData } from "./CreateProperty";

interface InputProps {
    size?: number
    label?: string,
    type: string,
    name: string;
    message: string,
    options?: any[]
}
const InputPrime = memo(({ label, type, name, message, options, size=12 }: InputProps) => {
    const { register, formState: { errors } } = useFormContext<CreatePropertyFromData>()

    return (
        <Form.Group as={Col} md={size} className="mb-3">
            <Form.Label>{label}</Form.Label>
            {
                type == "textarea" && <Form.Control
                    placeholder="Description Your Property"
                    as="textarea" rows={5}
                    type={type}
                    {...register(name, { required: message })}
                />

            }
            {
                type == "select" && <Form.Select
                    {...register(name, { required: message })}
                >
                    {options?.map((option,index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </Form.Select>

            }
            {
                (type == "text" || type == 'number' || type =='email') &&
                <Form.Control
                    type={type}
                    {...register(name, { required: message })}
                ></Form.Control>

            }
            
            {errors[name] && (
                <Form.Text className="text-danger">
                    {errors[name]?.message}
                </Form.Text>
            )}
        </Form.Group>
    )
})

export default InputPrime