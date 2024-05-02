import { useAppDispatch, useAppSelector } from "app/hooks"
import axios from "axios"
import { BASE_URL } from "features/BASE_URL"
import { selectFaciliteCurrentDate, selectQuery, setFaciliteQuery, setSelectedDate } from "features/facilities/facilitiesSlice"
import { ChangeEvent, memo, MouseEvent, useEffect, useState } from "react"
import { Button, ButtonGroup, Col, Form, InputGroup, Navbar, Row } from "react-bootstrap"
import { BsChevronLeft, BsChevronRight, BsFileEarmarkSpreadsheet, BsFunnelFill, BsSearch } from 'react-icons/bs'
import CreateFacilite from "./CreateFacilite"


interface FaciliteNavbarProps {
    date: Date,
    handleNexYear: () => void,
    handlePrevYear: () => void,
}

const FaciliteNavbar = memo(() => {

    const dispatch = useAppDispatch()
    const query = useAppSelector(selectQuery)
    const currentDate = useAppSelector(selectFaciliteCurrentDate)
    const [checked, setChecked] = useState(false);
    const [excelDate, setExcelDate] = useState<string>()
    const [searchInput, setSearchInput] = useState<string>('')

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleNexYear = () => {
        if (currentDate) {
            const newdate = currentDate.setFullYear(currentDate.getFullYear() + 1)
            dispatch(setSelectedDate({ date: new Date(newdate) }))
        }
    }
    const handlePrevYear = () => {
        if (currentDate) {
            const newdate = currentDate?.setFullYear(currentDate.getFullYear() - 1)
            dispatch(setSelectedDate({ date: new Date(newdate) }))
        }
    }

    const handleExcelDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExcelDate(event.target.value)
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0) {
            setSearchInput(event.target.value)
        }
    }
    const onSearch = () => {
        if (searchInput) {
            const q = 'query=' + searchInput
            dispatch(setFaciliteQuery({ key: 'query', query: q }))
        }
    }

    const handleExportToExcel = async () => {
        if (excelDate)
            await axios({
                url: `${BASE_URL}facilities/excel/?date=${excelDate}-01`,
                method: 'GET',
                responseType: 'blob'
            })
                .then((res: any) => {
                    const url = window.URL.createObjectURL(res.data);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `facilities.xlsx`);
                    document.body.appendChild(link);
                    link.click();
                })
    }
    const handleYearExportToExcel = async () => {
        if (currentDate)
            await axios({
                url: `${BASE_URL}facilities/${currentDate.getFullYear()}/excel/`,
                method: 'GET',
                responseType: 'blob'
            })
                .then((res: any) => {
                    const url = window.URL.createObjectURL(res.data);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `facilities.xlsx`);
                    document.body.appendChild(link);
                    link.click();
                })
    }
    useEffect(() => {
        if (checked) {
            let query = `is_completed=${checked}`
            dispatch(setFaciliteQuery({ key: 'is_completed', query: query }))
        } else {
            dispatch(setFaciliteQuery({ key: 'is_completed', query: '' }))
        }
    }, [checked])

    useEffect(() => {
        if (Object.keys(query).length === 0)
            setChecked(false)
    }, [query])

    return (
        <Navbar className='justify-content-between p-0 px-2 rounded mb-2 ' style={{ height: '50px', backgroundColor: "#eeeeee" }}>
            <Form >
                <Row>
                    <Col xs="auto">
                        <CreateFacilite />
                        <Button
                            onClick={() => dispatch(setFaciliteQuery({ key: 'init', query: '' }))}
                            disabled={Object.keys(query).length === 0 ? true : false}
                            variant="danger"
                            size="sm"
                            className="mx-1"
                        >
                            <BsFunnelFill />
                        </Button>
                    </Col>
                    <Col xs="auto" className="d-flex  align-items-center">
                        <ButtonGroup>
                            <Form.Control
                                onChange={handleSearchChange}
                                // value={searchInput}
                                size="sm"
                                type="text"
                                placeholder="Search"
                                className=" mr-sm-2"
                            />
                            <Button onClick={onSearch} size="sm"><BsSearch /></Button>
                        </ButtonGroup>
                        {/* <Form.Group>
                            <Form.Check
                                checked={checked}
                                onChange={handleCheckboxChange}
                                label="Completed"
                            // className="mx-1"
                            />
                        </Form.Group> */}

                        {/* <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Search"
                            className=" mr-sm-2"
                        /> */}
                    </Col>

                </Row>
            </Form>
            <Form></Form>

            <div>
                <ButtonGroup className='border me-1'>
                    <Button
                        size='sm'
                        variant="secondary"
                        onClick={handlePrevYear}>
                        <BsChevronLeft /> Prev
                    </Button>
                    <Button
                        size='sm'
                        variant="">
                        {currentDate?.getFullYear()}
                    </Button>
                    <Button size='sm'
                        variant="primary"
                        onClick={handleNexYear}>
                        Nex <BsChevronRight />
                    </Button>
                </ButtonGroup>
                <Button
                    variant="success"
                    size='sm'
                    onClick={handleYearExportToExcel}>
                    <BsFileEarmarkSpreadsheet /> Excel
                </Button>
            </div>
            <div>

                <InputGroup size="sm" className="">
                    <Form.Control
                        type="month"
                        onChange={handleExcelDateChange}
                        value={excelDate}
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <Button
                        variant="success"
                        size='sm'
                        onClick={handleExportToExcel}>
                        <BsFileEarmarkSpreadsheet /> Excel
                    </Button>

                </InputGroup>
            </div>

        </Navbar>
    )
})

export default FaciliteNavbar