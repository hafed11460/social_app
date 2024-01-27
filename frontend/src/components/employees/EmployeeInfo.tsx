import { useGetEmployeeByIdQuery } from 'features/employees/employeeAPI'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

interface EmployeeInfoProps {
    matricule: string
}

const EmployeeInfo = ({ matricule }: EmployeeInfoProps) => {
    const { data } = useGetEmployeeByIdQuery(matricule)

    if (!data) return null
    return (
        <Card className='shadow-sm'>
            <Card.Body>
                <p>Matricule: {data.matricule}</p>
                <p>Nom: {data.nom}</p>
                <p>Prenom: {data.prenom}</p>

                <p>Date N: {data.date_n}</p>
                <p>Date Entrer: {data.date_e}</p>
                <p>Poste: {data.poste}</p>

                <p>fin de contract : {data.fin_contrat}</p>
                <p>Type Contract: {data.type_contrat}</p>
                <p>Direction : {data.direction.name}</p>
            </Card.Body>
        </Card>
    )
}

export default EmployeeInfo
