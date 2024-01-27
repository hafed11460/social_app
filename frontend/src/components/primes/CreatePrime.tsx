
import { useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";

import ErrorText from "components/common/ErrorText";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { IEmployee, IPrimetypes } from "types/types.employees";
import { DATE_DE_FETE, DATE_DE_RECEPTION, MONTANT, OBSERVATION, PRIME_TYPE } from "headers/headers";
import { useAddPrimeMutation, useGetPrimetypesMutation } from "features/primes/primesAPI";



export interface CreatePrimeFromData {
    employee: number,
    prime_type: string,
    date_f: string,
    date_r: string,
    montant: number,
    observation: string,
    [key: string]: string | number | Array<any>,
}

const initState = {
    // employee: 0,
    prime_type: '1',
    date_f: '12/08/2023',
    date_r: '12/08/2023',
    montant: 15000,
    observation: 'This test',
}




interface CreatePrimeProps {
    employee: IEmployee
}


const CreatePrime = ({ employee }: CreatePrimeProps) => {


    const [show, setShow] = useState(false);
    const [getPrimetypes, { data: primetypes, isLoading }] = useGetPrimetypesMutation()
    const [addProperty, { isSuccess, error }] = useAddPrimeMutation()

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<CreatePrimeFromData>({
        mode: 'onBlur',
        defaultValues: initState
    })

    const onSubmitData = async (values: CreatePrimeFromData) => {
        addProperty(values)
    };

    useEffect(() => {
        if (show) {
            getPrimetypes({})
        }
    }, [show])

    useEffect(() => {
        if (isSuccess) {
            // setInitialValues(initState)
            setShow(false)
            toast.success('Property add Successfully')
        }
    }, [isSuccess])

    if (isLoading) return <>Loading </>

    return (
        <>
            <Button size="sm" onClick={() => setShow(!show)}>
                <FaPlusCircle /> Prime
            </Button>

            <Modal
                className="p-0 m-0"
                show={show}
                size="lg"
                onHide={() => setShow(false)}
                centered
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Body
                    className="p-0"
                // className=" mb-4 mt-3 px-5 pt-5"
                >

                    <Card as={Form} className="form-vertical"
                        onSubmit={handleSubmit(onSubmitData)}
                        style={{ minHeight: "550px", minWidth: '650px' }}>
                        <Card.Header>
                            <h4 className="card-title"> Create Prime For {employee.nom} {employee.prenom}</h4>

                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Form.Group className="mb-3 " >
                                    <Form.Label>Employee</Form.Label>
                                    <Form.Control
                                        disabled
                                        type="text"
                                        value={employee.nom + ' ' +employee.prenom}
                                    >
                                    </Form.Control>
                                    <Form.Control
                                        type="hidden"
                                        value={employee.id}
                                        {...register("employee", { required: "This Feild Is required" })}
                                    >

                                    </Form.Control>
                                </Form.Group>


                                <Form.Group as={Col} md={6} className="mb-3 " >
                                    <Form.Label>{PRIME_TYPE}</Form.Label>
                                    <Form.Select

                                        {...register("prime_type", { required: "This Feild Is required" })}
                                    >
                                        <option>city</option>
                                        {primetypes && primetypes.map((pt: IPrimetypes) => (
                                            <option selected={getValues('prime_type') == `${pt.id}`} key={pt.id} value={pt.id}>{pt.name}</option>
                                        ))}
                                    </Form.Select>
                                    {/* <ErrorText name='city' error={error} /> */}
                                    {errors.prime_type && (
                                        <Form.Text className="text-danger">
                                            {errors.prime_type.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>


                                <Form.Group as={Col} md={6} className="mb-3" >
                                    <Form.Label>{MONTANT}</Form.Label>
                                    <Form.Control
                                        type="number"
                                        {...register("montant", { required: "This Feild Is required" })}
                                    />
                                    <ErrorText name='montant' error={error} />
                                    {errors.montant && (
                                        <Form.Text className="text-danger">
                                            {errors.montant.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>


                                <Form.Group as={Col} md={6} className="mb-3" >
                                    <Form.Label>{DATE_DE_FETE}</Form.Label>
                                    <Form.Control
                                        type="date"
                                        {...register("date_f", { required: "This Feild Is required" })}
                                    />
                                    <ErrorText name='date_f' error={error} />
                                    {errors.date_f && (
                                        <Form.Text className="text-danger">
                                            {errors.date_f.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>


                                <Form.Group as={Col} md={6} className="mb-3" >
                                    <Form.Label>{DATE_DE_RECEPTION}</Form.Label>
                                    <Form.Control
                                        type="date"
                                        {...register("date_r", { required: "This Feild Is required" })}
                                    />
                                    <ErrorText name='date_r' error={error} />
                                    {errors.date_r && (
                                        <Form.Text className="text-danger">
                                            {errors.date_r.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>


                                <Form.Group className="mb-3" >
                                    <Form.Label>{OBSERVATION}</Form.Label>
                                    <Form.Control
                                        as={'textarea'}
                                        rows={3}
                                        {...register("observation", { required: "This Feild Is required" })}
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



export default CreatePrime;