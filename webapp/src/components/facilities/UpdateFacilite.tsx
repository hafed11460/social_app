import { memo, useState } from "react";
import { Alert, Button, Card, Col, Form, Modal, Row } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "app/hooks";
import ErrorText from "components/common/ErrorText";
import { Spinner } from "components/common/Spinner";
import { useGetLiteEmployeesMutation } from "features/employees/employeeAPI";
import { selectCurrentEditFacilite, selectFaciliteCurrentDate, selectFIsModalDel, selectFIsModalEdit, setFIsModalEdit, updateFacilite } from "features/facilities/facilitiesSlice";
import { BTN_CLOSE, BTN_SUBMIT, DATE_DE_FETE, DUREE, EMPLOYEE, MONTANT, OBSERVATION, STATE } from "headers/headers";
import { useEffect } from "react";
import { useController, useForm } from "react-hook-form";
import Select from 'react-select';
import { IEmployee } from "types/types.employees";
import { IFacilite } from "types/types.facilities";
import EmployeeSelect from "components/employees/EmployeeSelect";


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
    // facilite: IFacilite,
    show: boolean,
    // setShow: (val: boolean) => void
}
const UpdateFacilite = memo(() => {
    console.log("render UpdateFacilite")
    const dispatch = useAppDispatch()
    const date = useAppSelector(selectFaciliteCurrentDate)
    const facilite = useAppSelector(selectCurrentEditFacilite)
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))
    const [getLiteEmployees, { data: employees, isLoading }] = useGetLiteEmployeesMutation({})
    const [employeesList, setEmployeesList] = useState([])
    const [error, setError] = useState()
    const isModalEdit = useAppSelector(selectFIsModalEdit)

    useEffect(() => {
        if (isModalEdit)
            getLiteEmployees('')
    }, [isModalEdit])

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
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
        console.log('values', values)
        dispatch(updateFacilite({
            date: date,
            facilite: values
        }))
            .unwrap()
            .then(() => {
                dispatch(setFIsModalEdit({ show: false }))
            }).catch((err: any) => {
                console.log(err)
            })
    };

    useEffect(() => {
        if (employees) {
            const e = employees.map((emp: IEmployee) => { return { 'value': emp.id, 'label': `${emp.nom} ${emp.prenom}` } })
            setEmployeesList(e)
        }
    }, [employees])
    if (!facilite) return
    return (
        <>
            <Modal
                className="p-0 m-0"
                show={isModalEdit}
                size="lg"
                onHide={() => dispatch(setFIsModalEdit({ show: false }))}
                centered
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Form onSubmit={handleSubmit(onSubmitData)}>
                    <Modal.Header>
                        <h4> Edit  facilite</h4>
                        {isLoading && <Spinner />}
                    </Modal.Header>

                    <Modal.Body>
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
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    defaultInputValue={facilite.employee.nom + ' ' + facilite.employee.prenom}
                                    // name="color"
                                    value={employeeValue ? employeesList.find((x: IEmployee) => x.id === employeeValue) : employeeValue}
                                    onChange={option => employeeChange(option ? option.valueOf : option)}
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
                                <Form.Control
                                    type="number"
                                    {...register("duree", { required: "This Feild Is required" })}
                                />

                                <ErrorText name='duree' error={error} />
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
                                <Form.Label>{STATE}</Form.Label>
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
                                    size="sm"
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
                        <Button size="sm" variant="light" onClick={() => dispatch(setFIsModalEdit({ show: false }))} >{BTN_CLOSE}</Button>
                        <Button size="sm" type="submit" >{BTN_SUBMIT}</Button>                       
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
})



export default UpdateFacilite;