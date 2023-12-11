import { useGetEmployeesQuery } from 'features/employees/employeeAPI'
import React from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { IEmployee } from 'types/types.employees'
import "assets/compiled/css/table-datatable.css"
import DataTable from 'react-data-table-component'
import { BsPencilFill } from 'react-icons/bs'
import CreatePrime from './prime/CreatePrime'




const EmployeesList = () => {
  const { data, isSuccess, isLoading } = useGetEmployeesQuery({})
  const handleEdit = (row:IEmployee)=>{
    alert(row.nom)
  }
  const columns = [
    {
        name: 'Matricule',
        selector: (row:IEmployee) => row.matricule,
        sortable: true,
    },
    {
        name: 'Nom',
        selector: (row:IEmployee) => row.nom,
        sortable: true,
    },
    {
        name: 'Prenom',
        selector: (row:IEmployee) => row.prenom,
        sortable: true,
    },
    {
        name: 'Date N',
        selector: (row:IEmployee) => row.date_n,
        sortable: true,
    },
    {
        name: 'Date Entrer',
        selector: (row:IEmployee) => row.date_e,
        sortable: true,
    },
    {
        name: 'Poste',
        selector: (row:IEmployee) => row.poste,
        sortable: true,
    },
    {
        name: 'Direction',
        selector: (row:IEmployee) => row.direction.name,
        // sortable: true,
    },
    {
        name:'Action',
        cell: (row:IEmployee) => <CreatePrime employee={row}/>,
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