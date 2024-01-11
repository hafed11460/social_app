// import { facilities } from 'data/facilities'
// import { useGetFaciliteQuery, useGetFacilitesQuery, useGetFacilitiesMutation } from 'features/facilities/facilitiesAPI'
import { getFacilities, selectFacilities, selectQuery, setSelectedDate } from 'features/facilities/facilitiesSlice'
import { memo, useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, Card, Col, Form, Navbar, Pagination, Row, Spinner } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { IFacilite } from 'types/types.facilities'
import CellsRow from './CellsRow'
import HeaderRow from './HeaderRow'
import CreateFacilite from './CreateFacilite'
import HeaderNavbar from './HeaderNavbar'
import { useAppDispatch, useAppSelector } from 'app/hooks'






const LodingSpiner = ({ isLoding }: { isLoding: boolean }) => {

    if (isLoding) return <Spinner animation="border" variant="primary" />
    return null
}



const FaciliteApp = () => {
    const dispatch = useAppDispatch()
    const facilities = useAppSelector(selectFacilities)
    const query = useAppSelector(selectQuery)
    const [isLoding, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    // const [date, setDate] = useState(new Date('2023'))
    const [date, setDate] = useState<Date>()
    const dateRef = useRef(date)

    const handleNexYear = () => {
        if (date) {
            const newdate = date.setFullYear(date.getFullYear() + 1)
            setDate(new Date(newdate))
            setPage(1)
        }
    }
    const handlePrevYear = () => {
        if (date) {
            const newdate = date?.setFullYear(date.getFullYear() - 1)
            setDate(new Date(newdate))
            setPage(1)
        }
    }
    useEffect(() => {
        if (date)
            dispatch(setSelectedDate({ date: date?.getFullYear() }))
    }, [date])


    useEffect(() => {
        if (date) {
            setLoading(true)
            // setQuery(`?date=${date?.getFullYear()}&page=${page}`)
            dispatch(getFacilities(
                {
                    date: date.getFullYear(),
                    page: page,
                    query: query
                }
            )).then(() => {
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
            })
        }
    }, [date, page])


    /**  For the first rendering  */
    useEffect(() => {
        setDate(new Date('2023'))
    }, [])

    // 

    if (!facilities?.results) return <div> No results</div>

    return (
        <>
            <Card>
                <Card.Body>
                    {date &&
                        <HeaderNavbar date={date} handleNexYear={handleNexYear} handlePrevYear={handlePrevYear} />
                    }
                    <LodingSpiner isLoding={isLoding} />
                    <div className="container-div flex-sheet">
                        <HeaderRow />
                        {
                            facilities.results && facilities.results.map((facilite: IFacilite) =>
                                <CellsRow key={facilite.id} facilite={facilite} year={date ? date.getFullYear() : 0} />
                            )
                        }
                    </div>
                    <Pagination>
                        {
                            facilities.pages && Array.from({ length: facilities.pages }, (value, index) => index + 1).map((page, index) =>
                                <Pagination.Item onClick={() => setPage(page)}>{page}</Pagination.Item>
                            )
                        }
                    </Pagination>
                </Card.Body>
            </Card>
        </>
    )
}

export default FaciliteApp