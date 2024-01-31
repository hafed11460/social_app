import { Button, Card, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "app/hooks";
import { BTN_CLOSE, BTN_DELETE } from "headers/headers";
import { useState } from "react";
import { deletePrime } from "features/primes/primesSlice";


interface EditPrimeProps {
    primeId?: number,
    modalDel: boolean,
    setModalDel: (modalDel: boolean) => void
}


const DeletePrime = ({ primeId, modalDel, setModalDel }: EditPrimeProps) => {
    console.log('render delete Prime')
    const dispatch = useAppDispatch()

    const [error, setError] = useState()

    const handleClose = () => setModalDel(false);
    const handleDeletePrime = () => {
        if (primeId) {
            dispatch(deletePrime(primeId))
                .then(() => {
                    setModalDel(false)
                }).catch((err: any) => {
                    setError(err['error'])
                })
        }
    }

    return (
        <>

            <Modal
                className="p-0 m-0"
                show={modalDel}
                size="sm"
                onHide={() => setModalDel(false)}
                centered
                as={Form}
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    Delete Prime
                </Modal.Header>
                <Modal.Body>
                    {error}
                    <h6 className="card-title"> Are you sure to delete this record</h6>

                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="light" onClick={handleClose} >{BTN_CLOSE}</Button>
                    <Button size="sm" variant="danger" onClick={handleDeletePrime} >{BTN_DELETE}</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}



export default DeletePrime;