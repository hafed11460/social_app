import { useGetLiteEmployeesMutation } from 'features/employees/employeeAPI';
import { ChangeEvent, useEffect, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import ReactSelect, { ActionMeta, InputActionMeta, OnChangeValue } from 'react-select';
import ValueType from 'react-select';
import { IEmployee } from 'types/types.employees';
interface Option {
  value: string;
  label: string;
}
interface EmployeeSelectProps {
  setValue: (name: string, value: any) => void
}
const EmployeeSelect = ({ setValue }: EmployeeSelectProps) => {
  const [getLiteEmployees, { data: employees }] = useGetLiteEmployeesMutation({})

  const handleChange = (newValue: Option | null, actionMeta: ActionMeta<Option>) => {
    setValue('employee', newValue?.value)
    // setSelectedOption(selected);
  };
  const handleInputChange = (newValue: string, actionMeta: InputActionMeta ) => {
    // Handle any additional logic based on the user input
    if (newValue) {
      console.log('Input value:', newValue);
      let query = `nom=${newValue}`
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
    getLiteEmployees('')
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
