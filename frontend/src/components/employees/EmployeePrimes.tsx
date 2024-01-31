import { useGetEmployeePrimesQuery } from 'features/primes/primesAPI'
import { DATE_DE_FETE, DATE_DE_RECEPTION, MONTANT, OBSERVATION, PRIME_TYPE } from 'headers/headers'
import { Button, Card, Spinner } from 'react-bootstrap'
import { IPrime } from 'types/types.primes'


interface EmployeePrimesProps {
    matricule: number
}

const EmployeePrimes = ({ matricule }: EmployeePrimesProps) => {
    const { data,isLoading } = useGetEmployeePrimesQuery(matricule)
    if(isLoading) return <Spinner/>
    if (!data) return null
    return (
        <Card>
            <Card.Body>
                <div className="table-responsive">
                    <table className="table table-striped mb-0">
                        <thead>
                            <tr>
                                {/* <th>{PRIME_TYPE}</th> */}
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
                                data.results && data.results.map((prime: IPrime, index: number) => (
                                    <tr key={prime.id}>
                                        {/* {index == 0 ? <th rowSpan={primes.length}> {prime_t.name}</th> : ''} */}
                                        <td>{prime.prime_type.name}</td>
                                        <td>{prime.date_f}</td>
                                        <td>{prime.date_r}</td>
                                        <td>{prime.montant}</td>
                                        <td>{prime.observation}</td>
                                        <td><Button>Edit</Button></td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </Card.Body>
        </Card>
    )
}

export default EmployeePrimes