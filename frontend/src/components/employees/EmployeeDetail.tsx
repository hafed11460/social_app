import { useGetEmployeeByIdQuery } from 'features/employees/employeeAPI';
import { DATE_DE_FETE, DATE_DE_RECEPTION, MONTANT, OBSERVATION, PRIME_TYPE } from 'headers/headers';
import { useParams } from 'react-router-dom';
import { IPrime } from 'types/types.employees';

const EmployeeDetail = () => {
    const { eid } = useParams();
    const { data } = useGetEmployeeByIdQuery(eid)
    return (
        <div className="card px-2">
            <div className="card-header">
                <h4 className="card-title">Striped rows</h4>
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
                                data && data.primes.map((prime:IPrime) =>
                                    <tr>
                                        <td>{prime.prime_type.name}</td>
                                        <td>{prime.date_f}</td>
                                        <td>{prime.date_r}</td>
                                        <td>{prime.montant}</td>
                                        <td>{prime.observation}</td>
                                       
                                        <td><a href="#"><i
                                            className="badge-circle badge-circle-light-secondary font-medium-1"
                                            data-feather="mail"></i></a></td>
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

export default EmployeeDetail
