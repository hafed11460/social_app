
import { useState } from "react";
import { Button, Card, Col, Form, Modal, Nav, Row } from "react-bootstrap";

import ErrorText from "components/common/ErrorText";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { IEmployee } from "types/types.employees";
import { BTN_CLOSE, BTN_SUBMIT, DATE_DE_FETE, DATE_DE_RECEPTION, MONTANT, OBSERVATION, PRIME_TYPE } from "headers/headers";
import { useAddPrimeMutation, useGetPrimetypesMutation } from "features/primes/primesAPI";
import { createProcesVerbal } from "features/primes/primesSlice";
import { useAppDispatch } from "app/hooks";
import { IProcesVerbal } from "types/types.primes";



export interface CreateProcesFromData {
    name: string,
    observation: string,
    [key: string]: string | number | Array<any>,
}

const initState = {
    name: 'Proces N°',
    observation: '',
}




interface CreatePrimeProps {
    employee: IEmployee
}


const CreateProcesVerbal = () => {

    const dispatch = useAppDispatch()
    const [show, setShow] = useState(false);
    const [error, setError] = useState()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IProcesVerbal>({
        mode: 'onBlur',
        defaultValues: initState
    })

    const onSubmitData = async (values: IProcesVerbal) => {
        dispatch(createProcesVerbal(values))
            .unwrap()
            .then(() => {
                setShow(false)
            }).catch((err: any) => {
                console.log(err)
                setError(err['error'])
            })
    };

    return (
        <>
            <Button title="Ajoute Proces" variant="success" className="rounded-0 mx-2" onClick={() => setShow(!show)}>
                <FaPlusCircle />
            </Button>

            <Modal
                show={show}
                size="lg"
                onHide={() => setShow(false)}
                centered
                aria-labelledby="contained-modal-title-vcenter"
                className="form-vertical"
            >
                <Form onSubmit={handleSubmit(onSubmitData)}>


                    <Modal.Header >
                        <h4 className="card-title"> Create  Proces Verbal</h4>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <p className="text-danger">{error}</p>}
                        <Row>
                            <Form.Group as={Col} className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register("name", { required: "This Feild Is required" })}
                                />
                                <ErrorText name='name' error={error} />
                                {errors.name && (
                                    <Form.Text className="text-danger">
                                        {errors.name.message}
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>{OBSERVATION}</Form.Label>
                                <Form.Control
                                    as={'textarea'}
                                    rows={3}
                                    {...register("observation")}
                                />
                                <ErrorText name='observation' error={error} />
                                {errors.observation && (
                                    <Form.Text className="text-danger">
                                        {errors.observation.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button size="sm" variant="light" onClick={() => setShow(!show)} >{BTN_CLOSE}</Button>
                        <Button size="sm" type="submit" >{BTN_SUBMIT}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}



export default CreateProcesVerbal;