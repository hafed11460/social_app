import { BTN_CLOSE, BTN_DELETE } from "headers/headers";
import { Button, Form, Modal } from "react-bootstrap";


interface ModalDeleteProps {
    id?: number,
    show: boolean,
    setShow: (modalDel: boolean) => void
    deleteAction: () => void,
    error?: string,
    headertext: string,
    message: string
}


const DeleteModal = (
    {
        id,
        show,
        setShow,
        deleteAction,
        error, 
        headertext,
        message
    }: ModalDeleteProps) => {
    console.log('render delete Prime')
    const handleClose = () => setShow(false);


    return (
        <>
            <Modal
                show={show}
                size="sm"
                onHide={() => setShow(false)}
                centered
                as={Form}
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    {headertext}
                </Modal.Header>
                <Modal.Body>
                    {error}
                    <h6 className="card-title"> {message}</h6>

                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="light" onClick={handleClose} >{BTN_CLOSE}</Button>
                    <Button size="sm" variant="danger" onClick={deleteAction} >{BTN_DELETE}</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}



export default DeleteModal;