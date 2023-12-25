import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { DATE_ACHAT, DUREE, EMPLOYEE, MATRICULE, MONTANT_ACHAT, SOLDE, STATUT } from 'headers/headers'
import './facilities.css'
const HeaderRow = () => {
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))
    return (
        <div className='d-flex cell-border-top' >
            <div className="cell-border fw-bold text-center montant-cell flex-cell"><small>{MONTANT_ACHAT}</small></div>
            <div className="cell-border fw-bold text-center montant-cell flex-cell"><small>{SOLDE}</small></div>
            {
                montCells && montCells.map((month, index) =>
                <div key={index} className="cell-border cell flex-cell  fw-bold text-center">{month}</div>
                )
            }
            <div className="cell-border fw-bold text-center cell flex-cell cell-border-left"><small>{MATRICULE}</small></div>
            <div className="cell-border fw-bold text-center employee-cell flex-cell"><small>{EMPLOYEE}</small></div>
            <div className="cell-border fw-bold text-center cell flex-cell"><small>{DUREE}</small></div>
            <div className="cell-border fw-bold text-center cell flex-cell"><small>{DATE_ACHAT}</small></div>

            <div className="cell-border fw-bold text-center cell flex-cell"><small>{STATUT}</small></div>
        </div>
    )
}


export default HeaderRow