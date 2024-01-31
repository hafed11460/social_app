
import { useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "app/hooks";
import ErrorText from "components/common/ErrorText";
import { useGetLiteEmployeesMutation } from "features/employees/employeeAPI";
import { useGetPrimetypesMutation } from "features/primes/primesAPI";
import { createPrime, selectCurrentProcesV } from "features/primes/primesSlice";
import { DATE_DE_FETE, DATE_DE_RECEPTION, EMPLOYEE, MONTANT, OBSERVATION, PRIME_TYPE } from "headers/headers";
import { useEffect } from "react";
import { useController, useForm } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import ReactSelect from "react-select";
import { IEmployee } from "types/types.employees";
import { IPrime, IPrimetypes } from "types/types.primes";



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
    is_open:boolean,
    procesId: number
}


const CreatePrime = () => {
    const proces_v = useAppSelector(selectCurrentProcesV)
    const dispatch = useAppDispatch()
    const [show, setShow] = useState(false);
    const [getPrimetypes, { data: primetypes, isLoading }] = useGetPrimetypesMutation()
    const [getLiteEmployees, { data: employees }] = useGetLiteEmployeesMutation({})
    const [employeesList, setEmployeesList] = useState([])
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
        control,
        formState: { errors }
    } = useForm<IPrime>({
        mode: 'onBlur',
        // defaultValues: initState
    })

    const { field: { value: employeeValue, onChange: employeeChange, ...employeeField } } = useController({ name: 'employee', control });


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
        if (employees) {
            const e = employees.map((emp: IEmployee) => { return { 'value': emp.id, 'label': `${emp.nom} ${emp.prenom}` } })
            setEmployeesList(e)
        }
    }, [employees])

    useEffect(() => {
        if (show) {
            getPrimetypes({})
        }
    }, [show])

    if(!proces_v) return null
    return (
        <>
            <Button disabled={!proces_v.is_open} size="sm" onClick={() => setShow(!show)}>
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
                <Modal.Header className="text-danger" >
                    {error}
                </Modal.Header>
                <Modal.Body
                    className="p-0"
                // className=" mb-4 mt-3 px-5 pt-5"
                >

                    <Card as={Form} className="form-vertical"
                        onSubmit={handleSubmit(onSubmitData)}
                        style={{ minHeight: "550px", minWidth: '650px' }}>
                        {/* <Card.Header>
                            <h4 className="card-title"> Create Prime For {employee.nom} {employee.prenom}</h4>

                        </Card.Header> */}
                        <Card.Body>
                            <Row>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        // value={procesId}
                                        {...register("proces_v", { required: "This Feild Is required" })}
                                    />
                                    <ErrorText name='proces_v' error={error} />
                                    {errors.proces_v && (
                                        <Form.Text className="text-danger">
                                            {errors.proces_v.message}
                                        </Form.Text>
                                    )}

                                </Form.Group>
                                <Form.Group className="mb-3 " >
                                    <Form.Label>{EMPLOYEE}</Form.Label>
                                    <ReactSelect
                                        className="basic-single"
                                        classNamePrefix="select"
                                        // defaultValue={colourOptions[0]}
                                        // isDisabled={isDisabled}
                                        // isLoading={isLoading}
                                        // isClearable={isClearable}
                                        // isRtl={isRtl}
                                        isSearchable={true}
                                        // name="color"
                                        value={employeeValue ? employeesList.find((x: IEmployee) => x.id === employeeValue) : employeeValue}
                                        onChange={option => employeeChange(option ? option.value : option)}
                                        {...employeeField}
                                        // {...register("employee", { required: "This Feild Is required" })}
                                        options={employeesList}
                                    />

                                    {/* <ErrorText name='city' error={error} /> */}
                                    {errors.employee && (
                                        <Form.Text className="text-danger">
                                            {errors.employee.message}
                                        </Form.Text>
                                    )}
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