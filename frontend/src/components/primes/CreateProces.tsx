
import { useState } from "react";
import { Button, Card, Col, Form, Modal, Nav, Row } from "react-bootstrap";

import ErrorText from "components/common/ErrorText";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { IEmployee } from "types/types.employees";
import { DATE_DE_FETE, DATE_DE_RECEPTION, MONTANT, OBSERVATION, PRIME_TYPE } from "headers/headers";
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
                className="p-0 m-0"
                show={show}
                size="lg"
                onHide={() => setShow(false)}
                centered
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header className="text-danger" >
                    {error}
                </Modal.Header>
                <Modal.Body
                    className="p-0"
                // className=" mb-4 mt-3 px-5 pt-5"
                >

                    <Card as={Form} className="form-vertical"
                        onSubmit={handleSubmit(onSubmitData)}
                    // style={{ minHeight: "550px", minWidth: '650px' }}
                    >
                        <Card.Header>
                            <h4 className="card-title"> Create  Proces Verbal</h4>

                        </Card.Header>
                        <Card.Body>
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
                        </Card.Body>
                        <Card.Footer>

                            {/* <div className="d-flex justify-content-between mt-3 ">
                                <div>
                                    <Button type="submit" variant="primary" >
                                        Next<FaAngleRight size={20} />
                                    </Button>
                                </div>
                            </div> */}
                            <div className="col-12 d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary me-1 mb-1">Submit</button>
                            </div>
                        </Card.Footer>
                    </Card>

                </Modal.Body>
            </Modal>
        </>
    )
}



export default CreateProcesVerbal;