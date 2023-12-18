import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { DATE_ACHAT, DUREE, EMPLOYEE, MATRICULE, MONTANT_ACHAT } from 'headers/headers'
import './facilities.css'
const HeaderRow = () => {
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))
    return (
        <div className='d-flex border-top'>
            <div className="cell-border border-start  fw-bold text-center cell flex-cell"><small>{MATRICULE}</small></div>
            <div className="cell-border fw-bold text-center employee-cell flex-cell"><small>{EMPLOYEE}</small></div>
            <div className="cell-border fw-bold text-center cell flex-cell"><small>{DUREE}</small></div>
            <div className="cell-border fw-bold text-center montant-cell flex-cell"><small>{MONTANT_ACHAT}</small></div>
            <div className="cell-border fw-bold text-center cell flex-cell"><small>{DATE_ACHAT}</small></div>
            {
                montCells && montCells.map((month, index) =>
                    <div className="cell-border cell flex-cell  fw-bold text-center">{month}</div>
                )
            }
        </div>
    )
}


export default HeaderRow