import { useState } from "react";
import { Alert, Card, Form, Modal, Row } from "react-bootstrap";

import { useAppDispatch } from "app/hooks";
import ErrorText from "components/common/ErrorText";
import { updateTimeline } from "features/facilities/facilitiesSlice";
import { OBSERVATION } from "headers/headers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ITimeline } from "types/types.facilities";


export interface CreateCommentFromData {
    timeline:number,
    observation: string,
    [key: string]: string | number | boolean | Array<any>,
}



interface CreateCommentProps {
    show:boolean,
    timeline:ITimeline
    setShow:(val:boolean)=>void
}


const CreateComment = ({timeline,show,setShow}:CreateCommentProps) => {
    const dispatch = useAppDispatch()
    const [newTLine, setNewTLine] = useState<ITimeline>(timeline)
    const [error, setError] = useState()

    const {
        register,
        handleSubmit,
        getValues,
        control,
        formState: { errors }
    } = useForm<ITimeline>({
        mode: 'onBlur',
        defaultValues: newTLine
    })

    const onSubmitData = async (values: ITimeline) => {
        console.log(values)
        dispatch(updateTimeline(values))
        .unwrap()
        .then(()=>{
            setShow(false)
        })
    };

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
                            </Card.Header>
                        }
                        <Card.Body>
                            <Row>
                                <Form.Group className="mb-3" >
                                    <Form.Label>{OBSERVATION}</Form.Label>
                                    <Form.Control
                                        as={'textarea'}
                                        rows={5}
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
                            <div className="col-12 d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary me-1 mb-1">Submit</button>
                            </div>
                        </Card.Body>                        
                    </Card>

                </Modal.Body>
            </Modal>
        </>
    )
}



export default CreateComment;