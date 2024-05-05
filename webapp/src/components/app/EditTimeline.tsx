import { useState } from "react";
import { Alert, Card, Col, Form, Modal, Row } from "react-bootstrap";

import { useAppDispatch } from "app/hooks";
import ErrorText from "components/common/ErrorText";
import { updateTimeline } from "features/facilities/facilitiesSlice";
import { BACKGROUND, COLOR, OBSERVATION, SOMME } from "headers/headers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ITimeline } from "types/types.facilities";
import ErrorCell from "components/facilities/timeline/ErrorCell";
import { months } from "types/types.employees";


export interface EditTimelineFromData {
    timeline: number,
    month: number,
    mois: string,
    somme: number,
    observation: string,
    is_commited: boolean,
    color: string,
    [key: string]: string | number | boolean | Array<any>,
}



interface EditTimelineProps {
    show: boolean,
    timeline: ITimeline
    setShow: (val: boolean) => void
}


const EditTimeline = ({ timeline, show, setShow }: EditTimelineProps) => {
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
            .then(() => {
                setShow(false)
            }).catch((err: any) => {
                console.log(err)
                setError(err['error'])
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
                <Form onSubmit={handleSubmit(onSubmitData)}>
                    <Modal.Body
                        className="p-0"
                    >
                        <Card as={Form} className="form-vertical"
                            onSubmit={handleSubmit(onSubmitData)}
                            style={{ minHeight: "250px", minWidth: '650px' }}>
                            {error &&
                                <Card.Header>
                                    <Alert variant="warning">
                                        <ErrorCell error={error} variant="dark" />
                                    </Alert>
                                </Card.Header>
                            }
                            <Card.Body>
                                <Row>

                                    <Form.Group as={Col} md={6} className="mb-3" >
                                        <Form.Label>Mois</Form.Label>
                                        <Form.Select
                                            {...register("month", { required: "This Feild Is required" })}
                                        >
                                            {
                                                Object.entries(months).map(([key, value]) => {
                                                    return (
                                                        <option
                                                            key={key}
                                                            value={key}
                                                            selected={timeline.month == Number(key)}
                                                        >{(key)}-{value}</option>
                                                    )
                                                })
                                            }

                                        </Form.Select>
                                        <ErrorText name='mois' error={error} />
                                        {errors.mois && (
                                            <Form.Text className="text-danger">
                                                {errors.mois.message}
                                            </Form.Text>
                                        )}
                                    </Form.Group>
                                    <Form.Group as={Col} md={6} className="mb-3" >
                                        <Form.Label>Mois</Form.Label>
                                        <Form.Control
                                            type="date"
                                            {...register("mois", { required: "This Feild Is required" })}
                                        />
                                        <ErrorText name='mois' error={error} />
                                        {errors.mois && (
                                            <Form.Text className="text-danger">
                                                {errors.mois.message}
                                            </Form.Text>
                                        )}
                                    </Form.Group>
                                    <Form.Group as={Col} md={6} className="mb-3" >
                                        <Form.Label>{SOMME}</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register("somme", { required: "This Feild Is required" })}
                                        />
                                        <ErrorText name='somme' error={error} />
                                        {errors.somme && (
                                            <Form.Text className="text-danger">
                                                {errors.somme.message}
                                            </Form.Text>
                                        )}
                                    </Form.Group>
                                    <Form.Group as={Col} md={3} className="mb-3" >
                                        <Form.Label>{COLOR} </Form.Label>
                                        <Form.Control
                                            type="color"
                                            {...register("color")}
                                        />
                                        <ErrorText name='color' error={error} />
                                        {errors.color && (
                                            <Form.Text className="text-danger">
                                                {errors.color.message}
                                            </Form.Text>
                                        )}
                                    </Form.Group>
                                    <Form.Group as={Col} md={3} className="mb-3" >
                                        <Form.Label>{BACKGROUND}</Form.Label>
                                        <Form.Control
                                            type="color"
                                            {...register("background")}
                                        />
                                        <ErrorText name='background' error={error} />
                                        {errors.background && (
                                            <Form.Text className="text-danger">
                                                {errors.background.message}
                                            </Form.Text>
                                        )}
                                    </Form.Group>
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

                            </Card.Body>
                        </Card>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="col-12 d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary me-1 mb-1 btn-sm">Submit</button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}



export default EditTimeline;