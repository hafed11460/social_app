import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useGetPrimetypesMutation } from 'features/primes/primesAPI';
import { deletePrime, getPrimes, selectCurrentProcesV, selectPrimes } from 'features/primes/primesSlice';
import { DATE_DE_FETE, DATE_DE_RECEPTION, MATRICULE, MONTANT, NOM, OBSERVATION, PRENOM, PRIME_TYPE } from 'headers/headers';
import { useEffect, useMemo, useState } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { IPrime } from 'types/types.primes';
import DeleteModal from './DeleteModal';
import EditPrime from './EditPrime';
import { Link } from 'react-router-dom';

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
    const [error, setError] = useState()



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

    const handleDeletePrime = () => {
        if (primeId) {
            dispatch(deletePrime(primeId))
                .then(() => {
                    setModalDel(false)
                }).catch((err: any) => {
                    setError(err['error'])
                })
        }
    }

    return (
        <Card>
            <Card.Header>
                <EditPrime primeId={primeId} show={show} setShow={setShow} />
                <DeleteModal
                    id={primeId}
                    show={modalDel}
                    setShow={setModalDel}
                    deleteAction={handleDeletePrime}
                    error={error}
                    headertext='Delete Prime'
                    message='Are you sure to delete this Prime'
                />
            </Card.Header>

            <Card.Body>

                <div className="table-responsive">
                    <table className="table table-striped mb-0">
                        <thead>
                            <tr>
                                <th>{MATRICULE}</th>
                                <th>{NOM}</th>
                                <th>{PRENOM}</th>
                                <th>{PRIME_TYPE}</th>
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
                                        <td> <Link target="blank" to={`/employees/${prime.employee.matricule}/`}>
                                            <small>{prime.employee.matricule}</small>
                                        </Link></td>
                                        <td>{prime.employee.nom}</td>
                                        <td>{prime.employee.prenom}</td>
                                        <td>{prime.prime_type.name}</td>
                                        <td>{prime.date_f}</td>
                                        <td>{prime.date_r}</td>
                                        <td>{prime.montant}</td>
                                        <td>{prime.observation}</td>
                                        <td>
                                            <Button
                                                disabled={!proces_v?.is_open}
                                                size='sm'
                                                onClick={() => { setPrimeId(prime.id); setShow(!show); }}>
                                                <BsPencilSquare />
                                            </Button>
                                            <Button
                                                disabled={!proces_v?.is_open}
                                                className='mx-1' size='sm' variant='danger'
                                                onClick={() => { setPrimeId(prime.id); setModalDel(!modalDel); }}>
                                                <BsTrash />
                                            </Button>
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
