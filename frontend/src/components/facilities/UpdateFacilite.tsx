import { useState } from "react";
import { Alert, Card, Col, Form, Modal, Row } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "app/hooks";
import ErrorText from "components/common/ErrorText";
import { Spinner } from "components/common/Spinner";
import { useGetLiteEmployeesMutation } from "features/employees/employeeAPI";
import { selectFaciliteCurrentDate, updateFacilite } from "features/facilities/facilitiesSlice";
import { DATE_DE_FETE, DUREE, EMPLOYEE, MONTANT, OBSERVATION } from "headers/headers";
import { useEffect } from "react";
import { useController, useForm } from "react-hook-form";
import Select from 'react-select';
import { IEmployee } from "types/types.employees";
import { IFacilite } from "types/types.facilities";


export interface CreateFaciliteFromData {
    employee: number,
    duree: string,
    date_achat: string,
    montant: number,
    is_know: boolean,
    observation: string,
    [key: string]: string | number | boolean | Array<any>,
}



interface CreateFaciliteProps {
    employee: IEmployee
}

interface EmployeeOption {
    value: number,
    label: string,
}

interface UpdateFaciliteProps {
    facilite: IFacilite,
    show: boolean,
    setShow: (val: boolean) => void
}
const UpdateFacilite = ({ facilite, show, setShow }: UpdateFaciliteProps) => {
    // console.log("render CreateFacilite")
    const date = useAppSelector(selectFaciliteCurrentDate)
    const dispatch = useAppDispatch()
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))
    // const [show, setShow] = useState(false);
    const [getLiteEmployees, { data: employees, isLoading }] = useGetLiteEmployeesMutation({})
    const [employeesList, setEmployeesList] = useState([])
    const [error, setError] = useState()

    useEffect(() => {
        if (show)
            getLiteEmployees({})
    }, [show])

    

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        control,
        formState: { errors }
    } = useForm<CreateFaciliteFromData>({
        mode: 'onBlur',
    })

    useEffect(() => {
        if (facilite)
            reset({
                id: facilite.id,
                employee: facilite.employee.id,
                duree: facilite.duree,
                date_achat: facilite.date_achat,
                montant: facilite.montant,
                is_completed: facilite.is_completed,
                observation: facilite.observation,
            })
    }, [facilite])

    const { field: { value: employeeValue, onChange: employeeChange, ...employeeField } } = useController({ name: 'employee', control });

    const onSubmitData = async (values: CreateFaciliteFromData) => {
        console.log('values',values)
        console.log('values',date?.getFullYear())

        // dispatch(updateFacilite({
        //     date: date?.getFullYear(),
        //     facilite: values
        // })) 
        //     .unwrap()
        //     .then(() => {
        //         setShow(false)
        //     }).catch((err:any)=>{
        //         console.log(err)
        //     })
    };

    useEffect(() => {
        if (employees) {
            const e = employees.map((emp: IEmployee) => { return { 'value': emp.id, 'label': `${emp.nom} ${emp.prenom}` } })
            setEmployeesList(e)
        }
    }, [employees])

    return (
        <>
            <Modal
                className="p-0 m-0"
                show={show}
                size="lg"
                onHide={() => setShow(false)}
                centered
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header>
                    <h4> Edit  facilite</h4>
                    {isLoading && <Spinner/>}
                </Modal.Header>
                <Modal.Body
                    className="p-0"
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
                                        defaultInputValue={facilite.employee.nom + ' ' + facilite.employee.prenom}
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

                                <Form.Group as={Col} md={6} className="mb-3" >
                                    <Form.Label>{DATE_DE_FETE}</Form.Label>
                                    <Form.Check
                                        {...register("is_completed")}
                                        label='Is Completed'>

                                    </Form.Check>
                                    {/* <Form.Control
                                        type="date"
                                        {...register("date_achat", { required: "This Feild Is required" })}
                                    /> */}
                                    <ErrorText name='is_completed' error={error} />
                                    {errors.is_completed && (
                                        <Form.Text className="text-danger">
                                            {errors.is_completed.message}
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
                                <button type="submit" className="btn btn-primary me-1 mb-1">Save</button>
                            </div>
                        </Card.Footer>
                    </Card>

                </Modal.Body>
            </Modal>
        </>
    )
}



export default UpdateFacilite;