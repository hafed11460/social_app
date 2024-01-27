import { Button, ButtonGroup, Col, Form, Navbar, Pagination, Row } from "react-bootstrap"
import { memo } from "react"
import { BsChevronLeft, BsChevronRight, BsFilterSquareFill, BsFunnelFill } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from "app/hooks"
import { selectQuery, setQuery } from "features/facilities/facilitiesSlice"


interface HeaderNavbarProps {
    pages: any,
    currentPage: number,
    setcurrentPage: (page: number) => void,
    // handlePrevYear: () => void,

}

const EmployeeNavbar = memo(({ pages, currentPage, setcurrentPage }: HeaderNavbarProps) => {
    const dispatch = useAppDispatch()
    const query = useAppSelector(selectQuery)

    return (
        <Navbar className='justify-content-between p-0 px-2 rounded mb-2 ' style={{ height: '50px', backgroundColor: "#eeeeee" }}>
            <Form >
                <Row>
                    <Col xs="auto">

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
                    <Col xs="auto">
                        <Form.Control
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
                        pages && Array.from({ length: pages }, (value, index) => index + 1).map((page, index) => {

                            if (page == 1 && currentPage > 1) {
                                return <Pagination.Item className='mx-1'
                                    active={page == currentPage}
                                    key={index} onClick={() => setcurrentPage(page)}>First</Pagination.Item>
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
                                    onClick={() => setcurrentPage(page)}>{page}</Pagination.Item>
                            }

                            console.log(pages)
                            if (page  == pages) {
                                return <Pagination.Item
                                    className='mx-1'
                                    key={index}
                                    onClick={() => setcurrentPage(pages)}>last</Pagination.Item>
                            }
                        })
                    }
                </Pagination>               
            </div>
        </Navbar>
    )
})

export default EmployeeNavbar