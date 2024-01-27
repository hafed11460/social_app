import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useGetPrimetypesMutation } from 'features/primes/primesAPI';
import { getPrimes, selectPrimes, selectPrimesQuery, setSelectedDate } from 'features/primes/primesSlice';
import { DATE_DE_FETE, DATE_DE_RECEPTION, MONTANT, NOM, OBSERVATION, PRENOM, PRIME_TYPE } from 'headers/headers';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { IPrime, IPrimetypes } from 'types/types.primes';
import EditPrime from './EditPrime';

interface PimesListProps{
    procesId:number
}

const PrimesList = ({procesId}:PimesListProps) => {

    const dispatch = useAppDispatch()
    const primes = useAppSelector(selectPrimes)
    const query = useAppSelector(selectPrimesQuery)
    const [isLoding, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    // const [date, setDate] = useState(new Date('2023'))
    const [date, setDate] = useState<Date>()
    const [show, setShow] = useState(false);
    const [pid, setPid] = useState<number>()
    const [getPrimetypes, { data: primetypes }] = useGetPrimetypesMutation()
    const [total, setTotal] = useState<number>(0)
    const [dateSelected, setDateSelected] = useState<string>('')
    

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
        setPage(1)
    }, [query])



    useEffect(() => {
        if (date) {
            setLoading(true)
            console.log(typeof(query))
            let q = ''
           
            for (let key in query) {
                q += '&' +query[key];
            }

            dispatch(getPrimes(
                {   procesId:procesId,
                    date: date.getFullYear(),
                    page: page,
                    query: q
                }
            )).then(() => {
                setLoading(false)
            }).catch((err:any) => {
                setLoading(false)
            })
        }
    }, [procesId,date, page, query])


    /**  For the first rendering  */
    useEffect(() => {
        setDate(new Date())
    }, [])
    useEffect(() => {
        getPrimetypes({})
    }, [])

    // 

    if (!primes?.results) return <div> No results</div>


    

    
    
    
    
    const PrimeRows = (prime_t: IPrimetypes) => {
        if (!primes) return
        const data = primes.results.filter((prime: IPrime) => prime.prime_type.id == prime_t.id)
        return (
            <>

                {
                    data.map((prime: IPrime, index: number) => (
                        <tr key={prime.id}>
                            {/* {index == 0 ? <th rowSpan={primes.length}> {prime_t.name}</th> : ''} */}
                            <td>{prime.prime_type.name}</td>
                            <td>{prime.employee.nom}</td>
                            <td>{prime.employee.prenom}</td>
                            <td>{prime.date_f}</td>
                            <td>{prime.date_r}</td>
                            <td>{prime.montant}</td>
                            <td>{prime.observation}</td>
                            <td><Button size='sm' onClick={() => { setShow(!show); setPid(prime.id) }}>Edit</Button></td>
                        </tr>
                    ))
                }
            </>
        )
    }

    return (
        <Card>
            <Card.Header>
                {/* <HeaderNavbar /> */}
                <EditPrime pid={pid} show={show} setShow={setShow} />
            </Card.Header>

            <Card.Body>

                <div className="table-responsive">
                    <table className="table table-striped mb-0">
                        <thead>
                            <tr>
                                {/* <th>{PRIME_TYPE}</th> */}
                                <th>{PRIME_TYPE}</th>
                                <th>{NOM}</th>
                                <th>{PRENOM}</th>
                                <th>{DATE_DE_FETE}</th>
                                <th>{DATE_DE_RECEPTION}</th>
                                <th>{MONTANT}</th>
                                <th>{OBSERVATION}</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                                primetypes && primetypes.map((prime_t: IPrimetypes) => (
                                    <>
                                        {PrimeRows(prime_t)}
                                    </>
                                ))
                            }
                            <tr>
                                <td colSpan={5}>Total</td>
                                <td >{total}</td>
                                {/* <td >Total</td>
                                <td >Total</td> */}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card.Body>            
        </Card>
    )
}

export default PrimesList
