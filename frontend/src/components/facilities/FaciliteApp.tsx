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
        }
    }
    const handlePrevYear = () => {
        if (date) {
            const newdate = date?.setFullYear(date.getFullYear() - 1)
            setDate(new Date(newdate))
        }
    }
    useEffect(() => {
        if (date)
            dispatch(setSelectedDate({ date: date?.getFullYear() }))
    }, [date])


    useEffect(() => {
        if (date) {
            setLoading(true)
            console.log(typeof(query))
            let q = ''
           
            for (let key in query) {
                q += '&' +query[key];
            }

            dispatch(getFacilities(
                {
                    date: date.getFullYear(),
                    page: page,
                    query: q
                }
            )).then(() => {
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
            })
        }
    }, [date, page, query])


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
                    <Pagination className='p-3'>
                        {
                            facilities.pages && Array.from({ length: facilities.pages }, (value, index) => index + 1).map((pg, index) =>
                                <Pagination.Item className='mx-1' active={pg == page} key={index} onClick={() => setPage(pg)}>{pg}</Pagination.Item>
                            )
                        }
                    </Pagination>
                </Card.Body>
            </Card>
        </>
    )
}

export default FaciliteApp