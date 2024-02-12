
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectQuery, setFaciliteQuery } from 'features/facilities/facilitiesSlice'
import { useEffect, useRef, useState } from 'react'
import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { BsFunnel, BsFunnelFill } from 'react-icons/bs'
import { FaciliteFilterData } from 'types/types.facilities'
import '../facilities.css'


const MatriculeFilter = () => {
    console.log('render filter M')
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
        let query = `employee__matricule=${values.matricule}`
        setActive(true)
        dispatch(setFaciliteQuery({ key: 'employee__matricule', query: query }))
        setShow(!show)
    };

    useEffect(()=>{
        if(Object.keys(query).length === 0){
            setActive(false)
        }
    },[query])

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
                    <Popover.Body>
                        <Form className='d-flex' onSubmit={handleSubmit(onSubmitData)}>

                            <Form.Control
                                size='sm'
                                className='w-100 me-2'
                                type="text"
                                {...register("matricule")}
                            />
                            <Button type='submit' size='sm'>Valid</Button>
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

export default MatriculeFilter