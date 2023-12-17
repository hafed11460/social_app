// import { facilities } from 'data/facilities'
import { useGetFacilitiesMutation } from 'features/facilities/facilitiesAPI'
import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Navbar, Row } from 'react-bootstrap'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { IFacilite } from 'types/types.facilities'
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
        <Card >
            <Card.Body>
                <Row>
                    <Navbar className=' p-0 mb-2' style={{height:'50px'}}>
                        <ButtonGroup className='border'>
                            <Button variant="secondary" onClick={handlePrevYear}><BsChevronLeft /> Prev</Button>
                            <Button variant="light">{date.getFullYear()}</Button>
                            <Button variant="secondary" onClick={handleNexYear}>Nex <BsChevronRight /></Button>
                        </ButtonGroup>
                    </Navbar>
                    {
                        facilities && facilities.map((facilite: IFacilite) =>
                            <CellsRow key={facilite.id} facilite={facilite} date={date} year={date.getFullYear()} />
                        )
                    }
                </Row>
            </Card.Body>
        </Card>
    )
}

export default FaciliteApp