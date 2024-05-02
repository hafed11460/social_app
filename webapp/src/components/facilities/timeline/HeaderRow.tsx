import { ACTION, DATE_ACHAT, DUREE, MATRICULE, MONTANT_ACHAT, SOLDE, STATE } from 'headers/headers'
import { useState } from 'react'
import '../facilities.css'




/** search with matricule */





const HeaderRow = () => {
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))
    return (
        <div className='d-flex cell-border-top' >

            {/* <div className="d-flex"> */}
            <div className="d-flex cell-border fw-bold text-center cell flex-cell cell-border-left">
                {/* <div className="flex-shrink-1"><MatriculeFilter /></div> */}
                <div className="w-100"><small>{MATRICULE}</small></div>
            </div>
            {/* </div> */}
            {/* <div className="d-flex cell-border fw-bold text-center employee-cell flex-cell">
                <div className="flex-shrink-1"><EmployeeFilter /></div>
                <div className="w-100"><small>{EMPLOYEE}</small></div>
            </div> */}
            <div className="cell-border fw-bold text-center cell flex-cell"><small>{DUREE}</small></div>
            <div className="cell-border fw-bold text-center cell flex-cell"><small>{DATE_ACHAT}</small></div>
            <div className="cell-border fw-bold text-center montant-cell flex-cell"><small>{MONTANT_ACHAT}</small></div>
            <div className="cell-border fw-bold text-center montant-cell flex-cell"><small>{SOLDE}</small></div>
            {
                montCells && montCells.map((month, index) =>
                    <div key={index} className="cell-border cell flex-cell  fw-bold text-center">{month}</div>
                )
            }
            <div className="cell-border fw-bold text-center cell flex-cell"><small>{STATE}</small></div>
            <div className="cell-border fw-bold text-center cell flex-cell"><small>{ACTION}</small></div>
        </div>
    )
}


export default HeaderRow