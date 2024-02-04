import { useAppDispatch, useAppSelector } from "app/hooks"
import "assets/compiled/css/table-datatable.css"
import { getEmployees, selectCurrentPage, selectEmployees, selectEmployeesQuery } from "features/employees/employeeSlice"
import { DATE_ENTREE, DATE_NAISSANCE, DIRECTION, MATRICULE, NOM, POSTE, PRENOM } from 'headers/headers'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IEmployee } from 'types/types.employees'

interface EmployeesListProps {
  employees: IEmployee[]
}


const EmployeesList = () => {

  const dispatch = useAppDispatch()
  const employees = useAppSelector(selectEmployees)
  const query = useAppSelector(selectEmployeesQuery)
  const currentPage = useAppSelector(selectCurrentPage)
  const [isLoading, setLoading] = useState (false)
     
  useEffect(() => {
    setLoading(true)
    let q = ''

    for (let key in query) {
      q += '&' + query[key];
    }
    dispatch(getEmployees(
      {
        page: currentPage,
        query: q
      }
    )).then(() => {
      setLoading(false)
    }).catch((err) => {
      setLoading(false)
    })
  }, [currentPage, query])

  if (isLoading) return <>Loding ...</>
  if (!employees?.results) return null



  return (

    <div className="table-responsive">
      <table className="table table-striped table-bordered mb-0">
        <thead>
          <tr>
            {/* <th>{PRIME_TYPE}</th> */}
            <th>
              {/* <MatriculeFilter /> */}
              {MATRICULE}
            </th>
            <th>{NOM}</th>
            <th>{PRENOM}</th>
            <th>{DATE_NAISSANCE}</th>
            <th>{DATE_ENTREE}</th>
            <th>{POSTE}</th>
            <th>{DIRECTION}</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.results && employees.results.map((employee: IEmployee, index: number) => (
              <tr key={employee.id}>
                {/* {index == 0 ? <th rowSpan={primes.length}> {prime_t.name}</th> : ''} */}
                <td><small>{employee.matricule}</small></td>
                <td><small>{employee.nom}</small></td>
                <td><small>{employee.prenom}</small></td>
                <td><small>{employee.date_n}</small></td>
                <td><small>{employee.date_e}</small></td>
                <td><small>{employee.poste}</small></td>
                <td><small>{employee.direction.name}</small></td>
                <td>
                  {/* <CreatePrime employee={employee} /> */}
                  <Link className='btn btn-success btn-sm' to={`/employees/${employee.matricule}/`}>View</Link>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </div>

  )

}

export default EmployeesList