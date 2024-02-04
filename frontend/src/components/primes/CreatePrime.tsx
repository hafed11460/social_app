
import { useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "app/hooks";
import ErrorText from "components/common/ErrorText";
import { useGetLiteEmployeesMutation } from "features/employees/employeeAPI";
import { useGetPrimetypesMutation } from "features/primes/primesAPI";
import { createPrime, selectCurrentProcesV } from "features/primes/primesSlice";
import { BTN_CLOSE, BTN_SUBMIT, DATE_DE_FETE, DATE_DE_RECEPTION, EMPLOYEE, MONTANT, OBSERVATION, PRIME_TYPE } from "headers/headers";
import { useEffect } from "react";
import { useController, useForm } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import ReactSelect from "react-select";
import { IEmployee } from "types/types.employees";
import { IPrime, IPrimetypes } from "types/types.primes";
import EmployeeSelect from "components/employees/EmployeeSelect";



export interface CreatePrimeFromData {
    employee: number,
    proces_v: number,
    prime_type: string,
    date_f: string,
    date_r: string,
    montant: number,
    observation: string,
    [key: string]: string | number | Array<any>,
}






interface CreatePrimeProps {
    // employee: IEmployee,
    is_open: boolean,
    procesId: number
}


const CreatePrime = () => {
    const proces_v = useAppSelector(selectCurrentProcesV)
    const dispatch = useAppDispatch()
    const [show, setShow] = useState(false);
    const [getPrimetypes, { data: primetypes, isLoading }] = useGetPrimetypesMutation()
    const [getLiteEmployees, { data: employees }] = useGetLiteEmployeesMutation({})
    const [error, setError] = useState()
    const initState = {
        // proces_v: proces_v.id,
        prime_type: '1',
        date_f: '12/08/2023',
        date_r: '12/08/2023',
        montant: 15000,
        observation: 'This test',
    }
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors }
    } = useForm<IPrime>({
        mode: 'onBlur',
        // defaultValues: initState
    })



    const onSubmitData = async (values: IPrime) => {
        // addProperty(values)
        // dispatch(createPrime(values))
        dispatch(createPrime(values))
            .unwrap()
            .then(() => {
                setShow(false)
            }).catch((err: any) => {
                console.log(err)
                setShow(false)
                setError(err['error'])
            })
    };
    useEffect(() => {
        if (proces_v)
            setValue('proces_v', proces_v.id)

    }, [proces_v])


    useEffect(() => {
        getLiteEmployees({})
    }, [])

    useEffect(() => {
        if (show) {
            getPrimetypes({})
        }
    }, [show])

    if (!proces_v) return null
    return (
        <>
            <Button disabled={!proces_v.is_open} size="sm" onClick={() => setShow(!show)}>
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
                    <Modal.Header closeButton >
                        <h4 className="card-title"> Create  Prime</h4>
                    </Modal.Header>
                    <Modal.Body >
                        {error && <p className="text-danger">{error}</p>}
                        <Row>
                            <EmployeeSelect setValue={setValue}/>                            
                            
                            <Form.Group as={Col} md={6} className="mb-3 " >
                                <Form.Label>{PRIME_TYPE}</Form.Label>
                                <Form.Select

                                    {...register("prime_type", { required: "This Feild Is required" })}
                                >
                                    <option>-- Select Type--</option>
                                    {primetypes && primetypes.map((pt: IPrimetypes) => (
                                        <option  key={pt.id} value={pt.id}>{pt.name}</option>
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
                        <Button  variant="light" onClick={() => setShow(!show)} >{BTN_CLOSE}</Button>
                        <Button  type="submit" >{BTN_SUBMIT}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}



export default CreatePrime;