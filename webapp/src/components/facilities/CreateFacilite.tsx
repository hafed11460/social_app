import { useState } from "react";
import { Alert, Button, Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap";

import { useAppDispatch } from "app/hooks";
import ErrorText from "components/common/ErrorText";
import EmployeeSelect from "components/employees/EmployeeSelect";
import { createFacilite } from "features/facilities/facilitiesSlice";
import { BTN_CLOSE, BTN_SUBMIT, DATE_DE_FETE, DUREE, EMPLOYEE, MONTANT, OBSERVATION } from "headers/headers";
import { useForm } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import { IEmployee } from "types/types.employees";


export interface CreateFaciliteFromData {
    employee: number,
    duree: number,
    date_achat: string,
    montant: number,
    is_know: boolean,
    observation: string,
    [key: string]: string | number | boolean | Array<any>,
}

const initState = {
    // employee: 0,
    duree: 12,
    date_achat: '',
    montant: 15000,
    observation: 'This test',
}

interface CreateFaciliteProps {
    employee: IEmployee
}

interface EmployeeOption {
    value: number,
    label: string,
}


const CreateFacilite = () => {
    // console.log("render CreateFacilite")
    const dispatch = useAppDispatch()
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))
    const [show, setShow] = useState(false);
    const [isLoding, setLoading] = useState(false)
    const [error, setError] = useState()
    // const [createFacilite, { isSuccess, isError, error }] = useCreateFaciliteMutation()



    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors }
    } = useForm<CreateFaciliteFromData>({
        mode: 'onBlur',
        defaultValues: initState
    })

    const onSubmitData = async (values: CreateFaciliteFromData) => {
        setLoading(true)
        dispatch(createFacilite(values))
            .unwrap()
            .then(() => {
                setLoading(false)
                setShow(false)
                
            }).catch((err: any) => {
                console.log(err)
                setLoading(false)
                // setShow(false)
                setError(err['error'])
            })
    };



    return (
        <>
            <Button size="sm" onClick={() => setShow(!show)}>
                <FaPlusCircle /> Prime
            </Button>

            <Modal

                show={show}
                size="lg"
                onHide={() => setShow(false)}
                centered
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Form onSubmit={handleSubmit(onSubmitData)}>
                    <Modal.Header>
                        <h4> Create new facilite</h4>
                        {isLoding && <Spinner/>}
                    </Modal.Header>
                    <Modal.Body
                    >
                        {error && <p className="text-danger">{error}</p>}

                        {error &&
                            <Card.Header>
                                <Alert variant="warning">
                                    <h4 className="alert-heading">Warning</h4>
                                    <ErrorText name='error' error={error} variant="dark" />
                                </Alert>
                                <Form.Check {...register('is_know')} type="checkbox" name="is_know" label="yes I know " />
                            </Card.Header>
                        }
                        <Row>
                            <Form.Group className="mb-3 " >
                                <Form.Label>{EMPLOYEE}</Form.Label>
                                <EmployeeSelect setValue={setValue} />

                                {/* <ErrorText name='city' error={error} /> */}
                                {errors.employee && (
                                    <Form.Text className="text-danger">
                                        {errors.employee.message}
                                    </Form.Text>
                                )}
                            </Form.Group>


                            <Form.Group as={Col} md={6} className="mb-3 " >
                                <Form.Label>{DUREE}</Form.Label>
                                <Form.Control
                                    type="number"
                                    {...register("duree", { required: "This Feild Is required" })}
                                />
                                {/* <Form.Select
                                    {...register("duree", { required: "This Feild Is required" })}
                                >
                                    <option>Mois</option>
                                    {montCells && montCells.map((month: number) => (
                                        <option selected={getValues('duree') == month} key={month} value={month}>{month}</option>
                                    ))}
                                </Form.Select> */}
                                {/* <ErrorText name='city' error={error} /> */}
                                {errors.duree && (
                                    <Form.Text className="text-danger">
                                        {errors.duree.message}
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
                                    {...register("date_achat", { required: "This Feild Is required" })}
                                />
                                <ErrorText name='date_achat' error={error} />
                                {errors.date_f && (
                                    <Form.Text className="text-danger">
                                        {errors.date_f.message}
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



export default CreateFacilite;