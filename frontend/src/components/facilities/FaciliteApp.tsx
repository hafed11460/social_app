// import { facilities } from 'data/facilities'
import { useGetFacilitiesMutation } from 'features/facilities/facilitiesAPI'
import { memo, useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Col, Navbar, Row } from 'react-bootstrap'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { IFacilite } from 'types/types.facilities'
import CellsRow from './CellsRow'

import HeaderRow from './HeaderRow'
import TestSheet from './TestSheet'

interface HeaderNavbarProps {
    date: Date,
    handleNexYear: () => void,
    handlePrevYear: () => void,

}

const HeaderNavbar = memo(({ date, handlePrevYear, handleNexYear }: HeaderNavbarProps) => {
    return (
        <Navbar className=' p-0 mb-2' style={{ height: '50px' }}>
            <ButtonGroup className='border'>
                <Button size='sm' variant="light" onClick={handlePrevYear}><BsChevronLeft /> Prev</Button>
                <Button size='sm' variant="">{date.getFullYear()}</Button>
                <Button size='sm' variant="primary" onClick={handleNexYear}>Nex <BsChevronRight /></Button>
            </ButtonGroup>
        </Navbar>
    )
})

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
        <>
            <Card>
                <Card.Body>

                    <HeaderNavbar date={date} handleNexYear={handleNexYear} handlePrevYear={handlePrevYear} />
                    <div className="container-div flex-sheet">
                        <HeaderRow />

                        {
                            facilities && facilities.map((facilite: IFacilite) =>
                                <CellsRow key={facilite.id} facilite={facilite} date={date} year={date.getFullYear()} />
                            )
                        }
                    </div>
                </Card.Body>

            </Card>
        </>
    )
}

export default FaciliteApp