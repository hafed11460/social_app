import { useState } from "react";
import { Alert, Card, Col, Form, Modal, Row } from "react-bootstrap";

import ErrorText from "components/common/ErrorText";
import { useGetEmployeesQuery } from "features/employees/employeeAPI";
import { DATE_DE_FETE, DUREE, MONTANT, OBSERVATION } from "headers/headers";
import { useEffect } from "react";
import { useController, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { IEmployee } from "types/types.employees";


export interface CreateCommentFromData {
    timeline:number,
    observation: string,
    [key: string]: string | number | boolean | Array<any>,
}

const initState = {
    observation: 'This test',
}

interface CreateCommentProps {
    show:boolean,
    setShow:(val:boolean)=>void
}




const CreateComment = ({show,setShow}:CreateCommentProps) => {
    const dispatch = useDispatch()
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))
    const { data: employees } = useGetEmployeesQuery({})
    const [employeesList, setEmployeesList] = useState([])
    const [error, setError] = useState()

    useEffect(()=>{
        if(show){
            
        }
    },[show])
    const {
        register,
        handleSubmit,
        getValues,
        control,
        formState: { errors }
    } = useForm<CreateCommentFromData>({
        mode: 'onBlur',
        defaultValues: initState
    })

    const onSubmitData = async (values: CreateCommentFromData) => {
        // dispatch(CreateComment(values))
    };

    useEffect(() => {
        if (employees) {

            const e = employees.map((emp: IEmployee) => { return { 'value': emp.id, 'label': `${emp.nom} ${emp.prenom}` } })
            // console.log(e)
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
              
                <Modal.Body
                    className="p-0"
                // className=" mb-4 mt-3 px-5 pt-5"
                >

                    <Card as={Form} className="form-vertical"
                        onSubmit={handleSubmit(onSubmitData)}
                        style={{ minHeight: "250px", minWidth: '650px' }}>
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
                                <Form.Group className="mb-3" >
                                    <Form.Label>{OBSERVATION}</Form.Label>
                                    <Form.Control
                                        as={'textarea'}
                                        rows={5}
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
                            <div className="col-12 d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary me-1 mb-1">Submit</button>
                            </div>
                        </Card.Body>
                        {/* <Card.Footer>                            
                            <div className="col-12 d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary me-1 mb-1">Submit</button>
                            </div>
                        </Card.Footer> */}
                    </Card>

                </Modal.Body>
            </Modal>
        </>
    )
}



export default CreateComment;