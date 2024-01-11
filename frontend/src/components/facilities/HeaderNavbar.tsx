import { Button, ButtonGroup, Col, Form, Navbar, Row } from "react-bootstrap"
import CreateFacilite from "./CreateFacilite"
import { memo } from "react"
import { BsChevronLeft, BsChevronRight, BsFilterSquareFill } from 'react-icons/bs'


interface HeaderNavbarProps {
    date: Date,
    handleNexYear: () => void,
    handlePrevYear: () => void,

}

const HeaderNavbar = memo(({ date, handlePrevYear, handleNexYear }: HeaderNavbarProps) => {
    return (
        <Navbar className='justify-content-between p-0 px-2 rounded mb-2 ' style={{ height: '50px', backgroundColor: "#eeeeee" }}>
            <Form >
                <Row>
                    <Col xs="auto">
                        <CreateFacilite />
                    </Col>
                    <Col xs="auto">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            className=" mr-sm-2"
                        />
                    </Col>

                </Row>
            </Form>
            <Form>
                <Form.Control>

                </Form.Control>
            </Form>

            <div className='buttons'>

                <ButtonGroup className='border'>
                    <Button size='sm' variant="light" onClick={handlePrevYear}><BsChevronLeft /> Prev</Button>
                    <Button size='sm' variant="">{date.getFullYear()}</Button>
                    <Button size='sm' variant="primary" onClick={handleNexYear}>Nex <BsChevronRight /></Button>
                </ButtonGroup>
                <Button size='sm' ><BsFilterSquareFill /></Button>
            </div>

        </Navbar>
    )
})

export default HeaderNavbar