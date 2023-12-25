// import { facilities } from 'data/facilities'
import { useGetFaciliteQuery, useGetFacilitesQuery, useGetFacilitiesMutation } from 'features/facilities/facilitiesAPI'
import { memo, useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Col, Form, Navbar, Row } from 'react-bootstrap'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { IFacilite } from 'types/types.facilities'
import CellsRow from './CellsRow'
import HeaderRow from './HeaderRow'
import CreateFacilite from './CreateFacilite'


interface HeaderNavbarProps {
    date: Date,
    handleNexYear: () => void,
    handlePrevYear: () => void,

}

const HeaderNavbar = memo(({ date, handlePrevYear, handleNexYear }: HeaderNavbarProps) => {
    return (
        <Navbar className='justify-content-between p-0 mb-2' style={{ height: '50px' }}>
            <ButtonGroup className='border'>
                <Button size='sm' variant="light" onClick={handlePrevYear}><BsChevronLeft /> Prev</Button>
                <Button size='sm' variant="">{date.getFullYear()}</Button>
                <Button size='sm' variant="primary" onClick={handleNexYear}>Nex <BsChevronRight /></Button>
            </ButtonGroup>
            <Form >
                <Row>
                    <Col xs="auto">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            className=" mr-sm-2"
                        />
                    </Col>
                    <Col xs="auto">
                        {/* <CreateFacilite/> */}
                    </Col>
                </Row>
            </Form>
        </Navbar>
    )
})



const FaciliteApp = () => {
    // const [getFacilities, { data: facilities }] = useGetFacilitiesMutation()
    const  { data: facilities } = useGetFacilitesQuery(undefined)
    const [date, setDate] = useState(new Date())

    const handleNexYear = () => {
        const newdate = date.setFullYear(date.getFullYear() + 1)
        setDate(new Date(newdate))
    }
    const handlePrevYear = () => {
        const newdate = date.setFullYear(date.getFullYear() - 1)
        setDate(new Date(newdate))
    }

    // useEffect(() => {
    //     getFacilities(date.getFullYear())
    // }, [date])

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