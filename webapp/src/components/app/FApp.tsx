import { useAppDispatch, useAppSelector } from 'app/hooks'
import DeleteModal from 'components/common/DeleteModal'
import FaciliteNavbar from 'components/facilities/FaciliteNavbar'
import UpdateFacilite from 'components/facilities/UpdateFacilite'
import {
    deleteFacilite,
    getFacilities,
    selectDelFaciliteId,
    selectFaciliteCurrentDate,
    selectFacilities,
    selectFIsModalDel,
    selectFIsModalEdit,
    selectFQuery,
    setCellCut,
    setDelFaciliteId,
    setFaciliteQuery,
    setFIsModalDel,
    setSelectedDate
} from 'features/facilities/facilitiesSlice'
import { KeyboardEvent, memo, useEffect, useState } from 'react'
import { Card, Form, Pagination, Spinner, Table } from 'react-bootstrap'
import { IFacilite } from 'types/types.facilities'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import './app.css'

const LodingSpiner = memo(({ isLoding }: { isLoding: boolean }) => {
    console.log('LodingSpiner')
    if (isLoding) return <Spinner animation="border" variant="primary" />
    return null
})


const FApp = () => {
    const dispatch = useAppDispatch()
    const facilities = useAppSelector(selectFacilities)
    const currentDate = useAppSelector(selectFaciliteCurrentDate)
    const delFaciliteId = useAppSelector(selectDelFaciliteId)
    const isModalDel = useAppSelector(selectFIsModalDel)
    const isModalEdit = useAppSelector(selectFIsModalEdit)
    const query = useAppSelector(selectFQuery)
    const [isLoding, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [error, setError] = useState()

    const setModalDelLocal = (show: boolean) => {
        dispatch(setFIsModalDel({ show: show }))
    }

    const handleDeleteFacilite = () => {
        if (delFaciliteId) {
            dispatch(deleteFacilite(delFaciliteId))
                .then(() => {
                    dispatch(setFIsModalDel({ show: false }))
                    dispatch(setDelFaciliteId({ faciliteId: null }))
                }).catch((err: any) => {
                    setError(err['error'])
                })
        }
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [query])

    useEffect(() => {
        if (currentDate) {
            setLoading(true)
            let q = ''

            for (let key in query) {
                q += '&' + query[key];
            }

            dispatch(getFacilities({
                date: currentDate,
                page: currentPage,
                query: q
            })).then(() => {
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
            })
        }
    }, [currentDate, currentPage, query])


    /**  For the first rendering  */
    useEffect(() => {
        dispatch(setSelectedDate({ date: new Date().getFullYear() }))
    }, [])

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            dispatch(setCellCut({timeline:null}))
            console.log('Escape key pressed');
        }
        console.log('Escape key pressed');
    };
    useEffect(() => {
        const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Escape') {
                dispatch(setCellCut({timeline:null}))
            }
            console.log('Escape key pressed');
        };
        window.addEventListener("keyup", handleKeyDown);
        return () => {
            window.removeEventListener("keyup", handleKeyDown);
        };
    }, [])
   

    if (!facilities?.results) return <div> No results</div>

    return (
        <div onKeyUp={handleKeyDown}>
            {currentDate &&
                <FaciliteNavbar />
            }
            <Card  >

                {
                    isModalDel &&
                    <DeleteModal
                        show={isModalDel}
                        setShow={setModalDelLocal}
                        deleteAction={handleDeleteFacilite}
                        error={error}
                        headertext='Delete Facilite'
                        message='Are you sure to delete this Facilite'
                    />
                }
                {
                    isModalEdit &&
                    <UpdateFacilite />
                }
                {
                    isLoding &&
                    <LodingSpiner isLoding={isLoding} />
                }
                <Table bordered cellSpacing={'0px'} >
                    <TableHeader />
                    <tbody>
                        {
                            (facilities.results && currentDate) && facilities.results.map((facilite: IFacilite) =>
                                <TableRow key={`row_${facilite.id}`} facilite={facilite} />
                            )
                        }
                    </tbody>
                </Table>
                <div className='d-flex justify-content-between px-3  align-items-center '>
                    <Form.Group>
                        <Form.Select defaultValue={10}
                            size='sm'
                            onChange={(e) => dispatch(setFaciliteQuery({ key: 'page_size', query: `page_size=${e.target.value}` }))}>
                            <option value={2}>2</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </Form.Select>
                    </Form.Group>

                    <Pagination className='pagination-sm'>
                        {
                            facilities.pages && Array.from({ length: facilities?.pages }, (value, index) => index + 1).map((page, index) => {

                                if (page == 1 && currentPage > 1) {
                                    return <Pagination.Item className='mx-1'
                                        active={page == currentPage}
                                        key={index} onClick={() => setCurrentPage(page)}>First</Pagination.Item>
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
                                        onClick={() => setCurrentPage(page)}>{page}</Pagination.Item>
                                }

                                if (page == facilities?.pages) {
                                    return <Pagination.Item
                                        className='mx-1'
                                        key={index}
                                        onClick={() => setCurrentPage(page)}>last</Pagination.Item>
                                }
                            })
                        }
                    </Pagination>

                    <Form.Group>
                        <Form.Label>{currentPage}/{facilities.pages} of {facilities.count}</Form.Label>
                    </Form.Group>
                </div>
            </Card>
        </div>
    )
}

export default FApp