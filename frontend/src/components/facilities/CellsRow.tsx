import { memo, useCallback, useMemo, useState } from "react"
import { IFacilite, ITimeline } from "types/types.facilities"
import Cell from "./Cell"
import './facilities.css'
import Cells from "./Cells"


interface YearRowProps {
    year: number,
    facilite: IFacilite
}




const CellsRow = ({ facilite, year }: YearRowProps) => {
    // console.log('render CellsRow Componente')
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))

    const solde = useMemo(() => {
        let val = 0;
        for (let index = 0; index < facilite.timelines.length; index++) {
            const element = facilite.timelines[index];
            val += Number(element.somme)
        }
        return val
    }, [facilite.timelines])

    return (
        <>

            <div className='d-flex'>
                <div
                    className="cell-border  text-center cell flex-cell"
                    style={{ borderLeft: '1px solid #e6e6e6' }}
                >
                    <small>{facilite.employee.matricule}</small>
                </div>
                <div className="cell-border text-center employee-cell flex-cell">
                    <small>{facilite.employee.nom.substring(0, 15)} {facilite.employee.prenom.substring(0, 10)}</small>
                </div>
                <div className="cell-border text-center cell flex-cell"><small>{facilite.duree} Mois</small></div>
                <div className="cell-border text-center cell flex-cell"><small>{facilite.date_achat}</small></div>
                <div className="cell-border text-center montant-cell flex-cell"><small>{facilite.montant}</small></div>
                <div className="cell-border text-center montant-cell flex-cell"><small>{solde}</small></div>

                {/* {
                    montCells && montCells.map((month, index) =>
                        <div key={index} className="cell-border fw-bold text-center cell flex-cell">
                            {isExistMont(month)}
                        </div>
                    )
                } */}
                {
                    montCells && montCells.map((month, index) =>
                        <div key={index} className="cell-border fw-bold text-center cell flex-cell">
                            <Cells facilite={facilite} month={month} year={year} />
                        </div>
                    )
                }
                


                <div className={`cell-border text-center cell flex-cell ${facilite.is_completed ? 'btn btn-success btn-sm' : ''}`} ><small className="">comleted</small></div>
            </div>


        </>
    )
}

export default CellsRow