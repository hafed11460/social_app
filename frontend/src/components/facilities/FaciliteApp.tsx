// import { facilities } from 'data/facilities'
import { useGetFacilitiesMutation } from 'features/facilities/facilitiesAPI'
import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Navbar, Row } from 'react-bootstrap'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { IFacilite } from 'types/facilities'
import CellsRow from './CellsRow'


const FaciliteApp = () => {
    const [getFacilities, { data: facilities }] = useGetFacilitiesMutation()
    const [date, setDate] = useState(new Date())

    const handleNexYear = () => {
        const newdate = date.setFullYear(date.getFullYear() + 1)
        setDate(new Date(newdate))
    }
    const handlePrevYear = () => {
        const newdate = date.setFullYear(date.getFullYear() - 1)
        setDate(new Date(newdate))
    }

    useEffect(() => {
        getFacilities(date.getFullYear())
    }, [date])

    return (
        <Row>
            <Navbar>
                <ButtonGroup>
                    <Button variant="secondary" onClick={handlePrevYear}><BsChevronLeft /> Prev</Button>
                    <Button variant="light">{date.getFullYear()}</Button>
                    <Button variant="secondary" onClick={handleNexYear}>Nex <BsChevronRight /></Button>
                </ButtonGroup>
            </Navbar>
            {
                facilities && facilities.map((facilite: IFacilite) =>
                    <CellsRow facilite={facilite} date={date} />
                )
            }
        </Row>
    )
}

export default FaciliteApp