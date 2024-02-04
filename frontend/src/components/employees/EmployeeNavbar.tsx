import { Button, ButtonGroup, Col, Form, Navbar, Pagination, Row } from "react-bootstrap"
import { ChangeEvent, memo } from "react"
import { BsChevronLeft, BsChevronRight, BsFilterSquareFill, BsFunnelFill } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from "app/hooks"
import { selectQuery, setQuery } from "features/facilities/facilitiesSlice"
import { useGetEmployeesMutation } from "features/employees/employeeAPI"
import { selectCurrentPage, selectEmployees, selectEmployeesQuery, setCurrentPage, setEmployeeQuery } from "features/employees/employeeSlice"


interface HeaderNavbarProps {
    pages: any,
    currentPage: number,
    setcurrentPage: (page: number) => void,
    // handlePrevYear: () => void,

}

const EmployeeNavbar = memo(() => {
    const dispatch = useAppDispatch()
    const query = useAppSelector(selectEmployeesQuery)
    const employees = useAppSelector(selectEmployees)
    const currentPage = useAppSelector(selectCurrentPage)

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0){

            const q ='query='+event.target.value
            dispatch(setEmployeeQuery({ key: 'query', query: q }))
        }
    }
    
    return (
        <Navbar className='justify-content-between p-0 px-2 rounded mb-2 ' style={{ height: '50px', backgroundColor: "#eeeeee" }}>
            <Form >
                <Row>
                    <Col xs="auto">

                        <Button
                            onClick={() => dispatch(setEmployeeQuery({ key: 'init', query: '' }))}
                            disabled={Object.keys(query).length === 0 ? true : false}
                            variant="danger"
                            size="sm"
                            className="mx-1"
                        >
                            <BsFunnelFill />
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Form.Control
                            onChange={handleSearch}
                            size="sm"
                            type="text"
                            placeholder="Search"
                            className=" mr-sm-2"
                        />
                    </Col>

                </Row>
            </Form>
            <Form>

            </Form>

            <div className=" border">
                <Pagination className=''>
                    {
                        employees?.pages && Array.from({ length: employees?.pages }, (value, index) => index + 1).map((page, index) => {

                            if (page == 1 && currentPage > 1) {
                                return <Pagination.Item className='mx-1'
                                    active={page == currentPage}
                                    key={index} onClick={() => dispatch(setCurrentPage({page:page}))}>First</Pagination.Item>
                            }
                            if (page == currentPage) {
                                return (
                                    <Pagination.Item
                                        className='mx-1'
                                        active={page == currentPage}
                                        key={index}>{page}</Pagination.Item>
                                )
                            } else if ((page <= (currentPage + 2)) && (page >= (currentPage - 2))) {
                                return <Pagination.Item
                                    className='mx-1'
                                    key={index}
                                    onClick={() => dispatch(setCurrentPage({page:page}))}>{page}</Pagination.Item>
                            }

                            if (page == employees?.pages) {
                                return <Pagination.Item
                                    className='mx-1'
                                    key={index}
                                    onClick={() => dispatch(setCurrentPage({page:page}))}>last</Pagination.Item>
                            }
                        })
                    }
                </Pagination>
            </div>
        </Navbar>
    )
})

export default EmployeeNavbar