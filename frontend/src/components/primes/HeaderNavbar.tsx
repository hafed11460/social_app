import { useAppDispatch, useAppSelector } from "app/hooks"
import axios from "axios"
import { BASE_URL } from "features/BASE_URL"
import { selectQuery, setQuery } from "features/facilities/facilitiesSlice"
import { memo, useEffect, useState } from "react"
import { Button, ButtonGroup, Col, Form, Navbar, Row } from "react-bootstrap"
import { BsChevronLeft, BsChevronRight, BsFileEarmarkSpreadsheet, BsFilterSquareFill, BsFunnelFill } from 'react-icons/bs'
import CreatePrime from "./CreatePrime"


interface HeaderNavbarProps {
    date: Date,
    handleNexYear: () => void,
    handlePrevYear: () => void,

}

const HeaderNavbar = memo(({ }: HeaderNavbarProps) => {
    const dispatch = useAppDispatch()
    const query = useAppSelector(selectQuery)
    const [checked, setChecked] = useState(false);
    const [dateSelected, setDateSelected] = useState<string>('')
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

    const handleExportToExcel = async () => {
        await axios({
            url: `${BASE_URL}employees/primes/excel/?date=${dateSelected}`,
            method: 'GET',
            responseType: 'blob'
        })
            .then((res) => {
                const url = window.URL.createObjectURL(res.data);

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'primes.xlsx');
                document.body.appendChild(link);
                link.click();
            })
    }

    return (
        <Navbar className='justify-content-between p-0 px-2 rounded mb-2 ' style={{ height: '50px', backgroundColor: "#eeeeee" }}>
            <Form >
                <Row>
                    <Col xs="auto">
                        {/* <CreatePrime /> */}
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
                    </Col>

                </Row>
            </Form>
            <Form>

            </Form>

            <div>
                <ButtonGroup className='border me-1'>
                    <Button size='sm' variant="secondary" ><BsChevronLeft /> Prev</Button>
                    <Button size='sm' variant=""></Button>
                    <Button size='sm' variant="primary" >Nex <BsChevronRight /></Button>
                </ButtonGroup>
                <Button variant="success" size='sm' onClick={handleExportToExcel}><BsFileEarmarkSpreadsheet /></Button>
            </div>

        </Navbar>
    )
})

export default HeaderNavbar