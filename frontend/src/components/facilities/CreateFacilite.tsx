import { useState } from "react";
import { Alert, Button, Card, Col, Form, Modal, Row } from "react-bootstrap";

import { useAppDispatch } from "app/hooks";
import ErrorText from "components/common/ErrorText";
import { createFacilite } from "features/facilities/facilitiesSlice";
import { DATE_DE_FETE, DUREE, EMPLOYEE, MONTANT, OBSERVATION } from "headers/headers";
import { useEffect } from "react";
import { useController, useForm } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import Select from 'react-select';
import { IEmployee } from "types/types.employees";
import { useGetEmployeesMutation, useGetLiteEmployeesMutation } from "features/employees/employeeAPI";


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
    // const [createFacilite, { isSuccess, isError, error }] = useCreateFaciliteMutation()
    const [getLiteEmployees, { data: employees }] = useGetLiteEmployeesMutation({})
    const [employeesList, setEmployeesList] = useState([])
    const [error, setError] = useState()
    useEffect(()=>{
        getLiteEmployees({})
    },[])
    

    const {
        register,
        handleSubmit,
        getValues,
        control,
        formState: { errors }
    } = useForm<CreateFaciliteFromData>({
        mode: 'onBlur',
        defaultValues: initState
    })
    const { field: { value: employeeValue, onChange: employeeChange, ...employeeField } } = useController({ name: 'employee', control });

    const onSubmitData = async (values: CreateFaciliteFromData) => {
        dispatch(createFacilite(values))
        .unwrap()
        .then(()=>{
            setShow(false)
        })
    };

    useEffect(() => {
        if (employees) {
            const e = employees.map((emp: IEmployee) => { return { 'value': emp.id, 'label': `${emp.nom} ${emp.prenom}` } })
            setEmployeesList(e)
        }
    }, [employees])


    // useEffect(() => {
    //     if (isSuccess) {
    //         // setInitialValues(initState)
    //         setShow(false)
    //         toast.success('Property add Successfully')
    //     }
    // }, [isSuccess])


    return (
        <>
            <Button size="sm"  onClick={() => setShow(!show)}>
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
                <Modal.Header>
                    <h4> Create new facilite</h4>
                </Modal.Header>
                <Modal.Body
                    className="p-0"
                // className=" mb-4 mt-3 px-5 pt-5"
                >

                    <Card as={Form} className="form-vertical"
                        onSubmit={handleSubmit(onSubmitData)}
                        style={{ minHeight: "550px", minWidth: '650px' }}>
                        {error &&
                            <Card.Header>
                                <Alert variant="warning">
                                    <h4 className="alert-heading">Warning</h4>
                                    <ErrorText name='error' error={error} variant="dark" />
                                </Alert>
                                <Form.Check {...register('is_know')} type="checkbox" name="is_know" label="yes I know " />
                            </Card.Header>
                        }
                        <Card.Body>
                            <Row>


                                <Form.Group className="mb-3 " >
                                    <Form.Label>{EMPLOYEE}</Form.Label>
                                    <Select
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
                                    {/* <Form.Select
                                        className="choices"
                                        {...register("employee", { required: "This Feild Is required" })}
                                    >
                                        <option>employee</option>
                                        {employees && employees.map((employee: IEmployee) => (
                                            <option
                                                selected={getValues('employee') == employee.id}
                                                key={employee.id} value={employee.id}>
                                                {employee.nom} {employee.prenom}
                                            </option>
                                        ))}
                                    </Form.Select> */}
                                    {/* <ErrorText name='city' error={error} /> */}
                                    {errors.employee && (
                                        <Form.Text className="text-danger">
                                            {errors.employee.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>


                                <Form.Group as={Col} md={6} className="mb-3 " >
                                    <Form.Label>{DUREE}</Form.Label>
                                    <Form.Select
                                        {...register("duree", { required: "This Feild Is required" })}
                                    >
                                        <option>Mois</option>
                                        {montCells && montCells.map((month: number) => (
                                            <option selected={getValues('duree') == month} key={month} value={month}>{month}</option>
                                        ))}
                                    </Form.Select>
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



export default CreateFacilite;