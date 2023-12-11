import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { BsPatchPlus } from 'react-icons/bs';
import { IEmployee } from 'types/types.employees';

interface CreatePrimeProps {
    employee: IEmployee
}
interface CreatePrimeFormData{
    prime_type:string
}
const CreatePrime = ({ employee }: CreatePrimeProps) => {
    const [show, setShow] = useState(false);
    const {register} = useForm<CreatePrimeFormData>()
    return (
        <>
            <Button onClick={() => setShow(!show)}>
                <BsPatchPlus /> Prime
            </Button>
            <Modal
                className="p-0 m-0"
                show={show}
                size="lg"
                onHide={() => setShow(false)}
                centered
            >
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                {...register("prime_type", { required: 'This Field is Required' })}
                            ></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default CreatePrime
