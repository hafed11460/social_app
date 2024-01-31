import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useGetPrimetypesMutation } from 'features/primes/primesAPI';
import { deletePrime, getPrimes, selectCurrentProcesV, selectPrimes, selectPrimesQuery, setSelectedDate } from 'features/primes/primesSlice';
import { DATE_DE_FETE, DATE_DE_RECEPTION, MONTANT, NOM, OBSERVATION, PRENOM, PRIME_TYPE } from 'headers/headers';
import { useEffect, useMemo, useState } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { IPrime, IPrimetypes } from 'types/types.primes';
import EditPrime from './EditPrime';
import { BsFillPencilFill, BsPencilSquare, BsTrash } from 'react-icons/bs';
import DeletePrime from './DeletePrime';

interface PimesListProps {
    procesId: number
}

const PrimesList = () => {

    const dispatch = useAppDispatch()
    const primes = useAppSelector(selectPrimes)
    const proces_v = useAppSelector(selectCurrentProcesV)
    const [isLoding, setLoading] = useState(false)
    // const [date, setDate] = useState(new Date('2023'))
    const [show, setShow] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [primeId, setPrimeId] = useState<number>()
    const [getPrimetypes, { data: primetypes }] = useGetPrimetypesMutation()

    const handleDeletePrime = (id:number)=>{
        if (proces_v) {
            dispatch(deletePrime(id))
            .then(() => {
                // setLoading(false)
            }).catch((err: any) => {
                // setLoading(false)
            })
        }
    }
   

    useEffect(() => {
        if (proces_v) {
            dispatch(getPrimes(
                {
                    procesId: proces_v.id,
                    // date: date.getFullYear(),
                    // page: page,
                    // query: q
                }
            )).then(() => {
                setLoading(false)
            }).catch((err: any) => {
                setLoading(false)
            })
        }
    }, [proces_v])


    useEffect(() => {
        getPrimetypes({})
    }, [])

    // 
    if (isLoding) return <Spinner />

    if (!primes.results) return <div> No results</div>

    const total = useMemo(() => {
        var sum = primes.results.reduce((accumulator, currentValue) => {
            return Number(accumulator) + Number(currentValue.montant)
        }, 0)
        return sum
    }, [primes])
   

    return (
        <Card>
            <Card.Header>
                {/* <HeaderNavbar /> */}
                <EditPrime primeId={primeId} show={show} setShow={setShow} />
                <DeletePrime primeId={primeId} modalDel={modalDel} setModalDel={setModalDel} />
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
                                primes.results && primes.results.map((prime: IPrime, index: number) => (
                                    <tr key={prime.id}>
                                        {/* {index == 0 ? <th rowSpan={primes.length}> {prime_t.name}</th> : ''} */}
                                        <td>{prime.prime_type.name}</td>
                                        <td>{prime.employee.nom}</td>
                                        <td>{prime.employee.prenom}</td>
                                        <td>{prime.date_f}</td>
                                        <td>{prime.date_r}</td>
                                        <td>{prime.montant}</td>
                                        <td>{prime.observation}</td>
                                        <td>
                                            <Button  size='sm' onClick={() => { setPrimeId(prime.id);setShow(!show);  }}><BsPencilSquare /></Button>
                                            <Button className='mx-1' size='sm' variant='danger' onClick={() => { setPrimeId(prime.id);setModalDel(!modalDel);  }}><BsTrash /></Button>
                                            </td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td colSpan={5}>Total</td>
                                <td  >
                                    <span className='badge bg-light-success'>
                                        {total.toFixed(2)}
                                    </span>
                                </td>
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
