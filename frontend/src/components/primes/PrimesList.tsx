import { useGetPrimesQuery } from 'features/primes/primesAPI';
import { DATE_DE_FETE, DATE_DE_RECEPTION, MONTANT, OBSERVATION, PRIME_TYPE } from 'headers/headers';
import React, { useEffect, useState } from 'react'
import { IPrime } from 'types/types.employees';
import EditPrime from './EditPrime';
import { Button } from 'react-bootstrap';

export const PrimesList = () => {
    const [show, setShow] = useState(false);
    const[pid,setPid] = useState<number>()
    const { data } = useGetPrimesQuery({})
    const [currentPrime, setCurrentPrime] = useState()
    const handleEdit = () => {

    }
    useEffect
    return (
        <div className="card px-2">
            <div className="card-header">
                <h4 className="card-title">Striped rows</h4>
                <EditPrime pid={pid} show={show}  setShow={setShow} />
            </div>
            <div className="card-content">



                <div className="table-responsive">
                    <table className="table table-striped mb-0">
                        <thead>
                            <tr>
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
                                data && data.map((prime: IPrime) =>
                                    <tr key={prime.id}>
                                        <td>{prime.prime_type.name}</td>
                                        <td>{prime.date_f}</td>
                                        <td>{prime.date_r}</td>
                                        <td>{prime.montant}</td>
                                        <td>{prime.observation}</td>

                                        <td><Button onClick={() => { setShow(!show); setPid(prime.id)}}>Edit</Button></td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
