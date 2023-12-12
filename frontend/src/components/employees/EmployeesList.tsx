import { useGetEmployeesQuery } from 'features/employees/employeeAPI'
import React from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { IEmployee } from 'types/types.employees'
import "assets/compiled/css/table-datatable.css"
import DataTable from 'react-data-table-component'
import { BsPencilFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import CreatePrime from 'components/primes/CreatePrime'




const EmployeesList = () => {
  const { data, isSuccess, isLoading } = useGetEmployeesQuery({})
  const handleEdit = (row: IEmployee) => {
    alert(row.nom)
  }
  const columns = [
    {
      name: 'Id',
      selector: (row: IEmployee) => row.id,
      sortable: true,
      width: '70px'
    },
    {
      name: 'Matricule',
      selector: (row: IEmployee) => row.matricule,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Nom',
      selector: (row: IEmployee) => row.nom,
      sortable: true,
    },
    {
      name: 'Prenom',
      selector: (row: IEmployee) => row.prenom,
      sortable: true,
    },
    {
      name: 'Date N',
      selector: (row: IEmployee) => row.date_n,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Date Entrer',
      selector: (row: IEmployee) => row.date_e,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Poste',
      selector: (row: IEmployee) => row.poste,
      sortable: true,
    },
    {
      name: 'Direction',
      selector: (row: IEmployee) => row.direction.name,
      // sortable: true,
    },
    {
      name: 'Action',
      cell: (row: IEmployee) =>
        <div className='buttons'>
          <CreatePrime employee={row} />
          <Link className='btn btn-success btn-sm' to={`/employees/${row.id}`}>View</Link>
        </div>,
      // cell: (row:IEmployee) => <Button onClick={()=>handleEdit(row)} ><BsPencilFill /></Button>,

      // sortable: true,
    },
  ];
  if (isLoading) return <>Loding ...</>
  return (
    <Card>
      <Card.Body>
        <DataTable
          columns={columns}
          data={data}
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