import { Button, ButtonGroup, Col, Form, Navbar, Row } from "react-bootstrap"
import CreateFacilite from "./CreateFacilite"
import { memo, useEffect, useState } from "react"
import { BsChevronLeft, BsChevronRight, BsFilterSquareFill, BsFunnelFill } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from "app/hooks"
import { selectQuery, setQuery } from "features/facilities/facilitiesSlice"


interface HeaderNavbarProps {
    date: Date,
    handleNexYear: () => void,
    handlePrevYear: () => void,

}

const HeaderNavbar = memo(({ date, handlePrevYear, handleNexYear }: HeaderNavbarProps) => {
    const dispatch = useAppDispatch()
    const query = useAppSelector(selectQuery)
    const [checked, setChecked] = useState(false);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    useEffect(() => {
        if(checked){
            let query = `is_completed=${checked}`
            dispatch(setQuery({ key: 'is_completed', query: query }))
        }else{
            dispatch(setQuery({ key: 'is_completed', query: '' }))
        }
    }, [checked])

    useEffect(() => {
        if (Object.keys(query).length === 0)
            setChecked(false)
    },[query])

    return (
        <Navbar className='justify-content-between p-0 px-2 rounded mb-2 ' style={{ height: '50px', backgroundColor: "#eeeeee" }}>
            <Form >
                <Row>
                    <Col xs="auto">
                        <CreateFacilite />
                        <Button
                            onClick={() => dispatch(setQuery({ key: 'init', query: '' }))}
                            disabled={Object.keys(query).length === 0 ? true : false}
                            variant="danger"
                            size="sm"
                            className="mx-1"
                        >
                            <BsFunnelFill />
                        </Button>
                    </Col>
                    <Col xs="auto" className="d-flex  align-items-center">
                        <Form.Group>
                                <Form.Check
                                    checked={checked}
                                    onChange={handleCheckboxChange}
                                    label="Completed"
                                // className="mx-1"
                                />
                        </Form.Group>

                        {/* <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Search"
                            className=" mr-sm-2"
                        /> */}
                    </Col>

                </Row>
            </Form>
            <Form>

            </Form>

            <div>

                <ButtonGroup className='border me-1'>
                    <Button size='sm' variant="secondary" onClick={handlePrevYear}><BsChevronLeft /> Prev</Button>
                    <Button size='sm' variant="">{date.getFullYear()}</Button>
                    <Button size='sm' variant="primary" onClick={handleNexYear}>Nex <BsChevronRight /></Button>
                </ButtonGroup>
                <Button size='sm' ><BsFilterSquareFill /></Button>
            </div>

        </Navbar>
    )
})

export default HeaderNavbar