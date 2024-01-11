import { useAppDispatch } from 'app/hooks'
import { getFacilities, selectCurrentDate, setQuery } from 'features/facilities/facilitiesSlice'
import { DATE_ACHAT, DUREE, EMPLOYEE, MATRICULE, MONTANT_ACHAT, SOLDE, STATUT } from 'headers/headers'
import { useRef, useState } from 'react'
import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { BsFillFilterSquareFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import './facilities.css'

interface EmployeeFilterData {
    matricule: number
}


/** search with matricule */
const EmployeeFilter = () => {
    const [show, setShow] = useState(false);
    const [active,setActive] = useState(false)
    const target = useRef(null);
    const dispatch = useAppDispatch()
    const date = useSelector(selectCurrentDate)
    const {
        register,
        handleSubmit,
        getValues,
        control,
        formState: { errors }
    } = useForm<EmployeeFilterData>({
        mode: 'onBlur',
        // defaultValues: initState
    })

    const onSubmitData = async (values: EmployeeFilterData) => {
        let query = `employee__matricule=${values.matricule}`
        setActive(true)
        dispatch(setQuery({query:query}))
        dispatch(getFacilities({
            date: date,
            query: query
        })).then(() => {
            setShow(!show)
        })
    };
    return (
        <>
            <OverlayTrigger target={target.current} show={show} placement="right" overlay={<Popover id="popover-basic">
                <Popover.Body>
                    <Form onSubmit={handleSubmit(onSubmitData)}>
                        <Form.Control
                            type="text"
                            {...register("matricule")}
                        />
                        <Button type='submit' size='sm'>Valid</Button>
                    </Form>
                </Popover.Body>
            </Popover>}>
                <Button ref={target} onClick={() => setShow(!show)} className='rounded-0' size='sm' variant={`outline-${active?'success':'light'}`}><BsFillFilterSquareFill /></Button>
            </OverlayTrigger>
        </>
    )
}

const HeaderRow = () => {
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))
    return (
        <div className='d-flex cell-border-top' >
            <div className="cell-border fw-bold text-center cell flex-cell cell-border-left"><small>{MATRICULE}</small></div>

            <div className="d-flex">
                <div className="d-flex cell-border fw-bold text-center employee-cell flex-cell">
                    <div className="flex-shrink-1"><EmployeeFilter /></div>
                    <div className="w-100"><small>{EMPLOYEE}</small></div>
                </div>
            </div>
            <div className="cell-border fw-bold text-center cell flex-cell"><small>{DUREE}</small></div>
            <div className="cell-border fw-bold text-center cell flex-cell"><small>{DATE_ACHAT}</small></div>
            <div className="cell-border fw-bold text-center montant-cell flex-cell"><small>{MONTANT_ACHAT}</small></div>
            <div className="cell-border fw-bold text-center montant-cell flex-cell"><small>{SOLDE}</small></div>
            {
                montCells && montCells.map((month, index) =>
                    <div key={index} className="cell-border cell flex-cell  fw-bold text-center">{month}</div>
                )
            }
            <div className="cell-border fw-bold text-center cell flex-cell"><small>{STATUT}</small></div>
        </div>
    )
}


export default HeaderRow