
import { useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "app/hooks";
import ErrorText from "components/common/ErrorText";
import { selectCurrentProcesV, updateProcesVerbal } from "features/primes/primesSlice";
import { OBSERVATION, STATE } from "headers/headers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsFillPencilFill } from "react-icons/bs";
import { IProcesVerbal } from "types/types.primes";



export interface CreateProcesFromData {
    name: string,
    observation: string,
    [key: string]: string | number | Array<any>,
}

const initState = {
    montant: 'Proces N°',
    observation: 'This test',
}
interface EditPrimeProps {
    proces_v: IProcesVerbal
}


const EditProcesVerbal = () => {
    const proces_v = useAppSelector(selectCurrentProcesV)
    const dispatch = useAppDispatch()
    const [show, setShow] = useState(false);
    const [error, setError] = useState()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<IProcesVerbal>({
        mode: 'onBlur',
        defaultValues: initState
    })

    const onSubmitData = async (values: IProcesVerbal) => {
        dispatch(updateProcesVerbal(values))
            .unwrap()
            .then(() => {
                setShow(false)
            }).catch((err: any) => {
                console.log(err)
                setError(err['error'])
            })
    };

    useEffect(() => {
        if (proces_v)
            reset(proces_v)
    }, [proces_v])

    return (
        <>
            <Button className="mx-1" size="sm" title="Modifier  Proces Verbal" onClick={() => setShow(!show)}>
                <BsFillPencilFill /> Edit
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
                            <h4 className="card-title"> Modifier  Proces Verbal</h4>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Form.Group as={Col}className="mb-3" >
                                    <Form.Label>{STATE}</Form.Label>
                                    <Form.Check
                                        {...register("is_open")}
                                        label='Is open  '>

                                    </Form.Check>
                                    <ErrorText name='is_open' error={error} />
                                    {errors.is_open && (
                                        <Form.Text className="text-danger">
                                            {errors.is_open.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

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



export default EditProcesVerbal;