
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";

import ErrorText from "components/common/ErrorText";
import { useGetPrimeByIdMutation, useGetPrimetypesMutation } from "features/primes/primesAPI";
import { BTN_CLOSE, BTN_SUBMIT, DATE_DE_FETE, DATE_DE_RECEPTION, MONTANT, OBSERVATION, PRIME_TYPE } from "headers/headers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IPrime, IPrimetypes } from "types/types.primes";
import { useAppDispatch } from "app/hooks";
import { updatePrime } from "features/primes/primesSlice";



export interface EditPrimeFromData {
    employee: number,
    prime_type: string,
    date_f: string,
    date_r: string,
    montant: number,
    observation: string,
    [key: string]: string | number | Array<any>,
}

const initState = {

}




interface EditPrimeProps {
    primeId?: number,
    show: boolean,
    setShow: (show: boolean) => void
}


const EditPrime = ({ primeId, show, setShow }: EditPrimeProps) => {
    console.log('render edit Prime')
    const dispatch = useAppDispatch()

    const [getPrimeById, { data: prime, isSuccess: success }] = useGetPrimeByIdMutation()
    const [getPrimetypes, { data: primetypes, isLoading }] = useGetPrimetypesMutation()
    const [error, setError] = useState()

    useEffect(() => {
        if (show)
            getPrimeById(primeId)
    }, [primeId])

    useEffect(() => {
        if (prime) {
            reset({
                id: prime.id,
                employee: prime.employee.nom,
                proces_v: prime.proces_v,
                prime_type: prime.prime_type,
                date_f: prime.date_f,
                date_r: prime.date_r,
                montant: prime.montant,
                observation: prime.observation
            })
        }
    }, [success, prime])

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors }
    } = useForm<IPrime>({
        mode: 'onBlur',
        defaultValues: initState
    })

    const onSubmitData = async (values: IPrime) => {

        dispatch(updatePrime(values))
            .unwrap()
            .then(() => {
                setShow(false)
            }).catch((err: any) => {
                console.log(err)
                setError(err['error'])
            })
    };

    useEffect(() => {
        if (show) {
            getPrimetypes({})
        }
    }, [show])


    return (
        <>

            <Modal
                show={show}
                size="lg"
                onHide={() => setShow(false)}
                centered
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Form onSubmit={handleSubmit(onSubmitData)}>

                    <Modal.Header>
                        <h4 className="card-title"> Create Prime For {prime?.employee.nom} {prime?.employee.prenom}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Form.Group className="mb-3 " >
                                <Form.Label>Employee</Form.Label>
                                <Form.Control
                                    disabled
                                    type="text"
                                    value={prime ? prime.employee.nom + ' ' + prime.employee.prenom : ''}
                                >
                                </Form.Control>
                                {/* <Form.Control
                                        type="hidden"
                                        // value={employee.id}
                                        {...register("employee", { required: "This Feild Is required" })}
                                    >

                                    </Form.Control> */}
                            </Form.Group>


                            <Form.Group as={Col} md={6} className="mb-3 " >
                                <Form.Label>{PRIME_TYPE}</Form.Label>
                                <Form.Select
                                    {...register("prime_type", { required: "This Feild Is required" })}
                                >
                                    {primetypes && primetypes.map((pt: IPrimetypes) => (
                                        <option selected={getValues('prime_type').name == `${pt.id}`} key={pt.id} value={pt.id}>{pt.name}</option>
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
                        <Button variant="light" onClick={() => setShow(!show)} >{BTN_CLOSE}</Button>
                        <Button type="submit" >{BTN_SUBMIT}</Button>
                    </Modal.Footer>

                </Form>
            </Modal>
        </>
    )
}



export default EditPrime;