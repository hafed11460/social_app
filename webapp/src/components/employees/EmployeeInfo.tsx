import { useGetEmployeeByIdQuery } from 'features/employees/employeeAPI'
import React, { memo } from 'react'
import { Card, Col, Row } from 'react-bootstrap'

interface EmployeeInfoProps {
    matricule: string
}

const EmployeeInfo = memo(({ matricule }: EmployeeInfoProps) => {
    const { data } = useGetEmployeeByIdQuery(matricule)

    if (!data) return null
    return (
        <Card className='shadow-sm border border rounded-0'>
            <Card.Body>
                <p><span className='fw-bold'>Matricule:</span> {data.matricule}</p>
                <p><span className='fw-bold'>Nom:</span> {data.nom}</p>
                <p><span className='fw-bold'>Prenom:</span> {data.prenom}</p>
                <p><span className='fw-bold'>Date N:</span> {data.date_n}</p>
                <p><span className='fw-bold'>Date Entrer:</span> {data.date_e}</p>
                <p><span className='fw-bold'>Poste:</span> {data.poste}</p>
                <p><span className='fw-bold'>fin de contract:</span> {data.fin_contrat}</p>
                <p><span className='fw-bold'>Type Contract:</span> {data.type_contrat}</p>
                <p><span className='fw-bold'>Direction:</span> {data.direction.name}</p>
            </Card.Body>
        </Card>
    )
})

export default EmployeeInfo
