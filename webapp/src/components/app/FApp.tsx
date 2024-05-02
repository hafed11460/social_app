import { useAppDispatch, useAppSelector } from 'app/hooks'
import FaciliteNavbar from 'components/facilities/FaciliteNavbar'
import { getFacilities, selectFaciliteCurrentDate, selectFacilities, selectQuery, setSelectedDate } from 'features/facilities/facilitiesSlice'
import { useEffect, useState } from 'react'
import { Card, Pagination, Spinner, Table } from 'react-bootstrap'
import { IFacilite } from 'types/types.facilities'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import './app.css'

const LodingSpiner = ({ isLoding }: { isLoding: boolean }) => {
    if (isLoding) return <Spinner animation="border" variant="primary" />
    return null
}


const FApp = () => {
    const dispatch = useAppDispatch()
    const facilities = useAppSelector(selectFacilities)
    const currentDate = useAppSelector(selectFaciliteCurrentDate)
    const query = useAppSelector(selectQuery)
    const [isLoding, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(1)
    }, [query])

    useEffect(() => {
        if (currentDate) {
            setLoading(true)
            // console.log(typeof (query))
            let q = ''

            for (let key in query) {
                q += '&' + query[key];
            }

            dispatch(getFacilities(
                {
                    date: currentDate.getFullYear(),
                    page: page,
                    query: q
                }
            )).then(() => {
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
            })
        }
    }, [currentDate, page, query])


    /**  For the first rendering  */
    useEffect(() => {
        // setDate(new Date())
        dispatch(setSelectedDate({ date: new Date() }))
    }, [])

    // 

    if (!facilities?.results) return <div> No results</div>

    return (
        <>
            <Card>
                {currentDate &&
                    <FaciliteNavbar />
                }
                <LodingSpiner isLoding={isLoding} />
                <Table bordered cellSpacing={'0px'} >
                    <TableHeader/>
                    <tbody>
                        {
                            (facilities.results && currentDate) && facilities.results.map((facilite: IFacilite) =>
                                <TableRow key={`row_${facilite.id}`} facilite={facilite} />
                            )
                        }
                    </tbody>
                </Table>
                        
                <Pagination className='p-3 justify-content-center'>
                    {
                        facilities.pages && Array.from({ length: facilities.pages }, (value, index) => index + 1).map((pg, index) =>
                            <Pagination.Item className='mx-1' active={pg == page} key={index} onClick={() => setPage(pg)}>{pg}</Pagination.Item>
                        )
                    }
                </Pagination>                
            </Card>
        </>
    )
}

export default FApp