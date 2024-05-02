import { Card } from 'react-bootstrap'
import EmployeeNavbar from './EmployeeNavbar'
import EmployeesList from './EmployeesList'

const EmployeesApp = ()=>{
   
    return (
      <Card>
        <Card.Body>
          <EmployeeNavbar />
          <EmployeesList />          
        </Card.Body>
      </Card>
    )
   
}

export default EmployeesApp