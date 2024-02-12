
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectQuery, setFaciliteQuery } from 'features/facilities/facilitiesSlice'
import { useEffect, useRef, useState } from 'react'
import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { BsFunnel, BsFunnelFill } from 'react-icons/bs'
import { FaciliteFilterData } from 'types/types.facilities'
import '../facilities.css'

const EmployeeFilter = () => {
    console.log('render filter Employee')
    const [show, setShow] = useState(false);
    const [active, setActive] = useState(false)
    const target = useRef(null);
    const popRef = useRef(null);
    const dispatch = useAppDispatch()
    const query = useAppSelector(selectQuery)

    const {
        register,
        handleSubmit,
    } = useForm<FaciliteFilterData>({
        mode: 'onBlur',
    })

    const onSubmitData = async (values: FaciliteFilterData) => {
        let query = `employee__nom__icontains=${values.nom}&employee__prenom__icontains=${values.prenom}`
        setActive(true)
        dispatch(setFaciliteQuery({ key: 'employee__nom__icontains', query: query }))
        setShow(!show)
    };

    useEffect(() => {
        if (Object.keys(query).length === 0) {
            setActive(false)
        }
    }, [query])



    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (popRef.current &&
                !popRef.current.contains(event.target) &&
                event.target !== target.current) {

                setShow(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [])
    return (

        <OverlayTrigger
            target={target.current}
            show={show}
            placement="bottom"
            overlay={
                <Popover onClick={(event) => event.stopPropagation()} ref={popRef}
                    id="popover-basic" className=''>
                    <Popover.Body className='p-2'>
                        <Form className='p-0' onSubmit={handleSubmit(onSubmitData)}>
                            <Form.Group className='mb-1'>
                                <Form.Control
                                    placeholder='Nom'
                                    size='sm'
                                    className='w-100 me-2'
                                    type="text"
                                    {...register("nom")}
                                />
                            </Form.Group>
                            <Form.Group className='mb-1'>
                                <Form.Control
                                    placeholder='Prenom'
                                    size='sm'
                                    className='w-100 me-2'
                                    type="text"
                                    {...register("prenom")}
                                />
                            </Form.Group>
                            <Form.Group className='d-flex justify-content-end '>
                                <Button type='submit' className='mx-2' size='sm'>Valid</Button>
                                <Button onClick={() => setShow(!show)} size='sm' variant='light'>close</Button>
                            </Form.Group>
                        </Form>
                    </Popover.Body>
                </Popover>}>
            <Button ref={target}
                onClick={() => setShow(!show)}
                className='rounded-0'
                size='sm'
                variant={`outline-${active ? 'success' : 'light'}`}>
                {!active ? <BsFunnel /> : <BsFunnelFill />}
            </Button>
        </OverlayTrigger>
    )
}

export default EmployeeFilter