import { useGetLiteEmployeesMutation } from 'features/employees/employeeAPI';
import { ChangeEvent, useEffect, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import ReactSelect, { ValueType } from 'react-select';
import { IEmployee } from 'types/types.employees';
interface Option {
  value: string;
  label: string;
}
interface EmployeeSelectProps{
  setValue:(name:string,value:any)=>void
}
const EmployeeSelect = ({setValue}:EmployeeSelectProps) => {
  const [getLiteEmployees, { data: employees }] = useGetLiteEmployeesMutation({})

  const handleChange = (selected: ValueType<Option>) => {
    console.log(selected)
    setValue('employee',selected.value)
    // setSelectedOption(selected);
  };
  const handleInputChange = (inputValue: string, event: ChangeEvent<HTMLInputElement>) => {
    // Handle any additional logic based on the user input
    if (inputValue) {
      console.log('Input value:', inputValue);
      let query = `nom=${inputValue}`
      getLiteEmployees(query)
    }
  };
  const options = useMemo(() => {
    try {
      return employees.map((emp: IEmployee) => { return { 'value': emp.id, 'label': `${emp.matricule} - ${emp.nom} ${emp.prenom}` } })
    } catch (error) {
      return []
    }
  }, [employees])


  useEffect(() => {
    getLiteEmployees({})
  }, [])
  return (
    <>
      <Form.Group className="mb-3 " >

        <ReactSelect
          className="basic-single"
          classNamePrefix="select"
          isSearchable={true}
          options={options}
          onChange={handleChange}
          onInputChange={handleInputChange}
        />


      </Form.Group>

    </>
  )
}

export default EmployeeSelect
