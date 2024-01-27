import "assets/compiled/css/table-datatable.css"
import CreatePrime from 'components/primes/CreatePrime'
import { useGetEmployeesMutation } from 'features/employees/employeeAPI'
import { DATE_ENTREE, DATE_NAISSANCE, DIRECTION, MATRICULE, NOM, POSTE, PRENOM } from 'headers/headers'
import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { IEmployee } from 'types/types.employees'
import EmployeeNavbar from './EmployeeNavbar'
import MatriculeFilter from "./filters/MatriculeFilter"




const EmployeesList = () => {

  const [getEmployees, { data, isSuccess, isLoading }] = useGetEmployeesMutation({})
  const [currentPage, setcurrentPage] = useState(1)
  const handleEdit = (row: IEmployee) => {
    alert(row.nom)
  }


  useEffect(() => {
    getEmployees({ page: currentPage })
  }, [currentPage])

  if (isLoading) return <>Loding ...</>
  if (!data) return null
  return (
    <Card>
      <Card.Body>
        <EmployeeNavbar pages={data.pages} currentPage={currentPage} setcurrentPage={setcurrentPage} />
        <div className="table-responsive">
          <table className="table table-striped table-bordered mb-0">
            <thead>
              <tr>
                {/* <th>{PRIME_TYPE}</th> */}
                <th>
                  <MatriculeFilter />
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
                data.results && data.results.map((employee: IEmployee, index: number) => (
                  <tr key={employee.id}>
                    {/* {index == 0 ? <th rowSpan={primes.length}> {prime_t.name}</th> : ''} */}
                    <td>{employee.matricule}</td>
                    <td>{employee.nom}</td>
                    <td>{employee.prenom}</td>
                    <td>{employee.date_n}</td>
                    <td>{employee.date_e}</td>
                    <td>{employee.poste}</td>
                    <td>{employee.direction.name}</td>
                    <td><div className='buttons'>
                      <CreatePrime employee={employee} />
                      <Link className='btn btn-success btn-sm' to={`/employees/${employee.matricule}/`}>View</Link>
                    </div></td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </Card.Body>
    </Card>
  )
  return (
    <Card className='shadow-sm'>
      <Card.Body>
        <DataTable
          columns={columns}
          data={data.results}
          pagination
        />
        {/* <Table>
          <thead>
            <tr>
              <td>Matricule</td>
              <td>Nom</td>
              <td>Prenom</td>
            </tr>
          </thead>
          <tbody>
            {data && data.map((employee: IEmployee) =>
              <tr>
                <td>{employee.matricule}</td>
                <td>{employee.nom}</td>
                <td>{employee.prenom}</td>
              </tr>
            )}
          </tbody>
        </Table> */}
      </Card.Body>
    </Card>
  )
}

export default EmployeesList